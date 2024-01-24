import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { prisma } from '@/config/prisma';

/**
 * Retrieves all artists.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const allArtists = async (req: Request, res: Response) => {
    try {
        const artists = await prisma.artist.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                songs: true,
                albums: true,
            },
        });
        res.status(200).send(artists);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error retrieving artists',
        });
    }
};
