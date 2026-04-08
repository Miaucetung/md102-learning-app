"use client";

import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, className = "", ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        className={`relative h-2 w-full overflow-hidden rounded-full bg-zinc-200 ${className}`}
        {...props}
      >
        <div
          className="h-full bg-emerald-500 transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";
