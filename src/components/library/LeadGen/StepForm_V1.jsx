"use client";
// src/components/library/LeadGen/StepForm_V1.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send, CheckCircle2 } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'leadgen',
  variant: 'v1',
  label: 'Formulário por Etapas (v1)',
  defaultData: {
    badge: "Orçamento Rápido",
    headline: "Receba uma proposta {personalizada}",
    subtitle: "Responda algumas perguntas e nossa equipe enviará os detalhes em até 24h.",
    steps: [
      {
        title: "Tipo de Projeto",
        questions: [
          { label: "O que você busca?", type: "select", options: [
            { value: "reforma", label: "Reforma Residencial" },
            { value: "construcao", label: "Construção do Zero" },
            { value: "pizzaria", label: "Evento / Catering" },
            { value: "outro", label: "Outro" }
          ]}
        ]
      },
      {
        title: "Detalhes Técnicos",
        questions: [
          { label: "Qual a metragem ou número de pessoas?", type: "text", placeholder: "Ex: 100m² ou 50 pessoas" },
          { label: "Prazo desejado", type: "select", options: [
            { value: "urgente", label: "O mais rápido possível" },
            { value: "mes", label: "Próximo mês" },
            { value: "planejamento", label: "Estou apenas planejando" }
          ]}
        ]
      },
      {
        title: "Seu Contato",
        questions: [
          { label: "Seu melhor E-mail", type: "text", placeholder: "seu@email.com" },
          { label: "WhatsApp", type: "text", placeholder: "(00) 00000-0000" }
        ]
      }
    ],
    buttonLabel: "Solicitar Orçamento",
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
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'steps', label: 'Etapas do Formulário', type: 'array', itemFields: [
        { key: 'title', label: 'Título da Etapa', type: 'text' },
        { key: 'questions', label: 'Perguntas', type: 'array', itemFields: [
          { key: 'label', label: 'Label da Pergunta', type: 'text' },
          { key: 'type', label: 'Tipo de Campo', type: 'select', options: [{value: 'text', label: 'Texto'}, {value: 'select', label: 'Seleção'}] },
          { key: 'placeholder', label: 'Placeholder', type: 'text' },
          { key: 'options', label: 'Opções (se for Seleção)', type: 'array', itemFields: [
            { key: 'value', label: 'Valor', type: 'text' },
            { key: 'label', label: 'Rótulo', type: 'text' }
          ]}
        ]}
      ]},
      { key: 'buttonLabel', label: 'Texto do Botão Final', type: 'text' }
    ]
  },
  ...commonFineTuning
];

export default function StepForm_V1({ data }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  if (!data) return null;

  const { badge, headline, subtitle, steps = [], buttonLabel, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => currentStep < totalSteps - 1 ? setCurrentStep(currentStep + 1) : setIsSubmitted(true);
  const handleBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);

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

  if (isSubmitted) {
    return (
      <section className={`${layout.paddingY || 'py-24'} bg-zinc-950 text-white text-center`}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto px-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-4xl font-black mb-4">Pedido Enviado!</h2>
          <p className="text-zinc-500">Obrigado pelo interesse. Em breve você receberá um contato de nossa equipe de elite.</p>
          <button onClick={() => { setIsSubmitted(false); setCurrentStep(0); }} className="mt-8 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Enviar outro pedido</button>
        </motion.div>
      </section>
    );
  }

  return (
    <section 
      className={`${layout.paddingY || 'py-24'} relative overflow-hidden bg-zinc-950 text-white`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          {badge && <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block" style={{ color: accentColor }}>{badge}</span>}
          <h2 className={`${style.titleSize || 'text-4xl md:text-5xl'} font-black tracking-tighter mb-4`}>{renderHighlightedText(headline)}</h2>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Passo {currentStep + 1} de {totalSteps}</span>
               <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{Math.round(progress)}% Completo</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full" 
                 style={{ backgroundColor: accentColor }}
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
               />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl">
             <AnimatePresence mode="wait">
               <motion.div 
                 key={currentStep}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-10"
               >
                 <div>
                    <h3 className="text-2xl font-black mb-2">{steps[currentStep]?.title}</h3>
                    <div className="h-1 w-10 bg-zinc-800 rounded-full" style={{ backgroundColor: `${accentColor}44` }} />
                 </div>

                 <div className="space-y-8">
                    {steps[currentStep]?.questions?.map((q, idx) => (
                      <div key={idx} className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">{q.label}</label>
                        {q.type === 'select' ? (
                          <select className="w-full bg-black/50 border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-[#EAB308]/50 transition-all appearance-none cursor-pointer">
                            {q.options?.map((opt, oidx) => (
                              <option key={oidx} value={opt.value} className="bg-zinc-900">{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input type="text" placeholder={q.placeholder} className="w-full bg-black/50 border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-[#EAB308]/50 transition-all" />
                        )}
                      </div>
                    ))}
                 </div>
               </motion.div>
             </AnimatePresence>

             <div className="flex gap-4 mt-12 pt-8 border-t border-white/5">
                {currentStep > 0 && (
                  <button 
                    onClick={handleBack}
                    className="flex-1 py-5 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                  >
                    <ArrowLeft size={16} /> Voltar
                  </button>
                )}
                <button 
                  onClick={handleNext}
                  className="flex-[2] py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                  style={{ backgroundColor: accentColor, color: '#000' }}
                >
                  {currentStep === totalSteps - 1 ? (
                    <><Send size={16} /> {buttonLabel}</>
                  ) : (
                    <>Próximo <ArrowRight size={16} /></>
                  )}
                </button>
             </div>
          </div>
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
