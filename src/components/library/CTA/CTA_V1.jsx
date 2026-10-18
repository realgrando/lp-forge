"use client";
import { motion } from 'framer-motion';
import { ArrowRight } from '@/lib/lucide-shim';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'cta',
  variant: 'v1',
  label: 'Simples (v1)',
  defaultData: {
    title: 'Pronto para {Começar}?',
    subtitle: 'Entre em contato agora mesmo.',
    style: {}
  }
};

export const schema = [
  { group: '2. Conteúdo', fields: [ { key: 'title', label: 'Título', type: 'text' }, { key: 'subtitle', label: 'Subtítulo', type: 'textarea' } ] },
  ...commonFineTuning
];

export default function CTA_V1({ data }) {
  if (!data) return null;

  const { title, subtitle, button = {}, layout = {} } = data;

  return (
    <section className={`py-24 px-6`}>
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-brand-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(234,179,8,0.2)]"
        >
          {/* Decoração de fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <h2 className="text-3xl md:text-6xl font-black text-black mb-8 leading-tight relative z-10">
            {title}
          </h2>
          <p className="text-black/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium relative z-10">
            {subtitle}
          </p>

          <a 
            href={button.url || "#"}
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-2xl relative z-10 group active:scale-95"
          >
            {button.label || "Get Started"}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}