"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn, getRadiusClass } from "@/lib/utils";

const footerClassicSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string(),
  slogan: z.string(),
  navTitle: z.string(),
  socialTitle: z.string(),
  copyrightText: z.string(),
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
  legalLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
});

export type FooterClassicContent = z.infer<typeof footerClassicSchema>;

export const FooterClassicSection = createSection<FooterClassicContent>({
  id: "footer.classic",
  name: "Footer Classic Brand",
  description:
    "Rodapé corporativo clássico com logotipo, slogan, coluna de navegação, ícones sociais e links legais.",
  category: "Footer",
  iconName: "Layout",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "brandName", label: "Marca / Logo" },
    { key: "slogan", label: "Slogan da Empresa" },
    { key: "navigation", label: "Menu de Navegação" },
    { key: "socialLinks", label: "Redes Sociais" },
    { key: "copyrightText", label: "Texto de Copyright" },
    { key: "legalLinks", label: "Links Legais (Privacidade / Termos)" },
  ],
  contentSchema: footerClassicSchema,
  fields: [
    {
      key: "brandName",
      label: "Texto da Marca",
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
      label: "Slogan da Marca",
      type: "textarea",
      optionalKey: "slogan",
      typographyElementKey: "slogan",
    },
    {
      key: "navTitle",
      label: "Título do Menu",
      type: "text",
      optionalKey: "navigation",
      typographyElementKey: "navTitle",
    },
    {
      key: "navigation",
      label: "Links de Navegação",
      type: "array",
      optionalKey: "navigation",
      defaultNewItem: { label: "Início", url: "#top" },
      itemFields: [
        { key: "label", label: "Rótulo", type: "text" },
        { key: "url", label: "URL ou Âncora (#)", type: "url" },
      ],
    },
    {
      key: "socialTitle",
      label: "Título das Redes Sociais",
      type: "text",
      optionalKey: "socialLinks",
      typographyElementKey: "socialTitle",
    },
    {
      key: "socialLinks",
      label: "Redes Sociais",
      type: "array",
      optionalKey: "socialLinks",
      defaultNewItem: { iconName: "Instagram", url: "#" },
      itemFields: [
        { key: "iconName", label: "Ícone", type: "icon" },
        { key: "url", label: "URL do Perfil", type: "url" },
      ],
    },
    {
      key: "copyrightText",
      label: "Texto de Copyright",
      type: "text",
      optionalKey: "copyrightText",
      typographyElementKey: "copyrightText",
    },
    {
      key: "legalLinks",
      label: "Links Legais",
      type: "array",
      optionalKey: "legalLinks",
      defaultNewItem: { label: "Política de Privacidade", url: "#" },
      itemFields: [
        { key: "label", label: "Texto", type: "text" },
        { key: "url", label: "URL", type: "url" },
      ],
    },
  ],
  defaultData: {
    layout: {
      paddingY: "normal",
      containerWidth: "boxed",
    },
    styles: {
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      brandName: "NIVIX FLEXPAGES",
      logoImageUrl: "",
      slogan: "Construindo o futuro do design digital de alta conversão.",
      navTitle: "Navegação",
      socialTitle: "Siga-nos",
      copyrightText: "© 2026 Nivix Flexpages. Todos os direitos reservados.",
      navigation: [
        { label: "Home", url: "#home" },
        { label: "Sobre", url: "#about" },
        { label: "Planos", url: "#planos" },
        { label: "Contato", url: "#contato" },
      ],
      socialLinks: [
        { iconName: "Instagram", url: "#" },
        { iconName: "Linkedin", url: "#" },
        { iconName: "Globe", url: "#" },
      ],
      legalLinks: [
        { label: "Política de Privacidade", url: "#" },
        { label: "Termos de Uso", url: "#" },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const accentColor = styles.customAccent || theme.palette.accent;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    return (
      <footer className="border-t border-white/10 pt-12 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Branding */}
          <div className="max-w-md space-y-4">
            {!isHidden("brandName") && (
              <div className="flex items-center gap-3">
                {content.logoImageUrl && (
                  <img
                    src={content.logoImageUrl}
                    alt={content.brandName}
                    className="h-9 w-auto object-contain"
                  />
                )}
                <div className="flex items-center">
                  <EditableText
                    as="h2"
                    defaultIsHeading
                    value={content.brandName}
                    elementKey="brandName"
                    styles={styles}
                    className="text-2xl font-black uppercase tracking-tighter"
                  />
                  <span
                    className="text-2xl font-black"
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
              className="opacity-65 text-sm sm:text-base leading-relaxed"
            />
          </div>

          {/* Navegação e Redes */}
          <div className="flex flex-wrap gap-14">
            {!isHidden("navigation") &&
              content.navigation &&
              content.navigation.length > 0 && (
                <div className="space-y-4">
                  <EditableText
                    as="h4"
                    value={content.navTitle}
                    elementKey="navTitle"
                    styles={styles}
                    className="text-[10px] font-black uppercase tracking-widest opacity-40"
                  />
                  <ul className="space-y-2.5">
                    {content.navigation.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.url || "#"}
                          className="text-sm font-bold opacity-65 hover:opacity-100 transition-opacity"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {!isHidden("socialLinks") &&
              content.socialLinks &&
              content.socialLinks.length > 0 && (
                <div className="space-y-4">
                  <EditableText
                    as="h4"
                    value={content.socialTitle}
                    elementKey="socialTitle"
                    styles={styles}
                    className="text-[10px] font-black uppercase tracking-widest opacity-40"
                  />
                  <div className="flex gap-3">
                    {content.socialLinks.map((soc, idx) => (
                      <a
                        key={idx}
                        href={soc.url || "#"}
                        className={cn(
                          "w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all",
                          getRadiusClass(radiusPreset)
                        )}
                      >
                        <DynamicIcon
                          name={soc.iconName || "Instagram"}
                          className="w-4 h-4"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <EditableText
              as="span"
              value={content.copyrightText}
              elementKey="copyrightText"
              styles={styles}
              className="text-xs opacity-45 block"
            />
          </div>

          {!isHidden("legalLinks") &&
            content.legalLinks &&
            content.legalLinks.length > 0 && (
              <div className="flex flex-wrap gap-6 items-center">
                {content.legalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url || "#"}
                    className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
        </div>
      </footer>
    );
  },
});
