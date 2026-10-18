"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const teamArtisanCircularSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columnsDesktop: z.enum(["2", "3", "4"]).default("3"),
  grayscale: z.boolean().default(true),
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

export type TeamArtisanCircularContent = z.infer<
  typeof teamArtisanCircularSchema
>;

export const TeamArtisanCircularSection =
  createSection<TeamArtisanCircularContent>({
    id: "team.artisan",
    name: "Equipe Artisan Circular",
    description:
      "Apresentação autoral minimalista com retratos circulares emoldurados, cargo destacado e links sociais discretos.",
    category: "Equipe",
    iconName: "UserCheck",
    modes: ["LANDING_PAGE", "LINKTREE"],
    legacyType: "team",
    legacyVariant: "v3",
    toggleableElements: [
      { key: "badge", label: "Badge Superior" },
      { key: "headline", label: "Título Principal" },
      { key: "subtitle", label: "Subtítulo" },
      { key: "members", label: "Retratos Circulares da Equipe" },
      { key: "memberBios", label: "Biografia Curta" },
      { key: "socialLinks", label: "Ícones Sociais" },
      { key: "ctaButton", label: "Botão de Ação Inferior" },
    ],
    contentSchema: teamArtisanCircularSchema,
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
          name: "Luiza Helena",
          role: "Arquiteta de Interiores",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
          bio: "Combinando estética autoral e funcionalidade em cada criação artesanal.",
          instagramUrl: "#",
          linkedinUrl: "#",
          websiteUrl: "",
        },
        itemFields: [
          { key: "name", label: "Nome", type: "text" },
          { key: "role", label: "Cargo / Especialidade", type: "text" },
          { key: "image", label: "Foto Circular", type: "image" },
          { key: "bio", label: "Biografia Curta", type: "textarea" },
          { key: "instagramUrl", label: "Link Instagram", type: "url" },
          { key: "linkedinUrl", label: "Link LinkedIn", type: "url" },
          { key: "websiteUrl", label: "Link Site", type: "url" },
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
        ambientGlow: false,
        hiddenElements: {},
      },
      content: {
        badge: "THE CRAFTSMEN",
        headline: "Mãos e mentes que transformam visões",
        subtitle:
          "A excelência está nos detalhes e no talento individual de quem faz acontecer todos os dias.",
        columnsDesktop: "3",
        grayscale: true,
        ctaButton: {
          enabled: false,
          text: "Agendar Reunião com o Time",
          url: "#contato",
          variant: "outline",
          size: "md",
          iconName: "Calendar",
          iconPosition: "left",
        },
        members: [
          {
            name: "Luiza Valente",
            role: "Diretora de Arte & Interiores",
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
            bio: "Combinando estética minimalista e funcionalidade em cada criação artesanal.",
            instagramUrl: "#",
            linkedinUrl: "#",
          },
          {
            name: "Mestre Jonas",
            role: "Especialista em Execução",
            image:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
            bio: "O segredo do acabamento perfeito e da estrutura de alta durabilidade.",
            instagramUrl: "#",
            linkedinUrl: "#",
          },
          {
            name: "Fábio Nogueira",
            role: "Gerente de Projetos",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
            bio: "Gestão impecável de ponta a ponta e harmonização completa para o seu projeto.",
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
        content.columnsDesktop === "2"
          ? "sm:grid-cols-2 max-w-3xl mx-auto"
          : content.columnsDesktop === "4"
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "sm:grid-cols-2 lg:grid-cols-3";

      return (
        <div className="space-y-16">
          {/* HEADER */}
          {(!isHidden("badge") ||
            !isHidden("headline") ||
            !isHidden("subtitle")) && (
            <div className="text-center max-w-2xl mx-auto space-y-4">
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
                className="text-3xl sm:text-5xl font-black tracking-tight"
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

          {/* CIRCULAR ARTISAN GRID */}
          {!isHidden("members") &&
            content.members &&
            content.members.length > 0 && (
              <div className={cn("grid grid-cols-1 gap-10", gridColsClass)}>
                {content.members.map((m, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex flex-col items-center text-center p-8 group transition-all",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass(radiusPreset)
                    )}
                    style={{
                      backgroundColor: styles.customSurface || undefined,
                    }}
                  >
                    <div
                      className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-6 border-4 shadow-xl transition-all duration-500 relative"
                      style={{ borderColor: `${accentColor}40` }}
                    >
                      <img
                        src={m.image}
                        alt={m.name}
                        className={cn(
                          "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                          content.grayscale && "grayscale group-hover:grayscale-0"
                        )}
                      />
                    </div>

                    <h3 className="text-2xl font-black mb-1">{m.name}</h3>
                    <p
                      className="text-[10px] font-black uppercase tracking-widest mb-4"
                      style={{ color: accentColor }}
                    >
                      {m.role}
                    </p>

                    {!isHidden("memberBios") && m.bio && (
                      <p className="text-sm opacity-70 leading-relaxed mb-6 max-w-[250px]">
                        {m.bio}
                      </p>
                    )}

                    {!isHidden("socialLinks") &&
                      (m.instagramUrl || m.linkedinUrl || m.websiteUrl) && (
                        <div className="flex gap-4 mt-auto">
                          {m.instagramUrl && (
                            <a
                              href={m.instagramUrl}
                              className="opacity-50 hover:opacity-100 transition-opacity"
                              style={{ color: accentColor }}
                              title="Instagram"
                            >
                              <DynamicIcon name="ExternalLink" className="w-4 h-4" />
                            </a>
                          )}
                          {m.linkedinUrl && (
                            <a
                              href={m.linkedinUrl}
                              className="opacity-50 hover:opacity-100 transition-opacity"
                              style={{ color: accentColor }}
                              title="LinkedIn"
                            >
                              <DynamicIcon name="Link2" className="w-4 h-4" />
                            </a>
                          )}
                          {m.websiteUrl && (
                            <a
                              href={m.websiteUrl}
                              className="opacity-50 hover:opacity-100 transition-opacity"
                              style={{ color: accentColor }}
                              title="Website"
                            >
                              <DynamicIcon name="Globe" className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}

          {/* CTA BUTTON */}
          {!isHidden("ctaButton") && content.ctaButton?.enabled && (
            <div className="flex justify-center">
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
