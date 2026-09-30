import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`🚀 API corriendo en http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Error fatal al iniciar el servidor:', err);
  process.exit(1);
});
