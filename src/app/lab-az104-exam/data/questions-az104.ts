// src/app/lab-az104-exam/data/questions-az104.ts

export type Az104Question = {
  /** z.B. "Q1" – wird im Header angezeigt */
  id: string;
  /** Laufende Nummer im Test */
  number: number;
  /** Themenbereich wie im AZ-104-Blueprint */
  area: string;
  /** grobe Schwierigkeit */
  difficulty: "easy" | "medium" | "hard";
  /** Vollständiger Fragetext (mit \n für Zeilenumbrüche) */
  question: string;
  /** Antwortoptionen (A, B, C, …) */
  options: { key: string; text: string }[];
  /** Richtige Antwort(en), z.B. ["D"] oder ["B", "C"] */
  correctAnswers: string[];
  /** Ausführliche Erklärung (DE) */
  explanationDe: string;
};

export const QUESTIONS_AZ104: Az104Question[] = [
  {
    id: "Q1",
    number: 1,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure virtual machine that runs Windows Server 2019 and has the following configurations:",
      "",
      "Name: VM1",
      "Location: West US",
      "Connected to: VNET1",
      "Private IP address: 10.1.0.4",
      "Public IP address: 52.186.85.63",
      "DNS suffix in Windows Server: Adatum.com",
      "",
      "You create the Azure DNS zones shown in the following table.",
      "",
      "| Zone name        | Type    |",
      "|------------------|---------|",
      "| Adatum.com       | Public  |",
      "| Adatum.pri       | Private |",
      "",
      "Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.",
      "(NOTE: Each correct selection is worth one point.)",
    ].join("\n"),

    options: [
      {
        key: "A",
        text:
          "DNS zones that you can link to VNET1: Adatum.com only; " +
          "DNS zones to which VM1 can automatically register: Adatum.com only",
      },
      {
        key: "B",
        text:
          "DNS zones that you can link to VNET1: Adatum.com only; " +
          "DNS zones to which VM1 can automatically register: The public zones only",
      },
      {
        key: "C",
        text:
          "DNS zones that you can link to VNET1: Adatum.pri and adatum.com only; " +
          "DNS zones to which VM1 can automatically register: Adatum.pri and adatum.com only",
      },
      {
        key: "D",
        text:
          "DNS zones that you can link to VNET1: The private zones only; " +
          "DNS zones to which VM1 can automatically register: The private zones only",
      },
      {
        key: "E",
        text:
          "DNS zones that you can link to VNET1: The private zones only; " +
          "DNS zones to which VM1 can automatically register: Adatum.com only",
      },
      {
        key: "F",
        text:
          "DNS zones that you can link to VNET1: The public zones only; " +
          "DNS zones to which VM1 can automatically register: Adatum.pri and adatum.com only",
      },
    ],

    correctAnswers: ["D"],

    explanationDe: [
      "Um DNS-Einträge einer privaten DNS-Zone aus einem virtuellen Netzwerk aufzulösen, muss das virtuelle Netzwerk mit der privaten Zone verknüpft sein.",
      "Verknüpfte VNets können alle DNS-Einträge der privaten Zone auflösen.",
      "",
      "Nur **private DNS-Zonen** unterstützen:",
      "• das Verknüpfen mit virtuellen Netzwerken (Virtual network links) und",
      "• die automatische Registrierung (Autoregistration) von DNS-Einträgen der VMs.",
      "",
      "Öffentliche DNS-Zonen können **nicht** mit VNets verknüpft werden und unterstützen **keine** automatische Registrierung.",
      "",
      "VM1 hat den primären DNS-Suffix \"Adatum.com\". Damit sich der Host automatisch registrieren könnte, müsste \"Adatum.com\" eine private Zone sein.",
      "In der Aufgabenstellung ist aber nur **Adatum.pri** als private Zone angegeben, die öffentliche Zone \"Adatum.com\" kann nicht verlinkt oder für Autoregistrierung genutzt werden.",
      "",
      "Daher gilt:",
      "• Mit VNET1 verknüpfen kannst du nur die **privaten Zonen**.",
      "• Automatisch registrieren können sich VMs nur in **privaten Zonen**.",
      "",
      "Richtige Antwort: **D – The private zones only / The private zones only**.",
    ].join("\n"),
  },

  // Später: Q2, Q3 … einfach hier anhängen
];
