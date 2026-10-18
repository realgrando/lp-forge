"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const processHorizontalSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  steps: z.array(
    z.object({
      stepNumber: z.string(),
      title: z.string(),
      description: z.string(),
      duration: z.string().optional(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
    })
  ),
  ctaButton: buttonConfigSchema,
});

export type ProcessHorizontalContent = z.infer<typeof processHorizontalSchema>;

export const ProcessHorizontalSection = createSection<ProcessHorizontalContent>({
  id: "process.horizontal",
  name: "Process Timeline Horizontal",
  description:
    "Etapas horizontais conectadas com número, ícone, título, descrição e tempo estimado.",
  category: "Processo",
  iconName: "Layers",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "process",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "connectorLine", label: "Linha Conectora Horizontal" },
    { key: "steps", label: "Etapas da Timeline" },
    { key: "stepDuration", label: "Badge de Tempo Estimado" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: processHorizontalSchema,
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
      key: "steps",
      label: "Etapas Horizontais",
      type: "array",
      optionalKey: "steps",
      defaultNewItem: {
        stepNumber: "05",
        title: "Nova Etapa",
        description: "Descrição objetiva do que acontece nesta etapa da jornada.",
        duration: "Dia 05",
        iconName: "Sparkles",
        accentColor: "",
      },
      itemFields: [
        { key: "stepNumber", label: "Número (Ex: 01)", type: "text" },
        { key: "title", label: "Título da Etapa", type: "text" },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "duration", label: "Tempo Estimado (Ex: Semana 1)", type: "text" },
        { key: "iconName", label: "Ícone da Etapa", type: "icon" },
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
      badge: "STEP BY STEP",
      headline: "Nossa Metodologia em Linha Direta",
      subtitle:
        "Um fluxo conectado e transparente focado em previsibilidade e entregas exponenciais.",
      steps: [
        {
          stepNumber: "01",
          title: "Briefing Criativo",
          description:
            "Imersão estratégica para alinhar objetivos de negócio, público e diferenciais competitivos.",
          duration: "Dia 01",
          iconName: "MessageCircle",
          accentColor: "",
        },
        {
          stepNumber: "02",
          title: "Prototipagem & UI",
          description:
            "Desenho da arquitetura visual de alta conversão com foco na jornada do usuário.",
          duration: "Dias 02-04",
          iconName: "Layers",
          accentColor: "",
        },
        {
          stepNumber: "03",
          title: "Execução de Elite",
          description:
            "Engenharia limpa, animações fluidas e otimização máxima de carregamento.",
          duration: "Dias 05-08",
          iconName: "Zap",
          accentColor: "",
        },
        {
          stepNumber: "04",
          title: "Deploy & Escala",
          description:
            "Publicação instantânea com painel de edição autônomo e monitoramento contínuo.",
          duration: "Dia 10",
          iconName: "Rocket",
          accentColor: "",
        },
      ],
      ctaButton: {
        enabled: true,
        text: "Iniciar Minha Jornada",
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
              defaultIconName="Layers"
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
              className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.04]"
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

        {!isHidden("steps") && content.steps && content.steps.length > 0 && (
          <div className="relative">
            {!isHidden("connectorLine") && (
              <div
                className="hidden lg:block absolute top-10 left-8 right-8 h-0.5 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                }}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {content.steps.map((step, idx) => {
                const stepColor = step.accentColor || accentColor;
                return (
                  <div
                    key={idx}
                    className="flex flex-col space-y-5 group"
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between lg:justify-start gap-4">
                      <div
                        className={cn(
                          "w-16 h-16 flex items-center justify-center border-2 shadow-xl transition-transform duration-300 group-hover:scale-105 relative",
                          getSurfaceClasses(surfaceStyle),
                          getRadiusClass(radiusPreset)
                        )}
                        style={{
                          borderColor: stepColor,
                          boxShadow: `0 0 28px -6px ${stepColor}40`,
                        }}
                      >
                        {step.iconName && step.iconName !== "none" ? (
                          <DynamicIcon
                            name={step.iconName}
                            className="w-6 h-6"
                            style={{ color: stepColor }}
                          />
                        ) : (
                          <span
                            className="text-xl font-black font-mono"
                            style={{ color: stepColor }}
                          >
                            {step.stepNumber}
                          </span>
                        )}
                        <span
                          className=" -top-2 -right-2 absolute w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center"
                          style={{
                            backgroundColor: stepColor,
                            color: "#09090B",
                          }}
                        >
                          {step.stepNumber}
                        </span>
                      </div>

                      {!isHidden("stepDuration") && step.duration && (
                        <span
                          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                          style={{
                            color: stepColor,
                            borderColor: `${stepColor}35`,
                            backgroundColor: `${stepColor}12`,
                          }}
                        >
                          {step.duration}
                        </span>
                      )}
                    </div>

                    {/* Step Card */}
                    <div
                      className={cn(
                        "p-6 flex-1 flex flex-col justify-between transition-all",
                        getSurfaceClasses(surfaceStyle),
                        getRadiusClass(radiusPreset)
                      )}
                      style={{
                        backgroundColor: styles.customSurface || undefined,
                        ...(styles.borderWidth && styles.borderWidth !== "0"
                          ? {
                              borderWidth: `${styles.borderWidth}px`,
                              borderColor: styles.borderColor || `${stepColor}40`,
                            }
                          : {}),
                      }}
                    >
                      <div className="space-y-2.5">
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
