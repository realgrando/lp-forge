"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const contactClassicSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  phone: z.string(),
  email: z.string(),
  servicesList: z.string(),
  submitButtonText: z.string(),
});

export type ContactClassicContent = z.infer<typeof contactClassicSchema>;

export const ContactClassicSection = createSection<ContactClassicContent>({
  id: "contact.classic",
  name: "Contato Clássico & Formulário",
  description:
    "Seção de contato direta com canais de atendimento à esquerda e formulário objetivo à direita.",
  category: "Contato & Localização",
  iconName: "Mail",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "contactInfo", label: "Canais de Telefone e E-mail" },
    { key: "form", label: "Formulário de Contato" },
  ],
  contentSchema: contactClassicSchema,
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
      key: "phone",
      label: "Telefone / WhatsApp",
      type: "text",
      optionalKey: "contactInfo",
    },
    {
      key: "email",
      label: "E-mail de Atendimento",
      type: "text",
      optionalKey: "contactInfo",
    },
    {
      key: "servicesList",
      label: "Opções de Serviço no Select (separe por vírgula)",
      type: "textarea",
      optionalKey: "form",
    },
    {
      key: "submitButtonText",
      label: "Texto do Botão de Envio",
      type: "text",
      optionalKey: "form",
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
      badge: "ATENDIMENTO DIRETO",
      headline: "Vamos iniciar seu projeto?",
      subtitle:
        "Entre em contato hoje mesmo para um orçamento personalizado e sem compromisso.",
      phone: "(11) 99999-0000",
      email: "contato@nivix.com",
      servicesList: "Landing Page High-Ticket, Bio 3D Executive, Ecossistema Completo",
      submitButtonText: "Enviar Solicitação",
    },
  },
  Component: ({ content, styles, theme }) => {
    const [sent, setSent] = useState(false);
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    const services = (content.servicesList || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <div
        id="contato"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Lado Esquerdo: Texto e Info */}
        <div
          className={cn(
            "space-y-8",
            !isHidden("form") ? "lg:col-span-6" : "lg:col-span-12 max-w-2xl mx-auto"
          )}
        >
          <div className="space-y-4">
            <EditableText
              isBadge
              defaultIconName="PhoneCall"
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
              className="opacity-75 text-base sm:text-lg leading-relaxed max-w-lg"
            />
          </div>

          {!isHidden("contactInfo") && (
            <div className="space-y-6 pt-4">
              {content.phone && (
                <div className="flex items-center gap-5">
                  <div
                    className={cn(
                      "w-14 h-14 flex items-center justify-center shrink-0",
                      getRadiusClass("md")
                    )}
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon name="Phone" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase opacity-50 font-black tracking-widest mb-1">
                      Ligue agora / WhatsApp
                    </span>
                    <span className="text-lg sm:text-xl font-bold">
                      {content.phone}
                    </span>
                  </div>
                </div>
              )}

              {content.email && (
                <div className="flex items-center gap-5">
                  <div
                    className={cn(
                      "w-14 h-14 flex items-center justify-center shrink-0",
                      getRadiusClass("md")
                    )}
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    <DynamicIcon name="Mail" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase opacity-50 font-black tracking-widest mb-1">
                      E-mail
                    </span>
                    <span className="text-lg sm:text-xl font-bold">
                      {content.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lado Direito: Formulário */}
        {!isHidden("form") && (
          <div className="lg:col-span-6 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className={cn(
                "p-8 md:p-10 space-y-6",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{ backgroundColor: styles.customSurface || undefined }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest opacity-60">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João Silva"
                    className={cn(
                      "w-full bg-black/30 border border-white/10 p-4 text-sm outline-none transition-colors",
                      getRadiusClass("sm")
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest opacity-60">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    className={cn(
                      "w-full bg-black/30 border border-white/10 p-4 text-sm outline-none transition-colors",
                      getRadiusClass("sm")
                    )}
                  />
                </div>
              </div>

              {services.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest opacity-60">
                    Qual serviço você precisa?
                  </label>
                  <select
                    className={cn(
                      "w-full bg-black/30 border border-white/10 p-4 text-sm outline-none transition-colors cursor-pointer",
                      getRadiusClass("sm")
                    )}
                  >
                    {services.map((service, i) => (
                      <option
                        key={i}
                        value={service}
                        className="bg-zinc-900 text-white"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest opacity-60">
                  Detalhes do Projeto
                </label>
                <textarea
                  rows={4}
                  placeholder="Conte-nos um pouco sobre o que você precisa..."
                  className={cn(
                    "w-full bg-black/30 border border-white/10 p-4 text-sm outline-none transition-colors resize-none",
                    getRadiusClass("sm")
                  )}
                />
              </div>

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
                    ? "Solicitação Recebida!"
                    : content.submitButtonText || "Enviar Solicitação"}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    );
  },
});
