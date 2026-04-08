"use client";

/**
 * Interactive Network Diagram Components
 * Premium animated diagrams for network topology visualization
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  Cloud,
  Globe,
  HardDrive,
  Laptop,
  Monitor,
  Network,
  Router,
  Server,
  Smartphone,
  Wifi,
} from "lucide-react";
import { useState } from "react";

// ============================================================================
// NETWORK TOPOLOGY DIAGRAM
// ============================================================================

interface NetworkNode {
  id: string;
  type:
    | "pc"
    | "laptop"
    | "server"
    | "switch"
    | "router"
    | "cloud"
    | "phone"
    | "wifi";
  label: string;
  x: number;
  y: number;
  info?: string;
}

interface NetworkConnection {
  from: string;
  to: string;
  color?: string;
  label?: string;
  animated?: boolean;
}

interface NetworkTopologyProps {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  title?: string;
  description?: string;
}

const nodeIcons = {
  pc: Monitor,
  laptop: Laptop,
  server: Server,
  switch: Network,
  router: Router,
  cloud: Cloud,
  phone: Smartphone,
  wifi: Wifi,
};

const nodeColors = {
  pc: "from-blue-500 to-blue-600",
  laptop: "from-cyan-500 to-cyan-600",
  server: "from-purple-500 to-purple-600",
  switch: "from-emerald-500 to-emerald-600",
  router: "from-orange-500 to-orange-600",
  cloud: "from-sky-400 to-sky-500",
  phone: "from-pink-500 to-pink-600",
  wifi: "from-violet-500 to-violet-600",
};

export function NetworkTopologyDiagram({
  nodes,
  connections,
  title,
  description,
}: NetworkTopologyProps) {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodePosition = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      {/* Header */}
      {(title || description) && (
        <div className="px-6 py-4 border-b border-slate-700/50">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-slate-400 mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Diagram Area */}
      <div className="relative h-[400px] p-4">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* SVG for Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="rgba(99, 102, 241, 0.6)"
              />
            </marker>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.8)" />
            </linearGradient>
          </defs>

          {connections.map((conn, index) => {
            const from = getNodePosition(conn.from);
            const to = getNodePosition(conn.to);
            const isHighlighted =
              hoveredNode === conn.from || hoveredNode === conn.to;

            return (
              <g key={index}>
                <motion.line
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={
                    isHighlighted
                      ? "url(#lineGradient)"
                      : conn.color || "rgba(148, 163, 184, 0.4)"
                  }
                  strokeWidth={isHighlighted ? 3 : 2}
                  strokeDasharray={conn.animated ? "8 4" : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {conn.animated && (
                    <animate
                      attributeName="stroke-dashoffset"
                      values="12;0"
                      dur="0.5s"
                      repeatCount="indefinite"
                    />
                  )}
                </motion.line>
                {conn.label && (
                  <text
                    x={`${(from.x + to.x) / 2}%`}
                    y={`${(from.y + to.y) / 2 - 2}%`}
                    fill="rgba(148, 163, 184, 0.8)"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const Icon = nodeIcons[node.type];
          const colorClass = nodeColors[node.type];
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode?.id === node.id;

          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(isSelected ? null : node)}
            >
              <motion.div
                animate={{
                  scale: isHovered || isSelected ? 1.15 : 1,
                  boxShadow:
                    isHovered || isSelected
                      ? "0 0 30px rgba(99, 102, 241, 0.5)"
                      : "0 4px 20px rgba(0,0,0,0.3)",
                }}
                className={`relative p-3 rounded-xl bg-gradient-to-br ${colorClass} border border-white/20`}
              >
                <Icon className="w-6 h-6 text-white" />

                {/* Pulse animation for routers/switches */}
                {(node.type === "router" || node.type === "switch") && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2 py-1 rounded">
                  {node.label}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Selected Node Info Panel */}
        <AnimatePresence>
          {selectedNode && selectedNode.info && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 top-4 w-64 p-4 rounded-xl bg-slate-800/95 border border-slate-600/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                {(() => {
                  const Icon = nodeIcons[selectedNode.type];
                  return <Icon className="w-5 h-5 text-indigo-400" />;
                })()}
                <h4 className="font-semibold text-white">
                  {selectedNode.label}
                </h4>
              </div>
              <p className="text-sm text-slate-300">{selectedNode.info}</p>
              <button
                onClick={() => setSelectedNode(null)}
                className="mt-3 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Schließen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 border-t border-slate-700/50 flex flex-wrap gap-4">
        {Object.entries(nodeIcons).map(([type, Icon]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg bg-gradient-to-br ${nodeColors[type as keyof typeof nodeColors]}`}
            >
              <Icon className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-slate-400 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// IP ADDRESS VISUALIZER
// ============================================================================

interface IPRange {
  range: string;
  class: string;
  type: "private" | "public" | "special";
  description: string;
  example: string;
}

const ipRanges: IPRange[] = [
  {
    range: "10.0.0.0/8",
    class: "A",
    type: "private",
    description: "Große Unternehmensnetzwerke",
    example: "10.0.5.100",
  },
  {
    range: "172.16.0.0/12",
    class: "B",
    type: "private",
    description: "Mittlere Netzwerke",
    example: "172.20.15.3",
  },
  {
    range: "192.168.0.0/16",
    class: "C",
    type: "private",
    description: "Heimnetzwerke, kleine Büros",
    example: "192.168.178.23",
  },
  {
    range: "0.0.0.0 - 255.255.255.255",
    class: "Öffentlich",
    type: "public",
    description: "Internet-routbare Adressen",
    example: "52.120.21.33",
  },
  {
    range: "127.0.0.0/8",
    class: "Loopback",
    type: "special",
    description: "Localhost (eigenes Gerät)",
    example: "127.0.0.1",
  },
];

export function IPAddressVisualizer() {
  const [selectedRange, setSelectedRange] = useState<IPRange | null>(null);

  const typeColors = {
    private: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/50",
    public: "from-blue-500/20 to-blue-600/20 border-blue-500/50",
    special: "from-amber-500/20 to-amber-600/20 border-amber-500/50",
  };

  const typeBadgeColors = {
    private: "bg-emerald-500/20 text-emerald-400",
    public: "bg-blue-500/20 text-blue-400",
    special: "bg-amber-500/20 text-amber-400",
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">
          IPv4 Adressbereiche
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Klicke auf einen Bereich für Details
        </p>
      </div>

      <div className="p-6 grid gap-3">
        {ipRanges.map((range, index) => (
          <motion.div
            key={range.range}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() =>
              setSelectedRange(
                selectedRange?.range === range.range ? null : range,
              )
            }
            className={`relative p-4 rounded-xl bg-gradient-to-r ${typeColors[range.type]} border cursor-pointer transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <code className="text-lg font-mono font-semibold text-white">
                    {range.range}
                  </code>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeBadgeColors[range.type]}`}
                  >
                    {range.type === "private"
                      ? "Privat"
                      : range.type === "public"
                        ? "Öffentlich"
                        : "Spezial"}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  {range.description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Klasse</span>
                <p className="text-lg font-semibold text-slate-300">
                  {range.class}
                </p>
              </div>
            </div>

            <AnimatePresence>
              {selectedRange?.range === range.range && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-slate-700/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Beispiel:</span>
                    <code className="px-3 py-1 rounded-lg bg-slate-800 text-emerald-400 font-mono">
                      {range.example}
                    </code>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// NAT/PAT FLOW DIAGRAM
// ============================================================================

interface NATFlowStep {
  id: number;
  internal: string;
  external: string;
  port: string;
  description: string;
}

export function NATFlowDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps: NATFlowStep[] = [
    {
      id: 1,
      internal: "192.168.1.10",
      external: "178.192.44.10",
      port: "52341",
      description: "Client 1 öffnet Verbindung zu google.com:443",
    },
    {
      id: 2,
      internal: "192.168.1.11",
      external: "178.192.44.10",
      port: "52342",
      description: "Client 2 öffnet gleichzeitig Verbindung zu google.com:443",
    },
    {
      id: 3,
      internal: "192.168.1.12",
      external: "178.192.44.10",
      port: "52343",
      description: "Client 3 streamt Video von netflix.com:443",
    },
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            NAT/PAT Übersetzung
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Mehrere Clients teilen eine öffentliche IP
          </p>
        </div>
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 text-white text-sm font-medium transition-colors"
        >
          {isAnimating ? "Läuft..." : "Animation starten"}
        </button>
      </div>

      <div className="p-6">
        {/* Visual Flow */}
        <div className="flex items-center justify-between mb-8">
          {/* LAN Side */}
          <div className="flex flex-col gap-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                animate={{
                  opacity: activeStep >= index ? 1 : 0.3,
                  scale: activeStep === index ? 1.05 : 1,
                }}
                className="flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/50">
                  <Laptop className="w-5 h-5 text-blue-400" />
                </div>
                <code className="text-sm font-mono text-blue-300">
                  {step.internal}:{step.port}
                </code>
              </motion.div>
            ))}
          </div>

          {/* Arrow Flow */}
          <div className="flex-1 mx-8 relative">
            <div className="h-px bg-gradient-to-r from-blue-500/50 via-emerald-500/50 to-orange-500/50" />
            <motion.div
              animate={{ x: isAnimating ? ["0%", "100%"] : "0%" }}
              transition={{ duration: 1.5, repeat: isAnimating ? Infinity : 0 }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
            />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-xs text-slate-400">NAT Translation</span>
            </div>
          </div>

          {/* Router */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 border border-white/20">
              <Router className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs text-slate-400">Router</span>
          </div>

          {/* Arrow to Internet */}
          <div className="w-16 h-px bg-gradient-to-r from-orange-500/50 to-sky-500/50 mx-4" />

          {/* Internet */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 border border-white/20">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <code className="text-xs font-mono text-sky-300">
              178.192.44.10
            </code>
            <span className="text-xs text-slate-400">Internet</span>
          </div>
        </div>

        {/* Translation Table */}
        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700/50">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              NAT Translation Table
            </span>
          </div>
          <div className="divide-y divide-slate-700/50">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                animate={{
                  backgroundColor:
                    activeStep === index
                      ? "rgba(99, 102, 241, 0.1)"
                      : "transparent",
                }}
                className="px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <code className="text-sm font-mono text-blue-400">
                    {step.internal}:{step.port}
                  </code>
                  <span className="text-slate-500">→</span>
                  <code className="text-sm font-mono text-orange-400">
                    {step.external}:{step.port}
                  </code>
                </div>
                <span className="text-sm text-slate-400">
                  {step.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SUBNET CALCULATOR
// ============================================================================

export function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState(24);

  const calculateSubnet = () => {
    const hosts = Math.pow(2, 32 - cidr) - 2;
    const maskOctets = [];
    let remaining = cidr;
    for (let i = 0; i < 4; i++) {
      if (remaining >= 8) {
        maskOctets.push(255);
        remaining -= 8;
      } else if (remaining > 0) {
        maskOctets.push(256 - Math.pow(2, 8 - remaining));
        remaining = 0;
      } else {
        maskOctets.push(0);
      }
    }
    return {
      hosts: hosts > 0 ? hosts : 0,
      mask: maskOctets.join("."),
      networks: Math.pow(2, cidr - (cidr > 24 ? 24 : cidr > 16 ? 16 : 8)),
    };
  };

  const subnet = calculateSubnet();

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Subnet Rechner</h3>
        <p className="text-sm text-slate-400 mt-1">
          Berechne Netzwerkgröße und Subnetzmaske
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm text-slate-400 mb-2">
              Netzwerk-Adresse
            </label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="192.168.1.0"
            />
          </div>
          <div className="w-24">
            <label className="block text-sm text-slate-400 mb-2">CIDR</label>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">/</span>
              <input
                type="number"
                min={8}
                max={30}
                value={cidr}
                onChange={(e) => setCidr(parseInt(e.target.value) || 24)}
                className="w-full px-3 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-center focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* CIDR Slider */}
        <div>
          <input
            type="range"
            min={8}
            max={30}
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value))}
            className="w-full h-2 rounded-full bg-slate-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>/8 (16M Hosts)</span>
            <span>/24 (254 Hosts)</span>
            <span>/30 (2 Hosts)</span>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-xs text-emerald-400 uppercase tracking-wider">
              Hosts
            </span>
            <p className="text-2xl font-bold text-white mt-1">
              {subnet.hosts.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <span className="text-xs text-blue-400 uppercase tracking-wider">
              Subnetzmaske
            </span>
            <p className="text-lg font-mono font-bold text-white mt-1">
              {subnet.mask}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <span className="text-xs text-purple-400 uppercase tracking-wider">
              CIDR
            </span>
            <p className="text-2xl font-bold text-white mt-1">/{cidr}</p>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <span className="text-xs text-slate-400 uppercase tracking-wider">
            Netzwerk-Notation
          </span>
          <p className="text-xl font-mono text-white mt-2">
            <span className="text-blue-400">{ip}</span>
            <span className="text-slate-500">/</span>
            <span className="text-emerald-400">{cidr}</span>
          </p>
          <p className="text-sm text-slate-400 mt-2">
            = {ip} mit Maske {subnet.mask}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DNS FLOW VISUALIZATION
// ============================================================================

export function DNSFlowDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const dnsSteps = [
    {
      id: 1,
      title: "1. Browser-Anfrage",
      description: "Du gibst 'google.com' ein",
      from: "client",
      to: "resolver",
    },
    {
      id: 2,
      title: "2. Resolver prüft Cache",
      description: "Lokaler DNS-Cache wird geprüft",
      from: "resolver",
      to: "cache",
    },
    {
      id: 3,
      title: "3. Root-Server Anfrage",
      description: "Resolver fragt Root-Server nach .com",
      from: "resolver",
      to: "root",
    },
    {
      id: 4,
      title: "4. TLD-Server Anfrage",
      description: ".com Server gibt google.com NS zurück",
      from: "resolver",
      to: "tld",
    },
    {
      id: 5,
      title: "5. Authoritative Antwort",
      description: "Google DNS gibt IP 142.250.185.46 zurück",
      from: "resolver",
      to: "auth",
    },
    {
      id: 6,
      title: "6. Antwort an Client",
      description: "Browser erhält IP und verbindet sich",
      from: "resolver",
      to: "client",
    },
  ];

  const playAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= dnsSteps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentStep(step);
      }
    }, 1200);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">DNS Auflösung</h3>
          <p className="text-sm text-slate-400 mt-1">
            Wie wird google.com zu einer IP-Adresse?
          </p>
        </div>
        <button
          onClick={playAnimation}
          disabled={isPlaying}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 text-white text-sm font-medium transition-colors"
        >
          {isPlaying ? "Läuft..." : "Abspielen"}
        </button>
      </div>

      <div className="p-6">
        {/* DNS Hierarchy */}
        <div className="flex items-start justify-between mb-8">
          {/* Client */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: currentStep === 0 || currentStep === 5 ? 1.1 : 1,
                boxShadow:
                  currentStep === 0 || currentStep === 5
                    ? "0 0 20px rgba(59, 130, 246, 0.5)"
                    : "none",
              }}
              className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 border border-white/20"
            >
              <Laptop className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xs text-slate-400 mt-2">Client</span>
          </div>

          {/* Recursive Resolver */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 2, 3, 4, 5].includes(currentStep) ? 1.1 : 1,
              }}
              className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 border border-white/20"
            >
              <Server className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xs text-slate-400 mt-2">DNS Resolver</span>
          </div>

          {/* Root Server */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: currentStep === 2 ? 1.1 : 1,
              }}
              className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 border border-white/20"
            >
              <HardDrive className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xs text-slate-400 mt-2">Root (.)</span>
          </div>

          {/* TLD Server */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: currentStep === 3 ? 1.1 : 1,
              }}
              className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 border border-white/20"
            >
              <HardDrive className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xs text-slate-400 mt-2">TLD (.com)</span>
          </div>

          {/* Authoritative */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: currentStep === 4 ? 1.1 : 1,
              }}
              className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 border border-white/20"
            >
              <HardDrive className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xs text-slate-400 mt-2">google.com NS</span>
          </div>
        </div>

        {/* Current Step Info */}
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-semibold">
                {currentStep + 1}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-white">
                {dnsSteps[currentStep].title}
              </h4>
              <p className="text-sm text-indigo-300">
                {dnsSteps[currentStep].description}
              </p>
            </div>
          </div>
        </div>

        {/* Step Progress */}
        <div className="mt-4 flex gap-2">
          {dnsSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`flex-1 h-2 rounded-full transition-all ${
                index <= currentStep ? "bg-indigo-500" : "bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VLAN DIAGRAM
// ============================================================================

export function VLANDiagram() {
  const [selectedVlan, setSelectedVlan] = useState<number | null>(null);

  const vlans = [
    {
      id: 10,
      name: "Management",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500",
      devices: ["Admin-PC", "Server-Mgmt"],
      subnet: "10.10.10.0/24",
    },
    {
      id: 20,
      name: "Produktion",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-500",
      devices: ["PC-001", "PC-002", "PC-003"],
      subnet: "10.10.20.0/24",
    },
    {
      id: 30,
      name: "Gast",
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-500",
      devices: ["Gast-WiFi", "Besucher-PC"],
      subnet: "10.10.30.0/24",
    },
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">VLAN Segmentierung</h3>
        <p className="text-sm text-slate-400 mt-1">
          Logische Netzwerktrennung auf einem physischen Switch
        </p>
      </div>

      <div className="p-6">
        {/* Switch in Center */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600">
            <div className="flex items-center gap-2 mb-3">
              <Network className="w-6 h-6 text-emerald-400" />
              <span className="font-semibold text-white">Managed Switch</span>
            </div>
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => {
                const vlan = vlans.find((v) =>
                  i < 2 ? v.id === 10 : i < 5 ? v.id === 20 : v.id === 30,
                );
                return (
                  <motion.div
                    key={i}
                    animate={{
                      scale: selectedVlan === vlan?.id ? 1.2 : 1,
                    }}
                    className={`w-4 h-6 rounded-sm bg-gradient-to-b ${vlan?.color || "from-slate-600 to-slate-700"}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* VLANs */}
        <div className="grid grid-cols-3 gap-4">
          {vlans.map((vlan) => (
            <motion.div
              key={vlan.id}
              onClick={() =>
                setSelectedVlan(selectedVlan === vlan.id ? null : vlan.id)
              }
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl bg-gradient-to-br ${vlan.color}/10 border ${
                selectedVlan === vlan.id
                  ? `${vlan.borderColor} border-2`
                  : "border-slate-700/50"
              } cursor-pointer transition-all`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-br ${vlan.color}`}
                />
                <span className="font-semibold text-white">VLAN {vlan.id}</span>
                <span className="text-xs text-slate-400">- {vlan.name}</span>
              </div>

              <code className="text-xs font-mono text-slate-400 block mb-3">
                {vlan.subnet}
              </code>

              <div className="space-y-1">
                {vlan.devices.map((device) => (
                  <div
                    key={device}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <Monitor className="w-3 h-3" />
                    {device}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Network className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Trunk-Port</h4>
              <p className="text-sm text-slate-400 mt-1">
                Der Uplink zum Router ist als Trunk konfiguriert und
                transportiert alle VLANs getaggt (802.1Q). Der Router routet
                zwischen den VLANs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
