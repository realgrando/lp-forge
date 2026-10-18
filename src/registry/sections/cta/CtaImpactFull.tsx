"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const ctaImpactFullSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  primaryCta: buttonConfigSchema,
  socialProofText: z.string(),
});

export type CtaImpactFullContent = z.infer<typeof ctaImpactFullSchema>;

export const CtaImpactFullSection = createSection<CtaImpactFullContent>({
  id: "cta.impact",
  name: "CTA Monumental Impact",
  description:
    "Card monumental de conversão com iluminação cinematográfica, título de alto impacto e prova social integrada.",
  category: "Conversão",
  iconName: "Rocket",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título de Impacto" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "primaryCta", label: "Botão Principal (CTA)" },
    { key: "socialProofText", label: "Selo de Prova Social (+Clientes)" },
  ],
  contentSchema: ctaImpactFullSchema,
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
      label: "Título de Impacto",
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
      key: "primaryCta",
      label: "Botão de Ação Principal",
      type: "button",
      optionalKey: "primaryCta",
    },
    {
      key: "socialProofText",
      label: "Texto de Prova Social Abaixo do Botão",
      type: "text",
      optionalKey: "socialProofText",
      typographyElementKey: "socialProofText",
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
      badge: "OPORTUNIDADE DE ELITE",
      headline: "Pronto para transformar seu projeto?",
      subtitle:
        "Fale agora com um especialista e garanta o máximo resultado e conversão para sua marca.",
      primaryCta: {
        enabled: true,
        text: "Solicitar Orçamento Agora",
        url: "#contato",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      socialProofText: "+400 Clientes Atendidos",
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    return (
      <div
        className={cn(
          "relative p-10 sm:p-16 md:p-20 overflow-hidden shadow-2xl",
          getSurfaceClasses(surfaceStyle),
          getRadiusClass(radiusPreset)
        )}
        style={{ backgroundColor: styles.customSurface || undefined }}
      >
        {/* Glows Cinematográficos */}
        <div
          className="absolute top-0 right-0 w-96 h-96 blur-3xl rounded-full opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 blur-3xl rounded-full opacity-10 pointer-events-none -translate-x-1/3 translate-y-1/3"
          style={{ backgroundColor: accentColor }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-3xl space-y-6">
            <EditableText
              isBadge
              defaultIconName="Sparkles"
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
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.95]"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-75 text-base sm:text-xl font-medium leading-relaxed max-w-xl"
            />
          </div>

          <div className="shrink-0 flex flex-col items-start lg:items-center gap-5">
            {!isHidden("primaryCta") && (
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
              />
            )}

            {!isHidden("socialProofText") && content.socialProofText && (
              <div className="flex items-center gap-3 opacity-65">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-zinc-900"
                      style={{ backgroundColor: `${accentColor}40` }}
                    />
                  ))}
                </div>
                <EditableText
                  as="span"
                  value={content.socialProofText}
                  elementKey="socialProofText"
                  styles={styles}
                  className="text-[10px] font-bold uppercase tracking-wider"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
