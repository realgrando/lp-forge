"use client";

import React, { useEffect } from "react";
import { SiteDocument } from "@/types/site";
import { getSectionDefinition } from "@/registry";
import { SectionWrapper } from "./SectionWrapper";
import { Layers, Plus, FolderKanban } from "lucide-react";

interface DynamicRendererProps {
  document: SiteDocument;
  isEditor?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (id: string) => void;
  onMoveSection?: (id: string, direction: "up" | "down") => void;
  onDuplicateSection?: (id: string) => void;
  onDeleteSection?: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
  onOpenCatalog?: () => void;
  onOpenTemplates?: () => void;
}

/**
 * Motor Unificado de Renderização (LP + Linktree + 60 Variações Clássicas).
 * Transforma o AST (SiteDocument) em JSX vivo, injetando as variáveis CSS do tema
 * e envolvendo cada bloco com o <SectionWrapper />.
 */
export const DynamicRenderer: React.FC<DynamicRendererProps> = ({
  document,
  isEditor = false,
  selectedSectionId = null,
  onSelectSection,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
  onToggleVisibility,
  onOpenCatalog,
  onOpenTemplates,
}) => {
  const { theme, sections } = document;

  const headerSection = sections.find((s) => s.type.startsWith("header."));
  const headerOverlayEnabled = headerSection
    ? headerSection.layout?.headerOverlay !== false
    : false;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.style.setProperty("--brand-primary", theme.palette.primary || "#EAB308");
    root.style.setProperty("--brand-secondary", theme.palette.secondary || "#CA8A04");
    root.style.setProperty("--brand-accent", theme.palette.accent || "#FACC15");
    root.style.setProperty("--bg-main", theme.palette.background || "#09090b");
    root.style.setProperty("--bg-surface", theme.palette.surface || "#18181b");
    root.style.setProperty("--bg-elevated", theme.palette.surface || "#27272a");
  }, [theme.palette]);

  return (
    <div
      style={
        {
          backgroundColor: theme.palette.background,
          color: theme.palette.foreground,
          fontFamily: theme.typography.bodyFont,
          "--site-bg": theme.palette.background,
          "--site-fg": theme.palette.foreground,
          "--site-primary": theme.palette.primary,
          "--site-secondary": theme.palette.secondary,
          "--site-surface": theme.palette.surface,
          "--site-accent": theme.palette.accent,
          "--site-muted": theme.palette.muted || "#A1A1AA",
          "--site-border": theme.palette.border || theme.palette.secondary,
          "--site-badge-bg": theme.palette.badgeBg || "rgba(244, 180, 0, 0.15)",
          "--site-badge-text": theme.palette.badgeText || theme.palette.accent,
          "--site-btn-primary-bg": theme.palette.buttonPrimaryBg || theme.palette.accent,
          "--site-btn-primary-text": theme.palette.buttonPrimaryText || "#09090B",
          "--site-btn-secondary-bg": theme.palette.buttonSecondaryBg || "transparent",
          "--site-btn-secondary-text": theme.palette.buttonSecondaryText || theme.palette.foreground,
          "--site-font-heading": theme.typography.headingFont,
          "--site-font-body": theme.typography.bodyFont,
          "--site-highlight-style": theme.typography.highlightStyle || "accent",
          "--site-highlight-color": theme.typography.highlightColor || theme.palette.accent,
          "--brand-primary": theme.palette.primary,
          "--brand-secondary": theme.palette.secondary,
          "--brand-accent": theme.palette.accent,
          "--bg-main": theme.palette.background,
          "--bg-surface": theme.palette.surface,
          "--bg-elevated": theme.palette.surface,
        } as React.CSSProperties
      }
      className="min-h-full w-full transition-colors duration-300"
    >
      {sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-36 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F4B400]/10 border border-[#F4B400]/25 flex items-center justify-center mb-5 text-[#F4B400] shadow-[0_0_30px_rgba(244,180,0,0.15)]">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Página em branco</h3>
          <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
            Seu projeto está pronto para ser construído. Adicione blocos do catálogo para começar a montar sua página.
          </p>
          <div className="flex items-center gap-3">
            {onOpenCatalog && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCatalog();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F4B400] text-zinc-950 font-bold text-xs hover:opacity-95 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>Explorar Catálogo de Blocos</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        sections.map((section, idx) => {
          const def = getSectionDefinition(section.type);
          if (!def) {
            return (
              <div
                key={section.id}
                className="p-6 text-center text-xs text-red-400 bg-red-950/20 border border-red-500/20"
              >
                Bloco não encontrado no Registry: <code>{section.type}</code>
              </div>
            );
          }

          const { Component } = def;
          const isFirstAfterHeader = Boolean(
            idx === 1 && sections[0]?.type.startsWith("header.")
          );

          return (
            <SectionWrapper
              key={section.id}
              section={section}
              theme={theme}
              sectionName={def.name}
              rawContainer={def.rawContainer}
              isEditor={isEditor}
              isSelected={selectedSectionId === section.id}
              isFirst={idx === 0}
              isLast={idx === sections.length - 1}
              isFirstAfterHeader={isFirstAfterHeader}
              headerOverlayEnabled={headerOverlayEnabled}
              onSelect={() => onSelectSection?.(section.id)}
              onMoveUp={() => onMoveSection?.(section.id, "up")}
              onMoveDown={() => onMoveSection?.(section.id, "down")}
              onDuplicate={() => onDuplicateSection?.(section.id)}
              onDelete={() => onDeleteSection?.(section.id)}
              onToggleVisibility={() => onToggleVisibility?.(section.id)}
            >
              <Component
                sectionId={section.id}
                content={section.content}
                layout={section.layout}
                styles={section.styles}
                theme={theme}
                isEditor={isEditor}
              />
            </SectionWrapper>
          );
        })
      )}
    </div>
  );
};
