"use client";

import React, { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorFieldRowProps {
  label: string;
  description?: string;
  value?: string;
  defaultValue: string;
  onChange: (hex: string) => void;
  onReset: () => void;
}

function hexToPercent(alphaHex: string): number {
  const val = parseInt(alphaHex, 16);
  if (isNaN(val)) return 100;
  return Math.round((val / 255) * 100);
}

function percentToHex(percent: number): string {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const val = Math.round((clamped / 100) * 255);
  return val.toString(16).padStart(2, "0").toUpperCase();
}

interface ParsedColor {
  baseHex: string;
  opacity: number;
}

function parseColorString(
  str?: string,
  defaultFallback: string = "#F4B400"
): ParsedColor {
  if (!str) return parseColorString(defaultFallback, "#F4B400");
  const s = str.trim();

  // 1. color-mix(in srgb, #HEX X%, transparent)
  const colorMixMatch = s.match(
    /color-mix\s*\(\s*in\s+srgb\s*,\s*(#[a-fA-F0-9]{3,8}|rgba?\([^)]+\))\s+(\d+)%\s*,\s*transparent\s*\)/i
  );
  if (colorMixMatch) {
    const inner = parseColorString(colorMixMatch[1], defaultFallback);
    return {
      baseHex: inner.baseHex,
      opacity: parseInt(colorMixMatch[2], 10),
    };
  }

  // 2. rgba(r, g, b, a)
  const rgbaMatch = s.match(
    /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i
  );
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10).toString(16).padStart(2, "0");
    const g = parseInt(rgbaMatch[2], 10).toString(16).padStart(2, "0");
    const b = parseInt(rgbaMatch[3], 10).toString(16).padStart(2, "0");
    const a =
      rgbaMatch[4] !== undefined
        ? Math.round(parseFloat(rgbaMatch[4]) * 100)
        : 100;
    return {
      baseHex: `#${r}${g}${b}`.toUpperCase(),
      opacity: Math.max(0, Math.min(100, a)),
    };
  }

  // 3. Hex formats
  if (s.startsWith("#")) {
    const hex = s.slice(1);
    // #RRGGBBAA
    if (hex.length === 8) {
      return {
        baseHex: `#${hex.slice(0, 6)}`.toUpperCase(),
        opacity: hexToPercent(hex.slice(6, 8)),
      };
    }
    // #RGBA
    if (hex.length === 4) {
      const r = hex[0] + hex[0];
      const g = hex[1] + hex[1];
      const b = hex[2] + hex[2];
      const a = hex[3] + hex[3];
      return {
        baseHex: `#${r}${g}${b}`.toUpperCase(),
        opacity: hexToPercent(a),
      };
    }
    // #RGB
    if (hex.length === 3) {
      const r = hex[0] + hex[0];
      const g = hex[1] + hex[1];
      const b = hex[2] + hex[2];
      return {
        baseHex: `#${r}${g}${b}`.toUpperCase(),
        opacity: 100,
      };
    }
    // #RRGGBB
    if (hex.length === 6) {
      return {
        baseHex: `#${hex}`.toUpperCase(),
        opacity: 100,
      };
    }
  }

  const safeFallback = defaultFallback.startsWith("#")
    ? defaultFallback.slice(0, 7).toUpperCase()
    : "#F4B400";
  return {
    baseHex: safeFallback,
    opacity: 100,
  };
}

function formatColor(baseHex: string, opacity: number): string {
  const cleanHex = baseHex.startsWith("#") ? baseHex.slice(0, 7) : `#${baseHex}`;
  if (opacity >= 100) {
    return cleanHex.toUpperCase();
  }
  const alphaHex = percentToHex(opacity);
  return `${cleanHex}${alphaHex}`.toUpperCase();
}

/**
 * Linha Universal de Seleção de Cor com Controle Total de Opacidade.
 * Suporta:
 * - Seletor visual nativo da cor base (#RRGGBB)
 * - Swatch dinâmico com padrão xadrez para visualização fiel de transparência
 * - Slider horizontal com gradiente ao vivo da cor selecionada (0% a 100%)
 * - Campo numérico direto para percentual de opacidade
 * - Chips de atalho rápido para 15% (Vidro/Badges), 50% (Médio) e 100% (Sólido)
 * - Emissão de cores 100% compatíveis com CSS (#RRGGBB ou #RRGGBBAA)
 */
export const ColorFieldRow: React.FC<ColorFieldRowProps> = ({
  label,
  description,
  value,
  defaultValue,
  onChange,
  onReset,
}) => {
  const isCustomized = Boolean(value);
  const currentColorString = value || defaultValue;

  const { baseHex, opacity } = useMemo(() => {
    return parseColorString(currentColorString, defaultValue || "#F4B400");
  }, [currentColorString, defaultValue]);

  const outputColor = useMemo(() => {
    return formatColor(baseHex, opacity);
  }, [baseHex, opacity]);

  const handleBaseHexChange = (newBaseHex: string) => {
    const formatted = formatColor(newBaseHex, opacity);
    onChange(formatted);
  };

  const handleOpacityChange = (newOpacity: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(newOpacity)));
    const formatted = formatColor(baseHex, clamped);
    onChange(formatted);
  };

  return (
    <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/10 transition-all space-y-2.5">
      {/* Linha Superior: Nome do Campo, Swatch Visual Transparente, Código Hex e Botão Reset */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-zinc-200">
            {label}
          </span>
          {description && (
            <span className="block text-[11px] text-zinc-400 truncate">
              {description}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Swatch com padrão xadrez de transparência de fundo */}
          <div
            className="relative w-7 h-7 rounded-lg overflow-hidden border border-white/20 shrink-0 shadow-sm cursor-pointer group"
            title="Clique para escolher a cor base"
          >
            {/* Padrão xadrez para demarcar opacidade */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #27272a 75%), linear-gradient(-45deg, transparent 75%, #27272a 75%)",
                backgroundSize: "6px 6px",
                backgroundPosition: "0 0, 0 3px, 3px -3px, -3px 0",
              }}
            />
            {/* Cor real combinada com a opacidade */}
            <div
              className="absolute inset-0 transition-colors"
              style={{ backgroundColor: outputColor }}
            />
            {/* Input nativo invisível para clique direto no swatch */}
            <input
              type="color"
              value={baseHex}
              onChange={(e) => handleBaseHexChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>

          {/* Código Hex com indicação de canal alfa */}
          <span className="text-[11px] font-mono text-zinc-300 uppercase px-2 py-1 rounded-lg bg-zinc-900 border border-white/10 select-all">
            {outputColor}
          </span>

          {/* Botão de restauração para o padrão */}
          {isCustomized && (
            <button
              type="button"
              onClick={onReset}
              title="Restaurar cor padrão"
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Linha Inferior: Controle Fino de Opacidade (Slider Gradiente + Presets + Input Numérico) */}
      <div className="flex items-center gap-2 pt-1 border-t border-white/5">
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider shrink-0 w-16">
          Opacidade
        </span>

        {/* Barra deslizante (Slider) com prévia do gradiente da cor base */}
        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-800 accent-[#F4B400]"
            style={{
              background: `linear-gradient(to right, transparent, ${baseHex})`,
            }}
          />
        </div>

        {/* Input Numérico da porcentagem */}
        <div className="flex items-center gap-0.5 shrink-0 px-2 py-0.5 rounded-lg bg-zinc-900 border border-white/10">
          <input
            type="number"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val)) handleOpacityChange(val);
            }}
            className="w-7 bg-transparent text-[11px] font-mono text-right text-zinc-200 focus:outline-none"
          />
          <span className="text-[10px] text-zinc-500 font-mono">%</span>
        </div>

        {/* Botões de Atalho Rápido de Opacidade */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => handleOpacityChange(15)}
            title="15% (Efeito Vidro / Badge Translúcida)"
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors",
              opacity === 15
                ? "bg-[#F4B400]/20 text-[#F4B400] font-bold"
                : "bg-white/5 text-zinc-400 hover:text-white"
            )}
          >
            15%
          </button>
          <button
            type="button"
            onClick={() => handleOpacityChange(50)}
            title="50% (Médio)"
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors",
              opacity === 50
                ? "bg-[#F4B400]/20 text-[#F4B400] font-bold"
                : "bg-white/5 text-zinc-400 hover:text-white"
            )}
          >
            50%
          </button>
          <button
            type="button"
            onClick={() => handleOpacityChange(100)}
            title="100% (Sólido Total)"
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors",
              opacity === 100
                ? "bg-[#F4B400]/20 text-[#F4B400] font-bold"
                : "bg-white/5 text-zinc-400 hover:text-white"
            )}
          >
            100%
          </button>
        </div>
      </div>
    </div>
  );
};
