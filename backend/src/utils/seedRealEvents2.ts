import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db';
import User from '../models/User';
import Event from '../models/Event';
import { slugify } from './slugify';
import mongoose from 'mongoose';

/**
 * Segunda tanda de eventos REALES de Argentina (música), relevados el
 * 01/10/2026, para ampliar el rango de la agenda de octubre 2026 a
 * octubre 2027. Complementa a seedRealEvents.ts (no lo reemplaza) y es
 * igual de ADITIVO: busca por título antes de crear, se puede correr
 * las veces que haga falta.
 *
 * Fuentes:
 * - https://www.quehacemos.com.ar/cordoba
 * - https://www.quehacemos.com.ar/eventos-en/buenos-aires/enero-2027
 * - https://www.quehacemos.com.ar/eventos-en/buenos-aires/febrero-2027
 * - https://www.quehacemos.com.ar/eventos-en/buenos-aires/marzo-2027
 * - https://www.quehacemos.com.ar/eventos-en/buenos-aires/abril-2027
 * - https://www.quehacemos.com.ar/eventos-en/buenos-aires/mayo-2027
 * - https://www.quehacemos.com.ar/eventos-en/tucuman/noviembre-2026
 * - Cosquín Rock 2027 (diariouno.com.ar), Lollapalooza Argentina 2027
 *   (lacapital.com.ar), Quilmes Rock 2027 (cronica.com.ar)
 *
 * IMPORTANTE — honestidad sobre el rango pedido (oct 2026 → oct 2027):
 * las entradoras y agendas reales recién abren venta de shows con
 * 6 a 9 meses de anticipación. Al día de hoy (01/10/2026) hay shows
 * confirmados con fecha real hasta MAYO 2027, más 3 festivales grandes
 * ya anunciados para 2027 (Cosquín Rock, Lollapalooza, Quilmes Rock).
 * De junio a octubre 2027 todavía NO hay nada confirmado en ningún
 * lado — inventar fechas ahí sería data falsa. Conviene volver a
 * correr este script (o pedir que lo actualice) más adelante, a
 * medida que se vayan anunciando más shows para esa segunda mitad
 * de 2027.
 */

type SeedEvent = {
  title: string;
  description: string;
  category: 'concierto' | 'teatro' | 'standup' | 'festival' | 'exposicion' | 'deportivo' | 'otro';
  startDate: Date;
  endDate?: Date;
  venueName: string;
  address: string;
  city: string;
  province: string;
  mapsUrl: string;
  artistName: string;
  artistBio?: string;
  tickets: { label: string; price: number }[];
  ticketUrl: string;
  isFree: boolean;
  featured: boolean;
};

