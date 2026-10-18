"use client";

import React, { useState, useRef } from "react";
import {
  SectionPackRecord,
  SiteDocument,
  SiteMode,
  TemplateRecord,
} from "@/types/site";
import { cn } from "@/lib/utils";
import {
  BookmarkPlus,
  Check,
  Copy,
  Download,
  Edit3,
  FilePlus2,
  FolderKanban,
  Layers,
  PackagePlus,
  Plus,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";

interface TemplateManagerDrawerProps {
  currentDocument: SiteDocument;
  activeTemplateId: string | null;
  templates: TemplateRecord[];
  sectionPacks: SectionPackRecord[];
  onLoadTemplate: (id: string) => void;
  onSaveAsNewTemplate: (
    name: string,
    description: string,
    category: string
  ) => void;
  onOverwriteActiveTemplate: () => void;
  onUpdateTemplateMetadata: (
    id: string,
    patch: { name?: string; description?: string; category?: string }
  ) => void;
  onDuplicateTemplate: (id: string) => void;
  onDeleteTemplate: (id: string) => void;
  onResetToBlank: () => void;
  onImportJson: (jsonStr: string) => boolean;
  onSaveSectionPack: (name: string, description: string) => void;
  onInsertSectionPack: (packId: string) => void;
  onDeleteSectionPack: (packId: string) => void;
}

const DEFAULT_CATEGORIES = [
  "Construção & Serviços",
  "Gastronomia & Restaurantes",
  "SaaS / Tech",
  "Consultoria & Saúde",
  "E-commerce & Infoprodutos",
  "Bio / Linktree",
  "Custom",
];

export const TemplateManagerDrawer: React.FC<TemplateManagerDrawerProps> = ({
  currentDocument,
  activeTemplateId,
  templates,
  sectionPacks,
  onLoadTemplate,
  onSaveAsNewTemplate,
  onOverwriteActiveTemplate,
  onUpdateTemplateMetadata,
  onDuplicateTemplate,
  onDeleteTemplate,
  onResetToBlank,
  onImportJson,
  onSaveSectionPack,
  onInsertSectionPack,
  onDeleteSectionPack,
}) => {
  const [subTab, setSubTab] = useState<"templates" | "packs">("templates");
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState<"ALL" | SiteMode>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Modal / Form de "Salvar Novo Template"
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCat, setNewCat] = useState(
    currentDocument.meta.mode === "LINKTREE"
      ? "Bio / Linktree"
      : "Construção & Serviços"
  );

  // Edição inline de um Template existente
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCat, setEditCat] = useState("");

  // Confirmação de exclusão
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Feedback visual de salvamento
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Form de "Salvar Novo Section Pack"
  const [isCreatingPack, setIsCreatingPack] = useState(false);
  const [packName, setPackName] = useState("");
  const [packDesc, setPackDesc] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeTemplate = templates.find((t) => t.id === activeTemplateId);

  const allCategories = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...templates.map((t) => t.category)])
  );

  const filteredTemplates = templates.filter((tpl) => {
    const matchesMode = modeFilter === "ALL" || tpl.mode === modeFilter;
    const matchesCat =
      categoryFilter === "ALL" || tpl.category === categoryFilter;
    const matchesSearch =
      !search.trim() ||
      tpl.name.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase()) ||
      tpl.category.toLowerCase().includes(search.toLowerCase());
    return matchesMode && matchesCat && matchesSearch;
  });

  const handleTriggerSavedFeedback = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1800);
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onSaveAsNewTemplate(newName.trim(), newDesc.trim(), newCat);
    setNewName("");
    setNewDesc("");
    setIsCreating(false);
    handleTriggerSavedFeedback();
  };

  const handleStartEdit = (tpl: TemplateRecord) => {
    setEditingId(tpl.id);
    setEditName(tpl.name);
    setEditDesc(tpl.description);
    setEditCat(tpl.category);
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return;
    onUpdateTemplateMetadata(id, {
      name: editName.trim(),
      description: editDesc.trim(),
      category: editCat,
    });
    setEditingId(null);
  };

  const handleExportTemplate = (tpl: TemplateRecord) => {
    const blob = new Blob([JSON.stringify(tpl, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tpl.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-template.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImportJson(reader.result);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleCreatePack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packName.trim()) return;
    onSaveSectionPack(packName.trim(), packDesc.trim());
    setPackName("");
    setPackDesc("");
    setIsCreatingPack(false);
  };

  return (
    <div className="space-y-4">
      {/* Sub-Abas: Templates Completos vs Combos de Seções */}
      <div className="grid grid-cols-2 gap-1 bg-zinc-900 p-1 rounded-xl border border-white/5">
        <button
          type="button"
          onClick={() => setSubTab("templates")}
          className={cn(
            "py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all",
            subTab === "templates"
              ? "bg-[#F4B400] text-zinc-950"
              : "text-zinc-400 hover:text-white"
          )}
        >
          <FolderKanban className="w-3.5 h-3.5" />
          Templates ({templates.length})
        </button>
        <button
          type="button"
          onClick={() => setSubTab("packs")}
          className={cn(
            "py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all",
            subTab === "packs"
              ? "bg-[#F4B400] text-zinc-950"
              : "text-zinc-400 hover:text-white"
          )}
        >
          <PackagePlus className="w-3.5 h-3.5" />
          Combos ({sectionPacks.length})
        </button>
      </div>

      {subTab === "templates" ? (
        <>
          {/* Card do Projeto / Template Ativo */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4B400] block">
                  {activeTemplate ? "Template Ativo" : "Projeto Atual"}
                </span>
                <h4 className="text-xs font-bold text-white truncate">
                  {activeTemplate
                    ? activeTemplate.name
                    : currentDocument.meta.name}
                </h4>
                <span className="text-[10px] text-zinc-400">
                  {currentDocument.sections.length} seções •{" "}
                  {currentDocument.meta.mode === "LINKTREE"
                    ? "Bio / Linktree"
                    : "Landing Page"}
                </span>
              </div>

              {savedFeedback && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  <Check className="w-3 h-3" /> Salvo!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {activeTemplate && (
                <button
                  type="button"
                  onClick={() => {
                    onOverwriteActiveTemplate();
                    handleTriggerSavedFeedback();
                  }}
                  className="col-span-2 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Atualizar &ldquo;{activeTemplate.name}&rdquo;
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsCreating(!isCreating);
                  setNewName(`${currentDocument.meta.name} Copy`);
                }}
                className="py-2 px-2.5 rounded-xl bg-[#F4B400] hover:bg-[#F4B400]/90 text-zinc-950 text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                Salvar Novo
              </button>

              <button
                type="button"
                onClick={onResetToBlank}
                className="py-2 px-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <FilePlus2 className="w-3.5 h-3.5 text-zinc-400" />
                Em Branco
              </button>
            </div>

            {/* Importar JSON */}
            <div className="pt-1 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500">
                Backup ou Template externo
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F4B400] hover:underline"
              >
                <Upload className="w-3 h-3" />
                Importar .JSON
              </button>
            </div>
          </div>

          {/* Formulário de Criação de Novo Template */}
          {isCreating && (
            <form
              onSubmit={handleCreateTemplate}
              className="p-3.5 rounded-2xl bg-zinc-900 border border-[#F4B400]/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F4B400] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Salvar Página como Template
                </span>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Nome do Template
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: LP Construtora Premium"
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-1.5 text-xs text-white focus:border-[#F4B400] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Nicho / Categoria
                </label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-1.5 text-xs text-white focus:border-[#F4B400] focus:outline-none"
                >
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Descrição Curta
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="O que este template contém..."
                  className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-1.5 text-xs text-white focus:border-[#F4B400] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#F4B400] text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity"
              >
                Confirmar e Salvar Template
              </button>
            </form>
          )}

          {/* Busca & Filtros de Modo e Nicho */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar template por nome ou nicho..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none"
              />
            </div>

            {/* Filtro Rápido LP vs Linktree */}
            <div className="grid grid-cols-3 gap-1 bg-zinc-900/70 p-1 rounded-xl border border-white/5">
              {(
                [
                  { id: "ALL", label: "Todos" },
                  { id: "LANDING_PAGE", label: "Landing Pages" },
                  { id: "LINKTREE", label: "Bio 3D" },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModeFilter(m.id)}
                  className={cn(
                    "py-1 rounded-lg text-[10px] font-semibold transition-all",
                    modeFilter === m.id
                      ? "bg-white/15 text-white"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Pílulas de Categoria/Nicho */}
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
              <button
                type="button"
                onClick={() => setCategoryFilter("ALL")}
                className={cn(
                  "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all",
                  categoryFilter === "ALL"
                    ? "bg-[#F4B400] text-zinc-950"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                )}
              >
                Todos os Nichos
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all",
                    categoryFilter === cat
                      ? "bg-[#F4B400] text-zinc-950"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Templates */}
          <div className="space-y-2.5">
            {filteredTemplates.length === 0 ? (
              <div className="py-12 px-4 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/40">
                <FolderKanban className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-300">
                  {templates.length === 0
                    ? "Nenhum template salvo"
                    : "Nenhum template encontrado"}
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 max-w-xs mx-auto">
                  {templates.length === 0
                    ? "Monte sua página com os blocos desejados e clique em 'Salvar Página como Novo Template' acima para criar seu primeiro modelo."
                    : "Tente alterar os termos da busca ou filtro de nicho."}
                </p>
              </div>
            ) : (
              filteredTemplates.map((tpl) => {
              const isCurrent = tpl.id === activeTemplateId;
              const isEditing = editingId === tpl.id;
              const isConfirmingDelete = confirmDeleteId === tpl.id;
              const palette = tpl.document.theme.palette;

              return (
                <div
                  key={tpl.id}
                  className={cn(
                    "rounded-2xl border p-3.5 transition-all space-y-2.5",
                    isCurrent
                      ? "bg-[#F4B400]/10 border-[#F4B400]/50 shadow-lg"
                      : "bg-zinc-900/70 border-white/5 hover:border-white/15"
                  )}
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-white/15 px-2.5 py-1.5 text-xs text-white font-bold"
                      />
                      <select
                        value={editCat}
                        onChange={(e) => setEditCat(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                      >
                        {allCategories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <textarea
                        rows={2}
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                      />
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(tpl.id)}
                          className="flex-1 py-1.5 rounded-lg bg-[#F4B400] text-zinc-950 font-bold text-xs"
                        >
                          Salvar
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={cn(
                                "text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold",
                                tpl.mode === "LINKTREE"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : "bg-[#F4B400]/20 text-[#F4B400]"
                              )}
                            >
                              {tpl.mode === "LINKTREE" ? "BIO 3D" : "LP"}
                            </span>
                            <span className="text-[10px] text-zinc-400 truncate">
                              {tpl.category}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white leading-snug">
                            {tpl.name}
                          </h4>
                        </div>

                        {/* Mini Preview da Paleta do Template */}
                        <div className="flex items-center -space-x-1 shrink-0 pt-0.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: palette.background }}
                            title="Fundo"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: palette.primary }}
                            title="Primária"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: palette.accent }}
                            title="Destaque"
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                        {tpl.description}
                      </p>

                      {/* Lista resumida de blocos inclusos */}
                      <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                        <Layers className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span className="truncate">
                          {tpl.document.sections.length} seções (
                          {tpl.document.sections
                            .slice(0, 3)
                            .map((s) => s.type.split(".")[0])
                            .join(", ")}
                          {tpl.document.sections.length > 3 ? "..." : ""})
                        </span>
                      </div>

                      {isConfirmingDelete ? (
                        <div className="p-2 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-red-300 font-medium">
                            Excluir este template?
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteTemplate(tpl.id);
                                setConfirmDeleteId(null);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-red-500 text-white text-[10px] font-bold"
                            >
                              Sim, Excluir
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-[10px]"
                            >
                              Não
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => onLoadTemplate(tpl.id)}
                            className={cn(
                              "flex-1 py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5",
                              isCurrent
                                ? "bg-white/10 text-[#F4B400] hover:bg-white/15"
                                : "bg-[#F4B400] text-zinc-950 hover:opacity-90"
                            )}
                          >
                            <RefreshCw className="w-3 h-3" />
                            {isCurrent ? "Recarregar" : "Usar Template"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStartEdit(tpl)}
                            title="Renomear / Editar"
                            className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onDuplicateTemplate(tpl.id)}
                            title="Duplicar Template"
                            className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleExportTemplate(tpl)}
                            title="Baixar .JSON"
                            className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(tpl.id)}
                            title="Excluir Template"
                            className="p-1.5 rounded-lg bg-zinc-800/80 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            }))}
          </div>
        </>
      ) : (
        /* SUB-ABA 2: COMBOS / GRUPOS DE SEÇÕES (SECTION PACKS) */
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4B400] block">
              Grupos de Seções (Section Packs)
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Insira combos inteiros de seções na sua página atual com 1 clique ou salve suas seções atuais como um combo reutilizável.
            </p>
            <button
              type="button"
              onClick={() => setIsCreatingPack(!isCreatingPack)}
              className="w-full py-2 px-3 rounded-xl bg-[#F4B400] text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <PackagePlus className="w-3.5 h-3.5" />
              Salvar Seções Atuais como Combo
            </button>
          </div>

          {isCreatingPack && (
            <form
              onSubmit={handleCreatePack}
              className="p-3.5 rounded-2xl bg-zinc-900 border border-[#F4B400]/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F4B400]">
                  Novo Combo ({currentDocument.sections.length} seções)
                </span>
                <button
                  type="button"
                  onClick={() => setIsCreatingPack(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                required
                value={packName}
                onChange={(e) => setPackName(e.target.value)}
                placeholder="Ex: Combo Fechamento Infallible"
                className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-1.5 text-xs text-white"
              />
              <textarea
                rows={2}
                value={packDesc}
                onChange={(e) => setPackDesc(e.target.value)}
                placeholder="Quais seções fazem parte deste grupo..."
                className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-1.5 text-xs text-white"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#F4B400] text-zinc-950 font-bold text-xs"
              >
                Salvar Combo
              </button>
            </form>
          )}

          <div className="space-y-2.5">
            {sectionPacks.length === 0 ? (
              <div className="py-12 px-4 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/40">
                <Layers className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-300">
                  Nenhum combo salvo
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 max-w-xs mx-auto">
                  Crie conjuntos de seções que você usa com frequência e salve-os como um combo para inserir com 1 clique.
                </p>
              </div>
            ) : (
              sectionPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="rounded-2xl border border-white/10 bg-zinc-900/70 p-3.5 space-y-2.5 hover:border-[#F4B400]/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-[#F4B400] font-semibold">
                        {pack.sections.length} Seções no Combo
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1">
                        {pack.name}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteSectionPack(pack.id)}
                      title="Excluir Combo"
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {pack.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => onInsertSectionPack(pack.id)}
                    className="w-full py-1.5 px-3 rounded-xl bg-white/10 hover:bg-[#F4B400] hover:text-zinc-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Inserir Combo na Página Atual
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
