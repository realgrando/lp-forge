"use client";

import React from "react";

// About
import About_V1, { metadata as About_V1_Meta, schema as About_V1_Schema } from "./About/About_V1";
import About_V2, { metadata as About_V2_Meta, schema as About_V2_Schema } from "./About/About_V2_Story";
import About_V3, { metadata as About_V3_Meta, schema as About_V3_Schema } from "./About/About_V3_Founder";
import About_V4, { metadata as About_V4_Meta, schema as About_V4_Schema } from "./About/About_V4_Impact";

// BeforeAfter
import BeforeAfter_V1, { metadata as BeforeAfter_V1_Meta, schema as BeforeAfter_V1_Schema } from "./BeforeAfter/BeforeAfter_V1";
import BeforeAfter_V2, { metadata as BeforeAfter_V2_Meta, schema as BeforeAfter_V2_Schema } from "./BeforeAfter/BeforeAfter_V2_Cards";

// Contact
import Contact_V1, { metadata as Contact_V1_Meta, schema as Contact_V1_Schema } from "./Contact/Contact_V1";
import Contact_V2, { metadata as Contact_V2_Meta, schema as Contact_V2_Schema } from "./Contact/Contact_V2_Elite";
import Contact_V3, { metadata as Contact_V3_Meta, schema as Contact_V3_Schema } from "./Contact/Contact_V3_SplitMap";

// CTA
import CTA_V1, { metadata as CTA_V1_Meta, schema as CTA_V1_Schema } from "./CTA/CTA_V1";
import CTA_V2, { metadata as CTA_V2_Meta, schema as CTA_V2_Schema } from "./CTA/CTA_V2_Impact";

// Dividers
import SectionDivider_V1, { metadata as SectionDivider_V1_Meta, schema as SectionDivider_V1_Schema } from "./Dividers/SectionDivider_V1";

// FAQ
import FAQ_V1, { metadata as FAQ_V1_Meta, schema as FAQ_V1_Schema } from "./FAQ/FAQ_V1";
import FAQ_V2, { metadata as FAQ_V2_Meta, schema as FAQ_V2_Schema } from "./FAQ/FAQ_V2";
import FAQ_V3, { metadata as FAQ_V3_Meta, schema as FAQ_V3_Schema } from "./FAQ/FAQ_V3_ModernGrid";

// Features
import Features_V1, { metadata as Features_V1_Meta, schema as Features_V1_Schema } from "./Features/Features_V1";
import Features_V2, { metadata as Features_V2_Meta, schema as Features_V2_Schema } from "./Features/Features_V2_Bento";
import Features_V3, { metadata as Features_V3_Meta, schema as Features_V3_Schema } from "./Features/Features_V3_ImageCards";

// Footer
import Footer_V1, { metadata as Footer_V1_Meta, schema as Footer_V1_Schema } from "./Footer/Footer_V1";
import Footer_V2, { metadata as Footer_V2_Meta, schema as Footer_V2_Schema } from "./Footer/Footer_V2_Modern";
import Footer_V3, { metadata as Footer_V3_Meta, schema as Footer_V3_Schema } from "./Footer/Footer_V3_Compact";
import Footer_V4, { metadata as Footer_V4_Meta, schema as Footer_V4_Schema } from "./Footer/Footer_V4_Minimal";

// Gallery
import Gallery_V1, { metadata as Gallery_V1_Meta, schema as Gallery_V1_Schema } from "./Gallery/Gallery_V1";
import Gallery_V2, { metadata as Gallery_V2_Meta, schema as Gallery_V2_Schema } from "./Gallery/Gallery_V2";
import Gallery_V3, { metadata as Gallery_V3_Meta, schema as Gallery_V3_Schema } from "./Gallery/Gallery_V3_Masonry";

// Grid
import Grid_V1, { metadata as Grid_V1_Meta, schema as Grid_V1_Schema } from "./Grid/Grid_V1";

