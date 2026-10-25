"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { DynamicRenderer } from "@/components/engine/DynamicRenderer";
import {
  getAllSections,
  getCatalogCategories,
  getSectionDefinition,
} from "@/registry";
import {
  FONT_SIZE_GROUPS,
  GOOGLE_FONTS_CATALOG,
} from "@/config/presets";
import { ICON_OPTIONS } from "@/components/engine/DynamicIcon";
import { ButtonContentEditor } from "@/components/studio/ButtonContentEditor";
import { ButtonDesignEditor } from "@/components/studio/ButtonDesignEditor";
import { InlineTypographyEditor } from "@/components/studio/ui/InlineTypographyEditor";
import { ArrayFieldEditor } from "@/components/studio/ArrayFieldEditor";
import { SortableLayerList } from "@/components/studio/SortableLayerList";
import { ThemeGlobalDrawer } from "@/components/studio/ThemeGlobalDrawer";
import { TemplateManagerDrawer } from "@/components/studio/TemplateManagerDrawer";
import { AccordionSection } from "@/components/studio/ui/AccordionSection";
import { SegmentedControl } from "@/components/studio/ui/SegmentedControl";
import { ColorFieldRow } from "@/components/studio/ui/ColorFieldRow";
import { ModernToggle } from "@/components/studio/ui/ModernToggle";
import { ImageUploadField } from "@/components/studio/ui/ImageUploadField";
import { PreviewFrame } from "@/components/studio/PreviewFrame";
import {
  BackgroundPattern,
  BorderPosition,
  BorderRadiusPreset,
  CardHoverEffect,
  ComponentWidth,
  ContainerAlignX,
  ContainerAlignY,
  ContainerWidth,
  ContentMaxWidth,
  GradientDirection,
  LayoutAlignItems,
  LayoutDirection,
  LayoutDistribution,
  LayoutGap,
  HeaderScrollBehavior,
  HeaderScrollVisibility,
  HeaderScrollSurface,
  HeaderScrollShape,
  HeaderSurfaceType,
  PaddingScale,
  SectionMinHeight,
  SurfaceBlur,
  SurfaceStyle,
  TextHighlightStyle,
  TextMaxWidth,
} from "@/types/site";
import { cn } from "@/lib/utils";
import {
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Sparkles,
  Palette,
  Sliders,
  Type,
  FileJson,
  Layers,
  Check,
  Code2,
  Eye,
  EyeOff,
  Search,
  LayoutGrid,
  FolderKanban,
  ExternalLink,
  PanelLeftClose,
  PanelRightClose,
  Maximize2,
  Minimize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ArrowUpToLine,
  ArrowDownToLine,
  Equal,
  StretchVertical,
  StretchHorizontal,
  Hash,
  Columns2,
  Box,
  Image as ImageIcon,
  Info,
  RotateCcw,
  Pin,
  Droplets,
  Shield,
  Compass,
  ArrowDown,
  ArrowUp,
  Copy,
  Trash2,
} from "lucide-react";

