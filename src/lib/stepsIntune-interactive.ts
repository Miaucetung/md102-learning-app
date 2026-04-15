// src/lib/stepsIntune-interactive.ts
// Interactive Intune Lab Steps with multi-component support

import { pctFromMap, readProgressMap } from "@/lib/progress";

export interface TerminalCommand {
  command: string;
  aliases?: string[];
  output: string;
  hint?: string;
  explanation?: string;
}

export interface CommandPart {
  type: "text" | "blank";
  content: string;
  answer?: string;
  hint?: string;
}

export interface CommandChallengeData {
  instruction: string;
  parts: CommandPart[];
  explanation?: string;
}

export interface GUIStepData {
  id: string;
  title: string;
  description?: string;
  panel: "sidebar" | "main" | "modal";
  icon?: string;
  options: { label: string; isCorrect: boolean; feedback?: string }[];
  successMessage?: string;
}

export interface QuickCheckData {
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
  hint?: string;
}

export type IntuneStep = {
  id: string;
  title: string;
  duration?: string;
  description?: string;
  checklist: string[];
  portalLinks?: { label: string; href: string }[];
  powershell?: string;
  verify: string[];
  notes?: string[];
  // Interactive components
  terminalLab?: {
    title: string;
    description?: string;
    commands: TerminalCommand[];
  };
  commandChallenge?: {
    title: string;
    description?: string;
    challenges: CommandChallengeData[];
  };
  guiSimulator?: {
    title: string;
    description?: string;
    portal: "azure" | "intune" | "entra" | "defender" | "m365";
    steps: GUIStepData[];
  };
  quickChecks?: QuickCheckData[];
};

export const INTUNE_MANIFEST_ID = "lab-intune-001";

