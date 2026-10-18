"use client";
import { useState, useEffect } from 'react';
import { Link } from '@/lib/react-scroll-shim';
import { Menu, X } from '@/lib/lucide-shim';
import { motion, AnimatePresence } from 'framer-motion';
import { commonFineTuning, commonButtonFields, commonTypographyFields, commonElement } from '../Common/SchemaProps';

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
  variant: 'v4',
  label: 'Capsule Floating (v4)',
  defaultData: {
    logo: { text: 'NIVIX', imageUrl: '' },
    navigation: [
      { label: 'Sobre', targetId: 'about' },
      { label: 'Preços', targetId: 'pricing' }
    ],
    ctaButton: { visible: true, label: 'Download', url: '#', variant: 'primary', design: 'rounded-full', size: 'md' },
    layout: { justify: 'between', justifyMobile: 'between', width: 'container' },
    visibility: { showLogo: true },
    style: { 
      transparent: false, 
      solidOnScroll: true, 
      glassmorphism: true,
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      logoTextSize: 'text-xl md:text-2xl',
      logoTextWeight: 'font-black',
      logoTextTransform: 'uppercase',
      navSize: 'text-[10px]',
      navWeight: 'font-black',
      navTransform: 'uppercase'
    }
  }
};

export const schema = headerSchema;

export default function Header_V4_Capsule({ data }) {
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
    
    if (style.glassmorphism) return hexToRgba(bgColor, 0.8);
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
      ${isMobile ? 'w-full py-5 text-sm shadow-2xl mt-8' : 'hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.2)]'}
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

  return (
    <header className={`relative left-0 w-full z-40 transition-all duration-500 py-4 px-4 md:px-8`}>
      <nav 
        className={`mx-auto transition-all duration-500 rounded-full border border-white/10 shadow-2xl flex items-center h-16 md:h-20 ${
          layout.width === 'full' ? 'w-full px-6 md:px-12' : 'container mx-auto px-12 md:px-6'
        }`}
        style={{ 
            backgroundColor: getBgColor(),
            backdropFilter: style.glassmorphism && getBgColor() !== 'transparent' ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: style.glassmorphism && getBgColor() !== 'transparent' ? 'blur(20px)' : 'none'
        }}
      >
        <div className={`w-full px-6 md:px-10 flex items-center gap-10 ${mobileJustify} ${desktopJustify}`}>
          
          {/* LOGO */}
          {visibility.showLogo !== false && (
            <Link to="home" smooth={true} className="flex items-center gap-3 cursor-pointer z-50 shrink-0">
              {logo.imageUrl && <img src={logo.imageUrl} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />}
              {logo.text && (
                <span 
                  className={`
                    ${style.logoTextSize || 'text-xl md:text-2xl'} 
                    ${style.logoTextWeight || 'font-black'} 
                    ${style.logoTextTransform || 'uppercase'} 
                    tracking-tighter
                  `}
                  style={{ color: textColor, fontFamily: style.logoTextFont || 'inherit' }}
                >
                  {logo.text}<span style={{ color: accentColor }}>.</span>
                </span>
              )}
            </Link>
          )}

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  to={item.targetId}
                  smooth={true}
                  offset={-80}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ color: hoveredIdx === index ? accentColor : textColor, opacity: hoveredIdx === index ? 1 : 0.6, fontFamily: style.navFont || 'inherit' }}
                  className={`
                    ${style.navSize || 'text-[10px]'} 
                    ${style.navWeight || 'font-black'} 
                    ${style.navTransform || 'uppercase'} 
                    tracking-widest cursor-pointer transition-all hover:scale-110
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {renderCTA(ctaButton)}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} style={{ color: textColor }} className="lg:hidden p-2">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU SÓLIDO */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 mt-4 rounded-[2.5rem] overflow-hidden lg:hidden shadow-2xl border border-white/5"
            style={{ backgroundColor: bgColor }}
          >
            <div className="p-8 flex flex-col gap-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (index * 0.05) }}
                >
                  <Link 
                    to={item.targetId} 
                    smooth={true} 
                    offset={-80} 
                    onClick={() => setIsOpen(false)}
                    onPointerDown={() => setMobileActive(index)}
                    onPointerUp={() => setMobileActive(null)}
                    style={{ color: mobileActive === index ? accentColor : textColor }}
                    className="text-4xl font-black uppercase tracking-tighter transition-all"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {renderCTA(ctaButton, true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
