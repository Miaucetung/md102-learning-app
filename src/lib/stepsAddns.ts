export type AddnsStep = {
  id: string;
  title: string;
  description: string;
  done?: boolean;
};

export const stepsAddns: AddnsStep[] = [
  {
    id: "step-1",
    title: "Prepare ADDNS lab",
    description: "Placeholder step – hier kommen später deine echten Schritte rein.",
  },
  {
    id: "step-2",
    title: "Configure DNS zones",
    description: "Ebenfalls nur ein Platzhalter für den Anfang.",
  },
];
