"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const aboutStorySchema = z.object({
  badge: z.string(),
  headline: z.string(),
  featuredQuote: z.string(),
  storyText: z.string(),
  photoOneUrl: z.string(),
  photoOneCaption: z.string(),
  photoTwoUrl: z.string(),
  photoTwoCaption: z.string(),
  metrics: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      iconName: z.string().optional(),
    })
  ),
  primaryCta: buttonConfigSchema,
});

export type AboutStoryContent = z.infer<typeof aboutStorySchema>;

export const AboutStorySection = createSection<AboutStoryContent>({
  id: "about.story",
  name: "About Editorial Story",
  description:
    "Narrativa editorial com citação em destaque, história da marca, dupla de fotos estilizadas e painel de métricas.",
  category: "Sobre",
  iconName: "BookOpen",
  modes: ["LANDING_PAGE"],
  legacyType: "about",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "featuredQuote", label: "Citação Editorial em Destaque" },
    { key: "storyText", label: "Narrativa da História" },
    { key: "photoGallery", label: "Dupla de Fotos Editoriais" },
    { key: "metrics", label: "Painel de Métricas" },
    { key: "primaryCta", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: aboutStorySchema,
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
      key: "featuredQuote",
      label: "Citação em Destaque",
      type: "textarea",
      optionalKey: "featuredQuote",
      typographyElementKey: "featuredQuote",
    },
    {
      key: "storyText",
      label: "Narrativa da História",
      type: "textarea",
      optionalKey: "storyText",
      typographyElementKey: "storyText",
    },
    {
      key: "photoOneUrl",
      label: "Foto 01 (Esquerda)",
      type: "image",
      optionalKey: "photoGallery",
    },
    {
      key: "photoOneCaption",
      label: "Legenda da Foto 01",
      type: "text",
      optionalKey: "photoGallery",
      typographyElementKey: "photoOneCaption",
    },
    {
      key: "photoTwoUrl",
      label: "Foto 02 (Direita)",
      type: "image",
      optionalKey: "photoGallery",
    },
    {
      key: "photoTwoCaption",
      label: "Legenda da Foto 02",
      type: "text",
      optionalKey: "photoGallery",
      typographyElementKey: "photoTwoCaption",
    },
    {
      key: "metrics",
      label: "Métricas da Trajetória",
      type: "array",
      optionalKey: "metrics",
      defaultNewItem: {
        value: "99%",
        label: "Índice de Satisfação",
        iconName: "Sparkles",
      },
      itemFields: [
        { key: "value", label: "Valor (Ex: 10+)", type: "text" },
        { key: "label", label: "Descrição da Métrica", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
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
      badge: "NOSSA JORNADA",
      headline: "Uma história forjada no compromisso com o extraordinário.",
      featuredQuote:
        "“Valores sólidos guiam cada decisão técnica e transformam visões complexas em obras atemporais.”",
      storyText:
        "Nossa trajetória é marcada pela busca incessante da perfeição técnica e satisfação total dos nossos clientes. Combinamos métodos artesanais de precisão com tecnologia de ponta para entregar resultados que atravessam gerações.",
      photoOneUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900",
      photoOneCaption: "Arquitetura & Planejamento Estratégico",
      photoTwoUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=900",
      photoTwoCaption: "Execução de Alta Precisão em Campo",
      metrics: [
        { value: "12+", label: "Anos de História", iconName: "Calendar" },
        { value: "380+", label: "Projetos Assinados", iconName: "Trophy" },
        { value: "100%", label: "Compromisso Técnico", iconName: "ShieldCheck" },
      ],
      primaryCta: {
        enabled: true,
        text: "Iniciar um Projeto Conosco",
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

    const showPhotos =
      !isHidden("photoGallery") &&
      (Boolean(content.photoOneUrl) || Boolean(content.photoTwoUrl));
    const showMetrics =
      !isHidden("metrics") && content.metrics && content.metrics.length > 0;

    return (
      <div className="space-y-12">
        {/* Cabeçalho Editorial e Narrativa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-5">
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
              className="text-3xl sm:text-5xl font-black tracking-tighter leading-[1.05]"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            {!isHidden("featuredQuote") && content.featuredQuote && (
              <div
                className="pl-5 border-l-2 py-1"
                style={{ borderColor: accentColor }}
              >
                <EditableText
                  as="p"
                  value={content.featuredQuote}
                  elementKey="featuredQuote"
                  styles={styles}
                  className="text-lg sm:text-xl font-semibold italic opacity-90 leading-relaxed"
                />
              </div>
            )}

            <EditableText
              as="p"
              value={content.storyText}
              elementKey="storyText"
              styles={styles}
              className="text-sm sm:text-base opacity-70 leading-relaxed whitespace-pre-line"
            />
          </div>
        </div>

        {/* Dupla de Fotos */}
        {showPhotos && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                url: content.photoOneUrl,
                caption: content.photoOneCaption,
                key: "photoOneCaption",
              },
              {
                url: content.photoTwoUrl,
                caption: content.photoTwoCaption,
                key: "photoTwoCaption",
              },
            ]
              .filter((p) => Boolean(p.url))
              .map((photo, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "group relative overflow-hidden aspect-[16/10]",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || ""}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {photo.caption && (
                    <div className="absolute bottom-5 left-6 right-6">
                      <EditableText
                        as="span"
                        value={photo.caption}
                        elementKey={photo.key}
                        styles={styles}
                        className="text-xs font-bold uppercase tracking-widest opacity-90"
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Métricas e CTA */}
        {(showMetrics ||
          (!isHidden("primaryCta") && content.primaryCta?.enabled)) && (
          <div
            className={cn(
              "p-8 flex flex-wrap items-center justify-between gap-8",
              getSurfaceClasses(surfaceStyle),
              getRadiusClass(radiusPreset)
            )}
            style={{
              backgroundColor: styles.customSurface || undefined,
            }}
          >
            {showMetrics && (
              <div className="flex flex-wrap items-center gap-8 sm:gap-12">
                {content.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        color: accentColor,
                      }}
                    >
                      <DynamicIcon
                        name={m.iconName || "Sparkles"}
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <span
                        className="block text-2xl sm:text-3xl font-black tracking-tighter leading-none"
                        style={{ color: accentColor }}
                      >
                        {m.value}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                        {m.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isHidden("primaryCta") && content.primaryCta?.enabled && (
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
              />
            )}
          </div>
        )}
      </div>
    );
  },
});
