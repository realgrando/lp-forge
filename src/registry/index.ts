import { SectionDefinition, SiteMode } from "@/types/site";

// Header (5 variações nativas)
import { HeaderClassicSection } from "./sections/header/HeaderClassic";
import { HeaderEnterpriseSection } from "./sections/header/HeaderEnterprise";
import { HeaderArtisanSection } from "./sections/header/HeaderArtisan";
import { HeaderCapsuleSection } from "./sections/header/HeaderCapsule";
import { NavbarModernSection } from "./sections/header/NavbarModern";

// Hero (4 variações nativas)
import { HeroImpactCenterSection } from "./sections/hero/HeroImpactCenter";
import { HeroSplitSection } from "./sections/hero/HeroSplit";
import { HeroCenteredSpotlightSection } from "./sections/hero/HeroCenteredSpotlight";
import { HeroLeadCaptureSection } from "./sections/hero/HeroLeadCapture";

// About / Sobre (4 variações nativas)
import { AboutClassicSplitSection } from "./sections/about/AboutClassicSplit";
import { AboutStorySection } from "./sections/about/AboutStory";
import { AboutFounderSection } from "./sections/about/AboutFounder";
import { AboutImpactSection } from "./sections/about/AboutImpact";

// Features / Recursos (3 variações nativas)
import { FeaturesClassicGridSection } from "./sections/features/FeaturesClassicGrid";
import { BentoGridSection } from "./sections/features/BentoGrid";
import { FeaturesImageCardsSection } from "./sections/features/FeaturesImageCards";

// Menu / Cardápio & Serviços (3 variações nativas)
import { MenuClassicListSection } from "./sections/menu/MenuClassicList";
import { MenuPhotoGridSection } from "./sections/menu/MenuPhotoGrid";
import { MenuVisualShowcaseSection } from "./sections/menu/MenuVisualShowcase";

// Process / Etapas (3 variações nativas)
import { ProcessStepsSection } from "./sections/process/ProcessStepsSection";
import { ProcessHorizontalSection } from "./sections/process/ProcessHorizontal";
import { ProcessEliteCardsSection } from "./sections/process/ProcessEliteCards";

// Stats / Estatísticas (3 variações nativas)
import { StatsGridSection } from "./sections/stats/StatsGridSection";
import { StatsAuthorityGridSection } from "./sections/stats/StatsAuthorityGrid";
import { StatsImpactBannerSection } from "./sections/stats/StatsImpactBanner";

// Before & After / Antes e Depois (2 variações nativas)
import { BeforeAfterSliderSection } from "./sections/beforeafter/BeforeAfterSlider";
import { BeforeAfterCardsSection } from "./sections/beforeafter/BeforeAfterCards";

// Content / Split & Multi-Grid (2 variações nativas)
import { SplitContentSection } from "./sections/content/SplitContentSection";
import { MultiGridSection } from "./sections/content/MultiGridSection";

// Narrative / Timeline, Comparação & Prêmios (3 variações nativas)
import { TimelineSection } from "./sections/narrative/TimelineSection";
import { ComparisonSection } from "./sections/comparison/ComparisonSection";
import { AwardsSection } from "./sections/narrative/AwardsSection";

// Gallery / Galeria de Fotos (3 variações nativas)
import { GalleryClassicGridSection } from "./sections/gallery/GalleryClassicGrid";
import { GalleryShowcaseSection } from "./sections/gallery/GalleryShowcase";
import { GalleryMasonrySection } from "./sections/gallery/GalleryMasonry";

// Portfolio / Cases, Reels & Hotspots (3 variações nativas)
import { PortfolioCaseStudySection } from "./sections/portfolio/PortfolioCaseStudy";
import { PortfolioVideoStoriesSection } from "./sections/portfolio/PortfolioVideoStories";
import { PortfolioHotspotsSection } from "./sections/portfolio/PortfolioHotspots";

// Testimonials / Depoimentos (5 variações nativas)
import { TestimonialsGridSection } from "./sections/testimonials/TestimonialsGridSection";
import { TestimonialsEditorialSection } from "./sections/testimonials/TestimonialsEditorial";
import { TestimonialsGoogleSection } from "./sections/testimonials/TestimonialsGoogle";
import { TestimonialsVideoSection } from "./sections/testimonials/TestimonialsVideo";
import { TestimonialsAuthoritySection } from "./sections/testimonials/TestimonialsAuthority";

// Trust / Logos & Selos de Confiança (3 variações nativas)
import { LogoCloudSection } from "./sections/trust/LogoCloudSection";
import { LogoCloudBentoSection } from "./sections/trust/LogoCloudBento";
import { TrustBadgesSection } from "./sections/trust/TrustBadgesSection";

// Team / Equipe (4 variações nativas)
import { TeamClassicGridSection } from "./sections/team/TeamClassicGrid";
import { TeamImpactCardsSection } from "./sections/team/TeamImpactCards";
import { TeamArtisanCircularSection } from "./sections/team/TeamArtisanCircular";
import { TeamBentoGridSection } from "./sections/team/TeamBentoGrid";

