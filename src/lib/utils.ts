import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BorderRadiusPreset, HeaderSurfaceType, SurfaceStyle } from "@/types/site";

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

export function getLogoRadiusClass(radius?: BorderRadiusPreset | string): string {
  switch (radius) {
    case "none":
      return "rounded-none";
    case "sm":
      return "rounded-md";
    case "md":
      return "rounded-lg";
    case "lg":
      return "rounded-xl";
    case "full":
      return "rounded-full";
    default:
      return "rounded-none";
  }
}

export function getSurfaceClasses(style: SurfaceStyle = "solid"): string {
  switch (style) {
    case "solid":
      return "bg-zinc-950 shadow-md";
    case "glass":
      return "bg-zinc-950/75 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)]";
    case "bordered":
      return "bg-zinc-950/40 backdrop-blur-md shadow-sm";
    case "3d_floating":
      return "bg-zinc-950 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)]";
    case "neon":
      return "bg-zinc-950/90 backdrop-blur-xl shadow-[0_0_24px_-4px_var(--site-accent)]";
    default:
      return "bg-zinc-950 shadow-md";
  }
}

export function getHeaderSurfaceClasses(surface: HeaderSurfaceType = "solid"): string {
  switch (surface) {
    case "transparent":
      return "bg-transparent border-0 border-transparent shadow-none";
    case "solid":
      return "bg-zinc-950 shadow-md";
    case "glass":
      return "bg-zinc-950/75 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)]";
    case "bordered":
      return "bg-zinc-950/40 backdrop-blur-md shadow-sm";
    case "3d_floating":
      return "bg-zinc-950 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)]";
    case "neon":
      return "bg-zinc-950/90 backdrop-blur-xl shadow-[0_0_24px_-4px_var(--site-accent)]";
    default:
      return "bg-zinc-950 shadow-md";
  }
}
