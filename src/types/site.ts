import { z } from "zod";

export type SiteMode = "LANDING_PAGE" | "LINKTREE";

export type DeviceViewport = "desktop" | "tablet" | "mobile";

export type PaddingScale = "none" | "compact" | "normal" | "spacious";

export type ContainerWidth = "full" | "boxed" | "narrow" | "mobile";

export type LayoutDistribution = "between" | "center" | "start" | "end" | "around";

export type BorderRadiusPreset = "none" | "sm" | "md" | "lg" | "full";

export type SurfaceStyle = "solid" | "glass" | "bordered" | "3d_floating" | "neon";

export type ButtonVariant = "solid" | "outline" | "glass" | "3d" | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export const buttonConfigSchema = z.object({
  enabled: z.boolean().default(true),
  text: z.string(),
  url: z.string(),
  variant: z.enum(["solid", "outline", "glass", "3d", "ghost"]).default("solid"),
  size: z.enum(["sm", "md", "lg", "xl"]).optional(),
  fullWidth: z.boolean().optional(),
  radius: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
  iconName: z.string().optional(),
  iconPosition: z.enum(["left", "right"]).optional(),
  customBg: z.string().optional(),
  customText: z.string().optional(),
  customBorderColor: z.string().optional(),
});

export type ButtonConfig = z.infer<typeof buttonConfigSchema>;

export type TextHighlightStyle =
  | "accent"
  | "gradient"
  | "glow"
  | "underline"
  | "marker";

export type TextMaxWidth = "narrow" | "medium" | "wide" | "full";

export interface TypographyOverride {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?:
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-extrabold"
    | "font-black";
  letterSpacing?:
    | "tracking-tighter"
    | "tracking-tight"
    | "tracking-normal"
    | "tracking-wide"
    | "tracking-widest";
  textTransform?: "normal-case" | "uppercase" | "lowercase" | "capitalize";
  maxWidth?: TextMaxWidth;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  iconName?: string;
  highlightStyle?: TextHighlightStyle;
  highlightColor?: string;
}

export type LayoutGap = "none" | "compact" | "normal" | "spacious" | "monumental";

export type LayoutAlignItems = "start" | "center" | "end" | "stretch";

export type LayoutDirection = "col" | "row" | "responsive";

export type SectionMinHeight = "auto" | "screen" | "large" | "half";

export type ContentMaxWidth = "narrow" | "medium" | "wide" | "full";

export type ContainerAlignX = "start" | "center" | "end";

export type ContainerAlignY = "start" | "center" | "end" | "stretch";

export type ComponentWidth = "full" | "auto" | "boxed" | "narrow";

export type BackgroundPattern = "none" | "grid" | "dots" | "noise";

export type GradientDirection = "to-b" | "to-t" | "to-r" | "to-br" | "radial";

export type HeaderScrollVisibility = "fixed" | "auto_hide" | "static";

export type HeaderSurfaceType =
  | "transparent"
  | "solid"
  | "glass"
  | "bordered"
  | "3d_floating"
  | "neon";

export type HeaderScrollSurface =
  | "keep"
  | "transparent_to_glass"
  | "transparent_to_solid"
  | "glass_to_solid";

export type HeaderScrollShape = "keep" | "shrink_slim" | "to_capsule";

export type HeaderScrollBehavior =
  | "fixed"            // Fixo Contínuo (fixado desde o topo)
  | "blur_on_scroll"   // Fosco ao Rolar (transparente no topo -> blur glass ao descer)
  | "solid_on_scroll"  // Sólido ao Rolar (glass suave no topo -> sólido escuro ao descer)
  | "floating_capsule" // Cápsula Flutuante ao Rolar (barra total -> cápsula elevada ao descer)
  | "static";          // Estático (rola livremente com a página)

