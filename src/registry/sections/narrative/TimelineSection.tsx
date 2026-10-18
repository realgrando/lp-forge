"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const timelineSectionSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  milestones: z.array(
    z.object({
      year: z.string(),
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type TimelineSectionContent = z.infer<typeof timelineSectionSchema>;

export const TimelineSection = createSection<TimelineSectionContent>({
  id: "narrative.timeline",
  name: "Linha do Tempo (Timeline)",
  description:
    "Linha do tempo vertical alternada com ano/data, título do marco, descrição e ícone.",
  category: "Sobre",
  iconName: "Calendar",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "narrative",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "centralLine", label: "Linha Vertical Central" },
    { key: "milestones", label: "Marcos da Linha do Tempo" },
    { key: "milestoneIcons", label: "Ícones nos Marcos" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: timelineSectionSchema,
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
      key: "milestones",
      label: "Marcos Históricos",
      type: "array",
      optionalKey: "milestones",
      defaultNewItem: {
        year: "2026",
        title: "Novo Marco Histórico",
        description: "Descrição da conquista e evolução alcançada neste período.",
        iconName: "Star",
        accentColor: "",
      },
      itemFields: [
        { key: "year", label: "Ano / Data", type: "text" },
        { key: "title", label: "Título do Marco", type: "text" },
        { key: "description", label: "Descrição", type: "textarea" },
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
      badge: "NOSSA TRAJETÓRIA",
      headline: "Uma história de excelência e evolução contínua",
      subtitle:
        "Desde a fundação até a consolidação como referência técnica no mercado.",
      milestones: [
        {
          year: "2014",
          title: "A Fundação",
          description:
            "Início das operações com foco absoluto em acabamento artesanal e atendimento consultivo.",
          iconName: "Sparkles",
          accentColor: "",
        },
        {
          year: "2019",
          title: "Expansão & Tecnologia",
          description:
            "Conquista dos primeiros grandes projetos corporativos e adoção de metodologia própria.",
          iconName: "Rocket",
          accentColor: "",
        },
        {
          year: "2025",
          title: "Referência de Mercado",
          description:
            "Mais de 250 operações entregues com índice máximo de satisfação e reconhecimento nacional.",
          iconName: "Crown",
          accentColor: "",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Faça Parte da Nossa História",
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
      <div className="space-y-14">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="Calendar"
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

        {!isHidden("milestones") &&
          content.milestones &&
          content.milestones.length > 0 && (
            <div className="relative max-w-4xl mx-auto">
              {!isHidden("centralLine") && (
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px opacity-25"
                  style={{ backgroundColor: accentColor }}
                />
              )}

              <div className="space-y-8 md:space-y-12">
                {content.milestones.map((m, idx) => {
                  const isEven = idx % 2 === 0;
                  const itemColor = m.accentColor || accentColor;

                  return (
                    <div
                      key={idx}
                      className="relative flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                      {/* Card do Marco */}
                      <div
                        className={cn(
                          "w-full md:w-[calc(50%-2.5rem)]",
                          isEven ? "md:order-1" : "md:order-3"
                        )}
                      >
                        <div
                          className={cn(
                            "p-6 sm:p-8 transition-all duration-300",
                            getSurfaceClasses(surfaceStyle),
                            getRadiusClass(radiusPreset),
                            isEven ? "md:text-right" : "md:text-left"
                          )}
                          style={{
                            backgroundColor: styles.customSurface || undefined,
                            ...(styles.borderWidth && styles.borderWidth !== "0"
                              ? {
                                  borderWidth: `${styles.borderWidth}px`,
                                  borderColor:
                                    styles.borderColor || `${itemColor}40`,
                                }
                              : {}),
                          }}
                        >
                          <span
                            className="text-3xl sm:text-4xl font-black tracking-tighter block mb-2"
                            style={{
                              fontFamily: "var(--site-font-heading)",
                              color: itemColor,
                            }}
                          >
                            {m.year}
                          </span>
                          <h3
                            className="text-xl font-bold tracking-tight mb-2"
                            style={{ fontFamily: "var(--site-font-heading)" }}
                          >
                            {m.title}
                          </h3>
                          <p className="text-sm opacity-75 leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>

                      {/* Marcador Central */}
                      <div className="md:order-2 relative z-10 flex items-center justify-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-xl"
                          style={{
                            backgroundColor: "var(--site-surface)",
                            borderColor: itemColor,
                            color: itemColor,
                          }}
                        >
                          {!isHidden("milestoneIcons") &&
                          m.iconName &&
                          m.iconName !== "none" ? (
                            <DynamicIcon name={m.iconName} className="w-5 h-5" />
                          ) : (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: itemColor }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Espaçador do Lado Oposto */}
                      <div
                        className={cn(
                          "hidden md:block md:w-[calc(50%-2.5rem)]",
                          isEven ? "md:order-3" : "md:order-1"
                        )}
                      />
                    </div>
                  );
                })}
              </div>
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
