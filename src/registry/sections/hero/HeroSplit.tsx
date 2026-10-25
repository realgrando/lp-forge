"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import {
  buttonConfigSchema,
  ContentMaxWidth,
  LayoutAlignItems,
  LayoutDistribution,
  LayoutGap,
} from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const heroSplitContentSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  primaryCta: buttonConfigSchema,
  secondaryCta: buttonConfigSchema,
  cardTitle: z.string(),
  cardBadge: z.string(),
  cardMetric: z.string(),
  cardSubtitle: z.string(),
  highlights: z.array(
    z.object({
      text: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
});

export type HeroSplitContent = z.infer<typeof heroSplitContentSchema>;

export const HeroSplitSection = createSection<HeroSplitContent>({
  id: "hero.split",
  name: "Hero Split High-Conversion",
  description:
    "Seção Hero dividida onde cada elemento (badge, botões, card 3D, lista) é 100% opcional, responsivo e micro-customizável.",
  category: "Hero",
  iconName: "LayoutTemplate",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "primaryCta", label: "Botão Principal (CTA 1)" },
    { key: "secondaryCta", label: "Botão Secundário (CTA 2)" },
    { key: "highlights", label: "Lista de Diferenciais" },
    { key: "visualCard", label: "Card Visual da Direita (Showcase)" },
    { key: "cardBadge", label: "Selo do Card Visual" },
    { key: "cardBars", label: "Barras de Progresso do Card" },
  ],
  contentSchema: heroSplitContentSchema,
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
      label: "Título Principal (Headline)",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Subtítulo Explicativo",
      type: "textarea",
      optionalKey: "subtitle",
      typographyElementKey: "subtitle",
    },
    {
      key: "primaryCta",
      label: "Botão Principal (CTA 1)",
      type: "button",
      optionalKey: "primaryCta",
    },
    {
      key: "secondaryCta",
      label: "Botão Secundário (CTA 2)",
      type: "button",
      optionalKey: "secondaryCta",
    },
    {
      key: "highlights",
      label: "Lista de Diferenciais Rápidos",
      type: "array",
      optionalKey: "highlights",
      defaultNewItem: {
        text: "Novo diferencial estratégico",
        iconName: "CheckCircle2",
        accentColor: "",
      },
      itemFields: [
        { key: "text", label: "Texto do Diferencial", type: "text" },
        { key: "iconName", label: "Ícone do Item", type: "icon" },
        { key: "accentColor", label: "Cor do Ícone (Opcional)", type: "color" },
      ],
    },
    {
      key: "cardTitle",
      label: "Card Visual: Etiqueta",
      type: "text",
      optionalKey: "visualCard",
      typographyElementKey: "cardTitle",
    },
    {
      key: "cardBadge",
      label: "Card Visual: Selo de Status",
      type: "text",
      optionalKey: "cardBadge",
      isBadge: true,
      typographyElementKey: "cardBadge",
    },
    {
      key: "cardMetric",
      label: "Card Visual: Métrica Principal",
      type: "text",
      optionalKey: "visualCard",
      typographyElementKey: "cardMetric",
    },
    {
      key: "cardSubtitle",
      label: "Card Visual: Descrição",
      type: "textarea",
      optionalKey: "visualCard",
      typographyElementKey: "cardSubtitle",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "spacious",
      paddingInner: "none",
      paddingX: "normal",
      containerWidth: "full",
      direction: "responsive",
      gap: "normal",
      reverse: false,
    },
    styles: {
      ambientGlow: true,
      surfaceVariant: "glass",
      borderRadius: "lg",
      hiddenElements: {},
    },
    content: {
      badge: "NIVIX FORGE ENGINE 2.0",
      headline: "Construa páginas lendárias que convertem em escala.",
      subtitle:
        "Design de precisão cirúrgica com liberdade total de tipografia, luz ambiente, superfícies 3D e exportação instantânea sem servidores pesados.",
      primaryCta: {
        enabled: true,
        text: "Começar Projeto Agora",
        url: "#contato",
        variant: "solid",
        size: "lg",
        radius: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      secondaryCta: {
        enabled: true,
        text: "Explorar Componentes",
        url: "#features",
        variant: "outline",
        size: "lg",
        radius: "lg",
        iconName: "Play",
        iconPosition: "left",
      },
      cardTitle: "Performance Comercial",
      cardBadge: "LIVE 99.8%",
      cardMetric: "+340% ROI",
      cardSubtitle: "Resultados auditados em clientes enterprise em escala global.",
      highlights: [
        {
          text: "100% dos componentes compatíveis com modo Bio e Landing Page",
          iconName: "CheckCircle2",
        },
        {
          text: "Tipografia individual por bloco e controle fino de opacidade",
          iconName: "Sparkles",
        },
        {
          text: "Hospedagem custo zero direto na Vercel com velocidade extrema",
          iconName: "Zap",
        },
      ],
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showVisualCard = !isHidden("visualCard");
    const showPrimaryBtn = content.primaryCta?.enabled && !isHidden("primaryCta");
    const showSecondaryBtn =
      content.secondaryCta?.enabled && !isHidden("secondaryCta");
    const showHighlights =
      !isHidden("highlights") &&
      content.highlights &&
      content.highlights.length > 0;

    // Espaçamento entre Colunas (Gap)
    const gapClasses: Record<LayoutGap, string> = {
      none: "gap-2",
      compact: "gap-6 lg:gap-8",
      normal: "gap-10 lg:gap-14",
      spacious: "gap-14 lg:gap-20",
      monumental: "gap-16 lg:gap-28",
    };
    const effectiveGap = gapClasses[layout?.gap || "normal"];

    // Inversão e Direção do Layout
    const isReverse = Boolean(layout?.reverse);
    const direction = layout?.direction || "responsive";

    const getSplitDirectionClass = () => {
      if (direction === "col") {
        return isReverse ? "flex flex-col-reverse" : "flex flex-col";
      }
      if (direction === "row") {
        return isReverse ? "flex flex-row-reverse" : "flex flex-row";
      }
      // Padrão Responsivo: coluna no mobile, linha no desktop
      return isReverse
        ? "flex flex-col-reverse lg:flex-row-reverse"
        : "flex flex-col lg:flex-row";
    };

    return (
      <div
        className={cn(
          "w-full items-center transition-all",
          getSplitDirectionClass(),
          effectiveGap
        )}
      >
        {/* Coluna de Texto e Conteúdo (Coluna 1) */}
        <div
          className={cn(
            "space-y-6 transition-all",
            showVisualCard ? "w-full lg:w-7/12" : "w-full max-w-4xl mx-auto text-center flex flex-col items-center"
          )}
        >
          <EditableText
            isBadge
            defaultIconName="Sparkles"
            accentColor={accentColor}
            value={content.badge}
            elementKey="badge"
            styles={styles}
          />

          <EditableText
            as="h1"
            defaultIsHeading
            value={content.headline}
            elementKey="headline"
            styles={styles}
            className="w-full text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]"
          />

          <EditableText
            as="p"
            value={content.subtitle}
            elementKey="subtitle"
            styles={styles}
            className="w-full text-base sm:text-lg opacity-75 max-w-2xl leading-relaxed"
          />

          {/* Botões de Ação */}
          {(showPrimaryBtn || showSecondaryBtn) && (
            <div
              className={cn(
                "flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2 w-full",
                !showVisualCard && "sm:justify-center"
              )}
            >
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
              />
              <SmartButton
                button={content.secondaryCta}
                elementKey="secondaryCta"
                styles={styles}
                theme={theme}
              />
            </div>
          )}

          {/* Lista de Diferenciais */}
          {showHighlights && (
            <div
              className={cn(
                "pt-4 space-y-3 border-t border-white/10 w-full",
                !showVisualCard && "flex flex-wrap justify-center gap-6 space-y-0"
              )}
            >
              {content.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm opacity-85"
                >
                  <DynamicIcon
                    name={item.iconName || "CheckCircle2"}
                    className="w-4 h-4 shrink-0"
                    style={{ color: item.accentColor || accentColor }}
                  />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coluna do Card Visual (Coluna 2) */}
        {showVisualCard && (
          <div className="w-full lg:w-5/12 flex items-center justify-center">
            <div
              className={cn(
                "w-full p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{
                backgroundColor: styles.customSurface || undefined,
                borderColor: styles.borderColor || undefined,
                borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
              }}
            >
              {/* Efeito Glow Interno */}
              {styles.ambientGlow && (
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-35 pointer-events-none"
                  style={{ backgroundColor: accentColor }}
                />
              )}

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <EditableText
                    as="span"
                    value={content.cardTitle}
                    elementKey="cardTitle"
                    styles={styles}
                    className="text-xs font-bold uppercase tracking-widest opacity-60"
                  />

                  {!isHidden("cardBadge") && content.cardBadge && (
                    <EditableText
                      isBadge
                      accentColor={accentColor}
                      value={content.cardBadge}
                      elementKey="cardBadge"
                      styles={styles}
                      className="px-2 py-0.5 text-[9px] rounded-full"
                    />
                  )}
                </div>

                <div>
                  <EditableText
                    as="div"
                    defaultIsHeading
                    value={content.cardMetric}
                    elementKey="cardMetric"
                    styles={styles}
                    className="text-4xl sm:text-5xl font-black tracking-tight"
                  />
                  <EditableText
                    as="p"
                    value={content.cardSubtitle}
                    elementKey="cardSubtitle"
                    styles={styles}
                    className="text-xs sm:text-sm opacity-70 mt-1 leading-relaxed"
                  />
                </div>

                {!isHidden("cardBars") && (
                  <div className="space-y-2.5 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono opacity-65">
                        <span>LCP (Page Speed)</span>
                        <span>0.2s</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: "95%", backgroundColor: accentColor }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono opacity-65">
                        <span>Taxa de Conversão Mobile</span>
                        <span>14.8%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: "82%", backgroundColor: accentColor }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
});
