import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';
import { prisma } from '@/config/prisma';

interface Params {
    name: string;
    releaseDate: string;
    price: string;
    artistId: string;
}

/**
 * Creates a new album.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the created album.
 * @throws If there is an error creating the album.
 */
export const createAlbum = async (req: Request, res: Response) => {
    try {
        const { name, releaseDate, price, artistId } = getRequestParams<Params>(
            {
                ctx: req,
                params: ['name', 'releaseDate', 'price', 'artistId'],
            }
        );

        const album = await prisma.album.create({
            data: {
                name,
                releaseDate: new Date(releaseDate),
                price: parseFloat(price),
                artist: {
                    connect: {
                        id: parseInt(artistId, 10),
                    },
                },
            },
            include: {
                artist: true,
            },
        });

        res.status(200).send(album);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error creating album',
        });
    }
};
