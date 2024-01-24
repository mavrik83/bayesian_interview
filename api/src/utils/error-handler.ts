import { Response } from 'express';

interface Args {
    res: Response;
    error: Error;
    errorMessage: string;
    info?: { [key: string]: unknown };
    statusCode?: number;
}

/**
 * Sends an error response to the client.
 *
 * @param {Object} res - The response object.
 * @param {Error} error - The error object.
 * @param {string} errorMessage - The error message.
 * @param {Object} [info={}] - Additional information about the error.
 * @param {number} [statusCode=502] - The status code to send with the response.
 */
export const sendErrorResponse = ({
    res,
    error,
    errorMessage,
    info = {},
    statusCode = 502,
}: Args) => {
    const errorResponse = {
        message: `${errorMessage.toUpperCase()}`,
        info: {
            ...info,
        },
    };

    // eslint-disable-next-line no-console
    console.error(error);

    res.status(statusCode).send(errorResponse);
};

/**
 * Processes the given error and returns an Error object.
 *
 * @param error - The error to be processed.
 * @returns The processed Error object.
 */
export const processError = (error: unknown): Error => {
    if (error instanceof Error) {
        return error;
    }

    if (typeof error === 'string') {
        return new Error(error);
    }

    if (typeof error === 'object' && error !== null) {
        const message =
            (error as { message?: string }).message ||
            'An unknown error occurred';
        return new Error(message);
    }

    return new Error('An unknown error occurred');
};
