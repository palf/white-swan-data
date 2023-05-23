import type { Request, Response, NextFunction } from 'express';

import passport from 'passport';

// Authentication middleware to protect API endpoints
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  passport.authenticate(
    'local',
    { session: false },
    (err: string, user: string) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      return next();
    }
  )(req, res, next);
}
