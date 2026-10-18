"use client";

import React, { useState, useMemo } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const galleryShowcaseSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  allFilterLabel: z.string(),
  ctaButton: buttonConfigSchema,
  items: z.array(
    z.object({
      image: z.string(),
      title: z.string(),
      category: z.string(),
      featuredSpan: z.boolean().optional(),
    })
  ),
});

export type GalleryShowcaseContent = z.infer<typeof galleryShowcaseSchema>;

export const GalleryShowcaseSection = createSection<GalleryShowcaseContent>({
  id: "gallery.showcase",
  name: "Galeria Showcase com Filtro",
  description:
    "Galeria elite com filtro interativo por categoria em tempo real, proporções dinâmicas 12-colunas e overlay cinematográfico.",
  category: "Galeria & Portfólio",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "gallery",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "filterTabs", label: "Barra de Filtros por Categoria" },
    { key: "items", label: "Grade Showcase de Projetos" },
    { key: "ctaButton", label: "Botão de Ação" },
  ],
  contentSchema: galleryShowcaseSchema,
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
      key: "allFilterLabel",
      label: "Rótulo do Botão 'Todos'",
      type: "text",
      optionalKey: "filterTabs",
    },
    {
      key: "items",
      label: "Projetos do Showcase",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
        title: "Projeto Alpha",
        category: "Residencial",
        featuredSpan: false,
      },
      itemFields: [
        { key: "image", label: "Imagem", type: "image" },
        { key: "title", label: "Nome do Projeto", type: "text" },
        { key: "category", label: "Categoria (Usada no Filtro)", type: "text" },
        {
          key: "featuredSpan",
          label: "Card Largo (8 Colunas)",
          type: "toggle",
        },
      ],
    },
    {
      key: "ctaButton",
      label: "Botão de Ação (Topo/Rodapé)",
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
      badge: "PORTFOLIO SHOWCASE",
      headline: "Nossa Galeria de Elite",
      subtitle:
        "Excelência em cada detalhe, transformando visões arquitetônicas e digitais em realidade sólida.",
      allFilterLabel: "Todos",
      ctaButton: {
        enabled: true,
        text: "Explorar Portfólio Completo",
        url: "#contato",
        variant: "glass",
        size: "md",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
      items: [
        {
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
          title: "Mansão Veja Alpha",
          category: "Residencial",
          featuredSpan: true,
        },
        {
          image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
          title: "Penthouse Jardins",
          category: "Interiores",
          featuredSpan: false,
        },
        {
          image:
            "https://images.unsplash.com/photo-1600566753086-00f18efc2207?auto=format&fit=crop&q=80&w=800",
          title: "Sede Corporativa Nexus",
          category: "Comercial",
          featuredSpan: false,
        },
        {
          image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
          title: "Living Minimalista",
          category: "Interiores",
          featuredSpan: true,
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const [activeCategory, setActiveCategory] = useState<string>("ALL");

    const categories = useMemo(() => {
      const set = new Set<string>();
      (content.items || []).forEach((item) => {
        if (item.category?.trim()) set.add(item.category.trim());
      });
      return Array.from(set);
    }, [content.items]);

    const filteredItems = useMemo(() => {
      if (activeCategory === "ALL") return content.items || [];
      return (content.items || []).filter(
        (item) => item.category?.trim() === activeCategory
      );
    }, [content.items, activeCategory]);

    return (
      <div className="space-y-12">
        {/* HEADER + FILTROS */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
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
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-75 max-w-xl leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
            {!isHidden("ctaButton") && content.ctaButton?.enabled && (
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
              />
            )}

            {/* ABAS DE FILTRO INTERATIVO */}
            {!isHidden("filterTabs") && categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory("ALL")}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border",
                    getRadiusClass("full")
                  )}
                  style={
                    activeCategory === "ALL"
                      ? {
                          backgroundColor: accentColor,
                          color: "#09090B",
                          borderColor: accentColor,
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0.04)",
                          borderColor: "rgba(255,255,255,0.12)",
                        }
                  }
                >
                  {content.allFilterLabel || "Todos"}
                </button>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border",
                        getRadiusClass("full")
                      )}
                      style={
                        isActive
                          ? {
                              backgroundColor: accentColor,
                              color: "#09090B",
                              borderColor: accentColor,
                            }
                          : {
                              backgroundColor: "rgba(255,255,255,0.04)",
                              borderColor: "rgba(255,255,255,0.12)",
                            }
                      }
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* SHOWCASE 12-COLUMN GRID */}
        {!isHidden("items") && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredItems.map((item, index) => {
              const isLarge =
                item.featuredSpan !== undefined
                  ? item.featuredSpan
                  : index % 4 === 0 || index % 4 === 3;

              return (
                <div
                  key={`${item.title}-${index}`}
                  className={cn(
                    "relative overflow-hidden group cursor-pointer transition-all duration-500",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset),
                    isLarge
                      ? "md:col-span-8 aspect-[16/10]"
                      : "md:col-span-4 aspect-[4/5]"
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Cinematic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-75 md:opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span
                        className="font-black text-[10px] uppercase tracking-[0.3em] mb-2 block"
                        style={{ color: accentColor }}
                      >
                        {item.category || "Premium Project"}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                        {item.title}
                      </h3>
                      <div
                        className="w-0 group-hover:w-12 h-1 transition-all duration-500 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
