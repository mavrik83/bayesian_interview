import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';
import { prisma } from '@/config/prisma';

interface Params {
    id: number;
}

/**
 * Finds an artist by their ID.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the artist object.
 */
export const findArtistById = async (req: Request, res: Response) => {
    try {
        const { id } = getRequestParams<Params>({
            ctx: req,
            params: ['id'],
        });

        const artist = await prisma.artist.findUnique({
            where: {
                id,
            },
            include: {
                songs: true,
                albums: true,
            },
        });

        res.status(200).send(artist);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error retrieving artist',
        });
    }
};
