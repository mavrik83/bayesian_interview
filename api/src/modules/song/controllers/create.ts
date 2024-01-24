import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';

interface Params {
    name: string;
    artistId: number;
    albumId: number;
}

/**
 * Creates a new song.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createSong = async (req: Request, res: Response) => {
    try {
        const { name, artistId, albumId } = getRequestParams<Params>({
            ctx: req,
            params: ['name', 'artistId', 'albumId'],
        });

        const song = await prisma.song.create({
            data: {
                name,
                artist: {
                    connect: {
                        id: artistId,
                    },
                },
                album: {
                    connect: {
                        id: albumId,
                    },
                },
            },
            include: {
                artist: true,
                album: true,
            },
        });

        res.status(201).send(song);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error creating song',
        });
    }
};
