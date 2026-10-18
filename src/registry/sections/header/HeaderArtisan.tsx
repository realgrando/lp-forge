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

const headerArtisanSchema = z.object({
  brandSubtitle: z.string(),
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
      none: "py-2 min-h-[56px]",
      compact: "py-3 md:py-4 min-h-[64px] md:min-h-[76px]",
      normal: "py-4 md:py-6 min-h-[72px] md:min-h-[96px]",
      spacious: "py-6 md:py-8 min-h-[84px] md:min-h-[120px]",
    };

    const padXClasses: Record<string, string> = {
      none: "px-0",
      compact: "px-4 sm:px-6",
      normal: "px-6 lg:px-12",
      spacious: "px-8 lg:px-20",
    };

    const innerY = innerYClasses[layout?.paddingInner || "normal"];
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
        {/* BARRA DESKTOP: Layout Editorial em 2 Níveis */}
        <div className={cn("hidden md:flex flex-col items-center gap-4 text-center", innerY, padX)}>
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
                    className="h-10 w-auto object-contain"
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
            <div className="w-full pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {hasNavLinks && (
                <nav className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
                  {content.navLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={getNormalizedHref(item.url)}
                      className="text-[10px] font-black uppercase tracking-[0.3em] opacity-65 hover:opacity-100 transition-opacity relative group py-1"
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
        <div className={cn("md:hidden flex items-center justify-between py-3", padX)}>
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
          <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
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
