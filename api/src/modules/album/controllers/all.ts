import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { prisma } from '@/config/prisma';
 
/**
 * Retrieves all albums with their associated artists and songs.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A Promise that resolves to an array of albums.
 */
export const allAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await prisma.album.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                artist: true,
                song: true,
            },
        });

        res.status(200).send(albums);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error retrieving albums',
        });
    }
};
