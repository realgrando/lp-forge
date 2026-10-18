"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const teamClassicGridSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columnsDesktop: z.enum(["2", "3", "4"]).default("3"),
  grayscale: z.boolean().default(false),
  ctaButton: buttonConfigSchema,
  members: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      image: z.string(),
      bio: z.string(),
      instagramUrl: z.string().optional(),
      linkedinUrl: z.string().optional(),
      websiteUrl: z.string().optional(),
    })
  ),
});

export type TeamClassicGridContent = z.infer<typeof teamClassicGridSchema>;

export const TeamClassicGridSection = createSection<TeamClassicGridContent>({
  id: "team.classic",
  name: "Equipe Professional Grid",
  description:
    "Grade clássica de especialistas com retrato 4:5, links sociais no hover, cargo e mini-biografia.",
  category: "Equipe",
  iconName: "Users",
  modes: ["LANDING_PAGE", "LINKTREE"],
  legacyType: "team",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "members", label: "Cards dos Membros" },
    { key: "memberBios", label: "Mini-Biografia dos Membros" },
    { key: "socialLinks", label: "Ícones de Redes Sociais" },
    { key: "ctaButton", label: "Botão de Ação Inferior" },
  ],
  contentSchema: teamClassicGridSchema,
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
        { value: "2", label: "2 Colunas" },
        { value: "3", label: "3 Colunas" },
        { value: "4", label: "4 Colunas" },
      ],
    },
    {
      key: "grayscale",
      label: "Fotos em P&B (Cor no Hover)",
      type: "toggle",
      optionalKey: "members",
    },
    {
      key: "members",
      label: "Membros da Equipe",
      type: "array",
      optionalKey: "members",
      defaultNewItem: {
        name: "Carlos Andrade",
        role: "Diretor Técnico",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
        bio: "Mais de 15 anos transformando visões em realidade com precisão e arte.",
        instagramUrl: "#",
        linkedinUrl: "#",
        websiteUrl: "",
      },
      itemFields: [
        { key: "name", label: "Nome Completo", type: "text" },
        { key: "role", label: "Cargo / Especialidade", type: "text" },
        { key: "image", label: "Foto do Membro", type: "image" },
        { key: "bio", label: "Pequena Biografia", type: "textarea" },
        { key: "linkedinUrl", label: "Link LinkedIn (Opcional)", type: "url" },
        { key: "instagramUrl", label: "Link Instagram (Opcional)", type: "url" },
        { key: "websiteUrl", label: "Link Site / Portfólio (Opcional)", type: "url" },
      ],
    },
    {
      key: "ctaButton",
      label: "Botão de Ação Inferior",
      type: "button",
      optionalKey: "ctaButton",
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
      badge: "NOSSA EQUIPE",
      headline: "Conheça os especialistas por trás da nossa excelência",
      subtitle:
        "Profissionais apaixonados por entregar os melhores resultados técnicos e estéticos em cada projeto.",
      columnsDesktop: "3",
      grayscale: false,
      ctaButton: {
        enabled: false,
        text: "Trabalhe Conosco",
        url: "#carreiras",
        variant: "outline",
        size: "md",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
      members: [
        {
          name: "Carlos Andrade",
          role: "Engenheiro Chefe",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
          bio: "Mais de 15 anos transformando visões complexas em realidade com precisão e segurança.",
          linkedinUrl: "#",
          instagramUrl: "#",
        },
        {
          name: "Mariana Silva",
          role: "Arquiteta Sênior",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
          bio: "Especialista em criar experiências que unem funcionalidade, conforto e design atemporal.",
          linkedinUrl: "#",
          instagramUrl: "#",
        },
        {
          name: "Rafael Mendes",
          role: "Diretor de Operações",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
          bio: "Liderança focada em cumprimento rigoroso de prazos e excelência operacional.",
          linkedinUrl: "#",
          instagramUrl: "#",
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
        ? "md:grid-cols-2 max-w-4xl mx-auto"
        : content.columnsDesktop === "4"
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

    return (
      <div className="space-y-14">
        {/* HEADER */}
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <EditableText
              isBadge
              defaultIconName="Users"
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
              className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight"
            />

            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="text-base sm:text-lg opacity-75"
            />
          </div>
        )}

        {/* TEAM GRID */}
        {!isHidden("members") && content.members && content.members.length > 0 && (
          <div className={cn("grid grid-cols-1 gap-8", gridColsClass)}>
            {content.members.map((m, idx) => (
              <div key={idx} className="group space-y-5">
                <div
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset)
                  )}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
                      content.grayscale && "grayscale group-hover:grayscale-0"
                    )}
                  />

                  {!isHidden("socialLinks") &&
                    (m.linkedinUrl || m.instagramUrl || m.websiteUrl) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="flex gap-3">
                          {m.linkedinUrl && (
                            <a
                              href={m.linkedinUrl}
                              className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:scale-105 transition-all"
                              style={{ backgroundColor: `${accentColor}CC`, color: "#09090B" }}
                              title="LinkedIn"
                            >
                              <DynamicIcon name="Link2" className="w-4 h-4" />
                            </a>
                          )}
                          {m.instagramUrl && (
                            <a
                              href={m.instagramUrl}
                              className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:scale-105 transition-all"
                              style={{ backgroundColor: `${accentColor}CC`, color: "#09090B" }}
                              title="Instagram"
                            >
                              <DynamicIcon name="ExternalLink" className="w-4 h-4" />
                            </a>
                          )}
                          {m.websiteUrl && (
                            <a
                              href={m.websiteUrl}
                              className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:scale-105 transition-all"
                              style={{ backgroundColor: `${accentColor}CC`, color: "#09090B" }}
                              title="Website"
                            >
                              <DynamicIcon name="Globe" className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                <div className="px-2 space-y-1.5">
                  <h3 className="text-xl font-black tracking-tight">{m.name}</h3>
                  <p
                    className="text-[11px] font-black uppercase tracking-[0.2em]"
                    style={{ color: accentColor }}
                  >
                    {m.role}
                  </p>
                  {!isHidden("memberBios") && m.bio && (
                    <p className="text-sm opacity-70 leading-relaxed pt-1 line-clamp-3">
                      {m.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
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
