import { Request, Response } from 'express';
import { processError, sendErrorResponse } from '@/utils/error-handler';
import { getRequestParams } from '@/utils/get-req-params';
import { prisma } from '@/config/prisma';

interface Params {
    name: string;
}

/**
 * Creates a new artist.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createArtist = async (req: Request, res: Response) => {
    try {
        const { name } = getRequestParams<Params>({
            ctx: req,
            params: ['name'],
        });

        const artist = await prisma.artist.create({
            data: {
                name,
            },
        });

        res.status(201).send(artist);
    } catch (error) {
        const processedError = processError(error);
        sendErrorResponse({
            res,
            error: processedError,
            errorMessage: 'Error creating artist',
        });
    }
};
