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
    const isFullWidth = (layout?.containerWidth || "boxed") === "full";
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

    const innerYClasses: Record<string, string> = {
      none: "py-1.5 min-h-[48px]",
      compact: "py-2.5 md:py-3 min-h-[56px] md:min-h-[64px]",
      normal: "py-3 md:py-4 min-h-[64px] md:min-h-[76px]",
      spacious: "py-4 md:py-6 min-h-[76px] md:min-h-[92px]",
    };

    const padXClasses: Record<string, string> = {
      none: "px-3",
      compact: "px-4 sm:px-6",
      normal: "px-5 sm:px-8 lg:px-10",
      spacious: "px-6 sm:px-12 lg:px-16",
    };

    const innerY = innerYClasses[layout?.paddingInner || "compact"];
    const padX = padXClasses[layout?.paddingX || "normal"];

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

    return (
      <header className="w-full relative z-40">
        <div
          className={cn(
            "w-full flex items-center transition-all shadow-xl border border-white/10",
            justifyClass,
            innerY,
            padX,
            isFullWidth
              ? "rounded-none border-l-0 border-r-0 border-t-0"
              : getRadiusClass(radiusPreset),
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
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 mx-4">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  className="text-xs font-semibold opacity-75 hover:opacity-100 transition-opacity relative group py-1"
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
              <div className={cn(hasNavLinks ? "hidden md:block" : "block")}>
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
                className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0"
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
          <div className="md:hidden mt-2 p-4 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
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
