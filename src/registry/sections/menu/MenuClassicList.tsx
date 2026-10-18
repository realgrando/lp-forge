"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const menuClassicListSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  categoryLabel: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
      tag: z.string().optional(),
      iconName: z.string().optional(),
      featured: z.boolean().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type MenuClassicListContent = z.infer<typeof menuClassicListSchema>;

export const MenuClassicListSection = createSection<MenuClassicListContent>({
  id: "menu.classic",
  name: "Cardápio / Catálogo em Lista",
  description:
    "Lista clássica editorial com linha pontilhada entre título e preço, descrição/ingredientes, tag de destaque e botão CTA.",
  category: "Cardápio & Serviços",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "menu",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "categoryLabel", label: "Cabeçalho da Categoria" },
    { key: "items", label: "Lista de Itens do Cardápio" },
    { key: "dottedLine", label: "Linha Pontilhada Conectora" },
    { key: "itemTags", label: "Tags de Destaque nos Itens" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: menuClassicListSchema,
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
      key: "categoryLabel",
      label: "Título da Seção / Categoria",
      type: "text",
      optionalKey: "categoryLabel",
      typographyElementKey: "categoryLabel",
    },
    {
      key: "items",
      label: "Itens do Cardápio / Catálogo",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        name: "Novo Item Artesanal",
        price: "R$ 49",
        description: "Ingredientes selecionados com preparo exclusivo da casa.",
        tag: "Destaque",
        iconName: "Sparkles",
        featured: false,
      },
      itemFields: [
        { key: "name", label: "Nome do Item / Serviço", type: "text" },
        { key: "price", label: "Preço / Valor", type: "text" },
        { key: "description", label: "Descrição / Ingredientes", type: "textarea" },
        { key: "tag", label: "Tag de Destaque (Ex: Favorito do Chef)", type: "text" },
        { key: "iconName", label: "Ícone da Tag", type: "icon" },
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
      badge: "GASTRONOMY & SERVICE ELITE",
      headline: "Nosso Cardápio Exclusivo",
      subtitle:
        "Uma seleção artesanal com ingredientes nobres e execução impecável para paladares exigentes.",
      categoryLabel: "Seleção Principal & Assinaturas",
      items: [
        {
          name: "Bruschetta Tartufata",
          price: "R$ 48",
          description:
            "Pão de fermentação natural tostado na brasa, cogumelos selvagens, azeite trufado e grana padano.",
          tag: "Favorito do Chef",
          iconName: "Sparkles",
          featured: true,
        },
        {
          name: "Risoto de Açafrão & Vieiras",
          price: "R$ 138",
          description:
            "Arroz carnaroli cremoso com pistilos de açafrão espanhol, vieiras grelhadas na manteiga noisette.",
          tag: "Mais Pedido",
          iconName: "Flame",
          featured: true,
        },
        {
          name: "Prime Rib Dry Aged (45 Dias)",
          price: "R$ 189",
          description:
            "Corte nobre maturado a seco, finalizado na parrilla com flor de sal e batatas rústicas ao alecrim.",
          tag: "",
          iconName: "none",
          featured: false,
        },
        {
          name: "Negroni Defumado em Carvalho",
          price: "R$ 54",
          description:
            "Gin botânico artesanal, vermute rosso italiano, Campari e defumação a frio com lascas de carvalho.",
          tag: "Autoral",
          iconName: "Crown",
          featured: true,
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Reservar Mesa / Fazer Pedido",
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
      <div className="space-y-14">
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

        <div
          className={cn(
            "p-6 sm:p-10 lg:p-12 transition-all",
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
          {!isHidden("categoryLabel") && content.categoryLabel && (
            <div className="flex items-center gap-6 mb-10">
              <EditableText
                as="h3"
                defaultIsHeading
                value={content.categoryLabel}
                elementKey="categoryLabel"
                styles={styles}
                className="text-xl sm:text-2xl font-black uppercase tracking-tight shrink-0"
              />
              <div
                className="h-px w-full opacity-35"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accentColor}, transparent)`,
                }}
              />
            </div>
          )}

          {!isHidden("items") && content.items && content.items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {content.items.map((item, idx) => (
                <div key={idx} className="group space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4
                      className="text-lg sm:text-xl font-bold tracking-tight transition-colors"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {item.name}
                    </h4>

                    {!isHidden("dottedLine") && (
                      <div
                        className="flex-grow border-b border-dashed border-white/20 group-hover:border-white/40 transition-colors mb-1"
                        style={{ minWidth: "24px" }}
                      />
                    )}

                    <span
                      className="text-lg sm:text-xl font-black shrink-0"
                      style={{ color: accentColor }}
                    >
                      {item.price}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm opacity-70 leading-relaxed max-w-[92%]">
                      {item.description}
                    </p>
                  )}

                  {!isHidden("itemTags") && item.tag && (
                    <div
                      className="inline-flex items-center gap-1.5 pt-1 text-[11px] font-black uppercase tracking-widest"
                      style={{ color: accentColor }}
                    >
                      <DynamicIcon
                        name={item.iconName || "Sparkles"}
                        className="w-3.5 h-3.5"
                      />
                      <span>{item.tag}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

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