export default function StudioPage() {
  const {
    document: siteDoc,
    past,
    future,
    selectedSectionId,
    viewport,
    activeTemplateId,
    templates,
    sectionPacks,
    selectSection,
    setActiveInspectorLayer,
    setViewport,
    switchModeWithPreset,
    undo,
    redo,
    addSection,
    removeSection,
    duplicateSection,
    moveSection,
    reorderSections,
    toggleSectionVisibility,
    updateSectionAnchorId,
    updateSectionContent,
    updateSectionLayout,
    updateSectionStyles,
    resetSectionToDefault,
    toggleElementVisibility,
    updateTypographyOverride,
    applyThemePreset,
    updateThemePalette,
    updateThemeTypography,
    saveCustomThemePreset,
    deleteCustomThemePreset,
    resetThemeToDefault,
    updateThemeTokens,
    customThemePresets,
    hydrateTemplatesFromStorage,
    saveCurrentAsTemplate,
    overwriteActiveTemplate,
    updateTemplateMetadata,
    deleteTemplate,
    duplicateTemplate,
    loadTemplate,
    resetToBlankDocument,
    importTemplateFromJson,
    saveCurrentAsSectionPack,
    insertSectionPack,
    deleteSectionPack,
  } = useStudioStore();

  const [leftTab, setLeftTab] = useState<
    "layers" | "catalog" | "templates" | "theme"
  >("layers");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [rightTab, setRightTab] = useState<"content" | "style">(
    "content"
  );
  const [openDesignAccordion, setOpenDesignAccordion] = useState<string | null>(null);
  const [openContentAccordion, setOpenContentAccordion] = useState<string | null>(null);

  // Iniciar acordeões sempre fechados ao trocar de seção selecionada
  useEffect(() => {
    setOpenDesignAccordion(null);
    setOpenContentAccordion(null);
  }, [selectedSectionId]);

  const toggleDesignAccordion = (key: string) => {
    setOpenDesignAccordion((prev) => {
      const next = prev === key ? null : key;
      if (next === "parent") setActiveInspectorLayer("parent");
      else if (next === "child" || next === "scroll") setActiveInspectorLayer("child");
      else if (next === "inner") setActiveInspectorLayer("inner");
      else setActiveInspectorLayer(null);
      return next;
    });
  };

  const toggleContentAccordion = (key: string) => {
    setOpenContentAccordion((prev) => (prev === key ? null : key));
  };

  const [showJsonModal, setShowJsonModal] = useState(false);

  // Controles de Visualização Fiel, Escala e Painéis Laterais
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [canvasScaleMode, setCanvasScaleMode] = useState<"auto" | "100" | "fluid">("auto");
  const [mobileScrollMode, setMobileScrollMode] = useState<"device" | "expanded">("device");
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(1200);

  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setCanvasWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(canvasContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Sincronização viva em tempo real com a aba de Preview (/preview)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("lp_forge_v2_live_preview", JSON.stringify(siteDoc));
      const channel = new BroadcastChannel("lp_forge_preview_sync");
      channel.postMessage({ type: "SYNC_DOCUMENT", document: siteDoc });
      channel.close();
    } catch {}
  }, [siteDoc]);

  useEffect(() => {
    hydrateTemplatesFromStorage();
  }, [hydrateTemplatesFromStorage]);

  // Atalhos de teclado Ctrl+Z / Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const selectedSection = siteDoc.sections.find(
    (s) => s.id === selectedSectionId
  );
  const selectedDefinition = selectedSection
    ? getSectionDefinition(selectedSection.type)
    : undefined;

  const allCatalogSections = getAllSections();
  const catalogCategories = getCatalogCategories();

  const filteredCatalogSections = allCatalogSections.filter((sec) => {
    const matchesCategory =
      selectedCategory === "ALL" || sec.category === selectedCategory;
    const matchesSearch =
      !catalogSearch.trim() ||
      sec.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      sec.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      sec.category.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isMobileFrame =
    siteDoc.meta.mode === "LINKTREE" || viewport === "mobile";
  const isTabletFrame =
    siteDoc.meta.mode === "LANDING_PAGE" && viewport === "tablet";

  const effectiveAccentColor =
    selectedSection?.styles.customAccent || siteDoc.theme.palette.accent;

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#09090B] text-zinc-100">
      {/* TOPBAR DO STUDIO */}
      <header className="h-14 border-b border-white/10 bg-zinc-950 px-4 flex items-center justify-between shrink-0 z-30">
        {/* Identidade & Seletor de Modo (LP vs Linktree) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F4B400] text-zinc-950 flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(244,180,0,0.4)]">
              NF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight">
                  LP-Forge
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#F4B400]/15 text-[#F4B400] font-semibold">
                  v2 Studio
                </span>
              </div>
            </div>
          </div>

          <div className="h-5 w-px bg-white/10" />

          {/* Toggle Modo LP vs Linktree */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => switchModeWithPreset("LANDING_PAGE")}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                siteDoc.meta.mode === "LANDING_PAGE"
                  ? "bg-[#F4B400] text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Landing Page
            </button>
            <button
              type="button"
              onClick={() => switchModeWithPreset("LINKTREE")}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                siteDoc.meta.mode === "LINKTREE"
                  ? "bg-[#F4B400] text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Bio / Linktree 3D
            </button>
          </div>
        </div>

        {/* Controles Centrais: Viewport, Escala Fiel & Tema Rápido */}
        <div className="flex items-center gap-3">
          {siteDoc.meta.mode === "LANDING_PAGE" && (
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setViewport("desktop")}
                  title="Desktop"
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    viewport === "desktop"
                      ? "bg-white/10 text-[#F4B400]"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("tablet")}
                  title="Tablet"
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    viewport === "tablet"
                      ? "bg-white/10 text-[#F4B400]"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("mobile")}
                  title="Mobile"
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    viewport === "mobile"
                      ? "bg-white/10 text-[#F4B400]"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {viewport === "desktop" && (
                <div className="hidden sm:flex items-center bg-zinc-900 p-1 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setCanvasScaleMode("auto")}
                    title="Auto-Fit: escala desktop proporcional sem espremer colunas"
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all",
                      canvasScaleMode === "auto"
                        ? "bg-[#F4B400] text-zinc-950 font-bold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Auto Fit
                  </button>
                  <button
                    type="button"
                    onClick={() => setCanvasScaleMode("100")}
                    title="Desktop 1280px Fixo (100%)"
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all",
                      canvasScaleMode === "100"
                        ? "bg-[#F4B400] text-zinc-950 font-bold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setCanvasScaleMode("fluid")}
                    title="100% Fluido sem restrição"
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all",
                      canvasScaleMode === "fluid"
                        ? "bg-[#F4B400] text-zinc-950 font-bold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Fluido
                  </button>
                </div>
              )}

              {(viewport === "mobile" || viewport === "tablet") && (
                <div className="hidden sm:flex items-center bg-zinc-900 p-1 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setMobileScrollMode("device")}
                    title="Simulação Real: tela com rolagem e altura física de smartphone"
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all",
                      mobileScrollMode === "device"
                        ? "bg-[#F4B400] text-zinc-950 font-bold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Dispositivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileScrollMode("expanded")}
                    title="Expandido: exibe todas as seções sem rolagem interna"
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all",
                      mobileScrollMode === "expanded"
                        ? "bg-[#F4B400] text-zinc-950 font-bold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Expandido
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Ações Direita: Undo/Redo + Painéis + JSON + Ver Site Real */}
        <div className="flex items-center gap-2">
          {/* Alternar Painéis Laterais (Zen Mode) */}
          <div className="flex items-center bg-zinc-900 rounded-xl border border-white/5 p-0.5">
            <button
              type="button"
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              title={isLeftSidebarOpen ? "Recolher painel esquerdo" : "Expandir painel esquerdo"}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                isLeftSidebarOpen ? "text-zinc-400 hover:text-white" : "text-[#F4B400] bg-white/10"
              )}
            >
              <PanelLeftClose className={cn("w-4 h-4 transition-transform", !isLeftSidebarOpen && "rotate-180")} />
            </button>
            <button
              type="button"
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              title={isRightSidebarOpen ? "Recolher painel direito" : "Expandir painel direito"}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                isRightSidebarOpen ? "text-zinc-400 hover:text-white" : "text-[#F4B400] bg-white/10"
              )}
            >
              <PanelRightClose className={cn("w-4 h-4 transition-transform", !isRightSidebarOpen && "rotate-180")} />
            </button>
          </div>

          <div className="flex items-center bg-zinc-900 rounded-xl border border-white/5 p-0.5">
            <button
              type="button"
              onClick={undo}
              disabled={past.length === 0}
              title="Desfazer (Ctrl+Z)"
              className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg transition-colors"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={future.length === 0}
              title="Refazer (Ctrl+Y)"
              className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg transition-colors"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isLeftSidebarOpen) setIsLeftSidebarOpen(true);
              setLeftTab("templates");
            }}
            className={cn(
              "hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors",
              leftTab === "templates" && isLeftSidebarOpen
                ? "bg-[#F4B400] text-zinc-950 border-[#F4B400]"
                : "bg-zinc-900 hover:bg-zinc-800 border-white/10 text-zinc-200"
            )}
          >
            <FolderKanban className="w-3.5 h-3.5 text-[#F4B400] group-hover:text-zinc-950" />
            <span>Templates</span>
          </button>

          <button
            type="button"
            onClick={() => setShowJsonModal(true)}
            title="Ver JSON AST"
            className="p-1.5 md:px-3 md:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-200 transition-colors inline-flex items-center gap-1.5"
          >
            <FileJson className="w-3.5 h-3.5 text-[#F4B400]" />
            <span className="hidden md:inline">JSON</span>
          </button>

          {/* BOTÃO DE DESTAQUE: VER SITE REAL EM NOVA ABA */}
          <a
            href="/preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F4B400] hover:bg-[#F4B400]/90 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(244,180,0,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            title="Abrir o site verdadeiro em tela cheia numa nova aba"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Site Real</span>
          </a>
        </div>
      </header>

      {/* CORPO DO STUDIO: 3 COLUNAS */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR ESQUERDA: Camadas, Catálogo de Seções, Templates & Tema Global */}
        {isLeftSidebarOpen && (
          <aside className="w-84 border-r border-white/10 bg-zinc-950/90 flex flex-col shrink-0 animate-in fade-in duration-150">
          {/* 4 Abas da Sidebar Esquerda */}
          <div className="p-3 border-b border-white/10">
            <SegmentedControl<"layers" | "catalog" | "templates" | "theme">
              value={leftTab}
              onChange={setLeftTab}
              columns={4}
              size="sm"
              options={[
                { value: "layers", label: "Camadas", icon: <Layers className="w-3.5 h-3.5" /> },
                { value: "catalog", label: "Blocos", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
                { value: "templates", label: "Modelos", icon: <FolderKanban className="w-3.5 h-3.5" /> },
                { value: "theme", label: "Tema", icon: <Palette className="w-3.5 h-3.5" /> },
              ]}
            />
          </div>

          {/* ABA 1 ESQUERDA: CAMADAS DA PÁGINA (DRAG AND DROP) */}
          {leftTab === "layers" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-zinc-200">
                    Estrutura da Página
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    Arraste para reordenar ({siteDoc.sections.length} seções)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLeftTab("catalog")}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#F4B400] text-zinc-950 font-bold text-[11px] hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <SortableLayerList
                  sections={siteDoc.sections}
                  selectedSectionId={selectedSectionId}
                  onSelectSection={(id) => selectSection(id)}
                  onReorderSections={(activeId, overId) =>
                    reorderSections(activeId, overId)
                  }
                  onToggleVisibility={(id) => toggleSectionVisibility(id)}
                  onDuplicateSection={(id) => duplicateSection(id)}
                  onDeleteSection={(id) => removeSection(id)}
                />
              </div>
            </div>
          )}

          {/* ABA 2 ESQUERDA: BIBLIOTECA EXTENSA DE COMPONENTES COM BUSCA E CATEGORIAS */}
          {leftTab === "catalog" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-3.5 border-b border-white/10 space-y-3">
                {/* Campo de Busca */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Buscar seção (Hero, Pricing, Bio...)"
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:border-[#F4B400]"
                  />
                </div>

                {/* Pílulas de Categoria */}
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("ALL")}
                    className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-semibold transition-all",
                      selectedCategory === "ALL"
                        ? "bg-[#F4B400] text-zinc-950"
                        : "bg-zinc-900 text-zinc-400 hover:text-white"
                    )}
                  >
                    Todas ({allCatalogSections.length})
                  </button>
                  {catalogCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-2 py-1 rounded-lg text-[10px] font-semibold transition-all",
                        selectedCategory === cat
                          ? "bg-[#F4B400] text-zinc-950"
                          : "bg-zinc-900 text-zinc-400 hover:text-white"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de Blocos Filtrados */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
                {filteredCatalogSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      addSection(sec.id);
                      setLeftTab("layers");
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/5 hover:border-[#F4B400]/50 transition-all group flex items-start justify-between gap-2.5"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-[#F4B400]">
                        {sec.category}
                      </span>
                      <div className="text-xs font-bold text-zinc-100 group-hover:text-[#F4B400] transition-colors">
                        {sec.name}
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-snug line-clamp-2">
                        {sec.description}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-xl bg-white/5 group-hover:bg-[#F4B400] group-hover:text-zinc-950 flex items-center justify-center shrink-0 transition-colors mt-1">
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ABA 3 ESQUERDA: GERENCIADOR DE TEMPLATES E COMBOS DE SEÇÕES (CRUD MARCO 4) */}
          {leftTab === "templates" && (
            <div className="flex-1 overflow-y-auto p-3.5">
              <TemplateManagerDrawer
                currentDocument={siteDoc}
                activeTemplateId={activeTemplateId}
                templates={templates}
                sectionPacks={sectionPacks}
                onLoadTemplate={(id) => loadTemplate(id)}
                onSaveAsNewTemplate={(name, desc, cat) =>
                  saveCurrentAsTemplate(name, desc, cat)
                }
                onOverwriteActiveTemplate={() => overwriteActiveTemplate()}
                onUpdateTemplateMetadata={(id, patch) =>
                  updateTemplateMetadata(id, patch)
                }
                onDuplicateTemplate={(id) => duplicateTemplate(id)}
                onDeleteTemplate={(id) => deleteTemplate(id)}
                onResetToBlank={() => resetToBlankDocument()}
                onImportJson={(jsonStr) => importTemplateFromJson(jsonStr)}
                onSaveSectionPack={(name, desc) =>
                  saveCurrentAsSectionPack(name, desc)
                }
                onInsertSectionPack={(packId) => {
                  insertSectionPack(packId);
                  setLeftTab("layers");
                }}
                onDeleteSectionPack={(packId) => deleteSectionPack(packId)}
              />
            </div>
          )}

          {/* ABA 4 ESQUERDA: TEMA GLOBAL */}
          {leftTab === "theme" && (
            <div className="flex-1 overflow-y-auto p-4">
              <ThemeGlobalDrawer
                theme={siteDoc.theme}
                customPresets={customThemePresets}
                onApplyPreset={applyThemePreset}
                onUpdatePalette={updateThemePalette}
                onUpdateTypography={updateThemeTypography}
                onSaveCustomPreset={saveCustomThemePreset}
                onDeleteCustomPreset={deleteCustomThemePreset}
                onResetToDefault={resetThemeToDefault}
              />
            </div>
          )}
        </aside>
        )}

        {/* CANVAS CENTRAL (VIEWPORT DINÂMICO LP vs BIO COM ESCALA FIEL) */}
        <main
          ref={canvasContainerRef}
          onClick={() => selectSection(null)}
          className={cn(
            "flex-1 overflow-y-auto bg-[#0D0D11] flex justify-center items-start relative transition-all",
            isMobileFrame
              ? "p-6 md:p-8"
              : canvasScaleMode === "fluid"
              ? "p-2 md:p-4"
              : "p-4 md:p-6"
          )}
        >
          {/* Botão flutuante para reabrir painel esquerdo quando recolhido */}
          {!isLeftSidebarOpen && (
            <button
              type="button"
              onClick={() => setIsLeftSidebarOpen(true)}
              title="Expandir Painel de Blocos e Camadas"
              className="absolute left-3 top-3 z-30 p-2 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-400 hover:text-[#F4B400] shadow-xl hover:scale-105 transition-all"
            >
              <PanelLeftClose className="w-4 h-4 rotate-180" />
            </button>
          )}

          {/* Botão flutuante para reabrir inspetor direito quando recolhido */}
          {!isRightSidebarOpen && (
            <button
              type="button"
              onClick={() => setIsRightSidebarOpen(true)}
              title="Expandir Inspetor de Propriedades"
              className="absolute right-3 top-3 z-30 p-2 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-400 hover:text-[#F4B400] shadow-xl hover:scale-105 transition-all"
            >
              <PanelRightClose className="w-4 h-4 rotate-180" />
            </button>
          )}

          {/* Grade sutil de fundo do Studio */}
          <div
            className="pointer-events-none fixed inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div
            style={
              !isMobileFrame && !isTabletFrame && canvasScaleMode === "auto"
                ? {
                    width: "1280px",
                    transform:
                      canvasWidth < 1328
                        ? `scale(${Math.max(0.55, (canvasWidth - 48) / 1280)})`
                        : undefined,
                    transformOrigin: "top center",
                    marginBottom:
                      canvasWidth < 1328
                        ? `${(1 - (canvasWidth - 48) / 1280) * -35}vh`
                        : undefined,
                  }
                : undefined
            }
            className={cn(
              "transition-all duration-200 relative z-10 shadow-2xl overflow-hidden",
              isMobileFrame
                ? cn(
                    "w-[412px] rounded-[3rem] border-[10px] border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.75)] flex flex-col",
                    mobileScrollMode === "expanded"
                      ? "min-h-[780px]"
                      : "h-[840px] overflow-hidden"
                  )
                : isTabletFrame
                ? cn(
                    "w-[768px] rounded-2xl border border-white/10 flex flex-col shadow-2xl",
                    mobileScrollMode === "expanded"
                      ? "min-h-[900px]"
                      : "h-[920px] overflow-hidden"
                  )
                : canvasScaleMode === "fluid"
                ? "w-full min-h-[85vh] rounded-2xl border border-white/10"
                : canvasScaleMode === "100"
                ? "w-[1280px] min-h-[85vh] rounded-2xl border border-white/10 shrink-0"
                : "min-h-[85vh] rounded-2xl border border-white/10 shrink-0"
            )}
          >
            {/* Notch superior quando em modo Smartphone / Linktree */}
            {isMobileFrame && (
              <div className="bg-zinc-950 h-7 w-full flex items-center justify-between px-6 border-b border-white/5 shrink-0 z-20">
                <span className="text-[10px] font-mono font-bold text-zinc-500">9:41</span>
                <div className="w-20 h-3.5 rounded-full bg-zinc-900 border border-white/5" />
                <div className="w-3.5 h-2 rounded-xs border border-zinc-500/80" />
              </div>
            )}

            {isMobileFrame || isTabletFrame ? (
              <div className="flex-1 w-full h-full relative overflow-hidden">
                <PreviewFrame
                  autoHeight={mobileScrollMode === "expanded"}
                  className="w-full h-full"
                  onNavigateAnchor={(anchorId) => {
                    const sec = siteDoc.sections.find(
                      (s) => s.anchorId === anchorId || s.id === anchorId
                    );
                    if (sec) selectSection(sec.id);
                  }}
                >
                  <DynamicRenderer
                    document={siteDoc}
                    isEditor={true}
                    selectedSectionId={selectedSectionId}
                    onSelectSection={(id) => selectSection(id)}
                    onMoveSection={(id, dir) => moveSection(id, dir)}
                    onDuplicateSection={(id) => duplicateSection(id)}
                    onDeleteSection={(id) => removeSection(id)}
                    onToggleVisibility={(id) => toggleSectionVisibility(id)}
                    onOpenCatalog={() => setLeftTab("catalog")}
                    onOpenTemplates={() => setLeftTab("templates")}
                  />
                </PreviewFrame>
              </div>
            ) : (
              <div
                onClickCapture={(e) => {
                  const target = (e.target as HTMLElement).closest("a");
                  if (!target) return;
                  const href = target.getAttribute("href");
                  if (href && href.startsWith("#") && href.length > 1) {
                    e.preventDefault();
                    const anchorId = href.slice(1);
                    const el = document.getElementById(anchorId);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                    const sec = siteDoc.sections.find(
                      (s) => s.anchorId === anchorId || s.id === anchorId
                    );
                    if (sec) selectSection(sec.id);
                  }
                }}
              >
                <DynamicRenderer
                  document={siteDoc}
                  isEditor={true}
                  selectedSectionId={selectedSectionId}
                  onSelectSection={(id) => selectSection(id)}
                  onMoveSection={(id, dir) => moveSection(id, dir)}
                  onDuplicateSection={(id) => duplicateSection(id)}
                  onDeleteSection={(id) => removeSection(id)}
                  onToggleVisibility={(id) => toggleSectionVisibility(id)}
                  onOpenCatalog={() => setLeftTab("catalog")}
                  onOpenTemplates={() => setLeftTab("templates")}
                />
              </div>
            )}
          </div>
        </main>

        {/* SIDEBAR DIREITA: INSPETOR PROFUNDO DAS 3 CAMADAS (DO MACRO AO MICRO) */}
        {isRightSidebarOpen && (
          <aside className="w-96 border-l border-white/10 bg-zinc-950 flex flex-col shrink-0 animate-in fade-in duration-150">
          {!selectedSection || !selectedDefinition ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-zinc-300">
                Nenhuma seção selecionada
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Clique em qualquer bloco no Canvas para customizar elementos, botões, ícones, superfícies e fontes.
              </p>
            </div>
          ) : (
            <>
              {/* Cabeçalho do Bloco Selecionado */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4B400]">
                    {selectedDefinition.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => resetSectionToDefault(selectedSection.id)}
                      title="Restaurar layout e acabamentos para o padrão original de fábrica"
                      className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-1 border border-white/5 hover:border-white/20"
                    >
                      <RotateCcw className="w-2.5 h-2.5 text-[#F4B400]" />
                      <span>Restaurar Padrão</span>
                    </button>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {selectedSection.id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1.5 gap-2">
                  <h3 className="text-sm font-bold text-white truncate min-w-0">
                    {selectedDefinition.name}
                  </h3>
                  {/* Ações Rápidas da Seção no Topo do Inspetor */}
                  <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-lg p-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveSection(selectedSection.id, "up")}
                      title="Mover seção para cima"
                      className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(selectedSection.id, "down")}
                      title="Mover seção para baixo"
                      className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSectionVisibility(selectedSection.id)}
                      title={selectedSection.layout.hidden ? "Mostrar seção" : "Ocultar seção"}
                      className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                    >
                      {selectedSection.layout.hidden ? (
                        <Eye className="w-3.5 h-3.5 text-[#F4B400]" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateSection(selectedSection.id)}
                      title="Duplicar seção"
                      className="p-1 text-zinc-400 hover:text-[#F4B400] rounded hover:bg-white/10 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(selectedSection.id)}
                      title="Excluir seção"
                      className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Campo de ID Único / Âncora de Navegação */}
                <div className="mt-2.5 pt-2 border-t border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                      <Hash className="w-3 h-3 text-[#F4B400]" />
                      <span>ID da Seção (Âncora HTML)</span>
                    </label>
                    <span className="text-[9px] text-[#F4B400] font-mono">
                      #{selectedSection.anchorId || selectedSection.id}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-xs font-mono font-bold text-[#F4B400] pointer-events-none select-none">
                      #
                    </span>
                    <input
                      type="text"
                      value={selectedSection.anchorId || ""}
                      onChange={(e) => {
                        const clean = e.target.value
                          .toLowerCase()
                          .replace(/^#+/, "")
                          .replace(/[^a-z0-9_-]/g, "");
                        updateSectionAnchorId(selectedSection.id, clean);
                      }}
                      placeholder={selectedSection.id}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-6 pr-2.5 py-1 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#F4B400] transition-colors"
                    />
                  </div>
                </div>

                {/* Abas das Camadas: Conteúdo & Tipografia vs Design */}
                <div className="mt-3">
                  <SegmentedControl<"content" | "style">
                    value={rightTab}
                    onChange={setRightTab}
                    columns={2}
                    size="sm"
                    options={[
                      {
                        value: "content",
                        label: "Conteúdo & Textos",
                        icon: <Sparkles className="w-3.5 h-3.5" />,
                      },
                      {
                        value: "style",
                        label: "Design",
                        icon: <Sliders className="w-3.5 h-3.5" />,
                      },
                    ]}
                  />
                </div>
              </div>

              {/* Conteúdo da Aba Ativa */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* ABA 1: ELEMENTOS, BOTÕES, LISTAS E OPCIONALIDADE GLOBAL */}
                {rightTab === "content" && (() => {
                  const contentFields = selectedDefinition.fields.filter(
                    (f) => f.type !== "button" && f.type !== "array"
                  );
                  const buttonFields = selectedDefinition.fields.filter(
                    (f) => f.type === "button"
                  );
                  const arrayFields = selectedDefinition.fields.filter(
                    (f) => f.type === "array"
                  );

                  return (
                    <div className="space-y-3">
                      {/* Barra de controle rápido e status das seções de conteúdo */}
                      <div className="flex items-center justify-between px-1 text-xs">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                          <span className="font-semibold text-zinc-300">Conteúdo & Textos</span>
                          <span className="text-[10px] text-zinc-500">• 1 por vez</span>
                        </div>
                        {openContentAccordion !== null && (
                          <button
                            type="button"
                            onClick={() => setOpenContentAccordion(null)}
                            className="text-[11px] text-amber-400/90 hover:text-amber-300 font-medium hover:underline transition-colors"
                          >
                            Recolher tudo
                          </button>
                        )}
                      </div>

                      {/* 1. Elementos Opcionais da Seção */}
                      {selectedDefinition.toggleableElements &&
                        selectedDefinition.toggleableElements.length > 0 && (
                          <AccordionSection
                            title="Visibilidade dos Elementos"
                            subtitle="Ligue ou oculte sub-elementos da seção"
                            icon={Eye}
                            badge={selectedDefinition.toggleableElements.length}
                            isOpen={openContentAccordion === "visibility"}
                            onToggle={() => toggleContentAccordion("visibility")}
                          >
                            <div className="grid grid-cols-2 gap-2">
                              {selectedDefinition.toggleableElements.map((el) => {
                                const isHidden = Boolean(
                                  selectedSection.styles.hiddenElements?.[el.key]
                                );
                                return (
                                  <ModernToggle
                                    key={el.key}
                                    label={el.label}
                                    checked={!isHidden}
                                    onChange={() =>
                                      toggleElementVisibility(
                                        selectedSection.id,
                                        el.key
                                      )
                                    }
                                  />
                                );
                              })}
                            </div>
                          </AccordionSection>
                        )}

                      {/* 2. Conteúdo e Textos Principais */}
                      {contentFields.length > 0 && (
                        <AccordionSection
                          title="Conteúdo & Textos"
                          subtitle="Títulos, subtítulos, descrições e mídias"
                          icon={Type}
                          badge={contentFields.length}
                          isOpen={openContentAccordion === "texts"}
                          onToggle={() => toggleContentAccordion("texts")}
                        >
                          <div className="space-y-3.5">
                            {contentFields.map((field) => {
                              const val = selectedSection.content[field.key];
                              const optKey = field.optionalKey || field.key;
                              const isElementHidden = Boolean(
                                selectedSection.styles.hiddenElements?.[optKey]
                              );

                              // Image Field (com Upload, Drag & Drop e URL)
                              if (field.type === "image") {
                                const hasRadius =
                                  field.hasRadiusControl ??
                                  (field.key === "logoImageUrl" || field.key.toLowerCase().includes("logo"));
                                const radiusKey =
                                  field.radiusKey ||
                                  (field.key === "logoImageUrl" ? "logoImageRadius" : `${field.key}Radius`);
                                const currentRadius =
                                  (selectedSection.content as any)?.[radiusKey] as BorderRadiusPreset | undefined;

                                return (
                                  <div
                                    key={field.key}
                                    className={cn(
                                      "space-y-1.5 p-3 rounded-xl border transition-all",
                                      !isElementHidden
                                        ? "bg-zinc-950/70 border-white/10"
                                        : "bg-zinc-950/30 border-white/5 opacity-50"
                                    )}
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <label className="text-xs font-semibold text-zinc-200">
                                        {field.label}
                                      </label>
                                      {field.optionalKey && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleElementVisibility(
                                              selectedSection.id,
                                              optKey
                                            )
                                          }
                                          title={
                                            isElementHidden
                                              ? "Exibir este elemento"
                                              : "Ocultar este elemento"
                                          }
                                          className={cn(
                                            "w-6 h-6 rounded-lg border flex items-center justify-center transition-colors",
                                            !isElementHidden
                                              ? "bg-[#F4B400]/15 border-[#F4B400]/40 text-[#F4B400]"
                                              : "bg-zinc-900 border-white/10 text-zinc-500"
                                          )}
                                        >
                                          {!isElementHidden ? (
                                            <Eye className="w-3 h-3" />
                                          ) : (
                                            <EyeOff className="w-3 h-3" />
                                          )}
                                        </button>
                                      )}
                                    </div>

                                    {!isElementHidden && (
                                      <ImageUploadField
                                        label=""
                                        value={val || ""}
                                        placeholder={field.placeholder || "https://... ou solte o arquivo"}
                                        radius={hasRadius ? currentRadius || "none" : undefined}
                                        onRadiusChange={
                                          hasRadius
                                            ? (newRadius) =>
                                                updateSectionContent(
                                                  selectedSection.id,
                                                  radiusKey,
                                                  newRadius
                                                )
                                            : undefined
                                        }
                                        radiusLabel={
                                          field.radiusLabel ||
                                          (field.key === "logoImageUrl"
                                            ? "Arredondamento da Logo"
                                            : "Arredondamento dos Cantos")
                                        }
                                        onChange={(newUrl) =>
                                          updateSectionContent(
                                            selectedSection.id,
                                            field.key,
                                            newUrl
                                          )
                                        }
                                        onReset={() => {
                                          updateSectionContent(
                                            selectedSection.id,
                                            field.key,
                                            ""
                                          );
                                          if (hasRadius) {
                                            updateSectionContent(
                                              selectedSection.id,
                                              radiusKey,
                                              "none"
                                            );
                                          }
                                        }}
                                      />
                                    )}
                                  </div>
                                );
                              }

                              // Text / URL
                              if (
                                field.type === "text" ||
                                field.type === "url"
                              ) {
                                return (
                                  <div
                                    key={field.key}
                                    className={cn(
                                      "space-y-2.5 p-3.5 rounded-xl border transition-all",
                                      !isElementHidden
                                        ? "bg-zinc-950/70 border-white/10"
                                        : "bg-zinc-950/30 border-white/5 opacity-50"
                                    )}
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <label className="text-xs font-semibold text-zinc-200">
                                        {field.label}
                                      </label>
                                      {field.optionalKey && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleElementVisibility(
                                              selectedSection.id,
                                              optKey
                                            )
                                          }
                                          title={
                                            isElementHidden
                                              ? "Exibir este elemento"
                                              : "Ocultar este elemento"
                                          }
                                          className={cn(
                                            "w-6 h-6 rounded-lg border flex items-center justify-center transition-colors",
                                            !isElementHidden
                                              ? "bg-[#F4B400]/15 border-[#F4B400]/40 text-[#F4B400]"
                                              : "bg-zinc-900 border-white/10 text-zinc-500"
                                          )}
                                        >
                                          {!isElementHidden ? (
                                            <Eye className="w-3 h-3" />
                                          ) : (
                                            <EyeOff className="w-3 h-3" />
                                          )}
                                        </button>
                                      )}
                                    </div>

                                    {!isElementHidden && (
                                      <>
                                        <input
                                          type="text"
                                          value={val || ""}
                                          onChange={(e) =>
                                            updateSectionContent(
                                              selectedSection.id,
                                              field.key,
                                              e.target.value
                                            )
                                          }
                                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
                                        />

                                        {field.typographyElementKey && (
                                          <InlineTypographyEditor
                                            elementKey={field.typographyElementKey}
                                            label={`Tipografia (${field.label})`}
                                            override={
                                              selectedSection.styles
                                                .typographyOverrides?.[
                                                field.typographyElementKey
                                              ]
                                            }
                                            onChange={(patch) =>
                                              updateTypographyOverride(
                                                selectedSection.id,
                                                field.typographyElementKey!,
                                                patch
                                              )
                                            }
                                            onReset={() =>
                                              updateTypographyOverride(
                                                selectedSection.id,
                                                field.typographyElementKey!,
                                                {
                                                  fontFamily: undefined,
                                                  fontSize: undefined,
                                                  fontWeight: undefined,
                                                  textTransform: undefined,
                                                  letterSpacing: undefined,
                                                  color: undefined,
                                                }
                                              )
                                            }
                                            defaultAccentColor={effectiveAccentColor}
                                          />
                                        )}
                                      </>
                                    )}
                                  </div>
                                );
                              }

                              // Textarea
                              if (field.type === "textarea") {
                                return (
                                  <div
                                    key={field.key}
                                    className={cn(
                                      "space-y-2.5 p-3.5 rounded-xl border transition-all",
                                      !isElementHidden
                                        ? "bg-zinc-950/70 border-white/10"
                                        : "bg-zinc-950/30 border-white/5 opacity-50"
                                    )}
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <label className="text-xs font-semibold text-zinc-200">
                                        {field.label}
                                      </label>
                                      {field.optionalKey && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleElementVisibility(
                                              selectedSection.id,
                                              optKey
                                            )
                                          }
                                          title={
                                            isElementHidden
                                              ? "Exibir este elemento"
                                              : "Ocultar este elemento"
                                          }
                                          className={cn(
                                            "w-6 h-6 rounded-lg border flex items-center justify-center transition-colors",
                                            !isElementHidden
                                              ? "bg-[#F4B400]/15 border-[#F4B400]/40 text-[#F4B400]"
                                              : "bg-zinc-900 border-white/10 text-zinc-500"
                                          )}
                                        >
                                          {!isElementHidden ? (
                                            <Eye className="w-3 h-3" />
                                          ) : (
                                            <EyeOff className="w-3 h-3" />
                                          )}
                                        </button>
                                      )}
                                    </div>

                                    {!isElementHidden && (
                                      <>
                                        <textarea
                                          rows={3}
                                          value={val || ""}
                                          onChange={(e) =>
                                            updateSectionContent(
                                              selectedSection.id,
                                              field.key,
                                              e.target.value
                                            )
                                          }
                                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
                                        />

                                        {field.typographyElementKey && (
                                          <InlineTypographyEditor
                                            elementKey={field.typographyElementKey}
                                            label={`Tipografia (${field.label})`}
                                            override={
                                              selectedSection.styles
                                                .typographyOverrides?.[
                                                field.typographyElementKey
                                              ]
                                            }
                                            onChange={(patch) =>
                                              updateTypographyOverride(
                                                selectedSection.id,
                                                field.typographyElementKey!,
                                                patch
                                              )
                                            }
                                            onReset={() =>
                                              updateTypographyOverride(
                                                selectedSection.id,
                                                field.typographyElementKey!,
                                                {
                                                  fontFamily: undefined,
                                                  fontSize: undefined,
                                                  fontWeight: undefined,
                                                  textTransform: undefined,
                                                  letterSpacing: undefined,
                                                  color: undefined,
                                                }
                                              )
                                            }
                                            defaultAccentColor={effectiveAccentColor}
                                          />
                                        )}
                                      </>
                                    )}
                                  </div>
                                );
                              }

                              // Toggle
                              if (field.type === "toggle") {
                                return (
                                  <ModernToggle
                                    key={field.key}
                                    label={field.label}
                                    checked={Boolean(val)}
                                    onChange={(chk) =>
                                      updateSectionContent(
                                        selectedSection.id,
                                        field.key,
                                        chk
                                      )
                                    }
                                  />
                                );
                              }

                              return null;
                            })}
                          </div>
                        </AccordionSection>
                      )}

                      {/* 3. Ações & Botões (CTAs) */}
                      {buttonFields.length > 0 && (
                        <AccordionSection
                          title="Botões & Chamadas (CTAs)"
                          subtitle="Textos, links e tipografia dos botões"
                          icon={Sparkles}
                          badge={buttonFields.length}
                          isOpen={openContentAccordion === "buttons"}
                          onToggle={() => toggleContentAccordion("buttons")}
                        >
                          <div className="space-y-3">
                            {buttonFields.map((field) => {
                              const val = selectedSection.content[field.key];
                              const optKey = field.optionalKey || field.key;
                              const typoKey = field.typographyElementKey || field.key;
                              const isElementHidden = Boolean(
                                selectedSection.styles.hiddenElements?.[optKey]
                              );
                              return (
                                <ButtonContentEditor
                                  key={field.key}
                                  label={field.label}
                                  value={val}
                                  typographyOverride={
                                    selectedSection.styles.typographyOverrides?.[typoKey]
                                  }
                                  isHiddenBySection={isElementHidden}
                                  onToggleSectionVisibility={() =>
                                    toggleElementVisibility(
                                      selectedSection.id,
                                      optKey
                                    )
                                  }
                                  onChange={(nextBtn) =>
                                    updateSectionContent(
                                      selectedSection.id,
                                      field.key,
                                      nextBtn
                                    )
                                  }
                                  onTypographyChange={(patch) =>
                                    updateTypographyOverride(
                                      selectedSection.id,
                                      typoKey,
                                      patch
                                    )
                                  }
                                  onTypographyReset={() =>
                                    updateTypographyOverride(
                                      selectedSection.id,
                                      typoKey,
                                      {
                                        fontFamily: undefined,
                                        fontSize: undefined,
                                        fontWeight: undefined,
                                        textTransform: undefined,
                                        letterSpacing: undefined,
                                        color: undefined,
                                      }
                                    )
                                  }
                                  defaultAccentColor={effectiveAccentColor}
                                />
                              );
                            })}
                          </div>
                        </AccordionSection>
                      )}

                      {/* 4. Coleções & Listas */}
                      {arrayFields.length > 0 && (
                        <AccordionSection
                          title="Coleções & Listas"
                          subtitle="Cards repetíveis, itens e listas dinâmicas"
                          icon={Layers}
                          badge={arrayFields.length}
                          isOpen={openContentAccordion === "arrays"}
                          onToggle={() => toggleContentAccordion("arrays")}
                        >
                          <div className="space-y-4">
                            {arrayFields.map((field) => {
                              const val = selectedSection.content[field.key];
                              const optKey = field.optionalKey || field.key;
                              const isElementHidden = Boolean(
                                selectedSection.styles.hiddenElements?.[optKey]
                              );
                              return (
                                <div key={field.key} className="space-y-2">
                                  <ArrayFieldEditor
                                    field={field}
                                    items={val || []}
                                    isHidden={isElementHidden}
                                    onToggleVisibility={() =>
                                      toggleElementVisibility(
                                        selectedSection.id,
                                        optKey
                                      )
                                    }
                                    onChange={(nextItems) =>
                                      updateSectionContent(
                                        selectedSection.id,
                                        field.key,
                                        nextItems
                                      )
                                    }
                                    defaultAccentColor={effectiveAccentColor}
                                  />

                                  {field.typographyElementKey && !isElementHidden && (
                                    <InlineTypographyEditor
                                      elementKey={field.typographyElementKey}
                                      label={`Tipografia dos Itens (${field.label})`}
                                      override={
                                        selectedSection.styles
                                          .typographyOverrides?.[
                                          field.typographyElementKey
                                        ]
                                      }
                                      onChange={(patch) =>
                                        updateTypographyOverride(
                                          selectedSection.id,
                                          field.typographyElementKey!,
                                          patch
                                        )
                                      }
                                      onReset={() =>
                                        updateTypographyOverride(
                                          selectedSection.id,
                                          field.typographyElementKey!,
                                          {
                                            fontFamily: undefined,
                                            fontSize: undefined,
                                            fontWeight: undefined,
                                            textTransform: undefined,
                                            letterSpacing: undefined,
                                            color: undefined,
                                          }
                                        )
                                      }
                                      defaultAccentColor={effectiveAccentColor}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </AccordionSection>
                      )}
                    </div>
                  );
                })()}

                {/* ABA 2: SEÇÃO & SUPERFÍCIE (Macro, Meso e Micro Camadas de Estrutura) */}
                {rightTab === "style" && (() => {
                  const parentWidthBadge =
                    selectedSection.layout.containerWidth === "boxed"
                      ? "Boxed"
                      : selectedSection.layout.containerWidth === "narrow"
                      ? "Narrow"
                      : selectedSection.layout.containerWidth === "mobile"
                      ? "Mobile"
                      : "Full";

                  const childWidth =
                    selectedSection.layout.componentWidth ||
                    (selectedSection.type === "header.capsule" ? "auto" : "full");
                  const childWidthBadge =
                    childWidth === "auto"
                      ? "Cápsula"
                      : childWidth === "narrow"
                      ? "Estreito"
                      : childWidth === "boxed"
                      ? "Bloco"
                      : "Total";

                  const innerDirection =
                    selectedSection.layout.direction ||
                    (selectedSection.type.startsWith("header.") ? "row" : "col");
                  const innerDirectionBadge =
                    innerDirection === "col"
                      ? "Coluna"
                      : innerDirection === "row"
                      ? "Linha"
                      : "Responsivo";

                  return (
                    <div className="space-y-3">
                      {/* Barra de controle rápido e status das camadas */}
                      <div className="flex items-center justify-between px-1 text-xs">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                          <span className="font-semibold text-zinc-300">Camadas de Design</span>
                          <span className="text-[10px] text-zinc-500">• 1 por vez</span>
                        </div>
                        {openDesignAccordion !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setOpenDesignAccordion(null);
                              setActiveInspectorLayer(null);
                            }}
                            className="text-[11px] text-amber-400/90 hover:text-amber-300 font-medium hover:underline transition-colors"
                          >
                            Recolher tudo
                          </button>
                        )}
                      </div>

                      {/* CAMADA 1: CONTAINER DA SEÇÃO (PAI) */}
                      <div
                        onMouseEnter={() => {
                          if (openDesignAccordion === "parent") setActiveInspectorLayer("parent");
                        }}
                      >
                        <AccordionSection
                          title="1. Container da Seção (Pai)"
                          subtitle="Largura, altura e alinhamento do bloco na página"
                          icon={Box}
                          badge={parentWidthBadge}
                          isOpen={openDesignAccordion === "parent"}
                          onToggle={() => toggleDesignAccordion("parent")}
                        >
                      <div className="space-y-5">
                        {/* Largura Máxima do Container Pai */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Largura Máxima do Container (Pai)
                            </label>
                            <span className="text-[10px] text-zinc-500">
                              Limite horizontal
                            </span>
                          </div>
                          <SegmentedControl<ContainerWidth>
                            value={
                              selectedSection.layout.containerWidth ||
                              (selectedSection.type.startsWith("header.")
                                ? "full"
                                : "boxed")
                            }
                            onChange={(width) =>
                              updateSectionLayout(selectedSection.id, {
                                containerWidth: width,
                              })
                            }
                            columns={4}
                            size="sm"
                            options={[
                              { value: "full", label: "Total", icon: <Maximize2 className="w-3 h-3" /> },
                              { value: "boxed", label: "Padrão", icon: <Box className="w-3 h-3" /> },
                              { value: "narrow", label: "Estreito", icon: <Columns2 className="w-3 h-3" /> },
                              { value: "mobile", label: "Mobile", icon: <Smartphone className="w-3 h-3" /> },
                            ]}
                          />
                        </div>

                        {/* Altura da Seção (Min Height) */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Altura Mínima da Seção
                            </label>
                            <span className="text-[10px] text-zinc-500">
                              Escala vertical
                            </span>
                          </div>
                          <SegmentedControl<SectionMinHeight>
                            value={selectedSection.layout.minHeight || "auto"}
                            onChange={(mh) =>
                              updateSectionLayout(selectedSection.id, {
                                minHeight: mh,
                              })
                            }
                            columns={4}
                            size="sm"
                            options={[
                              { value: "auto", label: "Auto", icon: <Minimize2 className="w-3 h-3" /> },
                              { value: "screen", label: "100vh", icon: <Monitor className="w-3 h-3" /> },
                              { value: "large", label: "75%", icon: <LayoutGrid className="w-3 h-3" /> },
                              { value: "half", label: "50%", icon: <Equal className="w-3 h-3" /> },
                            ]}
                          />
                        </div>

                        {/* Posição Horizontal do Componente no Container Pai (Eixo X) */}
                        {(() => {
                          const isSectionFull =
                            (selectedSection.layout.containerWidth ||
                              (selectedSection.type.startsWith("header.") ? "full" : "boxed")) ===
                            "full";
                          const isComponentFull =
                            (selectedSection.layout.componentWidth ||
                              (selectedSection.type === "header.capsule" ? "auto" : "full")) ===
                            "full";
                          const hasNoHorizontalFreedom = isSectionFull && isComponentFull;

                          return (
                            <div className="space-y-2 pt-2 border-t border-white/5">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-zinc-300 block">
                                  Posição Horizontal no Pai (Eixo X)
                                </label>
                                <span className="text-[10px] text-zinc-500">
                                  Alinhamento do bloco
                                </span>
                              </div>
                              <SegmentedControl<ContainerAlignX>
                                value={selectedSection.layout.containerAlignX || "center"}
                                onChange={(ax) =>
                                  updateSectionLayout(selectedSection.id, {
                                    containerAlignX: ax,
                                  })
                                }
                                columns={3}
                                size="sm"
                                options={[
                                  { value: "start", label: "Esquerda", icon: <AlignLeft className="w-3 h-3" /> },
                                  { value: "center", label: "Centro", icon: <AlignCenter className="w-3 h-3" /> },
                                  { value: "end", label: "Direita", icon: <AlignRight className="w-3 h-3" /> },
                                ]}
                              />

                              {hasNoHorizontalFreedom && (
                                <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
                                  <Info className="w-3 h-3 text-zinc-400 shrink-0" />
                                  <span>Ocupando 100% da tela. Altere a largura do container ou componente para mover o bloco.</span>
                                </p>
                              )}
                            </div>
                          );
                        })()}

                        {/* Posição Vertical no Pai (Eixo Y) */}
                        {(() => {
                          const isMinHeightAuto =
                            !selectedSection.layout.minHeight ||
                            selectedSection.layout.minHeight === "auto";

                          return (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-zinc-300 block">
                                  Posição Vertical no Pai (Eixo Y)
                                </label>
                                <span className="text-[10px] text-zinc-500">
                                  Com altura definida
                                </span>
                              </div>
                              <SegmentedControl<ContainerAlignY>
                                value={selectedSection.layout.containerAlignY || "center"}
                                onChange={(ay) =>
                                  updateSectionLayout(selectedSection.id, {
                                    containerAlignY: ay,
                                  })
                                }
                                columns={4}
                                size="sm"
                                options={[
                                  { value: "start", label: "Topo", icon: <ArrowUpToLine className="w-3 h-3" /> },
                                  { value: "center", label: "Centro", icon: <AlignCenter className="w-3 h-3" /> },
                                  { value: "end", label: "Base", icon: <ArrowDownToLine className="w-3 h-3" /> },
                                  { value: "stretch", label: "Distribuir", icon: <StretchVertical className="w-3 h-3" /> },
                                ]}
                              />

                              {isMinHeightAuto && (
                                <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
                                  <Info className="w-3 h-3 text-zinc-400 shrink-0" />
                                  <span>Altura em automático. Defina uma Altura Mínima (100vh, 75% ou 50%) para mover verticalmente.</span>
                                </p>
                              )}
                            </div>
                          );
                        })()}

                        {/* Afastamento Externo Vertical (Padding Y) */}
                        <div className="space-y-1.5 pt-2 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Afastamento Vertical (Padding Y)
                            </label>
                            <span className="text-[10px] text-zinc-500">
                              Entre seções
                            </span>
                          </div>
                          <SegmentedControl<PaddingScale>
                            value={
                              selectedSection.layout.paddingY ||
                              (selectedSection.type.startsWith("header.")
                                ? "none"
                                : "normal")
                            }
                            onChange={(scale) =>
                              updateSectionLayout(selectedSection.id, {
                                paddingY: scale,
                              })
                            }
                            columns={4}
                            size="sm"
                            options={[
                              { value: "none", label: "Zero" },
                              { value: "compact", label: "Pequeno" },
                              { value: "normal", label: "Médio" },
                              { value: "spacious", label: "Grande" },
                            ]}
                          />
                        </div>

                        {/* Margem Lateral da Seção (Padding X) */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Margem Lateral (Padding X)
                            </label>
                            <span className="text-[10px] text-zinc-500">
                              Bordas da tela
                            </span>
                          </div>
                          <SegmentedControl<PaddingScale>
                            value={selectedSection.layout.paddingX || "normal"}
                            onChange={(scale) =>
                              updateSectionLayout(selectedSection.id, {
                                paddingX: scale,
                              })
                            }
                            columns={4}
                            size="sm"
                            options={[
                              { value: "none", label: "Zero" },
                              { value: "compact", label: "Pequena" },
                              { value: "normal", label: "Média" },
                              { value: "spacious", label: "Grande" },
                            ]}
                          />
                          <span className="text-[10px] text-zinc-500 block">
                            Distância mínima de segurança entre o conteúdo e as bordas da tela (evita encostar nas laterais do monitor e celular).
                          </span>
                        </div>

                        {/* Fundo, Cores & Divisores do Container Pai */}
                        <div className="space-y-3 pt-3 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                              <Palette className="w-3.5 h-3.5 text-[#F4B400]" />
                              Fundo & Divisores do Pai (Seção)
                            </label>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              Container Externo
                            </span>
                          </div>

                          {/* Cores da Seção */}
                          <div className="space-y-2.5">
                            <ColorFieldRow
                              label="Cor de Fundo da Seção"
                              description="Fundo de tela do container pai"
                              value={selectedSection.styles.customBg}
                              defaultValue={siteDoc.theme.palette.background}
                              onChange={(hex) =>
                                updateSectionStyles(selectedSection.id, {
                                  customBg: hex,
                                })
                              }
                              onReset={() =>
                                updateSectionStyles(selectedSection.id, {
                                  customBg: undefined,
                                })
                              }
                            />

                            <ColorFieldRow
                              label="Texto Principal da Seção"
                              description="Cor dos títulos e textos deste bloco"
                              value={selectedSection.styles.customText}
                              defaultValue={siteDoc.theme.palette.foreground}
                              onChange={(hex) =>
                                updateSectionStyles(selectedSection.id, {
                                  customText: hex,
                                })
                              }
                              onReset={() =>
                                updateSectionStyles(selectedSection.id, {
                                  customText: undefined,
                                })
                              }
                            />

                            <ColorFieldRow
                              label="Cor de Destaque (Accent)"
                              description="Realces e botões deste bloco"
                              value={selectedSection.styles.customAccent}
                              defaultValue={siteDoc.theme.palette.accent}
                              onChange={(hex) =>
                                updateSectionStyles(selectedSection.id, {
                                  customAccent: hex,
                                })
                              }
                              onReset={() =>
                                updateSectionStyles(selectedSection.id, {
                                  customAccent: undefined,
                                })
                              }
                            />
                          </div>

                          {/* Padrão / Textura de Fundo do Pai */}
                          <div className="space-y-1.5 pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-zinc-300 block">
                                Padrão de Fundo (Pattern Overlay)
                              </label>
                              <span className="text-[10px] text-zinc-500">
                                Malha sutil do pai
                              </span>
                            </div>
                            <SegmentedControl<BackgroundPattern>
                              value={selectedSection.styles.bgPattern || "none"}
                              onChange={(pat) =>
                                updateSectionStyles(selectedSection.id, {
                                  bgPattern: pat,
                                })
                              }
                              columns={4}
                              size="sm"
                              options={[
                                { value: "none", label: "Nenhum" },
                                { value: "grid", label: "Grade" },
                                { value: "dots", label: "Pontos" },
                                { value: "noise", label: "Ruído" },
                              ]}
                            />
                          </div>

                          {/* Gradiente de Fundo do Pai */}
                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <ModernToggle
                              label="Gradiente de Fundo do Pai"
                              description="Fundo degradê estilizado no container da seção"
                              checked={Boolean(selectedSection.styles.bgGradientEnabled)}
                              onChange={(chk) =>
                                updateSectionStyles(selectedSection.id, {
                                  bgGradientEnabled: chk,
                                })
                              }
                            />

                            {selectedSection.styles.bgGradientEnabled && (
                              <div className="space-y-3 pl-2 border-l border-white/10 mt-2">
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-zinc-300 block">
                                    Direção do Gradiente
                                  </label>
                                  <SegmentedControl<GradientDirection>
                                    value={selectedSection.styles.bgGradientDirection || "to-b"}
                                    onChange={(dir) =>
                                      updateSectionStyles(selectedSection.id, {
                                        bgGradientDirection: dir,
                                      })
                                    }
                                    columns={4}
                                    size="sm"
                                    options={[
                                      { value: "to-b", label: "Vertical ↓" },
                                      { value: "to-br", label: "Diagonal ↘" },
                                      { value: "to-r", label: "Horizontal →" },
                                      { value: "radial", label: "Radial ⦿" },
                                    ]}
                                  />
                                </div>

                                <ColorFieldRow
                                  label="Cor Inicial"
                                  description="Ponto de partida do degradê"
                                  value={selectedSection.styles.bgGradientFrom}
                                  defaultValue="#09090b"
                                  onChange={(hex) =>
                                    updateSectionStyles(selectedSection.id, {
                                      bgGradientFrom: hex,
                                    })
                                  }
                                  onReset={() =>
                                    updateSectionStyles(selectedSection.id, {
                                      bgGradientFrom: undefined,
                                    })
                                  }
                                />

                                <ColorFieldRow
                                  label="Cor Final"
                                  description="Ponto de chegada do degradê"
                                  value={selectedSection.styles.bgGradientTo}
                                  defaultValue="#18181b"
                                  onChange={(hex) =>
                                    updateSectionStyles(selectedSection.id, {
                                      bgGradientTo: hex,
                                    })
                                  }
                                  onReset={() =>
                                    updateSectionStyles(selectedSection.id, {
                                      bgGradientTo: undefined,
                                    })
                                  }
                                />
                              </div>
                            )}
                          </div>

                          {/* Imagem de Fundo do Pai com Upload / Drag & Drop */}
                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <ImageUploadField
                              label="Imagem de Fundo da Seção (Pai)"
                              description="Foto de fundo em tela cheia"
                              value={selectedSection.styles.bgImage || ""}
                              onChange={(url) =>
                                updateSectionStyles(selectedSection.id, {
                                  bgImage: url,
                                })
                              }
                              onReset={() =>
                                updateSectionStyles(selectedSection.id, {
                                  bgImage: undefined,
                                })
                              }
                            />

                            {selectedSection.styles.bgImage && (
                              <div className="space-y-1.5 pl-2 border-l border-white/10">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-semibold text-zinc-300 block">
                                    Opacidade da Máscara Escura
                                  </label>
                                  <span className="text-[10px] text-[#F4B400] font-semibold">
                                    {selectedSection.styles.bgOverlayOpacity ?? 70}%
                                  </span>
                                </div>
                                <SegmentedControl<string>
                                  value={String(selectedSection.styles.bgOverlayOpacity ?? 70)}
                                  onChange={(val) =>
                                    updateSectionStyles(selectedSection.id, {
                                      bgOverlayOpacity: Number(val),
                                    })
                                  }
                                  columns={4}
                                  size="sm"
                                  options={[
                                    { value: "40", label: "40%" },
                                    { value: "60", label: "60%" },
                                    { value: "80", label: "80%" },
                                    { value: "95", label: "95%" },
                                  ]}
                                />
                              </div>
                            )}
                          </div>

                          {/* Divisores de Seção (Apenas no Pai) */}
                          <div className="space-y-2.5 pt-2 border-t border-white/5">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Divisores da Seção
                            </label>
                            <ModernToggle
                              label="Borda Superior (Top Divider)"
                              description="Linha divisória sutil no topo do bloco"
                              checked={Boolean(selectedSection.styles.borderTop)}
                              onChange={(chk) =>
                                updateSectionStyles(selectedSection.id, {
                                  borderTop: chk,
                                })
                              }
                            />

                            <ModernToggle
                              label="Borda Inferior (Bottom Divider)"
                              description="Linha divisória sutil na base do bloco"
                              checked={Boolean(selectedSection.styles.borderBottom)}
                              onChange={(chk) =>
                                updateSectionStyles(selectedSection.id, {
                                  borderBottom: chk,
                                })
                              }
                            />

                            {(selectedSection.styles.borderTop ||
                              selectedSection.styles.borderBottom) && (
                              <ModernToggle
                                label="Linha com Luz de Gradiente (Glow Divider)"
                                description="Linha central com brilho gradiente na cor do tema"
                                checked={Boolean(selectedSection.styles.borderGlow)}
                                onChange={(chk) =>
                                  updateSectionStyles(selectedSection.id, {
                                    borderGlow: chk,
                                  })
                                }
                              />
                            )}
                          </div>

                          {/* Arredondamento do Container Pai */}
                          <div className="space-y-1.5 pt-2.5 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-zinc-300 block">
                                Arredondamento do Container Pai (Seção)
                              </label>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {selectedSection.styles.parentBorderRadius || "0 (none)"}
                              </span>
                            </div>
                            <SegmentedControl<BorderRadiusPreset>
                              value={selectedSection.styles.parentBorderRadius || "none"}
                              onChange={(rad) =>
                                updateSectionStyles(selectedSection.id, {
                                  parentBorderRadius: rad,
                                })
                              }
                              columns={5}
                              size="sm"
                              options={[
                                { value: "none", label: "0" },
                                { value: "sm", label: "SM" },
                                { value: "md", label: "MD" },
                                { value: "lg", label: "LG" },
                                { value: "full", label: "Full" },
                              ]}
                            />
                            <span className="text-[10px] text-zinc-500 block">
                              Arredonda as bordas e o fundo exclusivo do Container Pai (visível quando a seção for contida/bloco ou possuir fundo).
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>
                  </div>

                    {/* CAMADA 2: CONTAINER DO COMPONENTE (FILHO) */}
                    <div
                      onMouseEnter={() => {
                        if (openDesignAccordion === "child") setActiveInspectorLayer("child");
                      }}
                    >
                      <AccordionSection
                        title="2. Container do Componente (Filho)"
                        subtitle="Largura do componente, respiro e estilo do card"
                        icon={Layers}
                        badge={childWidthBadge}
                        isOpen={openDesignAccordion === "child"}
                        onToggle={() => toggleDesignAccordion("child")}
                      >
                        <div className="space-y-4">
                          {/* Largura do Componente Filho */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-zinc-300 block">
                                Largura do Componente
                              </label>
                              <span className="text-[10px] text-zinc-500">
                                Escala decrescente
                              </span>
                            </div>
                            <SegmentedControl<ComponentWidth>
                              value={
                                selectedSection.layout.componentWidth ||
                                (selectedSection.type === "header.capsule"
                                  ? "auto"
                                  : "full")
                              }
                              onChange={(cw) =>
                                updateSectionLayout(selectedSection.id, {
                                  componentWidth: cw,
                                })
                              }
                              columns={4}
                              size="sm"
                              options={[
                                { value: "full", label: "Total", icon: <Maximize2 className="w-3 h-3" /> },
                                { value: "boxed", label: "Bloco", icon: <LayoutGrid className="w-3 h-3" /> },
                                { value: "auto", label: "Cápsula", icon: <Box className="w-3 h-3" /> },
                                { value: "narrow", label: "Estreito", icon: <Columns2 className="w-3 h-3" /> },
                              ]}
                            />
                            <span className="text-[10px] text-zinc-500 block">
                              Total (100% do pai) &gt; Bloco (~1024px) &gt; Cápsula (justo ao conteúdo) &gt; Estreito (~768px).
                            </span>
                          </div>

                          {/* Espessura Interna Vertical (Padding Y Interno) */}
                          <div className="space-y-1.5 pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-zinc-300 block">
                                Espessura Interna Vertical (Padding Y)
                              </label>
                              <span className="text-[10px] text-zinc-500">
                                Altura/respiro interno
                              </span>
                            </div>
                            <SegmentedControl<PaddingScale>
                              value={
                                selectedSection.layout.paddingInner ||
                                (selectedSection.type.startsWith("header.")
                                  ? "compact"
                                  : "none")
                              }
                              onChange={(scale) =>
                                updateSectionLayout(selectedSection.id, {
                                  paddingInner: scale,
                                })
                              }
                              columns={4}
                              size="sm"
                              options={[
                                { value: "none", label: "Zero" },
                                { value: "compact", label: "Fino" },
                                { value: "normal", label: "Padrão" },
                                { value: "spacious", label: "Amplo" },
                              ]}
                            />
                          </div>

                          {/* Respiro Interno Lateral (Padding X Interno) */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-zinc-300 block">
                                Respiro Interno Lateral (Padding X)
                              </label>
                              <span className="text-[10px] text-zinc-500">
                                Margem lateral interna
                              </span>
                            </div>
                            <SegmentedControl<PaddingScale>
                              value={
                                selectedSection.layout.paddingInnerX ||
                                (selectedSection.type.startsWith("header.")
                                  ? "normal"
                                  : "none")
                              }
                              onChange={(scale) =>
                                updateSectionLayout(selectedSection.id, {
                                  paddingInnerX: scale,
                                })
                              }
                              columns={4}
                              size="sm"
                              options={[
                                { value: "none", label: "Zero" },
                                { value: "compact", label: "Fino" },
                                { value: "normal", label: "Padrão" },
                                { value: "spacious", label: "Amplo" },
                              ]}
                            />
                            <span className="text-[10px] text-zinc-500 block">
                              Afasta os elementos internos das bordas laterais do card ou barra.
                            </span>
                          </div>

                        {/* Acabamento da Superfície (Card) */}
                        <div className="space-y-2 pt-2 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Acabamento da Superfície (Card)
                            </label>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              Estilo visual
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {(
                              [
                                { id: "solid", label: "Sólido", desc: "Fundo opaco clássico" },
                                { id: "glass", label: "Glassmorphism", desc: "Vidro fosco escuro" },
                                { id: "bordered", label: "Borda Fina", desc: "Minimalista vazado" },
                                { id: "3d_floating", label: "3D Flutuante", desc: "Sombra e elevação" },
                                { id: "neon", label: "Neon Glow", desc: "Borda com brilho neon" },
                              ] as { id: SurfaceStyle; label: string; desc: string }[]
                            ).map((surf) => {
                              const current =
                                selectedSection.styles.surfaceVariant ||
                                siteDoc.theme.tokens?.surfaceStyle ||
                                "glass";
                              const isCurrent = current === surf.id;
                              return (
                                <button
                                  key={surf.id}
                                  type="button"
                                  onClick={() =>
                                    updateSectionStyles(selectedSection.id, {
                                      surfaceVariant: surf.id,
                                    })
                                  }
                                  className={cn(
                                    "p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all group",
                                    isCurrent
                                      ? "bg-[#F4B400]/15 border-[#F4B400] text-[#F4B400] shadow-sm"
                                      : "bg-zinc-950 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                                  )}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span className={cn("text-xs font-semibold", isCurrent ? "text-[#F4B400]" : "text-zinc-200")}>
                                      {surf.label}
                                    </span>
                                    {isCurrent && (
                                      <Check className="w-3.5 h-3.5 text-[#F4B400]" />
                                    )}
                                  </div>
                                  <span className="text-[10px] text-zinc-500 mt-0.5 leading-tight">
                                    {surf.desc}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Raio de Borda do Container Filho (Radius) */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Arredondamento do Container Filho (Card / Superfície)
                            </label>
                            <span className="text-[10px] text-[#F4B400] font-mono">
                              {selectedSection.styles.borderRadius || "0 (none)"}
                            </span>
                          </div>
                          <SegmentedControl<BorderRadiusPreset>
                            value={
                              selectedSection.styles.borderRadius ||
                              "none"
                            }
                            onChange={(rad) =>
                              updateSectionStyles(selectedSection.id, {
                                borderRadius: rad,
                              })
                            }
                            columns={5}
                            size="sm"
                            options={[
                              { value: "none", label: "0" },
                              { value: "sm", label: "SM" },
                              { value: "md", label: "MD" },
                              { value: "lg", label: "LG" },
                              { value: "full", label: "Full" },
                            ]}
                          />
                          <span className="text-[10px] text-zinc-500 block">
                            Arredonda exclusivamente o componente interno e a superfície do Container Filho.
                          </span>
                        </div>

                        {/* Espessura da Borda */}
                        <div className="space-y-2 pt-2 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Espessura da Borda
                            </label>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {selectedSection.styles.borderWidth === "0"
                                ? "Sem borda (0px)"
                                : `${selectedSection.styles.borderWidth || "1"}px`}
                            </span>
                          </div>
                          <SegmentedControl<"0" | "1" | "2" | "3" | "4">
                            value={(selectedSection.styles.borderWidth as any) || "1"}
                            onChange={(bw) =>
                              updateSectionStyles(selectedSection.id, {
                                borderWidth: bw,
                              })
                            }
                            columns={5}
                            size="sm"
                            options={[
                              { value: "0", label: "0px" },
                              { value: "1", label: "1px" },
                              { value: "2", label: "2px" },
                              { value: "3", label: "3px" },
                              { value: "4", label: "4px" },
                            ]}
                          />

                          {selectedSection.styles.borderWidth === "0" ? (
                            <div className="p-2 rounded-lg bg-zinc-950/60 border border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400">
                              <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                              <span>Borda desativada: superfícies 100% livres de contornos e linhas.</span>
                            </div>
                          ) : (
                            <div className="space-y-3 pt-1">
                              {/* Posição da Borda */}
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <label className="text-[11px] font-medium text-zinc-300">
                                    Posição da Borda
                                  </label>
                                  <span className="text-[10px] text-[#F4B400] font-mono">
                                    {selectedSection.styles.borderPosition === "top"
                                      ? "Apenas Superior"
                                      : selectedSection.styles.borderPosition === "bottom"
                                      ? "Apenas Inferior"
                                      : selectedSection.styles.borderPosition === "sides"
                                      ? "Laterais (Lados)"
                                      : selectedSection.styles.borderPosition === "top_bottom"
                                      ? "Superior & Inferior"
                                      : selectedSection.styles.borderPosition === "all"
                                      ? "Contorno Completo (Todas)"
                                      : selectedSection.type.startsWith("header.")
                                      ? "Apenas Inferior (Padrão)"
                                      : "Contorno Completo (Padrão)"}
                                  </span>
                                </div>
                                <SegmentedControl<BorderPosition>
                                  value={
                                    selectedSection.styles.borderPosition ||
                                    (selectedSection.type.startsWith("header.") ? "bottom" : "all")
                                  }
                                  onChange={(pos) =>
                                    updateSectionStyles(selectedSection.id, {
                                      borderPosition: pos,
                                    })
                                  }
                                  columns={5}
                                  size="sm"
                                  options={[
                                    { value: "all", label: "Todas" },
                                    { value: "top", label: "Superior" },
                                    { value: "bottom", label: "Inferior" },
                                    { value: "top_bottom", label: "Sup / Inf" },
                                    { value: "sides", label: "Lados" },
                                  ]}
                                />
                              </div>

                              {/* Cor e Opacidade Unificadas da Borda */}
                              <ColorFieldRow
                                label="Cor & Opacidade da Borda"
                                description="Tonalidade e transparência do contorno do card/header"
                                value={selectedSection.styles.borderColor}
                                defaultValue={effectiveAccentColor}
                                onChange={(hex) =>
                                  updateSectionStyles(selectedSection.id, {
                                    borderColor: hex,
                                  })
                                }
                                onReset={() =>
                                  updateSectionStyles(selectedSection.id, {
                                    borderColor: undefined,
                                  })
                                }
                              />
                            </div>
                          )}
                        </div>

                        {/* Fundo do Componente Filho (Superfície / Card) */}
                        <div className="space-y-3 pt-2 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Fundo da Superfície (Filho)
                            </label>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              Card / Bloco
                            </span>
                          </div>

                          {/* Cor e Opacidade Unificadas da Superfície */}
                          <ColorFieldRow
                            label="Fundo da Superfície (Card)"
                            description="Tonalidade e transparência da superfície do filho"
                            value={selectedSection.styles.customSurface}
                            defaultValue={siteDoc.theme.palette.surface}
                            onChange={(hex) =>
                              updateSectionStyles(selectedSection.id, {
                                customSurface: hex,
                              })
                            }
                            onReset={() =>
                              updateSectionStyles(selectedSection.id, {
                                customSurface: undefined,
                              })
                            }
                          />

                          {/* Padrão / Textura do Filho */}
                          <div className="space-y-1.5 pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-zinc-300 block">
                                Textura do Card (Pattern)
                              </label>
                              <span className="text-[10px] text-zinc-500">
                                Malha sutil no filho
                              </span>
                            </div>
                            <SegmentedControl<BackgroundPattern>
                              value={selectedSection.styles.cardPattern || "none"}
                              onChange={(pat) =>
                                updateSectionStyles(selectedSection.id, {
                                  cardPattern: pat,
                                })
                              }
                              columns={4}
                              size="sm"
                              options={[
                                { value: "none", label: "Nenhum" },
                                { value: "grid", label: "Grade" },
                                { value: "dots", label: "Pontos" },
                                { value: "noise", label: "Ruído" },
                              ]}
                            />
                          </div>

                          {/* Gradiente no Card do Filho */}
                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <ModernToggle
                              label="Gradiente no Card (Filho)"
                              description="Degradê estilizado aplicado dentro do componente filho"
                              checked={Boolean(selectedSection.styles.cardGradientEnabled)}
                              onChange={(chk) =>
                                updateSectionStyles(selectedSection.id, {
                                  cardGradientEnabled: chk,
                                })
                              }
                            />

                            {selectedSection.styles.cardGradientEnabled && (
                              <div className="space-y-3 pl-2 border-l border-white/10 mt-2">
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-zinc-300 block">
                                    Direção do Gradiente no Card
                                  </label>
                                  <SegmentedControl<GradientDirection>
                                    value={selectedSection.styles.cardGradientDirection || "to-b"}
                                    onChange={(dir) =>
                                      updateSectionStyles(selectedSection.id, {
                                        cardGradientDirection: dir,
                                      })
                                    }
                                    columns={4}
                                    size="sm"
                                    options={[
                                      { value: "to-b", label: "Vertical ↓" },
                                      { value: "to-br", label: "Diagonal ↘" },
                                      { value: "to-r", label: "Horizontal →" },
                                      { value: "radial", label: "Radial ⦿" },
                                    ]}
                                  />
                                </div>

                                <ColorFieldRow
                                  label="Cor Inicial do Card"
                                  description="Ponto de partida do degradê do filho"
                                  value={selectedSection.styles.cardGradientFrom}
                                  defaultValue="#09090b"
                                  onChange={(hex) =>
                                    updateSectionStyles(selectedSection.id, {
                                      cardGradientFrom: hex,
                                    })
                                  }
                                  onReset={() =>
                                    updateSectionStyles(selectedSection.id, {
                                      cardGradientFrom: undefined,
                                    })
                                  }
                                />

                                <ColorFieldRow
                                  label="Cor Final do Card"
                                  description="Ponto de chegada do degradê do filho"
                                  value={selectedSection.styles.cardGradientTo}
                                  defaultValue="#18181b"
                                  onChange={(hex) =>
                                    updateSectionStyles(selectedSection.id, {
                                      cardGradientTo: hex,
                                    })
                                  }
                                  onReset={() =>
                                    updateSectionStyles(selectedSection.id, {
                                      cardGradientTo: undefined,
                                    })
                                  }
                                />
                              </div>
                            )}
                          </div>

                          {/* Imagem de Fundo do Card (Filho) com Upload / Drag & Drop */}
                          <div className="space-y-3 pt-2 border-t border-white/5">
                            <ImageUploadField
                              label="Imagem de Fundo do Card (Filho)"
                              description="Foto de fundo interna do componente"
                              value={selectedSection.styles.cardBgImage || ""}
                              onChange={(url) =>
                                updateSectionStyles(selectedSection.id, {
                                  cardBgImage: url,
                                })
                              }
                              onReset={() =>
                                updateSectionStyles(selectedSection.id, {
                                  cardBgImage: undefined,
                                })
                              }
                            />

                            {selectedSection.styles.cardBgImage && (
                              <div className="space-y-1.5 pl-2 border-l border-white/10">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-semibold text-zinc-300 block">
                                    Opacidade da Máscara do Card
                                  </label>
                                  <span className="text-[10px] text-[#F4B400] font-semibold">
                                    {selectedSection.styles.cardBgOverlayOpacity ?? 60}%
                                  </span>
                                </div>
                                <SegmentedControl<string>
                                  value={String(selectedSection.styles.cardBgOverlayOpacity ?? 60)}
                                  onChange={(val) =>
                                    updateSectionStyles(selectedSection.id, {
                                      cardBgOverlayOpacity: Number(val),
                                    })
                                  }
                                  columns={4}
                                  size="sm"
                                  options={[
                                    { value: "30", label: "30%" },
                                    { value: "60", label: "60%" },
                                    { value: "80", label: "80%" },
                                    { value: "95", label: "95%" },
                                  ]}
                                />
                              </div>
                            )}
                          </div>

                          {/* Desfoque de Fundo (Backdrop Blur) */}
                          <div className="space-y-1.5 pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-medium text-zinc-300">
                                Desfoque de Fundo (Backdrop Blur)
                              </label>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                Efeito vidro fosco
                              </span>
                            </div>
                            <SegmentedControl<SurfaceBlur>
                              value={selectedSection.styles.surfaceBlur || "md"}
                              onChange={(blur) =>
                                updateSectionStyles(selectedSection.id, {
                                  surfaceBlur: blur,
                                })
                              }
                              columns={5}
                              size="sm"
                              options={[
                                { value: "none", label: "0" },
                                { value: "sm", label: "SM" },
                                { value: "md", label: "MD" },
                                { value: "lg", label: "LG" },
                                { value: "xl", label: "XL" },
                              ]}
                            />
                          </div>
                        </div>

                        {/* Efeito ao Passar o Mouse (Hover) */}
                        <div className="space-y-1.5 pt-2 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-300 block">
                              Efeito ao Passar o Mouse (Hover)
                            </label>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              Interatividade
                            </span>
                          </div>
                          <SegmentedControl<CardHoverEffect>
                            value={selectedSection.styles.cardHoverEffect || "none"}
                            onChange={(hov) =>
                              updateSectionStyles(selectedSection.id, {
                                cardHoverEffect: hov,
                              })
                            }
                            columns={5}
                            size="sm"
                            options={[
                              { value: "none", label: "Nenhum" },
                              { value: "lift", label: "Subir 3D" },
                              { value: "border_highlight", label: "Borda" },
                              { value: "glow", label: "Glow" },
                              { value: "shine", label: "Clarear" },
                            ]}
                          />
                        </div>

                        {/* Luz Ambiente do Card */}
                        <div className="space-y-2 pt-2 border-t border-white/5">
                          <ModernToggle
                            label="Luz Ambiente (Ambient Glow)"
                            description="Iluminação difusa decorativa emitida pelo card"
                            checked={Boolean(selectedSection.styles.ambientGlow)}
                            onChange={(chk) =>
                              updateSectionStyles(selectedSection.id, {
                                ambientGlow: chk,
                              })
                            }
                          />

                          {selectedSection.styles.ambientGlow && (
                            <ColorFieldRow
                              label="Cor da Luz Ambiente"
                              description="Glow suave emitido pelo componente"
                              value={selectedSection.styles.glowColor}
                              defaultValue={effectiveAccentColor}
                              onChange={(hex) =>
                                updateSectionStyles(selectedSection.id, {
                                  glowColor: hex,
                                })
                              }
                              onReset={() =>
                                updateSectionStyles(selectedSection.id, {
                                  glowColor: undefined,
                                })
                              }
                            />
                          )}
                        </div>
                      </div>
                    </AccordionSection>
                  </div>

                    {/* CAMADA 3: ELEMENTOS INTERNOS (FLEX & FLUXO) */}
                    <div
                      onMouseEnter={() => {
                        if (openDesignAccordion === "inner") setActiveInspectorLayer("inner");
                      }}
                    >
                      <AccordionSection
                        title="3. Elementos Internos (Distribuição & Alinhamento)"
                        subtitle="Posicionamento e alinhamento dos elementos dentro do fluxo"
                        icon={Sliders}
                        badge={innerDirectionBadge}
                        isOpen={openDesignAccordion === "inner"}
                        onToggle={() => toggleDesignAccordion("inner")}
                      >
                        {(() => {
                          const direction =
                            selectedSection.layout.direction ||
                            (selectedSection.type.startsWith("header.") ? "row" : "col");
                          const isCol = direction === "col";
                          const isRow = direction === "row";
                          const isResponsive = direction === "responsive";

                          return (
                            <div className="space-y-4">
                              {/* 0. Orientação do Fluxo (Direção) */}
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-semibold text-zinc-300 block">
                                    Orientação do Fluxo (Direção)
                                  </label>
                                  <span className="text-[10px] text-zinc-500">
                                    Disposição dos elementos
                                  </span>
                                </div>
                                <SegmentedControl<LayoutDirection>
                                  value={
                                    selectedSection.layout.direction ||
                                    (selectedSection.type.startsWith("header.")
                                      ? "row"
                                      : "col")
                                  }
                                  onChange={(dir) =>
                                    updateSectionLayout(selectedSection.id, {
                                      direction: dir,
                                    })
                                  }
                                  columns={3}
                                  size="sm"
                                  options={[
                                    { value: "row", label: "Linha", icon: <StretchHorizontal className="w-3 h-3" /> },
                                    { value: "col", label: "Coluna", icon: <StretchVertical className="w-3 h-3" /> },
                                    { value: "responsive", label: "Responsivo", icon: <Smartphone className="w-3 h-3" /> },
                                  ]}
                                />
                                <span className="text-[10px] text-zinc-500 block">
                                  {direction === "responsive"
                                    ? "Coluna no mobile e linha no desktop."
                                    : direction === "col"
                                    ? "Empilhamento vertical (de cima para baixo)."
                                    : "Disposição horizontal dos elementos na mesma linha."}
                                </span>
                              </div>

                              {/* Inverter Ordem dos Elementos */}
                              <div className="pt-1 pb-1">
                                <ModernToggle
                                  label="Inverter Ordem dos Elementos"
                                  description="Inverte a sequência horizontal ou vertical dos blocos"
                                  checked={Boolean(selectedSection.layout.reverse)}
                                  onChange={(rev) =>
                                    updateSectionLayout(selectedSection.id, {
                                      reverse: rev,
                                    })
                                  }
                                />
                              </div>

                              {/* SE FOR COLUNA: O eixo X é controlado por alignItems (Cross-Axis) e o eixo Y por distribution (Main-Axis) */}
                              {isCol ? (
                                <>
                                  {/* 1. Alinhamento Horizontal (Eixo X) */}
                                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-semibold text-zinc-300 block">
                                        Alinhamento Horizontal (Eixo X)
                                      </label>
                                      <span className="text-[10px] text-zinc-500">
                                        Margens e largura
                                      </span>
                                    </div>
                                    <SegmentedControl<LayoutAlignItems>
                                      value={selectedSection.layout.alignItems || "center"}
                                      onChange={(al) =>
                                        updateSectionLayout(selectedSection.id, {
                                          alignItems: al,
                                        })
                                      }
                                      columns={4}
                                      size="sm"
                                      options={[
                                        { value: "start", label: "Esq", icon: <AlignLeft className="w-3 h-3" /> },
                                        { value: "center", label: "Centro", icon: <AlignCenter className="w-3 h-3" /> },
                                        { value: "end", label: "Dir", icon: <AlignRight className="w-3 h-3" /> },
                                        { value: "stretch", label: "Esticar", icon: <StretchHorizontal className="w-3 h-3" /> },
                                      ]}
                                    />
                                  </div>

                                  {/* 2. Distribuição Vertical (Eixo Y) */}
                                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-semibold text-zinc-300 block">
                                        Distribuição Vertical (Eixo Y)
                                      </label>
                                      <span className="text-[10px] text-zinc-500">
                                        Eixo principal da coluna
                                      </span>
                                    </div>
                                    <SegmentedControl<LayoutDistribution>
                                      value={selectedSection.layout.distribution || "start"}
                                      onChange={(dist) =>
                                        updateSectionLayout(selectedSection.id, {
                                          distribution: dist,
                                        })
                                      }
                                      columns={5}
                                      size="sm"
                                      options={[
                                        { value: "start", label: "Topo", icon: <ArrowUpToLine className="w-3 h-3" /> },
                                        { value: "center", label: "Centro", icon: <AlignCenter className="w-3 h-3" /> },
                                        { value: "end", label: "Base", icon: <ArrowDownToLine className="w-3 h-3" /> },
                                        { value: "between", label: "Entre", icon: <AlignJustify className="w-3 h-3" /> },
                                        { value: "around", label: "Igual", icon: <Equal className="w-3 h-3" /> },
                                      ]}
                                    />
                                    <span className="text-[10px] text-zinc-500 block">
                                      Posiciona os blocos (Logo, Menu e Botões) verticalmente pelo eixo Y do container.
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* SE FOR LINHA OU RESPONSIVO: O eixo X é distribution (Main-Axis) e o eixo Y é alignItems (Cross-Axis) */}
                                  {/* 1. Distribuição Horizontal (Eixo X) */}
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-semibold text-zinc-300 block">
                                        Distribuição Horizontal (Eixo X)
                                      </label>
                                      <span className="text-[10px] text-zinc-500">
                                        {isResponsive ? "Desktop (Linha)" : "Eixo principal da linha"}
                                      </span>
                                    </div>
                                    <SegmentedControl<LayoutDistribution>
                                      value={
                                        selectedSection.layout.distribution ||
                                        (selectedSection.type.startsWith("header.") ? "between" : "center")
                                      }
                                      onChange={(dist) =>
                                        updateSectionLayout(selectedSection.id, {
                                          distribution: dist,
                                        })
                                      }
                                      columns={5}
                                      size="sm"
                                      options={[
                                        { value: "start", label: "Esq", icon: <AlignLeft className="w-3 h-3" /> },
                                        { value: "center", label: "Centro", icon: <AlignCenter className="w-3 h-3" /> },
                                        { value: "end", label: "Dir", icon: <AlignRight className="w-3 h-3" /> },
                                        { value: "between", label: "Entre", icon: <AlignJustify className="w-3 h-3" /> },
                                        { value: "around", label: "Igual", icon: <Equal className="w-3 h-3" /> },
                                      ]}
                                    />
                                    <span className="text-[10px] text-zinc-500 block">
                                      O Respiro Lateral (Padding X) do container afasta os elementos das extremidades esquerda e direita.
                                    </span>
                                  </div>

                                  {/* 2. Alinhamento Vertical (Eixo Y) */}
                                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-semibold text-zinc-300 block">
                                        Alinhamento Vertical (Eixo Y)
                                      </label>
                                      <span className="text-[10px] text-zinc-500">
                                        Nivelamento de altura
                                      </span>
                                    </div>
                                    <SegmentedControl<LayoutAlignItems>
                                      value={selectedSection.layout.alignItems || "center"}
                                      onChange={(al) =>
                                        updateSectionLayout(selectedSection.id, {
                                          alignItems: al,
                                        })
                                      }
                                      columns={4}
                                      size="sm"
                                      options={[
                                        { value: "start", label: "Topo", icon: <ArrowUpToLine className="w-3 h-3" /> },
                                        { value: "center", label: "Centro", icon: <AlignCenter className="w-3 h-3" /> },
                                        { value: "end", label: "Base", icon: <ArrowDownToLine className="w-3 h-3" /> },
                                        { value: "stretch", label: "Esticar", icon: <StretchVertical className="w-3 h-3" /> },
                                      ]}
                                    />
                                  </div>
                                </>
                              )}

                              {/* 3. Espaçamento entre Elementos (Gap) */}
                              <div className="space-y-1.5 pt-2 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-semibold text-zinc-300 block">
                                    Espaçamento entre Elementos (Gap)
                                  </label>
                                  <span className="text-[10px] text-zinc-500">
                                    Distância entre itens
                                  </span>
                                </div>
                                <SegmentedControl<LayoutGap>
                                  value={selectedSection.layout.gap || "normal"}
                                  onChange={(g) =>
                                    updateSectionLayout(selectedSection.id, {
                                      gap: g,
                                    })
                                  }
                                  columns={5}
                                  size="sm"
                                  options={[
                                    { value: "none", label: "0" },
                                    { value: "compact", label: "16px" },
                                    { value: "normal", label: "32px" },
                                    { value: "spacious", label: "48px" },
                                    { value: "monumental", label: "64px" },
                                  ]}
                                />
                              </div>

                              {/* 4. Design dos Botões / CTAs (Detecção Dinâmica de Botões) */}
                              {selectedDefinition.fields
                                .filter((f) => f.type === "button")
                                .map((field) => {
                                  const btnVal = selectedSection.content[field.key];
                                  return (
                                    <div key={field.key} className="pt-2 border-t border-white/5">
                                      <ButtonDesignEditor
                                        label={field.label}
                                        value={btnVal}
                                        onChange={(nextBtn) =>
                                          updateSectionContent(
                                            selectedSection.id,
                                            field.key,
                                            nextBtn
                                          )
                                        }
                                        defaultAccentColor={effectiveAccentColor}
                                      />
                                    </div>
                                  );
                                })}

                              {/* 5. Design dos Links de Navegação (Menu) */}
                              {Boolean(selectedSection.content?.navLinks) && (
                                <div className="pt-2 border-t border-white/5 space-y-3.5">
                                  <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4 space-y-4">
                                    <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                                      <div className="w-6 h-6 rounded-lg bg-[#F4B400]/10 border border-[#F4B400]/20 flex items-center justify-center text-[#F4B400]">
                                        <Sparkles className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <span className="text-xs font-bold text-zinc-100 block">
                                          Design dos Links de Navegação
                                        </span>
                                        <span className="text-[10px] text-zinc-400 block">
                                          Efeito ao passar o mouse e espaçamento dos links
                                        </span>
                                      </div>
                                    </div>

                                    {/* Efeito Hover */}
                                    <div className="space-y-1.5">
                                      <label className="text-xs font-semibold text-zinc-300 block">
                                        Efeito ao Passar o Mouse (Hover)
                                      </label>
                                      <SegmentedControl<"color" | "underline" | "pill" | "glow">
                                        value={selectedSection.layout.navHoverStyle || "color"}
                                        onChange={(style) =>
                                          updateSectionLayout(selectedSection.id, {
                                            navHoverStyle: style,
                                          })
                                        }
                                        columns={4}
                                        size="sm"
                                        options={[
                                          { value: "color", label: "Cor" },
                                          { value: "underline", label: "Linha" },
                                          { value: "pill", label: "Pílula" },
                                          { value: "glow", label: "Glow" },
                                        ]}
                                      />
                                      <span className="text-[10px] text-zinc-500 block">
                                        {selectedSection.layout.navHoverStyle === "pill"
                                          ? "Cápsula translúcida suave ao redor do link."
                                          : selectedSection.layout.navHoverStyle === "underline"
                                          ? "Sublinhado animado na cor de destaque."
                                          : selectedSection.layout.navHoverStyle === "glow"
                                          ? "Brilho luminoso em néon dourado."
                                          : "Transição suave de cor para a cor de destaque."}
                                      </span>
                                    </div>

                                    {/* Espaçamento entre Links */}
                                    <div className="space-y-1.5">
                                      <label className="text-xs font-semibold text-zinc-300 block">
                                        Espaçamento entre os Links (Nav Gap)
                                      </label>
                                      <SegmentedControl<LayoutGap>
                                        value={
                                          selectedSection.layout.navGap ||
                                          selectedSection.layout.gap ||
                                          "normal"
                                        }
                                        onChange={(ng) =>
                                          updateSectionLayout(selectedSection.id, {
                                            navGap: ng,
                                          })
                                        }
                                        columns={5}
                                        size="sm"
                                        options={[
                                          { value: "none", label: "0" },
                                          { value: "compact", label: "SM" },
                                          { value: "normal", label: "MD" },
                                          { value: "spacious", label: "LG" },
                                          { value: "monumental", label: "XL" },
                                        ]}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </AccordionSection>
                    </div>

                    {/* CAMADA 4 (EXCLUSIVA HEADER): FIXAÇÃO & COMPORTAMENTO AO ROLAR */}
                    {selectedSection.type.startsWith("header.") && (() => {
                      const currentVisibility: HeaderScrollVisibility =
                        selectedSection.layout.scrollVisibility ||
                        (selectedSection.layout.headerScrollBehavior === "static" ||
                        selectedSection.layout.sticky === false
                          ? "static"
                          : "fixed");

                      const currentInitialSurface: HeaderSurfaceType =
                        selectedSection.layout.headerSurfaceInitial ||
                        (selectedSection.layout.scrollSurface === "transparent_to_glass" ||
                        selectedSection.layout.scrollSurface === "transparent_to_solid"
                          ? "transparent"
                          : (selectedSection.styles.surfaceVariant as HeaderSurfaceType) ||
                            "solid");

                      const currentScrolledSurface: HeaderSurfaceType =
                        selectedSection.layout.headerSurfaceScrolled ||
                        (selectedSection.layout.scrollSurface === "transparent_to_glass"
                          ? "glass"
                          : selectedSection.layout.scrollSurface === "transparent_to_solid" ||
                            selectedSection.layout.scrollSurface === "glass_to_solid"
                          ? "solid"
                          : currentInitialSurface);

                      const currentShape: HeaderScrollShape =
                        selectedSection.layout.scrollShape === "shrink_slim"
                          ? "shrink_slim"
                          : "keep";

                      const isOverlayHero = selectedSection.layout.headerOverlay !== false;

                      const scrollBadge =
                        currentVisibility === "static"
                          ? "Estático"
                          : currentVisibility === "auto_hide"
                          ? "Auto-Hide"
                          : "Fixo";

                      const SURFACE_OPTIONS: {
                        id: HeaderSurfaceType;
                        label: string;
                        desc: string;
                        icon: React.ReactNode;
                      }[] = [
                        {
                          id: "transparent",
                          label: "Transparente",
                          desc: "100% invisível, mostra o fundo do hero",
                          icon: <Eye className="w-3 h-3 text-zinc-400" />,
                        },
                        {
                          id: "solid",
                          label: "Sólido (100% Opaco)",
                          desc: "Fundo preto denso sem vazamento de luz",
                          icon: <Shield className="w-3 h-3 text-emerald-400" />,
                        },
                        {
                          id: "glass",
                          label: "Vidro Fosco (Glass)",
                          desc: "Efeito translúcido com desfoque denso",
                          icon: <Droplets className="w-3 h-3 text-sky-400" />,
                        },
                        {
                          id: "bordered",
                          label: "Borda Minimal",
                          desc: "Fundo ultra sutil destacando contornos",
                          icon: <Layers className="w-3 h-3 text-zinc-300" />,
                        },
                        {
                          id: "3d_floating",
                          label: "Elevado 3D",
                          desc: "Sólido com sombra tridimensional",
                          icon: <Box className="w-3 h-3 text-amber-400" />,
                        },
                        {
                          id: "neon",
                          label: "Neon Glow",
                          desc: "Contorno luminoso na cor de destaque",
                          icon: <Sparkles className="w-3 h-3 text-purple-400" />,
                        },
                      ];

                      return (
                        <div
                          onMouseEnter={() => {
                            if (openDesignAccordion === "scroll") setActiveInspectorLayer("child");
                          }}
                        >
                          <AccordionSection
                            title="4. Fixação & Comportamento ao Rolar"
                            subtitle="Sticky, auto-hide, transição de superfícies e modo slim"
                            icon={Compass}
                            badge={scrollBadge}
                            isOpen={openDesignAccordion === "scroll"}
                            onToggle={() => toggleDesignAccordion("scroll")}
                          >
                            <div className="space-y-3.5">
                              {/* 0. Sobreposição Hero / Fundo Contínuo */}
                              <ModernToggle
                                label="Fundo Contínuo (Sobrepor ao Hero)"
                                description="O fundo e luz do Hero sobem atrás do header sem cortar conteúdo"
                                checked={isOverlayHero}
                                onChange={(checked) =>
                                  updateSectionLayout(selectedSection.id, {
                                    headerOverlay: checked,
                                  })
                                }
                              />

                              {/* 1. Fixação & Visibilidade */}
                              <div className="space-y-1.5 bg-zinc-950/60 p-2.5 rounded-xl border border-white/5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1">
                                    <Pin className="w-3 h-3 text-zinc-400" />
                                    1. Fixação & Visibilidade
                                  </span>
                                  <span className="text-[10px] text-zinc-500 font-mono">
                                    {currentVisibility === "fixed"
                                      ? "Sempre Fixo"
                                      : currentVisibility === "auto_hide"
                                      ? "Auto-Hide (Suave)"
                                      : "Rola Junto"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-1">
                                  {[
                                    {
                                      id: "fixed" as const,
                                      label: "Sempre Fixo",
                                      desc: "Fixado no topo",
                                      icon: <Pin className="w-3 h-3 text-[#F4B400]" />,
                                    },
                                    {
                                      id: "auto_hide" as const,
                                      label: "Auto-Hide",
                                      desc: "Some ao descer / surge ao subir",
                                      icon: <EyeOff className="w-3 h-3 text-sky-400" />,
                                    },
                                    {
                                      id: "static" as const,
                                      label: "Estático",
                                      desc: "Acompanha página",
                                      icon: <ArrowDown className="w-3 h-3 text-zinc-400" />,
                                    },
                                  ].map((item) => {
                                    const isSel = currentVisibility === item.id;
                                    return (
                                      <button
                                        key={item.id}
                                        type="button"
                                        onClick={() =>
                                          updateSectionLayout(selectedSection.id, {
                                            scrollVisibility: item.id,
                                            sticky: item.id !== "static",
                                          })
                                        }
                                        className={cn(
                                          "p-2 rounded-lg border text-left flex flex-col gap-0.5 transition-all text-xs",
                                          isSel
                                            ? "bg-[#F4B400]/15 border-[#F4B400] text-white shadow-sm"
                                            : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                                        )}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <span
                                            className={cn(
                                              "font-medium text-[11px] flex items-center gap-1",
                                              isSel ? "text-[#F4B400]" : "text-zinc-200"
                                            )}
                                          >
                                            {item.icon}
                                            {item.label}
                                          </span>
                                          {isSel && (
                                            <Check className="w-3 h-3 text-[#F4B400] shrink-0" />
                                          )}
                                        </div>
                                        <span className="text-[9px] text-zinc-500 line-clamp-1">
                                          {item.desc}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* 2. Superfície em 2 Estados */}
                              <div className="space-y-3 bg-zinc-950/60 p-3 rounded-xl border border-white/5">
                                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                                  <span className="text-[11px] font-semibold text-zinc-200 flex items-center gap-1.5">
                                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                                    2. Superfície em 2 Estados
                                  </span>
                                  <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-white/10">
                                    <span className="text-[#F4B400] font-semibold">
                                      {SURFACE_OPTIONS.find((o) => o.id === currentInitialSurface)?.label.split(" ")[0] || "Transparente"}
                                    </span>
                                    <span className="text-zinc-500">→</span>
                                    <span className="text-sky-400 font-semibold">
                                      {SURFACE_OPTIONS.find((o) => o.id === currentScrolledSurface)?.label.split(" ")[0] || "Sólido"}
                                    </span>
                                  </div>
                                </div>

                                {/* Estado 1: No Topo (Inicial) */}
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-semibold text-[#F4B400] flex items-center gap-1 tracking-wide uppercase">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]"></span>
                                      Estado 1: No Topo (Inicial)
                                    </span>
                                    <span className="text-[9px] text-zinc-400 font-medium">
                                      {SURFACE_OPTIONS.find((o) => o.id === currentInitialSurface)?.label}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {SURFACE_OPTIONS.map((item) => {
                                      const isSelected = currentInitialSurface === item.id;
                                      return (
                                        <button
                                          key={`initial-${item.id}`}
                                          type="button"
                                          onClick={() => {
                                            updateSectionLayout(selectedSection.id, {
                                              headerSurfaceInitial: item.id,
                                            });
                                            if (item.id !== "transparent") {
                                              updateSectionStyles(selectedSection.id, {
                                                surfaceVariant: item.id as SurfaceStyle,
                                              });
                                            }
                                          }}
                                          className={cn(
                                            "p-2 rounded-lg border text-left flex flex-col gap-0.5 transition-all text-xs",
                                            isSelected
                                              ? "bg-[#F4B400]/15 border-[#F4B400] text-white shadow-sm ring-1 ring-[#F4B400]/30"
                                              : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                                          )}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <span
                                              className={cn(
                                                "font-medium text-[11px] flex items-center gap-1",
                                                isSelected ? "text-[#F4B400]" : "text-zinc-200"
                                              )}
                                            >
                                              {item.icon}
                                              {item.label}
                                            </span>
                                            {isSelected && (
                                              <Check className="w-3 h-3 text-[#F4B400] shrink-0" />
                                            )}
                                          </div>
                                          <span className="text-[9px] text-zinc-500 line-clamp-1">
                                            {item.desc}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Estado 2: Ao Rolar (Scrolled) */}
                                <div className="space-y-1.5 pt-2 border-t border-white/5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-semibold text-sky-400 flex items-center gap-1 tracking-wide uppercase">
                                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                                      Estado 2: Ao Rolar (Scrolled)
                                    </span>
                                    <span className="text-[9px] text-zinc-400 font-medium">
                                      {SURFACE_OPTIONS.find((o) => o.id === currentScrolledSurface)?.label}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {SURFACE_OPTIONS.map((item) => {
                                      const isSelected = currentScrolledSurface === item.id;
                                      return (
                                        <button
                                          key={`scrolled-${item.id}`}
                                          type="button"
                                          onClick={() => {
                                            updateSectionLayout(selectedSection.id, {
                                              headerSurfaceScrolled: item.id,
                                            });
                                          }}
                                          className={cn(
                                            "p-2 rounded-lg border text-left flex flex-col gap-0.5 transition-all text-xs",
                                            isSelected
                                              ? "bg-sky-500/15 border-sky-400 text-white shadow-sm ring-1 ring-sky-400/30"
                                              : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                                          )}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <span
                                              className={cn(
                                                "font-medium text-[11px] flex items-center gap-1",
                                                isSelected ? "text-sky-400" : "text-zinc-200"
                                              )}
                                            >
                                              {item.icon}
                                              {item.label}
                                            </span>
                                            {isSelected && (
                                              <Check className="w-3 h-3 text-sky-400 shrink-0" />
                                            )}
                                          </div>
                                          <span className="text-[9px] text-zinc-500 line-clamp-1">
                                            {item.desc}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* 3. Altura ao Rolar (Slim) */}
                              <div className="space-y-1.5 bg-zinc-950/60 p-2.5 rounded-xl border border-white/5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1">
                                    <Minimize2 className="w-3 h-3 text-emerald-400" />
                                    3. Altura ao Rolar (Slim)
                                  </span>
                                  <span className="text-[10px] text-zinc-500 font-mono">
                                    {currentShape === "shrink_slim" ? "Slim Ativo" : "Altura Fixa"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5">
                                  {[
                                    {
                                      id: "keep" as const,
                                      label: "Manter Altura",
                                      desc: "Mantém dimensões originais intactas ao rolar",
                                      icon: <Maximize2 className="w-3 h-3 text-zinc-400" />,
                                    },
                                    {
                                      id: "shrink_slim" as const,
                                      label: "Encolher ao Rolar (Slim)",
                                      desc: "Encolhe ao descer e expande de volta ao subir",
                                      icon: <Minimize2 className="w-3 h-3 text-emerald-400" />,
                                    },
                                  ].map((item) => {
                                    const isSel = currentShape === item.id;
                                    return (
                                      <button
                                        key={item.id}
                                        type="button"
                                        onClick={() =>
                                          updateSectionLayout(selectedSection.id, {
                                            scrollShape: item.id,
                                          })
                                        }
                                        className={cn(
                                          "p-2 rounded-lg border text-left flex flex-col gap-0.5 transition-all text-xs",
                                          isSel
                                            ? "bg-[#F4B400]/15 border-[#F4B400] text-white shadow-sm ring-1 ring-[#F4B400]/30"
                                            : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                                        )}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <span
                                            className={cn(
                                              "font-medium text-[11px] flex items-center gap-1",
                                              isSel ? "text-[#F4B400]" : "text-zinc-200"
                                            )}
                                          >
                                            {item.icon}
                                            {item.label}
                                          </span>
                                          {isSel && (
                                            <Check className="w-3 h-3 text-[#F4B400] shrink-0" />
                                          )}
                                        </div>
                                        <span className="text-[9px] text-zinc-500 line-clamp-1">
                                          {item.desc}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </AccordionSection>
                        </div>
                      );
                    })()}
                    </div>
                  );
                })()}

              </div>
            </>
          )}
        </aside>
        )}
      </div>

      {/* MODAL DE INSPEÇÃO DO JSON AST */}
      {showJsonModal && (
        <div
          onClick={() => setShowJsonModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-zinc-950 border border-white/15 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#F4B400]" />
                <span className="font-bold text-sm">
                  Contrato AST em Tempo Real (SiteDocument JSON)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold"
              >
                Fechar
              </button>
            </div>
            <pre className="p-5 text-xs font-mono text-emerald-400 overflow-auto flex-1 bg-zinc-950">
              {JSON.stringify(siteDoc, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
