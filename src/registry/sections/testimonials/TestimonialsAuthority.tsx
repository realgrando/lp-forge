"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Star, Quote, Users } from "lucide-react";

const testimonialsAuthoritySchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  proofCount: z.string(),
  proofLabel: z.string(),
  proofText: z.string(),
  ctaButton: buttonConfigSchema,
  items: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      text: z.string(),
      image: z.string().optional(),
      rating: z.enum(["5", "4", "3", "none"]).default("5"),
    })
  ),
});

export type TestimonialsAuthorityContent = z.infer<
  typeof testimonialsAuthoritySchema
>;

export const TestimonialsAuthoritySection =
  createSection<TestimonialsAuthorityContent>({
    id: "testimonials.authority",
    name: "Depoimentos Authority Wall",
    description:
      "Layout dividido de alta autoridade: coluna esquerda fixa com card de prova social (+500 clientes) e mural de depoimentos à direita.",
    category: "Depoimentos",
    iconName: "Trophy",
    modes: ["LANDING_PAGE"],
    legacyType: "testimonials",
    legacyVariant: "v5",
    toggleableElements: [
      { key: "badge", label: "Badge Superior" },
      { key: "headline", label: "Título Principal" },
      { key: "subtitle", label: "Subtítulo" },
      { key: "proofCard", label: "Card de Prova Social (+500 Clientes)" },
      { key: "ctaButton", label: "Botão de Ação na Coluna Esquerda" },
      { key: "items", label: "Mural de Depoimentos (Coluna Direita)" },
    ],
    contentSchema: testimonialsAuthoritySchema,
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
        key: "proofCount",
        label: "Número de Prova Social (Ex: +500)",
        type: "text",
        optionalKey: "proofCard",
        typographyElementKey: "proofCount",
      },
      {
        key: "proofLabel",
        label: "Rótulo da Prova Social",
        type: "text",
        optionalKey: "proofCard",
      },
      {
        key: "proofText",
        label: "Frase do Card de Prova Social",
        type: "text",
        optionalKey: "proofCard",
      },
      {
        key: "ctaButton",
        label: "Botão de Ação",
        type: "button",
        optionalKey: "ctaButton",
      },
      {
        key: "items",
        label: "Mural de Depoimentos",
        type: "array",
        optionalKey: "items",
        defaultNewItem: {
          name: "Ricardo Alencar",
          role: "Founder & CEO",
          text: "A precisão e qualidade técnica superaram tudo o que já vimos antes no mercado.",
          image: "",
          rating: "5",
        },
        itemFields: [
          { key: "name", label: "Nome", type: "text" },
          { key: "role", label: "Cargo / Empresa", type: "text" },
          { key: "text", label: "Depoimento", type: "textarea" },
          { key: "image", label: "Foto / Avatar (Opcional)", type: "image" },
          {
            key: "rating",
            label: "Estrelas",
            type: "select",
            options: [
              { value: "5", label: "5 Estrelas" },
              { value: "4", label: "4 Estrelas" },
              { value: "3", label: "3 Estrelas" },
              { value: "none", label: "Sem Estrelas" },
            ],
          },
        ],
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
        badge: "INDUSTRY AUTHORITY",
        headline: "Líderes de Mercado Confiam em Nós",
        subtitle:
          "Operações de alto crescimento que escolheram nossa engenharia e design para escalar com segurança.",
        proofCount: "+500",
        proofLabel: "Clientes Premium",
        proofText: "Líderes de mercado que confiam em nossa entrega.",
        ctaButton: {
          enabled: true,
          text: "Agendar Diagnóstico Executivo",
          url: "#contato",
          variant: "solid",
          size: "lg",
          iconName: "ArrowRight",
          iconPosition: "right",
        },
        items: [
          {
            name: "Marcelo Tavares",
            role: "VP of Engineering @ Solaris",
            text: "A precisão e qualidade técnica superaram tudo o que já vimos antes no mercado nacional.",
            image: "",
            rating: "5",
          },
          {
            name: "Patrícia Gusmão",
            role: "Managing Director @ Gusmão & Co",
            text: "Tivemos retorno sobre o investimento logo no primeiro mês de operação da nova estrutura.",
            image: "",
            rating: "5",
          },
          {
            name: "Gustavo Linhares",
            role: "Founder @ Krone Capital",
            text: "Design de autoridade imediata. Nossos clientes percebem o diferencial nos primeiros 5 segundos.",
            image: "",
            rating: "5",
          },
          {
            name: "Helena Bittencourt",
            role: "CMO @ Vértice",
            text: "Atendimento cirúrgico, cronograma respeitado à risca e autonomia total para nossa equipe.",
            image: "",
            rating: "5",
          },
        ],
      },
    },
    Component: ({ content, styles, theme }) => {
      const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
      const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
      const accentColor = styles.customAccent || theme.palette.accent;
      const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

      return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: STICKY AUTHORITY & SOCIAL PROOF */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-24 space-y-8">
            <div className="space-y-4">
              <EditableText
                isBadge
                defaultIconName="Award"
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
                className="text-4xl sm:text-5xl font-black tracking-tighter leading-[0.95] uppercase"
              />

              <EditableText
                as="p"
                value={content.subtitle}
                elementKey="subtitle"
                styles={styles}
                className="text-base sm:text-lg opacity-70 leading-relaxed"
              />
            </div>

            {/* SOCIAL PROOF CARD */}
            {!isHidden("proofCard") && (
              <div
                className={cn(
                  "p-8 space-y-6",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{ backgroundColor: styles.customSurface || undefined }}
              >
                <div className="flex items-center gap-5">
                  <div className="flex -space-x-3.5">
                    {[101, 102, 103, 104].map((seed) => (
                      <div
                        key={seed}
                        className="w-12 h-12 rounded-2xl border-2 border-zinc-950 overflow-hidden bg-zinc-800 shadow-lg"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                          alt="Client"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <EditableText
                      as="div"
                      defaultIsHeading
                      value={content.proofCount}
                      elementKey="proofCount"
                      styles={styles}
                      className="text-2xl sm:text-3xl font-black"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block">
                      {content.proofLabel}
                    </span>
                  </div>
                </div>

                {content.proofText && (
                  <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                    <Users
                      className="w-4 h-4 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span className="text-xs font-bold opacity-75">
                      {content.proofText}
                    </span>
                  </div>
                )}
              </div>
            )}

            {!isHidden("ctaButton") && content.ctaButton?.enabled && (
              <div>
                <SmartButton
                  button={content.ctaButton}
                  elementKey="ctaButton"
                  styles={styles}
                  theme={theme}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: THE WALL OF IMPACT */}
          {!isHidden("items") && content.items && content.items.length > 0 && (
            <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.items.map((item, i) => {
                const stars =
                  item.rating !== "none"
                    ? parseInt(item.rating || "5", 10) || 5
                    : 0;
                return (
                  <div
                    key={i}
                    className={cn(
                      "p-7 sm:p-8 flex flex-col justify-between gap-6 relative group transition-all",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass(radiusPreset)
                    )}
                    style={{
                      backgroundColor: styles.customSurface || undefined,
                    }}
                  >
                    <Quote
                      className="w-12 h-12 absolute top-6 right-6 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none"
                      style={{ color: accentColor }}
                    />

                    <div className="space-y-5 relative z-10">
                      {stars > 0 && (
                        <div
                          className="flex gap-1"
                          style={{ color: accentColor }}
                        >
                          {[...Array(5)].map((_, star) => (
                            <Star
                              key={star}
                              className={cn(
                                "w-3.5 h-3.5",
                                star < stars
                                  ? "fill-current opacity-100"
                                  : "opacity-20"
                              )}
                            />
                          ))}
                        </div>
                      )}

                      <blockquote className="text-base font-bold italic leading-relaxed opacity-90">
                        &ldquo;{item.text}&rdquo;
                      </blockquote>
                    </div>

                    <div className="flex items-center gap-3.5 pt-5 border-t border-white/10">
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                        <img
                          src={
                            item.image ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                              item.name + i
                            )}`
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest block">
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
