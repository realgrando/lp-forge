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

const headerCapsuleSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
  logoImageRadius: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
  brandIcon: z.string().optional(),
  statusBadge: z.string(),
  navLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type HeaderCapsuleContent = z.infer<typeof headerCapsuleSchema>;

export const HeaderCapsuleSection = createSection<HeaderCapsuleContent>({
  id: "header.capsule",
  name: "Header Capsule Floating",
  description:
    "Cápsula flutuante arredondada (rounded-full) com links em formato pílula, indicador de status e botão de ação responsivo.",
  category: "Header",
  iconName: "Compass",
  modes: ["LANDING_PAGE"],
  legacyType: "header",
  legacyVariant: "v4",
  toggleableElements: [
    { key: "brandName", label: "Logo / Nome da Marca" },
    { key: "logoImageUrl", label: "Imagem da Logo" },
    { key: "brandIcon", label: "Ícone da Marca" },
    { key: "statusBadge", label: "Pílula de Status" },
    { key: "navLinks", label: "Pílulas de Navegação" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: headerCapsuleSchema,
  fields: [
    {
      key: "brandName",
      label: "Nome da Marca / Logo",
      type: "text",
      optionalKey: "brandName",
      typographyElementKey: "brandName",
    },
    {
      key: "logoImageUrl",
      label: "URL da Imagem da Logo (Opcional)",
      type: "image",
      optionalKey: "logoImageUrl",
      hasRadiusControl: true,
      radiusKey: "logoImageRadius",
      radiusLabel: "Arredondamento da Logo",
    },
    {
      key: "brandIcon",
      label: "Ícone da Cápsula",
      type: "icon",
      optionalKey: "brandName",
    },
    {
      key: "statusBadge",
      label: "Selo / Status Rápido",
      type: "text",
      optionalKey: "statusBadge",
      isBadge: true,
      typographyElementKey: "statusBadge",
    },
    {
      key: "navLinks",
      label: "Links da Cápsula",
      type: "array",
      optionalKey: "navLinks",
      defaultNewItem: { label: "Seção", url: "#secao" },
      itemFields: [
        { key: "label", label: "Texto do Link", type: "text" },
        { key: "url", label: "URL ou #Âncora", type: "url" },
      ],
    },
    {
      key: "ctaButton",
      label: "Botão da Cápsula (CTA)",
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
      componentWidth: "auto",
      containerAlignX: "center",
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
      logoImageUrl: "",
      logoImageRadius: "none",
      brandIcon: "Zap",
      statusBadge: "V2.0 ONLINE",
      navLinks: [
        { label: "Sobre", url: "#sobre" },
        { label: "Diferenciais", url: "#features" },
        { label: "Planos", url: "#planos" },
      ],
      ctaButton: {
        enabled: true,
        text: "Começar Agora",
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
      (layout?.componentWidth || "auto") === "full";
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
          compact: "py-3 min-h-[220px] md:min-h-[64px] md:py-2",
          normal: "py-5 min-h-[300px] md:min-h-[72px] md:py-3",
          spacious: "py-8 min-h-[420px] md:min-h-[88px] md:py-4",
        }
      : {
          none: "py-1.5 min-h-[48px]",
          compact: "py-2 md:py-2.5 min-h-[56px] md:min-h-[64px]",
          normal: "py-3 md:py-3.5 min-h-[64px] md:min-h-[72px]",
          spacious: "py-4 md:py-5 min-h-[76px] md:min-h-[88px]",
        };

    const isAutoWidth = !isMobileLayout && (layout?.componentWidth || "auto") === "auto";

    const getInnerPadXClass = () => {
      const scale = layout?.paddingInnerX || (isMobileLayout ? "normal" : "compact");
      if (scale === "none") return isAutoWidth ? "px-3" : "px-0";
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
      if (isAutoWidth) {
        if (scale === "compact") return "px-6 sm:px-8";
        if (scale === "normal") return "px-8 sm:px-12";
        return "px-10 sm:px-16";
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

    const innerY = isMobileLayout
      ? mobileInnerYClasses[layout?.paddingInner || "compact"]
      : innerYClasses[layout?.paddingInner || "compact"];
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

    // Resolução Completa de Acabamento da Superfície (Bordas 0px garantido, cores, opacidades, blur e hover)
    const surfaceResolution = resolveHeaderSurfaceStyle({
      styles,
      theme,
      activeSurfaceType,
      isCapsuleActive: false,
      isEdgeToEdge: false,
      isTransparentActive,
    });

    // Efeito Auto-Hide Suavizado
    const autoHideTransformClass =
      isAutoHide && !isVisible
        ? "-translate-y-full opacity-0 scale-[0.98] pointer-events-none"
        : "translate-y-0 opacity-100 scale-100";

    const isShrinkSlim =
      scrollShape === "shrink_slim" && isScrolled && !isScrollingUp && currentScroll > 60;
    const effectiveInnerY = isShrinkSlim
      ? "py-1.5 md:py-2 min-h-[46px] md:min-h-[54px]"
      : innerY;

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
            "flex transition-[max-width,width,border-radius,margin,padding,box-shadow,background-color,border-color,min-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl",
            isAutoWidth
              ? "w-auto max-w-fit gap-4 sm:gap-6 rounded-full"
              : isEdgeToEdge
              ? "w-full rounded-none"
              : cn("w-full", getRadiusClass(radiusPreset)),
            isStretchY && "h-full flex-1",
            effectiveJustify,
            effectiveAlign,
            getDirectionClass(),
            effectiveInnerY,
            innerPadX,
            surfaceResolution.className
          )}
          style={{
            ...surfaceResolution.style,
          }}
        >
          {/* Marca + Status */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
            {!isHidden("brandName") && (
              <a href="#" className="flex items-center gap-2.5 shrink-0 group">
                {!isHidden("logoImageUrl") && content.logoImageUrl ? (
                  <img
                    src={content.logoImageUrl}
                    alt={content.brandName}
                    className={cn(
                      "h-8 w-auto object-contain transition-all duration-200",
                      getLogoRadiusClass(content.logoImageRadius)
                    )}
                  />
                ) : (
                  content.brandIcon && (
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: accentColor, color: "#09090B" }}
                    >
                      <DynamicIcon
                        name={content.brandIcon || "Zap"}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
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

            {!isHidden("statusBadge") && content.statusBadge && (
              <EditableText
                isBadge
                accentColor={accentColor}
                value={content.statusBadge}
                elementKey="statusBadge"
                styles={styles}
                className="hidden lg:inline-flex px-2.5 py-0.5 text-[9px] rounded-full"
              />
            )}
          </div>

          {/* Links em Pílula (Desktop) */}
          {hasNavLinks && (
            <nav
              className={cn(
                isMobileLayout ? "hidden" : "hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10",
                isNarrowWidth ? "mx-2" : "mx-4"
              )}
            >
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  className={cn(
                    "rounded-full font-black uppercase tracking-widest opacity-70 hover:opacity-100 hover:bg-white/10 transition-all whitespace-nowrap",
                    isNarrowWidth ? "px-2.5 py-1 text-[10px]" : "px-4 py-1.5 text-[11px]"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* Ações à Direita */}
          <div className="flex items-center gap-2 shrink-0">
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
                  "p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0",
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

        {/* GAVETA FLUTUANTE MOBILE */}
        {hasMobileMenu && mobileMenuOpen && (
          <div
            className={cn(
              "mt-2 p-4 rounded-3xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200",
              !isMobileLayout && "md:hidden"
            )}
          >
            <nav className="flex flex-col space-y-1.5">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider opacity-85 hover:opacity-100 hover:bg-white/5 transition-all flex items-center justify-between"
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