// Header
import Header_V1, { metadata as Header_V1_Meta, schema as Header_V1_Schema } from "./Header/Header_V1";
import Header_V2, { metadata as Header_V2_Meta, schema as Header_V2_Schema } from "./Header/Header_V2_Enterprise";
import Header_V3, { metadata as Header_V3_Meta, schema as Header_V3_Schema } from "./Header/Header_V3_Artisan";
import Header_V4, { metadata as Header_V4_Meta, schema as Header_V4_Schema } from "./Header/Header_V4_Capsule";

// Hero
import Hero_V1, { metadata as Hero_V1_Meta, schema as Hero_V1_Schema } from "./Hero/Hero_V1";
import Hero_V2, { metadata as Hero_V2_Meta, schema as Hero_V2_Schema } from "./Hero/Hero_V2_Split";
import Hero_V3, { metadata as Hero_V3_Meta, schema as Hero_V3_Schema } from "./Hero/Hero_V3_GlassSpotlight";
import Hero_V4, { metadata as Hero_V4_Meta, schema as Hero_V4_Schema } from "./Hero/Hero_V4_LeadCapture";

// LeadGen
import StepForm_V1, { metadata as StepForm_V1_Meta, schema as StepForm_V1_Schema } from "./LeadGen/StepForm_V1";
import LeadMagnet_V1, { metadata as LeadMagnet_V1_Meta, schema as LeadMagnet_V1_Schema } from "./LeadGen/LeadMagnet_V1";

// Location
import Location_V1, { metadata as Location_V1_Meta, schema as Location_V1_Schema } from "./Location/Location_V1";
import Location_V2, { metadata as Location_V2_Meta, schema as Location_V2_Schema } from "./Location/Location_V2_Showcase";

// LogoCloud
import LogoCloud_V1, { metadata as LogoCloud_V1_Meta, schema as LogoCloud_V1_Schema } from "./LogoCloud/LogoCloud_V1";
import LogoCloud_V2, { metadata as LogoCloud_V2_Meta, schema as LogoCloud_V2_Schema } from "./LogoCloud/LogoCloud_V2";

// Menu
import Menu_V1, { metadata as Menu_V1_Meta, schema as Menu_V1_Schema } from "./Menu/Menu_V1";
import Menu_V2, { metadata as Menu_V2_Meta, schema as Menu_V2_Schema } from "./Menu/Menu_V2";
import Menu_V3, { metadata as Menu_V3_Meta, schema as Menu_V3_Schema } from "./Menu/Menu_V3_ImageGrid";

// Narrative
import Awards_V1, { metadata as Awards_V1_Meta, schema as Awards_V1_Schema } from "./Narrative/Awards_V1";
import Comparison_V1, { metadata as Comparison_V1_Meta, schema as Comparison_V1_Schema } from "./Narrative/Comparison_V1";
import Timeline_V1, { metadata as Timeline_V1_Meta, schema as Timeline_V1_Schema } from "./Narrative/Timeline_V1";

// Portfolio
import ProjectCase_V1, { metadata as ProjectCase_V1_Meta, schema as ProjectCase_V1_Schema } from "./Portfolio/ProjectCase_V1";
import Showcase_Hotspots_V1, { metadata as Showcase_Hotspots_V1_Meta, schema as Showcase_Hotspots_V1_Schema } from "./Portfolio/Showcase_Hotspots_V1";
import VideoStories_V1, { metadata as VideoStories_V1_Meta, schema as VideoStories_V1_Schema } from "./Portfolio/VideoStories_V1";

// Pricing
import Pricing_V1, { metadata as Pricing_V1_Meta, schema as Pricing_V1_Schema } from "./Pricing/Pricing_V1";
import Pricing_V2, { metadata as Pricing_V2_Meta, schema as Pricing_V2_Schema } from "./Pricing/Pricing_V2_Bento";
import Pricing_V3, { metadata as Pricing_V3_Meta, schema as Pricing_V3_Schema } from "./Pricing/Pricing_V3_Elite";
import Pricing_V4, { metadata as Pricing_V4_Meta, schema as Pricing_V4_Schema } from "./Pricing/Pricing_V4_Minimalist";

