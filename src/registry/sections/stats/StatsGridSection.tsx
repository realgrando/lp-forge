"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const statsGridSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
});

export type StatsGridContent = z.infer<typeof statsGridSchema>;

export const StatsGridSection = createSection<StatsGridContent>({
  id: "stats.grid",
  name: "Stats & KPIs Impact Grid",
  description: "Grade de números e resultados de impacto com ícones e cores customizáveis por indicador.",
  category: "Métricas & Números",
  iconName: "TrendingUp",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "eyebrow", label: "Badge da Seção" },
    { key: "headline", label: "Título da Seção" },
    { key: "stats", label: "Cards de Indicadores" },
  ],
  contentSchema: statsGridSchema,
  fields: [
    {
      key: "eyebrow",
      label: "Badge Superior",
      type: "text",
      optionalKey: "eyebrow",
      isBadge: true,
      typographyElementKey: "eyebrow",
    },
    {
      key: "headline",
      label: "Título dos Resultados",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "stats",
      label: "Indicadores (KPIs)",
      type: "array",
      optionalKey: "stats",
      defaultNewItem: {
        value: "+150%",
        label: "Novo Indicador",
        description: "Descrição do impacto gerado.",
        iconName: "TrendingUp",
        accentColor: "",
      },
      itemFields: [
        { key: "value", label: "Valor Numérico (Ex: R$ 12M, 99.8%)", type: "text" },
        { key: "label", label: "Título do Indicador", type: "text" },
        { key: "description", label: "Contexto Curto", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
        { key: "accentColor", label: "Cor Exclusiva (Opcional)", type: "color" },
      ],
    },
  ],
  defaultData: {
    layout: {
      paddingY: "normal",
      containerWidth: "boxed",
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "lg",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      eyebrow: "RESULTADOS COMPROVADOS",
      headline: "Números que sustentam nossa engenharia.",
      stats: [
        {
          value: "+R$ 48M",
          label: "Gerados em Vendas Diretas",
          description: "Através de páginas de alta conversão construídas sob medida.",
          iconName: "TrendingUp",
        },
        {
          value: "99.98%",
          label: "Disponibilidade Global",
          description: "Arquitetura estática e serverless imune a quedas de tráfego.",
          iconName: "Shield",
        },
        {
          value: "3.8x",
          label: "Velocidade de Entrega",
          description: "Designers lançam projetos completos em horas, não semanas.",
          iconName: "Zap",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div className="space-y-10">
        {(!hidden.eyebrow || !hidden.headline) && (
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <EditableText
              isBadge
              defaultIconName="TrendingUp"
              accentColor={accentColor}
              value={content.eyebrow}
              elementKey="eyebrow"
              styles={styles}
            />
            <EditableText
              as="h2"
              defaultIsHeading
              value={content.headline}
              elementKey="headline"
              styles={styles}
              className="text-3xl sm:text-4xl font-black tracking-tight"
            />
          </div>
        )}

        {!hidden.stats && content.stats && content.stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.stats.map((stat, idx) => {
              const statAccent = stat.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "p-7 space-y-4 transition-all",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{ backgroundColor: styles.customSurface || undefined }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-4xl sm:text-5xl font-black tracking-tighter"
                      style={{
                        color: statAccent,
                        fontFamily: "var(--site-font-heading)",
                      }}
                    >
                      {stat.value}
                    </span>
                    {stat.iconName && stat.iconName !== "none" && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${statAccent}15`,
                          color: statAccent,
                        }}
                      >
                        <DynamicIcon name={stat.iconName} className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold">{stat.label}</h3>
                    {stat.description && (
                      <p className="text-xs opacity-70 leading-relaxed">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
