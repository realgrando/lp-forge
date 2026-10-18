import React from "react";
import { SectionStyles, ThemeConfig } from "@/types/site";
import { cn } from "@/lib/utils";

const RADIUS_CLASS_MAP: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-lg",
  md: "rounded-2xl",
  lg: "rounded-3xl",
  full: "rounded-[2.5rem]",
};

export function getCardSurfaceProps(
  styles: SectionStyles,
  theme: ThemeConfig,
  options?: { isHighlighted?: boolean; accentColor?: string }
): { className: string; style: React.CSSProperties } {
  const surface = styles.surfaceVariant || theme.tokens.surfaceStyle || "glass";
  const radius = styles.borderRadius || theme.tokens.borderRadius || "md";
  const accent = options?.accentColor || styles.customAccent || theme.palette.accent;
  const surfaceBg = styles.customSurface || theme.palette.surface;

  const radiusClass = RADIUS_CLASS_MAP[radius] || "rounded-2xl";

  const borderWidthClass =
    styles.borderWidth === "0"
      ? "border-0"
      : styles.borderWidth === "2"
      ? "border-2"
      : "border";

  let variantClass = "bg-white/[0.03] backdrop-blur-md border-white/10";
  const inlineStyle: React.CSSProperties = {};

  if (surface === "solid") {
    variantClass = "border-white/10 shadow-lg";
    inlineStyle.backgroundColor = surfaceBg;
  } else if (surface === "glass") {
    variantClass = "bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-xl";
  } else if (surface === "bordered") {
    variantClass = "bg-transparent border-white/20";
  } else if (surface === "3d_floating") {
    variantClass =
      "bg-white/[0.04] backdrop-blur-md border-white/15 shadow-[0_14px_34px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-transform";
  } else if (surface === "neon") {
    variantClass = "bg-black/50 backdrop-blur-md";
    inlineStyle.borderColor = accent;
    inlineStyle.boxShadow = `0 0 28px ${accent}25`;
  }

  if (options?.isHighlighted) {
    inlineStyle.borderColor = accent;
    inlineStyle.boxShadow = `0 12px 35px -10px ${accent}35`;
  } else if (styles.borderColor) {
    inlineStyle.borderColor = styles.borderColor;
  }

  return {
    className: cn(radiusClass, borderWidthClass, variantClass),
    style: inlineStyle,
  };
}
