"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const logoCloudBentoSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columnsDesktop: z.enum(["3", "4", "6"]).default("4"),
  items: z.array(
    z.object({
      name: z.string(),
      image: z.string(),
      tag: z.string().optional(),
    })
  ),
});

export type LogoCloudBentoContent = z.infer<typeof logoCloudBentoSchema>;

export const LogoCloudBentoSection = createSection<LogoCloudBentoContent>({
  id: "trust.logos_bento",
  name: "Logo Cloud Bento Cards",
  description:
    "Grade Bento de parceiros e marcas atendidas em cards individuais com efeito P&B para colorido no hover.",
  category: "Prova Social",
  iconName: "Building2",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "logocloud",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "items", label: "Cards de Logos" },
    { key: "brandLabels", label: "Nome / Tag da Marca no Card" },
  ],
  contentSchema: logoCloudBentoSchema,
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
      key: "columnsDesktop",
      label: "Colunas no Desktop",
      type: "select",
      optionalKey: "items",
      options: [
        { value: "3", label: "3 Colunas" },
        { value: "4", label: "4 Colunas" },
        { value: "6", label: "6 Colunas" },
      ],
    },
    {
      key: "items",
      label: "Cards de Marcas / Parceiros",
      type: "array",
      optionalKey: "items",
      defaultNewItem: {
        name: "Nova Marca Parceira",
        image: "",
        tag: "Enterprise Partner",
      },
      itemFields: [
        { key: "name", label: "Nome da Marca", type: "text" },
        { key: "image", label: "Logo URL (Opcional)", type: "image" },
        { key: "tag", label: "Sub-rastro / Setor (Opcional)", type: "text" },
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
      badge: "PARCEIROS ESTRATÉGICOS",
      headline: "Marcas que confiam em nosso trabalho",
      subtitle:
        "Parcerias sólidas com empresas líderes que exigem excelência técnica e resultados consistentes.",
      columnsDesktop: "4",
      items: [
        { name: "VECTRA AI", image: "", tag: "Artificial Intelligence" },
        { name: "APEX CAPITAL", image: "", tag: "Private Equity" },
        { name: "KRONOS ENG", image: "", tag: "Infraestrutura" },
        { name: "ATELIER HOLDING", image: "", tag: "Real Estate" },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const gridColsClass =
      content.columnsDesktop === "3"
        ? "grid-cols-2 md:grid-cols-3"
        : content.columnsDesktop === "6"
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        : "grid-cols-2 md:grid-cols-4";

    return (
      <div className="space-y-12">
        {/* HEADER */}
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
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
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter"
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

        {/* BENTO LOGO CARDS */}
        {!isHidden("items") && content.items && content.items.length > 0 && (
          <div className={cn("grid gap-6", gridColsClass)}>
            {content.items.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-32 p-6 flex flex-col items-center justify-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 group",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{ backgroundColor: styles.customSurface || undefined }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-12 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="text-lg sm:text-xl font-black tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity text-center">
                    {item.name}
                  </span>
                )}

                {!isHidden("brandLabels") && item.tag && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-80 transition-opacity"
                    style={{ color: accentColor }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});
