"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const faqSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  supportCta: buttonConfigSchema,
});

export type FaqContent = z.infer<typeof faqSchema>;

export const FaqAccordionSection = createSection<FaqContent>({
  id: "faq.accordion",
  name: "FAQ Accordion Interativo",
  description: "Perguntas frequentes expansíveis com animações suaves e botão de suporte direto.",
  category: "FAQ & Dúvidas",
  iconName: "MessageCircle",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "eyebrow", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "faqs", label: "Lista de Perguntas (Accordion)" },
    { key: "supportCta", label: "Botão de Dúvidas / WhatsApp" },
  ],
  contentSchema: faqSchema,
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
      label: "Título do FAQ",
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
      key: "faqs",
      label: "Perguntas & Respostas",
      type: "array",
      optionalKey: "faqs",
      defaultNewItem: {
        question: "Nova pergunta frequente?",
        answer: "Resposta clara, direta e persuasiva para eliminar objeções.",
      },
      itemFields: [
        { key: "question", label: "Pergunta", type: "text" },
        { key: "answer", label: "Resposta", type: "textarea" },
      ],
    },
    {
      key: "supportCta",
      label: "Botão de Suporte / WhatsApp",
      type: "button",
      optionalKey: "supportCta",
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
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      eyebrow: "TIRE SUAS DÚVIDAS",
      headline: "Perguntas Frequentes",
      subtitle: "Tudo o que você precisa saber sobre nosso modelo de entrega e tecnologia.",
      faqs: [
        {
          question: "Como funciona a edição pelo painel /admin depois da entrega?",
          answer:
            "Sua página já vem acompanhada de uma rota exclusiva /admin protegida por senha. Nela, você altera qualquer texto, título, botão ou link sem risco de desconfigurar o design criado pela nossa equipe.",
        },
        {
          question: "Eu terei custos mensais de servidor ou banco de dados?",
          answer:
            "Zero! Nossa arquitetura ejeta um pacote otimizado que roda gratuitamente na infraestrutura global da Vercel (Free Tier), suportando milhares de acessos simultâneos sem custo mensal de servidor.",
        },
        {
          question: "É possível integrar com meu CRM, Pixel e WhatsApp?",
          answer:
            "Sim, 100%. Todos os botões e formulários suportam redirecionamento dinâmico, disparo de eventos e integração nativa via webhooks.",
        },
      ],
      supportCta: {
        enabled: true,
        text: "Ainda tem dúvidas? Fale no WhatsApp",
        url: "https://wa.me/",
        variant: "outline",
        size: "md",
        iconName: "MessageCircle",
        iconPosition: "left",
      },
    },
  },
  Component: ({ content, styles, theme }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div className="space-y-10" id="faq">
        {(!hidden.eyebrow || !hidden.headline || !hidden.subtitle) && (
          <div className="text-center space-y-3">
            <EditableText
              isBadge
              defaultIconName="MessageCircle"
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
              className="text-3xl sm:text-4xl font-black tracking-tight"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-sm sm:text-base opacity-70 max-w-xl mx-auto"
            />
          </div>
        )}

        {!hidden.faqs && content.faqs && content.faqs.length > 0 && (
          <div className="space-y-3">
            {content.faqs.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={cn(
                    "overflow-hidden transition-all",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{ backgroundColor: styles.customSurface || undefined }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span
                      className="font-bold text-sm sm:text-base"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      style={{ color: accentColor }}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm opacity-75 leading-relaxed border-t border-white/5">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!hidden.supportCta && content.supportCta?.enabled && (
          <div className="flex justify-center pt-2">
            <SmartButton
              button={content.supportCta}
              elementKey="supportCta"
              styles={styles}
              theme={theme}
            />
          </div>
        )}
      </div>
    );
  },
});
