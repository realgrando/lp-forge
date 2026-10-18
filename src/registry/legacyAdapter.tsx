"use client";

import React from "react";
import { z } from "zod";
import { SectionDefinition, SiteMode } from "@/types/site";
import { BLOCK_LIBRARY } from "@/components/library/registry";

const CATEGORY_MAP: Record<
  string,
  { category: string; iconName: string; modes: SiteMode[]; prefixLabel: string }
> = {
  header: {
    category: "Navegação (Headers)",
    iconName: "Compass",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Header",
  },
  hero: {
    category: "Hero & Destaque",
    iconName: "Sparkles",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Hero",
  },
  about: {
    category: "Sobre & Autoridade",
    iconName: "Award",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Sobre",
  },
  features: {
    category: "Recursos & Benefícios",
    iconName: "LayoutGrid",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Features",
  },
  menu: {
    category: "Cardápio & Serviços",
    iconName: "Layers",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Menu / Catálogo",
  },
  process: {
    category: "Processo & Etapas",
    iconName: "GitCompare",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Processo",
  },
  stats: {
    category: "Números & Estatísticas",
    iconName: "BarChart3",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Stats",
  },
  beforeafter: {
    category: "Antes & Depois",
    iconName: "GitCompare",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Antes/Depois",
  },
  splitcontent: {
    category: "Sobre & Autoridade",
    iconName: "LayoutGrid",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Split Content",
  },
  grid: {
    category: "Recursos & Benefícios",
    iconName: "LayoutGrid",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Grid",
  },
  narrative: {
    category: "Narrativa & Comparação",
    iconName: "Award",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Narrativa",
  },
  gallery: {
    category: "Galeria & Portfólio",
    iconName: "Image",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Galeria",
  },
  portfolio: {
    category: "Galeria & Portfólio",
    iconName: "Video",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Portfólio",
  },
  testimonials: {
    category: "Depoimentos & Avaliações",
    iconName: "MessageSquareQuote",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Depoimentos",
  },
  logocloud: {
    category: "Prova Social & Confiança",
    iconName: "ShieldCheck",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Logo Cloud",
  },
  trustbadges: {
    category: "Prova Social & Confiança",
    iconName: "ShieldCheck",
    modes: ["LANDING_PAGE", "LINKTREE"],
    prefixLabel: "Selos",
  },
  team: {
    category: "Equipe & Especialistas",
    iconName: "Users",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Equipe",
  },
  pricing: {
    category: "Planos & Preços",
    iconName: "CreditCard",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Preços",
  },
  faq: {
    category: "Dúvidas (FAQ)",
    iconName: "HelpCircle",
    modes: ["LANDING_PAGE", "LINKTREE"],
    prefixLabel: "FAQ",
  },
  leadgen: {
    category: "Captação & Formulários",
    iconName: "Zap",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Captação",
  },
  contact: {
    category: "Contato & Localização",
    iconName: "Mail",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Contato",
  },
  location: {
    category: "Contato & Localização",
    iconName: "MapPin",
    modes: ["LANDING_PAGE"],
    prefixLabel: "Localização",
  },
  cta: {
    category: "Conversão (CTA)",
    iconName: "Rocket",
    modes: ["LANDING_PAGE", "LINKTREE"],
    prefixLabel: "CTA",
  },
  dividers: {
    category: "Divisores & Estrutura",
    iconName: "Sparkles",
    modes: ["LANDING_PAGE", "LINKTREE"],
    prefixLabel: "Divisor",
  },
  footer: {
    category: "Rodapé (Footers)",
    iconName: "Compass",
    modes: ["LANDING_PAGE", "LINKTREE"],
    prefixLabel: "Footer",
  },
};

const DEFAULT_SOCIALS = [
  { id: "instagram", url: "https://instagram.com", active: true, label: "Instagram" },
  { id: "whatsapp", url: "https://wa.me/5511999999999", active: true, label: "WhatsApp" },
  { id: "linkedin", url: "https://linkedin.com", active: true, label: "LinkedIn" },
];

export const LEGACY_SECTION_DEFINITIONS: Record<string, SectionDefinition<any>> = {};

for (const [typeKey, group] of Object.entries(BLOCK_LIBRARY)) {
  const catInfo = CATEGORY_MAP[typeKey] || {
    category: "Outros Blocos",
    iconName: "Layers",
    modes: ["LANDING_PAGE" as SiteMode],
    prefixLabel: typeKey.toUpperCase(),
  };

  for (const [variantKey, variantEntry] of Object.entries(group.variants)) {
    const sectionId = `legacy.${typeKey}.${variantKey}`;
    const VariantComponent = variantEntry.component;

    const definition: SectionDefinition<Record<string, any>> = {
      id: sectionId,
      name: `${catInfo.prefixLabel} — ${variantEntry.label}`,
      description: `Variação ${variantKey.toUpperCase()} da biblioteca ${catInfo.prefixLabel} (${Object.keys(group.variants).length} variantes disponíveis).`,
      category: catInfo.category,
      iconName: catInfo.iconName,
      modes: catInfo.modes,
      legacyType: typeKey,
      legacyVariant: variantKey,
      rawContainer: true,
      contentSchema: z.record(z.string(), z.any()),
      fields: [],
      defaultData: {
        content: variantEntry.defaultData || {},
        layout: {
          paddingY: "none",
          containerWidth: "full",
        },
        styles: {},
      },
      Component: ({ content, styles }) => {
        const mergedData: Record<string, any> = {
          ...(variantEntry.defaultData || {}),
          ...(content || {}),
          style: {
            ...(variantEntry.defaultData?.style || {}),
            ...(content?.style || {}),
            ...(styles?.customAccent ? { customAccent: styles.customAccent } : {}),
            ...(styles?.customBg ? { customBg: styles.customBg } : {}),
            ...(styles?.customText ? { customText: styles.customText } : {}),
          },
        };

        const blockStyle = mergedData.style || {};
        const isHeader = typeKey === "header";
        const isHero = typeKey === "hero";

        return (
          <div
            className={`${blockStyle.customText ? "section-custom-text" : ""} ${
              !blockStyle.customBg && !isHero && !isHeader
                ? mergedData.layout?.bgStyle === "surface"
                  ? "bg-bg-surface"
                  : "bg-bg-main"
                : ""
            }`}
            style={{
              backgroundColor: isHeader
                ? "transparent"
                : blockStyle.customBg || "transparent",
              color: blockStyle.customText || "inherit",
              position: "relative",
            }}
          >
            <VariantComponent data={mergedData} globalSocials={DEFAULT_SOCIALS} />
          </div>
        );
      },
    };

    LEGACY_SECTION_DEFINITIONS[sectionId] = definition;
  }
}
