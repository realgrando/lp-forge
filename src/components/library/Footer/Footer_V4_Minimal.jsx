"use client";
// src/components/library/Footer/Footer_V4_Minimal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from '@/lib/lucide-shim';
import { Instagram } from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement } from '../Common/SchemaProps';

export const metadata = {
  type: 'footer',
  variant: 'v4',
  label: 'Rodapé Conversão (v4)',
  defaultData: {
    logo: { text: "Nivix Direct" },
    cta: "Pronto para elevar seu {negócio}?",
    ctaLink: "contact",
    copyrightText: "© 2026 Nivix Direct.",
    navigation: [
      { label: "Privacidade", targetId: "privacy" },
      { label: "Termos", targetId: "terms" }
    ],
    social: {
      links: [
        { icon: 'Instagram', url: '#' },
        { icon: 'Linkedin', url: '#' },
        { icon: 'Twitter', url: '#' }
      ]
    },
    layout: { width: 'container', paddingY: 'py-32', align: 'between', alignMobile: 'center' },
    visibility: {
      showLogo: true,
      showCta: true,
      showNavigation: true,
      showSocial: true,
      showCopyright: true
    },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#000000',
      logoSize: 'text-xl',
      logoWeight: 'font-black',
      logoTransform: 'uppercase',
      ctaSize: 'text-5xl md:text-8xl',
      ctaWeight: 'font-black',
      navSize: 'text-[10px]',
      navWeight: 'font-black',
      copyrightSize: 'text-[10px]',
      copyrightWeight: 'font-bold'
    }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.width', label: 'Largura da Área', type: 'select', options: [{ value: 'container', label: 'Limitada (Container)' }, { value: 'full', label: 'Total (Full Width)' }] },
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{ value: 'py-24', label: 'Normal' }, { value: 'py-32', label: 'Grande' }, { value: 'py-48', label: 'Gigante' }] },
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'select', options: [{ value: 'center', label: 'Centralizado' }, { value: 'between', label: 'Espaçado (Inline)' }] },
      { key: 'layout.alignMobile', label: 'Alinhamento Mobile', type: 'select', options: [{ value: 'center', label: 'Centralizado' }, { value: 'between', label: 'Espaçado (Inline)' }] }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      {
        type: 'group',
        label: 'Marca / Logo',
        fields: [
          { key: 'visibility.showLogo', label: 'Habilitar Logo', type: 'toggle' },
          { key: 'logo.text', label: 'Texto da Marca', type: 'text', condition: 'visibility.showLogo' },
          { key: 'logo.imageUrl', label: 'Imagem do Logo', type: 'image', condition: 'visibility.showLogo' },
          ...commonTypographyFields('style.logo').map(f => ({ ...f, condition: 'visibility.showLogo' }))
        ]
      },
      ...commonElement('Cta', 'Chamada (CTA)', { type: 'textarea', prefix: 'cta' }),
      { key: 'ctaLink', label: 'Link do CTA (#)', type: 'text', condition: 'visibility.showCta' },
      {
        type: 'group',
        label: 'Links Menores',
        fields: [
          { key: 'visibility.showNavigation', label: 'Habilitar Links', type: 'toggle' },
          { key: 'navigation', label: 'Links do Rodapé', type: 'array', condition: 'visibility.showNavigation', itemFields: [{ key: 'label', label: 'Texto', type: 'text' }, { key: 'targetId', label: 'ID da Seção (#)', type: 'text' }] },
          ...commonTypographyFields('style.nav', { isBadge: true }).map(f => ({ ...f, condition: 'visibility.showNavigation' }))
        ]
      },
      {
        type: 'group',
        label: 'Redes Sociais',
        fields: [
          { key: 'visibility.showSocial', label: 'Habilitar Redes Sociais', type: 'toggle' },
          { key: 'social.links', label: 'Ícones Sociais', type: 'array', condition: 'visibility.showSocial', itemFields: [
            { key: 'icon', label: 'Ícone (Lucide)', type: 'text' },
            { key: 'url', label: 'URL', type: 'text' }
          ]}
        ]
      },
      {
        type: 'group',
        label: 'Copyright',
        fields: [
          { key: 'visibility.showCopyright', label: 'Habilitar Copyright', type: 'toggle' },
          { key: 'copyrightText', label: 'Texto de Copyright', type: 'text', condition: 'visibility.showCopyright' },
          ...commonTypographyFields('style.copyright', { isBadge: true }).map(f => ({ ...f, condition: 'visibility.showCopyright' }))
        ]
      }
    ]
  },
  ...commonFineTuning
];

