"use client";

/**
 * M365 Diagram Components
 * Interactive diagrams for Microsoft 365 / Intune / Entra ID concepts
 *
 * Includes:
 * - Conditional Access Flow
 * - Certificate Chain Visualization
 * - Intune Enrollment Flow
 * - Azure AD Connect Sync Topology
 * - Device Compliance Flow
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  ChevronRight,
  Cloud,
  Key,
  Laptop,
  Lock,
  RefreshCw,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// ============================================================================
// CONDITIONAL ACCESS FLOW DIAGRAM
// ============================================================================

interface CACondition {
  type: "user" | "device" | "location" | "app" | "risk";
  label: string;
  value: string;
  met: boolean;
}

interface CAPolicy {
  name: string;
  conditions: CACondition[];
  grantControls: string[];
  sessionControls?: string[];
  result: "allow" | "block" | "mfa";
}

interface ConditionalAccessFlowProps {
  scenario: string;
  user: { name: string; groups: string[] };
  device: {
    name: string;
    compliant: boolean;
    managed: boolean;
    platform: string;
  };
  location: { name: string; trusted: boolean };
  app: string;
  policies: CAPolicy[];
  finalResult: "allow" | "block" | "mfa";
}

export function ConditionalAccessFlowDiagram({
  scenario,
  user,
  device,
  location,
  app,
  policies,
  finalResult,
}: ConditionalAccessFlowProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const steps = [
    { id: "user", label: "Benutzer", icon: User, color: "blue" },
    { id: "device", label: "Gerät", icon: Laptop, color: "purple" },
    { id: "location", label: "Standort", icon: Cloud, color: "cyan" },
    { id: "policy", label: "CA-Policy", icon: Shield, color: "orange" },
    {
      id: "result",
      label: "Ergebnis",
      icon:
        finalResult === "allow"
          ? CheckCircle
          : finalResult === "mfa"
            ? Key
            : XCircle,
      color:
        finalResult === "allow"
          ? "green"
          : finalResult === "mfa"
            ? "yellow"
            : "red",
    },
  ];

  const resultColors = {
    allow: "from-green-500 to-emerald-600",
    block: "from-red-500 to-red-600",
    mfa: "from-yellow-500 to-amber-600",
  };

  const resultLabels = {
    allow: "✅ Zugriff gewährt",
    block: "❌ Zugriff verweigert",
    mfa: "🔐 MFA erforderlich",
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/20">
            <Shield className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">
              Conditional Access Flow
            </h3>
            <p className="text-sm text-slate-400">{scenario}</p>
          </div>
        </div>
      </div>

      {/* Flow Steps */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            return (
              <div key={step.id} className="flex items-center">
                <motion.button
                  onClick={() => setActiveStep(index)}
                  className={`
                    relative p-3 rounded-xl transition-all cursor-pointer
                    ${
                      isActive
                        ? `bg-${step.color}-500/20 border-${step.color}-500/50 border`
                        : "bg-slate-800 border border-slate-700"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className={`w-6 h-6 ${isActive ? `text-${step.color}-400` : "text-slate-500"}`}
                  />
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span
                      className={`text-xs ${isActive ? "text-white" : "text-slate-500"}`}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                </motion.button>
                {index < steps.length - 1 && (
                  <ChevronRight
                    className={`w-5 h-5 mx-2 ${index < activeStep ? "text-blue-400" : "text-slate-600"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <motion.div
          className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeStep}
        >
          {activeStep === 0 && (
            <div className="space-y-2">
              <h4 className="text-blue-400 font-medium flex items-center gap-2">
                <User className="w-4 h-4" /> Benutzer: {user.name}
              </h4>
              <p className="text-sm text-slate-300">
                Gruppen: {user.groups.join(", ")}
              </p>
            </div>
          )}
          {activeStep === 1 && (
            <div className="space-y-2">
              <h4 className="text-purple-400 font-medium flex items-center gap-2">
                <Laptop className="w-4 h-4" /> Gerät: {device.name}
              </h4>
              <div className="flex gap-4 text-sm">
                <span
                  className={
                    device.compliant ? "text-green-400" : "text-red-400"
                  }
                >
                  {device.compliant ? "✓ Konform" : "✗ Nicht konform"}
                </span>
                <span
                  className={
                    device.managed ? "text-green-400" : "text-yellow-400"
                  }
                >
                  {device.managed ? "✓ Verwaltet" : "⚠ Unverwaltet"}
                </span>
                <span className="text-slate-400">
                  Platform: {device.platform}
                </span>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="space-y-2">
              <h4 className="text-cyan-400 font-medium flex items-center gap-2">
                <Cloud className="w-4 h-4" /> Standort: {location.name}
              </h4>
              <span
                className={`text-sm ${location.trusted ? "text-green-400" : "text-yellow-400"}`}
              >
                {location.trusted
                  ? "✓ Vertrauenswürdiger Standort"
                  : "⚠ Externer Standort"}
              </span>
            </div>
          )}
          {activeStep === 3 && (
            <div className="space-y-3">
              <h4 className="text-orange-400 font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" /> Angewendete Policies
              </h4>
              {policies.map((policy, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">
                      {policy.name}
                    </span>
                    <span
                      className={`
                      px-2 py-0.5 rounded text-xs
                      ${
                        policy.result === "allow"
                          ? "bg-green-500/20 text-green-400"
                          : policy.result === "mfa"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }
                    `}
                    >
                      {policy.result === "allow"
                        ? "Erlauben"
                        : policy.result === "mfa"
                          ? "MFA"
                          : "Blockieren"}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    Bedingungen:{" "}
                    {policy.conditions.map((c) => c.label).join(", ")}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    Grant Controls: {policy.grantControls.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeStep === 4 && (
            <div className="text-center py-4">
              <motion.div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r ${resultColors[finalResult]}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {finalResult === "allow" && (
                  <CheckCircle className="w-6 h-6 text-white" />
                )}
                {finalResult === "mfa" && (
                  <Key className="w-6 h-6 text-white" />
                )}
                {finalResult === "block" && (
                  <XCircle className="w-6 h-6 text-white" />
                )}
                <span className="text-white font-semibold text-lg">
                  {resultLabels[finalResult]}
                </span>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// CERTIFICATE CHAIN DIAGRAM
// ============================================================================

interface CertificateNode {
  name: string;
  type: "root" | "intermediate" | "leaf";
  issuer?: string;
  validity: string;
  status: "valid" | "expired" | "revoked";
}

interface CertificateChainProps {
  title?: string;
  certificates: CertificateNode[];
  description?: string;
}

export function CertificateChainDiagram({
  title,
  certificates,
  description,
}: CertificateChainProps) {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  const typeColors = {
    root: "from-amber-500 to-orange-600",
    intermediate: "from-blue-500 to-indigo-600",
    leaf: "from-green-500 to-emerald-600",
  };

  const typeLabels = {
    root: "Root CA",
    intermediate: "Intermediate CA",
    leaf: "End-Entity",
  };

  const statusIcons = {
    valid: <CheckCircle className="w-4 h-4 text-green-400" />,
    expired: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
    revoked: <XCircle className="w-4 h-4 text-red-400" />,
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {title || "Zertifikatkette"}
            </h3>
            {description && (
              <p className="text-sm text-slate-400">{description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        {certificates.map((cert, index) => (
          <div key={cert.name} className="flex flex-col items-center">
            <motion.div
              className={`
                relative p-4 rounded-xl bg-gradient-to-r ${typeColors[cert.type]}
                cursor-pointer min-w-[280px]
              `}
              onMouseEnter={() => setHoveredCert(cert.name)}
              onMouseLeave={() => setHoveredCert(null)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/70 uppercase">
                    {typeLabels[cert.type]}
                  </span>
                  <h4 className="text-white font-semibold">{cert.name}</h4>
                </div>
                {statusIcons[cert.status]}
              </div>
              {hoveredCert === cert.name && (
                <motion.div
                  className="mt-2 pt-2 border-t border-white/20 text-sm text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>Gültigkeit: {cert.validity}</p>
                  {cert.issuer && <p>Aussteller: {cert.issuer}</p>}
                </motion.div>
              )}
            </motion.div>

            {/* Chain arrow */}
            {index < certificates.length - 1 && (
              <motion.div
                className="h-8 w-0.5 bg-gradient-to-b from-slate-500 to-slate-600 my-1"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: index * 0.15 + 0.1 }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-600" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// INTUNE ENROLLMENT FLOW
// ============================================================================

interface EnrollmentStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "active" | "completed" | "error";
}

interface IntuneEnrollmentFlowProps {
  deviceType: "windows" | "ios" | "android" | "macos";
  enrollmentMethod:
    | "autopilot"
    | "user"
    | "device"
    | "apple-dep"
    | "android-enterprise";
  steps: EnrollmentStep[];
  currentStep: number;
}

export function IntuneEnrollmentFlowDiagram({
  deviceType,
  enrollmentMethod,
  steps,
  currentStep,
}: IntuneEnrollmentFlowProps) {
  const deviceIcons = {
    windows: Laptop,
    ios: Smartphone,
    android: Smartphone,
    macos: Laptop,
  };

  const DeviceIcon = deviceIcons[deviceType];

  const methodLabels = {
    autopilot: "Windows Autopilot",
    user: "Benutzerregistrierung",
    device: "Geräteregistrierung",
    "apple-dep": "Apple DEP/ADE",
    "android-enterprise": "Android Enterprise",
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20">
            <DeviceIcon className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Intune Enrollment Flow</h3>
            <p className="text-sm text-slate-400">
              {methodLabels[enrollmentMethod]}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={step.id}
                className={`
                  relative flex items-start gap-4 p-4 rounded-xl
                  ${
                    isActive
                      ? "bg-blue-500/10 border border-blue-500/30"
                      : isCompleted
                        ? "bg-green-500/5 border border-green-500/20"
                        : "bg-slate-800/50 border border-slate-700/30"
                  }
                `}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step indicator */}
                <div
                  className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  ${isCompleted ? "bg-green-500" : isActive ? "bg-blue-500" : "bg-slate-700"}
                `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : step.status === "error" ? (
                    <X className="w-4 h-4 text-red-400" />
                  ) : (
                    <span className="text-sm text-white font-medium">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1">
                  <h4
                    className={`font-medium ${isActive ? "text-blue-300" : isCompleted ? "text-green-300" : "text-slate-300"}`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">
                    {step.description}
                  </p>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <RefreshCw className="w-5 h-5 text-blue-400" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DEVICE COMPLIANCE FLOW
// ============================================================================

interface ComplianceCheck {
  name: string;
  category: "security" | "system" | "policy";
  status: "pass" | "fail" | "warning" | "pending";
  details: string;
}

interface DeviceComplianceFlowProps {
  deviceName: string;
  devicePlatform: string;
  checks: ComplianceCheck[];
  overallStatus: "compliant" | "non-compliant" | "grace-period";
  gracePeriodDays?: number;
}

export function DeviceComplianceFlowDiagram({
  deviceName,
  devicePlatform,
  checks,
  overallStatus,
  gracePeriodDays,
}: DeviceComplianceFlowProps) {
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);

  const statusColors = {
    pass: "text-green-400 bg-green-500/20",
    fail: "text-red-400 bg-red-500/20",
    warning: "text-yellow-400 bg-yellow-500/20",
    pending: "text-slate-400 bg-slate-500/20",
  };

  const statusIcons = {
    pass: <CheckCircle className="w-4 h-4" />,
    fail: <XCircle className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    pending: <RefreshCw className="w-4 h-4" />,
  };

  const overallStatusConfig = {
    compliant: { color: "green", icon: ShieldCheck, label: "Konform" },
    "non-compliant": {
      color: "red",
      icon: ShieldAlert,
      label: "Nicht konform",
    },
    "grace-period": {
      color: "yellow",
      icon: AlertTriangle,
      label: `Toleranzzeit (${gracePeriodDays} Tage)`,
    },
  };

  const config = overallStatusConfig[overallStatus];
  const OverallIcon = config.icon;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-${config.color}-500/20`}>
              <OverallIcon className={`w-5 h-5 text-${config.color}-400`} />
            </div>
            <div>
              <h3 className="font-semibold text-white">{deviceName}</h3>
              <p className="text-sm text-slate-400">{devicePlatform}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium bg-${config.color}-500/20 text-${config.color}-400`}
          >
            {config.label}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {checks.map((check) => (
          <motion.div
            key={check.name}
            className={`
              p-3 rounded-xl border cursor-pointer transition-all
              ${expandedCheck === check.name ? "border-blue-500/50 bg-blue-500/5" : "border-slate-700/50 bg-slate-800/30"}
            `}
            onClick={() =>
              setExpandedCheck(expandedCheck === check.name ? null : check.name)
            }
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-lg ${statusColors[check.status]}`}
                >
                  {statusIcons[check.status]}
                </div>
                <span className="text-white font-medium">{check.name}</span>
              </div>
              <span className="text-xs text-slate-500 uppercase">
                {check.category}
              </span>
            </div>

            <AnimatePresence>
              {expandedCheck === check.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-slate-700/50"
                >
                  <p className="text-sm text-slate-400">{check.details}</p>
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
// AZURE AD CONNECT SYNC TOPOLOGY
// ============================================================================

interface SyncObject {
  type: "user" | "group" | "device" | "contact";
  count: number;
  synced: number;
  errors: number;
}

interface AzureADConnectTopologyProps {
  onPremDomain: string;
  azureTenant: string;
  syncMode: "password-hash" | "pass-through" | "federation";
  lastSync: string;
  syncStatus: "healthy" | "warning" | "error";
  objects: SyncObject[];
}

export function AzureADConnectTopologyDiagram({
  onPremDomain,
  azureTenant,
  syncMode,
  lastSync,
  syncStatus,
  objects,
}: AzureADConnectTopologyProps) {
  const syncModeLabels = {
    "password-hash": "Password Hash Sync (PHS)",
    "pass-through": "Pass-through Authentication (PTA)",
    federation: "Federation (ADFS)",
  };

  const statusColors = {
    healthy: "green",
    warning: "yellow",
    error: "red",
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20">
            <RefreshCw className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Azure AD Connect Sync</h3>
            <p className="text-sm text-slate-400">{syncModeLabels[syncMode]}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Topology visualization */}
        <div className="flex items-center justify-between mb-8">
          {/* On-Prem */}
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 min-w-[140px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Server className="w-8 h-8 text-white mb-2" />
            <p className="text-white font-semibold">On-Premises</p>
            <p className="text-blue-200 text-sm">{onPremDomain}</p>
          </motion.div>

          {/* Sync Arrow */}
          <motion.div
            className="flex-1 mx-4 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full bg-${statusColors[syncStatus]}-500/20 mb-2`}
            >
              <RefreshCw
                className={`w-4 h-4 text-${statusColors[syncStatus]}-400 ${syncStatus === "healthy" ? "animate-spin" : ""}`}
                style={{ animationDuration: "3s" }}
              />
              <span className={`text-xs text-${statusColors[syncStatus]}-400`}>
                {syncStatus === "healthy"
                  ? "Synchronisiert"
                  : syncStatus === "warning"
                    ? "Warnung"
                    : "Fehler"}
              </span>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-sky-500 rounded-full" />
            <p className="text-xs text-slate-500 mt-2">
              Letzte Sync: {lastSync}
            </p>
          </motion.div>

          {/* Azure */}
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 min-w-[140px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Cloud className="w-8 h-8 text-white mb-2" />
            <p className="text-white font-semibold">Microsoft Entra ID</p>
            <p className="text-sky-200 text-sm">{azureTenant}</p>
          </motion.div>
        </div>

        {/* Sync Objects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {objects.map((obj) => (
            <div
              key={obj.type}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              <div className="flex items-center gap-2 mb-2">
                {obj.type === "user" && (
                  <User className="w-4 h-4 text-blue-400" />
                )}
                {obj.type === "group" && (
                  <Users className="w-4 h-4 text-purple-400" />
                )}
                {obj.type === "device" && (
                  <Laptop className="w-4 h-4 text-green-400" />
                )}
                {obj.type === "contact" && (
                  <User className="w-4 h-4 text-yellow-400" />
                )}
                <span className="text-sm text-white capitalize">
                  {obj.type === "user"
                    ? "Benutzer"
                    : obj.type === "group"
                      ? "Gruppen"
                      : obj.type === "device"
                        ? "Geräte"
                        : "Kontakte"}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{obj.synced}</div>
              <div className="text-xs text-slate-400">von {obj.count}</div>
              {obj.errors > 0 && (
                <div className="text-xs text-red-400 mt-1">
                  {obj.errors} Fehler
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ASCII DIAGRAM HELPERS (for question explanations)
// ============================================================================

/**
 * Text-based diagrams for embedding in question explanations
 * These render as preformatted text blocks
 */

export const ASCII_DIAGRAMS = {
  conditionalAccessFlow: `
┌─────────────────────────────────────────────────────────────────────┐
│                    CONDITIONAL ACCESS FLOW                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐  │
│  │  Benutzer│ --> │  Gerät   │ --> │ Standort │ --> │   App    │  │
│  │ (Groups) │     │(Platform)│     │(Location)│     │ (Target) │  │
│  └────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘  │
│       │                │                │                │         │
│       v                v                v                v         │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │               CONDITIONAL ACCESS POLICY                      │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │  │
│  │  │ IF Conditions   │->│ THEN Controls   │->│  RESULT     │  │  │
│  │  │ - All Users     │  │ - Require MFA   │  │ ✓ Allow     │  │  │
│  │  │ - Cloud Apps    │  │ - Compliant Dev │  │ ✗ Block     │  │  │
│  │  │ - Locations     │  │ - App Enforced  │  │ 🔐 MFA      │  │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────┘  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
`,

  certificateChain: `
┌─────────────────────────────────────────────────────────────────┐
│                    CERTIFICATE CHAIN                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────┐                 │
│  │           ROOT CA (Self-Signed)             │                 │
│  │  Issuer: Root CA  |  Subject: Root CA       │                 │
│  │  Validity: 10-20 Jahre  |  Trust Anchor     │                 │
│  └──────────────────────┬─────────────────────┘                 │
│                         │ signs                                  │
│                         v                                        │
│  ┌────────────────────────────────────────────┐                 │
│  │        INTERMEDIATE CA (Issuing CA)         │                 │
│  │  Issuer: Root CA  |  Subject: Issuing CA    │                 │
│  │  Validity: 5-10 Jahre  |  Issues end certs  │                 │
│  └──────────────────────┬─────────────────────┘                 │
│                         │ signs                                  │
│                         v                                        │
│  ┌────────────────────────────────────────────┐                 │
│  │          END-ENTITY CERTIFICATE             │                 │
│  │  Issuer: Issuing CA  |  Subject: server.com │                 │
│  │  Validity: 1-2 Jahre  |  TLS/Auth/Code Sign │                 │
│  └────────────────────────────────────────────┘                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
`,

  intuneEnrollmentFlow: `
┌─────────────────────────────────────────────────────────────────┐
│                  INTUNE ENROLLMENT FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. DISCOVER              2. AUTHENTICATE         3. ENROLL     │
│  ┌─────────────┐         ┌─────────────┐        ┌────────────┐ │
│  │   Device    │ ------> │   Entra ID  │ -----> │   Intune   │ │
│  │  (Windows/  │  Azure  │   (Azure AD)│  MDM   │   Service  │ │
│  │  iOS/And.)  │  AD DNS │             │  URL   │            │ │
│  └─────────────┘         └─────────────┘        └──────┬─────┘ │
│                                                         │       │
│  4. CONFIGURE             5. POLICIES            6. COMPLIANT  │
│  ┌─────────────┐         ┌─────────────┐        ┌────────────┐ │
│  │   Install   │ <------ │   Apply     │ <----- │   Check    │ │
│  │   MDM Agent │  Mgmt   │   Profiles  │  Push  │ Compliance │ │
│  │   + Certs   │  Cert   │   & Apps    │        │   Status   │ │
│  └─────────────┘         └─────────────┘        └────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
`,

  mfaTrustFlow: `
┌─────────────────────────────────────────────────────────────────┐
│              MFA & TRUSTED LOCATIONS EVALUATION                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Sign-In Request                                            │
│        │                                                         │
│        v                                                         │
│  ┌─────────────────────────────┐                                │
│  │ Check: Is IP in MFA Service │                                │
│  │    Trusted IPs? (legacy)    │                                │
│  └──────────────┬──────────────┘                                │
│           Yes   │   No                                           │
│    ┌────────────┴────────────┐                                  │
│    v                         v                                   │
│  ┌──────────┐      ┌─────────────────────────┐                  │
│  │ Skip MFA │      │ Check: CA Policy with   │                  │
│  │ (bypass) │      │   Named Location?       │                  │
│  └──────────┘      └───────────┬─────────────┘                  │
│                          Yes   │   No                            │
│                   ┌────────────┴────────────┐                   │
│                   v                         v                    │
│            ┌──────────────┐        ┌──────────────┐             │
│            │ Location is  │        │ ALL Policies │             │
│            │ Trusted? CA  │        │   Evaluated  │             │
│            │ Excludes MFA │        │ -> MFA/Block │             │
│            └──────────────┘        └──────────────┘             │
│                                                                  │
│  ⚠️  Remember: MFA "Enforced" users ALWAYS need MFA!            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
`,

  defenderDeviceGroups: `
┌─────────────────────────────────────────────────────────────────┐
│           DEFENDER FOR ENDPOINT - DEVICE GROUPS                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Device onboarded -> Evaluate matching rules (by rank order)    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Rank │ Device Group │ Matching Rule                     │    │
│  ├──────┼──────────────┼───────────────────────────────────┤    │
│  │  1   │ Group1       │ Tag = "demo" AND OS = "Windows 10"│    │
│  │  2   │ Group2       │ Tag = "demo"                      │    │
│  │  3   │ Group3       │ Domain = "contoso.com"            │    │
│  │  4   │ Group4       │ ComputerName starts with "SRV-"   │    │
│  │ Last │ Ungrouped    │ (catch-all)                       │    │
│  └──────┴──────────────┴───────────────────────────────────┘    │
│                                                                  │
│  ⚠️  WICHTIG: Device wird NUR der ERSTEN passenden Gruppe       │
│      zugewiesen (höchster Rank gewinnt)!                        │
│                                                                  │
│  Beispiel: Device mit Tag="demo", OS=Windows 10, Domain=contoso │
│            -> Passt zu Rank 1,2,3 -> Wird nur Group1 zugewiesen │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
`,
};

// Export for use in question explanations
export type {
  CAPolicy,
  CertificateNode,
  ComplianceCheck,
  EnrollmentStep,
  SyncObject,
};
