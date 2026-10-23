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
import { cn, getHeaderSurfaceClasses, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { resolveHeaderSurfaceStyle } from "@/lib/surfaceStyles";
import { useStudioStore } from "@/store/useStudioStore";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

const navbarModernSchema = z.object({
  brandName: z.string(),
  brandBadge: z.string(),
  brandIcon: z.string().optional(),
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
    { key: "brandName", label: "Nome da Marca" },
    { key: "brandBadge", label: "Selo ao lado da Logo" },
    { key: "brandIcon", label: "Ícone da Marca" },
    { key: "navLinks", label: "Menu de Navegação" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: navbarModernSchema,
  fields: [
    {
      key: "brandName",
      label: "Nome da Marca / Logo",
      type: "text",
      optionalKey: "brandName",
      typographyElementKey: "brandName",
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
      key: "brandIcon",
      label: "Ícone da Marca",
      type: "icon",
      optionalKey: "brandName",
    },
    {
      key: "navLinks",
      label: "Links do Menu",
      type: "array",
      optionalKey: "navLinks",
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
    },
  ],
  defaultData: {
    layout: {
      paddingY: "none",
      paddingInner: "compact",
      paddingInnerX: "normal",
      paddingX: "normal",
      containerWidth: "boxed",
      sticky: true,
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "full",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      brandName: "NIVIX",
      brandBadge: "ENTERPRISE",
      brandIcon: "Sparkles",
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
          compact: "py-2.5 md:py-3 min-h-[56px] md:min-h-[64px]",
          normal: "py-3 md:py-4 min-h-[64px] md:min-h-[76px]",
          spacious: "py-4 md:py-6 min-h-[76px] md:min-h-[92px]",
        };

    const getInnerPadXClass = () => {
      const scale = layout?.paddingInnerX || (isMobileLayout ? "normal" : "compact");
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
      if (scale === "compact") return "px-6 sm:px-10";
      if (scale === "normal") return "px-12 sm:px-16 md:px-20";
      return "px-16 sm:px-24 md:px-32 lg:px-36";
    };

    const mobileInnerYClasses: Record<string, string> = {
      none: "py-1 min-h-[44px]",
      compact: "py-2 min-h-[52px]",
      normal: "py-3 min-h-[60px]",
      spacious: "py-4.5 min-h-[72px]",
    };

    const isShrinkSlim =
      scrollShape === "shrink_slim" && isScrolled && !isScrollingUp && currentScroll > 60;
    const baseInnerY = isMobileLayout
      ? mobileInnerYClasses[layout?.paddingInner || "normal"]
      : innerYClasses[layout?.paddingInner || "normal"];
    const innerY = isShrinkSlim
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

    const alignClasses: Record<LayoutAlignItems, string> = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };
    const effectiveAlign = alignClasses[layout?.alignItems || "center"];
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

    const effectiveDistribution = layout?.distribution || "between";
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

    const getDynamicSurfaceClasses = () => {
      return getHeaderSurfaceClasses(activeSurfaceType);
    };

    const isAutoHide = scrollVisibility === "auto_hide";

    const isAutoWidth = layout?.componentWidth === "auto";

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

    return (
      <header
        className={cn(
          "transition-[max-width,width,border-radius,margin,padding,box-shadow,background-color,border-color,transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-40",
          isAutoWidth ? "w-auto max-w-fit" : "w-full",
          isStretchY && "h-full flex-1 flex flex-col",
          autoHideTransformClass
        )}
      >
        <div
          className={cn(
            "flex transition-[max-width,width,border-radius,margin,padding,box-shadow,background-color,border-color,min-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl",
            isAutoWidth
              ? "w-auto max-w-fit gap-4 sm:gap-6 rounded-full"
              : isEdgeToEdge
              ? "w-full rounded-none"
              : cn("w-full", getRadiusClass(radiusPreset)),
            isStretchY && "h-full flex-1",
            effectiveJustify,
            effectiveAlign,
            getDirectionClass(),
            innerY,
            innerPadX,
            surfaceResolution.className
          )}
          style={{
            ...surfaceResolution.style,
          }}
        >
          {/* Marca */}
          <div className="flex items-center gap-2.5 shrink-0 min-w-0">
            {!isHidden("brandName") && (
              <a href="#" className="flex items-center gap-2.5 shrink-0 group">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: accentColor, color: "#09090B" }}
                >
                  <DynamicIcon name={content.brandIcon || "Sparkles"} className="w-4 h-4" />
                </div>

                <div className="flex items-baseline truncate">
                  <EditableText
                    as="span"
                    defaultIsHeading
                    value={content.brandName}
                    elementKey="brandName"
                    styles={styles}
                    className="font-black text-lg sm:text-xl tracking-tight"
                  />
                  <span
                    className="text-lg sm:text-xl font-black leading-none ml-0.5"
                    style={{ color: accentColor }}
                  >
                    .
                  </span>
                </div>
              </a>
            )}

            {!isHidden("brandBadge") && content.brandBadge && (
              <EditableText
                isBadge
                accentColor={accentColor}
                value={content.brandBadge}
                elementKey="brandBadge"
                styles={styles}
                className="hidden sm:inline-flex px-2 py-0.5 text-[9px] rounded-full"
              />
            )}
          </div>

          {/* Links Centrais (Desktop) */}
          {hasNavLinks && (
            <nav
              className={cn(
                isMobileLayout ? "hidden" : "hidden md:flex items-center",
                isNarrowWidth ? "gap-3 lg:gap-4 mx-2" : "gap-5 lg:gap-8 mx-3 lg:mx-4"
              )}
            >
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  className={cn(
                    "font-semibold opacity-75 hover:opacity-100 transition-opacity relative group py-1 whitespace-nowrap",
                    isNarrowWidth ? "text-[11px]" : "text-xs"
                  )}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all group-hover:w-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </a>
              ))}
            </nav>
          )}

          {/* Ações Direita */}
          <div className="flex items-center gap-2.5 shrink-0">
            {hasCta && (
              <div className={cn(isMobileLayout ? "hidden" : hasNavLinks ? "hidden md:block" : "block")}>
                <SmartButton
                  button={content.ctaButton}
                  elementKey="ctaButton"
                  styles={styles}
                  theme={theme}
                />
              </div>
            )}

            {/* Hamburguer Mobile */}
            {hasMobileMenu && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0",
                  isMobileLayout ? "flex" : "md:hidden flex"
                )}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* GAVETA SUSPENSA MOBILE */}
        {hasMobileMenu && mobileMenuOpen && (
          <div
            className={cn(
              "mt-2 p-4 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200",
              !isMobileLayout && "md:hidden"
            )}
          >
            <nav className="flex flex-col space-y-1.5">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-semibold opacity-85 hover:opacity-100 hover:bg-white/5 transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-40">→</span>
                </a>
              ))}
            </nav>

            {hasCta && (
              <div
                onClick={() => setMobileMenuOpen(false)}
                className="pt-2 border-t border-white/10"
              >
                <SmartButton
                  button={{
                    ...content.ctaButton,
                    fullWidth: true,
                  }}
                  elementKey="ctaButton"
                  styles={styles}
                  theme={theme}
                />
              </div>
            )}
          </div>
        )}
      </header>
    );
  },
});