export const INTUNE_STEPS: IntuneStep[] = [
  {
    id: "i1",
    title: "Microsoft 365 Developer-Tenant anlegen",
    duration: "~15 min",
    description:
      "Erstelle einen kostenlosen M365 E5 Developer-Tenant für dein Lab.",
    checklist: [
      "https://developer.microsoft.com/microsoft-365/dev-program besuchen",
      "Join now → Instant Sandbox (E5) → Tenantname vergeben",
      "Sample data packs optional aktivieren",
      "Admin-User, Initialpasswort, Recovery-Mail notieren",
      "Im Admin Center prüfen: E5 Dev Lizenz, Intune aktiv, GA-Rolle vorhanden",
    ],
    portalLinks: [
      {
        label: "M365 Dev Program",
        href: "https://developer.microsoft.com/microsoft-365/dev-program",
      },
      { label: "Admin Center", href: "https://admin.microsoft.com" },
      { label: "Azure Portal", href: "https://portal.azure.com" },
    ],
    verify: [
      "Login admin.microsoft.com ok",
      "Entra ID sichtbar",
      "intune.microsoft.com lädt",
      "Lizenz E5 Developer sichtbar",
      "Rolle Global Administrator gesetzt",
    ],
    notes: [
      "90 Tage gültig, bei Aktivität verlängerbar",
      "Tenantname merken für Entra Connect/Hybrid-Join",
    ],

    guiSimulator: {
      title: "M365 Admin Center erkunden",
      description:
        "Navigiere durch das Admin Center um die wichtigsten Bereiche kennenzulernen",
      portal: "m365",
      steps: [
        {
          id: "step1",
          title: "Lizenzen prüfen",
          description: "Finde die E5 Developer Lizenz",
          panel: "sidebar",
          icon: "key",
          options: [
            { label: "Billing → Licenses", isCorrect: true },
            { label: "Users → Active users", isCorrect: false },
            { label: "Settings → Org settings", isCorrect: false },
            { label: "Reports → Usage", isCorrect: false },
          ],
          successMessage:
            "Richtig! Unter Billing → Licenses findest du alle Lizenzen.",
        },
        {
          id: "step2",
          title: "Intune Admin Center öffnen",
          description: "Von wo aus öffnest du das Intune Admin Center?",
          panel: "sidebar",
          icon: "laptop",
          options: [
            { label: "All admin centers → Endpoint Manager", isCorrect: true },
            { label: "Settings → Domains", isCorrect: false },
            { label: "Users → Guest users", isCorrect: false },
            { label: "Groups → Active groups", isCorrect: false },
          ],
          successMessage:
            "Korrekt! Endpoint Manager/Intune ist unter All admin centers.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Wie lange ist ein M365 Developer-Tenant standardmäßig gültig?",
        options: [
          { key: "A", text: "30 Tage" },
          { key: "B", text: "90 Tage" },
          { key: "C", text: "180 Tage" },
          { key: "D", text: "365 Tage" },
        ],
        correctAnswer: "B",
        explanation:
          "Developer-Tenants sind 90 Tage gültig und werden bei aktiver Nutzung automatisch verlängert.",
        hint: "Die Gültigkeit ist kürzer als ein halbes Jahr",
      },
    ],
  },
  {
    id: "i2",
    title: "MDM/MAM-Authority auf Intune setzen",
    duration: "~3 min",
    description:
      "Stelle sicher, dass Intune als MDM-Authority für deinen Tenant konfiguriert ist.",
    checklist: [
      "Intune admin center öffnen",
      "Tenant administration → MDM authority prüfen",
      "Falls nötig: Auf Microsoft Intune setzen",
    ],
    portalLinks: [
      { label: "Intune Admin Center", href: "https://intune.microsoft.com" },
    ],
    verify: ["MDM Authority: Microsoft Intune"],

    guiSimulator: {
      title: "MDM Authority konfigurieren",
      description: "Navigiere zur MDM Authority Einstellung",
      portal: "intune",
      steps: [
        {
          id: "step1",
          title: "Tenant Administration finden",
          description: "Wo findest du die MDM Authority Einstellung?",
          panel: "sidebar",
          icon: "settings",
          options: [
            { label: "Tenant administration", isCorrect: true },
            { label: "Devices → Configuration profiles", isCorrect: false },
            { label: "Apps → All apps", isCorrect: false },
            { label: "Users → All users", isCorrect: false },
          ],
          successMessage:
            "Richtig! Die MDM Authority ist unter Tenant administration.",
        },
        {
          id: "step2",
          title: "MDM Authority prüfen",
          description: "Welcher Wert sollte für MDM Authority gesetzt sein?",
          panel: "main",
          icon: "shield",
          options: [
            { label: "Microsoft Intune", isCorrect: true },
            { label: "Configuration Manager", isCorrect: false },
            { label: "None", isCorrect: false },
            { label: "Office 365", isCorrect: false },
          ],
          successMessage:
            "Korrekt! Microsoft Intune muss als MDM Authority gesetzt sein.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Was passiert, wenn die MDM Authority nicht auf Intune gesetzt ist?",
        options: [
          {
            key: "A",
            text: "Geräte können sich nicht bei Intune registrieren",
          },
          { key: "B", text: "Nur iOS-Geräte können verwaltet werden" },
          { key: "C", text: "Compliance Policies funktionieren nicht" },
          { key: "D", text: "Conditional Access ist deaktiviert" },
        ],
        correctAnswer: "A",
        explanation:
          "Ohne MDM Authority auf Intune können sich Geräte nicht für die Verwaltung registrieren.",
        hint: "Es betrifft die grundlegende Geräteregistrierung",
      },
    ],
  },
  {
    id: "i3",
    title: "Global Admin MFA aktivieren",
    duration: "~5 min",
    description:
      "Sichere den Global Admin Account mit Multi-Factor Authentication.",
    checklist: [
      "Security defaults aktivieren ODER eigene CA-Policy für Admins erstellen",
      "MFA-Registrierung für den Admin abschließen",
      "Authenticator App oder SMS als zweiten Faktor einrichten",
    ],
    portalLinks: [
      { label: "Entra Admin Center", href: "https://entra.microsoft.com" },
    ],
    verify: [
      "Login fordert MFA",
      "My Sign-Ins zeigt erfolgreiche MFA-Anmeldung",
    ],

    guiSimulator: {
      title: "MFA für Admin aktivieren",
      description: "Konfiguriere MFA über das Entra Admin Center",
      portal: "entra",
      steps: [
        {
          id: "step1",
          title: "Security Einstellungen finden",
          description: "Wo aktivierst du Security Defaults?",
          panel: "sidebar",
          icon: "shield",
          options: [
            { label: "Protection → Security defaults", isCorrect: true },
            { label: "Users → All users", isCorrect: false },
            {
              label: "Applications → Enterprise applications",
              isCorrect: false,
            },
            { label: "Identity governance → Access reviews", isCorrect: false },
          ],
          successMessage:
            "Richtig! Security defaults findest du unter Protection.",
        },
        {
          id: "step2",
          title: "Security Defaults aktivieren",
          description: "Welche Einstellung aktiviert MFA für alle Admins?",
          panel: "main",
          icon: "key",
          options: [
            { label: "Enabled", isCorrect: true },
            { label: "Disabled", isCorrect: false },
            { label: "Conditional", isCorrect: false },
            { label: "Legacy", isCorrect: false },
          ],
          successMessage:
            "Korrekt! Security defaults auf Enabled aktiviert MFA für alle Admins.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Was ist der Unterschied zwischen Security Defaults und Conditional Access für MFA?",
        options: [
          {
            key: "A",
            text: "Security Defaults ist kostenlos und einfach; CA bietet mehr Kontrolle aber erfordert P1/P2 Lizenz",
          },
          { key: "B", text: "Es gibt keinen Unterschied" },
          { key: "C", text: "CA ist nur für externe Benutzer" },
          {
            key: "D",
            text: "Security Defaults unterstützt nur SMS als zweiten Faktor",
          },
        ],
        correctAnswer: "A",
        explanation:
          "Security Defaults ist in allen Tenants kostenlos verfügbar. Conditional Access erfordert Entra ID P1/P2 Lizenzen, bietet aber granulare Kontrolle.",
        hint: "Es hat mit Lizenzierung zu tun",
      },
    ],
  },
  {
    id: "i4",
    title: "Microsoft Entra Connect (PHS)",
    duration: "~15–20 min",
    description:
      "Synchronisiere On-Premises AD Benutzer mit Entra ID via Password Hash Sync.",
    checklist: [
      "Entra Connect Setup auf Sync-Server (Lab: DC01) starten",
      "Sign-in method: Password Hash Sync auswählen",
      "Start synchronization when complete aktivieren",
      "Mit Global Admin anmelden und On-Prem AD angeben",
    ],
    powershell: `Start-ADSyncSyncCycle -PolicyType Initial
Start-ADSyncSyncCycle -PolicyType Delta`,
    verify: [
      "Synchronization Service → Operations zeigt grün",
      "Dienst Azure AD Sync läuft",
    ],

    terminalLab: {
      title: "Entra Connect Sync steuern",
      description: "Führe Sync-Befehle auf dem Domain Controller aus",
      commands: [
        {
          command: "Get-ADSyncScheduler",
          aliases: ["get-adsyncscheduler"],
          output: `AllowedSyncCycleInterval            : 00:30:00
CurrentlyEffectiveSyncCycleInterval : 00:30:00
CustomizedSyncCycleInterval         :
NextSyncCyclePolicyType             : Delta
NextSyncCycleStartTimeInUTC         : 4/15/2026 10:30:00 AM
PurgeRunHistoryInterval             : 7.00:00:00
SyncCycleEnabled                    : True
MaintenanceEnabled                  : True
StagingModeEnabled                  : False
SchedulerSuspended                  : False
SyncCycleInProgress                 : False`,
          hint: "Zeige den aktuellen Sync-Scheduler Status",
          explanation:
            "SyncCycleEnabled: True bedeutet der automatische Sync ist aktiv.",
        },
        {
          command: "Start-ADSyncSyncCycle -PolicyType Delta",
          aliases: ["start-adsyncsyncycle -policytype delta"],
          output: `Result
------
Success`,
          hint: "Starte einen Delta-Sync (nur Änderungen)",
          explanation:
            "Delta Sync ist schneller und überträgt nur geänderte Objekte.",
        },
        {
          command: "Get-ADSyncConnectorRunStatus",
          aliases: ["get-adsyncconnectorrunstatus"],
          output: `RunState           : Idle
StartTime          : 4/15/2026 10:31:22 AM
StopTime           : 4/15/2026 10:31:45 AM
LastSyncResult     : Success
LastSyncStatistics : Adds: 0, Updates: 2, Deletes: 0`,
          hint: "Prüfe den Status des letzten Sync-Laufs",
          explanation:
            "RunState: Idle und LastSyncResult: Success zeigen erfolgreichen Sync.",
        },
      ],
    },

    commandChallenge: {
      title: "Entra Connect PowerShell",
      description: "Vervollständige die Sync-Befehle",
      challenges: [
        {
          instruction: "Starte einen vollständigen Initial-Sync:",
          parts: [
            { type: "text", content: "Start-ADSyncSyncCycle -" },
            {
              type: "blank",
              content: "",
              answer: "PolicyType",
              hint: "Parameter für den Sync-Typ",
            },
            { type: "text", content: " " },
            {
              type: "blank",
              content: "",
              answer: "Initial",
              hint: "Vollständiger Sync, nicht Delta",
            },
          ],
          explanation:
            "Ein Initial-Sync überträgt alle Objekte neu, dauert länger als Delta.",
        },
        {
          instruction: "Setze den Scheduler auf Pause (für Wartung):",
          parts: [
            { type: "text", content: "Set-ADSyncScheduler -" },
            {
              type: "blank",
              content: "",
              answer: "SyncCycleEnabled",
              hint: "Eigenschaft für den Sync-Zyklus",
            },
            { type: "text", content: " " },
            {
              type: "blank",
              content: "",
              answer: "$false",
              hint: "Boolean zum Deaktivieren",
            },
          ],
          explanation:
            "Vor Wartungsarbeiten sollte der Scheduler pausiert werden.",
        },
      ],
    },

    quickChecks: [
      {
        question: "Welcher Sign-in Method ist am einfachsten zu konfigurieren?",
        options: [
          { key: "A", text: "Password Hash Sync (PHS)" },
          { key: "B", text: "Pass-through Authentication (PTA)" },
          { key: "C", text: "Federation with AD FS" },
          { key: "D", text: "Certificate-based Authentication" },
        ],
        correctAnswer: "A",
        explanation:
          "Password Hash Sync ist die einfachste Methode und benötigt keine zusätzliche Infrastruktur.",
        hint: "Die Methode mit dem geringsten Aufwand",
      },
    ],
  },
  {
    id: "i5",
    title: "Seamless SSO & OU-Filter setzen",
    duration: "~5 min",
    description:
      "Aktiviere Seamless SSO und filtere die zu synchronisierenden OUs.",
    checklist: [
      "Entra Connect Wizard → Change user sign-in",
      "Enable Seamless SSO aktivieren",
      "Optional Features: OU-Filter nur für MainLab-OUs setzen",
    ],
    verify: ["Seamless SSO Enabled", "OU-Filter zeigt nur gewünschte OUs"],
    notes: ["Filter beschleunigt Sync und reduziert synchronisierte Objekte"],

    guiSimulator: {
      title: "Seamless SSO konfigurieren",
      description: "Aktiviere SSO im Entra Connect Wizard",
      portal: "entra",
      steps: [
        {
          id: "step1",
          title: "Sign-in Methode ändern",
          description: "Welche Option öffnet die SSO-Konfiguration?",
          panel: "main",
          icon: "key",
          options: [
            { label: "Change user sign-in", isCorrect: true },
            { label: "Customize synchronization options", isCorrect: false },
            { label: "Configure staging mode", isCorrect: false },
            { label: "View current configuration", isCorrect: false },
          ],
          successMessage:
            "Richtig! Change user sign-in ermöglicht SSO-Konfiguration.",
        },
        {
          id: "step2",
          title: "Seamless SSO aktivieren",
          description: "Welche Checkbox muss aktiviert sein?",
          panel: "main",
          icon: "globe",
          options: [
            { label: "Enable single sign-on", isCorrect: true },
            { label: "Enable password writeback", isCorrect: false },
            { label: "Enable group writeback", isCorrect: false },
            { label: "Enable device writeback", isCorrect: false },
          ],
          successMessage:
            "Korrekt! Enable single sign-on aktiviert Seamless SSO.",
        },
      ],
    },

    quickChecks: [
      {
        question: "Was bewirkt ein OU-Filter in Entra Connect?",
        options: [
          {
            key: "A",
            text: "Nur Objekte aus ausgewählten OUs werden synchronisiert",
          },
          { key: "B", text: "Bestimmte Benutzer werden von MFA ausgenommen" },
          { key: "C", text: "Der Sync läuft nur zu bestimmten Zeiten" },
          { key: "D", text: "Passwörter werden nicht synchronisiert" },
        ],
        correctAnswer: "A",
        explanation:
          "OU-Filter begrenzt die Synchronisation auf Objekte in ausgewählten Organizational Units.",
        hint: "Es geht um den Scope der Synchronisation",
      },
    ],
  },
  {
    id: "i6",
    title: "Initial Sync ausführen & prüfen",
    duration: "~3 min",
    description:
      "Führe den ersten vollständigen Sync durch und überprüfe das Ergebnis.",
    checklist: [
      "Initial Sync über PowerShell starten",
      "Im Synchronization Service Manager prüfen",
      "Delta Sync für spätere Änderungen nutzen",
    ],
    powershell: `Start-ADSyncSyncCycle -PolicyType Initial
Start-ADSyncSyncCycle -PolicyType Delta`,
    verify: ["Operations zeigt keine Errors", "Eventlog ADSync ohne Fehler"],

    terminalLab: {
      title: "Sync durchführen und prüfen",
      description: "Führe den Sync aus und überprüfe die Ergebnisse",
      commands: [
        {
          command: "Start-ADSyncSyncCycle -PolicyType Initial",
          aliases: ["start-adsyncsyncycle -policytype initial"],
          output: `Result
------
Success`,
          hint: "Starte einen vollständigen Initial-Sync",
          explanation:
            "Initial-Sync bei Ersteinrichtung oder nach größeren Änderungen.",
        },
        {
          command:
            "Get-EventLog -LogName Application -Source 'Directory Synchronization' -Newest 5",
          aliases: [
            "get-eventlog -logname application -source 'directory synchronization' -newest 5",
          ],
          output: `Index Time          EntryType   Source                    Message
----- ----          ---------   ------                    -------
45234 Apr 15 10:35  Information Directory Synchronization Synchronization cycle completed successfully.
45233 Apr 15 10:35  Information Directory Synchronization Export to Azure AD completed. Adds: 25, Updates: 0.
45232 Apr 15 10:34  Information Directory Synchronization Import from Azure AD completed.
45231 Apr 15 10:34  Information Directory Synchronization Export to contoso.local completed.
45230 Apr 15 10:33  Information Directory Synchronization Synchronization cycle started.`,
          hint: "Prüfe die letzten Sync-Ereignisse im Event Log",
          explanation:
            "EntryType: Information ohne Errors zeigt erfolgreichen Sync.",
        },
      ],
    },
  },
  {
    id: "i7",
    title: "Synchronisierte Benutzer prüfen",
    duration: "~2 min",
    description:
      "Überprüfe im Entra Admin Center, dass On-Prem Benutzer synchronisiert wurden.",
    checklist: [
      "Entra Admin Center → Users → All users öffnen",
      "Filter nach Source = Windows Server AD",
      "Prüfe, dass Testbenutzer (z.B. user01) sichtbar sind",
    ],
    portalLinks: [
      {
        label: "Entra Users",
        href: "https://entra.microsoft.com/#view/Microsoft_AAD_UsersAndTenants/UserManagementMenuBlade/~/AllUsers",
      },
    ],
    verify: ["user01 sichtbar mit richtiger Quelle"],

    guiSimulator: {
      title: "Sync-Status prüfen",
      description: "Finde die synchronisierten Benutzer im Portal",
      portal: "entra",
      steps: [
        {
          id: "step1",
          title: "Users navigieren",
          description: "Wo findest du alle Benutzer?",
          panel: "sidebar",
          icon: "users",
          options: [
            { label: "Users → All users", isCorrect: true },
            { label: "Groups → All groups", isCorrect: false },
            { label: "Devices → All devices", isCorrect: false },
            { label: "Applications → App registrations", isCorrect: false },
          ],
          successMessage:
            "Richtig! Alle Benutzer findest du unter Users → All users.",
        },
        {
          id: "step2",
          title: "Sync-Quelle filtern",
          description:
            "Wie filterst du nach synchronisierten On-Prem Benutzern?",
          panel: "main",
          icon: "server",
          options: [
            {
              label: "Add filter → Source = Windows Server AD",
              isCorrect: true,
            },
            { label: "Add filter → User type = Member", isCorrect: false },
            { label: "Add filter → State = Active", isCorrect: false },
            { label: "Add filter → MFA status = Enabled", isCorrect: false },
          ],
          successMessage:
            "Korrekt! Source = Windows Server AD zeigt syncte Benutzer.",
        },
      ],
    },
  },
  {
    id: "i8",
    title: "Sign-in Test (Cloud-Portal)",
    duration: "~3 min",
    description: "Teste die Anmeldung mit einem synchronisierten Benutzer.",
    checklist: [
      "Mit synchronisiertem Benutzer (user01) anmelden",
      "Prüfe, ob MFA-Prompt erscheint (falls konfiguriert)",
      "Teste Zugriff auf myaccount.microsoft.com",
    ],
    portalLinks: [
      { label: "My Account", href: "https://myaccount.microsoft.com" },
    ],
    verify: ["Anmeldung erfolgreich oder erwartete Policy greift"],

    quickChecks: [
      {
        question:
          "Was sollte passieren, wenn Security Defaults aktiviert sind und ein neuer Benutzer sich anmeldet?",
        options: [
          { key: "A", text: "Benutzer wird sofort geblockt" },
          { key: "B", text: "Benutzer muss sich für MFA registrieren" },
          {
            key: "C",
            text: "Benutzer kann sich ohne weitere Schritte anmelden",
          },
          { key: "D", text: "Benutzer muss das Passwort ändern" },
        ],
        correctAnswer: "B",
        explanation:
          "Bei Security Defaults müssen alle Benutzer innerhalb von 14 Tagen MFA registrieren.",
        hint: "Security Defaults erfordern einen zweiten Faktor",
      },
    ],
  },
  {
    id: "i9",
    title: "Windows 11: Entra-Join + Enrollment",
    duration: "~10–15 min",
    description:
      "Verbinde ein Windows 11 Gerät mit Entra ID und registriere es in Intune.",
    checklist: [
      "Cloud-Only: Settings → Accounts → Access work or school → Connect",
      "Join this device to Azure Active Directory / Entra ID wählen",
      "Mit Entra-Benutzer anmelden",
      "Auto-Enrollment prüfen (Intune sollte automatisch registrieren)",
    ],
    powershell: `dsregcmd /status
Get-ScheduledTask *Enrollment*`,
    verify: [
      "Intune → Devices → All devices zeigt das Gerät",
      "dsregcmd zeigt AzureAdJoined: YES",
    ],

    terminalLab: {
      title: "Enrollment Status prüfen",
      description: "Überprüfe den Entra Join und Intune Enrollment Status",
      commands: [
        {
          command: "dsregcmd /status",
          aliases: ["Dsregcmd /status", "DSREGCMD /STATUS"],
          output: `+----------------------------------------------------------------------+
| Device State                                                         |
+----------------------------------------------------------------------+

             AzureAdJoined : YES
          EnterpriseJoined : NO
              DomainJoined : NO
               Device Name : DESKTOP-LAB42

+----------------------------------------------------------------------+
| Tenant Details                                                       |
+----------------------------------------------------------------------+

                TenantName : Contoso
                  TenantId : 12345678-1234-1234-1234-123456789abc
               AuthCodeUrl : https://login.microsoftonline.com

+----------------------------------------------------------------------+
| User State                                                           |
+----------------------------------------------------------------------+

             NgcState : NotReady
          NgcKeyId :
       NgcKeyType :
       WorkplaceJoined : NO`,
          hint: "Zeige den Device State (Entra Join Status)",
          explanation:
            "AzureAdJoined: YES bedeutet das Gerät ist mit Entra ID verbunden.",
        },
        {
          command:
            "Get-ScheduledTask | Where-Object {$_.TaskName -like '*Enrollment*'}",
          aliases: [
            "get-scheduledtask | where-object {$_.taskname -like '*enrollment*'}",
          ],
          output: `TaskPath                    TaskName                          State
--------                    --------                          -----
\\Microsoft\\Windows\\EnterpriseMgmt\\...  Schedule #1 to enroll in Intune  Running
\\Microsoft\\Windows\\EnterpriseMgmt\\...  Schedule to poll for updates     Ready`,
          hint: "Prüfe die Enrollment-Tasks von Intune",
          explanation:
            "Schedule #1 to enroll zeigt erfolgreiche MDM-Registrierung.",
        },
        {
          command:
            "Get-WmiObject -Class MDM_DeviceRegistered -Namespace root\\cimv2\\mdm\\dmmap | Select-Object DeviceId",
          aliases: [
            "get-wmiobject -class mdm_deviceregistered -namespace root\\cimv2\\mdm\\dmmap | select-object deviceid",
          ],
          output: `DeviceId
--------
ab123456-cd78-ef90-1234-567890abcdef`,
          hint: "Zeige die Intune Device ID",
          explanation:
            "Eine DeviceId bedeutet erfolgreiche MDM-Registrierung bei Intune.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Was ist der Unterschied zwischen Entra Join und Entra Registered?",
        options: [
          {
            key: "A",
            text: "Join = Firmengerät vollständig verwaltet; Registered = BYOD mit MAM",
          },
          { key: "B", text: "Es gibt keinen Unterschied" },
          { key: "C", text: "Registered ist nur für iOS/Android" },
          { key: "D", text: "Join funktioniert nur mit Windows Server" },
        ],
        correctAnswer: "A",
        explanation:
          "Entra Join ist für Firmengeräte (volle Kontrolle), Registered ist für BYOD (App-Level Schutz).",
        hint: "Es geht um den Grad der Kontrolle über das Gerät",
      },
    ],
  },
  {
    id: "i10",
    title: "Compliance Policy erstellen",
    duration: "~5–8 min",
    description: "Erstelle eine Compliance Policy für Windows 10/11 Geräte.",
    checklist: [
      "Devices → Compliance → Windows 10 and later → Create policy",
      "Defender Antivirus: Required",
      "Firewall: Required",
      "BitLocker: Optional (für Lab)",
      "Testgruppe zuweisen",
    ],
    verify: ["Geräte zeigen Compliant oder Noncompliant Status"],

    guiSimulator: {
      title: "Compliance Policy konfigurieren",
      description: "Erstelle eine Windows Compliance Policy",
      portal: "intune",
      steps: [
        {
          id: "step1",
          title: "Compliance navigieren",
          description: "Wo erstellst du Compliance Policies?",
          panel: "sidebar",
          icon: "shield",
          options: [
            { label: "Devices → Compliance", isCorrect: true },
            { label: "Apps → App protection policies", isCorrect: false },
            {
              label: "Endpoint security → Security baselines",
              isCorrect: false,
            },
            { label: "Users → All users", isCorrect: false },
          ],
          successMessage:
            "Richtig! Compliance Policies findest du unter Devices → Compliance.",
        },
        {
          id: "step2",
          title: "Policy erstellen",
          description: "Welche Plattform wählst du für Windows 11 Geräte?",
          panel: "main",
          icon: "laptop",
          options: [
            { label: "Windows 10 and later", isCorrect: true },
            { label: "Windows 8.1", isCorrect: false },
            { label: "Windows Phone 8.1", isCorrect: false },
            { label: "Windows Holographic for Business", isCorrect: false },
          ],
          successMessage:
            "Korrekt! Windows 10 and later gilt auch für Windows 11.",
        },
        {
          id: "step3",
          title: "Defender Antivirus",
          description: "Welche Einstellung erzwingt Microsoft Defender?",
          panel: "main",
          icon: "shield",
          options: [
            {
              label: "Require Microsoft Defender Antimalware: Required",
              isCorrect: true,
            },
            { label: "Minimum OS version: 10.0.19041", isCorrect: false },
            { label: "Password complexity: Medium", isCorrect: false },
            { label: "Maximum minutes of inactivity: 5", isCorrect: false },
          ],
          successMessage:
            "Richtig! Diese Einstellung erzwingt aktiven Defender.",
        },
      ],
    },

    commandChallenge: {
      title: "Compliance Status prüfen",
      description: "Nutze PowerShell Graph zum Prüfen der Compliance",
      challenges: [
        {
          instruction: "Verbinde dich mit Microsoft Graph (Intune-Scope):",
          parts: [
            { type: "text", content: "Connect-" },
            {
              type: "blank",
              content: "",
              answer: "MgGraph",
              hint: "Microsoft Graph Modul",
            },
            {
              type: "text",
              content: ' -Scopes "DeviceManagementManagedDevices.',
            },
            {
              type: "blank",
              content: "",
              answer: "Read.All",
              hint: "Berechtigung zum Lesen aller Geräte",
            },
            { type: "text", content: '"' },
          ],
          explanation:
            "Der DeviceManagementManagedDevices.Read.All Scope erlaubt Lesen aller verwalteten Geräte.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Was passiert mit einem Gerät das nicht-compliant ist, wenn Conditional Access konfiguriert ist?",
        options: [
          { key: "A", text: "Das Gerät wird automatisch gelöscht" },
          {
            key: "B",
            text: "Der Zugriff auf geschützte Ressourcen wird blockiert",
          },
          { key: "C", text: "Der Benutzer wird aus Entra ID entfernt" },
          { key: "D", text: "Nichts, es ist nur eine Warnung" },
        ],
        correctAnswer: "B",
        explanation:
          "Conditional Access kann den Zugriff auf Cloud-Apps blockieren, bis das Gerät compliant ist.",
        hint: "Es betrifft den Zugriff auf Ressourcen",
      },
    ],
  },
  {
    id: "i11",
    title: "Konfigurationsprofile (Settings catalog)",
    duration: "~5–10 min",
    description:
      "Erstelle Device Configuration Profile über den Settings Catalog.",
    checklist: [
      "Devices → Configuration profiles → Create",
      "Windows 10 and later → Settings catalog auswählen",
      "Einstellungen für Defender/Firewall/OneDrive hinzufügen",
      "Testgruppe zuweisen",
      "Auf Konflikte prüfen",
    ],
    verify: [
      "Status: Succeeded bei zugewiesenen Geräten",
      "Keine Konflikte mit anderen Profilen",
    ],

    guiSimulator: {
      title: "Settings Catalog Profil erstellen",
      description: "Konfiguriere ein Profil über den Settings Catalog",
      portal: "intune",
      steps: [
        {
          id: "step1",
          title: "Configuration profiles finden",
          description: "Wo erstellst du Konfigurationsprofile?",
          panel: "sidebar",
          icon: "settings",
          options: [
            { label: "Devices → Configuration profiles", isCorrect: true },
            { label: "Devices → Compliance", isCorrect: false },
            { label: "Apps → All apps", isCorrect: false },
            { label: "Endpoint security → Antivirus", isCorrect: false },
          ],
          successMessage: "Richtig! Konfigurationsprofile sind unter Devices.",
        },
        {
          id: "step2",
          title: "Profil-Typ wählen",
          description: "Welchen Profil-Typ nutzt du für maximale Flexibilität?",
          panel: "main",
          icon: "file",
          options: [
            { label: "Settings catalog", isCorrect: true },
            { label: "Templates → Device restrictions", isCorrect: false },
            { label: "Templates → Administrative templates", isCorrect: false },
            { label: "Templates → Custom", isCorrect: false },
          ],
          successMessage:
            "Korrekt! Settings catalog bietet Zugriff auf alle verfügbaren Einstellungen.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Was ist der Vorteil des Settings Catalog gegenüber Templates?",
        options: [
          { key: "A", text: "Templates sind nur für macOS verfügbar" },
          {
            key: "B",
            text: "Settings Catalog hat Zugriff auf alle Policy CSPs und mehr Einstellungen",
          },
          { key: "C", text: "Templates sind langsamer" },
          { key: "D", text: "Es gibt keinen Vorteil" },
        ],
        correctAnswer: "B",
        explanation:
          "Der Settings Catalog bietet Zugriff auf alle verfügbaren Policy CSPs und wird ständig erweitert.",
        hint: "Es hat mit der Anzahl verfügbarer Einstellungen zu tun",
      },
    ],
  },
  {
    id: "i12",
    title: "Conditional Access: Nur konforme Geräte",
    duration: "~5–10 min",
    description:
      "Erstelle eine Conditional Access Policy, die nur konforme Geräte erlaubt.",
    checklist: [
      "Entra Admin Center → Protection → Conditional Access",
      "New policy erstellen",
      "Users: Pilot-Gruppe oder einzelne Testbenutzer",
      "Cloud apps: All cloud apps oder spezifische Apps",
      "Grant: Require device to be marked as compliant",
      "Zuerst Report-only, dann Enforce",
    ],
    verify: [
      "Nicht-konforme Geräte werden blockiert",
      "Konforme Geräte können zugreifen",
    ],
    notes: ["Break-Glass Konto ohne CA-Policy bereithalten!"],

    guiSimulator: {
      title: "Conditional Access Policy erstellen",
      description: "Konfiguriere eine Policy für Device Compliance",
      portal: "entra",
      steps: [
        {
          id: "step1",
          title: "Conditional Access finden",
          description: "Wo erstellst du CA Policies?",
          panel: "sidebar",
          icon: "shield",
          options: [
            { label: "Protection → Conditional Access", isCorrect: true },
            { label: "Users → All users", isCorrect: false },
            {
              label: "Applications → Enterprise applications",
              isCorrect: false,
            },
            { label: "Identity governance", isCorrect: false },
          ],
          successMessage: "Richtig! CA Policies sind unter Protection.",
        },
        {
          id: "step2",
          title: "Grant Control konfigurieren",
          description: "Welche Grant-Anforderung erzwingt konforme Geräte?",
          panel: "main",
          icon: "laptop",
          options: [
            {
              label: "Require device to be marked as compliant",
              isCorrect: true,
            },
            { label: "Require multi-factor authentication", isCorrect: false },
            {
              label: "Require hybrid Azure AD joined device",
              isCorrect: false,
            },
            { label: "Require approved client app", isCorrect: false },
          ],
          successMessage: "Korrekt! Diese Option erzwingt Intune Compliance.",
        },
        {
          id: "step3",
          title: "Policy State wählen",
          description:
            "Mit welchem State solltest du eine neue CA Policy zuerst testen?",
          panel: "main",
          icon: "bell",
          options: [
            { label: "Report-only", isCorrect: true },
            { label: "On", isCorrect: false },
            { label: "Off", isCorrect: false },
          ],
          successMessage:
            "Richtig! Report-only testet die Auswirkung ohne Blockierung.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Warum brauchst du ein Break-Glass Konto ohne Conditional Access?",
        options: [
          {
            key: "A",
            text: "Für den Fall, dass alle CA Policies versehentlich alle Admins aussperren",
          },
          { key: "B", text: "Um Lizenzen zu sparen" },
          {
            key: "C",
            text: "Break-Glass ist ein Microsoft-Requirement für Support",
          },
          { key: "D", text: "Nur für Compliance-Berichte" },
        ],
        correctAnswer: "A",
        explanation:
          "Ein Break-Glass Account ist ein Notfall-Admin ohne CA-Regeln, falls du dich durch fehlerhafte Policies aussperrst.",
        hint: "Es ist ein Notfall-Szenario",
      },
      {
        question: "Was bedeutet 'Report-only' bei einer CA Policy?",
        options: [
          {
            key: "A",
            text: "Die Policy wird nur geloggt, aber nicht durchgesetzt",
          },
          { key: "B", text: "Die Policy gilt nur für Berichte" },
          { key: "C", text: "Die Policy ist deaktiviert" },
          { key: "D", text: "Die Policy sendet E-Mail Reports" },
        ],
        correctAnswer: "A",
        explanation:
          "Report-only protokolliert, was passieren würde, ohne tatsächlich zu blockieren. Ideal zum Testen.",
        hint: "Es ist ein Testmodus",
      },
    ],
  },
];

export const INTUNE_TOTAL = INTUNE_STEPS.length;

export function loadIntune() {
  const map = readProgressMap(INTUNE_MANIFEST_ID);
  const done = Object.values(map).filter(Boolean).length;
  const percent = pctFromMap(map, INTUNE_TOTAL);
  return { map, done, percent };
}
