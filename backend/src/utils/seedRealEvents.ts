import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db';
import User from '../models/User';
import Event from '../models/Event';
import { slugify } from './slugify';
import mongoose from 'mongoose';

/**
 * Seed de eventos REALES de Argentina (música), relevados el 30/09/2026
 * desde Alpogo, Songkick y Qué Hacemos (agenda de shows confirmados).
 *
 * Este script es ADITIVO: no borra nada, solo agrega los eventos que
 * todavía no existan (busca por título antes de crear). Se puede correr
 * las veces que haga falta.
 *
 * Fuentes:
 * - https://www.alpogo.com/#todos
 * - https://www.quehacemos.com.ar/tucuman
 * - https://www.songkick.com/metro-areas/32911-argentina-buenos-aires
 *
 * Nota: algunos precios y horarios pueden variar o agotarse — antes de
 * publicar, revisar cada evento desde el panel admin (/admin) y
 * actualizar precio/soldOut si hizo falta. Las direcciones exactas de
 * algunos venues son aproximadas: el link de "mapsUrl" siempre apunta a
 * una búsqueda de Google Maps por nombre del lugar, así que el botón
 * "Cómo llegar" funciona igual aunque la calle no sea 100% exacta.
 */

type SeedEvent = {
  title: string;
  description: string;
  category: 'concierto' | 'teatro' | 'standup' | 'festival' | 'exposicion' | 'deportivo' | 'otro';
  startDate: Date;
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
  // ───────────────────────── TUCUMÁN ─────────────────────────
  {
    title: 'Dillom en Tucumán',
    description: 'Uno de los artistas más disruptivos del trap argentino actual llega al Palacio de los Deportes.',
    category: 'concierto',
    startDate: new Date('2026-10-02T21:00:00-03:00'),
    venueName: 'Palacio de los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'Dillom',
    artistBio: 'Rapero y productor argentino, referente de la nueva escena urbana.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/dillom-53021',
    isFree: false,
    featured: true,
  },
  {
    title: 'David Lebón en Tucumán',
    description: 'El histórico guitarrista y cantante, ex Serú Girán y Pescado Rabioso, se presenta en Tucumán.',
    category: 'concierto',
    startDate: new Date('2026-10-03T21:00:00-03:00'),
    venueName: 'Palacio de los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'David Lebón',
    artistBio: 'Guitarrista y cantante, figura fundamental del rock nacional argentino.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/david-lebon-41235',
    isFree: false,
    featured: false,
  },
  {
    title: 'Serú Girán en Tucumán',
    description: 'La legendaria banda del rock argentino, con su repertorio clásico, en el Palacio de los Deportes.',
    category: 'concierto',
    startDate: new Date('2026-10-03T21:00:00-03:00'),
    venueName: 'Palacio De Los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'Serú Girán',
    artistBio: 'Una de las bandas más influyentes del rock en español, con Charly García y David Lebón entre sus fundadores.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/seru-giran-47133',
    isFree: false,
    featured: true,
  },
  {
    title: 'Axel en Tucumán',
    description: 'El cantautor romántico presenta su repertorio de siempre en el Teatro Mercedes Sosa.',
    category: 'concierto',
    startDate: new Date('2026-10-04T19:00:00-03:00'),
    venueName: 'Teatro Mercedes Sosa',
    address: 'Av. Sarmiento 251',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Teatro Mercedes Sosa', 'San Miguel de Tucumán'),
    artistName: 'Axel',
    artistBio: 'Cantautor argentino de pop romántico, con más de dos décadas de carrera.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/axel-58059',
    isFree: false,
    featured: false,
  },
  {
    title: 'Los Fundamentalistas del Aire Acondicionado en Tucumán',
    description: 'La murga/banda de rock y humor se presenta en una noche especial en el Hipódromo de Tucumán.',
    category: 'concierto',
    startDate: new Date('2026-10-10T20:30:00-03:00'),
    venueName: 'Hipódromo de Tucumán',
    address: 'Autopista Circunvalación, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Hipódromo de Tucumán', 'San Miguel de Tucumán'),
    artistName: 'Los Fundamentalistas del Aire Acondicionado',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/los-fundamentalistas-del-aire-acondicionado-23659',
    isFree: false,
    featured: false,
  },
  {
    title: 'Fito Páez en Tucumán',
    description: 'Uno de los músicos más importantes del rock argentino en el estadio de Central Córdoba.',
    category: 'concierto',
    startDate: new Date('2026-10-11T21:00:00-03:00'),
    venueName: 'Club Atlético Central Córdoba',
    address: 'La Ciudadela, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Club Atlético Central Córdoba', 'San Miguel de Tucumán'),
    artistName: 'Fito Páez',
    artistBio: 'Cantante, compositor y productor, uno de los referentes más grandes del rock en español.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/fito-paez-23660',
    isFree: false,
    featured: true,
  },
  {
    title: 'El Mató a un Policía Motorizado en Tucumán',
    description: 'La banda platense de indie rock llega al Palacio de los Deportes con su gira nacional.',
    category: 'concierto',
    startDate: new Date('2026-10-16T20:00:00-03:00'),
    venueName: 'Palacio de los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'El Mató a un Policía Motorizado',
    artistBio: 'Banda de indie rock de La Plata, una de las más influyentes de la escena independiente argentina.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/el-mato-a-un-policia-motorizado-53022',
    isFree: false,
    featured: true,
  },
  {
    title: 'Ahyre en Tucumán',
    description: 'Show en el Teatro Mercedes Sosa.',
    category: 'concierto',
    startDate: new Date('2026-10-23T21:00:00-03:00'),
    venueName: 'Teatro Mercedes Sosa',
    address: 'Av. Sarmiento 251',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Teatro Mercedes Sosa', 'San Miguel de Tucumán'),
    artistName: 'Ahyre',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/ahyre-53024',
    isFree: false,
    featured: false,
  },
  {
    title: 'Andrés Calamaro en Tucumán',
    description: 'El "Salmón" presenta su repertorio de clásicos en el Palacio de los Deportes.',
    category: 'concierto',
    startDate: new Date('2026-10-24T22:00:00-03:00'),
    venueName: 'Palacio de los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'Andrés Calamaro',
    artistBio: 'Cantautor y ex líder de Los Rodríguez, referente ineludible del rock en español.',
    tickets: [{ label: 'General', price: 85000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/andres-calamaro-en-tucuman-43067',
    isFree: false,
    featured: true,
  },
  {
    title: 'La Mona Jiménez en Tucumán',
    description: 'El histórico referente del cuarteto cordobés llega al Palacio de los Deportes.',
    category: 'concierto',
    startDate: new Date('2026-10-25T20:00:00-03:00'),
    venueName: 'Palacio de los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'La Mona Jiménez',
    artistBio: 'Cantante cordobés, uno de los máximos referentes del cuarteto.',
    tickets: [{ label: 'General', price: 85000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/la-mona-en-tucuman-52945',
    isFree: false,
    featured: false,
  },
  {
    title: 'Acru en Tucumán',
    description: 'Show en La Gesta Cultural.',
    category: 'concierto',
    startDate: new Date('2026-10-31T20:00:00-03:00'),
    venueName: 'La Gesta Cultural',
    address: 'San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('La Gesta Cultural', 'San Miguel de Tucumán'),
    artistName: 'Acru',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/acru-41236',
    isFree: false,
    featured: false,
  },
  {
    title: 'Manu Horazzi en Tucumán',
    description: 'Show íntimo en Bar Siglo XXI.',
    category: 'concierto',
    startDate: new Date('2026-11-05T21:00:00-03:00'),
    venueName: 'Bar Siglo XXI',
    address: 'San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Bar Siglo XXI', 'San Miguel de Tucumán'),
    artistName: 'Manu Horazzi',
    tickets: [{ label: 'General', price: 15000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/manu-horazzi-en-tucuman-2026-57362',
    isFree: false,
    featured: false,
  },
  {
    title: 'Babasónicos en Tucumán',
    description: 'La banda de rock alternativo más influyente de los últimos 30 años llega al Palacio de los Deportes.',
    category: 'concierto',
    startDate: new Date('2026-11-06T21:00:00-03:00'),
    venueName: 'Palacio de los Deportes',
    address: 'Av. Benjamín Aráoz, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Palacio de los Deportes', 'San Miguel de Tucumán'),
    artistName: 'Babasónicos',
    artistBio: 'Banda argentina de rock alternativo, con Adrián Dárgelos a la voz.',
    tickets: [{ label: 'General', price: 80000 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/babasonicos-tucuman-33776',
    isFree: false,
    featured: true,
  },
  {
    title: 'Sergio Dalma en Tucumán',
    description: 'El cantante español presenta su gira en el Teatro Mercedes Sosa.',
    category: 'concierto',
    startDate: new Date('2026-11-06T21:00:00-03:00'),
    venueName: 'Teatro Mercedes Sosa',
    address: 'Av. Sarmiento 251',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Teatro Mercedes Sosa', 'San Miguel de Tucumán'),
    artistName: 'Sergio Dalma',
    artistBio: 'Cantante español de baladas pop, popular en toda Latinoamérica.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/sergio-dalma-oficial-39596',
    isFree: false,
    featured: false,
  },
  {
    title: 'Alex Ubago en Tucumán',
    description: 'El cantautor español se presenta en el Teatro Mercedes Sosa.',
    category: 'concierto',
    startDate: new Date('2026-11-10T21:00:00-03:00'),
    venueName: 'Teatro Mercedes Sosa',
    address: 'Av. Sarmiento 251',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Teatro Mercedes Sosa', 'San Miguel de Tucumán'),
    artistName: 'Alex Ubago',
    artistBio: 'Cantautor español conocido por sus baladas românticas.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/alex-ubago-35534',
    isFree: false,
    featured: false,
  },
  {
    title: 'Silvestre y La Naranja en Tucumán',
    description: 'Show en Club All Boys.',
    category: 'concierto',
    startDate: new Date('2026-11-14T20:00:00-03:00'),
    venueName: 'Club All Boys',
    address: 'San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Club All Boys', 'San Miguel de Tucumán'),
    artistName: 'Silvestre y La Naranja',
    artistBio: 'Banda argentina de indie rock/pop liderada por Alejandro Bustos.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/silvestre-y-la-naranja-58060',
    isFree: false,
    featured: false,
  },
  {
    title: 'Divididos en Tucumán',
    description: 'Una de las bandas más grandes del rock nacional en el estadio de Central Córdoba.',
    category: 'concierto',
    startDate: new Date('2026-11-14T21:00:00-03:00'),
    venueName: 'Club Atlético Central Córdoba',
    address: 'La Ciudadela, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Club Atlético Central Córdoba', 'San Miguel de Tucumán'),
    artistName: 'Divididos',
    artistBio: 'Banda de rock argentino liderada por Ricardo Mollo y Diego Arnedo.',
    tickets: [{ label: 'General', price: 80500 }],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/divididos-31905',
    isFree: false,
    featured: true,
  },
  {
    title: 'Bersuit Vergarabat en Tucumán',
    description: 'La banda de rock/fusión se presenta en el Teatro Mercedes Sosa.',
    category: 'concierto',
    startDate: new Date('2026-11-27T20:00:00-03:00'),
    venueName: 'Teatro Mercedes Sosa',
    address: 'Av. Sarmiento 251',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Teatro Mercedes Sosa', 'San Miguel de Tucumán'),
    artistName: 'Bersuit Vergarabat',
    artistBio: 'Banda argentina de rock y fusión, con clásicos como "Sr. Cobranza" y "La Argentinidad al Palo".',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/bersuit-vergarabat-53028',
    isFree: false,
    featured: true,
  },
  {
    title: 'Myriam Hernández en Tucumán',
    description: 'La cantante chilena presenta sus baladas en el Teatro Mercedes Sosa.',
    category: 'concierto',
    startDate: new Date('2026-11-28T21:00:00-03:00'),
    venueName: 'Teatro Mercedes Sosa',
    address: 'Av. Sarmiento 251',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Teatro Mercedes Sosa', 'San Miguel de Tucumán'),
    artistName: 'Myriam Hernández',
    artistBio: 'Cantante chilena de baladas pop, popular en toda Latinoamérica desde los años 80.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/myriam-hernandez-41237',
    isFree: false,
    featured: false,
  },
  {
    title: 'Eruca Sativa en Tucumán',
    description: 'El power trío de rock se presenta en Puerto Cultural Libertad.',
    category: 'concierto',
    startDate: new Date('2026-12-11T21:00:00-03:00'),
    venueName: 'Puerto Cultural Libertad',
    address: 'Av. Libertad, San Miguel de Tucumán',
    city: 'San Miguel de Tucumán',
    province: TUCUMAN,
    mapsUrl: mapsQuery('Puerto Cultural Libertad', 'San Miguel de Tucumán'),
    artistName: 'Eruca Sativa',
    artistBio: 'Power trío de rock argentino formado en Córdoba, liderado por Lula Bertoldi.',
    tickets: [],
    ticketUrl: 'https://www.quehacemos.com.ar/eventos/eruca-sativa-53029',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── BUENOS AIRES ─────────────────────────
  {
    title: 'High Vis en Buenos Aires',
    description: 'La banda británica de punk/post-punk se presenta en Uniclub.',
    category: 'concierto',
    startDate: new Date('2026-09-30T19:00:00-03:00'),
    venueName: 'Uniclub',
    address: 'Buenos Aires',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Uniclub', 'Buenos Aires'),
    artistName: 'High Vis',
    artistBio: 'Banda británica de punk/post-punk originaria de Londres.',
    tickets: [{ label: 'General', price: 65000 }],
    ticketUrl: 'https://alpogo.com/evento/high-vis-28724',
    isFree: false,
    featured: false,
  },
  {
    title: 'Anette Olzon en Buenos Aires',
    description: 'La ex vocalista de Nightwish se presenta en Uniclub.',
    category: 'concierto',
    startDate: new Date('2026-10-01T19:00:00-03:00'),
    venueName: 'Uniclub',
    address: 'Buenos Aires',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Uniclub', 'Buenos Aires'),
    artistName: 'Anette Olzon',
    artistBio: 'Cantante sueca, ex vocalista de la banda de metal sinfónico Nightwish.',
    tickets: [{ label: 'General', price: 100000 }],
    ticketUrl: 'https://alpogo.com/evento/anette-olzon-en-buenos-aires-26152',
    isFree: false,
    featured: false,
  },
  {
    title: 'Lindsey Stirling en Buenos Aires',
    description: 'La violinista y compositora estadounidense en el Teatro Gran Rex.',
    category: 'concierto',
    startDate: new Date('2026-09-30T21:00:00-03:00'),
    venueName: 'Teatro Gran Rex',
    address: 'Av. Corrientes 857',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Teatro Gran Rex', 'Buenos Aires'),
    artistName: 'Lindsey Stirling',
    artistBio: 'Violinista, bailarina y compositora estadounidense, conocida por fusionar música clásica y electrónica.',
    tickets: [],
    ticketUrl: 'https://www.songkick.com/metro-areas/32911-argentina-buenos-aires',
    isFree: false,
    featured: true,
  },
  {
    title: 'Dregen en Buenos Aires',
    description: 'El guitarrista sueco (The Hellacopters, Backyard Babies) se presenta en Liverpool Club, Palermo.',
    category: 'concierto',
    startDate: new Date('2026-10-09T21:00:00-03:00'),
    venueName: 'Liverpool Club',
    address: 'Palermo',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Liverpool Club Palermo', 'Buenos Aires'),
    artistName: 'Dregen',
    artistBio: 'Guitarrista y cantante sueco, conocido por su trabajo en The Hellacopters y Backyard Babies.',
    tickets: [],
    ticketUrl: 'https://alpogo.com/evento/dregen-en-liverpool-25768',
    isFree: false,
    featured: false,
  },
  {
    title: 'Pimpinela en Buenos Aires',
    description: 'El histórico dúo argentino se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2026-10-09T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Pimpinela',
    artistBio: 'Dúo argentino formado por los hermanos Joaquín y Lucía Galán, referentes de la balada romántica.',
    tickets: [],
    ticketUrl: 'https://www.songkick.com/metro-areas/32911-argentina-buenos-aires',
    isFree: false,
    featured: false,
  },
  {
    title: 'Die Toten Hosen en Buenos Aires',
    description: 'La banda alemana de punk rock, junto a Cadena Perpetua y Feine Sahne Fischfilet, en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2026-10-10T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Die Toten Hosen',
    artistBio: 'Banda alemana de punk rock, una de las más populares de Europa desde los años 80.',
    tickets: [],
    ticketUrl: 'https://www.songkick.com/metro-areas/32911-argentina-buenos-aires',
    isFree: false,
    featured: true,
  },
  {
    title: 'El Cuarteto de Nos en Buenos Aires (Ituzaingó)',
    description: 'La banda uruguaya se presenta en el Estadio GEI de Ituzaingó.',
    category: 'concierto',
    startDate: new Date('2026-10-11T21:00:00-03:00'),
    venueName: 'Estadio GEI',
    address: 'Ituzaingó',
    city: 'Ituzaingó',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Estadio GEI', 'Ituzaingó'),
    artistName: 'El Cuarteto de Nos',
    artistBio: 'Banda uruguaya de rock alternativo, liderada por Roberto Musso.',
    tickets: [],
    ticketUrl: 'https://www.songkick.com/metro-areas/32911-argentina-buenos-aires',
    isFree: false,
    featured: false,
  },
  {
    title: 'David Bisbal en Buenos Aires',
    description: 'El cantante español se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2026-10-12T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'David Bisbal',
    artistBio: 'Cantante español, uno de los artistas pop-latino más exitosos desde los 2000.',
    tickets: [],
    ticketUrl: 'https://www.songkick.com/metro-areas/32911-argentina-buenos-aires',
    isFree: false,
    featured: false,
  },
  {
    title: 'Grupo Frontera en Buenos Aires',
    description: 'La banda mexicano-estadounidense de música regional en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2026-10-13T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Grupo Frontera',
    artistBio: 'Banda de música regional mexicana formada en Texas, con gran éxito en streaming global.',
    tickets: [],
    ticketUrl: 'https://www.songkick.com/metro-areas/32911-argentina-buenos-aires',
    isFree: false,
    featured: true,
  },
  {
    title: 'Bad Gyal en Buenos Aires',
    description: 'La artista catalana de urbano/dancehall se presenta en el Movistar Arena.',
    category: 'concierto',
    startDate: new Date('2026-10-14T21:00:00-03:00'),
    venueName: 'Movistar Arena',
    address: 'Humboldt 450',
    city: 'Buenos Aires',
    province: BUENOS_AIRES,
    mapsUrl: mapsQuery('Movistar Arena', 'Buenos Aires'),
    artistName: 'Bad Gyal',
    artistBio: 'Cantante catalana de urbano y dancehall, referente del género en español.',
    tickets: [],
    ticketUrl: 'https://www.songkick.com/metro-areas/32911-argentina-buenos-aires',
    isFree: false,
    featured: false,
  },

  // ───────────────────────── OTRAS PROVINCIAS ─────────────────────────
  {
    title: "Festival PRGY '26 - 3era edición",
    description: 'Festival de música en Club Paraguay Güemes, Córdoba.',
    category: 'festival',
    startDate: new Date('2026-10-10T18:00:00-03:00'),
    venueName: 'Club Paraguay Güemes',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Club Paraguay Güemes', 'Córdoba'),
    artistName: 'Line-up Festival PRGY',
    tickets: [{ label: 'General', price: 50000 }],
    ticketUrl: 'https://alpogo.com/evento/festival-prgy-26-3era-edicion-27989',
    isFree: false,
    featured: false,
  },
  {
    title: 'Ayax y Prok en Córdoba - Latam Gira Tour 2K26',
    description: 'El dúo de trap y reggaetón se presenta en Studio Theater, Córdoba, en el marco de su gira latinoamericana.',
    category: 'concierto',
    startDate: new Date('2026-11-06T21:00:00-03:00'),
    venueName: 'Studio Theater',
    address: 'Córdoba',
    city: 'Córdoba',
    province: CORDOBA,
    mapsUrl: mapsQuery('Studio Theater', 'Córdoba'),
    artistName: 'Ayax y Prok',
    artistBio: 'Dúo español de trap y reggaetón.',
    tickets: [],
    ticketUrl: 'https://alpogo.com/evento/ayax-y-prok-latam-gira-tour-2k26-27849',
    isFree: false,
    featured: false,
  },
];

async function seedRealEvents() {
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

  console.log(`\n🌱 Seed de eventos reales completo. Creados: ${created} | Ya existían: ${skipped}`);
  await mongoose.disconnect();
}

seedRealEvents().catch((err) => {
  console.error('Error corriendo el seed de eventos reales:', err);
  process.exit(1);
});
