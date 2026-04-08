// ============================================================================
// MS-102: Entra ID Security & Conditional Access Module
// ============================================================================

// Note: This module uses extended block structure
export const entraSecurityModule = {
  id: "ms102-entra-security",
  slug: "entra-security",
  title: "Entra ID Security & Conditional Access",
  description:
    "Sichere Identitäten mit MFA, Conditional Access Policies und Identity Protection. Zero Trust Architektur in der Praxis.",
  certification: "MS-102",
  track: "Security & Compliance",
  estimatedMinutes: 60,
  difficulty: "advanced",
  prerequisites: ["ms102-tenant-management", "ms102-user-management"],

  realWorldProblem: `
Vergangene Woche wurde ein Mitarbeiter-Account kompromittiert. Der Angreifer hat sich von einer IP in Russland eingeloggt, obwohl der Mitarbeiter in Deutschland sitzt. Das Passwort wurde via Phishing gestohlen. Die Geschäftsführung fordert: "Das darf NIE wieder passieren!"

DEINE AUFGABE: Als Security Administrator musst du sicherstellen, dass selbst gestohlene Passwörter nicht für unbefugten Zugriff genutzt werden können - ohne die Benutzerfreundlichkeit komplett zu opfern.
  `,

  context: [
    "In einer Zero Trust Welt ist die Identität der neue Perimeter. Conditional Access ermöglicht kontextbasierte Zugriffssteuerung: Je nach Risiko (Standort, Gerät, Benutzerverhalten) werden unterschiedliche Sicherheitsanforderungen gestellt.",
    "Zero Trust = 'Never trust, always verify' - prüfe jeden Zugriff unabhängig vom Netzwerkstandort. Conditional Access = If-Then Regeln für Zugriff (WENN Bedingungen DANN Zugriffsentscheidung).",
    "MFA (Multi-Factor Authentication) = Authentifizierung mit mindestens 2 Faktoren: Wissen + Besitz oder Biometrie. Identity Protection = KI-basierte Erkennung von Anmelde-Risiken wie Impossible Travel oder Leaked Credentials.",
    "Named Locations = Definierte IP-Bereiche oder Länder für Conditional Access Regeln. Break Glass Accounts = Notfall-Admin Konten ohne MFA für den Fall dass CA fehlkonfiguriert ist.",
  ],

  blocks: [
    // Block 1: Prediction
    {
      type: "prediction",
      id: "predict-ca-components",
      title: "Conditional Access verstehen",
      question:
        "Welche drei Hauptkomponenten hat jede Conditional Access Policy?",
      options: [
        "Users, Devices, Applications",
        "Assignments, Conditions, Access Controls",
        "Authentication, Authorization, Audit",
        "Identity, Location, Time",
      ],
      correctIndex: 1,
      explanation:
        "Jede CA Policy besteht aus: 1) Assignments (WER: Benutzer/Gruppen, WAS: Apps), 2) Conditions (WANN: Standort, Gerätestatus, Risiko), 3) Access Controls (DANN: Gewähren, Blockieren, MFA erfordern)",
      reflection:
        "Wie würdest du eine Policy strukturieren, die MFA nur für Zugriffe von außerhalb des Firmennetzwerks erfordert?",
    },

    // Block 2: Concept - CA Architecture
    {
      type: "concept",
      id: "ca-architecture",
      title: "Conditional Access Architektur",
      content: `### So funktioniert Conditional Access

**Die Evaluierung bei jedem Login:**

\`\`\`
      [Benutzer will auf App zugreifen]
                    │
                    ▼
      ┌─────────────────────────────┐
      │   ASSIGNMENT CHECK          │
      │   - Betroffen von Policy?   │
      │   - Welche Apps?            │
      └─────────────────────────────┘
                    │
                    ▼
      ┌─────────────────────────────┐
      │   CONDITIONS CHECK          │
      │   - Standort                │
      │   - Gerätetyp               │
      │   - Risikostufe             │
      │   - Client App              │
      └─────────────────────────────┘
                    │
                    ▼
      ┌─────────────────────────────┐
      │   ACCESS CONTROL            │
      │   Grant: MFA, Compliant     │
      │   Device, Terms of Use      │
      │   Block: Zugriff verweigern │
      └─────────────────────────────┘
\`\`\`

**Wichtige Prinzipien:**
- Policies werden **kombiniert** ausgewertet (AND-Logik)
- **Block** überschreibt immer **Grant**
- Policies gelten für **Cloud Apps**, nicht On-Premises
- **Report-only** Modus zum Testen ohne Auswirkung`,
      keyTakeaways: [
        "CA = Assignment + Conditions → Access Control",
        "Block gewinnt immer über Grant",
        "Mehrere Policies werden kombiniert evaluiert",
        "Immer erst in Report-only testen!",
      ],
    },

    // Block 3: Scenario - Build a Policy
    {
      type: "scenario",
      id: "scenario-require-mfa",
      title: "MFA Policy erstellen",
      context:
        "Die Geschäftsführung will, dass alle Zugriffe auf Microsoft 365 von außerhalb des Firmennetzwerks MFA erfordern. Intern soll kein MFA nötig sein.",
      challenge:
        "Konzipiere eine Conditional Access Policy, die diese Anforderung umsetzt.",
      options: [
        {
          choice:
            "Eine Policy: Alle Benutzer + Alle Apps + Nicht-vertrauenswürdiger Standort → MFA erforderlich",
          outcome:
            "Korrekt! Named Location für Firmennetzwerk als 'trusted' markieren, dann Policy erstellen die MFA fordert wenn Standort NICHT trusted ist.",
          isOptimal: true,
        },
        {
          choice:
            "Zwei Policies: Eine blockiert externe Zugriffe, eine erlaubt interne",
          outcome:
            "Zu restriktiv - Externe Zugriffe sollen ja möglich sein, nur mit MFA",
          isOptimal: false,
        },
        {
          choice: "MFA für alle aktivieren, ohne Conditional Access",
          outcome:
            "Dann müssten auch interne Benutzer immer MFA machen - nicht gewünscht",
          isOptimal: false,
        },
        {
          choice: "VPN-Pflicht für alle externen Zugriffe",
          outcome:
            "Funktioniert technisch, aber ist nicht die gewünschte Zero Trust Lösung und belastet VPN-Infrastruktur",
          isOptimal: false,
        },
      ],
      expertTip:
        "Denke in 'Signalen' (Standort, Gerät, Risiko) die zu 'Entscheidungen' (MFA, Block, Erlauben) führen. Named Locations sind die Grundlage für standortbasierte Policies.",
    },

    // Block 4: Practice - Named Locations
    {
      type: "practice",
      id: "practice-named-locations",
      title: "Named Locations konfigurieren",
      goal: "Erstelle eine Named Location für das Firmennetzwerk",
      steps: [
        {
          instruction:
            "1. Öffne Entra Admin Center > Protection > Conditional Access > Named locations",
          hint: "Der direkte Pfad ist https://entra.microsoft.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/NamedLocations",
        },
        {
          instruction: "2. Klicke '+ IP ranges location'",
          hint: "Es gibt auch 'Countries location' für länderbasierte Regeln",
        },
        {
          instruction: "3. Gib einen Namen ein: 'Corporate Network'",
          hint: "Wähle einen eindeutigen, beschreibenden Namen",
        },
        {
          instruction:
            "4. Füge die öffentliche IP-Range deines Firmennetzwerks hinzu (z.B. 203.0.113.0/24)",
          hint: "Du findest deine öffentliche IP auf whatismyip.com",
        },
        {
          instruction: "5. Aktiviere 'Mark as trusted location' und speichere",
          hint: "Diese Markierung ist wichtig für 'Require MFA for untrusted locations' Policies",
        },
      ],
      successCriteria:
        "Die Named Location erscheint in der Liste und ist als 'Trusted' markiert",
    },

    // Block 5: Guided Decision - Policy Design
    {
      type: "guided-decision",
      id: "decision-policy-design",
      title: "Die richtige Policy für jedes Szenario",
      scenario:
        "Du musst verschiedene Sicherheitsanforderungen mit Conditional Access umsetzen. Wähle für jedes Szenario die passende Policy-Konfiguration.",
      decisions: [
        {
          question:
            "Admins sollen IMMER MFA machen müssen, egal von wo sie zugreifen",
          options: [
            "Users: Directory Roles: Global Admin | Conditions: Any | Grant: Require MFA",
            "Users: All Users | Apps: Admin Portals | Grant: Require MFA",
            "Users: Directory Roles: All Admin Roles | Conditions: None | Grant: Require MFA",
          ],
          correctIndex: 2,
          explanation:
            "Für Admins sollte MFA bedingungslos sein. Targeting über Directory Roles statt Gruppen ist Best Practice, da es automatisch alle Admins erfasst.",
        },
        {
          question:
            "Gäste sollen nur von managed Devices auf SharePoint zugreifen",
          options: [
            "Users: All guests | Apps: SharePoint | Grant: Require compliant device",
            "Users: All guests | Apps: SharePoint | Grant: Require Hybrid Azure AD Join",
            "Users: All guests | Apps: SharePoint | Grant: Require device marked as compliant",
          ],
          correctIndex: 2,
          explanation:
            "'Require device to be marked as compliant' funktioniert für Intune-managed Devices. Hybrid Join funktioniert nicht für Gäste da deren Geräte nicht in eurem AD sind.",
        },
        {
          question: "Hochrisiko-Anmeldungen sollen blockiert werden",
          options: [
            "Users: All | Conditions: Sign-in risk = High | Access: Block",
            "Users: All | Conditions: User risk = High | Access: Block",
            "Users: All | Conditions: Any risk | Access: Block",
          ],
          correctIndex: 0,
          explanation:
            "Sign-in Risk bezieht sich auf das aktuelle Login (z.B. Impossible Travel). User Risk bezieht sich auf den Benutzer selbst (z.B. Leaked Credentials). Für Login-Blockade ist Sign-in Risk richtig.",
        },
      ],
    },

    // Block 6: Concept - MFA Methods
    {
      type: "concept",
      id: "mfa-methods",
      title: "MFA Methoden im Vergleich",
      content: `### Authentication Methods Strength

**Phishing-resistant (Stärkste):**
- FIDO2 Security Keys (YubiKey etc.)
- Windows Hello for Business
- Certificate-based Authentication

**Strong (Empfohlen):**
- Microsoft Authenticator (Push + Number Matching)
- Hardware OATH Tokens

**Standard:**
- Microsoft Authenticator (Code)
- Software OATH Tokens (Google Authenticator etc.)

**Weniger sicher (Vermeiden wenn möglich):**
- SMS
- Voice Call

### Number Matching & Additional Context

Seit 2023 ist **Number Matching** für Microsoft Authenticator Push standardmäßig aktiviert:

1. Benutzer startet Login
2. Wird aufgefordert auf Authenticator zu bestätigen
3. Muss die angezeigte Zahl (z.B. "47") in der App eingeben
4. Verhindert MFA-Fatigue Angriffe

**Additional Context** zeigt:
- App die Zugriff anfordert
- Standort des Login
- Gerät das verwendet wird`,
      keyTakeaways: [
        "FIDO2 und Windows Hello sind am stärksten (Phishing-resistant)",
        "Microsoft Authenticator mit Number Matching ist Standard",
        "SMS und Voice vermeiden wenn möglich",
        "Number Matching verhindert MFA-Fatigue Attacks",
      ],
    },

    // Block 7: Exam Trap
    {
      type: "exam-trap",
      id: "trap-ca-evaluation",
      title: "Prüfungsfalle: Policy Evaluation Order",
      trap: "In der Prüfung wird oft gefragt, was passiert wenn mehrere Policies auf einen Benutzer zutreffen. Viele denken, die 'erste' oder 'spezifischste' Policy gewinnt.",
      correctUnderstanding:
        "ALLE zutreffenden Policies werden kombiniert ausgewertet. Alle Grant-Controls müssen erfüllt werden (AND-Logik). Sobald EINE Policy 'Block' hat, wird der Zugriff verweigert - Block gewinnt IMMER.",
      commonMistake:
        "Policy A: Require MFA, Policy B: Require Compliant Device → Benutzer muss BEIDES erfüllen, nicht nur eines!",
      examTip:
        "Wenn eine Antwort 'OR' zwischen Grant-Controls impliziert, ist sie falsch. Ausnahme: Innerhalb einer Policy kann man 'Require one of the selected controls' wählen.",
    },

    // Block 8: Terminal - CA PowerShell
    {
      type: "terminal",
      id: "terminal-ca-policies",
      title: "Conditional Access mit PowerShell verwalten",
      goal: "CA Policies mit Microsoft Graph PowerShell auslesen und Report erstellen",
      commands: [
        {
          command:
            'Connect-MgGraph -Scopes "Policy.Read.All", "Policy.ReadWrite.ConditionalAccess"',
          explanation: "Verbindet mit den nötigen Berechtigungen für CA",
        },
        {
          command:
            "Get-MgIdentityConditionalAccessPolicy | Select DisplayName, State",
          explanation: "Listet alle CA Policies mit Name und Status",
        },
        {
          command: `Get-MgIdentityConditionalAccessPolicy | ForEach-Object {
    [PSCustomObject]@{
        Name = $_.DisplayName
        State = $_.State
        Users = ($_.Conditions.Users.IncludeUsers -join ", ")
        Apps = ($_.Conditions.Applications.IncludeApplications -join ", ")
        GrantControls = ($_.GrantControls.BuiltInControls -join ", ")
    }
} | Format-Table -AutoSize`,
          explanation: "Erstellt einen übersichtlichen Policy-Report",
        },
        {
          command: `# Policy auf Report-Only setzen
$policy = Get-MgIdentityConditionalAccessPolicy -Filter "displayName eq 'Require MFA External'"
Update-MgIdentityConditionalAccessPolicy -ConditionalAccessPolicyId $policy.Id -State "enabledForReportingButNotEnforced"`,
          explanation: "Setzt eine Policy in den Report-Only Modus zum Testen",
        },
      ],
      validation: {
        expectedOutput: "Policy State updated to Report-Only",
        successMessage: "CA Policy Report erstellt und Policy angepasst!",
      },
    },

    // Block 9: Comparison - Risk Types
    {
      type: "comparison",
      id: "compare-risk-types",
      title: "Sign-in Risk vs. User Risk",
      itemA: {
        name: "Sign-in Risk",
        description: "Risiko dieser spezifischen Anmeldung",
        features: [
          "Wird bei jedem Login neu berechnet",
          "Impossible Travel Detection",
          "Anonymous IP (TOR, VPN)",
          "Atypical Travel",
          "Malware-linked IP Address",
        ],
      },
      itemB: {
        name: "User Risk",
        description: "Risiko des Benutzerkontos insgesamt",
        features: [
          "Persistiert bis zur Remediation",
          "Leaked Credentials detected",
          "Azure AD Threat Intelligence",
          "Unusual user behavior over time",
          "Erfordert Passwort-Reset zur Behebung",
        ],
      },
      useItemAWhen: [
        "Einzelne verdächtige Logins blockieren/MFA fordern",
        "Unmittelbare Reaktion auf verdächtige Aktivität",
        "Standort-basierte Anomalien erkennen",
      ],
      useItemBWhen: [
        "Kompromittierte Konten identifizieren",
        "Passwort wurde im Dark Web gefunden",
        "Langfristiges verdächtiges Verhalten",
      ],
    },

    // Block 10: Mistake Analysis
    {
      type: "mistake",
      id: "mistake-lock-yourself-out",
      title: "Sich selbst aussperren",
      scenario:
        "Ein Admin erstellt eine CA Policy 'Block all access except from Germany' und aktiviert sie sofort. Er ist gerade in Österreich auf einer Konferenz...",
      mistake:
        "Die Policy wurde ohne Emergency Access Accounts und ohne Report-Only Test direkt aktiviert.",
      consequence:
        "Der Admin und alle anderen, die gerade außerhalb Deutschlands sind, werden sofort gesperrt. Ohne Break-Glass Account ist die Wiederherstellung schwierig.",
      betterApproach: `**Best Practices für CA Policies:**

1. **Break-Glass Accounts erstellen:**
   - 2 Cloud-only Admin Accounts
   - Von ALLEN CA Policies ausgeschlossen
   - Starkes Passwort, physisch sicher aufbewahrt
   - MFA mit FIDO2 Key (physisch separat gelagert)

2. **Immer in Report-Only starten:**
\`\`\`
State: enabledForReportingButNotEnforced
\`\`\`
   - 1-2 Wochen monitoren
   - Sign-in Logs prüfen
   - Erst dann auf "On" schalten

3. **Schrittweise einführen:**
   - Erst für Pilotgruppe
   - Dann erweitern
   - Nie "All Users" ohne Exclude-Gruppe`,
      lessonLearned:
        "Emergency Access Accounts sind PFLICHT. Immer Report-Only testen. Nie von einer aktiven Session aus Policies aktivieren die dich selbst betreffen könnten.",
    },

    // Block 11: Summary
    {
      type: "summary",
      id: "summary-entra-security",
      title: "Entra ID Security - Zusammenfassung",
      keyPoints: [
        "Conditional Access = Assignments + Conditions → Access Controls",
        "Block überschreibt immer Grant bei mehreren Policies",
        "Named Locations definieren vertrauenswürdige Netzwerke",
        "Sign-in Risk = dieses Login, User Risk = Account insgesamt",
        "FIDO2 und Windows Hello sind die stärksten MFA Methoden",
        "Number Matching schützt vor MFA-Fatigue Attacks",
        "Break-Glass Accounts von allen Policies ausschließen",
        "IMMER in Report-Only testen vor Aktivierung",
      ],
      examPriority: [
        {
          topic: "CA Policy Evaluation Logic",
          importance: "high",
          reason: "Sehr häufig gefragt: Was passiert bei mehreren Policies?",
        },
        {
          topic: "Sign-in vs. User Risk",
          importance: "high",
          reason: "Unterschied muss klar sein für Identity Protection Fragen",
        },
        {
          topic: "MFA Method Strength",
          importance: "medium",
          reason: "Welche Methode für welches Szenario?",
        },
      ],
      nextSteps: [
        "Named Locations für dein Netzwerk konfigurieren",
        "Break-Glass Accounts erstellen und sichern",
        "Erste CA Policy in Report-Only testen",
      ],
    },
  ],

  labScenario: {
    title: "Zero Trust Security Lab",
    objective:
      "Implementiere eine vollständige Zero Trust Conditional Access Strategie für ein Unternehmen",
    environment: [
      "Microsoft 365 E5 Trial Tenant",
      "Azure AD Premium P2 (für Identity Protection)",
      "Testbenutzer mit verschiedenen Rollen",
    ],
    tasks: [
      "Named Locations für Corporate Network erstellen",
      "Break-Glass Accounts konfigurieren und ausschließen",
      "MFA für alle Admins Policy erstellen",
      "MFA für externe Zugriffe Policy erstellen",
      "Block High Risk Sign-ins Policy erstellen",
      "Alle Policies in Report-Only testen",
    ],
    estimatedTime: "60-90 Minuten",
  },

  checkpoints: [
    {
      id: "cp-ca-evaluation",
      question:
        "User hat zwei CA Policies: Policy A fordert MFA, Policy B fordert Compliant Device. Was muss der User tun?",
      options: [
        "Nur MFA (Policy A ist spezifischer)",
        "Nur Compliant Device (Policy B ist strenger)",
        "MFA ODER Compliant Device (eine von beiden)",
        "MFA UND Compliant Device (beide)",
      ],
      correctIndex: 3,
      explanation:
        "Grant Controls werden mit AND kombiniert. Der Benutzer muss ALLE Anforderungen aller zutreffenden Policies erfüllen.",
    },
    {
      id: "cp-break-glass",
      question:
        "Was ist der kritischste Schritt beim Einrichten von Break-Glass Accounts?",
      options: [
        "Starke Passwörter verwenden",
        "MFA aktivieren",
        "Von ALLEN Conditional Access Policies ausschließen",
        "In einer sicheren Gruppe speichern",
      ],
      correctIndex: 2,
      explanation:
        "Break-Glass Accounts müssen von allen CA Policies ausgeschlossen sein, sonst können sie im Notfall auch gesperrt werden. Das ist ihr einziger Zweck.",
    },
  ],

  relatedModules: ["ms102-user-management", "ms102-tenant-management"],
  tags: [
    "conditional-access",
    "mfa",
    "zero-trust",
    "identity-protection",
    "security",
    "named-locations",
  ],
};
