/* eslint-disable import/no-mutable-exports */
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

/**
 * This module exports an instance of PrismaClient, which is used to interact with the database.
 *
 * If the application is running in a production environment (i.e., process.env.NODE_ENV === 'production'),
 * a new instance of PrismaClient is created each time this module is imported.
 *
 * In non-production environments, to optimize performance and resource usage,
 * a single instance of PrismaClient is created and attached to the global object the first time this module is imported.
 * Subsequent imports of this module in the same runtime will reuse the existing PrismaClient instance.
 *
 * @module prisma
 * @exports prisma
 */
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export { prisma };
