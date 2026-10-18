"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

const comparisonSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  negativeTitle: z.string(),
  negativePoints: z.array(z.object({ text: z.string() })),
  positiveTitle: z.string(),
  positiveBadge: z.string(),
  positivePoints: z.array(z.object({ text: z.string() })),
  ctaButton: buttonConfigSchema,
});

export type ComparisonContent = z.infer<typeof comparisonSchema>;

export const ComparisonSection = createSection<ComparisonContent>({
  id: "comparison.before_after",
  name: "Comparativo Antes vs. Depois",
  description: "Contraste direto entre o modelo tradicional defasado e a solução de elite.",
  category: "Comparativo & Narrativa",
  iconName: "Layers",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "eyebrow", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "negativeCard", label: "Coluna Esquerda (Modelo Antigo)" },
    { key: "positiveCard", label: "Coluna Direita (Solução Elite)" },
    { key: "ctaButton", label: "Botão CTA Inferior" },
  ],
  contentSchema: comparisonSchema,
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
      label: "Título do Comparativo",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "negativeTitle",
      label: "Título da Coluna Antiga (Dor)",
      type: "text",
      optionalKey: "negativeCard",
    },
    {
      key: "negativePoints",
      label: "Pontos Negativos (Modelo Tradicional)",
      type: "array",
      optionalKey: "negativeCard",
      defaultNewItem: { text: "Novo ponto negativo" },
      itemFields: [{ key: "text", label: "Descrição da Dor", type: "text" }],
    },
    {
      key: "positiveTitle",
      label: "Título da Coluna Nova (Solução)",
      type: "text",
      optionalKey: "positiveCard",
    },
    {
      key: "positiveBadge",
      label: "Selo da Coluna Nova",
      type: "text",
      optionalKey: "positiveBadge",
    },
    {
      key: "positivePoints",
      label: "Pontos Positivos (Sua Solução)",
      type: "array",
      optionalKey: "positiveCard",
      defaultNewItem: { text: "Nova vantagem exclusiva" },
      itemFields: [{ key: "text", label: "Descrição do Benefício", type: "text" }],
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
      eyebrow: "POR QUE MUDAR AGORA",
      headline: "A diferença entre páginas comuns e engenharia de conversão.",
      negativeTitle: "Sites & Builders Tradicionais",
      negativePoints: [
        { text: "Layouts engessados, retos e com cara de template genérico" },
        { text: "Código pesado que derruba a nota no Google PageSpeed" },
        { text: "Cliente quebra o layout ao tentar mudar um simples texto" },
        { text: "Mensalidades caras de hospedagem ou servidores sobrecarregados" },
      ],
      positiveTitle: "Ecossistema LP-Forge v2",
      positiveBadge: "PADRÃO NIVIX",
      positivePoints: [
        { text: "Liberdade estética total: 3D, Glass, Neon e fontes por elemento" },
        { text: "Performance instantânea com Next.js 16 estático/serverless" },
        { text: "Painel /admin blindado onde o cliente edita apenas o conteúdo" },
        { text: "Hospedagem Custo Zero direto na conta Vercel do cliente" },
      ],
      ctaButton: {
        enabled: true,
        text: "Quero Migrar para o Padrão Elite",
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
    const hidden = styles.hiddenElements || {};

    return (
      <div className="space-y-12">
        {(!hidden.eyebrow || !hidden.headline) && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="Flame"
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
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Tradicional / Negativa */}
          {!hidden.negativeCard && (
            <div
              className={cn(
                "p-8 space-y-6 border border-red-500/15 bg-red-950/[0.04]",
                getRadiusClass(radiusPreset)
              )}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3
                  className="text-xl font-bold opacity-75"
                  style={{ fontFamily: "var(--site-font-heading)" }}
                >
                  {content.negativeTitle}
                </h3>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-red-500/10 text-red-400">
                  Defasado
                </span>
              </div>

              <div className="space-y-3.5">
                {content.negativePoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm opacity-70">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{pt.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coluna Elite / Positiva */}
          {!hidden.positiveCard && (
            <div
              className={cn(
                "p-8 space-y-6 relative overflow-hidden",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{
                borderColor: accentColor,
                backgroundColor: styles.customSurface || undefined,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3
                  className="text-xl font-black"
                  style={{ fontFamily: "var(--site-font-heading)" }}
                >
                  {content.positiveTitle}
                </h3>
                {!hidden.positiveBadge && content.positiveBadge && (
                  <span
                    className="text-[10px] font-black uppercase px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: accentColor,
                      color: "#09090B",
                    }}
                  >
                    {content.positiveBadge}
                  </span>
                )}
              </div>

              <div className="space-y-3.5">
                {content.positivePoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                    />
                    <span>{pt.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

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
