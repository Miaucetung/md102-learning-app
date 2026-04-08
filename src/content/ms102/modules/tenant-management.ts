// ============================================================================
// MS-102 Learning Module: Microsoft 365 Tenant Management
// ============================================================================

import type { LearningModule } from "@/content/types";

export const tenantManagementModule: LearningModule = {
  id: "ms102-mod-tenant-management",
  slug: "tenant-management",
  title: "Microsoft 365 Tenant Management",

  // -------------------------------------------------------------------------
  // 1. REAL-WORLD PROBLEM
  // -------------------------------------------------------------------------
  realWorldProblem:
    "Dein Unternehmen wechselt zu Microsoft 365. Du musst den Tenant einrichten, Domains verifizieren und sicherstellen, dass alle Dienste korrekt konfiguriert sind. Wo fängst du an?",

  // -------------------------------------------------------------------------
  // 2. CONTEXT
  // -------------------------------------------------------------------------
  context: [
    "Ein Microsoft 365 Tenant ist die dedizierte Instanz deiner Organisation in der Microsoft Cloud. Er enthält alle Benutzer, Dienste und Konfigurationen.",
    "Die Domain-Verifizierung beweist, dass du der rechtmäßige Besitzer einer Domain bist. Ohne Verifizierung kannst du keine E-Mails unter deiner Domain empfangen.",
    "Das Microsoft 365 Admin Center ist die zentrale Verwaltungsoberfläche für Benutzer, Lizenzen, Domains und grundlegende Einstellungen.",
    "Organizational Settings definieren Standardverhalten wie Sprache, Zeitzone und Release-Präferenzen für Updates.",
  ],

  // -------------------------------------------------------------------------
  // 3. LEARNING BLOCKS
  // -------------------------------------------------------------------------
  blocks: [
    // PREDICTION BLOCK
    {
      type: "prediction",
      question:
        "Du erstellst einen neuen Microsoft 365 Tenant. Was ist der ERSTE Schritt nach der Erstellung, um E-Mails unter deiner Firmendomain zu empfangen?",
      options: [
        "Exchange Online Connector konfigurieren",
        "Die Domain im Admin Center hinzufügen und verifizieren",
        "MX-Records beim DNS-Provider erstellen",
        "Postfächer für alle Benutzer anlegen",
      ],
      correctAnswer: "Die Domain im Admin Center hinzufügen und verifizieren",
      explanation:
        "Bevor du MX-Records oder Postfächer konfigurierst, musst du die Domain erst hinzufügen und Microsoft beweisen, dass sie dir gehört. Erst nach der Verifizierung kannst du DNS-Records setzen.",
      skillTags: ["tenant-setup", "domain-management"],
    },

    // CONCEPT BLOCK - Tenant Basics
    {
      type: "concept",
      title: "Was ist ein Microsoft 365 Tenant?",
      content: `Ein Tenant ist deine isolierte Microsoft 365 Umgebung:

• **Eindeutige Identität**: Jeder Tenant hat eine eindeutige ID (GUID) und einen Namen (contoso.onmicrosoft.com)
• **Datenhoheit**: Alle Daten gehören ausschließlich deiner Organisation
• **Service-Instanzen**: Exchange Online, SharePoint, Teams etc. sind pro Tenant isoliert
• **Entra ID Directory**: Enthält alle Benutzer, Gruppen und Geräte

Der Tenant-Name (z.B. contoso.onmicrosoft.com) kann NICHT geändert werden - wähle ihn also sorgfältig!`,
      keyTakeaways: [
        "Tenant = Isolierte Microsoft 365 Instanz für deine Organisation",
        "Der .onmicrosoft.com Name ist permanent und nicht änderbar",
        "Jeder Dienst (Exchange, SharePoint, Teams) ist pro Tenant separiert",
      ],
      skillTags: ["tenant-basics", "microsoft-365"],
    },

    // SCENARIO BLOCK
    {
      type: "scenario",
      title: "Domain-Verifizierung bei Contoso",
      description:
        "Als neuer Microsoft 365 Administrator musst du die Firmendomain einrichten.",
      situation:
        "Contoso hat gerade Microsoft 365 E3 Lizenzen gekauft. Der Tenant contoso.onmicrosoft.com existiert bereits. Die Firma besitzt die Domain contoso.com bei einem externen DNS-Provider (Cloudflare).",
      challenge:
        "Richte die Domain contoso.com ein, sodass Mitarbeiter E-Mails an @contoso.com empfangen können. Der DNS wird extern bei Cloudflare verwaltet.",
      options: [
        {
          label:
            "Domain im Admin Center hinzufügen → TXT-Record bei Cloudflare erstellen → Verifizierung abschließen",
          isCorrect: true,
          feedback:
            "Korrekt! Nach dem Hinzufügen der Domain zeigt Microsoft den TXT-Record an, den du bei Cloudflare hinzufügst. Nach Verifizierung konfigurierst du MX, CNAME und weitere Records.",
        },
        {
          label:
            "Zuerst alle DNS-Records bei Cloudflare anlegen, dann Domain im Admin Center hinzufügen",
          isCorrect: false,
          feedback:
            "Falsche Reihenfolge. Du musst erst die Domain hinzufügen, um die korrekten Verifizierungs- und Service-Records zu erhalten.",
        },
        {
          label:
            "Cloudflare DNS zu Microsoft DNS übertragen, dann Domain hinzufügen",
          isCorrect: false,
          feedback:
            "Nicht notwendig. Microsoft unterstützt externe DNS-Provider. Du musst nur die Records manuell eintragen.",
        },
      ],
      realWorldTip:
        "Notiere dir den TXT-Verifizierungs-Record - du brauchst ihn auch für andere Microsoft-Dienste wie Intune oder Azure.",
      skillTags: ["domain-verification", "dns-management"],
    },

    // COMPARISON BLOCK - Verifizierungsmethoden
    {
      type: "comparison",
      title: "Domain-Verifizierungsmethoden",
      description:
        "Microsoft bietet verschiedene Methoden zur Domain-Verifizierung an.",
      items: [
        {
          name: "TXT-Record",
          characteristics: [
            "Empfohlene Methode",
            "Einfach hinzuzufügen und zu entfernen",
            "Beeinflusst keine anderen Dienste",
            "Format: MS=msXXXXXXXX",
          ],
        },
        {
          name: "MX-Record",
          characteristics: [
            "Alternative Methode",
            "Kann E-Mail-Empfang kurzzeitig stören",
            "Überschreibt evtl. bestehende MX-Records",
            "Weniger empfohlen",
          ],
        },
      ],
      keyDifferences: [
        {
          aspect: "Risiko",
          optionA: "TXT: Kein Risiko für bestehende Dienste",
          optionB: "MX: Kann E-Mail-Zustellung unterbrechen",
        },
        {
          aspect: "Geschwindigkeit",
          optionA: "TXT: Sofort nach DNS-Propagation",
          optionB: "MX: Gleich schnell, aber riskanter",
        },
        {
          aspect: "Best Practice",
          optionA: "TXT: Microsoft-Empfehlung",
          optionB: "MX: Nur wenn TXT nicht möglich",
        },
      ],
      recommendation:
        "Verwende IMMER die TXT-Record-Methode, es sei denn, dein DNS-Provider unterstützt keine TXT-Records (sehr selten).",
      skillTags: ["domain-verification", "dns"],
    },

    // TERMINAL BLOCK - PowerShell
    {
      type: "terminal",
      title: "Tenant-Informationen mit PowerShell abrufen",
      description:
        "Nutze Microsoft Graph PowerShell, um Tenant-Details abzurufen.",
      commands: [
        {
          command: "Install-Module Microsoft.Graph -Scope CurrentUser",
          output: "Installing module...",
          explanation: "Installiert das Microsoft Graph PowerShell SDK",
        },
        {
          command: "Connect-MgGraph -Scopes 'Organization.Read.All'",
          output: "Welcome to Microsoft Graph!",
          explanation:
            "Verbindet sich mit Graph API und fordert Leserechte für Organisationsdaten an",
        },
        {
          command:
            "Get-MgOrganization | Select-Object DisplayName, Id, VerifiedDomains",
          output:
            "DisplayName  Id                                   VerifiedDomains\n-----------  --                                   ---------------\nContoso      a1b2c3d4-...                         {contoso.onmicrosoft.com, contoso.com}",
          explanation:
            "Zeigt Tenant-Name, ID und alle verifizierten Domains an",
        },
      ],
      tips: [
        "Connect-MgGraph öffnet einen Browser zur Authentifizierung",
        "Für Automatisierung nutze App Registration mit Client Secret",
        "Graph PowerShell ersetzt die alten MSOnline und AzureAD Module",
      ],
      skillTags: ["powershell", "graph-api", "tenant-management"],
    },

    // GUIDED DECISION BLOCK
    {
      type: "guided-decision",
      title: "Release-Kanal auswählen",
      scenario:
        "Du konfigurierst die Organizational Settings. Die Geschäftsführung fragt, ob ihr neue Microsoft 365 Features früher oder später erhalten sollt.",
      steps: [
        {
          question:
            "Wie risikofreudig ist dein Unternehmen bezüglich neuer Features?",
          options: [
            {
              label: "Konservativ - Stabilität geht vor",
              isCorrect: true,
              nextStep: 1,
            },
            {
              label: "Progressiv - Wir wollen neue Features sofort",
              isCorrect: false,
            },
          ],
          explanation:
            "Für die meisten Unternehmen ist der Standard Release Track die richtige Wahl.",
        },
        {
          question:
            "Möchtest du trotzdem eine kleine Gruppe von Early Adopters haben?",
          options: [
            {
              label: "Ja - IT-Team und Power User als Tester",
              isCorrect: true,
            },
            {
              label: "Nein - Alle sollen dieselbe Version haben",
              isCorrect: false,
            },
          ],
          explanation:
            "Targeted Release für ausgewählte Benutzer ist Best Practice - so kannst du Features testen, bevor sie alle Benutzer erreichen.",
        },
      ],
      summary:
        "Best Practice: Standard Release für die meisten Benutzer, Targeted Release für IT-Team und ausgewählte Power User.",
      skillTags: ["release-management", "organizational-settings"],
    },

    // MISTAKE BLOCK
    {
      type: "mistake",
      title: "Häufige Tenant-Setup-Fehler",
      description:
        "Diese Fehler können zu Problemen führen, die später schwer zu beheben sind.",
      mistakes: [
        {
          wrong: "Tenant-Name ohne Nachdenken wählen (z.B. 'test123')",
          correct:
            "Professionellen Namen wählen, der zur Firma passt (z.B. 'contoso')",
          explanation:
            "Der .onmicrosoft.com Name erscheint in URLs, Einladungen und kann NICHT geändert werden.",
          consequence:
            "Unprofessionelle Außenwirkung, peinliche URLs in SharePoint-Links.",
        },
        {
          wrong: "Alle Benutzer auf Targeted Release setzen",
          correct: "Nur IT-Team und ausgewählte User auf Targeted Release",
          explanation:
            "Targeted Release Features können Bugs enthalten und verwirren normale Benutzer.",
          consequence:
            "Supportanfragen steigen, Benutzer sehen unterschiedliche Oberflächen.",
        },
        {
          wrong:
            "Domain-Verifizierung überspringen und direkt DNS-Records setzen",
          correct:
            "Domain zuerst verifizieren, dann Service-Records konfigurieren",
          explanation:
            "Ohne Verifizierung akzeptiert Microsoft die Domain nicht. DNS-Records ohne Verifizierung sind nutzlos.",
          consequence:
            "E-Mails kommen nicht an, Zeit mit DNS-Troubleshooting verschwendet.",
        },
      ],
      skillTags: ["tenant-setup", "best-practices"],
    },

    // EXAM TRAP BLOCK
    {
      type: "exam-trap",
      title: "Tenant-Region und Datenresidenz",
      trapDescription:
        "Prüfungsfragen zu Tenant-Region und wo Daten gespeichert werden.",
      commonMistake:
        "Annehmen, dass die Tenant-Region nachträglich geändert werden kann.",
      correctApproach:
        "Die Tenant-Region wird bei der Erstellung festgelegt und kann NICHT geändert werden. Sie bestimmt, wo Core-Daten gespeichert werden.",
      examPhrasing: [
        "A company needs to ensure data residency in the EU. What should you do?",
        "You need to move tenant data to a different region. What are your options?",
        "Where is Exchange Online data stored for a tenant created in Germany?",
      ],
      skillTags: ["data-residency", "tenant-region", "exam-prep"],
    },

    // PRACTICE BLOCK
    {
      type: "practice",
      title: "Domain hinzufügen - Schritt für Schritt",
      instruction:
        "Füge eine benutzerdefinierte Domain zu deinem Microsoft 365 Tenant hinzu.",
      steps: [
        "Öffne admin.microsoft.com und melde dich als Global Admin an",
        "Navigiere zu Settings > Domains",
        "Klicke auf 'Add domain' und gib deine Domain ein",
        "Wähle 'Add a TXT record' als Verifizierungsmethode",
        "Kopiere den angezeigten TXT-Record-Wert (MS=msXXXXXXXX)",
        "Öffne deinen DNS-Provider und erstelle einen TXT-Record mit diesem Wert",
        "Warte 5-15 Minuten auf DNS-Propagation",
        "Klicke 'Verify' im Admin Center",
      ],
      hints: [
        "DNS-Propagation kann bis zu 48 Stunden dauern, meist aber nur 5-15 Minuten",
        "Mit nslookup -type=TXT domain.com kannst du prüfen, ob der Record propagiert wurde",
        "Falls Verify fehlschlägt, warte etwas länger und versuche es erneut",
      ],
      expectedOutcome:
        "Die Domain zeigt 'Healthy' Status und du kannst sie als primäre Domain für Benutzer festlegen.",
      skillTags: ["domain-management", "admin-center"],
    },

    // SUMMARY BLOCK
    {
      type: "summary",
      title: "Zusammenfassung: Tenant Management",
      keyPoints: [
        "Tenant-Name (.onmicrosoft.com) ist permanent - sorgfältig wählen!",
        "Domain-Verifizierung via TXT-Record ist Best Practice",
        "Tenant-Region bestimmt Datenresidenz und kann nicht geändert werden",
        "Standard Release für alle, Targeted Release nur für ausgewählte Tester",
        "Microsoft Graph PowerShell ersetzt MSOnline und AzureAD Module",
      ],
      examRelevance: {
        weight: "10-15%",
        frequentTopics: [
          "Domain-Verifizierungsmethoden",
          "Tenant-Region und Datenresidenz",
          "Release-Kanäle konfigurieren",
          "Organizational Settings",
        ],
      },
      nextSteps: [
        "Praktische Übung: Domain verifizieren",
        "Nächstes Thema: Benutzerverwaltung",
      ],
      skillTags: ["tenant-management", "summary"],
    },
  ],

  // -------------------------------------------------------------------------
  // 4. LAB SCENARIO
  // -------------------------------------------------------------------------
  labScenario: {
    slug: "tenant-domain-setup",
    title: "Domain zu Microsoft 365 hinzufügen",
    description:
      "Verifiziere eine benutzerdefinierte Domain und konfiguriere die Grundeinstellungen.",
    environment: "Microsoft 365 Admin Center",
    estimatedMinutes: 20,
    steps: [
      {
        id: 1,
        title: "Admin Center öffnen",
        description: "Melde dich im Microsoft 365 Admin Center an.",
        detailedInstructions: [
          "Öffne admin.microsoft.com",
          "Melde dich mit einem Global Admin Account an",
          "Navigiere zu Settings > Domains",
        ],
      },
      {
        id: 2,
        title: "Domain hinzufügen",
        description: "Füge deine benutzerdefinierte Domain hinzu.",
        detailedInstructions: [
          "Klicke auf 'Add domain'",
          "Gib deine Domain ein (z.B. contoso.com)",
          "Klicke 'Use this domain'",
        ],
      },
      {
        id: 3,
        title: "TXT-Record erstellen",
        description:
          "Erstelle den Verifizierungs-TXT-Record bei deinem DNS-Provider.",
        detailedInstructions: [
          "Kopiere den angezeigten TXT-Wert (MS=msXXXXXXXX)",
          "Öffne deinen DNS-Provider (z.B. Cloudflare, GoDaddy)",
          "Erstelle einen neuen TXT-Record für @ mit dem kopierten Wert",
        ],
      },
      {
        id: 4,
        title: "Verifizierung abschließen",
        description:
          "Warte auf DNS-Propagation und schließe die Verifizierung ab.",
        detailedInstructions: [
          "Warte 5-15 Minuten",
          "Klicke 'Verify' im Admin Center",
          "Nach erfolgreicher Verifizierung: Domain als primär festlegen",
        ],
      },
    ],
    validation:
      "Die Domain zeigt 'Healthy' Status und ist als verifiziert markiert.",
  },

  // -------------------------------------------------------------------------
  // 5. CHECKPOINTS
  // -------------------------------------------------------------------------
  checkpoints: [
    {
      questionId: "ms102-q-tenant-001",
      order: 1,
      introText: "Teste dein Verständnis von Tenant-Grundlagen:",
    },
  ],

  // -------------------------------------------------------------------------
  // 6. EXPLANATION
  // -------------------------------------------------------------------------
  explanation: {
    why: "Tenant Management ist das Fundament jeder Microsoft 365 Umgebung. Ohne korrekte Domain-Konfiguration funktionieren E-Mail, Teams und andere Dienste nicht mit deiner Firmendomain.",
    how: "Der Tenant wird bei der Erstellung in einer Region angelegt. Domains werden hinzugefügt und via DNS-Records verifiziert. Nach Verifizierung können Service-Records (MX, CNAME, etc.) konfiguriert werden.",
    deepDive: `
## Tenant-Architektur

Der Microsoft 365 Tenant besteht aus mehreren Komponenten:

1. **Entra ID Directory**
   - Enthält alle Identitäten (Benutzer, Gruppen, Geräte)
   - Basis für Authentifizierung und Autorisierung

2. **Service-Instanzen**
   - Exchange Online (E-Mail)
   - SharePoint Online (Dateien/Sites)
   - Teams (Kommunikation)
   - Jeder Dienst hat eigene Admin-Center

3. **Domains**
   - Default: tenant.onmicrosoft.com
   - Custom: contoso.com, fabrikam.com, etc.
   - Jede Domain muss separat verifiziert werden

4. **Subscriptions/Lizenzen**
   - E3, E5, Business Premium, etc.
   - Bestimmen verfügbare Features
    `,
    commonQuestions: [
      {
        question: "Kann ich den Tenant-Namen ändern?",
        answer:
          "Nein, der .onmicrosoft.com Name ist permanent. Du kannst aber eine Custom Domain als primäre Domain festlegen, sodass Benutzer diese sehen.",
      },
      {
        question: "Wie lange dauert Domain-Verifizierung?",
        answer:
          "Nach dem Erstellen des TXT-Records: meist 5-15 Minuten, maximal 48 Stunden für DNS-Propagation.",
      },
      {
        question: "Kann ich einen Tenant in eine andere Region verschieben?",
        answer:
          "Nein, die Region ist permanent. Für Multi-Geo brauchst du entsprechende Lizenzen, aber der Haupt-Tenant bleibt in der ursprünglichen Region.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. TRANSFER TASK
  // -------------------------------------------------------------------------
  transferTask: {
    title: "Tenant für Fusion vorbereiten",
    description: `Contoso übernimmt Fabrikam. Beide Unternehmen haben separate Microsoft 365 Tenants:
- contoso.onmicrosoft.com (EU-Region, 500 Benutzer)
- fabrikam.onmicrosoft.com (US-Region, 200 Benutzer)

Entwickle einen Plan für die Integration:
1. Welche Optionen hast du für die Tenant-Konsolidierung?
2. Was passiert mit den verschiedenen Regionen?
3. Wie gehst du mit den unterschiedlichen Domains um?`,
    hints: [
      "Tenant-zu-Tenant Migration ist möglich, aber komplex",
      "Cross-Tenant Collaboration ist eine Alternative zur vollständigen Fusion",
      "Datenresidenz-Anforderungen könnten eine vollständige Fusion verhindern",
    ],
    expectedOutcome: `Optionen:
1. Cross-Tenant Trust für Zusammenarbeit ohne Migration
2. Tenant-zu-Tenant Migration (mit Tools wie BitTitan)
3. Beide Tenants behalten mit Azure AD B2B

Region: Kann nicht geändert werden - GDPR könnte vollständige Fusion in einen US-Tenant verhindern.

Domains: Beide Domains können zu einem Tenant hinzugefügt werden, aber erst nach Migration.`,
  },

  // -------------------------------------------------------------------------
  // METADATA
  // -------------------------------------------------------------------------
  topic: "tenant-management",
  track: "ms102-fundamentals",
  difficulty: "beginner",
  estimatedMinutes: 25,
  prerequisites: [],
  relatedModules: ["user-management", "license-management"],
  skillTags: ["tenant", "domain", "microsoft-365", "admin-center"],
};
