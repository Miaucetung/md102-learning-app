// src/lib/stepsMD102.ts

export type ProgressMap = Record<string, boolean>;

export type Md102Step = {
  id: string;
  title: string;
  duration?: string;
  goal: string;
  checklist: string[];
  cloudTrack?: string[];
  onpremTrack?: string[];
  portalLinks?: { label: string; href: string }[];
  powershell?: string;
  verify: string[];
  tips?: string[];
};

export const MD102_STEPS: Md102Step[] = [
  {
    id: "m1",
    title: "Gerätebereitstellung: Autopilot (User-Driven)",
    duration: "~15 min",
    goal: "Windows-Geräte mit Autopilot automatisch bereitstellen.",
    checklist: [
      "Gerätedaten per PowerShell erfassen (Get-WindowsAutopilotInfo.ps1).",
      "Import in Intune → Devices → Windows Autopilot devices.",
      "Deployment-Profile (User-Driven, Azure AD Join, Skip OOBE) erstellen.",
      "Gerät einem Benutzer oder der Pilotgruppe zuweisen."
    ],
    cloudTrack: [
      "Gerät resetten und OOBE-Flow bis Enrollment durchlaufen.",
      "Gerät erscheint automatisch in Intune und Entra ID."
    ],
    onpremTrack: [
      "Bei Hybrid-Join: Hybrid-Autopilot mit AD Connect (Device Writeback) konfigurieren."
    ],
    portalLinks: [
      { label: "Intune – Autopilot", href: "https://intune.microsoft.com/#view/Microsoft_Intune_DeviceSettings/DevicesMenu/~/autopilotDevices" }
    ],
    verify: [
      "Gerät in Intune sichtbar, assigned User korrekt.",
      "Nach OOBE automatisch eingeschrieben (Enrolled by MFA)."
    ],
    tips: [
      "Autopilot nutzt HW-Hash → kein manuelles Imaging mehr.",
      "Deployment-Profile testen, bevor sie an viele Geräte gehen."
    ]
  },
  {
    id: "m2",
    title: "Entra Join / Hybrid Join – Vergleich & Tests",
    goal: "Unterschiede und Kontrolle der Gerätebindung verstehen.",
    checklist: [
      "Client lokal bereitstellen (Win 10/11 Pro oder Enterprise).",
      "Option A: Azure AD Join manuell via Einstellungen → Konten → Zugriff auf Arbeit/Schule.",
      "Option B: Hybrid Join per GPO und AD Connect einrichten.",
      "Befehl `dsregcmd /status` ausführen und Interpretation üben."
    ],
    powershell: "dsregcmd /status",
    verify: [
      "Join Type = AzureAdJoined oder HybridAzureADJoined.",
      "Device in Entra ID sichtbar und Intune-Enrollment aktiv."
    ],
    tips: [
      "Hybrid Join = lokale Domäne + Cloud-Sync, Azure AD Join = direkt Cloud.",
      "Prüfungsrelevant: Unterschiede Enrollment-Mechanismen."
    ]
  },
  {
    id: "m3",
    title: "Intune Enrollment (MDM) + Compliance Policies",
    goal: "Geräte automatisch einschreiben und Compliance erzwingen.",
    checklist: [
      "Automatic Enrollment aktivieren (MDM/MAM URLs prüfen).",
      "Gerät mit Intune verbinden.",
      "Compliance Policy erstellen (z. B. Defender aktiv, Firewall ON, BitLocker optional).",
      "Zuweisung an Pilot-Devices."
    ],
    verify: [
      "Gerät = Compliant.",
      "Nicht-konforme Geräte werden in CA geblockt (MS-102 Verknüpfung)."
    ],
    tips: [
      "IME-Logs unter C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs prüfen."
    ]
  },
  {
    id: "m4",
    title: "Configuration Profiles – Baselines / Settings Catalog",
    goal: "Geräteeinstellungen zentral verwalten und testen.",
    checklist: [
      "Neues Profil im Settings Catalog erstellen.",
      "Pilot-Zuweisung.",
      "Ergebnis unter Device Configuration → Status prüfen."
    ],
    cloudTrack: [
      "Security Baselines (Defender, Edge, Intune) testen."
    ],
    verify: [
      "Profile = Succeeded in Intune.",
      "Client zeigt geänderte Richtlinien (z. B. Defender aktiv)."
    ],
    tips: [
      "Prüfungsfrage: Baselines vs. Catalog – Baselines vorgefertigt, Catalog individuell."
    ]
  },
  {
    id: "m5",
    title: "Endpoint Security – ASR, AV, Firewall",
    goal: "Security Policies für Pilotgeräte umsetzen.",
    checklist: [
      "Endpoint Security → Attack Surface Reduction einrichten.",
      "Antivirus-Profile (Cloud-Schutz, Realtime).",
      "Firewall ON für alle Profile."
    ],
    portalLinks: [
      { label: "Endpoint Security", href: "https://intune.microsoft.com/#view/Microsoft_Intune_Security/SecurityMenu/~/overview" }
    ],
    verify: [
      "Policies Succeeded.",
      "Defender aktiv, ASR-Regeln greifen."
    ],
    tips: [
      "ASR-Regeln werden oft abgefragt – z. B. Block Office Macros."
    ]
  },
  {
    id: "m6",
    title: "Update-Management (WUfB) – Ringe & Deferrals",
    goal: "Windows Updates über Intune steuern.",
    checklist: [
      "Windows Update Ring anlegen (Pilot).",
      "Feature/Quality Deferrals konfigurieren.",
      "Zuweisung an Pilot-Devices."
    ],
    verify: [
      "Update-Status in Intune sichtbar.",
      "Client meldet WUfB Source = Intune."
    ],
    tips: [
      "Feature Updates → Planung, Quality Updates → Sicherheitspatches."
    ]
  },
  {
    id: "m7",
    title: "Apps – Win32 / Store / Edge / Company Portal",
    goal: "App-Bereitstellung und Deployment testen.",
    checklist: [
      "Win32-App mit IntuneWinAppUtil verpacken.",
      "Edge (Required) + Company Portal (Available) bereitstellen.",
      "App-Status überwachen."
    ],
    verify: [
      "Alle Apps installiert + Detection Rules korrekt."
    ],
    tips: [
      "CMD-Test für Erkennungsregel: `Test-Path 'C:\\Program Files (x86)\\App'`"
    ]
  },
  {
    id: "m8",
    title: "Troubleshooting – dsregcmd, IME-Logs, Reports",
    goal: "Geräte-Fehler analysieren und Berichte verstehen.",
    checklist: [
      "`dsregcmd /status` → Join/Compliant prüfen.",
      "Intune Reports → Profile/Compliance.",
      "IME-Logs auswerten."
    ],
    powershell: "Get-ChildItem 'C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs'",
    verify: [
      "Fehlerquelle identifiziert und gelöst.",
      "Gerät meldet sich korrekt in Intune."
    ]
  },
  {
    id: "m9",
    title: "BitLocker (optional) / Reporting & Demos",
    goal: "Verschlüsselung und Reporting testen.",
    checklist: [
      "Endpoint Security → Disk Encryption Profil anlegen.",
      "BitLocker-Status in Reports prüfen.",
      "Recovery-Key im AAD sichtbar machen."
    ],
    verify: [
      "Laufwerk C: verschlüsselt.",
      "Recovery Key gespeichert in Entra ID."
    ]
  }
];

export const MD102_TOTAL = MD102_STEPS.length;

const KEY = "mainlab:md-102:progress";

export function loadMD102(): ProgressMap {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as ProgressMap) : {};
}

export function saveMD102(map: ProgressMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(map));
}

export function pct(map: ProgressMap, total = MD102_TOTAL): number {
  const done = Object.values(map).filter(Boolean).length;
  return Math.round((done / (total || 1)) * 100);
}
