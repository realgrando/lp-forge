"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const processStepsSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  steps: z.array(
    z.object({
      stepNumber: z.string(),
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type ProcessStepsContent = z.infer<typeof processStepsSchema>;

export const ProcessStepsSection = createSection<ProcessStepsContent>({
  id: "process.steps",
  name: "Processo & Etapas Numeradas",
  description: "Fluxo passo a passo numerado para explicar metodologias, entregas e jornadas do cliente.",
  category: "Processo & Como Funciona",
  iconName: "Layers",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "eyebrow", label: "Badge Superior" },
    { key: "headline", label: "Título da Seção" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "steps", label: "Cards das Etapas" },
    { key: "ctaButton", label: "Botão CTA Inferior" },
  ],
  contentSchema: processStepsSchema,
  fields: [
    {
      key: "eyebrow",
      label: "Badge Superior",
      type: "text",
      optionalKey: "eyebrow",
      isBadge: true,
      typographyElementKey: "eyebrow",
    },
    {
      key: "headline",
      label: "Título do Processo",
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
      key: "steps",
      label: "Etapas do Processo",
      type: "array",
      optionalKey: "steps",
      defaultNewItem: {
        stepNumber: "04",
        title: "Nova Etapa",
        description: "Descrição clara do que acontece nesta fase.",
        iconName: "Sparkles",
        accentColor: "",
      },
      itemFields: [
        { key: "stepNumber", label: "Número / Código (Ex: 01)", type: "text" },
        { key: "title", label: "Título da Etapa", type: "text" },
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
      paddingY: "normal",
      containerWidth: "boxed",
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "lg",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      eyebrow: "METODOLOGIA DE EXECUÇÃO",
      headline: "Da estratégia ao deploy em 3 etapas cirúrgicas.",
      subtitle:
        "Um fluxo desenhado para eliminar gargalos técnicos e colocar sua operação no ar em tempo recorde.",
      steps: [
        {
          stepNumber: "01",
          title: "Arquitetura & Identidade Visual",
          description:
            "Definimos a paleta semântica, tipografia de elite e a estrutura persuasiva das seções.",
          iconName: "Layers",
        },
        {
          stepNumber: "02",
          title: "Refinamento Micro & Conteúdo",
          description:
            "Ajustamos cada botão, card 3D, luz ambiente e copy para maximizar a conversão.",
          iconName: "Sparkles",
        },
        {
          stepNumber: "03",
          title: "Ejeção & Deploy Custo Zero",
          description:
            "Publicamos na infraestrutura serverless com painel /admin autônomo para sua equipe.",
          iconName: "Rocket",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Agendar Diagnóstico de Projeto",
        url: "#contato",
        variant: "solid",
        size: "md",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div className="space-y-12">
        {(!hidden.eyebrow || !hidden.headline || !hidden.subtitle) && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="Layers"
              accentColor={accentColor}
              value={content.eyebrow}
              elementKey="eyebrow"
              styles={styles}
            />
            <EditableText
              as="h2"
              defaultIsHeading
              value={content.headline}
              elementKey="headline"
              styles={styles}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-70"
            />
          </div>
        )}

        {!hidden.steps && content.steps && content.steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.steps.map((step, idx) => {
              const stepAccent = step.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "p-7 relative flex flex-col justify-between transition-all",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{ backgroundColor: styles.customSurface || undefined }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-3xl font-black font-mono tracking-tighter opacity-90"
                      style={{ color: stepAccent }}
                    >
                      {step.stepNumber}
                    </span>
                    {step.iconName && step.iconName !== "none" && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                        style={{
                          backgroundColor: `${stepAccent}15`,
                          color: stepAccent,
                        }}
                      >
                        <DynamicIcon name={step.iconName} className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3
                      className="text-xl font-bold tracking-tight"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm opacity-75 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!hidden.ctaButton && content.ctaButton?.enabled && (
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
