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
    { key: "brandName", label: "Logo / Nome Centralizado" },
    { key: "logoImageUrl", label: "Imagem da Logo" },
    { key: "brandIcon", label: "Ícone da Marca" },
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
      label: "Botão de Reserva / CTA",
      type: "button",
      optionalKey: "ctaButton",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "none",
      paddingInner: "normal",
      paddingX: "normal",
      containerWidth: "full",
      sticky: true,
    },
    styles: {
      surfaceVariant: "bordered",
      borderRadius: "none",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      brandSubtitle: "ATELIER & ARQUITETURA AUTORAL",
      brandName: "NIVIX",
      logoImageUrl: "",
      logoImageRadius: "none",
      brandIcon: "Sparkles",
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
          headerShapeClasses,
          autoHideTransformClass,
          surfaceResolution.className
        )}
        style={{
          ...surfaceResolution.style,
        }}
      >
        {/* BARRA DESKTOP: Layout Editorial em 2 Níveis */}
        <div
          className={cn(
            isMobileLayout ? "hidden" : "hidden md:flex flex-col items-center gap-4 text-center",
            innerY,
            innerPadX
          )}
        >
          {/* Nível 1: Subtítulo Editorial + Marca Central */}
          <div className="flex flex-col items-center gap-1.5">
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

            {!isHidden("brandName") && (
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
                "w-full pt-4 border-t border-white/10 flex flex-wrap items-center justify-center",
                isNarrowWidth ? "gap-4 sm:gap-6" : "gap-8 sm:gap-12"
              )}
            >
              {hasNavLinks && (
                <nav
                  className={cn(
                    "flex flex-wrap items-center justify-center",
                    isNarrowWidth ? "gap-4 sm:gap-6" : "gap-8 sm:gap-10"
                  )}
                >
                  {content.navLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={getNormalizedHref(item.url)}
                      className={cn(
                        "font-black uppercase tracking-[0.3em] opacity-65 hover:opacity-100 transition-opacity relative group py-1 whitespace-nowrap",
                        isNarrowWidth ? "text-[9px]" : "text-[10px]"
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

              {hasCta && (
                <SmartButton
                  button={content.ctaButton}
                  elementKey="ctaButton"
                  styles={styles}
                  theme={theme}
                />
              )}
            </div>
          )}
        </div>

        {/* BARRA MOBILE: Compacta com Marca à Esquerda e Hamburguer à Direita */}
        <div
          className={cn(
            isMobileLayout
              ? "flex items-center justify-between"
              : "md:hidden flex items-center justify-between",
            innerY,
            innerPadX
          )}
        >
          {!isHidden("brandName") && (
            <a href="#" className="flex items-center gap-2 min-w-0">
              <div className="flex items-baseline truncate">
                <EditableText
                  as="span"
                  defaultIsHeading
                  value={content.brandName}
                  elementKey="brandName"
                  styles={styles}
                  className="text-xl font-light uppercase tracking-[0.25em]"
                />
                <span
                  className="text-xl font-black leading-none ml-0.5"
                  style={{ color: accentColor }}
                >
                  .
                </span>
              </div>
            </a>
          )}

          <div className="flex items-center gap-2">
            {hasCta && !hasNavLinks && (
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
              />
            )}

            {hasMobileMenu && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0"
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

        {/* GAVETA MOBILE SUSPENSA */}
        {hasMobileMenu && mobileMenuOpen && (
          <div
            className={cn(
              "border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200",
              !isMobileLayout && "md:hidden"
            )}
          >
            {!isHidden("brandSubtitle") && content.brandSubtitle && (
              <div className="pb-2 text-center">
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

            <nav className="flex flex-col space-y-2.5">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold opacity-85 hover:opacity-100 hover:bg-white/5 transition-all flex items-center justify-between"
                >
                  <span className="tracking-wider uppercase text-xs">{item.label}</span>
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
