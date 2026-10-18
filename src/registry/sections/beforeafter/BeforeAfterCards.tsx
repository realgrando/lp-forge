"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const beforeAfterCardsSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  cases: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
      resultMetric: z.string(),
      description: z.string(),
      beforeImage: z.string(),
      afterImage: z.string(),
      beforeTag: z.string().optional(),
      afterTag: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type BeforeAfterCardsContent = z.infer<typeof beforeAfterCardsSchema>;

export const BeforeAfterCardsSection = createSection<BeforeAfterCardsContent>({
  id: "beforeafter.cards",
  name: "Antes & Depois (Cards Comparativos)",
  description:
    "Grid de transformações onde cada card mostra imagem Antes + imagem Depois lado a lado, título do projeto, duração e resultado.",
  category: "Antes & Depois",
  iconName: "Layers",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "beforeafter",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "cases", label: "Grid de Cards Comparativos" },
    { key: "imageLabels", label: "Etiquetas Antes / Depois nas Fotos" },
    { key: "caseMeta", label: "Badges de Duração e Resultado" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: beforeAfterCardsSchema,
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
      key: "cases",
      label: "Cases de Transformação",
      type: "array",
      optionalKey: "cases",
      defaultNewItem: {
        title: "Novo Projeto Transformado",
        duration: "45 Dias",
        resultMetric: "+180% Valorização",
        description:
          "Modernização estrutural e estética com materiais de altíssima durabilidade.",
        beforeImage:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
        afterImage:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
        beforeTag: "Antes",
        afterTag: "Depois",
      },
      itemFields: [
        { key: "title", label: "Título do Projeto", type: "text" },
        { key: "duration", label: "Duração (Ex: 30 Dias)", type: "text" },
        { key: "resultMetric", label: "Resultado Obtido", type: "text" },
        { key: "description", label: "Descrição da Transformação", type: "textarea" },
        { key: "beforeImage", label: "Foto ANTES", type: "image" },
        { key: "afterImage", label: "Foto DEPOIS", type: "image" },
        { key: "beforeTag", label: "Selo Foto 1", type: "text" },
        { key: "afterTag", label: "Selo Foto 2", type: "text" },
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
      badge: "CASES DE TRANSFORMAÇÃO",
      headline: "O Poder da Execução de Alto Padrão",
      subtitle:
        "Compare lado a lado o estado inicial e a entrega final dos nossos projetos mais desafiadores.",
      cases: [
        {
          title: "Reforma Residencial Gourmet",
          duration: "6 semanas",
          resultMetric: "+45% Valor de Mercado",
          description:
            "Integração completa de ambientes, iluminação arquitetônica em LED e revestimentos nobres.",
          beforeImage:
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
          afterImage:
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
          beforeTag: "Antes",
          afterTag: "Depois",
        },
        {
          title: "Retrofit Fachada Flagship",
          duration: "4 semanas",
          resultMetric: "2.3x Fluxo de Clientes",
          description:
            "Modernização de fachada comercial com pele de vidro temperado e identidade luminosa.",
          beforeImage:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
          afterImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
          beforeTag: "Antes",
          afterTag: "Depois",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Avaliar Meu Projeto",
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
      <div className="space-y-12">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="Sparkles"
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
              className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.03]"
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

        {!isHidden("cases") && content.cases && content.cases.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {content.cases.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "group overflow-hidden flex flex-col justify-between transition-all duration-300",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{
                  backgroundColor: styles.customSurface || undefined,
                  ...(styles.borderWidth && styles.borderWidth !== "0"
                    ? {
                        borderWidth: `${styles.borderWidth}px`,
                        borderColor: styles.borderColor || `${accentColor}40`,
                      }
                    : {}),
                }}
              >
                {/* Par de Imagens Antes + Depois Lado a Lado */}
                <div className="grid grid-cols-2 gap-1 p-2 bg-black/20">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} - Antes`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {!isHidden("imageLabels") && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-black uppercase tracking-widest text-white">
                        {item.beforeTag || "Antes"}
                      </span>
                    )}
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={item.afterImage}
                      alt={`${item.title} - Depois`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {!isHidden("imageLabels") && (
                      <span
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md"
                        style={{
                          backgroundColor: accentColor,
                          color: "#09090B",
                        }}
                      >
                        {item.afterTag || "Depois"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 sm:p-8 space-y-4">
                  {!isHidden("caseMeta") && (item.duration || item.resultMetric) && (
                    <div className="flex flex-wrap items-center gap-2">
                      {item.duration && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 opacity-85">
                          <DynamicIcon name="Calendar" className="w-3 h-3" />
                          {item.duration}
                        </span>
                      )}
                      {item.resultMetric && (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border"
                          style={{
                            color: accentColor,
                            borderColor: `${accentColor}35`,
                            backgroundColor: `${accentColor}15`,
                          }}
                        >
                          <DynamicIcon name="TrendingUp" className="w-3 h-3" />
                          {item.resultMetric}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3
                      className="text-xl sm:text-2xl font-black tracking-tight"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm opacity-75 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
