"use client";

import React from "react";
import { cn } from "@/lib/utils";
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
  narrow: "w-full max-w-3xl",
  auto: "w-auto max-w-fit",
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

// Padding Lateral Horizontal (Respiro das bordas da tela)
const PADDING_X_MAP: Record<PaddingScale, string> = {
  none: "px-0",
  compact: "px-3 sm:px-6",
  normal: "px-4 sm:px-8 lg:px-12",
  spacious: "px-5 sm:px-12 lg:px-24",
};

// Largura Máxima da Seção (Container Pai)
const CONTAINER_MAX_WIDTH_CLASSES: Record<ContainerWidth, string> = {
  full: "w-full max-w-none",
  boxed: "w-full max-w-6xl",
  narrow: "w-full max-w-4xl",
  mobile: "w-full max-w-md",
};

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
  const isHero = section.type.startsWith("hero.");
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

  const bgColor = styles.customBg || "transparent";
  const textColor = styles.customText || theme.palette.foreground;
  const accentColor = styles.customAccent || theme.palette.accent;
  const glowColor = styles.glowColor || accentColor;

  // Motor de Gradiente de Fundo
  let backgroundStyle: string = bgColor;
  if (styles.bgGradientEnabled) {
    const fromColor = styles.bgGradientFrom || "#09090b";
    const toColor = styles.bgGradientTo || styles.customBg || "#18181b";
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

  const sectionDomId = section.anchorId?.trim().replace(/^#+/, "") || section.id;

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
          background: backgroundStyle,
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
        "relative transition-all duration-200 flex flex-col",
        layout.sticky ? "sticky top-0 z-40" : "overflow-hidden",
        rawContainer ? "py-0" : PADDING_OUTER_MAP[effectivePaddingY],
        MIN_HEIGHT_MAP[layout.minHeight || "auto"],
        CONTAINER_ALIGN_Y_MAP[effectiveAlignY],
        layout.hidden && isEditor && "opacity-40 grayscale",
        isEditor && "cursor-pointer group/section",
        isEditor &&
          (isSelected
            ? "ring-2 ring-[#F4B400] ring-inset z-20"
            : "hover:ring-1 hover:ring-[#F4B400]/50 hover:ring-inset")
      )}
    >
      {/* Âncora de backup para garantir que referências a section.id continuem funcionando */}
      {section.anchorId && section.anchorId.trim() !== section.id && (
        <span id={section.id} className="sr-only pointer-events-none" aria-hidden="true" />
      )}
      {/* Imagem de Fundo Global da Seção */}
      {styles.bgImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
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
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
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
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-25"
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
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "6px 6px",
          }}
        />
      )}

      {/* Divisores de Seção (Bordas Superior e Inferior) */}
      {styles.borderTop && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 z-10",
            styles.borderGlow
              ? "left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px]"
              : "inset-x-0 h-[1px] bg-white/10"
          )}
          style={
            styles.borderGlow
              ? {
                  backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                }
              : undefined
          }
        />
      )}
      {styles.borderBottom && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-0 z-10",
            styles.borderGlow
              ? "left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px]"
              : "inset-x-0 h-[1px] bg-white/10"
          )}
          style={
            styles.borderGlow
              ? {
                  backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                }
              : undefined
          }
        />
      )}

      {/* Luz Ambiente Suave (Ambient Glow) */}
      {styles.ambientGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full blur-[130px] opacity-20 z-0"
          style={{ backgroundColor: glowColor }}
        />
      )}

      {/* Barra Flutuante de Controle Rápido no Modo Editor */}
      {isEditor && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute top-3 right-3 z-50 flex items-center gap-1 rounded-xl bg-zinc-950/95 border border-white/10 px-2 py-1 shadow-xl backdrop-blur-md transition-opacity",
            isSelected
              ? "opacity-100"
              : "opacity-0 group-hover/section:opacity-100"
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
          rawContainer ? "px-0" : PADDING_X_MAP[effectivePaddingX],
          effectiveAlignY === "stretch" && "h-full flex-1",
          isEditor &&
            isSelected &&
            activeInspectorLayer === "parent" &&
            "outline-2 outline-dashed outline-sky-400 bg-sky-500/[0.02] rounded-xl"
        )}
      >
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
            "transition-all duration-200 flex relative",
            COMPONENT_WIDTH_MAP[effectiveComponentWidth],
            effectiveAlignX === "start"
              ? "mr-auto ml-0 justify-start"
              : effectiveAlignX === "end"
              ? "ml-auto mr-0 justify-end"
              : "mx-auto justify-center",
            effectiveAlignY === "stretch" && "h-full flex-1 flex flex-col",
            isEditor &&
              isSelected &&
              (activeInspectorLayer === "child" || !activeInspectorLayer) &&
              "outline-2 outline-dashed outline-[#F4B400] bg-[#F4B400]/[0.02] rounded-xl"
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
