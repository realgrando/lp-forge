"use client";

import React, { useState, useRef } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const beforeAfterSliderSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  beforeImage: z.string(),
  afterImage: z.string(),
  beforeLabel: z.string(),
  afterLabel: z.string(),
  helperText: z.string(),
  ctaButton: buttonConfigSchema,
});

export type BeforeAfterSliderContent = z.infer<typeof beforeAfterSliderSchema>;

export const BeforeAfterSliderSection = createSection<BeforeAfterSliderContent>({
  id: "beforeafter.slider",
  name: "Antes & Depois (Slider Interativo)",
  description:
    "Slider interativo onde o usuário arrasta a barra entre a foto Antes e Depois, com rótulos, copy e botão CTA.",
  category: "Antes & Depois",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "beforeafter",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo Explicativo" },
    { key: "sliderBox", label: " Comparador Interativo (Slider)" },
    { key: "beforeLabel", label: "Selo 'Antes'" },
    { key: "afterLabel", label: "Selo 'Depois'" },
    { key: "helperText", label: "Dica de Interação Inferior" },
    { key: "ctaButton", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: beforeAfterSliderSchema,
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
      key: "beforeImage",
      label: "Imagem ANTES",
      type: "image",
      optionalKey: "sliderBox",
    },
    {
      key: "afterImage",
      label: "Imagem DEPOIS",
      type: "image",
      optionalKey: "sliderBox",
    },
    {
      key: "beforeLabel",
      label: "Rótulo Antes",
      type: "text",
      optionalKey: "beforeLabel",
      typographyElementKey: "beforeLabel",
    },
    {
      key: "afterLabel",
      label: "Rótulo Depois",
      type: "text",
      optionalKey: "afterLabel",
      typographyElementKey: "afterLabel",
    },
    {
      key: "helperText",
      label: "Texto Auxiliar Inferior",
      type: "text",
      optionalKey: "helperText",
      typographyElementKey: "helperText",
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
      badge: "QUALITY CRAFTSMANSHIP",
      headline: "Resultados que Falam por Si",
      subtitle:
        "Arraste o cursor para comparar o antes e o depois real de nossos projetos executados.",
      beforeImage:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
      afterImage:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
      beforeLabel: "ANTES DA INTERVENÇÃO",
      afterLabel: "RESULTADO FINAL",
      helperText: "Arraste a barra central para os lados para comparar",
      ctaButton: {
        enabled: true,
        text: "Quero Essa Transformação",
        url: "#contato",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, styles, theme }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showHeader =
      !isHidden("badge") || !isHidden("headline") || !isHidden("subtitle");

    const updatePositionFromClientX = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pos = ((clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.max(0, Math.min(100, pos)));
    };

    return (
      <div className="space-y-10">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
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
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]"
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

        {!isHidden("sliderBox") && (
          <div className="space-y-4">
            <div
              ref={containerRef}
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  updatePositionFromClientX(e.clientX);
                }
              }}
              onClick={(e) => updatePositionFromClientX(e.clientX)}
              onTouchMove={(e) => {
                if (e.touches[0]) {
                  updatePositionFromClientX(e.touches[0].clientX);
                }
              }}
              className={cn(
                "relative aspect-[16/9] w-full overflow-hidden select-none cursor-ew-resize",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{
                ...(styles.borderWidth && styles.borderWidth !== "0"
                  ? {
                      borderWidth: `${styles.borderWidth}px`,
                      borderColor: styles.borderColor || `${accentColor}40`,
                    }
                  : {}),
              }}
            >
              {/* Imagem Depois (Fundo Completo) */}
              <img
                src={content.afterImage}
                alt={content.afterLabel || "Depois"}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Imagem Antes (Recortada por clipPath) */}
              <img
                src={content.beforeImage}
                alt={content.beforeLabel || "Antes"}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
              />

              {/* Rótulos Antes / Depois */}
              {!isHidden("beforeLabel") && content.beforeLabel && (
                <div className="absolute top-5 left-5 z-20 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[10px] font-black uppercase tracking-widest">
                  <EditableText
                    as="span"
                    value={content.beforeLabel}
                    elementKey="beforeLabel"
                    styles={styles}
                  />
                </div>
              )}

              {!isHidden("afterLabel") && content.afterLabel && (
                <div
                  className="absolute top-5 right-5 z-20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl"
                  style={{
                    backgroundColor: accentColor,
                    color: "#09090B",
                  }}
                >
                  <EditableText
                    as="span"
                    value={content.afterLabel}
                    elementKey="afterLabel"
                    styles={styles}
                  />
                </div>
              )}

              {/* Range Input Invisível para Acessibilidade + Drag Fluido */}
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Comparador Antes e Depois"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />

              {/* Barra Divisória e Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full shadow-2xl flex items-center justify-center border-2 border-white"
                  style={{
                    backgroundColor: accentColor,
                    color: "#09090B",
                  }}
                >
                  <DynamicIcon name="Sparkles" className="w-4 h-4" />
                </div>
              </div>
            </div>

            {!isHidden("helperText") && content.helperText && (
              <div className="flex justify-center">
                <EditableText
                  as="span"
                  value={content.helperText}
                  elementKey="helperText"
                  styles={styles}
                  className="text-xs font-bold uppercase tracking-widest opacity-55"
                />
              </div>
            )}
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
