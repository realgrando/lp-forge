"use client";
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Sparkles, CheckCircle2 } from '@/lib/lucide-shim';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'contact',
  variant: 'v2',
  label: 'Elite (v2)',
  defaultData: {
    title: 'Design de {Alto Impacto}',
    subtitle: 'Transforme sua presença online hoje.',
    phone: '(11) 99999-0000',
    email: 'contato@nivix.com',
    style: {}
  }
};

export const schema = [
  { 
    group: '2. Conteúdo', 
    fields: [ 
      { key: 'title', label: 'Título {Destaque}', type: 'text' }, 
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'infoTitle', label: 'Título da Info', type: 'text' },
      { key: 'phone', label: 'WhatsApp/Tel', type: 'text' }, 
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'address', label: 'Endereço', type: 'text' },
      { key: 'formTitle', label: 'Título do Form', type: 'text' },
      { key: 'formSubtitle', label: 'Subtítulo do Form', type: 'text' },
      { key: 'services', label: 'Lista de Serviços', type: 'array', itemFields: [{ key: 'service', label: 'Serviço', type: 'text' }] }
    ] 
  },
  ...commonFineTuning
];

export default function Contact_V2_Elite({ data }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!data) return null;

  const { 
    title = "Vamos iniciar seu {Próximo Grande} Projeto?", 
    subtitle = "Estamos prontos para transformar sua visão em uma realidade de alto padrão. Entre em contato e receba uma consultoria exclusiva.", 
    infoTitle = "Canais de Atendimento",
    phone, email, address,
    formTitle = "Solicite um Orçamento",
    formSubtitle = "Preencha os dados abaixo e retornaremos em até 24h.",
    services = ["Consultoria Premium", "Reforma Geral", "Design de Interiores", "Outros"],
    style = {}
  } = data;

  const accentColor = style.customAccent || '#EAB308';

  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="text-brand-primary relative inline-block">
          {part}
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-primary/20 rounded-full" />
        </span>
      ) : part
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-zinc-950" style={{ backgroundColor: style.customBg || 'transparent' }}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] rounded-full translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
          
          {/* LADO ESQUERDO: CONTEÚDO E INFO */}
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8">
                <Sparkles size={14} className="text-brand-primary" />
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">Premium Support</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                {renderTitle(title)}
              </h2>
              
              <p className="text-zinc-500 text-lg md:text-xl font-medium mb-16 leading-relaxed">
                {subtitle}
              </p>

              <div className="space-y-10">
                <h3 className="text-zinc-700 text-xs font-black uppercase tracking-[0.4em] mb-6">{infoTitle}</h3>
                
                {phone && (
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-zinc-900 rounded-3xl flex items-center justify-center text-brand-primary border border-white/5 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-2xl">
                      <Phone size={24} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-zinc-600 font-black tracking-widest mb-1">WhatsApp / Voz</span>
                      <span className="text-2xl font-black text-white group-hover:text-brand-primary transition-colors">{phone}</span>
                    </div>
                  </div>
                )}

                {email && (
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-zinc-900 rounded-3xl flex items-center justify-center text-brand-primary border border-white/5 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-2xl">
                      <Mail size={24} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-zinc-600 font-black tracking-widest mb-1">E-mail Corporativo</span>
                      <span className="text-2xl font-black text-white group-hover:text-brand-primary transition-colors">{email}</span>
                    </div>
                  </div>
                )}

                {address && (
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-zinc-900 rounded-3xl flex items-center justify-center text-brand-primary border border-white/5 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-2xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-zinc-600 font-black tracking-widest mb-1">Escritório Central</span>
                      <span className="text-lg font-bold text-white max-w-[240px] block leading-snug">{address}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO ELITE */}
          <div className="lg:w-7/12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-1 md:p-1.5 rounded-[3.5rem] bg-gradient-to-br from-brand-primary/20 via-white/5 to-transparent"
            >
              <div className="bg-zinc-900/90 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-3xl">
                {sent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="py-20 text-center flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-brand-primary rounded-[2rem] flex items-center justify-center text-black mb-8 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Mensagem Enviada!</h3>
                    <p className="text-zinc-500 text-lg font-medium max-w-sm mx-auto mb-10">Agradecemos o contato. Nossa equipe de especialistas retornará em breve.</p>
                    <button 
                      onClick={() => setSent(false)} 
                      className="px-10 py-4 border-2 border-brand-primary/30 rounded-2xl text-brand-primary font-black uppercase text-[10px] tracking-widest hover:bg-brand-primary hover:text-black transition-all"
                    >
                      Enviar Nova Mensagem
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-12">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{formTitle}</h3>
                      <p className="text-zinc-500 font-medium">{formSubtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-4">Nome Completo</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Seu nome"
                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white focus:border-brand-primary outline-none transition-all font-bold placeholder:text-zinc-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-4">Telefone / WhatsApp</label>
                          <input 
                            required
                            type="tel" 
                            placeholder="(00) 00000-0000"
                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white focus:border-brand-primary outline-none transition-all font-bold placeholder:text-zinc-800"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-4">Selecione o Serviço</label>
                        <div className="relative group">
                          <select className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white focus:border-brand-primary outline-none transition-all font-bold appearance-none cursor-pointer">
                            <option className="bg-zinc-900">Como podemos ajudar?</option>
                            {services.map((service, i) => (
                              <option key={i} value={service} className="bg-zinc-900">{service}</option>
                            ))}
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700 group-focus-within:text-brand-primary transition-colors">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-4">Detalhes da sua necessidade</label>
                        <textarea 
                          required
                          placeholder="Conte-nos brevemente sobre seu projeto..."
                          rows={4}
                          className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white focus:border-brand-primary outline-none transition-all font-bold placeholder:text-zinc-800 resize-none"
                        />
                      </div>

                      <button 
                        disabled={loading}
                        className={cn(
                          "w-full py-6 bg-brand-primary text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 relative overflow-hidden group",
                          loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(234,179,8,0.2)] active:scale-100"
                        )}
                      >
                        {loading ? (
                          <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            <span className="relative z-10">Enviar Solicitação de Elite</span>
                            <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
