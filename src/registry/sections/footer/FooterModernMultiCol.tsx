"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass } from "@/lib/utils";

const footerModernMultiColSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string(),
  slogan: z.string(),
  navLabel: z.string(),
  contactLabel: z.string(),
  phone: z.string(),
  email: z.string(),
  copyrightText: z.string(),
  engineSignature: z.string(),
  navigation: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
  socialLinks: z.array(
    z.object({
      iconName: z.string(),
      url: z.string(),
    })
  ),
});

export type FooterModernMultiColContent = z.infer<
  typeof footerModernMultiColSchema
>;

export const FooterModernMultiColSection =
  createSection<FooterModernMultiColContent>({
    id: "footer.modern",
    name: "Footer Modern Multi-Colunas",
    description:
      "Rodapé moderno em 12 colunas com tipografia expressiva, contatos diretos, links úteis e redes sociais.",
    category: "Footer",
    iconName: "Columns",
    modes: ["LANDING_PAGE"],
    toggleableElements: [
      { key: "brandName", label: "Marca / Logo" },
      { key: "slogan", label: "Slogan" },
      { key: "socialLinks", label: "Ícones de Redes Sociais" },
      { key: "navigation", label: "Coluna de Links Úteis" },
      { key: "contactInfo", label: "Coluna de Contato Direto" },
      { key: "copyrightText", label: "Copyright & Assinatura" },
    ],
    contentSchema: footerModernMultiColSchema,
    fields: [
      {
        key: "brandName",
        label: "Nome da Marca",
        type: "text",
        optionalKey: "brandName",
        typographyElementKey: "brandName",
      },
      {
        key: "logoImageUrl",
        label: "Imagem do Logo (Opcional)",
        type: "image",
        optionalKey: "brandName",
      },
      {
        key: "slogan",
        label: "Slogan de Impacto",
        type: "textarea",
        optionalKey: "slogan",
        typographyElementKey: "slogan",
      },
      {
        key: "socialLinks",
        label: "Redes Sociais",
        type: "array",
        optionalKey: "socialLinks",
        defaultNewItem: { iconName: "Instagram", url: "#" },
        itemFields: [
          { key: "iconName", label: "Ícone", type: "icon" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
      {
        key: "navLabel",
        label: "Título da Coluna de Links",
        type: "text",
        optionalKey: "navigation",
        typographyElementKey: "navLabel",
      },
      {
        key: "navigation",
        label: "Links Úteis",
        type: "array",
        optionalKey: "navigation",
        defaultNewItem: { label: "Portfólio", url: "#portfolio" },
        itemFields: [
          { key: "label", label: "Texto", type: "text" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
      {
        key: "contactLabel",
        label: "Título da Coluna de Contato",
        type: "text",
        optionalKey: "contactInfo",
        typographyElementKey: "contactLabel",
      },
      {
        key: "phone",
        label: "Telefone Direto",
        type: "text",
        optionalKey: "contactInfo",
      },
      {
        key: "email",
        label: "E-mail Direto",
        type: "text",
        optionalKey: "contactInfo",
      },
      {
        key: "copyrightText",
        label: "Texto de Copyright",
        type: "text",
        optionalKey: "copyrightText",
        typographyElementKey: "copyrightText",
      },
      {
        key: "engineSignature",
        label: "Assinatura Direita",
        type: "text",
        optionalKey: "copyrightText",
      },
    ],
    defaultData: {
      layout: {
        paddingY: "normal",
        containerWidth: "boxed",
      },
      styles: {
        ambientGlow: true,
        hiddenElements: {},
      },
      content: {
        brandName: "NIVIX STUDIO",
        logoImageUrl: "",
        slogan: "Impacto visual que vende todos os dias.",
        navLabel: "Links Úteis",
        contactLabel: "Contato Direct",
        phone: "+55 11 99999-9999",
        email: "contato@nivix.com",
        copyrightText: "© 2026 Nivix Studio. Todos os direitos reservados.",
        engineSignature: "Nivix Flexpages Engine v2.0",
        navigation: [
          { label: "Serviços", url: "#services" },
          { label: "Portfólio", url: "#portfolio" },
          { label: "Processo", url: "#process" },
          { label: "Contato", url: "#contato" },
        ],
        socialLinks: [
          { iconName: "Instagram", url: "#" },
          { iconName: "Linkedin", url: "#" },
          { iconName: "Globe", url: "#" },
        ],
      },
    },
    Component: ({ content, styles, theme }) => {
      const accentColor = styles.customAccent || theme.palette.accent;
      const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
      const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

      return (
        <footer className="border-t border-white/10 pt-14 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Coluna Esquerda: Branding & Social */}
            <div className="lg:col-span-5 space-y-6">
              {!isHidden("brandName") && (
                <div className="flex items-center gap-3">
                  {content.logoImageUrl && (
                    <img
                      src={content.logoImageUrl}
                      alt={content.brandName}
                      className="h-10 w-auto object-contain"
                    />
                  )}
                  <div className="flex items-center">
                    <EditableText
                      as="h2"
                      defaultIsHeading
                      value={content.brandName}
                      elementKey="brandName"
                      styles={styles}
                      className="text-3xl sm:text-4xl font-black uppercase tracking-tighter"
                    />
                    <span
                      className="text-3xl sm:text-4xl font-black"
                      style={{ color: accentColor }}
                    >
                      .
                    </span>
                  </div>
                </div>
              )}

              <EditableText
                as="p"
                value={content.slogan}
                elementKey="slogan"
                styles={styles}
                className="text-lg sm:text-xl font-medium opacity-65 leading-relaxed max-w-sm"
              />

              {!isHidden("socialLinks") &&
                content.socialLinks &&
                content.socialLinks.length > 0 && (
                  <div className="flex gap-3 pt-2">
                    {content.socialLinks.map((soc, idx) => (
                      <a
                        key={idx}
                        href={soc.url || "#"}
                        className={cn(
                          "w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all",
                          getRadiusClass(radiusPreset)
                        )}
                      >
                        <DynamicIcon
                          name={soc.iconName || "Instagram"}
                          className="w-5 h-5"
                        />
                      </a>
                    ))}
                  </div>
                )}
            </div>

            {/* Coluna Direita: Links & Contato */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {!isHidden("navigation") &&
                content.navigation &&
                content.navigation.length > 0 && (
                  <div className="space-y-6">
                    <EditableText
                      as="h4"
                      value={content.navLabel}
                      elementKey="navLabel"
                      styles={styles}
                      className="text-[10px] font-black uppercase tracking-widest opacity-40"
                    />
                    <ul className="space-y-3.5">
                      {content.navigation.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link.url || "#"}
                            className="text-base sm:text-lg font-bold opacity-65 hover:opacity-100 transition-opacity"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {!isHidden("contactInfo") && (
                <div className="space-y-6">
                  <EditableText
                    as="h4"
                    value={content.contactLabel}
                    elementKey="contactLabel"
                    styles={styles}
                    className="text-[10px] font-black uppercase tracking-widest opacity-40"
                  />
                  <div className="space-y-4">
                    {content.phone && (
                      <div className="flex items-center gap-3.5 opacity-80">
                        <DynamicIcon
                          name="Phone"
                          className="w-4 h-4 shrink-0"
                          style={{ color: accentColor }}
                        />
                        <span className="font-bold text-sm sm:text-base">
                          {content.phone}
                        </span>
                      </div>
                    )}
                    {content.email && (
                      <div className="flex items-center gap-3.5 opacity-80">
                        <DynamicIcon
                          name="Mail"
                          className="w-4 h-4 shrink-0"
                          style={{ color: accentColor }}
                        />
                        <span className="font-bold text-sm sm:text-base">
                          {content.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rodapé Inferior */}
          {!isHidden("copyrightText") && (
            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <EditableText
                as="span"
                value={content.copyrightText}
                elementKey="copyrightText"
                styles={styles}
                className="text-xs opacity-45"
              />

              {content.engineSignature && (
                <span className="text-[10px] font-black tracking-widest uppercase italic opacity-25">
                  {content.engineSignature}
                </span>
              )}
            </div>
          )}
        </footer>
      );
    },
  });
