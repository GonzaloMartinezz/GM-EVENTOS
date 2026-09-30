import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db';
import User from '../models/User';
import Event from '../models/Event';
import { slugify } from './slugify';
import mongoose from 'mongoose';

async function seed() {
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
  } else {
    console.log(`👤 Usuario admin ya existía: ${adminEmail}`);
  }

  const sampleEvents = [
    {
      title: 'Festival de Rock del Norte',
      description:
        'Una noche a puro rock nacional con tres bandas tucumanas en el line-up y artistas invitados. Sonido, luces y feria de comidas en el predio.',
      category: 'festival',
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
      venueName: 'Estadio San Martín',
      address: 'Av. Ejército del Norte 1500',
      city: 'San Miguel de Tucumán',
      province: 'Tucumán',
      mapsUrl: 'https://maps.google.com/?q=Estadio+San+Martin+Tucuman',
      artistName: 'Varias bandas locales',
      artistBio: 'Line-up rotativo de bandas emergentes de la escena under tucumana.',
      bandMembers: [],
      images: [],
      tickets: [
        { label: 'General anticipada', price: 8000 },
        { label: 'General en puerta', price: 12000 },
      ],
      ticketUrl: 'https://www.passline.com/',
      isFree: false,
      featured: true,
    },
    {
      title: 'Stand up: Una noche de risas',
      description:
        'Show de stand up comedy con comediantes tucumanos. Humor local, situaciones cotidianas y mucha improvisación con el público.',
      category: 'standup',
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      venueName: 'Teatro Alberdi',
      address: 'San Martín 251',
      city: 'San Miguel de Tucumán',
      province: 'Tucumán',
      mapsUrl: 'https://maps.google.com/?q=Teatro+Alberdi+Tucuman',
      artistName: 'Comedy Tuc',
      artistBio: 'Colectivo de humoristas tucumanos con más de 5 años haciendo stand up en la provincia.',
      bandMembers: [{ name: 'Fede Ramos', role: 'comediante' }, { name: 'Lu Paz', role: 'comediante' }],
      images: [],
      tickets: [{ label: 'Entrada general', price: 6000 }],
      ticketUrl: 'https://www.passline.com/',
      isFree: false,
      featured: true,
    },
    {
      title: 'Obra: El Jardín de los Cerezos',
      description:
        'Clásico de Chéjov puesto en escena por un elenco local, con dirección contemporánea y ambientación de época.',
      category: 'teatro',
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
      venueName: 'Teatro Mercedes Sosa',
      address: 'Av. Sarmiento 251',
      city: 'San Miguel de Tucumán',
      province: 'Tucumán',
      mapsUrl: 'https://maps.google.com/?q=Teatro+Mercedes+Sosa+Tucuman',
      artistName: 'Elenco Sarmiento',
      bandMembers: [],
      images: [],
      tickets: [
        { label: 'Platea', price: 5000 },
        { label: 'Pullman', price: 3000 },
      ],
      ticketUrl: 'https://www.ticketek.com.ar/',
      isFree: false,
      featured: false,
    },
    {
      title: 'Recital en Buenos Aires: Gira Nacional',
      description:
        'Una de las bandas más convocantes del momento llega a Buenos Aires en el marco de su gira nacional, con invitados especiales.',
      category: 'concierto',
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35),
      venueName: 'Movistar Arena',
      address: 'Humboldt 450',
      city: 'Buenos Aires',
      province: 'Buenos Aires',
      mapsUrl: 'https://maps.google.com/?q=Movistar+Arena+Buenos+Aires',
      artistName: 'Banda Nacional Popular',
      artistBio: 'Una de las bandas de rock más importantes de la escena nacional actual.',
      bandMembers: [
        { name: 'J. Fernández', role: 'voz' },
        { name: 'M. Torres', role: 'guitarra' },
        { name: 'C. Gómez', role: 'batería' },
      ],
      images: [],
      tickets: [
        { label: 'Campo', price: 25000 },
        { label: 'Platea baja', price: 32000 },
        { label: 'Platea alta', price: 20000 },
      ],
      ticketUrl: 'https://www.ticketek.com.ar/',
      isFree: false,
      featured: true,
    },
    {
      title: 'Feria Cultural Gratuita en el Parque 9 de Julio',
      description:
        'Jornada al aire libre con música en vivo, artesanos, food trucks y actividades para toda la familia. Entrada libre y gratuita.',
      category: 'otro',
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      venueName: 'Parque 9 de Julio',
      address: 'Av. Roca s/n',
      city: 'San Miguel de Tucumán',
      province: 'Tucumán',
      mapsUrl: 'https://maps.google.com/?q=Parque+9+de+Julio+Tucuman',
      artistName: 'Varios artistas locales',
      bandMembers: [],
      images: [],
      tickets: [],
      isFree: true,
      featured: false,
    },
  ];

  for (const evt of sampleEvents) {
    const exists = await Event.findOne({ title: evt.title });
    if (exists) {
      console.log(`⏭  Ya existe: ${evt.title}`);
      continue;
    }
    const slug = slugify(evt.title);
    await Event.create({ ...evt, slug, createdBy: admin._id });
    console.log(`✅ Evento creado: ${evt.title}`);
  }

  console.log('🌱 Seed completo.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Error corriendo el seed:', err);
  process.exit(1);
});
