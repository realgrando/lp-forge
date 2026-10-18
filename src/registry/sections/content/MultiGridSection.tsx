"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const multiGridSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columns: z.enum(["2", "3", "4"]).default("3"),
  items: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      badge: z.string().optional(),
      imageUrl: z.string().optional(),
      iconName: z.string().optional(),
      linkText: z.string().optional(),
      linkUrl: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type MultiGridContent = z.infer<typeof multiGridSchema>;

export const MultiGridSection = createSection<MultiGridContent>({
  id: "content.grid",
  name: "Multi-Use Content Grid",
  description:
    "Grid multi-uso com opção de 2, 3 ou 4 colunas, imagem opcional, ícone, título, subtítulo e link individual.",
  category: "Features",
  iconName: "Layers",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "grid",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "items", label: "Grid de Cards" },
    { key: "cardImages", label: "Imagens de Capa nos Cards" },
    { key: "cardIcons", label: "Ícones nos Cards" },
    { key: "cardBadges", label: "Selos nos Cards" },
    { key: "cardLinks", label: "Links de Ação nos Cards" },
    { key: "ctaButton", label: "Botão de Ação Geral (CTA)" },
  ],
  contentSchema: multiGridSchema,
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
      label: "Cards do Grid",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        title: "Novo Recurso / Serviço",
        subtitle: "Descrição objetiva sobre o benefício entregue ao cliente.",
        badge: "Destaque",
        imageUrl: "",
        iconName: "Sparkles",
        linkText: "Saiba mais",
        linkUrl: "#contato",
        accentColor: "",
      },
      itemFields: [
        { key: "title", label: "Título do Card", type: "text" },
        { key: "subtitle", label: "Descrição / Subtítulo", type: "textarea" },
        { key: "badge", label: "Selo / Tag (Opcional)", type: "text" },
        { key: "imageUrl", label: "Imagem Opcional", type: "image" },
        { key: "iconName", label: "Ícone", type: "icon" },
        { key: "linkText", label: "Texto do Link", type: "text" },
        { key: "linkUrl", label: "URL do Link", type: "url" },
        { key: "accentColor", label: "Cor Exclusiva (Opcional)", type: "color" },
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
      badge: "SOLUÇÕES COMPLETAS",
      headline: "Tudo o que você precisa em um único ecossistema",
      subtitle:
        "Combine recursos visuais, serviços ou produtos em uma vitrine versátil de alta conversão.",
      columns: "3",
      items: [
        {
          title: "Arquitetura Sob Medida",
          subtitle:
            "Projetos desenhados milimetricamente para refletir a identidade e autoridade da sua marca.",
          badge: "Premium",
          imageUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
          iconName: "Layers",
          linkText: "Explorar solução",
          linkUrl: "#contato",
          accentColor: "",
        },
        {
          title: "Performance Extrema",
          subtitle:
            "Carregamento instantâneo e estrutura otimizada para máxima pontuação em mecanismos de busca.",
          badge: "Ultra Fast",
          imageUrl:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600",
          iconName: "Zap",
          linkText: "Explorar solução",
          linkUrl: "#contato",
          accentColor: "",
        },
        {
          title: "Gestão Simplificada",
          subtitle:
            "Liberdade total para atualizar textos, preços e botões sem depender de equipe técnica.",
          badge: "Autonomia",
          imageUrl:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
          iconName: "Shield",
          linkText: "Explorar solução",
          linkUrl: "#contato",
          accentColor: "",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Solicitar Demonstração",
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
              defaultIconName="Layers"
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

        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className={cn("grid gap-7", colsClass)}>
            {content.items.map((item, idx) => {
              const itemColor = item.accentColor || accentColor;
              const hasImage = !isHidden("cardImages") && Boolean(item.imageUrl);

              return (
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
                          borderColor: styles.borderColor || `${itemColor}40`,
                        }
                      : {}),
                  }}
                >
                  <div>
                    {hasImage && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                        {!isHidden("cardBadges") && item.badge && (
                          <span
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md"
                            style={{
                              backgroundColor: itemColor,
                              color: "#09090B",
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-6 sm:p-7 space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        {!isHidden("cardIcons") &&
                          item.iconName &&
                          item.iconName !== "none" && (
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
                              style={{
                                backgroundColor: `${itemColor}15`,
                                color: itemColor,
                              }}
                            >
                              <DynamicIcon
                                name={item.iconName}
                                className="w-5 h-5"
                              />
                            </div>
                          )}

                        {!hasImage && !isHidden("cardBadges") && item.badge && (
                          <span
                            className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ml-auto"
                            style={{
                              color: itemColor,
                              borderColor: `${itemColor}35`,
                              backgroundColor: `${itemColor}12`,
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3
                          className="text-xl font-bold tracking-tight"
                          style={{ fontFamily: "var(--site-font-heading)" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm opacity-75 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {!isHidden("cardLinks") && item.linkText && (
                    <div className="px-6 sm:px-7 pb-6 pt-2">
                      <a
                        href={item.linkUrl || "#"}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all"
                        style={{ color: itemColor }}
                      >
                        <span>{item.linkText}</span>
                        <DynamicIcon name="ArrowRight" className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
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