// Process
import Process_V1, { metadata as Process_V1_Meta, schema as Process_V1_Schema } from "./Process/Process_V1";
import Process_V2, { metadata as Process_V2_Meta, schema as Process_V2_Schema } from "./Process/Process_V2";
import Process_V3, { metadata as Process_V3_Meta, schema as Process_V3_Schema } from "./Process/Process_V3_EliteCards";

// SplitContent
import SplitContent_V1, { metadata as SplitContent_V1_Meta, schema as SplitContent_V1_Schema } from "./SplitContent/SplitContent_V1";

// Stats
import Stats_V1, { metadata as Stats_V1_Meta, schema as Stats_V1_Schema } from "./Stats/Stats_V1";
import Stats_V2, { metadata as Stats_V2_Meta, schema as Stats_V2_Schema } from "./Stats/Stats_V2_AuthorityGrid";
import Stats_V3, { metadata as Stats_V3_Meta, schema as Stats_V3_Schema } from "./Stats/Stats_V3_Impact";

// Team
import Team_V1, { metadata as Team_V1_Meta, schema as Team_V1_Schema } from "./Team/Team_V1";
import Team_V2, { metadata as Team_V2_Meta, schema as Team_V2_Schema } from "./Team/Team_V2_Impact";
import Team_V3, { metadata as Team_V3_Meta, schema as Team_V3_Schema } from "./Team/Team_V3_Artisan";
import Team_V4, { metadata as Team_V4_Meta, schema as Team_V4_Schema } from "./Team/Team_V4_Bento";

// Testimonials
import Testimonials_V1, { metadata as Testimonials_V1_Meta, schema as Testimonials_V1_Schema } from "./Testimonials/Testimonials_V1";
import Testimonials_V2, { metadata as Testimonials_V2_Meta, schema as Testimonials_V2_Schema } from "./Testimonials/Testimonials_V2";
import Testimonials_V3, { metadata as Testimonials_V3_Meta, schema as Testimonials_V3_Schema } from "./Testimonials/Testimonials_V3_Google";
import Testimonials_V4, { metadata as Testimonials_V4_Meta, schema as Testimonials_V4_Schema } from "./Testimonials/Testimonials_V4_Video";
import Testimonials_V5, { metadata as Testimonials_V5_Meta, schema as Testimonials_V5_Schema } from "./Testimonials/Testimonials_V5_Authority";

// TrustBadges
import TrustBadges_V1, { metadata as TrustBadges_V1_Meta, schema as TrustBadges_V1_Schema } from "./TrustBadges/TrustBadges_V1";

export interface LegacyFieldItem {
  key?: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
  itemFields?: LegacyFieldItem[];
  fields?: LegacyFieldItem[];
  condition?: string;
  default?: any;
  min?: number;
  max?: number;
  step?: number;
}

export interface LegacySchemaGroup {
  group: string;
  fields: LegacyFieldItem[];
}

export interface LegacyVariantEntry {
  component: React.ComponentType<any>;
  label: string;
  schema: LegacySchemaGroup[];
  defaultData: Record<string, any>;
  variant: string;
  type: string;
}

export interface LegacyBlockTypeGroup {
  default: string;
  variants: Record<string, LegacyVariantEntry>;
}

