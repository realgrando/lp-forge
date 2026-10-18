"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const faqSplitSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  supportTitle: z.string(),
  supportDescription: z.string(),
  supportCta: buttonConfigSchema,
  items: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export type FaqSplitContent = z.infer<typeof faqSplitSchema>;

export const FaqSplitSection = createSection<FaqSplitContent>({
  id: "faq.split",
  name: "FAQ Split com Card de Suporte",
  description:
    "Layout dividido com coluna fixa de suporte/consultoria à esquerda e acordeão numerado à direita.",
  category: "FAQ",
  iconName: "HelpCircle",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "supportCard", label: "Card Lateral de Suporte" },
    { key: "supportCta", label: "Botão do Card de Suporte" },
    { key: "items", label: "Lista de Perguntas (Acordeão)" },
  ],
  contentSchema: faqSplitSchema,
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
      key: "supportTitle",
      label: "Card Suporte: Título",
      type: "text",
      optionalKey: "supportCard",
      typographyElementKey: "supportTitle",
    },
    {
      key: "supportDescription",
      label: "Card Suporte: Texto",
      type: "textarea",
      optionalKey: "supportCard",
      typographyElementKey: "supportDescription",
    },
    {
      key: "supportCta",
      label: "Card Suporte: Botão",
      type: "button",
      optionalKey: "supportCta",
    },
    {
      key: "items",
      label: "Perguntas Frequentes",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        question: "Qual o prazo médio de entrega?",
        answer:
          "Trabalhamos com sprints ágeis para entregar sua estrutura completa em até 7 dias úteis.",
      },
      itemFields: [
        { key: "question", label: "Pergunta", type: "text" },
        { key: "answer", label: "Resposta", type: "textarea" },
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
      badge: "FAQ CENTER",
      headline: "Dúvidas Frequentes.",
      subtitle:
        "Tudo o que você precisa saber sobre nossos processos e entregas de alto padrão.",
      supportTitle: "Ainda tem dúvidas?",
      supportDescription:
        "Nossa equipe de especialistas está pronta para atender você pessoalmente no WhatsApp.",
      supportCta: {
        enabled: true,
        text: "Falar com Consultor",
        url: "#contato",
        variant: "solid",
        size: "md",
        iconName: "MessageSquare",
        iconPosition: "left",
      },
      items: [
        {
          question: "Como funciona a edição pelo painel /admin?",
          answer:
            "Você recebe uma rota exclusiva onde pode alterar textos, preços, imagens e botões visualmente sem tocar em código.",
        },
        {
          question: "Preciso pagar mensalidade de hospedagem?",
          answer:
            "Não. O projeto é exportado com arquitetura estática/serverless otimizada para rodar gratuitamente na Vercel.",
        },
        {
          question: "Posso ocultar elementos que não quiser usar?",
          answer:
            "Sim! Todos os sub-elementos como badges, subtítulos, cards e botões possuem chave seletora individual.",
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
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Coluna Esquerda: Cabeçalho + Card de Suporte */}
        <div className="lg:w-5/12 lg:sticky lg:top-24 space-y-8 w-full">
          <div className="space-y-4">
            <EditableText
              isBadge
              defaultIconName="HelpCircle"
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
              className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 text-base sm:text-lg leading-relaxed"
            />
          </div>

          {!isHidden("supportCard") && (
            <div
              className={cn(
                "p-8 space-y-5",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{ backgroundColor: styles.customSurface || undefined }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                }}
              >
                <DynamicIcon name="Sparkles" className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <EditableText
                  as="h4"
                  defaultIsHeading
                  value={content.supportTitle}
                  elementKey="supportTitle"
                  styles={styles}
                  className="font-black uppercase tracking-widest text-sm"
                />
                <EditableText
                  as="p"
                  value={content.supportDescription}
                  elementKey="supportDescription"
                  styles={styles}
                  className="text-sm opacity-70 leading-relaxed"
                />
              </div>

              {!isHidden("supportCta") && (
                <div className="pt-2">
                  <SmartButton
                    button={content.supportCta}
                    elementKey="supportCta"
                    styles={styles}
                    theme={theme}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Coluna Direita: Acordeão de Perguntas */}
        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className="lg:w-7/12 w-full space-y-4">
            {content.items.map((item, index) => {
              const isOpen = openIdx === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "transition-all duration-300 overflow-hidden",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    borderColor: isOpen ? `${accentColor}50` : undefined,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="text-sm font-black transition-colors"
                        style={{
                          color: isOpen ? accentColor : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span
                        className={cn(
                          "text-base sm:text-xl font-bold tracking-tight transition-opacity",
                          isOpen ? "opacity-100" : "opacity-80 hover:opacity-100"
                        )}
                      >
                        {item.question}
                      </span>
                    </div>

                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all"
                      style={{
                        backgroundColor: isOpen
                          ? accentColor
                          : "rgba(255,255,255,0.06)",
                        color: isOpen ? "#09090B" : undefined,
                      }}
                    >
                      <DynamicIcon
                        name={isOpen ? "Minus" : "Plus"}
                        className="w-4 h-4"
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/5 opacity-75 text-sm sm:text-base leading-relaxed">
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
