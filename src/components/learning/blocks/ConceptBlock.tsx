"use client";

/**
 * ConceptBlock Component
 *
 * Core theory explanation (chunked for cognitive load).
 *
 * Cognitive Science: Chunking + working memory limits
 */

import type { ConceptBlock as ConceptBlockType } from "@/content/types";
import DOMPurify from "isomorphic-dompurify";
import { BookOpen, Image, Lightbulb } from "lucide-react";
import { marked } from "marked";
import { useMemo } from "react";

// Configure marked for GFM tables
marked.setOptions({
  gfm: true,
  breaks: true,
});

interface ConceptBlockProps {
  block: ConceptBlockType;
}

export function ConceptBlock({ block }: ConceptBlockProps) {
  // Memoize markdown rendering for performance
  const renderedContent = useMemo(() => {
    const rawHtml = marked.parse(block.content) as string;
    return DOMPurify.sanitize(rawHtml);
  }, [block.content]);

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-blue-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-500/20">
          <BookOpen className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{block.title}</h3>
          <p className="text-sm text-blue-300/70">Kernkonzept</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Main Content - Now with markdown rendering */}
        <div
          className="prose prose-invert prose-blue max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-code:text-green-400"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />

        {/* Visual Aid */}
        {block.visualAid && (
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-start gap-3">
              <Image className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-medium text-slate-400 uppercase">
                  {block.visualAid.type}
                </span>
                <p className="text-sm text-slate-300 mt-1">
                  {block.visualAid.description}
                </p>
                {block.visualAid.src && (
                  <img
                    src={block.visualAid.src}
                    alt={block.visualAid.description}
                    className="mt-3 rounded-lg max-w-full"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        {block.keyTakeaways && block.keyTakeaways.length > 0 && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                  Wichtigste Erkenntnisse
                </h4>
                <ul className="space-y-1">
                  {block.keyTakeaways.map((takeaway, index) => (
                    <li
                      key={index}
                      className="text-emerald-100 text-sm flex items-start gap-2"
                    >
                      <span className="text-emerald-400">•</span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
