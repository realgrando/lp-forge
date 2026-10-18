import { ThemeConfig } from "@/types/site";

export interface ThemePreset {
  id: string;
  name: string;
  badge: string;
  config: ThemeConfig;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "nivix-gold",
    name: "Nivix Signature Gold",
    badge: "Enterprise Dark",
    config: {
      presetId: "nivix-gold",
      palette: {
        background: "#09090B",
        foreground: "#FAFAFA",
        muted: "#A1A1AA",
        primary: "#F4B400",
        secondary: "#27272A",
        surface: "#18181B",
        accent: "#F4B400",
        border: "#27272A",
        badgeBg: "rgba(244, 180, 0, 0.15)",
        badgeText: "#F4B400",
        buttonPrimaryBg: "#F4B400",
        buttonPrimaryText: "#09090B",
        buttonSecondaryBg: "transparent",
        buttonSecondaryText: "#FAFAFA",
      },
      typography: {
        headingFont: "'Space Grotesk', sans-serif",
        bodyFont: "'Inter', sans-serif",
        headingWeight: "font-black",
        bodyWeight: "font-normal",
        textTransform: "normal-case",
        highlightStyle: "accent",
        highlightColor: "#F4B400",
      },
      tokens: {
        borderRadius: "lg",
        surfaceStyle: "glass",
      },
    },
  },
  {
    id: "cyber-emerald",
    name: "Cyber Emerald 3D",
    badge: "SaaS & Bio",
    config: {
      presetId: "cyber-emerald",
      palette: {
        background: "#050B08",
        foreground: "#ECFDF5",
        muted: "#6EE7B7",
        primary: "#10B981",
        secondary: "#064E3B",
        surface: "#0B1912",
        accent: "#34D399",
        border: "#064E3B",
        badgeBg: "rgba(16, 185, 129, 0.15)",
        badgeText: "#34D399",
        buttonPrimaryBg: "#10B981",
        buttonPrimaryText: "#050B08",
        buttonSecondaryBg: "transparent",
        buttonSecondaryText: "#ECFDF5",
      },
      typography: {
        headingFont: "'Syne', sans-serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        headingWeight: "font-black",
        bodyWeight: "font-normal",
        textTransform: "normal-case",
        highlightStyle: "gradient",
        highlightColor: "#34D399",
      },
      tokens: {
        borderRadius: "lg",
        surfaceStyle: "3d_floating",
      },
    },
  },
  {
    id: "royal-violet",
    name: "Royal Nebula",
    badge: "High-Tech AI",
    config: {
      presetId: "royal-violet",
      palette: {
        background: "#080612",
        foreground: "#F5F3FF",
        muted: "#C4B5FD",
        primary: "#8B5CF6",
        secondary: "#2E1065",
        surface: "#130F26",
        accent: "#A78BFA",
        border: "#2E1065",
        badgeBg: "rgba(139, 92, 246, 0.15)",
        badgeText: "#A78BFA",
        buttonPrimaryBg: "#8B5CF6",
        buttonPrimaryText: "#FFFFFF",
        buttonSecondaryBg: "transparent",
        buttonSecondaryText: "#F5F3FF",
      },
      typography: {
        headingFont: "'Outfit', sans-serif",
        bodyFont: "'Inter', sans-serif",
        headingWeight: "font-bold",
        bodyWeight: "font-normal",
        textTransform: "normal-case",
        highlightStyle: "glow",
        highlightColor: "#A78BFA",
      },
      tokens: {
        borderRadius: "md",
        surfaceStyle: "neon",
      },
    },
  },
  {
    id: "atelier-light",
    name: "Atelier Editorial Light",
    badge: "Luxury Minimal",
    config: {
      presetId: "atelier-light",
      palette: {
        background: "#FAF8F5",
        foreground: "#18181B",
        muted: "#71717A",
        primary: "#18181B",
        secondary: "#E4E4E7",
        surface: "#FFFFFF",
        accent: "#B45309",
        border: "#E4E4E7",
        badgeBg: "rgba(180, 83, 9, 0.1)",
        badgeText: "#B45309",
        buttonPrimaryBg: "#18181B",
        buttonPrimaryText: "#FAF8F5",
        buttonSecondaryBg: "transparent",
        buttonSecondaryText: "#18181B",
      },
      typography: {
        headingFont: "'Playfair Display', serif",
        bodyFont: "'Inter', sans-serif",
        headingWeight: "font-bold",
        bodyWeight: "font-normal",
        textTransform: "normal-case",
        highlightStyle: "underline",
        highlightColor: "#B45309",
      },
      tokens: {
        borderRadius: "sm",
        surfaceStyle: "bordered",
      },
    },
  },
];

