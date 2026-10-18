"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const teamBentoGridSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  ctaButton: buttonConfigSchema,
  members: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      image: z.string(),
      bio: z.string(),
      featuredLeader: z.boolean().optional(),
      instagramUrl: z.string().optional(),
      linkedinUrl: z.string().optional(),
      websiteUrl: z.string().optional(),
    })
  ),
});

export type TeamBentoGridContent = z.infer<typeof teamBentoGridSchema>;

export const TeamBentoGridSection = createSection<TeamBentoGridContent>({
  id: "team.bento",
  name: "Equipe Bento Squad",
  description:
    "Estrutura Bento Box assimétrica que destaca o fundador/líder principal em card duplo ao lado do restante do squad.",
  category: "Equipe",
  iconName: "LayoutGrid",
  modes: ["LANDING_PAGE"],
  legacyType: "team",
  legacyVariant: "v4",
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "members", label: "Mural Bento da Equipe" },
    { key: "memberBios", label: "Biografia no Hover" },
    { key: "socialLinks", label: "Links Sociais no Hover" },
    { key: "ctaButton", label: "Botão de Ação Inferior" },
  ],
  contentSchema: teamBentoGridSchema,
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
      key: "members",
      label: "Squad (1º Card = Líder em Destaque)",
      type: "array",
      optionalKey: "members",
      defaultNewItem: {
        name: "Bruno Costa",
        role: "Engenheiro de Operações",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
        bio: "Precisão absoluta em cada entrega.",
        featuredLeader: false,
        instagramUrl: "#",
        linkedinUrl: "#",
        websiteUrl: "",
      },
      itemFields: [
        { key: "name", label: "Nome Completo", type: "text" },
        { key: "role", label: "Cargo / Especialidade", type: "text" },
        { key: "image", label: "Foto do Membro", type: "image" },
        { key: "bio", label: "Pequena Bio", type: "textarea" },
        {
          key: "featuredLeader",
          label: "Destaque Principal (8 Colunas / 2 Linhas)",
          type: "toggle",
        },
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
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "SQUAD DE ELITE",
      headline: "O time de liderança por trás da operação",
      subtitle:
        "Estrutura multidisciplinar para dar atenção cirúrgica a cada etapa do seu projeto.",
      ctaButton: {
        enabled: false,
        text: "Conhecer Toda a Equipe",
        url: "#contato",
        variant: "outline",
        size: "md",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      members: [
        {
          name: "Arthur Nivix",
          role: "Founder & Master Architect",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900",
          bio: "Idealizador da metodologia que une engenharia de precisão, design autoral e alta conversão.",
          featuredLeader: true,
          instagramUrl: "#",
          linkedinUrl: "#",
        },
        {
          name: "Clara Mendes",
          role: "Head of Design",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
          bio: "Transformando estética em funcionalidade e valor percebido.",
          featuredLeader: false,
          instagramUrl: "#",
        },
        {
          name: "Bruno Costa",
          role: "Diretor de Engenharia",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
          bio: "Precisão absoluta e rigor técnico em cada entrega.",
          featuredLeader: false,
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

    return (
      <div className="space-y-14">
        {/* HEADER */}
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="max-w-2xl space-y-4">
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
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter"
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

        {/* BENTO SQUAD GRID */}
        {!isHidden("members") && content.members && content.members.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[260px]">
            {content.members.map((m, idx) => {
              const isMain =
                m.featuredLeader !== undefined ? m.featuredLeader : idx === 0;

              return (
                <div
                  key={idx}
                  className={cn(
                    "relative overflow-hidden group",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass(radiusPreset),
                    isMain
                      ? "md:col-span-8 md:row-span-2"
                      : "md:col-span-4 md:row-span-1"
                  )}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-end">
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3
                        className={cn(
                          "font-black text-white leading-none mb-1.5",
                          isMain ? "text-2xl sm:text-3xl" : "text-xl"
                        )}
                      >
                        {m.name}
                      </h3>
                      <p
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: accentColor }}
                      >
                        {m.role}
                      </p>

                      {!isHidden("memberBios") && m.bio && (
                        <p className="text-xs text-zinc-300 font-medium mt-3 line-clamp-2 max-w-md opacity-85 group-hover:opacity-100 transition-opacity">
                          {m.bio}
                        </p>
                      )}

                      {!isHidden("socialLinks") &&
                        (m.instagramUrl || m.linkedinUrl || m.websiteUrl) && (
                          <div className="flex gap-2.5 mt-4">
                            {m.instagramUrl && (
                              <a
                                href={m.instagramUrl}
                                className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                title="Instagram"
                              >
                                <DynamicIcon name="ExternalLink" className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {m.linkedinUrl && (
                              <a
                                href={m.linkedinUrl}
                                className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                title="LinkedIn"
                              >
                                <DynamicIcon name="Link2" className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {m.websiteUrl && (
                              <a
                                href={m.websiteUrl}
                                className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                title="Website"
                              >
                                <DynamicIcon name="Globe" className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA BUTTON */}
        {!isHidden("ctaButton") && content.ctaButton?.enabled && (
          <div className="flex justify-start">
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
