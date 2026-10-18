"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const portfolioCaseStudySchema = z.object({
  badge: z.string(),
  clientName: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  mainImage: z.string(),
  challengeTitle: z.string(),
  challenge: z.string(),
  solutionTitle: z.string(),
  solution: z.string(),
  resultTitle: z.string(),
  result: z.string(),
  ctaButton: buttonConfigSchema,
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      iconName: z.string().optional(),
    })
  ),
});

export type PortfolioCaseStudyContent = z.infer<typeof portfolioCaseStudySchema>;

export const PortfolioCaseStudySection = createSection<PortfolioCaseStudyContent>({
  id: "portfolio.case_study",
  name: "Portfólio Estudo de Caso (Case)",
  description:
    "Apresentação profunda de Case de Sucesso com cliente, imagem panorâmica, métricas de impacto, Desafio, Solução, Resultado e CTA.",
  category: "Galeria & Portfólio",
  iconName: "Briefcase",
  modes: ["LANDING_PAGE"],
  legacyType: "portfolio",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "clientName", label: "Tag do Cliente" },
    { key: "headline", label: "Título Principal do Case" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "mainImage", label: "Imagem Panorâmica Principal" },
    { key: "stats", label: "Cards de Métricas Alcançadas" },
    { key: "narrative", label: "Tríade: Desafio, Solução e Resultado" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: portfolioCaseStudySchema,
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
      key: "clientName",
      label: "Nome do Cliente / Operação",
      type: "text",
      optionalKey: "clientName",
      typographyElementKey: "clientName",
    },
    {
      key: "headline",
      label: "Título do Case",
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
      key: "mainImage",
      label: "Imagem Principal do Projeto",
      type: "image",
      optionalKey: "mainImage",
    },
    {
      key: "stats",
      label: "Métricas Alcançadas",
      type: "array",
      optionalKey: "stats",
      defaultNewItem: {
        label: "Nova Métrica",
        value: "+150%",
        iconName: "TrendingUp",
      },
      itemFields: [
        { key: "label", label: "Rótulo (Ex: Área Total / ROI)", type: "text" },
        { key: "value", label: "Valor (Ex: 450m² / +3.4x)", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
      ],
    },
    {
      key: "challengeTitle",
      label: "Título: O Desafio",
      type: "text",
      optionalKey: "narrative",
    },
    {
      key: "challenge",
      label: "Texto: O Desafio",
      type: "textarea",
      optionalKey: "narrative",
      typographyElementKey: "challenge",
    },
    {
      key: "solutionTitle",
      label: "Título: A Solução",
      type: "text",
      optionalKey: "narrative",
    },
    {
      key: "solution",
      label: "Texto: A Solução",
      type: "textarea",
      optionalKey: "narrative",
      typographyElementKey: "solution",
    },
    {
      key: "resultTitle",
      label: "Título: O Resultado",
      type: "text",
      optionalKey: "narrative",
    },
    {
      key: "result",
      label: "Texto: O Resultado",
      type: "textarea",
      optionalKey: "narrative",
      typographyElementKey: "result",
    },
    {
      key: "ctaButton",
      label: "Botão de Ação do Case",
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
      badge: "CASE DE SUCESSO",
      clientName: "CLIENTE: MANSÃO ALPHA HOLDING",
      headline: "Reforma Estrutural & Automação na Mansão Alpha",
      subtitle:
        "Como transformamos um imóvel clássico em uma referência de engenharia contemporânea em apenas 90 dias.",
      mainImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400",
      challengeTitle: "O Desafio",
      challenge:
        "O cliente buscava modernização total de fachada e vãos livres sem comprometer a estrutura original datada de 1980.",
      solutionTitle: "A Solução",
      solution:
        "Implementamos reforço estrutural em fibra de carbono, esquadrias minimalistas termoacústicas e automação integrada.",
      resultTitle: "O Resultado",
      result:
        "Entrega concluída 15 dias antes do cronograma estipulado com valorização patrimonial imediata de 40%.",
      ctaButton: {
        enabled: true,
        text: "Quero um Projeto Neste Nível",
        url: "#contato",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      stats: [
        { label: "Área Construída", value: "450m²", iconName: "Layers" },
        { label: "Valorização", value: "+40%", iconName: "TrendingUp" },
        { label: "Prazo de Entrega", value: "75 Dias", iconName: "Zap" },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const narrativeBlocks = [
      {
        icon: "Flame",
        title: content.challengeTitle || "Desafio",
        text: content.challenge,
        key: "challenge",
      },
      {
        icon: "Sparkles",
        title: content.solutionTitle || "Solução",
        text: content.solution,
        key: "solution",
      },
      {
        icon: "TrendingUp",
        title: content.resultTitle || "Resultado",
        text: content.result,
        key: "result",
      },
    ];

    return (
      <div className="space-y-12">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <EditableText
                isBadge
                defaultIconName="Award"
                accentColor={accentColor}
                value={content.badge}
                elementKey="badge"
                styles={styles}
              />
              {!isHidden("clientName") && content.clientName && (
                <EditableText
                  as="span"
                  value={content.clientName}
                  elementKey="clientName"
                  styles={styles}
                  className="text-xs font-bold uppercase tracking-widest opacity-60"
                />
              )}
            </div>

            <EditableText
              as="h2"
              defaultIsHeading
              value={content.headline}
              elementKey="headline"
              styles={styles}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02]"
            />
          </div>

          <div className="space-y-4 lg:text-right max-w-md">
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-75 leading-relaxed"
            />
            {!isHidden("ctaButton") && content.ctaButton?.enabled && (
              <div className="flex lg:justify-end">
                <SmartButton
                  button={content.ctaButton}
                  elementKey="ctaButton"
                  styles={styles}
                  theme={theme}
                />
              </div>
            )}
          </div>
        </div>

        {/* HERO IMAGE + METRICS */}
        {(!isHidden("mainImage") || !isHidden("stats")) && (
          <div
            className={cn(
              "relative overflow-hidden border border-white/10 shadow-2xl",
              getRadiusClass(radiusPreset)
            )}
          >
            {!isHidden("mainImage") && content.mainImage && (
              <div className="relative aspect-video md:aspect-[21/9] w-full">
                <img
                  src={content.mainImage}
                  alt={content.headline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>
            )}

            {!isHidden("stats") && content.stats && content.stats.length > 0 && (
              <div
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8",
                  !isHidden("mainImage") && content.mainImage
                    ? "md:absolute md:bottom-0 md:inset-x-0"
                    : ""
                )}
              >
                {content.stats.map((s, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-5 flex items-center justify-between gap-4",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass(radiusPreset)
                    )}
                    style={{ backgroundColor: styles.customSurface || undefined }}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-1">
                        {s.label}
                      </span>
                      <span
                        className="text-2xl sm:text-3xl font-black tracking-tight"
                        style={{ color: accentColor }}
                      >
                        {s.value}
                      </span>
                    </div>
                    {s.iconName && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${accentColor}20`,
                          color: accentColor,
                        }}
                      >
                        <DynamicIcon name={s.iconName} className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NARRATIVE GRID (DESAFIO / SOLUÇÃO / RESULTADO) */}
        {!isHidden("narrative") && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {narrativeBlocks.map((block) => (
              <div
                key={block.key}
                className={cn(
                  "p-7 space-y-4",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{ backgroundColor: styles.customSurface || undefined }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon name={block.icon} className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest">
                    {block.title}
                  </h4>
                </div>
                <EditableText
                  as="p"
                  value={block.text}
                  elementKey={block.key}
                  styles={styles}
                  className="text-sm sm:text-base opacity-75 leading-relaxed"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});
