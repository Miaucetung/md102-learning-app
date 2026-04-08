"use client";

import type { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
