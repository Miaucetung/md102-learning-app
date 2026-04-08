import { readProgressMap, pctFromMap } from "@/lib/progress";

export type IntuneStep = {
  id: "i1" | "i2" | "i3" | "i4" | "i5" | "i6" | "i7" | "i8" | "i9" | "i10" | "i11" | "i12";
  title: string;
  duration?: string;
  checklist: string[];
  portalLinks?: { label: string; href: string }[];
  powershell?: string;
  verify: string[];
  notes?: string[];
};

export const INTUNE_STEPS: IntuneStep[] = [
  {
    id: "i1",
    title: "Microsoft 365 Developer-Tenant anlegen (Global Admin)",
    duration: "~15 min",
    checklist: [
      "https://developer.microsoft.com/microsoft-365/dev-program",
      "Join now → Instant Sandbox (E5) → Tenantname vergeben.",
      "Sample data packs optional.",
      "Admin-User, Initialpasswort, Recovery-Mail notieren.",
      "Im Admin Center prüfen: E5 Dev Lizenz, Intune aktiv, GA-Rolle vorhanden."
    ],
    portalLinks: [
      { label: "M365 Dev Program", href: "https://developer.microsoft.com/microsoft-365/dev-program" },
      { label: "Admin Center", href: "https://admin.microsoft.com" },
      { label: "Azure Portal", href: "https://portal.azure.com" }
    ],
    verify: [
      "Login admin.microsoft.com ok",
      "Entra ID sichtbar",
      "intune.microsoft.com lädt",
      "Lizenz E5 Developer sichtbar",
      "Rolle Global Administrator gesetzt"
    ],
    notes: [
      "90 Tage gültig, bei Aktivität verlängerbar.",
      "Tenantname merken für Entra Connect/Hybrid-Join."
    ]
  },
  { id: "i2", title: "MDM/MAM-Behörde auf Intune setzen", duration: "~3 min",
    checklist: ["Intune admin center → Tenant admin → MDM authority: Intune"],
    portalLinks: [{ label: "Intune", href: "https://intune.microsoft.com" }],
    verify: ["MDM Authority: Microsoft Intune"]
  },
  { id: "i3", title: "Global Admin MFA aktivieren", duration: "~5 min",
    checklist: ["Security defaults aktivieren ODER eigene CA-Policy für Admins", "MFA-Registrierung abschließen"],
    portalLinks: [{ label: "Entra", href: "https://entra.microsoft.com" }],
    verify: ["Login fordert MFA", "My Sign-Ins ok"]
  },
  { id: "i4", title: "Microsoft Entra Connect (PHS)", duration: "~15–20 min",
    checklist: [
      "Setup auf Sync-Server (Lab: DC01) starten",
      "Sign-in method: Password Hash Sync",
      "Start synchronization when complete",
      "Mit GA anmelden; On-Prem AD angeben"
    ],
    powershell: `Start-ADSyncSyncCycle -PolicyType Initial
Start-ADSyncSyncCycle -PolicyType Delta`,
    verify: ["Synchronization Service → Operations grün", "Dienst Azure AD Sync läuft"]
  },
  { id: "i5", title: "Seamless SSO & OU-Filter setzen", duration: "~5 min",
    checklist: ["Wizard → Change user sign-in → Enable Seamless SSO", "Optional Features: OU-Filter nur MainLab-OUs"],
    verify: ["SSO Enabled", "OU-Filter korrekt"],
    notes: ["Filter beschleunigt Sync, reduziert Objekte"]
  },
  { id: "i6", title: "Initial Sync ausführen & prüfen", duration: "~3 min",
    checklist: ["Initial Sync anstoßen, dann Delta für Änderungen"],
    powershell: `Start-ADSyncSyncCycle -PolicyType Initial
Start-ADSyncSyncCycle -PolicyType Delta`,
    verify: ["Operations ohne Errors", "Eventlog ADSync ok"]
  },
  { id: "i7", title: "Synchronisierte Benutzer prüfen", duration: "~2 min",
    checklist: ["Entra → Users → Source = Windows Server AD", "z. B. user01 sichtbar"],
    portalLinks: [{ label: "Entra Users", href: "https://entra.microsoft.com/#view/Microsoft_AAD_UsersAndTenants/UserManagementMenuBlade/~/AllUsers" }],
    verify: ["user01 sichtbar, richtige Quelle"]
  },
  { id: "i8", title: "Sign-in Test (Cloud-Portal)", duration: "~3 min",
    checklist: ["Mit user01 anmelden; erwartetes Verhalten (MFA/Block) prüfen"],
    portalLinks: [{ label: "My Account", href: "https://myaccount.microsoft.com" }],
    verify: ["Anmeldung ok/Regel greift"]
  },
  { id: "i9", title: "Windows 11: Entra-Join / Hybrid-Join + Enrollment", duration: "~10–15 min",
    checklist: ["Cloud-Only: Entra-Join + Auto-Enrollment", "Hybrid: GPO Auto-Enrollment / Co-Mgmt", "Clientstatus prüfen"],
    powershell: `dsregcmd /status
powershell -Command "Get-ScheduledTask *PushLaunch*"`,
    verify: ["Intune Devices zeigt Gerät", "Client verbunden"]
  },
  { id: "i10", title: "Compliance Policy zuweisen", duration: "~5–8 min",
    checklist: ["Devices → Compliance → Windows 10/11 → neue Policy", "Defender aktiv, Firewall an; BitLocker optional"],
    verify: ["Compliant/Noncompliant sichtbar"]
  },
  { id: "i11", title: "Konfigurationsprofile (Settings catalog)", duration: "~5–10 min",
    checklist: ["Neues Profil (Defender/Firewall/OneDrive)", "Testgruppe zuweisen", "Konflikte prüfen"],
    verify: ["Status Succeeded/Conflict/Error", "Client-Logs prüfen"]
  },
  { id: "i12", title: "Conditional Access Pilot: nur konforme Geräte", duration: "~5–10 min",
    checklist: ["CA Policy auf Pilot-User/App", "Grant: require compliant device", "Report-only testen, dann Enforce"],
    verify: ["Nicht-konforme Geräte blockiert", "Konforme Geräte ok"],
    notes: ["Break-Glass Konto ohne CA bereithalten"]
  }
];

export const INTUNE_MANIFEST_ID = "lab-intune-001";
export const INTUNE_TOTAL = INTUNE_STEPS.length;
export const pct = pctFromMap;

export function loadIntune() {
  const map = readProgressMap(INTUNE_MANIFEST_ID);
  const done = Object.values(map).filter(Boolean).length;
  const percent = pctFromMap(map, INTUNE_TOTAL);
  return { map, done, percent };
}
