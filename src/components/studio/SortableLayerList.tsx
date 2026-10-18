"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionNode } from "@/types/site";
import { getSectionDefinition } from "@/registry";
import { cn } from "@/lib/utils";
import { GripVertical, Eye, EyeOff, Trash2, Copy } from "lucide-react";

interface SortableItemProps {
  section: SectionNode;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const SortableLayerItem: React.FC<SortableItemProps> = ({
  section,
  index,
  isSelected,
  onSelect,
  onToggleVisibility,
  onDuplicate,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const def = getSectionDefinition(section.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={cn(
        "group px-2.5 py-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2",
        isDragging && "opacity-60 z-50 shadow-2xl border-[#F4B400]",
        isSelected
          ? "bg-[#F4B400]/12 border-[#F4B400] text-white font-semibold"
          : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
      )}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <button
          type="button"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          title="Arrastar para reordenar"
          className="p-0.5 text-zinc-600 hover:text-zinc-300 cursor-grab active:cursor-grabbing shrink-0"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] font-mono opacity-40 shrink-0">
          0{index + 1}
        </span>

        <span
          className={cn(
            "truncate",
            section.layout.hidden && "line-through opacity-50"
          )}
        >
          {def?.name || section.type}
        </span>

        {section.anchorId && (
          <span className="text-[9px] font-mono text-[#F4B400] bg-[#F4B400]/10 border border-[#F4B400]/20 px-1 py-0.5 rounded shrink-0">
            #{section.anchorId}
          </span>
        )}
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
        <button
          type="button"
          onClick={onToggleVisibility}
          title={section.layout.hidden ? "Mostrar seção" : "Ocultar seção"}
          className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
        >
          {section.layout.hidden ? (
            <EyeOff className="w-3 h-3 text-amber-400" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          title="Duplicar seção"
          className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
        >
          <Copy className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          title="Remover seção"
          className="p-1 rounded hover:bg-red-500/20 text-zinc-500 hover:text-red-400"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

interface SortableLayerListProps {
  sections: SectionNode[];
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
  onReorderSections: (activeId: string, overId: string) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicateSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
}

export const SortableLayerList: React.FC<SortableLayerListProps> = ({
  sections,
  selectedSectionId,
  onSelectSection,
  onReorderSections,
  onToggleVisibility,
  onDuplicateSection,
  onDeleteSection,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorderSections(String(active.id), String(over.id));
    }
  };

  if (sections.length === 0) {
    return (
      <div className="py-12 px-4 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/30">
        <p className="text-xs font-semibold text-zinc-400">Nenhuma seção adicionada</p>
        <p className="text-[11px] text-zinc-500 mt-1">
          Adicione blocos do catálogo para montar a sua página.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1.5">
          {sections.map((sec, idx) => (
            <SortableLayerItem
              key={sec.id}
              section={sec}
              index={idx}
              isSelected={sec.id === selectedSectionId}
              onSelect={() => onSelectSection(sec.id)}
              onToggleVisibility={() => onToggleVisibility(sec.id)}
              onDuplicate={() => onDuplicateSection(sec.id)}
              onDelete={() => onDeleteSection(sec.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
