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

const heroImpactCenterSchema = z.object({
  align: z.enum(["center", "left"]).default("center"),
  bgImage: z.string().optional(),
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  description: z.string(),
  primaryCta: buttonConfigSchema,
  secondaryCta: buttonConfigSchema,
  scrollLabel: z.string(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

export type HeroImpactCenterContent = z.infer<typeof heroImpactCenterSchema>;

export const HeroImpactCenterSection = createSection<HeroImpactCenterContent>({
  id: "hero.impact_center",
  name: "Hero Impact Background",
  description:
    "Bloco Hero de alto impacto com imagem de fundo opcional, controle de alinhamento (centro ou esquerda), botões duplos e indicadores.",
  category: "Hero",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE"],
  legacyType: "hero",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "bgImage", label: "Imagem de Fundo do Card Hero" },
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo em Destaque" },
    { key: "description", label: "Parágrafo de Descrição" },
    { key: "primaryCta", label: "Botão Principal (CTA 1)" },
    { key: "secondaryCta", label: "Botão Secundário (CTA 2)" },
    { key: "stats", label: "Barra de Métricas Rápidas" },
    { key: "scrollIndicator", label: "Indicador de Scroll" },
  ],
  contentSchema: heroImpactCenterSchema,
  fields: [
    {
      key: "align",
      label: "Alinhamento do Conteúdo",
      type: "select",
      options: [
        { value: "center", label: "Centralizado" },
        { value: "left", label: "Alinhado à Esquerda" },
      ],
    },
    {
      key: "bgImage",
      label: "Imagem de Fundo (Opcional)",
      type: "image",
      optionalKey: "bgImage",
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
      key: "headline",
      label: "Título Principal (Headline)",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Subtítulo de Impacto",
      type: "textarea",
      optionalKey: "subtitle",
      typographyElementKey: "subtitle",
    },
    {
      key: "description",
      label: "Descrição Complementar",
      type: "textarea",
      optionalKey: "description",
      typographyElementKey: "description",
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
      key: "stats",
      label: "Métricas Rápidas no Rodapé do Hero",
      type: "array",
      optionalKey: "stats",
      defaultNewItem: { value: "100%", label: "Garantia Técnica" },
      itemFields: [
        { key: "value", label: "Valor (Ex: +500)", type: "text" },
        { key: "label", label: "Legenda", type: "text" },
      ],
    },
    {
      key: "scrollLabel",
      label: "Texto do Indicador de Scroll",
      type: "text",
      optionalKey: "scrollIndicator",
      typographyElementKey: "scrollLabel",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "spacious",
      paddingInner: "none",
      paddingX: "normal",
      containerWidth: "full",
      minHeight: "auto",
      contentMaxWidth: "full",
      distribution: "center",
      alignItems: "center",
      gap: "normal",
      reverse: false,
    },
    styles: {
      ambientGlow: true,
      surfaceVariant: "solid",
      borderRadius: "none",
      hiddenElements: {},
    },
    content: {
      align: "center",
      bgImage: "",
      badge: "CONTRATO LIVRE DE AMARRAS",
      headline: "A melhor equipe de Marketing e Engenharia do Brasil",
      subtitle: "Escalamos sua operação com precisão cirúrgica e layouts de alto impacto que convertem em escala.",
      description:
        "Nossa equipe multidisciplinar entrega performance superior, previsibilidade de prazos e estética de cinema em cada entrega.",
      primaryCta: {
        enabled: true,
        text: "Entrar em Contato",
        url: "#contato",
        variant: "solid",
        size: "lg",
        radius: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      secondaryCta: {
        enabled: true,
        text: "Ver Resultados",
        url: "#portfolio",
        variant: "outline",
        size: "lg",
        radius: "lg",
        iconName: "Play",
        iconPosition: "left",
      },
      stats: [
        { value: "+340%", label: "Média de Conversão" },
        { value: "0ms", label: "Latência de Servidor" },
        { value: "100%", label: "Garantia em Contrato" },
      ],
      scrollLabel: "Rolar para Conhecer",
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const accentColor = styles.customAccent || theme.palette.accent;
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    // Distribuição e Alinhamento Horizontal (Posição Horizontal no Studio)
    const isStart =
      layout?.distribution === "start" ||
      (content.align === "left" && !layout?.distribution);
    const isEnd = layout?.distribution === "end";
    const isBetween = layout?.distribution === "between";
    const isAround = layout?.distribution === "around";

    // Espaçamento entre Elementos (Gap)
    const gapClasses: Record<LayoutGap, string> = {
      none: "gap-1.5 sm:gap-2",
      compact: "gap-3 sm:gap-4",
      normal: "gap-6 sm:gap-7",
      spacious: "gap-8 sm:gap-10",
      monumental: "gap-12 sm:gap-16",
    };
    const effectiveGap = gapClasses[layout?.gap || "normal"];

    const buttonGapClasses: Record<LayoutGap, string> = {
      none: "gap-2",
      compact: "gap-3",
      normal: "gap-4",
      spacious: "gap-6",
      monumental: "gap-8",
    };
    const effectiveButtonGap = buttonGapClasses[layout?.gap || "normal"];

    const statsGapClasses: Record<LayoutGap, string> = {
      none: "gap-3 sm:gap-4",
      compact: "gap-5 sm:gap-6",
      normal: "gap-8 sm:gap-14",
      spacious: "gap-12 sm:gap-20",
      monumental: "gap-16 sm:gap-28",
    };
    const effectiveStatsGap = statsGapClasses[layout?.gap || "normal"];

    // Inversão de Ordem dos Elementos (Reverse toggle) e Direção (col / row / responsive)
    const isReverse = Boolean(layout?.reverse);
    const direction = layout?.direction || "col";

    const getHeroDirectionClass = () => {
      if (direction === "row") {
        return isReverse ? "flex-row-reverse" : "flex-row";
      }
      if (direction === "responsive") {
        return isReverse
          ? "flex-col-reverse md:flex-row-reverse"
          : "flex-col md:flex-row";
      }
      return isReverse ? "flex-col-reverse" : "flex-col";
    };

    const showPrimaryBtn =
      content.primaryCta?.enabled && !isHidden("primaryCta");
    const showSecondaryBtn =
      content.secondaryCta?.enabled && !isHidden("secondaryCta");
    const showStats =
      !isHidden("stats") && content.stats && content.stats.length > 0;

    const statsToRender = isReverse ? [...content.stats].reverse() : content.stats;

    const stackAlignmentClass = isStart
      ? "items-start text-left"
      : isEnd
      ? "items-end text-right"
      : isBetween
      ? "items-start text-left"
      : "items-center text-center";

    // Renderizador do Bloco de Métricas / Estatísticas
    const renderStatsBlock = () => {
      if (!showStats) return null;
      return (
        <div
          className={cn(
            "w-full pt-6 md:pt-8 mt-2 border-t border-white/10 grid grid-cols-2 sm:flex sm:flex-wrap transition-all",
            effectiveStatsGap,
            isReverse && "sm:flex-row-reverse",
            isStart
              ? "sm:justify-start"
              : isEnd
              ? "sm:justify-end"
              : isBetween
              ? "sm:justify-between"
              : isAround
              ? "sm:justify-around"
              : "sm:justify-center"
          )}
        >
          {statsToRender.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col transition-all",
                surfaceStyle !== "solid" && [
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset),
                  "p-3 sm:px-5 sm:py-3 border",
                ],
                isStart
                  ? "items-start text-left"
                  : isEnd
                  ? "items-end text-right"
                  : "items-center text-center"
              )}
              style={{
                backgroundColor:
                  surfaceStyle !== "solid" && styles.customSurface
                    ? styles.customSurface
                    : undefined,
                borderColor: styles.borderColor || undefined,
                borderWidth: styles.borderWidth
                  ? `${styles.borderWidth}px`
                  : undefined,
              }}
            >
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter"
                style={{ color: accentColor }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-55">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      );
    };

    const isCardMode =
      surfaceStyle !== "solid" || Boolean(styles.customSurface);

    return (
      <div
        className={cn(
          "relative w-full flex flex-col transition-all",
          stackAlignmentClass,
          layout?.alignItems === "stretch" && "flex-1 h-full justify-between",
          isCardMode && [
            getSurfaceClasses(surfaceStyle),
            getRadiusClass(radiusPreset),
            "p-5 sm:p-8 md:p-14 lg:p-16 border shadow-2xl overflow-hidden",
          ]
        )}
        style={
          isCardMode
            ? {
                backgroundColor: styles.customSurface || undefined,
                borderColor: styles.borderColor || undefined,
                borderWidth: styles.borderWidth
                  ? `${styles.borderWidth}px`
                  : undefined,
              }
            : undefined
        }
      >
        {/* Imagem de Fundo Opcional do Bloco Hero */}
        {!isHidden("bgImage") && content.bgImage && (
          <div
            className={cn(
              "absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]"
            )}
          >
            <img
              src={content.bgImage}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </div>
        )}

        <div
          className={cn(
            "relative z-10 w-full flex transition-all",
            getHeroDirectionClass(),
            effectiveGap,
            stackAlignmentClass,
            layout?.alignItems === "stretch" && "flex-1 h-full justify-between"
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
            className="w-full font-black tracking-tighter leading-[0.98] text-4xl sm:text-6xl lg:text-7xl"
          />

          <EditableText
            as="p"
            value={content.subtitle}
            elementKey="subtitle"
            styles={styles}
            className="w-full text-lg sm:text-xl md:text-2xl font-bold opacity-90 leading-snug"
          />

          <EditableText
            as="p"
            value={content.description}
            elementKey="description"
            styles={styles}
            className="w-full text-xs sm:text-sm md:text-base opacity-70 leading-relaxed"
          />

          {(showPrimaryBtn || showSecondaryBtn) && (
            <div
              className={cn(
                "w-full flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center pt-3 transition-all",
                effectiveButtonGap,
                isReverse && "flex-col-reverse sm:flex-row-reverse",
                isStart
                  ? "sm:justify-start"
                  : isEnd
                  ? "sm:justify-end"
                  : isBetween
                  ? "sm:justify-between"
                  : isAround
                  ? "sm:justify-around"
                  : "sm:justify-center"
              )}
            >
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
                className="w-full sm:w-auto text-center"
              />
              <SmartButton
                button={content.secondaryCta}
                elementKey="secondaryCta"
                styles={styles}
                theme={theme}
                className="w-full sm:w-auto text-center"
              />
            </div>
          )}

          {/* Bloco de Métricas / Estatísticas */}
          {renderStatsBlock()}

          {!isHidden("scrollIndicator") && (
            <div
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollBy({
                    top: window.innerHeight * 0.75,
                    behavior: "smooth",
                  });
                }
              }}
              className={cn(
                "pt-6 flex flex-col gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none",
                isStart
                  ? "items-start"
                  : isEnd
                  ? "items-end"
                  : "items-center"
              )}
            >
              <EditableText
                as="span"
                value={content.scrollLabel}
                elementKey="scrollLabel"
                styles={styles}
                className="text-[10px] font-bold uppercase tracking-widest"
              />
              <DynamicIcon
                name="ChevronDown"
                className="w-5 h-5 animate-bounce"
                style={{ color: accentColor }}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
});
