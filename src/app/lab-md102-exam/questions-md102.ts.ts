export type Md102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: { key: string; text: string }[];
  correctAnswers?: string[];
  explanationDe?: string;
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
      "Du hast eine Microsoft 365 Subscription und verwendest die Microsoft Intune Suite.",
      "Für iOS/iPadOS wurde eine App Protection Policy (MAM) konfiguriert.",
      "",
      "Was geschieht nach 30 Minuten Inaktivität und nach fünf falschen PIN-Eingaben?"
    ].join("\n"),

    options: [
      { key: "A", text: "Nur PIN nach 30 Minuten, nach 5 Fehlversuchen Blockierung" },
      { key: "B", text: "Nur Kontodaten nach 30 Minuten, kein PIN-Reset" },
      { key: "C", text: "Nur biometrische Authentifizierung" },
      { key: "D", text: "Gerät wird gelöscht" },
      { key: "E", text: "Nach 30 Minuten: PIN + Kontozugangsdaten; nach 5 Fehlversuchen: PIN-Reset erforderlich" }
    ]
  },

  {
    id: "Q3",
    number: 3,
    area: "Manage Applications (15–20%)",
    difficulty: "easy",

    question: [
      "Du willst verhindern, dass Benutzer Daten aus App1 kopieren und in andere Apps einfügen können.",
      "Welche Policy-Art und wie viele Richtlinien sind erforderlich?"
    ].join("\n"),

    options: [
      { key: "A", text: "Device configuration policy – 1" },
      { key: "B", text: "App configuration policy – 1" },
      { key: "C", text: "App protection policy – 3" },
      { key: "D", text: "Conditional access policy – 3" }
    ]
  },

  {
    id: "Q5",
    number: 5,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Du möchtest die Startup-Prozesse und Neustarthäufigkeit von 100 Intune-Geräten messen.",
      "Welches Tool verwendest du?"
    ].join("\n"),

    options: [
      { key: "A", text: "Azure Monitor" },
      { key: "B", text: "Intune Data Warehouse" },
      { key: "C", text: "Microsoft Defender for Endpoint" },
      { key: "D", text: "Endpoint Analytics (Startup Performance)" }
    ]
  },

  {
    id: "Q6",
    number: 6,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Du hast Windows 10 Geräte, die Events an einen Log Analytics Workspace senden.",
      "Der Workspace ist konfiguriert, alle verfügbaren Logs zu sammeln.",
      "",
      "Welche Events werden gesammelt?"
    ].join("\n"),

    options: [
      { key: "A", text: "Event 1 only" },
      { key: "B", text: "Event 2 and 3 only" },
      { key: "C", text: "Event 1 and 3 only" },
      { key: "D", text: "Event 1, 2 and 4 only" },
      { key: "E", text: "Event 1, 2, 3 and 4" }
    ]
  },

  {
    id: "Q7",
    number: 7,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "Du möchtest ein Android Enterprise corporate-owned Gerät in einen Single-App-Kioskmodus versetzen.",
      "Welche Geräteeinstellung musst du im Device Restrictions Profile konfigurieren?"
    ].join("\n"),

    options: [
      { key: "A", text: "General" },
      { key: "B", text: "Users and Accounts" },
      { key: "C", text: "System Security" },
      { key: "D", text: "Device Experience (Kiosk Mode)" }
    ]
  },

  {
    id: "Q8",
    number: 8,
    area: "Protect Devices (15–20%)",
    difficulty: "easy",

    question: [
      "Du willst sicherstellen, dass ein Device Configuration Profile nur auf Device1 angewendet wird.",
      "Was musst du in der Profilkonfiguration ändern?"
    ].join("\n"),

    options: [
      { key: "A", text: "Assignments" },
      { key: "B", text: "Settings" },
      { key: "C", text: "Scope (Tags)" },
      { key: "D", text: "Applicability Rules" }
    ]
  },

  {
    id: "Q9",
    number: 9,
    area: "Protect Devices (15–20%)",
    difficulty: "medium",

    question: [
      "100 Azure AD-joined Geräte sollen zentral Updates verwalten.",
      "Welche Komponenten verwendest du?"
    ].join("\n"),

    options: [
      { key: "A", text: "WSUS + GPO" },
      { key: "B", text: "WSUS only" },
      { key: "C", text: "SCCM" },
      { key: "D", text: "GPO only" },
      { key: "E", text: "Windows Update for Business + Intune + Delivery Optimization" }
    ]
  },

  {
    id: "Q10",
    number: 10,
    area: "Manage Applications (15–20%)",
    difficulty: "medium",

    question: [
      "User1 greift auf App1 zu.",
      "Du möchtest Legacy Authentication (Basic, IMAP, POP, SMTP, MAPI) blockieren.",
      "",
      "Welche Conditional Access Condition musst du konfigurieren?"
    ].join("\n"),

    options: [
      { key: "A", text: "Filter for devices" },
      { key: "B", text: "Device platforms" },
      { key: "C", text: "User risk" },
      { key: "D", text: "Sign-in risk" },
      { key: "E", text: "Client apps (Legacy Authentication)" }
    ]
  }
]
