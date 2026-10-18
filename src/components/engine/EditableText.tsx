"use client";

import React from "react";
import { cn, getRadiusClass } from "@/lib/utils";
import {
  SectionStyles,
  TextHighlightStyle,
  TextMaxWidth,
  TypographyOverride,
} from "@/types/site";
import { DynamicIcon } from "./DynamicIcon";

interface EditableTextProps {
  value?: string;
  elementKey?: string;
  styles?: SectionStyles;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  defaultIsHeading?: boolean;
  isBadge?: boolean;
  defaultIconName?: string;
  accentColor?: string;
}

const FONT_SIZE_REGEX =
  /^(?:[a-z0-9]+:)?text-(?:(?:xs|sm|base|lg|xl|[2-9]xl|\d+xl)|\[\d+[^\]]*\])(?:\/[a-zA-Z0-9_.-]+|\/\[[^\]]+\])?$/;
const FONT_WEIGHT_REGEX =
  /^(?:[a-z0-9]+:)?font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\[\d+\])$/;
const TEXT_TRANSFORM_REGEX =
  /^(?:[a-z0-9]+:)?(?:uppercase|lowercase|capitalize|normal-case)$/;
const TRACKING_REGEX =
  /^(?:[a-z0-9]+:)?tracking-(?:tighter|tight|normal|wide|wider|widest|\[[^\]]+\])$/;
const MAX_WIDTH_REGEX =
  /^(?:[a-z0-9]+:)?max-w-(?:xs|sm|md|lg|xl|[2-7]xl|full|prose|none|screen-[a-z0-9]+|\[\d+[^\]]*\])$/;

export const TEXT_MAX_WIDTH_CLASSES: Record<TextMaxWidth, string> = {
  narrow: "max-w-xl", // ~576px - leitura ágil / 2-3 linhas
  medium: "max-w-3xl", // ~768px - subtítulos e parágrafos médios
  wide: "max-w-5xl", // ~1024px - títulos e manchetes amplas
  full: "max-w-full", // 100% - sem restrição artificial
};

/**
 * Remove classes da classe padrão do componente que entrariam em conflito com
 * os overrides explícitos selecionados pelo designer (ex: text-4xl sm:text-6xl lg:text-7xl).
 */
function filterConflictingClasses(
  className?: string,
  options?: {
    hasFontSize?: boolean;
    hasFontWeight?: boolean;
    hasTextTransform?: boolean;
    hasLetterSpacing?: boolean;
    hasMaxWidth?: boolean;
  }
): string {
  if (!className) return "";
  return className
    .split(/\s+/)
    .filter((cls) => {
      if (!cls) return false;
      if (options?.hasFontSize && FONT_SIZE_REGEX.test(cls)) return false;
      if (options?.hasFontWeight && FONT_WEIGHT_REGEX.test(cls)) return false;
      if (options?.hasTextTransform && TEXT_TRANSFORM_REGEX.test(cls)) return false;
      if (options?.hasLetterSpacing && TRACKING_REGEX.test(cls)) return false;
      if (options?.hasMaxWidth && MAX_WIDTH_REGEX.test(cls)) return false;
      return true;
    })
    .join(" ");
}

/**
 * Renderizador inteligente de destaques textuais (Highlights).
 * Processa marcações como **palavra** ou *palavra* aplicando
 * estilos selecionados (cor de destaque, degradê radiante, brilho neon, sublinhado ou tarja marca-texto).
 * Garante que a fonte, peso e proporções do texto pai sejam 100% preservados.
 */
