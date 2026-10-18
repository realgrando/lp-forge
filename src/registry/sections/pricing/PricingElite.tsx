"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const pricingEliteSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  plans: z.array(
    z.object({
      name: z.string(),
      badgeLabel: z.string(),
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

export type PricingEliteContent = z.infer<typeof pricingEliteSchema>;

export const PricingEliteSection = createSection<PricingEliteContent>({
  id: "pricing.elite",
  name: "Pricing High-Ticket Elite",
  description:
    "Planos robustos desenhados para grandes volumes, operações Enterprise e ofertas High-Ticket.",
  category: "Preços",
  iconName: "ShieldCheck",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "plans", label: "Cartões High-Ticket" },
  ],
  contentSchema: pricingEliteSchema,
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
      label: "Planos High-Ticket",
      type: "array",
      optionalKey: "plans",
      defaultNewItem: {
        name: "Enterprise Pro",
        badgeLabel: "Recomendado",
        currency: "R$",
        price: "3.200",
        period: "/mês",
        description: "O auge da tecnologia e suporte personalizado.",
        featuresList:
          "Gerente de Conta Dedicado, Segurança Nível Bancário, Customização de Código",
        ctaText: "Upgrade Elite",
        ctaUrl: "#contato",
        isPopular: false,
        accentColor: "",
      },
      itemFields: [
        { key: "name", label: "Nome do Plano", type: "text" },
        { key: "badgeLabel", label: "Selo Superior (Ex: Recomendado)", type: "text" },
        { key: "currency", label: "Moeda (Ex: R$)", type: "text" },
        { key: "price", label: "Preço Principal", type: "text" },
        { key: "period", label: "Período (Ex: /mês)", type: "text" },
        { key: "description", label: "Descrição Curta", type: "textarea" },
        {
          key: "featuresList",
          label: "Diferenciais Inclusos (separe por vírgula)",
          type: "textarea",
        },
        { key: "ctaText", label: "Texto do Botão", type: "text" },
        { key: "ctaUrl", label: "Link do Botão", type: "url" },
        { key: "accentColor", label: "Cor Exclusiva do Card", type: "color" },
        { key: "isPopular", label: "Destacar Oferta Principal", type: "toggle" },
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
      badge: "ENTERPRISE SOLUTIONS",
      headline: "Potencialize sua operação com autoridade.",
      subtitle:
        "Planos robustos desenhados para grandes volumes e alta performance digital.",
      plans: [
        {
          name: "Corporativo",
          badgeLabel: "",
          currency: "R$",
          price: "1.490",
          period: "/mês",
          description: "A base sólida para sua expansão digital.",
          featuresList:
            "Infraestrutura Dedicada, API de Integração, SLA de 99.9%",
          ctaText: "Falar com Consultor",
          ctaUrl: "#contato",
          isPopular: false,
        },
        {
          name: "Enterprise Pro",
          badgeLabel: "Recomendado",
          currency: "R$",
          price: "3.200",
          period: "/mês",
          description: "O auge da tecnologia e suporte personalizado.",
          featuresList:
            "Gerente de Conta Dedicado, Segurança Nível Bancário, Customização de Código, Treinamento In-company",
          ctaText: "Upgrade Elite",
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
      <div className="space-y-20" id="planos-elite">
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <EditableText
              isBadge
              defaultIconName="ShieldCheck"
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
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 text-lg sm:text-xl font-medium max-w-2xl mx-auto"
            />
          </div>
        )}

        {!isHidden("plans") && content.plans && content.plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
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
                    "p-10 md:p-14 flex flex-col relative transition-all duration-500",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset),
                    plan.isPopular && "shadow-2xl"
                  )}
                  style={{
                    backgroundColor: styles.customSurface || undefined,
                    borderColor: plan.isPopular ? `${planAccent}50` : undefined,
                  }}
                >
                  {(plan.isPopular || plan.badgeLabel) && (
                    <div
                      className="absolute -top-4 right-10 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl"
                      style={{
                        backgroundColor: planAccent,
                        color: "#09090B",
                      }}
                    >
                      <DynamicIcon name="Star" className="w-3 h-3" />
                      <span>{plan.badgeLabel || "Recomendado"}</span>
                    </div>
                  )}

                  <div className="mb-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <DynamicIcon
                        name="ShieldCheck"
                        className="w-5 h-5"
                        style={{ color: planAccent }}
                      />
                      <h3 className="opacity-60 text-xs font-black uppercase tracking-[0.2em]">
                        {plan.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="opacity-50 text-2xl font-bold">
                        {plan.currency}
                      </span>
                      <span
                        className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none"
                        style={{ fontFamily: "var(--site-font-heading)" }}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="opacity-50 font-bold ml-2">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {plan.description && (
                      <p className="opacity-70 text-sm leading-relaxed pt-1">
                        {plan.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-5 mb-12 flex-1">
                    {features.map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-start gap-4 group/item"
                      >
                        <div
                          className="mt-2 w-2 h-2 rounded-full shrink-0 transition-transform group-hover/item:scale-150"
                          style={{ backgroundColor: planAccent }}
                        />
                        <span className="opacity-80 text-sm font-bold group-hover/item:opacity-100 transition-opacity">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={plan.ctaUrl || "#"}
                    className={cn(
                      "group/btn relative flex items-center justify-between p-5 border border-white/10 transition-all duration-300 overflow-hidden",
                      getRadiusClass(radiusPreset)
                    )}
                    style={{
                      backgroundColor: plan.isPopular
                        ? `${planAccent}18`
                        : "rgba(255,255,255,0.03)",
                      borderColor: plan.isPopular ? `${planAccent}40` : undefined,
                    }}
                  >
                    <span className="text-xs font-black uppercase tracking-widest relative z-10">
                      {plan.ctaText}
                    </span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center group-hover/btn:scale-110 transition-transform relative z-10"
                      style={{
                        backgroundColor: plan.isPopular
                          ? planAccent
                          : "rgba(255,255,255,0.08)",
                        color: plan.isPopular ? "#09090B" : undefined,
                      }}
                    >
                      <DynamicIcon name="ArrowRight" className="w-4 h-4" />
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
