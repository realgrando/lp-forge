"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const aboutFounderSchema = z.object({
  mediaPosition: z.enum(["left", "right"]).default("left"),
  portraitUrl: z.string(),
  badge: z.string(),
  headline: z.string(),
  personalQuote: z.string(),
  bioText: z.string(),
  founderName: z.string(),
  founderRole: z.string(),
  credentials: z.array(
    z.object({
      label: z.string(),
      iconName: z.string().optional(),
    })
  ),
  primaryCta: buttonConfigSchema,
});

export type AboutFounderContent = z.infer<typeof aboutFounderSchema>;

export const AboutFounderSection = createSection<AboutFounderContent>({
  id: "about.founder",
  name: "About Founder & Authority",
  description:
    "Apresentação de autoridade do fundador ou especialista com retrato, citação pessoal, bio detalhada, credenciais e CTA.",
  category: "Sobre",
  iconName: "User",
  modes: ["LANDING_PAGE"],
  legacyType: "about",
  legacyVariant: "v3",
  toggleableElements: [
    { key: "portrait", label: "Retrato do Fundador / Especialista" },
    { key: "quoteIcon", label: "Ícone de Aspas Decorativo" },
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "personalQuote", label: "Citação Pessoal" },
    { key: "bioText", label: "Biografia Detalhada" },
    { key: "authorSignature", label: "Assinatura (Nome e Cargo)" },
    { key: "credentials", label: "Selos de Credenciais" },
    { key: "primaryCta", label: "Botão de Ação (CTA)" },
  ],
  contentSchema: aboutFounderSchema,
  fields: [
    {
      key: "mediaPosition",
      label: "Lado do Retrato",
      type: "select",
      optionalKey: "portrait",
      options: [
        { value: "left", label: "Retrato na Esquerda" },
        { value: "right", label: "Retrato na Direita" },
      ],
    },
    {
      key: "portraitUrl",
      label: "Foto do Fundador / Especialista",
      type: "image",
      optionalKey: "portrait",
    },
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
      key: "personalQuote",
      label: "Citação Pessoal do Fundador",
      type: "textarea",
      optionalKey: "personalQuote",
      typographyElementKey: "personalQuote",
    },
    {
      key: "bioText",
      label: "Biografia / Visão",
      type: "textarea",
      optionalKey: "bioText",
      typographyElementKey: "bioText",
    },
    {
      key: "founderName",
      label: "Nome do Fundador / Especialista",
      type: "text",
      optionalKey: "authorSignature",
      typographyElementKey: "founderName",
    },
    {
      key: "founderRole",
      label: "Cargo / Registro Profissional",
      type: "text",
      optionalKey: "authorSignature",
      typographyElementKey: "founderRole",
    },
    {
      key: "credentials",
      label: "Credenciais / Certificações",
      type: "array",
      optionalKey: "credentials",
      defaultNewItem: {
        label: "Especialista Certificado",
        iconName: "Award",
      },
      itemFields: [
        { key: "label", label: "Credencial", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
      ],
    },
    {
      key: "primaryCta",
      label: "Botão de Ação (CTA)",
      type: "button",
      optionalKey: "primaryCta",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "spacious",
      containerWidth: "boxed",
    },
    styles: {
      ambientGlow: true,
      surfaceVariant: "glass",
      borderRadius: "lg",
      hiddenElements: {},
    },
    content: {
      mediaPosition: "left",
      portraitUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=900",
      badge: "LIDERANÇA & VISÃO",
      headline: "Visão técnica que transforma ambientes e negócios.",
      personalQuote:
        "“A excelência não é um ato isolado, mas o hábito de não aceitar nada menos que extraordinário em cada detalhe.”",
      bioText:
        "Com mais de uma década liderando projetos de alta complexidade, nossa missão é unir estética autoral, engenharia de precisão e atendimento consultivo próximo de cada cliente.",
      founderName: "Gustavo Nivix",
      founderRole: "CEO & Diretor de Engenharia",
      credentials: [
        { label: "+15 Anos de Experiência", iconName: "Award" },
        { label: "Membro do Conselho Técnico", iconName: "ShieldCheck" },
        { label: "Palestrante Internacional", iconName: "Globe" },
      ],
      primaryCta: {
        enabled: true,
        text: "Agendar Reunião Estratégica",
        url: "#contato",
        variant: "solid",
        size: "md",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showPortrait = !isHidden("portrait") && Boolean(content.portraitUrl);
    const isRightMedia = content.mediaPosition === "right";
    const showCredentials =
      !isHidden("credentials") &&
      content.credentials &&
      content.credentials.length > 0;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Retrato do Fundador */}
        {showPortrait && (
          <div
            className={cn(
              "lg:col-span-5 relative",
              isRightMedia && "lg:order-2"
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden aspect-[3/4] shadow-2xl",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
            >
              <img
                src={content.portraitUrl}
                alt={content.founderName || "Founder"}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              {!isHidden("authorSignature") && (
                <div className="absolute bottom-6 left-6 right-6">
                  <EditableText
                    as="div"
                    defaultIsHeading
                    value={content.founderName}
                    elementKey="founderName"
                    styles={styles}
                    className="text-xl font-black tracking-tight"
                  />
                  <EditableText
                    as="span"
                    value={content.founderRole}
                    elementKey="founderRole"
                    styles={styles}
                    className="block text-[10px] font-black uppercase tracking-widest mt-0.5"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Conteúdo de Autoridade */}
        <div
          className={cn(
            "space-y-6",
            showPortrait ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl mx-auto",
            isRightMedia && "lg:order-1"
          )}
        >
          <div className="flex items-center gap-4">
            {!isHidden("quoteIcon") && (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${accentColor}18`,
                  color: accentColor,
                }}
              >
                <DynamicIcon name="MessageSquare" className="w-5 h-5" />
              </div>
            )}

            <EditableText
              isBadge
              accentColor={accentColor}
              value={content.badge}
              elementKey="badge"
              styles={styles}
            />
          </div>

          <EditableText
            as="h2"
            defaultIsHeading
            value={content.headline}
            elementKey="headline"
            styles={styles}
            className="text-3xl sm:text-5xl font-black tracking-tighter leading-[1.06]"
          />

          <EditableText
            as="p"
            value={content.personalQuote}
            elementKey="personalQuote"
            styles={styles}
            className="text-lg sm:text-2xl font-serif italic opacity-90 leading-relaxed"
          />

          <EditableText
            as="p"
            value={content.bioText}
            elementKey="bioText"
            styles={styles}
            className="text-sm sm:text-base opacity-70 leading-relaxed whitespace-pre-line"
          />

          {/* Credenciais */}
          {showCredentials && (
            <div className="flex flex-wrap gap-3 pt-2">
              {content.credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-3.5 py-2 flex items-center gap-2 text-xs font-bold",
                    getSurfaceClasses(surfaceStyle),
                    getRadiusClass("full")
                  )}
                >
                  <DynamicIcon
                    name={cred.iconName || "Award"}
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: accentColor }}
                  />
                  <span>{cred.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Assinatura caso o retrato esteja oculto + CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
            {!isHidden("authorSignature") && (
              <div>
                <EditableText
                  as="div"
                  defaultIsHeading
                  value={content.founderName}
                  elementKey="founderName"
                  styles={styles}
                  className="text-lg font-black tracking-tight"
                />
                <EditableText
                  as="span"
                  value={content.founderRole}
                  elementKey="founderRole"
                  styles={styles}
                  className="block text-[10px] font-black uppercase tracking-widest opacity-70"
                />
              </div>
            )}

            {!isHidden("primaryCta") && content.primaryCta?.enabled && (
              <SmartButton
                button={content.primaryCta}
                elementKey="primaryCta"
                styles={styles}
                theme={theme}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
});
