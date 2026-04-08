import Link from "next/link";

const Card = ({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) => (
  <Link
    href={href}
    className="block rounded-xl border p-4 hover:shadow-sm transition"
  >
    <div className="font-semibold">{title}</div>
    <div className="text-sm text-zinc-600">{desc}</div>
  </Link>
);

export default function LabHome() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Labs</h1>

      <div className="grid gap-3">

        <Card
          href="/lab-hyperv"
          title="Hyper-V Infrastruktur"
          desc="vSwitch, Templates, DC01"
        />

        <Card
          href="/lab-addns"
          title="AD / DNS / DHCP"
          desc="Forest mainlab.local, DHCP, OUs"
        />

        <Card
          href="/lab-intune"
          title="Entra / Intune"
          desc="Dev-Tenant, Entra Connect (PHS), Enrollment"
        />

        <Card
          href="/lab-md102"
          title="MD-102"
          desc="Endpoint Administrator – Enrollment, Policies, Apps, WUfB"
        />

        {/* ⭐ NEUE SCHALTFLÄCHE FÜR DEINEN MD-102-MC-TEST ⭐ */}
        <Card
          href="/lab-md102-exam"
          title="MD-102"
          desc="Multiple-Choice-Test mit Erklärungen"
        />

        <Card
          href="/lab-powershell"
          title="PowerShell Labs"
          desc="Übe mit echten Tenant- und AD-Befehlen"
        />

        {/* MS-102 (existiert bereits) */}
        <Link
          href="/ms102"
          className="block rounded-xl border p-4 hover:shadow-sm transition"
        >
          <div className="font-semibold">MS-102</div>
          <div className="text-sm text-zinc-600">
            Multiple-Choice-Test mit Erklärungen
          </div>
        </Link>

        <Card
         href="/lab-az104-exam"
         title="AZ-104"
         desc="Microsoft Azure Administrator – Multiple-Choice-Test"
        />

         <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>MainLab Theorie</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        <Link
          href="/mainlab/network-basics"
          style={{
            display: "block",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1.1rem" }}>
            Network Essentials
          </h2>
          <p style={{ margin: 0, opacity: 0.8, fontSize: "0.9rem" }}>
            Grundlagen zu IP, NAT, VLAN, DNS, DNS-Zonen und Azure VNET – rein theoretisches Modul.
          </p>
        </Link>

        {/* Hier kannst du weitere Module verlinken */}
      </section>
    </main>
  


        



      </div>
    </main>
  );
}
