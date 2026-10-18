"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Play, Quote, Star, X } from "lucide-react";

const testimonialsVideoSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  interviewLabel: z.string(),
  ctaButton: buttonConfigSchema,
  items: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      text: z.string(),
      image: z.string().optional(),
      videoThumb: z.string(),
      videoUrl: z.string().optional(),
    })
  ),
});

export type TestimonialsVideoContent = z.infer<typeof testimonialsVideoSchema>;

export const TestimonialsVideoSection = createSection<TestimonialsVideoContent>({
  id: "testimonials.video",
  name: "Depoimentos em Vídeo",
  description:
    "Depoimentos cinematográficos alternados em 2 colunas com frame 16:9 de vídeo, citação de impacto e player modal.",
  category: "Depoimentos",
  iconName: "Film",
  modes: ["LANDING_PAGE"],
  legacyType: "testimonials",
  legacyVariant: "v4",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "stars", label: "Estrelas Acima da Citação" },
    { key: "interviewLabel", label: "Selo 'Exclusive Interview' no Vídeo" },
    { key: "items", label: "Lista de Vídeos de Depoimentos" },
    { key: "ctaButton", label: "Botão de Ação Inferior" },
  ],
  contentSchema: testimonialsVideoSchema,
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
      key: "interviewLabel",
      label: "Selo no Canto do Vídeo",
      type: "text",
      optionalKey: "interviewLabel",
    },
    {
      key: "items",
      label: "Depoimentos em Vídeo",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        name: "Michael Ross",
        role: "Managing Partner",
        text: "Esta parceria redefiniu completamente nossa escala comercial e posicionamento de marca.",
        image: "",
        videoThumb:
          "https://images.unsplash.com/photo-1492691523567-6170f0295db6?auto=format&fit=crop&q=80&w=1200",
        videoUrl: "",
      },
      itemFields: [
        { key: "name", label: "Nome do Cliente", type: "text" },
        { key: "role", label: "Cargo / Empresa", type: "text" },
        { key: "text", label: "Frase de Impacto", type: "textarea" },
        { key: "image", label: "Foto de Perfil (Opcional)", type: "image" },
        { key: "videoThumb", label: "Capa do Vídeo (16:9)", type: "image" },
        { key: "videoUrl", label: "URL do Vídeo MP4 (Opcional)", type: "url" },
      ],
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
      badge: "VIDEO SUCCESS STORIES",
      headline: "Histórias reais em vídeo",
      subtitle:
        "Assista aos relatos completos de líderes que transformaram suas operações conosco.",
      interviewLabel: "Exclusive Interview",
      ctaButton: {
        enabled: false,
        text: "Quero Ser o Próximo Case",
        url: "#contato",
        variant: "solid",
        size: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      items: [
        {
          name: "Alexandre Vasconcelos",
          role: "CEO @ Horizon Tech",
          text: "Redefinimos toda a nossa captação enterprise em menos de 30 dias após o lançamento.",
          image: "",
          videoThumb:
            "https://images.unsplash.com/photo-1492691523567-6170f0295db6?auto=format&fit=crop&q=80&w=1200",
          videoUrl:
            "https://assets.mixkit.co/videos/preview/mixkit-construction-worker-at-a-site-using-a-drill-40228-large.mp4",
        },
        {
          name: "Beatriz Nogueira",
          role: "Diretora Executiva @ Aura",
          text: "O nível de acabamento visual e velocidade trouxe uma percepção de valor incomparável.",
          image: "",
          videoThumb:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const [playingUrl, setPlayingUrl] = useState<string | null>(null);

    return (
      <div className="space-y-16">
        {/* HEADER */}
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <EditableText
              isBadge
              defaultIconName="Play"
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
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-75 italic"
            />
          </div>
        )}

        {/* ALTERNATING VIDEO TESTIMONIALS */}
        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className="space-y-20">
            {content.items.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col lg:flex-row items-center gap-10 lg:gap-16",
                  i % 2 === 1 && "lg:flex-row-reverse"
                )}
              >
                {/* VIDEO SIDE */}
                <div
                  onClick={() => item.videoUrl && setPlayingUrl(item.videoUrl)}
                  className="w-full lg:w-7/12 group cursor-pointer"
                >
                  <div
                    className={cn(
                      "relative aspect-video overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass(radiusPreset)
                    )}
                  >
                    <img
                      src={
                        item.videoThumb ||
                        "https://images.unsplash.com/photo-1492691523567-6170f0295db6?q=80&w=1200"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-20 h-20 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300"
                        style={{
                          boxShadow: `0 0 35px -5px ${accentColor}90`,
                        }}
                      >
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </div>

                    {!isHidden("interviewLabel") && content.interviewLabel && (
                      <div className="absolute bottom-5 left-5 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                          {content.interviewLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* TEXT SIDE */}
                <div className="w-full lg:w-5/12 flex flex-col items-start space-y-6">
                  {!isHidden("stars") && (
                    <div
                      className="flex gap-1"
                      style={{ color: accentColor }}
                    >
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  )}

                  <blockquote className="relative">
                    <Quote
                      className="w-14 h-14 absolute -top-6 -left-4 opacity-10 pointer-events-none"
                      style={{ color: accentColor }}
                    />
                    <p className="text-2xl sm:text-3xl font-black leading-tight tracking-tight italic relative z-10">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </blockquote>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/15 bg-zinc-800 shrink-0">
                      <img
                        src={
                          item.image ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                            item.name
                          )}`
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-black uppercase tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div
                    className="w-14 h-1 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA BUTTON */}
        {!isHidden("ctaButton") && content.ctaButton?.enabled && (
          <div className="flex justify-center pt-4">
            <SmartButton
              button={content.ctaButton}
              elementKey="ctaButton"
              styles={styles}
              theme={theme}
            />
          </div>
        )}

        {/* VIDEO MODAL */}
        {playingUrl && (
          <div
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setPlayingUrl(null)}
          >
            <div
              className={cn(
                "relative w-full max-w-4xl aspect-video overflow-hidden border border-white/15 bg-black shadow-2xl",
                getRadiusClass(radiusPreset)
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={playingUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setPlayingUrl(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
});
