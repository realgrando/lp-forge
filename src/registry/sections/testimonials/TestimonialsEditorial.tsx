"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Star, MessageCircle } from "lucide-react";

const testimonialsEditorialSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columnsDesktop: z.enum(["2", "3", "4"]).default("3"),
  ctaButton: buttonConfigSchema,
  items: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      text: z.string(),
      image: z.string().optional(),
      rating: z.enum(["5", "4", "3"]).default("5"),
    })
  ),
});

export type TestimonialsEditorialContent = z.infer<
  typeof testimonialsEditorialSchema
>;

export const TestimonialsEditorialSection =
  createSection<TestimonialsEditorialContent>({
    id: "testimonials.editorial",
    name: "Depoimentos Destaque Editorial",
    description:
      "Cards editoriais amplos com tipografia em destaque, classificação por estrelas e avatar/ícone do cliente.",
    category: "Depoimentos",
    iconName: "MessageSquareQuote",
    modes: ["LANDING_PAGE", "LINKTREE"],
    legacyType: "testimonials",
    legacyVariant: "v2",
    toggleableElements: [
      { key: "badge", label: "Badge Superior" },
      { key: "headline", label: "Título Principal" },
      { key: "subtitle", label: "Subtítulo" },
      { key: "stars", label: "Estrelas de Avaliação" },
      { key: "avatars", label: "Avatar / Ícone do Autor" },
      { key: "items", label: "Cards de Depoimentos" },
      { key: "ctaButton", label: "Botão de Ação Inferior" },
    ],
    contentSchema: testimonialsEditorialSchema,
    fields: [
      {
        key: "badge",
        label: "Badge Superior",
        type: "text",
        optionalKey: "badge",
        isBadge: true,
        typographyElementKey: "badge",
      },
      {
        key: "headline",
        label: "Título Principal",
        type: "textarea",
        optionalKey: "headline",
        typographyElementKey: "headline",
      },
      {
        key: "subtitle",
        label: "Subtítulo",
        type: "textarea",
        optionalKey: "subtitle",
        typographyElementKey: "subtitle",
      },
      {
        key: "columnsDesktop",
        label: "Colunas no Desktop",
        type: "select",
        optionalKey: "items",
        options: [
          { value: "2", label: "2 Colunas" },
          { value: "3", label: "3 Colunas" },
          { value: "4", label: "4 Colunas" },
        ],
      },
      {
        key: "items",
        label: "Depoimentos Editoriais",
        type: "array",
        optionalKey: "items",
        defaultNewItem: {
          name: "Alice Walker",
          role: "Head de Design",
          text: "Design impecável, suporte ágil e uma experiência de conversão acima de qualquer expectativa.",
          image: "",
          rating: "5",
        },
        itemFields: [
          { key: "name", label: "Nome do Cliente", type: "text" },
          { key: "role", label: "Cargo / Empresa", type: "text" },
          { key: "text", label: "Depoimento", type: "textarea" },
          { key: "image", label: "Foto / Avatar (Opcional)", type: "image" },
          {
            key: "rating",
            label: "Estrelas (1-5)",
            type: "select",
            options: [
              { value: "5", label: "5 Estrelas" },
              { value: "4", label: "4 Estrelas" },
              { value: "3", label: "3 Estrelas" },
            ],
          },
        ],
      },
      {
        key: "ctaButton",
        label: "Botão de Ação Inferior",
        type: "button",
        optionalKey: "ctaButton",
      },
    ],
    defaultData: {
      layout: {
        paddingY: "normal",
        containerWidth: "boxed",
      },
      styles: {
        surfaceVariant: "glass",
        borderRadius: "lg",
        ambientGlow: false,
        hiddenElements: {},
      },
      content: {
        badge: "FEEDBACK EDITORIAL",
        headline: "Resultados reais que falam por nós",
        subtitle:
          "Relatos diretos de clientes e parceiros que elevaram seu posicionamento conosco.",
        columnsDesktop: "3",
        ctaButton: {
          enabled: false,
          text: "Falar com Especialista",
          url: "#contato",
          variant: "outline",
          size: "md",
          iconName: "ArrowRight",
          iconPosition: "right",
        },
        items: [
          {
            name: "Alice Walker",
            role: "Diretora Criativa @ Studio V",
            text: "Design impecável e performance fluida. Nossa taxa de captação de clientes qualificados subiu já na primeira semana.",
            image: "",
            rating: "5",
          },
          {
            name: "Eduardo Martins",
            role: "Sócio-Diretor @ M&A Capital",
            text: "A estética editorial trouxe exatamente a sobriedade e autoridade que nosso escritório exigia para atender contas enterprise.",
            image: "",
            rating: "5",
          },
          {
            name: "Camila Rocha",
            role: "Head of Growth @ Nexa",
            text: "Conseguimos editar cada texto e botão com total independência e sem quebrar o layout. Simplesmente brilhante.",
            image: "",
            rating: "5",
          },
        ],
      },
    },
    Component: ({ content, styles, theme }) => {
      const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
      const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
      const accentColor = styles.customAccent || theme.palette.accent;
      const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

      const gridColsClass =
        content.columnsDesktop === "2"
          ? "md:grid-cols-2"
          : content.columnsDesktop === "4"
          ? "md:grid-cols-2 lg:grid-cols-4"
          : "md:grid-cols-3";

      return (
        <div className="space-y-14">
          {/* HEADER */}
          {(!isHidden("badge") ||
            !isHidden("headline") ||
            !isHidden("subtitle")) && (
            <div className="max-w-3xl space-y-4">
              <EditableText
                isBadge
                defaultIconName="MessageCircle"
                accentColor={accentColor}
                value={content.badge}
                elementKey="badge"
                styles={styles}
              />

              <EditableText
                as="h2"
                defaultIsHeading
                value={content.headline}
                elementKey="headline"
                styles={styles}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter"
              />

              <EditableText
                as="p"
                value={content.subtitle}
                elementKey="subtitle"
                styles={styles}
                className="text-base sm:text-lg opacity-75"
              />
            </div>
          )}

          {/* EDITORIAL CARDS */}
          {!isHidden("items") && content.items && content.items.length > 0 && (
            <div className={cn("grid grid-cols-1 gap-6", gridColsClass)}>
              {content.items.map((item, idx) => {
                const starsCount = parseInt(item.rating || "5", 10) || 5;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-8 sm:p-10 flex flex-col justify-between gap-6 transition-all",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass(radiusPreset)
                    )}
                    style={{
                      backgroundColor: styles.customSurface || undefined,
                    }}
                  >
                    <div className="space-y-5">
                      {!isHidden("stars") && (
                        <div className="flex gap-1">
                          {[...Array(starsCount)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-current"
                              style={{ color: accentColor }}
                            />
                          ))}
                        </div>
                      )}

                      <p className="text-lg font-medium opacity-90 leading-relaxed italic">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      {!isHidden("avatars") && (
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <MessageCircle
                              className="w-5 h-5"
                              style={{ color: accentColor }}
                            />
                          )}
                        </div>
                      )}
                      <div>
                        <h4 className="font-black uppercase text-sm tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-bold opacity-55 uppercase tracking-widest mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA BUTTON */}
          {!isHidden("ctaButton") && content.ctaButton?.enabled && (
            <div className="flex justify-start">
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
              />
            </div>
          )}
        </div>
      );
    },
  });
