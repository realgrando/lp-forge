"use client";
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from '@/lib/lucide-shim';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'contact',
  variant: 'v1',
  label: 'Padrão (v1)',
  defaultData: {
    title: 'Fale {Conosco}',
    subtitle: 'Estamos prontos para te atender.',
    style: {}
  }
};

export const schema = [
  { group: '2. Conteúdo', fields: [ { key: 'title', label: 'Título', type: 'text' }, { key: 'subtitle', label: 'Subtítulo', type: 'textarea' } ] },
  ...commonFineTuning
];

export default function Contact_V1({ data }) {
  if (!data) return null;

  const { 
    title, subtitle, 
    fields = {}, 
    layout = {}, 
    visibility = {},
    labels = {} 
  } = data;

  const showInfo = visibility.showInfo !== false;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulário enviado! (Simulação)');
  };

  return (
    <section id="contact" className={`py-24 px-6`}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Lado Esquerdo: Texto e Info */}
          <div className={`lg:w-1/2 ${showInfo ? '' : 'hidden'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                {title || "Vamos iniciar seu projeto?"}
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed">
                {subtitle || "Entre em contato hoje mesmo para um orçamento gratuito e sem compromisso."}
              </p>

              <div className="space-y-8">
                {labels.phone && (
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-gray-500 font-bold tracking-widest mb-1">Ligue agora</span>
                      <span className="text-xl font-bold text-white">{labels.phone}</span>
                    </div>
                  </div>
                )}
                {labels.email && (
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-300">
                      <Mail size={24} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-gray-500 font-bold tracking-widest mb-1">E-mail</span>
                      <span className="text-xl font-bold text-white">{labels.email}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Lado Direito: Formulário */}
          <div className={`${showInfo ? 'lg:w-1/2' : 'w-full max-w-2xl mx-auto'}`}>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-elevated/30 p-8 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Ex: João Silva"
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-brand-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Telefone</label>
                  <input 
                    type="tel" 
                    placeholder="(00) 00000-0000"
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-brand-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Qual serviço você precisa?</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-brand-primary outline-none transition-all appearance-none cursor-pointer">
                  <option className="bg-zinc-900">Selecione uma opção</option>
                  {fields.services?.map((service, i) => (
                    <option key={i} value={service} className="bg-zinc-900">{service}</option>
                  )) || (
                    <>
                      <option className="bg-zinc-900">Drywall</option>
                      <option className="bg-zinc-900">Pintura</option>
                      <option className="bg-zinc-900">Reforma Geral</option>
                    </>
                  )}
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Detalhes do Projeto</label>
                <textarea 
                  placeholder="Conte-nos um pouco sobre o que você precisa..."
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-brand-primary outline-none transition-all"
                />
              </div>

              <button className="w-full py-5 bg-brand-primary text-black font-black uppercase tracking-widest rounded-2xl hover:bg-brand-secondary hover:shadow-[0_10px_30px_rgba(234,179,8,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                <Send size={20} />
                Enviar Solicitação
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
}