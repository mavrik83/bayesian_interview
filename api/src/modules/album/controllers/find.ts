import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';
import { prisma } from '@/config/prisma';

interface Params {
    name: string;
    releaseDate: string;
    price: number;
}

/**
 * Finds albums based on the provided search parameters.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the found albums.
 * @throws If there is an error retrieving the albums.
 */
export const findAlbums = async (req: Request, res: Response) => {
    try {
        const { name, releaseDate, price } = getRequestParams<Params>({
            ctx: req,
            params: ['name', 'releaseDate', 'price'],
        });

        const albums = await prisma.album.findMany({
            where: {
                name,
                releaseDate: new Date(releaseDate),
                price,
            },
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
