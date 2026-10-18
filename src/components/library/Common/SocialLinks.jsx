"use client";
// src/components/ui/SocialLinks.jsx
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Twitter, Linkedin, Youtube } from '@/lib/lucide-shim';

const ICON_MAP = {
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: MessageCircle,
  twitter: Twitter,
  linkedin: Linkedin,
  tiktok: Youtube
};

export default function SocialLinks({ items = [], settings = {} }) {
  // Pega as configurações ou usa padrões seguros
  const { 
    align = 'left',          // 'left', 'center', 'right'
    label = '',              // Texto (ex: "Siga-nos")
    labelPosition = 'top',   // 'top' (em cima) ou 'side' (ao lado)
    buttonStyle = 'outline', // 'outline' (borda), 'solid' (fundo), 'minimal' (só icone)
    size = 'md'              // 'sm', 'md', 'lg'
  } = settings;

  // Mapa de Alinhamento (Flexbox)
  const alignClass = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right'
  }[align] || 'justify-start';

  // Mapa de Container (Controla se o texto fica em cima ou do lado)
  const containerClass = labelPosition === 'side' 
    ? `flex-row items-center gap-4 ${alignClass}` 
    : `flex-col gap-3 ${align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'}`;

  // Tamanhos
  const sizes = {
    sm: { p: 'p-2', icon: 16 },
    md: { p: 'p-3', icon: 20 },
    lg: { p: 'p-4', icon: 24 },
  }[size] || sizes.md;

  // Estilos dos Botões
  const btnStyles = {
    outline: 'bg-white/5 border border-white/10 text-gray-400 hover:bg-brand-primary hover:text-black hover:border-brand-primary',
    solid: 'bg-brand-primary text-black hover:bg-white hover:text-black',
    minimal: 'bg-transparent text-gray-400 hover:text-brand-primary p-0'
  };

  // Se não houver itens ativos, não renderiza nada
  if (!items.some(i => i.active)) return null;

  return (
    <div className={`flex w-full ${containerClass}`}>
      
      {/* LABEL (Opcional) */}
      {label && (
        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
          {label}
        </span>
      )}

      {/* ÍCONES */}
      <div className={`flex flex-wrap gap-3 ${alignClass}`}>
        {items.map((social, index) => {
          if (!social.active) return null;
          const Icon = ICON_MAP[social.id] || MessageCircle;
          
          return (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                rounded-full transition-all duration-300 shadow-sm
                ${buttonStyle === 'minimal' ? '' : sizes.p}
                ${btnStyles[buttonStyle] || btnStyles.outline}
              `}
              aria-label={social.label}
            >
              <Icon size={sizes.icon} />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}