"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PreviewFrameProps {
  children: React.ReactNode;
  autoHeight?: boolean;
  className?: string;
  onNavigateAnchor?: (anchorId: string) => void;
}

/**
 * PreviewFrame: Renderizador Isolado de Viewport para Simulação Real Mobile / Tablet.
 *
 * Por que é necessário:
 * O Tailwind CSS utiliza media queries nativas (@media (min-width: 768px)).
 * Uma div com `w-[412px]` dentro de uma janela desktop de 1920px continua tendo
 * `window.innerWidth === 1920px`, fazendo com que regras como `md:hidden` ou `hidden md:flex`
 * NÃO ativem a versão mobile real, mas apenas comprimam o desktop.
 *
 * Ao montar a prévia dentro de um <iframe> com largura física de 412px ou 768px:
 * O contexto de navegação interna tem `window.innerWidth = 412px`.
 * Todas as classes mobile-first (`md:`, `sm:`, hamburger, gaveta mobile, grids e botões)
 * ativam com 100% de autenticidade, exatamente como em um smartphone ou tablet real.
 */
export const PreviewFrame: React.FC<PreviewFrameProps> = ({
  children,
  autoHeight = false,
  className = "",
  onNavigateAnchor,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  // Sincroniza folhas de estilo e fontes do documento pai para o iframe
  const syncStyles = useCallback((targetDoc: Document) => {
    if (!targetDoc || !targetDoc.head) return;

    // 1. Limpa estilos injetados previamente para evitar duplicatas em re-sincronizações
    const existingSync = targetDoc.head.querySelectorAll("[data-preview-sync]");
    existingSync.forEach((el) => el.remove());

    // 2. Clona tags <link rel="stylesheet">, <link rel="preconnect"> e <style>
    const parentHeadElements = document.head.querySelectorAll(
      "link[rel='stylesheet'], link[rel='preconnect'], link[rel='preload'], style"
    );

    parentHeadElements.forEach((node) => {
      const clone = node.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-preview-sync", "true");
      targetDoc.head.appendChild(clone);
    });

    // 3. Clona atributos e classes das tags html e body (ex: classes do Next.js e Tailwind Dark Mode)
    targetDoc.documentElement.className = document.documentElement.className || "dark";
    targetDoc.documentElement.style.cssText =
      document.documentElement.style.cssText + "; scroll-behavior: smooth;";

    targetDoc.body.className =
      "bg-[#09090B] text-zinc-100 overflow-x-hidden m-0 p-0 selection:bg-[#F4B400]/30 selection:text-white antialiased font-sans";
    targetDoc.body.style.cssText =
      "margin: 0; padding: 0; background: #09090B; color: #F4F4F5; min-height: 100%;";
  }, []);

  const handleIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    syncStyles(doc);

    // Garante ou localiza o elemento de montagem
    let mount = doc.getElementById("preview-mount");
    if (!mount) {
      mount = doc.createElement("div");
      mount.id = "preview-mount";
      mount.className = "min-h-full w-full flex flex-col";
      doc.body.appendChild(mount);
    }

    setMountNode(mount);

    // Intercepta cliques em âncoras locais (#sobre, #contato) para rolagem suave autêntica dentro do iframe
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const anchorId = href.slice(1);
        const targetEl = doc.getElementById(anchorId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
        if (onNavigateAnchor) {
          onNavigateAnchor(anchorId);
        }
      }
    };

    doc.addEventListener("click", handleAnchorClick);

    return () => {
      doc.removeEventListener("click", handleAnchorClick);
    };
  }, [syncStyles, onNavigateAnchor]);

  // Observer no document.head do pai para replicar estilos injetados dinamicamente (HMR do Next.js / Tailwind)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const iframe = iframeRef.current;
      const doc = iframe?.contentDocument;
      if (doc) {
        syncStyles(doc);
      }
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [syncStyles]);

  // Ajuste automático de altura caso modo expandido esteja ativo
  useEffect(() => {
    if (!autoHeight || !mountNode) {
      if (iframeRef.current) {
        iframeRef.current.style.height = "100%";
      }
      return;
    }

    const updateHeight = () => {
      const iframe = iframeRef.current;
      const doc = iframe?.contentDocument;
      if (!iframe || !doc || !doc.body) return;

      const newHeight = Math.max(
        mountNode.scrollHeight,
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight
      );

      iframe.style.height = `${newHeight}px`;
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(mountNode);

    return () => resizeObserver.disconnect();
  }, [autoHeight, mountNode, children]);

  return (
    <iframe
      ref={iframeRef}
      onLoad={handleIframeLoad}
      title="Preview Frame Isolado"
      srcDoc="<!DOCTYPE html><html class='dark' style='scroll-behavior: smooth;'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1.0'/></head><body style='margin:0;padding:0;background:#09090B;'><div id='preview-mount'></div></body></html>"
      className={`w-full border-0 bg-transparent block ${className}`}
      style={{
        height: autoHeight ? "auto" : "100%",
        minHeight: "100%",
      }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
