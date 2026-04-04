import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {

  if (req.user && (req.user as any).role === 'admin') {
    console.log("Hii 1")
    return next();
  }

  res.status(403).json({ error: 'Access denied. Admins only.' });
};