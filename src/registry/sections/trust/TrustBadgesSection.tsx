"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const trustBadgesSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  align: z.enum(["center", "left"]).default("center"),
  items: z.array(
    z.object({
      text: z.string(),
      description: z.string().optional(),
      iconName: z.string(),
      accentColor: z.string().optional(),
    })
  ),
});

export type TrustBadgesContent = z.infer<typeof trustBadgesSchema>;

export const TrustBadgesSection = createSection<TrustBadgesContent>({
  id: "trust.badges",
  name: "Selos de Confiança & Garantias",
  description:
    "Grade de selos de segurança, certificações e garantias contratuais com ícones personalizáveis.",
  category: "Prova Social",
  iconName: "ShieldCheck",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "trustbadges",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "items", label: "Cards de Selos de Confiança" },
    { key: "itemDescriptions", label: "Subtexto Explicativo nos Selos" },
  ],
  contentSchema: trustBadgesSchema,
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
      key: "align",
      label: "Alinhamento do Cabeçalho",
      type: "select",
      options: [
        { value: "center", label: "Centralizado" },
        { value: "left", label: "Alinhado à Esquerda" },
      ],
    },
    {
      key: "items",
      label: "Selos de Confiança",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        text: "Garantia Integral de 1 Ano",
        description: "Cobertura completa em contrato.",
        iconName: "Shield",
        accentColor: "",
      },
      itemFields: [
        { key: "text", label: "Título do Selo", type: "text" },
        {
          key: "description",
          label: "Subtexto Curto (Opcional)",
          type: "text",
        },
        { key: "iconName", label: "Ícone do Selo", type: "icon" },
        { key: "accentColor", label: "Cor Exclusiva (Opcional)", type: "color" },
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
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      badge: "COMPROMISSO & SEGURANÇA",
      headline: "Sua Segurança é Nossa Prioridade",
      subtitle:
        "Trabalhamos com os mais altos padrões de qualidade, transparência e garantia do mercado.",
      align: "center",
      items: [
        {
          iconName: "Shield",
          text: "Garantia de 1 Ano",
          description: "Respaldo técnico assegurado em contrato",
        },
        {
          iconName: "Lock",
          text: "Pagamento 100% Seguro",
          description: "Transações protegidas e auditadas",
        },
        {
          iconName: "Award",
          text: "Materiais Certificados",
          description: "Insumos de primeira linha homologados",
        },
        {
          iconName: "CheckCircle2",
          text: "Equipe Especializada",
          description: "Profissionais treinados e certificados",
        },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const isCentered = content.align !== "left";

    return (
      <div className="space-y-12">
        {/* HEADER */}
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div
            className={cn(
              "max-w-3xl space-y-4",
              isCentered ? "mx-auto text-center" : "text-left"
            )}
          >
            <EditableText
              isBadge
              defaultIconName="Shield"
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
              className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight"
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

        {/* TRUST BADGES GRID */}
        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.items.map((item, idx) => {
              const badgeAccent = item.accentColor || accentColor;
              return (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col items-center text-center p-8 transition-all duration-300 group",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                  style={{ backgroundColor: styles.customSurface || undefined }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${badgeAccent}18`,
                      color: badgeAccent,
                    }}
                  >
                    <DynamicIcon
                      name={item.iconName || "Shield"}
                      className="w-7 h-7"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-widest">
                    {item.text}
                  </span>
                  {!isHidden("itemDescriptions") && item.description && (
                    <p className="text-xs opacity-60 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
