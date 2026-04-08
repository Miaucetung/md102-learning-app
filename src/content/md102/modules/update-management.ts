// ============================================================================
// MD-102: Windows Update Management Module
// ============================================================================

// Note: This module uses extended block structure
export const updateManagementModule = {
  id: "md102-update-management",
  slug: "update-management",
  title: "Windows Update Management",
  description:
    "Steuere Windows Updates mit Update Rings, Feature Updates und Expedite Policies. Lerne Deferral-Strategien und Quality Update Management.",
  certification: "MD-102",
  track: "Device Management",
  estimatedMinutes: 45,
  difficulty: "intermediate",
  prerequisites: ["md102-device-enrollment", "md102-device-configuration"],

  realWorldProblem: `
Es ist Patch Tuesday und Microsoft hat ein dringendes Sicherheitsupdate veröffentlicht, das eine aktiv ausgenutzte Zero-Day-Lücke schließt. Gleichzeitig beschweren sich Benutzer, dass das letzte Update eine wichtige Business-Anwendung zerstört hat. Das Management fragt: "Warum können wir Updates nicht kontrollieren?"

DEINE AUFGABE: Als Endpoint Administrator musst du Updates zeitgesteuert und gruppiert ausrollen, kritische Patches schnell verteilen und problematische Updates pausieren können.
  `,

  context: [
    "Windows as a Service bedeutet kontinuierliche Updates. Ohne Management bekommen alle Geräte Updates gleichzeitig - inklusive problematischer. Update Rings ermöglichen gestaffeltes Rollout und kontrollierte Testphasen vor breitem Deployment.",
    "Update Ring = Policy die definiert wann und wie Geräte Updates erhalten (Deferral, Deadlines, Install Behavior). Quality Updates = Monatliche kumulative Updates mit Sicherheits- und Bugfixes.",
    "Feature Update = Jährliche große Updates mit neuen Features (Windows 11 23H2, 24H2). Deferral Period = Verzögerung in Tagen bevor ein Update angeboten wird (0-30 für Quality, 0-365 für Feature).",
    "Deadline = Zeitpunkt nach dem das Update erzwungen wird. Expedite Update = Notfall-Deployment das Deferral überspringt für kritische Sicherheitsupdates.",
  ],

  blocks: [
    // Block 1: Prediction
    {
      type: "prediction",
      id: "predict-update-rings",
      title: "Update Rings Strategie",
      question:
        "Du hast 1000 Geräte und willst Updates gestaffelt ausrollen. Wie viele Update Rings solltest du MINDESTENS haben für eine sichere Strategie?",
      options: [
        "1 Ring - alle Geräte gleich behandeln",
        "2 Rings - Pilot und Production",
        "3 Rings - Pilot, Early Adopters, Broad",
        "5+ Rings - jede Abteilung separat",
      ],
      correctIndex: 2,
      explanation:
        "Microsoft empfiehlt mindestens 3 Rings: 1) Pilot/IT (5%, sofort), 2) Early Adopters (20%, +7 Tage), 3) Broad Deployment (75%, +14 Tage). So erkennst du Probleme bevor die Mehrheit betroffen ist.",
      reflection: "Welche Geräte würdest du in welchen Ring einordnen?",
    },

    // Block 2: Concept - Update Types
    {
      type: "concept",
      id: "update-types",
      title: "Windows Update Typen verstehen",
      content: `### Die verschiedenen Update-Typen

**1. Quality Updates (Monatlich)**
- Erscheinen am "Patch Tuesday" (2. Dienstag im Monat)
- Kumulativ (enthalten alle vorherigen Fixes)
- Security Fixes + Bug Fixes + Reliability Improvements
- Installation: 10-30 Minuten mit Reboot

**2. Feature Updates (Jährlich)**
- Große Updates: Windows 11 22H2 → 23H2 → 24H2
- Neue Features und UI-Änderungen
- Ähnlich einem In-Place Upgrade
- Installation: 30-90 Minuten

**3. Driver Updates**
- Automatisch über Windows Update optional
- Kann in Intune aktiviert/deaktiviert werden
- Vorsicht: Kann Kompatibilitätsprobleme verursachen

**4. Definition Updates**
- Microsoft Defender Signaturen
- Mehrmals täglich
- Keine Deferrals möglich/nötig

### Update Release Calendar

| Release | Timing | Beispiel |
|---------|--------|----------|
| B-Release | 2. Dienstag | Security Updates |
| C-Release | 4. Dienstag | Preview (optional) |
| OOB | Bei Bedarf | Out-of-Band für kritische Bugs |
| Feature | Herbst | Windows 11 24H2 |`,
      keyTakeaways: [
        "Quality Updates: Monatlich, Sicherheit & Fixes, kumulativ",
        "Feature Updates: Jährlich, große Änderungen, längere Installation",
        "B-Release ist der reguläre Patch Tuesday",
        "C-Release ist Preview für nächsten Monat (optional)",
      ],
    },

    // Block 3: Practice - Update Ring erstellen
    {
      type: "practice",
      id: "practice-update-ring",
      title: "Update Ring Policy erstellen",
      goal: "Erstelle einen Update Ring für Early Adopters mit 7 Tagen Deferral",
      steps: [
        {
          instruction:
            "1. Öffne Intune Admin Center > Devices > Windows > Update rings for Windows 10 and later",
          hint: "Früher unter 'Software updates', jetzt unter 'Devices > Windows'",
        },
        {
          instruction: "2. Klicke 'Create profile'",
          hint: "Profile ist hier ein Update Ring, nicht zu verwechseln mit Configuration Profile",
        },
        {
          instruction:
            "3. Name: 'Update Ring - Early Adopters' mit Beschreibung der Zielgruppe",
          hint: "Dokumentiere wer in diesen Ring gehört und warum",
        },
        {
          instruction:
            "4. Update settings: Quality update deferral = 7 days, Feature update deferral = 30 days",
          hint: "Early Adopters sollen Updates 7 Tage nach Release bekommen",
        },
        {
          instruction:
            "5. User experience: Active hours = 8:00 - 17:00 (oder Custom)",
          hint: "Verhindert Reboots während der Arbeitszeit",
        },
        {
          instruction:
            "6. Deadline: Quality update deadline = 5 days, Feature update deadline = 7 days",
          hint: "Nach dieser Zeit wird der Reboot erzwungen",
        },
        {
          instruction: "7. Weise den Ring der 'Early Adopters' Gruppe zu",
          hint: "Diese sollte ~20% der Geräte enthalten",
        },
      ],
      successCriteria:
        "Der Update Ring ist aktiv und Geräte in der Gruppe zeigen die neuen Einstellungen",
    },

    // Block 4: Scenario - Expedite Update
    {
      type: "scenario",
      id: "scenario-expedite",
      title: "Zero-Day Emergency Response",
      context:
        "Microsoft hat ein außerplanmäßiges Security Update veröffentlicht für eine kritische RCE-Schwachstelle (CVE-2024-XXXX), die bereits aktiv ausgenutzt wird. Dein CISO verlangt alle Geräte innerhalb von 24 Stunden gepatcht.",
      challenge:
        "Deine Update Rings haben 7-30 Tage Deferral. Wie bekommst du das Update schnellstmöglich auf alle Geräte?",
      options: [
        {
          choice: "Alle Update Ring Deferrals auf 0 setzen",
          outcome:
            "Funktioniert, aber alle zukünftigen Updates kommen sofort - riskant für Stabilität",
          isOptimal: false,
        },
        {
          choice: "Quality Update Expedite Policy erstellen",
          outcome:
            "Perfekt! Expedite überspringt Deferrals für ein spezifisches Update ohne die Rings zu ändern. Das Update wird innerhalb von Stunden angeboten.",
          isOptimal: true,
        },
        {
          choice: "GPO via WSUS verwenden",
          outcome:
            "Nicht möglich wenn Geräte nur Intune-managed sind, und zu langsam für Notfall",
          isOptimal: false,
        },
        {
          choice:
            "PowerShell-Script über Intune deployen das Updates installiert",
          outcome:
            "Umständlich und nicht supported. Nutze die eingebauten Intune-Features.",
          isOptimal: false,
        },
      ],
      expertTip:
        "Quality Update Expedite Policies sind für genau diesen Use Case designed. Sie überschreiben temporär die Deferrals, aber nur für das spezifizierte Update. Nach 14 Tagen werden sie automatisch entfernt.",
    },

    // Block 5: Terminal - Update Status PowerShell
    {
      type: "terminal",
      id: "terminal-update-status",
      title: "Update Status mit PowerShell prüfen",
      goal: "Prüfe den Windows Update Status eines Geräts und verfügbare Updates",
      commands: [
        {
          command: "Get-WindowsUpdateLog",
          explanation:
            "Konvertiert ETL Logs in lesbare WindowsUpdate.log Datei (Desktop)",
        },
        {
          command: `$UpdateSession = New-Object -ComObject Microsoft.Update.Session
$UpdateSearcher = $UpdateSession.CreateUpdateSearcher()
$SearchResult = $UpdateSearcher.Search("IsInstalled=0")
$SearchResult.Updates | Select Title, LastDeploymentChangeTime`,
          explanation:
            "Listet alle verfügbaren aber noch nicht installierten Updates",
        },
        {
          command: `# Installierte Updates anzeigen
Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 10 HotFixID, Description, InstalledOn`,
          explanation: "Zeigt die 10 zuletzt installierten Updates",
        },
        {
          command: `# Windows Version prüfen
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber`,
          explanation: "Zeigt aktuelle Windows Version und Build-Nummer",
        },
        {
          command: `# Update über Intune triggern
Start-Process "intunemanagementextension://syncapp"`,
          explanation:
            "Startet Intune Sync, der auch Update-Prüfung einschließt",
        },
      ],
      validation: {
        expectedOutput: "Update list displayed",
        successMessage: "Update Status erfolgreich geprüft!",
      },
    },

    // Block 6: Concept - Deferral Strategy
    {
      type: "concept",
      id: "deferral-strategy",
      title: "Update Ring Deferral Strategie",
      content: `### Empfohlene Ring-Struktur

**Ring 0: Preview/Insider (Optional)**
- Windows Insider Program
- Nur für Test-Geräte, nicht Production
- Keine Deferrals (erhält Updates zuerst)

**Ring 1: Pilot/IT (5%)**
\`\`\`
Quality Deferral: 0 Tage
Feature Deferral: 0 Tage
Deadline: 3 Tage
\`\`\`
- IT-Abteilung und freiwillige Tester
- Erkennt Probleme sofort

**Ring 2: Early Adopters (20%)**
\`\`\`
Quality Deferral: 7 Tage
Feature Deferral: 30 Tage
Deadline: 5 Tage
\`\`\`
- Tech-affine Abteilungen
- Genug Zeit um kritische Probleme zu finden

**Ring 3: Broad Deployment (70%)**
\`\`\`
Quality Deferral: 14 Tage
Feature Deferral: 60 Tage
Deadline: 7 Tage
\`\`\`
- Alle regulären Benutzer
- Stabilste Updates nach 2 Wochen Testing

**Ring 4: Critical/Exceptions (5%)**
\`\`\`
Quality Deferral: 21-30 Tage
Feature Deferral: 120-365 Tage
Deadline: 14 Tage
\`\`\`
- Kritische Systeme (Produktionslinien)
- Medical Devices
- Systeme mit Zertifizierungsanforderungen`,
      keyTakeaways: [
        "Mindestens 3 Rings: Pilot, Early Adopters, Broad",
        "Deferral staffeln: 0 → 7 → 14+ Tage",
        "Deadlines erzwingen Update nach X Tagen",
        "Kritische Systeme maximal verzögern, aber nicht ignorieren",
      ],
    },

    // Block 7: Guided Decision - Update Problems
    {
      type: "guided-decision",
      id: "decision-update-problems",
      title: "Update-Probleme lösen",
      scenario:
        "Verschiedene Update-Probleme treten auf. Wähle die richtige Reaktion.",
      decisions: [
        {
          question:
            "Ein Update aus dem Pilot-Ring verursacht Blue Screens auf Geräten mit einer bestimmten Netzwerkkarte. Die Broad Deployment Gruppe ist in 3 Tagen dran.",
          options: [
            "Nichts tun - das Update ist ja noch nicht bei Broad Deployment",
            "Update Ring für Broad Deployment pausieren",
            "Support-Ticket bei Microsoft öffnen und warten",
            "Das Update deinstallieren und Driver Update blockieren",
          ],
          correctIndex: 1,
          explanation:
            "Update Ring pausieren verhindert dass Broad Deployment das problematische Update bekommt. Du gewinnst Zeit für Analyse während Pilot das Problem isoliert. Nach Fix kannst du fortfahren.",
        },
        {
          question:
            "Feature Update Windows 11 24H2 ist verfügbar. Dein LOB-Application Vendor sagt Kompatibilität 'wird getestet'.",
          options: [
            "Feature Update sofort blockieren für alle",
            "Feature Deferral auf 365 Tage setzen",
            "Safeguard Hold abwarten (Microsoft blockiert automatisch bei bekannten Problemen)",
            "Kombiniert: Deferrals erhöhen + Pilot testen + Vendor-Update abwarten",
          ],
          correctIndex: 3,
          explanation:
            "Kombinierter Ansatz: Längere Deferrals geben Zeit, Pilot-Gruppe testet proaktiv, und Vendor kommuniziert Kompatibilität. Nicht blind blockieren, aber auch nicht blind ausrollen.",
        },
        {
          question:
            "Ein Benutzer beschwert sich, sein PC startet mehrfach täglich neu für Updates.",
          options: [
            "Active Hours prüfen und anpassen",
            "Update Ring entfernen",
            "Deadline auf 30 Tage setzen",
            "Windows Update Service deaktivieren",
          ],
          correctIndex: 0,
          explanation:
            "Häufige Neustarts deuten auf Active Hours Konflikt hin. Wenn Active Hours falsch sind (z.B. Default vs. tatsächliche Arbeitszeit), werden Reboots oft geplant. Update Ring Einstellungen anpassen, nicht entfernen.",
        },
      ],
    },

    // Block 8: Exam Trap
    {
      type: "exam-trap",
      id: "trap-deferral-deadline",
      title: "Prüfungsfalle: Deferral vs. Deadline",
      trap: "In der Prüfung werden Deferral Period und Deadline oft verwechselt oder missverständlich formuliert.",
      correctUnderstanding:
        "**Deferral:** Verzögerung BEVOR das Update überhaupt angeboten wird. Benutzer sieht es nicht.\n\n**Deadline:** Nach dem Angebot, Tage bis zur ERZWUNGENEN Installation. Benutzer kann bis dahin verschieben.",
      commonMistake:
        "Ein 7-Tage Deferral + 5-Tage Deadline = Update erscheint nach 7 Tagen, wird nach 5 weiteren Tagen (also Tag 12) erzwungen. NICHT nach 5 Tagen ab Release!",
      examTip:
        "Rechne immer: Release-Datum + Deferral = Angebots-Datum. Angebots-Datum + Deadline = Erzwungenes Install-Datum. Prüfungsfragen geben oft nur eines und fragen nach dem anderen.",
    },

    // Block 9: Comparison - Update Methods
    {
      type: "comparison",
      id: "compare-update-methods",
      title: "Update Rings vs. Feature Update Policies",
      itemA: {
        name: "Update Rings for Windows 10 and later",
        description: "Kombinierte Policy für Quality UND Feature Updates",
        features: [
          "Deferrals für beide Update-Typen in einer Policy",
          "User Experience Einstellungen (Active Hours, Restart)",
          "Deadline und Grace Period",
          "Kann Updates pausieren",
          "Reicht für die meisten Szenarien",
        ],
      },
      itemB: {
        name: "Feature Updates for Windows 10 and later",
        description: "Spezielle Policy nur für Feature Update Version",
        features: [
          "Zielt auf spezifische Windows Version (z.B. 23H2)",
          "Für Szenarien wo alle auf GLEICHER Version sein sollen",
          "Kein Deferral - sofortiges Angebot der Ziel-Version",
          "Kann Rollback-Frist definieren",
          "Uninstall-Zeitraum konfigurieren",
        ],
      },
      useItemAWhen: [
        "Normale Update-Verwaltung mit Staffelung",
        "Unterschiedliche Deferrals für verschiedene Gruppen",
        "Flexibles Feature Update Timing gewünscht",
      ],
      useItemBWhen: [
        "Alle Geräte sollen auf exakt gleicher Version sein",
        "Feature Update vor End-of-Support erzwingen",
        "Definiertes Ziel-Version wichtiger als Timing",
      ],
    },

    // Block 10: Practice - Pause Updates
    {
      type: "practice",
      id: "practice-pause-updates",
      title: "Updates pausieren bei Problemen",
      goal: "Pausiere Quality Updates für einen Ring wegen eines bekannten Problems",
      steps: [
        {
          instruction:
            "1. Gehe zu Intune > Devices > Windows > Update rings > Wähle den problematischen Ring",
          hint: "Wähle den Ring mit den betroffenen Geräten",
        },
        {
          instruction: "2. Klicke auf 'Pause' im oberen Menü",
          hint: "Es gibt separate Buttons für Quality und Feature Updates",
        },
        {
          instruction: "3. Wähle 'Pause quality updates' und bestätige",
          hint: "Updates werden für 35 Tage pausiert (konfigurierbar)",
        },
        {
          instruction:
            "4. Überprüfe den Status: 'Quality updates paused until [Datum]'",
          hint: "Das Datum zeigt wann die Pause automatisch endet",
        },
        {
          instruction: "5. Nachdem das Problem gelöst ist: 'Resume' klicken",
          hint: "Updates werden wieder normal nach Deferral angeboten",
        },
      ],
      successCriteria:
        "Quality Updates sind pausiert und der Ring zeigt 'Paused' Status. Geräte erhalten keine neuen Quality Updates bis Resume.",
    },

    // Block 11: Summary
    {
      type: "summary",
      id: "summary-update-management",
      title: "Update Management - Zusammenfassung",
      keyPoints: [
        "Update Rings steuern WANN Geräte Updates bekommen (Deferral + Deadline)",
        "Mindestens 3 Rings: Pilot (0d) → Early Adopters (7d) → Broad (14d)",
        "Quality Updates: Monatlich, kumulativ, Sicherheit & Fixes",
        "Feature Updates: Jährlich, neue Windows Version",
        "Deferral = Verzögerung bis Angebot, Deadline = Erzwungene Installation",
        "Expedite Quality Updates für kritische Sicherheitspatches",
        "Feature Update Policies für definierte Ziel-Versionen",
        "Pause-Funktion für Notfälle wenn Update Probleme verursacht",
      ],
      examPriority: [
        {
          topic: "Deferral + Deadline Berechnung",
          importance: "high",
          reason: "Häufige Rechenaufgaben in der Prüfung",
        },
        {
          topic: "Ring-Strategie (wie viele, welche Deferrals)",
          importance: "high",
          reason: "Best Practice Fragen",
        },
        {
          topic: "Update Ring vs. Feature Update Policy",
          importance: "medium",
          reason: "Wann welche Policy nutzen",
        },
      ],
      nextSteps: [
        "3 Update Rings erstellen (Pilot, Early, Broad)",
        "Geräte in Gruppen für Rings einordnen",
        "Active Hours und Deadlines an Arbeitszeiten anpassen",
        "Expedite-Prozess für Notfälle dokumentieren",
      ],
    },
  ],

  labScenario: {
    title: "Windows Update Management Lab",
    objective:
      "Implementiere eine vollständige Update Ring Strategie mit Expedite-Fähigkeit",
    environment: [
      "Microsoft 365 E3/E5 Tenant mit Intune",
      "Windows 11 Test-Geräte in verschiedenen Gruppen",
      "Simuliertes Szenario: Ein Critical Update muss deployed werden",
    ],
    tasks: [
      "3 Update Rings erstellen (Pilot, Early, Broad)",
      "Deferrals und Deadlines konfigurieren",
      "Active Hours für Arbeitszeit (8-17 Uhr) setzen",
      "Einen Ring pausieren als Reaktion auf Problem",
      "Expedite Quality Update für alle Geräte deployen",
      "Update Compliance Report erstellen",
    ],
    estimatedTime: "45-60 Minuten",
  },

  checkpoints: [
    {
      id: "cp-deferral-calc",
      question:
        "Quality Update Release am 10. Januar. Ring hat 7 Tage Deferral und 5 Tage Deadline. Wann wird das Update spätestens installiert?",
      options: ["15. Januar", "17. Januar", "22. Januar", "12. Januar"],
      correctIndex: 2,
      explanation:
        "10.01 (Release) + 7 Tage (Deferral) = 17.01 (Angebot). 17.01 + 5 Tage (Deadline) = 22.01 (Erzwungene Installation).",
    },
    {
      id: "cp-expedite-use",
      question:
        "Wann solltest du eine Expedite Quality Update Policy verwenden?",
      options: [
        "Für jedes Update um Deferrals zu umgehen",
        "Nur für kritische Sicherheitsupdates die sofort gebraucht werden",
        "Wenn Benutzer sich über Updates beschweren",
        "Für Feature Updates",
      ],
      correctIndex: 1,
      explanation:
        "Expedite ist für Notfälle: aktiv ausgenutzte Sicherheitslücken. Es überspringt Deferrals, was das Ring-Konzept aushebelt. Nur sparsam verwenden. Feature Updates haben eigene Policies.",
    },
  ],

  relatedModules: ["md102-device-configuration", "md102-security-baselines"],
  tags: [
    "windows-update",
    "update-rings",
    "feature-updates",
    "quality-updates",
    "expedite",
    "deferral",
    "patching",
  ],
};
