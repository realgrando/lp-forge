"use client";

import React from "react";
import { z } from "zod";
import { createSection } from "@/registry/factory";
import { EditableText } from "@/components/engine/EditableText";
import { BadgeCheck } from "lucide-react";

const bioProfileHeaderSchema = z.object({
  avatarUrl: z.string(),
  displayName: z.string(),
  handle: z.string(),
  bio: z.string(),
  location: z.string(),
  verified: z.boolean(),
});

export type BioProfileHeaderContent = z.infer<typeof bioProfileHeaderSchema>;

export const BioProfileHeaderSection = createSection<BioProfileHeaderContent>({
  id: "bio.profile",
  name: "Bio Header & Avatar 3D",
  description:
    "Cabeçalho de Linktree com avatar iluminado, selo de verificado, bio e badge de localização (todos 100% opcionais).",
  category: "Bio / Linktree",
  iconName: "UserCircle",
  modes: ["LINKTREE", "LANDING_PAGE"],
  toggleableElements: [
    { key: "avatarUrl", label: "Foto de Perfil / Avatar" },
    { key: "displayName", label: "Nome Principal" },
    { key: "verified", label: "Selo Verificado" },
    { key: "handle", label: "@Arroba / Cargo" },
    { key: "bio", label: "Biografia Curta" },
    { key: "location", label: "Badge de Localização" },
  ],
  contentSchema: bioProfileHeaderSchema,
  fields: [
    {
      key: "avatarUrl",
      label: "URL da Foto / Avatar",
      type: "url",
      optionalKey: "avatarUrl",
    },
    {
      key: "displayName",
      label: "Nome de Exibição",
      type: "text",
      optionalKey: "displayName",
      typographyElementKey: "displayName",
    },
    {
      key: "verified",
      label: "Exibir Selo Verificado",
      type: "toggle",
      optionalKey: "verified",
    },
    {
      key: "handle",
      label: "@Arroba / Cargo",
      type: "text",
      optionalKey: "handle",
      typographyElementKey: "handle",
    },
    {
      key: "bio",
      label: "Biografia Curta",
      type: "textarea",
      optionalKey: "bio",
      typographyElementKey: "bio",
    },
    {
      key: "location",
      label: "Badge de Localização / Status",
      type: "text",
      optionalKey: "location",
      isBadge: true,
      typographyElementKey: "location",
    },
  ],
  defaultData: {
    layout: {
      paddingY: "compact",
      containerWidth: "mobile",
    },
    styles: {
      ambientGlow: true,
      hiddenElements: {},
    },
    content: {
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      displayName: "Nivix Studio",
      handle: "@nivix.company",
      bio: "Engenharia de Software, Páginas de Alta Conversão & Ecossistemas Digitais sob medida.",
      location: "Miami • São Paulo",
      verified: true,
    },
  },
  Component: ({ content, styles, theme }) => {
    const accentColor = styles.customAccent || theme.palette.accent;
    const hidden = styles.hiddenElements || {};

    return (
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar com Anel de Destaque (Opcional) */}
        {!hidden.avatarUrl && content.avatarUrl && (
          <div className="relative group">
            <div
              className="absolute -inset-1 rounded-full blur-md opacity-60 transition duration-500 group-hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            />
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border-2 p-0.5 bg-zinc-950"
              style={{ borderColor: accentColor }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.avatarUrl}
                alt={content.displayName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        )}

        {/* Nome + Selo Verificado + Handle */}
        <div className="space-y-1">
          {!hidden.displayName && (
            <div className="flex items-center justify-center gap-1.5">
              <EditableText
                as="h1"
                defaultIsHeading
                value={content.displayName}
                elementKey="displayName"
                styles={styles}
                className="text-2xl font-black tracking-tight"
              />
              {content.verified && !hidden.verified && (
                <BadgeCheck
                  className="w-5 h-5 shrink-0"
                  style={{ color: accentColor }}
                />
              )}
            </div>
          )}

          {!hidden.handle && content.handle && (
            <EditableText
              as="p"
              value={content.handle}
              elementKey="handle"
              styles={styles}
              className="text-xs font-mono opacity-60"
            />
          )}
        </div>

        {/* Bio */}
        <EditableText
          as="p"
          value={content.bio}
          elementKey="bio"
          styles={styles}
          className="text-sm opacity-80 max-w-xs leading-relaxed"
        />

        {/* Localização (Badge Micro-Customizável) */}
        <EditableText
          isBadge
          defaultIconName="MapPin"
          accentColor={accentColor}
          value={content.location}
          elementKey="location"
          styles={styles}
        />
      </div>
    );
  },
});
