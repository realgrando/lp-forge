"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const locationShowcaseSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  addressLabel: z.string(),
  address: z.string(),
  mapLinkText: z.string(),
  mapLinkUrl: z.string(),
  hoursTitle: z.string(),
  mapEmbedUrl: z.string(),
  floatingCta: buttonConfigSchema,
  serviceTags: z.array(
    z.object({
      label: z.string(),
      iconName: z.string().optional(),
    })
  ),
  hours: z.array(
    z.object({
      day: z.string(),
      time: z.string(),
      highlight: z.boolean(),
    })
  ),
});

export type LocationShowcaseContent = z.infer<typeof locationShowcaseSchema>;

export const LocationShowcaseSection = createSection<LocationShowcaseContent>({
  id: "location.showcase",
  name: "Localização Sede Showcase",
  description:
    "Apresentação cinematográfica da sede com cards de endereço, horários e mapa com CTA flutuante de navegação.",
  category: "Contato & Localização",
  iconName: "Navigation",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "addressCard", label: "Card de Localização" },
    { key: "hoursCard", label: "Card de Horários" },
    { key: "serviceTags", label: "Ícones de Serviços" },
    { key: "map", label: "Mapa Cinematográfico" },
    { key: "floatingCta", label: "Botão Flutuante GPS no Mapa" },
  ],
  contentSchema: locationShowcaseSchema,
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
      key: "addressLabel",
      label: "Etiqueta do Card de Endereço",
      type: "text",
      optionalKey: "addressCard",
      typographyElementKey: "addressLabel",
    },
    {
      key: "address",
      label: "Endereço Completo",
      type: "textarea",
      optionalKey: "addressCard",
      typographyElementKey: "address",
    },
    {
      key: "mapLinkText",
      label: "Texto do Link Rápido Maps",
      type: "text",
      optionalKey: "addressCard",
    },
    {
      key: "mapLinkUrl",
      label: "URL do Link Google Maps",
      type: "url",
      optionalKey: "addressCard",
    },
    {
      key: "hoursTitle",
      label: "Título do Card de Horários",
      type: "text",
      optionalKey: "hoursCard",
      typographyElementKey: "hoursTitle",
    },
    {
      key: "serviceTags",
      label: "Ícones de Serviço",
      type: "array",
      optionalKey: "serviceTags",
      defaultNewItem: {
        label: "Café VIP",
        iconName: "Sparkles",
      },
      itemFields: [
        { key: "label", label: "Descrição", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
      ],
    },
    {
      key: "hours",
      label: "Grade de Horários",
      type: "array",
      optionalKey: "hoursCard",
      defaultNewItem: {
        day: "Segunda a Sexta",
        time: "09h às 19h",
        highlight: true,
      },
      itemFields: [
        { key: "day", label: "Dia(s)", type: "text" },
        { key: "time", label: "Horário", type: "text" },
        { key: "highlight", label: "Destacar", type: "toggle" },
      ],
    },
    {
      key: "mapEmbedUrl",
      label: "URL Embed do Mapa",
      type: "url",
      optionalKey: "map",
    },
    {
      key: "floatingCta",
      label: "Botão Flutuante sobre o Mapa",
      type: "button",
      optionalKey: "floatingCta",
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
      badge: "GLOBAL PRESENCE",
      headline: "Onde a excelência se encontra.",
      subtitle:
        "Visite nosso espaço e experimente o padrão de qualidade que define nossos projetos.",
      addressLabel: "Localização",
      address: "Av. Paulista, 1000 - São Paulo, SP",
      mapLinkText: "Ver no Google Maps",
      mapLinkUrl: "https://maps.google.com",
      hoursTitle: "Horários",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197368545803!2d-46.65434522467006!3d-23.56133747880016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1714578500000!5m2!1spt-BR!2sbr",
      floatingCta: {
        enabled: true,
        text: "Iniciar Navegação GPS",
        url: "https://maps.google.com",
        variant: "solid",
        size: "lg",
        iconName: "ArrowUpRight",
        iconPosition: "right",
      },
      serviceTags: [
        { label: "Lounge Executivo", iconName: "Sparkles" },
        { label: "Segurança Privada", iconName: "ShieldCheck" },
      ],
      hours: [
        { day: "Segunda a Sexta", time: "09:00 - 19:00", highlight: true },
        { day: "Sábado", time: "10:00 - 15:00", highlight: false },
        { day: "Domingo", time: "Fechado", highlight: false },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showMap = !isHidden("map");

    return (
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* Lado Esquerdo: Informações e Horários */}
        <div
          className={cn(
            "space-y-8 w-full",
            showMap ? "lg:w-5/12" : "max-w-2xl mx-auto"
          )}
        >
          <div className="space-y-4">
            <EditableText
              isBadge
              defaultIconName="Globe"
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
              className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 text-base sm:text-lg leading-relaxed"
            />
          </div>

          {!isHidden("addressCard") && (
            <div
              className={cn(
                "p-8 transition-all",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{ backgroundColor: styles.customSurface || undefined }}
            >
              <div className="flex items-start gap-5">
                <div
                  className={cn(
                    "w-14 h-14 flex items-center justify-center shrink-0 border border-white/10",
                    getRadiusClass("md")
                  )}
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                >
                  <DynamicIcon name="MapPin" className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <EditableText
                    as="span"
                    value={content.addressLabel}
                    elementKey="addressLabel"
                    styles={styles}
                    className="block opacity-50 text-[10px] font-black uppercase tracking-[0.3em]"
                  />
                  <EditableText
                    as="p"
                    value={content.address}
                    elementKey="address"
                    styles={styles}
                    className="text-lg sm:text-xl font-bold leading-snug"
                  />
                  {content.mapLinkText && (
                    <a
                      href={content.mapLinkUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest pt-1 hover:translate-x-1 transition-transform"
                      style={{ color: accentColor }}
                    >
                      <span>{content.mapLinkText}</span>
                      <DynamicIcon name="Navigation" className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isHidden("hoursCard") && (
            <div
              className={cn(
                "overflow-hidden",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{ backgroundColor: styles.customSurface || undefined }}
            >
              <div className="p-7 border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon name="Clock" className="w-5 h-5" />
                  </div>
                  <EditableText
                    as="h3"
                    defaultIsHeading
                    value={content.hoursTitle}
                    elementKey="hoursTitle"
                    styles={styles}
                    className="text-xl font-black uppercase tracking-tighter"
                  />
                </div>

                {!isHidden("serviceTags") &&
                  content.serviceTags &&
                  content.serviceTags.length > 0 && (
                    <div className="flex gap-2">
                      {content.serviceTags.map((tag, i) => (
                        <div
                          key={i}
                          title={tag.label}
                          className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/10"
                          style={{ color: accentColor }}
                        >
                          <DynamicIcon
                            name={tag.iconName || "Sparkles"}
                            className="w-4 h-4"
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              <div className="p-4 space-y-1.5">
                {(content.hours || []).map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex justify-between items-center p-3.5 transition-all",
                      getRadiusClass("sm")
                    )}
                    style={
                      item.highlight
                        ? {
                            backgroundColor: `${accentColor}18`,
                            color: accentColor,
                          }
                        : undefined
                    }
                  >
                    <span className="text-xs font-black uppercase tracking-widest">
                      {item.day}
                    </span>
                    <span className="text-sm font-bold opacity-90">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lado Direito: Mapa Cinematográfico */}
        {showMap && (
          <div className="lg:w-7/12 w-full h-[520px] lg:h-[680px]">
            <div
              className={cn(
                "w-full h-full overflow-hidden relative shadow-2xl",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
            >
              {content.mapEmbedUrl ? (
                <iframe
                  src={content.mapEmbedUrl}
                  title="Mapa Sede"
                  className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <DynamicIcon name="Globe" className="w-16 h-16" />
                </div>
              )}

              {!isHidden("floatingCta") && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-3rem)] max-w-md flex justify-center">
                  <SmartButton
                    button={content.floatingCta}
                    elementKey="floatingCta"
                    styles={styles}
                    theme={theme}
                    className="w-full shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
});
