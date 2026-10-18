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
  LayoutAlignItems,
  LayoutGap,
} from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const headerClassicSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
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
    },
    {
      key: "brandIcon",
      label: "Ícone da Marca (Opcional)",
      type: "icon",
      optionalKey: "brand",
    },
    {
      key: "justify",
      label: "Alinhamento Horizontal",
      type: "select",
      optionalKey: "navLinks",
      options: [
        { value: "between", label: "Extremidades (Between)" },
        { value: "center", label: "Centralizado (Center)" },
        { value: "start", label: "Alinhado à Esquerda (Start)" },
      ],
    },
    {
      key: "navLinks",
      label: "Links de Navegação",
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
      label: "Botão de Chamada (CTA)",
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
      surfaceVariant: "solid",
      borderRadius: "none",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      brandName: "NIVIX",
      logoImageUrl: "",
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
        radius: "md",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isFullWidth = (layout?.containerWidth || "full") === "full";
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

    // Respiro Interno Vertical do Header (controla a espessura e altura da barra sem mover o container por fora)
    const innerYClasses: Record<string, string> = {
      none: "py-1.5 min-h-[48px]",
      compact: "py-2 md:py-3 min-h-[56px] md:min-h-[68px]",
      normal: "py-3 md:py-5 min-h-[64px] md:min-h-[84px]",
      spacious: "py-4 md:py-8 min-h-[72px] md:min-h-[110px]",
    };

    // Respiro Lateral Horizontal do Header
    const padXClasses: Record<string, string> = {
      none: "px-0",
      compact: "px-3 sm:px-6",
      normal: "px-4 sm:px-8 lg:px-12",
      spacious: "px-5 sm:px-12 lg:px-24",
    };

    // Espaçamento entre Itens (Gap)
    const gapClasses: Record<LayoutGap, string> = {
      none: "gap-1",
      compact: "gap-4 sm:gap-6",
      normal: "gap-8 sm:gap-10",
      spacious: "gap-12 sm:gap-16",
      monumental: "gap-16 sm:gap-24",
    };

    const navGapClasses: Record<LayoutGap, string> = {
      none: "gap-2",
      compact: "gap-4",
      normal: "gap-7",
      spacious: "gap-10",
      monumental: "gap-14",
    };

    // Alinhamento Transversal (Vertical)
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

    const contentBoxPositionClass =
      effectiveDistribution === "start"
        ? "mr-auto ml-0"
        : effectiveDistribution === "end"
        ? "ml-auto mr-0"
        : "mx-auto";

    const innerY = innerYClasses[layout?.paddingInner || "normal"];
    const padX = padXClasses[layout?.paddingX || "normal"];
    const effectiveGap = gapClasses[layout?.gap || "normal"];
    const effectiveNavGap = navGapClasses[layout?.gap || "normal"];
    const effectiveAlign = alignClasses[layout?.alignItems || "center"];
    const effectiveContentWidth =
      contentWidthClasses[layout?.contentMaxWidth || "full"];
    const isReverse = Boolean(layout?.reverse);
    const direction = layout?.direction || "row";

    const getHeaderDirectionClass = () => {
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

    const renderHeaderInner = () => (
      <div
        className={cn(
          "w-full flex items-center justify-between md:flex-wrap transition-all",
          effectiveContentWidth,
          contentBoxPositionClass,
          justifyClass,
          effectiveAlign,
          effectiveGap,
          innerY,
          padX,
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
                className="h-8 sm:h-9 w-auto object-contain"
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
                "hidden md:flex items-center",
                effectiveAlign,
                effectiveNavGap,
                isReverse && "flex-row-reverse"
              )}
            >
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  className="text-[12px] font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity hover:text-[#FFBE2E]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* CTA no desktop (ou mobile se não houver menu hamburger) */}
          {hasCta && (
            <div className={cn(hasNavLinks ? "hidden md:block" : "block")}>
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
              />
            </div>
          )}

          {/* Botão Hamburger Mobile */}
          {hasMobileMenu && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all focus:outline-none border border-white/10 bg-white/5"
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
            "md:hidden w-full border-t border-white/10 px-5 py-4 flex flex-col gap-3.5 animate-in fade-in-50 slide-in-from-top-2 duration-200",
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
            <div className={cn(hasNavLinks && "pt-3 border-t border-white/10")}>
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
                className="w-full text-center"
              />
            </div>
          )}
        </div>
      );
    };

    // MODO A: BARRA TOTAL (Edge-to-Edge, estilo Nivix LP / Barra Fixa)
    if (isFullWidth) {
      return (
        <header
          className={cn(
            "w-full transition-all border-b border-white/10 backdrop-blur-md",
            styles.borderRadius && styles.borderRadius !== "none"
              ? getRadiusClass(radiusPreset)
              : "rounded-none border-l-0 border-r-0 border-t-0",
            getSurfaceClasses(surfaceStyle)
          )}
          style={{
            backgroundColor: styles.customSurface || undefined,
            ...(styles.borderWidth && styles.borderWidth !== "0"
              ? { borderBottomWidth: `${styles.borderWidth}px` }
              : styles.borderWidth === "0"
              ? { borderBottomWidth: "0px" }
              : {}),
            ...(styles.borderColor ? { borderColor: styles.borderColor } : {}),
          }}
        >
          {renderHeaderInner()}
          {renderMobileDrawer()}
        </header>
      );
    }

    // MODO B: CÁPSULA FLUTUANTE (Padrão 1024px / Estreito 768px / Mobile 448px)
    return (
      <header
        className={cn(
          "w-full transition-all shadow-xl overflow-hidden",
          getSurfaceClasses(surfaceStyle),
          getRadiusClass(radiusPreset)
        )}
        style={{
          backgroundColor: styles.customSurface || undefined,
          ...(styles.borderWidth && styles.borderWidth !== "0"
            ? { borderWidth: `${styles.borderWidth}px` }
            : styles.borderWidth === "0"
            ? { borderWidth: "0px" }
            : {}),
          ...(styles.borderColor ? { borderColor: styles.borderColor } : {}),
        }}
      >
        {renderHeaderInner()}
        {renderMobileDrawer()}
      </header>
    );
  },
});
