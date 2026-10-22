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

const headerCapsuleSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string().optional(),
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

    const innerPadXClasses: Record<string, string> = {
      none: "px-3",
      compact: "px-4 sm:px-6",
      normal: "px-5 sm:px-8",
      spacious: "px-6 sm:px-12",
    };

    const innerY = innerYClasses[layout?.paddingInner || "compact"];
    const innerPadX = innerPadXClasses[layout?.paddingInnerX || "normal"];

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

    const isAutoWidth = (layout?.componentWidth || "auto") === "auto";

    return (
      <header
        className={cn(
          "relative z-40 transition-all",
          isAutoWidth ? "w-auto max-w-fit" : "w-full",
          isStretchY && "h-full flex-1 flex flex-col"
        )}
      >
        <div
          className={cn(
            "flex transition-all shadow-2xl border border-white/10",
            isAutoWidth ? "w-auto max-w-fit gap-4 sm:gap-6" : "w-full",
            isStretchY && "h-full flex-1",
            justifyClass,
            effectiveAlign,
            getDirectionClass(),
            innerY,
            innerPadX,
            isEdgeToEdge
              ? "rounded-none border-l-0 border-r-0 border-t-0"
              : getRadiusClass(radiusPreset),
            getSurfaceClasses(surfaceStyle)
          )}
          style={{
            backgroundColor: styles.customSurface || undefined,
            ...(styles.borderWidth && styles.borderWidth !== "0" && !isEdgeToEdge
              ? {
                  borderWidth: `${styles.borderWidth}px`,
                  borderColor: styles.borderColor || `${accentColor}40`,
                }
              : {}),
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
                    className="h-8 w-auto object-contain"
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
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 mx-4">
              {content.navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={getNormalizedHref(item.url)}
                  className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* Ações à Direita */}
          <div className="flex items-center gap-2 shrink-0">
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
                className="md:hidden p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center shrink-0"
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
          <div className="md:hidden mt-2 p-4 rounded-3xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
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
