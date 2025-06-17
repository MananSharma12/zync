import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export * from 'kafkajs';
export * from '@prisma/client';