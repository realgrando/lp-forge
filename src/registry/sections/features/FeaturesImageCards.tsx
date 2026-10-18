"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const featuresImageCardsSchema = z.object({
  columns: z.enum(["2", "3"]).default("3"),
  headerAlign: z.enum(["center", "left"]).default("center"),
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      imageUrl: z.string(),
      tag: z.string().optional(),
      iconName: z.string().optional(),
      linkLabel: z.string().optional(),
      linkUrl: z.string().optional(),
    })
  ),
  sectionCta: buttonConfigSchema,
});

export type FeaturesImageCardsContent = z.infer<
  typeof featuresImageCardsSchema
>;

export const FeaturesImageCardsSection =
  createSection<FeaturesImageCardsContent>({
    id: "features.image_cards",
    name: "Features Showcase Image Cards",
    description:
      "Cards verticais de vitrine com foto superior, selo/tag, ícone flutuante, título, descrição e link de ação.",
    category: "Features",
    iconName: "Image",
    modes: ["LANDING_PAGE"],
    legacyType: "features",
    legacyVariant: "v3",
    toggleableElements: [
      { key: "badge", label: "Badge Superior" },
      { key: "headline", label: "Título Principal (Headline)" },
      { key: "subtitle", label: "Subtítulo da Seção" },
      { key: "items", label: "Grid de Image Cards" },
      { key: "cardImages", label: "Fotos Superiores dos Cards" },
      { key: "cardTags", label: "Tags / Selos nos Cards" },
      { key: "cardLinks", label: "Links de Ação nos Cards" },
      { key: "sectionCta", label: "Botão Principal da Seção (CTA)" },
    ],
    contentSchema: featuresImageCardsSchema,
    fields: [
      {
        key: "columns",
        label: "Colunas no Desktop",
        type: "select",
        optionalKey: "items",
        options: [
          { value: "2", label: "2 Colunas Grandes" },
          { value: "3", label: "3 Colunas" },
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
        label: "Cards com Foto",
        type: "array",
        optionalKey: "items",
        defaultNewItem: {
          title: "Nova Solução Especializada",
          description:
            "Apresentação visual e técnica do serviço ou produto em destaque.",
          imageUrl:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
          tag: "DESTAQUE",
          iconName: "Sparkles",
          linkLabel: "Saiba Mais",
          linkUrl: "#contato",
        },
        itemFields: [
          { key: "title", label: "Título do Card", type: "text" },
          { key: "description", label: "Descrição", type: "textarea" },
          { key: "imageUrl", label: "Foto Superior", type: "image" },
          { key: "tag", label: "Tag / Categoria", type: "text" },
          { key: "iconName", label: "Ícone Sobreposto", type: "icon" },
          { key: "linkLabel", label: "Texto do Link", type: "text" },
          { key: "linkUrl", label: "URL do Link", type: "url" },
        ],
      },
      {
        key: "sectionCta",
        label: "Botão Geral da Seção (CTA)",
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
        badge: "GALERIA DE SOLUÇÕES",
        headline: "Abordagem focada em resultados e acabamento.",
        subtitle:
          "Combinamos estética autoral com funcionalidade técnica superior em cada especialidade.",
        items: [
          {
            title: "Design & Arquitetura",
            description:
              "Concepção visual limpa, moderna e funcional pensada para valorizar cada ambiente.",
            imageUrl:
              "https://images.unsplash.com/photo-1541888081622-3cb5562cb08e?auto=format&fit=crop&q=80&w=700",
            tag: "PROJETO",
            iconName: "Sparkles",
            linkLabel: "Ver Projetos",
            linkUrl: "#portfolio",
          },
          {
            title: "Materiais Nobres",
            description:
              "Durabilidade extrema e estética refinada com insumos selecionados de primeira linha.",
            imageUrl:
              "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=700",
            tag: "MATERIAIS",
            iconName: "Award",
            linkLabel: "Especificações",
            linkUrl: "#materiais",
          },
          {
            title: "Engenharia de Ponta",
            description:
              "Execução técnica precisa com acompanhamento rigoroso em cada detalhe construtivo.",
            imageUrl:
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=700",
            tag: "EXECUÇÃO",
            iconName: "Zap",
            linkLabel: "Saber Mais",
            linkUrl: "#contato",
          },
        ],
        sectionCta: {
          enabled: true,
          text: "Falar com Especialista Técnico",
          url: "#contato",
          variant: "outline",
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

      const isCenter = content.headerAlign !== "left";
      const gridColsClass =
        content.columns === "2"
          ? "grid-cols-1 md:grid-cols-2"
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

          {/* Grid de Cards com Foto */}
          {!isHidden("items") && content.items && content.items.length > 0 && (
            <div className={cn("grid gap-7", gridColsClass)}>
              {content.items.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "group overflow-hidden flex flex-col h-full transition-all duration-300",
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
                  {/* Imagem Superior Opcional */}
                  {!isHidden("cardImages") && item.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                      {!isHidden("cardTags") && item.tag && (
                        <span
                          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.55)",
                            borderColor: `${accentColor}50`,
                            color: accentColor,
                          }}
                        >
                          {item.tag}
                        </span>
                      )}

                      <div
                        className="absolute bottom-4 left-6 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${accentColor}25`,
                          borderColor: `${accentColor}50`,
                          color: accentColor,
                        }}
                      >
                        <DynamicIcon
                          name={item.iconName || "Award"}
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  )}

                  {/* Corpo do Card */}
                  <div className="p-7 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-2.5">
                      <h3 className="text-xl font-black uppercase tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm opacity-75 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {!isHidden("cardLinks") && item.linkLabel ? (
                      <a
                        href={item.linkUrl || "#"}
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all group-hover:gap-3"
                        style={{ color: accentColor }}
                      >
                        <span>{item.linkLabel}</span>
                        <DynamicIcon name="ArrowRight" className="w-4 h-4" />
                      </a>
                    ) : (
                      <div
                        className="h-0.5 w-12 transition-all duration-500 group-hover:w-full opacity-40"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
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
