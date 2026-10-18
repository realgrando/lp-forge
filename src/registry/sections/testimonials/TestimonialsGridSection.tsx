"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Star, BadgeCheck } from "lucide-react";

const testimonialsSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  items: z.array(
    z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
      metricTag: z.string(),
      accentColor: z.string().optional(),
    })
  ),
});

export type TestimonialsContent = z.infer<typeof testimonialsSchema>;

export const TestimonialsGridSection = createSection<TestimonialsContent>({
  id: "testimonials.grid",
  name: "Depoimentos & Cases Verificados",
  description: "Mural de prova social com estrelas, selo de cliente verificado e tag de resultado alcançado.",
  category: "Prova Social & Trust",
  iconName: "Users",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "eyebrow", label: "Badge Superior" },
    { key: "headline", label: "Título da Seção" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "items", label: "Cards de Depoimentos" },
  ],
  contentSchema: testimonialsSchema,
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
      label: "Depoimentos de Clientes",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        quote: "A entrega superou todas as nossas expectativas de conversão e velocidade.",
        author: "Nome do Executivo",
        role: "CEO @ Empresa",
        metricTag: "+180% Leads",
        accentColor: "",
      },
      itemFields: [
        { key: "quote", label: "Depoimento", type: "textarea" },
        { key: "author", label: "Nome do Cliente", type: "text" },
        { key: "role", label: "Cargo / Empresa", type: "text" },
        { key: "metricTag", label: "Selo de Resultado (Ex: +3x ROI)", type: "text" },
        { key: "accentColor", label: "Cor Exclusiva (Opcional)", type: "color" },
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
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      eyebrow: "PROVA SOCIAL REAL",
      headline: "O que dizem os fundadores que escalaram conosco.",
      subtitle:
        "Depoimentos verificados de operações que transformaram sua presença digital em máquina de vendas.",
      items: [
        {
          quote:
            "Em 48 horas tínhamos uma Landing Page com estética de multinacional americana e velocidade absurda. Nossa conversão dobrou na primeira semana.",
          author: "Lucas Vasconcelos",
          role: "Founder @ Vectra AI",
          metricTag: "+215% Conversão",
        },
        {
          quote:
            "O fato de termos um painel /admin próprio onde minha equipe altera ofertas sem depender de programador mudou nosso jogo operacional.",
          author: "Mariana Albuquerque",
          role: "CMO @ Atelier Holding",
          metricTag: "Autonomia Total",
        },
        {
          quote:
            "Unificamos todas as nossas páginas de lançamento e o Linktree comercial na mesma identidade 3D. A percepção de valor da marca subiu imediatamente.",
          author: "Rafael Monteiro",
          role: "Managing Partner @ Apex",
          metricTag: "+3.4x ROI",
        },
      ],
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
              defaultIconName="Star"
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

        {!hidden.items && content.items && content.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.items.map((item, idx) => {
              const cardAccent = item.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "p-7 flex flex-col justify-between space-y-6 transition-all",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{ backgroundColor: styles.customSurface || undefined }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-current"
                            style={{ color: cardAccent }}
                          />
                        ))}
                      </div>
                      {item.metricTag && (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${cardAccent}20`,
                            color: cardAccent,
                          }}
                        >
                          {item.metricTag}
                        </span>
                      )}
                    </div>

                    <p className="text-sm opacity-85 leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm">{item.author}</span>
                        <BadgeCheck
                          className="w-4 h-4"
                          style={{ color: cardAccent }}
                        />
                      </div>
                      <span className="block text-xs opacity-60">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
