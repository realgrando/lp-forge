"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const contactEliteSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  infoTitle: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  formTitle: z.string(),
  formSubtitle: z.string(),
  servicesList: z.string(),
  submitButtonText: z.string(),
});

export type ContactEliteContent = z.infer<typeof contactEliteSchema>;

export const ContactEliteSection = createSection<ContactEliteContent>({
  id: "contact.elite",
  name: "Contato Elite Multi-Canais",
  description:
    "Seção de contato high-ticket com múltiplos canais (WhatsApp, E-mail, Escritório) e card de orçamento premium.",
  category: "Contato & Localização",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE"],
  toggleableElements: [
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal" },
    { key: "subtitle", label: "Subtítulo" },
    { key: "channels", label: "Lista de Canais de Atendimento" },
    { key: "form", label: "Card de Formulário Elite" },
  ],
  contentSchema: contactEliteSchema,
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
      key: "infoTitle",
      label: "Título dos Canais",
      type: "text",
      optionalKey: "channels",
      typographyElementKey: "infoTitle",
    },
    {
      key: "phone",
      label: "WhatsApp / Voz",
      type: "text",
      optionalKey: "channels",
    },
    {
      key: "email",
      label: "E-mail Corporativo",
      type: "text",
      optionalKey: "channels",
    },
    {
      key: "address",
      label: "Endereço do Escritório",
      type: "text",
      optionalKey: "channels",
    },
    {
      key: "formTitle",
      label: "Título do Formulário",
      type: "text",
      optionalKey: "form",
      typographyElementKey: "formTitle",
    },
    {
      key: "formSubtitle",
      label: "Subtítulo do Formulário",
      type: "text",
      optionalKey: "form",
      typographyElementKey: "formSubtitle",
    },
    {
      key: "servicesList",
      label: "Lista de Serviços (separe por vírgula)",
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
      badge: "PREMIUM SUPPORT",
      headline: "Vamos iniciar seu próximo grande projeto?",
      subtitle:
        "Estamos prontos para transformar sua visão em uma realidade de alto padrão. Entre em contato e receba uma consultoria exclusiva.",
      infoTitle: "Canais de Atendimento",
      phone: "(11) 99999-0000",
      email: "contato@nivix.com",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      formTitle: "Solicite um Orçamento",
      formSubtitle: "Preencha os dados abaixo e retornaremos em até 24h.",
      servicesList:
        "Consultoria Premium, Landing Page High-Ticket, Ecossistema Full Brand, Outros",
      submitButtonText: "Enviar Solicitação de Elite",
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
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
        {/* Coluna Esquerda: Conteúdo e Canais */}
        <div className="lg:w-5/12 space-y-10 w-full">
          <div className="space-y-5">
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

          {!isHidden("channels") && (
            <div className="space-y-6 pt-2">
              <EditableText
                as="h3"
                value={content.infoTitle}
                elementKey="infoTitle"
                styles={styles}
                className="opacity-50 text-xs font-black uppercase tracking-[0.3em]"
              />

              {content.phone && (
                <div className="flex items-center gap-5 group">
                  <div
                    className={cn(
                      "w-14 h-14 flex items-center justify-center border border-white/10 transition-transform group-hover:scale-105",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass("md")
                    )}
                    style={{ color: accentColor }}
                  >
                    <DynamicIcon name="Phone" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase opacity-50 font-black tracking-widest mb-0.5">
                      WhatsApp / Voz
                    </span>
                    <span className="text-xl sm:text-2xl font-black">
                      {content.phone}
                    </span>
                  </div>
                </div>
              )}

              {content.email && (
                <div className="flex items-center gap-5 group">
                  <div
                    className={cn(
                      "w-14 h-14 flex items-center justify-center border border-white/10 transition-transform group-hover:scale-105",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass("md")
                    )}
                    style={{ color: accentColor }}
                  >
                    <DynamicIcon name="Mail" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase opacity-50 font-black tracking-widest mb-0.5">
                      E-mail Corporativo
                    </span>
                    <span className="text-xl sm:text-2xl font-black">
                      {content.email}
                    </span>
                  </div>
                </div>
              )}

              {content.address && (
                <div className="flex items-center gap-5 group">
                  <div
                    className={cn(
                      "w-14 h-14 flex items-center justify-center border border-white/10 transition-transform group-hover:scale-105",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass("md")
                    )}
                    style={{ color: accentColor }}
                  >
                    <DynamicIcon name="MapPin" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase opacity-50 font-black tracking-widest mb-0.5">
                      Escritório Central
                    </span>
                    <span className="text-base font-bold max-w-xs block leading-snug">
                      {content.address}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Coluna Direita: Formulário Elite */}
        {!isHidden("form") && (
          <div className="lg:w-7/12 w-full">
            <div
              className={cn(
                "p-8 md:p-14 transition-all",
                getSurfaceClasses(surfaceStyle),
                getRadiusClass(radiusPreset)
              )}
              style={{
                backgroundColor: styles.customSurface || undefined,
                borderColor: `${accentColor}30`,
              }}
            >
              {sent ? (
                <div className="py-16 text-center space-y-6">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
                    style={{
                      backgroundColor: accentColor,
                      color: "#09090B",
                    }}
                  >
                    <DynamicIcon name="CheckCircle2" className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">
                    Mensagem Enviada!
                  </h3>
                  <p className="opacity-70 max-w-sm mx-auto">
                    Agradecemos o contato. Nossa equipe de especialistas
                    retornará em breve.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="px-8 py-3.5 border rounded-xl font-black uppercase text-[10px] tracking-widest"
                    style={{
                      borderColor: `${accentColor}50`,
                      color: accentColor,
                    }}
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <EditableText
                      as="h3"
                      defaultIsHeading
                      value={content.formTitle}
                      elementKey="formTitle"
                      styles={styles}
                      className="text-2xl sm:text-3xl font-black uppercase tracking-tighter"
                    />
                    <EditableText
                      as="p"
                      value={content.formSubtitle}
                      elementKey="formSubtitle"
                      styles={styles}
                      className="opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ml-2">
                          Nome Completo
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Seu nome"
                          className={cn(
                            "w-full bg-black/40 border border-white/10 p-4 text-sm font-semibold outline-none",
                            getRadiusClass("md")
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ml-2">
                          Telefone / WhatsApp
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="(00) 00000-0000"
                          className={cn(
                            "w-full bg-black/40 border border-white/10 p-4 text-sm font-semibold outline-none",
                            getRadiusClass("md")
                          )}
                        />
                      </div>
                    </div>

                    {services.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ml-2">
                          Selecione o Serviço
                        </label>
                        <select
                          className={cn(
                            "w-full bg-black/40 border border-white/10 p-4 text-sm font-semibold outline-none cursor-pointer",
                            getRadiusClass("md")
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
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ml-2">
                        Detalhes da sua necessidade
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Conte-nos brevemente sobre seu projeto..."
                        className={cn(
                          "w-full bg-black/40 border border-white/10 p-4 text-sm font-semibold outline-none resize-none",
                          getRadiusClass("md")
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      className={cn(
                        "w-full py-5 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:opacity-95",
                        getRadiusClass("md")
                      )}
                      style={{
                        backgroundColor: accentColor,
                        color: "#09090B",
                      }}
                    >
                      <span>{content.submitButtonText}</span>
                      <DynamicIcon name="Send" className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
});