const RAW_MODULES = [
  // Header (4)
  { component: Header_V1, metadata: Header_V1_Meta, schema: Header_V1_Schema },
  { component: Header_V2, metadata: Header_V2_Meta, schema: Header_V2_Schema },
  { component: Header_V3, metadata: Header_V3_Meta, schema: Header_V3_Schema },
  { component: Header_V4, metadata: Header_V4_Meta, schema: Header_V4_Schema },
  // Hero (4)
  { component: Hero_V1, metadata: Hero_V1_Meta, schema: Hero_V1_Schema },
  { component: Hero_V2, metadata: Hero_V2_Meta, schema: Hero_V2_Schema },
  { component: Hero_V3, metadata: Hero_V3_Meta, schema: Hero_V3_Schema },
  { component: Hero_V4, metadata: Hero_V4_Meta, schema: Hero_V4_Schema },
  // About (4)
  { component: About_V1, metadata: About_V1_Meta, schema: About_V1_Schema },
  { component: About_V2, metadata: About_V2_Meta, schema: About_V2_Schema },
  { component: About_V3, metadata: About_V3_Meta, schema: About_V3_Schema },
  { component: About_V4, metadata: About_V4_Meta, schema: About_V4_Schema },
  // Features (3)
  { component: Features_V1, metadata: Features_V1_Meta, schema: Features_V1_Schema },
  { component: Features_V2, metadata: Features_V2_Meta, schema: Features_V2_Schema },
  { component: Features_V3, metadata: Features_V3_Meta, schema: Features_V3_Schema },
  // Services / Menu (3)
  { component: Menu_V1, metadata: Menu_V1_Meta, schema: Menu_V1_Schema },
  { component: Menu_V2, metadata: Menu_V2_Meta, schema: Menu_V2_Schema },
  { component: Menu_V3, metadata: Menu_V3_Meta, schema: Menu_V3_Schema },
  // Stats (3)
  { component: Stats_V1, metadata: Stats_V1_Meta, schema: Stats_V1_Schema },
  { component: Stats_V2, metadata: Stats_V2_Meta, schema: Stats_V2_Schema },
  { component: Stats_V3, metadata: Stats_V3_Meta, schema: Stats_V3_Schema },
  // Process (3)
  { component: Process_V1, metadata: Process_V1_Meta, schema: Process_V1_Schema },
  { component: Process_V2, metadata: Process_V2_Meta, schema: Process_V2_Schema },
  { component: Process_V3, metadata: Process_V3_Meta, schema: Process_V3_Schema },
  // BeforeAfter (2)
  { component: BeforeAfter_V1, metadata: BeforeAfter_V1_Meta, schema: BeforeAfter_V1_Schema },
  { component: BeforeAfter_V2, metadata: BeforeAfter_V2_Meta, schema: BeforeAfter_V2_Schema },
  // SplitContent (1)
  { component: SplitContent_V1, metadata: SplitContent_V1_Meta, schema: SplitContent_V1_Schema },
  // Grid (1)
  { component: Grid_V1, metadata: Grid_V1_Meta, schema: Grid_V1_Schema },
  // Narrative (3)
  { component: Timeline_V1, metadata: Timeline_V1_Meta, schema: Timeline_V1_Schema },
  { component: Comparison_V1, metadata: Comparison_V1_Meta, schema: Comparison_V1_Schema },
  { component: Awards_V1, metadata: Awards_V1_Meta, schema: Awards_V1_Schema },
  // Gallery (3)
  { component: Gallery_V1, metadata: Gallery_V1_Meta, schema: Gallery_V1_Schema },
  { component: Gallery_V2, metadata: Gallery_V2_Meta, schema: Gallery_V2_Schema },
  { component: Gallery_V3, metadata: Gallery_V3_Meta, schema: Gallery_V3_Schema },
  // Portfolio (3)
  { component: ProjectCase_V1, metadata: ProjectCase_V1_Meta, schema: ProjectCase_V1_Schema },
  { component: VideoStories_V1, metadata: VideoStories_V1_Meta, schema: VideoStories_V1_Schema },
  { component: Showcase_Hotspots_V1, metadata: Showcase_Hotspots_V1_Meta, schema: Showcase_Hotspots_V1_Schema },
  // Testimonials (5)
  { component: Testimonials_V1, metadata: Testimonials_V1_Meta, schema: Testimonials_V1_Schema },
  { component: Testimonials_V2, metadata: Testimonials_V2_Meta, schema: Testimonials_V2_Schema },
  { component: Testimonials_V3, metadata: Testimonials_V3_Meta, schema: Testimonials_V3_Schema },
  { component: Testimonials_V4, metadata: Testimonials_V4_Meta, schema: Testimonials_V4_Schema },
  { component: Testimonials_V5, metadata: Testimonials_V5_Meta, schema: Testimonials_V5_Schema },
  // LogoCloud (2)
  { component: LogoCloud_V1, metadata: LogoCloud_V1_Meta, schema: LogoCloud_V1_Schema },
  { component: LogoCloud_V2, metadata: LogoCloud_V2_Meta, schema: LogoCloud_V2_Schema },
  // TrustBadges (1)
  { component: TrustBadges_V1, metadata: TrustBadges_V1_Meta, schema: TrustBadges_V1_Schema },
  // Team (4)
  { component: Team_V1, metadata: Team_V1_Meta, schema: Team_V1_Schema },
  { component: Team_V2, metadata: Team_V2_Meta, schema: Team_V2_Schema },
  { component: Team_V3, metadata: Team_V3_Meta, schema: Team_V3_Schema },
  { component: Team_V4, metadata: Team_V4_Meta, schema: Team_V4_Schema },
  // Pricing (4)
  { component: Pricing_V1, metadata: Pricing_V1_Meta, schema: Pricing_V1_Schema },
  { component: Pricing_V2, metadata: Pricing_V2_Meta, schema: Pricing_V2_Schema },
  { component: Pricing_V3, metadata: Pricing_V3_Meta, schema: Pricing_V3_Schema },
  { component: Pricing_V4, metadata: Pricing_V4_Meta, schema: Pricing_V4_Schema },
  // FAQ (3)
  { component: FAQ_V1, metadata: FAQ_V1_Meta, schema: FAQ_V1_Schema },
  { component: FAQ_V2, metadata: FAQ_V2_Meta, schema: FAQ_V2_Schema },
  { component: FAQ_V3, metadata: FAQ_V3_Meta, schema: FAQ_V3_Schema },
  // LeadGen (2)
  { component: StepForm_V1, metadata: StepForm_V1_Meta, schema: StepForm_V1_Schema },
  { component: LeadMagnet_V1, metadata: LeadMagnet_V1_Meta, schema: LeadMagnet_V1_Schema },
  // Contact (3)
  { component: Contact_V1, metadata: Contact_V1_Meta, schema: Contact_V1_Schema },
  { component: Contact_V2, metadata: Contact_V2_Meta, schema: Contact_V2_Schema },
  { component: Contact_V3, metadata: Contact_V3_Meta, schema: Contact_V3_Schema },
  // Location (2)
  { component: Location_V1, metadata: Location_V1_Meta, schema: Location_V1_Schema },
  { component: Location_V2, metadata: Location_V2_Meta, schema: Location_V2_Schema },
  // CTA (2)
  { component: CTA_V1, metadata: CTA_V1_Meta, schema: CTA_V1_Schema },
  { component: CTA_V2, metadata: CTA_V2_Meta, schema: CTA_V2_Schema },
  // Dividers (1)
  { component: SectionDivider_V1, metadata: SectionDivider_V1_Meta, schema: SectionDivider_V1_Schema },
  // Footer (4)
  { component: Footer_V1, metadata: Footer_V1_Meta, schema: Footer_V1_Schema },
  { component: Footer_V2, metadata: Footer_V2_Meta, schema: Footer_V2_Schema },
  { component: Footer_V3, metadata: Footer_V3_Meta, schema: Footer_V3_Schema },
  { component: Footer_V4, metadata: Footer_V4_Meta, schema: Footer_V4_Schema },
];

export const BLOCK_LIBRARY: Record<string, LegacyBlockTypeGroup> = {};

for (const mod of RAW_MODULES) {
  const { type, variant, label, defaultData } = mod.metadata as any;
  const normalizedType = String(type).toLowerCase();

  if (!BLOCK_LIBRARY[normalizedType]) {
    BLOCK_LIBRARY[normalizedType] = {
      default: variant,
      variants: {},
    };
  }

  BLOCK_LIBRARY[normalizedType].variants[variant] = {
    component: mod.component,
    label,
    schema: (mod.schema || []) as LegacySchemaGroup[],
    defaultData: defaultData || {},
    variant,
    type: normalizedType,
  };
}
