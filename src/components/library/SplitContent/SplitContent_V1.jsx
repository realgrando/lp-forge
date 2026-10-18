"use client";
import { motion } from 'framer-motion';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'splitcontent',
  variant: 'v1',
  label: 'Texto e Imagem (v1)',
  defaultData: {
    title: 'Design {Estratégico}',
    style: {}
  }
};

export const schema = [...commonFineTuning];

export default function SplitContent_V1({ data }) {
  if (!data) return null;
  const { title, text, image, layout = {} } = data;
  const reverse = layout.direction === 'reverse';

  return (
    <section className={`py-24 px-6`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
          <div className="lg:w-1/2">
            <motion.img 
              initial={{ opacity: 0, x: reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src={image} 
              alt={title} 
              className="w-full rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          <div className="lg:w-1/2">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-none">{title}</h2>
              <div className="h-1 w-20 bg-brand-primary mb-8" />
              <p className="text-zinc-400 text-lg leading-relaxed whitespace-pre-line">{text}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}