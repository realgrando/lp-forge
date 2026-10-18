import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BorderRadiusPreset, SurfaceStyle } from "@/types/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(prefix = "sec"): string {
  const random = Math.random().toString(36).substring(2, 9);
  const timestamp = Date.now().toString(36).slice(-4);
  return `${prefix}_${random}${timestamp}`;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function getRadiusClass(radius: BorderRadiusPreset = "md"): string {
  switch (radius) {
    case "none":
      return "rounded-none";
    case "sm":
      return "rounded-lg";
    case "md":
      return "rounded-2xl";
    case "lg":
      return "rounded-[2rem]";
    case "full":
      return "rounded-full";
    default:
      return "rounded-2xl";
  }
}

export function getSurfaceClasses(style: SurfaceStyle = "solid"): string {
  switch (style) {
    case "solid":
      return "bg-[var(--site-surface)] border border-white/5 shadow-sm";
    case "glass":
      return "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]";
    case "bordered":
      return "bg-transparent border border-white/15 hover:border-white/30 transition-colors";
    case "3d_floating":
      return "bg-[var(--site-surface)] border border-white/15 shadow-[0_8px_0_0_rgba(0,0,0,0.45),0_15px_30px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all";
    case "neon":
      return "bg-black/60 backdrop-blur-md border border-[var(--site-accent)] shadow-[0_0_25px_-5px_var(--site-accent)]";
    default:
      return "bg-[var(--site-surface)] border border-white/10";
  }
}
