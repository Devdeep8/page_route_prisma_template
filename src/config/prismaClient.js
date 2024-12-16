import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

let prisma;

// Use a singleton pattern to prevent multiple instances of PrismaClient
if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Logs for debugging (optional)
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
}

export default prisma;
