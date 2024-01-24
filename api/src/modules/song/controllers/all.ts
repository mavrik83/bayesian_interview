import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { prisma } from '@/config/prisma';

/**
 * Retrieves all songs.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const allSongs = async (req: Request, res: Response) => {
    try {
        const songs = await prisma.song.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                artist: true,
                album: true,
            },
        });
        res.status(200).send(songs);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error retrieving songs',
        });
    }
};
