// MS-102 Questions - REWRITTEN 2026-04-15
// ORIGINAL CONTENT - No copyright issues
// Total: 20 questions (sample)

export type Ms102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
  type?: "standard" | "drag-drop" | "hotspot" | "terminal" | "lab" | "diagram";
  diagram?: string;
  terminal?: {
    prompt: string;
    commands: string[];
  };
  question: string;
  options: { key: string; text: string }[];
  correctAnswers: string[];
  explanationDe: string;
  references?: string[];
};

export const QUESTIONS_MS102: Ms102Question[] = [
  {
    id: "Q1",
    number: 1,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Anna | Admins | Global Admin |
| Ben | Users | - |
| Clara | - | Security Admin |
| David | Users | - |`,
    question: `
## Szenario: Nordwind GmbH

You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Cloud Apps.

You need to be notified when a single user downloads more than 50 files during any 60-second period.

What should you configure?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q2",
    number: 2,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "standard",
    diagram: `
\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    NETZWERK-ÜBERSICHT                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│   │ SRV-DC01  │    │ SRV-DC02  │    │ SRV-FILE01  │         │
│   └────┬─────┘    └────┬─────┘    └────┬─────┘         │
│        │               │               │                │
│        └───────────────┼───────────────┘                │
│                        │                                │
│                   ┌────┴────┐                           │
│                   │ Firewall │                          │
│                   └────┬────┘                           │
│                        │                                │
│                   [ Internet ]                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\``,
    question: `
## Szenario: Techfabrik AG

You have a Microsoft 365 E5 subscription and an on-premises server named Server1 that runs Windows Server.

You plan to implement Cloud Discovery in Microsoft Defender for Cloud Apps.

You need to deploy a log collector to Server1.

What should you install on Server1 first?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q3",
    number: 3,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "diagram",
    diagram: `
| Gerät | Betriebssystem | Status |
|-------|----------------|--------|
| PC-OFFICE-01 | Windows 11 | Compliant |
| PC-OFFICE-02 | Windows 10 | Compliant |
| LAP-SALES-01 | Android 13 | Non-Compliant |
| LAP-SALES-02 | iOS 17 | Compliant |`,
    question: `
## Szenario: Medizintechnik Plus

You have a Microsoft 365 E5 subscription that contains the devices shown in the following table.

Device 1 - Windows 11

Device 2 - Windows 10

Device 3 - Android

Device 4 - iOS

All devices are onboarded to Microsoft Defender for Endpoint.

You plan to use Microsoft Defender Vulnerability Management to meet the following requirements:

• Detect operating system vulnerabilities.
• Perform a configuration assessment of the operating system.

Which devices support each requirement?

(To answer, select the appropriate options in the answer area. Each correct selection is worth one point.)
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q4",
    number: 4,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "diagram",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Maria | Admins | Global Admin |
| Nils | Users | - |
| Olga | - | Security Admin |
| Peter | Users | - |`,
    question: `
## Szenario: Logistik-Union AG

You have a Microsoft 365 E5 subscription that contains the devices shown in the following table.

Device1 - DeviceGroup1

Device2 - DeviceGroup2

At 08:00, you create an incident notification rule that has the following configuration:

  Name: Notification1
  Notification settings:
    Notify on alert severity: Low
    Device group scope: All (3)
    Details: First notification per incident
    Recipients: Maria@logistik-unionag.de, Nils@logistik-unionag.de

At 08:02, you create an incident notification rule that has the following configuration:

  Name: Notification2
  Notification settings:
    Notify on alert severity: Low, Medium
    Device group scope: DeviceGroup1, DeviceGroup2
    Recipients: Maria@logistik-unionag.de

In Microsoft 365 Defender, alerts are logged as shown in the following table.

| Time | Alert Name | Severity | Impacted Assets |
|------|------------|----------|-----------------|
| 08:05 | Activity1 | Low | Device1 |
| 08:07 | Activity1 | Low | Device1 |
| 08:08 | Activity1 | Medium | Device1 |
| 08:15 | Activity2 | Medium | Device2 |
| 08:16 | Activity2 | Medium | Device2 |
| 08:20 | Activity1 | High | Device1 |
| 08:30 | Activity3 | Medium | Device2 |
| 08:35 | Activity2 | High | Device2 |

For each of the following statements, select Yes if the statement is true. Otherwise, select No.
(Each correct selection is worth one point.)

• Maria@logistik-unionag.de will receive two incident notification emails for the alert at 08:05.
• Nils@logistik-unionag.de will receive an incident notification email for the alert at 08:07.
• Maria@logistik-unionag.de will receive an incident notification email for the alert at 08:20.

Which combination of Yes/No answers is correct?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q5",
    number: 5,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Ralf | Admins | Global Admin |
| Sabine | Users | - |
| Thomas | - | Security Admin |
| Ulrike | Users | - |`,
    question: `
## Szenario: Finanzhaus AG

You have a Microsoft 365 subscription that uses Microsoft Defender for Cloud Apps.

You configure a session control policy to block downloads from SharePoint Online sites.

Users report that they can still download files from SharePoint Online sites.

You need to ensure that file download is blocked while still allowing users to browse SharePoint Online sites.

What should you configure?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q6",
    number: 6,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "lab",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Viktor | Admins | Global Admin |
| Werner | Users | - |
| Xenia | - | Security Admin |
| Yvonne | Users | - |`,
    question: `
## Szenario: Bauwerk GmbH

You have a Microsoft 365 E3 subscription.

You plan to launch Attack simulation training for all users.

Which social engineering technique and training experience will be available?

(To answer, select the appropriate option. Each correct selection is worth one point.)
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q7",
    number: 7,
    area: "Deploy and manage a Microsoft 365 tenant",
    difficulty: "easy",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Anna | Admins | Global Admin |
| Ben | Users | - |
| Clara | - | Security Admin |
| David | Users | - |`,
    question: `
## Szenario: Energie-Direkt AG

Dein Tenant ist eingerichtet, und Benutzerkonten sind vorhanden.

Anforderungen:
• Du möchtest einzelnen Benutzern Microsoft 365 Apps und Exchange Online zuweisen.
• Nur bestimmte Benutzer sollen eine Lizenz erhalten.

Frage:
Wie gehst du im Microsoft 365 Admin Center vor?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q8",
    number: 8,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "easy",
    type: "standard",
    diagram: `
| Gerät | Betriebssystem | Status |
|-------|----------------|--------|
| PC-OFFICE-01 | Windows 11 | Compliant |
| PC-OFFICE-02 | Windows 10 | Compliant |
| LAP-SALES-01 | Android 13 | Non-Compliant |
| LAP-SALES-02 | iOS 17 | Compliant |`,
    question: `
## Szenario: Motorenwerk Schmidt

You have a Microsoft 365 tenant. You plan to implement Intune device configuration profiles for endpoint protection.

Which platform can you manage by using these profiles?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q9",
    number: 9,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "standard",
    question: `
## Szenario: Autohaus Stern

You have a Microsoft 365 subscription that uses Microsoft Defender for Office 365.

You need to configure policies to meet the following requirements:

• Customize the common attachments filter.
• Enable impersonation protection for sender domains.

Which type of policy should you configure for each requirement?

(To answer, select the correct policy type for each requirement. Each selection is worth one point.)
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q10",
    number: 10,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "easy",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Maria | Admins | Global Admin |
| Nils | Users | - |
| Olga | - | Security Admin |
| Peter | Users | - |`,
    question: `
## Szenario: Möbelhaus Eiche

You have a Microsoft 365 subscription that uses Microsoft Defender for Office 365.

You need to ensure that users are prevented from opening or downloading malicious files from Microsoft Teams, OneDrive,
or SharePoint Online.

What should you do?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q11",
    number: 11,
    area: "Implement and manage Microsoft Entra identity and access (25–30%)",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Ralf | Admins | Global Admin |
| Sabine | Users | - |
| Thomas | - | Security Admin |
| Ulrike | Users | - |`,
    question: `
## Szenario: Druckerei Gutenberg


You have a Microsoft 365 E5 subscription and a single Azure AD tenant (druckereigutenberg.de).

Your support department contains several employees who should perform basic user
management in Microsoft 365:

- Create new user accounts
- Reset user passwords
- Block or unblock sign-in
- Assign or remove product licenses

You must follow the principle of least privilege.
The support users must NOT:

- Manage admin roles
- Create or manage security groups or admin role assignments
- Configure tenant-wide settings

Question:
Which Azure AD built-in role should you assign to the support users?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q12",
    number: 12,
    area: "Deploy and manage a Microsoft 365 tenant",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Viktor | Admins | Global Admin |
| Werner | Users | - |
| Xenia | - | Security Admin |
| Yvonne | Users | - |`,
    question: `
## Szenario: Apotheke Gesundheit Plus

In einem größeren Unternehmen sollen Lizenzen nicht mehr manuell pro Benutzer,
sondern automatisch pro Abteilung zugewiesen werden.

Anforderungen:
• Benutzer in der Abteilung 
 sollen automatisch eine bestimmte Lizenz erhalten.
• Neue Benutzer in 
 sollen die Lizenz automatisch bekommen.

Frage:
Welche Funktion nutzt du in Entra ID?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q13",
    number: 13,
    area: "Manage identity and access in Microsoft 365",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Anna | Admins | Global Admin |
| Ben | Users | - |
| Clara | - | Security Admin |
| David | Users | - |`,
    question: `
## Szenario: Spedition Schnell

Du sollst einem Mitarbeiter administrative Rechte geben,
aber nur für bestimmte Aufgaben im Microsoft 365 Tenant.

Anforderungen:
• Er soll Benutzerkonten verwalten (Passwort zurücksetzen, User anlegen).
• Er soll keine globalen Einstellungen oder Sicherheitsrichtlinien ändern können.

Frage:
Welche Rolle ist typischerweise passend, wenn du das Least-Privilege-Prinzip einhalten möchtest?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q14",
    number: 14,
    area: "Implement and manage Microsoft Entra identity and access (25–30%)",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Eva | Admins | Global Admin |
| Felix | Users | - |
| Greta | - | Security Admin |
| Hans | Users | - |`,
    question: `
## Szenario: Software-Schmiede Berlin


You have a Microsoft 365 E5 subscription and a single Azure AD tenant (software-schmiedeberlin.de).

Your support department contains several employees who should perform basic user management in Microsoft 365:

- Create new user accounts
- Reset user passwords
- Block or unblock sign-in
- Assign or remove product licenses

You must follow the principle of least privilege.
The support users must NOT:

- Manage admin roles
- Create or manage security groups or admin role assignments
- Configure tenant-wide settings

Question:
Which Azure AD built-in role should you assign to the support users?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q15",
    number: 15,
    area: "Implement and manage Microsoft Entra identity and access (25-30%)",
    difficulty: "medium",
    type: "diagram",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Ida | Admins | Global Admin |
| Jan | Users | - |
| Katrin | - | Security Admin |
| Lars | Users | - |`,
    question: `
## Szenario: Hotel Alpenblick

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals.
Some question sets might have more than one correct solution, while others might not have a correct solution.
Determine whether the solution meets the stated goals.

You have a Microsoft Azure Active Directory (Azure AD) tenant named hotelalpenblick.de.
You create a Microsoft Defender for Identity (MDI) workspace named Workspace1.

The tenant contains the users shown in the following table:

| Name | Member of Group | Azure AD Role |
|------|-----------------|---------------|
| Ida | Azure ATP Workspace 1 Administrators | None |
| Jan | Azure ATP Workspace 1 Users | None |
| Katrin | None | Security administrator |
| Lars | Azure ATP Workspace 1 Users | Global administrator |

You need to modify the configuration of the Microsoft Defender for Identity sensors.

Solution:
You instruct Lars to modify the Microsoft Defender for Identity sensor configuration.

Does this meet the goal?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q16",
    number: 16,
    area: "Implement and manage Microsoft Entra identity and access (25-30%)",
    difficulty: "medium",
    type: "diagram",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Maria | Admins | Global Admin |
| Nils | Users | - |
| Olga | - | Security Admin |
| Peter | Users | - |`,
    question: `
## Szenario: Anwaltskanzlei Recht

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals.
Some question sets might have more than one correct solution, while others might not have a correct solution.
Determine whether the solution meets the stated goals.

You have a Microsoft Azure Active Directory (Azure AD) tenant named anwaltskanzleirecht.de.
You create a Microsoft Defender for Identity (MDI) workspace named Workspace1.

The tenant contains the users shown in the table.

| Name | Member of Group | Azure AD Role |
|------|-----------------|---------------|
| Maria | Azure ATP Workspace 1 Administrators | None |
| Nils | Azure ATP Workspace 1 Users | None |
| Olga | None | Security administrator |
| Peter | Azure ATP Workspace 1 Users | Global administrator |

You need to modify the configuration of the Microsoft Defender for Identity sensors.

You need to modify the configuration of the Microsoft Defender for Identity sensors.

Solution: You instruct Maria to modify the Microsoft Defender for Identity sensor configuration.

Does this meet the goal?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q17",
    number: 17,
    area: "Implement and manage Microsoft Entra identity and access (25–30%)",
    difficulty: "medium",
    type: "lab",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Ralf | Admins | Global Admin |
| Sabine | Users | - |
| Thomas | - | Security Admin |
| Ulrike | Users | - |`,
    question: `
🧩 **Szenario**

Dies ist eine Serie von Fragen, die das gleiche Szenario verwenden.
Jede Frage schlägt eine *einzigartige Lösung* vor, die das Ziel möglicherweise erfüllt – oder nicht.

---

**Unternehmensszenario**

Dein Mandant heißt **architekturbüromodern.de** (Microsoft Azure Active Directory / Entra ID).

Du hast eine **Microsoft Defender for Identity (MDI)**–Arbeitsumgebung erstellt:

- **Workspace Name:** Workspace1

Im Tenant existieren die folgenden Benutzer:

| Name | Member of Group | Azure AD Role |
|------|-----------------|---------------|
| Ralf | Azure ATP Workspace 1 Administrators | None |
| Sabine | Azure ATP Workspace 1 Users | None |
| Thomas | None | Security administrator |
| Ulrike | Azure ATP Workspace 1 Users | Global administrator |

Du musst die Konfiguration der Microsoft Defender for Identity Sensoren anpassen.

---

### **Ziel**

Du musst die **Konfiguration der Microsoft Defender for Identity Sensoren** anpassen.

---

## ❓ **Vorgeschlagene Lösung**

👉 *Du weist Thomas an, die Microsoft Defender for Identity Sensor-Konfiguration zu ändern.*

**Frage:**
> Erfüllt diese Lösung das Ziel?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q18",
    number: 18,
    area: "Manage security and threats by using Microsoft Defender XDR (30–35%)",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Viktor | Admins | Global Admin |
| Werner | Users | - |
| Xenia | - | Security Admin |
| Yvonne | Users | - |`,
    question: `
## Szenario: Restaurant Genuss

You have a Microsoft 365 subscription that uses Microsoft Defender for Cloud Apps.

You need to configure policies to meet the following requirements:

• Display an alert when a single user downloads many files.
• Display an alert when infrequent activity from a country is detected.

Which type of policy should you configure for each requirement?

(Each correct selection is worth one point.)
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q19",
    number: 19,
    area: "Manage identity and access in Microsoft 365",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Anna | Admins | Global Admin |
| Ben | Users | - |
| Clara | - | Security Admin |
| David | Users | - |`,
    question: `
## Szenario: Buchhaltung Express

Ein Unternehmen hat ein lokales Active Directory und möchte Microsoft 365 einführen.

Anforderungen:
• Benutzer sollen sich mit ihren bekannten On-Prem-Anmeldedaten an Microsoft 365 anmelden.
• Kein vollständiges ADFS-Farm-Setup.

Frage:
Welche beiden gängigen Methoden stehen dir zur Verfügung, um dies umzusetzen?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  },

  {
    id: "Q20",
    number: 20,
    area: "Manage identity and access in Microsoft 365",
    difficulty: "medium",
    type: "standard",
    diagram: `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| Eva | Admins | Global Admin |
| Felix | Users | - |
| Greta | - | Security Admin |
| Hans | Users | - |`,
    question: `
## Szenario: Werbeagentur Kreativ

Beim Einsatz von Entra Connect sollen nicht alle On-Prem-Benutzer in die Cloud synchronisiert werden,
sondern nur Benutzer aus bestimmten OUs oder mit bestimmten Attributen.

Frage:
Wie erreichst du dies am sinnvollsten?
`,
    options: [

    ],
    correctAnswers: [],
    explanationDe: `

`,
  }
];
