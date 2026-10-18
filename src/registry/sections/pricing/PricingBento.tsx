"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const pricingBentoSchema = z.object({
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

export type PricingBentoContent = z.infer<typeof pricingBentoSchema>;

export const PricingBentoSection = createSection<PricingBentoContent>({
  id: "pricing.bento",
  name: "Pricing Bento Layout",
  description:
    "Grade assimétrica estilo Bento (5 col / 7 col) com cabeçalho dividido e destaque imersivo na oferta principal.",
  category: "Preços",
  iconName: "LayoutGrid",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "plans", label: "Grade Bento de Planos" },
  ],
  contentSchema: pricingBentoSchema,
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
      label: "Planos (Grade Bento)",
      type: "array",
      optionalKey: "plans",
      defaultNewItem: {
        name: "Novo Plano",
        currency: "R$",
        price: "297",
        period: "/mês",
        description: "Estrutura moderna em grade para destacar seus diferenciais.",
        featuresList: "Suporte via WhatsApp, Dashboard de métricas, Acesso à comunidade",
        ctaText: "Começar Agora",
        ctaUrl: "#contato",
        isPopular: false,
        accentColor: "",
      },
      itemFields: [
        { key: "name", label: "Nome do Plano", type: "text" },
        { key: "currency", label: "Moeda (Ex: R$)", type: "text" },
        { key: "price", label: "Preço (Ex: 497)", type: "text" },
        { key: "period", label: "Período (Ex: /mês)", type: "text" },
        { key: "description", label: "Descrição Curta", type: "textarea" },
        {
          key: "featuresList",
          label: "Vantagens Inclusas (separe por vírgula)",
          type: "textarea",
        },
        { key: "ctaText", label: "Texto do Botão", type: "text" },
        { key: "ctaUrl", label: "Link do Botão", type: "url" },
        { key: "accentColor", label: "Cor Exclusiva do Card", type: "color" },
        { key: "isPopular", label: "Destaque Bento (Coluna Maior)", type: "toggle" },
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
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "OPORTUNIDADE",
      headline: "Invista no seu crescimento acelerado.",
      subtitle: "Estrutura moderna em grade Bento para destacar seus diferenciais e maximizar conversões.",
      plans: [
        {
          name: "Essencial",
          currency: "R$",
          price: "197",
          period: "/mês",
          description: "Tudo o que você precisa para começar com o pé direito.",
          featuresList:
            "Suporte via WhatsApp, Dashboard de métricas, Acesso à comunidade",
          ctaText: "Começar Agora",
          ctaUrl: "#contato",
          isPopular: false,
        },
        {
          name: "Diamond Elite",
          currency: "R$",
          price: "497",
          period: "/mês",
          description: "A solução completa para quem não aceita menos que o topo.",
          featuresList:
            "Consultoria mensal, Recursos exclusivos, Suporte 24/7 VIP, Customização total",
          ctaText: "Seja Diamond",
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
      <div className="space-y-16" id="planos-bento">
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
            <div className="max-w-2xl space-y-4">
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
                className="text-4xl md:text-6xl font-black tracking-tighter leading-none"
              />
            </div>

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 font-medium text-base sm:text-lg max-w-sm lg:ml-auto"
            />
          </div>
        )}

        {!isHidden("plans") && content.plans && content.plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {content.plans.map((plan, idx) => {
              const isMain = plan.isPopular;
              const planAccent = plan.accentColor || defaultAccent;
              const features = (plan.featuresList || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

              return (
                <div
                  key={idx}
                  className={cn(
                    "relative overflow-hidden p-8 md:p-12 flex flex-col transition-all duration-500 group",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset),
                    isMain ? "md:col-span-7" : "md:col-span-5"
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    borderColor: isMain ? `${planAccent}40` : undefined,
                  }}
                >
                  {isMain && (
                    <div
                      className="absolute top-0 right-0 w-36 h-36 opacity-20 blur-3xl rounded-full pointer-events-none"
                      style={{ backgroundColor: planAccent }}
                    />
                  )}

                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <h3 className="opacity-60 text-xs font-black uppercase tracking-widest mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="text-4xl sm:text-5xl font-black tracking-tighter"
                          style={{ fontFamily: "var(--site-font-heading)" }}
                        >
                          {plan.currency}
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="opacity-50 font-bold text-sm">
                            {plan.period}
                          </span>
                        )}
                      </div>
                    </div>

                    {isMain && (
                      <div
                        className={cn(
                          "p-3 border border-white/10",
                          getRadiusClass("md")
                        )}
                        style={{
                          color: planAccent,
                          backgroundColor: `${planAccent}15`,
                        }}
                      >
                        <DynamicIcon name="Sparkles" className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <p className="opacity-75 font-medium mb-10 max-w-md text-sm leading-relaxed relative z-10">
                    {plan.description}
                  </p>

                  <div
                    className={cn(
                      "grid gap-4 mb-12 relative z-10",
                      isMain ? " sm:grid-cols-2" : "grid-cols-1"
                    )}
                  >
                    {features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                          style={{
                            backgroundColor: isMain
                              ? `${planAccent}25`
                              : "rgba(255,255,255,0.06)",
                            color: isMain ? planAccent : undefined,
                          }}
                        >
                          <DynamicIcon name="Check" className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-semibold opacity-85">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto relative z-10">
                    <a
                      href={plan.ctaUrl || "#"}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 px-8 py-4 font-black text-xs uppercase tracking-[0.2em] transition-all",
                        getRadiusClass(radiusPreset)
                      )}
                      style={
                        isMain
                          ? {
                              backgroundColor: planAccent,
                              color: "#09090B",
                            }
                          : {
                              backgroundColor: "transparent",
                              border: "1px solid rgba(255,255,255,0.15)",
                            }
                      }
                    >
                      <span>{plan.ctaText}</span>
                      <DynamicIcon name="ArrowRight" className="w-3.5 h-3.5" />
                    </a>
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
