// MD-102 Questions - ORIGINAL CONTENT
// Erstellt: ${new Date().toISOString().split('T')[0]}
// HINWEIS: Alle Fragen sind ORIGINAL erstellt, keine Kopien von Prüfungsfragen

export type Md102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
  type?: "standard" | "drag-drop" | "hotspot" | "terminal" | "lab" | "diagram";
  diagram?: string;
  terminal?: {
    prompt: string;
    commands: string[];
    expectedOutput?: string;
  };
  question: string;
  options: { key: string; text: string }[];
  correctAnswers: string[];
  explanationDe: string;
  references?: string[];
};

export const QUESTIONS_MD102: Md102Question[] = [
  // ============================================================
  // BEREICH 1: Deploy Windows Client (25-30%)
  // ============================================================

  {
    id: "Q1",
    number: 1,
    area: "Deploy Windows Client (25–30%)",
    difficulty: "medium",
    type: "diagram",
    question: `
## Szenario: Windows Deployment bei Autohaus Stern

Das Autohaus Stern plant die Bereitstellung von 150 neuen Windows 11 Geräten.

**Infrastruktur:**
\`\`\`
┌─────────────────────────────────────────────────────────┐
│              DEPLOYMENT-INFRASTRUKTUR                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   Intune     │    │   Autopilot  │                  │
│  │   (Cloud)    │◄───│   Profile    │                  │
│  └──────────────┘    └──────────────┘                  │
│         │                                               │
│         ▼                                               │
│  ┌──────────────────────────────────────────────┐      │
│  │              NEUE GERÄTE                      │      │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │      │
│  │  │ PC1 │ │ PC2 │ │ PC3 │ │ ... │ │PC150│    │      │
│  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │      │
│  └──────────────────────────────────────────────┘      │
│                                                         │
│  Anforderung: Zero-Touch Deployment                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Welche Deployment-Methode ist am besten geeignet?**
`,
    options: [
      { key: "A", text: "Windows Autopilot mit User-Driven Mode" },
      { key: "B", text: "Microsoft Deployment Toolkit (MDT)" },
      { key: "C", text: "Windows Autopilot mit Self-Deploying Mode" },
      { key: "D", text: "In-Place Upgrade via SCCM" },
    ],
    correctAnswers: ["C"],
    explanationDe: `
## Lösung: Self-Deploying Mode

### Warum Self-Deploying?

**Anforderung:** Zero-Touch Deployment = Keine Benutzerinteraktion

| Deployment-Methode | Touch erforderlich? |
|-------------------|---------------------|
| User-Driven | Benutzer muss sich anmelden |
| Self-Deploying | ❌ Keine Interaktion |
| MDT | Techniker-Interaktion |
| SCCM In-Place | Bestehende Installation |

### Self-Deploying Mode:

\`\`\`
Gerät einschalten→ Autopilot erkennt Hardware-Hash
                → Lädt Profil automatisch
                → Installiert Apps
                → Joined Entra ID
                → Fertig!
\`\`\`

### Voraussetzungen:
- TPM 2.0 (attestiert Gerät)
- Windows 11 Pro/Enterprise
- Hardware-Hash in Intune registriert
- Kein Benutzer für Anmeldung nötig

### Konfiguration:
\`\`\`
Intune → Devices → Enroll devices → Deployment Profiles → Create
  → Mode: Self-deploying
  → Join Type: Azure AD joined
\`\`\`
`,
    references: ["https://learn.microsoft.com/autopilot/self-deploying"],
  },

  {
    id: "Q2",
    number: 2,
    area: "Deploy Windows Client (25–30%)",
    difficulty: "hard",
    type: "terminal",
    terminal: {
      prompt: "PS C:\\>",
      commands: [
        "Install-Script -Name Get-WindowsAutoPilotInfo",
        "Get-WindowsAutoPilotInfo -OutputFile C:\\Temp\\Autopilot.csv",
      ],
      expectedOutput: "Gathered 1 device(s). Saved to C:\\Temp\\Autopilot.csv",
    },
    question: `
## Lab: Autopilot Hardware-Hash extrahieren

Die IT-Abteilung der Möbelhaus Eiche GmbH muss 50 neue Laptops für Autopilot registrieren.

**Aufgabe:** Extrahiere den Hardware-Hash und importiere ihn in Intune.

\`\`\`powershell
# Terminal-Simulation
PS C:\\> Install-Script -Name Get-WindowsAutoPilotInfo

NuGet provider is required to continue
[Y] Yes  [N] No  [?] Help: Y

PS C:\\> Get-WindowsAutoPilotInfo -OutputFile C:\\Temp\\Autopilot.csv
Gathered 1 device(s). Saved to C:\\Temp\\Autopilot.csv

PS C:\\> Get-Content C:\\Temp\\Autopilot.csv
"Device Serial Number","Windows Product ID","Hardware Hash"
"5CG1234ABC","00330-80000-00000-AA123","AQEAAB..."
\`\`\`

**Welcher nächste Schritt ist erforderlich?**
`,
    options: [
      { key: "A", text: "CSV direkt auf dem Gerät in Intune hochladen" },
      {
        key: "B",
        text: "CSV in Intune → Devices → Windows enrollment → Devices importieren",
      },
      { key: "C", text: "CSV per E-Mail an Microsoft senden" },
      { key: "D", text: "CSV in Active Directory importieren" },
    ],
    correctAnswers: ["B"],
    explanationDe: `
## Hardware-Hash Import-Prozess

### Schritt-für-Schritt:

\`\`\`
1. CSV extrahieren (bereits erledigt)
   └── Get-WindowsAutoPilotInfo -OutputFile

2. CSV in Intune importieren ✅ (nächster Schritt)
   └── Intune Portal → Devices → Windows enrollment → Devices → Import

3. Autopilot-Profil zuweisen
   └── Deployment Profiles → Assign to devices

4. Gerät zurücksetzen/neu starten
   └── OOBE startet mit Autopilot
\`\`\`

### Import-Pfad in Intune:
\`\`\`
Microsoft Intune Admin Center
  └── Devices
      └── Windows
          └── Windows enrollment
              └── Devices (Autopilot Devices)
                  └── Import
                      └── CSV hochladen
\`\`\`

### CSV-Format:
| Spalte | Erforderlich? |
|--------|---------------|
| Device Serial Number | ✅ Ja |
| Windows Product ID | ✅ Ja |
| Hardware Hash | ✅ Ja |
| Group Tag | Optional |
| Assigned User | Optional |
`,
    references: ["https://learn.microsoft.com/autopilot/add-devices"],
  },

  {
    id: "Q3",
    number: 3,
    area: "Deploy Windows Client (25–30%)",
    difficulty: "medium",
    type: "drag-drop",
    question: `
## Szenario: Deployment-Profile zuordnen

Die Druckerei Gutenberg hat drei Abteilungen mit unterschiedlichen Anforderungen:

\`\`\`
┌────────────────────────────────────────────────────────────┐
│                  ABTEILUNGSÜBERSICHT                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  PRODUKTION          VERWALTUNG          AUSSENDIENST     │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐     │
│  │ Kiosk-   │        │ Standard │        │ Shared   │     │
│  │ Geräte   │        │ Laptops  │        │ Tablets  │     │
│  │ fest     │        │ persönl. │        │ mehrere  │     │
│  │ montiert │        │ zugeord. │        │ Benutzer │     │
│  └──────────┘        └──────────┘        └──────────┘     │
│                                                            │
└────────────────────────────────────────────────────────────┘
\`\`\`

**Ordne das richtige Autopilot-Profil zu:**

| Abteilung | Autopilot-Modus |
|-----------|-----------------|
| Produktion (Kiosk) | [___] |
| Verwaltung (persönlich) | [___] |
| Außendienst (shared) | [___] |

**Verfügbar:** A) User-Driven B) Self-Deploying C) Pre-Provisioned
`,
    options: [
      {
        key: "A",
        text: "Produktion: Self-Deploying | Verwaltung: User-Driven | Außendienst: User-Driven (shared)",
      },
      {
        key: "B",
        text: "Produktion: User-Driven | Verwaltung: Self-Deploying | Außendienst: Pre-Provisioned",
      },
      {
        key: "C",
        text: "Produktion: Pre-Provisioned | Verwaltung: Pre-Provisioned | Außendienst: Self-Deploying",
      },
      { key: "D", text: "Alle: User-Driven Mode" },
    ],
    correctAnswers: ["A"],
    explanationDe: `
## Korrekte Profil-Zuordnung

| Abteilung | Modus | Begründung |
|-----------|-------|------------|
| **Produktion** | Self-Deploying | Kiosk-Geräte ohne Benutzeranmeldung |
| **Verwaltung** | User-Driven | Persönliche Zuordnung, Benutzer meldet sich an |
| **Außendienst** | User-Driven (shared) | Shared Device Mode für mehrere Benutzer |

### Modi im Vergleich:

\`\`\`
Self-Deploying:
  └── Keine Benutzerinteraktion
  └── Ideal für Kiosk, Digital Signage
  └── Benötigt TPM 2.0

User-Driven:
  └── Benutzer meldet sich während OOBE an
  └── Gerät wird dem Benutzer zugeordnet
  └── Standard für persönliche Geräte

User-Driven (Shared):
  └── Wie User-Driven, aber:
  └── Gerät nicht einem Benutzer zugeordnet
  └── Mehrere Benutzer können sich anmelden
\`\`\`

### Konfiguration für Shared Device:
\`\`\`yaml
Autopilot Profile:
  Mode: User-driven
  Convert all targeted devices to Autopilot: No
  Deployment mode: Azure AD joined
  # Wichtig: Kein "User assignment" konfigurieren
\`\`\`
`,
    references: ["https://learn.microsoft.com/autopilot/profiles"],
  },

  // ============================================================
  // BEREICH 2: Manage Identity and Compliance (15-20%)
  // ============================================================

  {
    id: "Q4",
    number: 4,
    area: "Manage identity and compliance (15–20%)",
    difficulty: "medium",
    type: "lab",
    question: `
## Lab: App Protection Policy für iOS

Die Apotheke Gesundheit Plus nutzt Microsoft 365 Business Premium.
Mitarbeiter greifen mit privaten iPhones auf Firmendaten zu (BYOD).

**Konfigurierte App Protection Policy:**

\`\`\`yaml
iOS App Protection Policy:
  Name: "BYOD-Datenschutz"
  Target Apps: [Outlook, Teams, OneDrive]

  Data Transfer:
    Send org data to other apps: Policy managed apps only
    Receive data from other apps: Policy managed apps only
    Save copies of org data: Block

  Access Requirements:
    PIN for access: Required
    PIN type: Numeric
    Minimum PIN length: 6
    Biometric instead of PIN: Allow

  Conditional Launch:
    Max PIN attempts: 5
    Offline grace period: 720 minutes
    Action after max attempts: [___________]  # ← Was passiert?
\`\`\`

**Was passiert, wenn ein Benutzer 5x die falsche PIN eingibt?**
`,
    options: [
      { key: "A", text: "Das Gerät wird aus Intune entfernt (Wipe)" },
      { key: "B", text: "Nur die App-Daten werden gelöscht (Selective Wipe)" },
      { key: "C", text: "Der Benutzer wird dauerhaft gesperrt" },
      { key: "D", text: "Die PIN muss zurückgesetzt werden (Reset PIN)" },
    ],
    correctAnswers: ["D"],
    explanationDe: `
## Standard-Aktion bei Max PIN Attempts

### Je nach Konfiguration:

| Action | Beschreibung |
|--------|--------------|
| **Reset PIN** (Standard) | Benutzer muss neue PIN erstellen |
| Wipe data | Nur App-Daten löschen (nicht Gerät) |
| Block access | Zugriff temporär sperren |

### Warum "Reset PIN" typisch ist:

1. **Benutzerfreundlich:** Keine Datenverlust
2. **Sicher:** Erzwingt neue PIN
3. **BYOD-freundlich:** Gerät bleibt intakt

### Ablauf bei Reset PIN:
\`\`\`
5x falsche PIN → App zeigt "PIN zurücksetzen"
                → Benutzer authentifiziert sich mit M365-Konto
                → MFA-Prüfung (falls konfiguriert)
                → Neue PIN erstellen
                → Zugriff wiederhergestellt
\`\`\`

### Conditional Launch Optionen:
\`\`\`yaml
Max PIN attempts:
  Range: 1-10
  Actions:
    - Reset PIN     # ← Am häufigsten
    - Wipe data
    - Block access
    - Warn (just alert)
\`\`\`

### Unterschied Wipe vs. Selective Wipe:
- **Wipe:** Gerät komplett löschen (nur bei MDM-enrolled)
- **Selective Wipe:** Nur Unternehmensdaten in der App löschen (MAM)
`,
    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy-settings-ios",
    ],
  },

  {
    id: "Q5",
    number: 5,
    area: "Manage identity and compliance (15–20%)",
    difficulty: "hard",
    type: "terminal",
    terminal: {
      prompt: "PS C:\\>",
      commands: [
        "Connect-MgGraph -Scopes 'DeviceManagementApps.ReadWrite.All'",
        "New-MgDeviceAppManagementAndroidManagedAppProtection",
      ],
    },
    question: `
## Szenario: MAM für Android BYOD

Die Spedition Schnell GmbH möchte Unternehmensdaten auf privaten Android-Geräten schützen.

**Anforderungen:**
1. Kopieren von Firmendaten in private Apps verhindern
2. Screenshots der Firmen-Apps blockieren
3. Minimale PIN-Länge: 6 Ziffern
4. Geräte NICHT in Intune registrieren (reine MAM)

**Welche Policy-Art ist erforderlich?**

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                INTUNE POLICY TYPEN                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐     ┌─────────────────┐           │
│  │ Device Config   │     │ App Protection  │           │
│  │    Policy       │     │    Policy       │           │
│  │                 │     │                 │           │
│  │ [MDM-enrolled]  │     │ [MAM ohne MDM]  │           │
│  │                 │     │                 │           │
│  └─────────────────┘     └─────────────────┘           │
│                                                         │
│  ┌─────────────────┐     ┌─────────────────┐           │
│  │ Compliance      │     │ App Config      │           │
│  │    Policy       │     │    Policy       │           │
│  │                 │     │                 │           │
│  │ [Bedingungen]   │     │ [App-Settings]  │           │
│  │                 │     │                 │           │
│  └─────────────────┘     └─────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`
`,
    options: [
      { key: "A", text: "Device Configuration Policy" },
      { key: "B", text: "Compliance Policy" },
      { key: "C", text: "App Protection Policy (MAM)" },
      { key: "D", text: "App Configuration Policy" },
    ],
    correctAnswers: ["C"],
    explanationDe: `
## Lösung: App Protection Policy (MAM)

### Warum APP (MAM)?

| Anforderung | Device Policy? | App Protection? |
|-------------|----------------|-----------------|
| Kopieren blockieren | ❌ Braucht MDM | ✅ MAM-Feature |
| Screenshots blockieren | ❌ Braucht MDM | ✅ MAM-Feature |
| PIN erzwingen | ❌ Device PIN | ✅ App-PIN |
| Ohne Enrollment | ❌ Braucht MDM | ✅ MAM ohne MDM |

### App Protection Policy Konfiguration:

\`\`\`yaml
Android App Protection Policy:
  Name: "BYOD-Spedition-Schnell"

  Data Protection:
    Send org data to other apps: Policy managed apps
    Receive data from other apps: Policy managed apps
    Screen capture and Google Assistant: Block

  Access Requirements:
    PIN for access: Required
    PIN type: Numeric
    Minimum PIN length: 6

  Conditional Launch:
    Max PIN attempts: 5
    Jailbroken/rooted devices: Block access
\`\`\`

### MAM ohne MDM Architektur:
\`\`\`
Privates Gerät (nicht enrolled)
  │
  ├── Outlook (MAM-geschützt)
  │     └── Unternehmensdaten verschlüsselt
  │     └── Copy/Paste nur zu Teams erlaubt
  │
  ├── WhatsApp (privat)
  │     └── Keine Firmendaten möglich
  │
  └── Fotos (privat)
        └── Screenshots von Outlook blockiert
\`\`\`
`,
    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy",
    ],
  },

  // Weitere MD-102 Fragen...
];
