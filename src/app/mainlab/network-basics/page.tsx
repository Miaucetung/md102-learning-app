"use client";

import React, { useState } from "react";

type TabKey =
  | "intro"
  | "ip"
  | "nat"
  | "switch"
  | "vlan"
  | "subnet"
  | "dns"
  | "zones"
  | "vnet";

const tabs: { key: TabKey; label: string }[] = [
  { key: "intro", label: "1. Grundlagen" },
  { key: "ip", label: "2. Private & Öffentliche IP" },
  { key: "nat", label: "3. Router, NAT & PAT" },
  { key: "switch", label: "4. Switches" },
  { key: "vlan", label: "5. VLAN" },
  { key: "subnet", label: "6. Subnetting" },
  { key: "dns", label: "7. DNS & FQDN" },
  { key: "zones", label: "8. DNS-Zonen & Forwarding" },
  { key: "vnet", label: "9. Azure VNET" },
];

const NetworkBasicsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("intro");

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Network Essentials – Von IP bis DNS-Zonen
        </h1>
        <p style={{ margin: 0, opacity: 0.8 }}>
          MainLab Modul · rein theoretisch · ideal für Fachinformatiker SI, Azure AZ-104 &amp; Microsoft 365.
        </p>
      </header>

      {/* Tab-Leiste */}
      <nav
        aria-label="Themenreiter"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          borderBottom: "1px solid #ddd",
          paddingBottom: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                border: isActive ? "1px solid #333" : "1px solid #ccc",
                background: isActive ? "#f5f5f5" : "#ffffff",
                fontSize: "0.9rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Inhalt */}
      <section>
        {activeTab === "intro" && <IntroTab />}
        {activeTab === "ip" && <IpTab />}
        {activeTab === "nat" && <NatTab />}
        {activeTab === "switch" && <SwitchTab />}
        {activeTab === "vlan" && <VlanTab />}
        {activeTab === "subnet" && <SubnetTab />}
        {activeTab === "dns" && <DnsTab />}
        {activeTab === "zones" && <ZonesTab />}
        {activeTab === "vnet" && <VnetTab />}
      </section>
    </main>
  );
};

/**
 * 1. Grundlagen
 */
const IntroTab: React.FC = () => (
  <article>
    <h2>1. Netzwerkgrundlagen</h2>
    <p>
      Ein Netzwerk ist eine Menge von Geräten (Hosts), die miteinander Daten austauschen. In der Praxis
      arbeitest du mit:
    </p>
    <ul>
      <li>physischen Netzwerken (Switch → Router → Internet)</li>
      <li>virtuellen Netzwerken (Hyper-V, Proxmox, Azure VNET)</li>
    </ul>

    <Figure
      src="/images/network/network-topology.png"
      alt="Beispiel einer einfachen Heimnetzwerktopologie"
      caption="Abbildung 1: Einfache Netzwerk-Topologie (Client, Switch, Router, Internet)."
    />

    <h3>Wichtige Begriffe</h3>
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        maxWidth: "100%",
        marginTop: "0.75rem",
        fontSize: "0.95rem",
      }}
    >
      <thead>
        <tr>
          <th style={tableThStyle}>Begriff</th>
          <th style={tableThStyle}>Beschreibung</th>
          <th style={tableThStyle}>Beispiel</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tableTdStyle}>Host</td>
          <td style={tableTdStyle}>Endgerät mit IP-Adresse</td>
          <td style={tableTdStyle}>PC, VM, Smartphone, Drucker</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>LAN</td>
          <td style={tableTdStyle}>Lokales Netzwerk</td>
          <td style={tableTdStyle}>Heimnetz 192.168.178.0/24</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>WAN</td>
          <td style={tableTdStyle}>Weitverkehrsnetz, meist Internet</td>
          <td style={tableTdStyle}>Anbindung deines Routers</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>Router</td>
          <td style={tableTdStyle}>Verbindet verschiedene Netze</td>
          <td style={tableTdStyle}>FritzBox, OPNsense-Box, Ubiquiti</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>Switch</td>
          <td style={tableTdStyle}>Verbindet Geräte innerhalb eines Netzes (Layer 2)</td>
          <td style={tableTdStyle}>8/24-Port Switch im Rack</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>Firewall</td>
          <td style={tableTdStyle}>Filtert und kontrolliert Datenverkehr</td>
          <td style={tableTdStyle}>OPNsense, pfSense, FortiGate</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>DNS-Server</td>
          <td style={tableTdStyle}>Übersetzt Namen zu IP-Adressen</td>
          <td style={tableTdStyle}>Windows DNS, BIND, Pi-hole</td>
        </tr>
      </tbody>
    </table>
  </article>
);

