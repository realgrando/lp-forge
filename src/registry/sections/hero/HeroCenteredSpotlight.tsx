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

const heroCenteredSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  primaryCta: buttonConfigSchema,
  secondaryCta: buttonConfigSchema,
  socialProofText: z.string(),
  metricsBar: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      iconName: z.string().optional(),
    })
  ),
});

export type HeroCenteredContent = z.infer<typeof heroCenteredSchema>;

export const HeroCenteredSpotlightSection = createSection<HeroCenteredContent>({
  id: "hero.centered",
  name: "Hero Centered Monumental",
  description:
    "Hero centralizado de alto impacto com tipografia monumental, duplo CTA, prova social e barra de métricas responsiva.",
  category: "Hero",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Monumental" },
    { key: "subtitle", label: "Subtítulo Central" },
    { key: "primaryCta", label: "Botão Principal (CTA 1)" },
    { key: "secondaryCta", label: "Botão Secundário (CTA 2)" },
    { key: "socialProofText", label: "Nota de Prova Social" },
    { key: "metricsBar", label: "Barra de Métricas Inferior" },
  ],
  contentSchema: heroCenteredSchema,
  fields: [
    {
      key: "badge",
      label: "Badge de Destaque",
      type: "text",
      optionalKey: "badge",
      isBadge: true,
      typographyElementKey: "badge",
    },
    {
      key: "headline",
      label: "Título Monumental",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Subtítulo Central",
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
      key: "socialProofText",
      label: "Texto de Prova Social Rápido",
      type: "text",
      optionalKey: "socialProofText",
      typographyElementKey: "socialProofText",
    },
    {
      key: "metricsBar",
      label: "Métricas da Barra Inferior",
      type: "array",
      optionalKey: "metricsBar",
      defaultNewItem: {
        value: "99.9%",
        label: "Nova Métrica",
        iconName: "TrendingUp",
      },
      itemFields: [
        { key: "value", label: "Número / Valor", type: "text" },
        { key: "label", label: "Rótulo", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
      ],
    },
  ],
  defaultData: {
    layout: {
      paddingY: "spacious",
      paddingInner: "none",
      paddingX: "normal",
      containerWidth: "full",
      distribution: "center",
      alignItems: "center",
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
      badge: "ARQUITETURA DE ALTA CONVERSÃO",
      headline: "Domine seu mercado com presença digital incomparável.",
      subtitle:
        "Criamos ecossistemas visuais sob medida para marcas que exigem autoridade, velocidade extrema e design fora da curva.",
      primaryCta: {
        enabled: true,
        text: "Iniciar Transformação Agora",
        url: "#contato",
        variant: "solid",
        size: "lg",
        radius: "lg",
        iconName: "Rocket",
        iconPosition: "right",
      },
      secondaryCta: {
        enabled: true,
        text: "Ver Demonstração Ao Vivo",
        url: "#cases",
        variant: "outline",
        size: "lg",
        radius: "lg",
        iconName: "Play",
        iconPosition: "left",
      },
      socialProofText: "Mais de 120 operações escaladas no Brasil e América Latina",
      metricsBar: [
        { value: "< 0.4s", label: "Tempo de Carregamento", iconName: "Zap" },
        { value: "+210%", label: "Taxa de Conversão", iconName: "TrendingUp" },
        { value: "100%", label: "Uptime Serverless", iconName: "Shield" },
      ],
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showPrimaryBtn =
      content.primaryCta?.enabled && !isHidden("primaryCta");
    const showSecondaryBtn =
      content.secondaryCta?.enabled && !isHidden("secondaryCta");
    const showMetrics =
      !isHidden("metricsBar") &&
      content.metricsBar &&
      content.metricsBar.length > 0;

    const gapClasses: Record<LayoutGap, string> = {
      none: "gap-2",
      compact: "gap-4 sm:gap-6",
      normal: "gap-6 sm:gap-8",
      spacious: "gap-8 sm:gap-12",
      monumental: "gap-12 sm:gap-16",
    };
    const effectiveGap = gapClasses[layout?.gap || "normal"];

    const isReverse = Boolean(layout?.reverse);
    const direction = layout?.direction || "col";

    const getDirectionClass = () => {
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

    const isStart = layout?.distribution === "start";
    const isEnd = layout?.distribution === "end";
    const alignmentClass = isStart
      ? "items-start text-left"
      : isEnd
      ? "items-end text-right"
      : "items-center text-center";

    const boxPositionClass = isStart
      ? "mr-auto ml-0"
      : isEnd
      ? "ml-auto mr-0"
      : "mx-auto";

    const metricsToRender = isReverse
      ? [...content.metricsBar].reverse()
      : content.metricsBar;

    return (
      <div
        className={cn(
          "w-full max-w-4xl flex transition-all",
          boxPositionClass,
          alignmentClass,
          getDirectionClass(),
          effectiveGap
        )}
      >
        <EditableText
          isBadge
          defaultIconName="Crown"
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
          className="w-full text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.03]"
        />

        <EditableText
          as="p"
          value={content.subtitle}
          elementKey="subtitle"
          styles={styles}
          className="w-full text-base sm:text-xl opacity-75 max-w-2xl leading-relaxed"
        />

        {/* CTAs Duplos Responsivos */}
        {(showPrimaryBtn || showSecondaryBtn) && (
          <div
            className={cn(
              "w-full flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2",
              isStart
                ? "sm:justify-start"
                : isEnd
                ? "sm:justify-end"
                : "sm:justify-center"
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

        {/* Nota de Prova Social */}
        {!isHidden("socialProofText") && content.socialProofText && (
          <EditableText
            as="p"
            defaultIconName="Star"
            value={content.socialProofText}
            elementKey="socialProofText"
            styles={styles}
            className="text-xs font-medium opacity-60 tracking-wide"
          />
        )}

        {/* Barra de Métricas */}
        {showMetrics && (
          <div
            className={cn(
              "w-full grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 mt-2 border shadow-xl transition-all",
              getSurfaceClasses(surfaceStyle),
              getRadiusClass(radiusPreset)
            )}
            style={{
              backgroundColor: styles.customSurface || undefined,
              borderColor: styles.borderColor || undefined,
              borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
            }}
          >
            {metricsToRender.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  {item.iconName && item.iconName !== "none" && (
                    <DynamicIcon
                      name={item.iconName}
                      className="w-5 h-5 shrink-0"
                      style={{ color: accentColor }}
                    />
                  )}
                  <span
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ fontFamily: "var(--site-font-heading)", color: accentColor }}
                  >
                    {item.value}
                  </span>
                </div>
                <span className="text-xs opacity-65 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});
