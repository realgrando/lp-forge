"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const featuresClassicGridSchema = z.object({
  columns: z.enum(["2", "3", "4"]).default("3"),
  headerAlign: z.enum(["center", "left"]).default("center"),
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
      tag: z.string().optional(),
    })
  ),
  sectionCta: buttonConfigSchema,
});

export type FeaturesClassicGridContent = z.infer<
  typeof featuresClassicGridSchema
>;

export const FeaturesClassicGridSection =
  createSection<FeaturesClassicGridContent>({
    id: "features.classic",
    name: "Features Classic Icon Grid",
    description:
      "Grid configurável de 2, 3 ou 4 colunas de cards com ícone dinâmico, tag opcional, título, descrição e CTA da seção.",
    category: "Features",
    iconName: "Grid",
    modes: ["LANDING_PAGE"],
    legacyType: "features",
    legacyVariant: "v1",
    toggleableElements: [
      { key: "badge", label: "Badge Superior" },
      { key: "headline", label: "Título Principal (Headline)" },
      { key: "subtitle", label: "Subtítulo da Seção" },
      { key: "items", label: "Grid de Cards de Diferenciais" },
      { key: "cardTags", label: "Tags Internas dos Cards" },
      { key: "sectionCta", label: "Botão de Ação da Seção (CTA)" },
    ],
    contentSchema: featuresClassicGridSchema,
    fields: [
      {
        key: "columns",
        label: "Número de Colunas (Desktop)",
        type: "select",
        optionalKey: "items",
        options: [
          { value: "2", label: "2 Colunas" },
          { value: "3", label: "3 Colunas" },
          { value: "4", label: "4 Colunas" },
        ],
      },
      {
        key: "headerAlign",
        label: "Alinhamento do Cabeçalho",
        type: "select",
        options: [
          { value: "center", label: "Centralizado" },
          { value: "left", label: "Alinhado à Esquerda" },
        ],
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
        label: "Título Principal (Headline)",
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
        key: "items",
        label: "Cards de Diferenciais",
        type: "array",
        optionalKey: "items",
        defaultNewItem: {
          title: "Novo Diferencial",
          description:
            "Explicação clara e direta do valor entregue por este diferencial.",
          iconName: "Sparkles",
          tag: "PREMIUM",
        },
        itemFields: [
          { key: "title", label: "Título do Card", type: "text" },
          { key: "description", label: "Descrição", type: "textarea" },
          { key: "iconName", label: "Ícone do Card", type: "icon" },
          { key: "tag", label: "Tag / Selo Curto (Opcional)", type: "text" },
        ],
      },
      {
        key: "sectionCta",
        label: "Botão de Chamada da Seção (CTA)",
        type: "button",
        optionalKey: "sectionCta",
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
        columns: "3",
        headerAlign: "center",
        badge: "NOSSOS DIFERENCIAIS",
        headline: "Por que líderes escolhem nossa engenharia?",
        subtitle:
          "Entregamos excelência técnica, acabamento superior e compromisso rigoroso com o prazo em cada projeto.",
        items: [
          {
            title: "Qualidade Premium",
            description:
              "Acabamento de alto padrão utilizando insumos homologados e tecnologia de ponta.",
            iconName: "Sparkles",
            tag: "ALTO PADRÃO",
          },
          {
            title: "Equipe Especializada",
            description:
              "Profissionais certificados e dedicados para máxima performance e segurança.",
            iconName: "Users",
            tag: "CERTIFICADA",
          },
          {
            title: "Entrega no Prazo",
            description:
              "Gestão de cronograma transparente para garantir previsibilidade do início ao fim.",
            iconName: "Clock",
            tag: "PONTUALIDADE",
          },
        ],
        sectionCta: {
          enabled: true,
          text: "Solicitar Proposta Técnica",
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

      const isCenter = content.headerAlign !== "left";
      const gridColsClass =
        content.columns === "2"
          ? "grid-cols-1 md:grid-cols-2"
          : content.columns === "4"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

      return (
        <div className="space-y-12">
          {/* Cabeçalho */}
          <div
            className={cn(
              "max-w-3xl flex flex-col space-y-4",
              isCenter
                ? "mx-auto items-center text-center"
                : "mr-auto items-start text-left"
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
              className="text-3xl sm:text-5xl font-black tracking-tighter leading-[1.05]"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-70 max-w-2xl leading-relaxed"
            />
          </div>

          {/* Grid de Cards */}
          {!isHidden("items") && content.items && content.items.length > 0 && (
            <div className={cn("grid gap-6", gridColsClass)}>
              {content.items.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-8 relative overflow-hidden flex flex-col justify-between gap-6 group transition-all duration-300",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    ...(styles.borderWidth && styles.borderWidth !== "0"
                      ? {
                          borderWidth: `${styles.borderWidth}px`,
                          borderColor:
                            styles.borderColor || `${accentColor}40`,
                        }
                      : {}),
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        borderColor: `${accentColor}30`,
                        color: accentColor,
                      }}
                    >
                      <DynamicIcon
                        name={item.iconName || "CheckCircle2"}
                        className="w-6 h-6"
                      />
                    </div>

                    {!isHidden("cardTags") && item.tag && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          color: accentColor,
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA da Seção */}
          {!isHidden("sectionCta") && content.sectionCta?.enabled && (
            <div
              className={cn(
                "flex pt-2",
                isCenter ? "justify-center" : "justify-start"
              )}
            >
              <SmartButton
                button={content.sectionCta}
                elementKey="sectionCta"
                styles={styles}
                theme={theme}
              />
            </div>
          )}
        </div>
      );
    },
  });
