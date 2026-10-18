"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const locationSimpleMapSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  addressTitle: z.string(),
  address: z.string(),
  hoursTitle: z.string(),
  mapEmbedUrl: z.string(),
  gpsCta: buttonConfigSchema,
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

export type LocationSimpleMapContent = z.infer<typeof locationSimpleMapSchema>;

export const LocationSimpleMapSection = createSection<LocationSimpleMapContent>({
  id: "location.simple_map",
  name: "Localização & Horários",
  description:
    "Seção de localização física com card de endereço, tabela de horários de funcionamento, tags de serviço e mapa Google.",
  category: "Contato & Localização",
  iconName: "Clock",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "addressCard", label: "Card de Endereço" },
    { key: "hoursCard", label: "Card de Horários" },
    { key: "serviceTags", label: "Tags de Serviço" },
    { key: "gpsCta", label: "Botão de Rota GPS" },
    { key: "map", label: "Mapa Incorporado" },
  ],
  contentSchema: locationSimpleMapSchema,
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
      key: "addressTitle",
      label: "Título do Card de Endereço",
      type: "text",
      optionalKey: "addressCard",
      typographyElementKey: "addressTitle",
    },
    {
      key: "address",
      label: "Endereço Completo",
      type: "textarea",
      optionalKey: "addressCard",
      typographyElementKey: "address",
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
      label: "Tags de Serviço (Ex: Estacionamento, Wi-Fi)",
      type: "array",
      optionalKey: "serviceTags",
      defaultNewItem: {
        label: "Estacionamento",
        iconName: "Check",
      },
      itemFields: [
        { key: "label", label: "Rótulo da Tag", type: "text" },
        { key: "iconName", label: "Ícone", type: "icon" },
      ],
    },
    {
      key: "hours",
      label: "Horários de Funcionamento",
      type: "array",
      optionalKey: "hoursCard",
      defaultNewItem: {
        day: "Segunda a Sexta",
        time: "09:00 - 18:00",
        highlight: false,
      },
      itemFields: [
        { key: "day", label: "Dia(s)", type: "text" },
        { key: "time", label: "Horário", type: "text" },
        { key: "highlight", label: "Destacar Linha", type: "toggle" },
      ],
    },
    {
      key: "gpsCta",
      label: "Botão de Traçar Rota GPS",
      type: "button",
      optionalKey: "gpsCta",
    },
    {
      key: "mapEmbedUrl",
      label: "Google Maps Embed URL",
      type: "url",
      optionalKey: "map",
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
      badge: "NOSSO ESPAÇO",
      headline: "Localização & Horários.",
      subtitle: "Visite nossa sede ou trace sua rota diretamente no GPS.",
      addressTitle: "Endereço",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      hoursTitle: "Horários",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197368545803!2d-46.65434522467006!3d-23.56133747880016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1714578500000!5m2!1spt-BR!2sbr",
      gpsCta: {
        enabled: true,
        text: "Traçar Rota no GPS",
        url: "https://maps.google.com",
        variant: "solid",
        size: "lg",
        iconName: "Navigation",
        iconPosition: "right",
      },
      serviceTags: [
        { label: "Valet no Local", iconName: "ShieldCheck" },
        { label: "Café Executivo", iconName: "Sparkles" },
      ],
      hours: [
        { day: "Segunda a Sexta", time: "09:00 às 19:00", highlight: true },
        { day: "Sábados", time: "09:00 às 14:00", highlight: false },
        { day: "Domingos e Feriados", time: "Fechado", highlight: false },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showMap = !isHidden("map") && Boolean(content.mapEmbedUrl);

    return (
      <div className="space-y-14">
        {(!isHidden("badge") || !isHidden("headline") || !isHidden("subtitle")) && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <EditableText
              isBadge
              defaultIconName="MapPin"
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
              className="text-3xl md:text-5xl font-black tracking-tight"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 text-base sm:text-lg"
            />
          </div>
        )}

        <div
          className={cn(
            "grid grid-cols-1 gap-10 items-stretch",
            showMap ? "lg:grid-cols-2" : "max-w-2xl mx-auto"
          )}
        >
          {/* Coluna 1: Info */}
          <div className="flex flex-col justify-center gap-6">
            {!isHidden("addressCard") && (
              <div
                className={cn(
                  "flex items-start gap-4 p-6",
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset)
                )}
                style={{ backgroundColor: styles.customSurface || undefined }}
              >
                <div
                  className="p-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                >
                  <DynamicIcon name="MapPin" className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <EditableText
                    as="h3"
                    defaultIsHeading
                    value={content.addressTitle}
                    elementKey="addressTitle"
                    styles={styles}
                    className="text-lg font-bold"
                  />
                  <EditableText
                    as="p"
                    value={content.address}
                    elementKey="address"
                    styles={styles}
                    className="opacity-75 text-sm sm:text-base leading-relaxed"
                  />
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
                <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-full shrink-0"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      <DynamicIcon name="Clock" className="w-6 h-6" />
                    </div>
                    <EditableText
                      as="h3"
                      defaultIsHeading
                      value={content.hoursTitle}
                      elementKey="hoursTitle"
                      styles={styles}
                      className="text-lg font-bold"
                    />
                  </div>

                  {!isHidden("serviceTags") &&
                    content.serviceTags &&
                    content.serviceTags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {content.serviceTags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-bold text-[11px] uppercase tracking-wider"
                            style={{
                              backgroundColor: `${accentColor}12`,
                              borderColor: `${accentColor}30`,
                              color: accentColor,
                            }}
                          >
                            <DynamicIcon
                              name={tag.iconName || "Check"}
                              className="w-3 h-3"
                            />
                            <span>{tag.label}</span>
                          </span>
                        ))}
                      </div>
                    )}
                </div>

                <div className="divide-y divide-white/5">
                  {(content.hours || []).map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-4 px-6 text-sm"
                      style={
                        item.highlight
                          ? { backgroundColor: `${accentColor}0D` }
                          : undefined
                      }
                    >
                      <span
                        className="font-semibold"
                        style={{
                          color: item.highlight ? accentColor : undefined,
                        }}
                      >
                        {item.day}
                      </span>
                      <span
                        className={cn(
                          "font-bold",
                          !item.highlight && "opacity-70"
                        )}
                      >
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isHidden("gpsCta") && (
              <div className="pt-2">
                <SmartButton
                  button={content.gpsCta}
                  elementKey="gpsCta"
                  styles={styles}
                  theme={theme}
                />
              </div>
            )}
          </div>

          {/* Coluna 2: Mapa */}
          {showMap && (
            <div
              className={cn(
                "min-h-[380px] h-full w-full overflow-hidden relative",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
            >
              <iframe
                src={content.mapEmbedUrl}
                title="Localização no Mapa"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>
    );
  },
});
