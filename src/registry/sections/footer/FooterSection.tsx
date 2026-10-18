"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { DynamicIcon } from "@/components/engine/DynamicIcon";

const footerSchema = z.object({
  brandName: z.string(),
  slogan: z.string(),
  copyright: z.string(),
  statusBadge: z.string(),
  links: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
});

export type FooterContent = z.infer<typeof footerSchema>;

export const FooterSection = createSection<FooterContent>({
  id: "footer.minimal",
  name: "Footer Corporativo & Status",
  description: "Rodapé elegante com marca, slogan, links institucionais e badge de status operacional.",
  category: "Footer",
  iconName: "Globe",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "brandName", label: "Marca no Rodapé" },
    { key: "slogan", label: "Slogan" },
    { key: "links", label: "Links do Rodapé" },
    { key: "statusBadge", label: "Badge de Status" },
    { key: "copyright", label: "Texto de Copyright" },
  ],
  contentSchema: footerSchema,
  fields: [
    {
      key: "brandName",
      label: "Nome da Marca",
      type: "text",
      optionalKey: "brandName",
      typographyElementKey: "brandName",
    },
    {
      key: "slogan",
      label: "Slogan da Empresa",
      type: "text",
      optionalKey: "slogan",
      typographyElementKey: "slogan",
    },
    {
      key: "statusBadge",
      label: "Badge de Status / Local",
      type: "text",
      optionalKey: "statusBadge",
      isBadge: true,
      typographyElementKey: "statusBadge",
    },
    {
      key: "links",
      label: "Links Úteis / Legais",
      type: "array",
      optionalKey: "links",
      defaultNewItem: { label: "Política de Privacidade", url: "#" },
      itemFields: [
        { key: "label", label: "Rótulo", type: "text" },
        { key: "url", label: "URL", type: "url" },
      ],
    },
    {
      key: "copyright",
      label: "Copyright",
      type: "text",
      optionalKey: "copyright",
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
      brandName: "NIVIX COMPANY",
      slogan: "Advanced Software Engineering & Conversion Systems.",
      statusBadge: "ALL SYSTEMS OPERATIONAL",
      links: [
        { label: "Termos de Uso", url: "#" },
        { label: "Privacidade", url: "#" },
        { label: "Contato Comercial", url: "#contato" },
      ],
      copyright: "© 2026 Nivix Company LLC. Todos os direitos reservados.",
    },
  },
  Component: ({ content, styles, theme }) => {
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <footer className="border-t border-white/10 pt-8 pb-4 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-1.5">
            {!hidden.brandName && (
              <div className="flex items-center gap-2">
                <DynamicIcon
                  name="Sparkles"
                  className="w-4 h-4"
                  style={{ color: accentColor }}
                />
                <EditableText
                  as="span"
                  defaultIsHeading
                  value={content.brandName}
                  elementKey="brandName"
                  styles={styles}
                  className="font-black text-base tracking-wider uppercase"
                />
              </div>
            )}

            <EditableText
              as="p"
              value={content.slogan}
              elementKey="slogan"
              styles={styles}
              className="text-xs opacity-60"
            />
          </div>

          <EditableText
            isBadge
            defaultIconName="CheckCircle2"
            accentColor={accentColor}
            value={content.statusBadge}
            elementKey="statusBadge"
            styles={styles}
            className="text-[10px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs opacity-55">
          {!hidden.copyright && <span>{content.copyright}</span>}

          {!hidden.links && content.links && content.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-5">
              {content.links.map((l, i) => (
                <a
                  key={i}
                  href={l.url || "#"}
                  className="hover:opacity-100 transition-opacity"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    );
  },
});
