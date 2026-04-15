"use client";

/**
 * DragDropConfig Component
 *
 * Drag & drop configuration builder. Users arrange items
 * to build correct configurations (e.g., policy settings, network configs).
 */

import { motion } from "framer-motion";
import {
  CheckCircle2,
  GripVertical,
  RotateCcw,
  Settings2,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface ConfigItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ConfigZone {
  id: string;
  title: string;
  acceptedItems: string[]; // IDs of correct items for this zone
  currentItems: string[];
}

interface DragDropConfigProps {
  title: string;
  description?: string;
  instruction: string;
  availableItems: ConfigItem[];
  targetZones: ConfigZone[];
  explanation?: string;
  onComplete?: () => void;
}

export function DragDropConfig({
  title,
  description,
  instruction,
  availableItems: initialItems,
  targetZones: initialZones,
  explanation,
  onComplete,
}: DragDropConfigProps) {
  const [availableItems, setAvailableItems] = useState(initialItems);
  const [zones, setZones] = useState<ConfigZone[]>(
    initialZones.map((z) => ({ ...z, currentItems: [] })),
  );
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDropOnZone = (zoneId: string) => {
    if (!draggedItem) return;

    // Remove from available items
    setAvailableItems((prev) => prev.filter((i) => i.id !== draggedItem));

    // Remove from any other zone
    setZones((prev) =>
      prev.map((z) => ({
        ...z,
        currentItems: z.currentItems.filter((id) => id !== draggedItem),
      })),
    );

    // Add to target zone
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? { ...z, currentItems: [...z.currentItems, draggedItem] }
          : z,
      ),
    );

    setSubmitted(false);
    setDraggedItem(null);
  };

  const handleRemoveFromZone = (zoneId: string, itemId: string) => {
    const item = initialItems.find((i) => i.id === itemId);
    if (!item) return;

    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? { ...z, currentItems: z.currentItems.filter((id) => id !== itemId) }
          : z,
      ),
    );

    setAvailableItems((prev) => [...prev, item]);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const allCorrect = zones.every((zone) => {
      const currentSet = new Set(zone.currentItems);
      const acceptedSet = new Set(zone.acceptedItems);

      if (currentSet.size !== acceptedSet.size) return false;
      return zone.currentItems.every((id) => acceptedSet.has(id));
    });

    setIsCorrect(allCorrect);
    setSubmitted(true);

    if (allCorrect) {
      setTimeout(() => onComplete?.(), 1000);
    }
  };

  const handleReset = () => {
    setAvailableItems(initialItems);
    setZones(initialZones.map((z) => ({ ...z, currentItems: [] })));
    setSubmitted(false);
    setIsCorrect(false);
  };

  const getItemById = (id: string) => initialItems.find((i) => i.id === id);

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20">
            <Settings2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            {description && (
              <p className="text-sm text-cyan-300/70">{description}</p>
            )}
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

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Instruction */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="text-slate-200">{instruction}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Items */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Verfügbare Elemente
            </h4>
            <div className="space-y-2 min-h-[200px] p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 border-dashed">
              {availableItems.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">
                  Alle Elemente wurden zugewiesen
                </p>
              ) : (
                availableItems.map((item) => (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    onDragEnd={handleDragEnd}
                    className={`p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 cursor-grab active:cursor-grabbing transition-all hover:border-cyan-500/50 hover:bg-slate-700 ${
                      draggedItem === item.id ? "opacity-50" : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-slate-500" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.label}</p>
                        {item.description && (
                          <p className="text-slate-400 text-xs">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Target Zones */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Ziele
            </h4>
            {zones.map((zone) => (
              <div
                key={zone.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropOnZone(zone.id)}
                className={`p-4 rounded-xl border-2 border-dashed transition-colors min-h-[120px] ${
                  draggedItem
                    ? "border-cyan-500/50 bg-cyan-500/5"
                    : "border-slate-600/50 bg-slate-800/30"
                }`}
              >
                <h5 className="text-sm font-medium text-cyan-300 mb-2">
                  {zone.title}
                </h5>
                <div className="space-y-2">
                  {zone.currentItems.length === 0 ? (
                    <p className="text-slate-500 text-xs text-center py-4">
                      Element hierher ziehen
                    </p>
                  ) : (
                    zone.currentItems.map((itemId) => {
                      const item = getItemById(itemId);
                      if (!item) return null;

                      const isItemCorrect =
                        submitted && zone.acceptedItems.includes(itemId);
                      const isItemWrong =
                        submitted && !zone.acceptedItems.includes(itemId);

                      return (
                        <motion.div
                          key={itemId}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`p-2 rounded-lg flex items-center justify-between ${
                            isItemCorrect
                              ? "bg-emerald-500/20 border border-emerald-500/30"
                              : isItemWrong
                                ? "bg-red-500/20 border border-red-500/30"
                                : "bg-slate-700/50 border border-slate-600/50"
                          }`}
                        >
                          <span
                            className={
                              isItemCorrect
                                ? "text-emerald-300"
                                : isItemWrong
                                  ? "text-red-300"
                                  : "text-white"
                            }
                          >
                            {item.label}
                          </span>
                          {!submitted && (
                            <button
                              onClick={() =>
                                handleRemoveFromZone(zone.id, itemId)
                              }
                              className="p-1 rounded hover:bg-slate-600 text-slate-400 hover:text-white"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              isCorrect
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-emerald-300 font-medium">
                      Perfekt konfiguriert!
                    </p>
                    {explanation && (
                      <p className="text-slate-400 text-sm mt-2">
                        {explanation}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300">
                    Nicht ganz richtig. Überprüfe die Zuordnung und versuche es
                    erneut.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        {!isCorrect && (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={zones.some((z) => z.currentItems.length === 0)}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Überprüfen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
