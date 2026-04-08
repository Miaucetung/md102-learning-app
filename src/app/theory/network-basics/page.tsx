"use client";

/**
 * Network Essentials - Premium Learning Experience
 * Modern interactive diagrams with premium UI/UX
 */

import {
  DNSFlowDiagram,
  IPAddressVisualizer,
  NATFlowDiagram,
  NetworkTopologyDiagram,
  SubnetCalculator,
  VLANDiagram,
} from "@/components/diagrams/NetworkDiagrams";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Cloud,
  Globe,
  HardDrive,
  Layers,
  Network,
  Router,
  Server,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ============================================================================
// TAB CONFIGURATION
// ============================================================================

const tabs = [
  { key: "overview", label: "Übersicht", icon: BookOpen },
  { key: "topology", label: "Netzwerk-Topologie", icon: Network },
  { key: "ip", label: "IP-Adressen", icon: Globe },
  { key: "nat", label: "NAT/PAT", icon: Router },
  { key: "vlan", label: "VLANs", icon: Layers },
  { key: "subnetting", label: "Subnetting", icon: HardDrive },
  { key: "dns", label: "DNS", icon: Server },
  { key: "wifi", label: "WLAN", icon: Wifi },
  { key: "azure", label: "Azure VNET", icon: Cloud },
] as const;