export const GOOGLE_FONTS_CATALOG = [
  { label: "Inter (Sans Padrão)", value: "'Inter', sans-serif", category: "Sans-Serif" },
  { label: "Space Grotesk (Tech)", value: "'Space Grotesk', sans-serif", category: "Display" },
  { label: "Syne (Vanguardista)", value: "'Syne', sans-serif", category: "Display" },
  { label: "Outfit (Geométrica)", value: "'Outfit', sans-serif", category: "Sans-Serif" },
  { label: "Poppins (Moderna)", value: "'Poppins', sans-serif", category: "Sans-Serif" },
  { label: "Montserrat (Impacto)", value: "'Montserrat', sans-serif", category: "Sans-Serif" },
  { label: "Playfair Display (Luxo)", value: "'Playfair Display', serif", category: "Serif" },
  { label: "Cormorant Garamond (Editorial)", value: "'Cormorant Garamond', serif", category: "Serif" },
  { label: "Bebas Neue (Condensed)", value: "'Bebas Neue', sans-serif", category: "Display" },
  { label: "Fraunces (Artisan Serif)", value: "'Fraunces', serif", category: "Serif" },
];

export const FONT_SIZE_GROUPS = [
  {
    group: "Títulos & Headlines (Impacto)",
    options: [
      { label: "8XL — Monumental (64px / 96px)", value: "text-6xl md:text-8xl lg:text-8xl" },
      { label: "7XL — Gigante (48px / 72px)", value: "text-5xl md:text-7xl lg:text-7xl" },
      { label: "6XL — Título de Hero (36px / 60px)", value: "text-4xl md:text-6xl lg:text-6xl" },
      { label: "5XL — Título de Seção (30px / 48px)", value: "text-3xl md:text-5xl lg:text-5xl" },
      { label: "4XL — Subtítulo Grande (24px / 36px)", value: "text-2xl md:text-4xl lg:text-4xl" },
      { label: "3XL — Título Médio (20px / 30px)", value: "text-xl md:text-3xl lg:text-3xl" },
      { label: "2XL — Título de Card (18px / 24px)", value: "text-lg md:text-2xl lg:text-2xl" },
    ],
  },
  {
    group: "Parágrafos, Badges & Textos de Apoio",
    options: [
      { label: "XL — Destaque Alto (18px / 20px)", value: "text-lg md:text-xl lg:text-xl" },
      { label: "LG — Parágrafo Médio (16px / 18px)", value: "text-base md:text-lg lg:text-lg" },
      { label: "Base — Padrão de Leitura (16px)", value: "text-base" },
      { label: "SM — Texto Pequeno (14px)", value: "text-sm" },
      { label: "XS — Micro / Badges (12px)", value: "text-xs" },
    ],
  },
];

export const HEADING_SIZE_OPTIONS = [
  { label: "Compacto (2xl)", value: "text-xl md:text-2xl" },
  { label: "Pequeno (3xl)", value: "text-2xl md:text-4xl" },
  { label: "Normal (5xl)", value: "text-3xl md:text-5xl" },
  { label: "Grande (6xl)", value: "text-4xl md:text-6xl" },
  { label: "Gigante (7xl)", value: "text-5xl md:text-7xl" },
  { label: "Monumental (8xl)", value: "text-6xl md:text-8xl" },
];

export const BODY_SIZE_OPTIONS = [
  { label: "Micro (xs)", value: "text-xs" },
  { label: "Pequeno (sm)", value: "text-sm" },
  { label: "Normal (base)", value: "text-base" },
  { label: "Médio (lg)", value: "text-base md:text-lg" },
  { label: "Grande (xl)", value: "text-lg md:text-xl" },
];
