"use client";
// src/components/library/Footer/Footer_V3_Compact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from '@/lib/lucide-shim';
import { Instagram } from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement } from '../Common/SchemaProps';

export const metadata = {
  type: 'footer',
  variant: 'v3',
  label: 'Rodapé Compacto (v3)',
  defaultData: {
    logo: { text: "Nivix Compact" },
    slogan: "Foco no que {importa}",
    linkGroups: [
      { 
        title: "Explorar", 
        links: [
          { label: "Blog", targetId: "blog" },
          { label: "Carreiras", targetId: "careers" },
          { label: "Cases", targetId: "cases" }
        ] 
      },
      { 
        title: "Suporte", 
        links: [
          { label: "FAQ", targetId: "faq" },
          { label: "Contato", targetId: "contact" }
        ] 
      }
    ],
    copyrightText: "© 2026 Nivix.",
    social: {
      links: [
        { icon: 'Instagram', url: '#' }
      ]
    },
    layout: { width: 'container', paddingY: 'py-16', align: 'between', alignMobile: 'center' },
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
      logoSize: 'text-xl',
      logoWeight: 'font-black',
      logoTransform: 'uppercase',
      sloganSize: 'text-sm',
      sloganWeight: 'font-medium',
      navSize: 'text-xs',
      navWeight: 'font-bold',
      socialLabelSize: 'text-[10px]',
      socialLabelWeight: 'font-black',
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
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{ value: 'py-8', label: 'Ultra Compacto' }, { value: 'py-16', label: 'Compacto' }, { value: 'py-24', label: 'Normal' }] },
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
      ...commonElement('Slogan', 'Slogan Curto', { type: 'textarea', prefix: 'slogan' }),
      {
        type: 'group',
        label: 'Colunas de Navegação',
        fields: [
          { key: 'visibility.showNavigation', label: 'Habilitar Menu', type: 'toggle' },
          { key: 'linkGroups', label: 'Grupos de Links', type: 'array', condition: 'visibility.showNavigation', itemFields: [
            { key: 'title', label: 'Título da Coluna', type: 'text' },
            { key: 'links', label: 'Links', type: 'array', itemFields: [
               { key: 'label', label: 'Texto', type: 'text' },
               { key: 'targetId', label: 'ID Seção', type: 'text' }
            ]}
          ]},
          ...commonTypographyFields('style.nav', { isBody: true }).map(f => ({ ...f, condition: 'visibility.showNavigation' }))
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

export default function Footer_V3_Compact({ data }) {
  if (!data) return null;

  const { 
    logo: rawLogo = {}, slogan, linkGroups = [], copyrightText, 
    social = {}, layout = {}, visibility = {}, style = {} 
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
      className={`${layout.paddingY || 'py-16'} border-t border-white/5 relative overflow-hidden`}
      style={{ backgroundColor: bgColor }}
    >
      <div className={`${layout.width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'} relative z-10`}>
        <div className={`
          flex flex-col md:flex-row 
          ${mobileCenter ? 'items-center text-center gap-12' : 'items-start text-left gap-12'}
          ${desktopCenter ? 'md:items-center md:text-center md:justify-center md:gap-24' : 'md:items-start md:text-left md:justify-between md:gap-16'}
        `}>
          
          {/* BRANDING */}
          <div className={`
            max-w-xs flex flex-col
            ${mobileCenter ? 'items-center' : 'items-start'}
            ${desktopCenter ? 'md:items-center' : 'md:items-start'}
          `}>
            {visibility.showLogo !== false && (
              <div className={`flex items-center gap-3 mb-4 ${mobileCenter ? 'justify-center' : 'justify-start'} ${desktopCenter ? 'md:justify-center' : 'md:justify-start'}`}>
                {logo.imageUrl && (
                  <img 
                    src={logo.imageUrl} 
                    alt="Logo" 
                    className="h-8 w-auto object-contain" 
                  />
                )}
                {logo.text && (
                  <h2 
                    className={`
                      ${style.logoSize || 'text-xl'} 
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
                  ${style.sloganSize || 'text-sm'} 
                  ${style.sloganWeight || 'font-medium'} 
                  ${style.sloganTransform || 'normal-case'} 
                  opacity-50 leading-relaxed
                `}
                style={{ color: textColor, fontFamily: style.sloganFont || 'inherit' }}
              >
                {renderHighlightedText(slogan)}
              </p>
            )}
          </div>

          {/* LINK COLUMNS */}
          {visibility.showNavigation !== false && linkGroups.length > 0 && (
            <div className={`
              flex gap-16
              ${mobileCenter ? 'flex-col justify-center text-center items-center' : 'flex-col justify-start text-left items-start'}
              ${desktopCenter ? 'md:flex-row md:justify-center md:text-center md:items-start' : 'md:flex-row md:justify-start md:text-left md:items-start'}
            `}>
              {linkGroups.map((group, idx) => (
                <div key={idx} className={`space-y-4 flex flex-col ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'}`}>
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-20" style={{ color: textColor }}>{group.title}</h4>
                  <ul className={`space-y-3 flex flex-col ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'}`}>
                    {group.links?.map((link, lidx) => (
                      <li key={lidx}>
                        <a 
                          href={`#${link.targetId}`} 
                          className={`
                            ${style.navSize || 'text-xs'} 
                            ${style.navWeight || 'font-bold'} 
                            ${style.navTransform || 'normal-case'} 
                            hover:opacity-100 opacity-40 transition-all
                          `}
                          style={{ color: textColor, fontFamily: style.navFont || 'inherit' }}
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

        {/* BOTTOM ROW */}
        <div className={`
          mt-16 pt-8 border-t border-white/5 flex justify-between items-center
          ${mobileCenter ? 'flex-col gap-6 justify-center' : 'flex-row'}
          ${desktopCenter ? 'md:flex-col md:gap-6 md:justify-center' : 'md:flex-row md:justify-between'}
        `}>
          <div className={`flex flex-col gap-2 ${mobileCenter ? 'items-center' : 'items-start'} ${desktopCenter ? 'md:items-center' : 'md:items-start'}`}>
            {visibility.showCopyright !== false && (
              <span 
                className={`
                  ${style.copyrightSize || 'text-[10px]'} 
                  ${style.copyrightWeight || 'font-bold'} 
                  ${style.copyrightTransform || 'uppercase'} 
                  tracking-widest opacity-20
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
          
          <div className={`flex items-center gap-8 ${mobileCenter ? 'flex-col' : 'flex-row'} ${desktopCenter ? 'md:flex-col' : 'md:flex-row'}`}>
            {visibility.showSocial !== false && (
              <div className={`flex gap-4 ${mobileCenter ? 'justify-center' : 'justify-start'} ${desktopCenter ? 'md:justify-center' : 'md:justify-start'}`}>
                {social.links?.map((soc, idx) => {
                  const Icon = LucideIcons[soc.icon] || Instagram;
                  return (
                    <motion.a 
                      key={idx} 
                      href={soc.url || '#'} 
                      whileHover={{ color: accentColor, scale: 1.1 }}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-40 hover:opacity-100 transition-all"
                      style={{ color: textColor }}
                    >
                      <Icon size={14} />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute -bottom-10 right-0 w-64 h-64 opacity-[0.05] blur-[80px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </footer>
  );
}
