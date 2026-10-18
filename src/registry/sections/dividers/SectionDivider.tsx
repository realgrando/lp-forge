"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";

const sectionDividerSchema = z.object({
  shape: z.enum(["wave", "curve", "angle", "triangle", "mountain", "line"]),
  label: z.string(),
  color: z.string(),
  height: z.number(),
  flip: z.boolean(),
  invert: z.boolean(),
});

export type SectionDividerContent = z.infer<typeof sectionDividerSchema>;

const renderShape = (shape: SectionDividerContent["shape"], color: string) => {
  switch (shape) {
    case "wave":
      return (
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            fill={color}
            d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,181.3C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L0,320Z"
          />
        </svg>
      );
    case "curve":
      return (
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            fill={color}
            d="M0,160C480,320,960,320,1440,160L1440,320L0,320Z"
          />
        </svg>
      );
    case "angle":
      return (
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path fill={color} d="M0,320L1440,0L1440,320L0,320Z" />
        </svg>
      );
    case "triangle":
      return (
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path fill={color} d="M0,320L720,0L1440,320L0,320Z" />
        </svg>
      );
    case "mountain":
      return (
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            fill={color}
            d="M0,320L120,280L240,320L360,240L480,320L600,200L720,320L840,180L960,320L1080,220L1200,320L1320,260L1440,320L0,320Z"
          />
        </svg>
      );
    case "line":
    default:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-full h-px opacity-30"
            style={{ backgroundColor: color }}
          />
        </div>
      );
  }
};

export const SectionDividerSection = createSection<SectionDividerContent>({
  id: "dividers.line",
  name: "Divisor de Seção Estilizado",
  description:
    "Separador visual SVG ou linha estilizada com badge central opcional para transição entre seções.",
  category: "Divisores",
  iconName: "Minus",
  modes: ["LANDING_PAGE", "LINKTREE"],
  toggleableElements: [
    { key: "shape", label: "Forma / Linha Divisora" },
    { key: "label", label: "Badge Central Opcional" },
  ],
  contentSchema: sectionDividerSchema,
  fields: [
    {
      key: "shape",
      label: "Formato do Divisor",
      type: "select",
      optionalKey: "shape",
      options: [
        { value: "line", label: "Linha Estilizada" },
        { value: "wave", label: "Onda Suave (SVG)" },
        { value: "curve", label: "Curva Única (SVG)" },
        { value: "angle", label: "Ângulo / Slope (SVG)" },
        { value: "triangle", label: "Triângulo (SVG)" },
        { value: "mountain", label: "Montanhas (SVG)" },
      ],
    },
    {
      key: "label",
      label: "Etiqueta Central (Opcional)",
      type: "text",
      optionalKey: "label",
      isBadge: true,
      typographyElementKey: "label",
    },
    {
      key: "color",
      label: "Cor do Separador",
      type: "color",
      optionalKey: "shape",
    },
    {
      key: "height",
      label: "Altura em Pixels",
      type: "number",
      optionalKey: "shape",
    },
    {
      key: "flip",
      label: "Inverter Horizontalmente (Flip)",
      type: "toggle",
      optionalKey: "shape",
    },
    {
      key: "invert",
      label: "Inverter Verticalmente (Invert)",
      type: "toggle",
      optionalKey: "shape",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "compact",
      containerWidth: "full",
    },
    styles: {
      ambientGlow: false,
      hiddenElements: {},
    },
    content: {
      shape: "wave",
      label: "",
      color: "#18181B",
      height: 80,
      flip: false,
      invert: false,
    },
  },
  Component: ({ content, styles, theme }) => {
    const accentColor = styles.customAccent || theme.palette.accent;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);
    const dividerColor = content.color || accentColor;
    const heightPx = Math.max(16, Math.min(content.height || 80, 320));

    const transform = [
      content.flip ? "scaleX(-1)" : "",
      content.invert ? "scaleY(-1)" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="relative w-full flex items-center justify-center">
        {!isHidden("shape") && (
          <div
            className="w-full overflow-hidden leading-[0]"
            style={{
              height: `${heightPx}px`,
              transform: transform || undefined,
            }}
          >
            {renderShape(content.shape || "wave", dividerColor)}
          </div>
        )}

        {!isHidden("label") && content.label && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <EditableText
              isBadge
              defaultIconName="Sparkles"
              accentColor={accentColor}
              value={content.label}
              elementKey="label"
              styles={styles}
            />
          </div>
        )}
      </div>
    );
  },
});
