/* eslint-disable vars-on-top, no-var */
import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var prisma: PrismaClient;
}

export {};
