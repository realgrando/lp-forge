import React from "react";
import {
  BorderPosition,
  BorderRadiusPreset,
  CardHoverEffect,
  HeaderSurfaceType,
  SectionStyles,
  SurfaceBlur,
  SurfaceStyle,
  ThemeConfig,
} from "@/types/site";
import { cn, getRadiusClass } from "@/lib/utils";

/**
 * Converte qualquer cor (hex, rgb, rgba ou variável CSS) combinando com opacidade (0-100%).
 */
export function resolveColorWithOpacity(color: string, opacityPercent: number = 100): string {
  if (!color) return "";
  const normalized = color.trim();
  const clampedOpacity = Math.max(0, Math.min(100, Math.round(opacityPercent)));

  // Variável CSS ou tema: var(--site-accent), --site-accent
  if (normalized.startsWith("var(") || normalized.startsWith("--")) {
    const varName = normalized.startsWith("--") ? `var(${normalized})` : normalized;
    return clampedOpacity === 100
      ? varName
      : `color-mix(in srgb, ${varName} ${clampedOpacity}%, transparent)`;
  }

  // Hexadecimal (#RGB, #RGBA, #RRGGBB ou #RRGGBBAA)
  if (normalized.startsWith("#")) {
    const hex = normalized.slice(1);
    if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const hexAlpha = parseInt(hex.slice(6, 8), 16) / 255;
      const alpha = Number(((hexAlpha * clampedOpacity) / 100).toFixed(2));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      const hexAlpha = parseInt(hex[3] + hex[3], 16) / 255;
      const alpha = Number(((hexAlpha * clampedOpacity) / 100).toFixed(2));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (hex.length === 3 || hex.length === 6) {
      const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
      const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
      const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
      const alpha = Number((clampedOpacity / 100).toFixed(2));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  // RGB ou RGBA
  if (normalized.startsWith("rgb")) {
    const nums = normalized.match(/\d+(\.\d+)?/g);
    if (nums && nums.length >= 3) {
      const alpha = Number((clampedOpacity / 100).toFixed(2));
      return `rgba(${nums[0]}, ${nums[1]}, ${nums[2]}, ${alpha})`;
    }
  }

  // Fallback padrão
  return clampedOpacity === 100
    ? normalized
    : `color-mix(in srgb, ${normalized} ${clampedOpacity}%, transparent)`;
}

const BLUR_CLASS_MAP: Record<SurfaceBlur, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

const HOVER_CLASS_MAP: Record<CardHoverEffect, string> = {
  none: "",
  lift: "hover:-translate-y-1 hover:shadow-2xl transition-all duration-300",
  glow: "hover:shadow-[0_0_30px_-4px_var(--site-accent,rgba(244,180,0,0.35))] transition-shadow duration-300",
  border_highlight: "hover:border-white/40 transition-colors duration-300",
  shine: "hover:brightness-110 hover:bg-white/[0.04] transition-all duration-300",
};

export interface ResolveHeaderSurfaceParams {
  styles: SectionStyles;
  theme: ThemeConfig;
  activeSurfaceType: HeaderSurfaceType;
  isCapsuleActive?: boolean;
  isEdgeToEdge?: boolean;
  isTransparentActive?: boolean;
}

/**
 * Resolve classes e estilos CSS para cabeçalhos e barras de navegação com acabamento de alta precisão.
 * Garante 0px estrito quando borderWidth === "0" e customização total de cor, opacidade, blur e hover.
 */
export function resolveHeaderSurfaceStyle({
  styles,
  theme,
  activeSurfaceType,
  isCapsuleActive = false,
  isEdgeToEdge = false,
  isTransparentActive = false,
}: ResolveHeaderSurfaceParams): { className: string; style: React.CSSProperties } {
  // Se estado transparente está ativo
  if (isTransparentActive || activeSurfaceType === "transparent") {
    return {
      className: "bg-transparent border-0 border-transparent shadow-none",
      style: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderStyle: "none",
        borderColor: "transparent",
      },
    };
  }

  const inlineStyle: React.CSSProperties = {};
  const classList: string[] = [];

  // 1. Superfície Base (Fundo e Sombra de Elevação)
  switch (activeSurfaceType) {
    case "solid":
      classList.push("bg-zinc-950 shadow-md");
      break;
    case "glass":
      classList.push("bg-zinc-950/75 shadow-[0_8px_32px_rgba(0,0,0,0.37)]");
      break;
    case "bordered":
      classList.push("bg-zinc-950/40 shadow-sm");
      break;
    case "3d_floating":
      classList.push("bg-zinc-950 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)]");
      break;
    case "neon":
      classList.push("bg-zinc-950/90 shadow-[0_0_24px_-4px_var(--site-accent)]");
      break;
    default:
      classList.push("bg-zinc-950 shadow-md");
      break;
  }

  // 2. Desfoque de Fundo (Backdrop Blur)
  if (styles.surfaceBlur) {
    classList.push(BLUR_CLASS_MAP[styles.surfaceBlur] || "backdrop-blur-none");
  } else {
    // Defaults por estilo se não configurado explicitamente
    if (activeSurfaceType === "glass" || activeSurfaceType === "neon") {
      classList.push("backdrop-blur-xl");
    } else if (activeSurfaceType === "bordered") {
      classList.push("backdrop-blur-md");
    }
  }

  // 3. Efeito ao Passar o Mouse (Hover)
  if (styles.cardHoverEffect && HOVER_CLASS_MAP[styles.cardHoverEffect]) {
    classList.push(HOVER_CLASS_MAP[styles.cardHoverEffect]);
  }

  // 4. Cor e Opacidade da Superfície (Fundo)
  if (styles.cardBgImage) {
    const overlay =
      styles.cardBgOverlayOpacity !== undefined ? styles.cardBgOverlayOpacity / 100 : 0.6;
    inlineStyle.backgroundImage = `linear-gradient(rgba(0,0,0,${overlay}), rgba(0,0,0,${overlay})), url(${styles.cardBgImage})`;
    inlineStyle.backgroundSize = "cover";
    inlineStyle.backgroundPosition = "center";
  } else if (styles.cardGradientEnabled && (styles.cardGradientFrom || styles.cardGradientTo)) {
    const fromCol = styles.cardGradientFrom || "#09090b";
    const toCol = styles.cardGradientTo || styles.customSurface || "#18181b";
    const dir = styles.cardGradientDirection || "to-b";
    const dirMap: Record<string, string> = {
      "to-b": "to bottom",
      "to-t": "to top",
      "to-r": "to right",
      "to-br": "to bottom right",
    };
    if (dir === "radial") {
      inlineStyle.backgroundImage = `radial-gradient(circle at center, ${fromCol}, ${toCol})`;
    } else {
      inlineStyle.backgroundImage = `linear-gradient(${dirMap[dir] || "to bottom"}, ${fromCol}, ${toCol})`;
    }
  } else if (styles.customSurface) {
    if (styles.surfaceOpacity !== undefined) {
      inlineStyle.backgroundColor = resolveColorWithOpacity(
        styles.customSurface,
        styles.surfaceOpacity
      );
    } else {
      inlineStyle.backgroundColor = styles.customSurface;
    }
  } else if (styles.surfaceOpacity !== undefined) {
    inlineStyle.backgroundColor = resolveColorWithOpacity("#09090b", styles.surfaceOpacity);
  }

  // Padrão de Fundo do Card (Pattern Overlay)
  if (styles.cardPattern === "grid") {
    classList.push("bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:16px_16px]");
  } else if (styles.cardPattern === "dots") {
    classList.push("bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:12px_12px]");
  } else if (styles.cardPattern === "noise") {
    classList.push("bg-[radial-gradient(#ffffff0a_1px,transparent_0)] [background-size:6px_6px]");
  }

  // 5. Sistema de Bordas (Espessura, Posição, Cor, Opacidade)
  const isZeroBorder = styles.borderWidth === "0";

  if (isZeroBorder) {
    // 0 PIXELS: Remove qualquer borda visual de forma absoluta e incondicional
    classList.push("border-0 border-transparent");
    inlineStyle.borderWidth = 0;
    inlineStyle.borderTopWidth = 0;
    inlineStyle.borderBottomWidth = 0;
    inlineStyle.borderLeftWidth = 0;
    inlineStyle.borderRightWidth = 0;
    inlineStyle.borderStyle = "none";
    inlineStyle.borderColor = "transparent";
  } else {
    const rawBw = styles.borderWidth || "1";
    const bw = parseInt(rawBw, 10) || 1;

    // Determina a posição da borda
    const effectivePosition: BorderPosition =
      styles.borderPosition || (isCapsuleActive || !isEdgeToEdge ? "all" : "bottom");

    // Cor da borda
    let baseBorderColor = styles.borderColor;
    if (!baseBorderColor) {
      if (activeSurfaceType === "neon") {
        baseBorderColor = styles.customAccent || theme.palette.accent || "#F4B400";
      } else {
        baseBorderColor = "#ffffff";
      }
    }

    // Opacidade da borda (padrão sutil se branco e sem opacidade definida)
    const effectiveBorderOpacity =
      styles.borderOpacity !== undefined
        ? styles.borderOpacity
        : styles.borderColor
        ? 100
        : activeSurfaceType === "neon"
        ? 90
        : activeSurfaceType === "bordered"
        ? 20
        : 12;

    const finalBorderColor = resolveColorWithOpacity(baseBorderColor, effectiveBorderOpacity);

    if (effectivePosition === "bottom") {
      classList.push("border-b");
      inlineStyle.borderBottomWidth = `${bw}px`;
      inlineStyle.borderTopWidth = 0;
      inlineStyle.borderLeftWidth = 0;
      inlineStyle.borderRightWidth = 0;
      inlineStyle.borderStyle = "solid";
      inlineStyle.borderColor = finalBorderColor;
    } else if (effectivePosition === "top_bottom") {
      classList.push("border-y");
      inlineStyle.borderTopWidth = `${bw}px`;
      inlineStyle.borderBottomWidth = `${bw}px`;
      inlineStyle.borderLeftWidth = 0;
      inlineStyle.borderRightWidth = 0;
      inlineStyle.borderStyle = "solid";
      inlineStyle.borderColor = finalBorderColor;
    } else {
      classList.push("border");
      inlineStyle.borderWidth = `${bw}px`;
      inlineStyle.borderStyle = "solid";
      inlineStyle.borderColor = finalBorderColor;
    }
  }

  // 6. Luz Ambiente (Ambient Glow)
  if (styles.ambientGlow) {
    const glowCol = styles.glowColor || styles.customAccent || theme.palette.accent || "#F4B400";
    const glowRgba = resolveColorWithOpacity(glowCol, 40);
    const existingShadow = inlineStyle.boxShadow ? `${inlineStyle.boxShadow}, ` : "";
    inlineStyle.boxShadow = `${existingShadow}0 0 35px -6px ${glowRgba}`;
  }

  return {
    className: classList.join(" "),
    style: inlineStyle,
  };
}

/**
 * Propriedades para cards gerais do ecossistema
 */
export function getCardSurfaceProps(
  styles: SectionStyles,
  theme: ThemeConfig,
  options?: { isHighlighted?: boolean; accentColor?: string }
): { className: string; style: React.CSSProperties } {
  const surface = styles.surfaceVariant || theme.tokens.surfaceStyle || "glass";
  const radius = styles.borderRadius || theme.tokens.borderRadius || "md";
  const accent = options?.accentColor || styles.customAccent || theme.palette.accent;
  const radiusClass = getRadiusClass(radius);

  const { className: surfaceClass, style: surfaceStyle } = resolveHeaderSurfaceStyle({
    styles,
    theme,
    activeSurfaceType: surface,
    isCapsuleActive: false,
    isEdgeToEdge: false,
    isTransparentActive: false,
  });

  if (options?.isHighlighted) {
    surfaceStyle.borderColor = accent;
    surfaceStyle.boxShadow = `0 12px 35px -10px ${resolveColorWithOpacity(accent, 35)}`;
  }

  return {
    className: cn(radiusClass, surfaceClass),
    style: surfaceStyle,
  };
}
