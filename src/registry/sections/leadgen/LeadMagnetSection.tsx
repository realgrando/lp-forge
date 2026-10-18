"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const leadMagnetSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  image: z.string(),
  formPlaceholder: z.string(),
  buttonLabel: z.string(),
  benefits: z.array(
    z.object({
      text: z.string(),
    })
  ),
});

export type LeadMagnetContent = z.infer<typeof leadMagnetSchema>;

export const LeadMagnetSection = createSection<LeadMagnetContent>({
  id: "leadgen.magnet",
  name: "Lead Magnet (E-book / Guia)",
  description:
    "Seção de captura de e-mail para download de materiais ricos, e-books ou checklists com preview visual.",
  category: "Captação & Leads",
  iconName: "BookOpen",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "image", label: "Imagem / Capa do Material" },
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "benefits", label: "Checklist de Benefícios" },
    { key: "form", label: "Formulário de Captura" },
  ],
  contentSchema: leadMagnetSchema,
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
      key: "image",
      label: "URL da Capa / Mockup",
      type: "image",
      optionalKey: "image",
    },
    {
      key: "benefits",
      label: "O que o usuário recebe",
      type: "array",
      optionalKey: "benefits",
      defaultNewItem: {
        text: "Novo benefício estratégico do guia",
      },
      itemFields: [{ key: "text", label: "Texto do Benefício", type: "text" }],
    },
    {
      key: "formPlaceholder",
      label: "Placeholder do Campo de E-mail",
      type: "text",
      optionalKey: "form",
    },
    {
      key: "buttonLabel",
      label: "Texto do Botão de Download",
      type: "text",
      optionalKey: "form",
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
      badge: "RECURSO GRATUITO",
      headline: "O Guia Definitivo para Conversão High-Ticket.",
      subtitle:
        "Aprenda como estruturar sua presença digital sem dores de cabeça e com máxima autoridade.",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
      benefits: [
        { text: "Checklist de elementos essenciais de conversão" },
        { text: "Arquitetura visual que transmite alto valor" },
        { text: "Cronograma prático de implementação" },
        { text: "Evite os 5 erros mais caros em páginas de venda" },
      ],
      formPlaceholder: "Seu melhor e-mail corporativo",
      buttonLabel: "Baixar Guia Agora",
    },
  },
  Component: ({ content, styles, theme }) => {
    const [submitted, setSubmitted] = useState(false);
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Coluna da Imagem */}
        {!isHidden("image") && content.image && (
          <div className="flex-1 w-full relative group">
            <div
              className="absolute inset-0 blur-3xl rounded-full opacity-20 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            />
            <div className="relative max-w-md mx-auto">
              <img
                src={content.image}
                alt={content.headline || "Lead Magnet"}
                className={cn(
                  "w-full object-cover shadow-2xl border border-white/10 transition-transform duration-500 group-hover:scale-[1.02]",
                  getRadiusClass(radiusPreset)
                )}
              />
              <div
                className={cn(
                  "absolute -bottom-5 -right-5 w-20 h-20 flex items-center justify-center shadow-2xl",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass("md")
                )}
                style={{ color: accentColor }}
              >
                <DynamicIcon name="Download" className="w-8 h-8" />
              </div>
            </div>
          </div>
        )}

        {/* Coluna do Conteúdo */}
        <div className="flex-1 max-w-2xl space-y-6">
          <EditableText
            isBadge
            defaultIconName="BookOpen"
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
            className="opacity-75 text-base sm:text-lg leading-relaxed"
          />

          {!isHidden("benefits") &&
            content.benefits &&
            content.benefits.length > 0 && (
              <ul className="space-y-3.5 pt-2">
                {content.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border"
                      style={{
                        borderColor: `${accentColor}50`,
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      <DynamicIcon name="CheckCircle2" className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base opacity-90">
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

          {!isHidden("form") && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <input
                type="email"
                required
                disabled={submitted}
                placeholder={content.formPlaceholder || "Seu melhor e-mail"}
                className={cn(
                  "flex-1 bg-black/40 border border-white/10 px-5 py-4 text-sm font-medium outline-none transition-colors disabled:opacity-50",
                  getRadiusClass(radiusPreset)
                )}
              />
              <button
                type="submit"
                disabled={submitted}
                className={cn(
                  "px-8 py-4 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all whitespace-nowrap",
                  getRadiusClass(radiusPreset)
                )}
                style={{
                  backgroundColor: accentColor,
                  color: "#09090B",
                }}
              >
                <DynamicIcon
                  name={submitted ? "CheckCircle2" : "Download"}
                  className="w-4 h-4"
                />
                <span>
                  {submitted
                    ? "Material Enviado!"
                    : content.buttonLabel || "Baixar Guia Agora"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    );
  },
});
