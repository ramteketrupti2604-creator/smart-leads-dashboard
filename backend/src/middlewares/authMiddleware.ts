import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: 'Admin' | 'Sales User';
  };
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
     token = req.headers.authorization.split(' ')[1];

     const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallbackSecretKey123'
      ) as { id: string; role: 'Admin' | 'Sales User' };

      req.user = {
        id: decoded.id,
        role: decoded.role
      };

      return next(); 
    } catch (error) {
      
      res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token verification failed' 
      });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token provided' 
    });
    return;
  }
};