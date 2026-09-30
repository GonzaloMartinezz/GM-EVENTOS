import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import SiteSettings, { SINGLETON_KEY } from '../models/SiteSettings';

/** Devuelve el documento de configuración, creándolo con los valores default si todavía no existe */
async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne({ key: SINGLETON_KEY });
  if (!settings) {
    settings = await SiteSettings.create({ key: SINGLETON_KEY });
  }
  return settings;
}

// GET /api/settings (público, lo consume la home)
export const getSettings = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await getOrCreateSettings();
  res.json(settings);
});

// PUT /api/admin/settings (protegido, lo usa el panel admin)
export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await getOrCreateSettings();

  // Solo permitimos editar los campos de contenido, nunca _id/timestamps
  const {
    heroEyebrow,
    heroTitleLine1,
    heroTitleAccent,
    heroSubtitle,
    heroPrimaryCta,
    heroSecondaryCta,
    sectionCategoriesEyebrow,
    sectionCategoriesTitle,
    categoryDescriptions,
    sectionLineupEyebrow,
    sectionLineupTitle,
    sectionCalendarEyebrow,
    sectionCalendarTitle,
    ctaEyebrow,
    ctaTitle,
    ctaButtonLabel,
    footerText,
  } = req.body;

  Object.assign(settings, {
    ...(heroEyebrow !== undefined && { heroEyebrow }),
    ...(heroTitleLine1 !== undefined && { heroTitleLine1 }),
    ...(heroTitleAccent !== undefined && { heroTitleAccent }),
    ...(heroSubtitle !== undefined && { heroSubtitle }),
    ...(heroPrimaryCta !== undefined && { heroPrimaryCta }),
    ...(heroSecondaryCta !== undefined && { heroSecondaryCta }),
    ...(sectionCategoriesEyebrow !== undefined && { sectionCategoriesEyebrow }),
    ...(sectionCategoriesTitle !== undefined && { sectionCategoriesTitle }),
    ...(categoryDescriptions !== undefined && { categoryDescriptions }),
    ...(sectionLineupEyebrow !== undefined && { sectionLineupEyebrow }),
    ...(sectionLineupTitle !== undefined && { sectionLineupTitle }),
    ...(sectionCalendarEyebrow !== undefined && { sectionCalendarEyebrow }),
    ...(sectionCalendarTitle !== undefined && { sectionCalendarTitle }),
    ...(ctaEyebrow !== undefined && { ctaEyebrow }),
    ...(ctaTitle !== undefined && { ctaTitle }),
    ...(ctaButtonLabel !== undefined && { ctaButtonLabel }),
    ...(footerText !== undefined && { footerText }),
  });

  await settings.save();
  res.json(settings);
});
