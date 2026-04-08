// src/lib/stepsHyperV.ts

export type HyperVStep = {
  id: string;
  title: string;
  duration?: string;
  checklist: string[];
  powershell?: string;
  verify: string[];
  notes?: string[];
};

export const HYPERV_MANIFEST_ID = "lab-hyperv-001";

export const HYPERV_STEPS: HyperVStep[] = [
  {
    id: "t1",
    title: "Host vorbereiten",
    duration: "~10 min",
    checklist: [
      "Windows 11 Pro/Enterprise oder Server installiert",
      "Virtualisierung im BIOS aktiviert",
      "Mindestens 16 GB RAM verfügbar",
    ],
    verify: ["BIOS-Virtualisierung aktiv", "RAM ausreichend"],
    notes: ["Nested Virtualization in VMs erfordert spezielle Konfiguration"],
  },
  {
    id: "t2",
    title: "Rolle Hyper-V installieren",
    duration: "~5 min",
    checklist: [
      "PowerShell als Admin öffnen",
      "Feature installieren",
      "System neu starten",
    ],
    powershell: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`,
    verify: ["Hyper-V Manager verfügbar", "Dienste laufen"],
    notes: ["Neustart erforderlich"],
  },
  {
    id: "t3",
    title: "Virtuelle Switches anlegen",
    duration: "~5 min",
    checklist: [
      "Hyper-V Manager öffnen",
      "Virtual Switch Manager starten",
      "Internen Switch für Lab erstellen",
    ],
    powershell: `New-VMSwitch -Name "LabSwitch" -SwitchType Internal`,
    verify: ["Switch in VM-Konfiguration wählbar"],
    notes: ["Interner Switch für isolierte Labs empfohlen"],
  },
];

export const HYPERV_TOTAL = HYPERV_STEPS.length;

export function loadHyperV() {
  // später kannst du hier echten Fortschritt aus localStorage/etc. holen
  return { percent: 0 };
}
