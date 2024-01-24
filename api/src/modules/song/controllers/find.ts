import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';
import { prisma } from '@/config/prisma';

interface Params {
    name: string;
}

/**
 * Finds a song by name and returns their information along with their artist and album.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the found songs.
 * @throws If there is an error retrieving the songs.
 */
export const findSongs = async (req: Request, res: Response) => {
    try {
        const { name } = getRequestParams<Params>({
            ctx: req,
            params: ['name'],
        });

        const songs = await prisma.song.findMany({
            where: {
                name,
            },
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
