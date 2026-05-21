import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

export const authorizeRoles = (...allowedRoles: Array<'Admin' | 'Sales User'>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || 'Guest'}) is not allowed to access this resource`
      });
      return;
    }
    next();
  };
};