"use client";

/**
 * PageHeader - Unified header component for all pages
 * Provides consistent navigation, branding, and cross-links
 */

import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Subtitle / certification or category */
  subtitle?: string;
  /** Icon component for the header */
  icon: LucideIcon;
  /** Gradient colors for icon background */
  iconGradient?: string;
  /** Back link URL - defaults to "/" */
  backUrl?: string;
  /** Cross-navigation links */
  crossLinks?: Array<{
    href: string;
    label: string;
    icon?: LucideIcon;
    variant?: "default" | "primary" | "accent";
  }>;
  /** Additional breadcrumb items */
  breadcrumbs?: Array<{
    href: string;
    label: string;
  }>;
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  iconGradient = "from-blue-500 to-blue-700",
  backUrl = "/",
  crossLinks = [],
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back + Breadcrumbs + Title */}
          <div className="flex items-center gap-4">
            <Link
              href={backUrl}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Zurück"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Link>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                  {breadcrumbs.map((crumb, idx) => (
                    <span key={crumb.href} className="flex items-center gap-2">
                      <Link
                        href={crumb.href}
                        className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                      {idx < breadcrumbs.length - 1 && <span>/</span>}
                    </span>
                  ))}
                  <span>/</span>
                </div>
              </>
            )}

            {/* Title Block */}
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl bg-gradient-to-br ${iconGradient}`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Cross-links + Theme Toggle */}
          <div className="flex items-center gap-3">
            {crossLinks.map((link) => {
              const LinkIcon = link.icon;
              const variantStyles = {
                default:
                  "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
                primary:
                  "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400",
                accent:
                  "bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400",
              };

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    variantStyles[link.variant || "default"]
                  }`}
                >
                  {LinkIcon && <LinkIcon className="w-4 h-4" />}
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
