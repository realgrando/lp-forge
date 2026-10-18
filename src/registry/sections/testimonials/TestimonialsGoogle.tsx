"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Star, CheckCircle2, ArrowUpRight } from "lucide-react";

const testimonialsGoogleSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  ratingScore: z.string(),
  totalReviews: z.string(),
  statusLabel: z.string(),
  columnsDesktop: z.enum(["2", "3", "4"]).default("3"),
  ctaButton: buttonConfigSchema,
  items: z.array(
    z.object({
      name: z.string(),
      text: z.string(),
      image: z.string().optional(),
      rating: z.enum(["5", "4", "3"]).default("5"),
      date: z.string(),
      badgeRole: z.string().optional(),
    })
  ),
});

export type TestimonialsGoogleContent = z.infer<
  typeof testimonialsGoogleSchema
>;

export const TestimonialsGoogleSection =
  createSection<TestimonialsGoogleContent>({
    id: "testimonials.google",
    name: "Depoimentos Google Reviews",
    description:
      "Cabeçalho com selo oficial Google, card resumo da nota média (ex: 4.9), total de avaliações verificadas e cards estilo Google Maps.",
    category: "Depoimentos",
    iconName: "Award",
    modes: ["LANDING_PAGE", "LINKTREE"],
    legacyType: "testimonials",
    legacyVariant: "v3",
    toggleableElements: [
      { key: "badge", label: "Selo Google Reviews" },
      { key: "headline", label: "Título Principal" },
      { key: "subtitle", label: "Subtítulo" },
      { key: "googleSummaryCard", label: "Card Resumo da Nota Google" },
      { key: "items", label: "Cards de Avaliações" },
      { key: "ctaButton", label: "Botão 'Ver Todas no Google'" },
    ],
    contentSchema: testimonialsGoogleSchema,
    fields: [
      {
        key: "badge",
        label: "Texto do Selo Google",
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
        key: "ratingScore",
        label: "Nota Média no Google (Ex: 4.9)",
        type: "text",
        optionalKey: "googleSummaryCard",
        typographyElementKey: "ratingScore",
      },
      {
        key: "totalReviews",
        label: "Texto de Total de Avaliações",
        type: "text",
        optionalKey: "googleSummaryCard",
      },
      {
        key: "statusLabel",
        label: "Selo de Status (Ex: Atualizado hoje)",
        type: "text",
        optionalKey: "googleSummaryCard",
      },
      {
        key: "columnsDesktop",
        label: "Colunas no Desktop",
        type: "select",
        optionalKey: "items",
        options: [
          { value: "2", label: "2 Colunas" },
          { value: "3", label: "3 Colunas" },
          { value: "4", label: "4 Colunas" },
        ],
      },
      {
        key: "items",
        label: "Avaliações do Google",
        type: "array",
        optionalKey: "items",
        defaultNewItem: {
          name: "Alex Johnson",
          text: "Atendimento impecável do início ao fim! Recomendo fortemente pela pontualidade e transparência.",
          image: "",
          rating: "5",
          date: "há 2 dias",
          badgeRole: "Local Guide",
        },
        itemFields: [
          { key: "name", label: "Nome do Avaliador", type: "text" },
          { key: "text", label: "Comentário", type: "textarea" },
          { key: "image", label: "Foto / Avatar (Opcional)", type: "image" },
          {
            key: "rating",
            label: "Estrelas (1-5)",
            type: "select",
            options: [
              { value: "5", label: "5 Estrelas" },
              { value: "4", label: "4 Estrelas" },
              { value: "3", label: "3 Estrelas" },
            ],
          },
          { key: "date", label: "Tempo / Data (Ex: há 3 dias)", type: "text" },
          {
            key: "badgeRole",
            label: "Selo do Perfil (Ex: Local Guide)",
            type: "text",
          },
        ],
      },
      {
        key: "ctaButton",
        label: "Botão Inferior (Google Maps)",
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
        badge: "GOOGLE REVIEWS",
        headline: "Nossa Reputação 5 Estrelas no Google",
        subtitle:
          "Avaliações públicas e auditadas de clientes reais que contrataram nossos serviços.",
        ratingScore: "4.9",
        totalReviews: "128 avaliações verificadas",
        statusLabel: "Atualizado hoje",
        columnsDesktop: "3",
        ctaButton: {
          enabled: true,
          text: "Ver Todas no Google",
          url: "#google-reviews",
          variant: "glass",
          size: "lg",
          iconName: "ExternalLink",
          iconPosition: "right",
        },
        items: [
          {
            name: "Henrique Vasconcelos",
            text: "Atendimento de altíssimo nível. Cumpriram cada detalhe prometido em contrato antes do prazo.",
            image: "",
            rating: "5",
            date: "há 2 dias",
            badgeRole: "Local Guide",
          },
          {
            name: "Fernanda Lacerda",
            text: "A melhor experiência que já tivemos com fornecedores. Equipe extremamente educada e técnica.",
            image: "",
            rating: "5",
            date: "há 1 semana",
            badgeRole: "Cliente Verificado",
          },
          {
            name: "Roberto Siqueira",
            text: "Qualidade impecável. Recomendo de olhos fechados para quem busca tranquilidade e resultado.",
            image: "",
            rating: "5",
            date: "há 2 semanas",
            badgeRole: "Local Guide",
          },
        ],
      },
    },
    Component: ({ content, styles, theme }) => {
      const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
      const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
      const accentColor = styles.customAccent || theme.palette.accent;
      const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

      const gridColsClass =
        content.columnsDesktop === "2"
          ? "md:grid-cols-2"
          : content.columnsDesktop === "4"
          ? "md:grid-cols-2 lg:grid-cols-4"
          : "md:grid-cols-2 lg:grid-cols-3";

      return (
        <div className="space-y-16">
          {/* HEADER + GOOGLE SUMMARY CARD */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl space-y-5">
              {!isHidden("badge") && (
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl">
                  <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-sm shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <EditableText
                    as="span"
                    value={content.badge}
                    elementKey="badge"
                    styles={styles}
                    className="text-[11px] font-black uppercase tracking-[0.25em]"
                  />
                </div>
              )}

              <EditableText
                as="h2"
                defaultIsHeading
                value={content.headline}
                elementKey="headline"
                styles={styles}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.98]"
              />

              <EditableText
                as="p"
                value={content.subtitle}
                elementKey="subtitle"
                styles={styles}
                className="text-base sm:text-lg opacity-75 leading-relaxed"
              />
            </div>

            {/* GOOGLE SUMMARY CARD */}
            {!isHidden("googleSummaryCard") && (
              <div
                className={cn(
                  "p-8 flex flex-col items-start gap-5 shrink-0 min-w-[280px]",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{ backgroundColor: styles.customSurface || undefined }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {[11, 22, 33, 44].map((seed) => (
                      <div
                        key={seed}
                        className="w-9 h-9 rounded-full border-2 border-zinc-950 overflow-hidden bg-zinc-800"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                          alt="Reviewer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white">
                      +
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <EditableText
                      as="span"
                      defaultIsHeading
                      value={content.ratingScore}
                      elementKey="ratingScore"
                      styles={styles}
                      className="text-4xl font-black"
                    />
                    <div
                      className="flex gap-1"
                      style={{ color: accentColor }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest opacity-55">
                    {content.totalReviews}
                  </p>
                </div>

                {content.statusLabel && (
                  <>
                    <div className="w-full h-px bg-white/10" />
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-65">
                        {content.statusLabel}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* GOOGLE REVIEWS GRID */}
          {!isHidden("items") && content.items && content.items.length > 0 && (
            <div className={cn("grid grid-cols-1 gap-6", gridColsClass)}>
              {content.items.map((item, i) => {
                const stars = parseInt(item.rating || "5", 10) || 5;
                return (
                  <div
                    key={i}
                    className={cn(
                      "group p-8 flex flex-col justify-between gap-6 transition-all duration-300",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass(radiusPreset)
                    )}
                    style={{
                      backgroundColor: styles.customSurface || undefined,
                    }}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-zinc-800">
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
                            <h4 className="text-sm font-black leading-tight uppercase tracking-tight">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-[10px] opacity-55 font-bold uppercase tracking-wider">
                                {item.badgeRole || "Local Guide"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className="flex gap-0.5 shrink-0"
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
                      </div>

                      <blockquote className="text-sm sm:text-base leading-relaxed italic opacity-85">
                        &ldquo;{item.text}&rdquo;
                      </blockquote>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-white/10">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-45 block">
                          {item.date || "há 1 semana"}
                        </span>
                        <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest block">
                          Google Maps Verified
                        </span>
                      </div>
                      <div
                        className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ color: accentColor }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA BUTTON */}
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
