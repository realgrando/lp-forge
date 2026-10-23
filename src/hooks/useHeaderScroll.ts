"use client";

import { useState, useEffect, useRef } from "react";
import { HeaderScrollBehavior, HeaderScrollVisibility } from "@/types/site";

export function useHeaderScroll(
  behaviorOrVisibility: HeaderScrollBehavior | HeaderScrollVisibility = "fixed",
  isSticky = true
) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isAutoHide = behaviorOrVisibility === "auto_hide";
  const isStatic =
    behaviorOrVisibility === "static" || (!isSticky && behaviorOrVisibility === "fixed");

  useEffect(() => {
    if (isStatic) {
      setIsScrolled(false);
      setIsVisible(true);
      setScrollDirection(null);
      setIsScrollingUp(false);
      setCurrentScrollY(0);
      return;
    }

    const checkScroll = () => {
      // 1. Scroll da janela principal
      const winY =
        typeof window !== "undefined"
          ? window.scrollY || document.documentElement?.scrollTop || 0
          : 0;

      // 2. Scroll do canvas interno do Studio (main.overflow-y-auto)
      const canvasEl = document.querySelector("main.overflow-y-auto") as HTMLElement | null;
      const canvasY = canvasEl ? canvasEl.scrollTop : 0;

      // 3. Scroll de container parente de preview
      const previewMount = document.getElementById("preview-mount");
      const previewParentY = previewMount?.parentElement?.scrollTop || 0;

      const currentScroll = Math.max(winY, canvasY, previewParentY);
      const prevY = lastScrollYRef.current;
      const diff = currentScroll - prevY;

      setCurrentScrollY(currentScroll);

      // Ativa estado Scrolled após 20px
      const scrolledNow = currentScroll > 20;
      setIsScrolled(scrolledNow);

      // Direção e Intenção de Navegação (Suave com limiar de 6px)
      if (currentScroll <= 24) {
        setIsVisible(true);
        setScrollDirection(null);
        setIsScrollingUp(false);
      } else if (Math.abs(diff) >= 6) {
        if (diff < 0) {
          // Rolando para CIMA (intenção de leitura/menu)
          setScrollDirection("up");
          setIsScrollingUp(true);
          setIsVisible(true);
        } else {
          // Rolando para BAIXO (consumindo conteúdo)
          setScrollDirection("down");
          setIsScrollingUp(false);
          if (isAutoHide && currentScroll > 60) {
            setIsVisible(false);
          }
        }
      }

      lastScrollYRef.current = currentScroll;
    };

    const handleScroll = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(checkScroll);
    };

    // Leitura inicial
    checkScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    const canvasEl = document.querySelector("main.overflow-y-auto");
    if (canvasEl) {
      canvasEl.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      if (canvasEl) {
        canvasEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [behaviorOrVisibility, isSticky, isAutoHide, isStatic]);

  return {
    isScrolled,
    isVisible,
    scrollDirection,
    isScrollingUp,
    currentScroll: currentScrollY,
  };
}
