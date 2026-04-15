"use client";

// ============================================================================
// Enterprise IT Training Platform - Organization Settings
// ============================================================================
// Settings and configuration for organization admins
// ============================================================================

import { PricingCard } from "@/components/features/FeatureGate";
import { PRICING } from "@/lib/features/gates";
import type { Organization } from "@/types";
import {
  AlertCircle,
  Bell,
  Building2,
  Check,
  CreditCard,
  ExternalLink,
  Key,
  Palette,
  Save,
  Shield,
  Upload,
} from "lucide-react";
import { useState } from "react";

// ============================================================================
// Settings Page Layout
// ============================================================================

interface SettingsPageProps {
  organization: Organization;
  onUpdate: (updates: Partial<Organization>) => void;
}

export function SettingsPage({ organization, onUpdate }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Organization Settings</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <nav className="lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <GeneralSettings organization={organization} onUpdate={onUpdate} />
          )}
          {activeTab === "branding" && (
            <BrandingSettings organization={organization} onUpdate={onUpdate} />
          )}
          {activeTab === "security" && (
            <SecuritySettings organization={organization} onUpdate={onUpdate} />
          )}
          {activeTab === "notifications" && (
            <NotificationSettings
              organization={organization}
              onUpdate={onUpdate}
            />
          )}
          {activeTab === "billing" && (
            <BillingSettings organization={organization} />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// General Settings
// ============================================================================

interface GeneralSettingsProps {
  organization: Organization;
  onUpdate: (updates: Partial<Organization>) => void;
}

function GeneralSettings({ organization, onUpdate }: GeneralSettingsProps) {
  const [name, setName] = useState(organization.name);
  const [domain, setDomain] = useState(organization.settings?.domain || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({
      name,
      settings: {
        ...organization.settings,
        domain,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          General Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Organization Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Organization Domain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <p className="text-sm text-slate-400 mt-1">
              Users with this domain will be auto-joined to your organization
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Organization ID
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 font-mono text-sm">
                {organization.id}
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Branding Settings
// ============================================================================

interface BrandingSettingsProps {
  organization: Organization;
  onUpdate: (updates: Partial<Organization>) => void;
}

function BrandingSettings({ organization, onUpdate }: BrandingSettingsProps) {
  const [primaryColor, setPrimaryColor] = useState(
    organization.branding?.primaryColor || "#8B5CF6",
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({
      branding: {
        ...organization.branding,
        primaryColor,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Branding</h3>
        <div className="space-y-6">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Organization Logo
            </label>
            <div className="flex items-center gap-4">
              {organization.branding?.logo ? (
                <img
                  src={organization.branding.logo}
                  alt="Logo"
                  className="w-16 h-16 rounded-lg object-contain bg-slate-900"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-slate-600" />
                </div>
              )}
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors">
                <Upload className="w-4 h-4" />
                Upload Logo
              </button>
            </div>
          </div>

          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-12 rounded-lg border-0 cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-32 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Preview
            </label>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
              <button
                style={{ backgroundColor: primaryColor }}
                className="px-4 py-2 rounded-lg text-white font-medium"
              >
                Sample Button
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Security Settings
// ============================================================================

interface SecuritySettingsProps {
  organization: Organization;
  onUpdate: (updates: Partial<Organization>) => void;
}

function SecuritySettings({ organization, onUpdate }: SecuritySettingsProps) {
  const [ssoEnabled, setSsoEnabled] = useState(
    organization.settings?.ssoEnabled || false,
  );
  const [mfaRequired, setMfaRequired] = useState(
    organization.settings?.mfaRequired || false,
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({
      settings: {
        ...organization.settings,
        ssoEnabled,
        mfaRequired,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const isEnterprise = organization.subscriptionTier === "enterprise";

  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Security Settings
        </h3>
        <div className="space-y-4">
          {/* SSO */}
          <div
            className={`p-4 rounded-lg border ${
              isEnterprise
                ? "bg-slate-900/50 border-slate-700"
                : "bg-slate-900/30 border-slate-700/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Key className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">
                    Single Sign-On (SSO)
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Allow users to sign in with your identity provider (Entra
                    ID, Okta, etc.)
                  </p>
                  {!isEnterprise && (
                    <span className="inline-flex items-center gap-1 mt-2 text-xs text-amber-400">
                      <AlertCircle className="w-3 h-3" />
                      Enterprise plan required
                    </span>
                  )}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={ssoEnabled}
                  onChange={(e) => setSsoEnabled(e.target.checked)}
                  disabled={!isEnterprise}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 rounded-full peer ${
                    isEnterprise
                      ? "bg-slate-700 peer-checked:bg-purple-600"
                      : "bg-slate-800"
                  } peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                />
              </label>
            </div>
          </div>

          {/* MFA */}
          <div className="p-4 rounded-lg border bg-slate-900/50 border-slate-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">
                    Require Multi-Factor Authentication
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">
                    All organization members must enable MFA
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mfaRequired}
                  onChange={(e) => setMfaRequired(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-emerald-600 peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Notification Settings
// ============================================================================

interface NotificationSettingsProps {
  organization: Organization;
  onUpdate: (updates: Partial<Organization>) => void;
}

function NotificationSettings({
  organization,
  onUpdate,
}: NotificationSettingsProps) {
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [newMemberAlerts, setNewMemberAlerts] = useState(true);
  const [completionMilestones, setCompletionMilestones] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div>
              <h4 className="font-medium text-white">
                Weekly Progress Reports
              </h4>
              <p className="text-sm text-slate-400">
                Receive weekly summaries of team progress
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={weeklyReports}
                onChange={(e) => setWeeklyReports(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-purple-600 peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div>
              <h4 className="font-medium text-white">New Member Alerts</h4>
              <p className="text-sm text-slate-400">
                Get notified when new members join
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={newMemberAlerts}
                onChange={(e) => setNewMemberAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-purple-600 peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div>
              <h4 className="font-medium text-white">Completion Milestones</h4>
              <p className="text-sm text-slate-400">
                Alerts when team members complete training paths
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={completionMilestones}
                onChange={(e) => setCompletionMilestones(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-purple-600 peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Billing Settings
// ============================================================================

interface BillingSettingsProps {
  organization: Organization;
}

function BillingSettings({ organization }: BillingSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30">
          <div>
            <h4 className="text-xl font-bold text-white capitalize">
              {organization.subscriptionTier} Plan
            </h4>
            <p className="text-slate-400">
              {organization.subscriptionTier === "enterprise"
                ? "Custom enterprise agreement"
                : organization.subscriptionTier === "premium"
                  ? "$49/month per user"
                  : "Free tier"}
            </p>
          </div>
          <a
            href="/billing/manage"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Manage Billing
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Upgrade Options */}
      {organization.subscriptionTier !== "enterprise" && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Upgrade Your Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((plan) => (
              <PricingCard
                key={plan.tier}
                plan={plan}
                currentTier={organization.subscriptionTier}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
