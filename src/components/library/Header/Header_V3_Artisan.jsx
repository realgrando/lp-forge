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
  between: 'items-start',
  center: 'items-center',
  around: 'items-center'
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
  variant: 'v3',
  label: 'Artisan Center (v3)',
  defaultData: {
    logo: { text: 'NIVIX', imageUrl: '' },
    navigation: [
      { label: 'O Menu', targetId: 'menu' },
      { label: 'Chef', targetId: 'chef' },
      { label: 'Contato', targetId: 'contact' }
    ],
    ctaButton: { visible: true, label: 'Reserva', url: '#', variant: 'primary', design: 'rounded-full', size: 'md' },
    layout: { justify: 'center', justifyMobile: 'between', width: 'container' },
    visibility: { showLogo: true },
    style: { 
      transparent: true, 
      solidOnScroll: true, 
      glassmorphism: true,
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      logoTextSize: 'text-3xl',
      logoTextWeight: 'font-light',
      logoTextTransform: 'uppercase',
      navSize: 'text-[10px]',
      navWeight: 'font-black',
      navTransform: 'uppercase'
    }
  }
};

export const schema = headerSchema;

export default function Header_V3_Artisan({ data }) {
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
  const layout = data.layout || { justify: 'center', justifyMobile: 'between', width: 'container' };
  const visibility = data.visibility || {};

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

  const getBgColor = () => {
    if (isOpen) return bgColor;
    const isTransparentAtTop = style.transparent && !scrolled;
    const isTransparentDuringScroll = scrolled && style.transparent && !style.solidOnScroll;
    if (isTransparentAtTop || isTransparentDuringScroll) return 'transparent';
    if (style.glassmorphism) return hexToRgba(bgColor, 0.8);
    return bgColor;
  };

  const renderCTA = (btn, isMobile = false) => {
    if (!btn || !btn.visible || !btn.label) return null;
    
    const isOutline = btn.variant === 'outline';
    const isGhost = btn.variant === 'ghost';
    
    const sizeClasses = btn.size === 'sm' ? 'px-4 py-1.5 text-[9px]' : 
                       btn.size === 'lg' ? 'px-10 py-4 text-xs' : 
                       'px-8 py-3 text-[10px]';

    const baseClasses = `
      ${sizeClasses} 
      ${btn.design || 'rounded-full'} 
      font-black uppercase tracking-widest transition-all shrink-0 flex items-center justify-center border-2
      ${isMobile ? 'w-full py-5 text-sm mt-10 shadow-2xl' : 'hover:scale-105 active:scale-95'}
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

  const desktopJustify = JUSTIFY_MAP[layout.justify] || 'lg:items-center';
  const mobileJustify = JUSTIFY_MAP_MOBILE[layout.justifyMobile] || 'items-start';

  return (
    <header className="relative top-0 left-0 w-full z-40 transition-all duration-300">
      <nav 
        className={`py-6 transition-all duration-500 ${scrolled || isOpen ? 'shadow-2xl py-4' : 'py-8'}`}
        style={{ 
          backgroundColor: getBgColor(),
          backdropFilter: style.glassmorphism && getBgColor() !== 'transparent' ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: style.glassmorphism && getBgColor() !== 'transparent' ? 'blur(20px)' : 'none'
        }}
      >
        <div className={`${layout.width === 'full' ? 'w-full px-6 md:px-12' : 'container mx-auto px-12 md:px-6'} flex flex-col gap-6 ${mobileJustify} ${desktopJustify}`}>
          
          {visibility.showLogo !== false && (
            <Link to="home" smooth={true} className="cursor-pointer group flex items-center gap-4">
              {logo.imageUrl && <img src={logo.imageUrl} alt="Logo" className="h-12 w-auto object-contain" />}
              {logo.text && (
                <span 
                  className={`
                    ${style.logoTextSize || 'text-3xl'} 
                    ${style.logoTextWeight || 'font-light'} 
                    ${style.logoTextTransform || 'uppercase'} 
                    tracking-[0.4em] group-hover:brightness-125 transition-all
                  `} 
                  style={{ color: textColor, fontFamily: style.logoTextFont || 'inherit' }}
                >
                    {logo.text}<span style={{ color: accentColor }}>.</span>
                </span>
              )}
            </Link>
          )}

          <div className="hidden lg:flex items-center gap-12 border-t border-white/5 pt-6 w-full justify-center">
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
                tracking-[0.3em] cursor-pointer transition-all
                `}
                >                {item.label}
              </Link>
            ))}
            {renderCTA(ctaButton)}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} style={{ color: textColor }} className="lg:hidden absolute right-6 top-8">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

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
            <div className="p-10 h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-12 text-center">
              <div className="flex flex-col gap-10">
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
                      className="text-5xl font-black uppercase tracking-tighter transition-all"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              {renderCTA(ctaButton, true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
