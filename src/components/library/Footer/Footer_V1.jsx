"use client";
// src/components/library/Footer/Footer_V1.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Twitter, ArrowRight } from '@/lib/lucide-shim';
import * as LucideIcons from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement } from '../Common/SchemaProps';

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter
};

export const metadata = {
  type: 'footer',
  variant: 'v1',
  label: 'Rodapé Corporativo (v1)',
  defaultData: {
    logo: { text: 'Nivix Flexpages' },
    slogan: "Construindo o {futuro} do design digital",
    copyrightText: "© 2026 Nivix Flexpages. Todos os direitos reservados.",
    navigation: [
      { label: "Home", targetId: "home" },
      { label: "Sobre", targetId: "about" },
      { label: "Serviços", targetId: "services" },
      { label: "Contato", targetId: "contact" }
    ],
    legalLinks: [
      { label: "Política de Privacidade", url: "#" },
      { label: "Termos de Uso", url: "#" }
    ],
    social: {
      label: "Siga-nos",
      links: [
        { icon: 'Instagram', url: '#' },
        { icon: 'Linkedin', url: '#' },
        { icon: 'Twitter', url: '#' }
      ]
    },
    layout: { width: 'container', paddingY: 'py-20', align: 'between', alignMobile: 'center', showTopBorder: true },
    visibility: {
      showLogo: true,
      showSlogan: true,
      showNavigation: true,
      showSocial: true,
      showCopyright: true
    },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      logoSize: 'text-2xl',
      logoWeight: 'font-black',
      logoTransform: 'uppercase',
      sloganSize: 'text-base',
      sloganWeight: 'font-medium',
      navSize: 'text-sm',
      navWeight: 'font-bold',
      socialLabelSize: 'text-[10px]',
      socialLabelWeight: 'font-black',
      copyrightSize: 'text-xs',
      copyrightWeight: 'font-medium'
    }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.width', label: 'Largura da Área', type: 'select', options: [{ value: 'container', label: 'Limitada (Container)' }, { value: 'full', label: 'Total (Full Width)' }] },
      { key: 'layout.showTopBorder', label: 'Borda Superior', type: 'toggle', default: true },
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{ value: 'py-12', label: 'Pequeno' }, { value: 'py-20', label: 'Normal' }, { value: 'py-32', label: 'Grande' }] },
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'select', options: [{ value: 'between', label: 'Espaçado' }, { value: 'center', label: 'Centralizado' }] },
      { key: 'layout.alignMobile', label: 'Alinhamento Mobile', type: 'select', options: [{ value: 'between', label: 'Espaçado' }, { value: 'center', label: 'Centralizado' }] }
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
      ...commonElement('Slogan', 'Slogan da Marca', { type: 'textarea', prefix: 'slogan' }),
      {
        type: 'group',
        label: 'Navegação',
        fields: [
          { key: 'visibility.showNavigation', label: 'Habilitar Menu', type: 'toggle' },
          { key: 'navigation', label: 'Links de Navegação', type: 'array', condition: 'visibility.showNavigation', itemFields: [{ key: 'label', label: 'Texto', type: 'text' }, { key: 'targetId', label: 'ID da Seção (#)', type: 'text' }] },
          ...commonTypographyFields('style.nav', { isBody: true }).map(f => ({ ...f, condition: 'visibility.showNavigation' }))
        ]
      },
      {
        type: 'group',
        label: 'Redes Sociais',
        fields: [
          { key: 'visibility.showSocial', label: 'Habilitar Redes Sociais', type: 'toggle' },
          { key: 'social.label', label: 'Título Redes Sociais', type: 'text', condition: 'visibility.showSocial' },
          { key: 'social.links', label: 'Ícones Sociais', type: 'array', condition: 'visibility.showSocial', itemFields: [
            { key: 'icon', label: 'Ícone (Lucide)', type: 'text' },
            { key: 'url', label: 'URL', type: 'text' }
          ]},
          ...commonTypographyFields('style.socialLabel', { isBadge: true }).map(f => ({ ...f, condition: 'visibility.showSocial' }))
        ]
      },
      {
        type: 'group',
        label: 'Copyright & Legal',
        fields: [
          { key: 'visibility.showCopyright', label: 'Habilitar Copyright', type: 'toggle' },
          { key: 'copyrightText', label: 'Texto de Copyright', type: 'text', condition: 'visibility.showCopyright' },
          { key: 'legalLinks', label: 'Links Legais', type: 'array', condition: 'visibility.showCopyright', itemFields: [{ key: 'label', label: 'Texto', type: 'text' }, { key: 'url', label: 'URL', type: 'text' }] },
          ...commonTypographyFields('style.copyright', { isBody: true }).map(f => ({ ...f, condition: 'visibility.showCopyright' }))
        ]
      }
    ]
  },
  ...commonFineTuning
];

