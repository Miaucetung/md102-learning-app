"use client";

/**
 * TerminalBlock Component
 *
 * Shows PowerShell/CLI commands with syntax highlighting and explanations.
 *
 * Cognitive Science: Procedural learning + scaffolded practice
 */

import type { TerminalBlock as TerminalBlockType } from "@/content/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Copy,
  Lightbulb,
  Terminal,
} from "lucide-react";
import { useState } from "react";

interface TerminalBlockProps {
  block: TerminalBlockType;
  onComplete?: () => void;
}

export function TerminalBlock({ block, onComplete }: TerminalBlockProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/20">
          <Terminal className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{block.title}</h3>
          <p className="text-sm text-emerald-300/70">{block.description}</p>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="p-4">
        <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900">
          {/* Terminal Header */}
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700/50 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-slate-500 font-mono">
              PowerShell
            </span>
          </div>

          {/* Commands */}
          <div className="p-4 space-y-4">
            {block.commands.map((cmd, index) => (
              <div key={index} className="space-y-2">
                {/* Command Line */}
                <div className="group relative">
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                    <code className="flex-1 text-emerald-300 font-mono text-sm break-all">
                      {cmd.command}
                    </code>
                    <button
                      onClick={() => handleCopy(cmd.command, index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-slate-700"
                      title="Kopieren"
                    >
                      {copiedIndex === index ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Output (if present) */}
                {cmd.output && (
                  <div className="ml-6 p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                    <pre className="text-slate-400 font-mono text-xs whitespace-pre-wrap">
                      {cmd.output}
                    </pre>
                  </div>
                )}

                {/* Explanation */}
                {cmd.explanation && (
                  <motion.button
                    onClick={() => toggleExpand(index)}
                    className="ml-6 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>{expandedIndex === index ? "▼" : "▶"}</span>
                    <span>Erklärung</span>
                  </motion.button>
                )}

                <AnimatePresence>
                  {expandedIndex === index && cmd.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <p className="text-emerald-200 text-sm">
                        {cmd.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      {block.tips && block.tips.length > 0 && (
        <div className="px-6 pb-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-amber-300 mb-2">
                  Tipps
                </h4>
                <ul className="space-y-1">
                  {block.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-amber-100 text-sm flex items-start gap-2"
                    >
                      <span className="text-amber-400">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
