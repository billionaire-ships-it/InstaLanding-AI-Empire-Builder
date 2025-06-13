// Assumes you're using Prisma + PostgreSQL (or can adapt to your DB)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;