// Pricing / Planos & Preços (4 variações nativas)
import { PricingSection } from "./sections/pricing/PricingSection";
import { PricingBentoSection } from "./sections/pricing/PricingBento";
import { PricingEliteSection } from "./sections/pricing/PricingElite";
import { PricingMinimalistSection } from "./sections/pricing/PricingMinimalist";

// FAQ / Dúvidas Frequentes (3 variações nativas)
import { FaqAccordionSection } from "./sections/faq/FaqAccordionSection";
import { FaqSplitSection } from "./sections/faq/FaqSplitSection";
import { FaqModernGridSection } from "./sections/faq/FaqModernGrid";

// LeadGen / Captação & Quiz (2 variações nativas)
import { LeadStepFormSection } from "./sections/leadgen/LeadStepForm";
import { LeadMagnetSection } from "./sections/leadgen/LeadMagnetSection";

// Contact & Location / Contato & Localização (5 variações nativas)
import { ContactClassicSection } from "./sections/contact/ContactClassic";
import { ContactEliteSection } from "./sections/contact/ContactElite";
import { ContactSplitMapSection } from "./sections/contact/ContactSplitMap";
import { LocationSimpleMapSection } from "./sections/location/LocationSimpleMap";
import { LocationShowcaseSection } from "./sections/location/LocationShowcase";

// CTA & Dividers (3 variações nativas)
import { CtaBannerSection } from "./sections/cta/CtaBannerSection";
import { CtaImpactFullSection } from "./sections/cta/CtaImpactFull";
import { SectionDividerSection } from "./sections/dividers/SectionDivider";

// Footer / Rodapé (4 variações nativas)
import { FooterClassicSection } from "./sections/footer/FooterClassic";
import { FooterModernMultiColSection } from "./sections/footer/FooterModernMultiCol";
import { FooterCompactSection } from "./sections/footer/FooterCompact";
import { FooterSection } from "./sections/footer/FooterSection";

// Bio / Linktree 3D (4 variações nativas)
import { BioProfileHeaderSection } from "./sections/bio/BioProfileHeader";
import { BioSocialBarSection } from "./sections/bio/BioSocialBar";
import { BioLinkCardsSection } from "./sections/bio/BioLinkCards";
import { BioMediaHighlightSection } from "./sections/bio/BioMediaHighlight";

/**
 * Catálogo Central 100% Nativo v2 (65 Seções e Variações Padronizadas).
 * TODOS os componentes obedecem ao <SectionWrapper /> (Boxed/Full/Narrow/Mobile, Padding Y,
 * Surface Style, Border Radius, Ambient Glow), <EditableText /> (Tipografia fina),
 * <SmartButton /> e Opcionalidade Global (toggleableElements + optionalKey).
 */
