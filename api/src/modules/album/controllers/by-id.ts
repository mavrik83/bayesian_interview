import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';
import { prisma } from '@/config/prisma';

interface Params {
    id: number;
}

/**
 * Finds an album by its ID.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the found album.
 */
export const findAlbumById = async (req: Request, res: Response) => {
    try {
        const { id } = getRequestParams<Params>({
            ctx: req,
            params: ['id'],
        });

        const album = await prisma.album.findUnique({
            where: {
                id,
            },
            include: {
                artist: true,
                song: true,
            },
        });

        res.status(200).send(album);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error retrieving album',
        });
    }
};
