// src/app/lab-simulation/page.tsx
import Link from "next/link";

type Lab = { title: string; href: string; description: string };

const labs: Lab[] = [
  { title: "Hyper-V Infrastruktur", href: "/hyperv", description: "vSwitch, Templates, DC01" },
  { title: "AD / DNS / DHCP", href: "/ad-dns-dhcp", description: "Forest mainlab.local, DHCP, OUs" },
  { title: "Entra / Intune", href: "/entra-intune", description: "Dev-Tenant, Entra Connect (PHS), Enrollment" },
  { title: "MD-102", href: "/md-102", description: "Endpoint Administrator – Enrollment, Policies, Apps, WUfB" },
  

  // ✅ Neuer Eintrag
  { title: "MS-102 – Exam (neu)", href: "/lab-ms102-exam", description: "110 Fragen in fester Reihenfolge + Erklärungen" },

  { title: "PowerShell Labs", href: "/powershell-labs", description: "Übe mit echten Tenant- und AD-Befehlen" },
];

export default function LabsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Labs</h1>

      <div className="space-y-4">
        {labs.map((lab) => (
          <Link
            key={lab.href}
            href={lab.href}
            className="block rounded-2xl border p-5 hover:bg-gray-50 transition"
          >
            <h3 className="text-lg font-semibold">{lab.title}</h3>
            <p className="text-sm text-gray-600">{lab.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
