"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const bioSocialBarSchema = z.object({
  socials: z.array(
    z.object({
      platform: z.string(),
      handleOrCount: z.string(),
      url: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
});

export type BioSocialBarContent = z.infer<typeof bioSocialBarSchema>;

export const BioSocialBarSection = createSection<BioSocialBarContent>({
  id: "bio.socials",
  name: "Bio Social Grid & Contatos",
  description: "Grade compacta de redes sociais e canais de contato com ícone e cor customizáveis.",
  category: "Bio / Linktree",
  iconName: "Globe",
  modes: ["LINKTREE", "LANDING_PAGE"],
  contentSchema: bioSocialBarSchema,
  fields: [
    {
      key: "socials",
      label: "Redes Sociais & Canais",
      type: "array",
      optionalKey: "socials",
      defaultNewItem: {
        platform: "Instagram",
        handleOrCount: "@nivix",
        url: "https://instagram.com",
        iconName: "Globe",
        accentColor: "",
      },
      itemFields: [
        { key: "platform", label: "Nome da Rede", type: "text" },
        { key: "handleOrCount", label: "Seguidores ou @Arroba", type: "text" },
        { key: "url", label: "URL do Perfil", type: "url" },
        { key: "iconName", label: "Ícone", type: "icon" },
        { key: "accentColor", label: "Cor Exclusiva (Opcional)", type: "color" },
      ],
    },
  ],
  defaultData: {
    layout: {
      paddingY: "compact",
      containerWidth: "mobile",
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "md",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      socials: [
        {
          platform: "WhatsApp",
          handleOrCount: "Direct",
          url: "https://wa.me/",
          iconName: "MessageCircle",
        },
        {
          platform: "Website",
          handleOrCount: "nivix.company",
          url: "https://nivix.company",
          iconName: "Globe",
        },
        {
          platform: "E-mail",
          handleOrCount: "VIP",
          url: "mailto:contato@nivix.company",
          iconName: "Mail",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const defaultAccent = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    if (hidden.socials) return null;

    return (
      <div className="grid grid-cols-3 gap-2.5">
        {content.socials.map((soc, idx) => {
          const itemAccent = soc.accentColor || defaultAccent;
          return (
            <a
              key={idx}
              href={soc.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-3 flex flex-col items-center justify-center text-center gap-1.5 group transition-all hover:-translate-y-0.5",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{ backgroundColor: styles.customSurface || undefined }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: `${itemAccent}18`,
                  color: itemAccent,
                }}
              >
                <DynamicIcon
                  name={soc.iconName || "Globe"}
                  className="w-4 h-4"
                />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xs font-bold leading-none">
                  {soc.platform}
                </span>
                {soc.handleOrCount && (
                  <span className="block text-[10px] opacity-55">
                    {soc.handleOrCount}
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>
    );
  },
});
