"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const teamImpactCardsSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columnsDesktop: z.enum(["2", "3"]).default("2"),
  ctaButton: buttonConfigSchema,
  members: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      image: z.string(),
      bio: z.string(),
      instagramUrl: z.string().optional(),
      linkedinUrl: z.string().optional(),
    })
  ),
});

export type TeamImpactCardsContent = z.infer<typeof teamImpactCardsSchema>;

export const TeamImpactCardsSection = createSection<TeamImpactCardsContent>({
  id: "team.impact",
  name: "Equipe Impact Experts",
  description:
    "Cards horizontais panorâmicos (16:10) de alto impacto com nome embutido na imagem, redes sociais e citação lateral.",
  category: "Equipe",
  iconName: "Award",
  modes: ["LANDING_PAGE"],
  legacyType: "team",
  legacyVariant: "v2",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo Lateral" },
    { key: "members", label: "Cards Horizontais de Especialistas" },
    { key: "memberBios", label: "Frase/Bio Abaixo da Foto" },
    { key: "socialLinks", label: "Botões Sociais no Card" },
    { key: "ctaButton", label: "Botão de Ação" },
  ],
  contentSchema: teamImpactCardsSchema,
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
      optionalKey: "members",
      options: [
        { value: "2", label: "2 Colunas Amplas" },
        { value: "3", label: "3 Colunas" },
      ],
    },
    {
      key: "members",
      label: "Especialistas de Elite",
      type: "array",
      optionalKey: "members",
      defaultNewItem: {
        name: "Roberto Alencar",
        role: "Diretor de Engenharia",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
        bio: "Garantindo que cada estrutura seja eterna, segura e impecável.",
        instagramUrl: "#",
        linkedinUrl: "#",
      },
      itemFields: [
        { key: "name", label: "Nome", type: "text" },
        { key: "role", label: "Cargo / Especialidade", type: "text" },
        { key: "image", label: "Foto Horizontal (16:10)", type: "image" },
        { key: "bio", label: "Citação / Bio Curta", type: "textarea" },
        { key: "instagramUrl", label: "URL Instagram", type: "url" },
        { key: "linkedinUrl", label: "URL LinkedIn", type: "url" },
      ],
    },
    {
      key: "ctaButton",
      label: "Botão de Ação",
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
      badge: "THE MASTERS",
      headline: "Paixão por construir e liderar com excelência",
      subtitle:
        "Uma equipe sênior focada em transformar desafios complexos em entregas extraordinárias.",
      columnsDesktop: "2",
      ctaButton: {
        enabled: false,
        text: "Conhecer Nossa Cultura",
        url: "#sobre",
        variant: "outline",
        size: "md",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
      members: [
        {
          name: "Ricardo Vasconcelos",
          role: "Managing Partner / Head Strategist",
          image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800",
          bio: "Domina a arquitetura de negócios e execução de alta precisão há mais de duas décadas.",
          instagramUrl: "#",
          linkedinUrl: "#",
        },
        {
          name: "Eng. Roberto Prado",
          role: "Diretor de Operações & Obras",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
          bio: "Garantindo que cada estrutura e sistema entregue supere todos os padrões normativos.",
          instagramUrl: "#",
          linkedinUrl: "#",
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
      content.columnsDesktop === "3"
        ? "md:grid-cols-2 lg:grid-cols-3"
        : "md:grid-cols-2";

    return (
      <div className="space-y-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl space-y-4">
            <EditableText
              isBadge
              defaultIconName="Sparkles"
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
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]"
            />
          </div>

          <div className="space-y-4 max-w-sm">
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-70"
            />
            {!isHidden("ctaButton") && content.ctaButton?.enabled && (
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
              />
            )}
          </div>
        </div>

        {/* IMPACT CARDS */}
        {!isHidden("members") && content.members && content.members.length > 0 && (
          <div className={cn("grid grid-cols-1 gap-10", gridColsClass)}>
            {content.members.map((m, idx) => (
              <div key={idx} className="group space-y-6">
                <div
                  className={cn(
                    "relative overflow-hidden aspect-[16/10]",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-7 sm:p-9 flex justify-between items-end gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 leading-none">
                        {m.name}
                      </h3>
                      <p
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: accentColor }}
                      >
                        {m.role}
                      </p>
                    </div>

                    {!isHidden("socialLinks") &&
                      (m.instagramUrl || m.linkedinUrl) && (
                        <div className="flex gap-2 shrink-0">
                          {m.instagramUrl && (
                            <a
                              href={m.instagramUrl}
                              className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                              title="Instagram"
                            >
                              <DynamicIcon name="ExternalLink" className="w-4 h-4" />
                            </a>
                          )}
                          {m.linkedinUrl && (
                            <a
                              href={m.linkedinUrl}
                              className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                              title="LinkedIn"
                            >
                              <DynamicIcon name="Link2" className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                  </div>
                </div>

                {!isHidden("memberBios") && m.bio && (
                  <div className="px-2 flex gap-5 items-center">
                    <div
                      className="w-1 h-12 rounded-full shrink-0"
                      style={{ backgroundColor: `${accentColor}80` }}
                    />
                    <p className="text-sm sm:text-base opacity-75 italic leading-relaxed flex-1">
                      &ldquo;{m.bio}&rdquo;
                    </p>
                    <div
                      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all shrink-0"
                      style={{ color: accentColor }}
                    >
                      <DynamicIcon name="ArrowUpRight" className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});
