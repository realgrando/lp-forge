"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const ctaBannerSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  primaryCta: buttonConfigSchema,
  secondaryCta: buttonConfigSchema,
  guaranteeNote: z.string(),
});

export type CtaBannerContent = z.infer<typeof ctaBannerSchema>;

export const CtaBannerSection = createSection<CtaBannerContent>({
  id: "cta.banner",
  name: "CTA Spotlight Conversion Banner",
  description: "Caixa de fechamento e conversão final com duplo botão e selo de segurança.",
  category: "CTA & Conversão",
  iconName: "Rocket",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Headline de Fechamento" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "primaryCta", label: "Botão Principal (CTA 1)" },
    { key: "secondaryCta", label: "Botão Secundário (CTA 2)" },
    { key: "guaranteeNote", label: "Nota de Garantia / Segurança" },
  ],
  contentSchema: ctaBannerSchema,
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
      label: "Título de Fechamento",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Subtítulo Persuasivo",
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
      key: "guaranteeNote",
      label: "Nota Inferior de Segurança / SLA",
      type: "text",
      optionalKey: "guaranteeNote",
      typographyElementKey: "guaranteeNote",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "normal",
      containerWidth: "boxed",
    },
    styles: {
      surfaceVariant: "3d_floating",
      borderRadius: "lg",
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "PRONTO PARA ESCALAR?",
      headline: "Transforme visitantes em clientes de alto valor hoje mesmo.",
      subtitle:
        "Solicite uma proposta personalizada e receba o diagnóstico visual da sua nova página sem compromisso.",
      primaryCta: {
        enabled: true,
        text: "Falar com Especialista no WhatsApp",
        url: "https://wa.me/",
        variant: "solid",
        size: "lg",
        iconName: "MessageCircle",
        iconPosition: "left",
      },
      secondaryCta: {
        enabled: true,
        text: "Agendar Reunião Estratégica",
        url: "#agenda",
        variant: "outline",
        size: "lg",
        iconName: "Calendar",
        iconPosition: "left",
      },
      guaranteeNote: "Entrega rápida garantida em contrato • Código 100% seu",
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div
        id="contato"
        className={cn(
          "p-8 sm:p-14 text-center relative overflow-hidden",
          getSurfaceClasses(surfaceStyle),
          getRadiusClass(radiusPreset)
        )}
        style={{
          backgroundColor: styles.customSurface || undefined,
          borderColor: `${accentColor}40`,
        }}
      >
        <div
          className="w-64 h-64 rounded-full blur-[110px] absolute -top-20 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-6">
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
            className="text-3xl sm:text-5xl font-black tracking-tight leading-tight"
          />

          <EditableText
            as="p"
            value={content.subtitle}
            elementKey="subtitle"
            styles={styles}
            className="text-sm sm:text-lg opacity-75 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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

          {!hidden.guaranteeNote && content.guaranteeNote && (
            <EditableText
              as="p"
              defaultIconName="Lock"
              value={content.guaranteeNote}
              elementKey="guaranteeNote"
              styles={styles}
              className="text-xs opacity-55 pt-2"
            />
          )}
        </div>
      </div>
    );
  },
});
