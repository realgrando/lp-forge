"use client";

import React from "react";
import { cn, getRadiusClass } from "@/lib/utils";
import { ButtonConfig, SectionStyles, ThemeConfig } from "@/types/site";
import { DynamicIcon } from "./DynamicIcon";

export type ButtonContext = "default" | "header" | "hero" | "card" | "compact";

interface SmartButtonProps {
  button?: ButtonConfig;
  elementKey?: string;
  styles?: SectionStyles;
  theme: ThemeConfig;
  className?: string;
  context?: ButtonContext;
}

const DEFAULT_SIZE_CLASSES: Record<NonNullable<ButtonConfig["size"]>, string> = {
  sm: "px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm gap-2 font-semibold tracking-wide min-h-[42px]",
  md: "px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base gap-2.5 font-bold tracking-wide min-h-[50px]",
  lg: "px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg gap-3 font-extrabold tracking-tight min-h-[56px]",
  xl: "px-12 sm:px-18 py-5 sm:py-6 text-lg sm:text-xl gap-3.5 font-black tracking-tight min-h-[64px]",
};

const DEFAULT_ICON_SIZE_CLASSES: Record<NonNullable<ButtonConfig["size"]>, string> = {
  sm: "w-4 h-4 shrink-0",
  md: "w-[18px] h-[18px] shrink-0",
  lg: "w-5 h-5 shrink-0",
  xl: "w-6 h-6 shrink-0",
};

// Escala dimensional proporcional adaptada para Header / Navbar
// (Permite tamanhos L e XL com destaque visual sem estourar a altura nem vazar das laterais da barra)
const HEADER_SIZE_CLASSES: Record<NonNullable<ButtonConfig["size"]>, string> = {
  sm: "px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs gap-1.5 font-semibold tracking-normal min-h-[34px] sm:min-h-[36px]",
  md: "px-4.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm gap-2 font-bold tracking-normal min-h-[38px] sm:min-h-[40px]",
  lg: "px-5 sm:px-6 py-2 sm:py-2.5 text-sm gap-2 font-bold tracking-normal min-h-[42px] sm:min-h-[44px]",
  xl: "px-6 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base gap-2.5 font-extrabold tracking-tight min-h-[46px] sm:min-h-[48px]",
};

const HEADER_ICON_SIZE_CLASSES: Record<NonNullable<ButtonConfig["size"]>, string> = {
  sm: "w-3.5 h-3.5 shrink-0",
  md: "w-4 h-4 shrink-0",
  lg: "w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0",
  xl: "w-4.5 h-4.5 shrink-0",
};

/**
 * Auxiliar para converter cores hexadecimais em transparência (alpha) para efeitos de vidro e realce.
 */
function hexToAlpha(
  color: string | undefined,
  alphaHex: string,
  fallback: string
): string {
  if (!color) return fallback;
  const clean = color.trim();
  if (clean.startsWith("#") && (clean.length === 7 || clean.length === 9)) {
    return `${clean.slice(0, 7)}${alphaHex}`;
  }
  return fallback;
}

/**
 * Componente Universal de Botão Micro-Customizável (<SmartButton />).
 * Suporta:
 * - Opcionalidade individual (button.enabled + styles.hiddenElements[elementKey])
 * - Cores exclusivas por botão (customBg, customText, customBorderColor)
 * - 5 variantes visuais (solid, outline, glass, 3d, ghost) que respeitam cores customizadas sem perder a essência do estilo
 * - Escala dimensional generosa (sm, md, lg, xl) com foco em presença horizontal
 * - Opção de largura total (fullWidth)
 * - Ícone dinâmico com alinhamento pixel-perfect e tamanho proporcional
 * - Arredondamento próprio
 */
