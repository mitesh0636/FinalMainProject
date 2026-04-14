import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {

  if (req.user && (req.user as User).role === 'admin') {
    return next();
  }

  res.status(403).json({ error: 'Access denied. Admins only.' });
};