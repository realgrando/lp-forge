"use client";
import { motion } from 'framer-motion';
import { HelpCircle, Plus, Minus, Sparkles } from '@/lib/lucide-shim';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'faq',
  variant: 'v3',
  label: 'Grid Moderno (v3)',
  defaultData: {
    title: 'FAQ {Premium}',
    items: [{ question: 'Suporte?', answer: 'Temos suporte 24/7 via WhatsApp.' }],
    style: {}
  }
};

export const schema = [
  { group: '2. Conteúdo', fields: [ { key: 'title', label: 'Título {Destaque}', type: 'text' }, { key: 'items', label: 'FAQ Grid', type: 'array', itemFields: [ { key: 'question', label: 'Pergunta', type: 'text' }, { key: 'answer', label: 'Resposta', type: 'textarea' } ] } ] },
  ...commonFineTuning
];

export default function FAQ_V3_ModernGrid({ data }) {
  const [openIdx, setOpenIdx] = useState(null);

  if (!data) return null;

  const { 
    title = "Dúvidas {Frequentes}", 
    subtitle = "Tudo o que você precisa saber sobre nossos processos e entregas de alto padrão.", 
    items = [], 
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';

  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="text-brand-primary">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#09090b]" style={{ backgroundColor: style.customBg || 'transparent' }}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* LADO ESQUERDO: TEXTO FIXO */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8">
                <HelpCircle size={14} className="text-brand-primary" />
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">FAQ Center</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                {renderTitle(title)}
              </h2>
              
              <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-12">
                {subtitle}
              </p>

              <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
                <Sparkles size={24} className="text-brand-primary mb-4" />
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Ainda tem dúvidas?</h4>
                <p className="text-zinc-500 text-sm font-medium mb-6">Nossa equipe de suporte está pronta para te atender pessoalmente.</p>
                <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-primary transition-colors">
                  Falar com Consultor
                </button>
              </div>
            </motion.div>
          </div>

          {/* LADO DIREITO: GRID DE PERGUNTAS */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {items.map((item, index) => {
                const isOpen = openIdx === index;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "group rounded-[2.5rem] border transition-all duration-500 overflow-hidden",
                      isOpen 
                        ? "bg-zinc-900 border-brand-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                        : "bg-zinc-900/30 border-white/5 hover:border-white/10"
                    )}
                  >
                    <button 
                      onClick={() => setOpenIdx(isOpen ? null : index)}
                      className="w-full p-8 md:p-10 text-left flex items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-6">
                        <span className={cn(
                          "text-sm font-black transition-colors duration-500",
                          isOpen ? "text-brand-primary" : "text-zinc-700"
                        )}>
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </span>
                        <span className={cn(
                          "text-lg md:text-2xl font-black tracking-tight transition-all duration-500",
                          isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                        )}>
                          {item.question}
                        </span>
                      </div>
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        isOpen ? "bg-brand-primary text-black rotate-180" : "bg-white/5 text-zinc-600"
                      )}>
                        {isOpen ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                      </div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0
                      }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-10 md:px-24 pb-12">
                        <div className="pt-8 border-t border-white/5 text-zinc-500 text-lg leading-relaxed font-medium">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