export const SmartButton: React.FC<SmartButtonProps> = ({
  button,
  elementKey,
  styles,
  theme,
  className,
  context = "default",
}) => {
  if (!button || !button.enabled) return null;
  if (elementKey && styles?.hiddenElements?.[elementKey]) return null;
  if (!button.text) return null;

  const isHeader = context === "header";
  const sizeMap = isHeader ? HEADER_SIZE_CLASSES : DEFAULT_SIZE_CLASSES;
  const iconSizeMap = isHeader ? HEADER_ICON_SIZE_CLASSES : DEFAULT_ICON_SIZE_CLASSES;

  const isSecondary = elementKey === "secondaryCta";
  const defaultBg = isSecondary
    ? (theme.palette.buttonSecondaryBg || "transparent")
    : (theme.palette.buttonPrimaryBg || styles?.customAccent || theme.palette.accent);
  const defaultText = isSecondary
    ? (theme.palette.buttonSecondaryText || theme.palette.foreground)
    : (theme.palette.buttonPrimaryText || "#09090B");

  const accentColor = styles?.customAccent || theme.palette.accent;
  const radius = button.radius || styles?.borderRadius || "md";
  const size = button.size || "md";
  const variant = button.variant || "solid";
  const iconPos = button.iconPosition || "right";
  const override = elementKey ? styles?.typographyOverrides?.[elementKey] : undefined;

  // Cálculo de cores e estilos baseados na variante + overrides micro do botão
  const getVariantStyle = (): React.CSSProperties => {
    const customBg = button.customBg || defaultBg;
    const customText = override?.color || button.customText || defaultText;
    const customBorder = button.customBorderColor;
    const baseColor = customBg || accentColor;

    // 1. SÓLIDO: preenchimento total opaco
    if (variant === "solid") {
      return {
        backgroundColor: baseColor,
        color: customText || defaultText,
        borderColor: customBorder || "transparent",
      };
    }

    // 2. 3D: bloco sólido com sombra de profundidade na base
    if (variant === "3d") {
      return {
        backgroundColor: baseColor,
        color: customText || "#09090B",
        borderColor: customBorder || "rgba(255,255,255,0.25)",
        boxShadow: `0 6px 0 0 rgba(0,0,0,0.45), 0 12px 24px -4px ${hexToAlpha(baseColor, "60", "rgba(0,0,0,0.3)")}`,
      };
    }

    // 3. OUTLINE (BORDA): fundo 100% transparente, contorno e texto coloridos
    if (variant === "outline") {
      const outlineColor = customBorder || baseColor;
      return {
        backgroundColor: "transparent",
        color: customText || outlineColor,
        borderColor: outlineColor,
      };
    }

    // 4. GLASSMORPHISM: fundo translúcido tingido, desfoque de fundo e borda translúcida
    if (variant === "glass") {
      const glassBg = customBg
        ? hexToAlpha(customBg, "25", "rgba(255,255,255,0.08)")
        : "rgba(255,255,255,0.08)";
      const glassBorder = customBorder
        ? customBorder
        : customBg
        ? hexToAlpha(customBg, "40", "rgba(255,255,255,0.18)")
        : "rgba(255,255,255,0.18)";
      return {
        backgroundColor: glassBg,
        color: customText || (customBg ? customBg : styles?.customText || theme.palette.foreground),
        borderColor: glassBorder,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
      };
    }

    // 5. GHOST: sem fundo, sem borda, apenas texto colorido
    return {
      backgroundColor: "transparent",
      color: customText || baseColor,
      borderColor: customBorder || "transparent",
    };
  };

  const rawUrl = button.url?.trim() || "#";
  const finalHref =
    rawUrl !== "#" &&
    !rawUrl.startsWith("#") &&
    !rawUrl.includes("/") &&
    !rawUrl.includes(":") &&
    !rawUrl.startsWith("mailto") &&
    !rawUrl.startsWith("tel")
      ? `#${rawUrl}`
      : rawUrl;

  return (
    <a
      href={finalHref}
      style={{
        ...getVariantStyle(),
        fontFamily: override?.fontFamily || undefined,
      }}
      className={cn(
        "inline-flex items-center justify-center font-bold transition-all duration-200 border text-center select-none",
        sizeMap[size],
        getRadiusClass(radius),
        button.fullWidth && "w-full",
        override?.fontWeight,
        override?.fontSize,
        override?.textTransform,
        override?.letterSpacing,
        variant === "solid" && "shadow-lg hover:opacity-95 hover:-translate-y-0.5",
        variant === "3d" && "hover:-translate-y-0.5 active:translate-y-0.5",
        variant === "outline" && "hover:bg-white/5",
        variant === "glass" && "backdrop-blur-md hover:bg-white/10 shadow-md",
        variant === "ghost" && "hover:bg-white/5",
        className
      )}
    >
      {iconPos === "left" && button.iconName && button.iconName !== "none" && (
        <span className="inline-flex items-center justify-center shrink-0">
          <DynamicIcon
            name={button.iconName}
            className={iconSizeMap[size]}
            strokeWidth={2.25}
          />
        </span>
      )}
      <span className="whitespace-nowrap leading-none flex items-center">{button.text}</span>
      {iconPos === "right" && button.iconName && button.iconName !== "none" && (
        <span className="inline-flex items-center justify-center shrink-0">
          <DynamicIcon
            name={button.iconName}
            className={iconSizeMap[size]}
            strokeWidth={2.25}
          />
        </span>
      )}
    </a>
  );
};
