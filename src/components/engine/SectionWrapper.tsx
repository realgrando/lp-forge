"use client";

import React from "react";
import { cn, getRadiusClass } from "@/lib/utils";
import {
  ComponentWidth,
  ContainerAlignX,
  ContainerAlignY,
  ContainerWidth,
  ContentMaxWidth,
  LayoutAlignItems,
  LayoutDistribution,
  LayoutGap,
  PaddingScale,
  SectionMinHeight,
  SectionNode,
  ThemeConfig,
} from "@/types/site";
import { ArrowUp, ArrowDown, Copy, Trash2, EyeOff, Sparkles, Box, Layers } from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";

interface SectionWrapperProps {
  section: SectionNode;
  theme: ThemeConfig;
  sectionName?: string;
  rawContainer?: boolean;
  isEditor?: boolean;
  isSelected?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isFirstAfterHeader?: boolean;
  headerOverlayEnabled?: boolean;
  onSelect?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onToggleVisibility?: () => void;
  children: React.ReactNode;
}

// Distribuição Flex / Alinhamento de Elementos no Container
export const DISTRIBUTION_MAP: Record<LayoutDistribution, string> = {
  between: "justify-between",
  center: "justify-center text-center items-center",
  start: "justify-start text-left items-start",
  end: "justify-end text-right items-end",
  around: "justify-around",
};

// Espaçamento entre Elementos (Gap)
export const GAP_MAP: Record<LayoutGap, string> = {
  none: "gap-0",
  compact: "gap-4 md:gap-6",
  normal: "gap-8 md:gap-10",
  spacious: "gap-12 md:gap-16",
  monumental: "gap-16 md:gap-24",
};

// Alinhamento Transversal (Align Items)
export const ALIGN_ITEMS_MAP: Record<LayoutAlignItems, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

// Altura Mínima da Seção (Min Height)
export const MIN_HEIGHT_MAP: Record<SectionMinHeight, string> = {
  auto: "min-h-0 flex flex-col",
  screen: "min-h-screen flex flex-col",
  large: "min-h-[75vh] flex flex-col",
  half: "min-h-[50vh] flex flex-col",
};

// Posição Horizontal do Componente dentro do Container Pai (Eixo X)
export const CONTAINER_ALIGN_X_MAP: Record<ContainerAlignX, string> = {
  start: "mr-auto ml-0 self-start justify-start",
  center: "mx-auto self-center justify-center",
  end: "ml-auto mr-0 self-end justify-end",
};

// Posição Vertical do Componente dentro do Container Pai (Eixo Y)
export const CONTAINER_ALIGN_Y_MAP: Record<ContainerAlignY, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "justify-between",
};

// Largura do Componente Filho (Meso-camada)
export const COMPONENT_WIDTH_MAP: Record<ComponentWidth, string> = {
  full: "w-full max-w-none",
  boxed: "w-full max-w-5xl",
  auto: "w-auto max-w-fit",
  narrow: "w-full max-w-3xl",
};

// Limite de Leitura de Texto (Content Max Width / Prosa — Camada Interna Independente)
export const CONTENT_MAX_WIDTH_MAP: Record<ContentMaxWidth, string> = {
  narrow: "w-full max-w-xl",
  medium: "w-full max-w-2xl",
  wide: "w-full max-w-4xl",
  full: "w-full max-w-none",
};

// Padding Externo Vertical (Afastamento da seção na página)
const PADDING_OUTER_MAP: Record<PaddingScale, string> = {
  none: "py-0",
  compact: "py-4 md:py-8",
  normal: "py-8 md:py-16",
  spacious: "py-12 md:py-24",
};

// Padding Interno Vertical (Respiro do conteúdo dentro do container)
const PADDING_INNER_MAP: Record<PaddingScale, string> = {
  none: "py-0",
  compact: "py-3 md:py-6",
  normal: "py-6 md:py-12",
  spacious: "py-10 md:py-20",
};

