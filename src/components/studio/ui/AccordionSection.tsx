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
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  defaultOpen = true,
  children,
  headerAction,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:border-white/15">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between cursor-pointer select-none hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {Icon && (
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F4B400] shrink-0">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <div className="text-left truncate">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-100 tracking-tight">
                {title}
              </span>
              {badge !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-white/10 text-[#F4B400] font-semibold">
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

        <div className="flex items-center gap-2 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
          {headerAction}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200 text-zinc-400",
                isOpen && "rotate-180 text-white"
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
