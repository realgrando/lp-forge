"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Flame, Sparkles } from "lucide-react";

const bioLinkCardsSchema = z.object({
  links: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      url: z.string(),
      badge: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
      featured: z.boolean(),
    })
  ),
});

export type BioLinkCardsContent = z.infer<typeof bioLinkCardsSchema>;

export const BioLinkCardsSection = createSection<BioLinkCardsContent>({
  id: "bio.links",
  name: "Bio Link Cards (3D / Glass / Neon)",
  description:
    "Lista de botões e cards interativos para Linktree com ícone individual, cor por card, relevo 3D e badges.",
  category: "Bio / Linktree",
  iconName: "Link2",
  modes: ["LINKTREE", "LANDING_PAGE"],
  contentSchema: bioLinkCardsSchema,
  fields: [
    {
      key: "links",
      label: "Cartões de Links",
      type: "array",
      optionalKey: "links",
      defaultNewItem: {
        title: "Novo Link Estratégico",
        subtitle: "Clique para acessar agora",
        url: "https://",
        badge: "",
        iconName: "ArrowUpRight",
        accentColor: "",
        featured: false,
      },
      itemFields: [
        { key: "title", label: "Título do Botão", type: "text" },
        { key: "subtitle", label: "Subtítulo (Opcional)", type: "text" },
        { key: "url", label: "URL de Destino", type: "url" },
        { key: "badge", label: "Etiqueta (Ex: NOVO, VIP)", type: "text" },
        { key: "iconName", label: "Ícone do Botão", type: "icon" },
        {
          key: "accentColor",
          label: "Cor Exclusiva deste Card (Opcional)",
          type: "color",
        },
        {
          key: "featured",
          label: "Destacar Card (Gradiente Ativo)",
          type: "toggle",
        },
      ],
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
      links: [
        {
          title: "Solicitar Orçamento de Projeto",
          subtitle: "Atendimento executivo via WhatsApp",
          url: "https://wa.me/",
          badge: "PRIORIDADE",
          iconName: "MessageCircle",
          featured: true,
        },
        {
          title: "Portfólio Nivix Global",
          subtitle: "Conheça nossos cases nos EUA e Brasil",
          url: "https://nivix.company",
          badge: "CASES",
          iconName: "Globe",
          featured: false,
        },
        {
          title: "Diagnóstico de Arquitetura Digital",
          subtitle: "Agende uma call estratégica de 30 min",
          url: "#agenda",
          badge: "VAGAS ABERTAS",
          iconName: "Calendar",
          featured: false,
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const defaultAccent = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    if (hidden.links) return null;

    return (
      <div className="space-y-3.5">
        {content.links.map((item, idx) => {
          const isFeatured = item.featured;
          const cardAccent = item.accentColor || defaultAccent;
          const resolvedIcon =
            item.iconName || (isFeatured ? "ArrowUpRight" : "ExternalLink");

          return (
            <a
              key={idx}
              href={item.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-between p-4 sm:p-5 transition-all duration-200",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={
                isFeatured
                  ? {
                      borderColor: cardAccent,
                      background: `linear-gradient(135deg, ${cardAccent}25 0%, rgba(24,24,27,0.92) 100%)`,
                    }
                  : {
                      backgroundColor: styles.customSurface || undefined,
                      ...(styles.borderWidth && styles.borderWidth !== "0"
                        ? {
                            borderWidth: `${styles.borderWidth}px`,
                            borderColor:
                              item.accentColor ||
                              styles.borderColor ||
                              "rgba(255,255,255,0.12)",
                          }
                        : item.accentColor
                        ? { borderColor: `${item.accentColor}50` }
                        : {}),
                    }
              }
            >
              <div className="space-y-1 pr-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="font-bold text-sm sm:text-base tracking-tight group-hover:translate-x-0.5 transition-transform"
                    style={{ fontFamily: "var(--site-font-heading)" }}
                  >
                    {item.title}
                  </span>

                  {item.badge && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                      style={{
                        backgroundColor: isFeatured
                          ? cardAccent
                          : `${cardAccent}25`,
                        color: isFeatured ? "#09090B" : cardAccent,
                      }}
                    >
                      {isFeatured ? (
                        <Flame className="w-2.5 h-2.5" />
                      ) : (
                        <Sparkles className="w-2.5 h-2.5" />
                      )}
                      {item.badge}
                    </span>
                  )}
                </div>

                {item.subtitle && (
                  <p className="text-xs opacity-65 line-clamp-1">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {resolvedIcon !== "none" && (
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    backgroundColor: isFeatured
                      ? cardAccent
                      : "rgba(255,255,255,0.06)",
                    color: isFeatured ? "#09090B" : cardAccent,
                  }}
                >
                  <DynamicIcon name={resolvedIcon} className="w-4 h-4" />
                </div>
              )}
            </a>
          );
        })}
      </div>
    );
  },
});
