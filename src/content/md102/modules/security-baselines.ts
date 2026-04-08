// ============================================================================
// MD-102: Security Baselines Module
// ============================================================================

// Note: This module uses extended block structure - type assertion to allow flexibility
export const securityBaselinesModule = {
  id: "md102-security-baselines",
  slug: "security-baselines",
  title: "Security Baselines & Endpoint Security",
  description:
    "Implementiere Microsoft-empfohlene Sicherheitseinstellungen mit Security Baselines. Konfiguriere Antivirus, Firewall und Attack Surface Reduction.",
  certification: "MD-102",
  track: "Security",
  estimatedMinutes: 55,
  difficulty: "advanced",
  prerequisites: ["md102-device-configuration", "md102-compliance-policies"],

  realWorldProblem: `
Nach einem Ransomware-Angriff auf ein Schwesterunternehmen verlangt das Management eine sofortige Härtung aller Windows-Endpoints. "Wir wollen die gleichen Sicherheitseinstellungen wie Microsoft selbst empfiehlt!" Die IT muss innerhalb einer Woche 500 Geräte absichern.

DEINE AUFGABE: Als Endpoint Administrator musst du schnell und konsistent die von Microsoft empfohlenen Sicherheitseinstellungen auf alle Geräte ausrollen - mit minimalem Einfluss auf die Benutzerproduktivität und nachweisbarer Compliance.
  `,

  context: [
    "Security Baselines sind vorkonfigurierte Gruppen von Einstellungen, die Microsoft basierend auf Security Best Practices empfiehlt. Statt hunderte Einstellungen manuell zu konfigurieren, bekommst du eine getestete Baseline, die bewährte Standards implementiert.",
    "Security Baseline = Vordefiniertes Set von Sicherheitseinstellungen für Windows, Edge, Microsoft 365 Apps. Attack Surface Reduction (ASR) = Regeln die typische Angriffsvektoren blockieren (Office Makros, Script Execution etc.).",
    "Microsoft Defender for Endpoint ist eine Enterprise Security Platform mit EDR, Threat Protection und Vulnerability Management. Endpoint Security ist ein eigener Bereich in Intune für Antivirus, Firewall, Disk Encryption und Attack Surface Reduction.",
    "Wichtiger Unterschied: Configuration Profile = einzelne Einstellungen selbst definieren. Security Baseline = Microsoft-empfohlene Defaults in einem getesteten Paket.",
  ],

  blocks: [
    // Block 1: Prediction
    {
      type: "prediction",
      id: "predict-baseline-vs-profile",
      title: "Baseline oder Configuration Profile?",
      question:
        "Was ist der Hauptunterschied zwischen einem Security Baseline und einem Configuration Profile in Intune?",
      options: [
        "Baselines sind nur für Windows, Profiles für alle Plattformen",
        "Baselines haben Microsoft-empfohlene Defaults, Profiles definierst du selbst",
        "Baselines sind kostenlos, Profiles brauchen E5 Lizenz",
        "Profiles sind stärker als Baselines",
      ],
      correctIndex: 1,
      explanation:
        "Security Baselines kommen mit von Microsoft voreingestellten Werten basierend auf ihre Security Expertise. Configuration Profiles sind 'leer' - du definierst jeden Wert selbst. Beide nutzen die gleichen CSPs (Configuration Service Providers) im Hintergrund.",
      reflection:
        "Wann würdest du eine Baseline verwenden und wann ein eigenes Profile erstellen?",
    },

    // Block 2: Concept - Security Baseline Types
    {
      type: "concept",
      id: "baseline-types",
      title: "Verfügbare Security Baselines",
      content: `### Security Baselines in Intune

**1. Windows Security Baseline (MDM)**
Die wichtigste Baseline mit hunderten Einstellungen:
- BitLocker Encryption
- Windows Defender Einstellungen
- Firewall Konfiguration
- User Rights Assignments
- Security Options
- Audit Policies

**2. Microsoft Defender for Endpoint Baseline**
Erweiterte Defender-Einstellungen:
- Real-time Protection
- Cloud-delivered Protection
- Network Protection
- Controlled Folder Access
- Exploit Protection

**3. Microsoft Edge Baseline**
Browser-Sicherheit:
- SmartScreen
- Password Manager
- Tracking Prevention
- Site Isolation

**4. Microsoft 365 Apps Baseline**
Office Security:
- Macro Settings
- Protected View
- File Block Settings
- Add-in Signing Requirements

**5. Windows 365 / Azure Virtual Desktop Baselines**
Cloud PC spezifische Einstellungen`,
      keyTakeaways: [
        "Windows Security Baseline ist die umfassendste (~300 Einstellungen)",
        "Baselines werden regelmäßig aktualisiert (Version beachten!)",
        "Kann mit eigenen Profiles kombiniert werden",
        "Defender Baseline ergänzt Windows Baseline für erweiterten Schutz",
      ],
    },

    // Block 3: Practice - Deploy Baseline
    {
      type: "practice",
      id: "practice-deploy-baseline",
      title: "Security Baseline deployen",
      goal: "Deploye die Windows Security Baseline an eine Testgruppe",
      steps: [
        {
          instruction:
            "1. Öffne Intune Admin Center > Endpoint Security > Security Baselines",
          hint: "Nicht unter Devices > Configuration profiles - Baselines haben eigenen Bereich",
        },
        {
          instruction: "2. Wähle 'Security Baseline for Windows 10 and later'",
          hint: "Klicke auf den Namen, nicht auf 'Create Profile'",
        },
        {
          instruction:
            "3. Klicke 'Create profile' und gib einen Namen: 'Windows Baseline - Pilot'",
          hint: "Versioniere deine Baselines für besseres Change Management",
        },
        {
          instruction:
            "4. Gehe durch die Einstellungen - die meisten sind bereits konfiguriert",
          hint: "Du siehst für jede Einstellung: 'Configured' oder 'Not configured'",
        },
        {
          instruction:
            "5. Bei 'BitLocker' prüfe ob es zu deiner Umgebung passt (TPM Requirement)",
          hint: "Ältere Geräte ohne TPM 2.0 könnten Probleme haben",
        },
        {
          instruction:
            "6. Weise die Baseline einer Testgruppe zu (nicht 'All Devices'!)",
          hint: "Immer erst testen bevor du auf alle Geräte ausrollst",
        },
      ],
      successCriteria:
        "Die Baseline erscheint unter 'Profiles' mit Status 'Active' und Geräte beginnen zu synchronisieren",
    },

    // Block 4: Scenario - Baseline Conflict
    {
      type: "scenario",
      id: "scenario-baseline-conflict",
      title: "Die konfliktierenden Einstellungen",
      context:
        "Du hast die Windows Security Baseline deployed. Ein Entwicklerteam beschwert sich, dass ihre PowerShell-Skripte nicht mehr funktionieren. Die Baseline hat Script Execution Policies verschärft.",
      challenge:
        "Wie löst du das Problem ohne die Sicherheit für alle anderen zu kompromittieren?",
      options: [
        {
          choice:
            "Die Baseline für alle deaktivieren bis das Problem gelöst ist",
          outcome:
            "Schlecht - 500 Geräte verlieren ihren Schutz wegen 20 Entwicklern",
          isOptimal: false,
        },
        {
          choice:
            "Die Script-Einstellung in der Baseline für alle auf 'Not configured' setzen",
          outcome: "Schlecht - Alle Geräte verlieren diesen Schutz",
          isOptimal: false,
        },
        {
          choice:
            "Ein separates Configuration Profile für Entwickler erstellen, das nur diese Einstellung überschreibt",
          outcome:
            "Perfekt! Die Baseline bleibt für alle aktiv, aber Entwickler bekommen eine Ausnahme. Das Profile mit höherer Priority gewinnt.",
          isOptimal: true,
        },
        {
          choice: "Die Entwickler von der Baseline-Zuweisung ausschließen",
          outcome:
            "Schlecht - Entwickler verlieren ALLE Baseline-Einstellungen, nicht nur die eine",
          isOptimal: false,
        },
      ],
      expertTip:
        "Nutze 'Scope Tags' und separate Profile für Ausnahmen. Ein Profile mit spezifischerem Scope oder höherer Priorität überschreibt konfliktierene Baseline-Einstellungen.",
    },

    // Block 5: Concept - Attack Surface Reduction
    {
      type: "concept",
      id: "asr-rules",
      title: "Attack Surface Reduction Rules",
      content: `### ASR Rules - Die wichtigsten Schutzmaßnahmen

ASR Rules blockieren typische Angriffsvektoren präventiv:

**Office-basierte Angriffe:**
- \`Block Office apps from creating executable content\`
- \`Block Office apps from injecting code into other processes\`
- \`Block Win32 API calls from Office macro\`

**Script-basierte Angriffe:**
- \`Block execution of potentially obfuscated scripts\`
- \`Block JavaScript or VBScript from launching downloaded executable content\`

**Credential Theft:**
- \`Block credential stealing from Windows LSASS\`
- \`Block process creations originating from PSExec and WMI commands\`

**Ransomware Protection:**
- \`Use advanced protection against ransomware\`
- \`Block executable files from running unless they meet criteria\`

### ASR Rule Modes

| Mode | Verhalten |
|------|-----------|
| **Block** | Aktion wird verhindert, Event geloggt |
| **Audit** | Aktion erlaubt, aber Event geloggt |
| **Warn** | User sieht Warning, kann fortfahren |
| **Disabled** | Rule inaktiv |

**Best Practice:** Erst im Audit-Mode testen, dann auf Block umstellen.`,
      keyTakeaways: [
        "ASR Rules blockieren Angriffe BEVOR Schaden entsteht",
        "Office-Makros sind häufigster Angriffsvektor",
        "LSASS Protection verhindert Credential-Dumping",
        "Immer erst Audit, dann Warn, dann Block",
      ],
    },

    // Block 6: Terminal - ASR PowerShell
    {
      type: "terminal",
      id: "terminal-asr-config",
      title: "ASR Rules mit PowerShell prüfen",
      goal: "ASR Rules Status auf einem Gerät prüfen und konfigurieren",
      commands: [
        {
          command:
            "Get-MpPreference | Select-Object AttackSurfaceReductionRules_Ids, AttackSurfaceReductionRules_Actions",
          explanation:
            "Zeigt konfigurierte ASR Rules mit IDs und Aktionen (0=Disabled, 1=Block, 2=Audit, 6=Warn)",
        },
        {
          command: `# Bekannte ASR Rule IDs
$asrRules = @{
    "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550" = "Block executable content from email/webmail"
    "D4F940AB-401B-4EFC-AADC-AD5F3C50688A" = "Block Office apps from creating child processes"
    "92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B" = "Block Win32 API calls from Office macros"
    "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C" = "Block Adobe Reader from creating child processes"
}`,
          explanation: "Die wichtigsten ASR Rule GUIDs zum Nachschlagen",
        },
        {
          command: `# ASR Rule auf Audit setzen (zum Testen)
Set-MpPreference -AttackSurfaceReductionRules_Ids "D4F940AB-401B-4EFC-AADC-AD5F3C50688A" -AttackSurfaceReductionRules_Actions 2`,
          explanation:
            "Setzt 'Block Office apps from creating child processes' auf Audit-Mode",
        },
        {
          command: `# ASR Events im Event Log anzeigen
Get-WinEvent -LogName "Microsoft-Windows-Windows Defender/Operational" | Where-Object { $_.Id -eq 1121 -or $_.Id -eq 1122 } | Select-Object -First 10`,
          explanation:
            "Event 1121 = Block, Event 1122 = Audit. Zeigt ASR-Aktivität",
        },
      ],
      validation: {
        expectedOutput: "ASR Rules status displayed",
        successMessage: "ASR Rules erfolgreich geprüft!",
      },
    },

    // Block 7: Guided Decision - Endpoint Security Policies
    {
      type: "guided-decision",
      id: "decision-endpoint-security",
      title: "Endpoint Security Policy Design",
      scenario:
        "Du planst die Endpoint Security Strategie für dein Unternehmen. Wähle die richtigen Policies für verschiedene Anforderungen.",
      decisions: [
        {
          question:
            "Alle Windows-Geräte sollen Defender Antivirus nutzen. Wo konfigurierst du das?",
          options: [
            "Configuration Profile > Endpoint Protection",
            "Endpoint Security > Antivirus > Windows Security experience",
            "Endpoint Security > Antivirus > Microsoft Defender Antivirus",
            "Security Baseline > Defender Settings",
          ],
          correctIndex: 2,
          explanation:
            "Endpoint Security > Antivirus > Microsoft Defender Antivirus ist der empfohlene Ort für Defender AV Policies. Bietet die meisten Optionen und besseres Reporting.",
        },
        {
          question:
            "Du willst BitLocker für alle Geräte aktivieren. Beste Option?",
          options: [
            "Configuration Profile > Endpoint Protection > Windows Encryption",
            "Endpoint Security > Disk encryption",
            "Security Baseline (enthält BitLocker)",
            "PowerShell Script über Intune",
          ],
          correctIndex: 1,
          explanation:
            "Endpoint Security > Disk encryption ist speziell für BitLocker optimiert mit Recovery Key Escrow zu Entra ID und besserer Compliance-Sichtbarkeit.",
        },
        {
          question:
            "Die Firewall soll inbound RDP blockieren außer für Admins. Wo?",
          options: [
            "Windows Security Baseline",
            "Endpoint Security > Firewall",
            "Configuration Profile > Network boundary",
            "Conditional Access Policy",
          ],
          correctIndex: 1,
          explanation:
            "Endpoint Security > Firewall ermöglicht granulare Firewall Rules. Baselines sind zu generisch für spezifische Port-Regeln pro Benutzergruppe.",
        },
      ],
    },

    // Block 8: Exam Trap
    {
      type: "exam-trap",
      id: "trap-baseline-conflict",
      title: "Prüfungsfalle: Baseline vs. Profile Konflikt",
      trap: "In der Prüfung wird oft gefragt, was passiert wenn eine Security Baseline UND ein Configuration Profile die GLEICHE Einstellung konfigurieren.",
      correctUnderstanding:
        "'Last write wins' gilt NICHT für Profile/Baseline Konflikte. Stattdessen wird in Intune ein KONFLIKT gemeldet und die Einstellung geht in einen Error-State. Der Benutzer behält den vorherigen Wert.",
      commonMistake:
        "Viele denken das Profile 'gewinnt' weil es spezifischer ist, oder die Baseline weil sie von Microsoft kommt. Beides FALSCH - es gibt einen Konflikt!",
      examTip:
        "Bei Konflikt-Fragen: Prüfe ob es sich um DIESELBE Einstellung (gleicher CSP/OMA-URI) handelt. Wenn ja → Konflikt. Wenn unterschiedliche Einstellungen → beide werden angewendet.",
    },

    // Block 9: Comparison - Endpoint Security vs Configuration Profiles
    {
      type: "comparison",
      id: "compare-endpoint-config",
      title: "Endpoint Security Policies vs. Configuration Profiles",
      itemA: {
        name: "Endpoint Security Policies",
        description: "Spezialisierte Security-fokussierte Policies",
        features: [
          "Antivirus, Firewall, Disk Encryption, ASR, Account Protection",
          "Einfachere UI für Security-Admins",
          "Bessere Integration mit Defender for Endpoint",
          "Security-spezifisches Reporting",
          "Weniger Einstellungen, aber fokussierter",
        ],
      },
      itemB: {
        name: "Configuration Profiles",
        description: "Generale Gerätekonfiguration mit voller Flexibilität",
        features: [
          "Alle Einstellungen möglich (inkl. Security)",
          "Komplexere UI mit Settings Catalog",
          "OMA-URI für Custom Settings",
          "Templates für Standardszenarien",
          "Mehr Kontrolle, aber mehr Komplexität",
        ],
      },
      useItemAWhen: [
        "Security-Team verwaltet Sicherheitseinstellungen separat",
        "Integration mit Defender for Endpoint wichtig",
        "Einfachere Verwaltung gewünscht",
      ],
      useItemBWhen: [
        "Alle Einstellungen in einer Policy konsolidieren",
        "Custom/Nicht-Standard Einstellungen nötig",
        "OMA-URI für spezielle Settings verwenden",
      ],
    },

    // Block 10: Mistake Analysis
    {
      type: "mistake",
      id: "mistake-baseline-production",
      title: "Die Baseline direkt auf alle Geräte",
      scenario:
        "Ein Administrator deployt eine neue Security Baseline Version direkt auf 'All Devices' am Freitagnachmittag...",
      mistake:
        "Neue Baseline-Version ohne Test auf alle Geräte deployed. Die neue Version hatte verschärfte BitLocker-Einstellungen die TPM 1.2 Geräte nicht erfüllen konnten.",
      consequence:
        "Am Montag: 150 Geräte mit BitLocker-Errors, können nicht mehr booten. IT-Hotline überlastet, Produktionsausfall.",
      betterApproach: `**Baseline Deployment Best Practices:**

1. **Immer Pilot-Gruppe zuerst:**
\`\`\`
Gruppe: "Intune-Pilot-Security-Baseline"
Mitglieder: IT-Abteilung + freiwillige Tester
\`\`\`

2. **Baseline-Versionen vergleichen:**
   - Settings Comparison Tool nutzen
   - Delta zwischen Versionen prüfen
   - Breaking Changes identifizieren

3. **Phased Rollout:**
   - Woche 1: Pilot (5%)
   - Woche 2: Early Adopters (20%)
   - Woche 3: Broad Deployment (75%)
   - Exkludiere kritische Systeme bis zum Schluss

4. **Monitoring:**
   - Gerätecompliance-Reports prüfen
   - Error-Logs im Intune Dashboard
   - Defender Security Center für Security-Impact`,
      lessonLearned:
        "Baselines sind mächtig - ein Fehler betrifft alle Geräte gleichzeitig. IMMER staged rollout, NIEMALS Freitag deployen!",
    },

    // Block 11: Summary
    {
      type: "summary",
      id: "summary-security-baselines",
      title: "Security Baselines - Zusammenfassung",
      keyPoints: [
        "Security Baselines = Microsoft-empfohlene Sicherheitseinstellungen als Paket",
        "Wichtigste: Windows Security Baseline, Defender Baseline, Edge Baseline",
        "ASR Rules blockieren typische Angriffsvektoren (Office Makros, Scripts, Credential Theft)",
        "ASR Modes: Disabled → Audit → Warn → Block (Testing-Pfad)",
        "Endpoint Security Policies sind spezialisiert für Antivirus, Firewall, Encryption",
        "Baseline + Profile Konflikt = Error State, nicht 'einer gewinnt'",
        "Immer Pilot-Gruppe zuerst, dann phased rollout",
        "Baseline-Versionen vergleichen vor Update",
      ],
      examPriority: [
        {
          topic: "Baseline vs. Profile Konfliktverhalten",
          importance: "high",
          reason: "Häufige Prüfungsfrage mit Trick-Antworten",
        },
        {
          topic: "ASR Rule Modi (Block/Audit/Warn)",
          importance: "high",
          reason: "Verständnis für Best Practice Testing",
        },
        {
          topic: "Wo konfiguriere ich was?",
          importance: "medium",
          reason: "Endpoint Security vs. Configuration Profiles",
        },
      ],
      nextSteps: [
        "Windows Security Baseline auf Testgruppe deployen",
        "ASR Rules im Audit Mode aktivieren und Events monitoren",
        "Defender for Endpoint Baseline hinzufügen",
      ],
    },
  ],

  labScenario: {
    title: "Enterprise Security Hardening Lab",
    objective:
      "Implementiere eine vollständige Security Baseline Strategie mit ASR Rules",
    environment: [
      "Microsoft 365 E5 Trial mit Defender for Endpoint",
      "Windows 11 Test-VMs (Intune enrolled)",
      "Verschiedene Benutzergruppen (Standard, Entwickler, Admin)",
    ],
    tasks: [
      "Windows Security Baseline auf Pilot-Gruppe deployen",
      "Baseline-Einstellungen reviewen und dokumentieren",
      "ASR Rules im Audit Mode aktivieren",
      "Nach 1 Woche ASR Events analysieren",
      "Exceptions für Entwickler-Gruppe erstellen",
      "Schrittweise auf Block Mode umstellen",
    ],
    estimatedTime: "60-75 Minuten",
  },

  checkpoints: [
    {
      id: "cp-baseline-conflict",
      question:
        "Eine Security Baseline konfiguriert BitLocker Required. Ein Configuration Profile für dieselbe Gruppe setzt BitLocker auf Not Required. Was passiert?",
      options: [
        "Baseline gewinnt weil Microsoft es empfiehlt",
        "Profile gewinnt weil es zuletzt zugewiesen wurde",
        "Ein Konflikt wird gemeldet, vorheriger Wert bleibt",
        "BitLocker wird Required weil sicherer immer gewinnt",
      ],
      correctIndex: 2,
      explanation:
        "Bei Konflikten zwischen Baseline und Profile für DIESELBE Einstellung wird ein Error gemeldet. Es gibt keine Priorität - der vorherige Wert bleibt bis der Konflikt gelöst ist.",
    },
    {
      id: "cp-asr-testing",
      question:
        "Du willst ASR Rules ausrollen, aber bist unsicher ob sie Geschäftsanwendungen stören. Was ist der richtige Ansatz?",
      options: [
        "Auf Testgeräten Block Mode aktivieren",
        "Erst Audit Mode, Events analysieren, dann Block",
        "Nur Warn Mode nutzen, nie Block",
        "ASR ist zu riskant, lieber nicht aktivieren",
      ],
      correctIndex: 1,
      explanation:
        "Best Practice: Audit Mode → Events analysieren → Probleme beheben → Warn Mode → Block Mode. So erkennst du Probleme bevor Benutzer betroffen sind.",
    },
  ],

  relatedModules: ["md102-compliance-policies", "md102-device-configuration"],
  tags: [
    "security-baseline",
    "asr",
    "attack-surface-reduction",
    "defender",
    "endpoint-security",
    "bitlocker",
    "firewall",
  ],
};