/**
 * 2. Private & Öffentliche IP
 */
const IpTab: React.FC = () => (
  <article>
    <h2>2. Private &amp; Öffentliche IP-Adressen</h2>
    <p>
      IP-Adressen sind wie Hausadressen im Netzwerk. Man unterscheidet zwischen privaten (nur im LAN)
      und öffentlichen (im Internet sichtbaren) Adressen.
    </p>

    <Figure
      src="/images/network/private-vs-public.png"
      alt="Vergleich private vs. öffentliche IP-Adressen"
      caption="Abbildung 2: Private IP-Bereiche im LAN, öffentliche IP im Internet."
    />

    <h3>Private IPv4-Bereiche (RFC1918)</h3>
    <ul>
      <li>10.0.0.0/8 (z. B. 10.0.5.10)</li>
      <li>172.16.0.0/12 (z. B. 172.20.15.3)</li>
      <li>192.168.0.0/16 (z. B. 192.168.178.23)</li>
    </ul>
    <p>
      Diese Bereiche sind <strong>nicht im Internet routbar</strong> und werden typischerweise durch NAT
      nach außen übersetzt.
    </p>

    <h3>Öffentliche IP</h3>
    <p>
      Öffentliche IP-Adressen werden von Providern vergeben und sind weltweit eindeutig. Beispiele:
      <code>178.192.44.10</code>, <code>52.120.21.33</code> (Azure, Microsoft etc.).
    </p>
    <p>
      Dein Heimrouter (FritzBox, Ubiquiti, OPNsense) hat in der Regel eine öffentliche IP am WAN-Port
      und verteilt private IPs im LAN.
    </p>
  </article>
);

/**
 * 3. Router, NAT & PAT
 */
const NatTab: React.FC = () => (
  <article>
    <h2>3. Router, NAT &amp; PAT</h2>
    <p>
      Router verbinden Netzwerke miteinander und nutzen meist NAT/PAT, um mehrere interne Clients über
      eine einzige öffentliche IP ins Internet zu bringen.
    </p>

    <Figure
      src="/images/network/nat-pat-diagram.png"
      alt="Diagramm für NAT und PAT"
      caption="Abbildung 3: Mehrere interne Clients teilen sich eine öffentliche IP über NAT/PAT."
    />

    <h3>NAT (Network Address Translation)</h3>
    <p>
      NAT übersetzt interne, private IP-Adressen in eine öffentliche IP-Adresse. Der Router protokolliert,
      welcher interne Host welche Verbindung geöffnet hat, um Antworten korrekt zurückzuleiten.
    </p>

    <h3>PAT (Port Address Translation)</h3>
    <p>
      PAT ist eine Form von NAT, bei der zusätzlich die Portnummern benutzt werden, um mehrere gleichzeitige
      Verbindungen zu unterscheiden:
    </p>
    <pre style={codeBlockStyle}>
{`192.168.1.10:52341 → 178.192.44.10:443
192.168.1.11:52342 → 178.192.44.10:443`}
    </pre>

    <h3>Portweiterleitung</h3>
    <p>
      Möchtest du Dienste im LAN von außen erreichbar machen (z. B. Proxmox-GUI, Webserver), richtest du
      Portweiterleitungen ein:
    </p>
    <pre style={codeBlockStyle}>
{`WAN:443  → 192.168.100.10:443 (Proxmox)
WAN:8443 → 192.168.100.20:443 (OPNsense)`}
    </pre>
  </article>
);

