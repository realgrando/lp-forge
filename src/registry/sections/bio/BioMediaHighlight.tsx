"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const bioMediaHighlightSchema = z.object({
  badge: z.string(),
  coverImageUrl: z.string(),
  title: z.string(),
  description: z.string(),
  priceOrTag: z.string(),
  ctaButton: buttonConfigSchema,
});

export type BioMediaHighlightContent = z.infer<typeof bioMediaHighlightSchema>;

export const BioMediaHighlightSection = createSection<BioMediaHighlightContent>({
  id: "bio.spotlight",
  name: "Bio Product & Media Spotlight",
  description: "Card em destaque com imagem de capa, oferta/preço e botão de ação para Linktree ou LP.",
  category: "Bio / Linktree",
  iconName: "Sparkles",
  modes: ["LINKTREE", "LANDING_PAGE"],
  toggleableElements: [
    { key: "coverImageUrl", label: "Imagem de Capa" },
    { key: "badge", label: "Badge de Destaque" },
    { key: "priceOrTag", label: "Etiqueta de Preço / Status" },
    { key: "title", label: "Título do Card" },
    { key: "description", label: "Descrição" },
    { key: "ctaButton", label: "Botão de Ação" },
  ],
  contentSchema: bioMediaHighlightSchema,
  fields: [
    {
      key: "coverImageUrl",
      label: "URL da Imagem de Capa",
      type: "url",
      optionalKey: "coverImageUrl",
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
      key: "priceOrTag",
      label: "Preço ou Tag Lateral",
      type: "text",
      optionalKey: "priceOrTag",
    },
    {
      key: "title",
      label: "Título do Produto / Conteúdo",
      type: "text",
      optionalKey: "title",
      typographyElementKey: "title",
    },
    {
      key: "description",
      label: "Descrição Curta",
      type: "textarea",
      optionalKey: "description",
      typographyElementKey: "description",
    },
    {
      key: "ctaButton",
      label: "Botão de Ação",
      type: "button",
      optionalKey: "ctaButton",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "compact",
      containerWidth: "mobile",
    },
    styles: {
      surfaceVariant: "3d_floating",
      borderRadius: "lg",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      badge: "DESTAQUE DA SEMANA",
      coverImageUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      title: "Consultoria Executiva de Ecossistemas",
      description:
        "Estruture sua máquina de aquisição digital com engenharia de ponta e design exclusivo.",
      priceOrTag: "Vagas Limitadas",
      ctaButton: {
        enabled: true,
        text: "Garantir Minha Vaga Agora",
        url: "https://wa.me/",
        variant: "solid",
        size: "md",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div
        className={cn(
          "overflow-hidden transition-all",
          getSurfaceClasses(surfaceStyle),
          getRadiusClass(radiusPreset)
        )}
        style={{ backgroundColor: styles.customSurface || undefined }}
      >
        {/* Capa */}
        {!hidden.coverImageUrl && content.coverImageUrl && (
          <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.coverImageUrl}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
              <EditableText
                isBadge
                defaultIconName="Flame"
                accentColor={accentColor}
                value={content.badge}
                elementKey="badge"
                styles={styles}
              />

              {!hidden.priceOrTag && content.priceOrTag && (
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/15">
                  {content.priceOrTag}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Corpo */}
        <div className="p-5 space-y-4">
          {(hidden.coverImageUrl || !content.coverImageUrl) && (
            <div className="flex items-center justify-between">
              <EditableText
                isBadge
                defaultIconName="Flame"
                accentColor={accentColor}
                value={content.badge}
                elementKey="badge"
                styles={styles}
              />
              {!hidden.priceOrTag && content.priceOrTag && (
                <span
                  className="text-xs font-bold"
                  style={{ color: accentColor }}
                >
                  {content.priceOrTag}
                </span>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <EditableText
              as="h3"
              defaultIsHeading
              value={content.title}
              elementKey="title"
              styles={styles}
              className="text-lg font-black tracking-tight"
            />
            <EditableText
              as="p"
              value={content.description}
              elementKey="description"
              styles={styles}
              className="text-xs opacity-75 leading-relaxed"
            />
          </div>

          <SmartButton
            button={content.ctaButton}
            elementKey="ctaButton"
            styles={styles}
            theme={theme}
            className="w-full"
          />
        </div>
      </div>
    );
  },
});
