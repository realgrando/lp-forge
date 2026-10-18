"use client";

import React, { useState } from "react";
import {
  BorderRadiusPreset,
  ButtonConfig,
  ButtonSize,
  ButtonVariant,
} from "@/types/site";
import { ICON_OPTIONS, DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Eye, EyeOff, Palette, Link2, Type, Sliders } from "lucide-react";
import { SegmentedControl } from "./ui/SegmentedControl";
import { ColorFieldRow } from "./ui/ColorFieldRow";
import { ModernToggle } from "./ui/ModernToggle";

interface ButtonFieldEditorProps {
  label: string;
  value: ButtonConfig;
  isHiddenBySection?: boolean;
  onToggleSectionVisibility?: () => void;
  onChange: (next: ButtonConfig) => void;
  defaultAccentColor: string;
}

export const ButtonFieldEditor: React.FC<ButtonFieldEditorProps> = ({
  label,
  value,
  isHiddenBySection = false,
  onToggleSectionVisibility,
  onChange,
  defaultAccentColor,
}) => {
  const [expanded, setExpanded] = useState(false);

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
      {/* Cabeçalho do Botão: Switch de Visibilidade + Resumo + Chevron */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="px-4 py-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={handleToggleEnabled}
            title={isActive ? "Ocultar este botão" : "Ativar este botão"}
            className={cn(
              "w-8 h-8 rounded-xl border flex items-center justify-center transition-all shrink-0",
              isActive
                ? "bg-[#F4B400]/15 border-[#F4B400]/40 text-[#F4B400] shadow-sm shadow-[#F4B400]/10"
                : "bg-zinc-900 border-white/10 text-zinc-500 hover:text-zinc-300"
            )}
          >
            {isActive ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>

          <div className="truncate">
            <span className="block text-xs font-bold text-zinc-100 truncate">
              {label}
            </span>
            <span className="block text-[11px] text-zinc-400 truncate mt-0.5">
              {isActive ? `"${btn.text || "Sem texto"}" • ${btn.variant || "solid"}` : "Desativado"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {btn.iconName && btn.iconName !== "none" && (
            <span className="w-7 h-7 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center text-[#F4B400]">
              <DynamicIcon name={btn.iconName} className="w-3.5 h-3.5" />
            </span>
          )}
          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Gaveta de Edição Estruturada do Botão */}
      {expanded && (
        <div className="p-4 border-t border-white/10 space-y-4 bg-zinc-950/60 animate-in fade-in duration-150">
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
              placeholder="Ex: Quero Minha Proposta"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-600 focus:border-[#F4B400] focus:outline-none transition-colors"
            />
          </div>

          {/* 2. Link / Destino */}
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-600 focus:border-[#F4B400] focus:outline-none transition-colors"
            />
          </div>

          {/* 3. Variante Visual (Segmented Control) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Estilo / Acabamento
            </label>
            <SegmentedControl<ButtonVariant>
              value={btn.variant || "solid"}
              onChange={(v) => update({ variant: v })}
              columns={5}
              options={[
                { value: "solid", label: "Sólido" },
                { value: "outline", label: "Borda" },
                { value: "glass", label: "Glass" },
                { value: "3d", label: "3D" },
                { value: "ghost", label: "Ghost" },
              ]}
            />
          </div>

          {/* 4. Tamanho, Arredondamento & Largura */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 block">
                  Tamanho da Escala
                </label>
                <SegmentedControl<ButtonSize>
                  value={btn.size || "md"}
                  onChange={(s) => update({ size: s })}
                  columns={4}
                  size="sm"
                  options={[
                    { value: "sm", label: "SM" },
                    { value: "md", label: "MD" },
                    { value: "lg", label: "LG" },
                    { value: "xl", label: "XL" },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 block">
                  Arredondamento
                </label>
                <select
                  value={btn.radius || ""}
                  onChange={(e) =>
                    update({
                      radius: (e.target.value as BorderRadiusPreset) || undefined,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
                >
                  <option value="">Herdar da Seção</option>
                  <option value="none">Reto (None)</option>
                  <option value="sm">Suave (SM)</option>
                  <option value="md">Médio (MD)</option>
                  <option value="lg">Arredondado (LG)</option>
                  <option value="full">Cápsula (Full)</option>
                </select>
              </div>
            </div>

            <ModernToggle
              label="Largura Total (100%)"
              description="Estica o botão horizontalmente no container"
              checked={Boolean(btn.fullWidth)}
              onChange={(fw) => update({ fullWidth: fw })}
            />
          </div>

          {/* 5. Ícone & Alinhamento */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 block">
                Ícone
              </label>
              <select
                value={btn.iconName || "none"}
                onChange={(e) => update({ iconName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
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

          {/* 6. Cores Exclusivas do Botão (Progressive Disclosure) */}
          <div className="pt-2 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#F4B400]" />
                Cores Personalizadas do Botão
              </span>
              {(btn.customBg || btn.customText || btn.customBorderColor) && (
                <button
                  type="button"
                  onClick={() =>
                    update({
                      customBg: undefined,
                      customText: undefined,
                      customBorderColor: undefined,
                    })
                  }
                  className="text-[11px] text-[#F4B400] hover:underline"
                >
                  Restaurar cores
                </button>
              )}
            </div>

            <div className="space-y-2">
              <ColorFieldRow
                label={
                  btn.variant === "outline"
                    ? "Cor da Borda & Destaque"
                    : btn.variant === "glass"
                    ? "Tonalidade do Vidro"
                    : btn.variant === "ghost"
                    ? "Cor do Texto & Ícone"
                    : "Cor de Fundo Principal"
                }
                description={
                  btn.variant === "outline"
                    ? "Sobrescreve a cor do contorno do botão"
                    : btn.variant === "glass"
                    ? "Tinge o vidro com transparência e desfoque"
                    : btn.variant === "ghost"
                    ? "Cor de destaque do texto sem fundo"
                    : "Preenchimento sólido ou 3D do botão"
                }
                value={btn.customBg}
                defaultValue={defaultAccentColor}
                onChange={(hex) => update({ customBg: hex })}
                onReset={() => update({ customBg: undefined })}
              />
              <ColorFieldRow
                label="Cor do Texto & Ícone"
                description="Contraste de leitura"
                value={btn.customText}
                defaultValue={
                  btn.variant === "solid" || btn.variant === "3d"
                    ? "#09090B"
                    : defaultAccentColor
                }
                onChange={(hex) => update({ customText: hex })}
                onReset={() => update({ customText: undefined })}
              />
              <ColorFieldRow
                label="Cor da Borda (Opcional)"
                description="Contorno específico para o botão"
                value={btn.customBorderColor}
                defaultValue={defaultAccentColor}
                onChange={(hex) => update({ customBorderColor: hex })}
                onReset={() => update({ customBorderColor: undefined })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
