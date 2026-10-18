"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const menuPhotoGridSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      price: z.string(),
      description: z.string(),
      imageUrl: z.string(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type MenuPhotoGridContent = z.infer<typeof menuPhotoGridSchema>;

export const MenuPhotoGridSection = createSection<MenuPhotoGridContent>({
  id: "menu.photo_grid",
  name: "Cardápio Grid com Fotos",
  description:
    "Cards horizontais com foto em miniatura, nome do item, categoria/tag, descrição e preço destacado.",
  category: "Cardápio & Serviços",
  iconName: "ShoppingBag",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "menu",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "items", label: "Grid de Cards do Cardápio" },
    { key: "itemThumbnail", label: "Foto em Miniatura dos Itens" },
    { key: "itemCategory", label: "Tag de Categoria nos Cards" },
    { key: "itemArrow", label: "Ícone Decorativo nos Cards" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: menuPhotoGridSchema,
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
      key: "items",
      label: "Itens com Foto",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        name: "Novo Prato / Serviço",
        category: "Assinatura",
        price: "R$ 79",
        description: "Preparo artesanal com apresentação sofisticada e ingredientes frescos.",
        imageUrl:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      },
      itemFields: [
        { key: "name", label: "Nome do Item", type: "text" },
        { key: "category", label: "Categoria / Tag", type: "text" },
        { key: "price", label: "Preço", type: "text" },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "imageUrl", label: "URL da Foto", type: "image" },
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
      badge: "MENU SELECTION",
      headline: "Nossa Seleção Gourmet",
      subtitle:
        "Pratos e experiências desenhados com equilíbrio visual e sabor inconfundível.",
      items: [
        {
          name: "Bowl Mediterrâneo Trufado",
          category: "Entrada Leve",
          price: "R$ 64",
          description:
            "Folhas orgânicas, burrata cremosa, figos frescos e redução de balsâmico envelhecido.",
          imageUrl:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
        },
        {
          name: "Salmão Glaceado no Missô",
          category: "Prato Principal",
          price: "R$ 118",
          description:
            "Lombo de salmão selvagem selado na brasa com gergelim tostado e purê aveludado.",
          imageUrl:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600",
        },
        {
          name: "Ravioli Artesanal de Lagosta",
          category: "Massas Frescas",
          price: "R$ 145",
          description:
            "Massa feita à mão recheada com lagosta ao molho bisque suave e toque cítrico.",
          imageUrl:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600",
        },
        {
          name: "Entrecôte Black Angus",
          category: "Parrilla",
          price: "R$ 159",
          description:
            "Corte marmorizado grelhado em fogo alto, acompanhado de aspargos verdes e molho rôti.",
          imageUrl:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Ver Cardápio Completo",
        url: "#cardapio",
        variant: "solid",
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

    const showHeader =
      !isHidden("badge") || !isHidden("headline") || !isHidden("subtitle");

    return (
      <div className="space-y-12">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
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
                className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.02]"
              />
            </div>

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-70 max-w-md leading-relaxed"
            />
          </div>
        )}

        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {content.items.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "group p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all duration-300",
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
                {!isHidden("itemThumbnail") && item.imageUrl && (
                  <div
                    className={cn(
                      "w-full sm:w-32 sm:h-32 aspect-[16/10] sm:aspect-square overflow-hidden shrink-0 relative bg-white/5",
                      getRadiusClass(radiusPreset === "full" ? "lg" : radiusPreset)
                    )}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0 space-y-2 w-full">
                  <div className="flex items-center justify-between gap-2">
                    {!isHidden("itemCategory") && item.category && (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
                        style={{
                          color: accentColor,
                          borderColor: `${accentColor}35`,
                          backgroundColor: `${accentColor}15`,
                        }}
                      >
                        {item.category}
                      </span>
                    )}

                    <span
                      className="text-lg font-black ml-auto"
                      style={{ color: accentColor }}
                    >
                      {item.price}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-lg sm:text-xl font-bold tracking-tight"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {item.name}
                    </h3>

                    {!isHidden("itemArrow") && (
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                        <DynamicIcon name="ArrowUpRight" className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-sm opacity-70 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
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
