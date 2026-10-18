"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const galleryClassicGridSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columnsDesktop: z.enum(["2", "3", "4"]).default("3"),
  ctaButton: buttonConfigSchema,
  items: z.array(
    z.object({
      image: z.string(),
      title: z.string(),
      category: z.string(),
      description: z.string().optional(),
    })
  ),
});

export type GalleryClassicGridContent = z.infer<typeof galleryClassicGridSchema>;

export const GalleryClassicGridSection = createSection<GalleryClassicGridContent>({
  id: "gallery.classic",
  name: "Galeria Grid Clássico",
  description:
    "Grade uniforme de fotos com zoom suave no hover, etiqueta de categoria, barra de destaque e botão opcional.",
  category: "Galeria & Portfólio",
  iconName: "Grid",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "gallery",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "dividerBar", label: "Barra Decorativa Central" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "items", label: "Grade de Imagens" },
    { key: "overlayText", label: "Texto e Categoria no Hover" },
    { key: "ctaButton", label: "Botão de Ação Inferior" },
  ],
  contentSchema: galleryClassicGridSchema,
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
      key: "columnsDesktop",
      label: "Colunas no Desktop",
      type: "select",
      optionalKey: "items",
      options: [
        { value: "2", label: "2 Colunas" },
        { value: "3", label: "3 Colunas" },
        { value: "4", label: "4 Colunas" },
      ],
    },
    {
      key: "items",
      label: "Fotos da Galeria",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        title: "Novo Projeto Entregue",
        category: "Arquitetura",
        description: "Acabamento de alto padrão com precisão construtiva.",
      },
      itemFields: [
        { key: "image", label: "URL da Imagem", type: "image" },
        { key: "title", label: "Título da Obra/Foto", type: "text" },
        { key: "category", label: "Categoria", type: "text" },
        { key: "description", label: "Descrição Curta (Opcional)", type: "text" },
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
      paddingY: "normal",
      containerWidth: "boxed",
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "lg",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      badge: "NOSSO PORTFÓLIO",
      headline: "Projetos Recentes & Execuções de Alto Padrão",
      subtitle:
        "Confira alguns dos nossos trabalhos mais recentes e a qualidade técnica que entregamos em cada detalhe.",
      columnsDesktop: "3",
      ctaButton: {
        enabled: false,
        text: "Solicitar Orçamento Similar",
        url: "#contato",
        variant: "outline",
        size: "md",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
      items: [
        {
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
          title: "Residência Horizonte",
          category: "Arquitetura Premium",
          description: "Fachada contemporânea em concreto aparente e vidro.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
          title: "Loft Minimalista",
          category: "Interiores",
          description: "Integração total de ambientes com iluminação cênica.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1600566753086-00f18efc2207?auto=format&fit=crop&q=80&w=800",
          title: "Pavilhão Gourmet",
          category: "Área Externa",
          description: "Espaço de convivência integrado ao paisagismo nativo.",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const gridColsClass =
      content.columnsDesktop === "2"
        ? "lg:grid-cols-2"
        : content.columnsDesktop === "4"
        ? "lg:grid-cols-4"
        : "lg:grid-cols-3";

    return (
      <div className="space-y-14">
        {/* HEADER */}
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle") || !isHidden("dividerBar")) && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
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
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
            />

            {!isHidden("dividerBar") && (
              <div
                className="h-1.5 w-20 mx-auto rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-75 leading-relaxed"
            />
          </div>
        )}

        {/* GRID DE IMAGENS */}
        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", gridColsClass)}>
            {content.items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square md:aspect-[4/5] overflow-hidden group cursor-pointer transition-all duration-500",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{
                  backgroundColor: styles.customSurface || undefined,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title || "Projeto"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay no Hover */}
                {!isHidden("overlayText") && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-7">
                    {item.category && (
                      <span
                        className="font-black text-[10px] uppercase tracking-[0.2em] mb-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-500"
                        style={{ color: accentColor }}
                      >
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-white/75 mt-1.5 line-clamp-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Borda interna brilhante no hover */}
                <div
                  className={cn(
                    "absolute inset-0 border-0 group-hover:border-2 transition-all duration-500 pointer-events-none",
                    getRadiusClass(radiusPreset)
                  )}
                  style={{ borderColor: `${accentColor}66` }}
                />
              </div>
            ))}
          </div>
        )}

        {/* CTA INFERIOR */}
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
