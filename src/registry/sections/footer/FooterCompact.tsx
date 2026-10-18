"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";

const footerCompactSchema = z.object({
  brandName: z.string(),
  logoImageUrl: z.string(),
  slogan: z.string(),
  copyrightText: z.string(),
  links: z.array(
    z.object({
      groupTitle: z.string(),
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

export type FooterCompactContent = z.infer<typeof footerCompactSchema>;

export const FooterCompactSection = createSection<FooterCompactContent>({
  id: "footer.compact",
  name: "Footer Compacto Horizontal",
  description:
    "Rodapé horizontal enxuto com marca, links agrupados, redes sociais minimalistas e copyright.",
  category: "Footer",
  iconName: "Minimize2",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "brandName", label: "Marca / Logo" },
    { key: "slogan", label: "Slogan Curto" },
    { key: "links", label: "Links de Navegação" },
    { key: "socialLinks", label: "Redes Sociais" },
    { key: "copyrightText", label: "Texto de Copyright" },
  ],
  contentSchema: footerCompactSchema,
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
      label: "Slogan Curto",
      type: "text",
      optionalKey: "slogan",
      typographyElementKey: "slogan",
    },
    {
      key: "links",
      label: "Links Rápidos",
      type: "array",
      optionalKey: "links",
      defaultNewItem: {
        groupTitle: "Explorar",
        label: "Cases",
        url: "#cases",
      },
      itemFields: [
        { key: "groupTitle", label: "Categoria / Coluna", type: "text" },
        { key: "label", label: "Texto do Link", type: "text" },
        { key: "url", label: "URL ou Âncora (#)", type: "url" },
      ],
    },
    {
      key: "socialLinks",
      label: "Ícones Sociais",
      type: "array",
      optionalKey: "socialLinks",
      defaultNewItem: { iconName: "Instagram", url: "#" },
      itemFields: [
        { key: "iconName", label: "Ícone", type: "icon" },
        { key: "url", label: "URL", type: "url" },
      ],
    },
    {
      key: "copyrightText",
      label: "Texto de Copyright",
      type: "text",
      optionalKey: "copyrightText",
      typographyElementKey: "copyrightText",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "compact",
      containerWidth: "boxed",
    },
    styles: {
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      brandName: "NIVIX COMPACT",
      logoImageUrl: "",
      slogan: "Foco absoluto no que importa.",
      copyrightText: "© 2026 Nivix.",
      links: [
        { groupTitle: "Explorar", label: "Blog", url: "#blog" },
        { groupTitle: "Explorar", label: "Cases", url: "#cases" },
        { groupTitle: "Suporte", label: "FAQ", url: "#faq" },
        { groupTitle: "Suporte", label: "Contato", url: "#contato" },
      ],
      socialLinks: [
        { iconName: "Instagram", url: "#" },
        { iconName: "Linkedin", url: "#" },
      ],
    },
  },
  Component: ({ content, styles, theme }) => {
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    // Agrupar links por groupTitle
    const groupedLinks = (content.links || []).reduce<
      Record<string, { label: string; url: string }[]>
    >((acc, item) => {
      const group = item.groupTitle || "Links";
      if (!acc[group]) acc[group] = [];
      acc[group].push({ label: item.label, url: item.url });
      return acc;
    }, {});

    return (
      <footer className="border-t border-white/10 pt-10 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Branding */}
          <div className="max-w-xs space-y-2.5">
            {!isHidden("brandName") && (
              <div className="flex items-center gap-2.5">
                {content.logoImageUrl && (
                  <img
                    src={content.logoImageUrl}
                    alt={content.brandName}
                    className="h-7 w-auto object-contain"
                  />
                )}
                <div className="flex items-center">
                  <EditableText
                    as="h2"
                    defaultIsHeading
                    value={content.brandName}
                    elementKey="brandName"
                    styles={styles}
                    className="text-xl font-black uppercase tracking-tighter"
                  />
                  <span
                    className="text-xl font-black"
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
              className="text-xs sm:text-sm opacity-55 leading-relaxed"
            />
          </div>

          {/* Grupos de Links */}
          {!isHidden("links") && Object.keys(groupedLinks).length > 0 && (
            <div className="flex flex-wrap gap-12">
              {Object.entries(groupedLinks).map(([groupTitle, items], idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-35">
                    {groupTitle}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a
                          href={link.url || "#"}
                          className="text-xs font-bold opacity-55 hover:opacity-100 transition-opacity"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Linha Inferior */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          {!isHidden("copyrightText") && (
            <EditableText
              as="span"
              value={content.copyrightText}
              elementKey="copyrightText"
              styles={styles}
              className="text-[10px] font-bold uppercase tracking-widest opacity-40"
            />
          )}

          {!isHidden("socialLinks") &&
            content.socialLinks &&
            content.socialLinks.length > 0 && (
              <div className="flex gap-3">
                {content.socialLinks.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url || "#"}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <DynamicIcon
                      name={soc.iconName || "Instagram"}
                      className="w-3.5 h-3.5"
                    />
                  </a>
                ))}
              </div>
            )}
        </div>
      </footer>
    );
  },
});
