"use client";

import React, { useState } from "react";
import {
  BLOCK_LIBRARY,
  LegacyFieldItem,
  LegacySchemaGroup,
} from "@/components/library/registry";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ChevronDown,
  ChevronRight,
  Layers,
  Maximize2,
  Plus,
  Sparkles,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface LegacySchemaInspectorProps {
  sectionId: string;
  legacyType: string;
  activeVariant: string;
  content: Record<string, any>;
  onUpdateNested: (path: string, value: any) => void;
  onChangeVariant: (newVariant: string) => void;
}

export function getNestedValue(obj: Record<string, any>, path?: string): any {
  if (!obj || !path) return undefined;
  return path.split(".").reduce((acc, part) => (acc !== undefined && acc !== null ? acc[part] : undefined), obj);
}

const AccordionGroup: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all overflow-hidden ${
        isOpen
          ? "bg-zinc-900/70 border-[#F4B400]/30 shadow-lg"
          : "bg-zinc-900/30 border-white/5 hover:border-white/10"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`p-1.5 rounded-lg transition-colors ${
              isOpen
                ? "bg-[#F4B400] text-zinc-950"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isOpen ? "text-white" : "text-zinc-300"
            }`}
          >
            {label}
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-[#F4B400]" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        )}
      </button>

      {isOpen && (
        <div className="px-3.5 pb-3.5 pt-3 border-t border-white/5 space-y-3 bg-zinc-950/40">
          {children}
        </div>
      )}
    </div>
  );
};