export const SECTION_REGISTRY: Record<string, SectionDefinition<any>> = {
  // Header (5)
  [HeaderClassicSection.id]: HeaderClassicSection,
  [HeaderEnterpriseSection.id]: HeaderEnterpriseSection,
  [HeaderArtisanSection.id]: HeaderArtisanSection,
  [HeaderCapsuleSection.id]: HeaderCapsuleSection,
  [NavbarModernSection.id]: NavbarModernSection,

  // Hero (4)
  [HeroImpactCenterSection.id]: HeroImpactCenterSection,
  "hero.classic": HeroImpactCenterSection,
  [HeroSplitSection.id]: HeroSplitSection,
  [HeroCenteredSpotlightSection.id]: HeroCenteredSpotlightSection,
  [HeroLeadCaptureSection.id]: HeroLeadCaptureSection,

  // Sobre / About (5)
  [AboutClassicSplitSection.id]: AboutClassicSplitSection,
  [AboutStorySection.id]: AboutStorySection,
  [AboutFounderSection.id]: AboutFounderSection,
  [AboutImpactSection.id]: AboutImpactSection,
  [SplitContentSection.id]: SplitContentSection,

  // Features & Grids (4)
  [FeaturesClassicGridSection.id]: FeaturesClassicGridSection,
  [BentoGridSection.id]: BentoGridSection,
  [FeaturesImageCardsSection.id]: FeaturesImageCardsSection,
  [MultiGridSection.id]: MultiGridSection,

  // Cardápio & Catálogo de Serviços (3)
  [MenuClassicListSection.id]: MenuClassicListSection,
  [MenuPhotoGridSection.id]: MenuPhotoGridSection,
  [MenuVisualShowcaseSection.id]: MenuVisualShowcaseSection,

  // Processo & Etapas (3)
  [ProcessStepsSection.id]: ProcessStepsSection,
  [ProcessHorizontalSection.id]: ProcessHorizontalSection,
  [ProcessEliteCardsSection.id]: ProcessEliteCardsSection,

  // Estatísticas / Stats (3)
  [StatsGridSection.id]: StatsGridSection,
  [StatsAuthorityGridSection.id]: StatsAuthorityGridSection,
  [StatsImpactBannerSection.id]: StatsImpactBannerSection,

  // Antes & Depois (2)
  [BeforeAfterSliderSection.id]: BeforeAfterSliderSection,
  [BeforeAfterCardsSection.id]: BeforeAfterCardsSection,

  // Narrativa, Linha do Tempo, Comparação & Prêmios (3)
  [TimelineSection.id]: TimelineSection,
  [ComparisonSection.id]: ComparisonSection,
  [AwardsSection.id]: AwardsSection,

  // Galeria & Portfólio (6)
  [GalleryClassicGridSection.id]: GalleryClassicGridSection,
  [GalleryShowcaseSection.id]: GalleryShowcaseSection,
  [GalleryMasonrySection.id]: GalleryMasonrySection,
  [PortfolioCaseStudySection.id]: PortfolioCaseStudySection,
  [PortfolioVideoStoriesSection.id]: PortfolioVideoStoriesSection,
  [PortfolioHotspotsSection.id]: PortfolioHotspotsSection,

  // Depoimentos & Avaliações (5)
  [TestimonialsGridSection.id]: TestimonialsGridSection,
  [TestimonialsEditorialSection.id]: TestimonialsEditorialSection,
  [TestimonialsGoogleSection.id]: TestimonialsGoogleSection,
  [TestimonialsVideoSection.id]: TestimonialsVideoSection,
  [TestimonialsAuthoritySection.id]: TestimonialsAuthoritySection,

  // Prova Social, Logos & Selos (3)
  [LogoCloudSection.id]: LogoCloudSection,
  [LogoCloudBentoSection.id]: LogoCloudBentoSection,
  [TrustBadgesSection.id]: TrustBadgesSection,

  // Equipe / Team (4)
  [TeamClassicGridSection.id]: TeamClassicGridSection,
  [TeamImpactCardsSection.id]: TeamImpactCardsSection,
  [TeamArtisanCircularSection.id]: TeamArtisanCircularSection,
  [TeamBentoGridSection.id]: TeamBentoGridSection,

  // Planos & Preços (4)
  [PricingSection.id]: PricingSection,
  [PricingBentoSection.id]: PricingBentoSection,
  [PricingEliteSection.id]: PricingEliteSection,
  [PricingMinimalistSection.id]: PricingMinimalistSection,

  // FAQ / Dúvidas (3)
  [FaqAccordionSection.id]: FaqAccordionSection,
  [FaqSplitSection.id]: FaqSplitSection,
  [FaqModernGridSection.id]: FaqModernGridSection,

  // Captação & Leads (2)
  [LeadStepFormSection.id]: LeadStepFormSection,
  [LeadMagnetSection.id]: LeadMagnetSection,

  // Contato & Localização (5)
  [ContactClassicSection.id]: ContactClassicSection,
  [ContactEliteSection.id]: ContactEliteSection,
  [ContactSplitMapSection.id]: ContactSplitMapSection,
  [LocationSimpleMapSection.id]: LocationSimpleMapSection,
  [LocationShowcaseSection.id]: LocationShowcaseSection,

  // Conversão (CTA) & Divisores (3)
  [CtaBannerSection.id]: CtaBannerSection,
  [CtaImpactFullSection.id]: CtaImpactFullSection,
  [SectionDividerSection.id]: SectionDividerSection,

  // Footer / Rodapé (4)
  [FooterClassicSection.id]: FooterClassicSection,
  [FooterModernMultiColSection.id]: FooterModernMultiColSection,
  [FooterCompactSection.id]: FooterCompactSection,
  [FooterSection.id]: FooterSection,

  // Bio / Linktree 3D (4)
  [BioProfileHeaderSection.id]: BioProfileHeaderSection,
  [BioSocialBarSection.id]: BioSocialBarSection,
  [BioMediaHighlightSection.id]: BioMediaHighlightSection,
  [BioLinkCardsSection.id]: BioLinkCardsSection,
};

export function getSectionDefinition(
  type: string
): SectionDefinition<any> | undefined {
  return SECTION_REGISTRY[type];
}

export function getAllSections(): SectionDefinition<any>[] {
  const seen = new Set<string>();
  const list: SectionDefinition<any>[] = [];
  for (const sec of Object.values(SECTION_REGISTRY)) {
    if (!seen.has(sec.id)) {
      seen.add(sec.id);
      list.push(sec);
    }
  }
  return list;
}

export function getSectionsByMode(mode: SiteMode): SectionDefinition<any>[] {
  const seen = new Set<string>();
  return Object.values(SECTION_REGISTRY).filter((sec) => {
    if (seen.has(sec.id)) return false;
    seen.add(sec.id);
    return sec.modes.includes(mode);
  });
}

export function getCatalogCategories(): string[] {
  const categories = new Set<string>();
  getAllSections().forEach((sec) =>
    categories.add(sec.category)
  );
  return Array.from(categories);
}
