"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from '@/lib/lucide-shim';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'cta',
  variant: 'v2',
  label: 'Impacto Elite (v2)',
  defaultData: {
    title: 'Design de {Alto Impacto}',
    subtitle: 'Transforme sua presença online hoje.',
    button: { label: 'Quero meu site', url: '#contact' },
    style: {}
  }
};

export const schema = [
  { group: '2. Conteúdo', fields: [ { key: 'title', label: 'Título de Impacto', type: 'text' }, { key: 'subtitle', label: 'Subtítulo', type: 'textarea' }, { key: 'button.label', label: 'Texto Botão', type: 'text' }, { key: 'button.url', label: 'Link', type: 'text' } ] },
  ...commonFineTuning
];

export default function CTA_V2_Impact({ data }) {
  if (!data) return null;

  const { title = "Pronto para {Transformar} seu Projeto?", subtitle = "Fale agora com um especialista e garanta o melhor resultado para sua obra.", button = {}, style = {} } = data;

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
    <section className="py-32 px-6 relative overflow-hidden" style={{ backgroundColor: style.customBg || 'transparent' }}>
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative max-w-6xl mx-auto rounded-[4rem] bg-zinc-900 border border-white/5 p-12 md:p-24 overflow-hidden shadow-3xl shadow-black/50"
        >
          {/* Cinematic Background */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" 
          />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <Sparkles size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Oportunidade de Elite</span>
              </motion.div>
              
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                {renderTitle(title)}
              </motion.h2>
              
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-zinc-400 text-lg md:text-2xl font-medium leading-relaxed max-w-xl">
                {subtitle}
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="shrink-0">
              <a 
                href={button.url || "#"}
                className="group relative inline-flex items-center justify-center px-12 py-8 bg-brand-primary text-black rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 rounded-[2.5rem] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{button.label || "Solicitar Orçamento"}</span>
                <ArrowRight size={22} className="relative z-10 ml-4 group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
              </a>
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-zinc-600">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800" />)}
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-wider">+400 Clientes Atendidos</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}