const LegacyArrayControl: React.FC<{
  label: string;
  items: Record<string, any>[];
  itemFields: LegacyFieldItem[];
  onChange: (nextItems: Record<string, any>[]) => void;
}> = ({ label, items = [], itemFields = [], onChange }) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const safeItems = Array.isArray(items) ? items : [];

  const handleAdd = () => {
    const newItem: Record<string, any> = {};
    itemFields.forEach((f) => {
      if (f.key) {
        newItem[f.key] = f.default !== undefined ? f.default : "";
      }
    });
    const next = [...safeItems, newItem];
    onChange(next);
    setExpandedIdx(next.length - 1);
  };

  const handleRemove = (idx: number) => {
    onChange(safeItems.filter((_, i) => i !== idx));
  };

  const handleMove = (idx: number, dir: "up" | "down") => {
    const target = dir === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= safeItems.length) return;
    const next = [...safeItems];
    const [moved] = next.splice(idx, 1);
    next.splice(target, 0, moved);
    onChange(next);
    setExpandedIdx(target);
  };

  const handleItemChange = (idx: number, key: string, val: any) => {
    const next = safeItems.map((it, i) =>
      i === idx ? { ...it, [key]: val } : it
    );
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          {label} ({safeItems.length})
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F4B400]/15 text-[#F4B400] hover:bg-[#F4B400]/25 text-[11px] font-semibold transition-colors"
        >
          <Plus className="w-3 h-3" />
          Adicionar
        </button>
      </div>

      <div className="space-y-2">
        {safeItems.map((it, idx) => {
          const isExpanded = expandedIdx === idx;
          const summary =
            it.title ||
            it.label ||
            it.name ||
            it.question ||
            it.text ||
            it.stat ||
            `Item #${idx + 1}`;

          return (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-zinc-950/70 overflow-hidden"
            >
              <div
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#F4B400] shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  )}
                  <span className="text-xs font-medium text-zinc-200 truncate">
                    {String(summary)}
                  </span>
                </div>

                <div
                  className="flex items-center gap-0.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === safeItems.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="p-1 text-red-400/70 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-3 border-t border-white/5 space-y-3 bg-zinc-900/30">
                  {itemFields.map((f, fIdx) => {
                    if (f.condition && !it[f.condition]) return null;

                    if (f.type === "section") {
                      return (
                        <div
                          key={fIdx}
                          className="pt-2 pb-1 border-b border-white/5"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4B400]/80">
                            {f.label}
                          </span>
                        </div>
                      );
                    }

                    const fieldKey = f.key || `field_${fIdx}`;
                    const val = it[fieldKey];

                    if (f.type === "select") {
                      return (
                        <div key={fieldKey} className="space-y-1">
                          <label className="block text-[11px] text-zinc-400">
                            {f.label}
                          </label>
                          <select
                            value={val ?? f.options?.[0]?.value ?? ""}
                            onChange={(e) =>
                              handleItemChange(idx, fieldKey, e.target.value)
                            }
                            className="w-full rounded-lg bg-zinc-950 border border-white/10 px-2.5 py-1.5 text-xs text-white focus:border-[#F4B400] focus:outline-none"
                          >
                            {f.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }

                    if (f.type === "toggle") {
                      return (
                        <label
                          key={fieldKey}
                          className="flex items-center justify-between py-1 cursor-pointer"
                        >
                          <span className="text-[11px] text-zinc-300">
                            {f.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={Boolean(val)}
                            onChange={(e) =>
                              handleItemChange(idx, fieldKey, e.target.checked)
                            }
                            className="h-4 w-4 accent-[#F4B400] rounded"
                          />
                        </label>
                      );
                    }

                    if (f.type === "color") {
                      return (
                        <div key={fieldKey} className="space-y-1">
                          <label className="block text-[11px] text-zinc-400">
                            {f.label}
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={val || "#EAB308"}
                              onChange={(e) =>
                                handleItemChange(idx, fieldKey, e.target.value)
                              }
                              className="w-7 h-7 rounded cursor-pointer bg-transparent border border-white/10"
                            />
                            <input
                              type="text"
                              value={val || ""}
                              onChange={(e) =>
                                handleItemChange(idx, fieldKey, e.target.value)
                              }
                              placeholder="#EAB308"
                              className="flex-1 rounded-lg bg-zinc-950 border border-white/10 px-2.5 py-1.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      );
                    }

                    if (f.type === "array" && f.itemFields) {
                      return (
                        <LegacyArrayControl
                          key={fieldKey}
                          label={f.label}
                          items={val || []}
                          itemFields={f.itemFields}
                          onChange={(nested) =>
                            handleItemChange(idx, fieldKey, nested)
                          }
                        />
                      );
                    }

                    if (f.type === "textarea") {
                      return (
                        <div key={fieldKey} className="space-y-1">
                          <label className="block text-[11px] text-zinc-400">
                            {f.label}
                          </label>
                          <textarea
                            rows={2}
                            value={val || ""}
                            onChange={(e) =>
                              handleItemChange(idx, fieldKey, e.target.value)
                            }
                            className="w-full rounded-lg bg-zinc-950 border border-white/10 px-2.5 py-1.5 text-xs text-white focus:border-[#F4B400] focus:outline-none"
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={fieldKey} className="space-y-1">
                        <label className="block text-[11px] text-zinc-400">
                          {f.label}
                        </label>
                        <input
                          type="text"
                          value={val || ""}
                          placeholder={
                            f.type === "image" ? "https://..." : undefined
                          }
                          onChange={(e) =>
                            handleItemChange(idx, fieldKey, e.target.value)
                          }
                          className="w-full rounded-lg bg-zinc-950 border border-white/10 px-2.5 py-1.5 text-xs text-white focus:border-[#F4B400] focus:outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const LegacySchemaInspector: React.FC<LegacySchemaInspectorProps> = ({
  legacyType,
  activeVariant,
  content,
  onUpdateNested,
  onChangeVariant,
}) => {
  const typeGroup = BLOCK_LIBRARY[legacyType];
  if (!typeGroup) return null;

  const variantsMap = typeGroup.variants || {};
  const variantKeys = Object.keys(variantsMap);
  const currentVariantKey = variantsMap[activeVariant]
    ? activeVariant
    : typeGroup.default;
  const currentVariantObj = variantsMap[currentVariantKey];
  const schema: LegacySchemaGroup[] = currentVariantObj?.schema || [];

  const renderField = (field: LegacyFieldItem, idx: number): React.ReactNode => {
    if (field.type === "section") {
      return (
        <div
          key={`sec_${field.label}_${idx}`}
          className="pt-3 pb-1 border-b border-white/10"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4B400]/80">
            {field.label}
          </span>
        </div>
      );
    }

    if (field.type === "group" && field.fields) {
      return (
        <AccordionGroup key={`grp_${field.label}_${idx}`} label={field.label}>
          {field.fields.map((sub, sIdx) => renderField(sub, sIdx))}
        </AccordionGroup>
      );
    }

    const key = field.key || "";
    const value = getNestedValue(content, key);
    const isConditionDisabled = field.condition
      ? getNestedValue(content, field.condition) === false
      : false;

    if (isConditionDisabled) {
      return null;
    }

    if (field.type === "toggle") {
      const checked = value !== undefined ? Boolean(value) : Boolean(field.default);
      return (
        <label
          key={key || idx}
          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 cursor-pointer hover:border-white/10 transition-colors"
        >
          <span className="text-xs font-medium text-zinc-200">{field.label}</span>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onUpdateNested(key, e.target.checked)}
            className="h-4 w-4 accent-[#F4B400] rounded"
          />
        </label>
      );
    }

    if (field.type === "select") {
      return (
        <div key={key || idx} className="space-y-1.5">
          <label className="block text-xs font-medium text-zinc-300">
            {field.label}
          </label>
          <select
            value={value ?? field.options?.[0]?.value ?? ""}
            onChange={(e) => onUpdateNested(key, e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-xs text-white focus:border-[#F4B400] focus:outline-none"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === "align") {
      const currentAlign = value || "left";
      return (
        <div key={key || idx} className="space-y-1.5">
          <label className="block text-xs font-medium text-zinc-300">
            {field.label}
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10">
            {(["left", "center", "right"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => onUpdateNested(key, a)}
                className={`py-2 rounded-lg flex items-center justify-center transition-all ${
                  currentAlign === a
                    ? "bg-[#F4B400] text-zinc-950 shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {a === "left" ? (
                  <AlignLeft className="w-4 h-4" />
                ) : a === "center" ? (
                  <AlignCenter className="w-4 h-4" />
                ) : (
                  <AlignRight className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === "range") {
      const numVal =
        value !== undefined
          ? Number(value)
          : field.default !== undefined
          ? Number(field.default)
          : 0.6;
      return (
        <div key={key || idx} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-300">
              {field.label}
            </label>
            <span className="text-[11px] font-mono text-[#F4B400]">
              {Math.round(numVal * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={field.min ?? 0}
            max={field.max ?? 1}
            step={field.step ?? 0.05}
            value={numVal}
            onChange={(e) => onUpdateNested(key, parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#F4B400]"
          />
        </div>
      );
    }

    if (field.type === "color") {
      return (
        <div key={key || idx} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-300">
              {field.label}
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onUpdateNested(key, "")}
                className="text-[10px] text-zinc-500 hover:text-zinc-300"
              >
                Resetar
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || "#EAB308"}
              onChange={(e) => onUpdateNested(key, e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/10"
            />
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onUpdateNested(key, e.target.value)}
              placeholder="Padrão do tema"
              className="flex-1 rounded-xl bg-zinc-900 border border-white/10 px-3 py-1.5 text-xs text-white font-mono"
            />
          </div>
        </div>
      );
    }

    if (field.type === "array" && field.itemFields) {
      return (
        <LegacyArrayControl
          key={key || idx}
          label={field.label}
          items={value || []}
          itemFields={field.itemFields}
          onChange={(nextItems) => onUpdateNested(key, nextItems)}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={key || idx} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-zinc-300">
              {field.label}
            </label>
            <span className="text-[10px] text-zinc-500">
              Use {"{palavra}"} p/ destacar
            </span>
          </div>
          <textarea
            rows={3}
            value={value ?? ""}
            onChange={(e) => onUpdateNested(key, e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-xs text-white focus:border-[#F4B400] focus:outline-none"
          />
        </div>
      );
    }

    // Default: text or image
    return (
      <div key={key || idx} className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-zinc-300">
            {field.label}
          </label>
          {field.type === "text" &&
            (key.includes("title") ||
              key.includes("headline") ||
              key.includes("subtitle")) && (
              <span className="text-[10px] text-zinc-500">
                {"{destaque}"}
              </span>
            )}
        </div>
        <input
          type="text"
          value={value ?? ""}
          placeholder={
            field.type === "image" ? "https://images.unsplash.com/..." : ""
          }
          onChange={(e) => onUpdateNested(key, e.target.value)}
          className="w-full rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-xs text-white focus:border-[#F4B400] focus:outline-none"
        />
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Seletor de Variante de Layout (v1, v2, v3, v4, v5) */}
      <div className="p-3.5 rounded-2xl bg-[#F4B400]/10 border border-[#F4B400]/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F4B400]">
            <Sparkles className="w-3.5 h-3.5" />
            Variante de Layout ({variantKeys.length} opções)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-[#F4B400] border border-[#F4B400]/30">
            {currentVariantKey.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {variantKeys.map((vKey) => {
            const vObj = variantsMap[vKey];
            const isSelected = vKey === currentVariantKey;
            return (
              <button
                key={vKey}
                type="button"
                onClick={() => onChangeVariant(vKey)}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                  isSelected
                    ? "bg-[#F4B400] text-zinc-950 shadow-md"
                    : "bg-zinc-950/70 text-zinc-300 hover:bg-zinc-900 border border-white/5"
                }`}
              >
                <span>{vObj.label}</span>
                <span
                  className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-zinc-950/20 text-zinc-950 font-bold"
                      : "bg-white/5 text-zinc-400"
                  }`}
                >
                  {vKey}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grupos do Schema Original do Componente */}
      {schema.map((group, gIdx) => (
        <div
          key={`${group.group}_${gIdx}`}
          className="rounded-2xl border border-white/10 bg-zinc-900/20 p-3.5 space-y-3.5"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Maximize2 className="w-3.5 h-3.5 text-[#F4B400]" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#F4B400]">
              {group.group}
            </h4>
          </div>

          <div className="space-y-3">
            {group.fields.map((field, fIdx) => renderField(field, fIdx))}
          </div>
        </div>
      ))}
    </div>
  );
};