/**
 * 4. Switches
 */
const SwitchTab: React.FC = () => (
  <article>
    <h2>4. Switches</h2>
    <p>
      Ein Switch verbindet mehrere Geräte innerhalb eines Netzwerks und arbeitet in erster Linie auf
      OSI-Layer 2 (MAC-Ebene).
    </p>

    <Figure
      src="/images/network/switch-vlan.png"
      alt="Switch mit mehreren VLANs"
      caption="Abbildung 4: Ein Managed Switch mit mehreren VLANs und Access-/Trunkports."
    />

    <h3>Funktionen eines Switches</h3>
    <ul>
      <li>MAC-Adressen lernen (welches Gerät hängt an welchem Port?)</li>
      <li>Frames gezielt weiterleiten statt broadcasten</li>
      <li>Netzwerk in VLANs logisch segmentieren</li>
    </ul>

    <h3>Unmanaged vs. Managed Switch</h3>
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        maxWidth: "100%",
        marginTop: "0.75rem",
        fontSize: "0.95rem",
      }}
    >
      <thead>
        <tr>
          <th style={tableThStyle}>Typ</th>
          <th style={tableThStyle}>Vorteile</th>
          <th style={tableThStyle}>Einschränkungen</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tableTdStyle}>Unmanaged Switch</td>
          <td style={tableTdStyle}>Plug &amp; Play, keine Konfiguration erforderlich</td>
          <td style={tableTdStyle}>Keine VLANs, wenig Kontrolle, kaum Sicherheit</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>Managed Switch</td>
          <td style={tableTdStyle}>VLANs, Trunks, QoS, Monitoring</td>
          <td style={tableTdStyle}>Konfiguration nötig, komplexer</td>
        </tr>
      </tbody>
    </table>
  </article>
);

/**
 * 5. VLAN
 */
const VlanTab: React.FC = () => (
  <article>
    <h2>5. VLAN (Virtual LAN)</h2>
    <p>
      Ein VLAN trennt das physische Netzwerk logisch in mehrere Teilnetze. Geräte im selben VLAN können
      direkt miteinander kommunizieren, Geräte in unterschiedlichen VLANs benötigen einen Router (Layer-3).
    </p>

    <Figure
      src="/images/network/switch-vlan.png"
      alt="VLAN-Segmentierung in einem Switch"
      caption="Abbildung 5: VLAN 10 (Management), VLAN 20 (Clients), VLAN 30 (IoT), VLAN 40 (Server)."
    />

    <h3>Typische VLAN-Struktur</h3>
    <ul>
      <li>VLAN 10 – Management (Switches, Firewalls, Hypervisor)</li>
      <li>VLAN 20 – Clients (Windows-/Linux-Workstations)</li>
      <li>VLAN 30 – IoT (Smart-TV, Kameras, Smart-Home)</li>
      <li>VLAN 40 – Server (AD, File, Proxmox-Cluster)</li>
    </ul>

    <h3>Access- vs. Trunk-Port</h3>
    <ul>
      <li>
        <strong>Access-Port</strong>: Gehört genau einem VLAN. Typisch für Endgeräte (PC, Drucker, AP).
      </li>
      <li>
        <strong>Trunk-Port</strong>: Führt mehrere VLANs getaggt (802.1Q). Typisch zwischen Switch &amp;
        Firewall/Router.
      </li>
    </ul>
  </article>
);

/**
 * 6. Subnetting
 */
