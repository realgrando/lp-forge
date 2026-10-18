"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const faqModernGridSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  items: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
      iconName: z.string().optional(),
    })
  ),
});

export type FaqModernGridContent = z.infer<typeof faqModernGridSchema>;

export const FaqModernGridSection = createSection<FaqModernGridContent>({
  id: "faq.modern_grid",
  name: "FAQ Modern Cards Grid",
  description:
    "Grade moderna de cartões expansíveis e numerados para resolução rápida de objeções.",
  category: "FAQ",
  iconName: "Grid",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "items", label: "Grade de Perguntas" },
  ],
  contentSchema: faqModernGridSchema,
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
      key: "items",
      label: "Cards de Perguntas",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        question: "Nova pergunta frequente?",
        answer: "Resposta detalhada e transparente para o cliente.",
        iconName: "HelpCircle",
      },
      itemFields: [
        { key: "question", label: "Pergunta", type: "text" },
        { key: "answer", label: "Resposta", type: "textarea" },
        { key: "iconName", label: "Ícone do Card", type: "icon" },
      ],
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
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "SUPPORT CENTER",
      headline: "Perguntas Frequentes.",
      subtitle:
        "Tudo o que você precisa saber para iniciar seu projeto com total segurança.",
      items: [
        {
          question: "Qual o prazo de entrega do projeto?",
          answer:
            "Nossa entrega rápida acontece em média de 5 a 7 dias úteis com acompanhamento diário.",
          iconName: "Clock",
        },
        {
          question: "O site já vem otimizado para dispositivos móveis?",
          answer:
            "Sim, 100% responsivo e testado nos tamanhos Desktop, Tablet e Mobile diretamente no motor.",
          iconName: "Smartphone",
        },
        {
          question: "Como funciona o suporte pós-entrega?",
          answer:
            "Contamos com suporte dedicado via WhatsApp e acesso vitalício ao painel visual /admin.",
          iconName: "ShieldCheck",
        },
        {
          question: "Posso integrar com meu CRM ou WhatsApp?",
          answer:
            "Sim, todos os botões e formulários suportam redirecionamento ou webhooks customizados.",
          iconName: "Zap",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    return (
      <div className="space-y-14">
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
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
              className="text-4xl md:text-6xl font-black tracking-tighter leading-tight"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 text-base sm:text-lg max-w-2xl mx-auto"
            />
          </div>
        )}

        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.items.map((item, index) => {
              const isOpen = openIdx === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "transition-all duration-300 overflow-hidden flex flex-col",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset),
                    isOpen && "shadow-2xl"
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    borderColor: isOpen ? `${accentColor}45` : undefined,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full p-7 sm:p-8 text-left flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-lg font-black transition-colors"
                        style={{
                          color: isOpen ? accentColor : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="text-base sm:text-lg font-bold tracking-tight">
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      style={{
                        backgroundColor: isOpen
                          ? accentColor
                          : "rgba(255,255,255,0.06)",
                        color: isOpen ? "#09090B" : undefined,
                      }}
                    >
                      <DynamicIcon name="ChevronDown" className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-7 sm:px-8 pb-8 pt-2 border-t border-white/5 opacity-75 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