// Padding Lateral Horizontal (Respiro das bordas da tela) adaptativo conforme largura do container
export const getAdaptivePaddingXClass = (
  scale: PaddingScale = "normal",
  containerWidth: ContainerWidth = "full"
): string => {
  if (scale === "none") return "px-0";
  if (containerWidth === "mobile") {
    if (scale === "compact") return "px-3";
    if (scale === "normal") return "px-6";
    return "px-10";
  }
  if (containerWidth === "narrow") {
    if (scale === "compact") return "px-4 sm:px-6";
    if (scale === "normal") return "px-8 sm:px-10";
    return "px-12 sm:px-16";
  }
  if (containerWidth === "boxed") {
    if (scale === "compact") return "px-5 sm:px-8";
    if (scale === "normal") return "px-10 sm:px-14 md:px-16";
    return "px-14 sm:px-20 md:px-24";
  }
  // full
  if (scale === "compact") return "px-6 sm:px-10 md:px-12";
  if (scale === "normal") return "px-10 sm:px-16 md:px-24 lg:px-28";
  return "px-14 sm:px-24 md:px-36 lg:px-44 xl:px-48";
};

export const PADDING_X_MAP: Record<PaddingScale, string> = {
  none: "px-0",
  compact: "px-6 sm:px-10 md:px-12",
  normal: "px-10 sm:px-16 md:px-24 lg:px-28",
  spacious: "px-14 sm:px-24 md:px-36 lg:px-44 xl:px-48",
};

// Largura Máxima da Seção (Container Pai)
const CONTAINER_MAX_WIDTH_CLASSES: Record<ContainerWidth, string> = {
  full: "w-full max-w-none",
  boxed: "w-full max-w-6xl",
  narrow: "w-full max-w-4xl",
  mobile: "w-full max-w-md",
};

export function isColorTransparent(color?: string): boolean {
  if (!color) return true;
  const c = color.trim().toLowerCase();
  if (c === "transparent") return true;
  if (c.startsWith("#")) {
    const hex = c.slice(1);
    if (hex.length === 8 && hex.endsWith("00")) return true;
    if (hex.length === 4 && hex.endsWith("0")) return true;
  }
  if (
    (c.startsWith("rgba") && (c.includes(", 0)") || c.includes(",0)"))) ||
    c.includes(", 0.0)") ||
    c.includes(",0.0)")
  ) {
    return true;
  }
  return false;
}

/**
 * Invólucro Universal de Seção (Macro-camada).
 * Gerencia paddings, container width, cores de seção, luz ambiente (Ambient Glow)
 * e a barra de ações flutuante do Studio.
 */
