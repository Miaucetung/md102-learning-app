// ============================================================================
// MD-102 Learning Module: Device Enrollment
// ============================================================================
// Topic: Geräte in Microsoft Intune registrieren
// Track: md102-identity
// ============================================================================

import type { LearningModule } from "../../types";

export const deviceEnrollmentModule: LearningModule = {
  id: "md102-device-enrollment",
  slug: "device-enrollment",
  title: "Device Enrollment in Microsoft Intune",

  // -------------------------------------------------------------------------
  // 1. REAL-WORLD PROBLEM (Scenario Entry)
  // -------------------------------------------------------------------------
  realWorldProblem: `
    Du bist IT-Administrator bei der Contoso GmbH. 50 neue Mitarbeiter
    starten nächsten Monat und benötigen Laptops. Einige bringen auch
    eigene Geräte (BYOD) mit. Dein Chef fragt: "Wie stellen wir sicher,
    dass alle Geräte sicher sind und Zugriff auf Unternehmensressourcen
    haben - egal ob Firmengerät oder privat?"
  `,

  // -------------------------------------------------------------------------
  // 2. CONTEXT (Theory Chunks)
  // -------------------------------------------------------------------------
  context: [
    "Device Enrollment ist der erste Schritt zur Geräteverwaltung mit Intune. Ohne Enrollment kann Intune keine Policies anwenden oder Apps bereitstellen.",
    "Es gibt verschiedene Enrollment-Methoden je nach Gerätebesitz: Corporate-owned Geräte werden von der IT verwaltet, BYOD-Geräte gehören den Mitarbeitern.",
    "Azure AD Join und Hybrid Azure AD Join sind die Grundlage für Windows-Enrollment. Ein Gerät muss zuerst mit Azure AD verbunden sein.",
    "Enrollment Restrictions bestimmen, welche Gerätetypen und Plattformen registriert werden dürfen. So kannst du z.B. Android-Smartphones blockieren, aber Windows-Laptops erlauben.",
  ],

  // -------------------------------------------------------------------------
  // 3. LEARNING BLOCKS (Cognitive Science Based)
  // -------------------------------------------------------------------------
  blocks: [
    // PREDICTION BLOCK
    {
      type: "prediction",
      id: "enrollment-prediction",
      question:
        "Ein Mitarbeiter kauft sich einen neuen Windows-Laptop und möchte damit auf Firmen-E-Mails zugreifen. Was passiert, wenn er das Gerät nicht bei Intune registriert?",
      options: [
        "Der Zugriff funktioniert normal - Enrollment ist optional",
        "Er kann sich anmelden, aber Conditional Access blockiert den Zugriff",
        "Windows zeigt eine Fehlermeldung beim Starten",
        "Microsoft 365 ist komplett gesperrt für unbekannte Geräte",
      ],
      correctAnswer:
        "Er kann sich anmelden, aber Conditional Access blockiert den Zugriff",
      explanation:
        "Conditional Access prüft, ob ein Gerät bei Intune registriert und compliant ist. Ohne Enrollment wird das Gerät als 'nicht verwaltet' erkannt und der Zugriff auf geschützte Ressourcen blockiert.",
      skillTags: ["enrollment-basics", "conditional-access"],
    },

    // SCENARIO BLOCK
    {
      type: "scenario",
      id: "enrollment-scenario",
      title: "IT-Abteilung plant Enrollment-Strategie",
      description:
        "Die Contoso GmbH hat 500 Mitarbeiter mit verschiedenen Geräteanforderungen.",
      situation:
        "Du planst die Enrollment-Strategie für die Contoso GmbH. Es gibt drei Gruppen: Außendienst (100 Mitarbeiter mit Firmen-Laptops), Büro (300 Mitarbeiter die zwischen Firmengeräten und Homeoffice-PCs wechseln), und Executives (100 mit eigenen Premium-Geräten/BYOD).",
      challenge: "Wie konfigurierst du Enrollment für jede Gruppe optimal?",
      options: [
        {
          label: "Alle Geräte automatisch enrollen über Autopilot",
          isCorrect: false,
          feedback:
            "Autopilot funktioniert nur für neue Firmengeräte, nicht für BYOD oder bestehende Geräte.",
        },
        {
          label:
            "Automatic Enrollment für Firmengeräte, User Enrollment für BYOD",
          isCorrect: true,
          feedback:
            "Richtig! Automatic Enrollment (via GPO oder Autopilot) für corporate-owned Geräte gibt volle Kontrolle. User Enrollment für BYOD respektiert die Privatsphäre der Mitarbeiter.",
        },
        {
          label: "Alle mit User Enrollment, damit es einheitlich ist",
          isCorrect: false,
          feedback:
            "User Enrollment gibt weniger Kontrolle über Firmengeräte als nötig. Corporate-Geräte sollten automatisch und vollständig verwaltet werden.",
        },
        {
          label: "Manuelles Enrollment durch IT-Team für alle 500 Geräte",
          isCorrect: false,
          feedback:
            "Nicht skalierbar - manuelles Enrollment für 500 Geräte ist zu aufwändig und fehleranfällig.",
        },
      ],
      realWorldTip:
        "In der Praxis: Definiere klare Device Categories in Intune (Corporate, BYOD, Kiosk) und weise automatisch passende Policies zu.",
      skillTags: ["enrollment-strategy", "device-categories"],
    },

    // CONCEPT BLOCK
    {
      type: "concept",
      id: "enrollment-methods",
      title: "Enrollment-Methoden im Überblick",
      content: `
        ## Windows Enrollment-Methoden

        ### 1. Automatic Enrollment (MDM)
        - Aktiviert über: Azure AD → Mobility (MDM and MAM) → Intune
        - Scope: Alle, Einige (Gruppen), oder Keine Benutzer
        - Ergebnis: Geräte werden automatisch bei Intune registriert wenn sie Azure AD joinen

        ### 2. Windows Autopilot
        - Zero-Touch Deployment für neue Geräte
        - Gerät wird vom OEM direkt registriert
        - Benutzer erhält fertig konfiguriertes Gerät

        ### 3. Group Policy (Hybrid Azure AD)
        - Für Geräte die bereits domain-joined sind
        - GPO aktiviert Auto-Enrollment
        - Gerät wird hybride verwaltet (On-Prem AD + Azure AD + Intune)

        ### 4. User Enrollment (BYOD)
        - Benutzer registriert selbst über Company Portal App
        - Weniger Kontrolle, mehr Privatsphäre
        - Nur Arbeitapps und -daten werden verwaltet
      `,
      keyTakeaways: [
        "Automatic Enrollment = Azure AD Premium P1 Lizenz erforderlich",
        "Autopilot = Beste Option für neue Corporate-Geräte",
        "User Enrollment = Richtig für BYOD, respektiert Privatsphäre",
        "Hybrid = Für Organisationen die noch On-Prem AD haben",
      ],
      visualAid: {
        type: "diagram",
        description:
          "Enrollment Flow: Device → Azure AD Join → MDM Discovery → Intune Enrollment → Policy Apply",
      },
      skillTags: ["enrollment-methods", "azure-ad", "mdm"],
    },

    // GUIDED DECISION BLOCK
    {
      type: "guided-decision",
      id: "enrollment-decision",
      title: "Welche Enrollment-Methode für welches Szenario?",
      scenario:
        "Du musst für verschiedene Szenarien die richtige Enrollment-Methode wählen.",
      steps: [
        {
          question:
            "Ein Bauunternehmen kauft 20 neue Surface-Tablets für Bauleiter. Die Geräte sollen sofort einsatzbereit sein ohne IT-Eingriff.",
          options: [
            { label: "User Enrollment", isCorrect: false },
            {
              label: "Windows Autopilot",
              isCorrect: true,
              nextStep: 2,
            },
            { label: "Group Policy Auto-Enrollment", isCorrect: false },
          ],
          explanation:
            "Autopilot ermöglicht Zero-Touch Deployment. Die Tablets werden direkt vom Händler mit Hardware Hash bei Autopilot registriert.",
        },
        {
          question:
            "Ein Krankenhaus migriert 500 bestehende Windows 10 PCs von On-Prem AD zu Hybrid-Verwaltung mit Intune.",
          options: [
            { label: "Bulk Enrollment", isCorrect: false },
            {
              label: "Group Policy Auto-Enrollment",
              isCorrect: true,
              nextStep: 3,
            },
            { label: "Windows Autopilot Reset", isCorrect: false },
          ],
          explanation:
            "Für bestehende domain-joined Geräte ist GPO-basiertes Auto-Enrollment der richtige Weg. Die PCs werden zu Hybrid Azure AD Joined und dann automatisch bei Intune enrollt.",
        },
        {
          question:
            "Ein kleines Startup erlaubt Mitarbeitern, eigene Laptops zu nutzen. Die IT möchte Firmen-Apps schützen ohne private Daten zu sehen.",
          options: [
            {
              label: "User Enrollment mit MAM-only",
              isCorrect: true,
            },
            { label: "Automatic MDM Enrollment", isCorrect: false },
            { label: "Bulk Enrollment Package", isCorrect: false },
          ],
          explanation:
            "MAM-only (Mobile Application Management ohne Device Enrollment) schützt nur Firmendaten in unterstützen Apps, ohne das ganze Gerät zu verwalten. Perfekt für BYOD.",
        },
      ],
      summary:
        "Die richtige Enrollment-Methode hängt von Gerätebesitz, bestehender Infrastruktur und Sicherheitsanforderungen ab.",
      skillTags: ["enrollment-decision", "byod", "hybrid-join"],
    },

    // PRACTICE BLOCK
    {
      type: "practice",
      id: "enrollment-practice",
      title: "Automatic Enrollment konfigurieren",
      instruction:
        "Aktiviere Automatic Enrollment für die Gruppe 'Sales Team'.",
      steps: [
        "Öffne das Microsoft Entra Admin Center (entra.microsoft.com)",
        "Navigiere zu: Identity → Mobility (MDM and MAM)",
        "Klicke auf 'Microsoft Intune'",
        "Unter 'MDM user scope' wähle 'Some'",
        "Klicke 'Select groups' und wähle 'Sales Team'",
        "Klicke 'Save'",
      ],
      hints: [
        "Du brauchst Azure AD Premium P1 für gruppenbasierte Zuweisung",
        "MAM user scope ist nur für BYOD-Geräte ohne vollständiges Enrollment",
      ],
      expectedOutcome:
        "Alle neuen Geräte von Sales Team Mitgliedern werden automatisch bei Intune registriert wenn sie Azure AD joinen.",
      skillTags: ["auto-enrollment", "entra-admin-center"],
    },

    // MISTAKE BLOCK
    {
      type: "mistake",
      id: "enrollment-mistake",
      title: "Häufige Enrollment-Fehler",
      description: "Diese Fehler sehen wir oft bei Intune-Einsteigern:",
      mistakes: [
        {
          wrong: "MDM User Scope auf 'All' setzen ohne Enrollment Restrictions",
          correct:
            "Erst Enrollment Restrictions konfigurieren, dann MDM Scope erweitern",
          explanation:
            "Ohne Restrictions kann jeder beliebig viele Geräte registrieren - auch persönliche Smartphones. Das führt zu unkontrolliertem Gerätewachstum.",
          consequence:
            "Ein Mitarbeiter registriert versehentlich 5 private Geräte und erhält auf allen Firmendaten.",
        },
        {
          wrong: "Autopilot für bestehende Geräte verwenden ohne Windows Reset",
          correct:
            "Autopilot funktioniert nur mit frischen Windows-Installationen oder nach OOBE Reset",
          explanation:
            "Autopilot greift nur während OOBE (Out-of-Box Experience). Ein bereits eingerichtetes Windows wird nicht nachträglich zu Autopilot.",
          consequence:
            "Das bestehende Gerät wird nicht erkannt und der Benutzer muss manuell enrollen.",
        },
        {
          wrong: "Hybrid Join konfigurieren ohne Azure AD Connect Sync",
          correct:
            "Azure AD Connect muss zuerst Geräte aus On-Prem AD zu Azure AD synchronisieren",
          explanation:
            "Hybrid Azure AD Join benötigt die Geräteobjekte in beiden Verzeichnissen. Ohne Sync existiert das Gerät nur in On-Prem AD.",
          consequence:
            "Conditional Access blockiert Hybrid-Geräte weil sie in Azure AD nicht als managed gelten.",
        },
      ],
      skillTags: ["troubleshooting", "enrollment-restrictions", "hybrid-join"],
    },

    // COMPARISON BLOCK
    {
      type: "comparison",
      id: "enrollment-comparison",
      title: "Corporate vs. BYOD Enrollment",
      description: "Vergleich der Verwaltungsoptionen nach Gerätebesitz",
      items: [
        {
          name: "Corporate-Owned",
          characteristics: [
            "IT hat volle Geräte-Kontrolle",
            "Alle Einstellungen können erzwungen werden",
            "Remote Wipe löscht das gesamte Gerät",
            "Kamera, USB, Apps können blockiert werden",
            "Gerät kann von IT komplett zurückgesetzt werden",
          ],
        },
        {
          name: "BYOD (Personal)",
          characteristics: [
            "Nur Arbeitsdaten werden verwaltet",
            "Privater Bereich bleibt unberührt",
            "Selective Wipe entfernt nur Firmendaten",
            "Eingeschränkte Einstellungskontrolle",
            "Mitarbeiter kann Enrollment jederzeit beenden",
          ],
        },
      ],
      keyDifferences: [
        {
          aspect: "Kontrolle",
          optionA: "100% IT-Kontrolle",
          optionB: "~30% nur für Arbeitsdaten",
        },
        {
          aspect: "Privatsphäre",
          optionA: "Keine - IT sieht alles",
          optionB: "Geschützt - IT sieht nur Arbeitsapps",
        },
        {
          aspect: "Wipe",
          optionA: "Full Wipe möglich",
          optionB: "Nur Selective Wipe",
        },
        {
          aspect: "Lizenz",
          optionA: "Intune P1 + Gerätlizenz",
          optionB: "Intune P1 reicht",
        },
      ],
      recommendation:
        "Für Firmengeräte immer Corporate Enrollment. Für Consultants oder Remote-Arbeiter mit eigenen Geräten BYOD mit MAM-Policies.",
      skillTags: ["corporate-enrollment", "byod", "privacy"],
    },

    // EXAM TRAP BLOCK
    {
      type: "exam-trap",
      id: "enrollment-exam-trap",
      title: "Prüfungsfallen beim Enrollment",
      trapDescription:
        "Microsoft-Prüfungen testen gerne Detailwissen zu Enrollment-Voraussetzungen.",
      commonMistake:
        "Antworten wählen die nur 'Intune-Lizenz' als Voraussetzung nennen",
      correctApproach: `
        Für Automatic Enrollment brauchst du:
        1. Azure AD Premium P1 (für MDM Scope)
        2. Intune-Lizenz (P1 oder höher)
        3. Global Admin oder Intune Admin Rechte
        4. Gerät muss Windows 10/11 Pro, Enterprise oder Education sein
      `,
      examPhrasing: [
        "'Which license is MINIMUM required for automatic MDM enrollment?' → Azure AD Premium P1",
        "'Users report devices are not enrolling automatically...' → Check MDM User Scope in Azure AD",
        "'A user's second device fails to enroll...' → Check Device Limit in Enrollment Restrictions",
      ],
      skillTags: ["exam-prep", "licensing", "prerequisites"],
    },

    // SUMMARY BLOCK
    {
      type: "summary",
      id: "enrollment-summary",
      title: "Device Enrollment - Zusammenfassung",
      keyPoints: [
        "Enrollment = Gerät wird von Intune verwaltet und kann Policies empfangen",
        "Corporate Geräte → Automatic Enrollment oder Autopilot",
        "BYOD → User Enrollment mit MAM für Datenschutz",
        "Hybrid Join → Für bestehende On-Prem Geräte mit Azure AD Connect",
        "Enrollment Restrictions → Kontrolle welche Geräte/Plattformen erlaubt sind",
        "Device Limit → Maximale Geräte pro Benutzer (Standard: 5)",
      ],
      examRelevance: {
        weight: "15-20%",
        frequentTopics: [
          "Enrollment-Methoden und Voraussetzungen",
          "Unterschied Corporate vs BYOD",
          "Enrollment Restrictions konfigurieren",
          "Troubleshooting fehlgeschlagenes Enrollment",
        ],
      },
      nextSteps: [
        "Praktische Übung: Enrollment Restriction erstellen",
        "Nächstes Thema: Compliance Policies",
      ],
      skillTags: ["enrollment-complete", "exam-prep"],
    },
  ],

  // -------------------------------------------------------------------------
  // 4. LAB SCENARIO (Hands-On Practice)
  // -------------------------------------------------------------------------
  labScenario: {
    slug: "lab-enrollment-config",
    title: "Enrollment-Umgebung konfigurieren",
    description:
      "Konfiguriere eine vollständige Enrollment-Umgebung für die Contoso GmbH mit unterschiedlichen Benutzergruppen.",
    environment: "Microsoft 365 E5 Trial Tenant mit Intune",
    estimatedMinutes: 45,
    steps: [
      {
        id: 1,
        title: "Automatic Enrollment aktivieren",
        description:
          "Aktiviere MDM Auto-Enrollment für die Gruppe 'Corporate-Devices'",
        detailedInstructions: [
          "Öffne entra.microsoft.com",
          "Gehe zu Identity → Mobility (MDM and MAM)",
          "Wähle Microsoft Intune",
          "Setze MDM User Scope auf 'Some'",
          "Wähle die Gruppe 'Corporate-Devices'",
          "Speichere die Einstellung",
        ],
        tip: "MAM User Scope nur aktivieren wenn du auch BYOD-Geräte ohne vollständiges MDM verwalten willst.",
      },
      {
        id: 2,
        title: "Enrollment Restriction erstellen",
        description:
          "Erlaube nur Windows und blockiere persönliche Android/iOS Geräte",
        detailedInstructions: [
          "Öffne intune.microsoft.com",
          "Gehe zu Devices → Enrollment → Enrollment device platform restrictions",
          "Klicke '+ Create restriction'",
          "Name: 'Windows-Only-Corporate'",
          "Unter Windows: Allow",
          "Unter Android, iOS, macOS: Block (für personally-owned)",
          "Weise die Restriction einer Gruppe zu",
        ],
        warning:
          "Reihenfolge der Restrictions ist wichtig! Die erste passende Restriction gewinnt.",
      },
      {
        id: 3,
        title: "Device Limit konfigurieren",
        description: "Begrenze die Anzahl der Geräte pro Benutzer auf 3",
        detailedInstructions: [
          "Gehe zu Devices → Enrollment → Device limit restrictions",
          "Klicke auf 'Default'",
          "Setze Device Limit auf 3",
          "Oder erstelle eine neue Restriction für spezifische Gruppen",
        ],
        tip: "Executives oder Power-User benötigen oft ein höheres Limit (z.B. 5 Geräte).",
      },
      {
        id: 4,
        title: "Device Categories erstellen",
        description:
          "Erstelle Kategorien zur automatischen Gruppierung enrollter Geräte",
        detailedInstructions: [
          "Gehe zu Devices → Device categories",
          "Klicke '+ Create device category'",
          "Erstelle: 'Corporate-Laptop', 'Corporate-Tablet', 'BYOD'",
          "Diese Kategorien können bei Enrollment automatisch zugewiesen werden",
        ],
      },
      {
        id: 5,
        title: "Test-Enrollment durchführen",
        description:
          "Registriere ein Test-Gerät und verifiziere die Konfiguration",
        detailedInstructions: [
          "Auf einem Windows 10/11 Testgerät:",
          "Settings → Accounts → Access work or school",
          "Klicke 'Connect'",
          "Melde dich mit einem Benutzer aus 'Corporate-Devices' an",
          "Wähle 'Join this device to Azure AD'",
          "Verifiziere in Intune dass das Gerät erscheint",
        ],
        expectedOutput:
          "Gerät erscheint in Intune unter Devices → All Devices mit Status 'Enrolled'",
      },
    ],
    validation:
      "Überprüfe in Intune: Neues Gerät ist sichtbar, richtige Device Category zugewiesen, Enrollment Restrictions greifen.",
  },

  // -------------------------------------------------------------------------
  // 5. CHECKPOINTS (Active Recall)
  // -------------------------------------------------------------------------
  checkpoints: [
    {
      questionId: "enrollment-check-1",
      order: 1,
      introText: "Teste dein Wissen über Enrollment-Grundlagen:",
    },
    {
      questionId: "enrollment-check-2",
      order: 2,
    },
    {
      questionId: "enrollment-check-3",
      order: 3,
    },
  ],

  // -------------------------------------------------------------------------
  // 6. EXPLANATION (Why & How)
  // -------------------------------------------------------------------------
  explanation: {
    why: "Device Enrollment ist die Grundlage aller Intune-Verwaltung. Ohne Enrollment kann Intune keine Policies anwenden, keine Apps bereitstellen und keine Sicherheit durchsetzen. Es ist der erste Schritt im MDM-Lifecycle.",
    how: "Enrollment verbindet das Gerät mit Azure AD und registriert es beim Intune-MDM-Service. Danach kann Intune über MDM-Protokolle Konfigurationen pushen und Compliance überwachen.",
    deepDive: `
      ## Technischer Ablauf des Enrollments

      1. **Azure AD Join/Registration**
         - Gerät erhält ein Azure AD Device Object
         - Device ID und Certificates werden erstellt

      2. **MDM Discovery**
         - Windows fragt Azure AD nach MDM-URLs
         - Azure AD gibt Intune-Enrollment-URL zurück

      3. **Enrollment Request**
         - Gerät sendet Enrollment-Request an Intune
         - Intune validiert Lizenz und Berechtigung

      4. **Certificate Exchange**
         - Intune sendet MDM-Zertifikat
         - Gerät speichert Zertifikat für sichere Kommunikation

      5. **Initial Sync**
         - Gerät pullt alle zugewiesenen Policies
         - Compliance-Check wird durchgeführt
    `,
    commonQuestions: [
      {
        question: "Wie lange dauert Enrollment?",
        answer:
          "Initial 2-5 Minuten, dann regelmäßige Syncs alle 8 Stunden (oder manuell über Company Portal).",
      },
      {
        question: "Was passiert bei Enrollment-Fehlern?",
        answer:
          "Prüfe: Lizenz vorhanden? MDM Scope richtig? Enrollment Restrictions? Event Logs auf dem Gerät unter Applications and Services Logs → Microsoft → Windows → DeviceManagement-Enterprise-Diagnostics-Provider.",
      },
      {
        question: "Kann ein Gerät bei mehreren MDMs enrollt sein?",
        answer:
          "Nein, Windows unterstützt nur einen MDM-Provider gleichzeitig. Bei Wechsel muss das Gerät erst unenrollt werden.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. TRANSFER TASK (Apply Knowledge)
  // -------------------------------------------------------------------------
  transferTask: {
    title: "Enrollment-Strategie für dein Unternehmen",
    description: `
      Überlege dir eine Enrollment-Strategie für deine eigene Organisation
      (oder eine fiktive mit 200 Mitarbeitern):

      1. Welche Gerätetypen gibt es? (Laptops, Tablets, Smartphones)
      2. Wer besitzt die Geräte? (Firma oder Mitarbeiter/BYOD)
      3. Welche Enrollment-Methode passt zu welcher Gruppe?
      4. Welche Enrollment Restrictions würdest du setzen?
      5. Wie viele Geräte pro Benutzer erlaubst du?

      Dokumentiere deinen Plan und diskutiere ihn mit einem Kollegen
      oder in einem IT-Forum.
    `,
    expectedOutcome:
      "Ein dokumentierter Enrollment-Plan der Corporate und BYOD-Szenarien abdeckt.",
    hints: [
      "Denke an Sicherheit UND Benutzerfreundlichkeit",
      "Executives/VIPs brauchen oft Sonderregelungen",
      "Remote-Arbeiter haben andere Anforderungen als Büro-Mitarbeiter",
    ],
  },

  // -------------------------------------------------------------------------
  // METADATA
  // -------------------------------------------------------------------------
  topic: "device-enrollment",
  track: "md102-identity",
  difficulty: "intermediate",
  estimatedMinutes: 45,
  prerequisites: ["intune-intro", "azure-ad-basics"],
  relatedModules: ["autopilot", "compliance-policies", "conditional-access"],
  skillTags: [
    "enrollment",
    "mdm",
    "azure-ad",
    "byod",
    "corporate-devices",
    "enrollment-restrictions",
  ],
};

export default deviceEnrollmentModule;