export interface SectionLayout {
  // CAMADA 1: Container Pai (Seção)
  containerWidth: ContainerWidth;
  minHeight?: SectionMinHeight;
  containerAlignX?: ContainerAlignX; // Posição horizontal do componente no container pai (start, center, end)
  containerAlignY?: ContainerAlignY; // Posição vertical do componente no container pai (start, center, end, stretch)
  paddingY: PaddingScale;
  paddingX?: PaddingScale;
  sticky?: boolean;
  headerScrollBehavior?: HeaderScrollBehavior; // Legado: Comportamento dinâmico de rolagem
  scrollVisibility?: HeaderScrollVisibility;   // Fixação & Visibilidade (fixed, auto_hide, static)
  scrollSurface?: HeaderScrollSurface;         // Legado: Superfície ao rolar
  headerSurfaceInitial?: HeaderSurfaceType;    // Aba 1: Superfície no Topo (Inicial)
  headerSurfaceScrolled?: HeaderSurfaceType;   // Aba 2: Superfície ao Rolar (Scrolled)
  scrollShape?: HeaderScrollShape;             // Formato ao rolar (keep, to_capsule, shrink_slim)
  headerOverlay?: boolean;                     // Sobrepor ao Hero (fundo contínuo do Hero por trás do header)
  hidden?: boolean;

  // CAMADA 2: Container Filho (O Componente)
  componentWidth?: ComponentWidth;   // Largura do componente (full, boxed, narrow, auto/cápsula)
  paddingInner?: PaddingScale;       // Respiro interno vertical (Y)
  paddingInnerX?: PaddingScale;      // Respiro interno lateral (X)

  // CAMADA 3: Elementos Internos (Flex & Fluxo)
  direction?: LayoutDirection;       // col, row, responsive
  reverse?: boolean;                 // inverte sequência dos elementos
  distribution?: LayoutDistribution; // start, center, end, between, around
  alignItems?: LayoutAlignItems;     // start, center, end, stretch
  gap?: LayoutGap;                   // none, compact, normal, spacious, monumental

  // Legado / compatibilidade
  contentMaxWidth?: ContentMaxWidth;
}

export type CardHoverEffect = "none" | "lift" | "glow" | "border_highlight" | "shine";
export type BorderPosition = "all" | "bottom" | "top_bottom" | "none";
export type SurfaceBlur = "none" | "sm" | "md" | "lg" | "xl";

export interface SectionStyles {
  customBg?: string;
  customText?: string;
  customAccent?: string;
  customSurface?: string;
  ambientGlow?: boolean;
  glowColor?: string;
  borderRadius?: BorderRadiusPreset;
  borderWidth?: "0" | "1" | "2" | "3" | "4";
  borderColor?: string;
  borderOpacity?: number;
  borderPosition?: BorderPosition;
  surfaceVariant?: SurfaceStyle;
  surfaceOpacity?: number;
  surfaceBlur?: SurfaceBlur;
  cardHoverEffect?: CardHoverEffect;
  // Background Engine Avançado
  bgPattern?: BackgroundPattern;
  bgGradientEnabled?: boolean;
  bgGradientFrom?: string;
  bgGradientTo?: string;
  bgGradientDirection?: GradientDirection;
  bgImage?: string;
  bgOverlayOpacity?: number;
  // Divisores e Bordas da Seção (Pai)
  borderTop?: boolean;
  borderBottom?: boolean;
  borderGlow?: boolean;
  // Background Engine do Filho (Card / Superfície)
  cardPattern?: BackgroundPattern;
  cardGradientEnabled?: boolean;
  cardGradientFrom?: string;
  cardGradientTo?: string;
  cardGradientDirection?: GradientDirection;
  cardBgImage?: string;
  cardBgOverlayOpacity?: number;
  /**
   * Mapa global de opcionalidade por elemento:
   * Se hiddenElements[key] === true, o sub-elemento (badge, subtítulo, card, lista, botão)
   * fica oculto sem perder seus dados configurados.
   */
  hiddenElements?: Record<string, boolean>;
  typographyOverrides?: Record<string, TypographyOverride>;
}

export interface SectionNode<TContent = Record<string, any>> {
  id: string;
  anchorId?: string;
  type: string;
  variant?: string;
  layout: SectionLayout;
  styles: SectionStyles;
  content: TContent;
}