export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  section,
  theme,
  sectionName,
  rawContainer = false,
  isEditor = false,
  isSelected = false,
  isFirst = false,
  isLast = false,
  isFirstAfterHeader = false,
  headerOverlayEnabled = true,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onToggleVisibility,
  children,
}) => {
  const { layout, styles } = section;
  const activeInspectorLayer = useStudioStore((s) => s.activeInspectorLayer);

  // Se estiver oculta e não estiver no modo editor, não renderiza nada
  if (layout.hidden && !isEditor) {
    return null;
  }

  const isHeader = section.type.startsWith("header.");
  const scrollVisibility =
    layout.scrollVisibility ||
    (layout.headerScrollBehavior === "static" || layout.sticky === false
      ? "static"
      : "fixed");
  const isSticky = isHeader ? scrollVisibility !== "static" : Boolean(layout.sticky);
  const isOverlayActive = isHeader
    ? layout.headerOverlay !== false
    : isFirstAfterHeader && headerOverlayEnabled;
  const isHero = section.type.startsWith("hero.");
  const hasBgImage = Boolean(styles.bgImage);
  // Respeita estritamente a escolha de containerWidth do designer no painel do Container Pai.
  // Apenas quando o container pai for configurado como "full", a cor de fundo, gradientes e imagens
  // preenchem a tela inteira (100vw). Quando for "boxed", "narrow" ou "mobile", o fundo é confinado
  // dentro da caixa do Container Pai, com parentRadiusClass e margens externas limpas.
  const effectiveContainerWidth: ContainerWidth =
    layout.containerWidth || (isHeader ? "full" : "boxed");
  const isFullWidth = effectiveContainerWidth === "full";
  const defaultPaddingY: PaddingScale = isHeader ? "none" : "normal";
  const effectivePaddingY = layout.paddingY || defaultPaddingY;

  // Respiro Lateral Horizontal Universal
  const effectivePaddingX: PaddingScale = layout.paddingX || "normal";

  // Macro-camada: Posicionamento do Componente no Container Pai (Eixos X e Y)
  const effectiveAlignX: ContainerAlignX = layout.containerAlignX || "center";
  const effectiveAlignY: ContainerAlignY = layout.containerAlignY || "center";

  // Meso-camada: Largura do Componente Filho
  const effectiveComponentWidth: ComponentWidth =
    layout.componentWidth || (section.type === "header.capsule" ? "auto" : "full");

  // Respiro Vertical Externo com compensação harmônica quando o Header sobrepõe o Hero
  const getOuterPaddingYClass = () => {
    if (rawContainer) return "py-0";
    if (isHeader) return "py-0";
    if (isFirstAfterHeader) {
      if (isOverlayActive) {
        if (effectivePaddingY === "none") return "pt-16 md:pt-20 pb-0";
        if (effectivePaddingY === "compact") return "pt-18 md:pt-22 pb-4 md:pb-6";
        if (effectivePaddingY === "normal") return "pt-20 md:pt-24 pb-8 md:pb-12";
        return "pt-24 md:pt-28 pb-12 md:pb-16";
      } else {
        // Quando o header NÃO sobrepõe o Hero (headerOverlay === false):
        // O header já é a borda visual superior, então o Hero só precisa de respiro suave
        if (effectivePaddingY === "none") return "pt-0 pb-0";
        if (effectivePaddingY === "compact") return "pt-3 md:pt-4 pb-4 md:pb-8";
        if (effectivePaddingY === "normal") return "pt-4 md:pt-6 pb-8 md:pb-16";
        return "pt-6 md:pt-10 pb-12 md:pb-24";
      }
    }
    return PADDING_OUTER_MAP[effectivePaddingY];
  };

  const isCustomBgTransparent = isColorTransparent(styles.customBg);
  const bgColor = isCustomBgTransparent ? "transparent" : (styles.customBg || "transparent");
  const textColor = styles.customText || theme.palette.foreground;
  const accentColor = styles.customAccent || theme.palette.accent;
  const glowColor = styles.glowColor || accentColor;

  // Motor de Gradiente de Fundo
  let backgroundStyle: string = bgColor;
  if (styles.bgGradientEnabled) {
    const fromColor = styles.bgGradientFrom || "#09090b";
    const toColor = styles.bgGradientTo || (isCustomBgTransparent ? "#18181b" : styles.customBg) || "#18181b";
    const dir = styles.bgGradientDirection || "to-b";
    if (dir === "radial") {
      backgroundStyle = `radial-gradient(circle at center, ${fromColor}, ${toColor})`;
    } else {
      const dirMap: Record<string, string> = {
        "to-b": "to bottom",
        "to-t": "to top",
        "to-r": "to right",
        "to-br": "to bottom right",
      };
      backgroundStyle = `linear-gradient(${dirMap[dir] || "to bottom"}, ${fromColor}, ${toColor})`;
    }
  }

  const hasVisibleBg =
    (!isCustomBgTransparent && Boolean(styles.customBg)) ||
    Boolean(styles.bgGradientEnabled) ||
    Boolean(styles.bgImage);

  const sectionDomId = section.anchorId?.trim().replace(/^#+/, "") || section.id;
  // O Container Pai agora possui seu próprio controle exclusivo de arredondamento
  // e NUNCA herda ou polui o borderRadius do Container Filho.
  const parentRadiusPreset = styles.parentBorderRadius || "none";
  const parentRadiusClass = getRadiusClass(parentRadiusPreset);
  const childRadiusPreset = styles.borderRadius || "none";
  const childRadiusClass = getRadiusClass(childRadiusPreset);

  // Hierarquia de Z-Index Estrita:
  // 1. Header selecionado no editor: z-50
  // 2. Header fixo / sticky / overlay ativo: z-40 (SEMPRE acima de qualquer Hero ou seção ao rolar)
  // 3. Seção comum selecionada no editor (Hero, etc.): z-30 (acima de outras seções z-10, mas SEMPRE abaixo do Header z-40)
  // 4. Seções comuns não selecionadas: z-10
  const getSectionZIndexClass = () => {
    if (isHeader) {
      if (isEditor && isSelected) {
        return "z-50";
      }
      return isSticky || isOverlayActive ? "z-40" : "z-30";
    }

    if (isEditor && isSelected) {
      return "z-30 shadow-2xl ring-2 ring-[#F4B400] ring-inset";
    }

    return "z-10";
  };

  // Afastamento vertical da tag <section> na página
  const getSectionPaddingClass = () => {
    if (isHeader) return "py-0";
    if (isFullWidth) {
      return getOuterPaddingYClass();
    }
    // Quando o container pai é contido (boxed, narrow, mobile):
    // A tag <section> fornece o respiro externo na página/body
    if (isFirstAfterHeader && isOverlayActive) {
      return "pt-0 pb-4 md:pb-8 px-3 sm:px-6";
    }
    if (isFirstAfterHeader && !isOverlayActive) {
      return "pt-2 md:pt-4 pb-4 md:pb-8 px-3 sm:px-6";
    }
    return "py-4 md:py-8 px-3 sm:px-6";
  };

  // Afastamento interno do Container Pai (quando não for full width, ele recebe o padding Y)
  const getParentContainerPaddingClass = () => {
    const pxClass = rawContainer
      ? "px-0"
      : getAdaptivePaddingXClass(effectivePaddingX, effectiveContainerWidth);
    if (isFullWidth) {
      return pxClass;
    }
    if (isHeader) {
      return pxClass; // Headers NEVER receive vertical padding on the container wrapper
    }
    // Para containers contidos, o respiro vertical configurado (paddingY) fica dentro do box colorido
    const pyClass = getOuterPaddingYClass();
    return cn(pxClass, pyClass);
  };

  // Renderizador centralizado de camadas visuais de fundo (imagem, padrões, divisores e luz ambiente)
  const renderBackgroundLayers = (isContained: boolean) => {
    const hasAnyBg =
      hasVisibleBg ||
      (styles.bgPattern && styles.bgPattern !== "none") ||
      Boolean(styles.ambientGlow);

    if (!hasAnyBg) return null;

    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0 overflow-hidden transition-all duration-300",
          isContained ? parentRadiusClass : "rounded-none",
          isContained && hasVisibleBg && "shadow-2xl shadow-black/25"
        )}
        style={isContained && hasVisibleBg ? { background: backgroundStyle } : undefined}
      >
        {/* Imagem de Fundo Global da Seção */}
        {styles.bgImage && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={styles.bgImage}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: (styles.bgOverlayOpacity ?? 70) / 100 }}
            />
          </div>
        )}

        {/* Padrões & Texturas de Fundo */}
        {styles.bgPattern === "grid" && (
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
            }}
          />
        )}
        {styles.bgPattern === "dots" && (
          <div
            className="absolute inset-0 z-0 opacity-25"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
            }}
          />
        )}
        {styles.bgPattern === "noise" && (
          <div
            className="absolute inset-0 z-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "6px 6px",
            }}
          />
        )}

        {/* Luz Ambiente Suave (Ambient Glow) Contida & Difusa */}
        {styles.ambientGlow && (
          <div className="absolute inset-x-0 top-0 h-[450px] overflow-hidden flex justify-center z-0">
            <div
              className="w-[620px] h-[320px] -mt-10 rounded-full blur-[140px] opacity-25"
              style={{ backgroundColor: glowColor }}
            />
          </div>
        )}
      </div>
    );
  };

  // Divisores de Seção (Bordas Superior e Inferior com Linha Base e Glow Neon Vibrante)
  const renderDividers = (isContained: boolean) => {
    if (!styles.borderTop && !styles.borderBottom) return null;

    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-20 overflow-hidden",
          isContained ? parentRadiusClass : "rounded-none"
        )}
      >
        {/* Divisor Superior (Top Divider) */}
        {styles.borderTop && (
          <div className="absolute top-0 inset-x-0 h-[2px]">
            {/* Linha base sutil em toda a extensão */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/15" />

            {/* Feixe e Brilho Glow (quando ativado) */}
            {styles.borderGlow && (
              <>
                {/* Aura Neon Difusa */}
                <div
                  className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[6px] blur-[3px] opacity-80"
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent 0%, ${accentColor} 25%, ${accentColor} 75%, transparent 100%)`,
                  }}
                />
                {/* Feixe Central Luminoso com Drop Shadow e Box Shadow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[1.5px]"
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent 0%, ${accentColor} 20%, ${accentColor} 80%, transparent 100%)`,
                    boxShadow: `0 0 10px 1px ${accentColor}, 0 0 20px 2px ${accentColor}`,
                  }}
                />
              </>
            )}
          </div>
        )}

        {/* Divisor Inferior (Bottom Divider) */}
        {styles.borderBottom && (
          <div className="absolute bottom-0 inset-x-0 h-[2px]">
            {/* Linha base sutil em toda a extensão */}
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/15" />

            {/* Feixe e Brilho Glow (quando ativado) */}
            {styles.borderGlow && (
              <>
                {/* Aura Neon Difusa */}
                <div
                  className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[6px] blur-[3px] opacity-80"
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent 0%, ${accentColor} 25%, ${accentColor} 75%, transparent 100%)`,
                  }}
                />
                {/* Feixe Central Luminoso com Drop Shadow e Box Shadow */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[1.5px]"
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent 0%, ${accentColor} 20%, ${accentColor} 80%, transparent 100%)`,
                    boxShadow: `0 0 10px 1px ${accentColor}, 0 0 20px 2px ${accentColor}`,
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id={sectionDomId}
      data-section-id={section.id}
      onClick={(e) => {
        if (isEditor && onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
      style={
        {
          background: isFullWidth && hasVisibleBg ? backgroundStyle : "transparent",
          color: textColor,
          "--site-accent": accentColor,
          "--site-primary": styles.customAccent || theme.palette.primary,
          "--site-secondary": theme.palette.secondary,
          "--site-surface": styles.customSurface || theme.palette.surface,
          "--site-border": styles.borderColor || theme.palette.border || theme.palette.secondary,
          "--site-muted": theme.palette.muted || "#A1A1AA",
          "--brand-primary": styles.customAccent || theme.palette.primary,
        } as React.CSSProperties
      }
      className={cn(
        "relative transition-all duration-300 flex flex-col",
        isHeader && isOverlayActive && "-mb-[4.5rem] md:-mb-[5rem] pointer-events-auto",
        isSticky && "sticky top-0",
        getSectionZIndexClass(),
        getSectionPaddingClass(),
        MIN_HEIGHT_MAP[layout.minHeight || "auto"],
        CONTAINER_ALIGN_Y_MAP[effectiveAlignY],
        layout.hidden && isEditor && "opacity-40 grayscale",
        isEditor && "cursor-pointer group/section",
        isEditor && !isSelected && "hover:ring-1 hover:ring-[#F4B400]/50 hover:ring-inset"
      )}
    >
      {/* Âncora de backup para garantir que referências a section.id continuem funcionando */}
      {section.anchorId && section.anchorId.trim() !== section.id && (
        <span id={section.id} className="sr-only pointer-events-none" aria-hidden="true" />
      )}

      {/* Camada de Fundo em Largura Total (quando o container pai for full) */}
      {isFullWidth && renderBackgroundLayers(false)}
      {/* Divisores de Seção em Largura Total (quando o container pai for full) */}
      {isFullWidth && renderDividers(false)}

      {/* Indicador Sutil de Hover no Modo Editor (Não obstrui o conteúdo nem botões) */}
      {isEditor && !isSelected && (
        <div className="absolute top-2 left-3 z-30 opacity-0 group-hover/section:opacity-100 transition-opacity pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-zinc-950/85 border border-white/10 text-[10px] font-mono text-[#F4B400] backdrop-blur-sm shadow-md">
            {sectionName || section.type}
          </span>
        </div>
      )}

      {/* Barra Flutuante de Controle Rápido no Modo Editor (Apenas na Seção Selecionada) */}
      {isEditor && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute z-50 flex items-center gap-1 rounded-xl bg-zinc-950/95 border border-white/15 px-2 py-1 shadow-2xl backdrop-blur-md transition-all duration-200",
            // Posicionamento inteligente para evitar colisão com Header em sobreposição
            isFirstAfterHeader && headerOverlayEnabled
              ? "top-24 md:top-28 right-3"
              : "top-3 right-3",
            isSelected
              ? "opacity-100 scale-100 pointer-events-auto ring-1 ring-[#F4B400]/40 shadow-black/80"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <span className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold text-[#F4B400] border-r border-white/10 mr-1">
            <Sparkles className="w-3 h-3" />
            {sectionName || section.type}
            {layout.hidden && (
              <span className="text-[10px] text-zinc-400">(Oculta)</span>
            )}
          </span>

          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            title="Mover para cima"
            className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            title="Mover para baixo"
            className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onToggleVisibility}
            title={layout.hidden ? "Mostrar seção" : "Ocultar seção"}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onDuplicate}
            title="Duplicar seção"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            title="Remover seção"
            className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Camada 1: Delimitador de Largura do Container Pai + Margens Laterais */}
      <div
        data-layer="section-container"
        className={cn(
          "w-full flex transition-all duration-200 relative z-10",
          CONTAINER_MAX_WIDTH_CLASSES[effectiveContainerWidth],
          CONTAINER_ALIGN_X_MAP[effectiveAlignX],
          getParentContainerPaddingClass(),
          effectiveAlignY === "stretch" && "h-full flex-1",
          !isFullWidth && parentRadiusClass,
          !isFullWidth && "overflow-hidden",
          isEditor &&
            isSelected &&
            activeInspectorLayer === "parent" &&
            cn(
              "outline-2 outline-dashed outline-sky-400",
              !isFullWidth ? parentRadiusClass : "rounded-none"
            )
        )}
      >
        {/* Camada de Fundo do Pai Contido (quando não for full-width) */}
        {!isFullWidth && renderBackgroundLayers(true)}
        {/* Divisores do Pai Contido (quando não for full-width) */}
        {!isFullWidth && renderDividers(true)}

        {isEditor && isSelected && activeInspectorLayer === "parent" && (
          <div className="absolute -top-3 left-3 z-50 px-2 py-0.5 rounded-full bg-sky-500 text-black text-[9px] font-bold shadow-lg uppercase tracking-wider flex items-center gap-1 pointer-events-none">
            <Box className="w-2.5 h-2.5" />
            <span>Container Pai ({effectiveContainerWidth.toUpperCase()})</span>
          </div>
        )}

        {/* Camada 2: Invólucro do Componente (Container Filho) */}
        <div
          data-layer="component-wrapper"
          className={cn(
            "transition-all duration-200 flex relative z-10",
            COMPONENT_WIDTH_MAP[effectiveComponentWidth],
            effectiveAlignX === "start"
              ? "mr-auto ml-0 justify-start"
              : effectiveAlignX === "end"
              ? "ml-auto mr-0 justify-end"
              : "mx-auto justify-center",
            effectiveAlignY === "stretch" && "h-full flex-1 flex flex-col",
            effectiveComponentWidth !== "full" && childRadiusClass,
            isEditor &&
              isSelected &&
              (activeInspectorLayer === "child" || !activeInspectorLayer) &&
              cn(
                "outline-2 outline-dashed outline-[#F4B400]",
                effectiveComponentWidth !== "full" ? childRadiusClass : "rounded-none"
              )
          )}
        >
          {isEditor && isSelected && (activeInspectorLayer === "child" || !activeInspectorLayer) && (
            <div className="absolute -top-3 left-3 z-50 px-2 py-0.5 rounded-full bg-[#F4B400] text-black text-[9px] font-bold shadow-lg uppercase tracking-wider flex items-center gap-1 pointer-events-none">
              <Layers className="w-2.5 h-2.5" />
              <span>Container Filho ({effectiveComponentWidth.toUpperCase()})</span>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
