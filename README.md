🧩 MainLab UI

Interactive Training Platform für Microsoft Zertifizierungen (MD-102 & MS-102)
Version: 1.0.0
Framework: Next.js 16 + TypeScript + TailwindCSS

🚀 Ziel

MainLab ist eine Lern- und Übungsplattform für IT-Fachinformatiker, Administratoren und Cloud-Interessierte,
die sich auf Microsoft-Zertifizierungen MD-102 (Endpoint Administrator) und MS-102 (Microsoft 365 Administrator) vorbereiten.

Die Oberfläche simuliert interaktive Lab-Übungen, die sowohl On-Premises (Hyper-V / AD-DNS)
als auch Cloud-basiert (Intune / Entra ID / M365) durchgeführt werden können.

🏗️ Projektstruktur
mainlab-ui/
├─ src/
│  ├─ app/
│  │  ├─ lab/                 → Lab-Hauptübersicht
│  │  ├─ lab-hyperv/          → Abschnitt 1: Hyper-V Templates, vSwitch, DC01
│  │  ├─ lab-addns/           → Abschnitt 2: AD, DNS, DHCP
│  │  ├─ lab-intune/          → Abschnitt 3: Entra, Intune, Sync
│  │  ├─ lab-md102/           → MD-102 Zertifizierungslabs
│  │  ├─ lab-ms102/           → MS-102 Zertifizierungslabs
│  │  ├─ lab-simulation/      → Exam-Simulation mit Prüfungsfragen
│  │  └─ lab-powershell/      → PowerShell-Sandbox für Tenant- und AD-Befehle
│  ├─ components/             → UI-Komponenten (Card, Button, Progress, Checkbox, etc.)
│  └─ lib/                    → Datenmodelle für Lab-Schritte (stepsHyperV.ts, stepsMD102.ts usw.)
│
├─ package.json               → npm-Konfiguration
├─ postcss.config.js          → PostCSS / Tailwind
├─ tailwind.config.js         → TailwindCSS Setup
└─ tsconfig.json              → TypeScript Konfiguration

⚙️ Installation & Start
1️⃣ Projekt initialisieren
npm install

2️⃣ Dev-Server starten
npm run dev


Öffne danach:
👉 http://localhost:3000/lab

3️⃣ Labs öffnen
Bereich	Pfad	Beschreibung
🧱 Hyper-V	/lab-hyperv	VM-Rolle, vSwitch, Templates, DC01
🌐 AD / DNS / DHCP	/lab-addns	Forest mainlab.local, DHCP, OUs
☁️ Intune / Entra ID	/lab-intune	Dev-Tenant, Sync, Hybrid-Join
💻 MD-102	/lab-md102	Endpoint Admin: Enrollment, WUfB, Apps, Security
🧭 MS-102	/lab-ms102	M365 Admin: Pilot, CA, Intune Reporting
🧠 Exam Simulation	/lab-simulation	Fragen zu MD-102 & MS-102
⚙️ PowerShell	/lab-powershell	Skript-Tests mit Tenant/AD Befehlen
🧩 Fortschritt speichern & zurücksetzen

Der Lernfortschritt wird automatisch im LocalStorage deines Browsers gespeichert.

Aktion	Beschreibung
✅ Beim Anklicken einer Übung	Fortschritt gespeichert
🔁 Browser-Reload	Fortschritt bleibt erhalten
🧹 Reset	Im DevTools-Storage localStorage.clear() ausführen oder mit Taste F12 → Application → LocalStorage → mainlab:md-102:progress / mainlab:ms-102:progress löschen
💡 Tipps für eigene Erweiterungen
Ziel	Vorgehen
🔸 Neues Modul hinzufügen	Unter /src/app/lab-<name>/ neuen Ordner anlegen mit page.tsx und [id]/page.tsx
🔸 Neue Lektionen einfügen	In /src/lib/ Datei steps<Name>.ts kopieren und anpassen
🔸 Custom Styling	Über Tailwind Klassen oder in globals.css
🔸 Export / Hosting	npm run build → /out/ oder Vercel-Deployment möglich
🧠 Zertifizierungsszenarien
MD-102 (Endpoint Administrator)

Windows Enrollment (MDM, Autopilot, Hybrid Join)

Device Compliance & Conditional Access

Update Management (WUfB)

Application Deployment (Win32, Edge, Store)

Endpoint Security (ASR, AV, Firewall)

Reporting & Troubleshooting (dsregcmd, IME Logs)

MS-102 (Microsoft 365 Administrator)

Tenant Setup & Lizenzverwaltung

Entra ID Rollen & Gruppen

Intune Integration & MDM/MAM Authority

Conditional Access Policies

Device Compliance Reports

CA-Policies & MFA

Intune + Defender Profiltests

🔒 Fortschritt-Keys (LocalStorage)
Zertifikat	LocalStorage Key
MD-102	mainlab:md-102:progress
MS-102	mainlab:ms-102:progress
ADDNS	mainlab:addns:progress
HYPERV	mainlab:hyperv:progress
🧰 Empfohlene Testumgebung
Komponente	Empfehlung
Host	Windows 11 mit Hyper-V
Client-VM	Win11 Pro x64
Server-VM	Windows Server 2022
Netzwerk	Interner vSwitch (10.10.0.0/24)
Tools	PowerShell 7, Windows Admin Center
Cloud	M365 Developer Tenant
🧾 Lizenz & Credits

© 2025 MainLab Project
Developed by Mirsad Mujagić
Didaktisch optimiert für CBW College Berufliche Weiterbildung GmbH
Frameworks: Next.js, React, TailwindCSS