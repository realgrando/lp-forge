"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const pricingMinimalistSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  plans: z.array(
    z.object({
      name: z.string(),
      currency: z.string(),
      price: z.string(),
      period: z.string(),
      description: z.string(),
      featuresList: z.string(),
      ctaText: z.string(),
      ctaUrl: z.string(),
      isPopular: z.boolean(),
      accentColor: z.string().optional(),
    })
  ),
});

export type PricingMinimalistContent = z.infer<typeof pricingMinimalistSchema>;

export const PricingMinimalistSection = createSection<PricingMinimalistContent>({
  id: "pricing.minimal",
  name: "Pricing Minimalist Rows",
  description:
    "Design boutique minimalista com linhas horizontais pontilhadas de especificações e estética editorial.",
  category: "Preços",
  iconName: "Minus",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "plans", label: "Grade Minimalista de Planos" },
  ],
  contentSchema: pricingMinimalistSchema,
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
      key: "plans",
      label: "Planos Minimalistas",
      type: "array",
      optionalKey: "plans",
      defaultNewItem: {
        name: "Essencial",
        currency: "R$",
        price: "490",
        period: "/mês",
        description: "Transparência total para marcas em ascensão.",
        featuresList: "Core features, Suporte dedicado, Analytics em tempo real",
        ctaText: "Começar Agora",
        ctaUrl: "#contato",
        isPopular: false,
        accentColor: "",
      },
      itemFields: [
        { key: "name", label: "Nome do Plano", type: "text" },
        { key: "currency", label: "Moeda (Ex: R$ ou $)", type: "text" },
        { key: "price", label: "Preço (Ex: 49)", type: "text" },
        { key: "period", label: "Período (Ex: /mês)", type: "text" },
        { key: "description", label: "Descrição Curta", type: "text" },
        {
          key: "featuresList",
          label: "Linhas de Recursos (separe por vírgula)",
          type: "textarea",
        },
        { key: "ctaText", label: "Texto do Botão", type: "text" },
        { key: "ctaUrl", label: "Link do Botão", type: "url" },
        { key: "accentColor", label: "Cor de Destaque", type: "color" },
        { key: "isPopular", label: "Destacar Coluna", type: "toggle" },
      ],
    },
  ],
  defaultData: {
    layout: {
      paddingY: "normal",
      containerWidth: "boxed",
    },
    styles: {
      surfaceVariant: "bordered",
      borderRadius: "md",
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      badge: "TRANSPARÊNCIA BOUTIQUE",
      headline: "Simplicidade absoluta nos preços.",
      subtitle:
        "Design limpo focado na transparência, clareza de escopo e experiência direta do cliente.",
      plans: [
        {
          name: "Essencial",
          currency: "R$",
          price: "990",
          period: "/mês",
          description: "Para operações enxutas que exigem presença impecável.",
          featuresList: "Core features, Suporte via E-mail, Analytics Mensal",
          ctaText: "Get Started",
          ctaUrl: "#contato",
          isPopular: false,
        },
        {
          name: "Premium",
          currency: "R$",
          price: "1.990",
          period: "/mês",
          description: "Escala completa com prioridade máxima de atendimento.",
          featuresList:
            "Core features, Suporte Prioritário, Analytics Avançado, Domínios Customizados",
          ctaText: "Get Started",
          ctaUrl: "#contato",
          isPopular: true,
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const defaultAccent = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    return (
      <div className="space-y-16" id="planos-minimal">
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="space-y-4 max-w-2xl">
            <EditableText
              isBadge
              defaultIconName="Sparkles"
              accentColor={defaultAccent}
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
              className="text-4xl md:text-5xl font-black tracking-tight"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 font-medium text-base sm:text-lg max-w-lg"
            />
          </div>
        )}

        {!isHidden("plans") && content.plans && content.plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.plans.map((plan, idx) => {
              const planAccent = plan.accentColor || defaultAccent;
              const features = (plan.featuresList || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

              return (
                <div
                  key={idx}
                  className={cn(
                    "p-10 md:p-14 flex flex-col justify-between transition-all",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    borderColor: plan.isPopular ? `${planAccent}50` : undefined,
                  }}
                >
                  <div>
                    <div className="mb-12">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">
                          {plan.name}
                        </h3>
                        {plan.isPopular && (
                          <span
                            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: `${planAccent}20`,
                              color: planAccent,
                            }}
                          >
                            Popular
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline">
                        <span
                          className="text-6xl sm:text-7xl font-black tracking-tighter leading-none"
                          style={{ fontFamily: "var(--site-font-heading)" }}
                        >
                          {plan.currency}
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="opacity-50 font-bold ml-2">
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {plan.description && (
                        <p className="text-xs opacity-65 mt-4">
                          {plan.description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 mb-14">
                      {features.map((feat, fi) => (
                        <div
                          key={fi}
                          className="flex items-center justify-between group"
                        >
                          <span className="text-sm font-bold opacity-90">
                            {feat}
                          </span>
                          <div className="h-px flex-1 mx-4 bg-white/10 group-hover:bg-white/25 transition-colors" />
                          <span
                            className="text-[10px] font-black uppercase tracking-widest"
                            style={{ color: planAccent }}
                          >
                            INCLUSO
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={plan.ctaUrl || "#"}
                    className="group relative inline-flex items-center justify-between text-xs font-black uppercase tracking-widest pt-6 border-t border-white/10 transition-all"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {plan.ctaText}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-[2px] w-8 group-hover:w-12 transition-all"
                        style={{ backgroundColor: planAccent }}
                      />
                      <DynamicIcon
                        name="ArrowRight"
                        className="w-3.5 h-3.5"
                        style={{ color: planAccent }}
                      />
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
