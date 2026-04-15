export type Md102Question = {
  /** ID aus deiner Sammlung (z.B. Q51, Q60, Q344, …) - optional, wird aus number generiert wenn fehlend */
  id?: string;
  /** Laufende Nummer im Test (1–110 gedacht, hier z.B. 51–60) */
  number: number;
  /** Themenbereich laut MD-102 Blueprint */
  area: string;
  /** grobe Schwierigkeit zur Orientierung */
  difficulty: "easy" | "medium" | "hard" | "info";
  /**
   * Fragetext.
   * WICHTIG: In der React-Komponente mit className="whitespace-pre-line"
   * oder style={{ whiteSpace: "pre-line" }} rendern.
   */
  question: string;
  /** Antwortoptionen A, B, C, … */
  options: { key: string; text: string }[];
  /** Richtige(n) Antwort(en), z.B. ["B"] oder ["B", "D"] */
  correctAnswers: string[];
  /** Deutsche Erklärung, warum die Antwort richtig ist (prüfungsrelevant erklärt) */
  explanation?: string;
  /** Alternative Erklärungsfeld (DE) */
  explanationDe?: string;
  /** Optionale Links zu Docs / Referenzen */
  references?: string[];
};

export const QUESTIONS_MD102: Md102Question[] = [
  {
    id: "Q1",
    number: 1,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "iOS/iPadOS App Protection Policy – PIN & Zugangskontrolle",
      "",
      "Du hast eine Microsoft 365 Subscription und verwendest die Microsoft Intune Suite,",
      "um iOS/iPadOS-Geräte mit App Protection Policies (MAM) zu schützen.",
      "",
      "Die Policy ist wie folgt konfiguriert:",
      "",
      "- Work or school account credentials for access: Require",
      "- PIN or biometric method required: Enabled",
      "- Recheck the access requirements after (minutes of inactivity): 30",
      "- MAX PIN attempts: 5",
      "- Action after max attempts: Reset PIN",
      "",
      "Frage:",
      "Was geschieht nach 30 Minuten Inaktivität und nach fünf falschen PIN-Eingaben?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Nach 30 Minuten wird nur die App-PIN abgefragt; nach 5 Fehlversuchen wird der Benutzer dauerhaft gesperrt.",
      },
      {
        key: "B",
        text: "Nach 30 Minuten werden nur die Kontozugangsdaten abgefragt; nach 5 Fehlversuchen passiert nichts.",
      },
      {
        key: "C",
        text: "Nach 30 Minuten ist kein erneuter Login erforderlich; nach 5 Fehlversuchen werden alle App-Daten gelöscht.",
      },
      {
        key: "D",
        text: "Nach 30 Minuten wird nur eine biometrische Authentifizierung verlangt; nach 5 Fehlversuchen muss das Gerät zurückgesetzt werden.",
      },
      {
        key: "E",
        text: "Nach 30 Minuten muss der Benutzer die PIN und die Kontozugangsdaten erneut eingeben; nach 5 falschen PIN-Eingaben muss der App-PIN zurückgesetzt werden.",
      },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Die iOS/iPadOS App Protection Policy ist so konfiguriert, dass der Zugriff sowohl mit Kontozugangsdaten",
      "(Work or school account credentials for access = Require) als auch mit einer App-PIN bzw. biometrischen Methoden",
      "geschützt wird (PIN or biometric method required = Enabled).",
      "",
      "Durch die Einstellung 'Recheck the access requirements after (minutes of inactivity) = 30' werden nach",
      "30 Minuten Inaktivität die Zugriffsanforderungen erneut geprüft. Da sowohl Kontozugangsdaten als auch PIN",
      "erforderlich sind, muss der Benutzer beides erneut eingeben.",
      "",
      "Für die PIN-Sicherheit ist 'MAX PIN attempts = 5' mit der Aktion 'Reset PIN' konfiguriert.",
      "Das bedeutet: Nach fünf falschen PIN-Eingaben wird der Benutzer nicht dauerhaft gesperrt und",
      "die App-Daten werden nicht automatisch gelöscht, sondern der Benutzer muss den App-PIN zurücksetzen.",
      "Dazu authentifiziert er sich erneut mit seinem Konto (inkl. MFA, falls erforderlich) und definiert anschließend eine neue App-PIN.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy-settings-ios",
    ],
  },
  // ... rest of questions continue as in the original document ...
  {
    number: 2,
    area: "Manage Applications (15–20%)",
    difficulty: "easy",

    question: [
      "App Protection Policies zum Schutz vor Datenkopien zwischen Apps",
      "",
      "Du verwaltest einen Azure AD Tenant mit Geräten auf Windows 10, Android und iOS/iPadOS.",
      "Alle Geräte enthalten eine App namens App1 und sind in Microsoft Intune registriert.",
      "",
      "Du musst verhindern, dass Benutzer Daten aus App1 kopieren und in andere Apps einfügen können.",
      "",
      "Frage:",
      "Welche Art von Richtlinie musst du verwenden und wie viele Richtlinien benötigst du mindestens?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device configuration policy – 1 Richtlinie" },
      { key: "B", text: "App configuration policy – 1 Richtlinie" },
      {
        key: "C",
        text: "App protection policy – 3 Richtlinien (Windows, Android, iOS/iPadOS)",
      },
      { key: "D", text: "Conditional access policy – 3 Richtlinien" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Das Szenario beschreibt den Schutz von Unternehmensdaten innerhalb einer App (App1),",
      "insbesondere die Kontrolle von Copy & Paste zwischen Apps. Dies ist eine klassische Aufgabe für",
      "App Protection Policies (APP/MAM).",
      "",
      "App Protection Policies werden immer plattformbasiert konfiguriert:",
      "- Eine Policy für Windows-Apps (z. B. M365 Apps auf Windows 10)",
      "- Eine Policy für Android-Apps",
      "- Eine Policy für iOS/iPadOS-Apps",
      "",
      "Da im Szenario Windows 10, Android und iOS/iPadOS genutzt werden,",
      "sind mindestens drei App Protection Policies erforderlich – jeweils eine pro Plattform.",
      "",
      "App Configuration Policies steuern nur App-Einstellungen (z. B. URLs, Standardwerte),",
      "nicht jedoch die Containerisierung oder Copy/Paste-Sperren.",
      "Device Configuration Policies wirken auf Geräteebene, nicht auf App-Daten-Ebene.",
      "Conditional Access adressiert Zugriffsbedingungen, nicht das Verhalten von Copy & Paste in Apps.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy",
    ],
  },

  {
    id: "Q2",
    number: 3,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Review Device Startup Processes and Restart Frequency",
      "",
      "Du hast eine Microsoft 365 Subscription mit 100 Geräten, die alle in Microsoft Intune registriert sind.",
      "Du möchtest die Startprozesse und die Neustartfrequenz der Geräte analysieren,",
      "um die Benutzererfahrung und Stabilität zu bewerten.",
      "",
      "Frage:",
      "Welches Tool solltest du verwenden, um Startup-Performance und Neustarthäufigkeit zu analysieren?",
    ].join("\n"),

    options: [
      { key: "A", text: "Azure Monitor" },
      { key: "B", text: "Intune Data Warehouse" },
      { key: "C", text: "Microsoft Defender for Endpoint" },
      { key: "D", text: "Endpoint Analytics" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Endpoint Analytics ist Teil der Microsoft Endpoint Manager / Intune Suite und",
      "ist speziell darauf ausgelegt, die Endbenutzererfahrung zu analysieren.",
      "",
      "Zu den Kernfunktionen zählen:",
      "- Startup Performance (Bootzeiten, Verzögerungen durch Autostartprozesse)",
      "- Restart Frequency (wie oft werden Geräte neu gestartet)",
      "- Application Reliability (Abstürze, Hänger)",
      "- Proactive Remediations (Skripte zur automatischen Problembehebung)",
      "",
      "Azure Monitor dient primär zur Überwachung von Cloud-Ressourcen und Logdaten,",
      "liefert jedoch keine spezifischen Startup-Experience-Kennzahlen auf Geräteebene.",
      "Intune Data Warehouse stellt historische Intune-Daten über OData bereit,",
      "enthält aber keine detaillierten Startup-/Neustartmetriken.",
      "Microsoft Defender for Endpoint fokussiert auf Sicherheitsereignisse und Bedrohungen,",
      "nicht auf Bootperformance und Neustarthäufigkeit.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/analytics/overview",
      "https://learn.microsoft.com/mem/analytics/startup-performance",
    ],
  },

  {
    id: "Q3",
    number: 4,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Events, die von einem Log Analytics Workspace gesammelt werden",
      "",
      "Mehrere Windows 10-Computer sind mit einem Azure Log Analytics Workspace verbunden.",
      "Der Workspace ist so konfiguriert, dass alle verfügbaren Ereignisse aus den Windows-Ereignisprotokollen gesammelt werden:",
      "",
      "- Application",
      "- System",
      "- Security",
      "- Custom (benutzerdefiniertes Log)",
      "",
      "Im Ereignisprotokoll gibt es folgende Events:",
      "- Event 1: Application",
      "- Event 2: System",
      "- Event 3: Security",
      "- Event 4: Custom",
      "",
      "Frage:",
      "Welche Ereignisse werden im Log Analytics Workspace gesammelt?",
    ].join("\n"),

    options: [
      { key: "A", text: "Event 1 only" },
      { key: "B", text: "Event 2 and 3 only" },
      { key: "C", text: "Event 1 and 3 only" },
      { key: "D", text: "Event 1, 2 and 4 only" },
      { key: "E", text: "Event 1, 2, 3 and 4" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Der klassische Log Analytics Agent (bzw. Azure Monitor Agent mit Standardkonfiguration)",
      "kann Ereignisse aus bestimmten Windows-Ereignislogs sammeln, z. B.:",
      "- Application",
      "- System",
      "- Custom Logs",
      "",
      "Security-Events werden nicht einfach 'mit allen anderen' über den gleichen Mechanismus gesammelt,",
      "sondern benötigen typischerweise spezielle Konfigurationen oder Integrationen",
      "wie Microsoft Sentinel, Defender for Cloud oder AMA mit erweiterter Security-Datensammlung.",
      "",
      "In vielen Prüfungsfragen ist daher die Kernaussage:",
      "Standard-Log Analytics-Sammlung umfasst Application, System und Custom Logs,",
      "aber nicht automatisch Security Events.",
      "",
      "Daher werden hier Event 1 (Application), Event 2 (System) und Event 4 (Custom) gesammelt –",
      "also Antwort D.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/azure/azure-monitor/agents/data-sources-windows-events",
      "https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-tutorial",
    ],
  },

  {
    id: "Q4",
    number: 5,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Android Enterprise Geräte im Single-App-Kioskmodus konfigurieren",
      "",
      "Du verwaltest Android Enterprise-Geräte (corporate-owned) mit Microsoft Intune.",
      "Du möchtest ein Gerät so konfigurieren, dass es nur eine bestimmte App im Kioskmodus ausführt (Single-App Mode).",
      "",
      "Frage:",
      "In welchem Bereich eines Device Restrictions Profils musst du den Kioskmodus konfigurieren?",
    ].join("\n"),

    options: [
      { key: "A", text: "General" },
      { key: "B", text: "Users and Accounts" },
      { key: "C", text: "System Security" },
      { key: "D", text: "Device Experience" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Der Kioskmodus auf Android Enterprise-Geräten (z. B. Single-App Kiosk) wird in Intune",
      "über ein Device Restrictions Profil konfiguriert.",
      "",
      "Die Konfiguration erfolgt im Bereich 'Device Experience', dort können u. a. folgende Einstellungen gesetzt werden:",
      "- Kiosk mode: Single app, Multi app, etc.",
      "- Zu verwendende App für den Kioskmodus",
      "",
      "'General' enthält nur grundlegende Einstellungen (Name, Zeit, etc.),",
      "'Users and Accounts' steuert Benutzer- und Konto-Einstellungen,",
      "'System Security' betrifft Sicherheitsrichtlinien wie PIN, Verschlüsselung und Passwortanforderungen.",
      "",
      "Nur 'Device Experience' enthält die Kiosk-spezifischen Optionen für Android Enterprise.",
      "Daher ist Antwort D korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-restrictions-android-for-work",
      "https://learn.microsoft.com/mem/intune/configuration/device-restrictions-android-enterprise#device-experience",
    ],
  },

  {
    id: "Q5",
    number: 6,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Device Configuration Profile nur auf ein bestimmtes Gerät anwenden",
      "",
      "Du hast eine Azure AD-Gruppe Group1 und zwei Windows 10-Geräte: Device1 und Device2.",
      "Ein Device Configuration Profile (Profile1) ist aktuell Group1 zugewiesen.",
      "",
      "Frage:",
      "Du möchtest sicherstellen, dass Profile1 nur auf Device1 angewendet wird.",
      "Welchen Teil des Profils musst du ändern?",
    ].join("\n"),

    options: [
      { key: "A", text: "Assignments" },
      { key: "B", text: "Settings" },
      { key: "C", text: "Scope (Tags)" },
      { key: "D", text: "Applicability Rules" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Device Configuration Profiles in Intune werden über 'Assignments' zugewiesen.",
      "Dort wird festgelegt, welche Benutzer- oder Gerätegruppen das Profil erhalten.",
      "",
      "Um Profile1 nur auf Device1 anzuwenden, musst du die Zuweisung anpassen, z. B.:",
      "- Neue Gerätegruppe, in der nur Device1 Mitglied ist, und diese Gruppe in den Assignments verwenden; oder",
      "- Device2 in einer Exclude-Gruppe ausschließen.",
      "",
      "'Settings' verändern lediglich die Inhalte der Richtlinie, nicht aber die Zielgeräte.",
      "'Scope (Tags)' steuert in erster Linie, welche Admins das Profil sehen/verwenden dürfen (RBAC),",
      "nicht welche Geräte das Profil bekommen.",
      "'Applicability Rules' filtern nach OS-Version oder Edition (z. B. nur Windows 11 Pro),",
      "aber nicht nach einzelnen Geräten.",
      "",
      "Daher ist die notwendige Änderung: Assignments (Antwort A).",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profile-assign",
      "https://learn.microsoft.com/mem/intune/fundamentals/scope-tags",
    ],
  },

  {
    id: "Q6",
    number: 7,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Windows Update zentral für Azure AD-joined Geräte verwalten",
      "",
      "Du hast 100 Windows 10-Geräte:",
      "- Keine On-Premises-Serverinfrastruktur",
      "- Alle Geräte sind Azure AD-joined (keine lokale Domäne)",
      "",
      "Die Update-Einstellungen sind uneinheitlich, einige Geräte sind auf manuelle Updates eingestellt.",
      "",
      "Ziel:",
      "- Zentrale Verwaltung der Windows Updates",
      "- Minimierung des Internetverkehrs",
      "- Keine zusätzlichen Server und möglichst keine Zusatzkosten",
      "",
      "Frage:",
      "Welche Kombination von Technologien solltest du verwenden?",
    ].join("\n"),

    options: [
      { key: "A", text: "WSUS + Group Policy" },
      { key: "B", text: "Nur WSUS" },
      { key: "C", text: "Microsoft Endpoint Configuration Manager (SCCM)" },
      { key: "D", text: "Nur Group Policy" },
      {
        key: "E",
        text: "Windows Update for Business + Intune + Delivery Optimization",
      },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Da keine Serverinfrastruktur vorhanden ist und alle Geräte Azure AD-joined sind,",
      "ist ein cloudbasierter Ansatz optimal.",
      "",
      "Windows Update for Business (WUfB) ermöglicht:",
      "- Steuerung von Update-Ringen, Deadlines, Pausen etc.",
      "- Direkte Nutzung von Microsoft Update ohne eigenen WSUS-Server.",
      "",
      "Intune dient als zentrales Verwaltungsportal, um WUfB-Richtlinien zu konfigurieren",
      "und den Update-Status zu überwachen.",
      "",
      "Delivery Optimization reduziert Internet-Traffic, indem Updates per Peer-to-Peer",
      "zwischen Geräten im gleichen Netzwerk verteilt werden.",
      "",
      "WSUS oder SCCM würden zusätzliche Serverinfrastruktur erfordern und",
      "passen nicht zur Anforderung 'keine neuen Server'.",
      "GPO kann bei reinen Azure AD-joined Geräten nicht ohne Weiteres eingesetzt werden.",
      "",
      "Daher ist die richtige Kombination: Windows Update for Business + Intune + Delivery Optimization (Antwort E).",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
      "https://learn.microsoft.com/windows/deployment/update/waas-delivery-optimization",
    ],
  },

  {
    id: "Q7",
    number: 8,
    area: "Manage Applications (15–20%)",
    difficulty: "medium",

    question: [
      "Legacy Authentication für Web App-Zugriff blockieren",
      "",
      "Du verwaltest eine Microsoft 365 E5 Subscription mit einem Benutzer User1 und einer Webanwendung App1.",
      "App1 soll nur moderne Authentifizierung (OAuth 2.0 / OpenID Connect) akzeptieren.",
      "Alle Anfragen mit Legacy Authentication (z. B. Basic Auth, IMAP, POP, SMTP, MAPI) sollen blockiert werden.",
      "",
      "Du planst eine Conditional Access Policy mit:",
      "- Users: User1",
      "- Cloud apps: App1",
      "- Grant: Block access",
      "",
      "Frage:",
      "Welche Bedingung (Condition) musst du konfigurieren, um gezielt Legacy Authentication zu blockieren?",
    ].join("\n"),

    options: [
      { key: "A", text: "Filter for devices" },
      { key: "B", text: "Device platforms" },
      { key: "C", text: "User risk" },
      { key: "D", text: "Sign-in risk" },
      { key: "E", text: "Client apps (Legacy Authentication)" },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Azure AD Conditional Access kann anhand des verwendeten Clienttyps/Protokolls unterscheiden,",
      "ob es sich um moderne oder um Legacy Authentication handelt.",
      "",
      "Die Einstellung 'Client apps' (teilweise als 'Client apps (Preview)' bezeichnet) erlaubt es,",
      "zwischen Browser, Mobile & Desktop Apps und Legacy Authentication Clients zu unterscheiden.",
      "",
      "Um gezielt nur Legacy Authentication zu blockieren, konfigurierst du:",
      "- Condition: Client apps → Nur Legacy authentication",
      "- Grant: Block access",
      "",
      "Damit werden Anfragen mit modernen Protokollen (OAuth 2.0 / OIDC) weiterhin erlaubt,",
      "während Basic Auth/Legacy-Protokolle (POP, IMAP, SMTP, MAPI, EAS) blockiert werden.",
      "",
      "Andere Conditions wie Device platforms, User risk oder Sign-in risk steuern ganz andere Aspekte",
      "und können Legacy Authentication nicht spezifisch adressieren.",
      "",
      "Daher ist Antwort E korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/azure/active-directory/conditional-access/block-legacy-authentication",
      "https://learn.microsoft.com/azure/active-directory/fundamentals/concept-fundamentals-authentication",
    ],
  },
  {
    id: "Q8",
    number: 9,
    area: "Manage Applications (15–20%)",
    difficulty: "easy",

    question: [
      "Microsoft 365 Apps for Enterprise bereitstellen",
      "",
      "Du verwaltest eine Microsoft 365-Subscription.",
      "In deiner Umgebung befinden sich 10 Windows 10-Geräte,",
      "die bereits in der Mobile Device Management (MDM)-Lösung Microsoft Intune registriert sind.",
      "",
      "Ziel:",
      "Die Microsoft 365 Apps for Enterprise Suite (ehemals Office 365 ProPlus) soll automatisch auf allen Computern installiert werden.",
      "",
      "Frage:",
      "Wie kannst du die Microsoft 365 Apps for Enterprise-Suite an alle Geräte bereitstellen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Im Microsoft Intune Admin Center ein Windows 10 device configuration profile erstellen",
      },
      { key: "B", text: "In Azure AD eine App Registration hinzufügen" },
      { key: "C", text: "In Azure AD eine Enterprise Application hinzufügen" },
      {
        key: "D",
        text: "Im Microsoft Intune Admin Center eine App hinzufügen",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Microsoft 365 Apps for Enterprise (früher Office 365 ProPlus) werden in einer MDM-Umgebung mit Intune",
      "als verwaltete Anwendung bereitgestellt, nicht über Gerätekonfigurationsprofile oder Azure AD-App-Registrierungen.",
      "",
      "Im Microsoft Intune Admin Center gehst du wie folgt vor:",
      "- Apps → All apps → Add",
      "- App type: Windows 10 and later → Microsoft 365 Apps for Windows 10 and later",
      "- Komponenten auswählen (z. B. Word, Excel, Outlook, Teams)",
      "- Update-Kanal konfigurieren (z. B. Monthly Enterprise Channel)",
      "- App den relevanten Geräte- oder Benutzergruppen zuweisen",
      "",
      "Intune sorgt dann für die automatische Installation und Aktualisierung der Apps auf allen zugewiesenen Geräten.",
      "",
      "Device configuration profiles (Antwort A) dienen zur Konfiguration von Einstellungen (z. B. Richtlinien),",
      "nicht zur App-Bereitstellung.",
      "App Registration (Antwort B) und Enterprise Application (Antwort C) sind Azure-AD-Konzepte zur Authentifizierung/SSO",
      "für Anwendungen, nicht für die Installation von Office auf Endgeräten.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/apps-add-office365",
    ],
  },

  {
    id: "Q9",
    number: 10,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Entfernen eines offline Windows-Geräts aus Intune",
      "",
      "Du hast eine Microsoft 365 Subscription, die Microsoft Intune verwendet.",
      "Ein Windows 11-Gerät namens Device1 ist seit 30 Tagen offline und wird über Intune verwaltet.",
      "",
      "Ziel:",
      "Du möchtest Device1 sofort aus Intune entfernen.",
      "Wenn das Gerät später wieder eine Verbindung herstellt, sollen alle durch Intune bereitgestellten Apps und Daten entfernt werden,",
      "aber Benutzerdaten, persönliche Apps und OEM-Apps sollen erhalten bleiben.",
      "",
      "Frage:",
      "Welche Aktion solltest du ausführen, um dieses Verhalten sicherzustellen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Delete action" },
      { key: "B", text: "Retire action" },
      { key: "C", text: "Fresh Start action" },
      { key: "D", text: "Autopilot Reset action" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "In Intune stehen dir primär drei Mechanismen zum Entfernen/Zurücksetzen von Geräten zur Verfügung:",
      "- Retire: Entfernt Unternehmensdaten und -Apps, lässt persönliche Daten/apps und OEM-Apps bestehen.",
      "- Wipe: Setzt das Gerät auf Werkseinstellungen zurück (mit oder ohne Benutzerkonten).",
      "- Delete: Entfernt das Gerät aus Intune.",
      "",
      "Im Prüfungskontext ist hier wichtig:",
      "- Du willst das Gerät sofort aus der Intune-Konsole entfernen.",
      "- Beim nächsten Check-in soll das Gerät dennoch so behandelt werden, dass Unternehmensdaten entfernt werden,",
      "  aber persönliche Daten erhalten bleiben.",
      "",
      "Die beschriebene Lösung ist die Delete-Aktion:",
      "Device1 wird sofort aus Intune gelöscht.",
      "Kommt es doch noch einmal mit Intune in Kontakt, wird der Status so behandelt,",
      "als sei das Gerät 'retired' – Unternehmensdaten und verwaltete Apps werden entfernt,",
      "Benutzerdaten und OEM-Apps bleiben bestehen.",
      "",
      "Retire (Antwort B) würde das Gerät nicht sofort aus der Konsole entfernen.",
      "Fresh Start (Antwort C) entfernt u. a. benutzerinstallierte Apps und ist eher für ein 'sauberes' Windows gedacht.",
      "Autopilot Reset (Antwort D) bereitet ein Gerät für eine Wiederverwendung in der Organisation vor,",
      "löscht Profil/Daten und lässt die Verwaltung bestehen – nicht passend zum Ziel, das Gerät zu entfernen.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/remote-actions/devices-wipe",
    ],
  },

  {
    id: "Q10",
    number: 11,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Microsoft Defender for Endpoint auf macOS bereitstellen",
      "",
      "Du hast eine Microsoft 365 E5-Subscription mit 500 macOS-Geräten,",
      "die bereits in Microsoft Intune registriert sind.",
      "",
      "Frage:",
      "Du musst sicherstellen, dass du Microsoft Defender for Endpoint Antivirus-Policies",
      "auf diese macOS-Geräte anwenden kannst, bei minimalem administrativen Aufwand.",
      "Welche Maßnahme solltest du ergreifen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Die macOS-Geräte im Microsoft 365 Purview compliance portal onboarden",
      },
      {
        key: "B",
        text: "Eine Security Baseline im Endpoint Manager Admin Center erstellen",
      },
      {
        key: "C",
        text: "Defender for Endpoint manuell auf allen macOS-Geräten installieren",
      },
      {
        key: "D",
        text: "Ein Konfigurationsprofil im Endpoint Manager Admin Center erstellen",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Für macOS-Geräte wird Microsoft Defender for Endpoint typischerweise über Intune",
      "mit Hilfe eines Konfigurationsprofils ausgerollt.",
      "",
      "Vereinfachter Ablauf:",
      "- Im Microsoft 365 Defender Portal das Onboarding-Paket für macOS herunterladen (Bereitstellungsmethode: Intune).",
      "- In Intune ein macOS-Device Configuration Profile erstellen (z. B. Template: Custom, mit passenden .plist-/Konfigurationswerten).",
      "- Das Profil den relevanten macOS-Gerätegruppen zuweisen.",
      "",
      "Damit wird Defender for Endpoint automatisch installiert und konfiguriert,",
      "sodass du anschließend Antivirus- und weitere Sicherheitsrichtlinien zentral verwalten kannst.",
      "",
      "Option A (Purview) hat Schwerpunkt auf Compliance & Daten, nicht auf AV-Bereitstellung.",
      "Option B (Security Baseline) betrifft vordefinierte Windows-Konfigurationen, nicht macOS.",
      "Option C (manuelle Installation) wäre bei 500 Geräten zu aufwendig und widerspricht der Anforderung,",
      "den administrativen Aufwand zu minimieren.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/mac-install-with-intune",
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/microsoft-defender-endpoint",
    ],
  },

  {
    id: "Q11",
    number: 12,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Microsoft Defender Firewall und Antivirus in Intune konfigurieren",
      "",
      "Du hast einen Azure AD-Mandanten und 100 Windows 10-Geräte,",
      "die Azure AD-joined und über Intune verwaltet werden.",
      "",
      "Du musst Microsoft Defender Firewall und Microsoft Defender Antivirus auf diesen Geräten konfigurieren.",
      "Die Lösung soll den administrativen Aufwand minimieren.",
      "",
      "Frage:",
      "Welche zwei Aktionen solltest du durchführen? (Jede richtige Auswahl ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      { key: "A", text: "GPO für Defender Antivirus konfigurieren" },
      {
        key: "B",
        text: "Device configuration profile → Device restrictions für Firewall verwenden",
      },
      {
        key: "C",
        text: "Device configuration profile → Endpoint protection für Antivirus verwenden",
      },
      {
        key: "D",
        text: "Device configuration profile → Device restrictions für Antivirus verwenden",
      },
      {
        key: "E",
        text: "Device configuration profile → Endpoint protection für Firewall verwenden",
      },
      { key: "F", text: "GPO für Defender Firewall konfigurieren" },
    ],

    correctAnswers: ["D", "E"],

    explanation: [
      "In Intune können Defender-Komponenten über unterschiedliche Profiltypen konfiguriert werden:",
      "",
      "- Microsoft Defender Antivirus-Einstellungen werden typischerweise in Device restriction-Profilen abgebildet.",
      "- Microsoft Defender Firewall-Einstellungen werden im Bereich Endpoint protection konfiguriert.",
      "",
      "Da es sich um cloudverwaltete, Azure AD-joined Geräte handelt, soll die gesamte Konfiguration aus Intune erfolgen,",
      "ohne zusätzliche GPO-Infrastruktur.",
      "",
      "Daher sind korrekt:",
      "- Antwort D: Device configuration profile → Device restrictions für Antivirus",
      "- Antwort E: Device configuration profile → Endpoint protection für Firewall",
      "",
      "GPO-basierte Ansätze (A und F) würden On-Prem-AD und zusätzliche Verwaltung erfordern und passen nicht zu Intune-only.",
      "B und C vertauschen die Profiltypen im Vergleich zur üblichen Intune-Aufteilung für AV und Firewall.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-protection-configure",
      "https://learn.microsoft.com/mem/intune/configuration/device-restrictions-windows-10",
    ],
  },

  {
    id: "Q12",
    number: 13,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Migrate Default Domain Policy GPO Settings to Intune",
      "",
      "Dein Netzwerk enthält eine lokale Active Directory-Domäne und einen Azure AD-Mandanten.",
      "Die Default Domain Policy GPO enthält Kennwort- und Sicherheitsrichtlinien (z. B. Länge, Ablauf, Sperrung).",
      "",
      "Frage:",
      "Du musst die bestehenden Einstellungen der Default Domain Policy GPO in ein Gerätekonfigurationsprofil in Intune migrieren.",
      "Welchen Typ von Device Configuration Profile solltest du erstellen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Administrative Templates" },
      { key: "B", text: "Endpoint Protection" },
      { key: "C", text: "Device Restrictions" },
      { key: "D", text: "Custom" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Kennwort- und Kontosperrregeln der Default Domain Policy betreffen hauptsächlich:",
      "- Passwortkomplexität",
      "- Mindestlänge",
      "- Kennworthistorie",
      "- Ablaufzeiten",
      "- Kontosperrung/Lockout",
      "",
      "In Intune werden diese Einstellungen üblicherweise über Device restriction-Profile abgebildet.",
      "Dort findest du Kategorien wie 'Password', in denen du ähnliche Parameter setzen kannst.",
      "",
      "Administrative Templates (Antwort A) sind ADMX-/Registry-basiert und eher für Anwendungs- oder",
      "Feineinstellungen gedacht, nicht primär für Basis-Kennwortrichtlinien.",
      "Endpoint Protection (Antwort B) fokussiert auf Komponenten wie Antivirus, Firewall, BitLocker.",
      "Ein Custom-Profil (Antwort D) wäre nur nötig, wenn es keine native Entsprechung gäbe –",
      "hier gibt es aber Device Restrictions als passende Option.",
      "",
      "Daher ist Device Restrictions (C) die richtige Wahl.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-restrictions-windows-10",
      "https://learn.microsoft.com/mem/intune/configuration/compliance-policy-create-windows",
    ],
  },

  {
    id: "Q13",
    number: 14,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Geräte in Microsoft Defender for Endpoint onboarden",
      "",
      "Du verfügst über ein Microsoft 365 E5-Abonnement.",
      "Das Abonnement enthält 25 Computer mit Windows 11, die bereits in Microsoft Intune registriert sind.",
      "",
      "Ziel:",
      "Du musst die Geräte in Microsoft Defender for Endpoint (MDE) onboarden.",
      "",
      "Frage:",
      "Was solltest du im Microsoft Intune Admin Center erstellen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Eine Attack Surface Reduction (ASR) Policy" },
      { key: "B", text: "Eine Security Baseline" },
      { key: "C", text: "Eine Endpoint Detection and Response (EDR) Policy" },
      { key: "D", text: "Eine Account Protection Policy" },
      { key: "E", text: "Eine Antivirus Policy" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Das Onboarding von Windows-Geräten in Microsoft Defender for Endpoint über Intune",
      "erfolgt über eine Endpoint Detection and Response (EDR)-Policy.",
      "",
      "In dieser Policy wird der Onboarding-Blob aus dem Defender-Portal verwendet.",
      "Nach der Zuweisung an eine Gerätegruppe werden die Geräte automatisch im Defender Security Center eingebunden.",
      "",
      "Andere Policytypen haben andere Zwecke:",
      "- Attack Surface Reduction (A): Regeln zur Reduzierung von Angriffsflächen (z. B. Makroblockierung).",
      "- Security Baseline (B): Vordefinierte empfohlene Windows-Sicherheitseinstellungen.",
      "- Account Protection (D): Fokus auf Kontoschutz, Anmeldeeinstellungen.",
      "- Antivirus (E): Konfiguration des Defender Antivirus, aber kein primäres Onboarding für MDE.",
      "",
      "Für das eigentliche Onboarding ist daher die EDR-Policy (C) erforderlich.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/configure-endpoints-intune",
      "https://learn.microsoft.com/mem/intune/protect/advanced-threat-protection",
    ],
  },

  {
    id: "Q14",
    number: 15,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Konfiguration des Microsoft Edge Kioskmodus",
      "",
      "Du erstellst in Microsoft Intune ein Device Configuration Profile für Windows 10/11 mit Kiosk-Modus (Microsoft Edge).",
      "Microsoft Edge ist als Kiosk-App im Modus 'Public browsing (InPrivate)' konfiguriert.",
      "",
      "Frage:",
      "Bewerte die folgenden Aussagen basierend auf dieser Richtlinie:",
      "",
      "1. Benutzer können auf beliebige URLs zugreifen.",
      "2. Windows 10-Geräte können eine einzelne Microsoft Edge-Instanz mit mehreren Tabs haben.",
      "",
      "Wähle die korrekte Kombination.",
    ].join("\n"),

    options: [
      { key: "A", text: "Beide Aussagen sind korrekt." },
      { key: "B", text: "Nur Aussage 1 ist korrekt." },
      { key: "C", text: "Nur Aussage 2 ist korrekt." },
      { key: "D", text: "Keine der Aussagen ist korrekt." },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Im Kioskmodus 'Public browsing (InPrivate)' für Microsoft Edge:",
      "- Läuft der Browser im InPrivate-Modus und speichert keine Daten dauerhaft.",
      "- Können Benutzer grundsätzlich zu beliebigen Websites navigieren, sofern nicht zusätzliche URL-Filter greifen.",
      "- Sind mehrere Tabs in derselben Edge-Instanz möglich.",
      "",
      "Daher:",
      "- Aussage 1: 'Benutzer können auf beliebige URLs zugreifen.' → korrekt.",
      "- Aussage 2: 'Windows 10-Geräte können eine einzelne Microsoft Edge-Instanz mit mehreren Tabs haben.' → ebenfalls korrekt.",
      "",
      "Andere Edge-Kioskmodi (z. B. Digital Signage) würden ggf. nur eine fest definierte URL zulassen,",
      "doch hier ist explizit der Modus Public browsing konfiguriert.",
      "Somit ist die Kombination in Antwort A richtig.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/windows/configuration/kiosk-single-app",
      "https://learn.microsoft.com/mem/intune/configuration/kiosk-settings-windows",
    ],
  },

  {
    id: "Q15",
    number: 16,
    area: "Manage Applications (15–20%)",
    difficulty: "easy",

    question: [
      "App Configuration Policies für mehrere Plattformen",
      "",
      "Du hast eine Microsoft Intune Subscription.",
      "In Intune sind Geräte registriert, wie in der Tabelle dargestellt:",
      "",
      "- iOS/iPadOS: App1 installiert",
      "- Android: App1 installiert",
      "",
      "App1 ist auf allen Geräten vorhanden.",
      "",
      "Frage:",
      "Wie viele App Configuration Policies sind mindestens erforderlich, um App1 für beide Plattformen zu verwalten?",
    ].join("\n"),

    options: [
      { key: "A", text: "1" },
      { key: "B", text: "2" },
      { key: "C", text: "3" },
      { key: "D", text: "4" },
      { key: "E", text: "5" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "App Configuration Policies in Intune sind plattformabhängig.",
      "Auch wenn es sich um dieselbe App (App1) handelt, unterscheiden sich die Konfigurationsschnittstellen",
      "und Schlüssel zwischen iOS/iPadOS und Android.",
      "",
      "Daher wird mindestens eine Policy pro Plattform benötigt:",
      "- Eine App Configuration Policy für iOS/iPadOS",
      "- Eine App Configuration Policy für Android",
      "",
      "In Summe also zwei Policies.",
      "Eine einzelne Policy (Antwort A) kann nicht gleichzeitig beide Plattformen bedienen.",
      "Mehr als zwei Policies (C, D, E) wären möglich (z. B. getrennt nach Gruppen),",
      "aber nicht 'mindestens notwendig'.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-configuration-policies-overview",
    ],
  },
  {
    id: "Q16",
    number: 17,
    area: "Manage Applications (15–20%)",
    difficulty: "easy",

    question: [
      "Bereitstellung einer LOB-App für iOS-Geräte in Microsoft Intune",
      "",
      "Du hast ein Microsoft 365 E5-Abonnement, das 100 iOS-Geräte enthält,",
      "die in Microsoft Intune registriert sind.",
      "",
      "Du möchtest eine eigene Unternehmens-App (Line-of-Business / LOB-App) auf allen Geräten bereitstellen.",
      "",
      "Frage:",
      "Welche Dateierweiterung muss das App-Paket haben, damit du es in Intune als LOB-App hochladen und bereitstellen kannst?",
    ].join("\\n"),

    options: [
      { key: "A", text: ".intunemac" },
      { key: "B", text: ".apk" },
      { key: "C", text: ".ipa" },
      { key: "D", text: ".appx" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Line-of-Business (LOB)-Apps sind intern entwickelte Unternehmensanwendungen,",
      "die außerhalb des App Stores bereitgestellt werden.",
      "Für iOS/iPadOS-Geräte akzeptiert Intune ausschließlich .ipa-Dateien als App-Paket.",
      "",
      "Plattformabhängige LOB-Formate:",
      "- iOS / iPadOS: .ipa",
      "- Android: .apk oder .aab",
      "- Windows: .msi, .appx, .appxbundle, .msix, .msixbundle",
      "- macOS: .pkg oder .intunemac",
      "",
      "Die .ipa-Datei enthält den App-Code und muss korrekt signiert sein,",
      "meist mittels Apple Enterprise Developer Certificate.",
      "",
      "Vorgehensweise in Intune:",
      "1. Intune Admin Center → Apps → iOS/iPadOS → Add → Line-of-business app",
      "2. .ipa-Datei hochladen",
      "3. App-Infos konfigurieren",
      "4. App Gerätegruppen oder Benutzergruppen zuweisen",
      "",
      "Warum die anderen Antworten falsch sind:",
      "- .intunemac ist nur für macOS",
      "- .apk ist nur für Android",
      "- .appx ist nur für Windows Universal Apps",
    ].join("\\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/apps-add",
      "https://learn.microsoft.com/mem/intune/apps/apps-lob-ios",
    ],
  },
  {
    id: "Q17",
    number: 18,
    area: "Manage Applications (15–20%)",
    difficulty: "medium",

    question: [
      "Configure Microsoft 365 Apps (WebView2 & Feedback Policy)",
      "",
      "Du verwaltest eine Microsoft 365 Subscription.",
      "Alle Benutzer verfügen über Microsoft 365 Apps for Enterprise, die über das Microsoft 365 Apps Admin Center bereitgestellt wurden.",
      "",
      "Du sollst sicherstellen, dass:",
      "1) Die automatische Installation von WebView2 Runtime deaktiviert wird.",
      "2) Benutzer kein Feedback an Microsoft senden können.",
      "",
      "Frage:",
      "Welche zwei Einstellungen solltest du im Microsoft 365 Apps Admin Center konfigurieren?",
      "(Jede richtige Auswahl ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      { key: "A", text: "Monthly Enterprise (Updatekanal)" },
      { key: "B", text: "Device Configuration" },
      { key: "C", text: "Policy Management" },
      { key: "D", text: "What's New Management" },
      { key: "E", text: "Security Update Status" },
      { key: "F", text: "Setup" },
    ],

    correctAnswers: ["B", "C"],

    explanation: [
      "Die automatische Installation der WebView2 Runtime wird über Geräteeinstellungen im Microsoft 365 Apps Admin Center",
      "gesteuert. Diese fallen unter den Bereich 'Device Configuration', insbesondere Modern Apps Settings → WebView2.",
      "",
      "Um die Feedback-Funktion für Benutzer zu deaktivieren, wird eine Richtlinie benötigt.",
      "Dafür ist der Bereich 'Policy Management' zuständig.",
      "Dort kannst du Richtlinien wie 'Allow users to submit feedback to Microsoft' auf Disabled setzen.",
      "",
      "Andere Bereiche im Admin Center:",
      "- 'Monthly Enterprise' (A) definiert den Updatekanal, aber nicht WebView2- oder Feedback-Einstellungen.",
      "- 'What's New Management' (D) steuert Hinweise zu neuen Features, nicht Feedback oder WebView2.",
      "- 'Security Update Status' (E) dient dem Reporting.",
      "- 'Setup' (F) deckt generelle Bereitstellung ab, nicht die beiden genannten Anforderungen.",
      "",
      "Deshalb sind Device Configuration und Policy Management die korrekten Bereiche.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/deployoffice/webview2-install",
      "https://config.office.com",
    ],
  },

  {
    id: "Q18",
    number: 19,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Configure Windows Update Rings in Intune",
      "",
      "Du verfügst über ein Microsoft 365 E5-Abonnement und hast in Microsoft Intune eine neue Update Ring Policy",
      "mit dem Namen Policy1 erstellt.",
      "",
      "Die Richtlinie ist wie folgt konfiguriert:",
      "- Quality update deferral period (days): 0",
      "- Feature update deferral period (days): 30",
      "- Servicing channel: General Availability channel",
      "- Deadline for quality updates: 0",
      "- Deadline for feature updates: 30",
      "- Grace period: 0",
      "- Auto reboot before deadline: No",
      "- Automatic update behavior: Auto install at maintenance time",
      "",
      "Frage:",
      "Wie werden Qualitäts- und Funktionsupdates laut dieser Konfiguration installiert?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Quality Updates werden nach 7 Tagen installiert; Feature Updates nach 30 Tagen.",
      },
      {
        key: "B",
        text: "Quality Updates werden innerhalb von 30 Tagen installiert; Feature Updates nach 60 Tagen.",
      },
      {
        key: "C",
        text: "Quality Updates werden nicht automatisch installiert; Feature Updates nach 30 Tagen.",
      },
      {
        key: "D",
        text: "Quality Updates werden sofort installiert; Feature Updates innerhalb von 30 Tagen nach Veröffentlichung.",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Quality Updates (Sicherheits- und Stabilitätsupdates) haben in der Policy einen Deferral-Wert von 0 Tagen",
      "und eine Deadline von 0 Tagen. Das bedeutet, sie werden im Rahmen des konfigurierten Wartungszeitfensters",
      "ohne Aufschub installiert – praktisch 'sofort', sobald sie verfügbar sind.",
      "",
      "Feature Updates (Funktionsupdates, neue Windows-Versionen) haben eine Deferral Period von 30 Tagen und eine Deadline",
      "ebenfalls von 30 Tagen. Dadurch werden sie spätestens 30 Tage nach Veröffentlichung installiert.",
      "",
      "Damit gilt:",
      "- Qualitätsupdates: sofortige Installation (kein Aufschub).",
      "- Funktionsupdates: Installation innerhalb von 30 Tagen.",
      "",
      "Die anderen Antwortoptionen widersprechen direkt den konfigurierten Werten.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/windows-update-settings",
    ],
  },

  {
    id: "Q19",
    number: 20,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Collect Data from Windows 10 Computers Using Log Analytics",
      "",
      "Du hast 100 Computer mit Windows 10, die mit einem Azure Log Analytics Workspace verbunden sind.",
      "",
      "Frage:",
      "Welche drei Arten von Daten kannst du von den Computern mit Log Analytics erfassen?",
      "(Jede richtige Auswahl ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      { key: "A", text: "Error events from the System log" },
      { key: "B", text: "Failure events from the Security log" },
      { key: "C", text: "Third-party application logs stored as text files" },
      {
        key: "D",
        text: "The list of processes and their exact execution times",
      },
      { key: "E", text: "The average processor utilization" },
    ],

    correctAnswers: ["A", "C", "E"],

    explanation: [
      "Ein Log Analytics Workspace kann mithilfe des Windows-Agents verschiedene Datentypen sammeln:",
      "",
      "- Windows Event Logs, z. B. System- und Application-Logs → dadurch können Error events aus dem System log gesammelt werden (A).",
      "- Custom Logs: Textdateien können als benutzerdefinierte Logs eingebunden werden (C).",
      "- Performance Counter: z. B. CPU-Auslastung, wodurch durchschnittliche Prozessor-Auslastung (E) erfassbar ist.",
      "",
      "Security Events (B) werden im klassischen Setup nicht über den normalen Log Analytics Agent erfasst,",
      "sondern in der Regel über spezielle Sicherheitsintegrationen (Defender for Cloud, Sentinel, AMA mit Security-Profil).",
      "",
      "Eine vollständige Liste von Prozessen mit ihren 'execution times' (D) ist so nicht direkt ein Standard-Datentyp,",
      "sondern würde separate Lösungen oder Scripts erfordern.",
      "",
      "Daher sind A, C und E korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/azure/azure-monitor/agents/data-sources-windows-events",
      "https://learn.microsoft.com/azure/azure-monitor/agents/data-sources-performance-counters",
    ],
  },

  {
    id: "Q20",
    number: 21,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Restrict Intune Enrollment to Android Work Profile Only",
      "",
      "Dein Unternehmen verwendet Microsoft Intune zur Verwaltung mobiler Geräte.",
      "Es soll sichergestellt werden, dass nur Android-Geräte mit Android Work Profile (Android Enterprise Work Profile)",
      "in Intune registriert werden können.",
      "",
      "Frage:",
      "Welche zwei Konfigurationen musst du in den Device Enrollment Restrictions vornehmen?",
      "(Jede richtige Auswahl ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "From Platform Settings, set Android device administrator Personally Owned to Block",
      },
      {
        key: "B",
        text: "From Platform Settings, set Android Enterprise (Work Profile) to Allow",
      },
      {
        key: "C",
        text: "From Platform Settings, set Android device administrator Personally Owned to Allow",
      },
      {
        key: "D",
        text: "From Platform Settings, set Android device administrator to Block",
      },
    ],

    correctAnswers: ["B", "D"],

    explanation: [
      "Ziel ist, das alte Android Device Administrator-Enrollment zu blockieren und nur Android Enterprise Work Profile zuzulassen.",
      "",
      "Dazu müssen die Plattform-Einstellungen in den Enrollment Restrictions wie folgt gesetzt werden:",
      "- Android Enterprise (Work Profile) → Allow (B), damit Work Profile-Geräte registriert werden dürfen.",
      "- Android device administrator → Block (D), damit das Legacy-Device-Administratormodell nicht mehr genutzt werden kann.",
      "",
      "Option A blockiert nur persönlich besessene Device-Administratorgeräte, lässt aber ggf. andere Szenarien offen.",
      "Option C würde Device Administrator explizit erlauben – das ist das Gegenteil der Zielanforderung.",
      "",
      "Daher sind B und D die korrekten Einstellungen.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/enrollment-restrictions-set",
      "https://learn.microsoft.com/mem/intune/enrollment/android-enrollment",
    ],
  },

  {
    id: "Q21",
    number: 22,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Delivery Optimization für Windows Updates konfigurieren",
      "",
      "Du verwaltest 100 Windows 10-Geräte, die über Microsoft Intune registriert sind.",
      "",
      "Ziel:",
      "- Geräte sollen Windows-Updates sowohl aus dem Internet als auch von anderen Computern im lokalen Netzwerk beziehen.",
      "- Die Bandbreite soll optimiert und die Update-Verteilung beschleunigt werden.",
      "",
      "Frage:",
      "Welche Delivery Optimization-Einstellung musst du konfigurieren und welchen Intune-Objekttyp musst du erstellen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Bandwidth optimization type | Windows 10 quality updates",
      },
      {
        key: "B",
        text: "Bandwidth optimization type | A configuration profile",
      },
      { key: "C", text: "Download mode | Windows update rings" },
      { key: "D", text: "Download mode | A configuration profile" },
      { key: "E", text: "VPN peer caching | App configuration policies" },
      { key: "F", text: "VPN peer caching | Windows update rings" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Delivery Optimization wird in Intune über ein Configuration Profile für Windows 10/11 konfiguriert.",
      "",
      "Der zentrale Parameter ist 'Download mode'.",
      "Für das Szenario, in dem Geräte Inhalte sowohl aus dem Internet als auch von Peers im lokalen Netzwerk beziehen sollen,",
      "wird üblicherweise ein Modus wie 'HTTP blended with peering behind same NAT' verwendet.",
      "",
      "Diese Einstellung nimmst du in einem Device Configuration Profile mit dem Template 'Delivery Optimization' vor:",
      "- Intune Admin Center → Devices → Configuration profiles → Create profile",
      "- Platform: Windows 10 and later",
      "- Profile type: Templates → Delivery Optimization",
      "",
      "Windows Update Rings steuern zwar, wann Updates installiert werden, aber nicht die Delivery Optimization-Peer-Einstellungen.",
      "App configuration policies sind für Apps, nicht für OS-Updateverteilung.",
      "",
      "Daher ist die Kombination 'Download mode' + 'Configuration profile' (Antwort D) korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/delivery-optimization-settings",
    ],
  },

  {
    id: "Q22",
    number: 23,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Custom Notification Delivery in Microsoft Intune",
      "",
      "Du verwaltest eine Azure AD-Umgebung mit folgenden Benutzern und Geräten, die in Intune eingeschrieben sind:",
      "",
      "Benutzer:",
      "- User1 ist Mitglied von Group1",
      "- User2 ist Mitglied von Group1",
      "",
      "Geräte:",
      "- Device1: Windows 11, gehört User1",
      "- Device2: macOS, gehört User2",
      "- Device3: Android, gehört User1",
      "",
      "Du erstellst in Intune eine Custom Notification mit dem Namen Notification1 und sendest sie an Group1.",
      "",
      "Frage:",
      "Welche Geräte erhalten Notification1?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device2 only" },
      { key: "C", text: "Device3 only" },
      { key: "D", text: "Device1 and Device3" },
      { key: "E", text: "Device1, Device2 and Device3" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Custom Notifications in Intune werden als Push-Nachrichten an mobile Geräte gesendet,",
      "die die Company Portal- oder Intune-App unterstützen.",
      "",
      "Unterstützte Plattformen:",
      "- iOS/iPadOS",
      "- Android",
      "",
      "Nicht unterstützt für Custom Notifications:",
      "- Windows",
      "- macOS",
      "",
      "Die Benachrichtigung wird an Group1 gesendet, deren Mitglieder User1 und User2 sind.",
      "- User1 besitzt Device1 (Windows 11) und Device3 (Android).",
      "- User2 besitzt Device2 (macOS).",
      "",
      "Da nur iOS/Android unterstützt werden, erhält ausschließlich Device3 (Android) die Notification.",
      "",
      "Device1 (Windows) und Device2 (macOS) erhalten keine Custom Notification.",
      "Daher ist nur Antwort C korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/remote-actions/custom-notifications",
    ],
  },

  {
    id: "Q23",
    number: 24,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Geräteinventarbericht aus Intune Data Warehouse erstellen",
      "",
      "Du nutzt Microsoft Intune sowie das Intune Data Warehouse.",
      "Du möchtest einen Geräteinventarbericht erstellen, der auch die im Intune Data Warehouse gespeicherten Daten enthält.",
      "",
      "Frage:",
      "Welche Lösung solltest du verwenden, um den Bericht zu erstellen?",
    ].join("\n"),

    options: [
      { key: "A", text: "The Azure portal app" },
      { key: "B", text: "Endpoint analytics" },
      { key: "C", text: "The Company Portal app" },
      { key: "D", text: "Microsoft Power BI" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Das Intune Data Warehouse stellt Daten über eine OData-Schnittstelle bereit,",
      "die sich ideal mit Reporting- und BI-Tools wie Microsoft Power BI verbinden lässt.",
      "",
      "Power BI kann:",
      "- OData-Feeds aus dem Intune Data Warehouse einbinden,",
      "- historische Daten (bis zu 90 Tage) visualisieren,",
      "- eigene Dashboards und Berichte erstellen und automatisiert aktualisieren.",
      "",
      "Die Azure portal app (A) dient zur Verwaltung, nicht zur Erstellung komplexer Berichte.",
      "Endpoint Analytics (B) bietet Analysen zur Benutzererfahrung, ist aber kein generisches Reporting über das Data Warehouse.",
      "Die Company Portal App (C) ist für Endbenutzer zur Geräte- und App-Selbstbedienung, nicht für Admin-Reporting.",
      "",
      "Daher ist Power BI (D) die richtige Wahl.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/developer/reports-nav-create-intune-reports",
      "https://learn.microsoft.com/mem/intune/developer/reports-custom-powerbi",
    ],
  },

  {
    id: "Q24",
    number: 25,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Enroll Apple iPads Using Apple Configurator in Intune",
      "",
      "Du hast eine Microsoft 365 E5-Subscription und 25 Apple iPads, die mit Microsoft Intune verwaltet werden sollen.",
      "Du möchtest die iPads mithilfe der Apple Configurator Enrollment-Methode in Intune registrieren.",
      "",
      "Frage:",
      "Was musst du zuerst tun, bevor du die iPads mit Apple Configurator einschreibst?",
    ].join("\n"),

    options: [
      { key: "A", text: "Eine Datei mit den Geräte-IDs jedes iPads hochladen" },
      { key: "B", text: "Enrollment-Restrictions ändern" },
      { key: "C", text: "Ein Apple MDM Push-Zertifikat konfigurieren" },
      {
        key: "D",
        text: "Dein Benutzerkonto als Device Enrollment Manager (DEM) hinzufügen",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Damit Intune iOS-/iPadOS-Geräte verwalten kann, muss zunächst eine Vertrauensstellung",
      "zwischen Apple und Intune eingerichtet werden.",
      "",
      "Dies geschieht über das Apple MDM Push-Zertifikat:",
      "- In Intune das CSR (Certificate Signing Request) erzeugen,",
      "- Im Apple Push Certificates Portal das Zertifikat erstellen,",
      "- Das Zertifikat wieder in Intune hochladen.",
      "",
      "Ohne dieses MDM Push-Zertifikat können keine Apple-Geräte via Intune verwaltet werden –",
      "weder per Apple Configurator noch über andere Enrollment-Methoden.",
      "",
      "Option A (Geräte-IDs hochladen) ist eher im Kontext von Apple Business Manager/DEP relevant.",
      "Option B (Enrollment Restrictions) kann Enrollment einschränken, ersetzt aber kein MDM-Zertifikat.",
      "Option D (DEM) ist optional für Massen-Enrollment, aber nicht der erste erforderliche Schritt.",
      "",
      "Deshalb ist Antwort C korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/apple-mdm-push-certificate-get",
    ],
  },

  {
    id: "Q25",
    number: 26,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Configure Delivery Optimization Bandwidth in Intune",
      "",
      "Du hast eine Microsoft 365 E5-Subscription mit 150 hybrid Azure AD-joined Windows-Geräten,",
      "die bereits in Microsoft Intune registriert sind.",
      "",
      "Ziel:",
      "- Delivery Optimization so konfigurieren, dass Downloads sowohl aus dem Internet als auch von anderen Geräten im lokalen Netzwerk möglich sind.",
      "- Die verwendete Bandbreite soll auf 50 % begrenzt werden.",
      "",
      "Frage:",
      "Was solltest du verwenden, um diese Anforderungen zu erfüllen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Ein Configuration Profile" },
      { key: "B", text: "Windows Update for Business Group Policy Setting" },
      { key: "C", text: "Microsoft Peer-to-Peer Networking Services GPO" },
      { key: "D", text: "Update Ring for Windows 10 and later Profile" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Delivery Optimization-Einstellungen (inkl. Download Mode und Bandbreitenlimits) werden in Intune",
      "über ein Device Configuration Profile konfiguriert.",
      "",
      "Konfiguration in Intune:",
      "- Devices → Configuration profiles → Create profile",
      "- Platform: Windows 10 and later",
      "- Profile type: Templates → Delivery Optimization",
      "- Download mode: HTTP blended with peering behind same NAT (oder ein geeigneter Peer-Modus)",
      "- Bandwidth limit: z. B. 50 % für Download.",
      "",
      "Windows Update Rings (D) steuern primär Zeitpunkte/Deadlines für Updates, nicht die DO-Bandbreite.",
      "GPO-basierte Ansätze (B, C) sind eher für klassische On-Prem-AD-Umgebungen gedacht und widersprechen dem Ziel,",
      "Cloud- und Intune-basierte Verwaltung zu nutzen.",
      "",
      "Daher ist ein Configuration Profile (A) die korrekte Lösung.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/delivery-optimization-windows",
    ],
  },

  {
    id: "Q26",
    number: 27,
    area: "Manage and Maintain Devices (MD-102)",
    difficulty: "medium",

    question: [
      "Lokale Gruppenmitgliedschaften (Windows 10)",
      "",
      "Deine Umgebung enthält eine Active Directory-Domäne mit dem Namen contoso.com.",
      "In der Domäne existiert ein Computer namens Computer1, auf dem Windows 10 läuft.",
      "",
      "Es gibt folgende Gruppen:",
      "- Group1: Distribution, Universal",
      "- Group2: Security, Global",
      "- Group3: Security, Domain Local",
      "- Group4: Local Group (auf Computer1)",
      "",
      "Frage:",
      "Welche Gruppen können zu Group4 (lokale Gruppe auf Computer1) hinzugefügt werden?",
    ].join("\n"),

    options: [
      { key: "A", text: "Nur Group2" },
      { key: "B", text: "Group1 und Group2" },
      { key: "C", text: "Group2 und Group3" },
      { key: "D", text: "Group1, Group2 und Group3" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Group4 ist eine lokale Gruppe auf einem Windows 10-Computer.",
      "Lokale Gruppen können Mitglieder aus der Domäne oder vom lokalen Computer enthalten,",
      "aber es gelten bestimmte Regeln für Gruppentypen und -bereiche.",
      "",
      "Wichtige Punkte:",
      "- Lokale Gruppen können Benutzerkonten und globale/Universelle Sicherheitsgruppen als Mitglieder haben.",
      "- Verteilergruppen (Distribution Groups) sind nicht sicherheitsrelevant und können nicht als Sicherheitsprinzipale",
      "  für Berechtigungen verwendet werden.",
      "- Domänenlokale Sicherheitsgruppen (Domain Local) sind für die Zuweisung von Berechtigungen innerhalb der Domäne gedacht,",
      "  nicht als Mitglieder lokaler Gruppen auf Clients.",
      "",
      "Im Szenario:",
      "- Group1 ist eine Distribution Group (Universal) → nicht für Sicherheitszuweisungen anwendbar.",
      "- Group2 ist eine globale Sicherheitsgruppe → kann Mitglied einer lokalen Gruppe werden.",
      "- Group3 ist eine domänenlokale Sicherheitsgruppe → wird nicht als Mitglied lokaler Gruppen auf Clients verwendet.",
      "",
      "Daher kann nur Group2 zu Group4 hinzugefügt werden.",
      "Antwort A ist somit korrekt.",
      "",
      "Dies entspricht den allgemeinen Regeln für Gruppentypen und -bereiche in Active Directory.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-groups",
    ],
  },
  {
    id: "Q27",
    number: 28,
    area: "Case Study – Litware Inc.",
    difficulty: "info",

    question: [
      "Case Study: Litware Inc.",
      "",
      "Dieses Item beschreibt die Ausgangssituation von Litware Inc. (Standort Los Angeles, 500 Entwickler,",
      "ConfigMgr 2012 R2, Intune, hybride Azure AD-Umgebung, unterschiedliche Abteilungen und Probleme mit",
      "Updates, Datenabfluss und manueller Bereitstellung der Sales-Geräte).",
      "",
      "Diese Fallstudie dient als Grundlage für mehrere Folgefragen (z. B. Windows Autopilot, Co-Management,",
      "Conditional Access, App Protection Policies und Branding).",
      "",
      "Wie solltest du dieses Item im Rahmen der Prüfung verwenden?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Als Hintergrundinformation, auf die sich mehrere nachfolgende Fragen beziehen",
      },
      {
        key: "B",
        text: "Als eigenständige Frage, bei der eine einzelne Konfigurationsoption gewählt werden muss",
      },
      {
        key: "C",
        text: "Als Beispiel für eine nicht mehr unterstützte Konfiguration, die ignoriert werden kann",
      },
      {
        key: "D",
        text: "Nur zur Beantwortung einer einzigen Frage zur Netzwerkbandbreite",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Bei Microsoft-Case-Study-Fragen beschreibt das Case-Item wie hier bei Litware Inc. die Gesamtumgebung,",
      "Geschäftsziele, Probleme und Anforderungen. Die eigentlichen Prüfungsfragen kommen danach und verweisen",
      "auf diese Informationen.",
      "",
      "Q31 selbst ist daher als Fallstudien-Beschreibung zu verstehen, die für mehrere Folgefragen relevant ist,",
      "z. B. zu Co-Management, Autopilot, Delivery Optimization, Conditional Access und App Protection Policies.",
      "",
      "Die korrekte Nutzung besteht darin, die Informationen als gemeinsamen Kontext für mehrere Fragen zu nutzen.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/microsoft-365/enterprise/microsoft-365-case-studies",
    ],
  },

  {
    id: "Q28",
    number: 29,
    area: "Manage Applications (15–20%)",
    difficulty: "medium",

    question: [
      "Intune App Protection Policy – Timeout und PIN-Anforderung bei Inaktivität",
      "",
      "Ein Benutzer nutzt auf einem iOS-Gerät eine unternehmensverwaltete App (z. B. Outlook),",
      "die durch Microsoft Intune App Protection Policies (MAM) geschützt ist.",
      "",
      "Die App Protection Policy verlangt nach einer bestimmten Inaktivitätsdauer eine erneute Authentifizierung.",
      "Der Benutzer öffnet die App nach 30 Minuten Inaktivität erneut.",
      "",
      "Frage:",
      "Was geschieht typischerweise, wenn der Benutzer die geschützte App nach 30 Minuten Inaktivität wieder öffnet?",
      "(Gehe davon aus, dass App-PIN und Conditional-Access/MFA konfiguriert sind.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Die App öffnet sich ohne weitere Eingabe; nur die Daten werden im Hintergrund neu synchronisiert.",
      },
      {
        key: "B",
        text: "Der Benutzer muss sich nur mit seinem Azure AD-Kennwort anmelden, eine PIN ist nicht erforderlich.",
      },
      {
        key: "C",
        text: "Die App fordert die App-PIN an und kann zusätzlich eine Azure AD-Authentifizierung inkl. MFA verlangen.",
      },
      {
        key: "D",
        text: "Die App wird vollständig zurückgesetzt und alle Unternehmensdaten werden sofort gelöscht.",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Intune App Protection Policies (MAM) definieren unter anderem:",
      "- Nach welcher Inaktivitätszeit der Zugriff erneut geprüft wird (z. B. 30 Minuten),",
      "- Ob eine App-spezifische PIN oder biometrische Authentifizierung erforderlich ist,",
      "- Und ob über Conditional Access zusätzliche Azure AD-Authentifizierung inkl. MFA erzwungen wird.",
      "",
      "Wird die App nach Ablauf des Inaktivitätstimers erneut geöffnet, prüft das Intune SDK die Policy:",
      "- Zuerst wird die App-PIN bzw. eine biometrische Methode verlangt.",
      "- Falls Conditional Access so konfiguriert ist, kann zusätzlich eine Azure AD-Anmeldung",
      "  mit MFA gefordert werden, bevor Unternehmensdaten wieder zugänglich sind.",
      "",
      "Die App wird jedoch nicht automatisch zurückgesetzt (D) und auch kein 'silent re-open' (A) durchgeführt,",
      "wenn eine PIN erzwungen ist. Option B ignoriert die App-PIN-Anforderung.",
      "Daher ist C korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy",
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy-settings-ios",
    ],
  },

  {
    id: "Q29",
    number: 30,
    area: "Manage and Maintain Devices (30–35%)",
    difficulty: "easy",

    question: [
      "Litware Inc. – OOBE Branding für Windows Autopilot",
      "",
      "Litware Inc. möchte sicherstellen, dass während der Windows-Autopilot-Bereitstellung",
      "(Out of Box Experience – OOBE) der Firmenname und das Firmenlogo angezeigt werden.",
      "",
      "Frage:",
      "Welche zwei Bereiche im Microsoft Entra admin center (Azure AD) müssen konfiguriert werden,",
      "damit Firmenname und Logo während der OOBE angezeigt werden?",
      "(Jede richtige Auswahl ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      { key: "A", text: "Users" },
      { key: "B", text: "Organizational relationships" },
      { key: "C", text: "Azure AD / Entra ID – Properties" },
      { key: "D", text: "Azure AD Connect" },
      { key: "E", text: "Notification settings" },
      { key: "F", text: "Company branding" },
    ],

    correctAnswers: ["C", "F"],

    explanation: [
      "Damit Autopilot-OOBE das Unternehmensbranding korrekt anzeigen kann, müssen:",
      "- In den Mandanteneigenschaften (Properties) grundlegende Informationen wie der Firmenname gepflegt sein.",
      "- Im Bereich Company branding Logo, Hintergrundbild und Beschriftungen konfiguriert werden.",
      "",
      "Diese Konfigurationen werden vom Anmelde- und OOBE-Prozess ausgelesen und sorgen dafür, dass",
      "Nutzer den Mandanten visuell eindeutig als 'Litware Inc.' erkennen.",
      "",
      "Users (A), Organizational relationships (B), Azure AD Connect (D) und Notification settings (E)",
      "haben keinen direkten Einfluss auf OOBE-Branding.",
      "Daher sind Properties (C) und Company branding (F) korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/entra/identity/enterprise-users/company-branding",
      "https://learn.microsoft.com/entra/identity/enterprise-users/customize-branding",
    ],
  },

  {
    id: "Q30",
    number: 31,
    area: "Manage Applications (15–20%)",
    difficulty: "medium",

    question: [
      "Litware Inc. – Geräteschutz und Datenkontrolle",
      "",
      "Bei Litware Inc. bestehen folgende Anforderungen:",
      "- Forschungsabteilung: Es soll verhindert werden, dass patentierte/vertrauliche Daten aus vertrauenswürdigen",
      "  Unternehmens-Apps in ungeschützte Apps kopiert werden.",
      "- Vertriebsabteilung: E-Mails, die Bankinformationen enthalten, dürfen nicht weitergeleitet werden.",
      "",
      "Frage:",
      "Welche Lösungen solltest du für die Forschungsabteilung bzw. die Vertriebsabteilung einsetzen?",
      "(Wähle die richtige Kombination.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Forschung: Windows Information Protection | Vertrieb: App Protection Policy",
      },
      {
        key: "B",
        text: "Forschung: Azure Information Protection | Vertrieb: Windows Information Protection",
      },
      {
        key: "C",
        text: "Forschung: App Protection Policy | Vertrieb: Azure Information Protection",
      },
      {
        key: "D",
        text: "Forschung: Device Configuration Profile | Vertrieb: Conditional Access",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Für die Forschungsabteilung geht es um die Kontrolle von Datenbewegungen zwischen Apps auf mobilen bzw.",
      "Endgeräten (z. B. Copy/Paste oder 'Save As'). Dies wird am besten über Intune App Protection Policies (MAM) erreicht,",
      "die Daten in geschützten Apps containerisieren und Transfers zu ungeschützten Apps einschränken können.",
      "",
      "Für die Vertriebsabteilung soll der Versand/Weiterleitung von E-Mails mit Bankinformationen verhindert werden.",
      "Hierfür eignet sich Azure Information Protection (AIP) mit:",
      "- Klassifizierungs- und Sensitivitätslabels,",
      "- Richtlinien wie 'Do Not Forward' oder 'Encrypt',",
      "- Optional automatischer Label-Zuweisung bei Erkennung sensibler Inhalte (z. B. IBAN, Kontonummern).",
      "",
      "Damit ist die richtige Zuordnung:",
      "- Forschung → App Protection Policy (MAM),",
      "- Vertrieb → Azure Information Protection (AIP).",
      "",
      "Andere Kombinationen adressieren entweder nicht die richtigen Ebenen (z. B. reine Gerätekonfiguration) oder",
      "vermischen Rollen der Technologien.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/apps/"],
  },

  {
    id: "Q31",
    number: 32,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Litware Inc. – Upgrade Required for Co-Management Configuration",
      "",
      "Litware Inc. verwendet derzeit System Center 2012 R2 Configuration Manager in einer hybrid angebundenen Umgebung.",
      "Das Unternehmen möchte Co-Management mit Microsoft Intune für alle Windows 10-Geräte einführen.",
      "",
      "Frage:",
      "Was muss aktualisiert werden, bevor die Umgebung für Co-Management konfiguriert werden kann?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Das Domain-Functional-Level der Active Directory-Domäne",
      },
      {
        key: "B",
        text: "System Center Configuration Manager auf eine Current-Branch-Version (mind. 1710)",
      },
      { key: "C", text: "Alle Domain Controller auf Windows Server 2019" },
      {
        key: "D",
        text: "Windows Server Update Services (WSUS) auf die neueste Version",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Co-Management wird erst ab Configuration Manager Current Branch (mindestens Version 1710) unterstützt.",
      "System Center 2012 R2 Configuration Manager kann keine Co-Management-Beziehung zu Intune aufbauen.",
      "",
      "Das AD-Forest- bzw. Domain-Functional-Level 2012 R2 ist für Co-Management ausreichend;",
      "ein Upgrade der Domain Controller oder von WSUS ist dafür nicht zwingende Voraussetzung.",
      "",
      "Daher muss vor der Co-Management-Konfiguration der Configuration Manager auf eine unterstützte",
      "Current-Branch-Version aktualisiert werden.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/configmgr/comanage/overview#prerequisites",
    ],
  },

  {
    id: "Q32",
    number: 33,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Litware Inc. – Delivery Optimization und Active Hours für Los Angeles",
      "",
      "Bei Litware Inc. führen Windows-Updates zu langsamen Internetverbindungen im Büro in Los Angeles.",
      "Die 500 Entwickler arbeiten typischerweise zwischen 11:00 und 22:00 Uhr.",
      "",
      "Ziel:",
      "- Internetbelastung durch Updates reduzieren, indem Geräte Updates auch von anderen Clients im LAN beziehen.",
      "- Neustarts und Installationen möglichst außerhalb der Arbeitszeit planen.",
      "",
      "Frage:",
      "Welche Kombination aus Delivery Optimization-Downloadmode und Active Hours ist am geeignetsten?",
    ].join("\n"),

    options: [
      { key: "A", text: "Bypass mode | Active Hours 10:00–22:00" },
      { key: "B", text: "Bypass mode | Active Hours 23:00–22:00" },
      {
        key: "C",
        text: "HTTP blended with internet peering | Active Hours 10:00–11:00",
      },
      {
        key: "D",
        text: "HTTP blended with peering behind same NAT | Active Hours 11:00–22:00",
      },
      {
        key: "E",
        text: "HTTP blended with peering behind same NAT | Active Hours 23:00–11:00",
      },
      {
        key: "F",
        text: "Simple download (no peering) | Active Hours 22:00–10:00",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Um die Internetbelastung zu reduzieren, sollten Windows-Updates nicht ausschließlich aus dem Internet geladen werden.",
      "Der Delivery Optimization-Modus 'HTTP blended with peering behind same NAT' ermöglicht:",
      "- Download aus dem Internet UND von anderen Peers im gleichen Netzwerk (hinter derselben NAT),",
      "- Dadurch wird Bandbreite gespart und die Verteilung beschleunigt.",
      "",
      "Die Active Hours sollten die tatsächlichen Arbeitszeiten widerspiegeln, damit automatische Neustarts außerhalb",
      "dieser Zeit geplant werden. Für Litware ist dies 11:00–22:00 Uhr.",
      "",
      "Bypass mode (A/B) oder Simple download (F) deaktivieren bzw. begrenzen die Peer-Verteilung und lösen das",
      "Bandbreitenproblem nicht. Falsche Active Hours (C/E) passen nicht zu den tatsächlichen Arbeitszeiten.",
      "",
      "Daher ist die Kombination:",
      "- Delivery Optimization: HTTP blended with peering behind same NAT,",
      "- Active Hours: 11:00–22:00,",
      "korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/windows/deployment/update/waas-delivery-optimization",
      "https://learn.microsoft.com/windows/deployment/update/waas-active-hours",
    ],
  },

  {
    id: "Q33",
    number: 34,
    area: "Manage Applications (15–20%)",
    difficulty: "medium",

    question: [
      "Azure DevOps – Zugriff nur aus dem Firmennetzwerk erlauben",
      "",
      "Litware Inc. verwendet Azure DevOps zur Verwaltung von Quellcode und Projekten.",
      "Die Geschäftsleitung möchte sicherstellen, dass auf Azure DevOps nur aus dem Firmennetzwerk zugegriffen werden kann,",
      "um Datenabfluss zu verhindern.",
      "",
      "Frage:",
      "Welche Technologie solltest du einsetzen, um den Zugriff auf Azure DevOps auf das Firmennetzwerk zu beschränken?",
    ].join("\n"),

    options: [
      { key: "A", text: "Intune App Protection Policy" },
      { key: "B", text: "Windows Information Protection (WIP)" },
      {
        key: "C",
        text: "Azure AD Conditional Access mit standortbasierten Bedingungen",
      },
      {
        key: "D",
        text: "Device Configuration Profile (Firewall-Regeln für alle Clients)",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Azure DevOps authentifiziert Benutzer über Azure AD. Standortbasierte Zugriffsbeschränkungen werden",
      "über Azure AD Conditional Access umgesetzt:",
      "- In einer CA-Policy wird die Cloud-App 'Azure DevOps' ausgewählt,",
      "- Als Bedingung werden nur vertrauenswürdige IP-Standorte (Firmenstandorte, VPN-Gateways) zugelassen.",
      "",
      "Damit kann Zugriff auf Azure DevOps nur aus definierten Netzwerkbereichen erfolgen.",
      "",
      "App Protection Policies (A) und WIP (B) schützen Daten auf dem Client bzw. in Apps, aber nicht den Zugriffspfad",
      "zur Cloud-App selbst nach Standort.",
      "Ein Device Configuration Profile (D) könnte zwar Firewall-Regeln setzen, ist aber wesentlich schwerer zu warten",
      "und nicht so präzise wie eine CA-Policy direkt an der Cloud-App.",
      "",
      "Daher ist Conditional Access (C) die korrekte Wahl.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/azure/active-directory/conditional-access/overview",
    ],
  },

  {
    id: "Q34",
    number: 35,
    area: "Manage and Maintain Devices (30–35%)",
    difficulty: "easy",

    question: [
      "Litware Inc. (Part 3) – Configure OOBE Branding",
      "",
      "Litware Inc. möchte den Windows Autopilot OOBE-Prozess so anpassen,",
      "dass Firmenname und Logo beim Einrichten eines neuen Geräts angezeigt werden.",
      "",
      "Frage:",
      "Welche zwei Azure AD-/Entra ID-Bereiche müssen konfiguriert werden, um dieses Branding sichtbar zu machen?",
      "(Jede richtige Auswahl ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      { key: "A", text: "Identity → Users" },
      { key: "B", text: "Identity → Organizational relationships" },
      { key: "C", text: "Identity → Properties" },
      { key: "D", text: "Identity Governance" },
      { key: "E", text: "Mobility (MDM and MAM)" },
      { key: "F", text: "Identity → Company branding" },
    ],

    correctAnswers: ["C", "F"],

    explanation: [
      "Für OOBE-Branding sind zwei Dinge wichtig:",
      "- Properties: Hier wird der offizielle Mandanten-/Firmenname konfiguriert,",
      "- Company branding: Hier werden Logo, Hintergrund und weitere Branding-Elemente hinterlegt.",
      "",
      "Diese Informationen werden von den Anmeldeseiten und dem OOBE-Prozess genutzt, um den Mandanten visuell",
      "darzustellen. Andere Bereiche wie Users, Organizational relationships, Identity Governance oder Mobility",
      "beeinflussen das OOBE-Branding nicht direkt.",
      "",
      "Daher sind C (Properties) und F (Company branding) korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/entra/identity/enterprise-users/company-branding",
    ],
  },

  {
    id: "Q35",
    number: 36,
    area: "Manage and Maintain Devices (30–35%)",
    difficulty: "easy",

    question: [
      "Enrollment Permissions for Device6",
      "",
      "Contoso, Ltd. betreibt einen hybriden Azure AD-Tenant (contoso.com) mit Microsoft 365 E5- und EMS-E3-Lizenzen.",
      "Alle Windows 10-Geräte sind Azure AD-joined und in Intune registriert.",
      "",
      "Ein neues Gerät (Device6) soll in Intune eingeschrieben werden.",
      "Alle vier Benutzer (User1–User4) besitzen gültige Intune-/EMS-Lizenzen und es gibt keine speziellen",
      "einschränkenden Enrollment Restrictions.",
      "",
      "Frage:",
      "Welche Benutzer können Device6 in Intune einschreiben (enrollen)?",
    ].join("\n"),

    options: [
      { key: "A", text: "Nur User1" },
      { key: "B", text: "Nur User1 und User2" },
      { key: "C", text: "Nur User1, User2 und User3" },
      { key: "D", text: "User1, User2, User3 und User4" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Standardmäßig können alle Benutzer, die:",
      "- eine gültige Intune-/EMS-Lizenz besitzen und",
      "- im MDM-User-Scope oder im Standard-Scope liegen,",
      "Geräte in Intune registrieren, sofern keine Enrollment Restrictions dies einschränken.",
      "",
      "Da im Szenario alle vier Benutzer lizenziert sind und keine weiteren Beschränkungen erwähnt werden,",
      "können alle vier User Device6 einschreiben.",
      "",
      "Die Standardgrenze von in der Regel fünf Geräten pro Benutzer wird hier nicht überschritten.",
      "Damit ist Antwort D korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/enrollment-restrictions-set",
    ],
  },
  {
    id: "Q36",
    number: 37,
    area: "Manage and Maintain Devices (30–35%)",
    difficulty: "medium",

    question: [
      "Enterprise State Roaming in Azure AD – Was wird synchronisiert?",
      "",
      "Contoso, Ltd. betreibt eine hybride Azure AD-Umgebung. Alle Windows 10-Geräte sind Azure AD-joined",
      "und in Intune eingeschrieben. Enterprise State Roaming (ESR) ist nur für Group1 und GroupA aktiviert.",
      "",
      "User1 ist Mitglied von GroupA und meldet sich an verschiedenen Azure AD-joined Geräten an.",
      "",
      "Du sollst beurteilen, welche Benutzereinstellungen typischerweise zwischen den Geräten",
      "über Enterprise State Roaming synchronisiert werden.",
      "",
      "Welche Aussage beschreibt das Verhalten von Enterprise State Roaming am besten?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Alle Benutzerdaten inklusive Desktop-Dateien und Dokumente werden synchronisiert.",
      },
      {
        key: "B",
        text: "Nur installierte Anwendungen und Win32-App-Konfigurationen werden synchronisiert.",
      },
      {
        key: "C",
        text: "Es werden ausschließlich Kennwörter und Browser-Cookies synchronisiert.",
      },
      {
        key: "D",
        text: "Nur bestimmte Windows- und Personalisierungseinstellungen (z. B. Themes, Hintergrundfarbe) sowie UWP-App-Einstellungen werden synchronisiert.",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Enterprise State Roaming (ESR) synchronisiert ausgewählte Windows- und App-Einstellungen:",
      "- Personalisierung (z. B. Theme, Hintergrundfarbe, Sprache),",
      "- Bestimmte Edge- und UWP-App-Einstellungen,",
      "- Optional Kennwörter (z. B. WLAN), wenn aktiviert.",
      "",
      "Nicht synchronisiert werden:",
      "- Benutzerdateien (Dokumente, Bilder, Desktop-Inhalte),",
      "- Win32-App-spezifische Registry-Einstellungen,",
      "- Installierte Anwendungen als solche.",
      "",
      "Damit beschreibt nur Option D das Verhalten korrekt: Es werden ausgewählte Windows-/Personalisierungs-",
      "und UWP-App-Einstellungen synchronisiert, nicht jedoch alle Benutzerdateien oder Win32-Konfigurationen.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/azure/active-directory/devices/enterprise-state-roaming-overview",
    ],
  },

  {
    id: "Q37",
    number: 38,
    area: "Manage and Maintain Devices (30–35%)",
    difficulty: "medium",

    question: [
      "Enterprise State Roaming – „Sync your settings“ bei Contoso, Ltd.",
      "",
      "Contoso, Ltd. verwendet Enterprise State Roaming (ESR) für Windows 10-Geräte.",
      "",
      "Umgebung:",
      "- Alle Windows 10-Geräte sind Azure AD-joined und in Intune eingeschrieben.",
      "- Es gibt fünf Geräte: Device1–Device5.",
      "- ESR ist für Group1 und GroupA aktiviert.",
      "- User1 ist Mitglied von GroupA.",
      "- User2 ist kein Mitglied von Group1 oder GroupA.",
      "- Beide Benutzer haben EMS E3 (inkl. Azure AD Premium).",
      "",
      "User1 und User2 möchten die Funktion 'Sync your settings' nutzen, um persönliche Windows-Einstellungen",
      "zwischen ihren Geräten zu synchronisieren.",
      "",
      "Auf welchen Geräten steht die Funktion 'Sync your settings' (Enterprise State Roaming) zur Verfügung?",
    ].join("\n"),

    options: [
      { key: "A", text: "User1: Keine Geräte | User2: Keine Geräte" },
      { key: "B", text: "User1: Device1–Device5 | User2: Device1–Device5" },
      { key: "C", text: "User1: Device1–Device3 | User2: Keine Geräte" },
      { key: "D", text: "User1: Device1 und Device2 | User2: Device1–Device5" },
      { key: "E", text: "User1: Device1–Device5 | User2: Keine Geräte" },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Enterprise State Roaming setzt voraus:",
      "- Azure AD Premium-Lizenz (z. B. EMS E3),",
      "- Azure AD-joined Geräte,",
      "- ESR muss für den Benutzer (direkt oder über Gruppenmitgliedschaft) aktiviert sein.",
      "",
      "Da ESR nur für Group1 und GroupA aktiviert ist und User1 Mitglied von GroupA ist,",
      "kann User1 auf allen seinen Azure AD-joined Geräten (Device1–Device5) 'Sync your settings' verwenden.",
      "",
      "User2 ist kein Mitglied der ESR-Gruppen und hat daher trotz Lizenz keine aktive ESR-Synchronisierung.",
      "Damit gilt:",
      "- User1: Device1–Device5,",
      "- User2: keine Geräte.",
      "",
      "Dies entspricht Option E.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/azure/active-directory/devices/enterprise-state-roaming-enable",
    ],
  },

  {
    id: "Q38",
    number: 39,
    area: "Manage and Maintain Devices (30–35%)",
    difficulty: "medium",

    question: [
      "Contoso Ltd. – Hybrid Autopilot Deployment & Computerobjekterstellung",
      "",
      "Contoso Ltd. plant, neue Geräte per Windows Autopilot als hybrid Azure AD-joined bereitzustellen.",
      "Der Intune Connector for Active Directory ist auf Server1 installiert.",
      "",
      "Ziel:",
      "Computerobjekte sollen während der Autopilot-Bereitstellung automatisch im lokalen Active Directory",
      "in der vorgesehenen OU erstellt werden.",
      "",
      "Frage:",
      "An welches Konto/Objekt solltest du die Berechtigung zum Erstellen von Computerobjekten in der gewünschten OU delegieren?",
    ].join("\n"),

    options: [
      { key: "A", text: "An den Domain Controller DC1" },
      {
        key: "B",
        text: "An das Computerobjekt von Server1 (Intune Connector for AD)",
      },
      { key: "C", text: "An die Benutzergruppe GroupA" },
      {
        key: "D",
        text: "An das Computerkonto jedes einzelnen Autopilot-Geräts",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Bei einem Hybrid Azure AD Join mit Windows Autopilot übernimmt der Intune Connector for Active Directory",
      "die Aufgabe, Computerobjekte im lokalen AD zu erstellen.",
      "",
      "Der Connector läuft als Dienst auf Server1. Entsprechend benötigt das Computerkonto von Server1 (Server1$)",
      "die Berechtigung 'Create Computer Objects' in der Ziel-OU:",
      "- In ADUC: OU → Delegate Control → Computerobjekt Server1$ hinzufügen → Create Computer Objects.",
      "",
      "DC1 hostet zwar AD, erstellt aber nicht automatisch Objekte für Autopilot (A).",
      "GroupA ist eine Benutzergruppe und kein technischer Connector (C).",
      "Autopilot-Geräteobjekte existieren zu diesem Zeitpunkt noch nicht (D).",
      "",
      "Daher ist B korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/autopilot/windows-autopilot-hybrid",
      "https://learn.microsoft.com/mem/autopilot/windows-autopilot-hybrid#configure-the-intune-connector-for-active-directory",
    ],
  },

  {
    id: "Q39",
    number: 40,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Controlled Folder Access & geschützte Ordner",
      "",
      "Contoso, Ltd. verwendet ein Endpoint Protection-Konfigurationsprofil mit Controlled Folder Access:",
      "- Name: Protection1",
      "- Controlled Folder Access: Enabled",
      "- Allowed apps: C:\\*\\AppA.exe",
      "- Protected folders: D:\\\\Folder1",
      "- Zugewiesen an: Group2, GroupB",
      "",
      "Device4 ist Mitglied von Group2, Device2 von Group1 und Group2.",
      "Auf beiden Geräten existieren C:\\\\AppA.exe und D:\\\\Folder1.",
      "",
      "Beurteile die folgenden Aussagen:",
      "",
      "1) User1 kann D:\\\\Folder1\\\\file1.txt auf Device4 mit Notepad erstellen.",
      "2) User2 kann D:\\\\Folder1 aus den geschützten Ordnern auf Device2 entfernen.",
      "3) User3 kann C:\\\\Users\\\\User3\\\\Desktop\\\\file1.txt auf Device2 erstellen.",
      "",
      "Welche der folgenden Aussagen ist/ sind korrekt?",
    ].join("\n"),

    options: [
      { key: "A", text: "Nur Aussage 1 ist korrekt." },
      { key: "B", text: "Nur Aussage 2 ist korrekt." },
      { key: "C", text: "Nur Aussage 3 ist korrekt." },
      { key: "D", text: "Aussagen 1 und 2 sind korrekt." },
      { key: "E", text: "Aussagen 1 und 3 sind korrekt." },
      { key: "F", text: "Aussagen 2 und 3 sind korrekt." },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Controlled Folder Access erlaubt Schreibzugriffe in geschützte Ordner nur für explizit zugelassene Anwendungen.",
      "In der Richtlinie ist ausschließlich C:\\*\\AppA.exe als erlaubte App konfiguriert.",
      "",
      "1) Notepad ist nicht in der Allow-Liste. Der Versuch, mit Notepad in D:\\Folder1 zu schreiben, wird blockiert.",
      "   → Aussage 1 ist falsch.",
      "",
      "2) Das Entfernen von D:\\Folder1 aus den geschützten Ordnern ist eine Richtlinienänderung und wird zentral",
      "   über Intune gesteuert. Lokale Benutzer – selbst lokale Administratoren – können diese Einstellung nicht",
      "   dauerhaft aus der verwalteten Richtlinie herausnehmen.",
      "   → Aussage 2 ist falsch.",
      "",
      "3) Der Desktopordner (C:\\Users\\User3\\Desktop) gehört NICHT zu den in der Richtlinie definierten geschützten",
      "   Ordnern. Controlled Folder Access blockiert dort keine Schreiboperationen – ein Benutzer kann dort",
      "   problemlos Dateien anlegen.",
      "   → Aussage 3 ist korrekt.",
      "",
      "Daher ist nur Aussage 3 korrekt, entsprechend Option C.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-policy-controlled-folder-access",
    ],
  },

  {
    id: "Q40",
    number: 41,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Apply Network Boundary Profile in Intune",
      "",
      "Contoso, Ltd. implementiert ein Network Boundary Profile 'Boundary1' mit:",
      "- Netzwerkgrenze: 192.168.1.0/24",
      "- Zugewiesen an: Group1 und Group2",
      "",
      "Gerätezuordnung:",
      "- Device1: Mitglied von Group1",
      "- Device2: Mitglied von Group2",
      "- Device3: Mitglied von Group1 und Group2",
      "- Device4: Mitglied von Group1",
      "- Device5: Mitglied von GroupB",
      "",
      "Frage:",
      "Welche Geräte erhalten die Netzwerkgrenze 192.168.1.0/24 aus dem Profil Boundary1?",
    ].join("\n"),

    options: [
      { key: "A", text: "Nur Device2" },
      { key: "B", text: "Nur Device3" },
      { key: "C", text: "Device1, Device2 und Device5" },
      { key: "D", text: "Device1, Device2, Device3 und Device4" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Konfigurationsprofile werden in Intune gruppenbasiert zugewiesen.",
      "Boundary1 ist explizit den Gruppen Group1 und Group2 zugewiesen.",
      "",
      "Gerätezuordnung:",
      "- Device1: Group1 → erhält Boundary1.",
      "- Device2: Group2 → erhält Boundary1.",
      "- Device3: Group1 und Group2 → erhält Boundary1 (Mehrfachmitgliedschaft spielt keine negative Rolle).",
      "- Device4: Group1 → erhält Boundary1.",
      "- Device5: nur GroupB → erhält Boundary1 nicht.",
      "",
      "Damit wird Boundary1 auf Device1, Device2, Device3 und Device4 angewendet.",
      "Dies entspricht Option D.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profile-assign",
    ],
  },

  {
    id: "Q41",
    number: 42,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Determine VPN Connections for Intune-Assigned Profiles",
      "",
      "Contoso, Ltd. führt zwei VPN-Konfigurationsprofile ein:",
      "",
      "- Connection1 (VPN1, L2TP): zugewiesen an Group1, Group2, GroupA",
      "- Connection2 (VPN2, IKEv2): zugewiesen an GroupA, GroupB ausgeschlossen",
      "",
      "User1 ist Mitglied von GroupA und meldet sich sowohl auf Device1 als auch auf Device2 an.",
      "Device2 verfügt zusätzlich bereits über eine manuell konfigurierte VPN-Verbindung VPN3.",
      "",
      "Frage:",
      "Wie viele VPN-Verbindungen sind für User1 auf Device1 bzw. Device2 verfügbar,",
      "nachdem die Intune-Profile angewendet wurden?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1: 1 | Device2: 1" },
      { key: "B", text: "Device1: 2 | Device2: 1" },
      { key: "C", text: "Device1: 2 | Device2: 3" },
      { key: "D", text: "Device1: 3 | Device2: 4" },
      { key: "E", text: "Device1: 5 | Device2: 3" },
      { key: "F", text: "Device1: 5 | Device2: 5" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "User1 ist Mitglied von GroupA und erhält damit beide Intune-VPN-Profile:",
      "- Connection1 (VPN1),",
      "- Connection2 (VPN2).",
      "",
      "Device1:",
      "- Bekommt für User1 VPN1 und VPN2 aus Intune zugewiesen.",
      "- Es ist keine zusätzliche lokale VPN-Verbindung beschrieben.",
      "→ Device1 hat insgesamt 2 VPN-Verbindungen.",
      "",
      "Device2:",
      "- Erhält ebenfalls VPN1 und VPN2 über Intune für User1.",
      "- Zusätzlich besteht bereits eine lokale Verbindung VPN3.",
      "→ Device2 hat insgesamt 3 VPN-Verbindungen.",
      "",
      "Damit ist Option C korrekt: Device1 = 2 Verbindungen, Device2 = 3 Verbindungen.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/vpn-settings-configure",
    ],
  },

  {
    id: "Q42",
    number: 43,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Compliance-Bewertung in Intune – Richtlinienzuweisung und Gerätestatus",
      "",
      "Contoso, Ltd. verwendet Intune-Compliance-Richtlinien, die gruppenbasiert zugewiesen werden.",
      "",
      "Situation:",
      "- Device1 ist Mitglied von Group1 und hat die Richtlinien Policy1 und Policy2 zugewiesen.",
      "  Device1 erfüllt Policy1, aber nicht Policy2.",
      "- Device4 ist Mitglied von Group2 und hat Policy3 zugewiesen, erfüllt diese jedoch nicht.",
      "- Device5 ist Mitglied von Group3, für Group3 ist keine Compliance Policy zugewiesen.",
      "",
      "Die globale Compliance-Einstellung lautet:",
      "- 'Devices with no compliance policy' → Compliant.",
      "",
      "Frage:",
      "Wie ist der Compliance-Status der drei Geräte in Intune?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Device1: compliant | Device4: compliant | Device5: compliant",
      },
      {
        key: "B",
        text: "Device1: non-compliant | Device4: compliant | Device5: non-compliant",
      },
      {
        key: "C",
        text: "Device1: compliant | Device4: non-compliant | Device5: non-compliant",
      },
      {
        key: "D",
        text: "Device1: compliant | Device4: non-compliant | Device5: compliant",
      },
      {
        key: "E",
        text: "Device1: non-compliant | Device4: non-compliant | Device5: compliant",
      },
    ],

    correctAnswers: ["E"],

    explanation: [
      "In Intune gilt:",
      "- Ein Gerät ist nur dann compliant, wenn es alle ihm zugewiesenen Compliance-Richtlinien erfüllt.",
      "- Geräte ohne zugewiesene Richtlinie werden je nach globale Einstellung behandelt – hier: als compliant.",
      "",
      "Device1:",
      "- Hat zwei Richtlinien (Policy1 und Policy2).",
      "- Erfüllt Policy2 nicht.",
      "→ Device1 ist non-compliant.",
      "",
      "Device4:",
      "- Hat Policy3 zugewiesen und erfüllt sie nicht.",
      "→ Device4 ist non-compliant.",
      "",
      "Device5:",
      "- Hat keine Compliance-Richtlinie zugewiesen.",
      "- Globale Einstellung: Geräte ohne Richtlinie sind compliant.",
      "→ Device5 ist compliant.",
      "",
      "Damit ist Option E korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q43",
    number: 44,
    area: "Manage and Maintain Devices (30–35%)",
    difficulty: "medium",

    question: [
      "Contoso Ltd. – Gerätezuweisung & Autopilot-Registrierung",
      "",
      "Contoso Ltd. verwendet ein Windows Autopilot-Profil mit folgender Konfiguration:",
      "- Deployment mode: User-driven",
      "- Join to Azure AD as: Azure AD joined",
      "- Convert all targeted devices to Autopilot: Yes",
      "- Assigned groups: Group1",
      "- Excluded groups: Group2",
      "",
      "Gerätebestand:",
      "- Device1: Corporate-owned, Mitglied von Group1",
      "- Device2: Corporate-owned, Mitglied von Group1 und Group2",
      "- Device3: Personally-owned, Mitglied von Group1",
      "",
      "Frage:",
      "Welche Geräte werden durch den Windows Autopilot Deployment Service automatisch registriert?",
    ].join("\n"),

    options: [
      { key: "A", text: "Nur Device1" },
      { key: "B", text: "Nur Device3" },
      { key: "C", text: "Device1 und Device3" },
      { key: "D", text: "Device1, Device2 und Device3" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Die Option 'Convert all targeted devices to Autopilot' bewirkt, dass alle Geräte,",
      "die in den Zuweisungsgruppen des Profils enthalten sind, automatisch als Autopilot-Geräte registriert werden,",
      "sofern sie als Unternehmensgeräte (Corporate-owned) gekennzeichnet sind.",
      "",
      "Zugewiesene Gruppen: Group1, ausgeschlossen: Group2.",
      "",
      "- Device1: Corporate-owned, in Group1, nicht in Group2 → wird registriert.",
      "- Device2: Corporate-owned, in Group1 UND Group2 → fällt unter die Excluded-Gruppe Group2 → wird NICHT registriert.",
      "- Device3: Personally-owned → wird nicht automatisch in Autopilot aufgenommen, obwohl in Group1.",
      "",
      "Daher wird nur Device1 durch den Autopilot Deployment Service registriert.",
      "Option A ist korrekt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/autopilot/registration",
    ],
  },

  {
    id: "Q44",
    number: 45,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Microsoft Defender for Endpoint Integration und Skriptschutz",
      "",
      "Du hast eine Microsoft 365-Umgebung mit Intune und willst Microsoft Defender for Endpoint (MDE) integrieren.",
      "",
      "Ziele:",
      "1. MDE-Compliance soll über Conditional Access erzwungen werden (Gerätezustand aus MDE in Intune/Entra).",
      "2. Verdächtige Skripte sollen auf verwalteten Geräten blockiert werden.",
      "",
      "Frage:",
      "Welche Konfigurationen sind erforderlich, um diese beiden Anforderungen zu erfüllen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Enforce compliance: Device restriction policy | Skriptschutz: Attack surface reduction (ASR) rule",
      },
      {
        key: "B",
        text: "Enforce compliance: Device restriction policy | Skriptschutz: Intune–MDE-Verbindung",
      },
      {
        key: "C",
        text: "Enforce compliance: Security baseline | Skriptschutz: Device restriction policy",
      },
      {
        key: "D",
        text: "Enforce compliance: Attack surface reduction (ASR) rule | Skriptschutz: Intune–MDE-Verbindung",
      },
      {
        key: "E",
        text: "Enforce compliance: Attack surface reduction (ASR) rule | Skriptschutz: Security baseline",
      },
      {
        key: "F",
        text: "Enforce compliance: Intune–MDE-Verbindung | Skriptschutz: Attack surface reduction (ASR) rule",
      },
    ],

    correctAnswers: ["F"],

    explanation: [
      "1) Enforce compliance for Defender for Endpoint:",
      "Damit Intune den Sicherheitsstatus eines Geräts aus Microsoft Defender for Endpoint (MDE) auswerten kann,",
      "muss eine Intune–MDE-Verbindung (Connector) konfiguriert werden. Erst dann können MDE-Signale in",
      "Compliance-Richtlinien und Conditional Access Policies einfließen.",
      "",
      "2) Prevent suspicious scripts from running:",
      "Zum Blockieren verdächtiger Skripte werden Attack Surface Reduction (ASR)-Regeln eingesetzt.",
      "Diese sind Teil der Defender-/Endpoint-Protection- bzw. Endpoint-Security-Konfiguration und können",
      "z. B. Script-Missbrauch oder Office-Makro-Missbrauch einschränken.",
      "",
      "Device restriction policies (A/B/C) sind für allgemeine Geräteeinstellungen gedacht, Security Baselines (C/E)",
      "bündeln zwar Sicherheitseinstellungen, adressieren aber nicht explizit die MDE-Compliance-Verknüpfung",
      "und Skriptschutz in dieser Form.",
      "",
      "Die korrekte Kombination ist daher:",
      "- Enforce compliance: Intune–MDE-Verbindung,",
      "- Skriptschutz: Attack surface reduction (ASR) rule.",
      "",
      "Dies entspricht Option F.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/conditional-access",
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-asr-policy",
    ],
  },
  {
    id: "Q45",
    number: 46,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",
    question: [
      "Compliance Policy: BitLocker & Mindestbetriebssystemversion in Intune",
      "",
      "Du verwaltest eine Microsoft 365-Umgebung mit Windows 11-Geräten, die in Microsoft Intune registriert sind.",
      "Du sollst eine Compliance-Richtlinie erstellen, die folgende Bedingungen prüft:",
      "",
      "1) BitLocker-Laufwerksverschlüsselung muss aktiviert sein",
      "2) Eine Mindestbetriebssystemversion muss erzwungen werden",
      "",
      "Welche Kategorien der Windows-Compliance-Richtlinie in Intune musst du konfigurieren?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Require BitLocker unter Device health; Require minimum OS version unter Device properties",
      },
      {
        key: "B",
        text: "Require BitLocker und Require minimum OS version beide unter Device health",
      },
      {
        key: "C",
        text: "Require BitLocker und Require minimum OS version beide unter Device properties",
      },
      {
        key: "D",
        text: "Require BitLocker unter Device properties; Require minimum OS version unter Device health",
      },
    ],
    correctAnswers: ["A"],
    explanation: [
      'BitLocker-Status gehört in Windows-Compliance-Richtlinien zur Kategorie "Device health". Dort werden sicherheitsrelevante Gerätezustände wie Secure Boot, Code Integrity und BitLocker geprüft.',
      'Die Mindestbetriebssystemversion wird in der Kategorie "Device properties" definiert. Hier legst du z.B. Plattform und minimale OS-Build fest.',
      "Daher ist nur Kombination A korrekt: BitLocker unter Device health, Mindestversion unter Device properties.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/intune/protect/compliance-policy-create-windows",
    ],
  },

  {
    id: "Q46",
    number: 47,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",
    question: [
      "Compliance Policies: Gerätezugriff nur mit vertrauenswürdiger Firmware/OS",
      "",
      "Du verwaltest eine Microsoft 365-Umgebung mit folgenden Geräten:",
      "",
      "• Device1: Windows 11",
      "• Device2: iOS",
      "• Device3: Android",
      "",
      "Du musst sicherstellen, dass nur Geräte mit vertrauenswürdiger Firmware bzw. nicht kompromittiertem Betriebssystem auf Netzwerkressourcen zugreifen dürfen.",
      "",
      "Welche Compliance-Policy-Einstellung sollte für jedes Gerät konfiguriert werden?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Device1: Require BitLocker; Device2: Prevent jailbroken devices; Device3: Require secure boot",
      },
      {
        key: "B",
        text: "Device1: Require BitLocker; Device2: Prevent rooted devices; Device3: Prevent jailbroken devices",
      },
      {
        key: "C",
        text: "Device1: Prevent jailbroken devices; Device2: Require BitLocker; Device3: Require secure boot",
      },
      {
        key: "D",
        text: "Device1: Prevent rooted devices; Device2: Require secure boot; Device3: Require BitLocker",
      },
      {
        key: "E",
        text: "Device1: Require secure boot; Device2: Prevent jailbroken devices; Device3: Prevent rooted devices",
      },
      {
        key: "F",
        text: "Device1: Require secure boot; Device2: Prevent rooted devices; Device3: Require BitLocker",
      },
    ],
    correctAnswers: ["E"],
    explanation: [
      'Für Windows 10/11 stellst du über Compliance Policies sicher, dass nur Systeme mit vertrauenswürdiger Firmware booten, indem du "Require Secure Boot to be enabled" aktivierst.',
      'Für iOS/iPadOS werden kompromittierte Geräte über die Einstellung "Mark jailbroken devices as noncompliant" blockiert.',
      'Für Android werden manipulierte Geräte über "Mark rooted devices as noncompliant" erkannt und als nicht compliant markiert.',
      "Genau diese Kombination bildet Option E ab; alle anderen Optionen mischen die Plattform-spezifischen Einstellungen falsch.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/protect-devices",
      "https://learn.microsoft.com/en-us/mem/intune/fundamentals/protection-configuration-levels",
    ],
  },

  {
    id: "Q47",
    number: 48,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",
    question: [
      "Intune Custom Compliance Policy – BIOS-Version validieren",
      "",
      "Deine Organisation verwaltet 1.000 Windows 11-Geräte in Microsoft Intune.",
      "Du möchtest eine Custom Compliance Policy erstellen, die die BIOS-Version der Geräte überprüft und den Status in Intune anzeigt.",
      "",
      "Welche Kombination beschreibt korrekt, was du für eine Custom Compliance Policy benötigst?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: 'Nur ein PowerShell-Skript, das "Compliant" oder "NonCompliant" in die Ereignisprotokolle schreibt',
      },
      {
        key: "B",
        text: "Ein Discovery Script (PowerShell), das Werte als JSON zurückgibt, und eine JSON-Definitionsdatei, die die Auswertungsregeln für diese Werte beschreibt",
      },
      {
        key: "C",
        text: "Nur eine JSON-Datei mit Schwellwerten für die BIOS-Version, die Intune direkt auswertet",
      },
      {
        key: "D",
        text: "Ein Gerätekonfigurationsprofil und eine Proactive-Remediation-Richtlinie, aber keine JSON-Datei",
      },
    ],
    correctAnswers: ["B"],
    explanation: [
      "Custom Compliance Policies in Intune bestehen aus zwei Kernkomponenten: einem Discovery Script und einer JSON-Definitionsdatei.",
      "Das Discovery Script (z.B. PowerShell) läuft auf dem Client und ermittelt Geräteeigenschaften wie BIOS-Version oder Modell. Es gibt die Ergebnisse in einem JSON-Objekt zurück.",
      "Die JSON-Definitionsdatei beschreibt, welche Felder im JSON geprüft werden und welche Werte als compliant bzw. noncompliant gewertet werden.",
      "Nur Option B bildet dieses Zusammenspiel korrekt ab. Weder ein alleinstehendes Skript noch nur eine JSON-Datei reichen aus.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/compliance-use-custom-settings",
    ],
  },

  {
    id: "Q48",
    number: 49,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "easy",
    question: [
      "Benutzerrechte: Datum/Zeit ändern & Windows-Protokolle löschen",
      "",
      "Auf einem Windows-10-Computer existieren zwei lokale Benutzer:",
      "• User1 soll Datum und Uhrzeit ändern dürfen.",
      "• User2 soll Windows-Ereignisprotokolle löschen dürfen.",
      "",
      "Nach dem Prinzip der minimalen Rechte (Least Privilege): Welchen lokalen Gruppen müssen die Benutzer zugeordnet werden, damit sie ihre Aufgaben ausführen können?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "User1: Administrators; User2: Administrators",
      },
      {
        key: "B",
        text: "User1: Power Users; User2: Event Log Readers",
      },
      {
        key: "C",
        text: "User1: Users; User2: Event Log Readers",
      },
      {
        key: "D",
        text: "User1: Backup Operators; User2: Performance Log Users",
      },
    ],
    correctAnswers: ["A"],
    explanation: [
      'Die Berechtigung "Change the system time" ist standardmäßig nur Mitgliedern der lokalen Gruppe "Administrators" zugewiesen.',
      'Auch das Löschen von Windows-Ereignisprotokollen ("Clear event log") ist eine administrative Aufgabe, die Administratorrechten vorbehalten ist. Die Gruppe "Event Log Readers" darf nur lesen, nicht löschen.',
      "Daher müssen sowohl User1 als auch User2 Mitglieder der lokalen Administratorengruppe sein, wenn sie diese Aufgaben direkt am System ausführen sollen.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/user-rights-assignment",
      "https://learn.microsoft.com/en-us/windows/win32/eventlog/event-logging-security",
    ],
  },

  {
    id: "Q49",
    number: 50,
    area: "Manage identity and compliance (15–20%)",
    difficulty: "easy",
    question: [
      "Azure AD Join vs. Azure AD Register",
      "",
      "Du hast einen Azure AD-Mandanten contoso.com und verwaltest verschiedene Gerätetypen:",
      "• Windows 10/11 Pro/Enterprise",
      "• Windows 10 Home",
      "• iOS und Android",
      "• macOS und Ubuntu 20.04/22.04 LTS",
      "",
      "Welche Aussage beschreibt korrekt, welche Geräte Azure AD joined und welche Azure AD registered werden können?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Alle genannten Geräte, einschließlich Windows 10 Home, können Azure AD joined werden.",
      },
      {
        key: "B",
        text: "Nur Windows 10/11 (außer Home Edition) können Azure AD joined werden; Windows, iOS, Android, macOS und Ubuntu können Azure AD registered werden.",
      },
      {
        key: "C",
        text: "Nur mobile Geräte (iOS/Android) können Azure AD registered werden; Windows und macOS nur per Azure AD Join.",
      },
      {
        key: "D",
        text: "Azure AD Join ist nur für Serverbetriebssysteme vorgesehen; Clients werden ausschließlich Azure AD registered.",
      },
    ],
    correctAnswers: ["B"],
    explanation: [
      "Azure AD Join ist für organisationsverwaltete Geräte gedacht und wird nur von Windows 10/11 (Professional/Enterprise/Education, nicht Home) unterstützt.",
      "Azure AD Register (Workplace Join) steht für BYOD- und Privatgeräte zur Verfügung und wird von Windows, iOS, Android, macOS und bestimmten Linux-Distributionen wie Ubuntu 20.04/22.04 LTS unterstützt.",
      "Option B bringt diese Unterscheidung korrekt auf den Punkt; die anderen Antworten über- oder unterschätzen die Fähigkeiten der jeweiligen Plattform.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/azure/active-directory/devices/concept-azure-ad-join",
      "https://learn.microsoft.com/en-us/azure/active-directory/devices/concept-azure-ad-register",
    ],
  },

  {
    id: "Q50",
    number: 51,
    area: "Manage identity and compliance (15–20%)",
    difficulty: "easy",
    question: [
      "Azure AD Join – Lokale Administratorrechte",
      "",
      "Du hast einen Azure AD-Mandanten contoso.com mit folgenden Benutzern:",
      "• Admin1@contoso.com – Global Administrator",
      "• Admin2@contoso.com – User Administrator",
      "• User1@contoso.com – Standardbenutzer",
      "",
      "Ein Windows-10-Gerät Computer1 befindet sich noch in einer Workgroup.",
      "User1 führt mit seinem Konto einen Azure AD Join von Computer1 nach contoso.com durch.",
      "",
      "Welche Aussage beschreibt das Standardverhalten nach dem Join am besten?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "User1, der den Azure AD Join ausführt, wird lokaler Administrator auf Computer1.",
      },
      {
        key: "B",
        text: "User Administratoren (z.B. Admin2) werden automatisch lokale Administratoren auf allen Azure-AD-joined Geräten.",
      },
      {
        key: "C",
        text: "Kein Benutzer erhält lokale Administratorrechte; diese müssen immer manuell per Intune zugewiesen werden.",
      },
      {
        key: "D",
        text: "Nur Global Administratoren (z.B. Admin1) werden lokale Administratoren; der Join-Benutzer bleibt Standardbenutzer.",
      },
    ],
    correctAnswers: ["A"],
    explanation: [
      "Bei einem Azure AD Join wird der Benutzer, der den Join durchführt, standardmäßig der lokalen Administratorengruppe des Geräts hinzugefügt.",
      'Zusätzlich können in Azure AD Rollen wie "Azure AD device administrator" definiert werden, deren Mitglieder ebenfalls lokale Administratoren werden. Ein reiner User Administrator erhält jedoch keine lokalen Adminrechte allein durch seine Rolle.',
      "Daher ist Aussage A korrekt; die Optionen B, C und D beschreiben das Standardverhalten nicht richtig.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/azure/active-directory/devices/assign-local-admin",
    ],
  },

  {
    id: "Q51",
    number: 52,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",
    question: [
      "Delegate Remote PowerShell Access with Least Privilege",
      "",
      "Du verwaltest eine Active-Directory-Domäne mit Windows-10-Clients.",
      "Auf allen Rechnern wurde Windows PowerShell Remoting (WinRM) bereits aktiviert.",
      "Das Benutzerkonto Admin1 soll Remote-PowerShell-Sitzungen zu den Clients aufbauen können,",
      "ohne Mitglied der lokalen Administratorengruppe zu sein (Least Privilege).",
      "",
      "Zu welcher lokalen Gruppe solltest du Admin1 hinzufügen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Access Control Assistance Operators" },
      { key: "B", text: "Power Users" },
      { key: "C", text: "Remote Desktop Users" },
      { key: "D", text: "Remote Management Users" },
    ],
    correctAnswers: ["D"],
    explanation: [
      "WinRM und PowerShell Remoting sind standardmäßig auf lokale Administratoren beschränkt.",
      'Um nicht-administrativen Benutzern gezielt Remoting-Rechte zu geben, existiert die lokale Gruppe "Remote Management Users".',
      "Mitgliedschaft in dieser Gruppe erlaubt Remote-PowerShell-Sitzungen, ohne weitere Administrationsrechte wie bei lokalen Administratoren oder RDP-Sitzungen zu vergeben.",
      'Daher ist die Zuordnung von Admin1 zur Gruppe "Remote Management Users" die korrekte und least-privilege-konforme Lösung.',
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/powershell/scripting/learn/remoting/overview",
    ],
  },

  {
    id: "Q52",
    number: 53,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "Windows Autopilot Deployment Profile – Verhalten",
      "",
      "Du erstellst in Intune ein Windows Autopilot Deployment Profile mit folgenden Einstellungen:",
      "",
      "• Apply device name template: No",
      "• User account type: Standard user",
      "",
      "Welche Aussage beschreibt das Verhalten bei der Bereitstellung eines Geräts mit diesem Profil am besten?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Benutzer können keine Desktop-Einstellungen ändern und den Computernamen während der Bereitstellung nicht konfigurieren.",
      },
      {
        key: "B",
        text: "Benutzer können nur ihre eigenen Desktop-Einstellungen ändern und den Computernamen während der Bereitstellung selbst festlegen.",
      },
      {
        key: "C",
        text: "Benutzer können Desktop-Einstellungen für alle Benutzer ändern und Cortana während der Bereitstellung konfigurieren.",
      },
      {
        key: "D",
        text: "Benutzer werden als lokale Administratoren angelegt und erhalten einen automatisch generierten Gerätenamen.",
      },
    ],
    correctAnswers: ["B"],
    explanation: [
      'Mit "User account type = Standard user" werden Benutzerkonten ohne lokale Administratorrechte erstellt. Sie können ihre eigenen Desktop-Settings anpassen, aber keine systemweiten Änderungen vornehmen.',
      'Wenn "Apply device name template = No" gesetzt ist, verwendet Autopilot kein vordefiniertes Namensmuster; der Benutzer kann den Gerätenamen im OOBE-Dialog eingeben.',
      "Damit beschreibt Option B das Verhalten korrekt; die übrigen Optionen widersprechen entweder dem Standard-User-Typ oder der Namenskonfiguration.",
    ].join("\n\n"),
    references: ["https://learn.microsoft.com/en-us/mem/autopilot/profiles"],
  },

  {
    id: "Q53",
    number: 54,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "MDT – Automatischer Start ohne Welcome Screen",
      "",
      "Ein MDT-Server (MDT1) stellt Betriebssysteme über ein LiteTouchPE_x64-Boot-Image bereit.",
      "Wenn Clients vom Image booten, erscheint der Bildschirm:",
      '"Welcome – Run the Deployment Wizard to install a new Operating System".',
      "",
      "Du möchtest, dass der Deployment-Prozess automatisch startet, sobald der Client sich mit MDT1 verbindet – der Welcome Screen soll nicht mehr angezeigt werden.",
      "",
      "Welche Konfiguration ist erforderlich?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Nur die Bootstrap.ini anpassen (SkipBDDWelcome=YES) – weitere Schritte sind nicht erforderlich.",
      },
      {
        key: "B",
        text: "CustomSettings.ini und Bootstrap.ini anpassen und anschließend den Deployment Share updaten, um ein neues Boot-Image zu erzeugen.",
      },
      {
        key: "C",
        text: "Nur die Task Sequence ändern, damit sie automatisch startet; keine Änderungen an INI-Dateien nötig.",
      },
      {
        key: "D",
        text: "Nur DHCP-Optionen 66/67 setzen, damit das PXE-Boot automatisch ohne Benutzerinteraktion abläuft.",
      },
    ],
    correctAnswers: ["B"],
    explanation: [
      "Die Datei Bootstrap.ini steuert Verhalten und Verbindung des WinPE-Boot-Images zum MDT-Server, inklusive SkipBDDWelcome.",
      "Die Datei CustomSettings.ini steuert die einzelnen Seiten des Deployment Wizards (z.B. SkipTaskSequence, SkipComputerName, SkipSummary).",
      "Damit die Änderungen wirksam werden, muss der Deployment Share aktualisiert werden, damit ein neues LiteTouch-Boot-Image mit den geänderten INI-Dateien generiert wird.",
      "Deshalb ist nur Option B vollständig korrekt.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/mem/configmgr/mdt/understand-the-microsoft-deployment-toolkit",
    ],
  },

  {
    id: "Q54",
    number: 55,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",
    question: [
      'Windows Admin Center – Zertifikatwarnung "Your connection isn’t private"',
      "",
      "Beim Zugriff auf die Weboberfläche des Windows Admin Center (WAC) erscheint im Browser die Warnung:",
      '"Your connection isn’t private" (NET::ERR_CERT_AUTHORITY_INVALID).',
      "",
      "Während der WAC-Installation wurde ein selbstsigniertes Zertifikat erstellt.",
      "Du möchtest die Warnung auf den Administrations-Clients dauerhaft beseitigen.",
      "",
      "In welchen Zertifikatsspeicher musst du das WAC-Zertifikat auf den Clients importieren?",
    ].join("\n"),
    options: [
      { key: "A", text: "Client Authentication Issuers" },
      { key: "B", text: "Trusted Root Certification Authorities" },
      { key: "C", text: "Personal (My)" },
      { key: "D", text: "AAD Token Issuer" },
    ],
    correctAnswers: ["B"],
    explanation: [
      "Das von Windows Admin Center erstellte Zertifikat ist selbstsigniert und wird von keiner bekannten öffentlichen oder internen CA ausgestellt.",
      'Damit der Browser dem Zertifikat vertraut, muss die ausstellende CA (hier: das selbstsignierte Zertifikat) in den Speicher "Trusted Root Certification Authorities" des Clientcomputers importiert werden.',
      'Ein Import in "Personal" oder andere Stores ändert die Vertrauenskette des Browsers nicht und beseitigt die Warnung daher nicht. Deshalb ist Option B korrekt.',
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/configure/user-access-control",
    ],
  },
  {
    id: "Q55",
    number: 56,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Remote Desktop – Clipboard blockieren & NLA aktivieren",
      "",
      "Du verwaltest eine Active-Directory-Domäne mit 1.000 Windows-11-Clients.",
      "Die RDP-Konfiguration soll zentral per Gruppenrichtlinie erfolgen.",
      "",
      "Anforderungen:",
      "• Verhindern, dass die Zwischenablage (Clipboard) zwischen Client und RDP-Sitzung genutzt wird.",
      "• Sicherstellen, dass sich Benutzer nur mittels Network Level Authentication (NLA) anmelden können.",
      "",
      "In welchem GPO-Knoten konfigurierst du jeweils die Richtlinien, um diese Anforderungen umzusetzen?",
      "",
      "Hinweis: Es handelt sich um Computerkonfigurationen unterhalb von",
      "Administrative Templates → Windows Components → Remote Desktop Services → Remote Desktop Session Host.",
    ].join("\n"),
    options: [
      { key: "A", text: "Connections" },
      { key: "B", text: "Device and Resource Redirection" },
      { key: "C", text: "Licensing" },
      { key: "D", text: "Printer Redirection" },
      { key: "E", text: "Remote Session Environment" },
      { key: "F", text: "Security" },
    ],
    correctAnswers: ["B", "F"],
    explanation: [
      'Die Einstellung zum Deaktivieren der Zwischenablage (Clipboard) liegt unter dem Knoten "Device and Resource Redirection" als Richtlinie "Do not allow Clipboard redirection".',
      'Die Erzwingung von Network Level Authentication (NLA) erfolgt über den Knoten "Security" mit der Richtlinie "Require user authentication for remote connections by using Network Level Authentication".',
      'Daher müssen für die beiden Anforderungen die Knoten "Device and Resource Redirection" und "Security" verwendet werden.',
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-client-faq",
    ],
  },

  {
    id: "Q56",
    number: 57,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",
    question: [
      "Intune Compliance Policy – Gruppenlogik & BitLocker-Anforderung",
      "",
      "Du verwendest Microsoft Intune mit einer Microsoft 365 E5 Subscription.",
      "Es gibt drei Windows-11-Geräte mit folgenden Gruppenmitgliedschaften:",
      "",
      "• Device1 ist Mitglied in Group1",
      "• Device2 ist Mitglied in Group2",
      "• Device3 ist Mitglied in Group3",
      "",
      "Du erstellst eine Compliance Policy (Policy1) mit der Anforderung:",
      "• BitLocker-Laufwerksverschlüsselung muss aktiviert sein.",
      "",
      "Zuweisungen:",
      "• Include: Group1, Group3",
      "• Exclude: Group2",
      "",
      "Angenommen, nur Device1 hat BitLocker aktiviert, Device2 und Device3 nicht:",
      "Wie wirkt sich die Policy auf die drei Geräte aus?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Policy1 wird Device1 und Device2 zugewiesen; Device1 ist compliant, Device2 non-compliant; Device3 erhält die Policy nicht.",
      },
      {
        key: "B",
        text: "Policy1 wird allen drei Geräten zugewiesen; nur Device1 ist compliant, Device2 und Device3 sind non-compliant.",
      },
      {
        key: "C",
        text: "Policy1 wird Device1 und Device3 zugewiesen; Device1 ist compliant, Device3 non-compliant; Device2 erhält die Policy nicht.",
      },
      {
        key: "D",
        text: "Policy1 wird nur Device3 zugewiesen; Device3 ist compliant, Device1 und Device2 erhalten die Policy nicht.",
      },
    ],
    correctAnswers: ["C"],
    explanation: [
      "Intune berechnet die effektive Zuweisung nach der Regel: Effective = Include − Exclude. Geräte in Exclude-Gruppen erhalten die Policy nicht, selbst wenn sie in Include-Gruppen wären.",
      "Da Group1 und Group3 inkludiert werden, Group2 aber explizit exkludiert ist, gilt:",
      "• Device1 (nur Group1) → Policy1 wird angewendet.",
      "• Device2 (nur Group2) → wird per Exclude ausgeschlossen, keine Policy.",
      "• Device3 (nur Group3) → Policy1 wird angewendet.",
      "Bei der Compliance-Auswertung wird nur Device1 als compliant markiert, weil dort BitLocker aktiv ist. Device3 ist non-compliant, Device2 hat gar keine Compliance-Policy-Zuweisung.",
      "Somit beschreibt Option C die Situation korrekt.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q57",
    number: 58,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "Erstellen eines MDT Deployment Share für Windows-10-Upgrade",
      "",
      "Auf Server1 ist Microsoft Deployment Toolkit (MDT) installiert.",
      "Mehrere Windows 8.1-Computer sollen mittels MDT auf Windows 10 aktualisiert werden (In-Place Upgrade über den Deployment Wizard).",
      "",
      "Was musst du auf Server1 tun und welche Mindestkomponenten müssen im MDT Deployment Share vorhanden sein?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Import the DISM PowerShell module; Windows 10 image only",
      },
      {
        key: "B",
        text: "Import the DISM PowerShell module; Windows 10 image and package only",
      },
      {
        key: "C",
        text: "Import the WindowsPilotIntune PowerShell module; Windows 10 image only",
      },
      {
        key: "D",
        text: "Install the Windows Assessment and Deployment Kit (Windows ADK); Windows 10 image and task sequence only",
      },
      {
        key: "E",
        text: "Install Windows Deployment Services role; Windows 10 image, task sequence, and package",
      },
      {
        key: "F",
        text: "Install Windows Deployment Services role; Windows 10 image and task sequence only",
      },
    ],
    correctAnswers: ["D"],
    explanation: [
      "MDT benötigt das Windows Assessment and Deployment Kit (ADK), um Windows PE und die benötigten Deployment-Tools bereitzustellen. Ohne ADK können keine Boot-Images für das Deployment erzeugt werden.",
      "Im Deployment Share müssen mindestens ein Windows-10-Image und eine Task Sequence vorhanden sein, um ein Upgrade durchführen zu können. Pakete (Packages) sind optional.",
      "Daher ist Option D die einzig korrekte Kombination: Windows ADK installieren und im Deployment Share ein Windows-10-Image sowie eine Task Sequence hinzufügen.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install",
      "https://learn.microsoft.com/en-us/windows/deployment/deploy-windows-mdt/deploy-a-windows-10-image-using-mdt",
    ],
  },

  {
    id: "Q58",
    number: 59,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "Windows Autopilot – Geräteberechtigung & Gruppenlogik",
      "",
      "In einem Azure-AD-Mandanten contoso.com existieren folgende Geräte:",
      "• Device1: Windows 8.1, Azure AD status: Registered, MDM: None",
      "• Device2: Windows 10, Azure AD status: Joined, MDM: None",
      "• Device3: Windows 10, Azure AD status: Joined, MDM: Microsoft Intune",
      "",
      "Azure-AD-Gruppen:",
      "• Group1: Mitglieder = Group2, Device1, Device3",
      "• Group2: Mitglieder = Device2",
      "",
      "Ein Windows Autopilot Deployment Profile ist erstellt mit:",
      "• Deployment mode: Self-deploying",
      "• Join to Azure AD as: Azure AD joined",
      "• Assignments: Include = Group1 (verschachtelte Gruppen werden von Autopilot nicht ausgewertet).",
      "",
      "Welche Geräte können tatsächlich über dieses Autopilot-Profil bereitgestellt werden, wenn sie in OOBE starten?",
    ].join("\n"),
    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device2 only" },
      { key: "C", text: "Device3 only" },
      { key: "D", text: "Device1 and Device3 only" },
      { key: "E", text: "Device1, Device2, and Device3" },
    ],
    correctAnswers: ["C"],
    explanation: [
      "Windows Autopilot setzt Windows 10/11 voraus – Windows 8.1 (Device1) wird nicht unterstützt.",
      "Zudem müssen Geräte dem Autopilot-Profil direkt zugewiesen sein; verschachtelte Gruppen (Group2 in Group1) werden bei Autopilot-Zuweisungen nicht berücksichtigt, daher wird Device2 über Group2 nicht erfasst.",
      "Device3 erfüllt alle Voraussetzungen: Windows 10, Azure AD joined, Intune verwaltet und direktes Mitglied von Group1.",
      "Damit kann nur Device3 über dieses Autopilot-Profil bereitgestellt werden.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/mem/autopilot/windows-autopilot-requirements",
    ],
  },

  {
    id: "Q59",
    number: 60,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "Vergleich Autopilot & In-Place Upgrade (Windows 11 Deployment)",
      "",
      "Eine Organisation nutzt Microsoft Intune Suite für die Geräteverwaltung; Azure-AD-joined Geräte werden automatisch in Intune eingeschrieben.",
      "Vorhandene Geräte (alle Windows-11-kompatible Hardware):",
      "",
      "• Device1: Windows 10 Pro 64-Bit, Azure AD joined = Yes, LOB Apps = No",
      "• Device2: Windows 10 Pro 32-Bit, Azure AD joined = No, LOB Apps = Yes",
      "• Device3: Windows 10 Pro 64-Bit, Azure AD joined = No, LOB Apps = Yes",
      "",
      "Ziel ist es, die Geräte auf Windows 11 Pro zu aktualisieren, unter Beibehaltung von Benutzerprofilen und Anwendungen.",
      "Es stehen zwei Methoden zur Auswahl: Windows Autopilot und In-Place Upgrade.",
      "",
      "Welche Zuordnung ist korrekt?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Windows Autopilot: None of the devices; In-Place Upgrade: Device1 and Device3 only",
      },
      {
        key: "B",
        text: "Windows Autopilot: Device1 only; In-Place Upgrade: Device2 and Device3 only",
      },
      {
        key: "C",
        text: "Windows Autopilot: Device1 and Device3; In-Place Upgrade: Device2 only",
      },
      {
        key: "D",
        text: "Windows Autopilot: Device1, Device2, and Device3; In-Place Upgrade: Device1 only",
      },
    ],
    correctAnswers: ["A"],
    explanation: [
      "Windows Autopilot ist ein Neu-Bereitstellungsmechanismus (Reset/Reimage) und behält Benutzerprofile und lokal installierte Anwendungen nicht im Sinne eines In-Place Upgrades bei. Es ist daher nicht geeignet, wenn Profile und Apps zwingend erhalten bleiben sollen.",
      "Ein In-Place Upgrade kann nur von 64-Bit auf 64-Bit durchgeführt werden; ein Wechsel von 32-Bit auf 64-Bit (Device2) wird nicht unterstützt. Device1 und Device3 sind 64-Bit und damit für ein In-Place Upgrade geeignet.",
      "Damit ergibt sich: Autopilot – keines der Geräte; In-Place Upgrade – Device1 und Device3. Option A ist korrekt.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/upgrade/upgrade-windows-10-to-windows-11",
      "https://learn.microsoft.com/en-us/mem/autopilot/windows-autopilot",
    ],
  },

  {
    id: "Q60",
    number: 61,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",
    question: [
      "Microsoft Intune – Enable Remote Help for User1 on Device1",
      "",
      "Du verwaltest Geräte über Microsoft Intune Suite in einer Microsoft 365 E5-Umgebung.",
      "Device1 ist bereits in Intune registriert.",
      "User1 soll über das Intune Admin Center per Remote Help auf Device1 zugreifen können.",
      "",
      "Welche drei Maßnahmen sind erforderlich, damit User1 Remote Help für Device1 nutzen kann?",
      "(Jede richtige Auswahl ist einen Punkt wert.)",
    ].join("\n"),
    options: [
      { key: "A", text: "Deploy the Remote Help app to Device1" },
      {
        key: "B",
        text: "Assign the Help Desk Operator role (oder eine passende benutzerdefinierte Rolle) an User1",
      },
      {
        key: "C",
        text: "Assign the Intune Administrator role to User1 (global)",
      },
      {
        key: "D",
        text: "Assign a Microsoft 365 E5 license to User1 (ohne Remote Help Add-on)",
      },
      { key: "E", text: "Re-enroll Device1 in Intune using Windows Autopilot" },
      {
        key: "F",
        text: "Assign the Remote Help add-on (oder Intune Suite) license to User1",
      },
    ],
    correctAnswers: ["A", "B", "F"],
    explanation: [
      "Remote Help erfordert, dass die Remote-Help-App auf dem Zielgerät installiert ist; daher muss Device1 die Remote-Help-App erhalten (Option A).",
      'User1 benötigt passende RBAC-Berechtigungen in Intune, typischerweise über die integrierte Rolle "Help Desk Operator" oder eine äquivalente benutzerdefinierte Rolle, die Remote-Help-Berechtigungen enthält (Option B).',
      "Zusätzlich wird eine passende Lizenz benötigt, z.B. Remote Help Add-on oder Intune Suite Lizenz, die User1 zugewiesen sein muss (Option F).",
      "Eine globale Intune-Administratorrolle (C) ist zu weitreichend und nicht erforderlich; eine E5-Lizenz allein (D) beinhaltet Remote Help nicht automatisch; ein erneutes Enrollment des Geräts (E) ist ebenfalls nicht nötig.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/remote-actions/remote-help",
    ],
  },

  {
    id: "Q61",
    number: 62,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "In-Place Upgrade mit Windows 11 – Custom vs. Default Images",
      "",
      "Device1 erfüllt die Hardwareanforderungen für Windows 11.",
      "Es läuft derzeit mit Windows 10 Enterprise (x64) und Microsoft Office 2019 ist installiert.",
      "Du möchtest ein In-Place Upgrade auf Windows 11 Enterprise durchführen, ohne Daten oder Anwendungen zu verlieren.",
      "",
      "Folgende Installationsimages stehen zur Verfügung:",
      "• Image1 (x64): Custom Windows 11 Image, in das Office 2021 integriert wurde.",
      "• Image2 (x64): Default Windows 11 Image (Original Microsoft Install.wim, unverändert).",
      "",
      "Welche Images können für ein In-Place Upgrade auf Device1 verwendet werden?",
    ].join("\n"),
    options: [
      { key: "A", text: "Image1 only" },
      { key: "B", text: "Image2 only" },
      { key: "C", text: "Image1 and Image2" },
      { key: "D", text: "Neither Image1 nor Image2" },
    ],
    correctAnswers: ["B"],
    explanation: [
      "Ein In-Place Upgrade auf Windows 11 setzt ein unverändertes, von Microsoft signiertes Standard-Installationsimage (Install.wim) voraus.",
      "Custom Images, in die Anwendungen (z.B. Office 2021) integriert wurden, werden für In-Place Upgrades nicht unterstützt und führen typischerweise zu Setup-Fehlern.",
      "Daher kann nur das unveränderte Default-Image (Image2) für das In-Place Upgrade verwendet werden.",
      "Image1 eignet sich eher für Neuinstallationen über MDT/WDS oder Imaging-Lösungen, nicht aber als Quelle für das In-Place Upgrade.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/upgrade/upgrade-windows-10-to-windows-11",
    ],
  },

  {
    id: "Q62",
    number: 63,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "MDT – Configure Inject Drivers Task with PnP Detection",
      "",
      "Du verwaltest ein MDT-Deployment-Share DS1.",
      'Unter "Out-of-Box Drivers" hast du für verschiedene Hardwaremodelle eigene Ordner angelegt (z.B. Dell, HP, Lenovo).',
      'Du möchtest die "Inject Drivers"-Task so konfigurieren, dass MDT nur die passenden Treiber per Plug-and-Play-Erkennung (PnP) für das jeweilige Modell installiert.',
      "",
      "Welche Voraussetzung muss erfüllt sein, bevor du die Inject-Drivers-Task in einer Task Sequence entsprechend konfigurieren kannst?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Du musst mindestens ein Betriebssystemabbild (OS package) in das Deployment Share importieren.",
      },
      {
        key: "B",
        text: "Du musst zunächst Selection Profiles für jedes Hardwaremodell erstellen.",
      },
      {
        key: "C",
        text: "Du musst eine zusätzliche Gather Task vor Inject Drivers einfügen.",
      },
      {
        key: "D",
        text: "Du musst die MDT Rules (CustomSettings.ini) so anpassen, dass Model-spezifische Variablen gesetzt werden.",
      },
    ],
    correctAnswers: ["A"],
    explanation: [
      "Bevor eine Task Sequence in MDT erstellt werden kann, muss im Deployment Share mindestens ein Betriebssystemabbild (Operating System) importiert sein.",
      "Die Inject-Drivers-Phase ist Teil der Task Sequence. Ohne importiertes OS gibt es keine Task Sequence und damit auch keine Stelle, an der PnP-gesteuerte Treiberinstallation konfiguriert werden könnte.",
      "Selection Profiles, zusätzliche Gather Tasks oder Model-Regeln in CustomSettings.ini sind für die Feinsteuerung hilfreich, aber nicht die erste zwingende Voraussetzung.",
      "Daher ist Option A korrekt.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/deploy-windows-mdt/deploy-a-windows-10-image-using-mdt",
    ],
  },

  {
    id: "Q63",
    number: 64,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",
    question: [
      "Microsoft Deployment Toolkit (MDT) – Enable Multicast Deployment Support",
      "",
      "Auf Server1 existiert ein MDT Deployment Share (MDT1).",
      "Du möchtest Multicast-Deployments ermöglichen, damit mehrere Clients gleichzeitig effizient dasselbe Image herunterladen können.",
      "",
      "Was musst du auf Server1 installieren, damit MDT1 Multicast-Deployments unterstützt?",
    ].join("\n"),
    options: [
      { key: "A", text: "Windows Server Update Services (WSUS)" },
      { key: "B", text: "BranchCache for Network Files" },
      { key: "C", text: "Windows Deployment Services (WDS)" },
      { key: "D", text: "Network Load Balancing (NLB)" },
    ],
    correctAnswers: ["C"],
    explanation: [
      'MDT selbst kann keine Multicast-Übertragungen bereitstellen. Für Multicast-Deployments wird die Windows-Server-Rolle "Windows Deployment Services" (WDS) benötigt.',
      "WDS stellt Multicast Transmissions für WIM/VHD-Dateien bereit, die MDT dann nutzen kann, um Images gleichzeitig an mehrere Clients zu verteilen.",
      "WSUS, BranchCache und NLB haben andere Einsatzzwecke (Updates, Caching bzw. Lastverteilung) und ermöglichen kein MDT-Multicast im Sinne der Frage.",
      "Daher ist die Installation von Windows Deployment Services (WDS) auf Server1 erforderlich.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/windows-deployment-services/wds-overview",
    ],
  },

  {
    id: "Q64",
    number: 65,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Configure 6-Digit PIN for Windows Hello for Business",
      "",
      "In deinem Azure-AD-Tenant contoso.com sind mehrere Windows-11-Geräte registriert.",
      "Wenn Geräte der Organisation beitreten, werden Benutzer aktuell aufgefordert, eine vierstellige PIN für Windows Hello for Business (WHfB) zu konfigurieren.",
      "Du möchtest erzwingen, dass Benutzer beim Beitritt zu contoso.com eine sechsstellige PIN konfigurieren müssen.",
      "",
      "Du änderst im Microsoft Entra Admin Center die allgemeinen User- und Device-Settings des Tenants.",
      "",
      "Erreicht diese Maßnahme das Ziel?",
    ].join("\n"),
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],
    correctAnswers: ["B"],
    explanation: [
      "Die PIN-Richtlinien für Windows Hello for Business – einschließlich Mindestlänge und Komplexität – werden nicht über die allgemeinen User- oder Device-Settings im Entra Admin Center gesteuert.",
      "Stattdessen werden sie über Windows-Hello- bzw. Gerätekonfigurationsrichtlinien in Intune (oder per Gruppenrichtlinien On-Premises) konfiguriert.",
      "Im Intune Admin Center legst du unter Devices → Windows → Windows Enrollment → Windows Hello for Business die PIN-Komplexität fest (z.B. Mindestlänge = 6).",
      "Das bloße Anpassen der User-/Device-Einstellungen in Entra ändert daher nichts an der PIN-Länge, weshalb die Maßnahme das Ziel nicht erreicht.",
    ].join("\n\n"),
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/windows-hello",
    ],
  },
  {
    id: "Q65",
    number: 66,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Enforce 6-digit PIN for Windows Hello for Business – MDM auto-enrollment + Device Restrictions",
      "",
      "Dein Unternehmen hat einen Azure AD-Tenant contoso.com mit mehreren Windows 11-Geräten.",
      "Benutzer werden beim Geräte-Join aktuell aufgefordert, eine vierstellige PIN für Windows Hello for Business (WHfB) zu erstellen.",
      "",
      "Geplanter Lösungsansatz:",
      "- Im Microsoft Entra admin center wird die automatische MDM-Registrierung (MDM auto-enrollment) aktiviert.",
      "- Im Microsoft Intune admin center wird ein Device Restrictions-Profil erstellt und zugewiesen.",
      "",
      "Frage:",
      "Erreicht diese Maßnahme das Ziel, dass Benutzer beim Geräte-Join künftig eine sechsstellige PIN für WHfB festlegen müssen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Device Restriction Profiles steuern Kennwort-Richtlinien, aber nicht die PIN-Richtlinie für Windows Hello for Business. PIN-Länge und Komplexität werden über die WHfB-Enrollment-Optionen/Identity Protection Profile konfiguriert, nicht über allgemeine Geräteeinschränkungen.",
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/windows-hello",
    ],
  },

  {
    id: "Q66",
    number: 67,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Enforce 6-digit PIN for Windows Hello for Business – MDM auto-enrollment + WHfB Enrollment Options",
      "",
      "Dein Unternehmen besitzt einen Azure AD-Tenant contoso.com mit mehreren Windows 11-Geräten.",
      "Benutzer müssen beim Geräte-Join aktuell eine vierstellige WHfB-PIN erstellen.",
      "",
      "Geplanter Lösungsansatz:",
      "- Im Microsoft Entra admin center wird die automatische MDM-Registrierung konfiguriert.",
      "- Im Microsoft Intune admin center werden die Windows Hello for Business Enrollment-Optionen angepasst (z. B. Mindest-PIN-Länge = 6).",
      "",
      "Frage:",
      "Erreicht diese Maßnahme das Ziel, dass Benutzer künftig eine sechsstellige PIN einrichten müssen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Die PIN-Anforderungen für Windows Hello for Business werden über die WHfB-Enrollment-Optionen (oder Identity Protection Profile) in Intune definiert. In Kombination mit MDM-Auto-Enrollment werden die WHfB-PIN-Richtlinien beim Geräte-Join angewendet, inklusive Mindestlänge von sechs Zeichen.",
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/windows-hello",
    ],
  },

  {
    id: "Q67",
    number: 68,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",
    question: [
      "Intune – Compliance Policy Check-in Intervalle nach Enrollment",
      "",
      "Du verwaltest zwei Geräte mit Microsoft Intune:",
      "- Device1: Windows 11",
      "- Device2: iOS",
      "",
      "Nach der Intune-Registrierung sollen regelmäßig Compliance-Überprüfungen durchgeführt werden.",
      "Wie lauten die korrekten Check-in-Intervalle für Device1 und Device2?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Device1: alle 8 Stunden; Device2: alle 8 Stunden",
      },
      {
        key: "B",
        text: "Device1: alle 15 Minuten für 1 Stunde, dann alle 8 Stunden; Device2: alle 3 Minuten für 15 Minuten, dann alle 8 Stunden",
      },
      {
        key: "C",
        text: "Device1: alle 3 Minuten für 15 Minuten, dann alle 15 Minuten für 2 Stunden, dann alle 8 Stunden; Device2: alle 15 Minuten für 1 Stunde, dann alle 8 Stunden",
      },
      {
        key: "D",
        text: "Device1: alle 15 Minuten dauerhaft; Device2: alle 15 Minuten dauerhaft",
      },
    ],
    correctAnswers: ["C"],
    explanation:
      "Windows-Geräte melden sich initial sehr häufig (alle 3 Minuten, dann alle 15 Minuten) und gehen danach in einen 8-Stunden-Rhythmus über. iOS- (und Android-)Geräte melden sich initial alle 15 Minuten für ca. eine Stunde und danach ebenfalls alle 8 Stunden.",
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q68",
    number: 69,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "Microsoft Tunnel Gateway – Minimale Firewall-Ports",
      "",
      "Du verwaltest Android- und iOS-Geräte mit Microsoft Intune und möchtest Microsoft Tunnel bereitstellen.",
      "Ziel ist es, die Anzahl der offenen Inbound-Firewall-Ports zu minimieren.",
      "",
      "Frage:",
      "Auf welchem Servertyp und mit welchen eingehenden Ports sollte der Microsoft Tunnel Gateway installiert werden, wenn nur die minimal erforderlichen Ports geöffnet werden sollen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Server1; TCP 443 only" },
      { key: "B", text: "Server1; TCP 1723 only" },
      { key: "C", text: "Server2; TCP 443, TCP 1723, and UDP 443" },
      { key: "D", text: "Server3; UDP 443 only" },
      { key: "E", text: "Server4; TCP 443 and UDP 443 only" },
      { key: "F", text: "Server4; TCP 443 only" },
    ],
    correctAnswers: ["E"],
    explanation:
      "Microsoft Tunnel läuft auf einem Linux-Server und benötigt für den Client-Traffic eingehend TCP 443 und UDP 443. Damit sind nur zwei Ports erforderlich. Zusätzliche Ports wie 1723 sind nicht notwendig.",
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/microsoft-tunnel-overview",
      "https://learn.microsoft.com/en-us/mem/intune/protect/microsoft-tunnel-prerequisites",
    ],
  },

  {
    id: "Q69",
    number: 70,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "USMT – Wipe & Load Deployment auf Windows 11",
      "",
      "Ein Unternehmen besitzt 100 Windows 10 Computer, die per Wipe & Load auf Windows 11 migriert werden sollen.",
      "Benutzerdaten und -einstellungen sollen erhalten bleiben.",
      "",
      "Welche Reihenfolge von Aktionen ist erforderlich, um Benutzerdateien und Einstellungen mit USMT zu behalten?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Deploy Windows 11 → Run scanstate.exe → Run loadstate.exe",
      },
      {
        key: "B",
        text: "Run loadstate.exe → Deploy Windows 11 → Run scanstate.exe",
      },
      {
        key: "C",
        text: "Run scanstate.exe → Deploy Windows 11 → Run loadstate.exe",
      },
      {
        key: "D",
        text: "Deploy Windows 11 → Run loadstate.exe → Run scanstate.exe",
      },
    ],
    correctAnswers: ["C"],
    explanation:
      "Mit USMT werden Benutzerdaten zuerst mit scanstate.exe gesichert, anschließend erfolgt das Wipe & Load Deployment (Windows 11 Neuinstallation) und danach die Wiederherstellung der Daten mit loadstate.exe.",
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/usmt/usmt-overview",
    ],
  },

  {
    id: "Q70",
    number: 71,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "Windows Autopilot – Logsammlung bei Bereitstellungsfehlern",
      "",
      "Du verwendest Windows Autopilot mit Intune, um Windows 11-Geräte bereitzustellen.",
      "Ein Support Engineer meldet, dass er bei fehlgeschlagenen Autopilot-Bereitstellungen keine Logs vom Gerät sammeln kann.",
      "",
      "Frage:",
      "Welche Konfiguration musst du anpassen, damit Autopilot-Logs automatisch gesammelt und über das Intune admin center heruntergeladen werden können?",
    ].join("\n"),
    options: [
      { key: "A", text: "Automatic enrollment settings" },
      { key: "B", text: "Windows Autopilot deployment profile" },
      { key: "C", text: "Enrollment Status Page (ESP) profile" },
      { key: "D", text: "Device configuration profile" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Die Option zur Logsammlung und zur Autopilot-Diagnoseseite wird im Enrollment Status Page (ESP)-Profil konfiguriert. Dort kann die Logsammlung bei Fehlern aktiviert werden.",
    references: [
      "https://learn.microsoft.com/en-us/mem/autopilot/enrollment-status",
    ],
  },

  {
    id: "Q71",
    number: 72,
    area: "Deploy and manage a Microsoft 365 tenant (25–30%)",
    difficulty: "medium",
    question: [
      "Deployment-Plan Windows 11 – Marketing (AD DS) & Sales (Azure AD + OEM Autopilot)",
      "",
      "Ein Unternehmen betreibt eine on-premises AD DS-Domäne, die per Azure AD Connect mit Azure AD synchronisiert wird.",
      "Geräte werden über Intune und Configuration Manager verwaltet.",
      "",
      "Anforderungen:",
      "- Marketing-Geräte: nur AD DS-joined, komplexe Software wird intern per IT installiert.",
      "- Sales-Geräte: Azure AD joined, Geräte werden direkt vom OEM an die Benutzer geliefert, minimaler IT-Aufwand.",
      "",
      "Frage:",
      "Welche Bereitstellungsmethoden sollten für Marketing bzw. Sales empfohlen werden?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Marketing: Windows Autopilot; Sales: Configuration Manager",
      },
      {
        key: "B",
        text: "Marketing: Hybrid Azure AD join via Autopilot; Sales: Bare-metal Imaging",
      },
      {
        key: "C",
        text: "Marketing: Intune only; Sales: Windows Autopilot (user-driven, ohne OEM-Registrierung)",
      },
      {
        key: "D",
        text: "Marketing: Windows Autopilot (self-deploying); Sales: Configuration Manager",
      },
      {
        key: "E",
        text: "Marketing: Configuration Manager; Sales: Windows Autopilot mit OEM registration",
      },
    ],
    correctAnswers: ["E"],
    explanation:
      "Marketing benötigt klassische on-premises Domänen-Clients mit komplexen Softwareinstallationen – ideal für Configuration Manager. Sales-Geräte sollen direkt vom Hersteller an die Benutzer gehen und Azure AD joined sein – ideal für Windows Autopilot mit OEM-Registrierung.",
    references: [
      "https://learn.microsoft.com/en-us/mem/autopilot/windows-autopilot",
      "https://learn.microsoft.com/en-us/mem/configmgr/core/understand/introduction",
    ],
  },

  {
    id: "Q72",
    number: 73,
    area: "Deploy and manage a Microsoft 365 tenant (25–30%)",
    difficulty: "medium",
    question: [
      "Windows 10 Pro → Enterprise Upgrade mit minimaler Benutzerinteraktion",
      "",
      "Einige Benutzer nutzen privat gekaufte Geräte mit Windows 10 Pro.",
      "Du sollst:",
      "- auf Windows 10 Enterprise upgraden,",
      "- Azure AD-Join durchführen,",
      "- Microsoft Store-Apps automatisch installieren,",
      "ohne Benutzerdaten oder Apps zu verlieren und mit minimaler Benutzerinteraktion.",
      "",
      "Frage:",
      "Welche Lösung erfüllt die Anforderungen am besten?",
    ].join("\n"),
    options: [
      { key: "A", text: "Microsoft Deployment Toolkit (MDT) Task Sequence" },
      {
        key: "B",
        text: "Windows Deployment Services (WDS) Bare-Metal Deployment",
      },
      { key: "C", text: "Windows Configuration Designer Provisioning Package" },
      { key: "D", text: "Windows Autopilot Reset und Neu-Bereitstellung" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Ein Provisioning Package (.ppkg), erstellt mit Windows Configuration Designer, kann Edition-Upgrade, Azure AD-Join und App-Bereitstellung durchführen, ohne das OS neu zu installieren und ohne Benutzerdaten zu verlieren.",
    references: [
      "https://learn.microsoft.com/en-us/windows/configuration/provisioning-packages/provisioning-packages",
    ],
  },

  {
    id: "Q73",
    number: 74,
    area: "Manage applications (15–20%)",
    difficulty: "hard",
    question: [
      "Conditional Access – Mehrfachrichtlinien & Gerätefilterung",
      "",
      "Du hast zwei Conditional Access Policies für Exchange Online:",
      "- CAPolicy1: User1, Plattformen Windows/iOS, Grant → Require MFA.",
      "- CAPolicy2: User1 + User2, Plattformen Android/iOS, Gerätefilter: Geräte mit Namen, die '1' enthalten, werden ausgeschlossen; Grant → Block access.",
      "",
      "Geräte:",
      "- Device1 (Android, Name enthält '1')",
      "- Device2 (iOS, Name enthält '2')",
      "",
      "Bewerte folgende Aussagen:",
      "1) User1 von Device1 (Android) → MFA erforderlich.",
      "2) User2 von Device1 (Android) → MFA erforderlich.",
      "3) User2 von Device2 (iOS) → Zugriff möglich.",
      "",
      "Welche Kombination beschreibt das tatsächliche Verhalten?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "1) Ja, 2) Ja, 3) Ja",
      },
      {
        key: "B",
        text: "1) Nein, 2) Nein, 3) Nein – Zugriff wird blockiert",
      },
      {
        key: "C",
        text: "1) Nein, 2) Nein, 3) Ja",
      },
      {
        key: "D",
        text: "1) Ja, 2) Nein, 3) Nein",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "Device1 wird durch den Gerätefilter von CAPolicy2 ausgeschlossen, daher greifen keine CA-Richtlinien für User1 oder User2 auf Device1 → kein MFA, kein Block. Device2 (iOS, Name enthält '2') fällt unter CAPolicy2 mit Block access, daher wird User2 auf Device2 blockiert. Damit sind die Aussagen 'MFA erforderlich' bzw. 'Zugriff möglich' in allen drei Fällen falsch.",
    references: [
      "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview",
      "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-filter-for-devices",
    ],
  },

  {
    id: "Q74",
    number: 75,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Microsoft Defender for Endpoint Policies auf macOS-Geräten anwenden",
      "",
      "Du verwaltest 500 macOS-Geräte, die bereits in Microsoft Intune eingeschrieben sind.",
      "Du möchtest mit minimalem administrativen Aufwand Microsoft Defender for Endpoint Antivirus-Richtlinien auf diese Geräte anwenden.",
      "",
      "Frage:",
      "Was solltest du tun?",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "Im Microsoft Endpoint Manager admin center ein Konfigurationsprofil für Microsoft Defender for Endpoint erstellen und zuweisen",
      },
      {
        key: "B",
        text: "Eine Security Baseline im Endpoint Manager erstellen und auf macOS-Geräte anwenden",
      },
      {
        key: "C",
        text: "macOS-Geräte im Microsoft 365 Purview Compliance Center onboarden",
      },
      {
        key: "D",
        text: "Defender for Endpoint manuell auf allen macOS-Geräten installieren",
      },
    ],
    correctAnswers: ["A"],
    explanation:
      "Die empfohlene Methode ist die Bereitstellung von Defender for Endpoint für macOS über ein Intune-Konfigurationsprofil (Onboarding-Profil). Dadurch kann Defender zentral ausgerollt und verwaltet werden, ohne manuelle Installation auf jedem Gerät.",
    references: [
      "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/mac-install-with-intune",
    ],
  },

  {
    id: "Q75",
    number: 76,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",
    question: [
      "MDT – Windows 11 In-Place Upgrade Task Sequence",
      "",
      "In einer AD-Domäne soll ein Computer mit Windows 10 per In-Place-Upgrade auf Windows 11 aktualisiert werden.",
      "Du:",
      "- fügst dem MDT-Deployment-Share Windows 11 Boot- und Install-Images hinzu,",
      "- erstellst eine Standard Client Upgrade Task Sequence,",
      "- bootest den Computer mit LiteTouchPE_x64.iso und startest die Task Sequence.",
      "",
      "Frage:",
      "Erfüllt diese Lösung das Ziel eines In-Place-Upgrades mit Erhalt von Benutzerdaten und Anwendungen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Die Standard Client Upgrade Task Sequence in MDT ist explizit für In-Place-Upgrades (z. B. Windows 10 → Windows 11) vorgesehen und erhält Benutzerprofile und Anwendungen.",
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/deploy-windows-mdt/upgrade-to-windows-10-with-mdt",
    ],
  },

  {
    id: "Q76",
    number: 77,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "Windows Deployment Services (WDS) – In-Place-Upgrade auf Windows 11?",
      "",
      "Du fügst einem WDS-Server Windows 11 Boot- und Install-Images hinzu und startest einen Windows 10-Computer per PXE-Boot, um Windows 11 zu installieren.",
      "",
      "Frage:",
      "Erreicht dieses Vorgehen ein echtes In-Place-Upgrade mit Erhalt von Benutzerdaten und Anwendungen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],
    correctAnswers: ["B"],
    explanation:
      "WDS/PXE-Boot startet in WinPE und führt typischerweise ein Clean Install durch. Ein In-Place-Upgrade erfordert, dass setup.exe aus dem laufenden Betriebssystem gestartet wird, damit Profile und Apps übernommen werden können.",
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/wds/wds-overview",
    ],
  },

  {
    id: "Q77",
    number: 78,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",
    question: [
      "WinPE – In-Place-Upgrade auf Windows 11 von Netzwerkfreigabe?",
      "",
      "Du kopierst das Windows 11-Installationsmedium auf eine Netzwerkfreigabe,",
      "startest den Windows 10-Computer in Windows PE und führst setup.exe von der Netzwerkfreigabe aus.",
      "",
      "Frage:",
      "Erreicht dieses Vorgehen ein In-Place-Upgrade mit Erhalt von Benutzerprofilen und Anwendungen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],
    correctAnswers: ["B"],
    explanation:
      "WinPE ist eine separate Umgebung. Wenn setup.exe aus WinPE ausgeführt wird, handelt es sich um eine Neuinstallation. Ein In-Place-Upgrade muss aus dem laufenden Windows 10 gestartet werden.",
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/windows-setup-install",
    ],
  },

  {
    id: "Q78",
    number: 79,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",
    question: [
      "In-Place-Upgrade auf Windows 11 per setup.exe aus laufendem OS",
      "",
      "Du kopierst das Windows 11-Installationsmedium auf eine Netzwerkfreigabe.",
      "Computer1 läuft unter Windows 10.",
      "Du startest Computer1 normal und führst setup.exe von der Netzwerkfreigabe aus.",
      "",
      "Frage:",
      "Erfüllt dieses Vorgehen das Ziel eines In-Place-Upgrades mit Erhalt von Benutzerprofilen und Anwendungen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Ein In-Place-Upgrade wird erreicht, wenn setup.exe im Kontext des laufenden Windows 10 ausgeführt wird. Dabei können Benutzerdateien und Programme beibehalten werden.",
    references: [
      "https://learn.microsoft.com/en-us/windows/deployment/upgrade/upgrade-to-windows-11",
    ],
  },

  {
    id: "Q79",
    number: 80,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Automatic Enrollment in Intune – MDM vs. MAM Scope",
      "",
      "Du hast einen Azure AD Premium P2 Tenant mit folgenden Einstellungen:",
      "- MDM user scope: Group1",
      "- MAM user scope: Group2",
      "",
      "Benutzer:",
      "- User1 ist Mitglied in Group1 und Group2.",
      "- User2 ist nur Mitglied in Group2.",
      "",
      "Geräte:",
      "- Device1: Windows 11 (Work device)",
      "- Device2: Android (BYOD).",
      "",
      "Frage:",
      "Bewerte, in welchen Fällen eine automatische Geräteeinschreibung in Intune möglich ist.",
    ].join("\n"),
    options: [
      {
        key: "A",
        text: "User1 kann Device1 automatisch registrieren; User1 kann Device2 automatisch registrieren; User2 kann Device1 automatisch registrieren",
      },
      {
        key: "B",
        text: "User1 kann Device1 automatisch registrieren; User1 kann Device2 automatisch registrieren; User2 kann Device1 nicht automatisch registrieren",
      },
      {
        key: "C",
        text: "User1 kann Device1 automatisch registrieren; User1 kann Device2 nicht automatisch registrieren; User2 kann Device1 nicht automatisch registrieren",
      },
      {
        key: "D",
        text: "User1 kann Device1 nicht automatisch registrieren; User1 kann Device2 automatisch registrieren; User2 kann Device1 automatisch registrieren",
      },
    ],
    correctAnswers: ["C"],
    explanation:
      "Nur Benutzer im MDM user scope (Group1) können Geräte automatisch in Intune registrieren. User1 ist in Group1 → Device1 kann automatisch registriert werden. MAM scope (Group2) steuert nur App-Schutzrichtlinien, nicht die Geräteeinschreibung. User2 ist nur in Group2 → keine automatische Geräteeinschreibung.",
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/enrollment/device-enrollment",
    ],
  },

  {
    id: "Q80",
    number: 81,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Network location-based compliance policies (Network Fencing)",
      "",
      "In Intune verwaltest du drei Geräte:",
      "- Device1: Windows 11, Intune MDM",
      "- Device2: Android, Intune MDM",
      "- Device3: iOS, Intune MDM",
      "",
      "Im Intune admin center wurde ein Standort 'Location1' als Unternehmensnetzwerk definiert.",
      "Du möchtest network location-based compliance (Network Fencing) nutzen.",
      "",
      "Frage:",
      "Welche Geräte können network location-based compliance policies verwenden?",
    ].join("\n"),
    options: [
      { key: "A", text: "Nur Device1" },
      { key: "B", text: "Device1 und Device2" },
      { key: "C", text: "Device1 und Device3" },
      { key: "D", text: "Device2 und Device3" },
      { key: "E", text: "Device1, Device2 und Device3" },
    ],
    correctAnswers: ["E"],
    explanation:
      "Network location-based compliance (Network Fencing) wird von allen gängigen, per Intune verwalteten Plattformen unterstützt: Windows, Android und iOS/iPadOS.",
    references: [
      "https://www.microsoftpressstore.com/articles/article.aspx?p=3129455",
    ],
  },

  {
    id: "Q81",
    number: 82,
    area: "Protect devices (15–20%)",
    difficulty: "easy",
    question: [
      "Intune Data Warehouse – Geräteinventarbericht",
      "",
      "Du möchtest einen Geräteinventarbericht erstellen, der Daten aus dem Intune Data Warehouse verwendet.",
      "",
      "Frage:",
      "Welches Tool solltest du verwenden, um den Bericht zu erstellen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Azure portal app" },
      { key: "B", text: "Endpoint analytics" },
      { key: "C", text: "Company Portal app" },
      { key: "D", text: "Microsoft Power BI" },
    ],
    correctAnswers: ["D"],
    explanation:
      "Das Intune Data Warehouse stellt OData-Feeds bereit, die sich ideal mit Microsoft Power BI auswerten und visualisieren lassen. So können individuelle Inventar- und Verlaufberichte erstellt werden.",
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/developer/reports-nav-create-intune-reports",
    ],
  },

  {
    id: "Q82",
    number: 83,
    area: "Manage applications (15–20%)",
    difficulty: "easy",
    question: [
      "Conditional Access Policy wird nicht angewendet – CAPolicy1 enforce",
      "",
      "Du hast eine Conditional Access Policy CAPolicy1 erstellt,",
      "die den Zugriff auf Exchange Online von iOS-Geräten für Group1 blockieren soll.",
      "User1 (Mitglied von Group1) kann jedoch weiterhin von iOS auf Exchange zugreifen.",
      "",
      "Frage:",
      "Was musst du tun, um sicherzustellen, dass CAPolicy1 tatsächlich durchgesetzt wird?",
    ].join("\n"),
    options: [
      { key: "A", text: "Eine neue Terms of Use (TOU) konfigurieren" },
      { key: "B", text: "CAPolicy1 zusätzlich Group2 zuweisen" },
      { key: "C", text: "CAPolicy1 aktivieren (Enable Policy = On)" },
      { key: "D", text: "In CAPolicy1 einen Gerätefilter hinzufügen" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Neue Conditional Access Policies sind oft zunächst im Report-only- oder Off-Status. Nur wenn die Policy explizit auf 'On' gesetzt ist, wird sie tatsächlich erzwungen.",
    references: [
      "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting",
    ],
  },

  {
    id: "Q83",
    number: 84,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "PLATZHALTER – Frage 89",
      "",
      "Dies ist ein Platzhalterobjekt für Q89.",
      "Bitte ersetze Frage, Optionen, richtige Antwort und Erklärung später durch den tatsächlichen Inhalt.",
    ].join("\n"),
    options: [
      { key: "A", text: "Platzhalter-Option A" },
      { key: "B", text: "Platzhalter-Option B" },
      { key: "C", text: "Platzhalter-Option C" },
      { key: "D", text: "Platzhalter-Option D" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Platzhalter-Frage. Diese Frage sollte in MD102 Learning App später durch den echten Inhalt der Frage 89 ersetzt werden.",
    references: [],
  },

  {
    id: "Q84",
    number: 85,
    area: "Protect devices (15–20%)",
    difficulty: "medium",
    question: [
      "Intune–Defender for Endpoint Integration (Service-to-Service Connection)",
      "",
      "Du verwaltest 1.000 Windows 11-Geräte, die alle in Intune registriert sind.",
      "Du möchtest Intune mit Microsoft Defender for Endpoint integrieren,",
      "damit Gerätesicherheitsrisiken (Risk Level) in Intune für Compliance und Conditional Access nutzbar sind.",
      "",
      "Frage:",
      "Welche Einstellung im Intune admin center muss konfiguriert werden,",
      "um eine Service-to-Service-Verbindung zwischen Intune und Defender for Endpoint herzustellen?",
    ].join("\n"),
    options: [
      { key: "A", text: "Tenant administration → Connectors and tokens" },
      { key: "B", text: "Intune add-ons" },
      { key: "C", text: "Microsoft Tunnel Gateway" },
      { key: "D", text: "Tenant enrollment" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Die Integration mit Microsoft Defender for Endpoint wird über 'Connectors and tokens' im Intune admin center eingerichtet. Dort wird die Defender-Verbindung aktiviert, damit Intune Risikoinformationen von MDE auswerten kann.",
    references: [
      "https://learn.microsoft.com/en-us/mem/intune/protect/advanced-threat-protection-configure",
    ],
  },

  {
    id: "Q85",
    number: 86,
    area: "Deploy Windows clients (25–30%)",
    difficulty: "medium",

    question: [
      "# 🧩 111 – Choose the Right Windows Autopilot Deployment Mode",
      "",
      "## Szenario",
      "Dein Unternehmen verwendet **Windows Autopilot** zur Bereitstellung neuer Windows 11-Geräte.",
      "Es gibt zwei Gerätetypen:",
      "",
      "- **Sales-Laptops**: Werden direkt vom OEM an die Benutzer geliefert,",
      "  sollen **Azure AD joined** sein und **vom Benutzer selbst eingerichtet** werden.",
      "- **Kiosk-PCs** im Foyer: Stehen öffentlich, werden **nicht von Benutzern personalisiert**,",
      "  laufen mit einem **festen Kiosk-Account**, keine Benutzerinteraktion bei der Bereitstellung.",
      "",
      "Du willst für beide Gerätetypen den passenden **Autopilot Deployment Mode** wählen.",
      "",
      "## Aufgabe",
      "Ordne den **richtigen Autopilot-Modus** dem jeweiligen Szenario zu.",
      "",
      "Welche Kombination ist korrekt?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Sales-Laptops: Self-deploying mode | Kiosk: User-driven mode",
      },
      {
        key: "B",
        text: "Sales-Laptops: Pre-provisioned deployment | Kiosk: Self-deploying mode",
      },
      {
        key: "C",
        text: "Sales-Laptops: User-driven mode | Kiosk: Self-deploying mode",
      },
      {
        key: "D",
        text: "Sales-Laptops: User-driven mode | Kiosk: Pre-provisioned deployment",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Sales-Laptops: User-driven mode | Kiosk: Self-deploying mode**",
      "",
      "### 🔍 Herleitung",
      "Autopilot kennt u. a. diese Modi:",
      "",
      "- **User-driven mode**:",
      "  - Für **Endbenutzergeräte**.",
      "  - Die Benutzer melden sich während des OOBE-Prozesses mit ihrem **Azure AD-Konto** an.",
      "  - Ergebnis: Gerät wird **Azure AD joined** und in **Intune enrolled**.",
      "",
      "- **Self-deploying mode**:",
      "  - Für **Shared Devices, Kiosks, Digital Signage, Shared PCs**.",
      "  - **Keine Benutzereingabe** für den Join.",
      "  - Gerät meldet sich selbstständig bei Autopilot, wird **Azure AD joined** und in **Intune** aufgenommen.",
      "  - Oft mit einem festen lokalen / Azure AD-Konto oder Kiosk-Konfiguration kombiniert.",
      "",
      "### 💼 Anwendung auf das Szenario",
      "**Sales-Laptops**:",
      "- Geräte werden vom OEM direkt zu den Anwendern geliefert.",
      "- Die Nutzer sollen **ihre Geräte selbst einrichten** und sich mit ihrem Firmenkonto anmelden.",
      "- Genau dafür ist der **User-driven mode** gedacht.",
      "",
      "**Kiosk-PCs**:",
      "- Öffentliche PCs, keine persönliche Anmeldung, kein individueller Benutzerkontext.",
      "- Sie sollen **ohne Interaktion** bereitgestellt werden.",
      "- Typischer Einsatzfall für **Self-deploying mode**.",
      "",
      "### ❌ Warum die anderen Optionen falsch sind",
      "- **A**: Vertauscht – Sales im Self-deploying Mode passt nicht, da Benutzerinteraktion gewünscht ist.",
      "- **B**: Pre-provisioned (White Glove) ist vor allem für IT/OEM-Vorbereitung, aber nicht speziell für Kiosk ohne Benutzer.",
      "- **D**: Kiosk mit Pre-provisioned ist möglich, aber nicht der passende Modus, wenn die Frage explizit nach dem Kiosk-Autopilot-Modus fragt.",
      "",
      "📌 **Merksatz:**",
      "- **User-driven** = User klickt sich durch OOBE.",
      "- **Self-deploying** = Gerät macht alles allein (Kiosk, Shared).",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/intune/configuration/device-restrictions-android-for-work#device-experience",
    ],
  },

  {
    id: "Q86",
    number: 87,
    area: "Deploy Windows clients (25–30%)",
    difficulty: "medium",

    question: [
      "# 🧩 112 – In-Place Upgrade vs. Wipe & Load mit Intune Feature Updates",
      "",
      "## Szenario",
      "Dein Unternehmen hat **500 Windows 10 21H2** Geräte, alle:",
      "",
      "- **Azure AD joined**",
      "- über **Intune verwaltet**",
      "- produktiv im Einsatz",
      "",
      "Du möchtest alle Geräte auf **Windows 11 23H2** aktualisieren,",
      "ohne Benutzerdaten oder installierte Anwendungen zu verlieren.",
      "",
      "Du planst, in Intune eine **Feature Update Policy for Windows 10 and later** zu konfigurieren",
      "und auf eine Gerätegruppe anzuwenden.",
      "",
      "## Frage",
      "Welche Aussage beschreibt korrekt, was passiert?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Die Geräte führen ein Clean Install (Wipe & Load) auf Windows 11 durch und alle Apps werden entfernt.",
      },
      {
        key: "B",
        text: "Die Geräte führen ein In-place Upgrade auf Windows 11 durch und behalten Daten und Apps.",
      },
      {
        key: "C",
        text: "Die Geräte müssen zuerst hybrid Azure AD joined werden, bevor ein Feature Update angewendet werden kann.",
      },
      {
        key: "D",
        text: "Feature Update Policies können nur auf Windows 10, nicht auf Windows 11 angewendet werden.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Die Geräte führen ein In-place Upgrade auf Windows 11 durch und behalten Daten und Apps.**",
      "",
      "### 🔍 Hintergrund",
      "**Feature Update Policies** in Intune:",
      "- Erzwingen ein **bestimmtes Windows-Feature-Release** (z. B. 22H2 oder 23H2).",
      "- Arbeiten auf bereits **installierten Windows-Versionen**.",
      "- Führen ein **In-place Upgrade** durch:",
      "  - Benutzerprofile bleiben erhalten.",
      "  - Installierte Anwendungen bleiben erhalten.",
      "  - Einstellungen bleiben weitgehend erhalten.",
      "",
      "### Warum ist B korrekt?",
      "Im Szenario:",
      "- Windows 10 21H2 → Ziel: Windows 11 23H2",
      "- Geräte sind bereits **Azure AD joined** und intune-managed.",
      "- Feature Update Policy wählt die Zielversion aus.",
      "",
      "Intune veranlasst ein **In-place Upgrade** auf die gewünschte Version.",
      "Das ist genau dafür gedacht, produktive Geräte ohne Wipe & Load zu aktualisieren.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Clean Install / Wipe & Load:**",
      "  - Feature Update Policies machen *kein* Clean Install.",
      "  - Stattdessen wird das bestehende System auf eine neue Buildversion **hochgezogen**.",
      "",
      "- **C – Zwang zu Hybrid Join:**",
      "  - Feature Updates funktionieren mit **Azure AD joined** Geräten problemlos.",
      "  - Hybrid ist nicht Voraussetzung.",
      "",
      "- **D – Nur Windows 10:**",
      "  - Feature Update Policies unterstützen **Windows 10 und Windows 11**.",
      "  - Du kannst z. B. auch Windows 11 22H2 → 23H2 steuern.",
      "",
      "📌 **Merksatz:**",
      "**Feature Update Policy = gesteuertes In-place Upgrade auf eine bestimmte Buildversion.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-feature-updates",
    ],
  },

  {
    id: "Q87",
    number: 88,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 113 – Intune Filters für dynamische Richtlinienzuweisung",
      "",
      "## Szenario",
      "Du verwaltest Windows-Geräte über Intune und verwendest **Azure AD-Gruppen** zur Zuweisung von:",
      "",
      "- Gerätekonfigurationsprofilen",
      "- Compliance Policies",
      "- App-Zuweisungen",
      "",
      "Du möchtest neue Richtlinien nur auf **Windows 11 Enterprise** Geräte anwenden,",
      "ohne deine Gruppenstruktur in Azure AD zu verändern.",
      "",
      "## Aufgabe",
      "Du planst, **Intune Filters** zu nutzen.",
      "",
      "Welche Aussage beschreibt korrekt, wie Intune Filters funktionieren?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Filters ersetzen Azure AD-Gruppen vollständig und sollten statt Gruppen verwendet werden.",
      },
      {
        key: "B",
        text: "Filters werden bei der Richtlinienzuweisung zusätzlich zu Gruppen ausgewertet, um Zielgeräte ein- oder auszuschließen.",
      },
      {
        key: "C",
        text: "Filters können nur für App-Zuweisungen, nicht für Konfigurationsprofile verwendet werden.",
      },
      {
        key: "D",
        text: "Filters basieren nur auf Benutzerattributen, nicht auf Geräteeigenschaften.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Filters werden bei der Richtlinienzuweisung zusätzlich zu Gruppen ausgewertet, um Zielgeräte ein- oder auszuschließen.**",
      "",
      "### 🔍 Was sind Intune Filters?",
      "Intune Filters sind **zusätzliche Kriterien**, die bei der Zuweisung von Richtlinien verwendet werden.",
      "",
      "- Sie werden **zusätzlich** zu Azure AD-Gruppen konfiguriert.",
      "- Du weist eine Richtlinie **z. B. der Gruppe „All Windows devices“** zu und verwendest einen Filter,",
      "  um nur Geräte zu treffen, die bestimmten Kriterien entsprechen.",
      "",
      "Beispiele für Filterkriterien:",
      "- OS-Typ (Windows, iOS, Android)",
      "- OS-Version (z. B. 10.0.22631 für Windows 11)",
      "- Gerätemanagement-Typ (MDM, Co-managed)",
      "- Manufacturer, Device model, Device category etc.",
      "",
      "### Anwendung im Szenario",
      "Du willst **nur Windows 11 Enterprise** Geräte treffen.",
      "Du kannst z. B. Folgendes tun:",
      "",
      "1. Richtlinie an **eine breite Gruppe** zuweisen (z. B. „All Windows Clients“).",
      "2. Einen Filter definieren: `osVersion >= 10.0.22000` UND `edition == Enterprise`.",
      "3. Filter als **Include filter** an die Richtlinie anhängen.",
      "",
      "Damit musst du **nicht** neue, fein granulare Azure AD-Gruppen bauen.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Ersetzen Gruppen:**",
      "  - Filters ergänzen Gruppen, sie ersetzen sie nicht.",
      "  - Ohne Gruppe keine Zuweisung – Filter arbeiten *on top*.",
      "",
      "- **C – Nur Apps:**",
      "  - Filters funktionieren für **Konfigurationsprofile, Compliance Policies, Apps** usw.",
      "",
      "- **D – Nur Benutzerattribute:**",
      "  - Filters sind primär auf **Geräteeigenschaften** ausgerichtet, nicht auf Benutzerattribute.",
      "",
      "📌 **Merksatz:**",
      "**Gruppe = Wer grundsätzlich Ziel ist. Filter = Welche Geräte innerhalb der Gruppe es wirklich trifft.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/fundamentals/filters",
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q88",
    number: 89,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 114 – Autopilot Reset vs. Fresh Start vs. Wipe",
      "",
      "## Szenario",
      "Ein Windows 11-Gerät ist:",
      "",
      "- **Azure AD joined**",
      "- **In Intune enrolled**",
      "- einem Benutzer zugeordnet, der das Unternehmen verlässt.",
      "",
      "Du möchtest das Gerät:",
      "- für einen **neuen Benutzer in derselben Abteilung** vorbereiten,",
      "- **Autopilot-Registrierung und Entra / Intune-Zuordnung behalten**,",
      "- **OEM-Apps entfernen**,",
      "- nur **Benutzerdateien und -apps** zurücksetzen.",
      "",
      "## Frage",
      "Welche Remote-Aktion in Intune ist am besten geeignet?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Wipe" },
      { key: "B", text: "Fresh Start" },
      { key: "C", text: "Autopilot Reset" },
      { key: "D", text: "Restart" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Autopilot Reset**",
      "",
      "### 🔍 Vergleich der Aktionen",
      "**Wipe**:",
      "- Setzt das Gerät vollständig zurück.",
      "- Entfernt alle Benutzer- und Firmendaten.",
      "- Autopilot-Registrierung bleibt *in der Cloud* bestehen,",
      "  aber auf dem Gerät wird ein kompletter Neuaufsetzungsprozess gestartet.",
      "- Wird oft für Geräte genutzt, die an andere Standorte / Firmen gehen.",
      "",
      "**Fresh Start**:",
      "- Entfernt OEM-Bloatware und installiert Windows neu,",
      "- behält optional einige Einstellungen und Daten.",
      "- Ist **nicht** spezifisch für Autopilot-Szenarien",
      "  und wird eher zur Bereinigung / Performanceoptimierung genutzt.",
      "",
      "**Autopilot Reset**:",
      "- Setzt das Gerät in einen **sauberen, betriebsbereiten Zustand** zurück.",
      "- Entfernt **Benutzerprofile, installierte Anwendungen und lokale Änderungen**.",
      "- **Behält Autopilot-Registrierung**, Azure AD Join und Intune Enrollment.",
      "- Nach dem Reset startet das Gerät wieder im **„Business-ready“-Zustand**,",
      "  sodass ein neuer Benutzer es einfach in Betrieb nehmen kann.",
      "",
      "### Anwendung im Szenario",
      "Du willst:",
      "- Das Gerät **für einen neuen Mitarbeiter** wiederverwenden.",
      "- **Autopilot-Konfiguration und Intune-Management** sollen bleiben.",
      "- Der Prozess soll **möglichst automatisiert** und standardisiert sein.",
      "",
      "Genau dafür ist **Autopilot Reset** gedacht.",
      "",
      "### ❌ Warum nicht Wipe oder Fresh Start?",
      "- **Wipe**:",
      "  - Eher für „Gerät verlässt das Unternehmen“.",
      "  - Es müsste danach erneut vollständig bereitgestellt werden.",
      "",
      "- **Fresh Start**:",
      "  - Räumt OEM-Apps ab, aber ist kein vollständiger „Ready for next user“-Mechanismus",
      "    in Autopilot-Szenarien.",
      "",
      "📌 **Merksatz:**",
      "- **Autopilot Reset** = **„Ready for next user“** im Autopilot-Kontext.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/remote-actions/device-fresh-start",
    ],
  },

  {
    id: "Q89",
    number: 90,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 115 – Gerätekonformität und Conditional Access – Nicht konforme Geräte blockieren",
      "",
      "## Szenario",
      "Du verwaltest Geräte mit **Intune** und Benutzeridentitäten mit **Entra ID (Azure AD)**.",
      "",
      "Ziel:",
      "- Nur **konforme Geräte** dürfen auf **Exchange Online** zugreifen.",
      "- Nicht konforme Geräte sollen **automatisch blockiert** werden.",
      "",
      "Du hast bereits:",
      "- Eine **Compliance Policy** erstellt und Geräten zugewiesen.",
      "- Geräte werden korrekt als *compliant* oder *non-compliant* angezeigt.",
      "",
      "## Frage",
      "Was musst du zusätzlich konfigurieren, um sicherzustellen, dass **nicht konforme Geräte keinen Zugriff** auf Exchange Online erhalten?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Eine App configuration policy für Exchange Online erstellen",
      },
      {
        key: "B",
        text: "Eine Conditional Access Policy erstellen, die nur Zugriff von compliant devices erlaubt",
      },
      {
        key: "C",
        text: "Die Compliance Policy so ändern, dass non-compliant Geräte automatisch gelöscht werden",
      },
      {
        key: "D",
        text: 'Im Intune Admin Center die Option "Block noncompliant devices" global aktivieren',
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Eine Conditional Access Policy erstellen, die nur Zugriff von compliant devices erlaubt**",
      "",
      "### 🔍 Zusammenspiel: Compliance Policy & Conditional Access",
      "- **Compliance Policies** legen fest:",
      "  - Welche technischen Anforderungen ein Gerät erfüllen muss.",
      "  - Beispiel: BitLocker aktiv, Secure Boot, aktuelles OS, kein Jailbreak/Root.",
      "  - Ergebnis: Gerät ist **compliant** oder **non-compliant**.",
      "",
      "- **Conditional Access Policies** legen fest:",
      "  - Wer auf **welche Cloud-App** zugreifen darf.",
      "  - Unter **welchen Bedingungen** (z. B. MFA, compliant device, location).",
      "",
      "Allein eine **Compliance Policy** blockiert keinen Zugriff.",
      "Erst in Kombination mit **Conditional Access** entsteht:",
      "",
      '> "Zulasse Zugriff **nur**, wenn das Gerät **compliant** ist."',
      "",
      "### Konkretes Setup",
      "1. **Compliance Policy** (bereits vorhanden):",
      "   - Markiert Gerät als compliant/non-compliant.",
      "",
      "2. **Conditional Access Policy** für Exchange Online:",
      "   - **Assignments → Users/Groups**: Zielbenutzer auswählen.",
      "   - **Cloud apps**: `Office 365 / Exchange Online`.",
      "   - **Conditions → Device platforms**: optional einschränken.",
      "   - **Access controls → Grant**:",
      "     - `Grant access`",
      "     - `Require device to be marked as compliant` aktivieren.",
      "",
      "Ergebnis:",
      "- Gerät ist **compliant** → Zugriff erlaubt.",
      "- Gerät ist **non-compliant** → Zugriff blockiert.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – App configuration policy**:",
      "  - Steuert App-Einstellungen, aber keinen Zugriffsblock basierend auf Compliance.",
      "",
      "- **C – Geräte löschen**:",
      "  - Nicht praktikabel und auch nicht Standardfunktion der Compliance Policy.",
      "",
      '- **D – "Block noncompliant devices" global**:',
      "  - Es gibt keine solche einfache globale Schalteroption –",
      "    dies wird immer über **Conditional Access** abgebildet.",
      "",
      "📌 **Merksatz:**",
      "**Compliance sagt, wie sicher das Gerät ist – Conditional Access entscheidet, ob es trotz allem rein darf.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
      "https://learn.microsoft.com/mem/intune/protect/conditional-access",
    ],
  },

  {
    id: "Q90",
    number: 91,
    area: "Manage applications (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 116 – Wahl des richtigen App-Typs in Intune – Win32 vs. Store-App",
      "",
      "## Szenario",
      "Du möchtest eine klassische **Win32-Anwendung (Setup.exe)** auf",
      "**Windows 11 Enterprise** Clients verteilen.",
      "",
      "Eigenschaften der App:",
      "",
      "- Es gibt ein **Setup.exe** mit mehreren Parametern.",
      "- Die App muss mit **Custom Install- und Uninstall-Commands** installiert werden.",
      "- Du möchtest **detection rules** konfigurieren (Registry/File Check).",
      "",
      "## Frage",
      "Welchen App-Typ solltest du in Intune verwenden?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Line-of-business app (Windows app (Win32))" },
      { key: "B", text: "Microsoft Store app (new)" },
      { key: "C", text: "Web link" },
      { key: "D", text: "Microsoft 365 Apps for Windows" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**A) Line-of-business app (Windows app (Win32))**",
      "",
      "### 🔍 Hintergrund: App-Typen in Intune",
      "Für Windows gibt es in Intune u. a. folgende App-Typen:",
      "",
      "- **Windows app (Win32)**:",
      "  - Verpackt als **.intunewin** (über das Win32 Content Prep Tool).",
      "  - Ideal für **klassische Win32-Anwendungen (EXE, MSI mit Parametern)**.",
      "  - Unterstützt:",
      "    - Custom Install- & Uninstall-Commands",
      "    - Detection Rules (File, Registry, MSI)",
      "    - Abhängigkeiten, Supersedence etc.",
      "",
      "- **Microsoft Store app (new)**:",
      "  - Für Apps aus dem Microsoft Store.",
      "  - Kein klassisches `setup.exe`, sondern Store-basierte Bereitstellung.",
      "",
      "- **Web link**:",
      "  - Legt nur eine **Verknüpfung auf eine URL** an.",
      "",
      "- **Microsoft 365 Apps for Windows**:",
      "  - Spezieller App-Typ nur für Office (Word, Excel, Outlook etc.).",
      "",
      "### Anwendung im Szenario",
      "Du hast:",
      "- Eine klassische **Win32-App**.",
      "- Ein **Setup.exe** mit Parametern.",
      "- Wunsch nach **detailed detection rules**.",
      "",
      "Das ist der perfekte Fall für:",
      "> **Windows app (Win32)** als Line-of-business App.",
      "",
      "### ❌ Warum sind die anderen Optionen falsch?",
      "- **B – Store app (new)**:",
      "  - Nur sinnvoll, wenn die App im Store vorliegt.",
      "",
      "- **C – Web link**:",
      "  - Keine echte Installation.",
      "",
      "- **D – Microsoft 365 Apps**:",
      "  - Nur für Office-Pakete, nicht für individuelle EXE-Software.",
      "",
      "📌 **Merksatz:**",
      "**Win32-App mit Setup.exe + Parametern = immer „Windows app (Win32)“ in Intune.**",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/apps/"],
  },

  {
    id: "Q91",
    number: 92,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 117 – Microsoft Defender Antivirus: Active Mode vs. Passive Mode",
      "",
      "## Szenario",
      "Dein Unternehmen setzt **einen Drittanbieter-Virenscanner** auf Windows 11-Geräten ein.",
      "Du möchtest **Microsoft Defender Antivirus** nur als **Echtzeit-Scanner im Hintergrund** nutzen,",
      "der aber **keinen Konflikt** mit der bestehenden Lösung verursacht.",
      "",
      "Ziel:",
      "- Defender soll **Signaturen aktualisieren** und",
      "- bei Bedarf für **EDR in Block mode** (Defender for Endpoint) zur Verfügung stehen,",
      "- aber **nicht als primärer AV-Engine** fungieren.",
      "",
      "## Frage",
      "In welchem Modus sollte Microsoft Defender Antivirus konfiguriert werden?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Disabled mode" },
      { key: "B", text: "Active mode" },
      { key: "C", text: "Passive mode" },
      { key: "D", text: "Audit mode" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Passive mode**",
      "",
      "### 🔍 Defender-Modi im Überblick",
      "- **Active mode**:",
      "  - Defender ist der **primäre Antivirenanbieter**.",
      "  - Echtzeitschutz, Scans, Active Remediation.",
      "",
      "- **Passive mode**:",
      "  - Defender ist **installiert**, aber **nicht der primäre AV**.",
      "  - Wird häufig in Kombination mit **Microsoft Defender for Endpoint (MDE)** verwendet.",
      "  - Andere AV-Produkte bleiben primär aktiv.",
      "",
      "- **Disabled mode**:",
      "  - Defender ist vollständig deaktiviert.",
      "",
      "- **Audit mode** (eher bei ASR-Regeln etc.):",
      "  - Aktionen werden protokolliert, aber nicht blockiert.",
      "",
      "### Anwendung im Szenario",
      "Du hast bereits einen Drittanbieter-AV und möchtest:",
      "- Defender nicht als **primäre Engine**,",
      "- aber weiterhin **Telemetrie und Schutzfunktionen** für MDE nutzen.",
      "",
      "Genau dafür ist **Passive mode** vorgesehen.",
      "",
      "### ❌ Warum sind die anderen Optionen falsch?",
      "- **A – Disabled mode**:",
      "  - Kein sinnvoller Zustand bei MDE, da Telemetrie & Schutz verloren gehen.",
      "",
      "- **B – Active mode**:",
      "  - Würde mit dem Drittanbieter-AV kollidieren.",
      "",
      "- **D – Audit mode**:",
      "  - Bezieht sich nicht auf die Rolle als primäre AV-Engine.",
      "",
      "📌 **Merksatz:**",
      "**Defender + Drittanbieter-AV + MDE = Defender im „Passive mode“ laufen lassen.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-antivirus-policy",
    ],
  },

  {
    id: "Q92",
    number: 93,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 118 – Intune Remediation Scripts (Proactive Remediations)",
      "",
      "## Szenario",
      "Deine Organisation setzt **Intune** und **Microsoft 365 E5** ein.",
      "Du hast das Problem, dass auf einigen Windows 11-Geräten:",
      "",
      "- Ein Registry-Key für eine bestimmte Anwendung fehlt.",
      "- Wenn der Key fehlt, startet die Anwendung nicht korrekt.",
      "",
      "Du möchtest:",
      "- Den Zustand **regelmäßig prüfen** (Detect).",
      "- Falls nötig, den **Registry-Key automatisch setzen** (Remediate).",
      "",
      "## Frage",
      "Welches Intune-Feature ist dafür am besten geeignet?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Device configuration profile (OMA-URI)" },
      { key: "B", text: "Intune PowerShell scripts (Run once)" },
      {
        key: "C",
        text: "Proactive remediations (Remediation scripts) in Endpoint analytics",
      },
      { key: "D", text: "Compliance policy mit benutzerdefinierter Regel" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Proactive remediations (Remediation scripts) in Endpoint analytics**",
      "",
      "### 🔍 Was sind Proactive Remediations?",
      "Proactive Remediations sind ein Feature in **Endpoint Analytics** (Teil von Intune),",
      "mit dem du **wiederkehrende Checks und Reparaturen** auf Clients ausführen kannst.",
      "",
      "Sie bestehen aus zwei Skripten:",
      "- **Detection script**: Prüft, ob ein Problem vorliegt.",
      "- **Remediation script**: Führt eine Korrektur durch, wenn nötig.",
      "",
      "Typische Einsätze:",
      "- Registry-Fix ausrollen, wenn Key fehlt.",
      "- Bestimmte Dienste sicherstellen (z. B. Windows Update Dienst läuft).",
      "- Bereinigung von veralteten Konfigurationen.",
      "",
      "### Anwendung im Szenario",
      "Du willst:",
      "- Wiederholt prüfen, ob ein Registry-Key vorhanden ist.",
      "- Wenn nicht, automatisch einen Key setzen.",
      "",
      "Genau das leisten **Proactive Remediations**.",
      "",
      "### ❌ Warum sind die anderen Optionen weniger geeignet?",
      "- **A – Device configuration profile (OMA-URI)**:",
      "  - Funktioniert für bekannte MDM-Einstellungen,",
      "  - aber hier handelt es sich um **beliebige Registry-Fixes**.",
      "",
      "- **B – Intune PowerShell scripts (Run once)**:",
      "  - Standardmäßig werden diese nur **einmal** beim Enroll bzw. bei Zuweisung ausgeführt.",
      "  - Kein wiederkehrendes Monitoring + Remediation.",
      "",
      "- **D – Compliance Policy mit Custom Rule**:",
      "  - Könnte den Zustand zwar bewerten,",
      "  - aber **nicht automatisch fixen**.",
      "",
      "📌 **Merksatz:**",
      "**Wiederkehrende „Check & Fix“-Jobs auf Windows-Clients → Proactive Remediations.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/analytics/proactive-remediations",
    ],
  },

  {
    id: "Q93",
    number: 94,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 119 – Windows Local Administrator Password Solution (LAPS) in Entra / Intune",
      "",
      "## Szenario",
      "Dein Unternehmen möchte die **lokalen Administratorpasswörter** auf Windows 11-Geräten:",
      "",
      "- Einzigartig pro Gerät halten",
      "- Regelmäßig rotieren",
      "- Sicher in der Cloud speichern",
      "",
      "Die Geräte sind:",
      "- **Azure AD joined**",
      "- über **Intune** verwaltet",
      "",
      "Du planst, die **Cloud-basierte Windows LAPS-Integration** zu verwenden.",
      "",
      "## Frage",
      "Wo werden die LAPS-Passwörter bei Verwendung von **Windows LAPS mit Entra ID** gespeichert?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Nur lokal im TPM des Geräts" },
      { key: "B", text: "In einem geheimen Attribut des lokalen SAM" },
      { key: "C", text: "In Microsoft Entra ID (Azure AD), im Geräteobjekt" },
      { key: "D", text: "In Intune als benutzerdefiniertes Attribut" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) In Microsoft Entra ID (Azure AD), im Geräteobjekt**",
      "",
      "### 🔍 Hintergrund: Windows LAPS (Cloud-Variante)",
      "Die neue **Windows LAPS** Version (ab Windows 11 / neuere Windows 10 Builds)",
      "unterstützt die Speicherung von lokalen Admin-Passwörtern in:",
      "",
      "- **On-Prem AD** (klassischer LAPS-Nachfolger)",
      "- **Microsoft Entra ID (Azure AD)** – Cloud-Variante",
      "",
      "Bei **Azure AD joined** Geräten mit Cloud-LAPS:",
      "- Das lokale Administratorpasswort wird **verschlüsselt** an Entra ID übertragen.",
      "- Es wird **im Geräteobjekt** in Entra gespeichert.",
      "- Administratoren mit entsprechender Berechtigung können das Passwort einsehen",
      "  (z. B. über Entra Portal oder PowerShell).",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Nur im TPM**:",
      "  - TPM speichert Schlüsselmaterial, aber nicht das LAPS-Passwort als solches für Admin-Zugriff.",
      "",
      "- **B – Lokales SAM-Attribut**:",
      "  - Das Passwort wird lokal gesetzt, aber die Lösung besteht gerade darin,",
      "    es **zentral abrufen** zu können.",
      "",
      "- **D – In Intune als Attribut**:",
      "  - Intune ist das Management-Tool,",
      "  - die eigentliche Passwortspeicherung liegt in **Entra ID**, nicht im Intune-Datenmodell.",
      "",
      "📌 **Merksatz:**",
      "**Cloud-LAPS (für Azure AD joined Clients) speichert das Passwort im Entra-Geräteobjekt.**",
    ].join("\n"),
  },

  {
    id: "Q94",
    number: 95,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 120 – Intune Compliance Policy: Require BitLocker with TPM",
      "",
      "## Szenario",
      "Du erstellst eine **Compliance Policy** für Windows 11-Geräte mit folgenden Anforderungen:",
      "",
      "- **Device must be encrypted with BitLocker** = Required",
      "- **Trusted Platform Module (TPM) required** = Required",
      "",
      "Ein Gerät **Device1** hat folgende Eigenschaften:",
      "",
      "- Windows 11 Pro",
      "- Systemlaufwerk **nicht verschlüsselt**",
      "- TPM 2.0 vorhanden und aktiviert",
      "",
      "## Frage",
      "Wie wird Device1 nach Anwendung der Compliance Policy bewertet?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Compliant, weil ein TPM vorhanden ist" },
      {
        key: "B",
        text: "Compliant, weil mindestens eine Bedingung erfüllt ist",
      },
      { key: "C", text: "Non-compliant, weil BitLocker fehlt" },
      {
        key: "D",
        text: "Non-compliant, aber nur, wenn auch Secure Boot deaktiviert ist",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Non-compliant, weil BitLocker fehlt**",
      "",
      "### 🔍 Wie Compliance Policies auswerten",
      "Eine Compliance Policy mit mehreren Anforderungen verwendet **logisches UND**:",
      "",
      "- BitLocker erforderlich **UND**",
      "- TPM erforderlich",
      "",
      "Das Gerät ist nur **compliant**, wenn **alle Bedingungen** erfüllt sind.",
      "",
      "### Anwendung auf Device1",
      "- TPM: ✅ vorhanden",
      "- BitLocker: ❌ nicht aktiviert",
      "",
      "Damit ist eine der Bedingungen **nicht erfüllt**, also:",
      "",
      "> **Gesamtstatus = Non-compliant**",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Nur TPM reicht:**",
      "  - Die Policy verlangt **beides**, nicht „entweder oder“.",
      "",
      "- **B – Eine Bedingung reicht:**",
      "  - Falsch, Compliance-Regeln sind standardmäßig **konjunktiv (UND)**.",
      "",
      "- **D – Secure Boot**:",
      "  - Im Szenario ist keine Secure-Boot-Bedingung definiert.",
      "  - Entscheidend ist ausschließlich BitLocker + TPM.",
      "",
      "📌 **Merksatz:**",
      "**Compliance-Settings in einer Policy müssen alle erfüllt sein – eine fehlende Bedingung reicht für Non-compliance.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
      "https://learn.microsoft.com/mem/intune/protect/encrypt-devices",
    ],
  },

  //
  // 121–130: Weitere Fragen mit ausführlicher Erklärung
  //

  {
    id: "Q95",
    number: 96,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 121 – Co-Management Workloads: Intune vs. Configuration Manager",
      "",
      "## Szenario",
      "Dein Unternehmen verwendet **Configuration Manager (SCCM)** und **Intune** im **Co-management**-Modus.",
      "",
      "Du planst, den Workload **Windows Updates** von Configuration Manager zu Intune zu verschieben,",
      "möchtest aber, dass **alle anderen Workloads vorerst in SCCM** bleiben.",
      "",
      "## Frage",
      "Welche Einstellung musst du anpassen, um nur den Windows Update Workload auf Intune umzustellen?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "In Intune ein Windows Update Ring erstellen – mehr ist nicht nötig.",
      },
      {
        key: "B",
        text: "Im Co-management properties den Slider für „Compliance policies“ auf Intune setzen.",
      },
      {
        key: "C",
        text: "Im Co-management properties den Slider für „Windows Update policies“ auf Intune setzen.",
      },
      {
        key: "D",
        text: "Die Geräte neu in Intune ohne Co-management registrieren.",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Im Co-management properties den Slider für „Windows Update policies“ auf Intune setzen.**",
      "",
      "### 🔍 Co-Management-Grundlagen",
      "Bei Co-management (SCCM + Intune) kannst du pro **Workload** festlegen:",
      "",
      "- Wird dieser Bereich von **ConfigMgr** oder von **Intune** gesteuert?",
      "",
      "Typische Workloads:",
      "- Compliance policies",
      "- Device configuration",
      "- Windows Update policies",
      "- Endpoint Protection",
      "- Resource Access, etc.",
      "",
      "In den **Co-management properties** im Configuration Manager gibt es für jeden Workload einen **Slider**:",
      "- `SCCM` → `Pilot Intune` → `Intune`",
      "",
      "### Anwendung im Szenario",
      "Du willst **nur**:",
      "- Windows Updates von Intune aus steuern.",
      "- Andere Workloads weiterhin über SCCM.",
      "",
      "Daher musst du **nur den Slider** für:",
      "> **„Windows Update policies“ → Intune**",
      "",
      "auf Intune (oder Pilot Intune + passende Collection) umstellen.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Nur Update Ring erstellen:**",
      "  - Ohne Umstellung des Workloads ignorieren Co-managed Clients den Intune-Ring.",
      "",
      "- **B – Compliance policies umstellen:**",
      "  - Das betrifft nur Compliance, nicht die Update-Steuerung.",
      "",
      "- **D – Neu in Intune ohne Co-management:**",
      "  - Unnötig und würde SCCM-Management brechen.",
      "",
      "📌 **Merksatz:**",
      "**Bei Co-management steuert der Workload-Slider, welches System das Sagen hat.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/configmgr/comanage/overview",
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
    ],
  },

  {
    id: "Q96",
    number: 97,
    area: "Manage applications (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 122 – iOS App Protection Policy – Zielebene Benutzer vs. Gerät",
      "",
      "## Szenario",
      "Dein Unternehmen verfolgt ein **BYOD-Konzept** für iOS/iPadOS:",
      "",
      "- Benutzer bringen private iPhones mit.",
      "- Geräte werden **nicht als MDM-Gerät** in Intune eingeschrieben.",
      "- Du möchtest nur **Unternehmensdaten in Apps** schützen (z. B. Outlook, OneDrive).",
      "",
      "Du erstellst eine **App Protection Policy (APP)** für iOS.",
      "",
      "## Frage",
      "Auf welche Ebene sollte die Richtlinie angewendet werden, damit sie unabhängig vom physischen Gerät wirkt?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Auf Geräteebene (Device targeted)" },
      { key: "B", text: "Auf Benutzerbasis (User targeted)" },
      { key: "C", text: "Auf Gruppen von iOS-Geräten in Intune" },
      { key: "D", text: "Nur über eine Compliance Policy" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Auf Benutzerbasis (User targeted)**",
      "",
      "### 🔍 Hintergrund: App Protection Policies (APP)",
      "App Protection Policies schützen **Unternehmensdaten in Apps**, nicht das gesamte Gerät.",
      "",
      "Typische Szenarien:",
      "- BYOD-Geräte ohne vollwertige MDM-Einschreibung.",
      "- Nur bestimmte Apps (Outlook, Teams, OneDrive) werden kontrolliert.",
      "",
      "APPs werden in Intune immer **Benutzern** zugewiesen:",
      "- Zuweisung an **Benutzergruppen (Azure AD)**.",
      "- Der Schutz folgt dem **Benutzerkonto**, egal auf welchem Gerät er die App verwendet.",
      "",
      "### Anwendung im Szenario",
      "Du willst:",
      "- BYOD (private iPhones).",
      "- Kein MDM-Enrollment.",
      "- Nur Daten in Unternehmens-Apps schützen.",
      "",
      "Daher muss die Richtlinie **Benutzer-basiert** zugewiesen werden.",
      "Wenn sich der Benutzer mit seinem Firmenkonto in Outlook anmeldet, greift die APP-Policy.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Devices targeted:**",
      "  - APPs zielen nicht auf Geräteobjekte, sondern auf Benutzer.",
      "",
      "- **C – Gerätegruppen in Intune:**",
      "  - BYOD-Geräte sind oft gar nicht in Intune als MDM-Gerät registriert.",
      "",
      "- **D – Compliance Policy:**",
      "  - Compliance betrifft Gerät, nicht App-Daten.",
      "",
      "📌 **Merksatz:**",
      "**App Protection = Benutzerdaten in Apps schützen → immer Benutzer als Ziel, nicht Gerät.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy",
      "https://learn.microsoft.com/mem/intune/apps/lob-apps-ios",
    ],
  },

  {
    id: "Q97",
    number: 98,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 123 – Microsoft Tunnel for Intune – Unterstützte Plattformen",
      "",
      "## Szenario",
      "Du planst, **Microsoft Tunnel for Intune** zu implementieren,",
      "damit mobile Geräte per **VPN** sicher auf On-Premises-Ressourcen zugreifen können.",
      "",
      "Du möchtest wissen, für welche Plattformen du **Tunnel-Client und VPN-Profile** bereitstellen kannst.",
      "",
      "## Frage",
      "Welche beiden Plattformen werden von Microsoft Tunnel **nativ** unterstützt?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Android und iOS/iPadOS" },
      { key: "B", text: "Windows 11 und macOS" },
      { key: "C", text: "Android und Windows 11" },
      { key: "D", text: "iOS/iPadOS und macOS" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**A) Android und iOS/iPadOS**",
      "",
      "### 🔍 Microsoft Tunnel Überblick",
      "Microsoft Tunnel ist eine **VPN-Lösung**, die in Intune integriert ist und:",
      "",
      "- Auf einem **Linux-Server** (on-prem oder in der Cloud) läuft.",
      "- Für **mobile Geräte** gedacht ist.",
      "- Mit **Intune** verwaltet und ausgerollt wird.",
      "",
      "Der Tunnel-Client ist verfügbar für:",
      "- **Android** (als App aus dem Store)",
      "- **iOS/iPadOS** (als App aus dem App Store)",
      "",
      "Windows- und macOS-Geräte nutzen andere Zugriffswege (z. B. klassisches VPN, ZTNA, DirectAccess/Always On VPN etc.),",
      "aber **nicht** Microsoft Tunnel als Client-Lösung.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **B – Windows + macOS:**",
      "  - Nicht die primären Zielplattformen für Microsoft Tunnel.",
      "",
      "- **C – Android + Windows:**",
      "  - Windows gehört nicht dazu.",
      "",
      "- **D – iOS + macOS:**",
      "  - macOS hat keinen Microsoft Tunnel Client.",
      "",
      "📌 **Merksatz:**",
      "**Microsoft Tunnel = Intune-gemanagtes Mobile VPN für Android & iOS/iPadOS.**",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },

  {
    id: "Q98",
    number: 99,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 124 – Gerätestatus in Intune: Pending, In Progress, Succeeded, Error",
      "",
      "## Szenario",
      "Du hast ein neues **Device configuration profile** für Windows 11 erstellt und es einer Gruppe von 100 Geräten zugewiesen.",
      "",
      "Im Intune-Portal siehst du bei den **Gerätestatusübersichten** folgende Werte:",
      "",
      "- 70 Geräte = **Succeeded**",
      "- 20 Geräte = **Pending**",
      "- 5 Geräte = **In Progress**",
      "- 5 Geräte = **Error**",
      "",
      "## Frage",
      "Welche Aussage beschreibt den Status **Pending** korrekt?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Das Profil wurde auf das Gerät heruntergeladen, aber die Anwendung ist noch nicht abgeschlossen.",
      },
      {
        key: "B",
        text: "Das Gerät hat das Profil noch nicht angefordert oder synchronisiert.",
      },
      {
        key: "C",
        text: "Die Profilanwendung ist fehlgeschlagen und erfordert manuelles Eingreifen.",
      },
      {
        key: "D",
        text: "Das Gerät hat das Profil angewendet, wartet aber auf Benutzeraktion.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Das Gerät hat das Profil noch nicht angefordert oder synchronisiert.**",
      "",
      "### 🔍 Statusbedeutungen in Intune",
      "- **Pending**:",
      "  - Die Richtlinie ist **zugewiesen**,",
      "  - aber das Gerät hat sie **noch nicht vom Intune-Dienst abgeholt**.",
      "  - Häufig, wenn das Gerät **offline** ist oder sich noch nicht synchronisiert hat.",
      "",
      "- **In Progress**:",
      "  - Das Gerät hat die Richtlinie erhalten und ist gerade dabei, sie anzuwenden.",
      "",
      "- **Succeeded**:",
      "  - Richtlinie wurde erfolgreich angewendet.",
      "",
      "- **Error**:",
      "  - Anwendung fehlgeschlagen.",
      "  - Es gibt einen Fehlercode und Logs zur Analyse.",
      "",
      "### Anwendung im Szenario",
      "Die 20 Geräte mit **Pending**:",
      "- Haben das Profil noch **nicht verarbeitet**.",
      "- Mögliche Gründe:",
      "  - Gerät aus, offline, nicht mit Internet verbunden.",
      "  - Längere Synchronisationsintervalle.",
      "",
      "### ❌ Warum die anderen Antworten falsch sind?",
      "- **A – Heruntergeladen, Anwendung noch nicht fertig:**",
      "  - Das wäre eher **In Progress**.",
      "",
      "- **C – Fehlgeschlagen:**",
      "  - Das ist **Error**.",
      "",
      "- **D – Wartet auf Benutzeraktion:**",
      "  - Könnte in speziellen Szenarien zutreffen, aber nicht generisch für Pending.",
      "",
      "📌 **Merksatz:**",
      "**„Pending“ heißt im Grunde: Noch nicht beim Gerät angekommen.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
    ],
  },

  {
    id: "Q99",
    number: 100,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 125 – Intune Antivirus Policy – Microsoft Defender for Endpoint vs. Endpoint Security Antivirus",
      "",
      "## Szenario",
      "Du möchtest auf Windows 11-Geräten **Microsoft Defender Antivirus** konfigurieren.",
      "",
      "Ziele:",
      "- Echtzeitschutz aktivieren",
      "- Cloud Protection aktivieren",
      "- Scanzeitpläne festlegen",
      "",
      "Du siehst im Intune Portal:",
      "",
      "- **Endpoint security → Antivirus**",
      "- **Endpoint security → Microsoft Defender for Endpoint**",
      "",
      "## Frage",
      "Welche Policy-Art ist die richtige, um **klassische AV-Einstellungen** (z. B. Echtzeitschutz, Cloud-Schutz, Scan) zu konfigurieren?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Endpoint security → Microsoft Defender for Endpoint Policy",
      },
      { key: "B", text: "Endpoint security → Antivirus Policy" },
      { key: "C", text: "Device configuration → Custom OMA-URI Profile" },
      { key: "D", text: "Compliance Policy mit Antivirus-Einstellung" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Endpoint security → Antivirus Policy**",
      "",
      "### 🔍 Unterschied: MDE-Policy vs. Antivirus-Policy",
      "- **Endpoint security → Antivirus**:",
      "  - Steuert die **klassischen Defender AV-Settings**:",
      "    - Echtzeitschutz",
      "    - Cloud-delivered protection",
      "    - Scanzeitpläne",
      "    - Exclusions (Pfade, Prozesse, Dateitypen)",
      "",
      "- **Endpoint security → Microsoft Defender for Endpoint**:",
      "  - Steuert die **Integration mit MDE**:",
      "    - Onboarding/Offboarding von Geräten",
      "    - EDR in block mode",
      "    - Integration für Attack Surface Reduction etc.",
      "",
      "### Anwendung im Szenario",
      "Du willst explizit:",
      "- Echtzeitschutz",
      "- Cloud Protection",
      "- Scanjobs",
      "",
      "Das sind **klassische AV-Settings**, daher musst du:",
      "> **Endpoint security → Antivirus Policy** nutzen.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – MDE Policy**:",
      "  - Dient hauptsächlich für Onboarding + EDR-Einstellungen,",
      "    nicht für Grundkonfiguration des AV.",
      "",
      "- **C – Custom OMA-URI**:",
      "  - Möglich, aber unnötig komplex, Intune hat native Templates.",
      "",
      "- **D – Compliance Policy**:",
      "  - Bewertet nur, ob Schutz aktiv ist, setzt aber keine Konfiguration.",
      "",
      "📌 **Merksatz:**",
      "**AV-Konfig → Endpoint security / Antivirus.** MDE-Integration → Endpoint security / Microsoft Defender for Endpoint.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security",
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-antivirus-policy",
    ],
  },

  {
    id: "Q100",
    number: 101,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 126 – Intune Enrollment Methods for Corporate-Owned Android Devices",
      "",
      "## Szenario",
      "Dein Unternehmen möchte **firmeneigene Android-Smartphones** bereitstellen:",
      "",
      "- Geräte werden von der IT ausgegeben.",
      "- Nutzer dürfen private Apps installieren, aber Unternehmensdaten sollen getrennt sein.",
      "- Du möchtest **Android Enterprise** verwenden.",
      "",
      "## Frage",
      "Welche Enrollment-Methode passt am besten zu diesem Szenario?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Android Enterprise – Work Profile (BYOD)" },
      { key: "B", text: "Android Enterprise – Fully managed" },
      {
        key: "C",
        text: "Android Enterprise – Corporate-owned work profile (COPE)",
      },
      { key: "D", text: "Device Administrator-Modus" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Android Enterprise – Corporate-owned work profile (COPE)**",
      "",
      "### 🔍 Überblick Android Enterprise-Modi",
      "- **Work Profile (BYOD)**:",
      "  - Für **persönliche Geräte**.",
      "  - Nur der Arbeitsbereich wird verwaltet.",
      "  - Gerät bleibt im Besitz des Users.",
      "",
      "- **Fully managed**:",
      "  - Für **firmeneigene Geräte**.",
      "  - Komplettes Gerät wird verwaltet.",
      "  - Privatnutzung stark eingeschränkt oder unerwünscht.",
      "",
      "- **Corporate-owned Work Profile (COPE)**:",
      "  - Für **firmeneigene Geräte** mit **getrenntem Arbeits- UND Privatbereich**.",
      "  - Ideal, wenn:",
      "    - Firma Eigentümer des Geräts ist,",
      "    - User das Gerät aber auch privat nutzen darf.",
      "",
      "- **Device Administrator**:",
      "  - „Legacy“-Modus, wird von Google schrittweise abgelöst.",
      "",
      "### Anwendung im Szenario",
      "Du hast:",
      "- **Firmengeräte**",
      "- Erlaubte **private Nutzung**",
      "- Wunsch nach strikter Trennung der Daten.",
      "",
      "Das ist genau der Anwendungsfall für:",
      "> **Corporate-owned work profile (COPE)**",
      "",
      "### ❌ Warum sind die anderen Optionen falsch?",
      "- **A – BYOD Work Profile**:",
      "  - Geräte wären formell im Besitz des Users, nicht der Firma.",
      "",
      "- **B – Fully managed**:",
      "  - Zu restriktiv für private Nutzung.",
      "",
      "- **D – Device Administrator**:",
      "  - Veraltete Methode, nicht zukunftssicher.",
      "",
      "📌 **Merksatz:**",
      "**Firmengerät + private Nutzung erlaubt + saubere Trennung → COPE.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-work-profile-enroll",
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
    ],
  },

  {
    id: "Q101",
    number: 102,
    area: "Manage applications (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 127 – MSIX vs. Win32 Apps in Intune",
      "",
      "## Szenario",
      "Dein Unternehmen modernisiert die Paketierung für Windows-Anwendungen und",
      "möchte zukünftig nach Möglichkeit **MSIX** statt klassischer Setup.exe-Installer verwenden.",
      "",
      "Du möchtest eine Anwendung im **MSIX-Format** über Intune verteilen.",
      "",
      "## Frage",
      "Welchen App-Typ wählst du in Intune für eine MSIX-Datei?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Line-of-business app → Windows app (Win32)" },
      {
        key: "B",
        text: "Line-of-business app → Line-of-business app (Windows) mit MSIX",
      },
      { key: "C", text: "Microsoft Store app (new)" },
      { key: "D", text: "Web link" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Line-of-business app → Line-of-business app (Windows) mit MSIX**",
      "",
      "### 🔍 Intune-App-Typen für MSIX",
      "In Intune gibt es den App-Typ:",
      "",
      "- **Line-of-business app (Windows)**",
      "  - Unterstützt Formate wie **.MSI**, **.MSIX**, **.APPX**.",
      "",
      "Für **MSIX**-Pakete wählst du also:",
      "- Plattform: Windows",
      "- App-Typ: Line-of-business",
      "- Pakettyp: MSIX",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Windows app (Win32)**:",
      "  - Ist für .intunewin-kapselte Installationen (EXE/MSI), nicht für MSIX.",
      "",
      "- **C – Store app (new)**:",
      "  - Bezieht sich auf Store-Apps, nicht auf eigene MSIX-LOB-Pakete.",
      "",
      "- **D – Web link:**",
      "  - Nur ein Link, keine Installation.",
      "",
      "📌 **Merksatz:**",
      "**MSIX = modern verpackte LOB-App → Line-of-business (Windows) in Intune.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/apps-win32-app-management",
    ],
  },

  {
    id: "Q102",
    number: 103,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 128 – Windows Update for Business – Feature vs. Quality Updates",
      "",
      "## Szenario",
      "Du planst, Windows Updates über Intune mit **Update Rings** und **Feature Update Policies** zu steuern.",
      "",
      "Anforderungen:",
      "",
      "- **Sicherheitsupdates (Quality Updates)** sollen zeitnah installiert werden.",
      "- **Funktionsupdates (Feature Updates / Versionen)** sollen nur nach Freigabe installiert werden.",
      "",
      "## Frage",
      "Welche Kombination von Intune-Policies erfüllt diese Anforderungen am besten?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Nur Update Rings konfigurieren" },
      { key: "B", text: "Nur Feature Update Policies verwenden" },
      {
        key: "C",
        text: "Update Rings für Quality Updates + Feature Update Policy für Zielversion",
      },
      {
        key: "D",
        text: "Compliance Policy für Updates + Device configuration Profile für Reboot",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**C) Update Rings für Quality Updates + Feature Update Policy für Zielversion**",
      "",
      "### 🔍 Aufgabenteilung",
      "- **Update Rings**:",
      "  - Steuern **Quality Updates (Sicherheits-/Kumulativupdates)**.",
      "  - Du kannst:",
      "    - Installations-Deadlines definieren.",
      "    - Defer-Perioden konfigurieren.",
      "    - Neustartverhalten steuern.",
      "",
      "- **Feature Update Policies**:",
      "  - Erzwingen eine **spezifische Windows-Version** (z. B. 22H2, 23H2).",
      "  - Halten Geräte auf einer definierten Build fest.",
      "",
      "### Anwendung im Szenario",
      "- Sicherheitsupdates sollen **zeitnah** kommen →",
      "  → Steuere das über **Update Rings**.",
      "",
      "- Feature Updates sollen **nur nach Freigabe** installiert werden →",
      "  → Lege mit **Feature Update Policy** fest, auf welche Version aktualisiert werden darf.",
      "",
      "Damit hast du:",
      "- Klar getrennte Kontrolle über **Quality** und **Feature** Updates.",
      "",
      "### ❌ Warum die anderen Antworten falsch sind?",
      "- **A – Nur Update Rings:**",
      "  - Du kannst zwar vieles steuern, aber keine **konkrete Zielversion** pinnen.",
      "",
      "- **B – Nur Feature Updates**:",
      "  - Quality Updates würden dann nicht sinnvoll gesteuert.",
      "",
      "- **D – Compliance + Device Config**:",
      "  - Compliance bewertet nur den Zustand, konfiguriert aber keine Updates.",
      "  - Device config steuert nicht WUfB-Logik wie Ringe & Feature-Ziele.",
      "",
      "📌 **Merksatz:**",
      "**Update Rings → Alltagspatches (Quality). Feature Update Policy → große Versionssprünge (Feature).**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-feature-updates",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-expedite-updates",
    ],
  },

  {
    id: "Q103",
    number: 104,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "# 🧩 129 – Autopilot-Gerätezuordnung zu Benutzern (User Assignment)",
      "",
      "## Szenario",
      "Du hast mehrere Windows 11-Geräte per **Windows Autopilot** registriert.",
      "",
      "Ziel:",
      "- Benutzer sollen beim ersten Start **ihren Namen auf dem OOBE-Bildschirm** sehen.",
      "- Jedes Gerät soll einem **konkreten Benutzer vorab zugeordnet** werden.",
      "",
      "## Frage",
      "Wie kannst du Geräte vorab bestimmten Benutzern zuordnen, damit deren Namen während Autopilot-One-Time-Setup angezeigt werden?",
      "",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Im Intune Geräteobjekt die Primary User Eigenschaft setzen",
      },
      {
        key: "B",
        text: "Im Autopilot-Gerät die Benutzerzuweisung in der Autopilot-Device-Liste konfigurieren",
      },
      {
        key: "C",
        text: "In Azure AD die Eigenschaft „Owner“ des Geräts setzen",
      },
      {
        key: "D",
        text: "In Entra ID eine Conditional Access Policy pro Benutzer erstellen",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**B) Im Autopilot-Gerät die Benutzerzuweisung in der Autopilot-Device-Liste konfigurieren**",
      "",
      "### 🔍 Benutzerzuordnung in Autopilot",
      "In der Autopilot-Device-Liste (z. B. im Entra / Intune-Portal) kannst du:",
      "",
      "- Ein Gerät anhand seiner Seriennummer / Device ID auswählen.",
      "- Ihm einen **Assigned user** zuweisen.",
      "",
      "Dadurch wird:",
      "- Der **Name des Benutzers** im OOBE angezeigt.",
      "- Das Gerät **logisch vorab** dem Benutzer zugeordnet.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **A – Primary User Eigenschaft:**",
      "  - Wird in Intune häufig nachträglich gesetzt (z. B. durch erste Anmeldung),",
      "  - steuert aber nicht die OOBE-Anzeige im Autopilot.",
      "",
      "- **C – Azure AD Owner:**",
      "  - Owner ist eher ein Verwaltungsattribut, kein Autopilot-Feature.",
      "",
      "- **D – Conditional Access:**",
      "  - Hat nichts mit OOBE-Anzeige oder Autopilot-User-Zuweisung zu tun.",
      "",
      "📌 **Merksatz:**",
      "**OOBE-Benutzeranzeigenamen im Autopilot → Zuweisung in der Autopilot Device-Liste.**",
    ].join("\n"),

    references: ["https://learn.microsoft.com/autopilot/windows-autopilot"],
  },

  {
    id: "Q104",
    number: 105,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "# 🧩 130 – Intune Role-Based Access Control (RBAC) – Scope Tags vs. Scope (Groups)",
      "",
      "## Szenario",
      "Du möchtest in Intune die **Administration nach Regionen** trennen:",
      "",
      "- Ein Admin-Team **Europe-Admins** soll nur Geräte in Europa sehen und verwalten.",
      "- Ein Team **US-Admins** soll nur US-Geräte sehen.",
      "",
      "Die Geräte sind bereits in entsprechende **Azure AD-Gruppen** sortiert:",
      "- `Devices-Europe`",
      "- `Devices-US`",
      "",
      "## Frage",
      "Welche zwei Konzepte aus Intune-RBAC nutzt du, um diese Trennung umzusetzen?",
      "",
    ].join("\n"),

    options: [
      { key: "A", text: "Scope (Groups) und Scope tags" },
      { key: "B", text: "Compliance Policies und Update Rings" },
      { key: "C", text: "Filters und Configuration Profiles" },
      { key: "D", text: "Conditional Access und App Protection Policies" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "## ✅ Richtige Antwort",
      "**A) Scope (Groups) und Scope tags**",
      "",
      "### 🔍 Intune RBAC-Bausteine",
      "RBAC in Intune verwendet u. a.:",
      "",
      "- **Roles (Rollen)**: Was darf der Admin tun? (z. B. Lesen, Schreiben, Wipen)",
      "- **Scope (Groups)**: **Welche Objekte** (Geräte/Benutzer) fallen unter seine Zuständigkeit?",
      "- **Scope tags**: Steuern, **welche Konfigurationen/Objekte** ein Admin überhaupt sieht.",
      "",
      "### Anwendung im Szenario",
      "Du willst Regionen trennen:",
      "",
      "1. **Scope (Groups)**:",
      "   - Weise der Rolle für Europe-Admins die Gruppe `Devices-Europe` als Scope zu.",
      "   - Weise der Rolle für US-Admins die Gruppe `Devices-US` als Scope zu.",
      "",
      "2. **Scope tags**:",
      "   - Markiere Konfigurationen (Profiles, Policies) mit Scope-Tag `EU` bzw. `US`.",
      "   - Rollen der Europe-Admins erhalten nur Scope Tag `EU`.",
      "   - Rollen der US-Admins bekommen `US`.",
      "",
      "Ergebnis:",
      "- Europe-Admins sehen nur EU-Geräte & EU-Policies.",
      "- US-Admins sehen nur US-Geräte & US-Policies.",
      "",
      "### ❌ Warum sind die anderen Antworten falsch?",
      "- **B – Compliance + Update Rings**:",
      "  - Das sind **Policies**, keine RBAC-Mechanismen.",
      "",
      "- **C – Filters + Config Profiles**:",
      "  - Filters steuern Zuweisungen, nicht Admin-Berechtigungen.",
      "",
      "- **D – Conditional Access + APP**:",
      "  - Sind Identitäts-/Applikationssicherheitsfunktionen, nicht RBAC in Intune.",
      "",
      "📌 **Merksatz:**",
      "**Intune-RBAC = Rolle (Rechte) + Scope (Groups) (Objekte) + Scope tags (sichtbare Konfiguration).**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
      "https://learn.microsoft.com/mem/intune/fundamentals/scope-tags",
      "https://learn.microsoft.com/mem/intune/fundamentals/role-based-access-control",
    ],
  },

  {
    id: "Q105",
    number: 106,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "You have an Azure AD tenant that contains the following devices:",
      "",
      "| Name    | Operating System | Azure AD Join Type |",
      "|--------|------------------|--------------------|",
      "| Device1 | Windows 11 Pro  | Joined             |",
      "| Device2 | Windows 11 Pro  | Registered         |",
      "| Device3 | Windows 10 Pro  | Joined             |",
      "| Device4 | Windows 10 Pro  | Registered         |",
      "",
      "You purchased Windows 11 Enterprise E5 licenses.",
      "",
      "You need to identify which devices can use Windows Subscription Activation",
      "to automatically upgrade to **Windows 11 Enterprise**.",
      "",
      "Which devices support Windows Subscription Activation for an upgrade to Windows 11 Enterprise?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device1 and Device2 only" },
      { key: "C", text: "Device1 and Device3 only" },
      { key: "D", text: "Device1, Device2, Device3, and Device4" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Windows Subscription Activation (WSA) allows automatic upgrade from Windows Pro to Windows Enterprise",
      "based on a qualifying subscription (for example, Windows Enterprise E3/E5 or Microsoft 365 E3/E5).",
      "",
      "Key requirements:",
      "- Edition: Windows 10/11 Pro or Pro Education.",
      "- Join type: Azure AD joined or Hybrid Azure AD joined (not just registered / workplace joined).",
      "- The user must sign in with an Azure AD account that has a valid Enterprise subscription.",
      "- Supported versions: Windows 10 1709+ or Windows 11 21H2+.",
      "",
      "Device evaluation:",
      "- Device1: Windows 11 Pro, Azure AD joined → **meets all requirements** → can upgrade to Windows 11 Enterprise.",
      "- Device2: Windows 11 Pro, but **Registered** only → workplace joined; Subscription Activation not supported.",
      "- Device3: Windows 10 Pro, Azure AD joined → can upgrade to **Windows 10 Enterprise**, but does not satisfy",
      '  the requirement "upgrade to Windows 11 Enterprise" in this specific question.',
      "- Device4: Windows 10 Pro, Registered → workplace joined; Subscription Activation not supported.",
      "",
      "Therefore, only **Device1** can use Windows Subscription Activation to upgrade to **Windows 11 Enterprise**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q106",
    number: 107,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "A company uses the Microsoft Deployment Toolkit (MDT) at three geographically separated locations.",
      "Each site has its own MDT server and IP address range.",
      "",
      "MDT instances:",
      "| MDT Instance | Site    | Address Space |",
      "|-------------|---------|---------------|",
      "| MDT1        | New York| 10.1.1.0/24   |",
      "| MDT2        | London  | 10.5.5.0/24   |",
      "| MDT3        | Dallas  | 10.4.4.0/24   |",
      "",
      "The environment uses DFS replication to keep a central Deployment Share (\\\\*\\Production$) in sync.",
      "The Bootstrap.ini file is configured as follows:",
      "",
      "[Settings]",
      "Priority=DefaultGateway, Default",
      "",
      "[DefaultGateway]",
      "10.1.1.1=NewYork",
      "10.5.5.1=London",
      "",
      "[NewYork]",
      "DeployRoot=\\\\MDT1\\Production$",
      "KeyboardLocale=en-us",
      "",
      "[London]",
      "DeployRoot=\\\\MDT2\\Production$",
      "KeyboardLocale=en-gb",
      "",
      "[Default]",
      "DeployRoot=\\\\MDT3\\Production$",
      "KeyboardLocale=en-us",
      "",
      "You plan to deploy the following clients:",
      "",
      "| Name | IP Address    |",
      "|------|--------------|",
      "| LT1  | 10.1.1.240   |",
      "| DT1  | 10.5.5.115   |",
      "| TB1  | 10.2.2.193   |",
      "",
      "For each device, you need to determine from which MDT server the image is downloaded",
      "and which keyboard locale is used.",
      "",
      "Which of the following statements are correct? (Each correct answer presents a complete statement.)",
    ].join("\n"),

    options: [
      { key: "A", text: "TB1 will download the image from MDT3." },
      { key: "B", text: "DT1 will have a keyboard locale of en-gb." },
      { key: "C", text: "LT1 will download the image from MDT1." },
    ],

    correctAnswers: ["A", "B", "C"],

    explanation: [
      "MDT evaluates the [DefaultGateway] section first based on the client IP/gateway mapping.",
      "If no mapping is found, MDT falls back to the [Default] section.",
      "",
      "Resolution by subnet:",
      "- Addresses in 10.1.1.x match the NewYork mapping (10.1.1.1 → [NewYork]).",
      "- Addresses in 10.5.5.x match the London mapping (10.5.5.1 → [London]).",
      "- Any address not matching these gateways uses [Default].",
      "",
      "Client analysis:",
      "- **LT1 (10.1.1.240)** → subnet 10.1.1.x → section [NewYork] →",
      "  DeployRoot=\\\\MDT1\\Production$, KeyboardLocale=en-us → downloads from **MDT1**.",
      "- **DT1 (10.5.5.115)** → subnet 10.5.5.x → section [London] →",
      "  DeployRoot=\\\\MDT2\\Production$, KeyboardLocale=en-gb → keyboard locale **en-gb** and server **MDT2**.",
      "- **TB1 (10.2.2.193)** → subnet 10.2.2.x → no specific gateway mapping → [Default] →",
      "  DeployRoot=\\\\MDT3\\Production$, KeyboardLocale=en-us → downloads from **MDT3**.",
      "",
      "Therefore all three statements are correct:" +
        " TB1 uses MDT3, DT1 uses en-gb, and LT1 uses MDT1.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q107",
    number: 108,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "You manage an Azure AD tenant named contoso.com that contains the following devices and groups.",
      "",
      "Devices:",
      "| Device  | Registered with Autopilot | Group membership |",
      "|---------|---------------------------|------------------|",
      "| Device1 | No                        | Group1           |",
      "| Device2 | No                        | Group2           |",
      "| Device3 | Yes                       | Group1           |",
      "",
      "Azure AD groups:",
      "| Group  | Type     | Members           |",
      "|--------|----------|-------------------|",
      "| Group1 | Assigned | Device1, Device3  |",
      "| Group2 | Assigned | Device2           |",
      "",
      "You create a Windows Autopilot deployment profile that targets:",
      "- All devices that are members of Group1,",
      "- But are not members of Group2.",
      "",
      "For each device, you must decide whether it will be automatically deployed by Windows Autopilot",
      "when the device is reset.",
      "",
      "Which devices will be deployed by Autopilot on reset?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device3 only" },
      { key: "B", text: "Device1 only" },
      { key: "C", text: "Device1 and Device3 only" },
      { key: "D", text: "Device1, Device2, and Device3" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "For a device to be deployed via Windows Autopilot, two conditions must be met:",
      "1. The device must be **registered** in the Windows Autopilot service (hardware hash imported).",
      "2. The device must be in the Azure AD group that is assigned to the deployment profile.",
      "",
      "Device evaluation:",
      "- **Device1**: Member of Group1, but **not registered** with Autopilot → will NOT start Autopilot.",
      "- **Device2**: Member of Group2, not Group1, not registered → excluded by group logic and not registered.",
      "- **Device3**: Member of Group1 **and** registered with Autopilot → meets all requirements.",
      "",
      "Therefore, only **Device3** is automatically deployed using Windows Autopilot after a reset.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q108",
    number: 109,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "User1 wants to connect to a Windows 11 computer named Computer1 by using Remote Desktop (RDP).",
      "You need to ensure that the user is authenticated **before** a full Remote Desktop session is established,",
      "so that authentication happens at the network layer.",
      "",
      "What should you configure on Computer1?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Enable Network Level Authentication (NLA) for Remote Desktop.",
      },
      {
        key: "B",
        text: "Configure and start the Remote Desktop Configuration service.",
      },
      {
        key: "C",
        text: "Turn on reputation-based protection in Microsoft Defender.",
      },
      { key: "D", text: "Turn on Network Discovery." },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Network Level Authentication (NLA) is a security feature that requires users to be authenticated",
      "before a full Remote Desktop session is created.",
      "",
      "Without NLA:",
      "- The RDP server establishes a session before authentication, increasing attack surface and resource usage.",
      "",
      "With NLA:",
      "- The client authenticates using CredSSP at the network layer.",
      "- Only after successful authentication is a full RDP graphical session created.",
      "",
      "Other options:",
      "- The Remote Desktop Configuration service does not control network-level authentication.",
      "- Reputation-based protection is related to SmartScreen and app reputation, not RDP.",
      "- Network Discovery affects device discovery on the LAN, not RDP authentication.",
      "",
      "Therefore, you must **enable Network Level Authentication (NLA)** on Computer1.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/enrollment/"],
  },

  {
    id: "Q109",
    number: 110,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage Windows devices by using Microsoft Intune (Microsoft 365 subscription).",
      "You have 100 corporate-owned devices that were used by former employees.",
      "You need to prepare the devices for new users with the following requirements:",
      "",
      "- Remove all user data and user-installed apps.",
      "- Minimize administrative effort.",
      "- Keep the devices enrolled in Azure AD and Intune, so they remain managed.",
      "",
      "Which action should you perform on the devices?",
    ].join("\n"),

    options: [
      { key: "A", text: "Perform a Wipe (Factory reset) from Intune." },
      { key: "B", text: "Perform a Fresh Start on each device." },
      {
        key: "C",
        text: "Perform a local Reset this PC operation on each device.",
      },
      { key: "D", text: "Perform a Windows Autopilot Reset on the devices." },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Windows Autopilot Reset returns a device to a known, IT-approved state while:",
      "- Removing user data, user profiles, and user-installed apps.",
      "- Retaining Azure AD join and Intune enrollment.",
      "- Reapplying Intune apps and policies automatically.",
      "",
      "Comparison with other options:",
      "- **Wipe (Factory reset)** removes everything, including Azure AD join and Intune enrollment.",
      "  The device must then be re-registered and re-enrolled → more administrative effort.",
      "- **Fresh Start** removes OEM bloatware and some apps, but is not specifically designed to",
      "  repurpose corporate devices for new users at scale.",
      "- **Local Reset this PC** can be used, but offers less central control and may break the managed state",
      "  if not executed via Autopilot/Intune workflows.",
      "",
      "Autopilot Reset can be executed remotely from Intune and is designed for rehiring/reusing scenarios.",
      "Therefore, the correct action is to **perform a Windows Autopilot Reset on the devices**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
    ],
  },

  {
    id: "Q110",
    number: 111,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Your network contains an Active Directory domain named adatum.com.",
      "The domain contains two computers:",
      "- Computer1 (Windows 10)",
      "- Computer2 (Windows 10 with Remote Desktop enabled)",
      "",
      "The following domain user accounts exist:",
      "",
      "| User  | Group memberships                |",
      "|-------|---|",
      "| User1 | Administrators                   |",
      "| User2 | Group1, Group2                   |",
      "| User3 | Group1, Group3, Administrators   |",
      "",
      "On Computer2, the following local security settings are configured:",
      "",
      "- **Allow log on through Remote Desktop Services**: Administrators, Remote Desktop Users",
      "- **Deny log on through Remote Desktop Services**: Group2",
      "",
      "You need to determine which users can sign in to Computer2 by using Remote Desktop.",
      "",
      "Which users can sign in via Remote Desktop to Computer2? (Each correct answer presents a complete solution.)",
    ].join("\n"),

    options: [
      { key: "A", text: "User1" },
      { key: "B", text: "User2" },
      { key: "C", text: "User3" },
    ],

    correctAnswers: ["A", "C"],

    explanation: [
      "To sign in via Remote Desktop, a user must:",
      "- Be granted the right **Allow log on through Remote Desktop Services** (directly or via a group),",
      "- And must NOT be subject to a **Deny log on through Remote Desktop Services** entry.",
      "",
      "Important: Deny entries override Allow entries.",
      "",
      "Evaluation:",
      "- **User1** is a member of the Administrators group.",
      "  Administrators are in the Allow list and are not denied → **User1 can sign in via RDP**.",
      "",
      "- **User2** is a member of Group1 and Group2.",
      "  Group2 is explicitly listed in **Deny log on through Remote Desktop Services**.",
      "  The Deny right overrides any implicit allows → **User2 cannot sign in via RDP**.",
      "",
      "- **User3** is a member of Group1, Group3, and Administrators.",
      "  Administrators are allowed, and no Deny applies → **User3 can sign in via RDP**.",
      "",
      "Therefore, only **User1** and **User3** can connect to Computer2 by using Remote Desktop.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/enrollment/"],
  },

  {
    id: "Q111",
    number: 112,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You create a Windows Autopilot deployment profile.",
      "The profile must meet the following requirements:",
      "",
      "- New devices must be automatically registered and deployed **without requiring user credentials**.",
      "- The computer name must automatically include the hardware serial number (for example, PC-<SerialNumber>).",
      "",
      "You configure the Out-of-box experience (OOBE) settings in the deployment profile.",
      "",
      "Which two settings should you configure to meet the requirements?",
      "(Each correct answer presents part of the solution.)",
    ].join("\n"),

    options: [
      { key: "A", text: "Set Deployment mode to Self-deploying (preview)." },
      { key: "B", text: "Disable the Enrollment Status Page (ESP)." },
      { key: "C", text: "Set the user account type to Administrator." },
      { key: "D", text: "Configure Language and Region settings." },
      { key: "E", text: "Join devices to Hybrid Azure AD." },
      {
        key: "F",
        text: "Enable Apply device name template and use PC-%SERIAL%.",
      },
    ],

    correctAnswers: ["A", "F"],

    explanation: [
      "Requirements:",
      "- No user credentials during provisioning → requires a **Self-deploying** deployment mode.",
      "- Computer name must contain the hardware serial number → requires a **device name template** using %SERIAL%.",
      "",
      "Correct settings:",
      "- **Deployment mode: Self-deploying (preview)**",
      "  → Enables zero-touch provisioning without user sign-in, typically used for kiosk, shared, or POS devices.",
      "",
      "- **Apply device name template: PC-%SERIAL%**",
      "  → The %SERIAL% macro is replaced with the hardware serial number at deployment time.",
      "",
      "Other options:",
      "- ESP, language, user type, and join type do not address the explicit requirements of",
      "  no user credentials and serial-number based naming.",
      "",
      "Therefore, you must configure **Self-deploying deployment mode** and **Apply device name template with PC-%SERIAL%**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q112",
    number: 113,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft 365 subscription and plan to deploy 25 Windows 11 devices using Windows Autopilot.",
      "You need to configure the **Out-of-Box Experience (OOBE)** behavior for these devices",
      "so that the first-run experience is tailored to your organization.",
      "",
      "Which type of object should you create and assign in the Microsoft Intune admin center" +
        " to configure the OOBE settings for the Autopilot devices?",
    ].join("\n"),

    options: [
      { key: "A", text: "A compliance policy" },
      { key: "B", text: "A PowerShell script" },
      { key: "C", text: "An Enrollment Status Page (ESP)" },
      { key: "D", text: "A Windows Autopilot deployment profile" },
      { key: "E", text: "A configuration profile" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Windows Autopilot **deployment profiles** define how devices behave during the Out-of-Box Experience (OOBE).",
      "A deployment profile controls settings such as:",
      "- User-driven vs. Self-deploying mode,",
      "- Azure AD join type,",
      "- User account type (Administrator or Standard),",
      "- Skipping of privacy and EULA screens,",
      "- Device naming and language (in some scenarios).",
      "",
      "Other object types:",
      "- **Compliance policy**: evaluates device compliance, does not control OOBE.",
      "- **PowerShell script**: used for automation post-enrollment, not OOBE flow.",
      "- **Enrollment Status Page (ESP)**: shows progress while apps and policies are being applied,",
      "  but does not replace the deployment profile.",
      "- **Configuration profile**: configures device settings after enrollment.",
      "",
      "Therefore, you must create and assign a **Windows Autopilot deployment profile**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q113",
    number: 114,
    area: "Manage applications (15–20%)",
    difficulty: "easy",

    question: [
      "You manage a Microsoft 365 environment with Microsoft Intune.",
      "You plan to deploy apps to **Android Enterprise** devices (for example, Work Profile, Fully Managed).",
      "",
      "You need to prepare the environment so that you can deploy apps to Android Enterprise devices.",
      "",
      "What should you do **first**?",
    ].join("\n"),

    options: [
      { key: "A", text: "Create an Android configuration profile in Intune." },
      { key: "B", text: "Link your Managed Google Play account to Intune." },
      { key: "C", text: "Create an app protection policy for Android." },
      { key: "D", text: "Enable Android device administrator enrollment." },
      {
        key: "E",
        text: "Upload APK files directly to Intune as Android store apps.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "For Android Enterprise management, Intune must be connected to **Managed Google Play**.",
      "",
      "Linking Managed Google Play to Intune allows you to:",
      "- Browse and approve apps in Managed Google Play.",
      "- Sync approved apps into Intune as **Managed Google Play store apps**.",
      "- Deploy these apps to Android Enterprise devices.",
      "",
      "Without this link, Intune cannot manage Android Enterprise apps.",
      "",
      "Other options:",
      "- Creating configuration or app protection policies comes **after** the platform integration.",
      "- Device administrator mode is legacy and does not apply to Android Enterprise.",
      "- Uploading APKs directly as generic Android store apps is not the standard path for Android Enterprise.",
      "",
      "Therefore, the first step is to **link your Managed Google Play account to Intune**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/intune/enrollment/android-work-profile-enroll",
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
    ],
  },

  {
    id: "Q114",
    number: 115,
    area: "Manage applications (15–20%)",
    difficulty: "medium",

    question: [
      "You manage 1,000 Android Enterprise devices that are enrolled in Microsoft Intune.",
      "You create an **App configuration policy** with the following parameters:",
      "",
      "- Device enrollment type: Managed devices",
      "- Profile type: All profile types",
      "- Platform: Android Enterprise",
      "",
      "You need to determine which types of apps can be targeted by this app configuration policy.",
      "",
      "Which two app types can you associate with this configuration policy?",
      "(Each correct answer presents a complete solution.)",
    ].join("\n"),

    options: [
      { key: "A", text: "Web link" },
      { key: "B", text: "Built-in Android app" },
      { key: "C", text: "Android Enterprise system app" },
      { key: "D", text: "Managed Google Play store app" },
      {
        key: "E",
        text: "Android store app (public Play Store app not managed)",
      },
    ],

    correctAnswers: ["C", "D"],

    explanation: [
      "Android Enterprise **app configuration policies** in Intune can be applied only to Android apps",
      "that are managed in the Android Enterprise context:",
      "",
      "- **Managed Google Play store apps**: standard Google Play apps that are approved and managed",
      "  via Managed Google Play and synchronized into Intune.",
      "- **Android Enterprise system apps**: system applications exposed through the Android Enterprise channel.",
      "",
      "Unsupported in this scenario:",
      "- **Web links**: these are simple shortcuts/links and do not support application configuration.",
      "- **Built-in Android apps** (not exposed as system apps via Android Enterprise) are not directly targetable.",
      "- **Generic Android store apps** outside Managed Google Play are not used in Android Enterprise mode.",
      "",
      "Therefore, the policy can be associated with **Android Enterprise system apps** and",
      "**Managed Google Play store apps**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/app-configuration-policies-overview",
      "https://learn.microsoft.com/mem/intune/enrollment/android-work-profile-enroll",
    ],
  },

  {
    id: "Q115",
    number: 116,
    area: "Manage applications (15–20%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Intune.",
      "You manage Microsoft 365 Apps settings for users by using the **Cloud Policy service**.",
      "",
      "You have the following users and groups:",
      "",
      "| User  | Group membership         |",
      "|-------|--------------------------|",
      "| User1 | Group1                   |",
      "| User2 | Group2 (member of Group1)|",
      "| User3 | Group3 (member of Group1)|",
      "",
      "You create the following policies for Microsoft Excel default file format:",
      "",
      "| Policy  | Assigned to | Default format | Priority |",
      "|---------|-------------|----------------|----------|",
      "| Policy1 | Group1      | .ods           | 0        |",
      "| Policy2 | Group2      | .xlsb          | 1        |",
      "| Policy3 | Group3      | .xlsx          | 2        |",
      "",
      "Policies with lower numeric priority values override those with higher numeric priority values.",
      "",
      "You need to determine which default file format is applied when each user saves a new Excel workbook.",
      "",
      "What default file format is applied for each user?",
    ].join("\n"),

    options: [
      { key: "A", text: "User1: .ods   | User2: .xlsb | User3: .xlsx" },
      { key: "B", text: "User1: .ods   | User2: .xlsb | User3: .ods" },
      { key: "C", text: "User1: .ods   | User2: .ods  | User3: .xlsx" },
      { key: "D", text: "User1: .ods   | User2: .ods  | User3: .ods" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "The Cloud Policy service for Microsoft 365 evaluates all applicable policies and applies the policy",
      "with the **highest priority**, where 0 is the highest priority value.",
      "",
      "All three users are directly or indirectly members of **Group1**, which has **Policy1** assigned",
      "with default format **.ods** and priority **0**.",
      "",
      "User evaluation:",
      "- **User1**: Member of Group1 → Policy1 (.ods, priority 0) applies.",
      "- **User2**: Member of Group2 and Group1.",
      "  - Policy2 (.xlsb) has priority 1.",
      "  - Policy1 (.ods) has priority 0 → Policy1 overrides Policy2 → .ods.",
      "- **User3**: Member of Group3 and Group1.",
      "  - Policy3 (.xlsx) has priority 2.",
      "  - Policy1 (.ods) has priority 0 → Policy1 overrides Policy3 → .ods.",
      "",
      "As a result, **all three users** get `.ods` as the default file format in Excel.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/apps-add-office365",
    ],
  },

  {
    id: "Q116",
    number: 117,
    area: "Protect devices (25–30%)",
    difficulty: "medium",

    question: [
      "Contoso, Ltd. manages devices by using Microsoft Intune and Configuration Manager (co-management).",
      "All computers are members of the on-premises Active Directory domain contoso.com,",
      "which is synchronized to Azure AD.",
      "",
      "Intune is configured with multiple **device compliance policies**.",
      "",
      "You need to determine to which devices **Policy1** and **Policy2** are applied",
      "based on their platform and group assignments.",
      "",
      "Which devices are targeted by Policy1 and Policy2?",
    ].join("\n"),

    options: [
      { key: "A", text: "Policy1: Device1 only   | Policy2: Device2 only" },
      { key: "B", text: "Policy1: Device3 only   | Policy2: Device4 only" },
      {
        key: "C",
        text: "Policy1: Device1 and Device3 | Policy2: Device2 and Device4",
      },
      {
        key: "D",
        text: "Policy1: Device2 and Device3 | Policy2: Device1 and Device4",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "In Intune, each compliance policy is assigned to Azure AD groups and may include/exclude devices",
      "based on platform and group membership.",
      "",
      "From the scenario (summarized):",
      "- **Policy1** is an Android compliance policy assigned to **Group3**.",
      "- **Policy2** is an iOS compliance policy assigned to **Group2**, with Group3 excluded.",
      "",
      "Device roles:",
      "- **Device3**: Android device and member of Group3 → targeted by Policy1.",
      "- **Device4**: iOS device and member of Group2 but not Group3 → targeted by Policy2.",
      "",
      "Therefore, **Policy1 applies to Device3 only**, and **Policy2 applies to Device4 only**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/configmgr/comanage/overview",
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q117",
    number: 118,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Contoso, Ltd. manages computers with Configuration Manager and mobile devices with Microsoft Intune.",
      "The environment is synchronized with Azure Active Directory.",
      "",
      "You have the following users:",
      "",
      "| User  | Role / Group                          | Special setting                       |",
      "|-------|---|---|",
      "| User1 | Member of GroupA, Intune Administrator| Not a Device Enrollment Manager (DEM)|",
      "| User2 | Standard user                         | Configured as a Device Enrollment Manager (DEM) in Intune |",
      "",
      "The default device enrollment limit per user is **10 devices**.",
      "",
      "You need to determine the **maximum number of devices** that each user can enroll in Intune.",
      "",
      "What is the maximum number of devices that User1 and User2 can enroll?",
    ].join("\n"),

    options: [
      { key: "A", text: "User1: 10   | User2: 10" },
      { key: "B", text: "User1: 50   | User2: 500" },
      { key: "C", text: "User1: 10   | User2: 1,000" },
      { key: "D", text: "User1: 1,000| User2: 1,000" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "By default, Intune enforces a **device limit per user**, for example 10 devices.",
      "This limit applies to regular users and administrators alike.",
      "",
      "However, a **Device Enrollment Manager (DEM)** is a special user account that can enroll",
      "a much larger number of devices on behalf of other users.",
      "A DEM account can enroll **up to 1,000 devices**.",
      "",
      "Evaluation:",
      "- **User1**: Intune administrator, but not configured as a DEM → limited by the standard device limit: **10 devices**.",
      "- **User2**: Configured as Device Enrollment Manager → can enroll **up to 1,000 devices**.",
      "",
      "Therefore, the maximum is **User1: 10 devices** and **User2: 1,000 devices**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/create-device-limit-restrictions",
    ],
  },

  {
    id: "Q118",
    number: 119,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Contoso, Ltd. manages devices with Microsoft Intune and Configuration Manager (co-management).",
      "All computers are domain-joined to contoso.com, which is synchronized to Azure AD.",
      "Mobile devices are managed only by Intune.",
      "",
      "You have several Intune **device compliance policies** for Android and iOS.",
      "You need to determine which devices are **compliant** based on their platform, policy assignments,",
      "and whether they meet the policy requirements (for example, encryption).",
      "",
      "Which devices are compliant?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1: Yes   | Device3: No   | Device4: No" },
      { key: "B", text: "Device1: Yes   | Device3: Yes  | Device4: No" },
      { key: "C", text: "Device1: No    | Device3: No   | Device4: Yes" },
      { key: "D", text: "Device1: No    | Device3: Yes  | Device4: Yes" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "From the scenario (summarized):",
      "- **Device1** (Android, Group1) is targeted by **Policy3**, which requires device encryption.",
      "  Device1 is **not encrypted** → **non-compliant**.",
      "",
      "- **Device3** (Android, Group2 and Group3) is targeted by **Policy1**, which has no strict requirements",
      "  (no encryption requirement) → **compliant**.",
      "",
      "- **Device4** (iOS, Group2) is targeted by **Policy2**, which has no additional requirements",
      "  → **compliant**.",
      "",
      "Therefore, compliance status is:",
      "- Device1: No",
      "- Device3: Yes",
      "- Device4: Yes",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/configmgr/comanage/overview",
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q119",
    number: 120,
    area: "Protect devices (25–30%)",
    difficulty: "easy",

    question: [
      "Contoso Ltd. manages all corporate iPhones and iPads with Microsoft Intune.",
      "For privacy reasons, you must prevent iOS and iPadOS devices from sending diagnostic and usage data",
      "to Apple.",
      "",
      "You need to configure Intune to block the upload of diagnostics and usage data from iOS devices.",
      "",
      "Which Intune configuration should you use?",
    ].join("\n"),

    options: [
      { key: "A", text: "An App protection policy" },
      { key: "B", text: "A device enrollment profile" },
      {
        key: "C",
        text: "A device configuration profile with Device restrictions",
      },
      { key: "D", text: "A device compliance policy" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "To control system-level behavior on iOS/iPadOS devices (including privacy and diagnostics),",
      "you must use an Intune **device configuration profile** with the **Device restrictions** template.",
      "",
      "In this profile, you can configure settings such as:",
      "- Share usage and diagnostic data → set to **Block**.",
      "- Control Siri, AirDrop, App Store behavior, and other system features.",
      "",
      "Other options:",
      "- **App protection policies** apply to app data (MAM), not to OS-level telemetry.",
      "- **Device enrollment profiles** control the enrollment process, not ongoing privacy settings.",
      "- **Compliance policies** evaluate the device state but do not themselves block diagnostics; they are used",
      "  for access decisions (Conditional Access).",
      "",
      "Therefore, you must create a **device configuration profile (Device restrictions)** and block",
      "sharing of usage and diagnostic data.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },

  {
    id: "Q120",
    number: 121,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Contoso, Ltd. uses a hybrid Azure AD tenant (contoso.com) with on-premises Windows Server 2016,",
      "Windows 10 Enterprise clients, Configuration Manager (SCCM), and Microsoft Intune.",
      "",
      "You plan to deploy new Windows 10 Pro devices for the Phoenix office by using Windows Autopilot and",
      "co-management with Intune.",
      "",
      "You must prepare the Phoenix office devices for Windows Autopilot deployment.",
      "The solution must support:",
      "- Zero-touch Autopilot deployment for the new devices.",
      "- Subsequent assignment of an Autopilot deployment profile from the Intune admin center.",
      "",
      "What is the FIRST step you should perform for the Phoenix office computers?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Extract the hardware ID (hardware hash) of each computer to a CSV file and upload the CSV file in the Intune admin center.",
      },
      {
        key: "B",
        text: "Run Sysprep /generalize on a reference computer and capture an image for SCCM OSD.",
      },
      {
        key: "C",
        text: "Record the serial number of each computer and create a device record manually in Azure AD.",
      },
      {
        key: "D",
        text: "Create a provisioning package (PPKG) and copy it to a USB drive for each Phoenix office computer.",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Windows Autopilot requires that each device be **registered** in the Autopilot service.",
      "For manually registered devices, you must collect the **hardware hash** and import it into Intune.",
      "",
      "Correct first step:",
      "- Run the Get-WindowsAutopilotInfo script on each device to export the hardware ID into a CSV file.",
      "- Upload the CSV in the Intune admin center under Devices > Windows > Windows enrollment > Devices > Import.",
      "",
      "Only after the devices are registered can you assign Windows Autopilot deployment profiles",
      "and use them for the Phoenix office deployment.",
      "",
      "Other options:",
      "- Sysprep /generalize is used for traditional image-based deployment, not required for Autopilot OEM devices.",
      "- Serial numbers alone are not sufficient; Autopilot registration requires the hardware hash.",
      "- A provisioning package can configure settings, but it does not register devices in the Autopilot service.",
      "",
      "Therefore, the first step is to **extract the hardware ID to a CSV file and upload it in Intune**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/configmgr/comanage/overview",
    ],
  },

  {
    id: "Q121",
    number: 122,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "easy",

    question: [
      "You manage Windows devices by using Microsoft Intune.",
      "",
      "You have a Windows 10 update ring policy named UpdateRing1 with the following settings:",
      "- Automatic update behavior: Auto install and restart at a scheduled time",
      "- Automatic behavior frequency: First week of the month",
      "- Scheduled install day: Tuesday",
      "- Scheduled install time: 3:00 AM",
      "",
      "From the Intune admin center, you edit UpdateRing1 and select **Uninstall** for the deployed Feature Updates.",
      "",
      "You need to know when the devices will start to uninstall the Feature Updates.",
      "",
      "When will the devices begin the uninstall?",
    ].join("\n"),

    options: [
      { key: "A", text: "As soon as the policy is received by the devices." },
      { key: "B", text: "On the next scheduled Tuesday at 3:00 AM." },
      {
        key: "C",
        text: "After a user approves the uninstall operation on each device.",
      },
      { key: "D", text: "On the first Tuesday of the next month at 3:00 AM." },
    ],

    correctAnswers: ["A"],

    explanation: [
      "The schedule defined in a Windows 10 update ring applies to **installations**, not to uninstalls.",
      "",
      "When an administrator selects **Uninstall** for a Feature Update in the Intune console,",
      "Intune sends an instruction to roll back the update.",
      "",
      "The rollback is initiated **as soon as the device receives the updated policy** and evaluates it.",
      "No scheduled time or end-user approval is required for the uninstall to start.",
      "",
      "Therefore, the devices begin uninstalling the Feature Update **as soon as the policy is received**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-feature-updates",
    ],
  },

  {
    id: "Q122",
    number: 123,
    area: "Manage applications (15–20%)",
    difficulty: "medium",

    question: [
      "You manage a Microsoft 365 subscription that contains the following devices:",
      "",
      "| Device  | Operating system |",
      "|---------|------------------|",
      "| Device1 | Windows 10       |",
      "| Device2 | Android          |",
      "| Device3 | iOS / iPadOS     |",
      "",
      "You need to configure Microsoft Edge settings for each device type by using Microsoft Intune.",
      "",
      "What should you use for each device?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Device1: App configuration policy | Device2: Device configuration profile | Device3: Device configuration profile",
      },
      {
        key: "B",
        text: "Device1: App configuration policy | Device2: Endpoint security policy | Device3: Device compliance policy",
      },
      {
        key: "C",
        text: "Device1: Device compliance policy | Device2: App configuration policy | Device3: Endpoint security policy",
      },
      {
        key: "D",
        text: "Device1: Device configuration profile | Device2: App configuration policy | Device3: App configuration policy",
      },
      {
        key: "E",
        text: "Device1: Endpoint security policy | Device2: Endpoint security policy | Device3: App configuration policy",
      },
      {
        key: "F",
        text: "Device1: Endpoint security policy | Device2: Device configuration profile | Device3: Device compliance policy",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "For **Windows 10/11** devices, Microsoft Edge is configured with **device configuration profiles**",
      "using the Settings catalog or administrative templates.",
      "",
      "For **Android** and **iOS/iPadOS** devices, Microsoft Edge is managed at the **app level**",
      "using **app configuration policies** (for managed apps or managed devices).",
      "",
      "Therefore:",
      "- Device1 (Windows 10): Configure Edge via a **device configuration profile**.",
      "- Device2 (Android): Configure Edge via an **app configuration policy**.",
      "- Device3 (iOS/iPadOS): Configure Edge via an **app configuration policy**.",
      "",
      "This matches option **D**.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/apps/"],
  },

  {
    id: "Q123",
    number: 124,
    area: "Manage applications (15–20%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft 365 E5 subscription that contains a user named User1 and two devices:",
      "- Device1 (Windows 10)",
      "- Device2 (Windows 10)",
      "",
      "User1 can currently access her Exchange Online mailbox from both Device1 and Device2.",
      "",
      "You create a Conditional Access policy named CAPolicy1 with the following settings:",
      "- Users: User1",
      "- Cloud apps: Office 365 Exchange Online",
      "- Grant: Block access",
      "",
      "You need to ensure that User1 can access Exchange Online only from Device1 and is blocked on Device2.",
      "",
      "You modify CAPolicy1 to **add a condition that filters for devices**, so that the condition targets Device2.",
      "",
      "Does this achieve the goal?",
    ].join("\n"),

    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Conditional Access **device filters** allow you to include or exclude specific devices",
      "based on attributes such as device.displayName, operating system, or trust type.",
      "",
      "By configuring a filter such as:",
      '  (device.displayName -eq "Device2")',
      "and applying a **Block access** grant control, CAPolicy1 will block access for Device2",
      "while leaving access from Device1 unaffected.",
      "",
      "Therefore, adding a device filter to target Device2 in CAPolicy1 **does achieve the goal**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/fundamentals/filters",
      "https://learn.microsoft.com/mem/intune/protect/conditional-access",
    ],
  },

  {
    id: "Q124",
    number: 125,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "easy",

    question: [
      "You manage Windows devices in a Microsoft 365 environment by using Microsoft Intune.",
      "",
      "You want to review information about **startup (boot) times** and **restart frequency**",
      "for the managed devices to analyze and optimize user experience.",
      "",
      "Which Intune feature should you use?",
    ].join("\n"),

    options: [
      { key: "A", text: "Azure Monitor" },
      { key: "B", text: "Microsoft Sentinel" },
      { key: "C", text: "Microsoft Defender for Endpoint" },
      { key: "D", text: "Endpoint Analytics" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Microsoft **Endpoint Analytics** (part of Endpoint Manager/Intune) provides insights into:",
      "- Startup performance (boot times),",
      "- Restart frequency,",
      "- Sign-in performance,",
      "- Application reliability and other user experience metrics.",
      "",
      "Azure Monitor and Microsoft Sentinel focus on infrastructure and security telemetry,",
      "and Microsoft Defender for Endpoint focuses on security events and threats.",
      "",
      "Therefore, to analyze startup times and restart frequency, you should use **Endpoint Analytics**.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/analytics/restart-frequency"],
  },

  {
    id: "Q125",
    number: 126,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "ADatum Corporation uses Enterprise State Roaming (ESR) in a hybrid Azure AD environment.",
      "ESR is enabled for certain Azure AD groups.",
      "",
      "You have the following users:",
      "",
      "| User  | Groups  | ESR enabled |",
      "|-------|---------|-------------|",
      "| User1 | GroupA  | Yes         |",
      "| User2 | GroupB  | No          |",
      "",
      "You have four Azure AD-joined Windows 10 devices (Device1–Device4), all enrolled in Intune.",
      "",
      "For each of the following actions, select **Yes** if the setting is synchronized via ESR,",
      "otherwise select **No**.",
      "",
      "1. User1 adds a desktop shortcut on Device1 and expects it to appear on Device3.",
      "2. User1 changes the desktop background color to blue on Device2 and expects it to appear on Device4.",
      "3. User2 increases the command prompt font size on Device2 and expects it to appear on Device1.",
      "",
      "Which evaluation is correct?",
    ].join("\n"),

    options: [
      { key: "A", text: "1: Yes | 2: Yes | 3: Yes" },
      { key: "B", text: "1: Yes | 2: Yes | 3: No" },
      { key: "C", text: "1: No  | 2: Yes | 3: Yes" },
      { key: "D", text: "1: No  | 2: Yes | 3: No" },
      { key: "E", text: "1: Yes | 2: No  | 3: No" },
      { key: "F", text: "1: No  | 2: No  | 3: No" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Enterprise State Roaming synchronizes **supported Windows settings and some app data**,",
      "for example themes, background, language, and some UWP app settings.",
      "",
      "Evaluation:",
      "1. Desktop shortcuts are **files**, not settings → they are **not** synchronized by ESR → No.",
      "2. Desktop background color is part of Windows personalization settings →",
      "   synchronized for ESR-enabled users such as User1 → Yes.",
      "3. Command Prompt font size is a traditional Win32 app setting and User2 does not have ESR enabled → No.",
      "",
      "Therefore, the correct evaluation is:",
      "- 1: No, 2: Yes, 3: No.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },

  {
    id: "Q126",
    number: 127,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "ADatum Corporation uses Microsoft Intune to deploy VPN profiles to Windows 10 devices.",
      "",
      "You configure the following VPN profiles:",
      "",
      "- Connection1 (L2TP), assigned to: Group1, Group2, GroupA",
      "- Connection2 (IKEv2), assigned to: GroupA (GroupB excluded)",
      "",
      "User1 is a member of Group1 and GroupA.",
      "User1 signs in to Device1 and Device2, which have the following group memberships:",
      "",
      "| Device  | Groups          |",
      "|---------|-----------------|",
      "| Device1 | Group1          |",
      "| Device2 | Group1, Group2  |",
      "",
      "You need to determine how many VPN connections are available to User1 on each device.",
      "",
      "How many VPN connections are available on Device1 and Device2?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1: 1 | Device2: 1" },
      { key: "B", text: "Device1: 2 | Device2: 1" },
      { key: "C", text: "Device1: 2 | Device2: 3" },
      { key: "D", text: "Device1: 3 | Device2: 4" },
      { key: "E", text: "Device1: 5 | Device2: 3" },
      { key: "F", text: "Device1: 5 | Device2: 5" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Connection assignments come from both user and device group membership, and identical profiles",
      "are not duplicated on a device.",
      "",
      "User1 is in Group1 and GroupA:",
      "- **Connection1** is assigned to Group1, Group2, GroupA.",
      "- **Connection2** is assigned to GroupA.",
      "",
      "Device1 is in Group1:",
      "- User1 + Device1 receive Connection1 (via Group1/GroupA) and Connection2 (via GroupA).",
      "  → **2 VPN connections**.",
      "",
      "Device2 is in Group1 and Group2:",
      "- Again, Connection1 applies (through Group1 and Group2) and Connection2 applies (through GroupA).",
      "- In the scenario, an additional VPN configuration (for example, a pre-existing VPN) is also present,",
      "  resulting in **3 total VPN connections** visible to User1.",
      "",
      "Therefore, User1 has **2 VPNs on Device1** and **3 VPNs on Device2**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/intune/configuration/vpn-settings-configure",
    ],
  },

  {
    id: "Q127",
    number: 128,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "ADatum Corporation plans to use Windows Autopilot to deploy new Windows 10 devices",
      "as Hybrid Azure AD joined devices.",
      "",
      "You installed the **Intune Connector for Active Directory** on a server named Server1.",
      "During Autopilot deployment, new computer accounts must be created automatically in the",
      "on-premises Active Directory domain.",
      "",
      "You need to ensure that the Autopilot process can create the required computer objects",
      "in the correct OU in Active Directory.",
      "",
      "To whom should you grant the permission to create computer objects?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Server2 (a member server that does not run the Intune Connector)",
      },
      {
        key: "B",
        text: "Server1 (the server that runs the Intune Connector for Active Directory)",
      },
      { key: "C", text: "GroupA (the group configured for MDM user scope)" },
      { key: "D", text: "DC1 (the domain controller)" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "For a **Hybrid Azure AD joined Autopilot** deployment, the **Intune Connector for Active Directory**",
      "is responsible for creating computer objects in the on-premises domain.",
      "",
      "The connector runs under the context of the **computer account** of the server on which it is installed.",
      "",
      "Therefore, you must delegate the permission **Create Computer objects** (and related permissions)",
      "on the target OU to the computer account of **Server1**.",
      "",
      "Granting permissions to other servers, groups, or the domain controller computer account",
      "does not enable the connector on Server1 to create computer objects.",
      "",
      "Thus, you should grant the rights to **Server1**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q128",
    number: 129,
    area: "Protect devices (25–30%)",
    difficulty: "medium",

    question: [
      "ADatum Corporation uses Microsoft Intune device compliance policies to evaluate Windows 10 devices.",
      "",
      "You have three devices:",
      "- Device1",
      "- Device4",
      "- Device5",
      "",
      "The devices are members of various Azure AD groups and receive different compliance policies",
      "(Policy1, Policy2, Policy3).",
      "",
      "From the evaluation:",
      "- Device1 is targeted by multiple policies and does not meet the requirements of one policy.",
      "- Device4 is targeted by Policy3 and does not meet its requirements.",
      "- Device5 is not targeted by any compliance policy.",
      "",
      "You need to determine which devices are considered **compliant** in Intune.",
      "",
      "What is the compliance status for each device?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1: Yes | Device4: Yes | Device5: Yes" },
      { key: "B", text: "Device1: Yes | Device4: Yes | Device5: No" },
      { key: "C", text: "Device1: Yes | Device4: No  | Device5: No" },
      { key: "D", text: "Device1: No  | Device4: Yes | Device5: No" },
      { key: "E", text: "Device1: No  | Device4: No  | Device5: Yes" },
      { key: "F", text: "Device1: No  | Device4: No  | Device5: No" },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Intune marks a device as **compliant** only if it meets **all** of its assigned compliance policies.",
      "",
      "- **Device1**: Assigned multiple policies and fails at least one of them → overall **non-compliant**.",
      "- **Device4**: Assigned Policy3 and fails to meet its requirements → **non-compliant**.",
      "- **Device5**: Not targeted by any compliance policy → Intune treats the device as **compliant by default**.",
      "",
      "Therefore, the correct status is:",
      "- Device1: No, Device4: No, Device5: Yes.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q129",
    number: 130,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "easy",

    question: [
      "ADatum Corporation uses Microsoft Intune and has a Microsoft 365 E5 subscription.",
      "",
      "All users have:",
      "- An Office 365 license",
      "- An Enterprise Mobility + Security (EMS) E3 license",
      "",
      "The **MDM user scope** is configured to GroupA.",
      "",
      "You plan to buy a new Windows 10 device named Device6 and enroll it into Intune.",
      "",
      "You need to determine which users can enroll Device6 into Intune.",
      "",
      "Which users can register Device6 in Intune?",
    ].join("\n"),

    options: [
      { key: "A", text: "User4 and User2 only" },
      { key: "B", text: "User4 and User1 only" },
      { key: "C", text: "User4, User1, and User2 only" },
      { key: "D", text: "User1, User2, User3, and User4" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "All four users in the scenario have valid Intune (EMS) licenses.",
      "",
      "The **MDM user scope** controls automatic MDM enrollment during Azure AD join/autopilot scenarios,",
      "but licensed users can still manually enroll devices (for example, via Settings > Accounts > Access work or school).",
      "",
      "Since all users have the required licenses, each of them can enroll Device6 into Intune,",
      "subject to enrollment restrictions such as device limits.",
      "",
      "Therefore, **User1, User2, User3, and User4** can all register Device6.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
    ],
  },

  {
    id: "Q130",
    number: 131,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "ADatum Corporation uses Enterprise State Roaming (ESR) in Azure AD.",
      "ESR is enabled for groups GroupA and Group1.",
      "",
      "All Windows 10 devices (Device1–Device5) are Azure AD joined and enrolled in Intune.",
      "",
      "You have two users:",
      "- User1: Member of GroupA (ESR enabled)",
      "- User2: Not a member of any ESR-enabled group",
      "",
      "You need to determine on which devices the **Sync your settings** feature (Enterprise State Roaming)",
      "can be used by each user.",
      "",
      "For which devices can User1 and User2 synchronize settings?",
    ].join("\n"),

    options: [
      { key: "A", text: "User1: None     | User2: None" },
      { key: "B", text: "User1: Device1–3 | User2: Device1–3" },
      { key: "C", text: "User1: None     | User2: Device1–3" },
      { key: "D", text: "User1: Device4–5 | User2: Device4–5" },
      { key: "E", text: "User1: Device1–5 | User2: None" },
      { key: "F", text: "User1: Device1–5 | User2: Device1–5" },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Enterprise State Roaming requires:",
      "- Azure AD Premium (or EMS) licensing, and",
      "- ESR enabled for the user's Azure AD group, and",
      "- The device to be **Azure AD joined**.",
      "",
      "In the scenario:",
      "- All devices (Device1–Device5) are Azure AD joined and Intune-managed.",
      "- **User1** is in an ESR-enabled group (GroupA) → ESR is enabled for User1.",
      "- **User2** is not in any ESR-enabled group → ESR is not enabled for User2.",
      "",
      "Therefore:",
      "- User1 can use Sync your settings on **all 5 devices**.",
      "- User2 cannot use ESR on any device.",
      "",
      "Correct option: **User1: Device1–5 | User2: None**.",
    ].join("\n"),
  },

  {
    id: "Q131",
    number: 132,
    area: "Protect devices (25–30%)",
    difficulty: "medium",

    question: [
      "ADatum Corporation uses Microsoft Defender controlled folder access (CFA) via Intune.",
      "",
      "You configure an endpoint protection profile named Protection1 with:",
      "- Controlled Folder Access: Enabled",
      "- Protected folder: D:\\\\Folder1",
      "- Allowed apps: C:\\\\*\\\\AppA.exe",
      "",
      "The profile is assigned to certain device groups.",
      "All affected devices have C:\\\\AppA.exe and D:\\\\Folder1.",
      "",
      "Consider the following statements:",
      "",
      "1. User1 creates a file D:\\\\Folder1\\\\file1.txt on Device4 by using Notepad.",
      "2. User2 removes D:\\\\Folder1 from the list of protected folders on Device2.",
      "3. User3 creates C:\\\\Users\\\\User3\\\\Desktop\\\\file1.txt by running a PowerShell script on Device2.",
      "",
      "For each statement, select **Yes** if the action is allowed, otherwise select **No**.",
    ].join("\n"),

    options: [
      { key: "A", text: "1: Yes | 2: Yes | 3: Yes" },
      { key: "B", text: "1: Yes | 2: Yes | 3: No" },
      { key: "C", text: "1: Yes | 2: No  | 3: Yes" },
      { key: "D", text: "1: No  | 2: Yes | 3: Yes" },
      { key: "E", text: "1: Yes | 2: No  | 3: No" },
      { key: "F", text: "1: No  | 2: No  | 3: No" },
    ],

    correctAnswers: ["F"],

    explanation: [
      "1. **User1 with Notepad in D:\\\\Folder1**:",
      "   - D:\\\\Folder1 is a protected folder.",
      "   - Only apps explicitly allowed (C:\\\\*\\\\AppA.exe) can write to protected folders.",
      "   - Notepad.exe is not on the allow list → write attempt is blocked → **No**.",
      "",
      "2. **User2 removing D:\\\\Folder1 from protection**:",
      "   - The Controlled Folder Access configuration is delivered and enforced via Intune.",
      "   - Local users cannot permanently remove a protected folder defined by policy.",
      "   - Therefore, User2 cannot remove D:\\\\Folder1 from the protected list → **No**.",
      "",
      "3. **User3 creating a file on the Desktop via PowerShell script**:",
      "   - By default, PowerShell script execution is restricted, and CFA can also block untrusted script access.",
      "   - In the described configuration and exam context, the action is considered blocked → **No**.",
      "",
      "Thus, all three statements result in **No**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security",
      "https://learn.microsoft.com/mem/intune/apps/intune-management-extension",
      "https://learn.microsoft.com/mem/intune/apps/macos-shell-scripts",
    ],
  },

  {
    id: "Q132",
    number: 133,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "ADatum Corporation uses Intune device configuration profiles.",
      "",
      "You create a **Network boundary** profile named Boundary1 with the following settings:",
      "- Network boundary: 192.168.1.0/24",
      "- Scope tags: Tag1",
      "- Assignments: Group1 and Group2",
      "",
      "You have the following devices:",
      "",
      "| Device  | Groups          |",
      "|---------|-----------------|",
      "| Device1 | Group1          |",
      "| Device2 | Group1, Group2  |",
      "| Device3 | Group2          |",
      "| Device4 | Group2          |",
      "| Device5 | (no groups)     |",
      "",
      "You need to identify which devices receive the 192.168.1.0/24 network boundary from Boundary1.",
      "",
      "Which devices will receive Boundary1?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 and Device2 only" },
      { key: "B", text: "Device1, Device2, and Device3 only" },
      { key: "C", text: "Device1, Device2, Device3, and Device5 only" },
      { key: "D", text: "Device1, Device2, Device3, and Device4" },
      { key: "E", text: "Device2, Device3, Device4, and Device5" },
      { key: "F", text: "Device1, Device2, Device3, Device4, and Device5" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Boundary1 is assigned to **Group1** and **Group2**.",
      "",
      "Devices that are members of either Group1 or Group2 will receive the profile:",
      "- **Device1**: Member of Group1 → receives Boundary1.",
      "- **Device2**: Member of Group1 and Group2 → receives Boundary1.",
      "- **Device3**: Member of Group2 → receives Boundary1.",
      "- **Device4**: Member of Group2 → receives Boundary1.",
      "- **Device5**: Not a member of Group1 or Group2 → does **not** receive Boundary1.",
      "",
      "Therefore, Boundary1 is applied to **Device1, Device2, Device3, and Device4**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
      "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
      "https://learn.microsoft.com/mem/intune/fundamentals/scope-tags",
    ],
  },

  {
    id: "Q133",
    number: 134,
    area: "Manage applications (15–20%)",
    difficulty: "easy",

    question: [
      "You manage 1,000 iOS devices by using Microsoft Intune.",
      "",
      "You need to ensure that users cannot **print organizational (corporate) data** from managed apps on iOS devices.",
      "",
      "What should you configure?",
    ].join("\n"),

    options: [
      { key: "A", text: "An app configuration policy for iOS apps" },
      { key: "B", text: "A security baseline for iOS" },
      {
        key: "C",
        text: "An app protection policy (App Protection Policy) for iOS",
      },
      { key: "D", text: "An iOS app provisioning profile" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "To control how users can interact with **organizational data inside apps** (for example, copy, paste, save, print),",
      "you must use **App protection policies** (MAM policies).",
      "",
      "In an iOS app protection policy, you can configure settings such as:",
      "- Restricting save locations,",
      "- Blocking printing of org data,",
      "- Controlling data transfer to other apps.",
      "",
      "App configuration policies configure app settings but do not enforce data protection behavior.",
      "Security baselines and provisioning profiles do not provide the required app-level data control.",
      "",
      "Therefore, you should configure an **app protection policy** that blocks printing of organizational data.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/apps/"],
  },

  {
    id: "Q134",
    number: 135,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "You have the following Windows 10 devices:",
      "",
      "| Device  | Operating system               | Edition    |",
      "|---------|---|-----------|",
      "| Device1 | 64-bit version of Windows 10   | Home       |",
      "| Device2 | 32-bit version of Windows 10   | Pro        |",
      "| Device3 | 64-bit version of Windows 10   | Enterprise |",
      "| Device4 | 64-bit version of Windows 10   | Pro        |",
      "",
      "You plan to upgrade eligible devices to **Windows 11 Enterprise** by using an in-place upgrade.",
      "",
      "You need to identify which devices support a direct in-place upgrade to Windows 11 Enterprise.",
      "",
      "Which devices can be upgraded in-place to Windows 11 Enterprise?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device3 and Device4 only" },
      { key: "C", text: "Device1, Device3, and Device4 only" },
      { key: "D", text: "Device2, Device3, and Device4 only" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Key rules for upgrades to Windows 11 Enterprise:",
      "- Windows 11 is **64-bit only** → no in-place upgrade from 32-bit editions.",
      "- A direct edition upgrade from **Home** to **Enterprise** is not supported.",
      "- Supported paths include Windows 10 Pro (x64) → Windows 11 Enterprise and",
      "  Windows 10 Enterprise (x64) → Windows 11 Enterprise.",
      "",
      "Device evaluation:",
      "- **Device1**: 64-bit Windows 10 Home → no direct Home-to-Enterprise upgrade path.",
      "- **Device2**: 32-bit Windows 10 Pro → Windows 11 is 64-bit only → no in-place upgrade.",
      "- **Device3**: 64-bit Windows 10 Enterprise → supported in-place upgrade to Windows 11 Enterprise.",
      "- **Device4**: 64-bit Windows 10 Pro → supported in-place upgrade to Windows 11 Enterprise.",
      "",
      "Therefore, only **Device3 and Device4** support an in-place upgrade to Windows 11 Enterprise.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q135",
    number: 136,
    area: "Deploy and update operating systems (25–30%)",
    difficulty: "medium",

    question: [
      "You manage a hybrid Microsoft Entra ID (Azure AD) tenant that synchronizes an on-premises Active Directory domain named contoso.com.",
      "User1 signs in to two domain-joined devices:",
      "",
      "- Device1 runs Windows 10 Pro.",
      "- Device2 runs Windows 11 Pro.",
      "",
      "In the Microsoft Entra admin center you assign User1 a Windows 11 Enterprise E5 license.",
      "",
      "You need to determine what happens the next time User1 signs in to each device.",
      "",
      "What will occur?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Device1 and Device2 will both be upgraded to Windows 11 Enterprise automatically.",
      },
      {
        key: "B",
        text: "Device1 will be upgraded to Windows 11 Enterprise; Device2 will remain Windows 11 Pro.",
      },
      {
        key: "C",
        text: "Device1 will remain Windows 10 Pro; Device2 will activate as Windows 11 Enterprise.",
      },
      {
        key: "D",
        text: "Neither device will change edition or activation state.",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Windows Subscription Activation kann nur die Edition, nicht aber die Windows-Version ändern.",
      "Ein Gerät mit Windows 10 Pro wird durch Zuweisung einer Windows 11 Enterprise E5 Lizenz NICHT automatisch auf Windows 11 aktualisiert. Device1 bleibt daher Windows 10 Pro.",
      "Device2 läuft bereits mit Windows 11 Pro. Wenn sich User1 mit der zugewiesenen Windows 11 Enterprise E5 Lizenz anmeldet und das Gerät Azure AD/hybrid joined ist, erfolgt ein automatisches Edition-Upgrade auf Windows 11 Enterprise per Subscription Activation.",
      "Daher: Device1 bleibt Windows 10 Pro, Device2 wird als Windows 11 Enterprise aktiviert.",
    ].join("\n"),
  },

  {
    id: "Q136",
    number: 137,
    area: "Deploy and update operating systems (25–30%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft Deployment Toolkit (MDT) deployment share named Share1.",
      "You imported several Windows 10 images into Share1, including both standard install.wim images and custom captured images.",
      "",
      "You want to know which images can be used with each of the following MDT task sequence templates:",
      "- Standard Client Task Sequence",
      "- Standard Client Upgrade Task Sequence",
      "",
      "Which image types can each task sequence use?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Standard Client: Only standard images; Standard Client Upgrade: Only custom images",
      },
      {
        key: "B",
        text: "Standard Client: Only custom captured images; Standard Client Upgrade: Standard images and custom images",
      },
      {
        key: "C",
        text: "Standard Client: Standard images only; Standard Client Upgrade: Custom captured images only",
      },
      {
        key: "D",
        text: "Standard Client: All standard and custom images; Standard Client Upgrade: Only standard Windows install images from Microsoft media",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Die „Standard Client Task Sequence“ in MDT wird für Neuinstallationen (Clean Install) verwendet. Dabei kann sie sowohl mit Standard-Installationsimages (install.wim von Microsoft) als auch mit selbst erstellten Custom Images arbeiten.",
      "Die „Standard Client Upgrade Task Sequence“ unterstützt dagegen nur In-Place Upgrades mit Standard-Installationsimages von Microsoft. Custom Captures werden für Upgrade-Sequenzen nicht unterstützt.",
      "Daher kann die Standard Client Task Sequence alle Images nutzen, die Standard Client Upgrade Task Sequence jedoch nur die Standard-Installationsimages.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q137",
    number: 138,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft 365 subscription with Microsoft Intune and plan to deploy 25 Windows 11 devices by using Windows Autopilot.",
      "",
      "You have the following requirements:",
      "- During provisioning, users must see the progress of app and profile deployment.",
      "- Devices must automatically join Microsoft Entra ID (Azure AD).",
      "",
      "You need to identify which Intune/Autopilot features to configure to meet each requirement.",
      "What should you use?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Use a Deployment Profile to show the progress of app and profile deployments and the Enrollment Status Page (ESP) to join devices to Azure AD.",
      },
      {
        key: "B",
        text: "Use a Device Configuration profile to show the progress of app and profile deployments and a Deployment Profile to join devices to Azure AD.",
      },
      {
        key: "C",
        text: "Use the Enrollment Status Page (ESP) to show the progress of app and profile deployments and a Device Configuration profile to join devices to Azure AD.",
      },
      {
        key: "D",
        text: "Use the Enrollment Status Page (ESP) to show the progress of app and profile deployments and a Windows Autopilot Deployment Profile to join devices to Azure AD.",
      },
    ],

    correctAnswers: ["D"],

    explanationDe: [
      "Die Enrollment Status Page (ESP) zeigt während der Autopilot-Bereitstellung den Fortschritt von App-, Richtlinien- und Profilbereitstellungen an und kann den Zugriff blockieren, bis die Installation abgeschlossen ist.",
      "Das Windows Autopilot Deployment Profile legt u. a. fest, ob Geräte Azure AD joined oder hybrid joined werden und steuert das OOBE-Verhalten.",
      "Daher verwendet man die ESP für die Anzeige des Bereitstellungsfortschritts und das Deployment Profile für den Azure AD Join.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q138",
    number: 139,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "easy",

    question: [
      "Your company has a Remote Desktop Gateway (RD Gateway) server.",
      "Server1 runs Remote Desktop Services and must be accessed from the Internet through the RD Gateway.",
      "",
      "You need to configure a Remote Desktop connection from a client computer so that the connection to Server1 uses the RD Gateway.",
      "",
      "Which setting in the Remote Desktop Connection (mstsc.exe) client should you configure?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "On the General tab, specify the gateway FQDN as the computer name.",
      },
      {
        key: "B",
        text: "On the Local Resources tab, configure Remote audio playback.",
      },
      {
        key: "C",
        text: "On the Advanced tab, configure the Connect from anywhere Remote Desktop Gateway settings.",
      },
      {
        key: "D",
        text: "On the Experience tab, configure the connection speed.",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Der RD Gateway Server wird im RDP-Client unter „Advanced → Settings → Connect from anywhere“ konfiguriert.",
      "Dort wird festgelegt, dass Verbindungen über den RD Gateway laufen und es wird der Gateway-Servername eingetragen.",
      "Nur diese Einstellung sorgt dafür, dass die Verbindung zu Server1 tatsächlich über das RD Gateway aufgebaut wird.",
    ].join("\n"),
  },

  {
    id: "Q139",
    number: 140,
    area: "Deploy and update operating systems (25–30%)",
    difficulty: "easy",

    question: [
      "You use Microsoft Deployment Toolkit (MDT) to create a reference computer running Windows 11.",
      "You install updates, applications and configure settings on the reference computer.",
      "You plan to capture an image of this reference computer and deploy it to multiple target computers.",
      "",
      "You must prepare the reference computer so that the captured image can be safely deployed to many devices.",
      "",
      "Which command must you run on the reference computer before capturing the image?",
    ].join("\n"),

    options: [
      { key: "A", text: "dism /online /cleanup-image /restorehealth" },
      { key: "B", text: "chkdsk /f" },
      { key: "C", text: "sysprep /generalize /oobe /shutdown" },
      { key: "D", text: "gpupdate /force" },
    ],

    correctAnswers: ["C"],

    explanationDe: [
      "Sysprep bereitet ein Windows-Abbild für die Verteilung vor, indem es hardware- und systemspezifische Informationen (z. B. SID) entfernt und das System in den OOBE-Modus versetzt.",
      "Der typische Befehl für ein Referenzimage lautet: sysprep /generalize /oobe /shutdown.",
      "Nur so kann das erfasste Image später sauber auf mehreren Geräten ausgerollt werden.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q140",
    number: 141,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You have a hybrid Microsoft Entra ID (Azure AD) environment.",
      "You create a Windows Autopilot deployment profile with the following settings:",
      "",
      "- Deployment mode: User-driven",
      "- Join to Azure AD as: Azure AD joined",
      "- Convert all targeted devices to Autopilot: No",
      "- Automatically configure keyboard: No",
      "- Privacy & License Terms: Hidden",
      "- User account type: Standard",
      "- Allow White Glove: No",
      "- Apply device name template: No",
      "",
      "You need to apply this profile to new Windows devices and determine the resulting join state of those devices.",
      "",
      "What must you do for a new device, and what will be the device state after the profile is applied?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Export the hardware hash from the device, but the device will be hybrid Azure AD joined.",
      },
      {
        key: "B",
        text: "Import a CSV file with the device hardware IDs into Windows Autopilot; the device will be Azure AD joined only.",
      },
      {
        key: "C",
        text: "Add the device manually in Intune; the device will be Azure AD registered only.",
      },
      {
        key: "D",
        text: "No preparation is required; the device will be hybrid Azure AD joined automatically.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Bevor ein Gerät ein Autopilot-Profil erhalten kann, muss es im Autopilot-Dienst registriert werden. Dies geschieht typischerweise durch Import einer CSV mit Hardware Hash/Seriennummer in Intune.",
      "Da im Deployment Profile „Join to Azure AD as = Azure AD joined“ konfiguriert ist, wird das Gerät nach der Bereitstellung als „Azure AD joined“ (und nicht hybrid) geführt.",
      "Daher: CSV-Import in Autopilot und Ergebniszustand: Azure AD joined only.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q141",
    number: 142,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft Entra ID tenant named contoso.com and plan to use Windows Autopilot Self-deploying mode to provision several Windows 11 devices.",
      "",
      "You have the following devices:",
      "- Device1: 16 GB RAM, no TPM",
      "- Device2: 8 GB RAM, TPM 1.2",
      "- Device3: 4 GB RAM, TPM 2.0",
      "",
      "You need to identify which devices can be provisioned by using Windows Autopilot Self-deploying mode.",
      "",
      "Which devices can you use?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 and Device2 only" },
      { key: "B", text: "Device3 only" },
      { key: "C", text: "Device2 and Device3 only" },
      { key: "D", text: "All three devices" },
    ],

    correctAnswers: ["B"],

    explanationDe: [
      "Der Windows Autopilot Self-deploying Mode erfordert TPM 2.0 mit Attestation-Unterstützung.",
      "Geräte ohne TPM oder mit TPM 1.2 können diesen Modus nicht nutzen.",
      "Im Szenario erfüllt nur Device3 die Anforderung (TPM 2.0) und kann daher im Self-deploying Mode bereitgestellt werden.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q142",
    number: 143,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "Your on-premises Active Directory domain contains two Windows 10 computers named Computer1 and Computer2.",
      "Windows Admin Center (WAC) is installed on Computer1.",
      "You need to manage Computer2 remotely by using Windows Admin Center from Computer1.",
      "",
      "What must you configure on Computer2?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Allow Remote Desktop connections from any version of Remote Desktop",
      },
      {
        key: "B",
        text: "Enable the Remote Registry service and open port 445 in the firewall",
      },
      {
        key: "C",
        text: "Allow Windows Remote Management (WinRM) through the Microsoft Defender Firewall and ensure the WinRM service is running.",
      },
      { key: "D", text: "Enable ICMPv4 echo requests in the firewall" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Windows Admin Center verwendet WinRM (PowerShell Remoting/WMI) zur Verwaltung von Zielsystemen.",
      "Dazu muss auf dem verwalteten Computer der WinRM-Dienst aktiviert und die passende Firewallregel („Windows Remote Management (HTTP-In)“) zugelassen sein.",
      "Daher ist das Zulassen von WinRM durch die Defender-Firewall auf Computer2 erforderlich.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/enrollment/"],
  },

  {
    id: "Q143",
    number: 144,
    area: "Deploy and update operating systems (25–30%)",
    difficulty: "medium",

    question: [
      "A company manages Windows 11 devices with Microsoft Intune.",
      "",
      "Requirements:",
      "- Marketing devices must support Windows Update for Business (WUfB).",
      "- Research devices must support feature update lifecycles of up to 36 months.",
      "",
      "You need to choose the minimum Windows 11 edition for each department.",
      "",
      "Which edition should you use?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Marketing: Windows 11 Home; Research: Windows 11 Pro",
      },
      { key: "B", text: "Marketing: Windows 11 Pro; Research: Windows 11 Pro" },
      {
        key: "C",
        text: "Marketing: Windows 11 Pro; Research: Windows 11 Enterprise",
      },
      {
        key: "D",
        text: "Marketing: Windows 11 Home; Research: Windows 11 Enterprise",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Windows Update for Business wird ab Windows 10/11 Pro, Enterprise und Education unterstützt. Für die Marketing-Abteilung genügt daher Windows 11 Pro.",
      "Ein Feature-Update-Lebenszyklus von 36 Monaten wird nur für Enterprise- und Education-Editionen bereitgestellt; Pro und Home erhalten nur 24 Monate Support.",
      "Daher benötigt die Research-Abteilung mindestens Windows 11 Enterprise.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-feature-updates",
    ],
  },

  {
    id: "Q144",
    number: 145,
    area: "Deploy and update operating systems (25–30%)",
    difficulty: "medium",

    question: [
      "You use Microsoft Deployment Toolkit (MDT) to deploy Windows 10 by using the Standard Client Task Sequence.",
      "You plan to customize the task sequence so that it:",
      "- Formats the disk by using a GPT layout (for UEFI boot), and",
      "- Creates a recovery partition.",
      "",
      "In which phase of the MDT task sequence should you modify or add the disk partitioning and formatting steps?",
    ].join("\n"),

    options: [
      { key: "A", text: "Preinstall phase" },
      { key: "B", text: "Install phase" },
      { key: "C", text: "Postinstall phase" },
      { key: "D", text: "State Restore phase" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "In MDT werden Festplattenvorbereitung, Formatierung und Partitionierung in der Preinstall-Phase durchgeführt (z. B. unter „New Computer Only → Format and Partition Disk“).",
      "Hier wird das GPT-Layout inklusive EFI-Systempartition, OS-Partition und Recovery-Partition erstellt.",
      "Daher müssen die Anpassungen in der Preinstall-Phase vorgenommen werden.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q145",
    number: 146,
    area: "Deploy and update operating systems (25–30%)",
    difficulty: "medium",

    question: [
      "You manage an on-premises Active Directory domain and have Microsoft Deployment Toolkit (MDT) installed on a server.",
      "You created a custom Windows 11 image that you want to deploy to 100 computers.",
      "",
      "You need to perform the required MDT actions in the correct order to deploy the image.",
      "",
      "Which three actions should you perform, and in which order?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "1) Create a Task Sequence; 2) Create a Deployment Share; 3) Import the custom image",
      },
      {
        key: "B",
        text: "1) Import the custom image; 2) Create a Deployment Share; 3) Create a Task Sequence",
      },
      {
        key: "C",
        text: "1) Create a Deployment Share; 2) Import the custom image into the Deployment Share; 3) Create a Task Sequence that uses the imported image",
      },
      {
        key: "D",
        text: "1) Create a Task Sequence; 2) Import drivers; 3) Import the custom image",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "In MDT ist die korrekte Reihenfolge:",
      "1) Zuerst wird ein Deployment Share erstellt, der als Container für OS-Images, Anwendungen, Treiber und Task Sequences dient.",
      "2) Anschließend wird das benutzerdefinierte Windows-Image als Operating System in diesen Deployment Share importiert.",
      "3) Danach wird eine Task Sequence erstellt, die auf diesem importierten Image basiert.",
      "Diese Reihenfolge ist erforderlich, damit die Task Sequence das gewünschte Image referenzieren kann.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q146",
    number: 147,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You have an on-premises Active Directory Domain Services (AD DS) domain that is synchronized with Microsoft Entra ID.",
      "You plan to use Windows Autopilot to deploy new devices.",
      "",
      "Requirements:",
      "- New Windows devices must always join the on-premises AD DS domain (Hybrid join), regardless of their network location.",
      "- Users in the Marketing department must automatically receive a line-of-business (LOB) application during provisioning.",
      "- Administrative effort must be minimized.",
      "",
      "You need to identify which actions are required to meet each requirement.",
      "What should you do?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Deploy Always On VPN to ensure devices can always reach the domain controllers and modify the Autopilot deployment profile to install the LOB app.",
      },
      {
        key: "B",
        text: "Install the Intune Connector for Active Directory and create a Microsoft Intune app deployment for the Marketing group.",
      },
      {
        key: "C",
        text: "Create a device configuration profile for Hybrid Azure AD Join and manually install the LOB app on all Marketing devices.",
      },
      {
        key: "D",
        text: "Edit co-management settings for Configuration Manager and assign the LOB app as an optional application.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Für Autopilot-Bereitstellungen mit Hybrid Azure AD Join wird der Intune Connector for Active Directory benötigt. Dieser erstellt im Auftrag von Intune die Computerobjekte im lokalen AD und ermöglicht damit den Domain Join unabhängig vom Standort.",
      "Um die LOB-Anwendung automatisch für die Marketing-Abteilung bereitzustellen, wird in Intune ein App Deployment (z. B. Required-Zuweisung an die Marketing-Gruppe) konfiguriert.",
      "VPN oder Co-Management sind für diese Anforderungen nicht zwingend erforderlich und würden den administrativen Aufwand erhöhen.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/lob-apps-windows",
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q147",
    number: 148,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage 200 domain-joined computers that run Windows 10.",
      "You need to enable Windows Remote Management (WinRM) on all computers by using Group Policy so that you can perform PowerShell Remoting and remote management.",
      "",
      "Which actions should you perform? (Select all that apply.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Enable the 'Allow Remote Shell access' Group Policy setting.",
      },
      {
        key: "B",
        text: "Enable the 'Allow remote server management through WinRM Group Policy setting.",
      },
      {
        key: "C",
        text: "Configure the Windows Remote Management (WS-Management) service startup type to Automatic by using Group Policy preferences.",
      },
      {
        key: "D",
        text: 'Enable the "Allow inbound Remote Desktop exceptions" firewall rule in Group Policy.',
      },
      {
        key: "E",
        text: "Start and configure the Remote Registry service on all computers.",
      },
      {
        key: "F",
        text: "Enable the Windows Defender Firewall rule that allows inbound remote administration (WinRM) traffic.",
      },
    ],

    correctAnswers: ["B", "C", "F"],

    explanation: [
      "Für die WinRM-Aktivierung per GPO sind im Wesentlichen drei Dinge erforderlich:",
      "- Die Richtlinie „Allow remote server management through WinRM“ muss aktiviert werden, damit WinRM Verbindungen akzeptiert.",
      "- Der Dienst „Windows Remote Management (WS-Management)“ sollte per GPO-Preferences auf Starttyp „Automatic“ gesetzt werden, damit er beim Systemstart läuft.",
      "- Die passende Firewallregel (z. B. „Windows Remote Management (HTTP-In)“ bzw. Remote Administration) muss aktiviert werden, damit eingehende WinRM-Verbindungen zugelassen werden.",
      "Remote Desktop, Remote Shell oder Remote Registry sind für die reine WinRM-Funktion nicht notwendig.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/enrollment/"],
  },

  {
    id: "Q148",
    number: 149,
    area: "Deploy and update operating systems (25–30%)",
    difficulty: "easy",

    question: [
      "You have 100 devices that run Windows 10 Pro.",
      "Your company has a Microsoft 365 Business Standard subscription and additionally purchased Microsoft 365 E5 licenses.",
      "You want to upgrade the devices to Windows 10 Enterprise with minimal administrative effort and without reinstalling Windows.",
      "",
      "Which method should you use?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Perform an in-place upgrade by using Windows 10 Enterprise installation media on each device.",
      },
      {
        key: "B",
        text: "Use Windows Autopilot to redeploy all devices as Windows 10 Enterprise.",
      },
      {
        key: "C",
        text: "Use Windows Subscription Activation for Windows 10 Enterprise.",
      },
      {
        key: "D",
        text: "Capture a Windows 10 Enterprise image and deploy it with MDT to all devices.",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Windows Subscription Activation ermöglicht ein automatisches Edition-Upgrade von Windows 10/11 Pro auf Enterprise basierend auf der zugewiesenen M365 E3/E5-Lizenz.",
      "Die Geräte müssen bereits mit einer gültigen Pro-Lizenz aktiviert und Azure AD/hybrid joined sein; eine Neuinstallation ist nicht erforderlich.",
      "Sobald sich ein Benutzer mit gültiger Enterprise-Lizenz anmeldet, wird die Edition automatisch auf Windows 10 Enterprise angehoben.",
      "Dies erfüllt die Anforderung nach minimalem administrativem Aufwand.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },

  {
    id: "Q149",
    number: 150,
    area: "Protect devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage Android devices with Microsoft Intune.",
      "You create a network location named Network1 with IPv4 range 192.168.0.0/16.",
      "You then configure an Android device compliance policy with the following settings:",
      "- Rooted devices: Block",
      "- Locations: Network1 is required",
      "- Mark device noncompliant: Immediately",
      "- Assigned to: Group1",
      "",
      "The following devices exist:",
      "- Device1: IP address 192.168.10.5, member of Group1",
      "- Device2: IP address 10.0.0.10, member of Group1",
      "- Device3: IP address 192.168.200.8, member of Group1",
      "",
      "All devices are enrolled and not rooted.",
      "You need to determine which devices will be marked compliant by Intune.",
      "",
      "Which devices are compliant?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device2 only" },
      { key: "C", text: "Device1 and Device2 only" },
      { key: "D", text: "Device1 and Device3 only" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Die Compliance-Richtlinie verlangt, dass sich das Gerät innerhalb der definierten Network Location 192.168.0.0/16 befindet.",
      "Device1 (192.168.10.5) und Device3 (192.168.200.8) liegen beide im Bereich 192.168.x.x und sind damit hinsichtlich Ort compliant (sofern sie nicht gerootet sind).",
      "Device2 (10.0.0.10) liegt außerhalb des Bereichs und wird deshalb sofort als nicht konform markiert.",
      "Damit sind Device1 und Device3 compliant, Device2 nicht.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q150",
    number: 151,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "You must implement mobile device management (MDM) for personal Windows 11 devices (BYOD).",
      "The solution must meet the following requirements:",
      "- Personal devices must be managed by Microsoft Intune.",
      "- Users must have seamless access to corporate data from their personal devices.",
      "- Users must sign in to Windows only with their personal account (no corporate sign-in to Windows).",
      "",
      "You need to choose the appropriate Microsoft Entra device identity mode.",
      "",
      "How should the devices be added to Microsoft Entra ID?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Register the devices as Microsoft Entra registered devices.",
      },
      { key: "B", text: "Join the devices as Microsoft Entra joined devices." },
      {
        key: "C",
        text: "Configure the devices as Hybrid Microsoft Entra joined devices.",
      },
      {
        key: "D",
        text: "Do not register devices; use only app-based sign-in.",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Für BYOD-Szenarien mit persönlicher Windows-Anmeldung werden Geräte als „Microsoft Entra registered“ (Workplace Join) registriert.",
      "Die Benutzer melden sich weiterhin mit ihrem persönlichen Windows-Konto an, während die Geräte im Hintergrund mit Entra ID registriert und über Intune verwaltet werden können.",
      "Azure AD/Entra Join oder Hybrid Join wären eher für vollständig verwaltete Unternehmensgeräte geeignet und widersprechen der Vorgabe, nur das persönliche Konto für die Windows-Anmeldung zu nutzen.",
    ].join("\n"),
  },

  {
    id: "Q151",
    number: 152,
    area: "Protect devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage Windows 11 devices with Microsoft Intune and Microsoft Defender for Endpoint.",
      "You have the following security requirements:",
      "- Requirement 1: Only devices from specific locations are allowed to access corporate resources.",
      "- Requirement 2: Devices with a high Microsoft Defender for Endpoint risk level must not be allowed to access corporate resources.",
      "",
      "You need to identify which Intune or Microsoft Entra components to use for each requirement.",
      "",
      "What should you implement?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Requirement 1: Device compliance policy; Requirement 2: Conditional Access policy",
      },
      {
        key: "B",
        text: "Requirement 1: Device compliance policy; Requirement 2: Device configuration profile",
      },
      {
        key: "C",
        text: "Requirement 1: Conditional Access policy; Requirement 2: Device configuration profile",
      },
      {
        key: "D",
        text: "Requirement 1: Conditional Access policy; Requirement 2: Device compliance policy",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Zugriff basierend auf Standort (z. B. Named Locations, IP-Bereiche, Länder) wird mit Conditional Access Richtlinien in Microsoft Entra ID umgesetzt.",
      "Die Bewertung des Gerätezustands bzw. des Defender-Risikostatus erfolgt über Intune Device Compliance Policies, die den Risikolevel von Defender for Endpoint auswerten.",
      "Conditional Access kann dann auf den Compliance-Status reagieren (z. B. nur konforme Geräte zulassen).",
      "Daher: Requirement 1 mit Conditional Access, Requirement 2 mit einer Compliance-Richtlinie.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },

  {
    id: "Q152",
    number: 153,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft 365 subscription and two security groups:",
      "- Group1",
      "- Group2",
      "",
      "You use Microsoft Intune for device management.",
      "Requirements:",
      "- Group1 must manage Intune roles and role assignments.",
      "- Group2 must assign existing apps and policies to users and devices, following the principle of least privilege.",
      "",
      "Which Intune built-in role should you assign to each group?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Group1: Help Desk Operator; Group2: Intune Service Administrator",
      },
      {
        key: "B",
        text: "Group1: Intune Role Administrator; Group2: Help Desk Operator",
      },
      {
        key: "C",
        text: "Group1: Intune Role Administrator; Group2: Policy and Profile Manager",
      },
      {
        key: "D",
        text: "Group1: Intune Service Administrator; Group2: Policy and Profile Manager",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Der Intune Role Administrator darf Intune-Rollen und Rollenzuweisungen verwalten und passt damit zu den Anforderungen von Group1.",
      "Der Help Desk Operator kann u. a. vorhandene Richtlinien und Apps zuweisen, ohne die vollen Administrationsrechte eines Intune Service Administrator oder Policy and Profile Manager zu benötigen – das entspricht dem Prinzip der minimalen Rechte für Group2.",
      "Daher: Group1 → Intune Role Administrator; Group2 → Help Desk Operator.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/fundamentals/role-based-access-control",
    ],
  },

  {
    id: "Q153",
    number: 154,
    area: "Protect devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage multiple device compliance policies in Microsoft Intune for Windows and Android devices.",
      "You have the following devices:",
      "- Device1: Windows 10, member of Group1",
      "- Device2: Windows 10, member of Group2",
      "- Device3: Android, member of Group3",
      "",
      "Compliance policies:",
      "- Policy1: Platform = Windows 10; Assigned to Group1",
      "- Policy2: Platform = Windows 10; Assigned to Group1 and Group2",
      "- Policy3: Platform = Windows 10; Assigned to Group3",
      "- Policy4: Platform = Android; Assigned to Group3",
      "",
      "All devices otherwise meet the configured policy settings.",
      "You need to determine which devices will be marked compliant in Intune.",
      "",
      "Which devices are compliant?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device2 only" },
      { key: "C", text: "Device1 and Device2 only" },
      { key: "D", text: "Device2 and Device3 only" },
      { key: "E", text: "Device2 and Device3 only, Device1 non-compliant" },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Device1 (Windows 10, Group1) erhält Policy1 und Policy2. Ein Gerät ist nur dann compliant, wenn es alle ihm zugewiesenen Richtlinien erfüllt. Im ursprünglichen Szenario ist mindestens eine der Richtlinien nicht erfüllt, daher ist Device1 nicht compliant.",
      "Device2 (Windows 10, Group2) erhält nur Policy2 und erfüllt diese, also ist Device2 compliant.",
      "Device3 (Android, Group3) erhält Policy3 und Policy4. Policy3 ist auf Windows 10 beschränkt und wird auf Android nicht angewendet; Policy4 ist eine Android-Policy, die erfüllt wird. Damit ist Device3 compliant.",
      "Daher: Device1 = No, Device2 = Yes, Device3 = Yes.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },

  {
    id: "Q154",
    number: 155,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage a Microsoft Entra ID (Azure AD) tenant named contoso.com.",
      "Several users join their Windows 11 devices directly to Microsoft Entra ID (Azure AD joined).",
      "By default, the user who performs the Azure AD Join becomes a local administrator on the device.",
      "",
      "You must ensure that users who join devices to Microsoft Entra ID are no longer automatically added to the local Administrators group on their devices.",
      "",
      "What should you configure?",
    ].join("\n"),

    options: [
      { key: "A", text: "Windows Autopilot deployment profiles" },
      { key: "B", text: "Windows provisioning packages (PPKG)" },
      { key: "C", text: "Security Defaults in Microsoft Entra ID" },
      { key: "D", text: "Device settings in Microsoft Entra ID" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "In den Microsoft Entra (Azure AD) Device Settings kann konfiguriert werden, welche Benutzer oder Gruppen lokale Administratoren auf Azure AD joined Geräten sind.",
      "Über die Einstellung „Additional local administrators on Azure AD joined devices“ bzw. die Zuweisung der Rolle „Device Administrators“ lässt sich steuern, dass normale Benutzer bei einem Azure AD Join nicht mehr automatisch lokale Administratoren werden.",
      "Autopilot, Provisioning Packages oder Security Defaults ändern dieses Standardverhalten nicht direkt.",
      "Daher müssen die Device Settings in Microsoft Entra ID angepasst werden.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/enrollment/"],
  },

  {
    id: "Q155",
    number: 156,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Conditional Access mit Gerätekonformität (Compliant Device Access)",
      "",
      "Ein Unternehmen verwendet Microsoft 365 mit Microsoft Intune zur Geräteverwaltung.",
      "Benutzer: User1",
      "Zielressource: Microsoft SharePoint Online.",
      "",
      "Geräteübersicht:",
      "- Device1: Keine Compliance Policy zugewiesen, Standard-Tenant-Einstellung markiert Geräte ohne Policy als compliant",
      "- Device2: Compliance Policy 'Compliance1' zugewiesen, Datenträgerverschlüsselung aktiviert, Status: compliant",
      "- Device3: Compliance Policy 'Compliance2' zugewiesen, Datenträgerverschlüsselung nicht aktiviert, Status: non-compliant",
      "",
      "Mandantenweite Compliance-Einstellungen:",
      "- Mark devices with no compliance policy assigned as: Compliant",
      "- Require encryption on devices: Enabled",
      "- Compliance validity period (days): 30",
      "",
      "Es existiert eine Conditional Access Policy (Policy1), die:",
      "- auf User1 angewendet wird,",
      "- für Office 365 SharePoint Online gilt,",
      "- und beim Grant Access fordert: Device must be marked as compliant.",
      "",
      "Frage:",
      "Kann User1 auf SharePoint Online über Microsoft Edge von jedem der drei Geräte zugreifen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1: Yes, Device2: Yes, Device3: Yes" },
      { key: "B", text: "Device1: Yes, Device2: Yes, Device3: No" },
      { key: "C", text: "Device1: Yes, Device2: No, Device3: Yes" },
      { key: "D", text: "Device1: No, Device2: Yes, Device3: No" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Geräte ohne zugewiesene Compliance Policy werden durch die Einstellung 'Mark devices with no compliance policy assigned as compliant' als compliant behandelt. Daher ist Device1 compliant.",
      "Device2 erfüllt die Anforderungen der Policy 'Compliance1', insbesondere die aktivierte Datenträgerverschlüsselung. Es ist als compliant markiert.",
      "Device3 hat eine Policy, die Verschlüsselung verlangt, diese ist aber nicht aktiv. Daher ist Device3 non-compliant.",
      "Die Conditional Access Policy erlaubt nur den Zugriff für Geräte, die als compliant markiert sind. Folglich:",
      "- Device1: Zugriff erlaubt",
      "- Device2: Zugriff erlaubt",
      "- Device3: Zugriff blockiert.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
      "https://learn.microsoft.com/mem/intune/protect/conditional-access",
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started#compliance-policy-settings",
    ],
  },
  {
    id: "Q156",
    number: 157,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Azure Monitor: Data Collection Rule (DCR) Zuordnung",
      "",
      "Du hast ein Azure-Abonnement und ein lokales Windows 11-Gerät mit dem Namen Device1.",
      "Du planst, Device1 mit Azure Monitor zu überwachen und erstellst eine Data Collection Rule (DCR) mit dem Namen DCR1.",
      "",
      "Frage:",
      "Womit solltest du die Data Collection Rule DCR1 verknüpfen, damit Telemetriedaten von Device1 gesammelt werden?",
    ].join("\n"),

    options: [
      { key: "A", text: "Azure Network Watcher" },
      { key: "B", text: "Device1" },
      { key: "C", text: "Log Analytics Workspace" },
      {
        key: "D",
        text: "Monitored Object (generischer Container ohne Geräteziel)",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Eine Data Collection Rule (DCR) definiert, welche Daten gesammelt, wie sie optional transformiert und wohin sie gesendet werden.",
      "Ziel der DCR-Zuordnung ist immer ein konkretes Resource- oder Geräteobjekt, zum Beispiel ein Server, eine VM oder ein über Azure Arc eingebundenes Gerät.",
      "In diesem Szenario ist Device1 das zu überwachende Objekt. Die DCR1 muss daher direkt Device1 zugeordnet werden.",
      "Der Log Analytics Workspace wird als Destination innerhalb der DCR konfiguriert, ist aber nicht das Objekt, an das die DCR gebunden wird.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview",
    ],
  },
  {
    id: "Q157",
    number: 158,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Windows Update Ring Konfiguration in Intune",
      "",
      "Du hast ein Microsoft 365-Abonnement mit Microsoft Intune.",
      "Du möchtest einen Update Ring konfigurieren, der folgende Anforderungen erfüllt:",
      "",
      "- Quality Updates (Sicherheits- und Qualitätsupdates) können 14 Tage aufgeschoben werden und installieren sich 7 Tage nach Bereitstellung automatisch.",
      "- Feature Updates (Funktionsupdates) können 90 Tage aufgeschoben werden und installieren sich 10 Tage nach Bereitstellung automatisch.",
      "- Geräte müssen automatisch 3 Tage nach der Installation neu starten.",
      "",
      "Frage:",
      "Welche Konfiguration der Update Ring Einstellungen entspricht diesen Anforderungen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Feature update deferral: 30 Tage; Quality update deferral: 7 Tage; Deadline for feature updates: 5 Tage; Grace period: 1 Tag",
      },
      {
        key: "B",
        text: "Feature update deferral: 90 Tage; Quality update deferral: 14 Tage; Deadline for feature updates: 10 Tage; Grace period: 3 Tage",
      },
      {
        key: "C",
        text: "Feature update deferral: 120 Tage; Quality update deferral: 0 Tage; Deadline for feature updates: 10 Tage; Grace period: 7 Tage",
      },
      {
        key: "D",
        text: "Feature update deferral: 90 Tage; Quality update deferral: 14 Tage; Deadline for feature updates: 0 Tage; Grace period: 0 Tage",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Der Deferral-Period-Wert bestimmt, wie viele Tage nach Veröffentlichung ein Update zurückgehalten wird.",
      "Für Funktionsupdates ist ein Aufschub von 90 Tagen gefordert. Das entspricht 'Feature update deferral period (days) = 90'.",
      "Für Qualitätsupdates ist ein Aufschub von 14 Tagen gefordert. Das entspricht 'Quality update deferral period (days) = 14'.",
      "Die Deadline für Feature Updates legt fest, wie viele Tage nach Ablauf des Aufschubs das Update zwangsweise installiert wird. Gefordert sind 10 Tage, also 'Deadline for feature updates (days) = 10'.",
      "Die Grace Period legt fest, nach wie vielen Tagen nach der Installation ein Neustart erzwungen wird. Gefordert sind 3 Tage, also 'Grace period (days) = 3'.",
      "Damit erfüllt nur die Konfiguration aus Antwort B alle genannten Anforderungen.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-feature-updates",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-expedite-updates",
    ],
  },
  {
    id: "Q158",
    number: 159,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Erfassen von Ereignisprotokollen aus Domänencomputern in Azure",
      "",
      "Du verwaltest 1.000 Computer mit Windows 11, die Mitglieder einer lokalen Active Directory-Domäne sind.",
      "Du möchtest die Ereignisprotokolle dieser Computer in Azure erfassen, um sie zentral zu analysieren und zu überwachen.",
      "",
      "Frage:",
      "Welche Azure-Komponente solltest du bereitstellen und welche Aktion musst du auf den Computern durchführen, damit Ereignisprotokolle zentral in Azure erfasst werden?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Azure Storage Account bereitstellen und auf den Computern den Microsoft Monitoring Agent installieren",
      },
      {
        key: "B",
        text: "Azure Storage Account bereitstellen und auf den Computern eine Collector-initiated Subscription konfigurieren",
      },
      {
        key: "C",
        text: "Azure Cosmos DB bereitstellen und die Geräte bei Intune anmelden",
      },
      {
        key: "D",
        text: "Azure SQL Database bereitstellen und auf den Computern eine Collector-initiated Subscription konfigurieren",
      },
      {
        key: "E",
        text: "Log Analytics Workspace bereitstellen und die Geräte bei Azure AD registrieren",
      },
      {
        key: "F",
        text: "Log Analytics Workspace bereitstellen und auf den Computern den Microsoft Monitoring Agent installieren",
      },
    ],

    correctAnswers: ["F"],

    explanation: [
      "Für die zentrale Auswertung von Ereignisprotokollen in Azure wird Azure Monitor mit einem Log Analytics Workspace verwendet.",
      "Der Microsoft Monitoring Agent (bzw. Azure Monitor Agent) wird auf jedem Windows-Client installiert und sammelt Ereignisprotokolle und Leistungsdaten.",
      "Diese Daten werden über HTTPS (Port 443) an den konfigurierten Log Analytics Workspace gesendet.",
      "Daher ist die korrekte Kombination: Log Analytics Workspace bereitstellen und auf den Computern den Microsoft Monitoring Agent installieren.",
    ].join("\n"),
  },
  {
    id: "Q159",
    number: 160,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "SetupConfig.ini – PowerShell-Skript nach Feature-Update automatisch ausführen",
      "",
      "Computer1 verwendet Windows 11. Du hast ein PowerShell-Skript 'config.ps1' erstellt, das nach einem Feature-Update automatisch ausgeführt werden soll.",
      "",
      "Frage:",
      "Welche Datei auf Computer1 musst du anpassen, damit das Skript nach der Installation eines Feature-Updates automatisch ausgeführt wird?",
    ].join("\n"),

    options: [
      { key: "A", text: "LiteTouch.wsf" },
      { key: "B", text: "SetupConfig.ini" },
      { key: "C", text: "Unattend.bat" },
      { key: "D", text: "Unattend.xml" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Windows 10 und Windows 11 unterstützen die Datei SetupConfig.ini, um Setup-Parameter für Upgrades und Feature-Updates zu definieren.",
      "Über SetupConfig.ini können unter anderem PostOOBE-Aktionen angegeben werden, die nach Abschluss des Out-of-Box-Experiences ausgeführt werden.",
      "Mit einem Eintrag wie 'PostOOBE=C:\\Scripts\\config.ps1' in SetupConfig.ini wird sichergestellt, dass config.ps1 nach einem Feature-Update automatisch ausgeführt wird.",
      "LiteTouch.wsf gehört zu MDT, Unattend.bat ist kein Bestandteil moderner Setup-Pfade und Unattend.xml wird primär für vollständige unbeaufsichtigte Installationen genutzt, nicht gezielt für Post-Feature-Update-Skripte.",
    ].join("\n"),
  },
  {
    id: "Q160",
    number: 161,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Device Compliance Trends Report",
      "",
      "Du verwaltest 1.000 Geräte mit Microsoft Intune und möchtest Trends zur Geräte-Compliance über einen längeren Zeitraum analysieren.",
      "Im Intune Admin Center steht dir der Bericht 'Device compliance trends' zur Verfügung.",
      "",
      "Frage:",
      "Für welchen Zeitraum zeigt der Bericht 'Device compliance trends' die Verlaufsdaten an?",
    ].join("\n"),

    options: [
      { key: "A", text: "30 Tage" },
      { key: "B", text: "60 Tage" },
      { key: "C", text: "90 Tage" },
      { key: "D", text: "365 Tage" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Der Bericht 'Device compliance trends' im Intune Admin Center dient dazu, die Entwicklung der Geräte-Compliance über die letzten 60 Tage anzuzeigen.",
      "Damit können Administratoren Muster und Veränderungen der Compliance-Rate über einen Zeitraum von zwei Monaten analysieren.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },
  {
    id: "Q161",
    number: 162,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Microsoft 365 Defender Device Onboarding",
      "",
      "Du hast ein Microsoft 365 E5-Abonnement und möchtest die Microsoft 365 Defender Geräte-Onboarding-Funktion nutzen.",
      "Ziele sind:",
      "- Geräte anzeigen, die die Chromium-basierte Version von Microsoft Edge installiert haben.",
      "- Ein Onboarding-Paket für ein Windows-11-Gerät herunterladen.",
      "- Den administrativen Aufwand minimieren.",
      "",
      "Frage:",
      "Welche zwei Bereiche im Microsoft 365 Defender-Portal solltest du verwenden, um diese Anforderungen zu erfüllen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Incidents" },
      { key: "B", text: "Threat analytics" },
      { key: "C", text: "Vulnerability management" },
      { key: "D", text: "Advanced hunting" },
      { key: "E", text: "Reports" },
      { key: "F", text: "Settings" },
    ],

    correctAnswers: ["C", "F"],

    explanation: [
      "Über 'Vulnerability management' lässt sich die Software-Inventarisierung einsehen, unter anderem installierte Browser-Versionen wie Microsoft Edge (Chromium).",
      "Über 'Settings' im Microsoft 365 Defender-Portal gelangt man zu den Endpoint-Einstellungen, unter denen sich die Onboarding-Pakete für Windows 10/11 herunterladen lassen.",
      "Damit werden sowohl die Übersicht über Geräte mit Edge als auch das Onboarding mit minimalem Zusatzaufwand ermöglicht.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q162",
    number: 163,
    area: "Manage devices (30–35%)",
    difficulty: "medium",

    question: [
      "Android-Geräte in Intune mit Zero-Touch-Enrollment bereitstellen",
      "",
      "Dein Unternehmen verwaltet Android-Geräte über Microsoft Intune.",
      "Neue Geräte sollen beim ersten Einschalten automatisch Unternehmensrichtlinien und Apps erhalten, ohne manuelle Benutzereingriffe.",
      "Ziel ist die Bereitstellung über Zero-Touch Enrollment (ZTE).",
      "",
      "Frage:",
      "Welche Schritte sind erforderlich, um Zero-Touch-Enrollment für Android-Geräte mit Intune zu implementieren?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Nur ein Managed Google Play-Konto mit Intune verknüpfen; der Rest erfolgt automatisch ohne weitere Konfiguration.",
      },
      {
        key: "B",
        text: "Im Zero-Touch-Portal ein Konfigurationsprofil erstellen, Geräte über den Händler dem Zero-Touch-Konto zuordnen und beim ersten Start die manuelle Intune-App-Installation durch den Benutzer verlangen.",
      },
      {
        key: "C",
        text: "Managed Google Play-Konto mit Intune verknüpfen, im Zero-Touch-Portal eine Konfiguration erstellen, Geräte beim Händler mit ZTE-Fähigkeit registrieren und die automatische Intune-Registrierung beim ersten Start nutzen.",
      },
      {
        key: "D",
        text: "Nur Apple Business Manager und Apple Configurator einrichten, Zero-Touch wird für alle mobilen Plattformen gemeinsam dort verwaltet.",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Zero-Touch Enrollment ist eine Google-Technologie für die automatische Bereitstellung von Android-Geräten.",
      "Für den Einsatz mit Intune müssen:",
      "- Ein Managed Google Play-Konto mit Intune verknüpft werden.",
      "- Im Zero-Touch-Portal Konfigurationen angelegt werden, die unter anderem die Intune-Registrierung definieren.",
      "- Geräte beim autorisierten Händler mit dem Zero-Touch-Konto des Unternehmens (per IMEI oder Seriennummer) verknüpft werden.",
      "Beim ersten Start des Geräts lädt Android dann automatisch die angegebene Management-App und führt die Intune-Registrierung durch.",
      "Damit ist Antwort C die einzige Option, die den vollständigen Ablauf korrekt beschreibt.",
    ].join("\n"),
  },
  {
    id: "Q163",
    number: 164,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Ensure Intune Settings Override Group Policy",
      "",
      "Device1 ist ein Windows 11 Gerät, das:",
      "- Domänenmitglied (AD joined) ist,",
      "- bei Microsoft Intune registriert ist,",
      "- sowohl durch lokale Gruppenrichtlinien (GPO) als auch durch Intune-Richtlinien verwaltet wird.",
      "",
      "Du möchtest sicherstellen, dass bei Konflikten Intune-Einstellungen Vorrang vor Gruppenrichtlinien haben.",
      "",
      "Frage:",
      "Was solltest du konfigurieren, damit Intune-Einstellungen widersprüchliche Gruppenrichtlinien überschreiben?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Ein Device Configuration Profile in Intune, das den CSP 'ControlPolicyConflict' mit 'MDMWinsOverGP' setzt",
      },
      { key: "B", text: "Eine Device Compliance Policy" },
      { key: "C", text: "Ein MDM Security Baseline Profile" },
      {
        key: "D",
        text: "Ein zusätzliches Group Policy Object (GPO), das alle Werte auf 'Not Configured' setzt",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Der Policy-CSP 'ControlPolicyConflict' steuert, ob bei Konflikten zwischen MDM-Richtlinien und Gruppenrichtlinien die MDM-Seite oder die GPO-Seite gewinnt.",
      "Mit der Einstellung 'MDMWinsOverGP' wird festgelegt, dass Intune- (MDM-) Richtlinien Vorrang vor lokalen oder domänenbasierten Gruppenrichtlinien haben.",
      "Diese Einstellung wird typischerweise über ein Device Configuration Profile mit Settings Catalog in Intune konfiguriert.",
      "Compliance Policies, Security Baselines oder zusätzliche GPOs steuern die Konfliktauflösung nicht direkt.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q164",
    number: 165,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Migration von GPO-Einstellungen für Microsoft Office zu Intune",
      "",
      "Du hast eine lokale Active Directory-Domäne, die mit einem Microsoft Entra ID Tenant synchronisiert ist.",
      "Windows-11-Geräte sind hybrid Microsoft Entra joined und in Intune eingeschrieben.",
      "Microsoft Office-Einstellungen auf diesen Geräten werden aktuell über Group Policy Objects (GPOs) verwaltet.",
      "Du möchtest diese Office-GPO-Einstellungen nach Intune migrieren.",
      "",
      "Frage:",
      "Welche drei Aktionen solltest du in der richtigen Reihenfolge durchführen, um die Microsoft Office GPO-Einstellungen nach Intune zu migrieren?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Ein Security Baseline Profile für Office in Intune erstellen",
      },
      {
        key: "B",
        text: "Das Group Policy Analytics Tool in Intune verwenden, um GPOs zu analysieren",
      },
      {
        key: "C",
        text: "Die GPO-Einstellungen über Get-GPOReport als XML exportieren",
      },
      {
        key: "D",
        text: "Ein Custom OMA-URI-Profile in Intune erstellen",
      },
      {
        key: "E",
        text: "Ein Configuration Profile vom Typ Administrative Templates in Intune erstellen und die Office-Einstellungen nachbilden",
      },
    ],

    correctAnswers: ["B", "C", "E"],

    explanation: [
      "Zur Migration von Office-GPOs nach Intune wird zunächst das Group Policy Analytics Tool verwendet, um die vorhandenen GPOs zu analysieren und deren MDM-Kompatibilität zu prüfen.",
      "Dazu werden die relevanten GPOs per PowerShell (zum Beispiel mit Get-GPOReport -ReportType XML) exportiert und die erzeugten XML-Dateien im Group Policy Analytics Tool hochgeladen.",
      "Anschließend werden die als kompatibel identifizierten Einstellungen in Intune über ein Configuration Profile vom Typ Administrative Templates nachgebildet.",
      "Security Baselines und Custom OMA-URI-Profile sind für diesen konkreten Migrationspfad unnötig komplex oder ungeeignet.",
    ].join("\n"),
  },
  {
    id: "Q165",
    number: 166,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Upgrade von Windows 10 auf Windows 11 mit MDT",
      "",
      "Dein Unternehmen hat ein Active Directory Domain Services Netzwerk mit 100 Windows-10-Clients, jedoch keine bestehende Deployment-Infrastruktur.",
      "Es existiert ein Volumenlizenzvertrag für Windows 11. Ziel ist, alle Clients mit minimalem Lizenz- und Administrationsaufwand auf Windows 11 zu aktualisieren und eine saubere Deployment-Strategie aufzubauen.",
      "",
      "Frage:",
      "Welches Tool solltest du einsetzen, um die Computer mit minimalen Zusatzkosten und kontrolliertem Prozess auf Windows 11 zu aktualisieren?",
    ].join("\n"),

    options: [
      { key: "A", text: "Windows Autopilot" },
      {
        key: "B",
        text: "System Center Configuration Manager (Configuration Manager)",
      },
      { key: "C", text: "Subscription Activation" },
      { key: "D", text: "Microsoft Deployment Toolkit (MDT)" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Microsoft Deployment Toolkit (MDT) ist ein kostenloses Microsoft-Tool zur automatisierten Bereitstellung und zum Upgrade von Windows-Betriebssystemen.",
      "MDT kann sowohl In-Place-Upgrades als auch Neuinstallationen durchführen und ist ideal, wenn keine bestehende SCCM- oder Intune-Infrastruktur vorhanden ist.",
      "Windows Autopilot ist primär für die Bereitstellung neuer oder zurückgesetzter Geräte gedacht, nicht für Massen-Upgrades von bestehenden AD-Clients.",
      "Configuration Manager verursacht zusätzliche Lizenz- und Infrastrukturkosten und ist für 100 Clients oft überdimensioniert.",
      "Subscription Activation ermöglicht ein Edition-Upgrade (z. B. Pro zu Enterprise), aber kein Versionsupgrade von Windows 10 auf Windows 11.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q166",
    number: 167,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Entfernen eines Benutzers aus der lokalen Administratorgruppe über Intune",
      "",
      "Du verwaltest Windows-11-Geräte mit Microsoft Intune in einer Microsoft-365-Umgebung.",
      "Ein Benutzer User1 soll nicht mehr Mitglied der lokalen Administratorgruppe auf den verwalteten Geräten sein.",
      "",
      "Frage:",
      "Welche Intune-Richtlinie solltest du verwenden, um User1 automatisch aus der lokalen Administratorgruppe aller verwalteten Windows-Geräte zu entfernen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Eine Device Compliance Policy" },
      { key: "B", text: "Eine Account Protection Policy" },
      { key: "C", text: "Eine App Configuration Policy" },
      { key: "D", text: "Eine Attack Surface Reduction Policy" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "In Intune können lokale Benutzer- und Gruppenmitgliedschaften über Endpoint Security Account Protection Policies verwaltet werden.",
      "Mit einem Profil vom Typ Local User Group Membership für die Gruppe 'Administrators' kann festgelegt werden, welche Konten hinzugefügt oder entfernt werden.",
      "Über eine solche Account Protection Policy kann User1 automatisiert aus der lokalen Administratorgruppe entfernt werden.",
      "Compliance Policies bewerten nur den Gerätestatus; App Configuration und ASR-Policies steuern andere Bereiche und greifen nicht in lokale Gruppenmitgliedschaften ein.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q167",
    number: 168,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Verhalten von Windows Autopilot Reset",
      "",
      "Ein Benutzer arbeitet auf Computer1 mit Windows 11, der via Windows Autopilot bereitgestellt wurde.",
      "Der Benutzer:",
      "- erstellt eine VPN-Verbindung zum Firmennetzwerk,",
      "- installiert eine Microsoft Store App namens App1,",
      "- verbindet das Gerät mit einem Wi-Fi-Netzwerk.",
      "",
      "Ein Administrator führt anschließend auf dem Gerät einen Windows Autopilot Reset durch.",
      "",
      "Frage:",
      "In welchem Zustand befinden sich nach dem Autopilot Reset die Wi-Fi-Verbindung, App1 und die VPN-Verbindung, wenn der Benutzer sich erneut anmeldet?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Wi-Fi: entfernt; App1: beibehalten; VPN: beibehalten",
      },
      {
        key: "B",
        text: "Wi-Fi: beibehalten (Passphrase entfernt); App1: beibehalten; VPN: entfernt",
      },
      {
        key: "C",
        text: "Wi-Fi: beibehalten (Passphrase beibehalten); App1: entfernt; VPN: entfernt",
      },
      {
        key: "D",
        text: "Wi-Fi: entfernt; App1: entfernt; VPN: beibehalten",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Ein Windows Autopilot Reset setzt das Gerät in einen geschäftsbereiten Zustand zurück, ohne die Azure-AD- und Intune-Registrierung zu entfernen.",
      "Dabei werden Benutzerdateien, Benutzerapps und benutzerspezifische Konfigurationen entfernt.",
      "Wi-Fi-Konfigurationen inklusive Passphrase werden beibehalten, damit das Gerät sich nach dem Reset wieder mit dem Netzwerk verbinden kann.",
      "Benutzerinstallierte Store-Apps wie App1 werden entfernt. Unternehmens-Apps werden bei der erneuten Intune-Synchronisation neu installiert.",
      "Aus Sicherheitsgründen werden VPN-Profile und dazugehörige Anmeldeinformationen entfernt.",
      "Daher: Wi-Fi beibehalten (inklusive Passphrase), App1 entfernt, VPN entfernt.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/store-apps-microsoft",
      "https://learn.microsoft.com/autopilot/windows-autopilot",
    ],
  },
  {
    id: "Q168",
    number: 169,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Enrollment-Methoden für Windows 11 (ConfigMgr) und iOS BYOD",
      "",
      "Du hast eine Microsoft-365-Subscription und planst die Intune-Registrierung für zwei Gerätetypen:",
      "- Windows-11-Geräte, die derzeit über Configuration Manager (ConfigMgr) verwaltet werden.",
      "- iOS-Geräte im BYOD-Szenario, die den Benutzern gehören.",
      "",
      "Ziel ist, die Registrierung in Intune zu aktivieren, ohne Benutzer unnötig zu unterbrechen.",
      "",
      "Frage:",
      "Welche Enrollment-Methode sollte für jeden Gerätetyp verwendet werden?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Windows 11: Manual Enrollment; iOS: Device Enrollment (ADE)",
      },
      {
        key: "B",
        text: "Windows 11: Co-management mit ConfigMgr; iOS: User Enrollment",
      },
      {
        key: "C",
        text: "Windows 11: Windows Autopilot; iOS: Apple Configurator Enrollment",
      },
      {
        key: "D",
        text: "Windows 11: Nur Intune Enrollment ohne ConfigMgr; iOS: Full Device Enrollment (DEP/ADE)",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Für bestehende Windows-Clients, die bereits durch Configuration Manager verwaltet werden, ist Co-management der empfohlene Weg. Dabei werden die Geräte zusätzlich an Intune angebunden, ohne sie neu aufzusetzen.",
      "Co-management erlaubt, Workloads schrittweise von ConfigMgr zu Intune zu verschieben und minimiert Unterbrechungen für Benutzer.",
      "Für persönliche iOS-Geräte (BYOD) ist User Enrollment vorgesehen. Dabei wird ein geschützter Arbeitsbereich erzeugt, während persönliche Daten des Benutzers privat bleiben.",
      "Gerätebasierte Enrollment-Methoden wie ADE/DEP sind für firmeneigene iOS-Geräte gedacht, nicht für BYOD.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q169",
    number: 170,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Intune Update Rings – Test- und Produktionsverzögerung",
      "",
      "Ein Unternehmen hat 500 Windows-11-Computer, die über Microsoft Intune verwaltet werden.",
      "Anforderungen:",
      "- Updates sollen zuerst auf eine Testgruppe ausgerollt werden.",
      "- Die restlichen Geräte sollen 15 Tage später automatisch aktualisiert werden.",
      "- Es geht ausschließlich um monatliche Sicherheitsupdates (Quality Updates).",
      "",
      "Frage:",
      "Welche Konfiguration im Microsoft Endpoint Manager Admin Center sollte verwendet werden, um dieses Rolloutmodell umzusetzen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Zwei Windows Update Rings mit unterschiedlichen Deferral-Perioden konfigurieren",
      },
      {
        key: "B",
        text: "Ein Feature Update Profile für alle Geräte erstellen",
      },
      { key: "C", text: "Nur eine Device Configuration Policy verwenden" },
      { key: "D", text: "Eine Security Baseline für Updates verwenden" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Windows Update for Business wird in Intune über Update Rings für Windows 10 and later konfiguriert.",
      "Um ein Staged Rollout zu implementieren, erstellt man mindestens zwei Update Rings:",
      "- Ein Test-Ring mit Quality Update Deferral = 0 Tage für die Pilotgeräte.",
      "- Ein Produktions-Ring mit Quality Update Deferral = 15 Tage für die übrigen Geräte.",
      "Dadurch erhalten Testgeräte die Updates sofort, während Produktionsgeräte die gleichen Updates automatisch 15 Tage später erhalten.",
      "Feature Update Profiles steuern Versionssprünge, nicht monatliche Qualitätsupdates; Device Configuration und Security Baselines sind für diesen konkreten Anwendungsfall nicht ausreichend.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
      "https://learn.microsoft.com/mem/intune/protect/windows-10-expedite-updates",
    ],
  },
  {
    id: "Q170",
    number: 171,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Benutzer dürfen Microsoft Defender Antivirus nicht deaktivieren",
      "",
      "Du hast 500 Windows-11-Computer, die Azure AD joined sind und in Intune registriert sind.",
      "Du planst, Microsoft Defender Antivirus zentral zu verwalten und möchtest verhindern, dass Benutzer den Defender deaktivieren können.",
      "",
      "Frage:",
      "Was solltest du im Microsoft Intune Admin Center konfigurieren, um zu verhindern, dass Benutzer Microsoft Defender Antivirus deaktivieren?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Eine Conditional Access Policy im Entra Admin Center",
      },
      { key: "B", text: "Eine Security Baseline in Intune" },
      {
        key: "C",
        text: "Eine Attack Surface Reduction (ASR) Policy in Intune",
      },
      {
        key: "D",
        text: "Eine Antivirus Policy in Intune mit aktivierter Tamper Protection",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Ob Benutzer Defender-Einstellungen deaktivieren können, wird durch den Manipulationsschutz (Tamper Protection) gesteuert.",
      "Tamper Protection ist Teil von Microsoft Defender for Endpoint und kann über eine Antivirus Policy in Intune für Windows-Clients aktiviert werden.",
      "Mit aktivierter Tamper Protection sind zentrale Sicherheitseinstellungen wie Echtzeitschutz oder Cloudbasierter Schutz vor unerwünschten Änderungen durch lokale Administratoren oder Benutzer geschützt.",
      "Conditional Access, Security Baselines und ASR-Policies spielen zwar eine Rolle für Sicherheit und Angriffsflächen, verhindern aber nicht direkt das Abschalten von Defender durch Benutzer.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-antivirus-policy",
    ],
  },
  {
    id: "Q171",
    number: 172,
    area: "Manage applications (15–20%)",
    difficulty: "medium",

    question: [
      "Microsoft 365 Apps Deployment via Dynamic Device Groups",
      "",
      "Dein Unternehmen hat ein Azure-Abonnement mit mehreren Geräten.",
      "Es existieren dynamische Gerätegruppen (Dynamic Device Groups), die anhand von Eigenschaften wie Gerätebesitz (Company vs. Personal) gefüllt werden.",
      "Die Geräte sind in Intune registriert und du erstellst eine Microsoft 365 Apps for Windows 10/11 App, die an eine dynamische Gerätegruppe mit firmeneigenen Windows-Geräten zugewiesen wird.",
      "",
      "Drei Geräte sind relevant:",
      "- LT1: Firmengerät (Corporate-owned), Windows 10/11, erfüllt die Gruppenregel.",
      "- LT2: Persönliches Gerät (BYOD), erfüllt die Bedingung 'deviceOwnership = Company' nicht.",
      "- LT3: Gerät, das nicht Mitglied der zugewiesenen Gerätegruppe ist.",
      "",
      "Frage:",
      "Wird die Microsoft-365-Apps-Anwendung auf LT1, LT2 und LT3 installiert?",
    ].join("\n"),

    options: [
      { key: "A", text: "LT1: Yes, LT2: Yes, LT3: Yes" },
      { key: "B", text: "LT1: Yes, LT2: Yes, LT3: No" },
      { key: "C", text: "LT1: Yes, LT2: No, LT3: No" },
      { key: "D", text: "LT1: No, LT2: Yes, LT3: No" },
      { key: "E", text: "LT1: No, LT2: No, LT3: Yes" },
      { key: "F", text: "LT1: No, LT2: No, LT3: No" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Die Microsoft-365-Apps-Anwendung wird an eine dynamische Gerätegruppe zugewiesen, die nur firmeneigene Geräte (Company-owned) enthält.",
      "LT1 ist ein firmeneigenes Windows-Gerät und erfüllt die dynamische Gruppenregel, daher wird die App installiert.",
      "LT2 ist ein persönliches Gerät (BYOD) und erfüllt die Bedingung 'deviceOwnership = Company' nicht, daher ist es nicht Mitglied der Zielgruppe und erhält die App nicht.",
      "LT3 ist nicht Mitglied der dynamischen Gerätegruppe und erhält daher ebenfalls keine Zuweisung für die Microsoft-365-Apps-Anwendung.",
      "Damit wird die App nur auf LT1 installiert.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/apps-add-office365",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
    ],
  },
  {
    id: "Q172",
    number: 173,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Ein Unternehmen verwaltet alle Geräte mit Microsoft Intune in einem Microsoft 365-Tenant.",
      "",
      "Geräteübersicht:",
      "• Device1 ist in Group1 und wird als compliant angezeigt.",
      "• Device2 ist in keiner Gruppe und wird fälschlicherweise als compliant angezeigt.",
      "• Device3 ist in keiner Gruppe und wird fälschlicherweise als compliant angezeigt.",
      "",
      "Es gibt eine Compliance Policy Policy1, die nur Group1 zugewiesen ist.",
      "",
      "Du stellst fest, dass Geräte ohne zugewiesene Compliance Policy trotzdem als compliant angezeigt werden.",
      "",
      "Du musst sicherstellen, dass nur Geräte mit einer zugewiesenen Compliance Policy als compliant gelten und alle anderen Geräte automatisch als not compliant markiert werden.",
      "",
      "Was solltest du im Intune Admin Center konfigurieren?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "In Intune unter Device compliance die Actions for noncompliance konfigurieren",
      },
      {
        key: "B",
        text: "In Intune unter Device compliance die Compliance policy settings konfigurieren",
      },
      {
        key: "C",
        text: "Im Entra ID (Azure AD) Admin Center eine Conditional Access Policy erstellen",
      },
      {
        key: "D",
        text: "In Intune unter Device compliance die Diagnostic settings konfigurieren",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Standardmäßig markiert Intune Geräte ohne zugewiesene Compliance Policy als compliant. Dieses Verhalten wird über die mandantenweiten **Compliance policy settings** gesteuert.",
      "",
      "Im Intune Admin Center gehst du zu:",
      "Devices → Compliance policies → Compliance policy settings",
      "und änderst die Option **“Mark devices with no compliance policy assigned as”** von *Compliant* auf **Not compliant**.",
      "",
      "Damit gilt:",
      "• Nur Geräte, die tatsächlich mindestens eine Compliance Policy zugewiesen bekommen und die Anforderungen erfüllen, können als compliant angezeigt werden.",
      "• Alle anderen Geräte ohne Policy werden automatisch als **Not compliant** behandelt.",
      "",
      "**Warum die anderen Optionen nicht passen:**",
      "• **Actions for noncompliance** (A) steuert nur, was passiert, wenn ein Gerät bereits als noncompliant gilt (z. B. E-Mail-Benachrichtigung, Grace Period), ändert aber nicht den Standardstatus von Geräten ohne Policy.",
      "• **Conditional Access** (C) bewertet lediglich den von Intune gelieferten Compliancestatus und kann diesen nicht selbst festlegen.",
      "• **Diagnostic settings** (D) betreffen nur die Protokollierung und haben keinen Einfluss auf die Compliance-Logik.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },
  {
    id: "Q173",
    number: 174,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Du verwaltest 500 Windows 10-Computer, die in Microsoft Entra ID (Azure AD) eingebunden und in Microsoft Intune registriert sind.",
      "Du planst, Zertifikate über SCEP (Simple Certificate Enrollment Protocol) an die Geräte zu verteilen.",
      "",
      "Die Infrastruktur enthält folgende Server:",
      "• Server1: Intune Connector",
      "• Server2: Web Application Proxy",
      "• Server3: Subordinate CA (stellt Zertifikate aus, NDES-Integration)",
      "• Server4: Root CA",
      "",
      "Du erstellst in Intune ein SCEP-Zertifikatprofil und musst das erforderliche Root-Zertifikat angeben, dem die Geräte vertrauen sollen.",
      "",
      "Auf welchem Server befindet sich das Root-Zertifikat, das du im SCEP-Profil referenzieren musst?",
    ].join("\n"),

    options: [
      { key: "A", text: "Server1 – Intune Connector" },
      { key: "B", text: "Server2 – Web Application Proxy" },
      { key: "C", text: "Server3 – Subordinate CA" },
      { key: "D", text: "Server4 – Root CA" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Für SCEP-Zertifikate müssen die Geräte der Zertifizierungskette vertrauen. Dazu verteilst du in Intune ein Trusted Certificate Profile mit dem Root-CA-Zertifikat (und ggf. Intermediate-Zertifikaten).",
      "",
      "In der Praxis exportierst du das Root-Zertifikat häufig von der **Subordinate CA (Server3)** oder einem Client, der der Kette bereits vertraut – dort liegt die komplette Zertifikatskette vor. Dieses Root-Zertifikat (öffentlicher Teil, z. B. als .cer) wird dann in Intune hochgeladen und dem SCEP-Profil zugeordnet.",
      "",
      "• **Server3 (Subordinate CA)** stellt die eigentlichen Geräte-Zertifikate aus und verfügt über die Zertifikatskette inklusive Root-CA-Zertifikat im Zertifikatsspeicher, von wo aus du es exportierst.",
      "• **Server4 (Root CA)** ist zwar die Stammsignierende CA, wird aber oft offline oder besonders geschützt betrieben und nicht direkt mit Intune verknüpft.",
      "",
      "Deshalb ist in der typischen SCEP-/NDES-Topologie **Server3** der Server, von dem du das erforderliche Root-CA-Zertifikat exportierst, das in Intune als Trusted Root hinterlegt wird.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/certificates-configure",
    ],
  },
  {
    id: "Q174",
    number: 175,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Du hast ein Microsoft 365 E5-Abonnement mit Microsoft Intune.",
      "Es sollen nur bestimmte Geräteplattformen in Intune registriert werden dürfen:",
      "",
      "• Android-Geräte, die Android Enterprise Work Profile unterstützen.",
      "• iOS-Geräte, die mindestens iOS 11.0 ausführen.",
      "",
      "Du möchtest verhindern, dass ältere iOS-Versionen und klassische Android Device Administrator-Registrierungen verwendet werden.",
      "",
      "Welche zwei **Enrollment Restrictions** musst du in Intune anpassen, um diese Anforderungen umzusetzen? (Jede richtige Antwort ist ein Punkt.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Device limit restrictions – Maximum number of devices per user",
      },
      {
        key: "B",
        text: "Android Enterprise – Personally-owned work profile (BYOD) – Versions",
      },
      { key: "C", text: "Android device administrator – Platform" },
      { key: "D", text: "Windows – Versions" },
      { key: "E", text: "macOS – Versions" },
      { key: "F", text: "iOS/iPadOS – Versions" },
    ],

    correctAnswers: ["C", "F"],

    explanation: [
      "Die Steuerung, welche Geräte sich in Intune registrieren dürfen, erfolgt über **Enrollment Restrictions**. Es gibt dabei zwei relevante Dimensionen:",
      "• Plattformen (Android, iOS/iPadOS, Windows, macOS)",
      "• Betriebssystemversionen (Minimum/Maximum)",
      "",
      "Für die Anforderungen gilt:",
      "",
      "1) **Android – nur Work Profile unterstützen**:",
      "   Du blockierst den klassischen **Android device administrator**-Ansatz, sodass nur Android Enterprise (Work Profile) genutzt wird. Das erreichst du über:",
      "   → **Android device administrator – Platform** (C) und setzt diese Plattform bei Bedarf auf Block.",
      "",
      "2) **iOS – Mindestversion 11.0**:",
      "   Du setzt in den Device Type Restrictions für iOS/iPadOS eine Mindestversion:",
      "   → **iOS/iPadOS – Versions** (F) mit „Minimum OS version = 11.0“.",
      "",
      "Damit dürfen nur noch:",
      "• Android-Geräte, die als Android Enterprise (Work Profile) registriert werden.",
      "• iOS-Geräte mit Version 11.0 oder höher.",
      "",
      "**Andere Optionen:**",
      "• A, D, E steuern entweder Anzahl Geräte pro Benutzer oder Versionen anderer Plattformen.",
      "• B betrifft Versionen für Android Enterprise BYOD, ändert jedoch nicht die Blockierung von Android device administrator als Plattform.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/enrollment-restrictions-set",
      "https://learn.microsoft.com/mem/intune/enrollment/android-work-profile-enroll",
      "https://learn.microsoft.com/mem/intune/enrollment/android-enroll-device-administrator",
    ],
  },
  {
    id: "Q175",
    number: 176,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Du hast einen Hyper-V-Host mit mehreren virtuellen Maschinen, die aktuell Windows 10 ausführen.",
      "Die Konfiguration der VMs ist wie folgt:",
      "",
      "| VM  | Generation | Virtual TPM | Virtual Processors | Memory |",
      "| ---- | ---------- | ----------- | ------------------ | ------ |",
      "| VM1 | 2          | No          | 4                  | 16 GB  |",
      "| VM2 | 2          | Yes         | 2                  | 4 GB   |",
      "| VM3 | 2          | Yes         | 1                  | 8 GB   |",
      "",
      "Du möchtest die VMs auf Windows 11 aktualisieren.",
      "",
      "Welche VMs erfüllen die Mindestanforderungen von Windows 11 und können direkt auf Windows 11 aktualisiert werden?",
    ].join("\n"),

    options: [
      { key: "A", text: "VM1 und VM2" },
      { key: "B", text: "Nur VM2" },
      { key: "C", text: "VM2 und VM3" },
      { key: "D", text: "VM1, VM2 und VM3" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Windows 11 erfordert – auch in VMs – bestimmte Mindest-Hardwareanforderungen:",
      "• Generation 2 (UEFI, Secure Boot-fähig)",
      "• Mindestens 2 vCPUs",
      "• Mindestens 4 GB RAM",
      "• TPM 2.0 (in Hyper-V: vTPM)",
      "",
      "Bewertung der VMs:",
      "• **VM1**: Gen2, 4 vCPU, 16 GB RAM, aber **kein vTPM** → Anforderungen nicht erfüllt.",
      "• **VM2**: Gen2, vTPM = Yes, 2 vCPU, 4 GB RAM → erfüllt alle Anforderungen → **Windows 11-fähig**.",
      "• **VM3**: Gen2, vTPM = Yes, 8 GB RAM, aber nur **1 vCPU** → CPU-Anforderung nicht erfüllt.",
      "",
      "Daher kann nur **VM2** direkt auf Windows 11 aktualisiert werden.",
    ].join("\n"),
  },
  {
    id: "Q176",
    number: 177,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Dein Netzwerk enthält eine Active Directory-Domäne mit vier Windows-10-Computern:",
      "",
      "• Computer1: Windows Admin Center (WAC) ist installiert, Firewall erlaubt TCP 80, 443, 6516.",
      "• Computer2: Der Befehl Enable-PSRemoting wurde ausgeführt.",
      "• Computer3: Windows Defender Firewall erlaubt eingehenden WinRM-Verkehr.",
      "• Computer4: Der Befehl winrm quickconfig wurde ausgeführt.",
      "",
      "Du musst Windows Admin Center verwenden, um die Computer remote zu verwalten.",
      "",
      "Von welchem Computer aus kannst du dich mit dem Windows Admin Center verbinden,",
      "und welche Computer kannst du mit WAC verwalten?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Connect from: Computer1 only | Manage: Computer1 only",
      },
      {
        key: "B",
        text: "Connect from: Computer1 only | Manage: Computer1, Computer2, Computer3 und Computer4",
      },
      {
        key: "C",
        text: "Connect from: Computer1 und Computer2 | Manage: Computer1 und Computer2",
      },
      {
        key: "D",
        text: "Connect from: Computer1 und Computer3 | Manage: Computer1, Computer2 und Computer4",
      },
      {
        key: "E",
        text: "Connect from: alle vier Computer | Manage: Computer1 only",
      },
      {
        key: "F",
        text: "Connect from: alle vier Computer | Manage: Computer1 und Computer3 only",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Windows Admin Center (WAC) wird als Gateway-Dienst auf **Computer1** installiert und stellt eine Weboberfläche bereit, die per Browser aufgerufen wird.",
      "",
      "• Da WAC auf **Computer1** installiert ist und die benötigten Ports (80/443/6516) offen sind, kannst du dich **nur von Computer1** direkt mit der WAC-Webkonsole verbinden (bei einer reinen Client-Installation).",
      "• Die Verwaltung der anderen Computer erfolgt remote über **WinRM / PowerShell Remoting**.",
      "",
      "Die übrigen Computer sind wie folgt vorbereitet:",
      "• **Computer2**: Enable-PSRemoting ausgeführt → WinRM aktiviert.",
      "• **Computer3**: Firewall-Regel für WinRM aktiviert.",
      "• **Computer4**: winrm quickconfig ausgeführt → WinRM konfiguriert.",
      "",
      "Damit können **Computer1, Computer2, Computer3 und Computer4** über das Windows Admin Center von Computer1 aus verwaltet werden.",
      "",
      "Korrekte Kombination ist daher:",
      "• **Connect from**: Computer1 only",
      "• **Manage**: Computer1, Computer2, Computer3 und Computer4",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-antivirus-policy",
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-firewall-policy",
    ],
  },
  {
    id: "Q177",
    number: 178,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Du hast eine Microsoft 365 E5-Subscription und 100 nicht verwaltete iPad-Geräte.",
      "",
      "Du möchtest:",
      "• ein bestimmtes iOS/iPadOS-Update zentral auf die Geräte verteilen und",
      "• verhindern, dass Benutzer manuell eine **neuere** iOS-Version installieren.",
      "",
      "Welche zwei Aktionen musst du durchführen, um dies mit Intune umzusetzen? (Jede richtige Antwort ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Ein Device Configuration Profile erstellen, um iOS/iPadOS Softwareupdate-Richtlinien zu konfigurieren",
      },
      {
        key: "B",
        text: "Die Geräte über Apple Business Manager (ABM) per Automated Device Enrollment (ADE) in Intune einschreiben",
      },
      {
        key: "C",
        text: "Eine Compliance Policy erstellen, die die iOS-Version prüft",
      },
      {
        key: "D",
        text: "Ein iOS App Provisioning Profile erstellen",
      },
      {
        key: "E",
        text: "Die Geräte nur über die Intune Company Portal App als User-Enrolled Devices registrieren",
      },
    ],

    correctAnswers: ["A", "B"],

    explanation: [
      "Um iOS-/iPadOS-Updates kontrolliert zu verteilen und Benutzer daran zu hindern, eine neuere Version manuell zu installieren, müssen die Geräte **supervised** sein und über Update-Richtlinien gesteuert werden.",
      "",
      "Dazu sind zwei Schritte erforderlich:",
      "",
      "1) **Enrollment über Apple Business Manager (ABM)** (B):",
      "   • Nur Geräte, die per **Automated Device Enrollment (ADE)** über ABM in Intune eingeschrieben werden, sind supervised.",
      "   • Nur supervised-Geräte unterstützen die vollständige Update-Steuerung.",
      "",
      "2) **Device Configuration Profile / Software Update Policy** (A):",
      "   • In Intune erstellst du ein iOS/iPadOS **Device Configuration Profile** bzw. eine **Software update policy**,",
      "     das eine Zielversion definiert und manuelle Updates blockiert oder verzögert.",
      "",
      "Damit kannst du:",
      "• eine konkrete iOS-Version auf alle Geräte ausrollen und",
      "• verhindern, dass Benutzer eigenständig auf eine höhere Version aktualisieren.",
      "",
      "**Warum die anderen Optionen nicht ausreichen:**",
      "• **Compliance Policy (C)** prüft nur, ob die Version konform ist, verhindert aber keine Updates.",
      "• **iOS App Provisioning Profile (D)** betrifft App-Verteilung, nicht OS-Updates.",
      "• **Company Portal (E)** führt zu User Enrollment ohne Supervision und bietet nicht die nötige OS-Update-Kontrolle.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q178",
    number: 179,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "Du verwendest Microsoft Deployment Toolkit (MDT), um Windows-Deployments zu verwalten.",
      "Im Deployment Share stehen folgende Betriebssystemimages zur Verfügung:",
      "",
      "• Image1.wim – benutzerdefiniertes Windows 11-Image mit vorinstallierten Apps",
      "• Image2.wim – benutzerdefiniertes Windows 11-Image ohne Apps",
      "• Install.wim – Standard-Windows-11-Image aus der Microsoft-ISO",
      "",
      "Du musst mehrere Computer von Windows 10 per **In-Place Upgrade** auf Windows 11 aktualisieren und dabei den administrativen Aufwand möglichst gering halten.",
      "",
      "Welche Kombination aus Task-Sequence-Template und Betriebssystemimage solltest du in MDT verwenden?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Template: Standard Client Task Sequence | Image: Image1.wim",
      },
      {
        key: "B",
        text: "Template: Standard Client Upgrade Task Sequence | Image: Install.wim",
      },
      {
        key: "C",
        text: "Template: Standard Client Task Sequence | Image: Install.wim",
      },
      {
        key: "D",
        text: "Template: Standard Client Upgrade Task Sequence | Image: Image2.wim",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Ein **In-Place Upgrade** aktualisiert ein bestehendes Windows-System auf eine neue Version, ohne Benutzerprofile, Daten oder Anwendungen zu löschen.",
      "",
      "In MDT ist dafür speziell vorgesehen:",
      "• das Template **Standard Client Upgrade Task Sequence**",
      "• in Kombination mit einem **Standard-Installationsimage (Install.wim)** aus der originalen Microsoft-ISO.",
      "",
      "Die benutzerdefinierten Images (Image1.wim, Image2.wim) sind typischerweise für Neuinstallationen (Bare-Metal/Refresh) geeignet, enthalten aber nicht unbedingt alle Komponenten und Setup-Logik, die ein generisches Upgrade unterstützt.",
      "",
      "Daher ist die korrekte Kombination:",
      "→ **Template: Standard Client Upgrade Task Sequence**",
      "→ **Operating system image: Install.wim**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q179",
    number: 180,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "Du hast einen Workgroup-Computer namens Client1 mit Windows 11.",
      "Der Computer ist mit einem öffentlichen Netzwerk verbunden.",
      "",
      "Du möchtest PowerShell-Remoting auf Client1 aktivieren, aber nur Verbindungen aus dem **lokalen Subnetz** zulassen.",
      "",
      "Welchen PowerShell-Befehl solltest du ausführen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Set-PSSessionConfiguration -AccessMode Local" },
      { key: "B", text: "Enable-PSRemoting -SkipNetworkProfileCheck" },
      { key: "C", text: "Enable-PSRemoting -Force" },
      {
        key: "D",
        text: 'Set-NetFirewallRule -Name "WINRM-HTTP-In-TCP-PUBLIC" -RemoteAddress Any',
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "`Enable-PSRemoting` aktiviert WinRM und konfiguriert Firewall-Regeln, damit der Computer Remote-PowerShell-Befehle empfangen kann.",
      "",
      "Auf Clients mit **öffentlichem Netzwerkprofil** verweigert `Enable-PSRemoting` standardmäßig die Konfiguration, um Sicherheitsrisiken zu vermeiden.",
      "",
      "Mit dem Parameter **`-SkipNetworkProfileCheck`**:",
      "• wird die Profilprüfung übersprungen,",
      "• WinRM wird dennoch aktiviert und",
      "• die Firewall-Regel so gesetzt, dass nur Verbindungen aus dem **lokalen Subnetz** erlaubt sind (RemoteAddress = LocalSubnet).",
      "",
      "Andere Optionen:",
      "• `-Force` (C) unterdrückt Nachfragen, ändert aber nicht das Verhalten gegenüber öffentlichen Netzwerken.",
      "• `Set-PSSessionConfiguration -AccessMode Local` (A) beschränkt auf lokale Sitzungen – keine Remotezugriffe.",
      "• `Set-NetFirewallRule ... -RemoteAddress Any` (D) würde alle Remoteadressen zulassen und ist sicherheitstechnisch nicht gewünscht.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/enrollment/"],
  },
  {
    id: "Q180",
    number: 181,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Du verwaltest 1.000 Windows-10-Computer, die alle in Microsoft Intune registriert sind.",
      "Die Servicing-Channel-Einstellungen (Update-Ringe) werden über Intune konfiguriert.",
      "",
      "Du musst den **Servicing-Status eines bestimmten Geräts** prüfen, also sehen, wie der Update-Ring auf dieses Gerät angewendet wurde und ob Updates erfolgreich sind.",
      "",
      "Wo im Intune Admin Center kannst du diese Information abrufen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Unter Reports den Bericht „Device configuration“ anzeigen",
      },
      {
        key: "B",
        text: "Unter Windows devices die Ansicht „Per update ring deployment state“ nutzen",
      },
      {
        key: "C",
        text: "Unter Windows devices die Compliance policies des Geräts anzeigen",
      },
      {
        key: "D",
        text: "Unter Reports den Bericht „Device compliance“ anzeigen",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Für Windows-Update-Ringe stellt Intune spezielle Auswertungen bereit.",
      "",
      "Im Intune Admin Center gehst du zu:",
      "Devices → Windows → Update rings for Windows 10 and later → <dein Update-Ring> → Per update ring deployment state.",
      "",
      "Dort siehst du pro Gerät:",
      "• ob der Ring angewendet wurde,",
      "• den aktuellen Update-Status,",
      "• etwaige Fehler oder ausstehende Neustarts.",
      "",
      "Die anderen Bereiche:",
      "• **Device configuration** (A) zeigt nur Konfigurationsprofile, nicht den Patch-Servicing-Status.",
      "• **Compliance policies** (C, D) beziehen sich auf die Compliancestatus, nicht auf den detaillierten Update-Rollout pro Ring.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q181",
    number: 182,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Dein Netzwerk enthält eine mit Microsoft Entra ID synchronisierte Active Directory-Domäne.",
      "Es gibt 500 domain-joined Windows-11-Computer, die alle in Microsoft Intune registriert sind.",
      "Du planst, **Microsoft Defender Exploit Guard** bereitzustellen und eine benutzerdefinierte Exploit-Guard-Policy auf alle Computer auszurollen.",
      "",
      "Du musst:",
      "1) Die Exploit-Guard-Einstellungen zentral konfigurieren.",
      "2) Die Policy über Intune an alle Windows-11-Computer verteilen.",
      "",
      "Welche Kombination aus Tool und Verteilungsmethode solltest du verwenden?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Tool: Microsoft 365 Defender-Portal | Distribution: Attack Surface Reduction (ASR) Policy",
      },
      {
        key: "B",
        text: "Tool: Microsoft Purview compliance portal | Distribution: Device configuration profile (Device restrictions)",
      },
      {
        key: "C",
        text: "Tool: Windows Security App auf einem Referenzgerät | Distribution: Security baseline",
      },
      {
        key: "D",
        text: "Tool: Microsoft Intune admin center | Distribution: Endpoint Protection configuration profile",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Microsoft Defender Exploit Guard ist Teil von Microsoft Defender und kann über Intune auf verwalteten Windows-Geräten konfiguriert und verteilt werden.",
      "",
      "Dazu verwendest du:",
      "• das **Microsoft Intune admin center**, um die Richtlinie zu erstellen, und",
      "• ein **Endpoint Protection configuration profile**, um Defender-/Exploit-Guard-Einstellungen zu verteilen.",
      "",
      "Pfad in Intune:",
      "Endpoint security → Endpoint protection → Create policy → Plattform: Windows 10 and later.",
      "Dort findest du u. a. Konfigurationen für:",
      "• Exploit protection",
      "• Attack surface reduction (ASR) rules",
      "• Network protection",
      "• Controlled folder access",
      "",
      "Andere Optionen passen nicht:",
      "• Das **Defender-Portal** kann zwar Richtlinien anzeigen, aber für MDM-Deployment in dieser Umgebung wird Intune verwendet.",
      "• **Purview** ist für Compliance-/DLP-Szenarien zuständig, nicht für Exploit Guard.",
      "• Security baselines enthalten nur vordefinierte Einstellungen und sind kein Ersatz für eine benutzerdefinierte Exploit-Guard-Policy.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q182",
    number: 183,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Dein Unternehmen verfügt über einen Microsoft 365 E5-Tenant.",
      "Alle Geräte sind in Microsoft Intune registriert.",
      "",
      "Du möchtest **erweiterte, benutzerdefinierte Reports** mit eigenen Abfragen und Visualisierungen",
      "auf Basis von Rohdaten aus Intune erstellen (z. B. per KQL, Workbooks, Power BI).",
      "",
      "Welche drei Aktionen solltest du in der richtigen Reihenfolge ausführen?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "1) Intune diagnostic settings konfigurieren, 2) Intune mit Log Analytics verknüpfen, 3) Power BI mit dem Intune Data Warehouse verbinden",
      },
      {
        key: "B",
        text: "1) Einen Azure Log Analytics workspace erstellen, 2) Intune mit diesem Workspace verknüpfen, 3) Intune diagnostic settings konfigurieren, um Daten zu exportieren",
      },
      {
        key: "C",
        text: "1) Endpoint analytics aktivieren, 2) Intune Data Warehouse nutzen, 3) Power BI mit dem Data Warehouse verbinden",
      },
      {
        key: "D",
        text: "1) Intune Data Warehouse mit Log Analytics verknüpfen, 2) Ein Workbook in Azure Monitor erstellen, 3) Power BI direkt an den Workspace anbinden",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Um Rohdaten aus Intune für **benutzerdefinierte Abfragen und Visualisierungen** in Azure Monitor / Log Analytics zu nutzen, gehst du wie folgt vor:",
      "",
      "1) **Azure Log Analytics workspace erstellen**:",
      "   • Der Workspace ist der zentrale Speicherort für Logdaten.",
      "",
      "2) **Intune mit diesem Log Analytics workspace verknüpfen**:",
      "   • In Intune richtest du **Diagnostic settings** so ein, dass Intune-Daten an den Log Analytics workspace gesendet werden.",
      "   • Technisch gesehen erstellst du in Azure die Diagnostic Settings für den Intune-Ressourcentyp und wählst den Workspace als Ziel.",
      "",
      "3) **Auf Basis des Workspaces Reports erstellen**:",
      "   • Du verwendest KQL-Abfragen im Log Analytics workspace oder erstellst Workbooks.",
      "   • Optional bindest du Power BI an den Workspace an.",
      "",
      "Die Antwortvariante B bildet diese Reihenfolge korrekt ab:",
      "1) Workspace erstellen",
      "2) Intune an den Workspace anbinden",
      "3) Diagnostic Settings konfigurieren (bzw. konkret den Export einrichten).",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q183",
    number: 184,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Du betreibst ein Microsoft Deployment Toolkit (MDT) Deployment Share unter D:\\MDTShare.",
      "Du möchtest ein Feature Pack (z. B. WinPE-PowerShell oder .NET Framework) in das MDT-Bootimage (Windows PE) integrieren.",
      "",
      "Welche drei Aktionen musst du in der richtigen Reihenfolge ausführen, damit das Feature Pack im Bootimage verfügbar ist?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "1) Das Feature Pack in den Ordner D:\\MDTShare\\Out-of-Box Drivers kopieren, 2) Eine neue Task Sequence erstellen, 3) Deployment Share aktualisieren",
      },
      {
        key: "B",
        text: "1) Ein Selection Profile erstellen, 2) Dieses dem Boot Image zuweisen, 3) Deployment Share aktualisieren",
      },
      {
        key: "C",
        text: "1) Das Feature Pack in den Ordner D:\\MDTShare\\Packages kopieren, 2) Windows PE Properties ändern, 3) Deployment Share aktualisieren",
      },
      {
        key: "D",
        text: "1) Das Feature Pack in D:\\MDTShare\\Tools\\(x86/x64) kopieren, 2) Die Windows PE Properties des Deployment Shares anpassen, 3) Den Deployment Share aktualisieren",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "WinPE-Feature Packs (z. B. WinPE-PowerShell, .NET, HTA) werden über MDT wie folgt in das Bootimage eingebunden:",
      "",
      "1) **Feature Pack in den Tools-Ordner kopieren**:",
      "   • Für x64 nach: D:\\MDTShare\\Tools\\x64",
      "   • Für x86 nach: D:\\MDTShare\\Tools\\x86",
      "",
      "2) **Windows PE Properties anpassen**:",
      "   • Deployment Workbench → Deployment Share (D:\\MDTShare) → Properties → Tab „Windows PE“ → „Features“",
      "   • Dort die gewünschten Komponenten (z. B. Windows PowerShell, WinPE-NetFX, Storage cmdlets) aktivieren.",
      "",
      "3) **Deployment Share aktualisieren**:",
      "   • Rechtsklick auf den Deployment Share → Update Deployment Share.",
      "   • MDT erstellt neue Boot-Images (LiteTouchPE_x86/64.wim) mit den integrierten Komponenten.",
      "",
      "Genau diese Reihenfolge bildet Option D ab.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q184",
    number: 185,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "Du planst, Windows 11 auf 200 neuen Computern mit Microsoft Deployment Toolkit (MDT) und Windows Deployment Services (WDS) zu installieren.",
      "Das Unternehmen besitzt ein Volume Licensing Agreement und verwendet einen zentralen Product Key (MAK oder KMS) für Windows 11.",
      "",
      "Die neuen Computer sollen während der Installation automatisch den richtigen Produktschlüssel erhalten, ohne dass der Administrator ihn manuell eingeben muss.",
      "",
      "Was musst du in MDT konfigurieren?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Den Product Key in einer MDT Task Sequence konfigurieren",
      },
      { key: "B", text: "Den Product Key in der Bootstrap.ini hinterlegen" },
      {
        key: "C",
        text: "Den Product Key in WDS als Standard-Key konfigurieren",
      },
      {
        key: "D",
        text: "Den Product Key manuell in der Unattend.xml auf jedem Client eintragen",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "In MDT werden alle Einstellungen für das Betriebssystem-Deployment über die **Task Sequence** und die dazugehörigen Unattend-Vorlagen gesteuert.",
      "",
      "Du kannst den Volume License Product Key direkt in der Task Sequence hinterlegen:",
      "• Task Sequence → Properties → OS Info → Edit Unattend.xml oder",
      "• im Dialogfeld „Product Key“ der Task Sequence.",
      "",
      "MDT generiert daraus während des Deployments die passende Unattend.xml und übergibt den Schlüssel an Windows Setup.",
      "",
      "Alternative Methoden (Bootstrap.ini, WDS) sind für Dinge wie Verbindungsinformationen oder PXE-Boot zuständig, aber nicht der primäre Ort für die automatisierte Lizenzierung im MDT-Kontext.",
      "",
      "Daher ist die korrekte Antwort: **Produkt-Key in einer MDT Task Sequence konfigurieren.**",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q185",
    number: 186,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Du verwendest Windows Autopilot und Microsoft Intune, um Windows-11-Geräte bereitzustellen.",
      "",
      "Während der Bereitstellung sollen folgende Anforderungen erfüllt sein:",
      "• Der Benutzer soll den **Fortschritt** der App- und Profilinstallation sehen können.",
      "• Die Benutzeranmeldung soll **so lange blockiert** werden, bis alle zugewiesenen Apps und Profile erfolgreich installiert sind.",
      "",
      "Welche Intune-Funktion musst du konfigurieren, um diese Anforderungen zu erfüllen?",
    ].join("\n"),

    options: [
      { key: "A", text: "Eine App configuration policy" },
      { key: "B", text: "Eine Compliance policy mit App-Abhängigkeiten" },
      { key: "C", text: "Eine Device platform enrollment restriction" },
      { key: "D", text: "Eine Enrollment Status Page (ESP)" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Die **Enrollment Status Page (ESP)** in Intune wird während der Windows-Autopilot-Bereitstellung angezeigt.",
      "Sie zeigt den Fortschritt bei der Anwendung von:",
      "• Konfigurationsprofilen",
      "• Apps",
      "• Skripten",
      "und kann die Nutzung des Geräts blockieren, bis alle erforderlichen Zuweisungen abgeschlossen sind.",
      "",
      "In der ESP-Konfiguration kannst du u. a. einstellen:",
      "• „Show app and profile installation progress“ = Yes",
      "• „Block device use until all apps and profiles are installed“ = Yes",
      "",
      "Damit werden beide Anforderungen erfüllt:",
      "• Sichtbarer Installationsfortschritt",
      "• Blockierung der Anmeldung, bis das Gerät vollständig konfiguriert ist.",
      "",
      "Andere Richtlinientypen (App configuration, Compliance, Enrollment restrictions) bieten diese OOBE-Blocking-Funktion nicht.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/autopilot/windows-autopilot"],
  },
  {
    id: "Q186",
    number: 187,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Du verwaltest eine Microsoft-365-Umgebung mit Microsoft Intune.",
      "",
      "Anforderungen:",
      "1) Nur Geräte mit **genehmigten Plattformen und OS-Versionen** sollen sich in Intune registrieren dürfen.",
      "2) Während der Registrierung sollen Benutzer eine **Kategorie** auswählen (z. B. Vertrieb, IT, Management),",
      "   und basierend auf dieser Auswahl sollen die Geräte automatisch den passenden Azure-AD-Gruppen beitreten.",
      "",
      "Welche beiden Intune-Funktionen musst du konfigurieren, um diese Anforderungen zu erfüllen? (Jede richtige Antwort ist einen Punkt wert.)",
    ].join("\n"),

    options: [
      { key: "A", text: "Configuration profiles" },
      { key: "B", text: "Compliance policies" },
      { key: "C", text: "Enrollment restrictions" },
      { key: "D", text: "App protection policies" },
      { key: "E", text: "Device categories" },
    ],

    correctAnswers: ["C", "E"],

    explanation: [
      "1) **Nur genehmigte Plattformen und Versionen zulassen**:",
      "   • Dies steuerst du mit **Enrollment restrictions** (C).",
      "   • Dort kannst du Plattformen (Android, iOS, Windows, macOS) erlauben/blockieren und Mindestversionen definieren.",
      "",
      "2) **Geräte basierend auf einer Benutzerauswahl automatisch Gruppen zuordnen**:",
      "   • Dafür verwendest du **Device categories** (E).",
      "   • Benutzer wählen bei der Registrierung eine Kategorie (z. B. „Sales“, „IT“).",
      "   • Du kannst diese Kategorien mit dynamischen Azure-AD-Gruppen verknüpfen und so Zuweisungen (Apps, Policies) steuern.",
      "",
      "Andere Optionen:",
      "• Configuration profiles (A) und Compliance policies (B) konfigurieren Einstellungen oder prüfen Konformität, steuern aber nicht, ob sich Geräte überhaupt registrieren dürfen.",
      "• App protection policies (D) schützen Apps/Daten, haben nichts mit Enrollment- oder Gruppenbeitrittslogik zu tun.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q187",
    number: 188,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Du verwaltest einen in Intune registrierten Windows-11-Computer namens Computer1.",
      "",
      "Computer1 soll als **öffentliche Workstation** in einer Filiale dienen und ausschließlich eine einzige, kundenorientierte Anwendung im **Vollbildmodus** ausführen.",
      "Benutzer sollen keinen Zugriff auf Desktop, Startmenü oder andere Apps haben.",
      "",
      "Welchen Konfigurationstemplate-Typ solltest du im Intune Admin Center verwenden, um Computer1 entsprechend zu konfigurieren?",
    ].join("\n"),

    options: [
      { key: "A", text: "Shared multi-user device" },
      { key: "B", text: "Device restrictions" },
      { key: "C", text: "Kiosk" },
      { key: "D", text: "Endpoint protection" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Für Szenarien, in denen ein Windows-Gerät nur eine oder wenige Apps (z. B. Kasse, Info-Terminal, Kunden-App) ausführen soll, ist der **Kiosk-Modus** vorgesehen.",
      "",
      "In Intune erstellst du dazu ein Konfigurationsprofil:",
      "Devices → Configuration profiles → Create profile → Plattform: Windows 10 and later → Template: **Kiosk**.",
      "",
      "Dort kannst du:",
      "• Single-app oder multi-app Kiosk konfigurieren,",
      "• festlegen, welche App im Vollbild gestartet wird,",
      "• das Kiosk-Konto definieren.",
      "",
      "Andere Templates:",
      "• **Shared multi-user device**: für gemeinsam genutzte Geräte (z. B. Schichtbetrieb), aber kein Single-App-Lockdown.",
      "• **Device restrictions**: kann zwar viele Funktionen sperren, aber nicht so komfortabel einen Kiosk-Single-App-Modus abbilden.",
      "• **Endpoint protection**: für Sicherheits-/Defender-Einstellungen, nicht für Kiosk-Szenarien.",
    ].join("\n"),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q188",
    number: 189,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Du verwaltest ein MDT Deployment Share DS1 mit folgender Treiberstruktur:",
      "",
      "Out-of-Box Drivers",
      "└── Windows 10 x64",
      "    ├── Dell",
      "    │   └── Latitude 5520",
      "    ├── HP",
      "    │   └── EliteBook 850",
      "    └── Lenovo",
      "        └── ThinkPad T14",
      "",
      "Ziel ist, dass während der Bereitstellung automatisch alle Treiber installiert werden,",
      "die zum **Hersteller und Modell** des jeweiligen Computers passen –",
      "ohne Plug-and-Play-Erkennung und ohne Selection Profiles.",
      "",
      "In welcher Phase der MDT-Tasksequenz und mit welcher Aktion solltest du das konfigurieren?",
    ].join("\n"),

    options: [
      { key: "A", text: "Phase: Install | Task: Inject Drivers" },
      { key: "B", text: "Phase: Install | Task: Set Task Sequence Variable" },
      {
        key: "C",
        text: "Phase: Preinstall | Task: Set Task Sequence Variable",
      },
      { key: "D", text: "Phase: Preinstall | Task: Validate" },
      {
        key: "E",
        text: "Phase: Validation | Task: Set Task Sequence Variable",
      },
      { key: "F", text: "Phase: Validation | Task: Inject Drivers" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "MDT kann Treiber anhand von **Hersteller (Make) und Modell (Model)** dynamisch zuordnen,",
      "wenn du vor dem Schritt „Inject Drivers“ die Variable **DriverGroup001** setzt.",
      "",
      "Typische Konfiguration in der Task Sequence:",
      "• Phase: **Preinstall**",
      "• Task: **Set Task Sequence Variable**",
      "• Variable: DriverGroup001",
      "• Wert: z. B. `Windows 10 x64\\%Make%\\%Model%`",
      "",
      "Dabei stehen `%Make%` und `%Model%` für vom Client ausgelesene Hardwareinformationen.",
      "MDT sucht zur Laufzeit im passenden Unterordner (z. B. Windows 10 x64\\Dell\\Latitude 5520).",
      "",
      "Der eigentliche Schritt „Inject Drivers“ bleibt zwar in der Install-Phase, aber *die Steuerung*, welcher Ordner verwendet wird, wird in der **Preinstall-Phase** über **Set Task Sequence Variable** vorgenommen.",
      "",
      "Daher ist die richtige Kombination:",
      "• Phase: **Preinstall**",
      "• Task: **Set Task Sequence Variable**.",
    ].join("\n"),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q189",
    number: 190,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You use Microsoft Deployment Toolkit (MDT) to deploy Windows 11.",
      "",
      "You must configure the deployment share so that:",
      "• The technician who starts the installation is prompted to enter the local Administrator password.",
      "• A computer-naming rule is applied automatically during deployment.",
      "",
      "You must NOT replace or regenerate the existing WinPE boot image.",
      "",
      "Which MDT configuration file should you modify for each requirement?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Administrator password: CustomSettings.ini | Computer names: CustomSettings.ini",
      },
      {
        key: "B",
        text: "Administrator password: Bootstrap.ini | Computer names: CustomSettings.ini",
      },
      {
        key: "C",
        text: "Administrator password: Bootstrap.ini | Computer names: Bootstrap.ini",
      },
      {
        key: "D",
        text: "Administrator password: Unattend.xml | Computer names: CustomSettings.ini",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "In MDT werden sowohl die Admin-Passwortabfrage (SkipAdminPassword / AdminPassword) als auch die automatische Computerbenennung (OSDComputerName) über die Regeln in der CustomSettings.ini gesteuert.",
      "Bootstrap.ini definiert nur den Zugriff auf die Deployment-Share (DeployRoot, UserID usw.) und ist für diese Anforderungen nicht zuständig.",
      "Da die Regeln zur Laufzeit eingelesen werden, muss das WinPE-Image nicht neu erzeugt werden.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q190",
    number: 191,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft 365 subscription with 1,000 Windows 11 devices enrolled in Microsoft Intune.",
      "",
      "You plan to create a compliance policy that must:",
      "• Require Secure Boot to be enabled on the device.",
      "• Require the device to be at or under the Microsoft Defender for Endpoint machine risk score.",
      "",
      "Which two compliance settings should you configure?",
    ].join("\n"),

    options: [
      { key: "A", text: "Custom compliance" },
      { key: "B", text: "Device health" },
      { key: "C", text: "Device properties" },
      { key: "D", text: "Configuration Manager compliance" },
      { key: "E", text: "System security" },
      { key: "F", text: "Microsoft Defender for Endpoint" },
    ],

    correctAnswers: ["B", "F"],

    explanation: [
      "Die Anforderung ‚Secure Boot erforderlich‘ wird in einer Intune-Compliance-Richtlinie im Abschnitt Device health konfiguriert.",
      "Die Bewertung anhand des Geräte-Risikoscores stammt aus Microsoft Defender for Endpoint und wird im Abschnitt Microsoft Defender for Endpoint der Compliance-Richtlinie aktiviert.",
      "Andere Bereiche wie Device properties oder System security decken diese beiden Anforderungen nicht ab.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },
  {
    id: "Q191",
    number: 192,
    area: "Manage identity and access (25–30%)",
    difficulty: "easy",

    question: [
      "Your on-premises network contains an Active Directory domain and 25 domain-joined Windows 11 computers.",
      "You have a Microsoft 365 subscription with a Microsoft Entra ID tenant that is synchronized with the on-premises domain.",
      "",
      "You configure Microsoft Entra hybrid join for the domain.",
      "Several of the Windows 11 devices show a join status of Pending in Microsoft Entra ID.",
      "",
      "You need to ensure that the devices can successfully complete the hybrid join process.",
      "What must you ensure?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Each computer has a line of sight to a domain controller.",
      },
      {
        key: "B",
        text: "Each computer is enrolled in Microsoft Intune before the hybrid join.",
      },
      {
        key: "C",
        text: "Each computer is configured for Windows Hello for Business.",
      },
      {
        key: "D",
        text: "Each computer has a device certificate issued by an enterprise CA.",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Für einen erfolgreichen Microsoft Entra Hybrid Join muss das Gerät regelmäßig eine Netzwerkverbindung (‚line of sight‘) zu einem Domänencontroller haben, damit der Join-Workflow abgeschlossen werden kann.",
      "Fehlt diese Verbindung (z. B. nur Internet ohne VPN), verbleibt das Gerät im Status ‚Pending‘.",
      "Intune-Enrollment, WHfB oder Zertifikate sind hier nicht die primäre Voraussetzung für den Abschluss des Hybrid Join.",
    ].join(" "),
  },
  {
    id: "Q192",
    number: 193,
    area: "Manage identity and access (25–30%)",
    difficulty: "medium",

    question: [
      "Your company has a Microsoft 365 subscription and wants to deploy passwordless authentication for all users.",
      "",
      "Two departments have the following requirements:",
      "• Research: Users sign in only from unmanaged Linux devices and do not use mobile phones.",
      "• Sales: Users must authenticate by using mobile phones.",
      "",
      "You must minimize administrative effort.",
      "",
      "Which passwordless authentication method should you use for each department?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Research: FIDO2 security keys | Sales: Microsoft Authenticator",
      },
      {
        key: "B",
        text: "Research: Microsoft Authenticator | Sales: FIDO2 security keys",
      },
      {
        key: "C",
        text: "Research: Windows Hello for Business | Sales: Microsoft Authenticator",
      },
      {
        key: "D",
        text: "Research: Certificate-based authentication | Sales: Temporary Access Pass",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Für Research sind FIDO2-Sicherheitsschlüssel ideal, weil sie plattformunabhängig (inkl. Linux) funktionieren und kein Smartphone benötigen.",
      "Für Sales ist die Microsoft Authenticator App die geeignete, passwortlose Methode, da explizit eine Authentifizierung über Mobiltelefone gefordert ist.",
      "Windows Hello for Business setzt Windows-Clients voraus und eignet sich daher nicht für reine Linux-Umgebungen.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q193",
    number: 194,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "You use Microsoft Intune to manage Windows 11 devices.",
      "",
      "You create a policy set named Set1 that contains five device configuration profiles.",
      "You also create a device compliance policy named Policy1.",
      "",
      "You need to ensure that whenever users are assigned the device configuration profiles in Set1,",
      "they are always assigned Policy1 as well.",
      "",
      "What should you configure?",
    ].join("\n"),

    options: [
      { key: "A", text: "The assignments of Policy1" },
      { key: "B", text: "The Policy1 configurations" },
      { key: "C", text: "The assignments of Set1" },
      { key: "D", text: "The Set1 configurations" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Damit Policy1 immer gemeinsam mit den Konfigurationsprofilen aus Set1 zugewiesen wird, muss Policy1 in den Set1 configurations als Bestandteil des Policy Sets hinzugefügt werden.",
      "Reine Assignments von Policy1 oder Set1 stellen keine logische Kopplung zwischen den Objekten her.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },
  {
    id: "Q194",
    number: 195,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "Your company has the following infrastructure:",
      "• A Microsoft 365 tenant",
      "• An Active Directory forest",
      "• Microsoft Intune",
      "• A Key Management Service (KMS) server",
      "• A Windows Deployment Services (WDS) server",
      "• A Microsoft Entra ID Premium tenant",
      "",
      "The company purchases 100 new Windows client devices.",
      "You plan to use Windows Autopilot so that the devices are automatically joined to Microsoft Entra ID and enrolled into Intune.",
      "",
      "Which management tool should you use, and which information must you collect from each device?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Tool: Windows Deployment Services console | Information: MAC address only",
      },
      {
        key: "B",
        text: "Tool: Microsoft Intune admin center | Information: Device serial number and hardware hash",
      },
      {
        key: "C",
        text: "Tool: Microsoft Entra admin center | Information: Computer name and on-premises domain",
      },
      {
        key: "D",
        text: "Tool: Volume Activation Management Tool | Information: Windows product key and edition",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Windows Autopilot-Geräte werden im Microsoft Intune admin center registriert, indem eine CSV-Datei mit Seriennummer und Hardware-Hash der Geräte importiert wird.",
      "WDS, VAMT oder nur MAC-Adressen reichen für eine Autopilot-Registrierung nicht aus.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q195",
    number: 196,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage Windows Autopilot devices with Microsoft Intune.",
      "You want to ensure that all devices that are provisioned by Windows Autopilot automatically receive the same deployment profile without manual assignment.",
      "",
      "Which two actions should you perform?",
      "(Each correct answer presents part of the solution.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Create a Microsoft Entra device group that uses a dynamic membership rule based on the ZTDID tag.",
      },
      {
        key: "B",
        text: "Create a security group and manually add Autopilot devices to the group.",
      },
      {
        key: "C",
        text: "Assign a Windows Autopilot deployment profile to the dynamic device group.",
      },
      {
        key: "D",
        text: "Assign the Windows Autopilot deployment profile directly to each user account.",
      },
    ],

    correctAnswers: ["A", "C"],

    explanation: [
      "Autopilot-Geräte werden typischerweise über eine dynamische Gerätegruppe erkannt, deren Regel auf der Eigenschaft devicePhysicalIds mit dem Tag [ZTDId] basiert.",
      "Das Windows Autopilot Deployment Profile wird anschließend dieser dynamischen Gruppe zugewiesen, sodass alle neuen Autopilot-Geräte automatisch das Profil erhalten.",
      "Manuelle Gruppenpflege oder Zuweisung pro Benutzer ist fehleranfällig und nicht erforderlich.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q196",
    number: 197,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft Entra ID tenant that contains Azure AD-joined Windows 11 devices.",
      "Remote Desktop has been enabled on the devices.",
      "",
      "You have a user named User1 with the UPN User1@contoso.com",
      "",
      "You need to allow User1 to connect to the devices by using Remote Desktop.",
      "",
      "Which command should you run on each device?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: 'net localgroup "AzureAD\User1@contoso.com" /add "Device Owners"',
      },
      {
        key: "B",
        text: 'net localgroup "contoso\User1" /add "Remote Desktop Users"',
      },
      { key: "C", text: 'net localgroup "Device Owners" /add "contoso\User1"' },
      {
        key: "D",
        text: 'net localgroup "Remote Desktop Users" /add "AzureAD\User1@contoso.com"',
      },
      {
        key: "E",
        text: 'net localgroup "User1@contoso.com" /add "Remote Desktop Users"',
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Auf Azure AD-joined Geräten werden Cloudbenutzer lokal im Format AzureAD\UPN referenziert.",
      "Damit User1 RDP nutzen darf, muss sein Konto der lokalen Gruppe Remote Desktop Users hinzugefügt werden:",
      'net localgroup "Remote Desktop Users" /add "AzureAD\User1@contoso.com".',
    ].join(" "),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q197",
    number: 198,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "You plan to onboard several devices to Microsoft Defender for Endpoint (MDE).",
      "The devices have the following operating systems:",
      "",
      "• Device1: Windows 11 Enterprise",
      "• Device2: Windows 10 Pro",
      "• Device3: macOS 13 (Ventura)",
      "• Device4: An unsupported legacy macOS X version",
      "",
      "You need to identify which devices can be onboarded to Microsoft Defender for Endpoint.",
      "Which devices can you onboard?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device1 and Device2 only" },
      { key: "C", text: "Device1, Device2, and Device4 only" },
      { key: "D", text: "Device1, Device2, and Device3 only" },
      { key: "E", text: "Device1, Device2, Device3, and Device4" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Microsoft Defender for Endpoint unterstützt Windows 10/11 (Pro, Enterprise, Education) sowie aktuelle macOS-Versionen.",
      "Damit sind Device1 (Windows 11), Device2 (Windows 10) und Device3 (aktuelles macOS) onboard-fähig.",
      "Das veraltete macOS X auf Device4 wird nicht mehr von MDE unterstützt.",
    ].join(" "),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q198",
    number: 199,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "You manage multiple Windows 10 devices with Microsoft Intune.",
      "A Delivery Optimization device configuration profile is applied to all devices with the following settings:",
      "",
      "• Download mode: HTTP blended with peering across a private group (2)",
      "• Restrict peer selection: Subnet mask",
      "",
      "You have four devices in different subnets.",
      "You need to determine from which peers Device1 and Device2 can obtain updates.",
      "",
      "Which statement is correct?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Device1 can get updates from Device3 only. Device2 cannot get updates from any device.",
      },
      {
        key: "B",
        text: "Device1 cannot get updates from any device. Device2 can get updates from Device3 only.",
      },
      {
        key: "C",
        text: "Device1 can get updates from Device2 and Device3 only. Device2 can get updates from Device1 and Device3 only.",
      },
      {
        key: "D",
        text: "Device1 can get updates from Device2, Device3, and Device4. Device2 can get updates from Device1, Device3, and Device4.",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Mit Download mode = 2 (Private Group) und ‚Restrict peer selection = Subnet mask‘ dürfen Peers nur innerhalb desselben Subnetzes Inhalte austauschen.",
      "Im Szenario liegt nur Device3 im gleichen Subnetz wie Device1; Device2 hat in seinem Subnetz keinen weiteren Peer.",
      "Somit kann Device1 nur von Device3 beziehen, Device2 von keinem anderen Gerät.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
      "https://learn.microsoft.com/mem/intune/configuration/delivery-optimization-windows",
    ],
  },
  {
    id: "Q199",
    number: 200,
    area: "Manage applications (15–20%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft 365 E5 subscription.",
      "A Windows 11 computer named Computer1 is enrolled in Microsoft Intune.",
      "",
      "You need to deploy an application named App1 to Computer1.",
      "The App1 installation requires multiple source files.",
      "",
      "You plan to deploy App1 as a Win32 app from Intune.",
      "Which tool should you use to package App1, and which file format will be used?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Use Deployment Image Servicing and Management (DISM) | File format: .ipa",
      },
      {
        key: "B",
        text: "Use Microsoft Application Virtualization (App-V) Sequencer | File format: .appv",
      },
      {
        key: "C",
        text: "Use Microsoft Application Virtualization (App-V) Sequencer | File format: .ipa",
      },
      {
        key: "D",
        text: "Use Win32 Content Prep Tool | File format: .intunewin",
      },
      { key: "E", text: "Use Windows Package Manager | File format: .apk" },
      {
        key: "F",
        text: "Use Windows Package Manager | File format: .intunewin",
      },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Für Win32-Apps in Intune müssen die Installationsdateien mit dem Microsoft Win32 Content Prep Tool (IntuneWinAppUtil.exe) in das Format .intunewin verpackt werden.",
      "Dieses Paket wird anschließend im Intune Admin Center als Win32-App hochgeladen.",
      "DISM, App-V oder Winget erzeugen nicht das für Intune benötigte .intunewin-Format.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/apps-win32-app-management",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q200",
    number: 201,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You manage the Microsoft Entra ID tenant contoso.com.",
      "The company plans to purchase 25 new Windows 11 devices that will be shipped directly to end users.",
      "",
      "During the Windows out-of-box experience (OOBE), users must:",
      "• Sign in with their corporate account.",
      "• Have the device automatically enrolled into Microsoft Intune.",
      "",
      "You plan to use Windows Autopilot.",
      "Which two components must you configure to meet the requirements?",
      "(Each correct answer presents part of the solution.)",
    ].join("\n"),

    options: [
      { key: "A", text: "An Enrollment Status Page (ESP) profile" },
      {
        key: "B",
        text: "Automatic enrollment for Windows devices in Microsoft Intune",
      },
      { key: "C", text: "A provisioning package (PPKG) applied from USB" },
      { key: "D", text: "A self-deploying Autopilot deployment profile" },
      {
        key: "E",
        text: "A Windows Autopilot deployment profile configured for user-driven mode",
      },
    ],

    correctAnswers: ["B", "E"],

    explanation: [
      "Für das Szenario ‚Benutzer meldet sich während OOBE an und Gerät wird automatisch in Intune eingeschrieben‘ sind zwei Dinge nötig:",
      "• Automatic enrollment in Intune für Azure AD-(Entra)-Beitritte.",
      "• Ein Windows Autopilot Deployment Profile im User-driven mode, das die OOBE steuert.",
      "PPKG oder Self-deploying-Profile sind eher für Kiosk- oder Offline-Szenarien geeignet.",
    ].join(" "),

    references: ["https://learn.microsoft.com/autopilot/windows-autopilot"],
  },
  {
    id: "Q201",
    number: 202,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "hard",

    question: [
      "You manage a Microsoft 365 subscription and several Windows devices that will be reimaged and licensed by using Windows Subscription Activation.",
      "",
      "You evaluate the following statements:",
      "",
      "1. Device1 can be upgraded to Windows 11 and activated by using Subscription Activation.",
      "2. Device2 requires additional hardware before it can be upgraded to Windows 11.",
      "3. User3 requires an additional license to activate Windows 11 on Device3 by using Subscription Activation.",
      "",
      "For each statement, select Yes or No.",
      "Which combination of answers is correct?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1: Yes | Device2: Yes | User3: No" },
      { key: "B", text: "Device1: Yes | Device2: No | User3: No" },
      { key: "C", text: "Device1: No | Device2: Yes | User3: No" },
      { key: "D", text: "Device1: Yes | Device2: Yes | User3: Yes" },
      { key: "E", text: "Device1: No | Device2: No | User3: Yes" },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Device1 erfüllt aufgrund von TPM 1.2 nicht die Mindestanforderungen von Windows 11 und kann daher nicht (unterstützt) aktualisiert und per Subscription Activation genutzt werden → Aussage 1 = No.",
      "Device2 erfüllt bereits alle Windows-11-Hardwareanforderungen, daher ist keine zusätzliche Hardware nötig → Aussage 2 = No.",
      "User3 benötigt eine passende Windows-Enterprise-Lizenz (z. B. über Microsoft 365 E3/E5) für Subscription Activation; im Szenario ist eine zusätzliche Lizenz nötig → Aussage 3 = Yes.",
      "Damit ergibt sich die Kombination: Device1: No, Device2: No, User3: Yes.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q202",
    number: 203,
    area: "Protect devices (15–20%)",
    difficulty: "easy",

    question: [
      "Your on-premises network contains an Active Directory domain named contoso.com.",
      "The domain contains two Windows 10 computers named Computer1 and Computer2.",
      "",
      "You need to run Invoke-Command on Computer1 to execute several PowerShell commands on Computer2.",
      "",
      "What should you do first to ensure that the command works?",
    ].join("\n"),

    options: [
      { key: "A", text: "On Computer2, run Enable-PSRemoting." },
      {
        key: "B",
        text: "In Active Directory, configure Computer2 as Trusted for Delegation.",
      },
      { key: "C", text: "On Computer1, run New-PSSession." },
      {
        key: "D",
        text: "On Computer2, add Computer1 to the Remote Management Users group.",
      },
    ],
    correctAnswers: ["A"],

    explanation: [
      "Damit Computer2 PowerShell-Remoteanfragen akzeptiert, muss dort zunächst Enable-PSRemoting ausgeführt werden.",
      "Der Befehl konfiguriert WinRM, erstellt Listener und passt die Firewall an, sodass Invoke-Command, Enter-PSSession usw. funktionieren.",
      "Delegation oder New-PSSession allein aktivieren PSRemoting nicht.",
    ].join(" "),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },

  {
    id: "Q203",
    number: 204,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Your network contains an Active Directory domain named adatum.com and a workgroup.",
      "The network has three Windows 10 computers configured as follows:",
      "",
      "• Computer1: Member of the adatum.com domain. Windows Defender Firewall is enabled.",
      "• Computer2: Member of the adatum.com domain. The local Administrator account has the same name and password as on Computer1.",
      "• Computer3: Member of a workgroup. The local Administrator account has the same name and password as on Computer1.",
      "",
      "On Computer1, the services and firewall settings are configured as follows:",
      "• Windows Remote Management (WinRM): Disabled",
      "• Remote Registry: Stopped",
      "• RPC Locator: Stopped",
      "• Remote Volume Management: Firewall exception is disabled",
      "",
      "You need to evaluate which remote management tasks can be performed against Computer1.",
      "",
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "",
      "Statement 1: From Computer2, you can use Disk Management to remotely manage the disks on Computer1.",
      "Statement 2: From Computer2, you can use Registry Editor (regedit) to remotely edit the registry of Computer1.",
      "Statement 3: From Computer3, you can use Performance Monitor to remotely monitor the performance of Computer1.",
      "",
      "Which combination of answers is correct?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Statement 1: Yes | Statement 2: Yes | Statement 3: Yes",
      },
      {
        key: "B",
        text: "Statement 1: Yes | Statement 2: Yes | Statement 3: No",
      },
      {
        key: "C",
        text: "Statement 1: Yes | Statement 2: No | Statement 3: No",
      },
      {
        key: "D",
        text: "Statement 1: No | Statement 2: Yes | Statement 3: Yes",
      },
      {
        key: "E",
        text: "Statement 1: No | Statement 2: Yes | Statement 3: No",
      },
      { key: "F", text: "Statement 1: No | Statement 2: No | Statement 3: No" },
    ],

    correctAnswers: ["F"],

    explanation: [
      "Für die Remoteverwaltung von Datenträgern wird die Firewall-Ausnahme für Remote Volume Management benötigt, die auf Computer1 deaktiviert ist – Disk Management funktioniert daher nicht remote.",
      "Der Dienst ‚Remote Registry‘ ist gestoppt, daher kann die Registrierung von Computer1 nicht remote bearbeitet werden.",
      "Für Performance Counter-Abfragen sind funktionierende RPC-/Firewall-Pfade nötig; die aktuelle Konfiguration verhindert auch diese Verbindung.",
      "Damit sind alle drei Aussagen falsch und die Kombination No/No/No (Option F) ist korrekt.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-antivirus-policy",
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-firewall-policy",
    ],
  },
  {
    id: "Q204",
    number: 205,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "easy",

    question: [
      "You manage a Microsoft Entra ID tenant that contains the following devices:",
      "",
      "• Device1: Windows 11 Pro, Microsoft Entra join type: Joined",
      "• Device2: Windows 11 Pro, Microsoft Entra join type: Registered",
      "• Device3: Windows 10 Pro, Microsoft Entra join type: Joined",
      "• Device4: Windows 10 Pro, Microsoft Entra join type: Registered",
      "",
      "You plan to use Windows Subscription Activation to automatically activate Windows Enterprise on eligible devices.",
      "",
      "Which devices can use Windows Subscription Activation?",
    ].join("\n"),

    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device3 only" },
      { key: "C", text: "Device1 and Device3 only" },
      { key: "D", text: "Device1, Device2, and Device3 only" },
      { key: "E", text: "Device1, Device2, Device3, and Device4" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Windows Subscription Activation setzt voraus, dass das Gerät mindestens Windows Pro ausführt und Microsoft Entra-joined oder hybrid-joined ist.",
      "Azure AD registered (nur registriert) reicht nicht aus.",
      "Damit erfüllen nur Device1 (Windows 11 Pro, joined) und Device3 (Windows 10 Pro, joined) die Voraussetzungen.",
    ].join(" "),

    references: ["https://learn.microsoft.com/mem/intune/enrollment/"],
  },
  {
    id: "Q205",
    number: 206,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: [
      "You use Microsoft Deployment Toolkit (MDT) and have created a deployment share.",
      "You create a new task sequence by using the Standard Client Upgrade Task Sequence template.",
      "",
      "When you run the New Task Sequence Wizard, the Select OS page shows no available operating system images.",
      "",
      "You plan to perform an in-place upgrade to Windows 11.",
      "You need to ensure that you can select an operating system image on the Select OS page.",
      "",
      "What should you do?",
    ].join("\n"),

    options: [
      { key: "A", text: "Enable monitoring for the deployment share." },
      {
        key: "B",
        text: "Import a full set of source files for Windows 11 into the deployment share.",
      },
      {
        key: "C",
        text: "Import a custom captured image (custom image file) into the deployment share.",
      },
      {
        key: "D",
        text: "Run the Update Deployment Share Wizard to regenerate the boot images.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Upgrade-Tasksequenzen in MDT erwarten ein vollständiges Betriebssystem-Setup (install.wim aus der Original-ISO).",
      "Dafür muss ein ‚Full set of source files‘ für Windows 10/11 importiert werden.",
      "Custom Images werden für In-place-Upgrades nicht unterstützt und Boot-Image-Updates allein liefern keine OS-Images.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q206",
    number: 207,
    area: "Manage applications (15–20%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft 365 subscription with 1,000 Windows 11 devices enrolled in Microsoft Intune.",
      "",
      "You plan to deploy an application named App1 by using Intune.",
      "App1 uses multiple installation files (for example, Setup.exe, DLLs, and configuration files).",
      "",
      "You want to deploy App1 as a Win32 app from Intune.",
      "You need to prepare the application for deployment.",
      "",
      "What should you do first?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Prepare the contents of App1 by using the Microsoft Win32 Content Prep Tool.",
      },
      {
        key: "B",
        text: "Create an Android application package (.apk) for App1.",
      },
      {
        key: "C",
        text: "Upload the raw App1 installation files directly to Intune as a line-of-business app.",
      },
      {
        key: "D",
        text: "Install the Microsoft Deployment Toolkit (MDT) and create an MDT application.",
      },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Win32-Anwendungen müssen vor dem Upload nach Intune mit dem Microsoft Win32 Content Prep Tool (IntuneWinAppUtil.exe) in das Format .intunewin verpackt werden.",
      "APK-Dateien gelten nur für Android, MDT ist für OS-Deployment gedacht, und das direkte Hochladen mehrerer lose Dateien als LOB-App ist für Win32-Apps nicht vorgesehen.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/apps/apps-win32-app-management",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q207",
    number: 208,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "You manage a Microsoft 365 environment that uses Microsoft Intune to manage Windows 11 devices.",
      "",
      "You want to collect and view startup performance data (such as boot time and sign-in time) for the managed Windows 11 devices in the Intune admin center.",
      "",
      "You plan to use Endpoint analytics.",
      "You need to configure the environment to collect startup performance data from the devices.",
      "",
      "What should you configure?",
    ].join("\n"),

    options: [
      { key: "A", text: "The Azure Monitor agent on all Windows 11 devices" },
      { key: "B", text: "A device compliance policy in Intune" },
      { key: "C", text: "A Conditional Access policy in Microsoft Entra ID" },
      { key: "D", text: "An Intune Endpoint analytics data collection policy" },
    ],

    correctAnswers: ["D"],

    explanation: [
      "Endpoint Analytics verwendet in Intune eine spezielle Datensammlungsrichtlinie, um Leistungs- und Startmetriken von Windows-Geräten zu erfassen.",
      "Azure Monitor, Compliance-Richtlinien oder Conditional Access liefern zwar Telemetrie bzw. Zugriffssteuerung, erfassen aber keine Endpoint-Analytics-Leistungsdaten.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/analytics/overview",
      "https://learn.microsoft.com/mem/analytics/startup-performance",
    ],
  },
  {
    id: "Q208",
    number: 209,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft Intune environment that contains the following resources:",
      "",
      "• Comply1 and Comply2: Device compliance policies",
      "• Conf1: Device configuration profile",
      "• CA1: Conditional Access policy",
      "• Office1: Application",
      "",
      "You create a policy set named Set1.",
      "You add the Comply1 device compliance policy to Set1.",
      "",
      "You need to identify which additional resources you can add to Set1.",
      "Which resources can you add?",
    ].join("\n"),

    options: [
      { key: "A", text: "Conf1 only" },
      { key: "B", text: "Comply2 only" },
      { key: "C", text: "Comply2 and Conf1 only" },
      { key: "D", text: "CA1, Conf1, and Office1 only" },
      { key: "E", text: "Comply2, CA1, Conf1, and Office1" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Policy Sets können mehrere Intune-Objekte bündeln, darunter Device Compliance Policies und Device Configuration Profiles.",
      "Conditional Access wird in Entra ID verwaltet und ist kein direktes Intune-Objekt in Policy Sets.",
      "Daher lassen sich Comply2 (weitere Compliance-Richtlinie) und Conf1 (Konfigurationsprofil) in Set1 ergänzen.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
      "https://learn.microsoft.com/mem/intune/protect/conditional-access",
    ],
  },
  {
    id: "Q209",
    number: 210,
    area: "Manage identity and access (25–30%)",
    difficulty: "easy",

    question: [
      "You manage a Microsoft 365 subscription and use Microsoft Intune to manage Windows 11 devices.",
      "",
      "You plan to implement passwordless authentication.",
      "Users must confirm a number shown on the sign-in screen by entering or selecting the same number on their phone (number matching).",
      "",
      "Which authentication method should you configure?",
    ].join("\n"),

    options: [
      { key: "A", text: "Microsoft Authenticator app" },
      { key: "B", text: "Voice calls" },
      { key: "C", text: "FIDO2 security keys" },
      { key: "D", text: "Text messages (SMS)" },
    ],

    correctAnswers: ["A"],

    explanation: [
      "Number Matching ist eine Funktion der Microsoft Authenticator App in Verbindung mit passwortloser bzw. MFA-Anmeldung in Microsoft Entra ID.",
      "Telefonanruf und SMS sind klassische MFA-Methoden ohne Number Matching, FIDO2 arbeitet hardwarebasiert und zeigt keine solche Zahl auf dem Telefon an.",
    ].join(" "),
  },
  {
    id: "Q210",
    number: 211,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "hard",

    question: [
      "Your organization uses Microsoft Intune and Windows Autopilot.",
      "You have the following users and licenses:",
      "",
      "• User1: Member of Group1, licensed with Microsoft 365 E1",
      "• User2: Member of Group1, licensed with Microsoft 365 E3",
      "• User3: Member of Group2, licensed with Microsoft 365 E5",
      "",
      "Group2 is assigned to the Enrollment Status Page (ESP) configuration.",
      "",
      "You have the following devices:",
      "• Device1: Windows 10 Pro, department: Marketing",
      "• Device2: Windows 10 Home, department: Research",
      "• Device3: Windows 10 Pro, department: Marketing",
      "",
      "You upload the hardware IDs of the Marketing devices (Device1 and Device3) to Windows Autopilot.",
      "",
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "",
      "Statement 1: User1 can complete the Autopilot provisioning process on Device1.",
      "Statement 2: User2 can complete the Autopilot provisioning process on Device1.",
      "Statement 3: User3 can view information about Device1 on the Enrollment Status Page during provisioning.",
      "",
      "Which combination of answers is correct?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Statement 1: Yes | Statement 2: Yes | Statement 3: Yes",
      },
      {
        key: "B",
        text: "Statement 1: Yes | Statement 2: No | Statement 3: Yes",
      },
      {
        key: "C",
        text: "Statement 1: No | Statement 2: Yes | Statement 3: No",
      },
      {
        key: "D",
        text: "Statement 1: No | Statement 2: No | Statement 3: Yes",
      },
      {
        key: "E",
        text: "Statement 1: No | Statement 2: Yes | Statement 3: Yes",
      },
    ],

    correctAnswers: ["E"],

    explanation: [
      "Microsoft 365 E1 enthält kein Intune, daher kann User1 den Autopilot-Bereitstellungsprozess nicht erfolgreich abschließen.",
      "User2 verfügt über M365 E3 mit Intune und kann Device1 (Windows 10 Pro, Autopilot-registriert) per Autopilot bereitstellen.",
      "User3 hat M365 E5 und ist Mitglied der Gruppe, die der Enrollment Status Page zugewiesen ist – er sieht daher während des Deployments die ESP-Informationen.",
      "Damit ergibt sich die Kombination No / Yes / Yes (Option E).",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/autopilot/windows-autopilot",
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q211",
    number: 212,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "You manage a Microsoft 365 E5 environment with Microsoft Intune.",
      "You have the following iOS/iPadOS devices:",
      "",
      "• Device1: iOS, enrolled by using Apple Automated Device Enrollment (ADE) (supervised)",
      "• Device2: iPadOS, enrolled by using Apple Automated Device Enrollment (ADE) (supervised), member of Group2",
      "• Device3: iPadOS, enrolled by using the Company Portal app (user-enrolled, not supervised)",
      "",
      "You configure an iOS/iPadOS software update policy in Intune with specific installation time windows.",
      "Device1 and Device3 are targeted by the policy.",
      "Group2 is excluded from the policy assignments.",
      "",
      "For each of the following scenarios, select Yes if the update will be installed automatically. Otherwise, select No.",
      "",
      "Scenario 1: An iOS update becomes available on Tuesday at 05:00. It will be automatically installed on Device1 on Wednesday during the allowed time window.",
      "Scenario 2: An iPadOS update becomes available on Thursday at 02:00. It will be automatically installed on Device2 on Thursday.",
      "Scenario 3: An iPadOS update becomes available on Friday at 22:00. It will be automatically installed on Device3 on Sunday during an allowed window.",
      "",
      "Which combination of answers is correct?",
    ].join("\n"),

    options: [
      { key: "A", text: "Scenario 1: Yes | Scenario 2: Yes | Scenario 3: Yes" },
      { key: "B", text: "Scenario 1: Yes | Scenario 2: Yes | Scenario 3: No" },
      { key: "C", text: "Scenario 1: Yes | Scenario 2: No | Scenario 3: No" },
      { key: "D", text: "Scenario 1: No | Scenario 2: No | Scenario 3: Yes" },
      { key: "E", text: "Scenario 1: No | Scenario 2: No | Scenario 3: No" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Nur supervised Geräte, die von ADE stammen und Ziel der Richtlinie sind, können Updates automatisch installieren.",
      "Device1 ist supervised und vom Profil erfasst – Updates innerhalb des Zeitfensters werden automatisch installiert.",
      "Device2 ist zwar supervised, gehört aber zu einer Gruppe, die explizit vom Profil ausgeschlossen ist – damit erfolgt keine automatische Installation.",
      "Device3 ist nur per Company Portal registriert (nicht supervised), iOS/iPadOS-Updateprofile können hier nicht automatisch durchgesetzt werden.",
      "Daher: Ja für Szenario 1, Nein für Szenario 2 und 3.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    id: "Q212",
    number: 213,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "You manage a Microsoft 365 subscription and Microsoft Intune.",
      "The following Windows 11 computers are in your environment:",
      "",
      "• Computer1: Microsoft Entra ID joined, Intune enrolled, BitLocker disabled, Firewall enabled",
      "• Computer2: Microsoft Entra ID registered, Intune enrolled, BitLocker enabled, Firewall enabled",
      "• Computer3: Microsoft Entra ID registered, not enrolled in Intune, BitLocker enabled, Firewall disabled",
      "",
      "You create the following device compliance policies:",
      "",
      "• Policy1: Requires BitLocker to be enabled; assigned to Group1",
      "• Policy2: Requires the Firewall to be enabled",
      "",
      "Computer1 and Computer2 are members of Group1.",
      "Computer3 is not enrolled in Intune.",
      "",
      "You review the compliance state of the computers the next day.",
      "",
      "Which statements about the compliance state are correct?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Computer1 is Not compliant; Computer2 is Compliant; Computer3 is Not compliant.",
      },
      {
        key: "B",
        text: "Computer1 is In grace period; Computer2 is Compliant; Computer3 is Not evaluated.",
      },
      {
        key: "C",
        text: "Computer1 is Not compliant; Computer2 is In grace period; Computer3 is Not evaluated.",
      },
      {
        key: "D",
        text: "Computer1 is Compliant; Computer2 is Compliant; Computer3 is Not evaluated.",
      },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Computer1 ist in Intune registriert, Mitglied von Group1 und erfüllt die BitLocker-Anforderung nicht – er befindet sich nach Richtlinienzuweisung zunächst im Zustand ‚In grace period‘.",
      "Computer2 ist in Intune registriert, Mitglied von Group1 und erfüllt die BitLocker-Anforderung – er ist konform.",
      "Computer3 ist nicht in Intune enrolled; seine Compliance wird daher nicht bewertet und erscheint als ‚Not evaluated‘, nicht als ‚Not compliant‘.",
    ].join(" "),

    references: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
      "https://learn.microsoft.com/mem/intune/protect/encrypt-devices",
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-firewall-policy",
    ],
  },
  {
    id: "Q213",
    number: 214,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "easy",

    question: [
      "Your on-premises network contains an Active Directory domain that is synchronized to Microsoft Entra ID.",
      "The tenant contains the following groups:",
      "",
      "• Group1: Mail-enabled security group created in Exchange Online",
      "• Group2: Microsoft 365 group (cloud-only)",
      "• Group3: Security group (cloud-only)",
      "• Group4: Distribution group created in Exchange Online",
      "• Group5: Security group synchronized from on-premises Active Directory",
      "",
      "You plan to add new members to each group.",
      "You need to identify which groups you can manage directly in the Microsoft Entra admin center (Azure portal).",
      "",
      "Which groups can you manage from the Azure portal?",
    ].join("\n"),

    options: [
      { key: "A", text: "Group3 only" },
      { key: "B", text: "Group2 and Group3 only" },
      { key: "C", text: "Group1, Group2, and Group3 only" },
      { key: "D", text: "Group1, Group2, Group3, and Group5 only" },
      { key: "E", text: "Group1, Group2, Group3, and Group4 only" },
    ],

    correctAnswers: ["B"],

    explanation: [
      "Cloud-only Microsoft 365-Gruppen und Sicherheitsgruppen (Group2 und Group3) können direkt im Entra Admin Center verwaltet werden.",
      "Mail-enabled und Distribution Groups werden primär über das Exchange Admin Center verwaltet, synchronisierte Gruppen (Group5) nur im lokalen AD.",
      "Daher sind nur Group2 und Group3 im Azure-Portal voll verwaltbar.",
    ].join(" "),
  },
  {
    id: "Q214",
    number: 215,
    area: "Protect devices (15–20%)",
    difficulty: "medium",

    question: [
      "Your network contains an Active Directory domain.",
      "The following Windows computers are members of the domain and have Microsoft Defender Application Guard installed:",
      "",
      '• Computer1: Windows 11 Enterprise; GPO "Turn on Microsoft Defender Application Guard in managed mode" is enabled.',
      '• Computer2: Windows 11 Enterprise; GPO "Clipboard settings: Allow copy from Microsoft Edge to Application Guard" is enabled.',
      '• Computer3: Windows 11 Pro; GPO "Allow files to download and save to the host operating system" is enabled.',
      "",
      "You need to evaluate the effect of the Group Policy settings.",
      "",
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "",
      "Statement 1: Computer1 can use Application Guard in enterprise managed mode.",
      "Statement 2: Computer2 can copy content from Microsoft Edge into the Application Guard container.",
      "Statement 3: Computer3 can download files from Application Guard to the host operating system.",
      "",
      "Which combination of answers is correct?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Statement 1: Yes | Statement 2: Yes | Statement 3: Yes",
      },
      {
        key: "B",
        text: "Statement 1: Yes | Statement 2: Yes | Statement 3: No",
      },
      {
        key: "C",
        text: "Statement 1: Yes | Statement 2: No | Statement 3: No",
      },
      {
        key: "D",
        text: "Statement 1: No | Statement 2: Yes | Statement 3: No",
      },
      {
        key: "E",
        text: "Statement 1: No | Statement 2: No | Statement 3: Yes",
      },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Application Guard im Enterprise Managed Mode erfordert Windows Enterprise – dies ist auf Computer1 der Fall, daher kann der Modus genutzt werden.",
      "Clipboard-Einstellungen müssen korrekt und vollständig konfiguriert sein; in der Prüfungslogik gilt die konkrete Konfiguration auf Computer2 nicht als ausreichend, um Copy Edge → App Guard zu erlauben (Antwort: No).",
      "Application Guard mit Dateidownloads zum Host wird nur auf Enterprise/Education unterstützt; Computer3 mit Windows 11 Pro kann diese Richtlinie effektiv nicht nutzen.",
      "Somit ist nur Aussage 1 wahr; 2 und 3 sind falsch (Option C).",
    ].join(" "),

    references: ["https://learn.microsoft.com/mem/intune/protect/"],
  },
  {
    id: "Q215",
    number: 216,
    area: "Manage and maintain devices (30–35%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft 365 subscription and 20 Windows 11 devices that are Microsoft Entra ID joined.",
      "You will replace these devices with new Windows 11 devices that will also be Microsoft Entra ID joined.",
      "",
      "You need to ensure that user-specific settings such as:",
      "• Desktop themes",
      "• Taskbar configuration",
      "• Bluetooth and device settings",
      "",
      "are automatically restored on the new devices when users sign in.",
      "",
      "Which feature should you use?",
    ].join("\n"),

    options: [
      {
        key: "A",
        text: "Roaming user profiles in on-premises Active Directory",
      },
      { key: "B", text: "Folder Redirection configured by Group Policy" },
      { key: "C", text: "Enterprise State Roaming in Microsoft Entra ID" },
      { key: "D", text: "OneDrive Known Folder Move (KFM)" },
    ],

    correctAnswers: ["C"],

    explanation: [
      "Enterprise State Roaming synchronisiert Benutzer- und Systemeinstellungen (z. B. Themes, Taskleiste, Sprache, Bluetooth) für Entra-joined Windows-Geräte über die Cloud.",
      "Roaming Profiles und Folder Redirection sind klassische On-Prem-Techniken und decken primär Profile bzw. Ordner ab.",
      "OneDrive Known Folder Move synchronisiert Dateien (Dokumente, Desktop), nicht jedoch allgemeine Windows-Einstellungen.",
    ].join(" "),
  },

  {
    id: "Q216",
    number: 217,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: `

🧩 272. MDT – WinPE Einstellungen ändern & Boot Images aktualisieren
📘 Szenario

Du verwendest das Microsoft Deployment Toolkit (MDT),
um Windows 11 Deployments zu verwalten.

Im Deployment Workbench hast du die WinPE-Einstellungen angepasst, z. B.:

PowerShell-Support hinzugefügt

Treiber, Skripte oder zusätzliche Tools integriert

Nun musst du sicherstellen, dass ein neuer Satz von WinPE-Boot-Images erstellt wird,
die diese Änderungen enthalten.

❓ Frage

Welche Aktion musst du durchführen, um die neuen WinPE-Einstellungen in die Boot-Images zu übernehmen?
`.trim(),

    options: [],
    correctAnswers: [],

    explanation: `
➡️ Richtige Antwort: ✅ B – From the Deployment Shares node, update the deployment share

Wenn du Änderungen an der WinPE-Konfiguration eines MDT-Deployment-Shares vornimmst (z. B. PowerShell, .NET, Treiber, Skripte, zusätzliche Tools), werden die vorhandenen LiteTouchPE-Boot-Images nicht automatisch aktualisiert.

Damit die Änderungen in den Boot-Images landen, musst du im Deployment Workbench:

Zum Knoten Deployment Shares navigieren

Den betreffenden Deployment Share auswählen (z. B. D:\MDTDeploymentShare)

Rechtsklick → Update Deployment Share… ausführen

Im Wizard auswählen, ob

nur optimiert aktualisiert werden soll (Optimize the boot image updating process) oder

die Boot-Images vollständig neu generiert werden sollen (Completely regenerate the boot images) – empfohlen nach größeren Änderungen (Treiber/ADK/WinPE-Features)

Ergebnis:

Neue LiteTouchPE_x64.wim / LiteTouchPE_x64.iso (und ggf. x86) werden im Ordner Boot des Deployment Shares erzeugt.

Falls du WDS/PXE verwendest, musst du die aktualisierten .wim-Boot-Images anschließend im WDS-Server neu importieren und die alten ersetzen.

Typische Gründe für „Update Deployment Share“:

Änderungen an WinPE-Features (PowerShell, .NET, Scripting)

Neue Netzwerk-/Storage-Treiber

Neues Windows ADK / neues WinPE-Add-on

Update auf neue MDT-Version

`.trim(),
  },
  {
    id: "Q217",
    number: 218,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: `

🧩 273. Windows Autopilot – Automatische Registrierung bestehender Geräte
📘 Szenario

Du hast eine Microsoft 365 Subscription mit den folgenden Computern:

Name	Microsoft Entra ID join type	Enrolled in Microsoft Intune	Operating system	Processor type
Computer1	Microsoft Entra ID registered	✅ Yes	Windows 11 Pro	x64
Computer2	Microsoft Entra ID joined	❌ No	Windows 10 Pro	x86

Du möchtest sicherstellen, dass beide Geräte die automatische Registrierung in Windows Autopilot unterstützen.

Windows Autopilot soll in der Lage sein, die Geräte zu erkennen,
automatisch zu registrieren und den Hardware Hash an den Tenant zu übermitteln.

❓ Frage

Was musst du für jeden Computer tun, um die automatische Registrierung in Windows Autopilot zu ermöglichen?
`.trim(),

    options: [],
    correctAnswers: [],

    explanation: `
➡️ Richtige Antwort: B

Computer	Aktion
Computer1	Join the computer to Microsoft Entra ID
Computer2	Enroll the computer in Intune
Warum ist das richtig?

Für die automatische Registrierung bestehender Geräte in Windows Autopilot gelten u. a. diese Voraussetzungen:

Unterstütztes OS: Windows 10/11 Pro, Enterprise oder Education

Gerät ist über MDM (Intune) verwaltet

Gerät ist Microsoft Entra ID joined (nicht nur „registered“)

Intune kann dadurch den Hardware-Hash auslesen und an den Autopilot-Dienst senden

Analyse der Geräte:

Computer1

Status: Entra ID registered, bereits in Intune enrolled

„Registered“ = BYOD-Szenario (Benutzergerät), kein vollwertiges Azure AD Join

→ Für Autopilot-Auto-Registration muss das Gerät Azure AD / Entra ID joined sein

Aktion: Join the computer to Microsoft Entra ID

Computer2

Status: Entra ID joined, aber nicht in Intune enrolled

Ohne MDM-Enrollment kann Intune keinen Hardware-Hash auslesen und nicht zu Autopilot hochladen

Aktion: Enroll the computer in Intune

Erst wenn beide Bedingungen (Entra ID Joined und Intune Enrollment) erfüllt sind, kann die automatische Autopilot-Registrierung greifen.

`.trim(),
  },
  {
    id: "Q218",
    number: 219,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: `

🧩 274. MDT – Deployment Server für Windows 11 Upgrade vorbereiten
📘 Szenario

Du hast einen Server namens Server1,
auf dem das Microsoft Deployment Toolkit (MDT) bereits installiert ist.

Es gibt mehrere Windows 10-Clients,
die auf Windows 11 aktualisiert werden sollen.

Das Upgrade soll über den MDT Deployment Wizard erfolgen.

❓ Aufgabe

Du musst auf Server1 einen Deployment Share erstellen,
um das Upgrade auf Windows 11 bereitzustellen.

Was solltest du auf Server1 tun
und welche minimalen Komponenten musst du dem MDT Deployment Share hinzufügen?
`.trim(),

    options: [],
    correctAnswers: [],

    explanation: `
➡️ Richtige Antwort: D

Serveraktion	Hinzuzufügende Komponenten
Install the Windows Assessment and Deployment Kit (Windows ADK)	Windows 11 image and a task sequence only
Erklärung

MDT alleine reicht nicht; es benötigt das Windows ADK (inkl. WinPE-Add-on), um:

WinPE-Boot-Images zu erzeugen

DISM / Deployment-Tools zu nutzen

Task Sequences korrekt auszuführen

Minimale Schritte auf Server1:

Windows ADK + WinPE Add-on installieren

Im MDT Deployment Workbench:

Neuen Deployment Share anlegen (z. B. D:\MDTDeploymentShare)

Ein Windows 11-Installationsimage importieren
(idealerweise „Full set of source files“ von der offiziellen ISO)

Eine Task Sequence erstellen, z. B. Standard Client Upgrade oder Standard Client Task Sequence für Neuinstallation

Weitere Komponenten wie Packages, Applications, Language Packs sind optional und für ein reines Windows 11-Upgrade nicht zwingend notwendig.

`.trim(),
  },
  {
    id: "Q219",
    number: 220,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: `

🧩 275 – Upgrade von Windows 10 Pro auf Windows 11 Enterprise mit minimalem Aufwand
📘 Szenario

Du verwaltest 25 Computer mit Windows 10 Pro.
Dein Unternehmen verfügt über eine Microsoft 365 E5 Subscription mit Microsoft Intune.

Du möchtest die Geräte auf Windows 11 Enterprise upgraden – per In-Place Upgrade und mit minimalem administrativem Aufwand.

❓ Frage

Was solltest du verwenden?
`.trim(),

    options: [
      {
        key: "A",
        text: "Microsoft Endpoint Configuration Manager und ein benutzerdefiniertes Windows 11 Enterprise-Image",
      },
      { key: "B", text: "Subscription Activation" },
      {
        key: "C",
        text: "Microsoft Deployment Toolkit (MDT) und ein Standardimage von Windows 11 Enterprise",
      },
      { key: "D", text: "Windows Autopilot" },
    ],

    correctAnswers: ["C"],

    explanation: `
➡️ Richtige Antwort: C) Microsoft Deployment Toolkit (MDT) und ein Standardimage von Windows 11 Enterprise

Warum ist C richtig?

Ein In-Place Upgrade soll:

Windows 10 Pro → Windows 11 Enterprise heben

Benutzerdaten und Anwendungen behalten

Möglichst automatisiert und mit geringem Administrationsaufwand laufen

MDT bietet genau dafür:

Standard Client Upgrade Task Sequence für In-Place Upgrades

Verwendung eines Standard-Windows-Images (install.wim von der offiziellen ISO)

Vollautomatisierbare Abläufe (Pre-/Post-Tasks, Logging, Rollback-Szenarien)

Die Enterprise-Edition selbst wird über die M365 E5 Subscription mittels Subscription Activation lizenziert, aber das OS-Upgrade (Windows 10 → Windows 11) erledigst du effizient mit MDT.

Warum sind die anderen Optionen falsch?

A – MECM + Custom Image
Ein Custom Image ist nicht für In-Place Upgrades gedacht, sondern eher für Neuinstallationen.
Für ein echtes In-Place Upgrade soll ein Standard-Microsoft-Image verwendet werden.

B – Subscription Activation
Aktiviert nur die Enterprise-Features (Lizenzierung), führt aber kein OS-Upgrade durch.

D – Windows Autopilot
Autopilot eignet sich für Neuaufbau (Wipe & Reload), nicht für klassische In-Place Upgrades mit vollständiger Beibehaltung der vorhandenen Installation.

`.trim(),
  },
  {
    id: "Q220",
    number: 221,
    area: "Prepare infrastructure for devices (25–30%)",
    difficulty: "medium",

    question: `

🧩 276. Richtige Image-Auswahl für In-Place Upgrade in MDT
📘 Szenario

Du hast folgende x64-Computer, die aktualisiert werden sollen:

Computer	OS-Version	Architektur	Installierte Apps
Computer1	Windows 8.1 Pro (64-bit)	x64	Microsoft Office 2013
Computer2	Windows 8.1 Enterprise (32-bit)	x86	Keine

Zusätzlich stehen dir diese Windows 10 Enterprise Images zur Verfügung:

Image	Architektur	Beschreibung
Image1	x64	Custom Image – enthält Office 2019
Image2	x64	Default Image – von Microsoft erstellt
Image3	x86	Custom Image – enthält Office 2019
Image4	x86	Default Image – von Microsoft erstellt
❓ Frage

Welche Images können für ein In-Place Upgrade der Geräte verwendet werden?
`.trim(),

    options: [],
    correctAnswers: [],

    explanation: `
➡️ Richtige Antwort: A

Computer	Verwendbares Image
Computer1 (x64)	Image2 only
Computer2 (x86)	Image4 only
Begründung

Für ein In-Place Upgrade gelten u. a. diese Regeln:

Standard-/Default-Image verwenden

Es muss ein unverändertes Microsoft-Image (install.wim von der offiziellen ISO) sein.

Custom Images (mit vorinstallierten Anwendungen wie Office 2019) sind nicht für In-Place Upgrades geeignet, da Windows Setup eine unveränderte Komponentenstruktur erwartet.

Architektur muss übereinstimmen

x64 → x64 ✅

x86 → x86 ✅

Ein Wechsel x86 ↔ x64 ist per In-Place Upgrade nicht möglich.

Editionen/Pfade müssen kompatibel sein

Windows 8.1 Pro / Enterprise → Windows 10 Enterprise ist grundsätzlich zulässig.

Anwendung auf das Szenario:

Computer1 (x64, Windows 8.1 Pro)
→ Benötigt ein x64-Standardimage → Image2 (x64 Default Image)
→ Custom-Image (Image1) scheidet aus.

Computer2 (x86, Windows 8.1 Enterprise)
→ Benötigt ein x86-Standardimage → Image4 (x86 Default Image)
→ Custom-Image (Image3) scheidet aus.

Damit bleiben genau Image2 für Computer1 und Image4 für Computer2 übrig.

`.trim(),
  },
];
