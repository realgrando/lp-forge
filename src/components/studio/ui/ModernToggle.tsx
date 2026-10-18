"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ModernToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const ModernToggle: React.FC<ModernToggleProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "flex items-center justify-between gap-3 p-3 rounded-xl border select-none transition-all cursor-pointer",
        checked
          ? "bg-zinc-900/80 border-white/10"
          : "bg-zinc-950/60 border-white/5",
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <div className="min-w-0">
        <span
          className={cn(
            "block text-xs font-semibold",
            checked ? "text-white" : "text-zinc-300"
          )}
        >
          {label}
        </span>
        {description && (
          <span className="block text-[11px] text-zinc-400 truncate mt-0.5">
            {description}
          </span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          "w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 shrink-0 focus:outline-none",
          checked ? "bg-[#F4B400]" : "bg-zinc-800"
        )}
      >
        <div
          className={cn(
            "w-4.5 h-4.5 rounded-full bg-zinc-950 shadow-md transition-transform duration-200",
            checked ? "translate-x-4.5 bg-zinc-950" : "translate-x-0 bg-zinc-400"
          )}
        />
      </button>
    </div>
  );
};
