import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';
import { prisma } from '@/config/prisma';

interface Params {
    name: string;
}

/**
 * Finds an artist by name and returns their information along with their songs and albums.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the found artists.
 * @throws If there is an error retrieving the artist.
 */
export const findArtist = async (req: Request, res: Response) => {
    try {
        const { name } = getRequestParams<Params>({
            ctx: req,
            params: ['name'],
        });

        const artists = await prisma.artist.findMany({
            where: {
                name,
            },
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
            errorMessage: 'Error retrieving artist',
        });
    }
};
