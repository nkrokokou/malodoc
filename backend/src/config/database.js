import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Test de connexion
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Déconnexion propre
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
  console.log('Database disconnected');
};

// Gestion des erreurs Prisma
process.on('beforeExit', async () => {
  await disconnectDatabase();
});

export default prisma;
