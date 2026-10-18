"use client";
// src/components/library/Stats/Stats_V3_Impact.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { commonFineTuning } from '../Common/SchemaProps';

const StatCounter = ({ value, label, accentColor }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (observer && entries[0].isIntersecting) {
        let start = 0;
        const end = numericValue;
        const duration = 2000;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setDisplayValue(Math.floor(progress * end));
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  return (
    <div ref={ref} className="text-center group">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-6xl md:text-8xl font-black tracking-tighter mb-4 transition-transform group-hover:scale-110 duration-500"
        style={{ color: accentColor }}
      >
        {displayValue}{suffix}
      </motion.div>
      <div className="h-1 w-12 bg-white/10 mx-auto mb-6 rounded-full transition-all group-hover:w-24 group-hover:bg-[#EAB308]/40" style={{ backgroundColor: undefined }} />
      <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">{label}</p>
    </div>
  );
};

export const metadata = {
  type: 'stats',
  variant: 'v3',
  label: 'Contadores de Impacto (v3)',
  defaultData: {
    badge: "Nossos Números",
    headline: "Resultados que {atestam} nossa liderança",
    stats: [
      { label: "Obras Entregues", value: "150+" },
      { label: "Clientes Felizes", value: "2.4k" },
      { label: "Anos de Mercado", value: "15" },
      { label: "Prêmios de Elite", value: "12" }
    ],
    layout: { paddingY: 'py-32' },
    style: { showAmbientLight: true }
  }
};

export const schema = [
  {
    group: '1. Estrutura',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'badge', label: 'Texto da Badge', type: 'text' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'stats', label: 'Estatísticas', type: 'array', itemFields: [
        { key: 'label', label: 'Rótulo', type: 'text' },
        { key: 'value', label: 'Valor (Ex: 100+)', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Stats_V3_Impact({ data }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  if (!data) return null;

  const { badge, headline, stats = [], layout = {}, style = {} } = data;
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

  return (
    <section 
      ref={containerRef}
      className={`${layout.paddingY || 'py-32'} relative overflow-hidden bg-black text-white`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      {/* Parallax Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 right-[10%] w-64 h-64 border border-white/5 rounded-full opacity-20 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 left-[5%] w-96 h-96 border border-white/5 rounded-full opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          {badge && <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: accentColor }}>{badge}</span>}
          <h2 className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter mb-6`}>{renderHighlightedText(headline)}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24">
           {stats.map((s, idx) => (
             <StatCounter key={idx} value={s.value} label={s.label} accentColor={accentColor} />
           ))}
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
