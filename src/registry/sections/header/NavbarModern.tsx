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
  getLogoRadiusClass,
  getRadiusClass,
} from "@/lib/utils";
import { resolveHeaderSurfaceStyle } from "@/lib/surfaceStyles";
import { useStudioStore } from "@/store/useStudioStore";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

const navbarModernSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
  logoImageRadius: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
  brandBadge: z.string().optional(),
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

export type NavbarModernContent = z.infer<typeof navbarModernSchema>;

export const NavbarModernSection = createSection<NavbarModernContent>({
  id: "header.navbar",
  name: "Navbar Floating Glass",
  description:
    "Barra de navegação moderna flutuante com acabamento glass, badge de status, links e botão de ação responsivo.",
  category: "Header",
  iconName: "LayoutTemplate",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "brand", label: "Logo / Nome da Marca" },
    { key: "logoImageUrl", label: "Imagem da Logo" },
    { key: "brandBadge", label: "Selo ao lado da Logo" },
    { key: "navLinks", label: "Menu de Navegação" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: navbarModernSchema,
  fields: [
    {
      key: "brandName",
      label: "Nome da Marca / Logo",
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
      key: "brandBadge",
      label: "Selo / Versão da Marca",
      type: "text",
      optionalKey: "brandBadge",
      isBadge: true,
      typographyElementKey: "brandBadge",
    },
    {
      key: "navLinks",
      label: "Links do Menu",
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
      label: "Botão de Ação da Navbar",
      type: "button",
      optionalKey: "ctaButton",
      typographyElementKey: "ctaButton",
    },
  ],
  defaultData: {
    layout: {
      containerWidth: "boxed",
      containerAlignX: "center",
      containerAlignY: "center",
      minHeight: "auto",
      paddingY: "none",
      paddingX: "normal",
      sticky: true,
      componentWidth: "full",
      direction: "row",
      reverse: false,
      paddingInner: "compact",
      paddingInnerX: "normal",
      distribution: "between",
      alignItems: "center",
      gap: "normal",
      contentMaxWidth: "full",
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "full",
      borderWidth: "1",
      ambientGlow: false,
      bgGradientEnabled: false,
      hiddenElements: {},
    },
    content: {
      brandName: "NIVIX",
      logoImageUrl: "",
      logoImageRadius: "none",
      brandBadge: "ENTERPRISE",
      brandIcon: "Sparkles",
      justify: "between",
      navLinks: [
        { label: "Soluções", url: "#solucoes" },
        { label: "Diferenciais", url: "#features" },
        { label: "Processo", url: "#processo" },
        { label: "Planos", url: "#planos" },
        { label: "FAQ", url: "#faq" },
      ],
      ctaButton: {
        enabled: true,
        text: "Falar com Especialista",
        url: "#contato",
        variant: "solid",
        size: "sm",
        radius: "full",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isEdgeToEdge =
      (layout?.containerWidth || "boxed") === "full" &&
      (layout?.componentWidth || "full") === "full";
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || "full";
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const isBrandHidden = isHidden("brand") || isHidden("brandName");
    const hasNavLinks =
      !isHidden("navLinks") &&
      Boolean(content.navLinks && content.navLinks.length > 0);
    const hasCta =
      !isHidden("ctaButton") && Boolean(content.ctaButton?.enabled);

    const viewport = useStudioStore((s) => s.viewport);
    const isMobileLayout = layout?.containerWidth === "mobile" || viewport === "mobile";
    const isNarrowWidth = layout?.containerWidth === "narrow" || layout?.componentWidth === "narrow";
    const isBoxedWidth = layout?.containerWidth === "boxed" || layout?.componentWidth === "boxed";
    const isAutoWidth = !isMobileLayout && layout?.componentWidth === "auto";

    const hasMobileMenu = hasNavLinks || (hasCta && isMobileLayout);

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

    // Respiro Interno Vertical do Header
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
          compact: "py-3 min-h-[220px] md:min-h-[64px] md:py-2.5",
          normal: "py-5 min-h-[300px] md:min-h-[76px] md:py-3",
          spacious: "py-8 min-h-[420px] md:min-h-[92px] md:py-4",
        }
      : {
          none: "py-1.5 min-h-[48px]",
          compact: "py-2 md:py-2.5 min-h-[56px] md:min-h-[64px]",
          normal: "py-3 md:py-3.5 min-h-[64px] md:min-h-[76px]",
          spacious: "py-4 md:py-5 min-h-[76px] md:min-h-[92px]",
        };

    const getInnerPadXClass = () => {
      const scale = layout?.paddingInnerX || (isMobileLayout ? "normal" : "normal");
      if (scale === "none") return isAutoWidth ? "px-3" : "px-0";
      if (isMobileLayout) {
        if (scale === "compact") return "px-3 sm:px-4";
        if (scale === "normal") return "px-5 sm:px-6";
        return "px-7 sm:px-8";
      }
      if (isNarrowWidth) {
        if (scale === "compact") return "px-3 sm:px-4";
        if (scale === "normal") return "px-6 sm:px-8";
        return "px-8 sm:px-10";
      }
      if (isBoxedWidth) {
        if (scale === "compact") return "px-4 sm:px-6";
        if (scale === "normal") return "px-6 sm:px-8";
        return "px-10 sm:px-12";
      }
      if (isAutoWidth) {
        if (scale === "compact") return "px-4 sm:px-6";
        if (scale === "normal") return "px-6 sm:px-8";
        return "px-8 sm:px-12";
      }
      // full
      if (scale === "compact") return "px-4 sm:px-6";
      if (scale === "normal") return "px-8 sm:px-10 md:px-12";
      return "px-12 sm:px-16 md:px-20";
    };

    const mobileInnerYClasses: Record<string, string> = {
      none: "py-1 min-h-[44px]",
      compact: "py-2 min-h-[52px]",
      normal: "py-3 min-h-[60px]",
      spacious: "py-4.5 min-h-[72px]",
    };

    // Encolhe suavemente ao rolar
    const isShrinkSlim =
      scrollShape === "shrink_slim" && isScrolled && !isScrollingUp && currentScroll > 60;
    const baseInnerY = isMobileLayout
      ? mobileInnerYClasses[layout?.paddingInner || "compact"]
      : innerYClasses[layout?.paddingInner || "compact"];

    const effectiveInnerY = isShrinkSlim
      ? "py-1.5 md:py-2 min-h-[46px] md:min-h-[54px]"
      : baseInnerY;
    const innerPadX = getInnerPadXClass();

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

    // Espaçamentos reativos
    const gapClasses: Record<LayoutGap, string> = isNarrowWidth
      ? {
          none: "gap-1",
          compact: "gap-2 sm:gap-3",
          normal: "gap-3 sm:gap-4",
          spacious: "gap-5 sm:gap-6",
          monumental: "gap-6 sm:gap-8",
        }
      : {
          none: "gap-1",
          compact: "gap-3 sm:gap-4",
          normal: "gap-4 sm:gap-6 lg:gap-8",
          spacious: "gap-6 sm:gap-10 lg:gap-12",
          monumental: "gap-8 sm:gap-14 lg:gap-18",
        };

    const navGapClasses: Record<LayoutGap, string> = isNarrowWidth
      ? {
          none: "gap-1",
          compact: "gap-2",
          normal: "gap-3 lg:gap-4",
          spacious: "gap-4 lg:gap-6",
          monumental: "gap-6 lg:gap-8",
        }
      : {
          none: "gap-2",
          compact: "gap-3.5 sm:gap-4",
          normal: "gap-5 lg:gap-8",
          spacious: "gap-7 lg:gap-10",
          monumental: "gap-9 lg:gap-14",
        };

    const alignClasses: Record<LayoutAlignItems, string> = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

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

    const effectiveGap = gapClasses[layout?.gap || "normal"];
    const effectiveNavGap = navGapClasses[layout?.navGap || layout?.gap || "normal"];
    const navTypography = styles?.typographyOverrides?.["navLinks"];
    const effectiveAlign = alignClasses[layout?.alignItems || "center"];
    const effectiveContentWidth =
      contentWidthClasses[layout?.contentMaxWidth || "full"];
    const isReverse = Boolean(layout?.reverse);

    const getDirectionClass = () => {
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

    // Resolução de Superfície em 2 Estados (Inicial vs. Ao Rolar)
    const initialSurface: HeaderSurfaceType =
      layout?.headerSurfaceInitial ||
      (layout?.scrollSurface === "transparent_to_glass" ||
      layout?.scrollSurface === "transparent_to_solid"
        ? "transparent"
        : (styles.surfaceVariant as HeaderSurfaceType) || "glass");

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

    // Efeito Auto-Hide Suavizado
    const autoHideTransformClass =
      isAutoHide && !isVisible
        ? "-translate-y-full opacity-0 scale-[0.98] pointer-events-none"
        : "translate-y-0 opacity-100 scale-100";

    const renderHeaderInner = () => (
      <div
        className={cn(
          "flex transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isAutoWidth ? "w-auto max-w-fit" : "w-full",
          isStretchY && "h-full flex-1",
          effectiveContentWidth,
          contentBoxPositionClass,
          effectiveJustify,
          effectiveAlign,
          effectiveGap,
          effectiveInnerY,
          innerPadX,
          getDirectionClass()
        )}
      >
        {/* Marca + Selo */}
        {!isBrandHidden && (
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group min-w-0">
              {!isHidden("logoImageUrl") && content.logoImageUrl ? (
                <img
                  src={content.logoImageUrl}
                  alt={content.brandName || "Logo"}
                  className={cn(
                    "h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-200",
                    getLogoRadiusClass(content.logoImageRadius)
                  )}
                />
              ) : (
                content.brandIcon && (
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: accentColor, color: "#09090B" }}
                  >
                    <DynamicIcon name={content.brandIcon || "Sparkles"} className="w-4 h-4" />
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
                  className="font-black text-lg sm:text-xl md:text-2xl tracking-tight"
                />
                <span
                  className="text-lg sm:text-xl md:text-2xl font-black leading-none ml-0.5"
                  style={{ color: accentColor }}
                >
                  .
                </span>
              </div>
            </a>

            {!isHidden("brandBadge") && content.brandBadge && (
              <EditableText
                isBadge
                accentColor={accentColor}
                value={content.brandBadge}
                elementKey="brandBadge"
                styles={styles}
                className="hidden sm:inline-flex px-2.5 py-0.5 text-[9px] rounded-full font-bold tracking-wider"
              />
            )}
          </div>
        )}

        {/* Links Centrais (Desktop) */}
        {hasNavLinks && (
          <nav
            className={cn(
              isMobileLayout ? "hidden" : "hidden md:flex items-center",
              effectiveNavGap,
              isNarrowWidth ? "mx-2" : "mx-3 lg:mx-4"
            )}
          >
            {content.navLinks.map((item, idx) => {
              const hoverStyle = layout?.navHoverStyle || "underline";
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
                    "font-semibold transition-all relative group whitespace-nowrap",
                    navTypography?.fontSize ||
                      (isNarrowWidth ? "text-[11px]" : "text-xs"),
                    navTypography?.fontWeight || "font-semibold",
                    navTypography?.textTransform || "normal-case",
                    navTypography?.letterSpacing,
                    isPill &&
                      "px-3 py-1.5 rounded-lg opacity-80 hover:opacity-100 hover:bg-white/10 hover:text-white",
                    isUnderline &&
                      "py-1 opacity-80 hover:opacity-100 hover:text-white",
                    isGlow &&
                      "opacity-80 hover:opacity-100 hover:text-white hover:drop-shadow-[0_0_8px_rgba(244,180,0,0.8)]",
                    !isPill &&
                      !isUnderline &&
                      !isGlow &&
                      "opacity-80 hover:opacity-100 hover:text-[#F4B400]"
                  )}
                >
                  <span>{item.label}</span>
                  {isUnderline && (
                    <span
                      className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {/* Ações Direita: CTA e Hamburguer Mobile */}
        <div
          className={cn(
            "flex items-center shrink-0 gap-2 sm:gap-2.5",
            isReverse && "flex-row-reverse"
          )}
        >
          {hasCta && (
            <div
              className={cn(
                isMobileLayout ? "hidden" : hasNavLinks ? "hidden md:block" : "block",
                "shrink-0"
              )}
            >
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
                context="header"
              />
            </div>
          )}

          {hasMobileMenu && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={cn(
                "p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-all flex items-center justify-center shrink-0 focus:outline-none",
                isMobileLayout ? "flex" : "md:hidden flex"
              )}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" style={{ color: accentColor }} />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );

    // Gaveta Suspensa Mobile
    const renderMobileDrawer = () => {
      if (!mobileMenuOpen || !hasMobileMenu) return null;

      return (
        <div
          className={cn(
            "mt-2 w-full p-4 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl flex flex-col gap-3.5 animate-in fade-in-50 slide-in-from-top-2 duration-200",
            !isMobileLayout && "md:hidden",
            surfaceStyle !== "solid" && "backdrop-blur-xl"
          )}
          style={{
            backgroundColor: styles.customSurface || undefined,
            borderColor: styles.borderColor || undefined,
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

    return (
      <header
        className={cn(
          "transition-[max-width,width,border-radius,margin,padding,box-shadow,background-color,border-color,transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-40",
          isAutoWidth ? "w-auto max-w-fit" : "w-full",
          isStretchY && "h-full flex-1 flex flex-col",
          contentBoxPositionClass,
          autoHideTransformClass
        )}
      >
        <div
          className={cn(
            "transition-[max-width,width,border-radius,margin,padding,box-shadow,background-color,border-color,min-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl",
            isEdgeToEdge
              ? "w-full rounded-none"
              : cn(
                  isAutoWidth ? "w-auto max-w-fit" : "w-full",
                  getRadiusClass(radiusPreset)
                ),
            isStretchY && "h-full flex-1 flex flex-col",
            surfaceResolution.className
          )}
          style={{
            ...surfaceResolution.style,
          }}
        >
          {renderHeaderInner()}
        </div>

        {renderMobileDrawer()}
      </header>
    );
  },
});
