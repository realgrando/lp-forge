"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const awardsSectionSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  awards: z.array(
    z.object({
      title: z.string(),
      issuer: z.string(),
      year: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type AwardsSectionContent = z.infer<typeof awardsSectionSchema>;

export const AwardsSection = createSection<AwardsSectionContent>({
  id: "narrative.awards",
  name: "Prêmios & Certificações",
  description:
    "Vitrine de prêmios, troféus e reconhecimentos com ano, entidade emissora, título e ícone.",
  category: "Prova Social",
  iconName: "Award",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "narrative",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "awards", label: "Grid de Prêmios & Certificações" },
    { key: "awardIcon", label: "Ícone de Troféu / Selo nos Cards" },
    { key: "awardYear", label: "Pílula de Ano nos Cards" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: awardsSectionSchema,
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
      key: "awards",
      label: "Prêmios e Certificações",
      type: "array",
      optionalKey: "awards",
      defaultNewItem: {
        title: "Nova Certificação Elite",
        issuer: "Conselho Internacional",
        year: "2025",
        iconName: "Award",
        accentColor: "",
      },
      itemFields: [
        { key: "title", label: "Título do Prêmio / Selo", type: "text" },
        { key: "issuer", label: "Entidade Emissora", type: "text" },
        { key: "year", label: "Ano", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
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
      badge: "QUALIDADE COMPROVADA",
      headline: "Nossa excelência é reconhecida no mercado",
      subtitle:
        "Certificações rigorosas e prêmios oficiais que atestam nosso compromisso com o mais alto padrão.",
      awards: [
        {
          title: "Certificação ISO 9001",
          issuer: "Gestão de Qualidade Total",
          year: "2025",
          iconName: "Shield",
          accentColor: "",
        },
        {
          title: "Destaque do Ano",
          issuer: "Prêmio Nacional de Excelência",
          year: "2024",
          iconName: "Crown",
          accentColor: "",
        },
        {
          title: "Selo Ouro de Segurança",
          issuer: "Auditoria Técnica Independente",
          year: "2024",
          iconName: "Award",
          accentColor: "",
        },
        {
          title: "Top of Mind Premium",
          issuer: "Pesquisa de Satisfação",
          year: "2023",
          iconName: "Gem",
          accentColor: "",
        },
      ],
      ctaButton: {
        enabled: false,
        text: "Falar com Especialista",
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
      <div className="space-y-12">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="Award"
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

        {!isHidden("awards") && content.awards && content.awards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.awards.map((aw, idx) => {
              const itemColor = aw.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "group p-8 flex flex-col items-center text-center transition-all duration-300",
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
                  {!isHidden("awardIcon") && (
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${itemColor}15`,
                        color: itemColor,
                      }}
                    >
                      <DynamicIcon
                        name={aw.iconName || "Award"}
                        className="w-7 h-7"
                      />
                    </div>
                  )}

                  <h3
                    className="text-lg sm:text-xl font-black uppercase tracking-tight mb-1.5"
                    style={{ fontFamily: "var(--site-font-heading)" }}
                  >
                    {aw.title}
                  </h3>

                  <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-6">
                    {aw.issuer}
                  </p>

                  {!isHidden("awardYear") && aw.year && (
                    <span
                      className="mt-auto px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border"
                      style={{
                        color: itemColor,
                        borderColor: `${itemColor}35`,
                        backgroundColor: `${itemColor}12`,
                      }}
                    >
                      {aw.year}
                    </span>
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
