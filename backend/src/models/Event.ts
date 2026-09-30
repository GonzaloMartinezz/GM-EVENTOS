import { Schema, model, Document, Types } from 'mongoose';

/**
 * Categorías de eventos que soporta el MVP.
 * Se puede ampliar fácilmente agregando valores acá.
 */
export type EventCategory =
  | 'concierto'
  | 'teatro'
  | 'standup'
  | 'festival'
  | 'exposicion'
  | 'deportivo'
  | 'otro';

export const EVENT_CATEGORIES: EventCategory[] = [
  'concierto',
  'teatro',
  'standup',
  'festival',
  'exposicion',
  'deportivo',
  'otro',
];

/** Un integrante de la banda/elenco (opcional, útil para conciertos y obras) */
export interface IBandMember {
  name: string;
  role?: string; // ej: "voz", "guitarra", "director"
}

/** Rango o valor de precio de entrada */
export interface ITicketPrice {
  label: string; // ej: "General", "VIP", "Platea"
  price: number; // en pesos argentinos
}

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  category: EventCategory;

  // Fecha y hora
  startDate: Date;
  endDate?: Date;

  // Ubicación
  venueName: string;
  address: string;
  city: string;
  province: string;
  mapsUrl?: string; // link a Google Maps para "cómo llegar"

  // Info de la banda / elenco / artista
  artistName: string;
  artistBio?: string;
  bandMembers: IBandMember[];
  artistImageUrl?: string;

  // Imágenes del evento (flyer, fotos)
  images: string[];
  coverImage?: string;

  // Entradas
  tickets: ITicketPrice[];
  ticketUrl?: string; // link externo de compra (Ticketek, Passline, etc.)
  isFree: boolean;
  soldOut: boolean;

  // Metadata
  featured: boolean;
  published: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BandMemberSchema = new Schema<IBandMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
  },
  { _id: false }
);

const TicketPriceSchema = new Schema<ITicketPrice>(
  {
    label: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    category: { type: String, enum: EVENT_CATEGORIES, required: true, default: 'otro' },

    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date },

    venueName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, default: 'San Miguel de Tucumán' },
    province: { type: String, required: true, trim: true, default: 'Tucumán' },
    mapsUrl: { type: String, trim: true },

    artistName: { type: String, required: true, trim: true },
    artistBio: { type: String },
    bandMembers: { type: [BandMemberSchema], default: [] },
    artistImageUrl: { type: String },

    images: { type: [String], default: [] },
    coverImage: { type: String },

    tickets: { type: [TicketPriceSchema], default: [] },
    ticketUrl: { type: String, trim: true },
    isFree: { type: Boolean, default: false },
    soldOut: { type: Boolean, default: false },

    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Índice de texto para el buscador (título, artista, descripción, lugar)
EventSchema.index({
  title: 'text',
  artistName: 'text',
  description: 'text',
  venueName: 'text',
});

export default model<IEvent>('Event', EventSchema);
