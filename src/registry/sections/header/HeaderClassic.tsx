"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Menu, X } from "lucide-react";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import {
  buttonConfigSchema,
  ContentMaxWidth,
  HeaderSurfaceType,
  LayoutAlignItems,
  LayoutGap,
} from "@/types/site";
import {
  cn,
  getHeaderSurfaceClasses,
  getLogoRadiusClass,
  getRadiusClass,
  getSurfaceClasses,
} from "@/lib/utils";
import { resolveHeaderSurfaceStyle } from "@/lib/surfaceStyles";
import { useStudioStore } from "@/store/useStudioStore";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

const headerClassicSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
  logoImageRadius: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
  brandIcon: z.string().optional(),
  justify: z.enum(["between", "center", "start"]).default("between"),
  navLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type HeaderClassicContent = z.infer<typeof headerClassicSchema>;

export const HeaderClassicSection = createSection<HeaderClassicContent>({
  id: "header.classic",
  name: "Header Classic Simple",
  description:
    "Cabeçalho clássico minimalista com marca em texto ou imagem, links de navegação com alinhamento configurável e botão CTA.",
  category: "Header",
  iconName: "LayoutTemplate",
  modes: ["LANDING_PAGE"],
  legacyType: "header",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "brand", label: "Logo / Nome da Marca" },
    { key: "logoImageUrl", label: "Imagem da Logo" },
    { key: "navLinks", label: "Menu de Navegação" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: headerClassicSchema,
  fields: [
    {
      key: "brandName",
      label: "Nome da Marca (Logo Texto)",
      type: "text",
      optionalKey: "brand",
      typographyElementKey: "brandName",
    },
    {
      key: "logoImageUrl",
      label: "URL da Imagem da Logo (Opcional)",
      type: "image",
      optionalKey: "logoImageUrl",
      placeholder: "https://...",
      hasRadiusControl: true,
      radiusKey: "logoImageRadius",
      radiusLabel: "Arredondamento da Logo",
    },
    {
      key: "brandIcon",
      label: "Ícone da Marca (Opcional)",
      type: "icon",
      optionalKey: "brand",
    },
    {
      key: "navLinks",
      label: "Links de Navegação",
      type: "array",
      optionalKey: "navLinks",
      typographyElementKey: "navLinks",
      defaultNewItem: { label: "Nova Seção", url: "#secao" },
      itemFields: [
        { key: "label", label: "Texto do Link", type: "text" },
        { key: "url", label: "URL ou #Âncora", type: "url" },
      ],
    },
    {
      key: "ctaButton",
      label: "Botão de Chamada (CTA)",
      type: "button",
      optionalKey: "ctaButton",
      typographyElementKey: "ctaButton",
    },
  ],
  defaultData: {
    layout: {
      containerWidth: "full",
      containerAlignX: "center",
      containerAlignY: "center",
      minHeight: "auto",
      paddingY: "none",
      paddingX: "none",
      sticky: true,
      componentWidth: "full",
      direction: "row",
      reverse: false,
      paddingInner: "normal",
      paddingInnerX: "spacious",
      distribution: "between",
      alignItems: "center",
      gap: "normal",
      contentMaxWidth: "full",
    },
    styles: {
      surfaceVariant: "solid",
      borderRadius: "none",
      borderWidth: "1",
      ambientGlow: false,
      bgGradientEnabled: false,
      hiddenElements: {},
    },
    content: {
      brandName: "NIVIX",
      logoImageUrl: "",
      logoImageRadius: "none",
      brandIcon: "Sparkles",
      justify: "between",
      navLinks: [
        { label: "Resultados", url: "#depoimentos" },
        { label: "Ecossistema", url: "#ecossistema" },
        { label: "Planos", url: "#planos" },
        { label: "Sobre nós", url: "#time" },
        { label: "Dúvidas", url: "#faq" },
      ],
      ctaButton: {
        enabled: true,
        text: "Contrate",
        url: "#contato",
        variant: "solid",
        size: "sm",
        radius: "sm",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isEdgeToEdge =
      (layout?.containerWidth || "full") === "full" &&
      (layout?.componentWidth || "full") === "full";
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);
    const hasNavLinks =
      !isHidden("navLinks") &&
      Boolean(content.navLinks && content.navLinks.length > 0);
    const hasCta =
      !isHidden("ctaButton") && Boolean(content.ctaButton?.enabled);
    const hasMobileMenu = hasNavLinks;
    const viewport = useStudioStore((s) => s.viewport);
    const isMobileLayout = layout?.containerWidth === "mobile" || viewport === "mobile";
    const isNarrowWidth = layout?.containerWidth === "narrow" || layout?.componentWidth === "narrow";
    const isBoxedWidth = layout?.containerWidth === "boxed" || layout?.componentWidth === "boxed";

    // Resolução combinável de Comportamento de Rolagem
    const scrollVisibility =
      layout?.scrollVisibility ||
      (layout?.headerScrollBehavior === "static" || layout?.sticky === false
        ? "static"
        : "fixed");
    const scrollSurface =
      layout?.scrollSurface ||
      (layout?.headerScrollBehavior === "blur_on_scroll"
        ? "transparent_to_glass"
        : layout?.headerScrollBehavior === "solid_on_scroll"
        ? "transparent_to_solid"
        : "keep");
    const scrollShape = layout?.scrollShape || "keep";

    const { isScrolled, isVisible, isScrollingUp, currentScroll } = useHeaderScroll(
      scrollVisibility,
      layout?.sticky !== false
    );

    const direction = layout?.direction || "row";
    const isCol = direction === "col";
    const isResponsive = direction === "responsive";
    const isStretchY = layout?.containerAlignY === "stretch";

    // Respiro Interno Vertical do Header (controla a espessura e altura da barra sem mover o container por fora)
    const innerYClasses: Record<string, string> = isCol
      ? {
          none: "py-2 min-h-[160px]",
          compact: "py-3 min-h-[220px]",
          normal: "py-5 min-h-[300px]",
          spacious: "py-8 min-h-[420px]",
        }
      : isResponsive
      ? {
          none: "py-2 min-h-[160px] md:min-h-[48px] md:py-1.5",
          compact: "py-3 min-h-[220px] md:min-h-[68px] md:py-3",
          normal: "py-5 min-h-[300px] md:min-h-[84px] md:py-5",
          spacious: "py-8 min-h-[420px] md:min-h-[110px] md:py-8",
        }
      : {
          none: "py-1.5 min-h-[48px]",
          compact: "py-2 md:py-3 min-h-[56px] md:min-h-[68px]",
          normal: "py-3 md:py-5 min-h-[64px] md:min-h-[84px]",
          spacious: "py-4 md:py-8 min-h-[72px] md:min-h-[110px]",
        };

    // Respiro Interno Lateral Horizontal do Header adaptativo com passos progressivos nítidos
    const getInnerPadXClass = () => {
      const scale = layout?.paddingInnerX || (isMobileLayout ? "normal" : "spacious");
      if (scale === "none") return "px-0";
      if (isMobileLayout) {
        if (scale === "compact") return "px-3 sm:px-4";
        if (scale === "normal") return "px-6 sm:px-7";
        return "px-10 sm:px-12";
      }
      if (isNarrowWidth) {
        if (scale === "compact") return "px-4 sm:px-6";
        if (scale === "normal") return "px-8 sm:px-10";
        return "px-12 sm:px-16";
      }
      if (isBoxedWidth) {
        if (scale === "compact") return "px-6 sm:px-8";
        if (scale === "normal") return "px-10 sm:px-14";
        return "px-16 sm:px-20 md:px-24";
      }
      // full
      if (scale === "compact") return "px-6 sm:px-10";
      if (scale === "normal") return "px-12 sm:px-16 md:px-20";
      return "px-16 sm:px-24 md:px-32 lg:px-36";
    };

    const innerPadX = getInnerPadXClass();

    // Espaçamento entre Itens (Gap) adaptativo
    const gapClasses: Record<LayoutGap, string> = isNarrowWidth
      ? {
          none: "gap-1",
          compact: "gap-2 sm:gap-3",
          normal: "gap-4 sm:gap-6",
          spacious: "gap-6 sm:gap-8",
          monumental: "gap-8 sm:gap-10",
        }
      : {
          none: "gap-1",
          compact: "gap-4 sm:gap-6",
          normal: "gap-6 sm:gap-8 lg:gap-10",
          spacious: "gap-8 sm:gap-12 lg:gap-16",
          monumental: "gap-12 sm:gap-16 lg:gap-24",
        };

    const navGapClasses: Record<LayoutGap, string> = isNarrowWidth
      ? {
          none: "gap-1",
          compact: "gap-2",
          normal: "gap-3 sm:gap-4",
          spacious: "gap-4 sm:gap-6",
          monumental: "gap-6 sm:gap-8",
        }
      : {
          none: "gap-2",
          compact: "gap-3.5 sm:gap-4",
          normal: "gap-5 sm:gap-6 lg:gap-7",
          spacious: "gap-7 sm:gap-8 lg:gap-10",
          monumental: "gap-10 sm:gap-12 lg:gap-14",
        };

    // Alinhamento Transversal
    const alignClasses: Record<LayoutAlignItems, string> = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    // Limite de Leitura de Conteúdo dentro do Header
    const contentWidthClasses: Record<ContentMaxWidth, string> = {
      narrow: "max-w-xl w-full",
      medium: "max-w-3xl w-full",
      wide: "max-w-5xl w-full",
      full: "w-full max-w-none",
    };

    const effectiveDistribution =
      layout?.distribution || content.justify || "between";

    const contentBoxPositionClass = isCol
      ? layout?.alignItems === "start"
        ? "mr-auto ml-0"
        : layout?.alignItems === "end"
        ? "ml-auto mr-0"
        : "mx-auto"
      : effectiveDistribution === "start"
      ? "mr-auto ml-0"
      : effectiveDistribution === "end"
      ? "ml-auto mr-0"
      : "mx-auto";

    const mobileInnerYClasses: Record<string, string> = {
      none: "py-1 min-h-[44px]",
      compact: "py-2 min-h-[52px]",
      normal: "py-3 min-h-[60px]",
      spacious: "py-4.5 min-h-[72px]",
    };

    // Encolhe ao descer a página, e desencolhe suavemente ao rolar para cima (intenção de uso)
    const isShrinkSlim =
      scrollShape === "shrink_slim" && isScrolled && !isScrollingUp && currentScroll > 60;
    const baseInnerY = isMobileLayout
      ? mobileInnerYClasses[layout?.paddingInner || "normal"]
      : innerYClasses[layout?.paddingInner || "normal"];

    const innerY = isShrinkSlim
      ? "py-1.5 md:py-2 min-h-[46px] md:min-h-[54px]"
      : baseInnerY;
    const effectiveGap = gapClasses[layout?.gap || "normal"];
    const effectiveNavGap = navGapClasses[layout?.navGap || layout?.gap || "normal"];
    const navTypography = styles?.typographyOverrides?.["navLinks"];
    const effectiveAlign = alignClasses[layout?.alignItems || "center"];
    const effectiveContentWidth =
      contentWidthClasses[layout?.contentMaxWidth || "full"];
    const isReverse = Boolean(layout?.reverse);

    const getHeaderDirectionClass = () => {
      if (isMobileLayout) return "flex-row";
      if (direction === "col") {
        return isReverse ? "flex-col-reverse" : "flex-col";
      }
      if (direction === "responsive") {
        return isReverse
          ? "flex-col-reverse md:flex-row-reverse"
          : "flex-col md:flex-row";
      }
      return isReverse ? "flex-row-reverse" : "flex-row";
    };

    const getNormalizedHref = (rawUrl?: string) => {
      if (!rawUrl || rawUrl === "#") return "#";
      const trimmed = rawUrl.trim();
      if (
        !trimmed.startsWith("#") &&
        !trimmed.includes("/") &&
        !trimmed.includes(":") &&
        !trimmed.startsWith("mailto") &&
        !trimmed.startsWith("tel")
      ) {
        return `#${trimmed}`;
      }
      return trimmed;
    };

    const justifyClass =
      effectiveDistribution === "center"
        ? "justify-center"
        : effectiveDistribution === "start"
        ? "justify-start"
        : effectiveDistribution === "end"
        ? "justify-end"
        : effectiveDistribution === "around"
        ? "justify-around"
        : "justify-between";

    const effectiveJustify = isMobileLayout ? "justify-between" : justifyClass;

    const isAutoWidth = layout?.componentWidth === "auto";

    const renderHeaderInner = () => (
      <div
        className={cn(
          "flex transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isAutoWidth ? "w-auto max-w-fit gap-4 sm:gap-6" : "w-full",
          isStretchY && "h-full flex-1",
          effectiveContentWidth,
          contentBoxPositionClass,
          effectiveJustify,
          effectiveAlign,
          effectiveGap,
          innerY,
          innerPadX,
          getHeaderDirectionClass()
        )}
      >
        {/* Logo */}
        {!isHidden("brand") && (
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group min-w-0">
            {!isHidden("logoImageUrl") && content.logoImageUrl ? (
              <img
                src={content.logoImageUrl}
                alt={content.brandName || "Logo"}
                className={cn(
                  "h-8 sm:h-9 w-auto object-contain transition-all duration-200",
                  getLogoRadiusClass(content.logoImageRadius)
                )}
              />
            ) : (
              content.brandIcon && (
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  <DynamicIcon name={content.brandIcon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              )
            )}

            <div className="flex items-baseline truncate">
              <EditableText
                as="span"
                defaultIsHeading
                value={content.brandName}
                elementKey="brandName"
                styles={styles}
                className="text-xl sm:text-2xl font-black uppercase tracking-tighter"
              />
              <span
                className="text-xl sm:text-2xl font-black leading-none ml-0.5"
                style={{ color: accentColor }}
              >
                .
              </span>
            </div>
          </a>
        )}

        {/* Links, CTA e Menu Mobile */}
        <div
          className={cn(
            "flex items-center shrink-0",
            effectiveAlign,
            effectiveNavGap,
            isReverse && "flex-row-reverse"
          )}
        >
          {hasNavLinks && (
            <nav
              className={cn(
                isMobileLayout ? "hidden" : "hidden md:flex items-center",
                effectiveNavGap,
                isReverse && "flex-row-reverse"
              )}
            >
              {content.navLinks.map((item, idx) => {
                const hoverStyle = layout?.navHoverStyle || "color";
                const isPill = hoverStyle === "pill";
                const isUnderline = hoverStyle === "underline";
                const isGlow = hoverStyle === "glow";

                return (
                  <a
                    key={idx}
                    href={getNormalizedHref(item.url)}
                    style={{
                      fontFamily: navTypography?.fontFamily || undefined,
                      color: navTypography?.color || undefined,
                    }}
                    className={cn(
                      "font-medium tracking-wide transition-all whitespace-nowrap",
                      navTypography?.fontSize || (isNarrowWidth ? "text-[11px] lg:text-[12px]" : "text-[12px]"),
                      navTypography?.fontWeight || "font-medium",
                      navTypography?.textTransform || "normal-case",
                      navTypography?.letterSpacing,
                      isPill && "px-3 py-1.5 rounded-lg opacity-80 hover:opacity-100 hover:bg-white/10 hover:text-white",
                      isUnderline && "relative py-1 opacity-80 hover:opacity-100 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#F4B400] after:transition-all",
                      isGlow && "opacity-80 hover:opacity-100 hover:text-white hover:drop-shadow-[0_0_8px_rgba(244,180,0,0.8)]",
                      (!isPill && !isUnderline && !isGlow) && "opacity-80 hover:opacity-100 hover:text-[#F4B400]"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          )}

          {/* CTA no desktop (ou mobile se não houver menu hamburger) */}
          {hasCta && (
            <div className={cn(isMobileLayout ? "hidden" : hasNavLinks ? "hidden md:block" : "block", "shrink-0")}>
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
                context="header"
              />
            </div>
          )}

          {/* Botão Hamburger Mobile */}
          {hasMobileMenu && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={cn(
                "p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all focus:outline-none border border-white/10 bg-white/5",
                isMobileLayout
                  ? "flex items-center justify-center"
                  : "md:hidden flex items-center justify-center"
              )}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#F4B400]" style={{ color: accentColor }} />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );

    // Painel Retrátil / Drawer de Navegação Mobile
    const renderMobileDrawer = () => {
      if (!mobileMenuOpen || !hasMobileMenu) return null;

      return (
        <div
          className={cn(
            "w-full border-t border-white/10 px-5 py-4 flex flex-col gap-3.5 animate-in fade-in-50 slide-in-from-top-2 duration-200",
            !isMobileLayout && "md:hidden",
            surfaceStyle !== "solid" && "backdrop-blur-xl"
          )}
          style={{
            backgroundColor: styles.customSurface || undefined,
          }}
        >
          {hasNavLinks && (
            <nav className="flex flex-col gap-1">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wide text-zinc-300 hover:text-white py-2.5 px-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <DynamicIcon name="ChevronRight" className="w-4 h-4 opacity-40" />
                </a>
              ))}
            </nav>
          )}

          {hasCta && (
            <div
              onClick={() => setMobileMenuOpen(false)}
              className={cn(hasNavLinks && "pt-3 border-t border-white/10")}
            >
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
                context="header"
                className="w-full text-center"
              />
            </div>
          )}
        </div>
      );
    };

    // Resolução de Superfície em 2 Estados (Inicial vs. Ao Rolar)
    const initialSurface: HeaderSurfaceType =
      layout?.headerSurfaceInitial ||
      (layout?.scrollSurface === "transparent_to_glass" ||
      layout?.scrollSurface === "transparent_to_solid"
        ? "transparent"
        : (styles.surfaceVariant as HeaderSurfaceType) || "solid");

    const scrolledSurface: HeaderSurfaceType =
      layout?.headerSurfaceScrolled ||
      (layout?.scrollSurface === "transparent_to_glass"
        ? "glass"
        : layout?.scrollSurface === "transparent_to_solid" ||
          layout?.scrollSurface === "glass_to_solid"
        ? "solid"
        : initialSurface);

    const activeSurfaceType: HeaderSurfaceType = isScrolled ? scrolledSurface : initialSurface;
    const isTransparentActive = activeSurfaceType === "transparent";

    // Resolução de Geometria / Formato Dinâmico
    const isAutoHide = scrollVisibility === "auto_hide";

    // Resolução Completa de Acabamento da Superfície (Bordas 0px garantido, cores, opacidades, blur e hover)
    const surfaceResolution = resolveHeaderSurfaceStyle({
      styles,
      theme,
      activeSurfaceType,
      isCapsuleActive: false,
      isEdgeToEdge,
      isTransparentActive,
    });

    // Forma da barra: respeita 100% as opções estruturais do usuário (Camadas 1 e 2)
    const headerShapeClasses = isEdgeToEdge
      ? "w-full max-w-none mx-0 mt-0 rounded-none"
      : cn(
          isAutoWidth ? "w-auto max-w-fit" : "w-full",
          "mt-0",
          getRadiusClass(radiusPreset)
        );

    // Efeito Auto-Hide Suavizado: desliza suavemente para cima com leve fade e escala orgânica
    const autoHideTransformClass =
      isAutoHide && !isVisible
        ? "-translate-y-full opacity-0 scale-[0.98] pointer-events-none"
        : "translate-y-0 opacity-100 scale-100";

    return (
      <header
        className={cn(
          "transition-[max-width,width,border-radius,margin,padding,box-shadow,background-color,border-color,transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-30",
          isStretchY && "h-full flex-1 flex flex-col",
          headerShapeClasses,
          autoHideTransformClass,
          surfaceResolution.className
        )}
        style={{
          ...surfaceResolution.style,
        }}
      >
        {renderHeaderInner()}
        {renderMobileDrawer()}
      </header>
    );
  },
});
