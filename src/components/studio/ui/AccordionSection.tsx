"use client";

import React, { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionSectionProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string | number;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  defaultOpen = true,
  isOpen: controlledIsOpen,
  onToggle,
  children,
  headerAction,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden",
        isOpen
          ? "border-amber-400/30 bg-zinc-900/80 shadow-lg shadow-black/40 ring-1 ring-amber-400/10"
          : "border-white/10 bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/60"
      )}
    >
      <div
        onClick={handleToggle}
        className={cn(
          "w-full px-4 py-3 flex items-center justify-between cursor-pointer select-none transition-colors",
          isOpen ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {Icon && (
            <div
              className={cn(
                "w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all",
                isOpen
                  ? "bg-amber-400/15 border-amber-400/40 text-amber-400 shadow-sm shadow-amber-500/10"
                  : "bg-white/5 border-white/10 text-zinc-400"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <div className="text-left truncate">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-bold tracking-tight transition-colors",
                  isOpen ? "text-white" : "text-zinc-300"
                )}
              >
                {title}
              </span>
              {badge !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold tracking-wide">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div
          className="flex items-center gap-2 shrink-0 ml-2"
          onClick={(e) => e.stopPropagation()}
        >
          {headerAction}
          <button
            type="button"
            onClick={handleToggle}
            className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200 text-zinc-400",
                isOpen && "rotate-180 text-amber-400"
              )}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-4 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  );
};
