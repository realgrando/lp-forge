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

const headerEnterpriseSchema = z.object({
  topPhone: z.string(),
  topEmail: z.string(),
  topNotice: z.string(),
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
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
      paddingY: "none",
      paddingInner: "normal",
      paddingX: "normal",
      containerWidth: "full",
      sticky: true,
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
        radius: "full",
        iconName: "ShieldCheck",
        iconPosition: "left",
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

    const innerYClasses: Record<string, string> = {
      none: "py-1.5 min-h-[48px]",
      compact: "py-2.5 md:py-3.5 min-h-[56px] md:min-h-[68px]",
      normal: "py-3 md:py-4 min-h-[64px] md:min-h-[80px]",
      spacious: "py-4 md:py-6 min-h-[76px] md:min-h-[96px]",
    };

    const padXClasses: Record<string, string> = {
      none: "px-0",
      compact: "px-3 sm:px-6",
      normal: "px-4 sm:px-8 lg:px-12",
      spacious: "px-5 sm:px-12 lg:px-24",
    };

    const gapClasses: Record<LayoutGap, string> = {
      none: "gap-1",
      compact: "gap-4 sm:gap-6",
      normal: "gap-6 sm:gap-8",
      spacious: "gap-8 sm:gap-12",
      monumental: "gap-12 sm:gap-16",
    };

    const navGapClasses: Record<LayoutGap, string> = {
      none: "gap-2",
      compact: "gap-4",
      normal: "gap-7",
      spacious: "gap-10",
      monumental: "gap-14",
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

    const showTopBar =
      !isHidden("topbar") &&
      ((!isHidden("topPhone") && content.topPhone) ||
        (!isHidden("topEmail") && content.topEmail) ||
        (!isHidden("topNotice") && content.topNotice));

    return (
      <header
        className={cn(
          "w-full transition-all relative z-40",
          isFullWidth
            ? "border-b border-white/10 rounded-none border-l-0 border-r-0 border-t-0"
            : cn("shadow-xl border border-white/10", getRadiusClass(radiusPreset)),
          getSurfaceClasses(surfaceStyle)
        )}
        style={{
          backgroundColor: styles.customSurface || undefined,
          ...(styles.borderWidth && styles.borderWidth !== "0" && !isFullWidth
            ? {
                borderWidth: `${styles.borderWidth}px`,
                borderColor: styles.borderColor || `${accentColor}40`,
              }
            : {}),
        }}
      >
        {/* Barra Superior Corporativa (Topbar) */}
        {showTopBar && (
          <div
            className={cn(
              "w-full py-1.5 md:py-2 border-b border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-[11px] font-bold tracking-wider",
              padX
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
            "w-full flex items-center justify-between transition-all",
            effectiveContentWidth,
            contentBoxPositionClass,
            justifyClass,
            effectiveAlign,
            effectiveGap,
            innerY,
            padX
          )}
        >
          {/* Logo / Nome da Marca */}
          {!isHidden("brandName") && (
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
                    className="text-[11px] font-black uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity relative group py-1"
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
              <div className={cn(hasNavLinks ? "hidden md:block" : "block")}>
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
                className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0"
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
          <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
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
              <div className="pt-2 border-t border-white/10">
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
