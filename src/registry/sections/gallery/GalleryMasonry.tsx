"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { X, ZoomIn } from "lucide-react";

const galleryMasonrySchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  grayscale: z.boolean().default(false),
  ctaButton: buttonConfigSchema,
  items: z.array(
    z.object({
      image: z.string(),
      title: z.string(),
      category: z.string(),
      aspectHint: z.enum(["square", "portrait", "landscape"]).optional(),
    })
  ),
});

export type GalleryMasonryContent = z.infer<typeof galleryMasonrySchema>;

export const GalleryMasonrySection = createSection<GalleryMasonryContent>({
  id: "gallery.masonry",
  name: "Galeria Masonry Assimétrica",
  description:
    "Mural estilo Pinterest/Masonry com alturas variadas, efeito P&B opcional e Lightbox interativo ao clicar.",
  category: "Galeria & Portfólio",
  iconName: "Columns",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "gallery",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "items", label: "Mural Masonry de Fotos" },
    { key: "zoomIcon", label: "Ícone de Lupa (Lightbox)" },
    { key: "ctaButton", label: "Botão de Ação Inferior" },
  ],
  contentSchema: galleryMasonrySchema,
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
      key: "grayscale",
      label: "Fotos em P&B (Cor no Hover)",
      type: "toggle",
      optionalKey: "items",
    },
    {
      key: "items",
      label: "Imagens da Galeria",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=700",
        title: "Residência Villa",
        category: "Construção",
        aspectHint: "portrait",
      },
      itemFields: [
        { key: "image", label: "Foto", type: "image" },
        { key: "title", label: "Título da Foto", type: "text" },
        { key: "category", label: "Categoria (Ex: Gourmet)", type: "text" },
        {
          key: "aspectHint",
          label: "Proporção do Card",
          type: "select",
          options: [
            { value: "portrait", label: "Vertical (Retrato)" },
            { value: "square", label: "Quadrado" },
            { value: "landscape", label: "Horizontal" },
          ],
        },
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
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "PORTFÓLIO CURADO",
      headline: "Arte e precisão em cada detalhe",
      subtitle:
        "Navegue por nossa galeria assimétrica e clique nas fotos para ampliar em tela cheia.",
      grayscale: false,
      ctaButton: {
        enabled: false,
        text: "Agendar Visita Técnica",
        url: "#contato",
        variant: "solid",
        size: "md",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      items: [
        {
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=700",
          category: "Construção",
          title: "Residência Villa",
          aspectHint: "portrait",
        },
        {
          image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
          category: "Design",
          title: "Interior Minimalista",
          aspectHint: "square",
        },
        {
          image:
            "https://images.unsplash.com/photo-1600566753086-00f18efc2207?auto=format&fit=crop&q=80&w=700",
          category: "Exteriores",
          title: "Área Externa & Deck",
          aspectHint: "landscape",
        },
        {
          image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
          category: "Decor",
          title: "Living Integrado",
          aspectHint: "portrait",
        },
        {
          image:
            "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?auto=format&fit=crop&q=80&w=700",
          category: "Gourmet",
          title: "Cozinha de Autor",
          aspectHint: "square",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const [selectedImage, setSelectedImage] = useState<
      GalleryMasonryContent["items"][number] | null
    >(null);

    const getAspectClass = (hint?: string, idx?: number) => {
      if (hint === "portrait") return "aspect-[3/4]";
      if (hint === "landscape") return "aspect-[16/10]";
      if (hint === "square") return "aspect-square";
      return idx !== undefined && idx % 2 === 0 ? "aspect-[3/4]" : "aspect-square";
    };

    return (
      <div className="space-y-14">
        {/* HEADER */}
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
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
              className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-75"
            />
          </div>
        )}

        {/* MASONRY COLUMNS */}
        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {content.items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className={cn(
                  "relative overflow-hidden group cursor-pointer break-inside-avoid",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset),
                  getAspectClass(item.aspectHint, idx)
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
                    content.grayscale && "grayscale group-hover:grayscale-0"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-7 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest mb-1.5"
                    style={{ color: accentColor }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                {!isHidden("zoomIcon") && (
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA BUTTON */}
        {!isHidden("ctaButton") && content.ctaButton?.enabled && (
          <div className="flex justify-center">
            <SmartButton
              button={content.ctaButton}
              elementKey="ctaButton"
              styles={styles}
              theme={theme}
            />
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div
              className="max-w-4xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className={cn(
                  "max-w-full max-h-[80vh] object-contain shadow-2xl",
                  getRadiusClass(radiusPreset)
                )}
              />
              {(selectedImage.title || selectedImage.category) && (
                <div className="text-center">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest block"
                    style={{ color: accentColor }}
                  >
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {selectedImage.title}
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
});
