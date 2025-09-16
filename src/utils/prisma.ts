import { PrismaClient } from "@prisma/client"

interface GlobalWithPrisma {
    prisma?: PrismaClient
}

const globalForPrisma = globalThis as GlobalWithPrisma

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
