"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const statsImpactBannerSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  stats: z.array(
    z.object({
      number: z.string(),
      suffix: z.string(),
      label: z.string(),
      description: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type StatsImpactBannerContent = z.infer<typeof statsImpactBannerSchema>;

export const StatsImpactBannerSection = createSection<StatsImpactBannerContent>({
  id: "stats.impact",
  name: "Stats Monumental Impact",
  description:
    "Números gigantes monumentais com sufixo colorido, rótulo em caixa alta e descrição curta.",
  category: "Stats",
  iconName: "TrendingUp",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "stats",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "stats", label: "Lista de Números Monumentais" },
    { key: "statDivider", label: "Barra Decorativa sob o Número" },
    { key: "statDescription", label: "Descrição Curta dos Números" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: statsImpactBannerSchema,
  fields: [
    {
      key: "badge",
      label: "Badge Superior",
      type: "text",
      optionalKey: "badge",
      isBadge: true,
      typographyElementKey: "badge",
    },
    {
      key: "headline",
      label: "Título Principal",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Subtítulo",
      type: "textarea",
      optionalKey: "subtitle",
      typographyElementKey: "subtitle",
    },
    {
      key: "stats",
      label: "Números de Impacto",
      type: "array",
      optionalKey: "stats",
      defaultNewItem: {
        number: "100",
        suffix: "+",
        label: "Novo Indicador",
        description: "Crescimento consistente ano após ano.",
        accentColor: "",
      },
      itemFields: [
        { key: "number", label: "Número Base (Ex: 150)", type: "text" },
        { key: "suffix", label: "Sufixo Colorido (Ex: +, k, %)", type: "text" },
        { key: "label", label: "Rótulo", type: "text" },
        { key: "description", label: "Descrição Curta", type: "text" },
        { key: "accentColor", label: "Cor do Sufixo (Opcional)", type: "color" },
      ],
    },
    {
      key: "ctaButton",
      label: "Botão de Ação Inferior",
      type: "button",
      optionalKey: "ctaButton",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "spacious",
      containerWidth: "boxed",
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "lg",
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "NOSSOS NÚMEROS",
      headline: "Resultados que atestam nossa liderança",
      subtitle:
        "Escala comprovada por milhares de clientes e operações de missão crítica.",
      stats: [
        {
          number: "150",
          suffix: "+",
          label: "Obras Entregues",
          description: "Acabamento de alto padrão no prazo.",
          accentColor: "",
        },
        {
          number: "2.4",
          suffix: "k",
          label: "Clientes Felizes",
          description: "Satisfação máxima verificada.",
          accentColor: "",
        },
        {
          number: "15",
          suffix: "anos",
          label: "De Mercado",
          description: "Tradição e solidez ininterrupta.",
          accentColor: "",
        },
        {
          number: "99",
          suffix: "%",
          label: "Taxa de Aprovação",
          description: "Excelência técnica na primeira vistoria.",
          accentColor: "",
        },
      ],
      ctaButton: {
        enabled: false,
        text: "Solicitar Orçamento",
        url: "#contato",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showHeader =
      !isHidden("badge") || !isHidden("headline") || !isHidden("subtitle");

    return (
      <div className="space-y-14">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="TrendingUp"
              accentColor={accentColor}
              value={content.badge}
              elementKey="badge"
              styles={styles}
            />
            <EditableText
              as="h2"
              defaultIsHeading
              value={content.headline}
              elementKey="headline"
              styles={styles}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed"
            />
          </div>
        )}

        {!isHidden("stats") && content.stats && content.stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.stats.map((stat, idx) => {
              const statAccent = stat.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "group p-8 text-center flex flex-col items-center justify-center transition-all duration-300",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    ...(styles.borderWidth && styles.borderWidth !== "0"
                      ? {
                          borderWidth: `${styles.borderWidth}px`,
                          borderColor: styles.borderColor || `${statAccent}40`,
                        }
                      : {}),
                  }}
                >
                  <div
                    className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-3 transition-transform duration-300 group-hover:scale-105"
                    style={{ fontFamily: "var(--site-font-heading)" }}
                  >
                    <span>{stat.number}</span>
                    {stat.suffix && (
                      <span style={{ color: statAccent }}>{stat.suffix}</span>
                    )}
                  </div>

                  {!isHidden("statDivider") && (
                    <div
                      className="h-1 w-12 rounded-full mb-4 transition-all duration-300 group-hover:w-20"
                      style={{ backgroundColor: `${statAccent}70` }}
                    />
                  )}

                  <h3 className="text-xs font-black uppercase tracking-[0.25em] opacity-90 mb-1.5">
                    {stat.label}
                  </h3>

                  {!isHidden("statDescription") && stat.description && (
                    <p className="text-xs opacity-65 leading-relaxed max-w-[200px]">
                      {stat.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!isHidden("ctaButton") && content.ctaButton?.enabled && (
          <div className="flex justify-center pt-2">
            <SmartButton
              button={content.ctaButton}
              elementKey="ctaButton"
              styles={styles}
              theme={theme}
            />
          </div>
        )}
      </div>
    );
  },
});
