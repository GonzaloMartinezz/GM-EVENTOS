export interface SiteSettings {
  _id?: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;

  sectionCategoriesEyebrow: string;
  sectionCategoriesTitle: string;
  categoryDescriptions: Record<string, string>;

  sectionLineupEyebrow: string;
  sectionLineupTitle: string;

  sectionCalendarEyebrow: string;
  sectionCalendarTitle: string;

  ctaEyebrow: string;
  ctaTitle: string;
  ctaButtonLabel: string;

  footerText: string;
}
