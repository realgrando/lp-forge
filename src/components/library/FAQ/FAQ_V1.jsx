"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from '@/lib/lucide-shim';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'faq',
  variant: 'v1',
  label: 'Clássico (v1)',
  defaultData: {
    title: 'Perguntas {Frequentes}',
    subtitle: 'Tudo o que você precisa saber.',
    items: [{ question: 'Como funciona?', answer: 'É simples e rápido.' }],
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

export default function FAQ_V1({ data }) {
  const [openIdx, setOpenIdx] = useState(null);

  if (!data) return null;

  const { title, subtitle, items = [], layout = {} } = data;

  return (
    <section className={`py-24 px-6`}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 font-display"
          >
            {title}
          </motion.h2>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <div key={index} className="rounded-2xl border border-white/5 bg-bg-elevated/30 overflow-hidden transition-all hover:border-brand-primary/20">
                <button 
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle size={20} className={isOpen ? "text-brand-primary" : "text-gray-500"} />
                    <span className={`font-bold transition-colors ${isOpen ? "text-brand-primary" : "text-white"}`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full transition-all ${isOpen ? "bg-brand-primary text-black rotate-0" : "bg-white/5 text-gray-500 rotate-180"}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-14 pb-8 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}