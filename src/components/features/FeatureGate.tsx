"use client";

// ============================================================================
// Enterprise IT Training Platform - Feature Gate Components
// ============================================================================
// React components for feature gating and upgrade prompts
// ============================================================================

import {
  canAccessScenario,
  getUpgradeSuggestion,
  hasFeatureAccess,
  PRICING,
} from "@/lib/features/gates";
import type { SubscriptionTier } from "@/types";
import { ArrowRight, Lock, Sparkles, X } from "lucide-react";
import { createContext, ReactNode, useContext } from "react";

// ============================================================================
// User Context (simplified - would normally come from auth)
// ============================================================================

interface UserContextType {
  tier: SubscriptionTier;
  scenariosCompletedThisMonth: number;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  tier: "free",
  scenariosCompletedThisMonth: 0,
  isAuthenticated: false,
});

export function UserProvider({
  children,
  tier = "free",
  scenariosCompletedThisMonth = 0,
  isAuthenticated = false,
}: {
  children: ReactNode;
  tier?: SubscriptionTier;
  scenariosCompletedThisMonth?: number;
  isAuthenticated?: boolean;
}) {
  return (
    <UserContext.Provider
      value={{ tier, scenariosCompletedThisMonth, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

// ============================================================================
// Feature Gate Component
// ============================================================================

interface FeatureGateProps {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Renders children only if user has access to the feature.
 * Otherwise renders fallback (default: null).
 */
export function FeatureGate({ feature, children, fallback }: FeatureGateProps) {
  const { tier } = useUser();
  const hasAccess = hasFeatureAccess(tier, feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}

// ============================================================================
// Scenario Gate Component
// ============================================================================

interface ScenarioGateProps {
  scenarioTier: SubscriptionTier;
  children: ReactNode;
  scenarioTitle?: string;
}

/**
 * Renders children if user can access the scenario.
 * Otherwise shows locked overlay with upgrade prompt.
 */
export function ScenarioGate({
  scenarioTier,
  children,
  scenarioTitle,
}: ScenarioGateProps) {
  const { tier } = useUser();
  const hasAccess = canAccessScenario(tier, scenarioTier);

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <LockedScenarioCard scenarioTier={scenarioTier} title={scenarioTitle} />
  );
}

// ============================================================================
// Locked Scenario Card
// ============================================================================

interface LockedScenarioCardProps {
  scenarioTier: SubscriptionTier;
  title?: string;
}

function LockedScenarioCard({ scenarioTier, title }: LockedScenarioCardProps) {
  const tierLabels: Record<SubscriptionTier, string> = {
    free: "Free",
    premium: "Premium",
    enterprise: "Enterprise",
  };

  return (
    <div className="relative p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/60 z-10 flex items-center justify-center">
        <div className="text-center space-y-4 p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {tierLabels[scenarioTier]} Scenario
            </h3>
            <p className="text-slate-400 text-sm">
              Upgrade to {tierLabels[scenarioTier]} to access this scenario
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-400 hover:to-orange-400 transition-all">
            <Sparkles className="w-4 h-4" />
            Upgrade Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Blurred content preview */}
      <div className="space-y-4 opacity-50">
        <div className="h-6 w-3/4 bg-slate-700 rounded" />
        <div className="h-4 w-full bg-slate-700 rounded" />
        <div className="h-4 w-5/6 bg-slate-700 rounded" />
        <div className="flex gap-2 mt-4">
          <div className="h-6 w-20 bg-slate-700 rounded-full" />
          <div className="h-6 w-24 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Upgrade Banner
// ============================================================================

interface UpgradeBannerProps {
  feature: string;
  onDismiss?: () => void;
}

export function UpgradeBanner({ feature, onDismiss }: UpgradeBannerProps) {
  const suggestion = getUpgradeSuggestion(feature);
  if (!suggestion) return null;

  const tierColors: Record<SubscriptionTier, string> = {
    free: "from-slate-600 to-slate-700",
    premium: "from-purple-600 to-blue-600",
    enterprise: "from-amber-600 to-orange-600",
  };

  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-r ${tierColors[suggestion.targetTier]} text-white`}
    >
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Unlock {suggestion.feature.name}</h3>
          <p className="text-sm opacity-90">{suggestion.feature.description}</p>
        </div>
        <button className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
          Upgrade to {suggestion.targetTier}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Limit Warning
// ============================================================================

interface LimitWarningProps {
  current: number;
  max: number;
  type: "scenarios" | "team_members" | "api_calls";
}

export function LimitWarning({ current, max, type }: LimitWarningProps) {
  const percentage = (current / max) * 100;
  const isNearLimit = percentage >= 80;
  const isAtLimit = current >= max;

  const labels = {
    scenarios: "scenarios this month",
    team_members: "team members",
    api_calls: "API calls this month",
  };

  if (!isNearLimit) return null;

  return (
    <div
      className={`p-4 rounded-lg border ${
        isAtLimit
          ? "bg-red-500/10 border-red-500/30"
          : "bg-amber-500/10 border-amber-500/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={isAtLimit ? "text-red-400" : "text-amber-400"}>
          {isAtLimit ? "Limit Reached" : "Approaching Limit"}
        </span>
        <span className="text-slate-300">
          {current} / {max} {labels[type]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            isAtLimit ? "bg-red-500" : "bg-amber-500"
          }`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>

      {isAtLimit && (
        <p className="text-sm text-slate-300 mt-2">
          Upgrade to continue accessing more {type.replace("_", " ")}.
        </p>
      )}
    </div>
  );
}

// ============================================================================
// Pricing Card
// ============================================================================

interface PricingCardProps {
  plan: (typeof PRICING)[number];
  currentTier?: SubscriptionTier;
  onSelect?: (tier: SubscriptionTier) => void;
}

export function PricingCard({ plan, currentTier, onSelect }: PricingCardProps) {
  const isCurrent = currentTier === plan.tier;
  const isUpgrade =
    currentTier &&
    ["free", "premium", "enterprise"].indexOf(plan.tier) >
      ["free", "premium", "enterprise"].indexOf(currentTier);

  return (
    <div
      className={`p-6 rounded-xl border ${
        plan.highlighted
          ? "bg-gradient-to-b from-purple-500/10 to-blue-500/10 border-purple-500/30 ring-2 ring-purple-500/20"
          : "bg-slate-800/50 border-slate-700/50"
      }`}
    >
      {plan.highlighted && (
        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-bold text-white">{plan.name}</h3>

      <div className="mt-4 mb-6">
        {plan.monthlyPrice > 0 ? (
          <div>
            <span className="text-4xl font-bold text-white">
              ${plan.monthlyPrice}
            </span>
            <span className="text-slate-400">/month</span>
            {plan.yearlyPrice > 0 && (
              <p className="text-sm text-emerald-400 mt-1">
                ${plan.yearlyPrice}/year (save{" "}
                {Math.round(
                  (1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100,
                )}
                %)
              </p>
            )}
          </div>
        ) : plan.tier === "enterprise" ? (
          <span className="text-2xl font-bold text-white">Custom pricing</span>
        ) : (
          <span className="text-4xl font-bold text-white">Free</span>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-300">
            <span className="text-emerald-400 mt-0.5">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect?.(plan.tier)}
        disabled={isCurrent}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
          isCurrent
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : plan.highlighted
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
              : "bg-slate-700 text-white hover:bg-slate-600"
        }`}
      >
        {isCurrent ? "Current Plan" : plan.cta}
      </button>
    </div>
  );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to check if user has access to a feature
 */
export function useFeatureAccess(feature: string): boolean {
  const { tier } = useUser();
  return hasFeatureAccess(tier, feature);
}

/**
 * Hook to check if user can access a scenario
 */
export function useScenarioAccess(scenarioTier: SubscriptionTier): boolean {
  const { tier } = useUser();
  return canAccessScenario(tier, scenarioTier);
}
