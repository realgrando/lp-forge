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

const headerArtisanSchema = z.object({
  brandSubtitle: z.string(),
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
  logoImageRadius: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
  brandIcon: z.string().optional(),
  justify: z.enum(["between", "center", "start"]).default("center"),
  navLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type HeaderArtisanContent = z.infer<typeof headerArtisanSchema>;

export const HeaderArtisanSection = createSection<HeaderArtisanContent>({
  id: "header.artisan",
  name: "Header Artisan Center",
  description:
    "Cabeçalho editorial com logo centralizado, subtítulo de assinatura e navegação inferior distribuída, com suporte mobile responsivo.",
  category: "Header",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE"],
  legacyType: "header",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "brandSubtitle", label: "Subtítulo Editorial da Marca" },
    { key: "brand", label: "Logo / Nome Centralizado" },
    { key: "logoImageUrl", label: "Imagem da Logo" },
    { key: "navLinks", label: "Menu de Navegação" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: headerArtisanSchema,
  fields: [
    {
      key: "brandSubtitle",
      label: "Subtítulo Editorial / Assinatura",
      type: "text",
      optionalKey: "brandSubtitle",
      isBadge: true,
      typographyElementKey: "brandSubtitle",
    },
    {
      key: "brandName",
      label: "Nome da Marca (Centralizado)",
      type: "text",
      optionalKey: "brand",
      typographyElementKey: "brandName",
    },
    {
      key: "logoImageUrl",
      label: "Imagem da Logo (Opcional)",
      type: "image",
      optionalKey: "logoImageUrl",
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
      label: "Botão de Reserva / CTA",
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
      paddingInnerX: "normal",
      distribution: "center",
      alignItems: "center",
      gap: "normal",
      contentMaxWidth: "full",
    },
    styles: {
      surfaceVariant: "bordered",
      borderRadius: "none",
      borderWidth: "1",
      ambientGlow: false,
      bgGradientEnabled: false,
      hiddenElements: {},
    },
    content: {
      brandSubtitle: "ATELIER & ARQUITETURA AUTORAL",
      brandName: "NIVIX",
      logoImageUrl: "",
      logoImageRadius: "none",
      brandIcon: "Sparkles",
      justify: "center",
      navLinks: [
        { label: "O Menu", url: "#menu" },
        { label: "Nossa Arte", url: "#chef" },
        { label: "Galeria", url: "#galeria" },
        { label: "Contato", url: "#contato" },
      ],
      ctaButton: {
        enabled: true,
        text: "Reservar Experiência",
        url: "#contato",
        variant: "solid",
        size: "sm",
        radius: "full",
        iconName: "Calendar",
        iconPosition: "left",
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

    const isBrandHidden = isHidden("brand") || isHidden("brandName");
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

    const isStretchY = layout?.containerAlignY === "stretch";

    const innerYClasses: Record<string, string> = {
      none: "py-2 min-h-[56px]",
      compact: "py-3 md:py-4 min-h-[64px] md:min-h-[76px]",
      normal: "py-4 md:py-6 min-h-[72px] md:min-h-[96px]",
      spacious: "py-6 md:py-8 min-h-[84px] md:min-h-[120px]",
    };

    const getInnerPadXClass = () => {
      const scale = layout?.paddingInnerX || (isMobileLayout ? "normal" : "normal");
      if (scale === "none") return "px-0";
      if (isMobileLayout) {
        if (scale === "compact") return "px-3 sm:px-4";
        if (scale === "normal") return "px-4 sm:px-6";
        return "px-6 sm:px-8";
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
      compact: "py-2 min-h-[50px]",
      normal: "py-2.5 min-h-[56px]",
      spacious: "py-3.5 min-h-[64px]",
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

    // Gaps reativos
    const gapClasses: Record<LayoutGap, string> = isNarrowWidth
      ? {
          none: "gap-1",
          compact: "gap-2 sm:gap-3",
          normal: "gap-3 sm:gap-4",
          spacious: "gap-4 sm:gap-6",
          monumental: "gap-6 sm:gap-8",
        }
      : {
          none: "gap-1.5",
          compact: "gap-3 sm:gap-4",
          normal: "gap-4 sm:gap-5",
          spacious: "gap-6 sm:gap-8",
          monumental: "gap-8 sm:gap-12",
        };

    const navGapClasses: Record<LayoutGap, string> = isNarrowWidth
      ? {
          none: "gap-2 sm:gap-3",
          compact: "gap-3 sm:gap-4",
          normal: "gap-4 sm:gap-6",
          spacious: "gap-6 sm:gap-8",
          monumental: "gap-8 sm:gap-10",
        }
      : {
          none: "gap-3 sm:gap-4",
          compact: "gap-5 sm:gap-6",
          normal: "gap-7 sm:gap-9 lg:gap-10",
          spacious: "gap-9 sm:gap-12 lg:gap-14",
          monumental: "gap-12 sm:gap-16 lg:gap-20",
        };

    const alignClasses: Record<LayoutAlignItems, string> = {
      start: "items-start text-left",
      center: "items-center text-center",
      end: "items-end text-right",
      stretch: "items-stretch",
    };

    const contentWidthClasses: Record<ContentMaxWidth, string> = {
      narrow: "max-w-xl w-full",
      medium: "max-w-3xl w-full",
      wide: "max-w-5xl w-full",
      full: "w-full max-w-none",
    };

    const effectiveDistribution =
      layout?.distribution || content.justify || "center";
    const contentBoxPositionClass =
      effectiveDistribution === "start"
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
      effectiveDistribution === "between"
        ? "justify-between"
        : effectiveDistribution === "start"
        ? "justify-start"
        : effectiveDistribution === "end"
        ? "justify-end"
        : effectiveDistribution === "around"
        ? "justify-around"
        : "justify-center";

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

    const isAutoHide = scrollVisibility === "auto_hide";
    const isAutoWidth = layout?.componentWidth === "auto";

    // Resolução Completa de Acabamento da Superfície
    const surfaceResolution = resolveHeaderSurfaceStyle({
      styles,
      theme,
      activeSurfaceType,
      isCapsuleActive: false,
      isEdgeToEdge,
      isTransparentActive,
    });

    const headerShapeClasses = isEdgeToEdge
      ? "w-full max-w-none mx-0 mt-0 rounded-none"
      : cn(
          isAutoWidth ? "w-auto max-w-fit" : "w-full",
          "mt-0",
          getRadiusClass(radiusPreset)
        );

    // Efeito Auto-Hide Suavizado
    const autoHideTransformClass =
      isAutoHide && !isVisible
        ? "-translate-y-full opacity-0 scale-[0.98] pointer-events-none"
        : "translate-y-0 opacity-100 scale-100";

    // Renderizador Desktop (Layout Editorial em 2 Níveis)
    const renderDesktopHeader = () => (
      <div
        className={cn(
          isMobileLayout ? "hidden" : "hidden md:flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isAutoWidth ? "w-auto max-w-fit" : "w-full",
          isStretchY && "h-full flex-1",
          effectiveContentWidth,
          contentBoxPositionClass,
          effectiveAlign,
          effectiveGap,
          innerY,
          innerPadX
        )}
      >
        {/* Nível 1: Subtítulo Editorial + Marca Central */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          {!isHidden("brandSubtitle") && content.brandSubtitle && (
            <EditableText
              isBadge
              accentColor={accentColor}
              value={content.brandSubtitle}
              elementKey="brandSubtitle"
              styles={styles}
              className="text-[9px] tracking-[0.35em]"
            />
          )}

          {!isBrandHidden && (
            <a href="#" className="inline-flex items-center gap-3 group mt-1">
              {!isHidden("logoImageUrl") && content.logoImageUrl ? (
                <img
                  src={content.logoImageUrl}
                  alt={content.brandName}
                  className={cn(
                    "h-10 w-auto object-contain transition-all duration-200",
                    getLogoRadiusClass(content.logoImageRadius)
                  )}
                />
              ) : (
                content.brandIcon && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    <DynamicIcon name={content.brandIcon} className="w-4 h-4" />
                  </div>
                )
              )}

              <div className="flex items-baseline">
                <EditableText
                  as="span"
                  defaultIsHeading
                  value={content.brandName}
                  elementKey="brandName"
                  styles={styles}
                  className="text-3xl sm:text-4xl font-light uppercase tracking-[0.35em] group-hover:opacity-90 transition-opacity"
                />
                <span
                  className="text-3xl font-black leading-none"
                  style={{ color: accentColor }}
                >
                  .
                </span>
              </div>
            </a>
          )}
        </div>

        {/* Nível 2: Links Distribuídos + CTA */}
        {(hasNavLinks || hasCta) && (
          <div
            className={cn(
              "w-full pt-4 border-t border-white/10 flex flex-wrap items-center transition-all",
              justifyClass,
              effectiveNavGap,
              isReverse && "flex-row-reverse"
            )}
          >
            {hasNavLinks && (
              <nav
                className={cn(
                  "flex flex-wrap items-center transition-all",
                  justifyClass,
                  effectiveNavGap,
                  isReverse && "flex-row-reverse"
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
                        "font-semibold uppercase tracking-[0.25em] transition-all whitespace-nowrap",
                        navTypography?.fontSize || (isNarrowWidth ? "text-[9px] lg:text-[10px]" : "text-[10px]"),
                        navTypography?.fontWeight || "font-semibold",
                        navTypography?.letterSpacing,
                        isPill && "px-3 py-1.5 rounded-lg opacity-80 hover:opacity-100 hover:bg-white/10 hover:text-white",
                        isUnderline && "relative py-1 opacity-75 hover:opacity-100 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#F4B400] after:transition-all",
                        isGlow && "opacity-75 hover:opacity-100 hover:text-white hover:drop-shadow-[0_0_8px_rgba(244,180,0,0.8)]",
                        (!isPill && !isUnderline && !isGlow) && "opacity-75 hover:opacity-100 hover:text-[#F4B400]"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            )}

            {hasCta && (
              <div className="shrink-0">
                <SmartButton
                  button={content.ctaButton}
                  elementKey="ctaButton"
                  styles={styles}
                  theme={theme}
                  context="header"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );

    // Renderizador Mobile (Barra Fechada 100% Limpa e Padronizada)
    const renderMobileBar = () => (
      <div
        className={cn(
          isMobileLayout
            ? "flex items-center justify-between"
            : "md:hidden flex items-center justify-between",
          innerY,
          innerPadX
        )}
      >
        {/* Marca / Logo à esquerda */}
        {!isBrandHidden && (
          <a href="#" className="flex items-center gap-2 min-w-0">
            {!isHidden("logoImageUrl") && content.logoImageUrl ? (
              <img
                src={content.logoImageUrl}
                alt={content.brandName}
                className={cn(
                  "h-7 w-auto object-contain transition-all duration-200",
                  getLogoRadiusClass(content.logoImageRadius)
                )}
              />
            ) : (
              content.brandIcon && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  <DynamicIcon name={content.brandIcon} className="w-3.5 h-3.5" />
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
                className="text-lg font-light uppercase tracking-[0.25em]"
              />
              <span
                className="text-lg font-black leading-none ml-0.5"
                style={{ color: accentColor }}
              >
                .
              </span>
            </div>
          </a>
        )}

        {/* Botão Hambúrguer à direita (Único elemento de ação na barra fechada mobile) */}
        {hasMobileMenu && (
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0"
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
    );

    // Renderizador Drawer Mobile (Identidade Editorial Artesanal no Menu Aberto)
    const renderMobileDrawer = () => {
      if (!mobileMenuOpen || !hasMobileMenu) return null;

      return (
        <div
          className={cn(
            "w-full border-t border-white/10 px-5 py-5 flex flex-col gap-4 animate-in fade-in-50 slide-in-from-top-2 duration-200",
            !isMobileLayout && "md:hidden",
            surfaceStyle !== "solid" && "backdrop-blur-xl"
          )}
          style={{
            backgroundColor: styles.customSurface || undefined,
          }}
        >
          {/* Assinatura / Subtítulo Editorial da Marca */}
          {!isHidden("brandSubtitle") && content.brandSubtitle && (
            <div className="pb-1 text-center">
              <EditableText
                isBadge
                accentColor={accentColor}
                value={content.brandSubtitle}
                elementKey="brandSubtitle"
                styles={styles}
                className="text-[9px] tracking-[0.3em]"
              />
            </div>
          )}

          {/* Links Editoriais */}
          {hasNavLinks && (
            <nav className="flex flex-col gap-1">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <DynamicIcon
                    name="ChevronRight"
                    className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ color: accentColor }}
                  />
                </a>
              ))}
            </nav>
          )}

          {/* CTA Editorial */}
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
          isStretchY && "h-full flex-1 flex flex-col",
          headerShapeClasses,
          autoHideTransformClass,
          surfaceResolution.className
        )}
        style={{
          ...surfaceResolution.style,
        }}
      >
        {/* Barra Desktop Editorial */}
        {renderDesktopHeader()}

        {/* Barra Mobile Limpa */}
        {renderMobileBar()}

        {/* Drawer Mobile Editorial */}
        {renderMobileDrawer()}
      </header>
    );
  },
});