export interface ThemePalette {
  background: string;
  foreground: string;
  muted?: string;
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  border?: string;
  badgeBg?: string;
  badgeText?: string;
  buttonPrimaryBg?: string;
  buttonPrimaryText?: string;
  buttonSecondaryBg?: string;
  buttonSecondaryText?: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  headingWeight?:
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-extrabold"
    | "font-black";
  bodyWeight?:
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold";
  textTransform?: "normal-case" | "uppercase" | "lowercase" | "capitalize";
  highlightStyle?: TextHighlightStyle;
  highlightColor?: string;
}

export interface ThemeLayoutDefaults {
  containerWidth?: ContainerWidth;
  paddingY?: PaddingScale;
  paddingInner?: PaddingScale;
  paddingX?: PaddingScale;
  gap?: LayoutGap;
  direction?: LayoutDirection;
}

export interface ThemeButtonDefaults {
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: BorderRadiusPreset;
}

export interface ThemeTokens {
  borderRadius: BorderRadiusPreset;
  surfaceStyle: SurfaceStyle;
}

export interface ThemeConfig {
  presetId: string;
  palette: ThemePalette;
  typography: ThemeTypography;
  layoutDefaults?: ThemeLayoutDefaults;
  buttonDefaults?: ThemeButtonDefaults;
  tokens: ThemeTokens;
}

export interface ThemePresetRecord {
  id: string;
  name: string;
  badge?: string;
  isCustom?: boolean;
  createdAt?: string;
  config: ThemeConfig;
}

export interface SiteMeta {
  id: string;
  name: string;
  mode: SiteMode;
  slug: string;
  title: string;
  description: string;
  faviconUrl?: string;
  socialPreviewImage?: string;
}

export interface SiteDocument {
  version: "2.0";
  meta: SiteMeta;
  theme: ThemeConfig;
  sections: SectionNode[];
}

// Metadados de UI para geração automática dos formulários na Sidebar e no /admin
export type FieldInputType =
  | "text"
  | "textarea"
  | "url"
  | "image"
  | "color"
  | "icon"
  | "button"
  | "select"
  | "toggle"
  | "number"
  | "array";

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldInputType;
  placeholder?: string;
  description?: string;
  /**
   * Chave opcional para controle de visibilidade (Liga/Desliga) deste elemento.
   * Por padrão, TODO campo visual de um bloco pode ser ocultado individualmente usando sua própria `key` ou `optionalKey`.
   */
  optionalKey?: string;
  isBadge?: boolean; // Habilita controles extras de cor de fundo, borda e ícone no elemento
  options?: { value: string; label: string }[];
  typographyElementKey?: string; // Habilita gaveta de tipografia fina para este texto
  itemFields?: FieldDefinition[]; // Para campos do tipo 'array'
  defaultNewItem?: Record<string, any>; // Objeto padrão ao clicar em "+ Adicionar Item" em listas
}

export interface SectionDefinition<TContent = any> {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  modes: SiteMode[];
  legacyType?: string;
  legacyVariant?: string;
  rawContainer?: boolean;
  /**
   * Elementos estruturais extras da seção que o designer pode ocultar/exibir
   * (ex: 'visualCard' no Hero Split, 'decorativeBars', etc.)
   */
  toggleableElements?: { key: string; label: string }[];
  contentSchema: z.ZodType<TContent>;
  fields: FieldDefinition[];
  defaultData: {
    content: TContent;
    layout?: Partial<SectionLayout>;
    styles?: Partial<SectionStyles>;
  };
  Component: React.FC<{
    sectionId: string;
    content: TContent;
    layout: SectionLayout;
    styles: SectionStyles;
    theme: ThemeConfig;
    isEditor?: boolean;
  }>;
}

export interface TemplateRecord {
  id: string;
  name: string;
  description: string;
  category: string;
  mode: SiteMode;
  createdAt: string;
  updatedAt: string;
  document: SiteDocument;
}

export interface SectionPackRecord {
  id: string;
  name: string;
  description: string;
  mode: SiteMode;
  sections: Omit<SectionNode, "id">[];
}
