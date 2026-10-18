"use client";
// src/components/library/Footer/Footer_V2_Modern.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Phone, Mail, ArrowRight } from '@/lib/lucide-shim';
import * as LucideIcons from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement } from '../Common/SchemaProps';

export const metadata = {
  type: 'footer',
  variant: 'v2',
  label: 'Rodapé Moderno (v2)',
  defaultData: {
    logo: { text: "Nivix Studio" },
    slogan: "Impacto visual que {vende}",
    copyrightText: "© 2026 Nivix Studio.",
    navigation: [
      { label: "Serviços", targetId: "services" },
      { label: "Portfólio", targetId: "portfolio" },
      { label: "Processo", targetId: "process" },
      { label: "Contato", targetId: "contact" }
    ],
    contact: { 
      label: "Contato Direct",
      phone: "+55 11 99999-9999", 
      email: "contato@nivix.com" 
    },
    social: {
      label: "Redes Sociais",
      links: [
        { icon: 'Instagram', url: '#' },
        { icon: 'Linkedin', url: '#' },
        { icon: 'Twitter', url: '#' }
      ]
    },
    layout: { width: 'container', paddingY: 'py-20', align: 'between', alignMobile: 'center' },
    visibility: {
      showLogo: true,
      showSlogan: true,
      showNavigation: true,
      showContact: true,
      showSocial: true,
      showCopyright: true
    },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      logoSize: 'text-4xl',
      logoWeight: 'font-black',
      logoTransform: 'uppercase',
      sloganSize: 'text-xl',
      sloganWeight: 'font-medium',
      navSize: 'text-lg',
      navWeight: 'font-bold',
      contactLabelSize: 'text-[10px]',
      contactLabelWeight: 'font-black',
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
        label: 'Informações de Contato',
        fields: [
          { key: 'visibility.showContact', label: 'Habilitar Contato', type: 'toggle' },
          { key: 'contact.label', label: 'Título Contato', type: 'text', condition: 'visibility.showContact' },
          { key: 'contact.phone', label: 'Telefone', type: 'text', condition: 'visibility.showContact' },
          { key: 'contact.email', label: 'E-mail', type: 'text', condition: 'visibility.showContact' },
          ...commonTypographyFields('style.contactLabel', { isBadge: true }).map(f => ({ ...f, condition: 'visibility.showContact' }))
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
        label: 'Copyright',
        fields: [
          { key: 'visibility.showCopyright', label: 'Habilitar Copyright', type: 'toggle' },
          { key: 'copyrightText', label: 'Texto de Copyright', type: 'text', condition: 'visibility.showCopyright' },
          ...commonTypographyFields('style.copyright', { isBody: true }).map(f => ({ ...f, condition: 'visibility.showCopyright' }))
        ]
      }
    ]
  },
  ...commonFineTuning
];

export default function Footer_V2_Modern({ data }) {
  if (!data) return null;

  const { 
    logo: rawLogo = {}, slogan, copyrightText, 
    navigation = [], contact = {}, social = {},
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
      className={`${layout.paddingY || 'py-20'} relative overflow-hidden`}
      style={{ backgroundColor: bgColor }}
    >
      <div className={`${layout.width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'} relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* LEFT COLUMN: BRANDING & SOCIAL */}
          <div className={`
            lg:col-span-5 flex flex-col
            ${mobileCenter ? 'items-center text-center' : 'items-start text-left'}
            ${desktopCenter ? 'lg:items-center lg:text-center' : 'lg:items-start lg:text-left'}
          `}>
            {visibility.showLogo !== false && (
              <div className={`flex items-center gap-4 mb-8 ${mobileCenter ? 'justify-center' : 'justify-start'} ${desktopCenter ? 'lg:justify-center' : 'lg:justify-start'}`}>
                {logo.imageUrl && (
                  <img 
                    src={logo.imageUrl} 
                    alt="Logo" 
                    className="h-12 w-auto object-contain" 
                  />
                )}
                {logo.text && (
                  <h2 
                    className={`
                      ${style.logoSize || 'text-4xl'} 
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
                  ${style.sloganSize || 'text-xl'} 
                  ${style.sloganWeight || 'font-medium'} 
                  ${style.sloganTransform || 'normal-case'} 
                  opacity-60 leading-relaxed max-w-sm mb-10
                `}
                style={{ color: textColor, fontFamily: style.sloganFont || 'inherit' }}
              >
                {renderHighlightedText(slogan)}
              </p>
            )}

            {visibility.showSocial !== false && (
              <div className="flex gap-4">
                {social.links?.map((soc, idx) => {
                  const Icon = LucideIcons[soc.icon] || Instagram;
                  return (
                    <motion.a 
                      key={idx} 
                      href={soc.url || '#'} 
                      whileHover={{ scale: 1.1, backgroundColor: textColor, color: bgColor }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all"
                      style={{ color: textColor }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: LINKS & CONTACT */}
          <div className={`
            lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12
            ${mobileCenter ? 'text-center' : 'text-left'}
            ${desktopCenter ? 'md:text-center' : 'md:text-left'}
          `}>
            
            {/* NAVIGATION */}
            {visibility.showNavigation !== false && (
              <div className="space-y-8">
                <h4 
                  className={`
                    ${style.socialLabelSize || 'text-[10px]'} 
                    ${style.socialLabelWeight || 'font-black'} 
                    ${style.socialLabelTransform || 'uppercase'} 
                    tracking-widest opacity-30
                  `}
                  style={{ color: textColor }}
                >
                  Links Úteis
                </h4>
                <ul className="space-y-4">
                  {navigation.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={`#${link.targetId}`} 
                        className={`
                          ${style.navSize || 'text-lg'} 
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

            {/* CONTACT INFO */}
            {visibility.showContact !== false && (
              <div className="space-y-8">
                <h4 
                  className={`
                    ${style.contactLabelSize || 'text-[10px]'} 
                    ${style.contactLabelWeight || 'font-black'} 
                    ${style.contactLabelTransform || 'uppercase'} 
                    tracking-widest opacity-30
                  `}
                  style={{ color: textColor }}
                >
                  {contact.label || 'Contato Direct'}
                </h4>
                <div className={`space-y-4 flex flex-col ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'}`}>
                  {contact.phone && (
                    <div className="flex items-center gap-4 opacity-60">
                      <Phone size={18} style={{ color: accentColor }} />
                      <span className="font-bold" style={{ color: textColor }}>{contact.phone}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center gap-4 opacity-60">
                      <Mail size={18} style={{ color: accentColor }} />
                      <span className="font-bold" style={{ color: textColor }}>{contact.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className={`
          pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6
          ${mobileCenter ? 'items-center text-center' : 'items-start text-left'}
          ${desktopCenter ? 'md:items-center md:text-center' : 'md:items-start md:text-left'}
        `}>
          <div className={`flex flex-col gap-2 ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'}`}>
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

          <span className="text-[10px] font-black tracking-widest uppercase italic opacity-10" style={{ color: textColor }}>
            Nivix Flexpages Engine v2.0
          </span>
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </footer>
  );
}