function renderHighlightedText(
  text: string,
  style: TextHighlightStyle = "accent",
  customColor?: string,
  accentColor?: string
): React.ReactNode {
  if (!text) return null;
  const resolvedColor = customColor || accentColor || "var(--site-accent)";

  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    const isDoubleStar =
      part.startsWith("**") && part.endsWith("**") && part.length > 4;
    const isSingleStar =
      part.startsWith("*") && part.endsWith("*") && part.length > 2;

    if (!isDoubleStar && !isSingleStar) {
      return part;
    }

    const content = isDoubleStar ? part.slice(2, -2) : part.slice(1, -1);

    if (style === "gradient") {
      return (
        <span
          key={index}
          className="bg-clip-text text-transparent inline transition-all"
          style={{
            backgroundImage: `linear-gradient(135deg, ${resolvedColor} 0%, #FFFFFF 50%, ${resolvedColor} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
          }}
        >
          {content}
        </span>
      );
    }

    if (style === "glow") {
      return (
        <span
          key={index}
          className="inline transition-all"
          style={{
            color: resolvedColor,
            textShadow: `0 0 16px ${resolvedColor}80, 0 0 32px ${resolvedColor}40`,
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
          }}
        >
          {content}
        </span>
      );
    }

    if (style === "underline") {
      return (
        <span
          key={index}
          className="underline underline-offset-[6px] decoration-wavy decoration-2 inline transition-all"
          style={{
            color: resolvedColor,
            textDecorationColor: resolvedColor,
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
          }}
        >
          {content}
        </span>
      );
    }

    if (style === "marker") {
      const isHex7 =
        resolvedColor.startsWith("#") && resolvedColor.length === 7;
      return (
        <span
          key={index}
          className="inline px-1.5 py-0.5 rounded-md border mx-0.5 transition-all align-baseline"
          style={{
            backgroundColor: isHex7 ? `${resolvedColor}25` : resolvedColor,
            borderColor: isHex7 ? `${resolvedColor}50` : undefined,
            color: resolvedColor,
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
          }}
        >
          {content}
        </span>
      );
    }

    // Padrão: Cor de Destaque pura
    return (
      <span
        key={index}
        className="inline transition-colors"
        style={{
          color: resolvedColor,
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontSize: "inherit",
          letterSpacing: "inherit",
        }}
      >
        {content}
      </span>
    );
  });
}

/**
 * Componente inteligente de Tipografia e Badges (Micro-camada).
 * - Respeita a Opcionalidade Global: se styles.hiddenElements[elementKey] for true, não renderiza nada.
 * - Prioridade estrita de classes: overrides do designer vencem qualquer classe padrão do componente.
 * - Suporta transformação de caixa de texto (Camel, ALTA, baixa, Custom).
 * - Suporte nativo a Highlights via marcação markdown (**texto**).
 */
export const EditableText: React.FC<EditableTextProps> = ({
  value,
  elementKey,
  styles,
  as: Tag = "p",
  className,
  defaultIsHeading = false,
  isBadge = false,
  defaultIconName,
  accentColor,
}) => {
  if (!value) return null;
  if (elementKey && styles?.hiddenElements?.[elementKey]) return null;

  const override: TypographyOverride | undefined =
    elementKey && styles?.typographyOverrides?.[elementKey]
      ? styles.typographyOverrides[elementKey]
      : undefined;

  const fontFamily =
    override?.fontFamily ||
    (defaultIsHeading ? "var(--site-font-heading)" : "var(--site-font-body)");

  const iconToRender =
    override?.iconName !== undefined ? override.iconName : defaultIconName;

  if (isBadge) {
    const resolvedAccent = accentColor || "var(--site-accent)";
    const textColor = override?.color || "var(--site-badge-text, var(--site-accent))";
    const bgColor =
      override?.bgColor ||
      "var(--site-badge-bg, color-mix(in srgb, var(--site-accent) 14%, transparent))";
    const borderColor =
      override?.borderColor ||
      "var(--site-border, color-mix(in srgb, var(--site-accent) 35%, transparent))";

    const effectiveTransform = override?.textTransform || "uppercase";
    const maxWidthClass = override?.maxWidth
      ? TEXT_MAX_WIDTH_CLASSES[override.maxWidth]
      : undefined;

    const filteredClassName = filterConflictingClasses(className, {
      hasFontSize: Boolean(override?.fontSize),
      hasFontWeight: Boolean(override?.fontWeight),
      hasTextTransform: Boolean(override?.textTransform),
      hasLetterSpacing: Boolean(override?.letterSpacing),
      hasMaxWidth: Boolean(override?.maxWidth),
    });

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1.5 border tracking-widest",
          getRadiusClass("full"),
          filteredClassName,
          maxWidthClass,
          effectiveTransform,
          override?.fontSize || "text-xs",
          override?.fontWeight || "font-bold",
          override?.letterSpacing
        )}
        style={{
          fontFamily,
          color: textColor,
          backgroundColor: bgColor,
          borderColor,
        }}
      >
        {iconToRender && iconToRender !== "none" && (
          <DynamicIcon name={iconToRender} className="w-3.5 h-3.5 shrink-0" />
        )}
        <span>
          {renderHighlightedText(
            value,
            override?.highlightStyle || "accent",
            override?.highlightColor,
            accentColor
          )}
        </span>
      </div>
    );
  }

  const maxWidthClass = override?.maxWidth
    ? TEXT_MAX_WIDTH_CLASSES[override.maxWidth]
    : undefined;

  const filteredClassName = filterConflictingClasses(className, {
    hasFontSize: Boolean(override?.fontSize),
    hasFontWeight: Boolean(override?.fontWeight),
    hasTextTransform: Boolean(override?.textTransform),
    hasLetterSpacing: Boolean(override?.letterSpacing),
    hasMaxWidth: Boolean(override?.maxWidth),
  });

  return (
    <Tag
      className={cn(
        filteredClassName,
        maxWidthClass,
        override?.fontSize,
        override?.fontWeight,
        override?.letterSpacing,
        override?.textTransform
      )}
      style={{
        fontFamily,
        color:
          override?.color ||
          styles?.customText ||
          (elementKey === "subtitle" || elementKey === "description"
            ? "var(--site-muted)"
            : undefined),
      }}
    >
      {iconToRender && iconToRender !== "none" && (
        <DynamicIcon
          name={iconToRender}
          className="inline-block w-4 h-4 mr-1.5 -mt-0.5"
        />
      )}
      {renderHighlightedText(
        value,
        override?.highlightStyle || "accent",
        override?.highlightColor || "var(--site-highlight-color, var(--site-accent))",
        accentColor
      )}
    </Tag>
  );
};