type TabKey = (typeof tabs)[number]["key"];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function NetworkBasicsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Zurück
              </Link>
              <div className="h-6 w-px bg-slate-700" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Network Essentials
                  </h1>
                  <p className="text-sm text-slate-400">
                    Interaktive Netzwerk-Grundlagen
                  </p>
                </div>
              </div>
            </div>

            {/* Related Content Links */}
            <div className="flex items-center gap-3">
              <Link
                href="/learn/md-102"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                MD-102 Module
              </Link>
              <Link
                href="/lab-md102-exam"
                className="px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-sm text-indigo-300 transition-colors flex items-center gap-2"
              >
                Prüfungsfragen
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  data-tab={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg -z-10"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <OverviewTab onNavigate={setActiveTab} />
            )}
            {activeTab === "topology" && <TopologyTab />}
            {activeTab === "ip" && <IPTab />}
            {activeTab === "nat" && <NATTab />}
            {activeTab === "vlan" && <VLANTab />}
            {activeTab === "subnetting" && <SubnettingTab />}
            {activeTab === "dns" && <DNSTab />}
            {activeTab === "wifi" && <WiFiTab />}
            {activeTab === "azure" && <AzureVNETTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================================================
// OVERVIEW TAB
// ============================================================================

function OverviewTab({ onNavigate }: { onNavigate: (tab: TabKey) => void }) {
  const topics = [
    {
      title: "Netzwerk-Topologie",
      description:
        "Verstehe wie Geräte in Netzwerken verbunden sind und kommunizieren",
      icon: Network,
      color: "from-blue-500 to-cyan-500",
      tab: "topology" as TabKey,
    },
    {
      title: "IP-Adressen",
      description: "Private vs. öffentliche IPs, Adressklassen und Notation",
      icon: Globe,
      color: "from-emerald-500 to-teal-500",
      tab: "ip" as TabKey,
    },
    {
      title: "NAT/PAT",
      description: "Wie mehrere Geräte eine öffentliche IP teilen",
      icon: Router,
      color: "from-orange-500 to-amber-500",
      tab: "nat" as TabKey,
    },
    {
      title: "VLANs",
      description: "Logische Netzwerksegmentierung für Sicherheit",
      icon: Layers,
      color: "from-purple-500 to-pink-500",
      tab: "vlan" as TabKey,
    },
    {
      title: "Subnetting",
      description: "Netzwerke in kleinere Segmente aufteilen mit CIDR",
      icon: HardDrive,
      color: "from-indigo-500 to-violet-500",
      tab: "subnetting" as TabKey,
    },
    {
      title: "DNS",
      description: "Namensauflösung von Domänen zu IP-Adressen",
      icon: Server,
      color: "from-pink-500 to-rose-500",
      tab: "dns" as TabKey,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 overflow-hidden p-8">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-4">
            Willkommen zu Network Essentials
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl">
            Lerne die fundamentalen Konzepte der Netzwerktechnik mit
            interaktiven Diagrammen und praktischen Beispielen. Dieses Wissen
            ist essentiell für MD-102 und MS-102 Zertifizierungen.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />9 Module
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
              ≈45 min Lernzeit
            </div>
          </div>
        </div>
      </div>

      {/* Topic Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.button
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                onNavigate(topic.tab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800 transition-all text-left"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${topic.color} mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-slate-400">{topic.description}</p>
              <div className="flex items-center gap-1 mt-4 text-sm text-indigo-400 group-hover:text-indigo-300">
                Lernen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Related Content */}
      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// TOPOLOGY TAB
// ============================================================================

function TopologyTab() {
  const exampleNodes = [
    {
      id: "pc1",
      type: "pc" as const,
      label: "PC-001",
      x: 15,
      y: 75,
      info: "Arbeitsplatz-PC mit Windows 11, verbunden über LAN-Kabel",
    },
    {
      id: "pc2",
      type: "pc" as const,
      label: "PC-002",
      x: 35,
      y: 75,
      info: "Arbeitsplatz-PC, VLAN 20",
    },
    {
      id: "laptop",
      type: "laptop" as const,
      label: "Laptop",
      x: 15,
      y: 25,
      info: "Mobiles Gerät, verbunden via WLAN",
    },
    {
      id: "switch",
      type: "switch" as const,
      label: "Switch",
      x: 40,
      y: 50,
      info: "Managed Switch mit 24 Ports, VLAN-fähig",
    },
    {
      id: "router",
      type: "router" as const,
      label: "Router",
      x: 65,
      y: 50,
      info: "Gateway zum Internet, NAT aktiviert",
    },
    {
      id: "server",
      type: "server" as const,
      label: "Server",
      x: 55,
      y: 25,
      info: "Domain Controller, DNS, DHCP",
    },
    {
      id: "cloud",
      type: "cloud" as const,
      label: "Internet",
      x: 85,
      y: 50,
      info: "Öffentliches Internet",
    },
    {
      id: "wifi",
      type: "wifi" as const,
      label: "Access Point",
      x: 25,
      y: 25,
      info: "WLAN-Zugangspunkt, WPA3",
    },
  ];

  const exampleConnections = [
    { from: "pc1", to: "switch" },
    { from: "pc2", to: "switch" },
    { from: "switch", to: "router" },
    { from: "router", to: "cloud", animated: true },
    { from: "server", to: "switch" },
    { from: "wifi", to: "switch" },
    { from: "laptop", to: "wifi" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Netzwerk-Topologie"
        description="Klicke auf die Geräte für Details. Die Animation zeigt aktive Verbindungen."
      />

      <NetworkTopologyDiagram
        nodes={exampleNodes}
        connections={exampleConnections}
        title="Typisches Unternehmensnetzwerk"
        description="Interaktive Darstellung einer Stern-Topologie mit zentralem Switch"
      />

      {/* Explanation Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard
          title="Stern-Topologie"
          description="Alle Geräte sind mit einem zentralen Switch verbunden. Fällt ein Gerät aus, bleiben die anderen funktionsfähig. Der Switch ist jedoch ein Single Point of Failure."
          color="emerald"
        />
        <InfoCard
          title="Hierarchisches Design"
          description="Große Netzwerke nutzen Access-, Distribution- und Core-Layer für Skalierbarkeit und Redundanz."
          color="blue"
        />
      </div>

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// IP TAB
// ============================================================================

function IPTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="IP-Adressen"
        description="Private und öffentliche IPv4-Adressbereiche verstehen"
      />

      <IPAddressVisualizer />

      {/* Key Concepts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            Private IP-Adressen
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span className="text-slate-300">
                Werden im lokalen Netzwerk verwendet
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span className="text-slate-300">
                Nicht über das Internet erreichbar
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span className="text-slate-300">
                Können in jedem Netzwerk wiederverwendet werden
              </span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            Öffentliche IP-Adressen
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span className="text-slate-300">
                Weltweit einzigartig und routbar
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span className="text-slate-300">
                Vom ISP zugewiesen (statisch oder dynamisch)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span className="text-slate-300">
                Begrenzte Verfügbarkeit (IPv4 Erschöpfung)
              </span>
            </li>
          </ul>
        </div>
      </div>

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// NAT TAB
// ============================================================================

function NATTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="NAT/PAT"
        description="Network Address Translation ermöglicht mehreren Geräten die Nutzung einer öffentlichen IP"
      />

      <NATFlowDiagram />

      {/* Explanation */}
      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard
          title="Source NAT (SNAT)"
          description="Die Quell-IP interner Pakete wird durch die öffentliche IP des Routers ersetzt. PAT (Port Address Translation) nutzt zusätzlich verschiedene Ports zur Unterscheidung."
          color="orange"
        />
        <InfoCard
          title="Destination NAT (DNAT)"
          description="Eingehende Verbindungen werden auf interne Server weitergeleitet (Port Forwarding). Wichtig für Webserver, VPN-Endpunkte etc."
          color="purple"
        />
      </div>

      {/* Exam Tip */}
      <ExamTip
        title="MD-102 Prüfungswissen"
        content="NAT ist essentiell für das Verständnis von VPN-Verbindungen und Remote-Zugriff. Merke dir: PAT = viele Clients teilen eine IP durch unterschiedliche Ports."
      />

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// VLAN TAB
// ============================================================================

function VLANTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="VLANs"
        description="Virtuelle LANs segmentieren Netzwerke logisch auf Layer 2"
      />

      <VLANDiagram />

      {/* Key Concepts */}
      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard
          title="Sicherheit"
          description="VLANs isolieren Broadcast-Domänen. Geräte in verschiedenen VLANs können nur über einen Router kommunizieren."
          color="emerald"
        />
        <InfoCard
          title="Trunk Ports"
          description="Transportieren mehrere VLANs über eine Leitung mit 802.1Q Tagging. Access Ports gehören zu genau einem VLAN."
          color="blue"
        />
        <InfoCard
          title="Inter-VLAN Routing"
          description="Layer 3 Switch oder Router erforderlich für Kommunikation zwischen VLANs. Firewall-Regeln können Traffic filtern."
          color="purple"
        />
      </div>

      <ExamTip
        title="Praxisrelevanz"
        content="In Intune und Azure AD werden Netzwerk-Policies oft auf Basis von VLAN-Zugehörigkeit angewendet. Gäste-WLAN sollte immer ein separates VLAN nutzen!"
      />

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// SUBNETTING TAB
// ============================================================================

function SubnettingTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Subnetting"
        description="Teile große Netzwerke in kleinere, verwaltbare Segmente"
      />

      <SubnetCalculator />

      {/* Common Subnets Table */}
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">
            Häufige Subnet-Größen
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  CIDR
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Maske
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Hosts
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Typischer Einsatz
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {[
                {
                  cidr: "/24",
                  mask: "255.255.255.0",
                  hosts: "254",
                  use: "Standard für kleine Netzwerke",
                },
                {
                  cidr: "/25",
                  mask: "255.255.255.128",
                  hosts: "126",
                  use: "Abteilungen teilen",
                },
                {
                  cidr: "/26",
                  mask: "255.255.255.192",
                  hosts: "62",
                  use: "Kleinere Teams",
                },
                {
                  cidr: "/27",
                  mask: "255.255.255.224",
                  hosts: "30",
                  use: "Server-Segment",
                },
                {
                  cidr: "/30",
                  mask: "255.255.255.252",
                  hosts: "2",
                  use: "Point-to-Point Links",
                },
              ].map((row) => (
                <tr key={row.cidr} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <code className="text-indigo-400 font-mono">
                      {row.cidr}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-emerald-400 font-mono">
                      {row.mask}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-white">{row.hosts}</td>
                  <td className="px-6 py-4 text-slate-400">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// DNS TAB
// ============================================================================

function DNSTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="DNS"
        description="Domain Name System - die Telefonbuch des Internets"
      />

      <DNSFlowDiagram />

      {/* DNS Record Types */}
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">
            Wichtige DNS-Eintragstypen
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 p-6">
          {[
            {
              type: "A",
              desc: "IPv4-Adresse",
              example: "contoso.com → 52.120.21.33",
            },
            {
              type: "AAAA",
              desc: "IPv6-Adresse",
              example: "contoso.com → 2001:db8::1",
            },
            {
              type: "CNAME",
              desc: "Alias/Canonical Name",
              example: "www → contoso.com",
            },
            {
              type: "MX",
              desc: "Mail Exchange",
              example: "Priority 10: mail.contoso.com",
            },
            {
              type: "TXT",
              desc: "Text (SPF, DKIM)",
              example: "v=spf1 include:_spf.google.com",
            },
            {
              type: "NS",
              desc: "Nameserver",
              example: "ns1.azure-dns.com",
            },
          ].map((record) => (
            <div
              key={record.type}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <code className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 font-mono text-sm">
                  {record.type}
                </code>
                <span className="text-white font-medium">{record.desc}</span>
              </div>
              <code className="text-sm text-slate-400 font-mono">
                {record.example}
              </code>
            </div>
          ))}
        </div>
      </div>

      <ExamTip
        title="MS-102 Prüfungswissen"
        content="Für Microsoft 365 Custom Domains müssen TXT-Records zur Verifizierung und MX-Records für E-Mail konfiguriert werden. CNAME-Records für Autodiscover!"
      />

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// WIFI TAB
// ============================================================================

function WiFiTab() {
  const wifiStandards = [
    {
      name: "Wi-Fi 6E",
      standard: "802.11ax",
      frequency: "6 GHz",
      speed: "9.6 Gbps",
      year: "2021",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Wi-Fi 6",
      standard: "802.11ax",
      frequency: "2.4/5 GHz",
      speed: "9.6 Gbps",
      year: "2019",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Wi-Fi 5",
      standard: "802.11ac",
      frequency: "5 GHz",
      speed: "3.5 Gbps",
      year: "2014",
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Wi-Fi 4",
      standard: "802.11n",
      frequency: "2.4/5 GHz",
      speed: "600 Mbps",
      year: "2009",
      color: "from-emerald-500 to-blue-500",
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="WLAN-Standards"
        description="Wireless LAN Technologien und Sicherheit"
      />

      {/* WiFi Standards */}
      <div className="grid md:grid-cols-2 gap-4">
        {wifiStandards.map((wifi, index) => (
          <motion.div
            key={wifi.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${wifi.color}`}>
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{wifi.name}</h3>
                <code className="text-sm text-slate-400">{wifi.standard}</code>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-slate-500">Frequenz</span>
                <p className="text-white font-medium">{wifi.frequency}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Max Speed</span>
                <p className="text-white font-medium">{wifi.speed}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Eingeführt</span>
                <p className="text-white font-medium">{wifi.year}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="p-1 rounded bg-amber-500/20">🔐</span>
          WLAN-Sicherheit
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50">
            <code className="text-emerald-400">WPA3</code>
            <p className="text-sm text-slate-400 mt-1">
              Aktueller Standard, SAE-Handshake, keine KRACK-Anfälligkeit
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50">
            <code className="text-blue-400">WPA2-Enterprise</code>
            <p className="text-sm text-slate-400 mt-1">
              802.1X mit RADIUS, Zertifikatsbasiert, ideal für Unternehmen
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50">
            <code className="text-orange-400">WPA2-Personal</code>
            <p className="text-sm text-slate-400 mt-1">
              Pre-Shared Key (PSK), für Heimnetzwerke, vermeiden in Unternehmen
            </p>
          </div>
        </div>
      </div>

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// AZURE VNET TAB
// ============================================================================

function AzureVNETTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Azure Virtual Network"
        description="Software-defined Networking in der Microsoft Cloud"
      />

      {/* VNET Diagram */}
      <div className="rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/30 p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* VNET Container */}
          <div className="md:col-span-2 p-6 rounded-xl border-2 border-dashed border-sky-500/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-sky-400" />
              VNET: contoso-vnet (10.0.0.0/16)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "web-subnet",
                  cidr: "10.0.1.0/24",
                  resources: ["VM-Web-01", "VM-Web-02", "Load Balancer"],
                },
                {
                  name: "app-subnet",
                  cidr: "10.0.2.0/24",
                  resources: ["VM-App-01", "AKS Cluster"],
                },
                {
                  name: "db-subnet",
                  cidr: "10.0.3.0/24",
                  resources: ["SQL Server", "CosmosDB"],
                },
                {
                  name: "gateway-subnet",
                  cidr: "10.0.255.0/24",
                  resources: ["VPN Gateway"],
                },
              ].map((subnet) => (
                <div
                  key={subnet.name}
                  className="p-4 rounded-lg bg-slate-800/80 border border-slate-700"
                >
                  <code className="text-emerald-400 text-sm">
                    {subnet.name}
                  </code>
                  <p className="text-xs text-slate-500 mt-1">{subnet.cidr}</p>
                  <div className="mt-3 space-y-1">
                    {subnet.resources.map((r) => (
                      <div
                        key={r}
                        className="text-xs text-slate-400 flex items-center gap-2"
                      >
                        <Server className="w-3 h-3" />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <Globe className="w-6 h-6 text-orange-400 mb-2" />
              <h4 className="font-medium text-white">Internet</h4>
              <p className="text-xs text-slate-400 mt-1">
                Öffentlicher Zugriff via Public IP
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <Network className="w-6 h-6 text-purple-400 mb-2" />
              <h4 className="font-medium text-white">On-Premises</h4>
              <p className="text-xs text-slate-400 mt-1">
                VPN/ExpressRoute Verbindung
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <Layers className="w-6 h-6 text-emerald-400 mb-2" />
              <h4 className="font-medium text-white">Peered VNETs</h4>
              <p className="text-xs text-slate-400 mt-1">
                Verbindung zu anderen Azure VNETs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NSG Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard
          title="Network Security Groups (NSG)"
          description="Filtern Traffic auf Subnet- oder NIC-Ebene. Ähnlich wie Firewalls, aber Layer 4 (TCP/UDP Ports). Standardmäßig deny-all für eingehenden Traffic."
          color="purple"
        />
        <InfoCard
          title="Azure Firewall"
          description="Managed Firewall-as-a-Service. Layer 7 Application Rules, Threat Intelligence, FQDN-Filterung. Zentral für Hub-and-Spoke Architekturen."
          color="orange"
        />
      </div>

      <ExamTip
        title="Azure Integration mit Intune"
        content="Conditional Access kann Azure AD Join und Compliance-Status prüfen, bevor Zugriff auf Azure-Ressourcen gewährt wird. VPN-Profile können über Intune deployed werden."
      />

      <RelatedContentSection />
    </div>
  );
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function InfoCard({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: "emerald" | "blue" | "purple" | "orange";
}) {
  const colors = {
    emerald: "from-emerald-500/10 border-emerald-500/30",
    blue: "from-blue-500/10 border-blue-500/30",
    purple: "from-purple-500/10 border-purple-500/30",
    orange: "from-orange-500/10 border-orange-500/30",
  };

  return (
    <div
      className={`p-6 rounded-2xl bg-gradient-to-br ${colors[color]} to-transparent border`}
    >
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function ExamTip({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="font-semibold text-amber-300 mb-1">{title}</h4>
          <p className="text-slate-300">{content}</p>
        </div>
      </div>
    </div>
  );
}

function RelatedContentSection() {
  return (
    <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">
        Verwandte Inhalte
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/learn/md-102/device-enrollment"
          className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/30 hover:border-indigo-500/50 transition-colors group"
        >
          <span className="text-xs text-indigo-400 uppercase tracking-wider">
            MD-102 Modul
          </span>
          <h4 className="text-white font-medium mt-1 group-hover:text-indigo-300">
            Device Enrollment
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            Netzwerk-Voraussetzungen für Geräteanmeldung
          </p>
        </Link>
        <Link
          href="/learn/ms-102/tenant-management"
          className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/30 hover:border-indigo-500/50 transition-colors group"
        >
          <span className="text-xs text-emerald-400 uppercase tracking-wider">
            MS-102 Modul
          </span>
          <h4 className="text-white font-medium mt-1 group-hover:text-indigo-300">
            Tenant Management
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            DNS für Custom Domains konfigurieren
          </p>
        </Link>
        <Link
          href="/lab-md102-exam"
          className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/30 hover:border-indigo-500/50 transition-colors group"
        >
          <span className="text-xs text-pink-400 uppercase tracking-wider">
            Prüfungsfragen
          </span>
          <h4 className="text-white font-medium mt-1 group-hover:text-indigo-300">
            MD-102 Exam Practice
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            Netzwerk-bezogene Prüfungsfragen üben
          </p>
        </Link>
      </div>
    </div>
  );
}
