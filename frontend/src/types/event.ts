export type EventCategory =
  | 'concierto'
  | 'teatro'
  | 'standup'
  | 'festival'
  | 'exposicion'
  | 'deportivo'
  | 'otro';

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  concierto: 'Concierto',
  teatro: 'Teatro',
  standup: 'Stand up',
  festival: 'Festival',
  exposicion: 'Exposición',
  deportivo: 'Deportivo',
  otro: 'Otro',
};

export interface BandMember {
  name: string;
  role?: string;
}

export interface TicketPrice {
  label: string;
  price: number;
}

export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: EventCategory;

  startDate: string;
  endDate?: string;

  venueName: string;
  address: string;
  city: string;
  province: string;
  mapsUrl?: string;

  artistName: string;
  artistBio?: string;
  bandMembers: BandMember[];
  artistImageUrl?: string;

  images: string[];
  coverImage?: string;

  tickets: TicketPrice[];
  ticketUrl?: string;
  isFree: boolean;
  soldOut: boolean;

  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface EventFilters {
  q?: string;
  category?: EventCategory | '';
  city?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}
