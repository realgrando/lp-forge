"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  Check,
  FileImage,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  value?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  onReset?: () => void;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  description,
  value,
  placeholder = "https://... ou solte o arquivo",
  onChange,
  onReset,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUrlOpen, setIsUrlOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasImage = Boolean(value && value.trim().length > 0);
  const isDataUrl = Boolean(value?.startsWith("data:image/"));

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione um arquivo de imagem válido (PNG, JPG, SVG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleClear = () => {
    onChange("");
    if (onReset) onReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-300 block">
          {label}
        </label>
        {description && (
          <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[160px]">
            {description}
          </span>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {hasImage ? (
        /* Preview Ativo com Opções de Troca ou Remoção */
        <div className="relative group p-2 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all flex items-center gap-3">
          {/* Thumbnail com padrão de transparência */}
          <div
            className="w-12 h-12 rounded-lg border border-white/10 shrink-0 overflow-hidden relative flex items-center justify-center bg-zinc-900"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #27272a 75%), linear-gradient(-45deg, transparent 75%, #27272a 75%)",
              backgroundSize: "6px 6px",
            }}
          >
            <img
              src={value}
              alt="Prévia"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info e Ações */}
          <div className="flex-1 min-w-0 pr-1">
            <span className="text-[11px] font-medium text-zinc-200 block truncate">
              {isDataUrl ? "Imagem carregada (Upload)" : value}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] text-[#F4B400] hover:underline font-semibold flex items-center gap-1"
              >
                <Upload className="w-2.5 h-2.5" />
                Trocar arquivo
              </button>
              <span className="text-zinc-600 text-[10px]">•</span>
              <button
                type="button"
                onClick={() => setIsUrlOpen(!isUrlOpen)}
                className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <LinkIcon className="w-2.5 h-2.5" />
                Editar URL
              </button>
            </div>
          </div>

          {/* Botão Remover */}
          <button
            type="button"
            onClick={handleClear}
            title="Remover imagem"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Dropzone / Upload / Input */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "p-3 rounded-xl border border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5",
            isDragging
              ? "bg-[#F4B400]/15 border-[#F4B400] scale-[1.01] shadow-lg shadow-[#F4B400]/10"
              : "bg-zinc-950/50 border-white/10 hover:border-[#F4B400]/50 hover:bg-zinc-900/50"
          )}
        >
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white">
            <Upload className="w-3.5 h-3.5 text-[#F4B400]" />
          </div>
          <div className="text-[11px] font-medium text-zinc-300">
            {isDragging ? (
              <span className="text-[#F4B400] font-semibold">Solte a imagem aqui!</span>
            ) : (
              <span>
                <strong className="text-white hover:text-[#F4B400]">Clique para upload</strong> ou arraste aqui
              </span>
            )}
          </div>
          <span className="text-[9px] text-zinc-500">
            PNG, JPG, SVG ou WEBP
          </span>
        </div>
      )}

      {/* Campo alternativo de URL direta */}
      {(!hasImage || isUrlOpen) && (
        <div className="flex items-center gap-1.5 pt-1">
          <div className="relative flex-1">
            <LinkIcon className="w-3 h-3 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-7 pr-2.5 py-1.5 text-xs rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F4B400] transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
};
