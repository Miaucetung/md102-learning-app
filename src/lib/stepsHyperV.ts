// src/lib/stepsHyperV.ts

export type HyperVStep = {
  id: string;
  title: string;
};

export const HYPERV_STEPS: HyperVStep[] = [
  { id: "01", title: "Host vorbereiten" },
  { id: "02", title: "Rolle Hyper-V installieren" },
  { id: "03", title: "Virtuelle Switches anlegen" },
];

export const HYPERV_TOTAL = HYPERV_STEPS.length;

export function loadHyperV() {
  // später kannst du hier echten Fortschritt aus localStorage/etc. holen
  return { percent: 0 };
}
