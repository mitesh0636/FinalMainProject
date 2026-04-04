import { Request, Response, NextFunction } from 'express';

// This function "wraps" your controller and automatically catches any errors,
// passing them to next(error) so you don't have to write try/catch anymore!
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};