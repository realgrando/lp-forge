"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { SmartButton } from "@/components/engine/SmartButton";
import { buttonConfigSchema } from "@/types/site";
import { cn, getRadiusClass, getSurfaceClasses } from "@/lib/utils";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const portfolioVideoStoriesSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  columnsDesktop: z.enum(["2", "3", "4"]).default("3"),
  ctaButton: buttonConfigSchema,
  stories: z.array(
    z.object({
      title: z.string(),
      category: z.string(),
      thumbnail: z.string(),
      videoUrl: z.string(),
      durationTag: z.string().optional(),
    })
  ),
});

export type PortfolioVideoStoriesContent = z.infer<
  typeof portfolioVideoStoriesSchema
>;

export const PortfolioVideoStoriesSection =
  createSection<PortfolioVideoStoriesContent>({
    id: "portfolio.video_stories",
    name: "Portfólio Video Stories (Reels)",
    description:
      "Cards verticais 9:16 estilo Reels/Stories com capa, selo de categoria e player em modal imersivo com controle de áudio.",
    category: "Galeria & Portfólio",
    iconName: "Video",
    modes: ["LANDING_PAGE", "LINKTREE"],
    legacyType: "portfolio",
    legacyVariant: "v2",
    toggleableElements: [
      { key: "badge", label: "Badge Superior" },
      { key: "headline", label: "Título Principal" },
      { key: "subtitle", label: "Subtítulo" },
      { key: "stories", label: "Cards de Vídeo 9:16" },
      { key: "playButton", label: "Botão Play Central nos Cards" },
      { key: "ctaButton", label: "Botão de Ação Inferior" },
    ],
    contentSchema: portfolioVideoStoriesSchema,
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
        optionalKey: "stories",
        options: [
          { value: "2", label: "2 Colunas" },
          { value: "3", label: "3 Colunas" },
          { value: "4", label: "4 Colunas" },
        ],
      },
      {
        key: "stories",
        label: "Vídeo Stories (Formato 9:16)",
        type: "array",
        optionalKey: "stories",
        defaultNewItem: {
          title: "Bastidores da Execução",
          category: "Bastidores",
          thumbnail:
            "https://images.unsplash.com/photo-1541888081622-3cb5562cb08e?auto=format&fit=crop&q=80&w=600",
          videoUrl:
            "https://assets.mixkit.co/videos/preview/mixkit-construction-worker-at-a-site-using-a-drill-40228-large.mp4",
          durationTag: "0:30",
        },
        itemFields: [
          { key: "title", label: "Título do Story", type: "text" },
          { key: "category", label: "Categoria / Tag", type: "text" },
          { key: "thumbnail", label: "Capa (Thumbnail)", type: "image" },
          { key: "videoUrl", label: "URL do Vídeo (MP4)", type: "url" },
          { key: "durationTag", label: "Duração (Ex: 0:45)", type: "text" },
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
        ambientGlow: true,
        hiddenElements: {},
      },
      content: {
        badge: "BASTIDORES EM VÍDEO",
        headline: "Veja nossa operação de elite em ação",
        subtitle:
          "Momentos reais da nossa equipe entregando o máximo padrão de qualidade e acabamento.",
        columnsDesktop: "3",
        ctaButton: {
          enabled: false,
          text: "Seguir no Instagram",
          url: "https://instagram.com",
          variant: "outline",
          size: "md",
          iconName: "ExternalLink",
          iconPosition: "right",
        },
        stories: [
          {
            title: "Artesania & Precisão",
            category: "Gastronomia",
            thumbnail:
              "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600",
            videoUrl:
              "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-pizza-34533-large.mp4",
            durationTag: "0:24",
          },
          {
            title: "Fundação Estrutural",
            category: "Engenharia",
            thumbnail:
              "https://images.unsplash.com/photo-1541888081622-3cb5562cb08e?auto=format&fit=crop&q=80&w=600",
            videoUrl:
              "https://assets.mixkit.co/videos/preview/mixkit-construction-worker-at-a-site-using-a-drill-40228-large.mp4",
            durationTag: "0:38",
          },
          {
            title: "Acabamento Premium",
            category: "Design",
            thumbnail:
              "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=600",
            videoUrl:
              "https://assets.mixkit.co/videos/preview/mixkit-painter-painting-a-wall-with-a-roller-40212-large.mp4",
            durationTag: "0:19",
          },
        ],
      },
    },
    Component: ({ content, styles, theme }) => {
      const surfaceStyle = styles.surfaceVariant || theme.tokens.surfaceStyle;
      const radiusPreset = styles.borderRadius || theme.tokens.borderRadius;
      const accentColor = styles.customAccent || theme.palette.accent;
      const isHidden = (k: string) => Boolean(styles.hiddenElements?.[k]);

      const [activeVideo, setActiveVideo] = useState<
        PortfolioVideoStoriesContent["stories"][number] | null
      >(null);
      const [isMuted, setIsMuted] = useState(true);

      const gridColsClass =
        content.columnsDesktop === "2"
          ? "sm:grid-cols-2 max-w-3xl mx-auto"
          : content.columnsDesktop === "4"
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "sm:grid-cols-2 lg:grid-cols-3";

      return (
        <div className="space-y-12">
          {/* HEADER */}
          {(!isHidden("badge") ||
            !isHidden("headline") ||
            !isHidden("subtitle")) && (
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <EditableText
                isBadge
                defaultIconName="Play"
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
                className="text-3xl sm:text-5xl font-black tracking-tighter"
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

          {/* STORIES GRID 9:16 */}
          {!isHidden("stories") &&
            content.stories &&
            content.stories.length > 0 && (
              <div className={cn("grid grid-cols-1 gap-6", gridColsClass)}>
                {content.stories.map((story, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveVideo(story)}
                    className={cn(
                      "relative aspect-[9/16] overflow-hidden group cursor-pointer shadow-2xl",
                      getSurfaceClasses(surfaceStyle),
                      getRadiusClass(radiusPreset)
                    )}
                  >
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {story.durationTag && (
                      <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white">
                        {story.durationTag}
                      </div>
                    )}

                    {!isHidden("playButton") && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center scale-90 group-hover:scale-105 transition-all duration-300 text-white"
                          style={{
                            boxShadow: `0 0 30px -5px ${accentColor}80`,
                          }}
                        >
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-7 left-7 right-7">
                      <span
                        className="text-[10px] font-black uppercase tracking-widest mb-1.5 block"
                        style={{ color: accentColor }}
                      >
                        {story.category}
                      </span>
                      <h3 className="text-xl font-black text-white leading-tight">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* CTA BUTTON */}
          {!isHidden("ctaButton") && content.ctaButton?.enabled && (
            <div className="flex justify-center pt-2">
              <SmartButton
                button={content.ctaButton}
                elementKey="ctaButton"
                styles={styles}
                theme={theme}
              />
            </div>
          )}

          {/* MODAL VIDEO PLAYER */}
          {activeVideo && (
            <div
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setActiveVideo(null)}
            >
              <div
                className={cn(
                  "relative w-full max-w-[400px] aspect-[9/16] overflow-hidden border border-white/15 shadow-2xl bg-zinc-900",
                  getRadiusClass(radiusPreset)
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={activeVideo.videoUrl}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl text-white flex items-center justify-center border border-white/15 hover:bg-black/80"
                >
                  <X className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl text-white flex items-center justify-center border border-white/15 hover:bg-black/80"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <div className="absolute bottom-6 left-6 right-20 pointer-events-none">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest mb-1 block"
                    style={{ color: accentColor }}
                  >
                    {activeVideo.category}
                  </span>
                  <h4 className="text-lg font-black text-white">
                    {activeVideo.title}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
  });
