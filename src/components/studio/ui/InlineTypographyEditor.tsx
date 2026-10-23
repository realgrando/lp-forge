"use client";

import React, { useState } from "react";
import { ChevronDown, RotateCcw, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypographyOverride } from "@/types/site";
import { GOOGLE_FONTS_CATALOG, FONT_SIZE_GROUPS } from "@/config/presets";
import { ColorFieldRow } from "./ColorFieldRow";
import { SegmentedControl } from "./SegmentedControl";

interface InlineTypographyEditorProps {
  elementKey: string;
  label?: string;
  override?: TypographyOverride;
  onChange: (patch: Partial<TypographyOverride>) => void;
  onReset?: () => void;
  defaultAccentColor: string;
  defaultOpen?: boolean;
}

export const InlineTypographyEditor: React.FC<InlineTypographyEditorProps> = ({
  elementKey,
  label = "Tipografia & Estilo",
  override = {},
  onChange,
  onReset,
  defaultAccentColor,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const hasCustomSettings = Boolean(
    override.fontFamily ||
      override.fontSize ||
      override.fontWeight ||
      override.color ||
      override.letterSpacing ||
      override.textTransform
  );

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReset) {
      onReset();
    } else {
      onChange({
        fontFamily: undefined,
        fontSize: undefined,
        fontWeight: undefined,
        letterSpacing: undefined,
        textTransform: undefined,
        color: undefined,
      });
    }
  };

  return (
    <div className="rounded-xl border border-white/5 bg-zinc-950/40 overflow-hidden transition-all duration-200">
      {/* Barra de acionamento retrátil */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 flex items-center justify-between cursor-pointer select-none hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors",
              hasCustomSettings
                ? "bg-[#F4B400]/15 text-[#F4B400]"
                : "bg-white/5 text-zinc-400"
            )}
          >
            <Type className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-semibold text-zinc-300 truncate">
            {label}
          </span>
          {hasCustomSettings && (
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-[#F4B400]/10 text-[#F4B400] font-semibold">
              Personalizado
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-1.5 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {hasCustomSettings && (
            <button
              type="button"
              onClick={handleReset}
              title="Restaurar padrão do tema"
              className="text-[10px] text-[#F4B400] hover:text-[#F4B400]/80 font-medium flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Restaurar</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform duration-200 text-zinc-400",
                isOpen && "rotate-180 text-white"
              )}
            />
          </button>
        </div>
      </div>

      {/* Painel expandido de controles de tipografia */}
      {isOpen && (
        <div className="p-3.5 border-t border-white/5 space-y-3 bg-zinc-950/70 animate-in fade-in duration-150">
          {/* Família da Fonte */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 block">
              Família da Fonte
            </label>
            <select
              value={override.fontFamily || ""}
              onChange={(e) =>
                onChange({
                  fontFamily: e.target.value || undefined,
                })
              }
              className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
            >
              <option value="">Herdar do Tema Global</option>
              {GOOGLE_FONTS_CATALOG.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tamanho e Peso */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-400 block">
                Tamanho da Escala
              </label>
              <select
                value={override.fontSize || ""}
                onChange={(e) =>
                  onChange({
                    fontSize: e.target.value || undefined,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
              >
                <option value="">Padrão da Seção</option>
                {FONT_SIZE_GROUPS.map((grp) => (
                  <optgroup
                    key={grp.group}
                    label={grp.group}
                    className="bg-zinc-900 font-semibold text-zinc-400"
                  >
                    {grp.options.map((sz) => (
                      <option
                        key={sz.value}
                        value={sz.value}
                        className="bg-zinc-950 text-white font-normal"
                      >
                        {sz.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-400 block">
                Peso (Weight)
              </label>
              <select
                value={override.fontWeight || ""}
                onChange={(e) =>
                  onChange({
                    fontWeight: (e.target.value as any) || undefined,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
              >
                <option value="">Padrão da Seção</option>
                <option value="font-light">Fina (300)</option>
                <option value="font-normal">Normal (400)</option>
                <option value="font-medium">Média (500)</option>
                <option value="font-semibold">Semi-Negrito (600)</option>
                <option value="font-bold">Negrito (700)</option>
                <option value="font-extrabold">ExtraBold (800)</option>
                <option value="font-black">Black (900)</option>
              </select>
            </div>
          </div>

          {/* Transformação de Texto (Maiúsculas / Minúsculas) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 block">
              Caixa / Transformação
            </label>
            <SegmentedControl<"default" | "normal-case" | "uppercase" | "capitalize" | "lowercase">
              value={override.textTransform || "default"}
              onChange={(val) =>
                onChange({
                  textTransform: val === "default" ? undefined : val,
                })
              }
              columns={5}
              size="sm"
              options={[
                { value: "default", label: "Auto" },
                { value: "uppercase", label: "AA" },
                { value: "capitalize", label: "Aa" },
                { value: "lowercase", label: "aa" },
                { value: "normal-case", label: "Normal" },
              ]}
            />
          </div>

          {/* Espaçamento entre Letras (Tracking) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 block">
              Espaçamento (Tracking)
            </label>
            <SegmentedControl<"default" | "tracking-tighter" | "tracking-tight" | "tracking-normal" | "tracking-wide" | "tracking-widest">
              value={override.letterSpacing || "default"}
              onChange={(val) =>
                onChange({
                  letterSpacing: val === "default" ? undefined : val,
                })
              }
              columns={6}
              size="sm"
              options={[
                { value: "default", label: "Auto" },
                { value: "tracking-tighter", label: "-2" },
                { value: "tracking-tight", label: "-1" },
                { value: "tracking-normal", label: "0" },
                { value: "tracking-wide", label: "+1" },
                { value: "tracking-widest", label: "+2" },
              ]}
            />
          </div>

          {/* Cor do Texto deste Elemento */}
          <ColorFieldRow
            label="Cor do Texto"
            description="Cor direta aplicada a este elemento"
            value={override.color}
            defaultValue={defaultAccentColor}
            onChange={(hex) =>
              onChange({
                color: hex,
              })
            }
            onReset={() =>
              onChange({
                color: undefined,
              })
            }
          />
        </div>
      )}
    </div>
  );
};
