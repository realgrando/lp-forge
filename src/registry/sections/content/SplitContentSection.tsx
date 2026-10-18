"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const splitContentSchema = z.object({
  imagePosition: z.enum(["left", "right"]).default("left"),
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  imageUrl: z.string(),
  imageCaption: z.string().optional(),
  bullets: z.array(
    z.object({
      text: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  primaryCta: buttonConfigSchema,
  secondaryCta: buttonConfigSchema,
});

export type SplitContentData = z.infer<typeof splitContentSchema>;

export const SplitContentSection = createSection<SplitContentData>({
  id: "content.split",
  name: "Split Content (Imagem + Texto)",
  description:
    "Seção flexível Imagem + Texto com opção de posição da imagem (esquerda ou direita), badge, headline, subtítulo, bullet points e dois botões CTA.",
  category: "Sobre",
  iconName: "Layers",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "splitcontent",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "imageBlock", label: "Bloco de Imagem" },
    { key: "imageCaption", label: "Selo / Legenda Flutuante na Imagem" },
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Texto / Subtítulo Explicativo" },
    { key: "bullets", label: "Lista de Tópicos (Bullet Points)" },
    { key: "primaryCta", label: "Botão Principal (CTA 1)" },
    { key: "secondaryCta", label: "Botão Secundário (CTA 2)" },
  ],
  contentSchema: splitContentSchema,
  fields: [
    {
      key: "imagePosition",
      label: "Posição da Imagem (Desktop)",
      type: "select",
      options: [
        { value: "left", label: "Imagem à Esquerda" },
        { value: "right", label: "Imagem à Direita" },
      ],
    },
    {
      key: "imageUrl",
      label: "Imagem em Destaque",
      type: "image",
      optionalKey: "imageBlock",
    },
    {
      key: "imageCaption",
      label: "Selo Flutuante na Imagem",
      type: "text",
      optionalKey: "imageCaption",
      typographyElementKey: "imageCaption",
    },
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
      label: "Parágrafo / Narrativa",
      type: "textarea",
      optionalKey: "subtitle",
      typographyElementKey: "subtitle",
    },
    {
      key: "bullets",
      label: "Tópicos de Destaque (Bullets)",
      type: "array",
      optionalKey: "bullets",
      defaultNewItem: {
        text: "Novo diferencial estratégico comprovado",
        iconName: "CheckCircle2",
        accentColor: "",
      },
      itemFields: [
        { key: "text", label: "Texto do Tópico", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
        { key: "accentColor", label: "Cor do Ícone (Opcional)", type: "color" },
      ],
    },
    {
      key: "primaryCta",
      label: "Botão Principal (CTA 1)",
      type: "button",
      optionalKey: "primaryCta",
    },
    {
      key: "secondaryCta",
      label: "Botão Secundário (CTA 2)",
      type: "button",
      optionalKey: "secondaryCta",
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
      imagePosition: "left",
      badge: "NOSSA FILOSOFIA",
      headline: "Design Estratégico & Execução Impecável",
      subtitle:
        "Unimos estética refinada com engenharia de conversão. Cada detalhe do projeto é planejado para transmitir autoridade imediata e transformar visitantes em clientes fiéis.",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
      imageCaption: "Padrão Internacional de Qualidade",
      bullets: [
        {
          text: "Acompanhamento personalizado em todas as fases do projeto",
          iconName: "CheckCircle2",
          accentColor: "",
        },
        {
          text: "Materiais e tecnologias de última geração com garantia estendida",
          iconName: "Shield",
          accentColor: "",
        },
        {
          text: "Foco absoluto em retorno sobre o investimento e prazos reais",
          iconName: "Zap",
          accentColor: "",
        },
      ],
      primaryCta: {
        enabled: true,
        text: "Agendar Reunião Estratégica",
        url: "#contato",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      secondaryCta: {
        enabled: true,
        text: "Conhecer Portfólio",
        url: "#portfolio",
        variant: "outline",
        size: "lg",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showImage = !isHidden("imageBlock") && Boolean(content.imageUrl);
    const isImageRight = content.imagePosition === "right";
    const showPrimaryBtn =
      !isHidden("primaryCta") && Boolean(content.primaryCta?.enabled);
    const showSecondaryBtn =
      !isHidden("secondaryCta") && Boolean(content.secondaryCta?.enabled);
    const showBullets =
      !isHidden("bullets") && content.bullets && content.bullets.length > 0;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Coluna de Imagem */}
        {showImage && (
          <div
            className={cn(
              "lg:col-span-6",
              isImageRight ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden p-2 transition-all duration-500 group",
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
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden",
                  getRadiusClass(radiusPreset === "full" ? "lg" : radiusPreset)
                )}
              >
                <img
                  src={content.imageUrl}
                  alt={content.headline || "Imagem em destaque"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {!isHidden("imageCaption") && content.imageCaption && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 flex items-center gap-2">
                    <DynamicIcon
                      name="Sparkles"
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <EditableText
                      as="span"
                      value={content.imageCaption}
                      elementKey="imageCaption"
                      styles={styles}
                      className="text-xs font-bold tracking-wide text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Coluna de Texto */}
        <div
          className={cn(
            "space-y-6",
            showImage
              ? cn("lg:col-span-6", isImageRight ? "lg:order-1" : "lg:order-2")
              : "lg:col-span-12 max-w-3xl mx-auto text-center flex flex-col items-center"
          )}
        >
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
            className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05]"
          />

          <EditableText
            as="p"
            value={content.subtitle}
            elementKey="subtitle"
            styles={styles}
            className="text-base sm:text-lg opacity-75 leading-relaxed whitespace-pre-line"
          />

          {showBullets && (
            <div
              className={cn(
                "space-y-3 pt-2",
                !showImage && "flex flex-col items-center"
              )}
            >
              {content.bullets.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base opacity-90"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${item.accentColor || accentColor}20`,
                      color: item.accentColor || accentColor,
                    }}
                  >
                    <DynamicIcon
                      name={item.iconName || "CheckCircle2"}
                      className="w-3.5 h-3.5"
                    />
                  </div>
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          )}

          {(showPrimaryBtn || showSecondaryBtn) && (
            <div
              className={cn(
                "flex flex-wrap items-center gap-4 pt-3",
                !showImage && "justify-center"
              )}
            >
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
              />
              <SmartButton
                button={content.secondaryCta}
                elementKey="secondaryCta"
                styles={styles}
                theme={theme}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
});
