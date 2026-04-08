// ============================================================================
// MD-102 Learning Module: Device Configuration
// ============================================================================
// Topic: Gerätekonfiguration mit Intune Policies
// Track: md102-device-management
// ============================================================================

import type { LearningModule } from "../../types";

export const deviceConfigurationModule: LearningModule = {
  id: "md102-device-configuration",
  slug: "device-configuration",
  title: "Device Configuration Profiles",

  // -------------------------------------------------------------------------
  // 1. REAL-WORLD PROBLEM (Scenario Entry)
  // -------------------------------------------------------------------------
  realWorldProblem: `
    Die Geschäftsführung beschwert sich: "Jeder Mitarbeiter hat andere
    Desktop-Einstellungen, manche haben USB-Sticks erlaubt, andere nicht.
    Das ist ein Sicherheitsrisiko und macht den Support schwierig."
    Wie stellst du sicher, dass alle 200 Windows-Geräte einheitlich
    konfiguriert sind - ohne jeden PC manuell anzufassen?
  `,

  // -------------------------------------------------------------------------
  // 2. CONTEXT (Theory Chunks)
  // -------------------------------------------------------------------------
  context: [
    "Configuration Profiles sind der Nachfolger von Group Policy Objects (GPO) für Cloud-verwaltete Geräte. Sie setzen Einstellungen zentral und erzwingen sie auf den Geräten.",
    "Es gibt verschiedene Profile-Typen: Templates (vordefinierte Kategorien), Settings Catalog (granulare Einzeleinstellungen) und Administrative Templates (ADMX-basiert wie GPO).",
    "Profile werden Gruppen zugewiesen - nicht einzelnen Geräten oder Benutzern. Die Zuweisung über Gruppen ermöglicht skalierbare Verwaltung.",
    "Bei Konflikten zwischen Profiles gewinnt normalerweise die restriktivere Einstellung. Der 'Last Write Wins'-Ansatz kann bei User- vs Device-Zuweisung auftreten.",
  ],

  // -------------------------------------------------------------------------
  // 3. LEARNING BLOCKS (Cognitive Science Based)
  // -------------------------------------------------------------------------
  blocks: [
    // PREDICTION BLOCK
    {
      type: "prediction",
      id: "config-prediction",
      question:
        "Du erstellst ein Configuration Profile das USB-Speicher blockiert und weist es einer Gruppe zu. Ein Benutzer steckt trotzdem einen USB-Stick ein. Was passiert?",
      options: [
        "Windows zeigt eine Warnung, der USB funktioniert aber trotzdem",
        "Der USB-Stick wird sofort blockiert - kein Zugriff möglich",
        "Das Gerät wird als non-compliant markiert",
        "Der Benutzer erhält eine E-Mail-Warnung nach 24 Stunden",
      ],
      correctAnswer:
        "Der USB-Stick wird sofort blockiert - kein Zugriff möglich",
      explanation:
        "Configuration Profiles ERZWINGEN Einstellungen auf dem Gerät. Im Gegensatz zu Compliance (nur prüfen) blockiert das Profile aktiv den USB-Zugriff auf Treiberebene.",
      skillTags: ["config-vs-compliance", "device-restrictions"],
    },

    // SCENARIO BLOCK
    {
      type: "scenario",
      id: "config-scenario",
      title: "Standardisierung der Firmen-PCs",
      description:
        "Du übernimmst die IT einer Firma mit 200 uneinheitlich konfigurierten Windows-PCs.",
      situation:
        "Die aktuelle Situation: Einige PCs erlauben USB, andere nicht. Manche zeigen den Sperrbildschirm nach 5 Minuten, andere nach 30. Kamera und Mikrofon sind überall aktiviert. Die Geschäftsführung will Standardisierung.",
      challenge:
        "Wie gehst du die Standardisierung an ohne den Betrieb zu stören?",
      options: [
        {
          label:
            "Ein großes Profile mit allen 150 Einstellungen auf alle Geräte ausrollen",
          isCorrect: false,
          feedback:
            "Zu riskant! Ein Fehler in einem großen Profile kann alle 200 PCs lahmlegen. Außerdem ist Troubleshooting unmöglich.",
        },
        {
          label:
            "Mehrere fokussierte Profiles erstellen, mit Pilotgruppe testen, schrittweise ausrollen",
          isCorrect: true,
          feedback:
            "Perfekt! Kleine, fokussierte Profiles (Security, Privacy, UX) sind einfacher zu verwalten. Pilotgruppe erkennt Probleme bevor alle betroffen sind.",
        },
        {
          label: "Alle Geräte neu aufsetzen mit einheitlichem Image",
          isCorrect: false,
          feedback:
            "Viel zu aufwändig und disruptiv. Mit Intune kannst du bestehende Geräte remote konfigurieren.",
        },
        {
          label: "Nur neue Geräte standardisieren, alte laufen aus",
          isCorrect: false,
          feedback:
            "Sicherheitsrisiko! Alte Geräte bleiben Jahre im Einsatz. Du brauchst jetzt eine Lösung.",
        },
      ],
      realWorldTip:
        "Best Practice: Erstelle Profiles für Kategorien (Security-Baseline, Privacy, Productivity) und kombiniere sie. So kannst du einzelne Bereiche unabhängig anpassen.",
      skillTags: ["rollout-strategy", "change-management"],
    },

    // CONCEPT BLOCK
    {
      type: "concept",
      id: "profile-types",
      title: "Configuration Profile Typen",
      content: `
        ## Die 3 wichtigsten Profile-Typen

        ### 1. Templates (Vorlagen)
        Vordefinierte Kategorien mit häufig genutzten Einstellungen.

        **Wichtige Templates:**
        - **Device Restrictions**: USB, Kamera, Bluetooth, Screenshot blockieren
        - **Wi-Fi**: WLAN-Profile mit SSID und Sicherheit
        - **VPN**: Always-On VPN, Split-Tunneling
        - **Email**: Exchange ActiveSync, S/MIME
        - **Endpoint Protection**: BitLocker, Firewall, Defender
        - **Device Features**: Kiosk-Modus, Start-Layout

        ### 2. Settings Catalog (Einstellungskatalog)
        Der moderne, granulare Ansatz - die Zukunft der Konfiguration.

        **Vorteile:**
        - Tausende Einzeleinstellungen durchsuchbar
        - Detaillierte Beschreibungen für jede Einstellung
        - Kombiniert Einstellungen aus verschiedenen Kategorien
        - Ersetzt schrittweise alte Templates

        ### 3. Administrative Templates (ADMX)
        GPO-ähnliche Einstellungen für Admins mit On-Prem-Hintergrund.

        **Vorteile:**
        - Bekannte Struktur aus Group Policy Management
        - Über 3000 Windows-Einstellungen
        - ADMX-Dateien von Drittanbietern importierbar (Chrome, Office)
      `,
      keyTakeaways: [
        "Settings Catalog = Empfohlen für neue Konfigurationen",
        "Templates = Schnell für häufige Szenarien",
        "Administrative Templates = Für GPO-erfahrene Admins",
        "Profile können kombiniert werden - eines pro Kategorie",
      ],
      visualAid: {
        type: "diagram",
        description:
          "Profile Hierarchy: Settings Catalog (granular) ← Templates (kategorisiert) ← Administrative Templates (GPO-style)",
      },
      skillTags: ["profile-types", "settings-catalog", "admx"],
    },

    // GUIDED DECISION BLOCK
    {
      type: "guided-decision",
      id: "config-decision",
      title: "Welches Profile für welche Anforderung?",
      scenario:
        "Du musst verschiedene Konfigurationen umsetzen. Wähle den richtigen Profile-Typ.",
      steps: [
        {
          question:
            "Du sollst BitLocker mit spezifischen Verschlüsselungseinstellungen (XTS-AES-256, Recovery Key zu Azure AD) aktivieren.",
          options: [
            { label: "Settings Catalog", isCorrect: false },
            {
              label: "Templates → Endpoint Protection → BitLocker",
              isCorrect: true,
              nextStep: 2,
            },
            { label: "Administrative Templates", isCorrect: false },
          ],
          explanation:
            "Das Endpoint Protection Template für BitLocker bietet alle nötigen Optionen in einer übersichtlichen Oberfläche. Es ist der schnellste Weg für BitLocker-Konfiguration.",
        },
        {
          question:
            "Du möchtest eine sehr spezifische Einstellung setzen: 'DisablePasswordReveal' im Credential Provider.",
          options: [
            {
              label: "Settings Catalog - suche nach der Einstellung",
              isCorrect: true,
              nextStep: 3,
            },
            { label: "Templates - Device Restrictions", isCorrect: false },
            { label: "Custom Profile mit OMA-URI", isCorrect: false },
          ],
          explanation:
            "Der Settings Catalog enthält tausende granulare Einstellungen. Einfach suchen und aktivieren - keine OMA-URI-Kenntnisse nötig.",
        },
        {
          question:
            "Du möchtest Google Chrome Enterprise mit bestimmten Extensions und Startseite konfigurieren.",
          options: [
            { label: "Settings Catalog", isCorrect: false },
            { label: "Templates - App Configuration", isCorrect: false },
            {
              label: "Administrative Templates - Chrome ADMX importieren",
              isCorrect: true,
            },
          ],
          explanation:
            "Für Drittanbieter-Apps wie Chrome kannst du die ADMX-Dateien vom Hersteller importieren und dann wie bei On-Prem GPO konfigurieren.",
        },
      ],
      summary:
        "Kein Profile-Typ ist 'besser' - sie ergänzen sich. Nutze was für deine Anforderung am besten passt.",
      skillTags: ["profile-selection", "best-practices"],
    },

    // PRACTICE BLOCK
    {
      type: "practice",
      id: "config-practice",
      title: "Device Restrictions Profile erstellen",
      instruction:
        "Erstelle ein Security-Baseline Profile das USB und Kamera einschränkt.",
      steps: [
        "Intune Admin Center → Devices → Configuration → + Create → New Policy",
        "Platform: Windows 10 and later",
        "Profile type: Templates",
        "Template name: Device Restrictions → Create",
        "Name: 'Security-Baseline-Restrictions'",
        "General: Camera = Block",
        "Removable Storage: USB Connection = Block",
        "Cloud and Storage: Microsoft Account = Block",
        "Password: Minimum password length = 8",
        "Assignments: Pilotgruppe zuweisen (nicht All Devices!)",
      ],
      hints: [
        "Starte IMMER mit einer Pilotgruppe von 5-10 Test-PCs",
        "Dokumentiere jede Einstellung - warum wurde sie gesetzt?",
        "Block ist endgültig, Not Configured lässt dem Benutzer die Wahl",
      ],
      expectedOutcome:
        "Ein Device Restrictions Profile das Kamera und USB blockiert, auf die Pilotgruppe angewendet.",
      skillTags: ["device-restrictions", "profile-creation"],
    },

    // MISTAKE BLOCK
    {
      type: "mistake",
      id: "config-mistakes",
      title: "Häufige Konfigurationsfehler",
      description: "Diese Fehler führen oft zu Lockouts oder Support-Tickets:",
      mistakes: [
        {
          wrong: "Profile direkt auf 'All Devices' oder 'All Users' anwenden",
          correct: "Erst auf Pilotgruppe testen, dann schrittweise erweitern",
          explanation:
            "Ein fehlerhaftes Profile kann alle Geräte unbrauchbar machen. Mit Pilotgruppe erkennst du Probleme bevor 1000 Tickets ankommen.",
          consequence:
            "200 Mitarbeiter können nicht mehr arbeiten weil USB-Tastaturen blockiert wurden.",
        },
        {
          wrong: "VPN-Profile ohne 'Split Tunneling' aktivieren",
          correct: "Split Tunneling für lokalen Netzwerktraffic aktivieren",
          explanation:
            "Ohne Split Tunneling geht ALLER Traffic über VPN - auch YouTube und Windows Update. Das VPN wird zum Flaschenhals.",
          consequence:
            "VPN-Server überlastet, Internet langsam, Mitarbeiter frustriert.",
        },
        {
          wrong: "Lockscreen-Timeout auf 1 Minute in einer Produktionsumgebung",
          correct:
            "Balance zwischen Sicherheit und Produktivität (z.B. 5-10 Minuten)",
          explanation:
            "Extrem kurze Timeouts nerven Benutzer. Sie finden Workarounds (Maus-Jiggler) oder beschweren sich bei Management.",
          consequence:
            "Mitarbeiter kaufen Maus-Jiggler von Amazon - Sicherheit umgangen.",
        },
        {
          wrong: "Profile mit 100+ Einstellungen in einem Block",
          correct: "Mehrere kleine Profile nach Kategorie (Security, UX, Apps)",
          explanation:
            "Bei Problemen musst du alle 100 Einstellungen durchgehen. Mit separaten Profiles weißt du sofort welche Kategorie das Problem verursacht.",
          consequence:
            "6 Stunden Troubleshooting für ein defektes Printer-Mapping.",
        },
      ],
      skillTags: ["troubleshooting", "best-practices", "testing"],
    },

    // COMPARISON BLOCK
    {
      type: "comparison",
      id: "config-gpo-comparison",
      title: "Intune Profiles vs Group Policy",
      description:
        "Für Admins mit On-Prem-Erfahrung: So vergleichen sich die Konzepte.",
      items: [
        {
          name: "Intune Configuration Profiles",
          characteristics: [
            "Cloud-basiert, kein Domain Controller nötig",
            "Funktioniert überall mit Internetverbindung",
            "Real-time Status und Reporting",
            "Settings Catalog mit Suchfunktion",
            "Integration mit Conditional Access",
            "Mobile Geräte (iOS, Android) mitverwalten",
          ],
        },
        {
          name: "Group Policy Objects (GPO)",
          characteristics: [
            "Benötigt Domain Controller und LAN/VPN",
            "Funktioniert nur im Firmennetzwerk zuverlässig",
            "Schwieriges Reporting (RSOP, GPResult)",
            "'Tausende Einstellungen' schwer zu durchsuchen",
            "Keine CA-Integration",
            "Nur Windows",
          ],
        },
      ],
      keyDifferences: [
        {
          aspect: "Reichweite",
          optionA: "Überall mit Internet",
          optionB: "Nur im Firmennetz",
        },
        {
          aspect: "Gerätetypen",
          optionA: "Windows, iOS, Android, macOS",
          optionB: "Nur Windows (domain-joined)",
        },
        {
          aspect: "Reporting",
          optionA: "Real-time im Portal",
          optionB: "Manuell mit Tools",
        },
        {
          aspect: "Geschwindigkeit",
          optionA: "Push + ~8h Sync",
          optionB: "~90 Min Gruppenrichtlinien-Intervall",
        },
      ],
      recommendation:
        "Für Cloud-first Organisationen: Intune Profiles. Für Hybrid mit viel On-Prem: GPO + Intune für mobile Geräte. Langfristig: Migration zu Intune-only.",
      skillTags: ["gpo-migration", "hybrid-management"],
    },

    // TERMINAL BLOCK
    {
      type: "terminal",
      id: "config-diagnostic",
      title: "Profile-Anwendung diagnostizieren",
      description:
        "Prüfe auf einem Windows-Gerät ob Profiles korrekt angewendet wurden.",
      commands: [
        {
          command: "dsregcmd /status",
          output:
            "+----------------------------------------------------------------------+\n| Device State                                                         |\n+----------------------------------------------------------------------+\n        AzureAdJoined : YES\n     EnterpriseJoined : NO\n         WorkplaceJoined : YES\n          MdmUrl : https://enrollment.manage.microsoft.com/...",
          explanation:
            "Zeigt Azure AD Join Status und MDM-Registrierung. MdmUrl = Intune ist aktiv.",
        },
        {
          command:
            "Get-ChildItem 'HKLM:\\SOFTWARE\\Microsoft\\PolicyManager\\current\\device'",
          output:
            "Hive: HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\PolicyManager\\current\\device\n\nName       Property\n----       --------\nBitLocker  AllowWarningForOtherDiskEncryption : 0\n           EncryptionMethodByDriveType : 7\nCamera     AllowCamera : 0",
          explanation:
            "Zeigt MDM-Policies in der Registry. Hier: BitLocker konfiguriert, Kamera blockiert.",
        },
        {
          command:
            "mdmdiagnosticstool.exe -area DeviceEnrollment -cab c:\\temp\\intune-diag.cab",
          output: "Creating cab file at c:\\temp\\intune-diag.cab...\nDone.",
          explanation:
            "Erstellt Diagnose-Paket für Intune Support. Enthält alle Policy-Details und Logs.",
        },
        {
          command:
            'eventvwr.msc /c:"Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin"',
          output: "(Opens Event Viewer with MDM logs)",
          explanation:
            "Event Log für MDM-Diagnostik. Fehler bei Policy-Anwendung werden hier geloggt.",
        },
      ],
      tips: [
        "dsregcmd /status ist dein erster Check bei Intune-Problemen",
        "Event Log filtere nach 'Error' für schnelle Problemanalyse",
        "Das MDM Diagnostic Tool CAB-File ist Gold wert für Microsoft Support",
      ],
      skillTags: ["troubleshooting", "diagnostics", "registry"],
    },

    // EXAM TRAP BLOCK
    {
      type: "exam-trap",
      id: "config-exam-trap",
      title: "Prüfungsfallen bei Configuration Profiles",
      trapDescription:
        "Microsoft testet gerne Szenarien mit Konflikten zwischen Profiles.",
      commonMistake:
        "Antworten wählen die behaupten 'Profile überschreiben sich gegenseitig vollständig'",
      correctApproach: `
        ## Konfliktregeln verstehen

        1. **Gleiche Einstellung, verschiedene Profile:**
           - Bei Konflikt: Intune zeigt "Conflict" Status
           - Keine Einstellung wird angewendet bis Konflikt gelöst

        2. **User-assigned vs Device-assigned:**
           - Beide können gleichzeitig gelten
           - Bei Konflikt: Geräte-Setting gewinnt meist

        3. **Compliance vs Configuration:**
           - Compliance PRÜFT nur
           - Configuration SETZT die Einstellung
           - Kein Konflikt - unterschiedliche Zwecke

        4. **Priorität bei gleichem Setting:**
           - Settings Catalog > Administrative Template
           - Spezifischere Gruppe > größere Gruppe
      `,
      examPhrasing: [
        "'Two profiles assign different values for the same setting...' → Conflict, neither applied",
        "'You need to configure AND verify BitLocker...' → Configuration Profile + Compliance Policy",
        "'A user-targeted profile conflicts with device-targeted...' → Device usually wins",
        "'Which profile type supports the MOST settings?' → Settings Catalog",
      ],
      skillTags: ["exam-prep", "conflict-resolution", "profile-priority"],
    },

    // SUMMARY BLOCK
    {
      type: "summary",
      id: "config-summary",
      title: "Device Configuration - Zusammenfassung",
      keyPoints: [
        "Configuration Profiles ERZWINGEN Einstellungen (vs Compliance = nur prüfen)",
        "3 Profile-Typen: Templates, Settings Catalog, Administrative Templates",
        "Settings Catalog = Zukunft, granular durchsuchbar",
        "Templates = Schnell für häufige Szenarien (BitLocker, WiFi, VPN)",
        "IMMER erst Pilotgruppe testen bevor 'All Devices'",
        "Bei Konflikt zwischen Profiles: Keine Einstellung angewendet",
        "Kleine fokussierte Profiles > ein großes mit 100 Einstellungen",
      ],
      examRelevance: {
        weight: "40-45%",
        frequentTopics: [
          "Profile-Typen und deren Anwendung",
          "Konfliktauflösung zwischen Profiles",
          "Settings Catalog vs Administrative Templates",
          "Troubleshooting von Profile-Anwendung",
        ],
      },
      nextSteps: [
        "Praktische Übung: Settings Catalog erkunden",
        "Nächstes Thema: Update Management mit Windows Update for Business",
      ],
      skillTags: ["configuration-complete", "exam-prep"],
    },
  ],

  // -------------------------------------------------------------------------
  // 4. LAB SCENARIO (Hands-On Practice)
  // -------------------------------------------------------------------------
  labScenario: {
    slug: "lab-config-profiles",
    title: "Configuration Profiles erstellen und testen",
    description:
      "Erstelle eine Suite von Configuration Profiles für verschiedene Szenarien.",
    environment: "Microsoft 365 E5 Trial Tenant mit Intune und Test-Windows-PC",
    estimatedMinutes: 60,
    steps: [
      {
        id: 1,
        title: "Settings Catalog Profile erstellen",
        description:
          "Konfiguriere Windows-Einstellungen mit dem Settings Catalog",
        detailedInstructions: [
          "Intune → Devices → Configuration → + Create → New Policy",
          "Platform: Windows 10 and later",
          "Profile type: Settings Catalog → Create",
          "Name: 'Security-Settings-Catalog'",
          "Klicke '+ Add settings'",
          "Suche nach 'Require device encryption' → aktiviere es",
          "Suche nach 'Allow camera' → setze auf 'Blocked'",
          "Suche nach 'Password minimum length' → setze auf '8'",
          "Speichern und Pilotgruppe zuweisen",
        ],
        tip: "Der Settings Catalog durchsucht alle Windows-Einstellungen - nutze spezifische Suchbegriffe.",
      },
      {
        id: 2,
        title: "Endpoint Protection Template für BitLocker",
        description: "Aktiviere BitLocker mit dem vorgefertigten Template",
        detailedInstructions: [
          "Devices → Configuration → + Create → New Policy",
          "Platform: Windows 10 and later",
          "Profile type: Templates",
          "Template name: Endpoint Protection → Create",
          "Name: 'BitLocker-Configuration'",
          "Windows Encryption → Encrypt devices = Required",
          "Encryption method = XTS-AES 256-bit",
          "Startup authentication required = Yes, Require TPM and PIN",
          "Recovery options = Backup key to Azure AD",
        ],
        warning:
          "TPM-PIN erfordert zusätzlichen Pre-Boot-Screen. Kommuniziere das an Benutzer!",
      },
      {
        id: 3,
        title: "Administrative Template für Edge-Browser",
        description: "Konfiguriere Microsoft Edge mit ADMX-Einstellungen",
        detailedInstructions: [
          "Devices → Configuration → + Create → New Policy",
          "Platform: Windows 10 and later",
          "Profile type: Templates",
          "Template: Administrative Templates",
          "Computer Configuration → Microsoft Edge",
          "Setze 'Homepage URL' auf 'https://sharepoint.contoso.com'",
          "Setze 'Disable first run experience' = Enabled",
          "Diese Einstellungen kennst du vielleicht von GPO",
        ],
        tip: "Administrative Templates sind ideal für Admins die von GPO kommen - gleiche Struktur.",
      },
      {
        id: 4,
        title: "Profile-Anwendung testen",
        description: "Verifiziere dass Profile auf dem Test-Gerät ankommen",
        detailedInstructions: [
          "Auf dem Test-PC: Settings → Accounts → Access work or school",
          "Klicke auf das Firmenkonto → Info → Sync",
          "Warte 5 Minuten für Policy-Download",
          "Teste: Kamera-App starten → sollte blockiert sein",
          "Öffne PowerShell: dsregcmd /status → MDM-Enrollment prüfen",
          "Check Registry: HKLM:\\SOFTWARE\\Microsoft\\PolicyManager",
        ],
        expectedOutput:
          "Kamera zeigt 'Blocked by organization policy'. Registry zeigt angewendete Policies.",
      },
      {
        id: 5,
        title: "Konflikt simulieren und lösen",
        description: "Verstehe wie Intune mit Konflikten umgeht",
        detailedInstructions: [
          "Erstelle zweites Profile mit Camera = Allow",
          "Weise beide Profile der gleichen Gruppe zu",
          "Warte auf Sync und überprüfe den Status",
          "Intune zeigt 'Conflict' für diese Einstellung",
          "Lösung: Entferne eine der konfligierenden Einstellungen",
          "Oder: Nutze verschiedene Gruppen für verschiedene Policies",
        ],
        warning:
          "Bei Konflikten wird KEINE der Einstellungen angewendet - nicht die 'strengere'!",
      },
    ],
    validation:
      "Settings Catalog, BitLocker Template und Admin Template sind erstellt. Test-Gerät zeigt korrekte Einstellungen. Konflikt wurde erkannt und behoben.",
  },

  // -------------------------------------------------------------------------
  // 5. CHECKPOINTS (Active Recall)
  // -------------------------------------------------------------------------
  checkpoints: [
    {
      questionId: "config-check-1",
      order: 1,
      introText: "Teste dein Wissen über Configuration Profiles:",
    },
    {
      questionId: "config-check-2",
      order: 2,
    },
    {
      questionId: "config-check-3",
      order: 3,
    },
  ],

  // -------------------------------------------------------------------------
  // 6. EXPLANATION (Why & How)
  // -------------------------------------------------------------------------
  explanation: {
    why: `
      Configuration Profiles ermöglichen zentrale, konsistente Geräteverwaltung
      ohne jeden PC anfassen zu müssen. Sie sind der Kern von "Configuration as
      Code" - einmal definiert, automatisch auf tausende Geräte angewendet. Das
      spart Zeit, reduziert Fehler und ermöglicht Compliance-Nachweise.
    `,
    how: `
      Intune überträgt Configuration Profiles als MDM-Policies zum Gerät. Windows
      speichert sie in einer speziellen Registry-Struktur (PolicyManager) und
      wendet sie beim nächsten Policy-Sync an. Die Einstellungen haben Vorrang
      vor lokalen User-Änderungen.
    `,
    deepDive: `
      ## Technical Deep Dive

      ### Policy Delivery Mechanism
      1. Admin erstellt Profile im Intune Portal
      2. Intune kompiliert Einstellungen zu MDM-Payload
      3. Beim nächsten Sync downloaded Gerät die Policy
      4. Windows MDM Client schreibt in PolicyManager Registry
      5. Configuration Service Provider (CSP) setzt System-Einstellungen

      ### Configuration Service Providers (CSPs)
      CSPs sind die "Übersetzer" zwischen MDM-Befehlen und Windows-APIs:
      - **Policy CSP**: Hauptteil der Einstellungen
      - **BitLocker CSP**: Verschlüsselung
      - **PassportForWork CSP**: Windows Hello
      - **Defender CSP**: Microsoft Defender Einstellungen

      ### Sync-Intervalle
      - Standardmäßig alle 8 Stunden
      - Push-Notification bei Policy-Änderung (fast sofort)
      - Manuell über Company Portal oder Settings-App
    `,
    commonQuestions: [
      {
        question: "Warum wird mein Profile nicht angewendet?",
        answer:
          "Prüfe: 1) Ist das Gerät der Gruppe zugewiesen? 2) Hat das Gerät synchronisiert? 3) Gibt es Konflikte? 4) Unterstützt das Gerät diese Einstellung (Edition, Version)?",
      },
      {
        question: "Kann ich Profile für einzelne Geräte statt Gruppen?",
        answer:
          "Nicht direkt empfohlen. Erstelle eine dynamische Azure AD Gruppe mit Regel für den Gerätenamen, dann weise das Profile dieser Gruppe zu.",
      },
      {
        question: "Was passiert wenn ich ein Profile lösche?",
        answer:
          "Die Einstellungen werden auf 'Nicht konfiguriert' zurückgesetzt. Das bedeutet meist: User kann wieder selbst ändern, aber bestehende Werte bleiben eventuell gesetzt.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. TRANSFER TASK (Apply Knowledge)
  // -------------------------------------------------------------------------
  transferTask: {
    title: "Configuration Baseline für deine Organisation",
    description: `
      Entwickle eine Configuration Profile Strategie:

      1. Liste die Top 10 Einstellungen die du standardisieren möchtest
      2. Kategorisiere sie: Security, Productivity, Privacy, UX
      3. Erstelle einen Plan für separate Profiles pro Kategorie
      4. Definiere Testgruppen für Pilotierung
      5. Beschreibe den Rollout-Plan (Woche 1 → Pilot, Woche 2 → IT, Woche 3 → All)

      Bonus: Welche Einstellungen sollten NICHT über Intune erzwungen werden?
    `,
    expectedOutcome:
      "Ein dokumentierter Plan mit kategorisierten Profiles und phasiertem Rollout.",
    hints: [
      "Sicherheits-kritische Settings zuerst (BitLocker, Passwort)",
      "UX-Settings wie Wallpaper sind nice-to-have, nicht kritisch",
      "Manche Settings frustrieren Poweruser - Ausnahmen definieren",
      "Dokumentiere WARUM jedes Setting gewählt wurde - für Audits",
    ],
  },

  // -------------------------------------------------------------------------
  // METADATA
  // -------------------------------------------------------------------------
  topic: "device-config",
  track: "md102-device-management",
  difficulty: "intermediate",
  estimatedMinutes: 60,
  prerequisites: ["device-enrollment", "intune-intro"],
  relatedModules: [
    "compliance-policies",
    "update-management",
    "endpoint-security",
  ],
  skillTags: [
    "configuration",
    "settings-catalog",
    "administrative-templates",
    "device-restrictions",
    "bitlocker",
    "policy-management",
  ],
};

export default deviceConfigurationModule;
