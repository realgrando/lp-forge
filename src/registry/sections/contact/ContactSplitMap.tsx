"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const contactSplitMapSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  mapUrl: z.string(),
  formTitle: z.string(),
  formButtonLabel: z.string(),
});

export type ContactSplitMapContent = z.infer<typeof contactSplitMapSchema>;

export const ContactSplitMapSection = createSection<ContactSplitMapContent>({
  id: "contact.split_map",
  name: "Contato Split + Mapa",
  description:
    "Layout dividido 50/50 com informações, formulário rápido à esquerda e mapa interativo à direita.",
  category: "Contato & Localização",
  iconName: "MapPin",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "contactInfo", label: "Endereço, Telefone e E-mail" },
    { key: "form", label: "Formulário de Mensagem" },
    { key: "map", label: "Mapa Interativo (Direita)" },
  ],
  contentSchema: contactSplitMapSchema,
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
      key: "address",
      label: "Endereço Completo",
      type: "textarea",
      optionalKey: "contactInfo",
    },
    {
      key: "phone",
      label: "Telefone",
      type: "text",
      optionalKey: "contactInfo",
    },
    {
      key: "email",
      label: "E-mail",
      type: "text",
      optionalKey: "contactInfo",
    },
    {
      key: "formTitle",
      label: "Título do Formulário",
      type: "text",
      optionalKey: "form",
      typographyElementKey: "formTitle",
    },
    {
      key: "formButtonLabel",
      label: "Texto do Botão do Formulário",
      type: "text",
      optionalKey: "form",
    },
    {
      key: "mapUrl",
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
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      badge: "VISITE-NOS",
      headline: "Estamos de portas abertas para você.",
      subtitle:
        "Venha conhecer nosso espaço ou envie uma mensagem para iniciar seu projeto.",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      phone: "+55 11 99999-9999",
      email: "contato@nivix.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197368545803!2d-46.65434522467006!3d-23.56133747880016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1714578500000!5m2!1spt-BR!2sbr",
      formTitle: "Envie uma mensagem",
      formButtonLabel: "Enviar Mensagem",
    },
  },
  Component: ({ content, styles, theme }) => {
    const [sent, setSent] = useState(false);
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const showMap = !isHidden("map");

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Lado Esquerdo: Informações e Formulário */}
        <div
          className={cn(
            "space-y-10 flex flex-col justify-center",
            showMap ? "lg:col-span-6" : "lg:col-span-12 max-w-2xl mx-auto w-full"
          )}
        >
          <div className="space-y-4">
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
              className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight"
            />
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="opacity-70 text-base sm:text-lg"
            />
          </div>

          {!isHidden("contactInfo") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.address && (
                <div className="flex gap-3.5 items-start">
                  <DynamicIcon
                    name="MapPin"
                    className="w-5 h-5 shrink-0 mt-1"
                    style={{ color: accentColor }}
                  />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">
                      Endereço
                    </h4>
                    <p className="font-bold text-sm opacity-90 leading-relaxed">
                      {content.address}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {content.phone && (
                  <div className="flex gap-3.5 items-center">
                    <DynamicIcon
                      name="Phone"
                      className="w-4 h-4 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span className="font-bold text-sm opacity-90">
                      {content.phone}
                    </span>
                  </div>
                )}
                {content.email && (
                  <div className="flex gap-3.5 items-center">
                    <DynamicIcon
                      name="Mail"
                      className="w-4 h-4 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span className="font-bold text-sm opacity-90">
                      {content.email}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isHidden("form") && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className={cn(
                "p-7 sm:p-8 space-y-5",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{ backgroundColor: styles.customSurface || undefined }}
            >
              <EditableText
                as="h3"
                defaultIsHeading
                value={content.formTitle}
                elementKey="formTitle"
                styles={styles}
                className="text-xl sm:text-2xl font-black"
              />

              <div className="space-y-3.5">
                <input
                  type="text"
                  placeholder="Seu Nome"
                  required
                  className={cn(
                    "w-full bg-black/40 border border-white/10 p-4 text-sm font-medium outline-none",
                    getRadiusClass("sm")
                  )}
                />
                <input
                  type="email"
                  placeholder="Seu E-mail"
                  required
                  className={cn(
                    "w-full bg-black/40 border border-white/10 p-4 text-sm font-medium outline-none",
                    getRadiusClass("sm")
                  )}
                />
                <textarea
                  placeholder="Como podemos ajudar?"
                  required
                  rows={3}
                  className={cn(
                    "w-full bg-black/40 border border-white/10 p-4 text-sm font-medium outline-none resize-none",
                    getRadiusClass("sm")
                  )}
                />

                <button
                  type="submit"
                  className={cn(
                    "w-full py-4 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all",
                    getRadiusClass(radiusPreset)
                  )}
                  style={{
                    backgroundColor: accentColor,
                    color: "#09090B",
                  }}
                >
                  <DynamicIcon
                    name={sent ? "CheckCircle2" : "Send"}
                    className="w-4 h-4"
                  />
                  <span>
                    {sent
                      ? "Mensagem Enviada!"
                      : content.formButtonLabel || "Enviar Mensagem"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Lado Direito: Mapa */}
        {showMap && (
          <div className="lg:col-span-6 min-h-[420px] h-full">
            <div
              className={cn(
                "w-full h-full min-h-[420px] relative overflow-hidden",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
            >
              {content.mapUrl ? (
                <iframe
                  src={content.mapUrl}
                  title="Mapa de Localização"
                  className="absolute inset-0 w-full h-full border-none grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-40 font-bold uppercase tracking-widest text-xs">
                  Mapa Indisponível
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
});
