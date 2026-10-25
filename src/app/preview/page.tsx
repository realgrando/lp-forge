"use client";

import React, { useState, useEffect } from "react";
import { SiteDocument, DeviceViewport } from "@/types/site";
import { DynamicRenderer } from "@/components/engine/DynamicRenderer";
import { PreviewFrame } from "@/components/studio/PreviewFrame";
import {
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
  Layers,
  ChevronDown,
  ChevronUp,
  SmartphoneNfc,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "lp_forge_v2_live_preview";
const CHANNEL_NAME = "lp_forge_preview_sync";

export default function PreviewPage() {
  const [doc, setDoc] = useState<SiteDocument | null>(null);
  const [viewport, setViewport] = useState<DeviceViewport>("desktop");
  const [mobileScrollMode, setMobileScrollMode] = useState<"frame" | "expanded">("frame");
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");

  useEffect(() => {
    // 1. Carrega estado inicial do localStorage
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.sections)) {
            setDoc(parsed);
            if (parsed.meta?.mode === "LINKTREE") {
              setViewport("mobile");
            }
            setLastSyncTime(new Date().toLocaleTimeString());
          }
        }
      } catch (e) {
        console.error("Erro ao ler preview do localStorage:", e);
      }
    }

    // 2. Escuta canal de sincronização em tempo real (0 latência com o Studio)
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.type === "SYNC_DOCUMENT" && event.data?.document) {
          setDoc(event.data.document);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      };
    } catch {
      // fallback caso BroadcastChannel não esteja disponível
    }

    // 3. Fallback: escuta evento de storage
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (parsed && Array.isArray(parsed.sections)) {
            setDoc(parsed);
            setLastSyncTime(new Date().toLocaleTimeString());
          }
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Interceptador de âncoras locais no modo desktop (#sobre, #contato)
  const handleDesktopAnchorClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const href = target.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const anchorId = href.slice(1);
      const targetEl = document.getElementById(anchorId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#F4B400]/10 border border-[#F4B400]/25 flex items-center justify-center text-[#F4B400] mb-4">
          <Layers className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold mb-2">Conectando ao Studio...</h2>
        <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
          Abra o LP-Forge Studio ou faça qualquer alteração para visualizar o site aqui em tempo real.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4B400] text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Studio</span>
        </a>
      </div>
    );
  }

  const isMobileMode = doc.meta.mode === "LINKTREE";

  return (
    <div className="min-h-screen w-full bg-[#09090B] text-zinc-100 flex flex-col relative selection:bg-[#F4B400]/30 selection:text-white">
      {/* FLOATING CONTROL BAR (Recolhível para não obstruir Headers e Navbars) */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
        <div
          className={cn(
            "rounded-2xl border border-white/15 bg-zinc-950/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all overflow-hidden",
            isHeaderCollapsed ? "py-1 px-3" : "p-1.5"
          )}
        >
          {isHeaderCollapsed ? (
            <button
              type="button"
              onClick={() => setIsHeaderCollapsed(false)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Visualizador Real ({doc.meta.name})</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {/* Botão de Retorno ao Studio */}
              <a
                href="/"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Voltar ao Studio"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </a>

              {/* Identificação & Status */}
              <div className="flex items-center gap-2 pl-1 pr-2 border-r border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white max-w-[150px] truncate">
                  {doc.meta.name || "Site Preview"}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[#F4B400] uppercase font-semibold">
                  {isMobileMode ? "Bio 3D" : "LP"}
                </span>
              </div>

              {/* Seletor de Viewport Universal */}
              <div className="flex items-center bg-zinc-900 p-0.5 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setViewport("desktop")}
                  title="Desktop (100% Real - Tela Cheia)"
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all",
                    viewport === "desktop"
                      ? "bg-[#F4B400] text-zinc-950 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop 100%</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("tablet")}
                  title="Tablet (768px - Media Queries Nativas)"
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    viewport === "tablet"
                      ? "bg-[#F4B400] text-zinc-950"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("mobile")}
                  title="Mobile (412px - Media Queries Nativas)"
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    viewport === "mobile"
                      ? "bg-[#F4B400] text-zinc-950"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Toggle de Modo de Rolagem quando em Tablet / Mobile */}
              {(viewport === "mobile" || viewport === "tablet") && (
                <button
                  type="button"
                  onClick={() =>
                    setMobileScrollMode((m) => (m === "frame" ? "expanded" : "frame"))
                  }
                  title={
                    mobileScrollMode === "frame"
                      ? "Rolagem interna do aparelho (clique para expandir com a página)"
                      : "Rolagem expandida com a página (clique para fixar no frame)"
                  }
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  {mobileScrollMode === "frame" ? (
                    <>
                      <SmartphoneNfc className="w-3 h-3 text-[#F4B400]" />
                      <span>Frame</span>
                    </>
                  ) : (
                    <>
                      <ScrollText className="w-3 h-3 text-[#F4B400]" />
                      <span>Expandido</span>
                    </>
                  )}
                </button>
              )}

              {/* Botão de Recolher Toolbar */}
              <div className="flex items-center gap-1 pl-1">
                <button
                  type="button"
                  onClick={() => setIsHeaderCollapsed(true)}
                  title="Recolher barra flutuante"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RENDERIZADOR DO SITE REAL */}
      {viewport === "desktop" ? (
        /* MODO DESKTOP REAL: 100% TELA CHEIA, EDGE-TO-EDGE, ROLAGEM NATURAL DA PÁGINA */
        <div
          className="w-full min-h-screen bg-[#09090B] text-zinc-100 flex flex-col"
          onClickCapture={handleDesktopAnchorClick}
        >
          <DynamicRenderer document={doc} isEditor={false} />
        </div>
      ) : viewport === "tablet" ? (
        /* MODO TABLET (768px): SIMULADOR ISOLADO COM PREVIEWFRAME (IFRAME) PARA DISPARAR MEDIA QUERIES REAIS */
        <div className="w-full min-h-screen bg-[#09090B] py-16 px-4 flex justify-center items-start">
          <div
            className={cn(
              "w-[768px] rounded-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.75)] overflow-hidden bg-zinc-950 flex flex-col transition-all",
              mobileScrollMode === "expanded"
                ? "min-h-[900px]"
                : "h-[920px] max-h-[88vh]"
            )}
          >
            <div className="flex-1 w-full h-full relative overflow-hidden">
              <PreviewFrame
                autoHeight={mobileScrollMode === "expanded"}
                className="w-full h-full"
              >
                <DynamicRenderer document={doc} isEditor={false} />
              </PreviewFrame>
            </div>
          </div>
        </div>
      ) : (
        /* MODO SMARTPHONE (412px): SIMULADOR ISOLADO COM PREVIEWFRAME (IFRAME) E NOTCH REAL */
        <div className="w-full min-h-screen bg-[#09090B] py-16 px-4 flex justify-center items-start">
          <div
            className={cn(
              "w-[412px] rounded-[3rem] border-[10px] border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.75)] overflow-hidden bg-zinc-950 flex flex-col transition-all",
              mobileScrollMode === "expanded"
                ? "min-h-[780px]"
                : "h-[850px] max-h-[88vh]"
            )}
          >
            {/* Notch superior simulado do aparelho */}
            <div className="bg-zinc-950 h-7 w-full flex items-center justify-between px-6 border-b border-white/5 shrink-0 z-20">
              <span className="text-[10px] font-mono font-bold text-zinc-500">9:41</span>
              <div className="w-20 h-3.5 rounded-full bg-zinc-900 border border-white/5" />
              <div className="w-3.5 h-2 rounded-xs border border-zinc-500/80" />
            </div>

            <div className="flex-1 w-full h-full relative overflow-hidden">
              <PreviewFrame
                autoHeight={mobileScrollMode === "expanded"}
                className="w-full h-full"
              >
                <DynamicRenderer document={doc} isEditor={false} />
              </PreviewFrame>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
