"use client";
// src/components/library/Contact/Contact_V3_SplitMap.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'contact',
  variant: 'v3',
  label: 'Split Map & Form (v3)',
  defaultData: {
    badge: 'Visite-nos',
    headline: 'Estamos de portas {abertas} para você',
    subtitle: 'Venha conhecer nosso espaço ou envie uma mensagem para iniciar seu projeto.',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    phone: '+55 11 99999-9999',
    email: 'contato@nivix.com',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197368545803!2d-46.65434522467006!3d-23.56133747880016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1714578500000!5m2!1spt-BR!2sbr',
    formTitle: 'Envie uma mensagem',
    formButtonLabel: 'Enviar Mensagem',
    layout: { paddingY: 'py-0' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-0', label: 'Sem Espaçamento'}, {value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}] }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'address', label: 'Endereço', type: 'textarea' },
      { key: 'phone', label: 'Telefone', type: 'text' },
      { key: 'email', label: 'E-mail', type: 'text' },
      { key: 'mapUrl', label: 'Google Maps Embed URL', type: 'text' },
      { key: 'formTitle', label: 'Título do Formulário', type: 'text' },
      { key: 'formButtonLabel', label: 'Botão do Formulário', type: 'text' }
    ]
  },
  ...commonFineTuning
];

export default function Contact_V3_SplitMap({ data }) {
  const [formState, setFormState] = useState('idle');

  if (!data) return null;

  const { badge, headline, subtitle, address, phone, email, mapUrl, formTitle, formButtonLabel, visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section 
      className={`${layout.paddingY || 'py-0'} relative flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-white`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      {/* Lado Esquerdo: Formulário e Info */}
      <div className="flex-1 px-6 py-20 lg:py-32 lg:px-20 xl:px-32 flex flex-col justify-center relative z-10">
        <div className="max-w-xl">
          {visibility.showBadge !== false && badge && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10 bg-white/5"
              style={{ color: accentColor }}
            >
              {badge}
            </motion.span>
          )}
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter mb-6 leading-[0.9]`}
          >
            {renderHighlightedText(headline)}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg font-medium mb-16"
          >
            {subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {address && (
              <div className="flex gap-4 items-start">
                <MapPin size={24} style={{ color: accentColor }} className="shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Endereço</h4>
                  <p className="font-bold text-zinc-200">{address}</p>
                </div>
              </div>
            )}
            <div className="space-y-6">
              {phone && (
                <div className="flex gap-4 items-center">
                  <Phone size={20} style={{ color: accentColor }} className="shrink-0" />
                  <span className="font-bold text-zinc-200">{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex gap-4 items-center">
                  <Mail size={20} style={{ color: accentColor }} className="shrink-0" />
                  <span className="font-bold text-zinc-200">{email}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5"
          >
            <h3 className="text-2xl font-black mb-8">{formTitle}</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Seu Nome" required className="w-full bg-black/50 border border-white/5 rounded-2xl p-5 text-sm font-medium outline-none focus:border-[#EAB308]/50 transition-colors" />
              <input type="email" placeholder="Seu E-mail" required className="w-full bg-black/50 border border-white/5 rounded-2xl p-5 text-sm font-medium outline-none focus:border-[#EAB308]/50 transition-colors" />
              <textarea placeholder="Como podemos ajudar?" required rows="4" className="w-full bg-black/50 border border-white/5 rounded-2xl p-5 text-sm font-medium outline-none focus:border-[#EAB308]/50 transition-colors resize-none" />
              
              <button 
                type="submit" 
                disabled={formState === 'loading' || formState === 'success'}
                className="w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                style={{ backgroundColor: accentColor, color: '#000' }}
              >
                {formState === 'idle' ? (
                  <><Send size={16} /> {formButtonLabel}</>
                ) : formState === 'loading' ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  'Mensagem Enviada!'
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Lado Direito: Mapa */}
      <div className="flex-1 relative min-h-[50vh] lg:min-h-screen">
        {mapUrl ? (
          <iframe 
            src={mapUrl} 
            className="absolute inset-0 w-full h-full border-none grayscale opacity-80" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold uppercase tracking-widest">
            Mapa Indisponível
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent lg:w-32 pointer-events-none" style={{ background: `linear-gradient(to right, ${style.customBg || '#09090b'} 0%, transparent 100%)` }} />
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
