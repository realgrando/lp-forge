"use client";

import React, { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
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

const heroLeadCaptureSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  benefits: z.array(
    z.object({
      label: z.string(),
      iconName: z.string().optional(),
    })
  ),
  primaryCta: buttonConfigSchema,
  formTitle: z.string(),
  formSubtitle: z.string(),
  formFields: z.array(
    z.object({
      label: z.string(),
      placeholder: z.string(),
      type: z.enum(["text", "email", "tel", "textarea"]).default("text"),
    })
  ),
  submitButton: buttonConfigSchema,
});

export type HeroLeadCaptureContent = z.infer<typeof heroLeadCaptureSchema>;

export const HeroLeadCaptureSection = createSection<HeroLeadCaptureContent>({
  id: "hero.lead_capture",
  name: "Hero Split + Lead Form",
  description:
    "Seção Hero dividida com proposta de valor, etapas de benefícios à esquerda e card de formulário de captura de leads à direita.",
  category: "Hero",
  iconName: "Send",
  modes: ["LANDING_PAGE"],
  legacyType: "hero",
  legacyVariant: "v4",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "benefits", label: "Lista de Etapas / Benefícios" },
    { key: "primaryCta", label: "Botão Auxiliar na Esquerda" },
    { key: "leadFormCard", label: "Card de Formulário (Direita)" },
    { key: "formTitle", label: "Título do Formulário" },
    { key: "formSubtitle", label: "Subtítulo do Formulário" },
    { key: "submitButton", label: "Botão de Envio do Formulário" },
  ],
  contentSchema: heroLeadCaptureSchema,
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
      key: "benefits",
      label: "Passos / Benefícios Rápidos",
      type: "array",
      optionalKey: "benefits",
      defaultNewItem: {
        label: "Novo benefício ou etapa",
        iconName: "CheckCircle2",
      },
      itemFields: [
        { key: "label", label: "Título do Benefício / Etapa", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
      ],
    },
    {
      key: "primaryCta",
      label: "Botão Auxiliar (Coluna Esquerda)",
      type: "button",
      optionalKey: "primaryCta",
    },
    {
      key: "formTitle",
      label: "Formulário: Título",
      type: "text",
      optionalKey: "formTitle",
      typographyElementKey: "formTitle",
    },
    {
      key: "formSubtitle",
      label: "Formulário: Subtítulo",
      type: "textarea",
      optionalKey: "formSubtitle",
      typographyElementKey: "formSubtitle",
    },
    {
      key: "formFields",
      label: "Campos do Formulário",
      type: "array",
      optionalKey: "leadFormCard",
      defaultNewItem: {
        label: "Telefone / WhatsApp",
        placeholder: "(11) 99999-9999",
        type: "tel",
      },
      itemFields: [
        { key: "label", label: "Rótulo do Campo", type: "text" },
        { key: "placeholder", label: "Placeholder", type: "text" },
        {
          key: "type",
          label: "Tipo de Campo",
          type: "select",
          options: [
            { value: "text", label: "Texto Curto" },
            { value: "email", label: "E-mail" },
            { value: "tel", label: "Telefone / WhatsApp" },
            { value: "textarea", label: "Mensagem Longa" },
          ],
        },
      ],
    },
    {
      key: "submitButton",
      label: "Botão de Envio do Formulário",
      type: "button",
      optionalKey: "submitButton",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "spacious",
      paddingInner: "none",
      paddingX: "normal",
      containerWidth: "boxed",
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
      badge: "AGENDE UMA CONSULTORIA ESTRATÉGICA",
      headline: "Receba uma análise completa da sua presença digital em 24h.",
      subtitle:
        "Nossos especialistas identificam gargalos de conversão, oportunidades de escala e preparam um plano tático sob medida para sua marca.",
      benefits: [
        {
          label: "Diagnóstico completo de velocidade e posicionamento",
          iconName: "Search",
        },
        {
          label: "Estrutura personalizada de arquitetura de conversão",
          iconName: "Layers",
        },
        {
          label: "Reunião de 45 minutos com Diretor de Engenharia",
          iconName: "Users",
        },
      ],
      primaryCta: {
        enabled: true,
        text: "Ver Casos de Sucesso",
        url: "#cases",
        variant: "ghost",
        size: "md",
        radius: "md",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
      formTitle: "Solicitar Análise Gratuita",
      formSubtitle: "Preencha os dados abaixo. Entraremos em contato ainda hoje.",
      formFields: [
        {
          label: "Seu Nome Completo",
          placeholder: "Ex: Gustavo Santos",
          type: "text",
        },
        {
          label: "E-mail Corporativo",
          placeholder: "gustavo@suaempresa.com.br",
          type: "email",
        },
        {
          label: "WhatsApp de Contato",
          placeholder: "(11) 99999-9999",
          type: "tel",
        },
        {
          label: "Sobre o Projeto",
          placeholder: "Conte-nos os detalhes do que você precisa...",
          type: "textarea",
        },
      ],
      submitButton: {
        enabled: true,
        text: "Enviar Solicitação Agora",
        url: "#enviar",
        variant: "solid",
        size: "lg",
        radius: "lg",
        iconName: "Send",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const [submitted, setSubmitted] = useState(false);
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showFormCard = !isHidden("leadFormCard");
    const showBenefits =
      !isHidden("benefits") &&
      content.benefits &&
      content.benefits.length > 0;
    const showPrimaryCta =
      !isHidden("primaryCta") && content.primaryCta?.enabled;

    const gapClasses: Record<LayoutGap, string> = {
      none: "gap-2",
      compact: "gap-6 lg:gap-8",
      normal: "gap-10 lg:gap-14",
      spacious: "gap-14 lg:gap-20",
      monumental: "gap-16 lg:gap-28",
    };
    const effectiveGap = gapClasses[layout?.gap || "normal"];

    const isReverse = Boolean(layout?.reverse);
    const direction = layout?.direction || "responsive";

    const getSplitDirectionClass = () => {
      if (direction === "col") {
        return isReverse ? "flex flex-col-reverse" : "flex flex-col";
      }
      if (direction === "row") {
        return isReverse ? "flex flex-row-reverse" : "flex flex-row";
      }
      return isReverse
        ? "flex flex-col-reverse lg:flex-row-reverse"
        : "flex flex-col lg:flex-row";
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <div
        className={cn(
          "w-full items-center transition-all",
          getSplitDirectionClass(),
          effectiveGap
        )}
      >
        {/* Coluna de Proposta e Benefícios (Esquerda) */}
        <div
          className={cn(
            "space-y-6 transition-all",
            showFormCard
              ? "w-full lg:w-7/12"
              : "w-full max-w-4xl mx-auto text-center flex flex-col items-center"
          )}
        >
          <EditableText
            isBadge
            defaultIconName="MessageSquare"
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
            className="w-full text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04]"
          />

          <EditableText
            as="p"
            value={content.subtitle}
            elementKey="subtitle"
            styles={styles}
            className="w-full text-base sm:text-lg opacity-75 max-w-2xl leading-relaxed"
          />

          {showBenefits && (
            <div className="pt-2 space-y-3.5 w-full">
              {content.benefits.map((step, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center gap-3.5 group",
                    !showFormCard && "justify-center"
                  )}
                >
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      borderColor: `${accentColor}35`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon
                      name={step.iconName || "CheckCircle2"}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] font-black uppercase tracking-widest opacity-45">
                      PASSO 0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold opacity-90">
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showPrimaryCta && (
            <div className="pt-2">
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
              />
            </div>
          )}
        </div>

        {/* Coluna do Formulário de Captura (Direita) */}
        {showFormCard && (
          <div className="w-full lg:w-5/12 flex items-center justify-center">
            <div
              className={cn(
                "w-full p-6 sm:p-8 md:p-10 border shadow-2xl relative overflow-hidden transition-all",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{
                backgroundColor: styles.customSurface || undefined,
                borderColor: styles.borderColor || undefined,
                borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
              }}
            >
              {/* Luz Ambiente Interna */}
              {styles.ambientGlow && (
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: accentColor }}
                />
              )}

              <div className="relative z-10 space-y-6">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      {!isHidden("formTitle") && content.formTitle && (
                        <EditableText
                          as="h3"
                          defaultIsHeading
                          value={content.formTitle}
                          elementKey="formTitle"
                          styles={styles}
                          className="text-2xl font-bold tracking-tight"
                        />
                      )}
                      {!isHidden("formSubtitle") && content.formSubtitle && (
                        <EditableText
                          as="p"
                          value={content.formSubtitle}
                          elementKey="formSubtitle"
                          styles={styles}
                          className="text-xs opacity-70 leading-relaxed"
                        />
                      )}
                    </div>

                    <div className="space-y-3 pt-2">
                      {content.formFields?.map((field, idx) => (
                        <div key={idx} className="space-y-1">
                          <label className="text-[11px] font-semibold opacity-75 block">
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              rows={3}
                              placeholder={field.placeholder}
                              className={cn(
                                "w-full px-3.5 py-2.5 text-xs bg-black/40 border border-white/10 text-white placeholder-zinc-500 transition-all focus:outline-none",
                                getRadiusClass(radiusPreset)
                              )}
                              style={{
                                borderColor: `${accentColor}30`,
                              }}
                            />
                          ) : (
                            <input
                              type={field.type}
                              placeholder={field.placeholder}
                              className={cn(
                                "w-full px-3.5 py-2.5 text-xs bg-black/40 border border-white/10 text-white placeholder-zinc-500 transition-all focus:outline-none",
                                getRadiusClass(radiusPreset)
                              )}
                              style={{
                                borderColor: `${accentColor}30`,
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {!isHidden("submitButton") && (
                      <div className="pt-2">
                        <SmartButton
                          button={{
                            ...content.submitButton,
                            fullWidth: true,
                          }}
                          elementKey="submitButton"
                          styles={styles}
                          theme={theme}
                        />
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                    <div
                      className="w-14 h-14 rounded-full mx-auto flex items-center justify-center border shadow-lg"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        borderColor: accentColor,
                        color: accentColor,
                      }}
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold tracking-tight">
                      Solicitação Enviada!
                    </h4>
                    <p className="text-xs opacity-75 max-w-xs mx-auto leading-relaxed">
                      Recebemos seus dados e nosso especialista entrará em contato em breve via WhatsApp ou e-mail.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold underline opacity-60 hover:opacity-100 transition-opacity pt-2 block mx-auto"
                    >
                      Enviar outra resposta
                    </button>
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
