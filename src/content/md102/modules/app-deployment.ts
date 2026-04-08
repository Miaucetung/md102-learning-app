// ============================================================================
// MD-102 Learning Module: App Deployment mit Intune
// ============================================================================

import type { LearningModule } from "@/content/types";

export const appDeploymentModule: LearningModule = {
  id: "md102-mod-app-deployment",
  slug: "app-deployment",
  title: "App Deployment mit Microsoft Intune",

  // -------------------------------------------------------------------------
  // 1. REAL-WORLD PROBLEM
  // -------------------------------------------------------------------------
  realWorldProblem:
    "Die Mitarbeiter brauchen Microsoft Office, den Chrome Browser und eine spezielle Branchen-Software auf ihren Laptops. Bisher hat die IT jede App manuell installiert. Wie automatisierst du das für 500+ Geräte?",

  // -------------------------------------------------------------------------
  // 2. CONTEXT
  // -------------------------------------------------------------------------
  context: [
    "Intune unterstützt verschiedene App-Typen: Microsoft Store Apps, Win32 Apps (.intunewin), LOB Apps (.msi, .appx), Web Links und Microsoft 365 Apps.",
    "Win32 Apps sind das flexibelste Format - sie erlauben Erkennungsregeln, Abhängigkeiten und benutzerdefinierte Installationsskripte.",
    "App-Zuweisung kann 'Required' (automatische Installation), 'Available' (Self-Service im Company Portal) oder 'Uninstall' sein.",
    "Die Enrollment Status Page (ESP) kann Apps während des Autopilot-Prozesses installieren, bevor der Benutzer den Desktop sieht.",
  ],

  // -------------------------------------------------------------------------
  // 3. LEARNING BLOCKS
  // -------------------------------------------------------------------------
  blocks: [
    // PREDICTION BLOCK
    {
      type: "prediction",
      question:
        "Du möchtest eine .exe-Installationsdatei über Intune verteilen. Welches Format musst du verwenden?",
      options: [
        "Die .exe direkt hochladen als 'Line-of-Business App'",
        "Die .exe in ein .intunewin Paket konvertieren",
        "Die .exe in ein .msi umwandeln",
        "Nur .appx und .msix Dateien werden unterstützt",
      ],
      correctAnswer: "Die .exe in ein .intunewin Paket konvertieren",
      explanation:
        "Intune akzeptiert keine rohen .exe Dateien. Du musst das Microsoft Win32 Content Prep Tool nutzen, um die .exe (samt Abhängigkeiten) in ein .intunewin Paket zu konvertieren. Dieses enthält Metadaten für Erkennung, Installation und Deinstallation.",
      skillTags: ["app-deployment", "win32-apps"],
    },

    // CONCEPT BLOCK - App Types
    {
      type: "concept",
      title: "App-Typen in Intune",
      content: `Intune unterstützt verschiedene App-Formate für unterschiedliche Szenarien:

**Microsoft Store Apps (New)**
• Apps direkt aus dem Microsoft Store
• Automatische Updates über den Store
• Einfachste Methode, wenn App verfügbar

**Win32 Apps (.intunewin)**
• Konvertierte .exe oder .msi Dateien
• Volle Kontrolle über Installation/Deinstallation
• Erkennungsregeln, Abhängigkeiten, Supersedence

**Microsoft 365 Apps**
• Office Suite (Word, Excel, PowerPoint, etc.)
• Eigener Deployment-Typ mit XML-Konfiguration
• Update-Kanal wählbar (Current, Monthly Enterprise, etc.)

**Line-of-Business (LOB)**
• .msi, .appx, .msix Dateien direkt
• Weniger Konfigurationsoptionen als Win32
• Gut für einfache MSI-Installer`,
      keyTakeaways: [
        "Win32 Apps (.intunewin) sind am flexibelsten für komplexe Installationen",
        "Microsoft Store Apps sind am einfachsten zu verwalten",
        "Microsoft 365 Apps haben einen eigenen, speziellen Deployment-Typ",
      ],
      skillTags: ["app-types", "intune"],
    },

    // SCENARIO BLOCK
    {
      type: "scenario",
      title: "Chrome Browser für alle ausrollen",
      description:
        "Der Google Chrome Browser soll auf allen Windows-Geräten verfügbar sein.",
      situation:
        "Contoso hat 500 Windows 11 Geräte. Alle Mitarbeiter sollen Chrome nutzen können. Die IT möchte, dass Chrome automatisch installiert wird, aber Benutzer sollen es auch selbst installieren können, falls es fehlt.",
      challenge: "Wähle die richtige Deployment-Strategie für Chrome.",
      options: [
        {
          label: "Chrome als 'Required' App für alle Geräte zuweisen",
          isCorrect: false,
          feedback:
            "Das installiert Chrome auf ALLEN Geräten, auch wenn Benutzer es nicht brauchen. Verschwendet Bandbreite und Speicherplatz.",
        },
        {
          label: "Chrome als 'Available' App im Company Portal bereitstellen",
          isCorrect: false,
          feedback:
            "Das erfordert, dass jeder Benutzer Chrome manuell installiert. Nicht ideal für eine Standard-App.",
        },
        {
          label:
            "Chrome als 'Required' für eine Gerätegruppe UND 'Available' für alle Benutzer",
          isCorrect: true,
          feedback:
            "Beste Lösung! Pilotgruppe bekommt Chrome automatisch, alle anderen können es bei Bedarf selbst installieren. Nach erfolgreicher Pilotphase kann 'Required' erweitert werden.",
        },
      ],
      realWorldTip:
        "Nutze IMMER eine Pilotgruppe für neue App-Deployments. So erkennst du Probleme, bevor alle Benutzer betroffen sind.",
      skillTags: ["deployment-strategy", "chrome"],
    },

    // COMPARISON BLOCK - Assignment Types
    {
      type: "comparison",
      title: "App Assignment Types",
      description:
        "Die richtige Zuweisung bestimmt, wie und wann eine App installiert wird.",
      items: [
        {
          name: "Required",
          characteristics: [
            "Automatische Installation ohne Benutzerinteraktion",
            "App wird beim nächsten Sync installiert",
            "Benutzer kann die Installation nicht verhindern",
            "Ideal für: Security-Software, Pflicht-Apps",
          ],
        },
        {
          name: "Available",
          characteristics: [
            "App erscheint im Company Portal",
            "Benutzer entscheidet, ob installiert wird",
            "Self-Service-Modell",
            "Ideal für: Optionale Tools, Zusatz-Software",
          ],
        },
        {
          name: "Uninstall",
          characteristics: [
            "Entfernt die App vom Gerät",
            "Nützlich für veraltete oder unsichere Apps",
            "Kann Abhängigkeiten brechen",
            "Ideal für: Software-Rückruf, Lizenz-Rückgabe",
          ],
        },
      ],
      keyDifferences: [
        {
          aspect: "Benutzerinteraktion",
          optionA: "Required: Keine - vollautomatisch",
          optionB: "Available: Benutzer muss aktiv installieren",
        },
        {
          aspect: "Zeitpunkt",
          optionA: "Required: Beim nächsten Sync",
          optionB: "Available: Wenn Benutzer es will",
        },
        {
          aspect: "Zielgruppe",
          optionA: "Required: Geräte- oder Benutzergruppen",
          optionB: "Available: Nur Benutzergruppen sinnvoll",
        },
      ],
      recommendation:
        "Kombiniere Required für essenzielle Apps mit Available für optionale Tools. So bleibt das Company Portal übersichtlich.",
      skillTags: ["assignment-types", "deployment"],
    },

    // TERMINAL BLOCK - Win32 Content Prep
    {
      type: "terminal",
      title: "Win32 App Paket erstellen",
      description:
        "Konvertiere eine .exe in das .intunewin Format mit dem Content Prep Tool.",
      commands: [
        {
          command:
            "IntuneWinAppUtil.exe -c C:\\Source\\ChromeSetup -s ChromeStandaloneSetup64.exe -o C:\\Output -q",
          output: "Creating intunewin file...\nDone!",
          explanation:
            "-c = Source-Ordner, -s = Setup-Datei, -o = Output-Ordner, -q = Quiet Mode",
        },
        {
          command: "dir C:\\Output",
          output: "ChromeStandaloneSetup64.intunewin    45.234.567 Bytes",
          explanation:
            "Das .intunewin Paket enthält die komprimierte App plus Metadaten",
        },
      ],
      tips: [
        "Lade das Content Prep Tool von GitHub: microsoft/Microsoft-Win32-Content-Prep-Tool",
        "Lege alle Abhängigkeiten (DLLs, Config-Dateien) in denselben Source-Ordner",
        "Die -q Option unterdrückt interaktive Prompts für Automatisierung",
      ],
      skillTags: ["win32-apps", "packaging", "powershell"],
    },

    // GUIDED DECISION BLOCK
    {
      type: "guided-decision",
      title: "App-Typ auswählen",
      scenario:
        "Du hast verschiedene Apps zu deployen. Wähle für jede den richtigen App-Typ.",
      steps: [
        {
          question: "Microsoft Office (Word, Excel, PowerPoint, Outlook)",
          options: [
            {
              label: "Win32 App",
              isCorrect: false,
            },
            {
              label: "Microsoft 365 Apps",
              isCorrect: true,
              nextStep: 1,
            },
            {
              label: "Microsoft Store App",
              isCorrect: false,
            },
          ],
          explanation:
            "Microsoft 365 Apps haben einen eigenen Deployment-Typ mit Office Deployment Tool (ODT) Integration und Update-Kanal-Auswahl.",
        },
        {
          question: "7-Zip (Open Source, .exe Installer)",
          options: [
            {
              label: "Win32 App (.intunewin)",
              isCorrect: true,
              nextStep: 2,
            },
            {
              label: "Line-of-Business App",
              isCorrect: false,
            },
            {
              label: "Microsoft Store App",
              isCorrect: false,
            },
          ],
          explanation:
            "Für .exe Dateien brauchst du immer das Win32 App Format. LOB akzeptiert nur .msi/.appx/.msix.",
        },
        {
          question: "Windows Terminal (im Microsoft Store verfügbar)",
          options: [
            {
              label: "Win32 App",
              isCorrect: false,
            },
            {
              label: "Microsoft Store App (New)",
              isCorrect: true,
            },
            {
              label: "Web Link",
              isCorrect: false,
            },
          ],
          explanation:
            "Wenn eine App im Microsoft Store verfügbar ist, nutze den Store App Typ. Automatische Updates, einfachste Verwaltung.",
        },
      ],
      summary:
        "Microsoft 365 Apps → eigener Typ | .exe → Win32 | Store Apps → Microsoft Store App (New) | .msi → LOB oder Win32",
      skillTags: ["app-types", "decision-making"],
    },

    // PRACTICE BLOCK
    {
      type: "practice",
      title: "Win32 App in Intune hochladen",
      instruction:
        "Erstelle und lade eine Win32 App für den 7-Zip Archiver hoch.",
      steps: [
        "Lade 7-Zip MSI von 7-zip.org herunter",
        "Erstelle Ordner C:\\IntuneApps\\7Zip und kopiere die MSI hinein",
        "Führe aus: IntuneWinAppUtil.exe -c C:\\IntuneApps\\7Zip -s 7z2301-x64.msi -o C:\\IntuneApps\\Output",
        "Öffne Intune Admin Center > Apps > Windows",
        "Klicke Add > Windows app (Win32)",
        "Lade die .intunewin Datei hoch",
        "Install command: msiexec /i 7z2301-x64.msi /qn",
        "Uninstall command: msiexec /x {23170F69-40C1-2702-2301-000001000000} /qn",
        "Detection rule: File exists - C:\\Program Files\\7-Zip\\7z.exe",
      ],
      hints: [
        "Der GUID für Uninstall findest du in der Registry unter HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
        "Für MSI-Pakete: /qn = quiet, no UI | /i = install | /x = uninstall",
        "Detection Rules prüfen, ob die App bereits installiert ist",
      ],
      expectedOutcome:
        "7-Zip erscheint in der App-Liste und kann Gruppen zugewiesen werden. Nach Zuweisung installiert sich 7-Zip automatisch auf Zielgeräten.",
      skillTags: ["win32-apps", "intune-admin"],
    },

    // MISTAKE BLOCK
    {
      type: "mistake",
      title: "Häufige App Deployment Fehler",
      description:
        "Diese Fehler führen zu fehlgeschlagenen Installationen oder frustrierten Benutzern.",
      mistakes: [
        {
          wrong: "Detection Rule vergessen oder falsch konfigurieren",
          correct:
            "Immer Detection Rule erstellen, die eindeutig prüft ob App installiert ist",
          explanation:
            "Ohne Detection Rule versucht Intune die App bei jedem Sync neu zu installieren. Falsche Detection = App wird als 'nicht installiert' gemeldet, obwohl sie da ist.",
          consequence:
            "Endlose Installationsversuche, hohe Netzwerklast, Benutzer-Beschwerden.",
        },
        {
          wrong: "Install-Command ohne Silent-Parameter",
          correct: "/qn (MSI) oder /S, /silent, --silent (EXE) hinzufügen",
          explanation:
            "Ohne Silent-Parameter wartet die Installation auf Benutzerinteraktion, die bei Intune-Deployment nicht möglich ist.",
          consequence:
            "Installation hängt, Timeout nach 60 Minuten, App als fehlgeschlagen markiert.",
        },
        {
          wrong: "Required-App an 'All Users' zuweisen ohne Test",
          correct: "Immer zuerst an Pilotgruppe zuweisen und 24-48h testen",
          explanation:
            "Ein Fehler in der App-Konfiguration betrifft dann ALLE Benutzer gleichzeitig.",
          consequence:
            "500+ Supporttickets, Image-Schaden für IT, möglicher Produktionsausfall.",
        },
      ],
      skillTags: ["troubleshooting", "best-practices"],
    },

    // EXAM TRAP BLOCK
    {
      type: "exam-trap",
      title: "Available vs Required für Gruppen",
      trapDescription:
        "Die Prüfung testet, ob du verstehst, welche Zuweisungstypen für welche Gruppentypen funktionieren.",
      commonMistake: "Denken, dass 'Available' für Gerätegruppen funktioniert.",
      correctApproach:
        "'Available' funktioniert NUR für Benutzergruppen. Geräte haben kein Company Portal-Profil. Für Gerätegruppen nur 'Required' oder 'Uninstall' verwenden.",
      examPhrasing: [
        "You need to make an app available for self-service installation. Which group type should you use?",
        "An app assigned as 'Available' to a device group is not showing in Company Portal. Why?",
        "Users report they cannot see an app in Company Portal. The app is assigned to their device group.",
      ],
      skillTags: ["assignment-types", "exam-prep"],
    },

    // SUMMARY BLOCK
    {
      type: "summary",
      title: "Zusammenfassung: App Deployment",
      keyPoints: [
        "Win32 Apps (.intunewin) sind das flexibelste Format für Windows Apps",
        "Microsoft 365 Apps haben einen eigenen Deployment-Typ mit ODT-Integration",
        "Required = Automatisch | Available = Self-Service | Uninstall = Entfernen",
        "Available funktioniert NUR für Benutzergruppen, nicht für Gerätegruppen",
        "Detection Rules verhindern wiederholte Installationsversuche",
        "Immer Pilotgruppe vor All Users Deployment",
      ],
      examRelevance: {
        weight: "15-20%",
        frequentTopics: [
          "App-Typen und wann welcher verwendet wird",
          "Win32 App Packaging und Detection Rules",
          "Required vs Available Assignment",
          "Troubleshooting fehlgeschlagener Installationen",
        ],
      },
      nextSteps: [
        "Praktische Übung: Office 365 Apps deployen",
        "Nächstes Thema: App Protection Policies",
      ],
      skillTags: ["app-deployment", "summary"],
    },
  ],

  // -------------------------------------------------------------------------
  // 4. LAB SCENARIO
  // -------------------------------------------------------------------------
  labScenario: {
    slug: "deploy-win32-app",
    title: "Win32 App erstellen und deployen",
    description:
      "Paketiere 7-Zip als Win32 App und verteile sie an eine Testgruppe.",
    environment:
      "Microsoft Intune Admin Center + lokaler PC mit Content Prep Tool",
    estimatedMinutes: 25,
    steps: [
      {
        id: 1,
        title: "Content Prep Tool herunterladen",
        description: "Lade das Microsoft Win32 Content Prep Tool herunter.",
        detailedInstructions: [
          "Öffne github.com/microsoft/Microsoft-Win32-Content-Prep-Tool",
          "Klicke auf 'Releases' und lade die neueste Version herunter",
          "Entpacke IntuneWinAppUtil.exe in einen Ordner",
        ],
      },
      {
        id: 2,
        title: ".intunewin Paket erstellen",
        description: "Konvertiere die 7-Zip MSI in das Intune-Format.",
        detailedInstructions: [
          "Erstelle C:\\IntuneApps\\7Zip und kopiere die 7-Zip MSI hinein",
          "Öffne PowerShell als Administrator",
          "Führe aus: .\\IntuneWinAppUtil.exe -c 'C:\\IntuneApps\\7Zip' -s '7z2301-x64.msi' -o 'C:\\IntuneApps\\Output'",
        ],
        command:
          ".\\IntuneWinAppUtil.exe -c C:\\IntuneApps\\7Zip -s 7z2301-x64.msi -o C:\\IntuneApps\\Output",
      },
      {
        id: 3,
        title: "App in Intune hochladen",
        description: "Erstelle die Win32 App im Intune Admin Center.",
        detailedInstructions: [
          "Öffne intune.microsoft.com > Apps > Windows",
          "Klicke Add > Windows app (Win32)",
          "App package file: Wähle die .intunewin Datei",
          "Name: 7-Zip | Publisher: Igor Pavlov",
          "Install: msiexec /i 7z2301-x64.msi /qn",
          "Uninstall: msiexec /x {23170F69-40C1-2702-2301-000001000000} /qn",
        ],
      },
      {
        id: 4,
        title: "Detection Rule konfigurieren",
        description: "Erstelle eine Regel, die prüft ob 7-Zip installiert ist.",
        detailedInstructions: [
          "Detection rules format: Manually configure detection rules",
          "Add > Rule type: File",
          "Path: C:\\Program Files\\7-Zip",
          "File: 7z.exe",
          "Detection method: File or folder exists",
        ],
      },
      {
        id: 5,
        title: "App zuweisen",
        description: "Weise die App einer Testgruppe zu.",
        detailedInstructions: [
          "Gehe zu Assignments",
          "Add group > Required",
          "Wähle deine Pilotgruppe",
          "Klicke Review + create",
        ],
      },
    ],
    validation:
      "Nach 15-30 Minuten sollte 7-Zip auf Testgeräten installiert sein. Prüfe unter Apps > Monitor > App install status.",
  },

  // -------------------------------------------------------------------------
  // 5. CHECKPOINTS
  // -------------------------------------------------------------------------
  checkpoints: [
    {
      questionId: "md102-q-apps-001",
      order: 1,
      introText: "Teste dein Wissen zu App-Typen:",
    },
  ],

  // -------------------------------------------------------------------------
  // 6. EXPLANATION
  // -------------------------------------------------------------------------
  explanation: {
    why: "Automatisiertes App Deployment spart Zeit, reduziert Fehler und stellt sicher, dass alle Geräte die benötigte Software haben. Manuelles Installieren skaliert nicht für Enterprise-Umgebungen.",
    how: "Apps werden in Intune hochgeladen, mit Installationsbefehlen und Detection Rules konfiguriert, und dann Gruppen zugewiesen. Intune verteilt die Apps dann automatisch an die Zielgeräte.",
    deepDive: `
## App Deployment Lifecycle

1. **Packaging**
   - .exe/.msi → Win32 Content Prep Tool → .intunewin
   - Microsoft 365 → Office Deployment Tool (ODT) XML
   - Store Apps → Direkte Verknüpfung

2. **Upload & Konfiguration**
   - App hochladen
   - Metadaten eingeben (Name, Publisher, Version)
   - Install/Uninstall Commands definieren
   - Detection Rules erstellen

3. **Assignment**
   - Gruppen auswählen (Benutzer oder Geräte)
   - Typ wählen (Required/Available/Uninstall)
   - Filter anwenden (optional)

4. **Distribution**
   - Intune pusht App-Informationen zum Gerät
   - Intune Management Extension lädt App herunter
   - Installation erfolgt im SYSTEM-Kontext

5. **Monitoring**
   - Installation Status überwachen
   - Fehler diagnostizieren
   - Updates vorbereiten
    `,
    commonQuestions: [
      {
        question: "Wie lange dauert es, bis eine App installiert wird?",
        answer:
          "Nach Zuweisung: Beim nächsten Sync (Standard alle 8 Stunden). Sofort erzwingen: Company Portal > Sync oder Intune > Devices > Sync.",
      },
      {
        question: "Kann ich Apps auch für macOS und iOS deployen?",
        answer:
          "Ja! Intune unterstützt auch .pkg/.dmg (macOS), .ipa (iOS), und Android Apps. Das Grundprinzip ist ähnlich.",
      },
      {
        question: "Was passiert bei einem Installationsfehler?",
        answer:
          "Intune zeigt den Fehlercode unter Apps > Monitor. Häufige Ursachen: Falsche Detection Rule, fehlende Abhängigkeit, nicht genug Speicherplatz.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. TRANSFER TASK
  // -------------------------------------------------------------------------
  transferTask: {
    title: "Multi-App Deployment planen",
    description: `Du sollst folgende Apps für Contoso deployen:

1. Microsoft Office (Word, Excel, PowerPoint, Outlook)
2. Adobe Acrobat Reader DC (.exe Installer)
3. Zoom Meetings Client (.msi Installer)
4. Windows Terminal (Microsoft Store verfügbar)
5. Eine interne LOB-App (custom .msix)

Erstelle einen Deployment-Plan:
- Welchen App-Typ verwendest du jeweils?
- Required oder Available?
- Welche Gruppen als Ziel?`,
    hints: [
      "Microsoft 365 Apps haben einen eigenen Typ",
      "Überlege, welche Apps JEDER braucht vs. nur manche",
      "Store Apps sind am einfachsten zu verwalten",
    ],
    expectedOutcome: `1. Microsoft Office → Microsoft 365 Apps | Required für alle | All Users
2. Adobe Reader → Win32 (.intunewin) | Required | All Devices
3. Zoom → Win32 (.intunewin) oder LOB | Available | All Users
4. Windows Terminal → Microsoft Store App (New) | Available | IT-Gruppe
5. LOB App → Windows app (LOB) mit .msix | Required | Benutzer der Fachabteilung`,
  },

  // -------------------------------------------------------------------------
  // METADATA
  // -------------------------------------------------------------------------
  topic: "app-deployment",
  track: "md102-applications",
  difficulty: "intermediate",
  estimatedMinutes: 30,
  prerequisites: ["intune-basics", "device-enrollment"],
  relatedModules: ["app-protection-policies", "microsoft-store-apps"],
  skillTags: ["app-deployment", "win32-apps", "intune", "packaging"],
};
