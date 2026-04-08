"use client";

import { useState } from "react";
import Link from "next/link";

type LabExercise = {
  id: string;
  title: string;
  goal: string;
  commands: string[];
  verify: string[];
};

const LABS: LabExercise[] = [
  {
    id: "ps1",
    title: "Intune – Benutzer & Geräte abrufen",
    goal: "Überprüfen, welche Geräte und Benutzer aktuell im Tenant registriert sind.",
    commands: [
      "Connect-MgGraph -Scopes 'Device.Read.All, User.Read.All'",
      "Get-MgUser | Select DisplayName, UserPrincipalName",
      "Get-MgDevice | Select DisplayName, OperatingSystem"
    ],
    verify: [
      "Liste der Benutzer wird angezeigt.",
      "Geräteobjekte sichtbar mit OS-Typen."
    ]
  },
  {
    id: "ps2",
    title: "MDM Enrollment überprüfen",
    goal: "Status des Geräts in Azure AD prüfen.",
    commands: [
      "dsregcmd /status",
      "(Get-MgDevice | ? { $_.displayName -like '*CLIENT01*' }).DeviceId"
    ],
    verify: [
      "AzureAdJoined = YES",
      "Gerät besitzt gültige DeviceId im Tenant"
    ]
  },
  {
    id: "ps3",
    title: "AD DS – Benutzer erstellen (On-Prem)",
    goal: "Benutzer im lokalen AD anlegen und für Synchronisation vorbereiten.",
    commands: [
      "New-ADUser -Name 'user05' -SamAccountName 'user05' -AccountPassword (ConvertTo-SecureString 'Pass@word1' -AsPlainText -Force) -Enabled $true -Path 'OU=MainLab,DC=mainlab,DC=local'",
      "Get-ADUser user05 | Select Name, Enabled"
    ],
    verify: [
      "Benutzer in AD sichtbar.",
      "Wird durch Entra Connect synchronisiert."
    ]
  },
  {
    id: "ps4",
    title: "Security Reports – Failed Sign-Ins",
    goal: "Fehlgeschlagene Anmeldeversuche in Entra ID prüfen.",
    commands: [
      "Connect-MgGraph -Scopes 'AuditLog.Read.All'",
      "Get-MgAuditLogSignIn | ? {$_.Status.ErrorCode -ne 0} | Select UserDisplayName, AppDisplayName, Status"
    ],
    verify: [
      "Anmeldefehler werden im Output angezeigt.",
      "AuditLog Daten abrufbar."
    ]
  }
];

export default function PowerShellLab() {
  const [selected, setSelected] = useState<LabExercise | null>(null);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between border-b pb-3">
        <h1 className="text-2xl font-bold">💻 PowerShell Übungsmodul</h1>
        <Link href="/lab" className="text-blue-600 hover:underline">⬅ Zurück zum Lab</Link>
      </header>

      {!selected ? (
        <div className="space-y-2">
          {LABS.map(l => (
            <button
              key={l.id}
              onClick={() => setSelected(l)}
              className="w-full text-left border p-3 rounded hover:bg-blue-50"
            >
              <b>{l.title}</b>
              <p className="text-sm text-zinc-600">{l.goal}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{selected.title}</h2>
          <p className="text-sm text-zinc-700">{selected.goal}</p>

          <pre className="bg-zinc-50 border rounded p-3 whitespace-pre-wrap text-sm">
{selected.commands.join("\n")}
          </pre>

          <h3 className="font-semibold">✅ Überprüfung</h3>
          <ul className="list-disc pl-5 text-sm">
            {selected.verify.map((v, i) => <li key={i}>{v}</li>)}
          </ul>

          <button
            onClick={() => setSelected(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          >
            🔙 Zurück zur Übersicht
          </button>
        </div>
      )}
    </main>
  );
}
