"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const processEliteCardsSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  cards: z.array(
    z.object({
      number: z.string(),
      phaseBadge: z.string(),
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type ProcessEliteCardsContent = z.infer<typeof processEliteCardsSchema>;

export const ProcessEliteCardsSection = createSection<ProcessEliteCardsContent>({
  id: "process.elite_cards",
  name: "Process Elite Numbered Cards",
  description:
    "Cards de processo com número 01..04 gigante em marca d'água, badge de fase, título, descrição e botão de ação.",
  category: "Processo",
  iconName: "Cpu",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "process",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "cards", label: "Grid de Cards Numerados" },
    { key: "watermarkNumber", label: "Número Gigante em Marca d'Água" },
    { key: "phaseBadge", label: "Badge de Fase nos Cards" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: processEliteCardsSchema,
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
      key: "cards",
      label: "Cards de Processo Elite",
      type: "array",
      optionalKey: "cards",
      defaultNewItem: {
        number: "05",
        phaseBadge: "FASE 05 // SYS",
        title: "Nova Etapa Técnica",
        description: "Detalhamento de precisão sobre os entregáveis desta etapa.",
        iconName: "CheckCircle2",
        accentColor: "",
      },
      itemFields: [
        { key: "number", label: "Número (Ex: 01)", type: "text" },
        { key: "phaseBadge", label: "Badge de Fase (Ex: FASE 01)", type: "text" },
        { key: "title", label: "Título", type: "text" },
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
      badge: "TECHNICAL APPROACH",
      headline: "Engenharia de Precisão",
      subtitle:
        "Do conceito à realidade técnica, cada passo é medido e executado com rigor arquitetônico.",
      cards: [
        {
          number: "01",
          phaseBadge: "POS_01 // DIAGNÓSTICO",
          title: "Levantamento Técnico",
          description:
            "Mapeamento milimétrico de requisitos, gargalos operacionais e viabilidade estrutural.",
          iconName: "Eye",
          accentColor: "",
        },
        {
          number: "02",
          phaseBadge: "POS_02 // ARQUITETURA",
          title: "Projetos Executivos",
          description:
            "Detalhamento técnico e prototipação de alta fidelidade para execução sem imprevistos.",
          iconName: "Layers",
          accentColor: "",
        },
        {
          number: "03",
          phaseBadge: "POS_03 // EXECUÇÃO",
          title: "Gestão & Construção",
          description:
            "Implementação assistida com controle rigoroso de recursos, prazos e performance.",
          iconName: "Cpu",
          accentColor: "",
        },
        {
          number: "04",
          phaseBadge: "POS_04 // HOMOLOGAÇÃO",
          title: "Certificação Final",
          description:
            "Auditoria completa de qualidade e entrega assistida com garantia de alto padrão.",
          iconName: "Shield",
          accentColor: "",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Solicitar Proposta Técnica",
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
          <div className="max-w-3xl space-y-4">
            <EditableText
              isBadge
              defaultIconName="Cpu"
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
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0]"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-70 max-w-2xl leading-relaxed"
            />
          </div>
        )}

        {!isHidden("cards") && content.cards && content.cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {content.cards.map((card, idx) => {
              const cardAccent = card.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "group p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between transition-all duration-300",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    ...(styles.borderWidth && styles.borderWidth !== "0"
                      ? {
                          borderWidth: `${styles.borderWidth}px`,
                          borderColor: styles.borderColor || `${cardAccent}40`,
                        }
                      : {}),
                  }}
                >
                  {!isHidden("watermarkNumber") && card.number && (
                    <span
                      className="absolute -right-3 -bottom-6 text-8xl sm:text-9xl font-black italic tracking-tighter select-none pointer-events-none opacity-[0.07] group-hover:opacity-15 transition-opacity"
                      style={{ color: cardAccent }}
                    >
                      {card.number}
                    </span>
                  )}

                  <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
                    {!isHidden("phaseBadge") && card.phaseBadge && (
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border"
                        style={{
                          color: cardAccent,
                          borderColor: `${cardAccent}35`,
                          backgroundColor: `${cardAccent}12`,
                        }}
                      >
                        {card.phaseBadge}
                      </span>
                    )}

                    {card.iconName && card.iconName !== "none" && (
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/10 ml-auto"
                        style={{
                          backgroundColor: `${cardAccent}15`,
                          color: cardAccent,
                        }}
                      >
                        <DynamicIcon name={card.iconName} className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3
                      className="text-2xl sm:text-3xl font-black tracking-tight"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base opacity-75 leading-relaxed border-l-2 pl-4"
                      style={{ borderColor: `${cardAccent}50` }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isHidden("ctaButton") && content.ctaButton?.enabled && (
          <div className="flex justify-start pt-2">
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