function mapsQuery(venue: string, city: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(`${venue} ${city}`)}`;
}

const TUCUMAN = 'Tucumán';
const BUENOS_AIRES = 'Buenos Aires';
const CORDOBA = 'Córdoba';

const realEvents: SeedEvent[] = [
  // ───────────────────────── TUCUMÁN (nuevos, nov 2026) ─────────────────────────
  {
    title: 'Pequeño Pez en Tucumán',
    description: 'La banda de indie rock se presenta en el Teatro Juan Bautista Alberdi.',
    category: 'concierto',
    startDate: new Date('2026-11-08T17:00:00-03:00'),
    venueName: 'Teatro Juan Bautista Alberdi',
    address: 'San Martín 251',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Teatro Alberdi', 'San Miguel de Tucumán'),
    artistName: 'Pequeño Pez',
    artistBio: 'Banda argentina de indie rock formada en los años 90.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/pequeno-pez-53025',
    isFree: false,
    featured: false,
  },
  {
    title: 'Marc DePulse en Tucumán',
    description: 'El DJ y productor alemán de house/electrónica se presenta en Salón Las Marías.',
    category: 'concierto',
    startDate: new Date('2026-11-14T22:00:00-03:00'),
    venueName: 'Salón de Fiestas Las Marías',
    address: 'San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Salón de Fiestas Las Marías', 'San Miguel de Tucumán'),
    artistName: 'Marc DePulse',
    artistBio: 'DJ y productor alemán de house y música electrónica.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/marc-depulse-53026',
    isFree: false,
    featured: false,
  },
  {
    title: 'Mariano Mellino en Tucumán',
    description: 'Noche de electrónica en el Palacio de los Deportes.',
    category: 'concierto',
    startDate: new Date('2026-11-21T23:00:00-03:00'),
    venueName: 'Palacio de los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'Mariano Mellino',
    artistBio: 'DJ y productor argentino de música electrónica.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/mariano-mellino-53027',
    isFree: false,
    featured: false,
  },
  {
    title: 'Nick Warren | Proyecto Aborigen en Tucumán',
    description: 'El DJ británico se presenta en La Cañada, Yerba Buena, junto a Proyecto Aborigen.',
    category: 'concierto',
    startDate: new Date('2026-11-28T22:00:00-03:00'),
    venueName: 'La Cañada',
    address: 'Yerba Buena',
    city: 'Yerba Buena',
    province: TUCUMAN,
    mapsUrl: mapsQuery('La Cañada', 'Yerba Buena Tucumán'),
    artistName: 'Nick Warren',
    artistBio: 'DJ y productor británico de música electrónica, referente del progressive house.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/nick-warren-proyecto-aborigen-58651',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── CÓRDOBA (oct 2026) ─────────────────────────
  {
    title: 'Las Hijas en Córdoba',
    description: 'Show en el Teatro Ciudad de las Artes.',
    category: 'concierto',
    startDate: new Date('2026-10-02T20:00:00-03:00'),
    venueName: 'Teatro Ciudad de las Artes',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Teatro Ciudad de las Artes', 'Córdoba'),
    artistName: 'Las Hijas',
    tickets: [{ label: 'General', price: 72000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/las-hijas-36334',
    isFree: false,
    featured: false,
  },
  {
    title: 'PALO en Córdoba',
    description: 'Show en Pez Volcán.',
    category: 'concierto',
    startDate: new Date('2026-10-03T20:00:00-03:00'),
    venueName: 'Pez Volcán',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Pez Volcán', 'Córdoba'),
    artistName: 'PALO',
    tickets: [{ label: 'General', price: 15000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/palo-en-cordoba-42922',
    isFree: false,
    featured: false,
  },
  {
    title: 'Alejandro Dolina en Córdoba',
    description: 'El escritor y conductor presenta su espectáculo en Quality Espacio.',
    category: 'otro',
    startDate: new Date('2026-10-03T20:00:00-03:00'),
    venueName: 'Quality Espacio',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Quality Espacio', 'Córdoba'),
    artistName: 'Alejandro Dolina',
    artistBio: 'Escritor, músico y conductor radial argentino, creador de "La Venganza Será Terrible".',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/alejandro-dolina-42986',
    isFree: false,
    featured: true,
  },
  {
    title: 'Gustavo Cordera en Córdoba',
    description: 'El ex Bersuit Vergarabat se presenta en Club Paraguay.',
    category: 'concierto',
    startDate: new Date('2026-10-03T21:00:00-03:00'),
    venueName: 'Club Paraguay',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Club Paraguay', 'Córdoba'),
    artistName: 'Gustavo Cordera',
    artistBio: 'Cantante argentino, ex líder de Bersuit Vergarabat, con carrera solista.',
    tickets: [{ label: 'General', price: 35000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/gustavo-cordera-22251',
    isFree: false,
    featured: false,
  },
  {
    title: 'Destino San Javier en Córdoba',
    description: 'Show en Quality Espacio.',
    category: 'concierto',
    startDate: new Date('2026-10-02T20:30:00-03:00'),
    venueName: 'Quality Espacio',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Quality Espacio', 'Córdoba'),
    artistName: 'Destino San Javier',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/destino-san-javier-38291',
    isFree: false,
    featured: false,
  },
  {
    title: 'Nick Varon en Córdoba (Fruta x Dahaus!)',
    description: 'Noche electrónica en Palacio Alsina.',
    category: 'concierto',
    startDate: new Date('2026-10-03T23:00:00-03:00'),
    venueName: 'Palacio Alsina',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Palacio Alsina', 'Córdoba'),
    artistName: 'Nick Varon',
    tickets: [{ label: 'General', price: 25000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/nick-varon-fruta-x-dahaus-palacio-alsina-50353',
    isFree: false,
    featured: false,
  },
  {
    title: 'Eterna Inocencia en Córdoba',
    description: 'Show en Casa Babylon.',
    category: 'concierto',
    startDate: new Date('2026-10-03T23:30:00-03:00'),
    venueName: 'Casa Babylon',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Casa Babylon', 'Córdoba'),
    artistName: 'Eterna Inocencia',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/eterna-inocencia-en-cordoba-55799',
    isFree: false,
    featured: false,
  },
  {
    title: 'Mocchi en Río Cuarto',
    description: 'Show en el Centro Cultural Leonardo Favio.',
    category: 'concierto',
    startDate: new Date('2026-10-02T21:00:00-03:00'),
    venueName: 'Centro Cultural Leonardo Favio',
    address: 'Río Cuarto',
    city: 'Río Cuarto',
    province: CORDOBA,
    mapsUrl: mapsQuery('Centro Cultural Leonardo Favio', 'Río Cuarto'),
    artistName: 'Mocchi',
    tickets: [{ label: 'General', price: 20000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/mocchi-52306',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── BUENOS AIRES — enero 2027 ─────────────────────────
  {
    title: 'Rush en Buenos Aires',
    description: '"Fifty Something Tour": la banda canadiense vuelve a Buenos Aires en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-01-15T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Rush',
    artistBio: 'Legendaria banda canadiense de rock progresivo.',
    tickets: [{ label: 'General', price: 170000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/rush-25860',
    isFree: false,
    featured: true,
  },
  {
    title: 'Hellripper en Buenos Aires',
    description: 'Banda escocesa de black/speed metal, en Uniclub.',
    category: 'concierto',
    startDate: new Date('2027-01-19T19:00:00-03:00'),
    venueName: 'Uniclub',
    address: 'Buenos Aires',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Uniclub', 'Buenos Aires'),
    artistName: 'Hellripper',
    artistBio: 'Proyecto escocés de black/speed metal.',
    tickets: [{ label: 'General', price: 70000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/hellripper-32024',
    isFree: false,
    featured: false,
  },
  {
    title: 'Evergreen Terrace en Buenos Aires',
    description: 'Primera vez en Argentina de la banda de metalcore de Florida, en Club Cultural Bula.',
    category: 'concierto',
    startDate: new Date('2027-01-28T19:00:00-03:00'),
    venueName: 'Club Cultural Bula',
    address: 'Buenos Aires',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Club Cultural Bula', 'Buenos Aires'),
    artistName: 'Evergreen Terrace',
    artistBio: 'Banda estadounidense de metalcore, influyente en la escena de los 2000.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/evergreen-terrace-unico-show-en-argentina-53341',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── BUENOS AIRES — febrero 2027 ─────────────────────────
  {
    title: 'Jack Johnson en Buenos Aires',
    description: 'El cantautor estadounidense se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-02-05T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Jack Johnson',
    artistBio: 'Cantautor estadounidense de folk/surf rock.',
    tickets: [{ label: 'General', price: 115000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/jack-johnson-54072',
    isFree: false,
    featured: true,
  },
  {
    title: 'Karol G en Buenos Aires',
    description: '"Viajando Por El Mundo Tropitour", en el Estadio River Plate.',
    category: 'concierto',
    startDate: new Date('2027-02-05T21:00:00-03:00'),
    venueName: 'Estadio River Plate',
    address: 'Av. Figueroa Alcorta 7597',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Estadio River Plate', 'Buenos Aires'),
    artistName: 'Karol G',
    artistBio: 'Cantante colombiana de reguetón y música urbana, una de las artistas latinas más exitosas de la actualidad.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/karol-g-viajando-por-el-mundo-tropitour-54087',
    isFree: false,
    featured: true,
  },
  {
    title: 'María Becerra en Buenos Aires',
    description: 'La artista argentina se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-02-06T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'María Becerra',
    artistBio: 'Cantante argentina de pop urbano, una de las artistas más escuchadas del país.',
    tickets: [{ label: 'General', price: 60000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/maria-becerra-54062',
    isFree: false,
    featured: true,
  },
  {
    title: 'Tan Biónica en Buenos Aires (febrero)',
    description: 'La banda de pop rock argentino en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-02-11T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Tan Biónica',
    artistBio: 'Banda argentina de pop rock liderada por Chano Charpentier/Bambi.',
    tickets: [{ label: 'General', price: 60000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/tan-bionica-54073',
    isFree: false,
    featured: false,
  },
  {
    title: 'Reik en Buenos Aires',
    description: 'El grupo mexicano de pop romántico en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-02-14T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Reik',
    artistBio: 'Grupo mexicano de pop romántico.',
    tickets: [{ label: 'General', price: 90000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/reik-36465',
    isFree: false,
    featured: false,
  },
  {
    title: 'Foo Fighters en Buenos Aires',
    description: 'La banda de Dave Grohl se presenta en el Estadio River Plate.',
    category: 'concierto',
    startDate: new Date('2027-02-25T21:00:00-03:00'),
    venueName: 'Estadio River Plate',
    address: 'Av. Figueroa Alcorta 7597',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Estadio River Plate', 'Buenos Aires'),
    artistName: 'Foo Fighters',
    artistBio: 'Banda estadounidense de rock liderada por Dave Grohl, ex Nirvana.',
    tickets: [{ label: 'General', price: 115000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/foo-fighters-46077',
    isFree: false,
    featured: true,
  },
  {
    title: 'Sin Bandera en Buenos Aires',
    description: 'El dúo mexicano de pop romántico en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-02-27T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Sin Bandera',
    artistBio: 'Dúo mexicano de pop romántico formado por Leonel García y Noel Schajris.',
    tickets: [{ label: 'General', price: 80000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/sin-bandera-25861',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── BUENOS AIRES — marzo 2027 ─────────────────────────
  {
    title: 'Ludovico Einaudi en Buenos Aires',
    description: 'El pianista y compositor italiano se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-03-03T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Ludovico Einaudi',
    artistBio: 'Pianista y compositor italiano, uno de los músicos clásicos contemporáneos más escuchados del mundo.',
    tickets: [{ label: 'General', price: 80000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/ludovico-einaudi-54077',
    isFree: false,
    featured: true,
  },
  {
    title: 'Placebo en Buenos Aires',
    description: 'La banda británica de rock alternativo en el Estadio Malvinas Argentinas.',
    category: 'concierto',
    startDate: new Date('2027-03-03T21:00:00-03:00'),
    venueName: 'Estadio Malvinas Argentinas',
    address: 'Av. Márquez 2257, Munro',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Estadio Malvinas Argentinas', 'Munro Buenos Aires'),
    artistName: 'Placebo',
    artistBio: 'Banda británica de rock alternativo liderada por Brian Molko.',
    tickets: [{ label: 'General', price: 140000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/placebo-57516',
    isFree: false,
    featured: true,
  },
  {
    title: 'Epica & Rhapsody en Buenos Aires',
    description: '"25 Years Celebration" de Epica junto a los shows finales de Rhapsody, en el Estadio Malvinas Argentinas.',
    category: 'concierto',
    startDate: new Date('2027-03-07T19:00:00-03:00'),
    venueName: 'Estadio Malvinas Argentinas',
    address: 'Av. Márquez 2257, Munro',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Estadio Malvinas Argentinas', 'Munro Buenos Aires'),
    artistName: 'Epica & Rhapsody',
    artistBio: 'Epica: banda neerlandesa de metal sinfónico. Rhapsody: banda italiana pionera del power metal épico.',
    tickets: [{ label: 'General', price: 100000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/epica-25-years-celebration-rhapsody-the-final-shows-53870',
    isFree: false,
    featured: false,
  },
  {
    title: 'John Garcia (Kyuss) en Buenos Aires',
    description: 'El cantante de Kyuss y Vista Chino se presenta en Uniclub.',
    category: 'concierto',
    startDate: new Date('2027-03-13T19:00:00-03:00'),
    venueName: 'Uniclub',
    address: 'Buenos Aires',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Uniclub', 'Buenos Aires'),
    artistName: 'John Garcia',
    artistBio: 'Cantante estadounidense, voz histórica de Kyuss, pionero del stoner rock.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/john-garcia-kyuss-en-buenos-aires-64549',
    isFree: false,
    featured: false,
  },
  {
    title: 'Ha*Ash en Buenos Aires',
    description: 'El dúo mexicano-estadounidense se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-03-17T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Ha*Ash',
    artistBio: 'Dúo pop formado por las hermanas Hanna y Ashley Pérez.',
    tickets: [{ label: 'General', price: 60000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/ha-ash-56147',
    isFree: false,
    featured: false,
  },
  {
    title: 'La Oreja de Van Gogh en Buenos Aires',
    description: 'La banda española de pop rock en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-03-19T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'La Oreja de Van Gogh',
    artistBio: 'Banda española de pop rock, uno de los grupos en español más populares de las últimas dos décadas.',
    tickets: [{ label: 'General', price: 75000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/la-oreja-de-van-gogh-54079',
    isFree: false,
    featured: false,
  },
  {
    title: 'Los Paralamas en Buenos Aires',
    description: 'La banda brasileña se presenta junto a Nonpalidece en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-03-23T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Los Paralamas do Sucesso',
    artistBio: 'Banda brasileña de rock, una de las más influyentes de Brasil desde los 80.',
    tickets: [{ label: 'General', price: 60000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/paralamas-nonpalidece-58307',
    isFree: false,
    featured: false,
  },
  {
    title: 'Camila en Buenos Aires',
    description: 'El dúo mexicano de pop romántico se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-03-30T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Camila',
    artistBio: 'Dúo mexicano de pop, formado por Mario Domm y Samo.',
    tickets: [{ label: 'General', price: 85000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/camila-58308',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── BUENOS AIRES — abril 2027 ─────────────────────────
  {
    title: 'No Te Va Gustar en Mar del Plata',
    description: 'La banda uruguaya de ska/rock se presenta en Arena Mardel Plata.',
    category: 'concierto',
    startDate: new Date('2027-04-03T22:00:00-03:00'),
    venueName: 'Arena Mardel Plata',
    address: 'Mar del Plata',
    city: 'Mar del Plata',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Arena Mardel Plata', 'Mar del Plata'),
    artistName: 'No Te Va Gustar',
    artistBio: 'Banda uruguaya de ska, reggae y rock, una de las más convocantes del Río de la Plata.',
    tickets: [{ label: 'General', price: 80000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/no-te-va-gustar-en-arena-mardel-plata-43480',
    isFree: false,
    featured: false,
  },
  {
    title: 'Pixies en Buenos Aires',
    description: 'La banda estadounidense de alternative rock en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-04-04T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Pixies',
    artistBio: 'Banda estadounidense de alternative rock, influencia clave del rock de los 90.',
    tickets: [{ label: 'General', price: 75000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/pixies-54082',
    isFree: false,
    featured: true,
  },
  {
    title: 'Tan Biónica en Buenos Aires (abril)',
    description: 'Segunda fecha de la banda de pop rock argentino en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-04-24T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Tan Biónica',
    tickets: [{ label: 'General', price: 60000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/tan-bionica-54075',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── BUENOS AIRES — mayo 2027 ─────────────────────────
  {
    title: 'Kase.o en Buenos Aires',
    description: 'El rapero español se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-05-07T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Kase.o',
    artistBio: 'Rapero español, ex Violadores del Verso, referente del hip hop en español.',
    tickets: [{ label: 'General', price: 85000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/kase-o-54083',
    isFree: false,
    featured: false,
  },
  {
    title: 'El Cuarteto de Nos en Buenos Aires (mayo)',
    description: 'La banda uruguaya de rock alternativo en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2027-05-22T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'El Cuarteto de Nos',
    artistBio: 'Banda uruguaya de rock alternativo liderada por Roberto Musso.',
    tickets: [{ label: 'General', price: 55000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/cuarteto-de-nos-54084',
    isFree: false,
    featured: false,
  },
  {
    title: 'Buckcherry en Buenos Aires',
    description: 'Único show en Argentina de la banda de hard rock, en Uniclub.',
    category: 'concierto',
    startDate: new Date('2027-05-29T19:00:00-03:00'),
    venueName: 'Uniclub',
    address: 'Buenos Aires',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Uniclub', 'Buenos Aires'),
    artistName: 'Buckcherry',
    artistBio: 'Banda estadounidense de hard rock, conocida por el hit "Crazy Bitch".',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/buckcherry-unico-show-en-argentina-55535',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── FESTIVALES GRANDES 2027 ─────────────────────────
  {
    title: 'Cosquín Rock 2027',
    description:
      'El festival de rock más grande de Argentina celebra más de 26 años de historia. Edición 2027 en el Aeródromo Santa María de Punilla, Sierras de Córdoba. Grilla de artistas todavía no confirmada al momento de esta carga.',
    category: 'festival',
    startDate: new Date('2027-02-06T12:00:00-03:00'),
    venueName: 'Aeródromo Santa María de Punilla',
    address: 'Santa María de Punilla',
    city: 'Santa María de Punilla',
    province: CORDOBA,
    mapsUrl: mapsQuery('Aeródromo Santa María de Punilla', 'Córdoba'),
    artistName: 'Line-up Cosquín Rock 2027 (a confirmar)',
    artistBio: 'Festival de rock con más de 26 ediciones, el más grande de Argentina — en 2026 convocó a más de 100.000 personas.',
    tickets: [],
    ticketUrl: 'https://www.cosquinrock.net',
    isFree: false,
    featured: true,
  },
  {
    title: 'Lollapalooza Argentina 2027',
    description:
      'El festival internacional vuelve al Hipódromo de San Isidro con más de 100 artistas en cinco escenarios. Line-up completo todavía no anunciado al momento de esta carga.',
    category: 'festival',
    startDate: new Date('2027-03-13T12:00:00-03:00'),
    endDate: new Date('2027-03-14T23:59:00-03:00'),
    venueName: 'Hipódromo de San Isidro',
    address: 'San Isidro',
    city: 'San Isidro',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Hipódromo de San Isidro', 'Buenos Aires'),
    artistName: 'Line-up Lollapalooza Argentina 2027 (a confirmar)',
    artistBio: 'Edición argentina del festival internacional Lollapalooza, con más de 100 artistas en 5 escenarios.',
    tickets: [{ label: 'Day Pass (early bird)', price: 205000 }],
    ticketUrl: 'https://www.lollapaloozaar.com',
    isFree: false,
    featured: true,
  },
  {
    title: 'Quilmes Rock 2027',
    description:
      'El festival vuelve con tres jornadas. Lugar todavía no confirmado al momento de esta carga. Grilla por anunciar.',
    category: 'festival',
    startDate: new Date('2027-04-16T14:00:00-03:00'),
    endDate: new Date('2027-04-18T23:59:00-03:00'),
    venueName: 'A confirmar',
    address: 'Buenos Aires',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Quilmes Rock', 'Buenos Aires'),
    artistName: 'Line-up Quilmes Rock 2027 (a confirmar)',
    artistBio: 'Festival de rock con tres jornadas, uno de los más grandes del calendario argentino.',
    tickets: [{ label: 'General (preventa Zorzal Madrugador)', price: 200000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/quilmes-rock-2027-57810',
    isFree: false,
    featured: true,
  },
];

async function seedRealEvents2() {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@eventostucuman.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'CambiarEsta123!';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'Administrador',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`👤 Usuario admin creado: ${adminEmail} / ${adminPassword}`);
  }

  let created = 0;
  let skipped = 0;

  for (const evt of realEvents) {
    const exists = await Event.findOne({ title: evt.title });
    if (exists) {
      console.log(`⏭  Ya existe: ${evt.title}`);
      skipped++;
      continue;
    }
    const slug = slugify(evt.title);
    await Event.create({
      ...evt,
      slug,
      bandMembers: [],
      images: [],
      soldOut: false,
      published: true,
      createdBy: admin._id,
    });
    console.log(`✅ Evento creado: ${evt.title}`);
    created++;
  }

  console.log(`\n🌱 Seed (tanda 2) completo. Creados: ${created} | Ya existían: ${skipped}`);
  await mongoose.disconnect();
}

seedRealEvents2().catch((err) => {
  console.error('Error corriendo el seed de eventos reales (tanda 2):', err);
  process.exit(1);
});
