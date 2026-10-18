"use client";
import { useState, useEffect } from 'react';
import { Link } from '@/lib/react-scroll-shim';
import { Menu, X, Phone, Mail, Instagram, Linkedin, Facebook } from '@/lib/lucide-shim';
import { motion, AnimatePresence } from 'framer-motion';
import { commonFineTuning, commonButtonFields, commonTypographyFields, commonElement } from '../Common/SchemaProps';

const SOCIAL_ICONS = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin };

const hexToRgba = (hex, alpha) => {
  if (!hex || hex === 'transparent') return 'transparent';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const JUSTIFY_MAP = {
  between: 'lg:justify-between',
  center: 'lg:justify-center',
  around: 'lg:justify-around',
  start: 'lg:justify-start',
  end: 'lg:justify-end'
};

const JUSTIFY_MAP_MOBILE = {
  between: 'justify-between',
  center: 'justify-center',
  around: 'justify-around'
};

const headerSchema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.justify', label: 'Alinhamento Desktop', type: 'select', options: [ { value: 'between', label: 'Extremidades' }, { value: 'center', label: 'Centro' }, { value: 'around', label: 'Equilibrado' }, { value: 'start', label: 'Esquerda' }, { value: 'end', label: 'Direita' } ] },
      { key: 'layout.justifyMobile', label: 'Alinhamento Mobile', type: 'select', options: [ { value: 'between', label: 'Extremidades' }, { value: 'center', label: 'Centro' }, { value: 'around', label: 'Equilibrado' } ] },
      { key: 'layout.width', label: 'Largura da Área', type: 'select', options: [ { value: 'container', label: 'Limitada (Container)' }, { value: 'full', label: 'Total (Full Width)' } ] }
    ]
  },
  {
    group: '2. Conteúdo (Elementos)',
    fields: [
      {
        type: 'group',
        label: 'Barra Superior (Contato)',
        fields: [
          { key: 'topPhone', label: 'Telefone', type: 'text' },
          { key: 'topEmail', label: 'E-mail', type: 'text' },
          ...commonTypographyFields('style.top', true)
        ]
      },
      ...commonElement('Logo', 'Marca / Logo', { type: 'text', prefix: 'logo.text' }),
      { key: 'logo.imageUrl', label: 'Imagem do Logo', type: 'image' },
      { 
        type: 'group', 
        label: 'Menu de Navegação',
        fields: [
          { key: 'navigation', label: 'Links do Menu', type: 'array', itemFields: [ { key: 'label', label: 'Texto Link', type: 'text' }, { key: 'targetId', label: 'ID Seção', type: 'text' } ] },
          ...commonTypographyFields('style.nav', true)
        ]
      },
      {
        type: 'group',
        label: 'Botão de Chamada (CTA)',
        fields: [
          { key: 'ctaButton.visible', label: 'Habilitar Botão', type: 'toggle' },
          ...commonButtonFields.map(f => ({ ...f, key: `ctaButton.${f.key}`, condition: 'ctaButton.visible' }))
        ]
      }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Comportamento' },
      { key: 'style.transparent', label: 'Fundo Transparente (Topo)', type: 'toggle' },
      { key: 'style.solidOnScroll', label: 'Ficar Sólido no Scroll', type: 'toggle' },
      { key: 'style.glassmorphism', label: 'Efeito Blur (Glass)', type: 'toggle' },
      { type: 'section', label: 'Pintura e Cores' },
      { key: 'style.customAccent', label: 'Cor de Destaque (Accent)', type: 'color' },
      { key: 'style.customBg', label: 'Fundo da Seção', type: 'color' },
      { key: 'style.customText', label: 'Cor do Texto Principal', type: 'color' }
    ]
  }
];

