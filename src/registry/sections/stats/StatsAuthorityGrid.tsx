"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const statsAuthorityGridSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  ctaButton: buttonConfigSchema,
  metrics: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      description: z.string().optional(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
});

export type StatsAuthorityGridContent = z.infer<typeof statsAuthorityGridSchema>;

export const StatsAuthorityGridSection = createSection<StatsAuthorityGridContent>({
  id: "stats.authority",
  name: "Stats Authority Split Grid",
  description:
    "Coluna de copy persuasiva e CTA à esquerda com grid 2x2 de cards de métricas detalhadas à direita.",
  category: "Stats",
  iconName: "Award",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "stats",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
    { key: "metrics", label: "Grid 2x2 de Métricas" },
    { key: "metricIcon", label: "Ícone nos Cards de Métrica" },
    { key: "metricDescription", label: "Descrição Curta nas Métricas" },
  ],
  contentSchema: statsAuthorityGridSchema,
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
      key: "ctaButton",
      label: "Botão de Ação (Coluna Esquerda)",
      type: "button",
      optionalKey: "ctaButton",
    },
    {
      key: "metrics",
      label: "Cards de Autoridade (Grid 2x2)",
      type: "array",
      optionalKey: "metrics",
      defaultNewItem: {
        value: "99.9%",
        label: "Nova Métrica",
        description: "Índice comprovado por auditoria independente.",
        iconName: "Award",
        accentColor: "",
      },
      itemFields: [
        { key: "value", label: "Número / Valor (Ex: 250+)", type: "text" },
        { key: "label", label: "Rótulo Principal", type: "text" },
        { key: "description", label: "Descrição Curta", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
        { key: "accentColor", label: "Cor Exclusiva (Opcional)", type: "color" },
      ],
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
      badge: "NOSSA AUTORIDADE",
      headline: "Construindo confiança através de dados reais.",
      subtitle:
        "Reconhecimento técnico e indicadores auditados que comprovam nossa liderança e solidez em cada entrega.",
      ctaButton: {
        enabled: true,
        text: "Conhecer Cases de Sucesso",
        url: "#cases",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      metrics: [
        {
          value: "250+",
          label: "Projetos de Elite",
          description: "Entregues com excelência técnica em todo o país.",
          iconName: "Award",
          accentColor: "",
        },
        {
          value: "15",
          label: "Prêmios do Setor",
          description: "Reconhecimento nacional em design e performance.",
          iconName: "Crown",
          accentColor: "",
        },
        {
          value: "10k+",
          label: "Horas de Engenharia",
          description: "Dedicação exclusiva de especialistas sênior.",
          iconName: "Zap",
          accentColor: "",
        },
        {
          value: "100%",
          label: "Prazos Cumpridos",
          description: "Compromisso contratual com cronograma rigoroso.",
          iconName: "Shield",
          accentColor: "",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showMetrics =
      !isHidden("metrics") && content.metrics && content.metrics.length > 0;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Coluna Esquerda: Copy + CTA */}
        <div
          className={cn(
            "space-y-6",
            showMetrics
              ? "lg:col-span-5"
              : "lg:col-span-12 max-w-3xl mx-auto text-center flex flex-col items-center"
          )}
        >
          <EditableText
            isBadge
            defaultIconName="Award"
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
            className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05]"
          />

          <EditableText
            as="p"
            value={content.subtitle}
            elementKey="subtitle"
            styles={styles}
            className="text-base sm:text-lg opacity-75 leading-relaxed"
          />

          {!isHidden("ctaButton") && content.ctaButton?.enabled && (
            <div className="pt-2">
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
              />
            </div>
          )}
        </div>

        {/* Coluna Direita: Grid 2x2 de Cards de Métricas */}
        {showMetrics && (
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.metrics.map((metric, idx) => {
              const itemColor = metric.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "group p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    ...(styles.borderWidth && styles.borderWidth !== "0"
                      ? {
                          borderWidth: `${styles.borderWidth}px`,
                          borderColor: styles.borderColor || `${itemColor}40`,
                        }
                      : {}),
                  }}
                >
                  {!isHidden("metricIcon") &&
                    metric.iconName &&
                    metric.iconName !== "none" && (
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 mb-6 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${itemColor}15`,
                          color: itemColor,
                        }}
                      >
                        <DynamicIcon name={metric.iconName} className="w-6 h-6" />
                      </div>
                    )}

                  <div className="space-y-2">
                    <div
                      className="text-4xl sm:text-5xl font-black tracking-tighter"
                      style={{
                        fontFamily: "var(--site-font-heading)",
                        color: itemColor,
                      }}
                    >
                      {metric.value}
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest opacity-90">
                      {metric.label}
                    </h3>
                    {!isHidden("metricDescription") && metric.description && (
                      <p className="text-xs sm:text-sm opacity-65 leading-relaxed pt-1">
                        {metric.description}
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
