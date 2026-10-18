"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from '@/lib/lucide-shim';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'faq',
  variant: 'v2',
  label: 'Acordeão Moderno (v2)',
  defaultData: {
    title: 'Dúvidas {Comuns}',
    subtitle: 'Resolvemos suas principais questões aqui.',
    items: [{ question: 'Qual o prazo?', answer: 'Entrega rápida em 5 dias.' }],
    style: {}
  }
};

export const schema = [
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'title', label: 'Título {Destaque}', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'items', label: 'Perguntas', type: 'array', itemFields: [ { key: 'question', label: 'Pergunta', type: 'text' }, { key: 'answer', label: 'Resposta', type: 'textarea' } ] }
    ]
  },
  ...commonFineTuning
];

export default function FAQ_V2({ data }) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!data) return null;

  const { 
    title = "Perguntas {Frequentes}", 
    subtitle = "Tudo o que você precisa saber para iniciar seu projeto com total segurança.", 
    items = [], 
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';

  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} style={{ color: accentColor }}>
          {part}
        </span>
      ) : part
    );
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" style={{ backgroundColor: style.customBg || 'transparent' }}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}20` }}>
            <Sparkles size={14} style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>Support Center</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8"
          >
            {renderTitle(title)}
          </motion.h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid gap-4">
          {items.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${isOpen ? 'bg-zinc-900/50 shadow-2xl' : 'bg-zinc-950/30 border-white/5 hover:border-white/10'}`}
                style={{ borderColor: isOpen ? `${accentColor}44` : undefined }}
              >
                <button 
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full p-8 md:p-10 text-left flex items-center justify-between gap-6 group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xl font-black transition-colors duration-500" style={{ color: isOpen ? accentColor : '#3f3f46' }}>
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className={`text-lg md:text-xl font-bold transition-all duration-500 ${isOpen ? 'text-white translate-x-2' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'text-black rotate-180' : 'bg-white/5 text-zinc-600'}`} style={{ backgroundColor: isOpen ? accentColor : undefined }}>
                    <ChevronDown size={24} strokeWidth={2.5} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-10 md:px-24 pb-12 text-zinc-500 text-lg leading-relaxed font-medium">
                        <div className="pt-6 border-t border-white/5">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}