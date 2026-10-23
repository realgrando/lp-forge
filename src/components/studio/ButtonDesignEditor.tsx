"use client";

import React from "react";
import {
  BorderRadiusPreset,
  ButtonConfig,
  ButtonSize,
  ButtonVariant,
} from "@/types/site";
import { Box, Layers, Palette, Sliders, Sparkles } from "lucide-react";
import { SegmentedControl } from "./ui/SegmentedControl";
import { ColorFieldRow } from "./ui/ColorFieldRow";
import { ModernToggle } from "./ui/ModernToggle";

interface ButtonDesignEditorProps {
  label: string;
  value: ButtonConfig;
  onChange: (next: ButtonConfig) => void;
  defaultAccentColor: string;
}

export const ButtonDesignEditor: React.FC<ButtonDesignEditorProps> = ({
  label,
  value,
  onChange,
  defaultAccentColor,
}) => {
  const btn: ButtonConfig = value || {
    enabled: true,
    text: "Botão",
    url: "#",
    variant: "solid",
    size: "md",
  };

  const update = (patch: Partial<ButtonConfig>) => {
    onChange({ ...btn, ...patch });
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-zinc-950/60 p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#F4B400]/10 border border-[#F4B400]/20 flex items-center justify-center text-[#F4B400]">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-100 block">
              Design do Botão ({label})
            </span>
            <span className="text-[10px] text-zinc-400 block">
              Estilo, tamanho, cantos e cores do botão
            </span>
          </div>
        </div>
      </div>

      {/* 1. Variante de Acabamento Visual */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 block">
          Estilo / Acabamento do Botão
        </label>
        <SegmentedControl<ButtonVariant>
          value={btn.variant || "solid"}
          onChange={(v) => update({ variant: v })}
          columns={5}
          options={[
            { value: "solid", label: "Sólido" },
            { value: "outline", label: "Borda" },
            { value: "glass", label: "Glass" },
            { value: "3d", label: "3D" },
            { value: "ghost", label: "Ghost" },
          ]}
        />
      </div>

      {/* 2. Tamanho da Escala & Arredondamento */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 block">
            Escala de Tamanho
          </label>
          <SegmentedControl<ButtonSize>
            value={btn.size || "md"}
            onChange={(s) => update({ size: s })}
            columns={4}
            size="sm"
            options={[
              { value: "sm", label: "SM" },
              { value: "md", label: "MD" },
              { value: "lg", label: "LG" },
              { value: "xl", label: "XL" },
            ]}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 block">
            Arredondamento dos Cantos
          </label>
          <select
            value={btn.radius || ""}
            onChange={(e) =>
              update({
                radius: (e.target.value as BorderRadiusPreset) || undefined,
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
          >
            <option value="">Herdar da Seção</option>
            <option value="none">Reto (None)</option>
            <option value="sm">Suave (SM)</option>
            <option value="md">Médio (MD)</option>
            <option value="lg">Arredondado (LG)</option>
            <option value="full">Cápsula (Full Pill)</option>
          </select>
        </div>
      </div>

      {/* 3. Largura Total (Full Width) */}
      <ModernToggle
        label="Largura Total (100%)"
        description="Estica o botão para preencher toda a largura horizontal do container"
        checked={Boolean(btn.fullWidth)}
        onChange={(fw) => update({ fullWidth: fw })}
      />

      {/* 4. Cores Customizadas do Botão */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
          <Palette className="w-3.5 h-3.5 text-[#F4B400]" />
          <span>Cores do Botão (Opcionais)</span>
        </div>

        <ColorFieldRow
          label="Cor de Fundo do Botão"
          description="Sobrescreve a cor padrão da variante"
          value={btn.customBg}
          defaultValue={defaultAccentColor}
          onChange={(hex) => update({ customBg: hex })}
          onReset={() => update({ customBg: undefined })}
        />

        <ColorFieldRow
          label="Cor da Borda do Botão"
          description="Contorno na variante outline ou borda customizada"
          value={btn.customBorderColor}
          defaultValue="rgba(255,255,255,0.2)"
          onChange={(hex) => update({ customBorderColor: hex })}
          onReset={() => update({ customBorderColor: undefined })}
        />
      </div>
    </div>
  );
};
