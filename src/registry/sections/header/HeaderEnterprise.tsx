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

const headerEnterpriseSchema = z.object({
  topPhone: z.string(),
  topEmail: z.string(),
  topNotice: z.string(),
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
  logoImageRadius: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
  brandIcon: z.string().optional(),
  navLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type HeaderEnterpriseContent = z.infer<typeof headerEnterpriseSchema>;

export const HeaderEnterpriseSection = createSection<HeaderEnterpriseContent>({
  id: "header.enterprise",
  name: "Header Enterprise Topbar",
  description:
    "Cabeçalho corporativo com barra superior de contatos e barra principal com marca, links e CTA, com menu hamburguer responsivo.",
  category: "Header",
  iconName: "Building2",
  modes: ["LANDING_PAGE"],
  legacyType: "header",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "topbar", label: "Barra Superior Completa (Topbar)" },
    { key: "topPhone", label: "Telefone na Barra Superior" },
    { key: "topEmail", label: "E-mail na Barra Superior" },
    { key: "topNotice", label: "Aviso / Horário na Barra Superior" },
    { key: "brandName", label: "Logo / Nome da Marca" },
    { key: "logoImageUrl", label: "Imagem da Logo" },
    { key: "brandIcon", label: "Ícone da Marca" },
    { key: "navLinks", label: "Links de Navegação" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: headerEnterpriseSchema,
  fields: [
    {
      key: "topPhone",
      label: "Topbar: Telefone",
      type: "text",
      optionalKey: "topPhone",
      typographyElementKey: "topPhone",
    },
    {
      key: "topEmail",
      label: "Topbar: E-mail",
      type: "text",
      optionalKey: "topEmail",
      typographyElementKey: "topEmail",
    },
    {
      key: "topNotice",
      label: "Topbar: Horário ou Aviso",
      type: "text",
      optionalKey: "topNotice",
      isBadge: true,
      typographyElementKey: "topNotice",
    },
    {
      key: "brandName",
      label: "Nome da Marca / Logo",
      type: "text",
      optionalKey: "brandName",
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
      label: "Botão de Ação (CTA)",
      type: "button",
      optionalKey: "ctaButton",
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
      surfaceVariant: "glass",
      borderRadius: "none",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      topPhone: "+55 (11) 99999-9999",
      topEmail: "contato@nivix.com.br",
      topNotice: "SEG A SEX • 08H ÀS 18H",
      brandName: "NIVIX",
      logoImageUrl: "",
      logoImageRadius: "none",
      brandIcon: "ShieldCheck",
      navLinks: [
        { label: "Serviços", url: "#servicos" },
        { label: "Portfólio", url: "#portfolio" },
        { label: "Unidades", url: "#localizacao" },
        { label: "Corporativo", url: "#sobre" },
      ],
      ctaButton: {
        enabled: true,
        text: "Área do Cliente",
        url: "#contato",
        variant: "solid",
        size: "sm",
        radius: "sm",
        iconName: "ShieldCheck",
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
          compact: "py-3 min-h-[220px] md:min-h-[68px] md:py-2.5",
          normal: "py-5 min-h-[300px] md:min-h-[80px] md:py-3",
          spacious: "py-8 min-h-[420px] md:min-h-[96px] md:py-4",
        }
      : {
          none: "py-1.5 min-h-[48px]",
          compact: "py-2.5 md:py-3.5 min-h-[56px] md:min-h-[68px]",
          normal: "py-3 md:py-4 min-h-[64px] md:min-h-[80px]",
          spacious: "py-4 md:py-6 min-h-[76px] md:min-h-[96px]",
        };

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
      if (scale === "compact") return "px-6 sm:px-10";
      if (scale === "normal") return "px-12 sm:px-16 md:px-20";
      return "px-16 sm:px-24 md:px-32 lg:px-36";
    };

    const innerPadX = getInnerPadXClass();

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

    const effectiveDistribution = layout?.distribution || "between";
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

    const isShrinkSlim =
      scrollShape === "shrink_slim" && isScrolled && !isScrollingUp && currentScroll > 60;
    const baseInnerY = isMobileLayout
      ? mobileInnerYClasses[layout?.paddingInner || "normal"]
      : innerYClasses[layout?.paddingInner || "normal"];

    const innerY = isShrinkSlim
      ? "py-1.5 md:py-2 min-h-[46px] md:min-h-[54px]"
      : baseInnerY;
    const effectiveGap = gapClasses[layout?.gap || "normal"];
    const effectiveNavGap = navGapClasses[layout?.gap || "normal"];
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

    const showTopBar =
      !isMobileLayout &&
      !isShrinkSlim &&
      (!isScrolled || activeSurfaceType !== "transparent") &&
      !isHidden("topbar") &&
      ((!isHidden("topPhone") && content.topPhone) ||
        (!isHidden("topEmail") && content.topEmail) ||
        (!isHidden("topNotice") && content.topNotice));

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

    const headerShapeClasses = isEdgeToEdge
      ? cn(
          "w-full max-w-none mx-0 mt-0",
          styles.borderRadius && styles.borderRadius !== "none"
            ? getRadiusClass(radiusPreset)
            : "rounded-none"
        )
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
        {/* Barra Superior Corporativa (Topbar) */}
        {showTopBar && (
          <div
            className={cn(
              "w-full py-1.5 md:py-2 border-b border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-[11px] font-bold tracking-wider",
              innerPadX
            )}
          >
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {!isHidden("topPhone") && content.topPhone && (
                <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                  <DynamicIcon
                    name="Phone"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0"
                    style={{ color: accentColor }}
                  />
                  <EditableText
                    as="span"
                    value={content.topPhone}
                    elementKey="topPhone"
                    styles={styles}
                  />
                </div>
              )}

              {!isHidden("topEmail") && content.topEmail && (
                <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                  <DynamicIcon
                    name="Mail"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0"
                    style={{ color: accentColor }}
                  />
                  <EditableText
                    as="span"
                    value={content.topEmail}
                    elementKey="topEmail"
                    styles={styles}
                  />
                </div>
              )}
            </div>

            {!isHidden("topNotice") && content.topNotice && (
              <EditableText
                isBadge
                defaultIconName="Clock"
                accentColor={accentColor}
                value={content.topNotice}
                elementKey="topNotice"
                styles={styles}
                className="px-2.5 py-0.5 text-[9px]"
              />
            )}
          </div>
        )}

        {/* Barra Principal de Navegação */}
        <div
          className={cn(
            "w-full flex transition-all",
            isStretchY && "h-full flex-1",
            effectiveContentWidth,
            contentBoxPositionClass,
            effectiveJustify,
            effectiveAlign,
            getDirectionClass(),
            effectiveGap,
            innerY,
            innerPadX
          )}
        >
          {/* Logo / Nome da Marca */}
          {!isHidden("brandName") && (
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

          {/* Links e CTA no Desktop */}
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
                  effectiveAlign,
                  effectiveNavGap,
                  isReverse && "flex-row-reverse"
                )}
              >
                {content.navLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={getNormalizedHref(item.url)}
                    className={cn(
                      "font-black uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity relative group py-1 whitespace-nowrap",
                      isNarrowWidth ? "text-[10px]" : "text-[11px]"
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

            {/* CTA Desktop */}
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

            {/* Botão Hamburguer Mobile */}
            {hasMobileMenu && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0",
                  isMobileLayout ? "flex" : "md:hidden flex"
                )}
                aria-label="Abrir Menu"
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

        {/* GAVETA / DROPDOWN SUSPENSO MOBILE COM EFEITO DE SUPERFÍCIE */}
        {hasMobileMenu && mobileMenuOpen && (
          <div
            className={cn(
              "border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200",
              !isMobileLayout && "md:hidden"
            )}
          >
            <nav className="flex flex-col space-y-2.5">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold opacity-85 hover:opacity-100 hover:bg-white/5 transition-all flex items-center justify-between"
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
