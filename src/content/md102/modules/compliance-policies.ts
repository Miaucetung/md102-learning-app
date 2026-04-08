// ============================================================================
// MD-102 Learning Module: Compliance Policies
// ============================================================================
// Topic: Gerätecompliance definieren und durchsetzen
// Track: md102-identity
// ============================================================================

import type { LearningModule } from "../../types";

export const compliancePoliciesModule: LearningModule = {
  id: "md102-compliance-policies",
  slug: "compliance-policies",
  title: "Compliance Policies in Microsoft Intune",

  // -------------------------------------------------------------------------
  // 1. REAL-WORLD PROBLEM (Scenario Entry)
  // -------------------------------------------------------------------------
  realWorldProblem: `
    Ein Mitarbeiter meldet sich bei der IT: "Ich kann plötzlich nicht mehr
    auf meine E-Mails zugreifen - es steht da 'Gerät nicht compliant'."
    Du schaust nach und siehst: Sein Laptop hat seit 60 Tagen kein Windows
    Update bekommen und BitLocker ist deaktiviert. Wie stellst du sicher,
    dass alle Geräte den Sicherheitsanforderungen entsprechen?
  `,

  // -------------------------------------------------------------------------
  // 2. CONTEXT (Theory Chunks)
  // -------------------------------------------------------------------------
  context: [
    "Compliance Policies definieren Mindestanforderungen an Geräte. Ein 'compliant' Gerät erfüllt alle Regeln wie OS-Version, Verschlüsselung und Passwort-Anforderungen.",
    "Compliance arbeitet mit Conditional Access zusammen: Nur compliant Geräte erhalten Zugriff auf geschützte Ressourcen wie Exchange, SharePoint oder Teams.",
    "Non-compliance kann Aktionen auslösen: E-Mail-Benachrichtigung an den Benutzer, Markierung als non-compliant, oder vollständige Sperrung nach einer Grace Period.",
    "Jede Plattform (Windows, iOS, Android) hat eigene Compliance-Einstellungen. Windows kann z.B. BitLocker und Antivirus prüfen, iOS prüft Jailbreak-Status.",
  ],

  // -------------------------------------------------------------------------
  // 3. LEARNING BLOCKS (Cognitive Science Based)
  // -------------------------------------------------------------------------
  blocks: [
    // PREDICTION BLOCK
    {
      type: "prediction",
      id: "compliance-prediction",
      question:
        "Du erstellst eine Compliance Policy die BitLocker-Verschlüsselung fordert. Ein Laptop ohne BitLocker ist bereits bei Intune registriert. Was passiert sofort nach der Policy-Zuweisung?",
      options: [
        "BitLocker wird automatisch aktiviert",
        "Das Gerät wird sofort als non-compliant markiert",
        "Intune wartet 24 Stunden und markiert dann als non-compliant",
        "Der Benutzer erhält eine Warnung, das Gerät bleibt compliant",
      ],
      correctAnswer: "Das Gerät wird sofort als non-compliant markiert",
      explanation:
        "Compliance Policies PRÜFEN nur - sie ERZWINGEN nichts. Wenn du BitLocker aktivieren willst, brauchst du eine Configuration Policy. Die Compliance Policy markiert das Gerät nur als non-compliant.",
      skillTags: ["compliance-basics", "compliance-vs-configuration"],
    },

    // SCENARIO BLOCK
    {
      type: "scenario",
      id: "compliance-scenario",
      title: "Sicherheitsvorfall durch ungesichertes Gerät",
      description:
        "Ein Manager verliert seinen Laptop im Zug. Der Laptop enthält sensible Kundendaten.",
      situation:
        "Nach dem Vorfall stellt sich heraus: BitLocker war nicht aktiviert, das Windows-Passwort war '1234', und der letzte Sicherheitsscan war vor 3 Monaten. Die Geschäftsführung verlangt sofortige Maßnahmen.",
      challenge:
        "Welche Compliance-Einstellungen sind SOFORT priorisiert einzuführen?",
      options: [
        {
          label: "Nur BitLocker fordern - Verschlüsselung ist das Wichtigste",
          isCorrect: false,
          feedback:
            "BitLocker allein reicht nicht. Ein schwaches Passwort umgeht die Verschlüsselung.",
        },
        {
          label:
            "BitLocker + Starkes Passwort + Aktuelles Antivirus + OS-Updates",
          isCorrect: true,
          feedback:
            "Richtig! Diese Kombination bildet die Basis. Verschlüsselung schützt bei Verlust, starkes Passwort verhindert einfachen Zugriff, Antivirus und Updates schließen bekannte Sicherheitslücken.",
        },
        {
          label:
            "Komplexe Passwörter reichen - wenn niemand reinkommt ist alles sicher",
          isCorrect: false,
          feedback:
            "Falsch. Ohne Verschlüsselung kann die Festplatte ausgebaut und direkt gelesen werden - Passwort egal.",
        },
        {
          label: "Alle Einstellungen auf Maximum - je strenger desto sicherer",
          isCorrect: false,
          feedback:
            "Zu strenge Policies führen zu Frust und Workarounds. Balance zwischen Sicherheit und Usability finden.",
        },
      ],
      realWorldTip:
        "Eine typische Baseline-Compliance für Windows: BitLocker, Passwort min. 8 Zeichen, Windows Update nicht älter als 30 Tage, Antivirus aktiv, Firewall aktiviert.",
      skillTags: ["compliance-baseline", "security-requirements"],
    },

    // CONCEPT BLOCK
    {
      type: "concept",
      id: "compliance-settings",
      title: "Compliance-Einstellungen für Windows",
      content: `
        ## Windows Compliance Policy Kategorien

        ### Device Health (Gerätegesundheit)
        - **BitLocker required**: Systemlaufwerk muss verschlüsselt sein
        - **Secure Boot enabled**: UEFI Secure Boot aktiviert
        - **Code integrity enabled**: Kernel-Codeintegritätsprüfung
        - **TPM required**: Trusted Platform Module 2.0 vorhanden

        ### Device Properties (Geräteeigenschaften)
        - **Minimum OS version**: z.B. 10.0.19041.0 für Windows 10 20H1
        - **Maximum OS version**: Verhindert zu neue/ungetestete Versionen
        - **OS Build range**: Spezifische Build-Nummern erlauben

        ### System Security (Systemsicherheit)
        - **Password required**: Passwort zum Entsperren
        - **Password complexity**: Simple/Alphanumeric/Complex
        - **Minimum password length**: Zeichenanzahl (empfohlen: 8+)
        - **Password expiration**: Ablaufdatum (moderne Empfehlung: KEIN Ablauf!)

        ### Defender ATP
        - **Require Defender Antimalware**: Microsoft Defender aktiv
        - **Real-time protection**: Echtzeitschutz eingeschaltet
        - **Defender ATP machine risk score**: Integration mit Defender for Endpoint
      `,
      keyTakeaways: [
        "Compliance = Nur Prüfung, keine Erzwingung",
        "BitLocker und TPM sind Basis für Gerätesicherheit",
        "Password Expiration ist veraltet - NIST empfiehlt keine Rotation mehr",
        "Defender ATP Score ermöglicht risikobasierte Compliance",
      ],
      visualAid: {
        type: "diagram",
        description:
          "Compliance Flow: Policy → Evaluation → Compliant/Non-Compliant → Actions → Conditional Access Decision",
      },
      skillTags: ["compliance-settings", "windows-security", "bitlocker"],
    },

    // GUIDED DECISION BLOCK
    {
      type: "guided-decision",
      id: "compliance-actions",
      title: "Non-Compliance Actions verstehen",
      scenario:
        "Du konfigurierst was passiert wenn ein Gerät nicht compliant ist.",
      steps: [
        {
          question:
            "Ein Gerät ist seit 1 Tag non-compliant (Windows Update fehlt). Was sollte passieren?",
          options: [
            {
              label: "Sofort alle Zugriffe sperren",
              isCorrect: false,
            },
            {
              label: "E-Mail an Benutzer senden mit Anleitung zum Update",
              isCorrect: true,
              nextStep: 2,
            },
            {
              label: "Nichts - 1 Tag ist nicht schlimm",
              isCorrect: false,
            },
          ],
          explanation:
            "Benutzer verdienen eine faire Chance das Problem zu beheben. Eine freundliche E-Mail mit Anleitung ist der erste Schritt.",
        },
        {
          question:
            "Das Gerät ist jetzt seit 7 Tagen non-compliant. Der Benutzer hat die E-Mail ignoriert.",
          options: [
            {
              label:
                "Als non-compliant markieren → Conditional Access blockiert",
              isCorrect: true,
              nextStep: 3,
            },
            {
              label: "Noch eine E-Mail senden",
              isCorrect: false,
            },
            {
              label: "Gerät remote löschen",
              isCorrect: false,
            },
          ],
          explanation:
            "Nach der Grace Period wird das Gerät als non-compliant markiert. Conditional Access blockiert dann automatisch den Zugriff auf geschützte Ressourcen.",
        },
        {
          question:
            "Das Gerät ist seit 30 Tagen non-compliant und der Mitarbeiter ist im Urlaub. Wie gehst du vor?",
          options: [
            {
              label: "Abwarten bis Mitarbeiter zurück ist",
              isCorrect: false,
            },
            {
              label: "Remote Wipe durchführen",
              isCorrect: false,
            },
            {
              label:
                "Gerät bleibt gesperrt, Mitarbeiter kontaktiert IT bei Rückkehr",
              isCorrect: true,
            },
          ],
          explanation:
            "Das Gerät bleibt gesperrt aber wird nicht gelöscht. Bei Rückkehr kann der Mitarbeiter das Update durchführen und Compliance wiederherstellen.",
        },
      ],
      summary:
        "Non-Compliance Actions sollten eskalieren: Erst informieren, dann warnen, dann blockieren. Remote Wipe nur bei Verlust/Diebstahl.",
      skillTags: ["non-compliance-actions", "grace-period", "escalation"],
    },

    // PRACTICE BLOCK
    {
      type: "practice",
      id: "compliance-practice",
      title: "Windows Compliance Policy erstellen",
      instruction:
        "Erstelle eine Baseline-Compliance Policy für Windows-Firmengeräte.",
      steps: [
        "Öffne intune.microsoft.com",
        "Gehe zu Devices → Compliance → Policies → + Create Policy",
        "Wähle Platform: Windows 10 and later",
        "Profile type: Windows 10/11 compliance policy → Create",
        "Name: 'Corporate-Windows-Baseline'",
        "Device Health: BitLocker required = Yes",
        "System Security: Password required = Yes, Minimum length = 8",
        "Microsoft Defender: Require Defender Antimalware = Yes",
        "Actions for noncompliance: Send email (Day 0), Mark non-compliant (Day 3)",
        "Assignments: Gruppe 'All Corporate Windows Devices'",
      ],
      hints: [
        "Beginne mit wenigen kritischen Einstellungen und erweitere später",
        "Teste neue Policies immer erst mit einer Pilotgruppe",
        "Dokumentiere die Grace Period im Benutzerhandbuch",
      ],
      expectedOutcome:
        "Eine Compliance Policy die BitLocker, Passwort und Antivirus prüft mit 3-Tage Grace Period.",
      skillTags: ["policy-creation", "intune-admin-center"],
    },

    // MISTAKE BLOCK
    {
      type: "mistake",
      id: "compliance-mistakes",
      title: "Häufige Compliance-Fehler",
      description:
        "Diese Fehler führen oft zu Support-Tickets oder Sicherheitslücken:",
      mistakes: [
        {
          wrong:
            "Compliance Policy erstellt aber keine Conditional Access Policy",
          correct:
            "Compliance Policy + Conditional Access Policy zusammen konfigurieren",
          explanation:
            "Ohne Conditional Access hat non-compliance keine Konsequenzen. Das Gerät wird nur markiert aber nicht blockiert.",
          consequence:
            "Mitarbeiter ignorieren die 'Non-Compliant' Warnung weil nichts passiert.",
        },
        {
          wrong:
            "Minimum OS Version auf die neueste Version gesetzt (z.B. Windows 11 23H2)",
          correct:
            "OS Version mit Bedacht wählen - nicht jedes Gerät kann sofort updaten",
          explanation:
            "Hardware-Kompatibilität, Treiber-Probleme oder langsame Rollouts können Updates verzögern. Zu aggressive OS-Anforderungen sperren legitime Geräte aus.",
          consequence:
            "50% der Geräte werden nach Windows-Update non-compliant weil sie das neue OS noch nicht haben.",
        },
        {
          wrong: "Grace Period auf 0 Tage gesetzt für sofortige Compliance",
          correct: "Mindestens 1-3 Tage Grace Period für neue Policies",
          explanation:
            "Geräte synchronisieren nicht sofort. Eine Grace Period gibt Zeit für Policy-Download und Benutzer-Reaktion.",
          consequence:
            "Massenhafte Lockouts nach Policy-Deployment, Helpdesk überlastet.",
        },
        {
          wrong: "Eine riesige Policy mit 50 Einstellungen",
          correct: "Mehrere fokussierte Policies: Baseline, Security, Premium",
          explanation:
            "Kleinere Policies sind einfacher zu troubleshooten. Bei Problemen weißt du genau welche Policy die Ursache ist.",
          consequence:
            "Debugging unmöglich wenn alle Einstellungen in einer Policy sind.",
        },
      ],
      skillTags: [
        "troubleshooting",
        "policy-design",
        "conditional-access-integration",
      ],
    },

    // COMPARISON BLOCK
    {
      type: "comparison",
      id: "compliance-vs-config",
      title: "Compliance Policy vs Configuration Profile",
      description:
        "Der wichtigste Unterschied den viele Anfänger nicht verstehen:",
      items: [
        {
          name: "Compliance Policy",
          characteristics: [
            "PRÜFT ob Einstellung vorhanden ist",
            "Markiert Gerät als compliant/non-compliant",
            "Kann keine Einstellungen ÄNDERN",
            "Arbeitet mit Conditional Access zusammen",
            "Beispiel: 'BitLocker muss aktiv sein'",
          ],
        },
        {
          name: "Configuration Profile",
          characteristics: [
            "SETZT Einstellungen auf dem Gerät",
            "Zwingt Konfiguration durch",
            "Ändert tatsächlich Geräteeinstellungen",
            "Keine direkte CA-Integration",
            "Beispiel: 'Aktiviere BitLocker mit XTS-AES-256'",
          ],
        },
      ],
      keyDifferences: [
        {
          aspect: "Funktion",
          optionA: "Prüfen & Reporten",
          optionB: "Konfigurieren & Erzwingen",
        },
        {
          aspect: "Aktion bei Abweichung",
          optionA: "Non-compliant markieren",
          optionB: "Einstellung automatisch setzen",
        },
        {
          aspect: "Conditional Access",
          optionA: "Ja, direkte Integration",
          optionB: "Nein, keine direkte Integration",
        },
        {
          aspect: "Typischer Use Case",
          optionA: "Zugangskontrolle",
          optionB: "Standardisierung",
        },
      ],
      recommendation:
        "Für die meisten Einstellungen: ERST Configuration Profile (erzwingen), DANN Compliance Policy (prüfen). So wird die Einstellung gesetzt UND bei Manipulation erkannt.",
      skillTags: ["compliance-vs-config", "policy-types"],
    },

    // TERMINAL BLOCK
    {
      type: "terminal",
      id: "compliance-powershell",
      title: "Compliance-Status per PowerShell prüfen",
      description:
        "Nutze Microsoft Graph PowerShell um Compliance-Status zu analysieren.",
      commands: [
        {
          command: "Install-Module Microsoft.Graph -Scope CurrentUser",
          output: "Installing module...",
          explanation: "Graph PowerShell Modul installieren",
        },
        {
          command:
            'Connect-MgGraph -Scopes "DeviceManagementManagedDevices.Read.All"',
          output: "Welcome to Microsoft Graph!",
          explanation: "Mit Microsoft Graph verbinden",
        },
        {
          command:
            'Get-MgDeviceManagementManagedDevice | Select-Object DeviceName, ComplianceState | Where-Object { $_.ComplianceState -eq "noncompliant" }',
          output:
            "DeviceName      ComplianceState\n----------      ---------------\nLAPTOP-SALES01  noncompliant\nPC-MARKETING02  noncompliant",
          explanation: "Alle non-compliant Geräte auflisten",
        },
        {
          command:
            "Get-MgDeviceManagementManagedDevice -Filter \"deviceName eq 'LAPTOP-SALES01'\" | Select-Object -ExpandProperty DeviceCompliancePolicyStates",
          output: "Shows which specific policy is causing non-compliance",
          explanation:
            "Details zur fehlgeschlagenen Policy für ein Gerät anzeigen",
        },
      ],
      tips: [
        "Graph PowerShell ersetzt das alte AzureAD Modul",
        "Für Automatisierung: App Registration mit Application Permissions",
        "Export nach CSV für Compliance-Reports an Management",
      ],
      skillTags: ["powershell", "graph-api", "reporting"],
    },

    // EXAM TRAP BLOCK
    {
      type: "exam-trap",
      id: "compliance-exam-trap",
      title: "Prüfungsfallen bei Compliance",
      trapDescription:
        "Microsoft testet gerne das Verständnis von Compliance vs Configuration.",
      commonMistake:
        "Compliance Policy als Lösung wählen um eine Einstellung ZU ERZWINGEN",
      correctApproach: `
        Merke dir diese Eselsbrücke:

        - Will Force (erzwingen) → **Configuration** Profile
        - Will Check (prüfen) → **Compliance** Policy

        Prüfungsfrage: "Ensure all devices HAVE BitLocker enabled"
        → Configuration Profile (setzt BitLocker)

        Prüfungsfrage: "Block access if BitLocker is NOT enabled"
        → Compliance Policy + Conditional Access (prüft und blockiert)
      `,
      examPhrasing: [
        "'You need to REQUIRE...' mit der Lösung 'Compliance Policy' → FALSCH (Compliance erzwingt nichts)",
        "'Users should be BLOCKED if...' → Compliance Policy + Conditional Access",
        "'Devices must BE CONFIGURED with...' → Configuration Profile",
        "'You need to REPORT on...' → Compliance Policy (für Reporting)",
      ],
      skillTags: ["exam-prep", "policy-differentiation"],
    },

    // SUMMARY BLOCK
    {
      type: "summary",
      id: "compliance-summary",
      title: "Compliance Policies - Zusammenfassung",
      keyPoints: [
        "Compliance Policies PRÜFEN Geräte - sie KONFIGURIEREN nicht",
        "Wichtige Windows-Checks: BitLocker, Passwort, Antivirus, OS-Version",
        "Non-Compliance Actions eskalieren: Email → Mark non-compliant → Block",
        "Grace Period gibt Benutzern Zeit zur Korrektur (empfohlen: 1-7 Tage)",
        "Ohne Conditional Access hat non-compliance keine echten Konsequenzen",
        "Configuration Profile + Compliance Policy = Erzwingen UND Prüfen",
      ],
      examRelevance: {
        weight: "15-20%",
        frequentTopics: [
          "Unterschied Compliance vs Configuration",
          "Non-Compliance Actions konfigurieren",
          "Integration mit Conditional Access",
          "Platform-spezifische Compliance-Einstellungen",
        ],
      },
      nextSteps: [
        "Praktische Übung: Compliance + Conditional Access kombinieren",
        "Nächstes Thema: Device Configuration Profiles",
      ],
      skillTags: ["compliance-complete", "exam-prep"],
    },
  ],

  // -------------------------------------------------------------------------
  // 4. LAB SCENARIO (Hands-On Practice)
  // -------------------------------------------------------------------------
  labScenario: {
    slug: "lab-compliance-setup",
    title: "Compliance-Umgebung aufbauen",
    description:
      "Erstelle ein vollständiges Compliance-Setup mit Policy, Actions und Conditional Access.",
    environment: "Microsoft 365 E5 Trial Tenant mit Intune",
    estimatedMinutes: 60,
    steps: [
      {
        id: 1,
        title: "Compliance Policy erstellen",
        description:
          "Erstelle eine Windows Compliance Policy mit Basisanforderungen",
        detailedInstructions: [
          "Intune Admin Center → Devices → Compliance → + Create Policy",
          "Platform: Windows 10 and later",
          "Name: 'Win-Baseline-Compliance'",
          "Device Health: BitLocker = Required",
          "System Security: Password required = Yes, Min length = 8",
          "Defender: Require Antimalware = Yes",
        ],
        tip: "Beginne mit wenigen kritischen Einstellungen - erweitern kannst du später.",
      },
      {
        id: 2,
        title: "Non-Compliance Actions konfigurieren",
        description: "Definiere was bei non-compliance passiert",
        detailedInstructions: [
          "In der Policy → Actions for noncompliance",
          "Action 1: Send email to end user (Schedule: 0 days)",
          "Action 2: Mark device noncompliant (Schedule: 3 days)",
          "Action 3: Retire the noncompliant device (Schedule: 30 days) - OPTIONAL",
        ],
        warning:
          "'Retire' löscht Firmendaten vom Gerät - nur für extreme Fälle geeignet.",
      },
      {
        id: 3,
        title: "E-Mail-Vorlage anpassen",
        description: "Erstelle eine benutzerfreundliche Benachrichtigung",
        detailedInstructions: [
          "Gehe zu Tenant administration → Customization → Company Portal",
          "Oder in der Policy: Notification message template",
          "Erstelle freundliche Nachricht mit konkreten Anweisungen",
          "Beispiel: 'Ihr Gerät erfüllt nicht die Sicherheitsanforderungen...'",
        ],
        tip: "Gib konkrete Schritte zur Behebung an, nicht nur 'Kontaktiere IT'.",
      },
      {
        id: 4,
        title: "Conditional Access Policy erstellen",
        description: "Blockiere non-compliant Geräte in Azure AD",
        detailedInstructions: [
          "Entra Admin Center → Protection → Conditional Access → + New policy",
          "Name: 'Require Compliant Device'",
          "Users: All users (oder spezifische Gruppe für Test)",
          "Cloud apps: All cloud apps (oder nur Office 365)",
          "Conditions: Device platforms = Windows",
          "Grant: Require device to be marked as compliant",
          "Enable policy: Report-only (zum Testen)",
        ],
        warning:
          "IMMER erst im Report-only Modus testen! Sonst sperrst du dich selbst aus.",
      },
      {
        id: 5,
        title: "Testen und Validieren",
        description: "Verifiziere dass Compliance und CA zusammenarbeiten",
        detailedInstructions: [
          "Auf einem Test-Gerät: BitLocker deaktivieren (für Test)",
          "Warte auf Sync oder manuell: Settings → Accounts → Access work → Info → Sync",
          "Prüfe Compliance-Status im Company Portal",
          "Versuche auf Office 365 zuzugreifen",
          "Im CA Report-only: Prüfe ob Zugriff blockiert WÜRDE",
          "Nach Test: BitLocker wieder aktivieren, Policy auf 'On' setzen",
        ],
        expectedOutput:
          "Im Report-only Log: 'Access would be blocked' für non-compliant Gerät.",
      },
    ],
    validation:
      "Compliance Policy zeigt Geräte als compliant/non-compliant. CA Policy im Report-only zeigt korrekte Block-Entscheidungen.",
  },

  // -------------------------------------------------------------------------
  // 5. CHECKPOINTS (Active Recall)
  // -------------------------------------------------------------------------
  checkpoints: [
    {
      questionId: "compliance-check-1",
      order: 1,
      introText: "Teste dein Wissen über Compliance Policies:",
    },
    {
      questionId: "compliance-check-2",
      order: 2,
    },
    {
      questionId: "compliance-check-3",
      order: 3,
    },
  ],

  // -------------------------------------------------------------------------
  // 6. EXPLANATION (Why & How)
  // -------------------------------------------------------------------------
  explanation: {
    why: `
      Compliance Policies sind der Kern von Zero Trust Security. Statt blind
      jedem Gerät zu vertrauen, wird bei jedem Zugriff geprüft: Erfüllt das
      Gerät die Mindestanforderungen? Ist es verschlüsselt? Hat es aktuelle
      Updates? Nur wenn ja, erfolgt der Zugriff.
    `,
    how: `
      Intune evaluiert regelmäßig alle zugewiesenen Compliance Policies gegen
      die tatsächlichen Geräteeinstellungen. Das Ergebnis (compliant/non-compliant)
      wird an Azure AD gemeldet. Conditional Access fragt bei jedem Zugriff
      Azure AD: "Ist dieses Gerät compliant?" und entscheidet dann.
    `,
    deepDive: `
      ## Compliance Evaluation im Detail

      ### Evaluation Cycle
      - Standardmäßig alle 8 Stunden
      - Manuell über Company Portal oder Settings-App
      - Bei Check-In nach Device Restart

      ### Compliance State Machine
      1. **Unknown** → Gerät nie evaluiert
      2. **Pending** → Evaluation läuft
      3. **Compliant** → Alle Policies erfüllt
      4. **Non-compliant** → Mindestens eine Policy verletzt
      5. **In Grace Period** → Non-compliant aber noch in Toleranzzeit
      6. **Error** → Evaluation fehlgeschlagen

      ### Integration mit Defender for Endpoint
      - Machine Risk Score als Compliance-Kriterium
      - Geräte mit hohem Risiko-Score werden non-compliant
      - Automatische Reaktion auf Bedrohungen
    `,
    commonQuestions: [
      {
        question: "Warum wird mein Gerät ständig non-compliant?",
        answer:
          "Prüfe den Compliance-Report in Intune: Devices → [Gerät] → Device compliance. Dort siehst du genau welche Einstellung fehlschlägt.",
      },
      {
        question: "Kann ich Compliance Exceptions erstellen?",
        answer:
          "Nicht direkt für einzelne Geräte. Aber du kannst Gruppen von der Policy ausschließen oder eine weniger strenge Policy für bestimmte Gruppen erstellen.",
      },
      {
        question:
          "Was ist der Unterschied zwischen 'Mark non-compliant' und 'Retire'?",
        answer:
          "Mark non-compliant ändert nur den Status - CA kann blockieren. Retire löscht alle Firmendaten vom Gerät (Selective Wipe) - viel aggressiver.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. TRANSFER TASK (Apply Knowledge)
  // -------------------------------------------------------------------------
  transferTask: {
    title: "Compliance-Strategie für sensible Daten",
    description: `
      Dein Unternehmen verarbeitet Gesundheitsdaten (HIPAA/DSGVO relevant).
      Entwickle eine Compliance-Strategie:

      1. Welche Compliance-Anforderungen sind für Gesundheitsdaten KRITISCH?
      2. Wie streng sollte die Grace Period sein?
      3. Welche Non-Compliance Actions sind angemessen?
      4. Wie kommunizierst du die Anforderungen an Mitarbeiter?
      5. Wie dokumentierst du Compliance für Audits?

      Erstelle einen kurzen Plan mit konkreten Einstellungen.
    `,
    expectedOutcome:
      "Ein dokumentierter Compliance-Plan für sensible Daten mit strengeren Anforderungen (z.B. 256-bit Encryption, kürzere Grace Period).",
    hints: [
      "Bei Gesundheitsdaten: Keine Kompromisse bei Verschlüsselung",
      "Dokumentation ist bei regulierten Branchen genauso wichtig wie die technische Umsetzung",
      "Denke an Audit-Logs und Compliance-Reports für Behörden",
    ],
  },

  // -------------------------------------------------------------------------
  // METADATA
  // -------------------------------------------------------------------------
  topic: "compliance",
  track: "md102-identity",
  difficulty: "intermediate",
  estimatedMinutes: 50,
  prerequisites: ["device-enrollment", "conditional-access-basics"],
  relatedModules: [
    "device-configuration",
    "conditional-access",
    "defender-endpoint",
  ],
  skillTags: [
    "compliance",
    "conditional-access",
    "security",
    "bitlocker",
    "windows-security",
    "policy-management",
  ],
};

export default compliancePoliciesModule;
