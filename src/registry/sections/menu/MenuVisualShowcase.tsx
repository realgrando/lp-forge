"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const menuVisualShowcaseSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columns: z.enum(["2", "3", "4"]).default("3"),
  items: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
      imageUrl: z.string(),
      popularBadge: z.string().optional(),
      rating: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type MenuVisualShowcaseContent = z.infer<typeof menuVisualShowcaseSchema>;

export const MenuVisualShowcaseSection = createSection<MenuVisualShowcaseContent>({
  id: "menu.visual_showcase",
  name: "Cardápio Vitrine Visual",
  description:
    "Cards verticais com foto grande de prato/serviço, selo popular, estrelas, preço em pílula e botão CTA.",
  category: "Cardápio & Serviços",
  iconName: "Star",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "menu",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "items", label: "Cards da Vitrine" },
    { key: "itemImage", label: "Foto de Destaque nos Cards" },
    { key: "popularBadge", label: "Selo Popular nos Cards" },
    { key: "ratingStars", label: "Avaliação com Estrelas" },
    { key: "pricePill", label: "Preço em Pílula" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: menuVisualShowcaseSchema,
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
      key: "columns",
      label: "Colunas no Desktop",
      type: "select",
      options: [
        { value: "2", label: "2 Colunas" },
        { value: "3", label: "3 Colunas" },
        { value: "4", label: "4 Colunas" },
      ],
    },
    {
      key: "items",
      label: "Itens da Vitrine Visual",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        name: "Novo Item Premium",
        price: "R$ 89",
        description: "Combinação autoral preparada com ingredientes selecionados.",
        imageUrl:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600",
        popularBadge: "Mais Pedido",
        rating: "5.0",
      },
      itemFields: [
        { key: "name", label: "Nome do Prato / Serviço", type: "text" },
        { key: "price", label: "Preço", type: "text" },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "imageUrl", label: "Foto do Item", type: "image" },
        { key: "popularBadge", label: "Selo de Destaque (Ex: Popular)", type: "text" },
        { key: "rating", label: "Nota / Estrelas (Ex: 4.9)", type: "text" },
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
      badge: "VITRINE GASTRONÔMICA",
      headline: "Nosso Menu Visual",
      subtitle:
        "Explore nossas criações através dos olhos antes de provar com o paladar.",
      columns: "3",
      items: [
        {
          name: "Margherita DOP Napolitana",
          price: "R$ 78",
          description:
            "Massa de fermentação lenta 72h, tomates San Marzano DOP, fior di latte e manjericão orgânico.",
          imageUrl:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600",
          popularBadge: "Favorito da Casa",
          rating: "5.0",
        },
        {
          name: "Truffle Wild Mushroom",
          price: "R$ 98",
          description:
            "Mix de cogumelos frescos salteados no tomilho, creme de trufas negras e queijo fontina.",
          imageUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
          popularBadge: "Chef's Choice",
          rating: "4.9",
        },
        {
          name: "Burrata & Prosciutto di Parma",
          price: "R$ 112",
          description:
            "Finalizada com presunto de Parma maturado 24 meses, burrata cremosa e pesto de pistache.",
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600",
          popularBadge: "Edição Especial",
          rating: "5.0",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Fazer Pedido Agora",
        url: "#pedido",
        variant: "solid",
        size: "lg",
        iconName: "ShoppingBag",
        iconPosition: "left",
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

    const colsClass =
      content.columns === "2"
        ? "grid-cols-1 md:grid-cols-2"
        : content.columns === "4"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    return (
      <div className="space-y-12">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="Star"
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
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]"
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

        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className={cn("grid gap-8", colsClass)}>
            {content.items.map((item, idx) => (
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
                <div>
                  {!isHidden("itemImage") && item.imageUrl && (
                    <div className="relative h-64 overflow-hidden bg-white/5">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                      {!isHidden("popularBadge") && item.popularBadge && (
                        <span
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5"
                          style={{
                            backgroundColor: accentColor,
                            color: "#09090B",
                          }}
                        >
                          <DynamicIcon name="Flame" className="w-3 h-3" />
                          {item.popularBadge}
                        </span>
                      )}

                      {!isHidden("pricePill") && item.price && (
                        <span
                          className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full text-sm font-black backdrop-blur-md bg-black/75 border border-white/15"
                          style={{ color: accentColor }}
                        >
                          {item.price}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-3">
                    {!isHidden("ratingStars") && item.rating && (
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <div
                          className="flex items-center gap-0.5"
                          style={{ color: accentColor }}
                        >
                          {[...Array(5)].map((_, sIdx) => (
                            <DynamicIcon
                              key={sIdx}
                              name="Star"
                              className="w-3.5 h-3.5 fill-current"
                            />
                          ))}
                        </div>
                        <span className="opacity-70">{item.rating}</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="text-xl font-black tracking-tight"
                        style={{ fontFamily: "var(--site-font-heading)" }}
                      >
                        {item.name}
                      </h3>
                      {(isHidden("itemImage") || !item.imageUrl) &&
                        !isHidden("pricePill") && (
                          <span
                            className="text-lg font-black shrink-0"
                            style={{ color: accentColor }}
                          >
                            {item.price}
                          </span>
                        )}
                    </div>

                    {item.description && (
                      <p className="text-sm opacity-70 leading-relaxed">
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
