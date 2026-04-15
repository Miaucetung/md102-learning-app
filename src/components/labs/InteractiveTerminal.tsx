"use client";

/**
 * InteractiveTerminal Component
 *
 * A simulated PowerShell terminal where users can type commands
 * and see realistic output. Commands are validated and provide feedback.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Lightbulb,
  Loader2,
  RotateCcw,
  Terminal,
  XCircle,
} from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

interface TerminalCommand {
  command: string;
  aliases?: string[]; // Alternative acceptable commands
  output: string;
  hint?: string;
  explanation?: string;
}

interface InteractiveTerminalProps {
  title: string;
  description?: string;
  commands: TerminalCommand[];
  onComplete?: () => void;
  allowSkip?: boolean;
}

interface HistoryEntry {
  type: "input" | "output" | "error" | "success";
  text: string;
  timestamp: number;
}

export function InteractiveTerminal({
  title,
  description,
  commands,
  onComplete,
  allowSkip = false,
}: InteractiveTerminalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const isCompleted = currentIndex >= commands.length;
  const currentCommand = commands[currentIndex];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current && !isCompleted) {
      inputRef.current.focus();
    }
  }, [currentIndex, isCompleted]);

  const normalizeCommand = (cmd: string): string => {
    return cmd.toLowerCase().replace(/\s+/g, " ").trim();
  };

  const isCommandMatch = (
    input: string,
    expected: TerminalCommand,
  ): boolean => {
    const normalizedInput = normalizeCommand(input);
    const normalizedExpected = normalizeCommand(expected.command);

    if (normalizedInput === normalizedExpected) return true;

    if (expected.aliases) {
      return expected.aliases.some(
        (alias) => normalizeCommand(alias) === normalizedInput,
      );
    }

    return false;
  };

  const handleSubmit = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !input.trim() || isProcessing || isCompleted)
      return;

    const userInput = input.trim();
    setInput("");
    setShowHint(false);
    setAttempts((prev) => prev + 1);

    // Add input to history
    setHistory((prev) => [
      ...prev,
      {
        type: "input",
        text: userInput,
        timestamp: Date.now(),
      },
    ]);

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 300 + Math.random() * 400),
    );

    if (isCommandMatch(userInput, currentCommand)) {
      // Correct command
      setHistory((prev) => [
        ...prev,
        { type: "output", text: currentCommand.output, timestamp: Date.now() },
        {
          type: "success",
          text: `✓ Korrekt! ${currentCommand.explanation || ""}`,
          timestamp: Date.now(),
        },
      ]);

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setAttempts(0);

        if (nextIndex >= commands.length) {
          onComplete?.();
        }
      }, 800);
    } else {
      // Wrong command
      const errorMsg =
        attempts >= 2
          ? `✗ Falsch. Tipp: Der Befehl beginnt mit "${currentCommand.command.split(" ")[0]}"`
          : "✗ Falscher Befehl. Versuche es erneut.";

      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          text: errorMsg,
          timestamp: Date.now(),
        },
      ]);
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setHistory([]);
    setInput("");
    setShowHint(false);
    setAttempts(0);
  };

  const handleSkip = () => {
    if (!currentCommand) return;

    setHistory((prev) => [
      ...prev,
      { type: "input", text: currentCommand.command, timestamp: Date.now() },
      { type: "output", text: currentCommand.output, timestamp: Date.now() },
      { type: "success", text: "⏭️ Übersprungen", timestamp: Date.now() },
    ]);

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setAttempts(0);

    if (nextIndex >= commands.length) {
      onComplete?.();
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center justify-between bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            {description && (
              <p className="text-sm text-emerald-300/70">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50">
            <span className="text-sm text-slate-400">
              {currentIndex}/{commands.length}
            </span>
            <div className="w-20 h-2 bg-slate-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(currentIndex / commands.length) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Task */}
      {!isCompleted && currentCommand && (
        <div className="px-6 py-3 bg-slate-800/30 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                Aufgabe {currentIndex + 1}:
              </span>
              <span className="text-sm text-emerald-300">
                {currentCommand.hint || "Gib den richtigen Befehl ein"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs text-amber-400 hover:bg-amber-500/10 transition-colors"
              >
                <Lightbulb className="w-3 h-3" />
                Hinweis
              </button>

              {allowSkip && (
                <button
                  onClick={handleSkip}
                  className="px-2 py-1 rounded text-xs text-slate-400 hover:bg-slate-700/50 transition-colors"
                >
                  Überspringen
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300"
              >
                <code className="font-mono">{currentCommand.command}</code>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Terminal Window */}
      <div className="relative">
        {/* Terminal Header Bar */}
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-700/50 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-slate-500 font-mono">
            Administrator: Windows PowerShell
          </span>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm bg-slate-950"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Welcome message */}
          <div className="text-slate-500 mb-4">
            Windows PowerShell
            <br />
            Copyright (C) Microsoft Corporation. Alle Rechte vorbehalten.
            <br />
            <br />
            Interaktives Lab - Gib die Befehle ein, um fortzufahren.
          </div>

          {/* History */}
          {history.map((entry, index) => (
            <div key={index} className="mb-1">
              {entry.type === "input" && (
                <div className="flex items-start gap-2 text-blue-400">
                  <span className="text-blue-300">PS C:\&gt;</span>
                  <span>{entry.text}</span>
                </div>
              )}
              {entry.type === "output" && (
                <pre className="text-slate-300 whitespace-pre-wrap ml-0">
                  {entry.text}
                </pre>
              )}
              {entry.type === "error" && (
                <div className="text-red-400 flex items-start gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{entry.text}</span>
                </div>
              )}
              {entry.type === "success" && (
                <div className="text-emerald-400 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{entry.text}</span>
                </div>
              )}
            </div>
          ))}

          {/* Input Line */}
          {!isCompleted && (
            <div className="flex items-center gap-2 text-blue-400">
              <span className="text-blue-300">PS C:\&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleSubmit}
                disabled={isProcessing}
                className="flex-1 bg-transparent outline-none text-emerald-300 caret-emerald-400"
                placeholder={isProcessing ? "" : "Befehl eingeben..."}
                autoComplete="off"
                spellCheck={false}
              />
              {isProcessing && (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              )}
            </div>
          )}

          {/* Completion Message */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="text-emerald-300 font-semibold">
                    Lab abgeschlossen!
                  </p>
                  <p className="text-emerald-400/70 text-sm">
                    Du hast alle {commands.length} Befehle erfolgreich
                    ausgeführt.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
