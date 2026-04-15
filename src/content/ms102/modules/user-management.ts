// ============================================================================
// MS-102: User & License Management Module
// ============================================================================

// Note: This module uses extended block structure
export const userManagementModule = {
  id: "ms102-user-management",
  slug: "user-management",
  title: "User & License Management",
  description:
    "Verwalte Benutzer, Gruppen und Lizenzen in Microsoft 365. Lerne effiziente Massenverwaltung und Automatisierung.",
  certification: "MS-102",
  track: "Identity & Access",
  estimatedMinutes: 50,
  difficulty: "intermediate",
  prerequisites: ["ms102-tenant-management"],

  realWorldProblem: `
Dein Unternehmen hat gerade 150 neue Mitarbeiter eingestellt. Die HR-Abteilung hat dir eine Excel-Liste geschickt mit allen Daten. Die neuen Mitarbeiter sollen morgen starten und brauchen Zugriff auf Teams, SharePoint und E-Mail. Manuell jeden Benutzer anlegen würde Tage dauern.

DEINE AUFGABE: Als IT-Administrator musst du schnell und fehlerfrei 150 neue Benutzerkonten mit den richtigen Lizenzen erstellen - ohne manuelle Tippfehler.
  `,

  context: [
    "Effiziente Benutzerverwaltung ist das Fundament jeder Microsoft 365 Umgebung. Mit wachsenden Organisationen werden manuelle Prozesse zum Engpass. PowerShell und Graph API ermöglichen Automatisierung und Konsistenz.",
    "Microsoft Entra ID (früher Azure Active Directory) ist das zentrale Identitätssystem für Microsoft 365. License Assignment weist Produktlizenzen (E3, E5, F1) an Benutzer zu.",
    "Bulk Operations ermöglichen Massenvorgänge für mehrere Objekte gleichzeitig. Dynamic Groups bestimmen Mitgliedschaft automatisch durch Regeln (z.B. alle aus Abteilung 'Sales').",
    "Group-based Licensing weist Lizenzen automatisch basierend auf Gruppenmitgliedschaft zu - zentrale Strategie für skalierbare Lizenzverwaltung.",
  ],

  blocks: [
    // Block 1: Prediction
    {
      type: "prediction",
      id: "predict-bulk-import",
      title: "Massenimport von Benutzern",
      question:
        "Du hast eine CSV-Datei mit 150 neuen Mitarbeitern. Im Microsoft 365 Admin Center gibt es die Option 'Add multiple users'. Was muss in der CSV-Datei MINDESTENS enthalten sein?",
      options: [
        "Nur der Benutzername (UPN)",
        "Benutzername und Anzeigename",
        "Benutzername, Anzeigename und Temporäres Kennwort",
        "Benutzername, Anzeigename, Kennwort und Lizenz",
      ],
      correctAnswer: "Benutzername und Anzeigename",
      explanation:
        "Die CSV für den Admin Center Import benötigt mindestens User name (UPN) und Display name. Das Kennwort kann automatisch generiert werden, Lizenzen werden separat zugewiesen. Für PowerShell-Import können weitere Spalten wie Department, JobTitle etc. genutzt werden.",
      reflection:
        "Was würdest du als zusätzliche Spalten in deiner CSV aufnehmen, um die Benutzer gleich vollständig einzurichten?",
    },

    // Block 2: Concept - User Creation Methods
    {
      type: "concept",
      id: "user-creation-methods",
      title: "Methoden zur Benutzererstellung",
      content: `### Die 4 Wege zur Benutzererstellung in Microsoft 365

**1. Microsoft 365 Admin Center (GUI)**
- Einzelne Benutzer manuell erstellen
- Bulk-Import via CSV (bis zu 250 Benutzer)
- Am einfachsten, aber nicht automatisierbar

**2. Microsoft Entra Admin Center**
- Mehr Optionen als M365 Admin Center
- Custom Attributes, Enterprise Apps Zuweisungen
- Für komplexere Anforderungen

**3. PowerShell mit Microsoft Graph**
\`\`\`powershell
# Modernes Microsoft Graph PowerShell
Connect-MgGraph -Scopes "User.ReadWrite.All"

$newUser = @{
    DisplayName = "Max Mustermann"
    UserPrincipalName = "m.mustermann@contoso.com"
    MailNickname = "mmustermann"
    AccountEnabled = $true
    PasswordProfile = @{
        Password = "TempPw123!"
        ForceChangePasswordNextSignIn = $true
    }
}
New-MgUser -BodyParameter $newUser
\`\`\`

**4. Azure AD Connect / Cloud Sync**
- Synchronisation aus On-Premises AD
- Hybrid-Identität
- Nur für Unternehmen mit lokaler AD-Infrastruktur`,
      keyTakeaways: [
        "Für kleine Mengen: Admin Center GUI",
        "Für Massenimport: CSV oder PowerShell",
        "Für Automatisierung: Microsoft Graph API/PowerShell",
        "Für Hybrid: Azure AD Connect synct aus On-Prem",
      ],
    },

    // Block 3: Scenario - License Management
    {
      type: "scenario",
      id: "scenario-license-assignment",
      title: "Die richtige Lizenz für jeden",
      context:
        "Nach dem Import der 150 Benutzer musst du Lizenzen zuweisen. Die HR-Liste enthält: 50 Büromitarbeiter (voller Office-Zugang), 80 Frontline-Worker (nur Teams und E-Mail), 20 Manager (vollständiger Zugang plus Power BI).",
      challenge:
        "Wie weist du die Lizenzen am effizientesten zu, ohne jeden Benutzer einzeln bearbeiten zu müssen?",
      options: [
        {
          choice: "Jeden Benutzer einzeln im Admin Center bearbeiten",
          outcome:
            "Funktioniert, aber dauert mehrere Stunden und ist fehleranfällig",
          isOptimal: false,
        },
        {
          choice: "CSV mit Lizenzspalte erneut importieren",
          outcome:
            "Der CSV-Import im Admin Center unterstützt keine Lizenzzuweisung",
          isOptimal: false,
        },
        {
          choice:
            "Dynamische Gruppen erstellen und Group-based Licensing nutzen",
          outcome:
            "Perfekt! Benutzer werden automatisch basierend auf Abteilung gruppiert und erhalten die richtige Lizenz",
          isOptimal: true,
        },
        {
          choice: "PowerShell-Skript für Massenzuweisung",
          outcome:
            "Funktioniert gut für einmalige Zuweisung, aber nicht für zukünftige Änderungen",
          isOptimal: false,
        },
      ],
      expertTip:
        "Group-based Licensing kombiniert mit Dynamic Groups ist der Gold-Standard. Neue Mitarbeiter erhalten automatisch die richtige Lizenz, sobald ihr Department-Attribut gesetzt ist.",
    },

    // Block 4: Terminal - PowerShell Graph
    {
      type: "terminal",
      id: "terminal-graph-users",
      title: "User Management mit Microsoft Graph PowerShell",
      goal: "Benutzer erstellen und Lizenzen zuweisen mit dem modernen Microsoft Graph PowerShell Module",
      commands: [
        {
          command: "Install-Module Microsoft.Graph -Scope CurrentUser -Force",
          explanation:
            "Installiert das Microsoft Graph PowerShell SDK (einmalig)",
        },
        {
          command:
            'Connect-MgGraph -Scopes "User.ReadWrite.All", "Directory.ReadWrite.All"',
          explanation:
            "Verbindet mit Microsoft Graph mit den nötigen Berechtigungen",
        },
        {
          command: "Get-MgUser -Top 5 | Select DisplayName, UserPrincipalName",
          explanation: "Zeigt die ersten 5 Benutzer mit Namen und UPN",
        },
        {
          command: `$csvUsers = Import-Csv -Path "C:\\Users\\newusers.csv"
foreach ($user in $csvUsers) {
    $params = @{
        DisplayName = $user.DisplayName
        UserPrincipalName = $user.UPN
        MailNickname = $user.MailNickname
        AccountEnabled = $true
        PasswordProfile = @{
            Password = "Welcome2024!"
            ForceChangePasswordNextSignIn = $true
        }
        Department = $user.Department
        JobTitle = $user.JobTitle
    }
    New-MgUser -BodyParameter $params
}`,
          explanation: "Erstellt Benutzer aus CSV-Datei mit allen Attributen",
        },
      ],
      validation: {
        expectedOutput: "Created user: m.mustermann@contoso.com",
        successMessage:
          "Benutzer erfolgreich erstellt! Prüfe im Entra Admin Center.",
      },
    },

    // Block 5: Concept - Dynamic Groups
    {
      type: "concept",
      id: "dynamic-groups",
      title: "Dynamic Groups für automatisierte Verwaltung",
      content: `### Dynamic Groups in Microsoft Entra ID

Dynamic Groups berechnen ihre Mitgliedschaft automatisch basierend auf Benutzerattributen.

**Beispiel-Regeln:**

1. **Alle aus der Sales-Abteilung:**
\`\`\`
(user.department -eq "Sales")
\`\`\`

2. **Alle Manager (Jobtitel enthält "Manager"):**
\`\`\`
(user.jobTitle -contains "Manager")
\`\`\`

3. **Komplexe Regel - Sales in Deutschland:**
\`\`\`
(user.department -eq "Sales") -and (user.country -eq "DE")
\`\`\`

4. **Alle außer Gäste:**
\`\`\`
(user.userType -eq "Member")
\`\`\`

**Wichtig für die Prüfung:**
- Dynamic Groups benötigen **Entra ID P1 oder P2**
- Membership wird alle paar Minuten neu berechnet
- Können für **Group-based Licensing** verwendet werden
- Unterstützen **user** und **device** als Objekte`,
      keyTakeaways: [
        "Dynamic Groups = automatische Mitgliedschaft durch Regeln",
        "Benötigen Azure AD Premium P1/P2 Lizenz",
        "Perfekt für Group-based Licensing",
        "Regeln basieren auf Benutzer-/Geräteattributen",
      ],
    },

    // Block 6: Practice - Create Dynamic Group
    {
      type: "practice",
      id: "practice-dynamic-group",
      title: "Dynamic Group erstellen",
      goal: "Erstelle eine Dynamic Group für alle Frontline Worker",
      steps: [
        {
          instruction:
            "1. Öffne das Microsoft Entra Admin Center (entra.microsoft.com)",
          hint: "Du kannst auch über portal.azure.com > Azure Active Directory navigieren",
        },
        {
          instruction: "2. Navigiere zu Groups > All groups > New group",
          hint: "Wähle 'Microsoft 365' oder 'Security' als Gruppentyp",
        },
        {
          instruction: "3. Wähle 'Membership type: Dynamic User'",
          hint: "Diese Option benötigt Azure AD Premium P1",
        },
        {
          instruction:
            "4. Klicke 'Add dynamic query' und erstelle die Regel: (user.department -eq 'Frontline')",
          hint: "Du kannst den Rule Builder oder den erweiterten Editor verwenden",
        },
        {
          instruction:
            "5. Klicke 'Validate Rules' um zu testen, welche Benutzer matchen würden",
          hint: "Die Validierung zeigt max. 5 Beispiel-Benutzer",
        },
      ],
      successCriteria:
        "Die Gruppe zeigt nach einigen Minuten alle Benutzer mit Department='Frontline'",
    },

    // Block 7: Exam Trap
    {
      type: "exam-trap",
      id: "trap-license-assignment",
      title: "Prüfungsfalle: License Assignment Priorität",
      trap: "In der Prüfung wird oft gefragt, was passiert wenn ein Benutzer sowohl eine direkte Lizenz als auch eine Group-based License hat.",
      correctUnderstanding:
        "Der Benutzer bekommt BEIDE Lizenzen nicht doppelt! Microsoft erkennt Duplikate. Aber beim Entfernen aus der Gruppe bleibt die direkte Lizenz erhalten. Bei direkter Entfernung bleibt die Group-based License. Das kann zu Verwirrung führen.",
      commonMistake:
        "Viele denken, der Benutzer verliert alle Lizenzen wenn er aus der Gruppe entfernt wird - aber nur die Group-based License wird entfernt, direkte bleiben.",
      examTip:
        "Bei Fragen zu License Removal: Prüfe IMMER ob es sich um Direct Assignment oder Group-based handelt. Die Entfernungsquelle muss zur Zuweisungsquelle passen.",
    },

    // Block 8: Comparison - User Types
    {
      type: "comparison",
      id: "compare-user-types",
      title: "Member vs. Guest Users",
      itemA: {
        name: "Member User",
        description: "Interner Mitarbeiter mit vollem Zugang",
        features: [
          "Hat UPN in der Tenant-Domain",
          "Voller Zugang zu allen M365 Diensten",
          "Kann Gruppen erstellen (wenn erlaubt)",
          "Erscheint im Global Address Book",
          "Zählt zur Lizenz-Nutzung",
        ],
      },
      itemB: {
        name: "Guest User",
        description: "Externer Partner/Kunde mit eingeschränktem Zugang",
        features: [
          "Verwendet externe E-Mail als UPN",
          "Eingeschränkter Zugang (B2B Collaboration)",
          "Kann keine Gruppen erstellen",
          "Erscheint nicht im GAL (konfigurierbar)",
          "Kann separate Guest-Lizenz benötigen",
        ],
      },
      useItemAWhen: [
        "Vollzeit-Mitarbeiter",
        "Langfristige Auftragnehmer",
        "Voller Microsoft 365 Zugang nötig",
      ],
      useItemBWhen: [
        "Externe Partner",
        "Lieferanten die nur bestimmte Teams/Sites brauchen",
        "Kunden für Projekt-Zusammenarbeit",
      ],
    },

    // Block 9: Mistake Analysis
    {
      type: "mistake",
      id: "mistake-bulk-delete",
      title: "Der fatale Massenlöschungs-Fehler",
      scenario:
        "Ein Administrator soll 50 ehemalige Mitarbeiter löschen und führt ein PowerShell-Skript aus, das aber wegen eines Filterfehlers ALLE Benutzer matcht...",
      mistake:
        "Das Skript hatte keinen -Filter Parameter und löschte alle Benutzer statt nur die Ausgeschiedenen.",
      consequence:
        "Alle 500 Benutzerkonten wurden gelöscht, inklusive der Admins. Niemand konnte sich mehr anmelden.",
      betterApproach: `**Sicherer Ansatz für Massenlöschungen:**

1. **IMMER erst mit -WhatIf testen:**
\`\`\`powershell
Get-MgUser -Filter "department eq 'Terminated'" | Remove-MgUser -WhatIf
\`\`\`

2. **Ergebnis in Variable speichern und prüfen:**
\`\`\`powershell
$usersToDelete = Get-MgUser -Filter "department eq 'Terminated'"
$usersToDelete | Select DisplayName, Department
# Manuell prüfen ob nur die richtigen Benutzer gelistet sind!
\`\`\`

3. **Dann erst löschen mit Bestätigung:**
\`\`\`powershell
$usersToDelete | Remove-MgUser -Confirm
\`\`\``,
      lessonLearned:
        "Gelöschte Benutzer sind 30 Tage im Papierkorb und können wiederhergestellt werden. Aber: IMMER -WhatIf nutzen und Ergebnisse vorher prüfen!",
    },

    // Block 10: Summary
    {
      type: "summary",
      id: "summary-user-management",
      title: "User & License Management - Zusammenfassung",
      keyPoints: [
        "Benutzer können via Admin Center, Entra Portal, PowerShell oder Sync erstellt werden",
        "Bulk-Import via CSV für bis zu 250 Benutzer im Admin Center",
        "Microsoft Graph PowerShell ist das moderne Tool für Automatisierung",
        "Dynamic Groups berechnen Mitgliedschaft automatisch aus Attributen",
        "Group-based Licensing + Dynamic Groups = automatische Lizenzverwaltung",
        "Member Users vs. Guest Users haben unterschiedliche Berechtigungen",
        "Gelöschte Benutzer sind 30 Tage wiederherstellbar",
      ],
      examPriority: [
        {
          topic: "Group-based Licensing",
          importance: "high",
          reason:
            "Häufige Prüfungsfragen zu automatischer Lizenzierung und Troubleshooting",
        },
        {
          topic: "Dynamic Group Membership Rules",
          importance: "high",
          reason: "Syntax der Regeln wird oft abgefragt",
        },
        {
          topic: "Bulk Operations",
          importance: "medium",
          reason: "Wissen welche Methode für welchen Use Case am besten ist",
        },
      ],
      nextSteps: [
        "Erstelle testweise Benutzer mit PowerShell",
        "Experimentiere mit Dynamic Group Regeln",
        "Konfiguriere Group-based Licensing für eine Testabteilung",
      ],
    },
  ],

  labScenario: {
    title: "User Onboarding Automation Lab",
    objective:
      "Automatisiere den Onboarding-Prozess für neue Mitarbeiter mit PowerShell und Dynamic Groups",
    environment: [
      "Microsoft 365 E5 Trial Tenant",
      "PowerShell 7 mit Microsoft.Graph Modul",
      "CSV mit Testbenutzern",
    ],
    tasks: [
      "10 Testbenutzer via PowerShell erstellen",
      "Dynamic Groups für 3 Abteilungen konfigurieren",
      "Group-based Licensing einrichten",
      "Einen Benutzer von Abteilung A nach B verschieben und Lizenzwechsel verifizieren",
    ],
    estimatedTime: "45-60 Minuten",
  },

  checkpoints: [
    {
      id: "cp-bulk-create",
      question:
        "Du sollst 200 Benutzer aus einer CSV erstellen. Welche Methode ist am effizientesten?",
      options: [
        "Admin Center einzeln",
        "Admin Center CSV Import",
        "PowerShell mit Microsoft Graph",
        "Azure AD Connect",
      ],
      correctIndex: 2,
      explanation:
        "Für 200+ Benutzer und wenn Automatisierung gewünscht ist, ist PowerShell mit Microsoft Graph die beste Wahl. Admin Center CSV Import ist auf 250 limitiert und weniger flexibel.",
    },
    {
      id: "cp-dynamic-rule",
      question:
        "Welche Dynamic Group Regel findet alle Benutzer aus Deutschland mit dem Jobtitel 'Consultant'?",
      options: [
        "(user.country -eq 'Germany') AND (user.jobTitle -eq 'Consultant')",
        "(user.country -eq 'DE') -and (user.jobTitle -eq 'Consultant')",
        "(country = 'DE') && (jobTitle = 'Consultant')",
        "user.country == 'DE' && user.jobTitle == 'Consultant'",
      ],
      correctIndex: 1,
      explanation:
        "Die korrekte Syntax verwendet '-and' (PowerShell-Stil), Attributnamen mit 'user.' Prefix, und '-eq' für Gleichheit. Country-Codes wie 'DE' statt ausgeschriebene Namen.",
    },
  ],

  relatedModules: ["ms102-tenant-management", "ms102-entra-security"],
  tags: [
    "users",
    "licenses",
    "groups",
    "dynamic-groups",
    "bulk-operations",
    "powershell",
    "graph-api",
  ],
};
