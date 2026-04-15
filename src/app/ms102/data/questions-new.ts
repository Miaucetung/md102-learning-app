// MS-102 Questions - ORIGINAL CONTENT
// Erstellt: ${new Date().toISOString().split('T')[0]}
// HINWEIS: Alle Fragen sind ORIGINAL erstellt, keine Kopien von Prüfungsfragen
// Total: 462 Fragen (wird schrittweise befüllt)

export type Ms102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
  /** Fragetyp für spezielle Darstellung */
  type?: "standard" | "drag-drop" | "hotspot" | "terminal" | "lab" | "diagram";
  /** Optional: ASCII-Diagramm oder Mermaid-Notation */
  diagram?: string;
  /** Optional: Terminal-Simulation */
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

export const QUESTIONS_MS102: Ms102Question[] = [
  // ============================================================
  // BEREICH 1: Microsoft Defender XDR (30-35%)
  // ============================================================

  {
    id: "Q1",
    number: 1,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "standard",
    question: `
## Szenario: Nordwind GmbH

Die Nordwind GmbH nutzt Microsoft 365 E5 mit Defender for Cloud Apps.

Der IT-Sicherheitsbeauftragte möchte eine Warnung erhalten, wenn ein Mitarbeiter
innerhalb von **2 Minuten mehr als 100 Dateien** aus SharePoint Online herunterlädt.

**Welche Richtlinie muss konfiguriert werden?**
`,
    options: [
      { key: "A", text: "Dateirichtlinie (File Policy)" },
      {
        key: "B",
        text: "Anomalie-Erkennungsrichtlinie (Anomaly Detection Policy)",
      },
      { key: "C", text: "Sitzungsrichtlinie (Session Policy)" },
      { key: "D", text: "Aktivitätsrichtlinie (Activity Policy)" },
    ],
    correctAnswers: ["D"],
    explanationDe: `
## Lösung: Aktivitätsrichtlinie (Activity Policy)

### Warum ist D richtig?

Eine **Aktivitätsrichtlinie** ermöglicht:
- Überwachung spezifischer Benutzeraktionen (z.B. Download)
- Definition von **Schwellenwerten** (100 Dateien)
- Festlegung eines **Zeitfensters** (2 Minuten)
- Automatische Alerts bei Überschreitung

### Konfigurationspfad:
\`\`\`
Microsoft Defender Portal → Cloud Apps → Policies → Activity policy → Create
\`\`\`

### Warum sind die anderen falsch?

| Option | Warum falsch? |
|--------|---------------|
| A - File Policy | Prüft Datei-Eigenschaften (Sensitivität, Freigaben), nicht Download-Mengen |
| B - Anomaly Detection | ML-basiert, keine exakten Schwellenwerte möglich |
| C - Session Policy | Echtzeit-Kontrolle während Sitzung, nicht für Volumen-Alerts |
`,
    references: [
      "https://learn.microsoft.com/defender-cloud-apps/activity-filters",
    ],
  },

  {
    id: "Q2",
    number: 2,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "terminal",
    terminal: {
      prompt: "PS C:\\>",
      commands: [
        "# Log Collector für Cloud Discovery einrichten",
        "docker run -d --name LogCollector \\",
        "  -p 514:514/udp -p 21:21 \\",
        "  mcr.microsoft.com/mcas/logcollector",
      ],
    },
    question: `
## Lab-Szenario: Techfabrik AG

Die Techfabrik AG möchte **Cloud Discovery** in Defender for Cloud Apps implementieren.

Ein On-Premises Server \`SRV-LOG01\` (Windows Server 2022) soll als Log Collector dienen.

**Was muss ZUERST auf SRV-LOG01 installiert werden?**

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    NETZWERK-DIAGRAMM                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────┐         ┌──────────────┐                │
│   │ Firewall │ ──────► │  SRV-LOG01   │                │
│   │ (Syslog) │         │  (Collector) │                │
│   └──────────┘         └──────┬───────┘                │
│                               │                         │
│                               ▼                         │
│                    ┌──────────────────┐                │
│                    │ Defender Portal  │                │
│                    │ (Cloud Discovery)│                │
│                    └──────────────────┘                │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`
`,
    options: [
      { key: "A", text: "Azure Monitor Agent" },
      { key: "B", text: "Docker Engine" },
      { key: "C", text: "Azure Arc Agent" },
      { key: "D", text: "Defender for Identity Sensor" },
    ],
    correctAnswers: ["B"],
    explanationDe: `
## Lösung: Docker Engine

### Warum Docker?

Der Log Collector für Cloud Discovery wird als **Docker-Container** bereitgestellt.

### Installationsschritte:

\`\`\`powershell
# 1. Docker installieren
Install-WindowsFeature -Name Containers
Install-Module DockerMsftProvider -Force
Install-Package Docker -ProviderName DockerMsftProvider -Force

# 2. Docker starten
Start-Service Docker

# 3. Log Collector deployen
docker run -d --name cloudapp-collector \\
  -p 514:514/udp \\
  -e "CONSOLE=your-tenant.portal.cloudappsecurity.com" \\
  mcr.microsoft.com/mcas/logcollector
\`\`\`

### Datenfluss:

\`\`\`
Firewall/Proxy → Syslog (UDP 514) → Docker Container → Cloud Discovery API
\`\`\`
`,
    references: [
      "https://learn.microsoft.com/defender-cloud-apps/discovery-docker",
    ],
  },

  {
    id: "Q3",
    number: 3,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "hard",
    type: "drag-drop",
    diagram: `
┌────────────────────────────────────────────────────────────┐
│              GERÄTE-ÜBERSICHT: Medizintechnik Plus         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ PC-001  │  │ PC-002  │  │ MOB-001 │  │ MOB-002 │       │
│  │ Win 11  │  │ Win 10  │  │ Android │  │  iOS    │       │
│  │ Intune  │  │ Intune  │  │ Intune  │  │ Intune  │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                            │
│  Alle Geräte: Defender for Endpoint onboarded             │
│                                                            │
└────────────────────────────────────────────────────────────┘
`,
    question: `
## Szenario: Medizintechnik Plus GmbH

Dein Unternehmen verwendet Microsoft Defender Vulnerability Management.

**Ordne die Funktionen den unterstützten Geräten zu:**

| Funktion | Unterstützte Geräte |
|----------|---------------------|
| OS-Schwachstellenerkennung | [___________] |
| Konfigurationsbewertung (Baselines) | [___________] |
| Browser-Erweiterungsinventar | [___________] |

**Verfügbare Antworten:**
- Nur Windows (PC-001, PC-002)
- Windows + macOS
- Windows + Android + iOS
- Alle Geräte
`,
    options: [
      {
        key: "A",
        text: "OS-Schwachstellen: Alle | Config: Windows | Browser: Windows",
      },
      {
        key: "B",
        text: "OS-Schwachstellen: Windows+Android+iOS | Config: Windows | Browser: Windows",
      },
      {
        key: "C",
        text: "OS-Schwachstellen: Nur Windows | Config: Alle | Browser: Alle",
      },
      {
        key: "D",
        text: "OS-Schwachstellen: Windows+Android | Config: Windows+Android | Browser: Windows",
      },
    ],
    correctAnswers: ["B"],
    explanationDe: `
## Funktionsmatrix Defender Vulnerability Management

| Funktion | Windows | macOS | Linux | Android | iOS |
|----------|---------|-------|-------|---------|-----|
| **OS-Schwachstellen** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Config Assessment** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Browser Extensions** | ✅ | ✅ | ❌ | ❌ | ❌ |

### Für dieses Szenario:

- **OS-Schwachstellen**: PC-001, PC-002, MOB-001, MOB-002 (alle außer Linux)
- **Config Assessment**: Nur PC-001, PC-002 (Windows)
- **Browser Extensions**: Nur PC-001, PC-002 (Windows)

### Praxistipp:
Mobile Geräte können Schwachstellen erkennen, aber keine Compliance-Baselines bewerten.
`,
    references: [
      "https://learn.microsoft.com/defender-vulnerability-management/tvm-supported-os",
    ],
  },

  {
    id: "Q4",
    number: 4,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "lab",
    question: `
## Lab: Incident-Benachrichtigungen konfigurieren

**Ausgangssituation bei der Finanzhaus AG:**

\`\`\`yaml
Defender XDR Konfiguration:
  Gerätegruppen:
    - Name: Buchhaltung
      Geräte: [FIN-PC01, FIN-PC02, FIN-PC03]
    - Name: Vertrieb
      Geräte: [SALES-PC01, SALES-PC02]
    - Name: IT-Admin
      Geräte: [ADMIN-PC01]

  Benachrichtigungsregeln:
    - Regel1:
        Schweregrad: [High, Critical]
        Gruppen: [Alle]
        Empfänger: security@finanzhaus.de

    - Regel2:
        Schweregrad: [Medium, High, Critical]
        Gruppen: [Buchhaltung]
        Empfänger: buchhaltung-sec@finanzhaus.de
\`\`\`

**Szenario:** Um 14:30 wird ein **Medium**-Severity Incident auf \`FIN-PC02\` erkannt.

**Wer erhält eine Benachrichtigung?**
`,
    options: [
      { key: "A", text: "Nur security@finanzhaus.de" },
      { key: "B", text: "Nur buchhaltung-sec@finanzhaus.de" },
      { key: "C", text: "Beide: security@ und buchhaltung-sec@" },
      { key: "D", text: "Niemand - Medium ist zu niedrig" },
    ],
    correctAnswers: ["B"],
    explanationDe: `
## Analyse der Benachrichtigungslogik

### Regel-Auswertung:

| Regel | Schweregrad | Gruppe | Match? |
|-------|-------------|--------|--------|
| Regel1 | High, Critical | Alle | ❌ Medium nicht enthalten |
| Regel2 | Medium, High, Critical | Buchhaltung | ✅ FIN-PC02 ist in Buchhaltung |

### Ergebnis:
Nur **buchhaltung-sec@finanzhaus.de** erhält die Benachrichtigung.

### Wichtig:
- Regel1 ignoriert den Incident wegen Schweregrad-Filter
- Regel2 matcht, weil:
  - Medium ∈ [Medium, High, Critical] ✅
  - FIN-PC02 ∈ Buchhaltung ✅

### Konfigurationspfad:
\`\`\`
Defender Portal → Settings → Email notifications → Incident notifications
\`\`\`
`,
    references: [
      "https://learn.microsoft.com/defender-xdr/configure-email-notifications",
    ],
  },

  {
    id: "Q5",
    number: 5,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "hard",
    type: "terminal",
    terminal: {
      prompt: "[DC01]: PS C:\\>",
      commands: [
        "Get-ADUser -Filter * | Where-Object { $_.Enabled -eq $true } | Measure-Object",
      ],
      expectedOutput: "Count: 2847",
    },
    question: `
## Szenario: Defender for Identity Sensor

Die Logistik-Union AG betreibt einen Active Directory Forest mit:

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                 AD FOREST: logistik-union.local         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Domain Controller:                                     │
│  ┌─────────────────┐   ┌─────────────────┐             │
│  │     DC01        │   │     DC02        │             │
│  │ Windows 2022   │   │ Windows 2019   │             │
│  │ FSMO: PDC      │   │ FSMO: -        │             │
│  └─────────────────┘   └─────────────────┘             │
│                                                         │
│  Benutzer: 2.847 aktiv                                 │
│  Computer: 1.203 Objekte                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

Die Firma hat Microsoft Defender for Identity lizenziert.

**Auf welchen Servern muss der MDI-Sensor installiert werden?**
`,
    options: [
      { key: "A", text: "Nur auf DC01 (hat PDC-Rolle)" },
      { key: "B", text: "Nur auf DC02 (sekundärer DC)" },
      { key: "C", text: "Auf beiden Domain Controllern" },
      { key: "D", text: "Auf einem separaten Member Server" },
    ],
    correctAnswers: ["C"],
    explanationDe: `
## Best Practice: MDI-Sensor Installation

### Empfehlung: ALLE Domain Controller

Der Sensor muss auf **jedem DC** installiert werden, weil:

1. **Vollständige Sichtbarkeit**
   - Authentifizierungen können an jedem DC stattfinden
   - LDAP-Queries verteilen sich auf alle DCs

2. **Kerberos-Überwachung**
   - Ticket-Requests können an jedem DC gehen
   - Pass-the-Hash/Ticket Erkennung benötigt alle Events

3. **Redundanz**
   - Bei DC-Ausfall weiterhin Überwachung aktiv

### Installationsbefehl:
\`\`\`powershell
# Auf jedem DC ausführen
.\\Azure ATP sensor setup.exe /quiet
\`\`\`

### Port-Anforderungen:
| Richtung | Port | Protokoll | Zweck |
|----------|------|-----------|-------|
| Sensor → Cloud | 443 | HTTPS | Telemetrie |
| Intern | 445 | SMB | Dateizugriff |
| Intern | 88 | Kerberos | Auth-Monitoring |
`,
    references: [
      "https://learn.microsoft.com/defender-for-identity/install-sensor",
    ],
  },

  // ============================================================
  // BEREICH 2: Microsoft Entra Identity (25-30%)
  // ============================================================

  {
    id: "Q6",
    number: 6,
    area: "Implement and manage Microsoft Entra identity and access (25–30%)",
    difficulty: "medium",
    type: "diagram",
    diagram: `
┌────────────────────────────────────────────────────────────┐
│                    BENUTZER-TABELLE                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  | Benutzer | Gruppenmitglied | Entra ID Rolle |          │
│  |----------|-----------------|----------------|          │
│  | Anna     | MDI-Admins      | -              |          │
│  | Ben      | MDI-Users       | -              |          │
│  | Clara    | -               | Security Admin |          │
│  | David    | MDI-Users       | Global Admin   |          │
│                                                            │
│  MDI-Workspace: "Workspace-Produktion"                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
`,
    question: `
## Szenario: Defender for Identity Berechtigungen

Die Bauwerk GmbH hat einen MDI-Workspace eingerichtet.

**Benutzerübersicht:**

| Benutzer | Gruppenmitgliedschaft | Entra ID Rolle |
|----------|----------------------|----------------|
| Anna | Azure ATP Workspace-Produktion Administrators | - |
| Ben | Azure ATP Workspace-Produktion Users | - |
| Clara | - | Security Administrator |
| David | Azure ATP Workspace-Produktion Users | Global Administrator |

**Aufgabe:** Die Sensor-Konfiguration muss angepasst werden.

**Welche Benutzer können diese Änderung durchführen?**
`,
    options: [
      { key: "A", text: "Nur Anna" },
      { key: "B", text: "Anna und Clara" },
      { key: "C", text: "Anna, Clara und David" },
      { key: "D", text: "Alle vier Benutzer" },
    ],
    correctAnswers: ["C"],
    explanationDe: `
## MDI-Berechtigungsanalyse

### Wer kann Sensor-Konfiguration ändern?

| Benutzer | Berechtigung | Grund |
|----------|--------------|-------|
| Anna | ✅ | MDI-Administrator über Gruppenrolle |
| Ben | ❌ | MDI-User = nur Lesezugriff |
| Clara | ✅ | Security Admin = automatisch MDI-Admin |
| David | ✅ | Global Admin = automatisch MDI-Admin |

### Wichtige Regel:
**Global Administrator** und **Security Administrator** in Entra ID werden automatisch zu MDI-Administratoren!

### Rollenvererbung:
\`\`\`
Global Admin ──────────────────┐
Security Admin ────────────────┼──► MDI Administrator
Azure ATP Workspace X Admins ──┘
\`\`\`

### Konfiguration prüfen:
\`\`\`
Defender Portal → Settings → Identities → Role Management
\`\`\`
`,
    references: [
      "https://learn.microsoft.com/defender-for-identity/role-groups",
    ],
  },

  {
    id: "Q7",
    number: 7,
    area: "Implement and manage Microsoft Entra identity and access (25–30%)",
    difficulty: "hard",
    type: "terminal",
    terminal: {
      prompt: "PS C:\\>",
      commands: [
        "Connect-MgGraph -Scopes 'Directory.ReadWrite.All'",
        "New-MgIdentityConditionalAccessPolicy @params",
      ],
    },
    question: `
## Lab: Conditional Access für MFA

**Anforderung bei der Energie-Direkt AG:**

1. Alle Benutzer müssen MFA verwenden
2. AUSNAHME: Benutzer im Firmennetzwerk (IP: 203.0.113.0/24)
3. AUSNAHME: Geräte mit Intune-Compliance

**Vervollständige die Conditional Access Policy:**

\`\`\`yaml
Conditional Access Policy:
  Name: "MFA-Pflicht-mit-Ausnahmen"
  State: Enabled

  Conditions:
    Users: Include [Alle Benutzer]
    Cloud Apps: Include [Alle Cloud Apps]
    Locations:
      Include: [_______________]    # Lücke 1
      Exclude: [_______________]    # Lücke 2
    Device State:
      Exclude: [_______________]    # Lücke 3

  Grant Controls:
    Operator: OR
    Controls: [_______________]     # Lücke 4
\`\`\`
`,
    options: [
      {
        key: "A",
        text: "Lücke 1: All locations | Lücke 2: Firmennetz | Lücke 3: Compliant | Lücke 4: Require MFA",
      },
      {
        key: "B",
        text: "Lücke 1: Firmennetz | Lücke 2: All locations | Lücke 3: Hybrid Joined | Lücke 4: Require MFA",
      },
      {
        key: "C",
        text: "Lücke 1: All locations | Lücke 2: - | Lücke 3: - | Lücke 4: Block access",
      },
      {
        key: "D",
        text: "Lücke 1: - | Lücke 2: Firmennetz | Lücke 3: Compliant | Lücke 4: Require MFA",
      },
    ],
    correctAnswers: ["A"],
    explanationDe: `
## Korrekte CA-Policy Konfiguration

\`\`\`yaml
Conditional Access Policy:
  Name: "MFA-Pflicht-mit-Ausnahmen"
  State: Enabled

  Conditions:
    Users:
      Include: [Alle Benutzer]
    Cloud Apps:
      Include: [Alle Cloud Apps]
    Locations:
      Include: [All locations]           # ✅ Lücke 1
      Exclude: [Firmennetz-Named-Loc]    # ✅ Lücke 2 (203.0.113.0/24)
    Device State:
      Exclude: [Device marked compliant]  # ✅ Lücke 3

  Grant Controls:
    Operator: OR
    Controls: [Require MFA]               # ✅ Lücke 4
\`\`\`

### Logik erklärt:

1. **Include: All locations** = Policy gilt überall
2. **Exclude: Firmennetz** = Im Büro kein MFA nötig
3. **Exclude: Compliant** = Intune-verwaltete Geräte kein MFA
4. **Require MFA** = Alle anderen müssen MFA

### PowerShell Beispiel:
\`\`\`powershell
$params = @{
  DisplayName = "MFA-Pflicht-mit-Ausnahmen"
  State = "enabled"
  Conditions = @{
    Locations = @{
      IncludeLocations = @("All")
      ExcludeLocations = @("named-location-id")
    }
  }
  GrantControls = @{
    BuiltInControls = @("mfa")
  }
}
\`\`\`
`,
    references: [
      "https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-conditions",
    ],
  },

  {
    id: "Q8",
    number: 8,
    area: "Implement and manage Microsoft Entra identity and access (25–30%)",
    difficulty: "medium",
    type: "standard",
    question: `
## Szenario: Hybrid Identity bei Motorenwerk Schmidt

Das Unternehmen synchronisiert On-Premises AD mit Entra ID via Entra Connect.

**Aktuelle Konfiguration:**
- Authentifizierung: Pass-through Authentication (PTA)
- SSO: Nicht konfiguriert
- Password Writeback: Aktiviert

**Neue Anforderungen:**
1. Identity Protection mit Leaked Credentials Detection
2. Minimale Anmelde-Popups für Benutzer

**Welche Entra Connect Einstellungen müssen geändert werden?**
`,
    options: [
      {
        key: "A",
        text: "Password Hash Sync aktivieren + Seamless SSO aktivieren",
      },
      { key: "B", text: "Federation mit ADFS konfigurieren" },
      { key: "C", text: "Directory Extension Sync aktivieren" },
      { key: "D", text: "Device Writeback aktivieren" },
    ],
    correctAnswers: ["A"],
    explanationDe: `
## Lösung: Password Hash Sync + Seamless SSO

### Anforderung 1: Identity Protection - Leaked Credentials

**Problem:** PTA sendet keine Passwort-Hashes an die Cloud.

Identity Protection prüft geleakte Passwörter gegen eine Datenbank.
Dafür werden **Password Hashes** benötigt!

\`\`\`
PTA allein:    Benutzer ──► Entra ──► On-Prem DC (kein Hash in Cloud)
                                      └── ❌ Leaked Credentials nicht möglich

Mit PHS:       Benutzer ──► Entra ──► Hash-Vergleich in Cloud
                                      └── ✅ Leaked Credentials Detection aktiv
\`\`\`

### Anforderung 2: Minimale Anmelde-Popups

**Seamless SSO** ermöglicht:
- Automatische Anmeldung im Firmennetzwerk
- Keine erneute Passwort-Eingabe für M365 Apps
- Nutzt Kerberos-Ticket vom lokalen DC

### Konfigurationsschritte:
\`\`\`
1. Entra Connect öffnen
2. User Sign-in → Password Hash Synchronization ✅
3. User Sign-in → Enable Single Sign-On ✅
4. Synchronisation starten
\`\`\`
`,
    references: [
      "https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-password-hash-synchronization",
    ],
  },

  // Weitere Fragen werden hier fortgesetzt...
  // Insgesamt 462 Fragen für MS-102
];