const SubnetTab: React.FC = () => (
  <article>
    <h2>6. Subnetting</h2>
    <p>
      Subnetting bedeutet, ein größeres Netzwerk in mehrere kleinere Teilnetze zu teilen. Ziel ist bessere
      Struktur, Sicherheit und reduzierte Broadcast-Domänen.
    </p>

    <Figure
      src="/images/network/subnetting-chart.png"
      alt="Subnetting Übersichtstabelle"
      caption="Abbildung 6: Beispiele für IPv4-Subnetze und CIDR-Notation."
    />

    <h3>Beispiel: /24 in zwei /25 Netze aufteilen</h3>
    <p>Ausgangsnetz:</p>
    <pre style={codeBlockStyle}>
{`192.168.0.0/24  →  256 Adressen (254 nutzbare Hosts)`}
    </pre>

    <p>Aufteilung in zwei /25 Netze:</p>
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        maxWidth: "100%",
        marginTop: "0.75rem",
        fontSize: "0.95rem",
      }}
    >
      <thead>
        <tr>
          <th style={tableThStyle}>Subnetz</th>
          <th style={tableThStyle}>Adressbereich</th>
          <th style={tableThStyle}>Nutzbare Hosts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tableTdStyle}>192.168.0.0/25</td>
          <td style={tableTdStyle}>192.168.0.0 – 192.168.0.127</td>
          <td style={tableTdStyle}>126</td>
        </tr>
        <tr>
          <td style={tableTdStyle}>192.168.0.128/25</td>
          <td style={tableTdStyle}>192.168.0.128 – 192.168.0.255</td>
          <td style={tableTdStyle}>126</td>
        </tr>
      </tbody>
    </table>
  </article>
);

/**
 * 7. DNS & FQDN
 */
const DnsTab: React.FC = () => (
  <article>
    <h2>7. DNS &amp; FQDN</h2>
    <p>
      DNS (Domain Name System) übersetzt menschenlesbare Namen in IP-Adressen. Ohne DNS müsstest du dir
      alle IPs merken.
    </p>

    <Figure
      src="/images/network/dns-lookup.png"
      alt="DNS-Lookup Prozess"
      caption="Abbildung 7: Client fragt den DNS-Resolver, dieser kontaktiert die zuständigen DNS-Server."
    />

    <h3>FQDN (Fully Qualified Domain Name)</h3>
    <p>
      Der FQDN ist der vollständige, eindeutige Name eines Systems im DNS-Baum. Beispiel:
      <code>server01.corp.local</code>
    </p>
    <ul>
      <li><strong>Host</strong>: server01</li>
      <li><strong>Domain</strong>: corp.local</li>
    </ul>

    <h3>Beispiele</h3>
    <ul>
      <li>
        <code>www.microsoft.com</code>
      </li>
      <li>
        <code>vm1.mainlab.cloud</code>
      </li>
      <li>
        <code>dc01.lab.local</code>
      </li>
    </ul>
  </article>
);

/**
 * 8. DNS-Zonen & Forwarding
 */
