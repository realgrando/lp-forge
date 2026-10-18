"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const logoCloudSchema = z.object({
  headline: z.string(),
  logos: z.array(
    z.object({
      name: z.string(),
      tag: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
});

export type LogoCloudContent = z.infer<typeof logoCloudSchema>;

export const LogoCloudSection = createSection<LogoCloudContent>({
  id: "trust.logos",
  name: "Logo Cloud & Trust Badges",
  description: "Faixa de autoridade com marcas parceiras, certificações e selos de confiança.",
  category: "Prova Social & Trust",
  iconName: "Award",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "headline", label: "Título Superior da Faixa" },
    { key: "logos", label: "Grade de Marcas / Selos" },
  ],
  contentSchema: logoCloudSchema,
  fields: [
    {
      key: "headline",
      label: "Texto de Introdução",
      type: "text",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "logos",
      label: "Marcas / Selos de Confiança",
      type: "array",
      optionalKey: "logos",
      defaultNewItem: {
        name: "NOVA MARCA",
        tag: "Parceiro Oficial",
        iconName: "Shield",
        accentColor: "",
      },
      itemFields: [
        { key: "name", label: "Nome da Empresa / Selo", type: "text" },
        { key: "tag", label: "Subtítulo / Certificação", type: "text" },
        { key: "iconName", label: "Ícone Representativo", type: "icon" },
        { key: "accentColor", label: "Cor do Selo (Opcional)", type: "color" },
      ],
    },
  ],
  defaultData: {
    layout: {
      paddingY: "compact",
      containerWidth: "boxed",
    },
    styles: {
      surfaceVariant: "bordered",
      borderRadius: "md",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      headline: "EMPRESAS E LÍDERES QUE CONFIAM NA ENGENHARIA NIVIX",
      logos: [
        { name: "VERTEX AI", tag: "Cloud Partner", iconName: "Cpu" },
        { name: "STRIPE GLOBAL", tag: "Verified Infrastructure", iconName: "Shield" },
        { name: "VERCEL EDGE", tag: "Zero-Latency Network", iconName: "Zap" },
        { name: "NEXUS CAPITAL", tag: "Enterprise Client", iconName: "Crown" },
        { name: "AURA LABS", tag: "Design System", iconName: "Gem" },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div className="space-y-6 text-center">
        <EditableText
          as="p"
          value={content.headline}
          elementKey="headline"
          styles={styles}
          className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-55"
        />

        {!hidden.logos && content.logos && content.logos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {content.logos.map((item, idx) => {
              const itemAccent = item.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "p-4 flex flex-col items-center justify-center gap-1.5 transition-all hover:opacity-100 opacity-85",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{ backgroundColor: styles.customSurface || undefined }}
                >
                  <div className="flex items-center gap-2">
                    {item.iconName && item.iconName !== "none" && (
                      <DynamicIcon
                        name={item.iconName}
                        className="w-4 h-4 shrink-0"
                        style={{ color: itemAccent }}
                      />
                    )}
                    <span
                      className="font-black text-xs tracking-wider uppercase"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.tag && (
                    <span className="text-[10px] opacity-50">{item.tag}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
