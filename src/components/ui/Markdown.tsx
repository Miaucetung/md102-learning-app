"use client";

import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

// Configure marked for tables
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown (includes tables)
  breaks: true, // Line breaks
});

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className = "" }: MarkdownProps) {
  // Convert markdown to HTML
  const rawHtml = marked.parse(content) as string;

  // Sanitize to prevent XSS
  const safeHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div
      className={`
        prose prose-sm max-w-none
        dark:prose-invert
        prose-p:my-2
        prose-table:w-full
        prose-table:border-collapse
        prose-table:text-sm
        prose-table:my-4
        prose-th:border
        prose-th:border-zinc-300
        dark:prose-th:border-zinc-600
        prose-th:bg-zinc-100
        dark:prose-th:bg-zinc-800
        prose-th:p-2
        prose-th:text-left
        prose-th:font-semibold
        prose-td:border
        prose-td:border-zinc-200
        dark:prose-td:border-zinc-700
        prose-td:p-2
        prose-td:bg-white
        dark:prose-td:bg-zinc-900
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
