"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Plus, X } from "lucide-react";

const portfolioHotspotsSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  mainImage: z.string(),
  interactiveLabel: z.string(),
  ctaButton: buttonConfigSchema,
  hotspots: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      x: z.string(),
      y: z.string(),
      iconName: z.string().optional(),
    })
  ),
});

export type PortfolioHotspotsContent = z.infer<typeof portfolioHotspotsSchema>;

export const PortfolioHotspotsSection = createSection<PortfolioHotspotsContent>({
  id: "portfolio.hotspots",
  name: "Portfólio Hotspots Interativos",
  description:
    "Imagem imersiva com pins interativos (coordenadas X/Y) onde o visitante clica para inspecionar detalhes técnicos do acabamento ou produto.",
  category: "Galeria & Portfólio",
  iconName: "Crosshair",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "portfolio",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "hotspots", label: "Pins Interativos (Hotspots)" },
    { key: "interactiveLabel", label: "Selo 'Showcase Interativo' no Canto" },
    { key: "ctaButton", label: "Botão de Ação Inferior" },
  ],
  contentSchema: portfolioHotspotsSchema,
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
      key: "mainImage",
      label: "Imagem Principal Imersiva",
      type: "image",
    },
    {
      key: "interactiveLabel",
      label: "Selo Inferior na Imagem",
      type: "text",
      optionalKey: "interactiveLabel",
    },
    {
      key: "hotspots",
      label: "Pontos de Interação (Hotspots)",
      type: "array",
      optionalKey: "hotspots",
      defaultNewItem: {
        title: "Detalhe Técnico",
        description: "Acabamento de alta resistência com precisão milimétrica.",
        x: "50",
        y: "50",
        iconName: "Sparkles",
      },
      itemFields: [
        { key: "title", label: "Título do Detalhe", type: "text" },
        { key: "description", label: "Descrição Curta", type: "textarea" },
        { key: "x", label: "Posição Horizontal X (0 a 100%)", type: "text" },
        { key: "y", label: "Posição Vertical Y (0 a 100%)", type: "text" },
        { key: "iconName", label: "Ícone do Card", type: "icon" },
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
      badge: "ANATOMIA DA QUALIDADE",
      headline: "A perfeição está nos mínimos detalhes",
      subtitle:
        "Clique nos pontos pulsantes da imagem para inspecionar os materiais e diferenciais técnicos.",
      mainImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400",
      interactiveLabel: "Toque nos pontos para explorar",
      ctaButton: {
        enabled: false,
        text: "Solicitar Memorial Descritivo",
        url: "#contato",
        variant: "solid",
        size: "md",
        iconName: "Download",
        iconPosition: "left",
      },
      hotspots: [
        {
          x: "28",
          y: "42",
          title: "Esquadrias Minimalistas",
          description:
            "Vidros duplos com isolamento termoacústico e perfis ocultos na alvenaria.",
          iconName: "Shield",
        },
        {
          x: "65",
          y: "32",
          title: "Concreto Arquitetônico",
          description:
            "Cura controlada e hidrofugação nanotecnológica contra umidade.",
          iconName: "Sparkles",
        },
        {
          x: "52",
          y: "72",
          title: "Iluminação Cênica LED",
          description:
            "Automação DALI com perfis lineares embutidos de 2700K.",
          iconName: "Zap",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const [activeSpot, setActiveSpot] = useState<number | null>(0);

    return (
      <div className="space-y-12">
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
              className="text-3xl sm:text-5xl font-black tracking-tighter"
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

        {/* INTERACTIVE SHOWCASE */}
        <div
          className={cn(
            "relative max-w-5xl mx-auto overflow-hidden shadow-2xl",
            getSurfaceClasses(surfaceStyle),
            getRadiusClass(radiusPreset)
          )}
        >
          <img
            src={content.mainImage}
            alt={content.headline}
            className="w-full h-auto block object-cover"
          />

          {/* HOTSPOTS OVERLAY */}
          {!isHidden("hotspots") &&
            content.hotspots &&
            content.hotspots.length > 0 && (
              <div className="absolute inset-0">
                {content.hotspots.map((spot, idx) => {
                  const posX = Math.min(Math.max(parseFloat(spot.x) || 50, 5), 95);
                  const posY = Math.min(Math.max(parseFloat(spot.y) || 50, 5), 95);
                  const isOpen = activeSpot === idx;

                  return (
                    <div
                      key={idx}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${posX}%`, top: `${posY}%` }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveSpot(isOpen ? null : idx)}
                        className="relative flex items-center justify-center"
                        aria-label={spot.title}
                      >
                        <span
                          className="absolute inset-0 w-9 h-9 md:w-11 md:h-11 rounded-full animate-ping opacity-35"
                          style={{ backgroundColor: accentColor }}
                        />
                        <div
                          className={cn(
                            "w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-lg",
                            isOpen
                              ? "scale-110"
                              : "bg-black/65 backdrop-blur-xl border-white/60 text-white"
                          )}
                          style={
                            isOpen
                              ? {
                                  backgroundColor: accentColor,
                                  borderColor: "#ffffff",
                                  color: "#09090B",
                                }
                              : undefined
                          }
                        >
                          {isOpen ? (
                            <X className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[3]" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          className={cn(
                            "absolute z-30 w-64 sm:w-72 p-5 bg-zinc-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl text-left",
                            getRadiusClass(radiusPreset),
                            posX > 55 ? "right-full mr-3" : "left-full ml-3",
                            posY > 60 ? "bottom-0" : "top-0"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {spot.iconName && (
                              <DynamicIcon
                                name={spot.iconName}
                                className="w-4 h-4 shrink-0"
                                style={{ color: accentColor }}
                              />
                            )}
                            <h4 className="text-sm font-black text-white uppercase tracking-tight">
                              {spot.title}
                            </h4>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {spot.description}
                          </p>
                          <div
                            className="mt-3 h-1 w-8 rounded-full"
                            style={{ backgroundColor: accentColor }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          {!isHidden("interactiveLabel") && content.interactiveLabel && (
            <div className="absolute bottom-5 left-5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-black uppercase tracking-widest text-white/80">
              {content.interactiveLabel}
            </div>
          )}
        </div>

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
      </div>
    );
  },
});
