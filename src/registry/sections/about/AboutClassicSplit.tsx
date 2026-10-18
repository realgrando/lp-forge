"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const aboutClassicSplitSchema = z.object({
  mediaPosition: z.enum(["left", "right"]).default("left"),
  mainImage: z.string(),
  secondaryImage: z.string().optional(),
  experienceMetric: z.string(),
  experienceLabel: z.string(),
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  paragraphs: z.string(),
  features: z.array(
    z.object({
      text: z.string(),
      iconName: z.string().optional(),
    })
  ),
  primaryCta: buttonConfigSchema,
});

export type AboutClassicSplitContent = z.infer<typeof aboutClassicSplitSchema>;

export const AboutClassicSplitSection = createSection<AboutClassicSplitContent>(
  {
    id: "about.classic",
    name: "About Split & Experience Badge",
    description:
      "Seção Sobre Nós dividida com composição de imagens, selo flutuante de anos de experiência, checklist de diferenciais e CTA.",
    category: "Sobre",
    iconName: "Award",
    modes: ["LANDING_PAGE"],
    legacyType: "about",
    legacyVariant: "v1",
    toggleableElements: [
      { key: "mediaColumn", label: "Coluna de Imagens" },
      { key: "secondaryImage", label: "Segunda Foto Sobreposta" },
      { key: "experienceBadge", label: "Card Flutuante de Experiência" },
      { key: "badge", label: "Badge Superior" },
      { key: "headline", label: "Título Principal (Headline)" },
      { key: "subtitle", label: "Subtítulo em Destaque" },
      { key: "paragraphs", label: "Texto Institucional" },
      { key: "features", label: "Checklist de Diferenciais" },
      { key: "primaryCta", label: "Botão de Ação (CTA)" },
    ],
    contentSchema: aboutClassicSplitSchema,
    fields: [
      {
        key: "mediaPosition",
        label: "Posição da Coluna de Imagem",
        type: "select",
        optionalKey: "mediaColumn",
        options: [
          { value: "left", label: "Imagem na Esquerda" },
          { value: "right", label: "Imagem na Direita" },
        ],
      },
      {
        key: "mainImage",
        label: "Imagem Principal",
        type: "image",
        optionalKey: "mediaColumn",
      },
      {
        key: "secondaryImage",
        label: "Imagem Secundária Sobreposta (Opcional)",
        type: "image",
        optionalKey: "secondaryImage",
      },
      {
        key: "experienceMetric",
        label: "Card Flutuante: Número (Ex: 15+)",
        type: "text",
        optionalKey: "experienceBadge",
        typographyElementKey: "experienceMetric",
      },
      {
        key: "experienceLabel",
        label: "Card Flutuante: Legenda",
        type: "text",
        optionalKey: "experienceBadge",
        typographyElementKey: "experienceLabel",
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
        label: "Subtítulo",
        type: "textarea",
        optionalKey: "subtitle",
        typographyElementKey: "subtitle",
      },
      {
        key: "paragraphs",
        label: "Parágrafos Institucionais",
        type: "textarea",
        optionalKey: "paragraphs",
        typographyElementKey: "paragraphs",
      },
      {
        key: "features",
        label: "Checklist de Diferenciais",
        type: "array",
        optionalKey: "features",
        defaultNewItem: {
          text: "Novo diferencial técnico",
          iconName: "CheckCircle2",
        },
        itemFields: [
          { key: "text", label: "Texto do Diferencial", type: "text" },
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
        mediaPosition: "left",
        mainImage:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000",
        secondaryImage:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=700",
        experienceMetric: "15+",
        experienceLabel: "Anos de Excelência no Mercado",
        badge: "NOSSA ESSÊNCIA",
        headline: "Construindo com paixão, rigor técnico e precisão.",
        subtitle:
          "Nossa equipe multidisciplinar entrega acabamento superior em cada etapa do projeto.",
        paragraphs:
          "Desde a concepção até a entrega das chaves, nosso foco inegociável é a excelência construtiva e a transparência absoluta com cada cliente atendido.",
        features: [
          {
            text: "Equipe própria certificada e altamente treinada",
            iconName: "CheckCircle2",
          },
          {
            text: "Materiais homologados de altíssima durabilidade",
            iconName: "ShieldCheck",
          },
          {
            text: "Garantia estendida e suporte pós-entrega ágil",
            iconName: "Award",
          },
          {
            text: "Cumprimento rigoroso do cronograma acordado",
            iconName: "Clock",
          },
        ],
        primaryCta: {
          enabled: true,
          text: "Conhecer Nossa Trajetória",
          url: "#contato",
          variant: "solid",
          size: "md",
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

      const showMedia = !isHidden("mediaColumn") && Boolean(content.mainImage);
      const isRightMedia = content.mediaPosition === "right";
      const showFeatures =
        !isHidden("features") &&
        content.features &&
        content.features.length > 0;

      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Coluna de Mídia */}
          {showMedia && (
            <div
              className={cn(
                "lg:col-span-6 relative",
                isRightMedia && "lg:order-2"
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl",
                  getRadiusClass(radiusPreset)
                )}
              >
                <img
                  src={content.mainImage}
                  alt={content.headline || "Sobre"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Segunda Imagem Sobreposta Opcional */}
              {!isHidden("secondaryImage") && content.secondaryImage && (
                <div
                  className={cn(
                    "hidden sm:block absolute -bottom-6 -left-6 w-48 h-48 overflow-hidden border-4 border-[var(--site-bg)] shadow-2xl z-10",
                    getRadiusClass(radiusPreset)
                  )}
                >
                  <img
                    src={content.secondaryImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Card Flutuante de Anos de Mercado / Métrica */}
              {!isHidden("experienceBadge") && (
                <div
                  className={cn(
                    "sm:absolute -bottom-6 right-4 sm:right-6 mt-4 sm:mt-0 p-6 z-20 flex items-center gap-4 max-w-xs",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon name="Trophy" className="w-6 h-6" />
                  </div>
                  <div>
                    <EditableText
                      as="div"
                      defaultIsHeading
                      value={content.experienceMetric}
                      elementKey="experienceMetric"
                      styles={styles}
                      className="text-3xl font-black tracking-tighter leading-none"
                    />
                    <EditableText
                      as="span"
                      value={content.experienceLabel}
                      elementKey="experienceLabel"
                      styles={styles}
                      className="block text-[10px] font-bold uppercase tracking-widest opacity-65 mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Coluna de Texto */}
          <div
            className={cn(
              "space-y-6",
              showMedia ? "lg:col-span-6" : "lg:col-span-12 max-w-4xl mx-auto",
              isRightMedia && "lg:order-1"
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
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.08]"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-lg sm:text-xl font-bold opacity-90 leading-snug"
            />

            <EditableText
              as="p"
              value={content.paragraphs}
              elementKey="paragraphs"
              styles={styles}
              className="text-sm sm:text-base opacity-70 leading-relaxed whitespace-pre-line"
            />

            {showFeatures && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {content.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-sm font-semibold opacity-85"
                  >
                    <DynamicIcon
                      name={feat.iconName || "CheckCircle2"}
                      className="w-4 h-4 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span>{feat.text}</span>
                  </div>
                ))}
              </div>
            )}

            {!isHidden("primaryCta") && content.primaryCta?.enabled && (
              <div className="pt-3">
                <SmartButton
                  button={content.primaryCta}
                  elementKey="primaryCta"
                  styles={styles}
                  theme={theme}
                />
              </div>
            )}
          </div>
        </div>
      );
    },
  }
);
