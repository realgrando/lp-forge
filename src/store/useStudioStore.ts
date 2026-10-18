"use client";

import { create } from "zustand";
import { produce } from "immer";
import {
  DeviceViewport,
  SectionLayout,
  SectionNode,
  SectionPackRecord,
  SectionStyles,
  SiteDocument,
  SiteMode,
  TemplateRecord,
  ThemeButtonDefaults,
  ThemeConfig,
  ThemeLayoutDefaults,
  ThemePalette,
  ThemePresetRecord,
  ThemeTypography,
  TypographyOverride,
} from "@/types/site";
import { THEME_PRESETS } from "@/config/presets";
import { getSectionDefinition } from "@/registry";
import { deepClone, generateId } from "@/lib/utils";

function buildSectionInstance(
  typeId: string,
  _theme?: ThemeConfig,
  forceContainer?: SectionLayout["containerWidth"]
): SectionNode {
  const def = getSectionDefinition(typeId)!;
  const defLayout = def.defaultData.layout || {};
  return {
    id: generateId("sec"),
    type: def.id,
    layout: {
      paddingY: defLayout.paddingY || "normal",
      paddingInner: defLayout.paddingInner || "none",
      paddingX: defLayout.paddingX || "normal",
      gap: defLayout.gap || "normal",
      direction: defLayout.direction || "col",
      ...deepClone(defLayout),
      containerWidth:
        forceContainer || defLayout.containerWidth || "boxed",
      hidden: false,
    },
    styles: deepClone(def.defaultData.styles || {}),
    content: deepClone(def.defaultData.content),
  };
}

function createBlankLPDocument(): SiteDocument {
  return {
    version: "2.0",
    meta: {
      id: generateId("site"),
      name: "Novo Projeto",
      mode: "LANDING_PAGE",
      slug: "novo-projeto",
      title: "Novo Projeto — Nivix",
      description: "Construído no motor LP-Forge v2.",
    },
    theme: deepClone(THEME_PRESETS[0].config),
    sections: [],
  };
}

function syncTemplatesToServer(
  templates: TemplateRecord[],
  sectionPacks: SectionPackRecord[]
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("lp_forge_v2_templates", JSON.stringify(templates));
    localStorage.setItem("lp_forge_v2_packs", JSON.stringify(sectionPacks));
    fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templates, sectionPacks }),
    }).catch(() => {});
  } catch {
    // ignore storage errors
  }
}

interface StudioState {
  document: SiteDocument;
  past: SiteDocument[];
  future: SiteDocument[];
  selectedSectionId: string | null;
  viewport: DeviceViewport;
  activeTemplateId: string | null;
  templates: TemplateRecord[];
  sectionPacks: SectionPackRecord[];
  customThemePresets: ThemePresetRecord[];

  // Navegação e Seleção
  selectSection: (id: string | null) => void;
  setViewport: (viewport: DeviceViewport) => void;
  switchModeWithPreset: (mode: SiteMode) => void;

  // Histórico (Undo / Redo)
  undo: () => void;
  redo: () => void;

  // Operações de Seções
  addSection: (type: string, index?: number) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  reorderSections: (activeId: string, overId: string) => void;
  toggleSectionVisibility: (id: string) => void;

  // Edição das 3 Camadas da Seção
  updateSectionAnchorId: (id: string, anchorId: string) => void;
  updateSectionContent: (id: string, key: string, value: any) => void;
  updateSectionLayout: (id: string, patch: Partial<SectionLayout>) => void;
  updateSectionStyles: (id: string, patch: Partial<SectionStyles>) => void;
  toggleElementVisibility: (id: string, elementKey: string) => void;
  updateTypographyOverride: (
    id: string,
    elementKey: string,
    patch: Partial<TypographyOverride>
  ) => void;

  // Edição do Tema Global, Defaults do Motor e CRUD de Presets
  applyThemePreset: (presetId: string) => void;
  applyThemeConfig: (config: ThemeConfig) => void;
  updateThemePalette: (patch: Partial<ThemePalette>) => void;
  updateThemeTypography: (patch: Partial<ThemeTypography>) => void;
  updateThemeLayoutDefaults: (patch: Partial<ThemeLayoutDefaults>) => void;
  updateThemeButtonDefaults: (patch: Partial<ThemeButtonDefaults>) => void;
  updateThemeTokens: (patch: Partial<NonNullable<ThemeConfig["tokens"]>>) => void;
  saveCustomThemePreset: (name: string, badge?: string) => string;
  deleteCustomThemePreset: (presetId: string) => void;
  resetThemeToDefault: () => void;
  updateSiteMeta: (patch: Partial<SiteDocument["meta"]>) => void;

