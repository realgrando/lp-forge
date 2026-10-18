"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const pricingSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  plans: z.array(
    z.object({
      name: z.string(),
      badge: z.string(),
      price: z.string(),
      period: z.string(),
      description: z.string(),
      featuresList: z.string(), // Separado por vírgula ou quebra de linha para facilidade no editor
      ctaText: z.string(),
      ctaUrl: z.string(),
      featured: z.boolean(),
      accentColor: z.string().optional(),
    })
  ),
});

export type PricingContent = z.infer<typeof pricingSchema>;

export const PricingSection = createSection<PricingContent>({
  id: "pricing.tiers",
  name: "Tabela de Preços & Planos Elite",
  description: "Grade de planos com destaque para oferta principal, checklist e botão de contratação por plano.",
  category: "Planos & Preços",
  iconName: "Crown",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "eyebrow", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "plans", label: "Cartões de Planos" },
  ],
  contentSchema: pricingSchema,
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
      label: "Título dos Planos",
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
      label: "Planos / Ofertas",
      type: "array",
      optionalKey: "plans",
      defaultNewItem: {
        name: "Novo Plano",
        badge: "",
        price: "R$ 997",
        period: "/mês",
        description: "Ideal para empresas em crescimento.",
        featuresList: "Design Exclusivo, Painel /admin, Deploy Vercel Free",
        ctaText: "Começar Agora",
        ctaUrl: "#checkout",
        featured: false,
        accentColor: "",
      },
      itemFields: [
        { key: "name", label: "Nome do Plano", type: "text" },
        { key: "badge", label: "Etiqueta (Ex: MAIS VENDIDO)", type: "text" },
        { key: "price", label: "Preço Principal", type: "text" },
        { key: "period", label: "Sufixo / Período (Ex: /único, /mês)", type: "text" },
        { key: "description", label: "Resumo do Plano", type: "text" },
        {
          key: "featuresList",
          label: "Itens Inclusos (separe por vírgula)",
          type: "textarea",
        },
        { key: "ctaText", label: "Texto do Botão", type: "text" },
        { key: "ctaUrl", label: "Link do Botão", type: "url" },
        { key: "accentColor", label: "Cor Exclusiva do Card", type: "color" },
        { key: "featured", label: "Destacar como Oferta Principal", type: "toggle" },
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
      eyebrow: "INVESTIMENTO TRANSPARENTE",
      headline: "Escolha a estrutura ideal para o seu momento.",
      subtitle:
        "Sem taxas ocultas de hospedagem. Você recebe o código e o painel /admin prontos para escalar.",
      plans: [
        {
          name: "Bio 3D Executive",
          badge: "FAST TRACK",
          price: "R$ 1.490",
          period: "/projeto",
          description: "Cartão de visitas digital 3D para executivos, médicos e criadores.",
          featuresList:
            "Design Mobile 3D Exclusivo, Links Ilimitados, Painel /admin de Edição, Hospedagem Custo Zero",
          ctaText: "Solicitar Bio 3D",
          ctaUrl: "#contato",
          featured: false,
        },
        {
          name: "Landing Page High-Ticket",
          badge: "MAIS ESCOLHIDO",
          price: "R$ 3.900",
          period: "/projeto",
          description: "Página de alta conversão completa com copy, animações e máxima performance.",
          featuresList:
            "Arquitetura Completa sob Medida, Até 12 Seções de Elite, Painel /admin para sua Equipe, Deploy Automático na Vercel, Nota 99+ no Google PageSpeed",
          ctaText: "Contratar Landing Page",
          ctaUrl: "#contato",
          featured: true,
        },
        {
          name: "Ecossistema Full Brand",
          badge: "ENTERPRISE",
          price: "Sob Consulta",
          period: "",
          description: "Múltiplas páginas de lançamento, funis e integração direta com CRM.",
          featuresList:
            "Múltiplas Landing Pages + Bio, Biblioteca Própria de Templates, Integração com Webhooks e CRM, Suporte Prioritário Dedicado",
          ctaText: "Falar com Diretor",
          ctaUrl: "#contato",
          featured: false,
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const defaultAccent = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div className="space-y-12" id="planos">
        {(!hidden.eyebrow || !hidden.headline || !hidden.subtitle) && (
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <EditableText
              isBadge
              defaultIconName="Crown"
              accentColor={defaultAccent}
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

        {!hidden.plans && content.plans && content.plans.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
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
                    "p-8 flex flex-col justify-between relative transition-all duration-300",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset),
                    plan.featured && "lg:-translate-y-2 shadow-2xl"
                  )}
                  style={
                    plan.featured
                      ? {
                          borderColor: planAccent,
                          borderWidth: "2px",
                          background: `linear-gradient(180deg, ${planAccent}14 0%, rgba(24,24,27,0.95) 100%)`,
                        }
                      : { backgroundColor: styles.customSurface || undefined }
                  }
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--site-font-heading)" }}
                      >
                        {plan.name}
                      </h3>
                      {plan.badge && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                          style={{
                            backgroundColor: plan.featured
                              ? planAccent
                              : `${planAccent}20`,
                            color: plan.featured ? "#09090B" : planAccent,
                          }}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-4xl sm:text-5xl font-black tracking-tight"
                        style={{
                          fontFamily: "var(--site-font-heading)",
                          color: plan.featured ? planAccent : undefined,
                        }}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-xs opacity-60 font-medium">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    <p className="text-xs opacity-75 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="pt-6 border-t border-white/10 space-y-3">
                      {features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs opacity-90"
                        >
                          <Check
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: planAccent }}
                          />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <a
                      href={plan.ctaUrl || "#"}
                      className={cn(
                        "w-full py-3.5 px-5 font-bold text-xs flex items-center justify-center gap-2 transition-all",
                        getRadiusClass(radiusPreset)
                      )}
                      style={
                        plan.featured
                          ? {
                              backgroundColor: planAccent,
                              color: "#09090B",
                            }
                          : {
                              backgroundColor: "rgba(255,255,255,0.06)",
                              border: `1px solid ${planAccent}50`,
                            }
                      }
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
