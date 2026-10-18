"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const aboutImpactSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  pillars: z.array(
    z.object({
      number: z.string(),
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
    })
  ),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  primaryCta: buttonConfigSchema,
});

export type AboutImpactContent = z.infer<typeof aboutImpactSchema>;

export const AboutImpactSection = createSection<AboutImpactContent>({
  id: "about.impact",
  name: "About Manifesto & Pillars",
  description:
    "Headline monumental de manifesto acompanhada por grid de pilares/valores numerados, métricas de impacto e CTA.",
  category: "Sobre",
  iconName: "Target",
  modes: ["LANDING_PAGE"],
  legacyType: "about",
  legacyVariant: "v4",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Headline Monumental (Manifesto)" },
    { key: "subtitle", label: "Subtítulo do Manifesto" },
    { key: "pillars", label: "Grid de Pilares / Valores" },
    { key: "stats", label: "Faixa de Números de Impacto" },
    { key: "primaryCta", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: aboutImpactSchema,
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
      label: "Headline Monumental de Manifesto",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Subtítulo Explicativo",
      type: "textarea",
      optionalKey: "subtitle",
      typographyElementKey: "subtitle",
    },
    {
      key: "pillars",
      label: "Pilares / Valores Fundamentais",
      type: "array",
      optionalKey: "pillars",
      defaultNewItem: {
        number: "04",
        title: "Novo Pilar",
        description: "Descrição objetiva deste pilar fundamental.",
        iconName: "Sparkles",
      },
      itemFields: [
        { key: "number", label: "Número / Índice (Ex: 01)", type: "text" },
        { key: "title", label: "Título do Pilar", type: "text" },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "iconName", label: "Ícone", type: "icon" },
      ],
    },
    {
      key: "stats",
      label: "Números de Impacto",
      type: "array",
      optionalKey: "stats",
      defaultNewItem: { value: "500+", label: "Projetos Concluídos" },
      itemFields: [
        { key: "value", label: "Valor (Ex: 500+)", type: "text" },
        { key: "label", label: "Legenda", type: "text" },
      ],
    },
    {
      key: "primaryCta",
      label: "Botão de Ação (CTA)",
      type: "button",
      optionalKey: "primaryCta",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "spacious",
      containerWidth: "boxed",
    },
    styles: {
      ambientGlow: true,
      surfaceVariant: "glass",
      borderRadius: "lg",
      hiddenElements: {},
    },
    content: {
      badge: "MANIFESTO DE IMPACTO",
      headline: "Construindo um legado de excelência técnica e estética.",
      subtitle:
        "Nossos pilares inegociáveis sustentam cada entrega e garantem performance superior do projeto executivo ao acabamento final.",
      pillars: [
        {
          number: "01",
          title: "Precisão Cirúrgica",
          description:
            "Planejamento milimétrico e controle de qualidade rigoroso em todas as etapas.",
          iconName: "Target",
        },
        {
          number: "02",
          title: "Inovação Constante",
          description:
            "Tecnologia construtiva e materiais modernos para máxima eficiência e durabilidade.",
          iconName: "Zap",
        },
        {
          number: "03",
          title: "Compromisso Real",
          description:
            "Transparência total em prazos, custos e comunicação direta com o cliente.",
          iconName: "ShieldCheck",
        },
      ],
      stats: [
        { value: "500+", label: "Projetos Entregues" },
        { value: "100%", label: "Satisfação Comprovada" },
        { value: "15+", label: "Anos de Liderança" },
      ],
      primaryCta: {
        enabled: true,
        text: "Explorar Nossos Cases",
        url: "#portfolio",
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

    const showPillars =
      !isHidden("pillars") && content.pillars && content.pillars.length > 0;
    const showStats =
      !isHidden("stats") && content.stats && content.stats.length > 0;

    return (
      <div className="space-y-12">
        {/* Cabeçalho Monumental do Manifesto */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-5">
            <EditableText
              isBadge
              defaultIconName="ShieldCheck"
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
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02]"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-75 leading-relaxed max-w-2xl"
            />
          </div>

          {!isHidden("primaryCta") && content.primaryCta?.enabled && (
            <div className="shrink-0">
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
              />
            </div>
          )}
        </div>

        {/* Grid de Pilares */}
        {showPillars && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-8 flex flex-col justify-between gap-6 transition-all group",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{
                  backgroundColor: styles.customSurface || undefined,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      borderColor: `${accentColor}30`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon
                      name={pillar.iconName || "Target"}
                      className="w-5 h-5"
                    />
                  </div>
                  <span
                    className="text-2xl font-black font-mono opacity-40"
                    style={{ color: accentColor }}
                  >
                    {pillar.number || `0${idx + 1}`}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <h3 className="text-xl font-black tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Faixa de Números de Impacto */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
            {content.stats.map((stat, idx) => (
              <div
                key={idx}
                className="border-l-2 pl-5"
                style={{ borderColor: `${accentColor}60` }}
              >
                <span
                  className="block text-3xl sm:text-5xl font-black tracking-tighter"
                  style={{ color: accentColor }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});
