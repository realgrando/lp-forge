"use client";

import React, { useState } from "react";
import { FieldDefinition } from "@/types/site";
import { ICON_OPTIONS, DynamicIcon } from "@/components/engine/DynamicIcon";
import { cn } from "@/lib/utils";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Copy,
  Layers,
} from "lucide-react";
import { ColorFieldRow } from "./ui/ColorFieldRow";
import { ModernToggle } from "./ui/ModernToggle";
import { ImageUploadField } from "./ui/ImageUploadField";

interface ArrayFieldEditorProps {
  field: FieldDefinition;
  items: Record<string, any>[];
  isHidden?: boolean;
  onToggleVisibility?: () => void;
  onChange: (nextItems: Record<string, any>[]) => void;
  defaultAccentColor: string;
}

export const ArrayFieldEditor: React.FC<ArrayFieldEditorProps> = ({
  field,
  items = [],
  isHidden = false,
  onToggleVisibility,
  onChange,
  defaultAccentColor,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAddItem = () => {
    const newItem = field.defaultNewItem
      ? { ...field.defaultNewItem }
      : (field.itemFields || []).reduce((acc, f) => {
          acc[f.key] = f.type === "toggle" ? false : "";
          return acc;
        }, {} as Record<string, any>);

    const next = [...items, newItem];
    onChange(next);
    setOpenIndex(next.length - 1);
  };

  const handleRemoveItem = (idx: number) => {
    const next = items.filter((_, i) => i !== idx);
    onChange(next);
    if (openIndex === idx) setOpenIndex(null);
  };

  const handleDuplicateItem = (idx: number) => {
    const copy = JSON.parse(JSON.stringify(items[idx]));
    const next = [...items];
    next.splice(idx + 1, 0, copy);
    onChange(next);
    setOpenIndex(idx + 1);
  };

  const handleMoveItem = (idx: number, dir: "up" | "down") => {
    const target = dir === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(idx, 1);
    next.splice(target, 0, moved);
    onChange(next);
    setOpenIndex(target);
  };

  const handleUpdateItemField = (idx: number, key: string, val: any) => {
    const next = items.map((item, i) =>
      i === idx ? { ...item, [key]: val } : item
    );
    onChange(next);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 space-y-3.5">
      {/* Cabeçalho da Lista: Switch de Visibilidade + Título + Botão Adicionar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {onToggleVisibility && (
            <button
              type="button"
              onClick={onToggleVisibility}
              title={isHidden ? "Mostrar esta lista" : "Ocultar esta lista"}
              className={cn(
                "w-7 h-7 rounded-lg border flex items-center justify-center transition-colors shrink-0",
                !isHidden
                  ? "bg-[#F4B400]/15 border-[#F4B400]/40 text-[#F4B400]"
                  : "bg-zinc-900 border-white/10 text-zinc-500"
              )}
            >
              {!isHidden ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-100 truncate">
                {field.label}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-white/10 text-[#F4B400] font-semibold shrink-0">
                {items.length} {items.length === 1 ? "item" : "itens"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4B400] hover:bg-[#F4B400]/90 text-zinc-950 font-bold text-xs transition-all shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Novo Item</span>
        </button>
      </div>

      {/* Itens da Lista */}
      {!isHidden && (
        <div className="space-y-2">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const summaryTitle =
              item.title ||
              item.text ||
              item.tag ||
              item.label ||
              item.headline ||
              `Item #${idx + 1}`;

            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-zinc-950/80 overflow-hidden transition-all duration-200 hover:border-white/20"
              >
                {/* Barra do Item */}
                <div
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="px-3.5 py-2.5 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-white/[0.02] transition-colors select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[11px] font-mono font-bold text-[#F4B400] shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {item.iconName && item.iconName !== "none" && (
                      <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                        <DynamicIcon
                          name={item.iconName}
                          className="w-3.5 h-3.5"
                          style={{
                            color: item.accentColor || defaultAccentColor,
                          }}
                        />
                      </span>
                    )}
                    <span className="text-xs font-semibold text-zinc-200 truncate">
                      {summaryTitle}
                    </span>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => handleMoveItem(idx, "up")}
                      disabled={idx === 0}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors"
                      title="Mover para cima"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveItem(idx, "down")}
                      disabled={idx === items.length - 1}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors"
                      title="Mover para baixo"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateItem(idx)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Duplicar item"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Excluir item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Campos Internos do Item */}
                {isOpen && field.itemFields && (
                  <div className="p-3.5 border-t border-white/10 space-y-3 bg-zinc-900/50 animate-in fade-in duration-150">
                    {field.itemFields.map((subField) => {
                      const subVal = item[subField.key];

                      if (subField.type === "image") {
                        return (
                          <ImageUploadField
                            key={subField.key}
                            label={subField.label}
                            value={subVal || ""}
                            onChange={(url) =>
                              handleUpdateItemField(idx, subField.key, url)
                            }
                            onReset={() =>
                              handleUpdateItemField(idx, subField.key, "")
                            }
                          />
                        );
                      }

                      if (subField.type === "text" || subField.type === "url") {
                        return (
                          <div key={subField.key} className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-zinc-300 block">
                              {subField.label}
                            </label>
                            <input
                              type="text"
                              value={subVal || ""}
                              onChange={(e) =>
                                handleUpdateItemField(
                                  idx,
                                  subField.key,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
                            />
                          </div>
                        );
                      }

                      if (subField.type === "textarea") {
                        return (
                          <div key={subField.key} className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-zinc-300 block">
                              {subField.label}
                            </label>
                            <textarea
                              rows={3}
                              value={subVal || ""}
                              onChange={(e) =>
                                handleUpdateItemField(
                                  idx,
                                  subField.key,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
                            />
                          </div>
                        );
                      }

                      if (subField.type === "icon") {
                        return (
                          <div key={subField.key} className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-zinc-300 block">
                              {subField.label}
                            </label>
                            <select
                              value={subVal || "Sparkles"}
                              onChange={(e) =>
                                handleUpdateItemField(
                                  idx,
                                  subField.key,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
                            >
                              {ICON_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      }

                      if (subField.type === "color") {
                        return (
                          <ColorFieldRow
                            key={subField.key}
                            label={subField.label}
                            value={subVal}
                            defaultValue={defaultAccentColor}
                            onChange={(hex) =>
                              handleUpdateItemField(idx, subField.key, hex)
                            }
                            onReset={() =>
                              handleUpdateItemField(idx, subField.key, "")
                            }
                          />
                        );
                      }

                      if (subField.type === "select" && subField.options) {
                        return (
                          <div key={subField.key} className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-zinc-300 block">
                              {subField.label}
                            </label>
                            <select
                              value={subVal || subField.options[0]?.value}
                              onChange={(e) =>
                                handleUpdateItemField(
                                  idx,
                                  subField.key,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white focus:border-[#F4B400] focus:outline-none transition-colors"
                            >
                              {subField.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      }

                      if (subField.type === "toggle") {
                        return (
                          <ModernToggle
                            key={subField.key}
                            label={subField.label}
                            checked={Boolean(subVal)}
                            onChange={(chk) =>
                              handleUpdateItemField(idx, subField.key, chk)
                            }
                          />
                        );
                      }

                      return null;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
