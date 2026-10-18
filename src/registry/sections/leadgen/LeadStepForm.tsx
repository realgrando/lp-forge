"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const leadStepFormSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  submitButtonText: z.string(),
  successTitle: z.string(),
  successMessage: z.string(),
  steps: z.array(
    z.object({
      title: z.string(),
      questionLabel: z.string(),
      inputType: z.enum(["text", "select"]).default("select"),
      placeholder: z.string(),
      optionsList: z.string(),
    })
  ),
});

export type LeadStepFormContent = z.infer<typeof leadStepFormSchema>;

export const LeadStepFormSection = createSection<LeadStepFormContent>({
  id: "leadgen.step_form",
  name: "Quiz / Orçamento por Etapas",
  description:
    "Formulário multi-step interativo com barra de progresso e etapas configuráveis para qualificação de leads.",
  category: "Captação & Leads",
  iconName: "ListChecks",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "progressBar", label: "Barra de Progresso" },
    { key: "steps", label: "Card do Quiz / Formulário" },
  ],
  contentSchema: leadStepFormSchema,
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
      key: "submitButtonText",
      label: "Texto do Botão Final",
      type: "text",
      optionalKey: "steps",
    },
    {
      key: "successTitle",
      label: "Título de Sucesso (Pós-Envio)",
      type: "text",
      optionalKey: "steps",
    },
    {
      key: "successMessage",
      label: "Mensagem de Sucesso",
      type: "textarea",
      optionalKey: "steps",
    },
    {
      key: "steps",
      label: "Etapas do Quiz / Orçamento",
      type: "array",
      optionalKey: "steps",
      defaultNewItem: {
        title: "Nova Etapa",
        questionLabel: "Qual sua principal necessidade?",
        inputType: "select",
        placeholder: "Digite sua resposta...",
        optionsList: "Consultoria Completa, Projeto Sob Medida, Suporte Dedicado",
      },
      itemFields: [
        { key: "title", label: "Título da Etapa", type: "text" },
        { key: "questionLabel", label: "Pergunta da Etapa", type: "text" },
        {
          key: "inputType",
          label: "Tipo de Campo",
          type: "select",
          options: [
            { value: "select", label: "Múltipla Escolha (Select)" },
            { value: "text", label: "Campo de Texto Aberto" },
          ],
        },
        { key: "placeholder", label: "Placeholder (se Texto)", type: "text" },
        {
          key: "optionsList",
          label: "Opções separadas por vírgula (se Seleção)",
          type: "textarea",
        },
      ],
    },
  ],
  defaultData: {
    layout: {
      paddingY: "normal",
      containerWidth: "narrow",
    },
    styles: {
      surfaceVariant: "glass",
      borderRadius: "lg",
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "ORÇAMENTO RÁPIDO",
      headline: "Receba uma proposta personalizada.",
      subtitle:
        "Responda 3 perguntas rápidas e nossa equipe enviará o escopo ideal em até 24h.",
      submitButtonText: "Solicitar Orçamento",
      successTitle: "Pedido Enviado!",
      successMessage:
        "Obrigado pelo interesse. Em breve você receberá o contato de nossa equipe de especialistas.",
      steps: [
        {
          title: "1. Tipo de Projeto",
          questionLabel: "O que você busca desenvolver?",
          inputType: "select",
          placeholder: "",
          optionsList:
            "Landing Page High-Ticket, Ecossistema Completo, Bio 3D Executiva, Outro",
        },
        {
          title: "2. Prazo & Escopo",
          questionLabel: "Qual a urgência para o lançamento?",
          inputType: "select",
          placeholder: "",
          optionsList:
            "O mais rápido possível (Urgente), Próximas 2 semanas, Estou planejando para o próximo mês",
        },
        {
          title: "3. Seu Contato Direto",
          questionLabel: "Informe seu WhatsApp ou melhor E-mail:",
          inputType: "text",
          placeholder: "Ex: (11) 99999-9999 ou seu@email.com",
          optionsList: "",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const steps = content.steps || [];
    const totalSteps = Math.max(steps.length, 1);
    const safeStepIndex = Math.min(currentStep, totalSteps - 1);
    const activeStep = steps[safeStepIndex];
    const progress = ((safeStepIndex + 1) / totalSteps) * 100;

    const handleNext = () => {
      if (safeStepIndex < totalSteps - 1) {
        setCurrentStep(safeStepIndex + 1);
      } else {
        setIsSubmitted(true);
      }
    };

    const handleBack = () => {
      if (safeStepIndex > 0) {
        setCurrentStep(safeStepIndex - 1);
      }
    };

    return (
      <div className="space-y-12">
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="text-center max-w-2xl mx-auto space-y-4">
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
              className="text-3xl sm:text-5xl font-black tracking-tighter"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 text-base sm:text-lg"
            />
          </div>
        )}

        {!isHidden("steps") && steps.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-8">
            {!isHidden("progressBar") && !isSubmitted && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                  <span className="opacity-50">
                    Passo {safeStepIndex + 1} de {totalSteps}
                  </span>
                  <span style={{ color: accentColor }}>
                    {Math.round(progress)}% Completo
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: accentColor,
                    }}
                  />
                </div>
              </div>
            )}

            <div
              className={cn(
                "p-8 md:p-12 transition-all",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{ backgroundColor: styles.customSurface || undefined }}
            >
              {isSubmitted ? (
                <div className="py-10 text-center space-y-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto border"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      borderColor: `${accentColor}40`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon name="CheckCircle2" className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight">
                    {content.successTitle || "Pedido Enviado!"}
                  </h3>
                  <p className="opacity-70 max-w-md mx-auto text-sm sm:text-base">
                    {content.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(0);
                    }}
                    className="text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity pt-4"
                  >
                    Enviar outro pedido
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {activeStep?.title}
                    </h3>
                    <div
                      className="h-1 w-12 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>

                  {activeStep && (
                    <div className="space-y-3">
                      <label className="block text-xs font-black uppercase tracking-widest opacity-60">
                        {activeStep.questionLabel}
                      </label>

                      {activeStep.inputType === "select" ? (
                        <select
                          value={answers[safeStepIndex] || ""}
                          onChange={(e) =>
                            setAnswers({
                              ...answers,
                              [safeStepIndex]: e.target.value,
                            })
                          }
                          className={cn(
                            "w-full bg-black/40 border border-white/10 p-4 text-sm font-medium outline-none transition-colors cursor-pointer",
                            getRadiusClass(radiusPreset)
                          )}
                        >
                          {(activeStep.optionsList || "")
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .map((opt, oIdx) => (
                              <option
                                key={oIdx}
                                value={opt}
                                className="bg-zinc-900 text-white"
                              >
                                {opt}
                              </option>
                            ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={answers[safeStepIndex] || ""}
                          onChange={(e) =>
                            setAnswers({
                              ...answers,
                              [safeStepIndex]: e.target.value,
                            })
                          }
                          placeholder={
                            activeStep.placeholder || "Digite sua resposta..."
                          }
                          className={cn(
                            "w-full bg-black/40 border border-white/10 p-4 text-sm font-medium outline-none transition-colors",
                            getRadiusClass(radiusPreset)
                          )}
                        />
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                    {safeStepIndex > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className={cn(
                          "flex-1 py-4 px-6 border border-white/15 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-all",
                          getRadiusClass(radiusPreset)
                        )}
                      >
                        <DynamicIcon name="ArrowLeft" className="w-4 h-4" />
                        <span>Voltar</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className={cn(
                        "flex-[2] py-4 px-6 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                        getRadiusClass(radiusPreset)
                      )}
                      style={{
                        backgroundColor: accentColor,
                        color: "#09090B",
                      }}
                    >
                      {safeStepIndex === totalSteps - 1 ? (
                        <>
                          <DynamicIcon name="Send" className="w-4 h-4" />
                          <span>
                            {content.submitButtonText || "Solicitar Orçamento"}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>Próximo</span>
                          <DynamicIcon name="ArrowRight" className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
});
