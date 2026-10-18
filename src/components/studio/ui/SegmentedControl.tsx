"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  hint?: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  size?: "sm" | "md";
  columns?: number;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  columns,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "p-1 rounded-xl bg-zinc-950/80 border border-white/10",
        columns ? `grid grid-cols-${columns} gap-1` : "flex items-center gap-1"
      )}
      style={
        columns
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }
          : undefined
      }
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.hint || opt.label}
            className={cn(
              "rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 select-none text-center",
              size === "sm" ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
              isSelected
                ? "bg-[#F4B400] text-zinc-950 font-bold shadow-md shadow-black/30"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            {opt.icon}
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
