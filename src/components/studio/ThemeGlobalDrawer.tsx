"use client";

import React, { useState } from "react";
import {
  TextHighlightStyle,
  ThemeConfig,
  ThemePalette,
  ThemePresetRecord,
  ThemeTypography,
} from "@/types/site";
import { GOOGLE_FONTS_CATALOG, THEME_PRESETS } from "@/config/presets";
import { cn } from "@/lib/utils";
import {
  Check,
  Palette,
  Type,
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  Bookmark,
} from "lucide-react";
import { AccordionSection } from "./ui/AccordionSection";
import { ColorFieldRow } from "./ui/ColorFieldRow";
import { SegmentedControl } from "./ui/SegmentedControl";

interface ThemeGlobalDrawerProps {
  theme: ThemeConfig;
  customPresets: ThemePresetRecord[];
  onApplyPreset: (presetId: string) => void;
  onUpdatePalette: (patch: Partial<ThemePalette>) => void;
  onUpdateTypography: (patch: Partial<ThemeTypography>) => void;
  onSaveCustomPreset: (name: string, badge?: string) => void;
  onDeleteCustomPreset: (presetId: string) => void;
  onResetToDefault: () => void;
}

export const ThemeGlobalDrawer: React.FC<ThemeGlobalDrawerProps> = ({
  theme,
  customPresets = [],
  onApplyPreset,
  onUpdatePalette,
  onUpdateTypography,
  onSaveCustomPreset,
  onDeleteCustomPreset,
  onResetToDefault,
}) => {
  const [isSavingPreset, setIsSavingPreset] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [newPresetBadge, setNewPresetBadge] = useState("Custom");

  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;
    onSaveCustomPreset(newPresetName.trim(), newPresetBadge.trim() || "Custom");
    setNewPresetName("");
    setNewPresetBadge("Custom");
    setIsSavingPreset(false);
  };

  const typography = theme.typography;
  const palette = theme.palette;

  return (
    <div className="space-y-4 pb-12">
      {/* BARRA SUPERIOR DE AÇÕES RÁPIDAS DE TEMA */}
      <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#F4B400]/15 text-[#F4B400] flex items-center justify-center font-bold text-xs">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-200 block leading-tight">
                Design System Global
              </span>
              <span className="text-[10px] text-zinc-500">
                Padrões herdados por todos os blocos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsSavingPreset(!isSavingPreset)}
              title="Salvar configuração atual como preset"
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all border",
                isSavingPreset
                  ? "bg-[#F4B400] text-zinc-950 border-[#F4B400]"
                  : "bg-zinc-800 text-zinc-200 border-white/10 hover:text-white hover:bg-zinc-700"
              )}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Salvar Preset</span>
            </button>

            <button
              type="button"
              onClick={onResetToDefault}
              title="Restaurar tema padrão original"
              className="p-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Form Inline para Salvar Novo Preset Customizado */}
        {isSavingPreset && (
          <form
            onSubmit={handleSavePreset}
            className="pt-2.5 border-t border-white/5 space-y-2 animate-in fade-in duration-150"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-zinc-400 block">
                  Nome do Preset
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dark Gold Luxury"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#F4B400]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-zinc-400 block">
                  Tag / Categoria
                </label>
                <input
                  type="text"
                  placeholder="Ex: SaaS, Bio, Advocacia"
                  value={newPresetBadge}
                  onChange={(e) => setNewPresetBadge(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#F4B400]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsSavingPreset(false)}
                className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-[#F4B400] text-zinc-950 font-bold text-[11px] hover:opacity-90"
              >
                Salvar Preset
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 1. GERENCIADOR DE PRESETS (CRUD) */}
      <AccordionSection
        title="Presets de Identidade (CRUD)"
        subtitle="Carregar, criar e gerenciar temas do projeto"
        icon={Bookmark}
        defaultOpen={false}
      >
        <div className="space-y-4">
          {/* Presets Customizados Criados pelo Usuário */}
          {customPresets.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4B400] block">
                Meus Presets Customizados ({customPresets.length})
              </span>
              <div className="grid grid-cols-1 gap-2">
                {customPresets.map((preset) => {
                  const isSelected = theme.presetId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2",
                        isSelected
                          ? "bg-[#F4B400]/15 border-[#F4B400] text-white shadow-sm"
                          : "bg-zinc-950/70 border-white/5 text-zinc-300 hover:bg-zinc-900 hover:border-white/10"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => onApplyPreset(preset.id)}
                        className="flex-1 text-left space-y-1.5 min-w-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-100 truncate">
                            {preset.name}
                          </span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md bg-[#F4B400]/20 text-[#F4B400] font-bold shrink-0">
                            {preset.badge || "Custom"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {Object.values(preset.config.palette)
                            .slice(0, 6)
                            .map((hex, i) => (
                              <span
                                key={i}
                                className="w-3 h-3 rounded-full border border-white/20 shadow-xs"
                                style={{ backgroundColor: hex }}
                              />
                            ))}
                        </div>
                      </button>

                      <div className="flex items-center gap-1 shrink-0">
                        {isSelected && (
                          <div className="w-6 h-6 rounded-lg bg-[#F4B400] text-zinc-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => onDeleteCustomPreset(preset.id)}
                          title="Excluir preset customizado"
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Presets Nativos de Fábrica */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
              Presets Nativos de Fábrica
            </span>
            <div className="grid grid-cols-1 gap-2">
              {THEME_PRESETS.map((preset) => {
                const isSelected = theme.presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onApplyPreset(preset.id)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all flex items-center justify-between",
                      isSelected
                        ? "bg-[#F4B400]/15 border-[#F4B400] text-white shadow-sm"
                        : "bg-zinc-950/70 border-white/5 text-zinc-300 hover:bg-zinc-900 hover:border-white/10"
                    )}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-100 truncate">
                          {preset.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-md bg-white/10 text-[#F4B400] font-semibold shrink-0">
                          {preset.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {Object.values(preset.config.palette)
                          .slice(0, 6)
                          .map((hex, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-lg bg-[#F4B400] text-zinc-950 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* 2. CORES GLOBAIS DA MARCA (PALETA COMPLETA COM OPACIDADE) */}
      <AccordionSection
        title="Cores Globais da Marca"
        subtitle="Paleta de cores herdada por todo o site"
        icon={Palette}
        defaultOpen={true}
      >
        <div className="space-y-5">
          {/* Grupo A: Estrutura & Fundo */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block border-b border-white/5 pb-1">
              Estrutura & Fundo
            </span>
            <ColorFieldRow
              label="Fundo Geral (Background)"
              description="Cor principal da tela e página"
              value={palette.background}
              defaultValue="#09090B"
              onChange={(hex) => onUpdatePalette({ background: hex })}
              onReset={() => onUpdatePalette({ background: "#09090B" })}
            />
            <ColorFieldRow
              label="Superfície dos Cards (Surface)"
              description="Fundo dos cards, grids e contêineres"
              value={palette.surface}
              defaultValue="#18181B"
              onChange={(hex) => onUpdatePalette({ surface: hex })}
              onReset={() => onUpdatePalette({ surface: "#18181B" })}
            />
            <ColorFieldRow
              label="Bordas Globais (Border)"
              description="Linhas e divisórias padrão"
              value={palette.border || palette.secondary}
              defaultValue="#27272A"
              onChange={(hex) => onUpdatePalette({ border: hex })}
              onReset={() => onUpdatePalette({ border: "#27272A" })}
            />
          </div>

          {/* Grupo B: Tipografia & Textos */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block border-b border-white/5 pb-1">
              Tipografia & Textos
            </span>
            <ColorFieldRow
              label="Texto Principal (Headings & Títulos)"
              description="Cor dos títulos e manchetes principais"
              value={palette.foreground}
              defaultValue="#FAFAFA"
              onChange={(hex) => onUpdatePalette({ foreground: hex })}
              onReset={() => onUpdatePalette({ foreground: "#FAFAFA" })}
            />
            <ColorFieldRow
              label="Texto Secundário (Descrições & Apoio)"
              description="Cor de subtítulos, descrições e legendas"
              value={palette.muted || "#A1A1AA"}
              defaultValue="#A1A1AA"
              onChange={(hex) => onUpdatePalette({ muted: hex })}
              onReset={() => onUpdatePalette({ muted: "#A1A1AA" })}
            />
          </div>

          {/* Grupo C: Identidade da Marca & Ação */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block border-b border-white/5 pb-1">
              Identidade da Marca & Ação
            </span>
            <ColorFieldRow
              label="Cor Primária da Marca"
              description="Cor corporativa mestre da marca"
              value={palette.primary}
              defaultValue="#F4B400"
              onChange={(hex) => onUpdatePalette({ primary: hex })}
              onReset={() => onUpdatePalette({ primary: "#F4B400" })}
            />
            <ColorFieldRow
              label="Cor Secundária da Marca"
              description="Tom de apoio e contraste institucional"
              value={palette.secondary}
              defaultValue="#27272A"
              onChange={(hex) => onUpdatePalette({ secondary: hex })}
              onReset={() => onUpdatePalette({ secondary: "#27272A" })}
            />
            <ColorFieldRow
              label="Cor de Destaque & Brilho (Accent)"
              description="Luz ambiente, ícones ativos e pontos de foco"
              value={palette.accent}
              defaultValue="#F4B400"
              onChange={(hex) => onUpdatePalette({ accent: hex })}
              onReset={() => onUpdatePalette({ accent: "#F4B400" })}
            />
          </div>

          {/* Grupo D: Badges & Selos */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block border-b border-white/5 pb-1">
              Badges & Selos de Abertura
            </span>
            <ColorFieldRow
              label="Fundo Padrão do Badge"
              description="Fundo translúcido ou sólido do selo"
              value={palette.badgeBg || "rgba(244, 180, 0, 0.15)"}
              defaultValue="rgba(244, 180, 0, 0.15)"
              onChange={(hex) => onUpdatePalette({ badgeBg: hex })}
              onReset={() => onUpdatePalette({ badgeBg: "rgba(244, 180, 0, 0.15)" })}
            />
            <ColorFieldRow
              label="Texto & Ícone do Badge"
              description="Cor da tipografia e do ícone interno"
              value={palette.badgeText || palette.accent}
              defaultValue="#F4B400"
              onChange={(hex) => onUpdatePalette({ badgeText: hex })}
              onReset={() => onUpdatePalette({ badgeText: palette.accent })}
            />
          </div>

          {/* Grupo E: Botões de Ação (CTAs Globais) */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block border-b border-white/5 pb-1">
              Botões de Ação (CTAs Globais)
            </span>
            <ColorFieldRow
              label="Botão Principal (Fundo)"
              description="Cor de preenchimento do botão mestre"
              value={palette.buttonPrimaryBg || palette.accent}
              defaultValue="#F4B400"
              onChange={(hex) => onUpdatePalette({ buttonPrimaryBg: hex })}
              onReset={() => onUpdatePalette({ buttonPrimaryBg: palette.accent })}
            />
            <ColorFieldRow
              label="Botão Principal (Texto)"
              description="Cor da legenda do botão mestre"
              value={palette.buttonPrimaryText || "#09090B"}
              defaultValue="#09090B"
              onChange={(hex) => onUpdatePalette({ buttonPrimaryText: hex })}
              onReset={() => onUpdatePalette({ buttonPrimaryText: "#09090B" })}
            />
            <ColorFieldRow
              label="Botão Secundário (Fundo)"
              description="Preenchimento do botão secundário"
              value={palette.buttonSecondaryBg || "transparent"}
              defaultValue="transparent"
              onChange={(hex) => onUpdatePalette({ buttonSecondaryBg: hex })}
              onReset={() => onUpdatePalette({ buttonSecondaryBg: "transparent" })}
            />
            <ColorFieldRow
              label="Botão Secundário (Texto)"
              description="Legenda do botão secundário"
              value={palette.buttonSecondaryText || palette.foreground}
              defaultValue="#FAFAFA"
              onChange={(hex) => onUpdatePalette({ buttonSecondaryText: hex })}
              onReset={() => onUpdatePalette({ buttonSecondaryText: palette.foreground })}
            />
          </div>
        </div>
      </AccordionSection>

      {/* 3. TIPOGRAFIA GLOBAL DO PROJETO */}
      <AccordionSection
        title="Tipografia Global"
        subtitle="Fontes, pesos, caixas e destaques das letras"
        icon={Type}
        defaultOpen={false}
      >
        <div className="space-y-4">
          {/* Fonte de Títulos */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Fonte dos Títulos (Headings)
            </label>
            <select
              value={typography.headingFont}
              onChange={(e) =>
                onUpdateTypography({ headingFont: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
            >
              {GOOGLE_FONTS_CATALOG.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label} ({f.category})
                </option>
              ))}
            </select>
          </div>

          {/* Peso Padrão dos Títulos */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Peso Padrão dos Títulos
            </label>
            <SegmentedControl<NonNullable<ThemeTypography["headingWeight"]>>
              value={typography.headingWeight || "font-black"}
              onChange={(w) => onUpdateTypography({ headingWeight: w })}
              columns={4}
              size="sm"
              options={[
                { value: "font-normal", label: "Normal" },
                { value: "font-semibold", label: "Semi" },
                { value: "font-bold", label: "Bold" },
                { value: "font-black", label: "Black" },
              ]}
            />
          </div>

          {/* Caixa de Texto dos Títulos */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Caixa dos Títulos
            </label>
            <SegmentedControl<NonNullable<ThemeTypography["textTransform"]>>
              value={typography.textTransform || "normal-case"}
              onChange={(tt) => onUpdateTypography({ textTransform: tt })}
              columns={4}
              size="sm"
              options={[
                { value: "normal-case", label: "Padrão" },
                { value: "uppercase", label: "ALTA" },
                { value: "lowercase", label: "baixa" },
                { value: "capitalize", label: "Capital" },
              ]}
            />
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Fonte do Corpo */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Fonte do Corpo (Body / Parágrafos)
            </label>
            <select
              value={typography.bodyFont}
              onChange={(e) => onUpdateTypography({ bodyFont: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
            >
              {GOOGLE_FONTS_CATALOG.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label} ({f.category})
                </option>
              ))}
            </select>
          </div>

          {/* Peso do Corpo */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Peso Padrão do Corpo
            </label>
            <SegmentedControl<NonNullable<ThemeTypography["bodyWeight"]>>
              value={typography.bodyWeight || "font-normal"}
              onChange={(w) => onUpdateTypography({ bodyWeight: w })}
              columns={4}
              size="sm"
              options={[
                { value: "font-light", label: "Light" },
                { value: "font-normal", label: "Normal" },
                { value: "font-medium", label: "Médio" },
                { value: "font-semibold", label: "Semi" },
              ]}
            />
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Estilo Global de Realces / Destaques (Highlights) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 block">
                Estilo Padrão de Destaque (**palavra**)
              </label>
              <span className="text-[10px] text-zinc-500">
                Aparência ao marcar texto com **
              </span>
            </div>
            <SegmentedControl<TextHighlightStyle>
              value={typography.highlightStyle || "accent"}
              onChange={(s) => onUpdateTypography({ highlightStyle: s })}
              columns={5}
              size="sm"
              options={[
                { value: "accent", label: "Cor" },
                { value: "gradient", label: "Gradiente" },
                { value: "glow", label: "Brilho" },
                { value: "underline", label: "Sublinhado" },
                { value: "marker", label: "Marca" },
              ]}
            />
            <ColorFieldRow
              label="Cor Padrão do Destaque"
              description="Tonalidade aplicada a palavras com **"
              value={typography.highlightColor || palette.accent}
              defaultValue={palette.accent}
              onChange={(hex) => onUpdateTypography({ highlightColor: hex })}
              onReset={() => onUpdateTypography({ highlightColor: palette.accent })}
            />
          </div>
        </div>
      </AccordionSection>
    </div>
  );
};