  // Gestão Completa de Templates (CRUD + Persistência)
  hydrateTemplatesFromStorage: () => Promise<void>;
  saveCurrentAsTemplate: (
    name: string,
    description: string,
    category?: string
  ) => string;
  overwriteActiveTemplate: () => void;
  updateTemplateMetadata: (
    id: string,
    patch: { name?: string; description?: string; category?: string }
  ) => void;
  renameTemplate: (id: string, newName: string) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => void;
  loadTemplate: (id: string) => void;
  resetToBlankDocument: () => void;
  importTemplateFromJson: (jsonStr: string) => boolean;

  // Gestão de Grupos de Seções (Section Packs)
  saveCurrentAsSectionPack: (name: string, description: string) => void;
  insertSectionPack: (packId: string) => void;
  deleteSectionPack: (packId: string) => void;
}

const MAX_HISTORY = 40;

export const useStudioStore = create<StudioState>((set, get) => {
  const blankDoc = createBlankLPDocument();

  const pushHistory = (state: StudioState) => {
    const snapshot = deepClone(state.document);
    const nextPast = [...state.past, snapshot].slice(-MAX_HISTORY);
    return { past: nextPast, future: [] as SiteDocument[] };
  };

  return {
    document: blankDoc,
    past: [],
    future: [],
    selectedSectionId: null,
    viewport: "desktop",
    activeTemplateId: null,
    templates: [],
    sectionPacks: [],
    customThemePresets: [],

    selectSection: (id) => set({ selectedSectionId: id }),

    setViewport: (viewport) => set({ viewport }),

    switchModeWithPreset: (mode) => {
      const state = get();
      if (state.document.meta.mode === mode) return;
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.meta.mode = mode;
        if (draft.sections.length === 0) {
          draft.meta.name =
            mode === "LINKTREE" ? "Nova Bio em Branco" : "Novo Projeto em Branco";
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
        viewport: mode === "LINKTREE" ? "mobile" : "desktop",
      });
    },

    undo: () => {
      const { past, document, future } = get();
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      set({
        past: newPast,
        document: previous,
        future: [deepClone(document), ...future].slice(0, MAX_HISTORY),
      });
    },

    redo: () => {
      const { past, document, future } = get();
      if (future.length === 0) return;

      const next = future[0];
      const newFuture = future.slice(1);

      set({
        past: [...past, deepClone(document)].slice(-MAX_HISTORY),
        document: next,
        future: newFuture,
      });
    },

    addSection: (type, index) => {
      const def = getSectionDefinition(type);
      if (!def) return;

      const state = get();
      const historyPatch = pushHistory(state);

      const newSection: SectionNode = buildSectionInstance(
        type,
        state.document.theme,
        state.document.meta.mode === "LINKTREE" ? "mobile" : undefined
      );

      const nextDoc = produce(state.document, (draft) => {
        if (typeof index === "number" && index >= 0) {
          draft.sections.splice(index, 0, newSection);
        } else {
          draft.sections.push(newSection);
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
        selectedSectionId: newSection.id,
      });
    },

    removeSection: (id) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.sections = draft.sections.filter((s) => s.id !== id);
      });

      set({
        ...historyPatch,
        document: nextDoc,
        selectedSectionId:
          state.selectedSectionId === id
            ? nextDoc.sections[0]?.id || null
            : state.selectedSectionId,
      });
    },

    duplicateSection: (id) => {
      const state = get();
      const idx = state.document.sections.findIndex((s) => s.id === id);
      if (idx === -1) return;

      const historyPatch = pushHistory(state);
      const cloned = deepClone(state.document.sections[idx]);
      cloned.id = generateId("sec");

      const nextDoc = produce(state.document, (draft) => {
        draft.sections.splice(idx + 1, 0, cloned);
      });

      set({
        ...historyPatch,
        document: nextDoc,
        selectedSectionId: cloned.id,
      });
    },

    moveSection: (id, direction) => {
      const state = get();
      const idx = state.document.sections.findIndex((s) => s.id === id);
      if (idx === -1) return;

      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= state.document.sections.length) return;

      const historyPatch = pushHistory(state);
      const nextDoc = produce(state.document, (draft) => {
        const [moved] = draft.sections.splice(idx, 1);
        draft.sections.splice(targetIdx, 0, moved);
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    reorderSections: (activeId, overId) => {
      if (activeId === overId) return;
      const state = get();
      const oldIndex = state.document.sections.findIndex(
        (s) => s.id === activeId
      );
      const newIndex = state.document.sections.findIndex(
        (s) => s.id === overId
      );
      if (oldIndex === -1 || newIndex === -1) return;

      const historyPatch = pushHistory(state);
      const nextDoc = produce(state.document, (draft) => {
        const [moved] = draft.sections.splice(oldIndex, 1);
        draft.sections.splice(newIndex, 0, moved);
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    toggleSectionVisibility: (id) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        const sec = draft.sections.find((s) => s.id === id);
        if (sec) {
          sec.layout.hidden = !sec.layout.hidden;
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateSectionAnchorId: (id, anchorId) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        const sec = draft.sections.find((s) => s.id === id);
        if (sec) {
          sec.anchorId = anchorId;
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateSectionContent: (id, key, value) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        const sec = draft.sections.find((s) => s.id === id);
        if (sec) {
          sec.content[key] = value;
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateSectionLayout: (id, patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        const sec = draft.sections.find((s) => s.id === id);
        if (sec) {
          sec.layout = { ...sec.layout, ...patch };
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateSectionStyles: (id, patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        const sec = draft.sections.find((s) => s.id === id);
        if (sec) {
          sec.styles = { ...sec.styles, ...patch };
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    toggleElementVisibility: (id, elementKey) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        const sec = draft.sections.find((s) => s.id === id);
        if (sec) {
          if (!sec.styles.hiddenElements) {
            sec.styles.hiddenElements = {};
          }
          sec.styles.hiddenElements[elementKey] =
            !sec.styles.hiddenElements[elementKey];
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateTypographyOverride: (id, elementKey, patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        const sec = draft.sections.find((s) => s.id === id);
        if (sec) {
          if (!sec.styles.typographyOverrides) {
            sec.styles.typographyOverrides = {};
          }
          const current = sec.styles.typographyOverrides[elementKey] || {};
          sec.styles.typographyOverrides[elementKey] = {
            ...current,
            ...patch,
          };
        }
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    applyThemePreset: (presetId) => {
      const state = get();
      const preset =
        state.customThemePresets.find((p) => p.id === presetId) ||
        THEME_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;

      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme = deepClone(preset.config);
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    applyThemeConfig: (config) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme = deepClone(config);
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateThemePalette: (patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme.palette = { ...draft.theme.palette, ...patch };
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateThemeTypography: (patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme.typography = { ...draft.theme.typography, ...patch };
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateThemeLayoutDefaults: (patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme.layoutDefaults = {
          ...(draft.theme.layoutDefaults || {}),
          ...patch,
        };
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateThemeButtonDefaults: (patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme.buttonDefaults = {
          ...(draft.theme.buttonDefaults || {}),
          ...patch,
        };
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateThemeTokens: (patch) => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme.tokens = { ...(draft.theme.tokens || {}), ...patch };
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    saveCustomThemePreset: (name, badge = "Custom") => {
      const state = get();
      const newPreset: ThemePresetRecord = {
        id: generateId("theme_preset"),
        name: name.trim() || "Meu Tema Customizado",
        badge: badge.trim() || "Custom",
        isCustom: true,
        createdAt: new Date().toISOString(),
        config: deepClone(state.document.theme),
      };
      newPreset.config.presetId = newPreset.id;

      const nextPresets = [newPreset, ...state.customThemePresets];
      set({ customThemePresets: nextPresets });

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "lp_forge_v2_custom_themes",
            JSON.stringify(nextPresets)
          );
        } catch {}
      }

      return newPreset.id;
    },

    deleteCustomThemePreset: (presetId) => {
      const state = get();
      const nextPresets = state.customThemePresets.filter(
        (p) => p.id !== presetId
      );
      set({ customThemePresets: nextPresets });

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "lp_forge_v2_custom_themes",
            JSON.stringify(nextPresets)
          );
        } catch {}
      }
    },

    resetThemeToDefault: () => {
      const state = get();
      const historyPatch = pushHistory(state);

      const nextDoc = produce(state.document, (draft) => {
        draft.theme = deepClone(THEME_PRESETS[0].config);
      });

      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    updateSiteMeta: (patch) => {
      const state = get();
      const historyPatch = pushHistory(state);
      const nextDoc = produce(state.document, (draft) => {
        draft.meta = { ...draft.meta, ...patch };
      });
      set({
        ...historyPatch,
        document: nextDoc,
      });
    },

    hydrateTemplatesFromStorage: async () => {
      if (typeof window === "undefined") return;
      try {
        const res = await fetch("/api/templates");
        if (res.ok) {
          const data = await res.json();
          const templates = Array.isArray(data.templates) ? data.templates : [];
          const sectionPacks = Array.isArray(data.sectionPacks)
            ? data.sectionPacks
            : [];
          set({ templates, sectionPacks });
          try {
            localStorage.setItem(
              "lp_forge_v2_templates",
              JSON.stringify(templates)
            );
            localStorage.setItem(
              "lp_forge_v2_packs",
              JSON.stringify(sectionPacks)
            );
          } catch {
            // ignore storage errors
          }
          return;
        }
      } catch {
        // fallback to localStorage
      }

      try {
        const savedTpl = localStorage.getItem("lp_forge_v2_templates");
        const savedPacks = localStorage.getItem("lp_forge_v2_packs");
        const savedThemes = localStorage.getItem("lp_forge_v2_custom_themes");
        set({
          templates: savedTpl ? JSON.parse(savedTpl) : [],
          sectionPacks: savedPacks ? JSON.parse(savedPacks) : [],
          customThemePresets: savedThemes ? JSON.parse(savedThemes) : [],
        });
      } catch {
        // ignore
      }
    },

    saveCurrentAsTemplate: (name, description, category = "Custom") => {
      const state = get();
      const docCopy = deepClone(state.document);
      docCopy.meta.name = name;

      const newTpl: TemplateRecord = {
        id: generateId("tpl"),
        name,
        description:
          description ||
          `Template ${state.document.meta.mode === "LINKTREE" ? "Bio" : "LP"} com ${state.document.sections.length} seções.`,
        category,
        mode: state.document.meta.mode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        document: docCopy,
      };

      const nextTemplates = [newTpl, ...state.templates];
      set({
        templates: nextTemplates,
        activeTemplateId: newTpl.id,
        document: docCopy,
      });
      syncTemplatesToServer(nextTemplates, state.sectionPacks);
      return newTpl.id;
    },

    overwriteActiveTemplate: () => {
      const state = get();
      if (!state.activeTemplateId) return;

      const nextTemplates = produce(state.templates, (draft) => {
        const tpl = draft.find((t) => t.id === state.activeTemplateId);
        if (tpl) {
          tpl.document = deepClone(state.document);
          tpl.updatedAt = new Date().toISOString();
        }
      });

      set({ templates: nextTemplates });
      syncTemplatesToServer(nextTemplates, state.sectionPacks);
    },

    updateTemplateMetadata: (id, patch) => {
      const state = get();
      const nextTemplates = produce(state.templates, (draft) => {
        const tpl = draft.find((t) => t.id === id);
        if (tpl) {
          if (patch.name !== undefined) {
            tpl.name = patch.name;
            tpl.document.meta.name = patch.name;
          }
          if (patch.description !== undefined)
            tpl.description = patch.description;
          if (patch.category !== undefined) tpl.category = patch.category;
          tpl.updatedAt = new Date().toISOString();
        }
      });

      set({ templates: nextTemplates });
      syncTemplatesToServer(nextTemplates, state.sectionPacks);
    },

    renameTemplate: (id, newName) => {
      get().updateTemplateMetadata(id, { name: newName });
    },

    deleteTemplate: (id) => {
      const state = get();
      const nextTemplates = state.templates.filter((t) => t.id !== id);
      set({
        templates: nextTemplates,
        activeTemplateId:
          state.activeTemplateId === id ? null : state.activeTemplateId,
      });
      syncTemplatesToServer(nextTemplates, state.sectionPacks);
    },

    duplicateTemplate: (id) => {
      const state = get();
      const tpl = state.templates.find((t) => t.id === id);
      if (!tpl) return;

      const copy: TemplateRecord = {
        ...deepClone(tpl),
        id: generateId("tpl"),
        name: `${tpl.name} (Cópia)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const nextTemplates = [copy, ...state.templates];
      set({ templates: nextTemplates });
      syncTemplatesToServer(nextTemplates, state.sectionPacks);
    },

    loadTemplate: (id) => {
      const state = get();
      const tpl = state.templates.find((t) => t.id === id);
      if (!tpl) return;

      const historyPatch = pushHistory(state);
      const nextDoc = deepClone(tpl.document);

      set({
        ...historyPatch,
        document: nextDoc,
        activeTemplateId: tpl.id,
        selectedSectionId: nextDoc.sections[0]?.id || null,
        viewport: nextDoc.meta.mode === "LINKTREE" ? "mobile" : "desktop",
      });
    },

    resetToBlankDocument: () => {
      const state = get();
      const historyPatch = pushHistory(state);
      const mode = state.document.meta.mode;
      const blankDoc: SiteDocument = {
        version: "2.0",
        meta: {
          id: generateId("site"),
          name: mode === "LINKTREE" ? "Nova Bio em Branco" : "Nova LP em Branco",
          mode,
          slug: "novo-projeto",
          title: "Novo Projeto — Nivix",
          description: "Construído no LP-Forge v2",
        },
        theme: deepClone(state.document.theme),
        sections: [],
      };

      set({
        ...historyPatch,
        document: blankDoc,
        activeTemplateId: null,
        selectedSectionId: null,
      });
    },

    importTemplateFromJson: (jsonStr) => {
      try {
        const parsed = JSON.parse(jsonStr);
        const state = get();

        // Aceita tanto um TemplateRecord quanto um SiteDocument direto
        const isSiteDoc =
          parsed && parsed.version === "2.0" && Array.isArray(parsed.sections);
        const isTemplateRec =
          parsed && parsed.document && Array.isArray(parsed.document.sections);

        if (!isSiteDoc && !isTemplateRec) return false;

        const doc: SiteDocument = isTemplateRec ? parsed.document : parsed;
        const newTpl: TemplateRecord = {
          id: generateId("tpl"),
          name: parsed.name || doc.meta?.name || "Template Importado",
          description:
            parsed.description ||
            doc.meta?.description ||
            "Importado via arquivo JSON",
          category: parsed.category || "Importados",
          mode: doc.meta?.mode || "LANDING_PAGE",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          document: doc,
        };

        const historyPatch = pushHistory(state);
        const nextTemplates = [newTpl, ...state.templates];
        set({
          ...historyPatch,
          templates: nextTemplates,
          document: deepClone(doc),
          activeTemplateId: newTpl.id,
          selectedSectionId: doc.sections[0]?.id || null,
          viewport: doc.meta?.mode === "LINKTREE" ? "mobile" : "desktop",
        });
        syncTemplatesToServer(nextTemplates, state.sectionPacks);
        return true;
      } catch {
        return false;
      }
    },

    saveCurrentAsSectionPack: (name, description) => {
      const state = get();
      if (state.document.sections.length === 0) return;

      const newPack: SectionPackRecord = {
        id: generateId("pack"),
        name,
        description:
          description ||
          `Combo com ${state.document.sections.length} seções (${state.document.sections
            .map((s) => s.type.split(".")[0])
            .slice(0, 4)
            .join(" + ")})`,
        mode: state.document.meta.mode,
        sections: deepClone(state.document.sections).map(
          ({ id: _id, ...rest }) => rest
        ),
      };

      const nextPacks = [newPack, ...state.sectionPacks];
      set({ sectionPacks: nextPacks });
      syncTemplatesToServer(state.templates, nextPacks);
    },

    insertSectionPack: (packId) => {
      const state = get();
      const pack = state.sectionPacks.find((p) => p.id === packId);
      if (!pack) return;

      const historyPatch = pushHistory(state);
      const instantiated: SectionNode[] = pack.sections.map((sec) => ({
        ...deepClone(sec),
        id: generateId("sec"),
      }));

      const nextDoc = produce(state.document, (draft) => {
        draft.sections.push(...instantiated);
      });

      set({
        ...historyPatch,
        document: nextDoc,
        selectedSectionId: instantiated[0]?.id || state.selectedSectionId,
      });
    },

    deleteSectionPack: (packId) => {
      const state = get();
      const nextPacks = state.sectionPacks.filter((p) => p.id !== packId);
      set({ sectionPacks: nextPacks });
      syncTemplatesToServer(state.templates, nextPacks);
    },
  };
});
