"use client";
// src/components/library/Dividers/SectionDivider_V1.jsx
import React from 'react';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'dividers',
  variant: 'v1',
  label: 'Transição SVG (v1)',
  defaultData: {
    shape: 'wave',
    color: '#09090b',
    height: 100,
    flip: false,
    invert: false
  }
};

export const schema = [
  {
    group: '1. Configurações do Separador',
    fields: [
      { key: 'shape', label: 'Formato', type: 'select', options: [
        { value: 'wave', label: 'Onda Suave' },
        { value: 'curve', label: 'Curva Única' },
        { value: 'angle', label: 'Ângulo / Slope' },
        { value: 'triangle', label: 'Triângulo' },
        { value: 'mountain', label: 'Montanhas' }
      ]},
      { key: 'color', label: 'Cor do Separador', type: 'color' },
      { key: 'height', label: 'Altura (px)', type: 'range', min: 20, max: 300, step: 10, default: 100 },
      { key: 'flip', label: 'Inverter Horizontal (Flip)', type: 'toggle', default: false },
      { key: 'invert', label: 'Inverter Vertical (Invert)', type: 'toggle', default: false }
    ]
  }
];

const shapes = {
  wave: (color) => (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
      <path fill={color} d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,181.3C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  ),
  curve: (color) => (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
      <path fill={color} d="M0,160C480,320,960,320,1440,160L1440,320L0,320Z"></path>
    </svg>
  ),
  angle: (color) => (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
      <path fill={color} d="M0,320L1440,0L1440,320L0,320Z"></path>
    </svg>
  ),
  triangle: (color) => (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
      <path fill={color} d="M0,320L720,0L1440,320L0,320Z"></path>
    </svg>
  ),
  mountain: (color) => (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
      <path fill={color} d="M0,320L120,280L240,320L360,240L480,320L600,200L720,320L840,180L960,320L1080,220L1200,320L1320,260L1440,320L0,320Z"></path>
    </svg>
  )
};

export default function SectionDivider_V1({ data }) {
  if (!data) return null;

  const { shape = 'wave', color = '#09090b', height = 100, flip = false, invert = false } = data;

  const transform = `
    ${flip ? 'scaleX(-1)' : ''} 
    ${invert ? 'scaleY(-1)' : ''}
  `.trim();

  return (
    <div 
      className="relative w-full overflow-hidden leading-[0]" 
      style={{ 
        height: `${height}px`,
        transform: transform || undefined,
        zIndex: 50
      }}
    >
      {shapes[shape]?.(color)}
    </div>
  );
}
