// ============================================================================
// MD-102 Learning Module: Windows Autopilot
// ============================================================================
// Gold Standard Learning Format following cognitive science principles
// ============================================================================

import type { LearningModule } from "@/content/types";

export const autopilotModule: LearningModule = {
  id: "md102-mod-autopilot",
  slug: "windows-autopilot",
  title: "Windows Autopilot - Zero-Touch Deployment",

  // -------------------------------------------------------------------------
  // 1. REAL-WORLD PROBLEM (The Hook)
  // -------------------------------------------------------------------------
  realWorldProblem:
    "Dein Unternehmen bestellt 500 neue Laptops für Remote-Mitarbeiter. Die IT hat keinen physischen Zugriff auf die Geräte vor der Auslieferung. Wie kannst du sicherstellen, dass die Geräte sofort einsatzbereit sind, wenn sie beim Mitarbeiter ankommen?",

  // -------------------------------------------------------------------------
  // 2. CONTEXT (Theory Chunks)
  // -------------------------------------------------------------------------
  context: [
    "Windows Autopilot ist Microsofts Zero-Touch Deployment-Lösung. Sie nutzt das vorinstallierte Windows vom Gerätehersteller und konfiguriert es automatisch mit Unternehmenseinstellungen. Keine Images, keine USB-Sticks, keine manuelle Einrichtung.",
    "Der Hardware Hash ist eine eindeutige Geräte-ID (4KB), berechnet aus Mainboard, BIOS, TPM und anderen Komponenten. Er wird zu Intune hochgeladen und identifiziert das Gerät beim ersten Start.",
    "Es gibt drei Deployment Modi: User-Driven (Benutzer meldet sich an), Self-Deploying (vollautomatisch für Kiosk/Shared), und Pre-provisioning (IT richtet vorab ein).",
    "TPM 2.0 ist NUR für Self-Deploying Mode erforderlich. User-Driven funktioniert auch mit älteren TPMs oder sogar ohne TPM.",
  ],

  // -------------------------------------------------------------------------
  // 3. LEARNING BLOCKS (Interactive)
  // -------------------------------------------------------------------------
  blocks: [
    // PREDICTION BLOCK
    {
      type: "prediction",
      question:
        "Ein neuer Laptop wird eingeschaltet und zeigt den OOBE-Screen. Was passiert, wenn Windows Autopilot konfiguriert ist?",
      options: [
        "Windows wird komplett neu installiert wie bei einem traditionellen Image",
        "Das vorinstallierte Windows wird automatisch mit Unternehmenseinstellungen konfiguriert",
        "Der Benutzer muss zuerst einen USB-Stick mit dem Autopilot-Agent einstecken",
        "IT muss sich remote auf das Gerät verbinden und die Einrichtung durchführen",
      ],
      correctAnswer:
        "Das vorinstallierte Windows wird automatisch mit Unternehmenseinstellungen konfiguriert",
      explanation:
        "Autopilot nutzt das bereits installierte Windows vom OEM. Beim ersten Start erkennt Windows anhand des Hardware-Hashes, dass es zu einem Autopilot-Tenant gehört, und lädt automatisch das Deployment Profile herunter.",
      skillTags: ["autopilot", "deployment"],
    },

    // SCENARIO BLOCK
    {
      type: "scenario",
      title: "Remote-Deployment bei Contoso",
      description:
        "Als Endpoint Administrator bei Contoso musst du einen Deployment-Prozess für Remote-Mitarbeiter implementieren.",
      situation:
        "Das Unternehmen hat 500 neue Dell Laptops bestellt, die an Remote-Mitarbeiter geliefert werden sollen. Die Geschäftsführung erwartet, dass die Mitarbeiter ihre Geräte sofort nutzen können.",
      challenge:
        "Die IT hat keinen physischen Zugriff auf die Geräte vor Auslieferung. Wie stellst du sicher, dass alle Unternehmens-Apps installiert sind und die Geräte compliant sind?",
      options: [
        {
          label:
            "Traditional Imaging: Geräte an IT liefern, imagen, dann an Mitarbeiter versenden",
          isCorrect: false,
          feedback:
            "Zu zeitaufwändig und teuer. Die IT müsste 500 Geräte physisch bearbeiten, was Wochen dauern würde.",
        },
        {
          label:
            "Windows Autopilot: Dell registriert Geräte direkt, Mitarbeiter erhält fertiges Gerät",
          isCorrect: true,
          feedback:
            "Korrekt! Dell kann Hardware Hashes bei der Bestellung zu Intune hochladen. Das Gerät konfiguriert sich beim ersten Start automatisch.",
        },
        {
          label:
            "Remote Desktop: IT nimmt Geräte remote über und installiert alles manuell",
          isCorrect: false,
          feedback:
            "Skaliert nicht für 500 Geräte. Außerdem ist Remote-Zugriff vor der Einrichtung nicht möglich.",
        },
      ],
      realWorldTip:
        "Die meisten großen OEMs (Dell, HP, Lenovo) bieten direkte Autopilot-Registrierung bei Bestellung an - frag deinen Ansprechpartner danach!",
      skillTags: ["autopilot", "deployment-planning"],
    },

    // CONCEPT BLOCK - Hardware Hash Details
    {
      type: "concept",
      title: "Der Hardware Hash im Detail",
      content: `Der Hardware Hash ist eine eindeutige Geräte-Identifikation, die aus mehreren Komponenten berechnet wird:

• Mainboard-Seriennummer
• BIOS UUID
• Festplatten-ID
• Netzwerkkarten-MAC-Adressen
• TPM Endorsement Key

Diese Kombination ist einzigartig für jedes Gerät und ändert sich nicht, selbst wenn Windows neu installiert wird. Der Hash wird als 4KB große Datei extrahiert und zu Intune hochgeladen.`,
      keyTakeaways: [
        "Hardware Hash identifiziert ein Gerät eindeutig, unabhängig von der Windows-Installation",
        "Muss VOR dem ersten Benutzer-Login bei Autopilot registriert sein",
        "OEMs können den Hash direkt bei der Bestellung zu Intune hochladen",
      ],
      skillTags: ["autopilot", "hardware-hash"],
    },

    // COMPARISON BLOCK - Deployment Modes
    {
      type: "comparison",
      title: "Autopilot Deployment Modi",
      description:
        "Die drei Hauptmodi für Windows Autopilot haben unterschiedliche Anwendungsfälle und Anforderungen.",
      items: [
        {
          name: "User-Driven Mode",
          characteristics: [
            "Benutzer meldet sich während OOBE an",
            "Gerät wird dem Benutzer zugewiesen",
            "Funktioniert mit jedem TPM",
            "Ideal für persönliche Arbeitsgeräte",
          ],
        },
        {
          name: "Self-Deploying Mode",
          characteristics: [
            "Vollautomatisch ohne Benutzerinteraktion",
            "Erfordert TPM 2.0",
            "Gerät wird NICHT einem User zugewiesen",
            "Ideal für Kiosk/Shared Devices",
          ],
        },
        {
          name: "Pre-provisioning",
          characteristics: [
            "IT/Partner richtet vorab ein",
            "Benutzer bekommt fertiges Gerät",
            "Schnellste User-Experience",
            "Erfordert physischen Zugriff",
          ],
        },
      ],
      keyDifferences: [
        {
          aspect: "TPM-Anforderung",
          optionA: "User-Driven: TPM optional",
          optionB: "Self-Deploying: TPM 2.0 erforderlich",
        },
        {
          aspect: "Benutzerzuweisung",
          optionA: "User-Driven: Ja - Gerät gehört dem User",
          optionB: "Self-Deploying: Nein - Shared Device",
        },
        {
          aspect: "IT-Aufwand",
          optionA: "User-Driven: Minimal - Benutzer richtet ein",
          optionB: "Pre-provisioning: Hoch - IT muss vorbereiten",
        },
      ],
      recommendation:
        "Für die meisten Unternehmen ist User-Driven Mode die beste Wahl. Self-Deploying nur für Kiosk-Szenarien.",
      skillTags: ["autopilot", "deployment-modes"],
    },

    // TERMINAL BLOCK - Hardware Hash Extraction
    {
      type: "terminal",
      title: "Hardware Hash extrahieren",
      description:
        "So extrahierst du den Hardware Hash von einem Windows-Gerät mit PowerShell.",
      commands: [
        {
          command: "Install-Module -Name Get-WindowsAutoPilotInfo -Force",
          output: "Installing module...",
          explanation:
            "Installiert das Microsoft-Modul zum Extrahieren des Hardware-Hashes",
        },
        {
          command:
            "Get-WindowsAutoPilotInfo -OutputFile C:\\Temp\\AutopilotHWID.csv",
          output:
            "Gathering device information...\nOutput written to C:\\Temp\\AutopilotHWID.csv",
          explanation:
            "Extrahiert den Hardware Hash und speichert ihn als CSV-Datei",
        },
        {
          command: "Get-WindowsAutoPilotInfo -Online",
          output:
            "Gathering device information...\nUploading to Intune...\nDevice registered successfully.",
          explanation:
            "Direktes Hochladen zu Intune (erfordert Admin-Credentials)",
        },
      ],
      tips: [
        "Führe PowerShell als Administrator aus",
        "Der Hash ist ca. 4KB groß und enthält keine personenbezogenen Daten",
        "Mit -Online kannst du direkt zu Intune hochladen",
      ],
      skillTags: ["autopilot", "powershell", "hardware-hash"],
    },

    // GUIDED DECISION BLOCK
    {
      type: "guided-decision",
      title: "Deployment Mode auswählen",
      scenario:
        "Contoso plant die Bereitstellung von Geräten für verschiedene Szenarien. Wähle für jede Situation den richtigen Deployment Mode.",
      steps: [
        {
          question:
            "500 Laptops für Remote-Mitarbeiter, die persönliche Arbeitsgeräte erhalten sollen.",
          options: [
            {
              label: "User-Driven Mode",
              isCorrect: true,
              nextStep: 1,
            },
            {
              label: "Self-Deploying Mode",
              isCorrect: false,
            },
            {
              label: "Pre-provisioning",
              isCorrect: false,
            },
          ],
          explanation:
            "User-Driven ist ideal für persönliche Arbeitsgeräte, da das Gerät dem Benutzer zugewiesen wird.",
        },
        {
          question:
            "20 Kiosk-Terminals im Empfangsbereich, die nur eine Besucherverwaltungs-App anzeigen sollen.",
          options: [
            {
              label: "User-Driven Mode",
              isCorrect: false,
            },
            {
              label: "Self-Deploying Mode",
              isCorrect: true,
              nextStep: 2,
            },
            {
              label: "Pre-provisioning",
              isCorrect: false,
            },
          ],
          explanation:
            "Self-Deploying ist perfekt für Shared/Kiosk-Geräte ohne Benutzerzuweisung.",
        },
        {
          question:
            "10 VIP-Laptops für das Management, das NULL Wartezeit erwartet.",
          options: [
            {
              label: "User-Driven Mode",
              isCorrect: false,
            },
            {
              label: "Self-Deploying Mode",
              isCorrect: false,
            },
            {
              label: "Pre-provisioning",
              isCorrect: true,
            },
          ],
          explanation:
            "Pre-provisioning (White Glove) liefert fertig konfigurierte Geräte - ideal für VIPs.",
        },
      ],
      summary:
        "User-Driven für persönliche Geräte, Self-Deploying für Shared/Kiosk, Pre-provisioning für VIPs und zeitkritische Szenarien.",
      skillTags: ["autopilot", "deployment-modes", "decision-making"],
    },

    // MISTAKE BLOCK
    {
      type: "mistake",
      title: "Häufige Autopilot-Fehler",
      description:
        "Diese Fehler führen regelmäßig zu gescheiterten Autopilot-Deployments.",
      mistakes: [
        {
          wrong: "Hardware Hash erst nach Auslieferung extrahieren",
          correct: "Hardware Hash VOR Auslieferung registrieren (OEM oder IT)",
          explanation:
            "Ohne vorherige Registrierung durchläuft das Gerät den normalen OOBE mit lokalem Account-Setup.",
          consequence:
            "Benutzer muss warten oder Gerät muss zurückgeschickt werden.",
        },
        {
          wrong: "Self-Deploying Mode für persönliche Laptops verwenden",
          correct: "User-Driven Mode für persönliche Arbeitsgeräte nutzen",
          explanation:
            "Self-Deploying weist das Gerät keinem Benutzer zu - jeder könnte sich anmelden.",
          consequence:
            "Keine Personalisierung, kein OneDrive, kein persönlicher Workspace.",
        },
        {
          wrong: "TPM-Anforderungen ignorieren",
          correct: "TPM-Version vor Deployment-Mode-Auswahl prüfen",
          explanation:
            "Self-Deploying erfordert TPM 2.0, User-Driven funktioniert auch mit älteren TPMs.",
          consequence: "Deployment schlägt fehl mit 'TPM attestation failed'.",
        },
      ],
      skillTags: ["autopilot", "troubleshooting"],
    },

    // EXAM TRAP BLOCK
    {
      type: "exam-trap",
      title: "Autopilot TPM-Anforderung",
      trapDescription:
        "Die Prüfung fragt oft nach TPM-Anforderungen für verschiedene Autopilot-Modi.",
      commonMistake: "Annehmen, dass ALLE Autopilot-Modi TPM 2.0 erfordern.",
      correctApproach:
        "TPM 2.0 ist NUR für Self-Deploying Mode erforderlich. User-Driven funktioniert auch mit TPM 1.2 oder ganz ohne TPM.",
      examPhrasing: [
        "Which Autopilot deployment mode requires TPM 2.0?",
        "You need to deploy shared devices. What are the prerequisites?",
        "A device fails Autopilot with TPM error. What could be the cause?",
      ],
      skillTags: ["autopilot", "exam-prep", "tpm"],
    },

    // SUMMARY BLOCK
    {
      type: "summary",
      title: "Zusammenfassung: Windows Autopilot",
      keyPoints: [
        "Autopilot nutzt das vorinstallierte Windows vom OEM - kein Imaging erforderlich",
        "Hardware Hash = eindeutige Geräte-ID, muss VOR Benutzer-Login registriert sein",
        "User-Driven Mode für persönliche Geräte, Self-Deploying für Shared/Kiosk",
        "TPM 2.0 nur für Self-Deploying Mode zwingend",
        "OEMs können Geräte direkt bei Bestellung registrieren",
      ],
      examRelevance: {
        weight: "15-20%",
        frequentTopics: [
          "Deployment Modi und ihre Anforderungen",
          "TPM-Anforderungen pro Modus",
          "Hardware Hash Erfassung und Upload",
          "Troubleshooting fehlgeschlagener Enrollments",
        ],
      },
      nextSteps: [
        "Praktische Übung: Autopilot Profile erstellen",
        "Nächstes Thema: Device Enrollment",
      ],
      skillTags: ["autopilot", "summary"],
    },
  ],

  // -------------------------------------------------------------------------
  // 4. LAB SCENARIO (Hands-on Practice)
  // -------------------------------------------------------------------------
  labScenario: {
    slug: "autopilot-device-registration",
    title: "Gerät bei Autopilot registrieren",
    description:
      "Registriere ein Testgerät bei Windows Autopilot und erstelle ein User-Driven Deployment Profile.",
    environment: "Microsoft Intune Admin Center + Windows 10/11 VM",
    estimatedMinutes: 30,
    steps: [
      {
        id: 1,
        title: "Hardware Hash extrahieren",
        description:
          "Öffne PowerShell als Administrator auf dem Testgerät und extrahiere den Hardware Hash.",
        detailedInstructions: [
          "Starte PowerShell als Administrator",
          "Führe Install-Module Get-WindowsAutoPilotInfo aus",
          "Exportiere den Hash mit Get-WindowsAutoPilotInfo -OutputFile C:\\hash.csv",
        ],
        command: "Get-WindowsAutoPilotInfo -OutputFile C:\\hash.csv",
      },
      {
        id: 2,
        title: "Hash in Intune importieren",
        description: "Lade die CSV-Datei im Intune Admin Center hoch.",
        detailedInstructions: [
          "Navigiere zu Devices > Enrollment > Windows > Windows Autopilot > Devices",
          "Klicke auf Import",
          "Wähle die hash.csv Datei aus",
          "Warte auf die Verarbeitung (kann bis zu 15 Minuten dauern)",
        ],
      },
      {
        id: 3,
        title: "Deployment Profile erstellen",
        description: "Erstelle ein User-Driven Deployment Profile.",
        detailedInstructions: [
          "Navigiere zu Devices > Enrollment > Windows > Deployment Profiles",
          "Klicke auf Create Profile > Windows PC",
          "Name: 'Standard User-Driven Profile'",
          "Deployment Mode: User-driven",
          "Join to Azure AD as: Azure AD joined",
        ],
      },
      {
        id: 4,
        title: "Profile zuweisen und testen",
        description:
          "Weise das Profile zu und setze das Gerät für den Test zurück.",
        detailedInstructions: [
          "Öffne das erstellte Profile",
          "Gehe zu Assignments und füge eine Gerätegruppe hinzu",
          "Setze das Testgerät zurück (Einstellungen > System > Recovery)",
          "Nach dem Neustart sollte der Autopilot-OOBE erscheinen",
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. CHECKPOINTS (Active Recall)
  // -------------------------------------------------------------------------
  checkpoints: [
    {
      questionId: "md102-q-autopilot-001",
      order: 1,
      introText: "Teste dein Verständnis von Autopilot-Grundlagen:",
    },
    {
      questionId: "md102-q-autopilot-002",
      order: 2,
      introText: "Deployment Modi verstehen:",
    },
  ],

  // -------------------------------------------------------------------------
  // 6. EXPLANATION (Why & How)
  // -------------------------------------------------------------------------
  explanation: {
    why: "Windows Autopilot transformiert die Gerätebereitstellung von einem manuellen, zeitintensiven Prozess zu einem automatisierten Cloud-gesteuerten Workflow. Es eliminiert die Notwendigkeit für Custom Images und ermöglicht True Zero-Touch Deployment.",
    how: "Beim ersten Start sendet das Gerät seinen Hardware Hash an Microsoft. Intune erkennt das Gerät, sendet das Deployment Profile, und Windows konfiguriert sich automatisch mit Unternehmenseinstellungen, Apps und Policies.",
    deepDive: `
## Technischer Ablauf des Autopilot-Deployments

1. **Hardware Hash Registrierung**
   - OEM oder IT lädt den 4KB Hardware Hash zu Intune hoch
   - Hash enthält: TPM, BIOS UUID, MAC-Adressen, Mainboard-ID

2. **Gerät startet zum ersten Mal (OOBE)**
   - Windows sendet Hardware Hash an Microsoft Cloud
   - Microsoft prüft: "Gehört dieses Gerät zu einem Autopilot-Tenant?"

3. **Autopilot-Profil wird geladen**
   - Intune sendet das zugewiesene Deployment Profile
   - Windows konfiguriert OOBE entsprechend (Screens überspringen etc.)

4. **Azure AD Join & MDM Enrollment**
   - User-Driven: Benutzer meldet sich an, Gerät wird ihm zugewiesen
   - Self-Deploying: Automatischer Join ohne Benutzer

5. **Policies & Apps werden angewendet**
   - Enrollment Status Page (ESP) zeigt Fortschritt
   - Apps wie Office werden installiert
   - Compliance wird geprüft
    `,
    commonQuestions: [
      {
        question: "Kann ich Autopilot mit bestehenden Geräten nutzen?",
        answer:
          "Ja! Du kannst den Hardware Hash mit Get-WindowsAutoPilotInfo extrahieren und zu Intune hochladen. Das Gerät muss dann zurückgesetzt werden.",
      },
      {
        question: "Was passiert bei einem Autopilot-Fehler?",
        answer:
          "Häufigste Ursachen: Hardware Hash nicht registriert, kein Deployment Profile zugewiesen, oder TPM-Probleme. Logs findest du unter %WINDIR%\\Logs\\Software\\Microsoft\\Provisioning.",
      },
      {
        question: "Brauche ich Internet während des Deployments?",
        answer:
          "Ja, Autopilot ist Cloud-basiert. Das Gerät muss Verbindung zu Microsoft-Diensten haben (OOBE-Netzwerk-Setup). Offline-Deployment ist nicht möglich.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. TRANSFER TASK (Apply Knowledge)
  // -------------------------------------------------------------------------
  transferTask: {
    title: "Migrationsplan erstellen",
    description: `Dein Unternehmen plant die Migration von 2.000 Geräten von Windows 10 zu Windows 11.
Die bestehenden Geräte sind NICHT bei Autopilot registriert, aber bei Intune enrolled.

Entwirf einen Migrationsplan, der Autopilot für zukünftige Wiederherstellungen nutzt:
1. Wie registrierst du die bestehenden Geräte bei Autopilot?
2. Welchen Deployment Mode wählst du und warum?
3. Wie testest du den Prozess, bevor du alle 2.000 Geräte migrierst?`,
    hints: [
      "Get-WindowsAutoPilotInfo kann auch remote über Intune deployed werden",
      "Du musst Autopilot nicht für das Upgrade nutzen - aber für zukünftige Resets",
      "Pilotgruppen mit 5-10% der Geräte sind Standard für große Rollouts",
    ],
    expectedOutcome: `1. Hardware Hash remote erfassen via Intune Remediation Script oder Win32 App
2. User-Driven Mode, da es persönliche Arbeitsgeräte sind
3. Pilotgruppe von 50-100 Geräten für 2 Wochen testen, dann stufenweiser Rollout`,
  },

  // -------------------------------------------------------------------------
  // METADATA
  // -------------------------------------------------------------------------
  topic: "autopilot",
  track: "md102-deployment",
  difficulty: "intermediate",
  estimatedMinutes: 30,
  prerequisites: ["windows-basics", "intune-intro"],
  relatedModules: ["device-enrollment", "compliance-policies"],
  skillTags: ["autopilot", "deployment", "intune", "powershell"],
};
