"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const bentoGridContentSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  sectionCta: buttonConfigSchema,
  cards: z.array(
    z.object({
      tag: z.string(),
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
      accentColor: z.string().optional(),
      span: z.enum(["normal", "wide"]),
    })
  ),
});

export type BentoGridContent = z.infer<typeof bentoGridContentSchema>;

export const BentoGridSection = createSection<BentoGridContent>({
  id: "features.bento",
  name: "Bento Grid Elite",
  description:
    "Grade modular estilo Apple/Linear com ícones por card, cores individuais, superfície 3D/Glass e botão de ação opcional.",
  category: "Features",
  iconName: "Grid",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "eyebrow", label: "Badge / Chapéu da Seção" },
    { key: "headline", label: "Título da Seção" },
    { key: "subtitle", label: "Subtítulo da Seção" },
    { key: "cards", label: "Grade de Cards Bento" },
    { key: "sectionCta", label: "Botão CTA Inferior da Seção" },
  ],
  contentSchema: bentoGridContentSchema,
  fields: [
    {
      key: "eyebrow",
      label: "Chapéu / Badge da Seção",
      type: "text",
      optionalKey: "eyebrow",
      isBadge: true,
      typographyElementKey: "eyebrow",
    },
    {
      key: "headline",
      label: "Título da Seção",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Descrição da Seção",
      type: "textarea",
      optionalKey: "subtitle",
      typographyElementKey: "subtitle",
    },
    {
      key: "cards",
      label: "Cards do Bento Grid",
      type: "array",
      optionalKey: "cards",
      defaultNewItem: {
        tag: "NOVO RECURSO",
        title: "Título do Novo Card",
        description: "Descrição detalhada do diferencial.",
        iconName: "Sparkles",
        accentColor: "",
        span: "normal",
      },
      itemFields: [
        { key: "tag", label: "Etiqueta Superior", type: "text" },
        { key: "title", label: "Título do Card", type: "text" },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "iconName", label: "Ícone do Card", type: "icon" },
        {
          key: "accentColor",
          label: "Cor de Destaque deste Card (Opcional)",
          type: "color",
        },
        {
          key: "span",
          label: "Largura na Grade",
          type: "select",
          options: [
            { value: "normal", label: "1 Coluna (Normal)" },
            { value: "wide", label: "2 Colunas (Destaque)" },
          ],
        },
      ],
    },
    {
      key: "sectionCta",
      label: "Botão CTA Inferior (Opcional)",
      type: "button",
      optionalKey: "sectionCta",
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
      hiddenElements: {
        sectionCta: true, // Por padrão oculto, mas o designer pode ativar com 1 clique!
      },
    },
    content: {
      eyebrow: "ARQUITETURA DE ELITE",
      headline: "Flexibilidade extrema sem sacrificar a engenharia.",
      subtitle:
        "Cada bloco herda automaticamente o tema global, mas aceita customizações cirúrgicas de cor, borda, tipografia e relevo.",
      sectionCta: {
        enabled: true,
        text: "Solicitar Demonstração Completa",
        url: "#contato",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      cards: [
        {
          tag: "01 / DESIGN SYSTEM",
          title: "Superfícies 3D, Glass & Neon sob demanda",
          description:
            "Mude toda a estética dos cards de toda a seção com 1 clique: de minimalismo editorial a glassmorphism translúcido.",
          iconName: "Layers",
          span: "wide",
        },
        {
          tag: "02 / TIPOGRAFIA",
          title: "Fontes por Elemento",
          description:
            "Combine serifas clássicas nos títulos com fontes geométricas no corpo sem tocar em CSS.",
          iconName: "Zap",
          span: "normal",
        },
        {
          tag: "03 / CLIENT ADMIN",
          title: "Painel /admin Seguro",
          description:
            "Seu cliente edita textos e fotos sem nenhum risco de desalinhar paddings ou cores.",
          iconName: "Shield",
          span: "normal",
        },
        {
          tag: "04 / ZERO HOSTING COST",
          title: "Ejeção Direta para Vercel Free",
          description:
            "Sites ultra-rápidos entregues diretamente na conta do cliente, mantendo sua VPS 100% livre.",
          iconName: "Cpu",
          span: "wide",
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
        {/* Cabeçalho da Seção */}
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

        {/* Grade Bento */}
        {!hidden.cards && content.cards && content.cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.cards.map((card, idx) => {
              const isWide = card.span === "wide";
              const cardAccent = card.accentColor || accentColor;

              return (
                <div
                  key={idx}
                  className={cn(
                    "p-7 flex flex-col justify-between transition-all duration-300",
                    isWide ? "md:col-span-2" : "md:col-span-1",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    ...(styles.borderWidth && styles.borderWidth !== "0"
                      ? {
                          borderWidth: `${styles.borderWidth}px`,
                          borderColor: styles.borderColor || `${cardAccent}40`,
                        }
                      : {}),
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-[11px] font-mono font-bold uppercase tracking-widest"
                      style={{ color: cardAccent }}
                    >
                      {card.tag}
                    </span>

                    {card.iconName !== "none" && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                        style={{
                          backgroundColor: `${cardAccent}15`,
                          color: cardAccent,
                        }}
                      >
                        <DynamicIcon
                          name={card.iconName || "Sparkles"}
                          className="w-5 h-5"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <h3
                      className="text-xl font-bold tracking-tight"
                      style={{ fontFamily: "var(--site-font-heading)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm opacity-75 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Inferior Opcional */}
        {!hidden.sectionCta && content.sectionCta?.enabled && (
          <div className="flex justify-center pt-2">
            <SmartButton
              button={content.sectionCta}
              elementKey="sectionCta"
              styles={styles}
              theme={theme}
            />
          </div>
        )}
      </div>
    );
  },
});
