import { Schema, model, Document } from 'mongoose';

/**
 * Contenido editable de la home (textos que antes estaban fijos en el frontend).
 * Es un documento "singleton": siempre hay uno solo, identificado por `key: 'singleton'`.
 */
export interface ISiteSettings extends Document {
  key: string;

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

  updatedAt: Date;
}

export const SINGLETON_KEY = 'singleton';

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, required: true, unique: true, default: SINGLETON_KEY },

    heroEyebrow: { type: String, default: 'Tucumán · Buenos Aires · 2026' },
    heroTitleLine1: { type: String, default: 'Todo lo que pasa' },
    heroTitleAccent: { type: String, default: 'acá.' },
    heroSubtitle: {
      type: String,
      default:
        'Conciertos, teatro, stand up y festivales. Enterate, buscá tu banda favorita y comprá la entrada sin perderte nada.',
    },
    heroPrimaryCta: { type: String, default: 'Ver line-up' },
    heroSecondaryCta: { type: String, default: 'Ver calendario' },

    sectionCategoriesEyebrow: { type: String, default: 'Explorá por tipo' },
    sectionCategoriesTitle: { type: String, default: 'Categorías de eventos' },
    categoryDescriptions: {
      type: Schema.Types.Mixed,
      default: {
        concierto: 'Bandas locales y nacionales, en vivo.',
        teatro: 'Elencos y obras clásicas o contemporáneas.',
        standup: 'Humoristas tucumanos arriba del escenario.',
        festival: 'Varias bandas, un solo line-up.',
        exposicion: 'Arte, fotografía y muestras abiertas al público.',
        deportivo: 'Torneos y eventos deportivos con público.',
        otro: 'Ferias, actividades y propuestas culturales libres.',
      },
    },

    sectionLineupEyebrow: { type: String, default: 'Lo más destacado' },
    sectionLineupTitle: { type: String, default: 'Próximos headliners' },

    sectionCalendarEyebrow: { type: String, default: 'Próximos 14 días' },
    sectionCalendarTitle: { type: String, default: 'Calendario' },

    ctaEyebrow: { type: String, default: 'No te pierdas nada' },
    ctaTitle: { type: String, default: 'Aprovechá todo lo que pasa en Tucumán' },
    ctaButtonLabel: { type: String, default: 'Quiero enterarme' },

    footerText: {
      type: String,
      default: 'Agenda Cultural · Conciertos, teatro, stand up y más — en Tucumán y Buenos Aires',
    },
  },
  { timestamps: true }
);

export default model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