const ZonesTab: React.FC = () => (
  <article>
    <h2>8. DNS-Zonen &amp; Forwarding</h2>
    <p>
      Eine DNS-Zone ist eine administrative Einheit im DNS. In ihr werden Resource Records wie A, AAAA,
      CNAME, MX und PTR verwaltet.
    </p>

    <Figure
      src="/images/network/dns-zones.png"
      alt="DNS-Zonen: Forward-, Reverse-, Primary-, Secondary-Zonen"
      caption="Abbildung 8: Forward- und Reverse-Lookup-Zonen sowie Primary-, Secondary- und Stub-Zonen."
    />

    <h3>Wichtige Zonentyen</h3>
    <ul>
      <li>
        <strong>Forward Lookup Zone</strong>: Name → IP (z. B.{" "}
        <code>server01.lab.local → 192.168.10.10</code>)
      </li>
      <li>
        <strong>Reverse Lookup Zone</strong>: IP → Name (PTR-Record, z. B.{" "}
        <code>192.168.10.10 → server01.lab.local</code>)
      </li>
      <li>
        <strong>Primary Zone</strong>: Beschreibbare Hauptzone, in der Änderungen vorgenommen werden.
      </li>
      <li>
        <strong>Secondary Zone</strong>: Read-only Kopie einer Primary Zone (Replikation, Redundanz).
      </li>
      <li>
        <strong>Stub Zone</strong>: Enthält nur die NS-Einträge einer anderen Zone, um Zuständigkeiten
        aufzulösen.
      </li>
    </ul>

    <h3>DNS-Forwarding</h3>
    <p>
      Ein DNS-Server kann Anfragen, die er nicht autoritativ beantworten kann, an andere Resolver
      weiterleiten (Forwarder).
    </p>
    <ul>
      <li>
        <strong>Standard-Forwarder</strong>: z. B. 1.1.1.1, 8.8.8.8, DNS des Providers.
      </li>
      <li>
        <strong>Conditional Forwarder</strong>: Für bestimmte Domains (z. B.{" "}
        <code>azure.contoso.com</code>) werden Anfragen an einen definierten anderen DNS-Server
        weitergeleitet.
      </li>
    </ul>
  </article>
);

/**
 * 9. Azure VNET
 */
const VnetTab: React.FC = () => (
  <article>
    <h2>9. Azure Virtual Network (VNET)</h2>
    <p>
      Ein Azure VNET ist das virtuelle Netzwerk in Microsoft Azure. Es verhält sich aus Sicht der
      Administration ähnlich wie ein On-Prem-IP-Netz, ist aber vollständig softwaredefiniert.
    </p>

    <Figure
      src="/images/network/azure-vnet.png"
      alt="Azure VNET mit Subnetzen und NSGs"
      caption="Abbildung 9: VNET mit mehreren Subnetzen (z. B. Management, App, DB) und NSGs."
    />

    <h3>Typische Elemente eines VNETs</h3>
    <ul>
      <li>VNET mit Adressbereich (z. B. 10.10.0.0/16)</li>
      <li>Subnetze (Management, App, DB, Gateway)</li>
      <li>NSGs (Network Security Groups) zum Filtern des Traffics</li>
      <li>VNET-Peering für die Verbindung verschiedener VNETs</li>
      <li>VPN-Gateway / ExpressRoute zum On-Prem-Netz</li>
    </ul>

    <h3>Beispielstruktur</h3>
    <pre style={codeBlockStyle}>
{`VNET:    10.10.0.0/16
Mgmt:    10.10.1.0/24
App:     10.10.2.0/24
DB:      10.10.3.0/24
Gateway: 10.10.10.0/24`}
    </pre>

    <p>
      So kannst du On-Prem-Netze (z. B. dein Proxmox-Lab mit OPNsense) per VPN mit Azure verbinden und
      ein durchgängiges, segmentiertes Netzwerkdesign umsetzen.
    </p>
  </article>
);

/**
 * Hilfskomponenten & Styles
 */

type FigureProps = {
  src: string;
  alt: string;
  caption: string;
};

const Figure: React.FC<FigureProps> = ({ src, alt, caption }) => (
  <figure style={{ margin: "1.5rem 0" }}>
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        padding: "0.5rem",
        background: "#fafafa",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          display: "block",
          borderRadius: "6px",
        }}
      />
    </div>
    <figcaption style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "0.35rem" }}>
      {caption}
    </figcaption>
  </figure>
);

const tableThStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "0.4rem 0.5rem",
  textAlign: "left",
  background: "#f3f3f3",
};

const tableTdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "0.4rem 0.5rem",
  verticalAlign: "top",
};

const codeBlockStyle: React.CSSProperties = {
  background: "#f5f5f5",
  padding: "0.75rem",
  borderRadius: "4px",
  overflowX: "auto",
  fontSize: "0.9rem",
  fontFamily: '"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export default NetworkBasicsModule;
