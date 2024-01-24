import { Request } from 'express';

export interface GetParamsArgs {
    ctx: Request;
    params: string[];
}

// Define a generic object type.
export type AnyObject = { [key: string]: any };

// Ensure the input object and the return type are of type AnyObject.
const validParams = (obj: AnyObject, keys: string[]): AnyObject => {
    const returnNoParams = keys.length === 0;
    if (returnNoParams) return {};

    const returnAllParams = keys.length === 1 && keys[0] === '';
    if (returnAllParams) return obj;

    return keys
        .map((key: string) => (key in obj ? { [key]: obj[key] } : {}))
        .reduce(
            (acc: AnyObject, currValue: AnyObject) => ({
                ...acc,
                ...currValue,
            }),
            {},
        );
};

// Ensure the return type is AnyObject.
const allHTTPRequestParams = (ctx: Request): AnyObject => ({
    ...ctx.query,
    ...ctx.body,
    ...ctx.params,
});

// Use a generic T to denote the expected return type.
export const getRequestParams = <T extends AnyObject>(args: GetParamsArgs): T =>
    validParams(allHTTPRequestParams(args.ctx), args.params) as T;
