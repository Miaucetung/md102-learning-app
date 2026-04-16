"use client";

import * as React from "react";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm ${props.className ?? ""}`}
    />
  );
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`border-b border-zinc-100 dark:border-zinc-800 px-4 py-3 ${props.className ?? ""}`}
    />
  );
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={`text-sm font-semibold text-zinc-900 dark:text-white ${props.className ?? ""}`}
    />
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`px-4 py-3 text-zinc-700 dark:text-zinc-200 ${props.className ?? ""}`}
    />
  );
}