export default function Footer_V4_Minimal({ data }) {
  if (!data) return null;

  const { 
    logo: rawLogo = {}, cta, ctaLink, copyrightText, 
    navigation = [], social = {}, layout = {}, visibility = {}, style = {} 
  } = data;

  const logo = typeof rawLogo === 'string' ? { text: rawLogo } : rawLogo;
  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#000000';

  const desktopSpaced = layout.align === 'between';
  const mobileSpaced = layout.alignMobile === 'between';

  const renderHighlightedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const content = part.slice(1, -1);
        return <span key={i} style={{ color: accentColor }}>{content}</span>;
      }
      return part;
    });
  };

  return (
    <footer 
      className={`${layout.paddingY || 'py-32'} relative overflow-hidden`}
      style={{ backgroundColor: bgColor }}
    >
      <div className={`${layout.width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'}`}>
        
        {/* CTA SECTION */}
        {visibility.showCta !== false && cta && (
          <div className="mb-24 max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`
                ${style.ctaSize || 'text-5xl md:text-8xl'} 
                ${style.ctaWeight || 'font-black'} 
                ${style.ctaTransform || 'normal-case'} 
                tracking-tighter mb-12 leading-[0.9]
              `}
              style={{ color: textColor, fontFamily: style.ctaFont || 'inherit' }}
            >
              {renderHighlightedText(cta)}
            </motion.h2>
            <motion.a 
              href={`#${ctaLink || 'contact'}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: accentColor, color: '#000', borderColor: accentColor }}
              className="inline-block px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] border transition-all duration-500"
              style={{ color: textColor, borderColor: `${textColor}33` }}
            >
              Vamos Conversar
            </motion.a>
          </div>
        )}

        {/* FOOTER BOTTOM: TIER 1 (Logo, Links, Social) */}
        <div className={`
          flex flex-col pt-20 border-t border-white/5 gap-12
          ${mobileSpaced ? 'items-stretch' : 'items-center text-center'}
          ${desktopSpaced ? 'md:items-stretch' : 'md:items-center md:text-center'}
        `}>
          
          <div className={`
            flex flex-col gap-10
            ${mobileSpaced ? 'items-start' : 'items-center'}
            ${desktopSpaced ? 'md:flex-row md:justify-between md:items-center' : 'md:flex-col md:items-center'}
          `}>
            
            {/* LOGO */}
            {visibility.showLogo !== false && (
              <div className="flex items-center gap-3 shrink-0">
                {logo.imageUrl && (
                  <img src={logo.imageUrl} alt="Logo" className="h-8 w-auto object-contain" />
                )}
                {logo.text && (
                  <span className={`${style.logoSize || 'text-xl'} ${style.logoWeight || 'font-black'} ${style.logoTransform || 'uppercase'} tracking-tighter`} style={{ color: textColor, fontFamily: style.logoFont || 'inherit' }}>
                    {logo.text}<span style={{ color: accentColor }}>.</span>
                  </span>
                )}
              </div>
            )}

            {/* LINKS (COLUNA NO MOBILE, LADO A LADO NO DESKTOP) */}
            {visibility.showNavigation !== false && navigation.length > 0 && (
              <div className={`
                flex gap-y-3 gap-x-8
                ${mobileSpaced ? 'flex-col items-start' : 'flex-col items-center'}
                ${desktopSpaced ? 'md:flex-row md:items-center' : 'md:flex-col md:items-center'}
              `}>
                {navigation.map((link, idx) => (
                  <a key={idx} href={`#${link.targetId}`} className={`${style.navSize || 'text-[10px]'} ${style.navWeight || 'font-black'} ${style.navTransform || 'uppercase'} tracking-widest opacity-20 hover:opacity-100 transition-all`} style={{ color: textColor, fontFamily: style.navFont || 'inherit' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* SOCIALS (LADO A LADO) */}
            {visibility.showSocial !== false && (
              <div className="flex items-center gap-6 shrink-0">
                {social.links?.map((soc, idx) => {
                  const Icon = LucideIcons[soc.icon] || Instagram;
                  return (
                    <a key={idx} href={soc.url || '#'} className="text-[10px] font-black uppercase tracking-widest opacity-20 hover:opacity-100 transition-all flex items-center gap-2" style={{ color: textColor }}>
                      <Icon size={16} />
                      <span className="hidden sm:inline text-[9px]">{soc.icon}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* TIER 2 (COPYRIGHTS - EM BAIXO) */}
          <div className={`
            pt-8 border-t border-white/5 flex flex-col items-center gap-2
            ${mobileSpaced ? 'text-left' : 'text-center'}
            ${desktopSpaced ? 'md:text-center' : 'md:text-center'}
          `}>
            {visibility.showCopyright !== false && (
              <span className={`${style.copyrightSize || 'text-[10px]'} ${style.copyrightWeight || 'font-bold'} ${style.copyrightTransform || 'uppercase'} tracking-widest opacity-10`} style={{ color: textColor, fontFamily: style.copyrightFont || 'inherit' }}>
                {copyrightText}
              </span>
            )}

            <a 
              href="https://instagram.com/nivix.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-10 hover:opacity-100 transition-opacity flex items-center gap-1"
            >
              <span className="text-[10px] lowercase tracking-tighter" style={{ color: textColor }}>feito por</span>
              <span className="text-[10px] font-bold lowercase tracking-tighter" style={{ color: accentColor }}>@nivix.</span>
            </a>
          </div>
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </footer>
  );
}
