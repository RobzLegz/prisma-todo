import { PrismaClient } from '@prisma/client';

declare global {
    var prisma_g: PrismaClient | undefined;
}

export const prisma = global.prisma_g || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma_g = prisma;
}