export default function Footer_V1({ data }) {
  if (!data) return null;

  const { 
    logo: rawLogo = {}, slogan, copyrightText, 
    navigation = [], legalLinks = [], social = {},
    layout = {}, visibility = {}, style = {} 
  } = data;

  // Normalização do Logo para retrocompatibilidade (se for string, vira objeto)
  const logo = typeof rawLogo === 'string' ? { text: rawLogo } : rawLogo;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

  const desktopCenter = layout.align === 'center';
  const mobileCenter = layout.alignMobile === 'center';

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
      className={`${layout.paddingY || 'py-20'} relative ${layout.showTopBorder ? 'border-t border-white/5' : ''} overflow-hidden`}
      style={{ backgroundColor: bgColor }}
    >
      <div className={`${layout.width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'} relative z-10`}>
        <div className={`
          flex flex-col md:flex-row 
          ${mobileCenter ? 'items-center text-center gap-12' : 'items-start text-left gap-12'}
          ${desktopCenter ? 'md:items-center md:text-center md:justify-center md:gap-24' : 'md:items-start md:text-left md:justify-between md:gap-16'}
          mb-20
        `}>
          
          {/* BRANDING SECTION */}
          <div className={`
            max-w-md flex flex-col 
            ${mobileCenter ? 'items-center' : 'items-start'}
            ${desktopCenter ? 'md:items-center' : 'md:items-start'}
          `}>
            {visibility.showLogo !== false && (
              <div className={`flex items-center gap-4 mb-6 ${mobileCenter ? 'justify-center' : 'justify-start'} ${desktopCenter ? 'md:justify-center' : 'md:justify-start'}`}>
                {logo.imageUrl && (
                  <img 
                    src={logo.imageUrl} 
                    alt="Logo" 
                    className="h-10 w-auto object-contain" 
                  />
                )}
                {logo.text && (
                  <h2 
                    className={`
                      ${style.logoSize || 'text-2xl'} 
                      ${style.logoWeight || 'font-black'} 
                      ${style.logoTransform || 'uppercase'} 
                      tracking-tighter
                    `}
                    style={{ color: textColor, fontFamily: style.logoFont || 'inherit' }}
                  >
                    {logo.text}<span style={{ color: accentColor }}>.</span>
                  </h2>
                )}
              </div>
            )}
            
            {visibility.showSlogan !== false && slogan && (
              <p 
                className={`
                  ${style.sloganSize || 'text-base'} 
                  ${style.sloganWeight || 'font-medium'} 
                  ${style.sloganTransform || 'normal-case'} 
                  opacity-60 leading-relaxed
                `}
                style={{ color: textColor, fontFamily: style.sloganFont || 'inherit' }}
              >
                {renderHighlightedText(slogan)}
              </p>
            )}
          </div>

          <div className={`
            flex flex-col md:flex-row gap-16 
            ${mobileCenter ? 'items-center' : 'items-start'}
            ${desktopCenter ? 'md:items-center' : 'md:items-start'}
          `}>
            
            {/* NAVIGATION LINKS */}
            {visibility.showNavigation !== false && navigation.length > 0 && (
              <div className={`flex flex-col ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'} space-y-4`}>
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: textColor }}>Navegação</h4>
                <ul className={`space-y-2 flex flex-col ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'}`}>
                  {navigation.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={`#${link.targetId}`} 
                        className={`
                          ${style.navSize || 'text-sm'} 
                          ${style.navWeight || 'font-bold'} 
                          ${style.navTransform || 'normal-case'} 
                          hover:opacity-100 opacity-60 transition-all
                        `}
                        style={{ color: textColor, fontFamily: style.navFont || 'inherit' }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SOCIAL LINKS */}
            {visibility.showSocial !== false && (
              <div className={`flex flex-col ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'} space-y-4`}>
                <h4 
                  className={`
                    ${style.socialLabelSize || 'text-[10px]'} 
                    ${style.socialLabelWeight || 'font-black'} 
                    ${style.socialLabelTransform || 'uppercase'} 
                    tracking-widest opacity-30
                  `}
                  style={{ color: textColor, fontFamily: style.socialLabelFont || 'inherit' }}
                >
                  {social.label || 'Siga-nos'}
                </h4>
                <div className="flex gap-3">
                  {social.links?.map((soc, idx) => {
                    const Icon = LucideIcons[soc.icon] || Instagram;
                    return (
                      <motion.a 
                        key={idx} 
                        href={soc.url || '#'} 
                        whileHover={{ scale: 1.1, borderColor: accentColor, color: accentColor }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all"
                        style={{ color: textColor }}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className={`
          pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6
          ${mobileCenter ? 'items-center' : 'items-start'}
          ${desktopCenter ? 'md:items-center' : 'md:items-start'}
        `}>
          <div className={`flex flex-col ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'} gap-2`}>
            {visibility.showCopyright !== false && (
              <span 
                className={`
                  ${style.copyrightSize || 'text-xs'} 
                  ${style.copyrightWeight || 'font-medium'} 
                  ${style.copyrightTransform || 'normal-case'} 
                  opacity-30
                `}
                style={{ color: textColor, fontFamily: style.copyrightFont || 'inherit' }}
              >
                {copyrightText}
              </span>
            )}

            <a 
              href="https://instagram.com/nivix.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-20 hover:opacity-100 transition-opacity flex items-center gap-1"
            >
              <span className="text-[10px] lowercase tracking-tighter" style={{ color: textColor }}>feito por</span>
              <span className="text-[10px] font-bold lowercase tracking-tighter" style={{ color: accentColor }}>@nivix.</span>
            </a>
          </div>

          <div className="flex gap-8 items-center">
            {legalLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url || '#'} 
                className="text-[10px] font-black uppercase tracking-widest opacity-20 hover:opacity-50 transition-all"
                style={{ color: textColor }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute -bottom-24 -left-24 w-96 h-96 opacity-[0.05] blur-[100px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </footer>
  );
}
