"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { DynamicIcon } from "@/components/engine/DynamicIcon";
import {
  buttonConfigSchema,
  ContentMaxWidth,
  LayoutAlignItems,
  LayoutDistribution,
  LayoutGap,
} from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";

const heroImpactCenterSchema = z.object({
  align: z.enum(["center", "left"]).default("center"),
  bgImage: z.string().optional(),
  badge: z.string().optional(),
  badgeIcon: z.string().optional(),
  headline: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  primaryCta: buttonConfigSchema,
  secondaryCta: buttonConfigSchema,
  ctaMicroCopy: z.string().optional(),
  ctaMicroCopyIcon: z.string().optional(),
  socialProofText: z.string().optional(),
  socialProofRating: z.string().optional(),
  socialProofAvatars: z.array(z.string()).optional(),
  scrollLabel: z.string().optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        iconName: z.string().optional(),
      })
    )
    .optional(),
  trustTitle: z.string().optional(),
  trustLogos: z
    .array(
      z.object({
        name: z.string(),
        logoUrl: z.string().optional(),
      })
    )
    .optional(),
});

export type HeroImpactCenterContent = z.infer<typeof heroImpactCenterSchema>;

export const HeroImpactCenterSection = createSection<HeroImpactCenterContent>({
  id: "hero.impact_center",
  name: "Hero Classic Simple",
  description:
    "Hero clássico de alto impacto com tipografia monumental, duplo CTA com microcopy, prova social com avatares/avaliação, métricas reativas e indicador de scroll.",
  category: "Hero",
  iconName: "Sparkles",
  modes: ["LANDING_PAGE"],
  legacyType: "hero",
  legacyVariant: "v1",
  toggleableElements: [
    { key: "bgImage", label: "Imagem de Fundo Interna" },
    { key: "badge", label: "Badge Superior" },
    { key: "headline", label: "Título Principal (Headline)" },
    { key: "subtitle", label: "Subtítulo em Destaque" },
    { key: "description", label: "Parágrafo de Descrição" },
    { key: "primaryCta", label: "Botão Principal (CTA 1)" },
    { key: "secondaryCta", label: "Botão Secundário (CTA 2)" },
    { key: "ctaMicroCopy", label: "Garantia / Apoio aos Botões" },
    { key: "socialProof", label: "Prova Social (Avatares + Avaliação)" },
    { key: "stats", label: "Barra de Métricas Rápidas" },
    { key: "trustLogos", label: "Faixa de Marcas / Confiança" },
    { key: "scrollIndicator", label: "Indicador de Scroll" },
  ],
  contentSchema: heroImpactCenterSchema,
  fields: [
    {
      key: "align",
      label: "Alinhamento do Conteúdo",
      type: "select",
      options: [
        { value: "center", label: "Centralizado" },
        { value: "left", label: "Alinhado à Esquerda" },
      ],
    },
    {
      key: "bgImage",
      label: "Imagem de Fundo Interna (Opcional)",
      type: "image",
      optionalKey: "bgImage",
    },
    {
      key: "badge",
      label: "Badge Superior",
      type: "text",
      optionalKey: "badge",
      isBadge: true,
      typographyElementKey: "badge",
    },
    {
      key: "badgeIcon",
      label: "Ícone da Badge",
      type: "icon",
      optionalKey: "badge",
    },
    {
      key: "headline",
      label: "Título Principal (Headline)",
      type: "textarea",
      optionalKey: "headline",
      typographyElementKey: "headline",
    },
    {
      key: "subtitle",
      label: "Subtítulo de Impacto",
      type: "textarea",
      optionalKey: "subtitle",
      typographyElementKey: "subtitle",
    },
    {
      key: "description",
      label: "Descrição Complementar",
      type: "textarea",
      optionalKey: "description",
      typographyElementKey: "description",
    },
    {
      key: "primaryCta",
      label: "Botão Principal (CTA 1)",
      type: "button",
      optionalKey: "primaryCta",
      typographyElementKey: "primaryCta",
    },
    {
      key: "secondaryCta",
      label: "Botão Secundário (CTA 2)",
      type: "button",
      optionalKey: "secondaryCta",
      typographyElementKey: "secondaryCta",
    },
    {
      key: "ctaMicroCopy",
      label: "Nota de Apoio aos Botões (Microcopy)",
      type: "text",
      optionalKey: "ctaMicroCopy",
      typographyElementKey: "ctaMicroCopy",
    },
    {
      key: "ctaMicroCopyIcon",
      label: "Ícone da Nota de Apoio",
      type: "icon",
      optionalKey: "ctaMicroCopy",
    },
    {
      key: "socialProofText",
      label: "Texto da Prova Social",
      type: "text",
      optionalKey: "socialProof",
      typographyElementKey: "socialProof",
    },
    {
      key: "socialProofRating",
      label: "Nota da Avaliação (Ex: 4.9/5)",
      type: "text",
      optionalKey: "socialProof",
    },
    {
      key: "stats",
      label: "Métricas Rápidas no Rodapé do Hero",
      type: "array",
      optionalKey: "stats",
      typographyElementKey: "stats",
      defaultNewItem: { value: "100%", label: "Garantia Técnica", iconName: "Shield" },
      itemFields: [
        { key: "value", label: "Valor (Ex: +500)", type: "text" },
        { key: "label", label: "Legenda", type: "text" },
        { key: "iconName", label: "Ícone (Opcional)", type: "icon" },
      ],
    },
    {
      key: "trustTitle",
      label: "Título da Faixa de Confiança",
      type: "text",
      optionalKey: "trustLogos",
      typographyElementKey: "trustTitle",
    },
    {
      key: "trustLogos",
      label: "Marcas / Logos de Confiança",
      type: "array",
      optionalKey: "trustLogos",
      defaultNewItem: { name: "Empresa Parceira" },
      itemFields: [
        { key: "name", label: "Nome da Marca", type: "text" },
        { key: "logoUrl", label: "URL do Logo (Opcional)", type: "image" },
      ],
    },
    {
      key: "scrollLabel",
      label: "Texto do Indicador de Scroll",
      type: "text",
      optionalKey: "scrollIndicator",
      typographyElementKey: "scrollLabel",
    },
  ],
  defaultData: {
    layout: {
      containerWidth: "full",
      containerAlignX: "center",
      containerAlignY: "center",
      minHeight: "auto",
      paddingY: "normal",
      paddingX: "normal",
      componentWidth: "full",
      direction: "col",
      reverse: false,
      paddingInner: "none",
      paddingInnerX: "normal",
      distribution: "center",
      alignItems: "center",
      gap: "normal",
      contentMaxWidth: "full",
    },
    styles: {
      ambientGlow: true,
      surfaceVariant: "solid",
      borderRadius: "none",
      borderWidth: "0",
      bgGradientEnabled: false,
      hiddenElements: {},
    },
    content: {
      align: "center",
      bgImage: "",
      badge: "CONTRATO LIVRE DE AMARRAS",
      badgeIcon: "Sparkles",
      headline: "A melhor equipe de Marketing e Engenharia do Brasil",
      subtitle:
        "Escalamos sua operação com precisão cirúrgica e layouts de alto impacto que convertem em escala.",
      description:
        "Nossa equipe multidisciplinar entrega performance superior, previsibilidade de prazos e estética de cinema em cada entrega.",
      primaryCta: {
        enabled: true,
        text: "Entrar em Contato",
        url: "#contato",
        variant: "solid",
        size: "lg",
        radius: "lg",
        iconName: "ArrowRight",
        iconPosition: "right",
      },
      secondaryCta: {
        enabled: true,
        text: "Ver Resultados",
        url: "#portfolio",
        variant: "outline",
        size: "lg",
        radius: "lg",
        iconName: "Play",
        iconPosition: "left",
      },
      ctaMicroCopy: "⚡ Sem fidelidade contratual • Suporte dedicado 24/7 • Onboarding em 48h",
      ctaMicroCopyIcon: "ShieldCheck",
      socialProofText: "Avaliado por mais de 2.400 líderes e fundadores",
      socialProofRating: "4.9/5 estrelas",
      socialProofAvatars: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
      ],
      stats: [
        { value: "+340%", label: "Média de Conversão", iconName: "TrendingUp" },
        { value: "< 0.2s", label: "Latência de Servidor", iconName: "Zap" },
        { value: "100%", label: "Garantia Técnica", iconName: "Shield" },
      ],
      trustTitle: "EMPRESAS QUE CONFIAM NO NOSSO ECOSSISTEMA",
      trustLogos: [
        { name: "Acme Corp" },
        { name: "Apex Global" },
        { name: "Vortex Tech" },
        { name: "Stratix" },
        { name: "Luminary" },
      ],
      scrollLabel: "Rolar para Conhecer",
    },
  },
  Component: ({ content, layout, styles, theme }) => {
    const accentColor = styles.customAccent || theme.palette.accent;
    const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
    const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
    const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

    // Distribuição e Alinhamento Horizontal (Flex Engine)
    const isStart =
      layout?.distribution === "start" ||
      (content.align === "left" && !layout?.distribution);
    const isEnd = layout?.distribution === "end";
    const isBetween = layout?.distribution === "between";
    const isAround = layout?.distribution === "around";

    const stackAlignmentClass = isStart
      ? "items-start text-left"
      : isEnd
      ? "items-end text-right"
      : isBetween
      ? "items-start text-left"
      : "items-center text-center";

    const justifyAlignmentClass = isStart
      ? "justify-start"
      : isEnd
      ? "justify-end"
      : isBetween
      ? "justify-between"
      : isAround
      ? "justify-around"
      : "justify-center";

    // Espaçamento Dinâmico (Gaps)
    const gapClasses: Record<LayoutGap, string> = {
      none: "gap-1.5 sm:gap-2",
      compact: "gap-3 sm:gap-4",
      normal: "gap-6 sm:gap-7",
      spacious: "gap-8 sm:gap-10",
      monumental: "gap-12 sm:gap-16",
    };
    const effectiveGap = gapClasses[layout?.gap || "normal"];

    const buttonGapClasses: Record<LayoutGap, string> = {
      none: "gap-2",
      compact: "gap-3",
      normal: "gap-4",
      spacious: "gap-6",
      monumental: "gap-8",
    };
    const effectiveButtonGap = buttonGapClasses[layout?.gap || "normal"];

    const statsGapClasses: Record<LayoutGap, string> = {
      none: "gap-3 sm:gap-4",
      compact: "gap-5 sm:gap-6",
      normal: "gap-8 sm:gap-14",
      spacious: "gap-12 sm:gap-20",
      monumental: "gap-16 sm:gap-28",
    };
    const effectiveStatsGap = statsGapClasses[layout?.gap || "normal"];

    // Inversão de Ordem dos Elementos (Reverse toggle) e Direção
    const isReverse = Boolean(layout?.reverse);
    const direction = layout?.direction || "col";

    const getHeroDirectionClass = () => {
      if (direction === "row") {
        return isReverse ? "flex-row-reverse" : "flex-row";
      }
      if (direction === "responsive") {
        return isReverse
          ? "flex-col-reverse md:flex-row-reverse"
          : "flex-col md:flex-row";
      }
      return isReverse ? "flex-col-reverse" : "flex-col";
    };

    const showPrimaryBtn =
      content.primaryCta?.enabled && !isHidden("primaryCta");
    const showSecondaryBtn =
      content.secondaryCta?.enabled && !isHidden("secondaryCta");
    const showMicroCopy = !isHidden("ctaMicroCopy") && content.ctaMicroCopy;
    const showStats =
      !isHidden("stats") && content.stats && content.stats.length > 0;
    const showSocialProof =
      !isHidden("socialProof") &&
      (content.socialProofText || content.socialProofRating);
    const showTrustLogos =
      !isHidden("trustLogos") &&
      ((content.trustLogos && content.trustLogos.length > 0) || Boolean(content.trustTitle));

    const statsToRender = isReverse && content.stats
      ? [...content.stats].reverse()
      : content.stats || [];

    // Renderizador do Bloco de Prova Social (Avatares + Estrelas + Avaliação)
    const renderSocialProof = () => {
      if (!showSocialProof) return null;
      const avatars =
        content.socialProofAvatars && content.socialProofAvatars.length > 0
          ? content.socialProofAvatars
          : [
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
            ];

      return (
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center gap-3 pt-2 sm:pt-3 transition-all select-none",
            isStart
              ? "sm:justify-start"
              : isEnd
              ? "sm:justify-end"
              : "sm:justify-center",
            isReverse && "sm:flex-row-reverse"
          )}
        >
          {/* Pilha de Avatares Sobrepostos */}
          <div className="flex items-center -space-x-2.5 shrink-0">
            {avatars.slice(0, 4).map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Cliente Satisfeito"
                className="w-8 h-8 rounded-full border-2 border-zinc-950 object-cover shadow-sm ring-1 ring-white/10"
              />
            ))}
          </div>

          {/* Estrelas e Texto */}
          <div
            className={cn(
              "flex flex-col gap-0.5",
              isStart
                ? "items-start text-left"
                : isEnd
                ? "items-end text-right"
                : "items-center text-center sm:items-start sm:text-left"
            )}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <DynamicIcon
                  key={i}
                  name="Star"
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0"
                />
              ))}
              {content.socialProofRating && (
                <span className="text-xs font-black ml-1 text-white">
                  {content.socialProofRating}
                </span>
              )}
            </div>

            {content.socialProofText && (
              <EditableText
                as="span"
                value={content.socialProofText}
                elementKey="socialProof"
                styles={styles}
                className="text-[11px] font-medium text-zinc-400"
              />
            )}
          </div>
        </div>
      );
    };

    // Renderizador do Bloco de Métricas / Estatísticas
    const renderStatsBlock = (isTopHook = false) => {
      if (!showStats || statsToRender.length === 0) return null;
      return (
        <div
          className={cn(
            "w-full grid grid-cols-2 sm:flex sm:flex-wrap transition-all",
            isTopHook
              ? "pb-5 mb-2 border-b border-white/10"
              : "pt-6 md:pt-8 mt-2 border-t border-white/10",
            effectiveStatsGap,
            isReverse && "sm:flex-row-reverse",
            justifyAlignmentClass
          )}
        >
          {statsToRender.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col transition-all",
                surfaceStyle !== "solid" && [
                  getSurfaceClasses(surfaceStyle),
                  getRadiusClass(radiusPreset),
                  "p-3 sm:px-5 sm:py-3.5 border shadow-sm",
                ],
                isStart
                  ? "items-start text-left"
                  : isEnd
                  ? "items-end text-right"
                  : "items-center text-center"
              )}
              style={{
                backgroundColor:
                  surfaceStyle !== "solid" && styles.customSurface
                    ? styles.customSurface
                    : undefined,
                borderColor: styles.borderColor || undefined,
                borderWidth: styles.borderWidth
                  ? `${styles.borderWidth}px`
                  : undefined,
              }}
            >
              <div className="flex items-center gap-2">
                {stat.iconName && (
                  <DynamicIcon
                    name={stat.iconName}
                    className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                    style={{ color: accentColor }}
                  />
                )}
                <span
                  className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter"
                  style={{ color: accentColor }}
                >
                  {stat.value}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      );
    };

    // Renderizador da Faixa de Confiança / Logos de Clientes
    const renderTrustLogos = () => {
      if (!showTrustLogos) return null;
      return (
        <div
          className={cn(
            "w-full pt-8 sm:pt-10 flex flex-col gap-3.5 border-t border-white/10 transition-all",
            stackAlignmentClass
          )}
        >
          {content.trustTitle && (
            <EditableText
              as="span"
              value={content.trustTitle}
              elementKey="trustTitle"
              styles={styles}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400"
            />
          )}

          {content.trustLogos && content.trustLogos.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap items-center gap-6 sm:gap-10 opacity-60 hover:opacity-100 transition-opacity",
                justifyAlignmentClass,
                isReverse && "flex-row-reverse"
              )}
            >
              {content.trustLogos.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      className="h-6 sm:h-7 w-auto object-contain grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm font-bold tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    const isCardMode =
      Boolean(styles.customSurface) ||
      (Boolean(styles.surfaceVariant) &&
        styles.surfaceVariant !== "solid" &&
        layout?.containerWidth !== "full");

    return (
      <div
        className={cn(
          "relative w-full flex flex-col transition-all",
          stackAlignmentClass,
          layout?.alignItems === "stretch" && "flex-1 h-full justify-between",
          isCardMode && [
            getSurfaceClasses(surfaceStyle),
            getRadiusClass(radiusPreset),
            "p-5 sm:p-6 md:p-8 border shadow-2xl overflow-hidden",
          ]
        )}
        style={
          isCardMode
            ? {
                backgroundColor: styles.customSurface || undefined,
                borderColor: styles.borderColor || undefined,
                borderWidth: styles.borderWidth
                  ? `${styles.borderWidth}px`
                  : undefined,
              }
            : undefined
        }
      >
        {/* Imagem de Fundo Opcional do Card Hero */}
        {!isHidden("bgImage") && content.bgImage && (
          <div
            className={cn(
              "absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]"
            )}
          >
            <img
              src={content.bgImage}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </div>
        )}

        <div
          className={cn(
            "relative z-10 w-full flex transition-all",
            getHeroDirectionClass(),
            effectiveGap,
            stackAlignmentClass,
            layout?.alignItems === "stretch" && "flex-1 h-full justify-between"
          )}
        >
          {/* Se layout.reverse = true, renderiza a barra de métricas no TOPO (Padrão Authority Hook) */}
          {isReverse && renderStatsBlock(true)}

          {/* Badge Superior com Ícone Dinâmico */}
          {!isHidden("badge") && content.badge && (
            <EditableText
              isBadge
              defaultIconName={content.badgeIcon || "Sparkles"}
              accentColor={accentColor}
              value={content.badge}
              elementKey="badge"
              styles={styles}
            />
          )}

          {/* Título Principal (Headline) */}
          {!isHidden("headline") && (
            <EditableText
              as="h1"
              defaultIsHeading
              value={content.headline}
              elementKey="headline"
              styles={styles}
              className="w-full font-black tracking-tighter leading-[0.98] text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
            />
          )}

          {/* Subtítulo em Destaque */}
          {!isHidden("subtitle") && content.subtitle && (
            <EditableText
              as="p"
              value={content.subtitle}
              elementKey="subtitle"
              styles={styles}
              className="w-full text-lg sm:text-xl md:text-2xl font-bold opacity-90 leading-snug"
            />
          )}

          {/* Parágrafo de Descrição Complementar */}
          {!isHidden("description") && content.description && (
            <EditableText
              as="p"
              value={content.description}
              elementKey="description"
              styles={styles}
              className="w-full text-sm sm:text-base md:text-lg opacity-70 leading-relaxed max-w-3xl"
            />
          )}

          {/* Botões de Ação (CTAs) e Nota de Apoio (Microcopy) */}
          {(showPrimaryBtn || showSecondaryBtn || showMicroCopy) && (
            <div
              className={cn(
                "w-full flex flex-col pt-3 transition-all",
                stackAlignmentClass
              )}
            >
              {(showPrimaryBtn || showSecondaryBtn) && (
                <div
                  className={cn(
                    "w-full flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center transition-all",
                    effectiveButtonGap,
                    isReverse && "flex-col-reverse sm:flex-row-reverse",
                    justifyAlignmentClass
                  )}
                >
                  {showPrimaryBtn && (
                    <SmartButton
                      button={content.primaryCta}
                      elementKey="primaryCta"
                      styles={styles}
                      theme={theme}
                      className="w-full sm:w-auto text-center"
                    />
                  )}
                  {showSecondaryBtn && (
                    <SmartButton
                      button={content.secondaryCta}
                      elementKey="secondaryCta"
                      styles={styles}
                      theme={theme}
                      className="w-full sm:w-auto text-center"
                    />
                  )}
                </div>
              )}

              {/* Micro-copy de Garantia e Confiança abaixo dos Botões */}
              {showMicroCopy && (
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-medium text-zinc-400 pt-2 sm:pt-2.5",
                    justifyAlignmentClass
                  )}
                >
                  <DynamicIcon
                    name={content.ctaMicroCopyIcon || "ShieldCheck"}
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: accentColor }}
                  />
                  <EditableText
                    as="span"
                    value={content.ctaMicroCopy}
                    elementKey="ctaMicroCopy"
                    styles={styles}
                    className="text-xs font-medium text-zinc-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Prova Social (Avatares + Avaliações) */}
          {renderSocialProof()}

          {/* Barra de Métricas (Renderizada na Base quando reverse = false) */}
          {!isReverse && renderStatsBlock(false)}

          {/* Faixa de Logos de Clientes / Confiança */}
          {renderTrustLogos()}

          {/* Indicador de Rolagem (Scroll Indicator) */}
          {!isHidden("scrollIndicator") && (
            <div
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollBy({
                    top: window.innerHeight * 0.75,
                    behavior: "smooth",
                  });
                }
              }}
              className={cn(
                "pt-6 flex flex-col gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none",
                stackAlignmentClass
              )}
            >
              <EditableText
                as="span"
                value={content.scrollLabel || "Rolar para Conhecer"}
                elementKey="scrollLabel"
                styles={styles}
                className="text-[10px] font-bold uppercase tracking-widest"
              />
              <DynamicIcon
                name="ChevronDown"
                className="w-5 h-5 animate-bounce"
                style={{ color: accentColor }}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
});