export const metadata = {
  type: 'header',
  variant: 'v2',
  label: 'Enterprise Topbar (v2)',
  defaultData: {
    topPhone: '+55 11 99999-9999',
    topEmail: 'contato@nivix.com',
    logo: { text: 'NIVIX', imageUrl: '' },
    navigation: [
      { label: 'Serviços', targetId: 'services' },
      { label: 'Portfólio', targetId: 'portfolio' },
      { label: 'Unidades', targetId: 'location' }
    ],
    ctaButton: { visible: true, label: 'Área do Cliente', url: '#', variant: 'outline', design: 'rounded-full', size: 'sm' },
    layout: { justify: 'between', justifyMobile: 'between', width: 'container' },
    visibility: { showLogo: true },
    style: { 
      transparent: false, 
      solidOnScroll: true, 
      glassmorphism: true,
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      topSize: 'text-[10px]',
      topWeight: 'font-black',
      topTransform: 'uppercase',
      logoTextSize: 'text-2xl',
      logoTextWeight: 'font-black',
      logoTextTransform: 'uppercase',
      navSize: 'text-[10px]',
      navWeight: 'font-black',
      navTransform: 'uppercase'
    }
  }
};

export const schema = headerSchema;

export default function Header_V2_Enterprise({ data, globalSocials }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mobileActive, setMobileActive] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) return null;
  const logo = data.logo || {};
  const navigation = data.navigation || [];
  const ctaButton = data.ctaButton || { visible: false };
  const style = data.style || {};
  const layout = data.layout || { justify: 'between', justifyMobile: 'between', width: 'container' };
  const visibility = data.visibility || {};

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

  const getBgColor = () => {
    if (isOpen) return bgColor;
    const isTransparentAtTop = style.transparent && !scrolled;
    const isTransparentDuringScroll = scrolled && style.transparent && !style.solidOnScroll;
    
    if (isTransparentAtTop || isTransparentDuringScroll) {
      return style.glassmorphism ? hexToRgba(bgColor, 0.1) : 'transparent';
    }
    
    if (style.glassmorphism) return hexToRgba(bgColor, 0.85);
    return bgColor;
  };

  const renderCTA = (btn, isMobile = false) => {
    if (!btn || !btn.visible || !btn.label) return null;
    
    const isOutline = btn.variant === 'outline';
    const isGhost = btn.variant === 'ghost';
    
    const sizeClasses = btn.size === 'sm' ? 'px-4 py-1.5 text-[9px]' : 
                       btn.size === 'lg' ? 'px-10 py-4 text-xs' : 
                       'px-7 py-3 text-[10px]';

    const baseClasses = `
      ${sizeClasses} 
      ${btn.design || 'rounded-full'} 
      font-black uppercase tracking-widest transition-all shrink-0 flex items-center justify-center border-2
      ${isMobile ? 'w-full py-6 text-sm shadow-2xl mt-4' : 'hover:scale-105 active:scale-95 shadow-lg'}
    `;

    const buttonStyle = isOutline 
      ? { borderColor: accentColor, color: accentColor, backgroundColor: 'transparent' }
      : isGhost
        ? { borderColor: 'transparent', color: textColor, backgroundColor: 'transparent' }
        : { backgroundColor: accentColor, borderColor: accentColor, color: '#000' };

    return (
      <a href={btn.url || '#'} onClick={() => isMobile && setIsOpen(false)} className={baseClasses} style={buttonStyle}>
        {btn.label}
      </a>
    );
  };

  const desktopJustify = JUSTIFY_MAP[layout.justify] || 'lg:justify-between';
  const mobileJustify = JUSTIFY_MAP_MOBILE[layout.justifyMobile] || 'justify-between';

  const hasTopBar = data.topPhone || data.topEmail;

  return (
    <header className="relative top-0 left-0 w-full z-40 transition-all duration-300">
      {/* TOP BAR */}
      <AnimatePresence>
        {hasTopBar && !scrolled && !isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:block border-b overflow-hidden"
            style={{ 
              backgroundColor: style.glassmorphism ? hexToRgba(bgColor, 0.5) : bgColor,
              borderColor: hexToRgba(textColor, 0.05),
              backdropFilter: style.glassmorphism ? 'blur(10px)' : 'none',
              WebkitBackdropFilter: style.glassmorphism ? 'blur(10px)' : 'none'
            }}
          >
            <div 
              className={`
                ${layout.width === 'full' ? 'w-full px-6 md:px-12' : 'container mx-auto px-12 md:px-6'} 
                flex justify-between items-center py-3 
                ${style.topSize || 'text-[10px]'} 
                ${style.topWeight || 'font-black'} 
                ${style.topTransform || 'uppercase'} 
                tracking-widest
              `} 
              style={{ color: textColor, fontFamily: style.topFont || 'inherit' }}
            >
              <div className="flex gap-6">
                {data.topPhone && (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Phone size={12} style={{ color: accentColor }} />
                    <span>{data.topPhone}</span>
                  </motion.div>
                )}
                {data.topEmail && (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Mail size={12} style={{ color: accentColor }} />
                    <span>{data.topEmail}</span>
                  </motion.div>
                )}
              </div>
              <div className="flex gap-4">
                 {globalSocials?.filter(s => s.active).map((s, idx) => {
                   const Icon = SOCIAL_ICONS[s.id] || Instagram;
                   return (
                     <motion.a 
                       key={s.id} 
                       href={s.url} 
                       target="_blank" 
                       initial={{ y: -10, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 0.4 + (idx * 0.1) }}
                       className="transition-all hover:scale-110 active:scale-90"
                       style={{ color: textColor }}
                       onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                       onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                     >
                       <Icon size={14} />
                     </motion.a>
                   )
                 })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN NAVBAR */}
      <nav 
        className={`h-20 flex items-center transition-all duration-500 ${scrolled || isOpen ? 'shadow-2xl' : ''}`}
        style={{ 
          backgroundColor: getBgColor(),
          backdropFilter: style.glassmorphism && getBgColor() !== 'transparent' ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: style.glassmorphism && getBgColor() !== 'transparent' ? 'blur(20px)' : 'none'
        }}
      >
        <div className={`${layout.width === 'full' ? 'w-full px-6 md:px-12' : 'container mx-auto px-12 md:px-6'} flex items-center h-full gap-10 ${mobileJustify} ${desktopJustify}`}>
          
          {/* LOGO */}
          {visibility.showLogo !== false && (
            <Link to="home" smooth={true} className="flex items-center gap-4 cursor-pointer group shrink-0">
              {logo.imageUrl && <img src={logo.imageUrl} alt="Logo" className="h-10 w-auto object-contain" />}
              {logo.text && (
                 <span 
                   className={`
                     ${style.logoTextSize || 'text-2xl'} 
                     ${style.logoTextWeight || 'font-black'} 
                     ${style.logoTextTransform || 'uppercase'} 
                     tracking-tighter leading-none
                   `} 
                   style={{ color: textColor, fontFamily: style.logoTextFont || 'inherit' }}
                 >
                   {logo.text}<span style={{ color: accentColor }}>.</span>
                 </span>
              )}
            </Link>
          )}

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navigation.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.targetId}
                  smooth={true}
                  offset={-80}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ color: hoveredIdx === idx ? accentColor : textColor, opacity: hoveredIdx === idx ? 1 : 0.6, fontFamily: style.navFont || 'inherit' }}
                  className={`
                    ${style.navSize || 'text-[10px]'} 
                    ${style.navWeight || 'font-black'} 
                    ${style.navTransform || 'uppercase'} 
                    tracking-widest cursor-pointer transition-all relative group
                  `}
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: accentColor }} />
                </Link>
              ))}
            </div>
            {renderCTA(ctaButton)}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} style={{ color: textColor }} className="lg:hidden p-2">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: 'calc(100vh - 100%)' }} 
            exit={{ height: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full overflow-hidden lg:hidden border-t border-white/5" 
            style={{ backgroundColor: bgColor }}
          >
            <div className="p-8 h-[calc(100vh-80px)] flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                {navigation.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (idx * 0.05) }}
                  >
                    <Link 
                      to={item.targetId} 
                      smooth={true} 
                      offset={-80} 
                      onClick={() => setIsOpen(false)} 
                      onPointerDown={() => setMobileActive(idx)} 
                      onPointerUp={() => setMobileActive(null)} 
                      style={{ color: mobileActive === idx ? accentColor : textColor }} 
                      className="text-4xl font-black uppercase tracking-tighter transition-all"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (navigation.length * 0.05) }}
                className="mt-auto pb-10"
              >
                {renderCTA(ctaButton, true)}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
