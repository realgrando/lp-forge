"use client";

import React from "react";
import { ButtonConfig, TypographyOverride } from "@/types/site";
import { ICON_OPTIONS, DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Link2, Type } from "lucide-react";
import { SegmentedControl } from "./ui/SegmentedControl";
import { InlineTypographyEditor } from "./ui/InlineTypographyEditor";

interface ButtonContentEditorProps {
  label: string;
  value: ButtonConfig;
  typographyOverride?: TypographyOverride;
  isHiddenBySection?: boolean;
  onToggleSectionVisibility?: () => void;
  onChange: (next: ButtonConfig) => void;
  onTypographyChange: (patch: Partial<TypographyOverride>) => void;
  onTypographyReset?: () => void;
  defaultAccentColor: string;
}

export const ButtonContentEditor: React.FC<ButtonContentEditorProps> = ({
  label,
  value,
  typographyOverride,
  isHiddenBySection = false,
  onToggleSectionVisibility,
  onChange,
  onTypographyChange,
  onTypographyReset,
  defaultAccentColor,
}) => {
  const btn: ButtonConfig = value || {
    enabled: true,
    text: "Botão",
    url: "#",
    variant: "solid",
    size: "md",
    iconName: "ArrowRight",
    iconPosition: "right",
  };

  const isActive = btn.enabled && !isHiddenBySection;

  const handleToggleEnabled = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isHiddenBySection && onToggleSectionVisibility) {
      onToggleSectionVisibility();
      if (!btn.enabled) {
        onChange({ ...btn, enabled: true });
      }
    } else {
      onChange({ ...btn, enabled: !btn.enabled });
    }
  };

  const update = (patch: Partial<ButtonConfig>) => {
    onChange({ ...btn, ...patch });
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden",
        isActive
          ? "bg-zinc-900/60 border-white/10 shadow-sm"
          : "bg-zinc-950/40 border-white/5 opacity-60"
      )}
    >
      {/* Cabeçalho do Botão */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 bg-zinc-900/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={handleToggleEnabled}
            title={isActive ? "Ocultar este botão" : "Ativar este botão"}
            className={cn(
              "w-7 h-7 rounded-lg border flex items-center justify-center transition-all shrink-0",
              isActive
                ? "bg-[#F4B400]/15 border-[#F4B400]/40 text-[#F4B400] shadow-sm shadow-[#F4B400]/10"
                : "bg-zinc-900 border-white/10 text-zinc-500 hover:text-zinc-300"
            )}
          >
            {isActive ? (
              <Eye className="w-3.5 h-3.5" />
            ) : (
              <EyeOff className="w-3.5 h-3.5" />
            )}
          </button>
          <div className="truncate">
            <span className="block text-xs font-bold text-zinc-100 truncate">
              {label}
            </span>
            <span className="block text-[10px] text-zinc-400 truncate">
              {isActive ? `"${btn.text || "Sem texto"}"` : "Desativado"}
            </span>
          </div>
        </div>

        {btn.iconName && btn.iconName !== "none" && (
          <span className="w-6 h-6 rounded-md bg-zinc-950 border border-white/10 flex items-center justify-center text-[#F4B400] shrink-0">
            <DynamicIcon name={btn.iconName} className="w-3 h-3" />
          </span>
        )}
      </div>

      {/* Conteúdo & Tipografia do Botão */}
      {isActive && (
        <div className="p-4 space-y-3.5 animate-in fade-in duration-150">
          {/* 1. Texto do Botão */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-[#F4B400]" />
              Texto do Botão
            </label>
            <input
              type="text"
              value={btn.text || ""}
              onChange={(e) => update({ text: e.target.value })}
              placeholder="Ex: Contrate Agora"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-600 focus:border-[#F4B400] focus:outline-none transition-colors"
            />
          </div>

          {/* 2. Link / URL de Destino */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-[#F4B400]" />
              Link / URL de Destino
            </label>
            <input
              type="text"
              value={btn.url || ""}
              onChange={(e) => update({ url: e.target.value })}
              placeholder="https://wa.me/... ou #contato"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-600 focus:border-[#F4B400] focus:outline-none transition-colors"
            />
          </div>

          {/* 3. Ícone & Alinhamento */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 block">
                Ícone do Botão
              </label>
              <select
                value={btn.iconName || "none"}
                onChange={(e) => update({ iconName: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 block">
                Posição
              </label>
              <SegmentedControl<"left" | "right">
                value={btn.iconPosition || "right"}
                onChange={(pos) => update({ iconPosition: pos })}
                columns={2}
                size="sm"
                options={[
                  { value: "left", label: "Esq" },
                  { value: "right", label: "Dir" },
                ]}
              />
            </div>
          </div>

          {/* 4. Tipografia Acoplada do Botão */}
          <InlineTypographyEditor
            elementKey="ctaButton"
            label="Tipografia do Botão"
            override={typographyOverride}
            onChange={onTypographyChange}
            onReset={onTypographyReset}
            defaultAccentColor={defaultAccentColor}
          />
        </div>
      )}
    </div>
  );
};
