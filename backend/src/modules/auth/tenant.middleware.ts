import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenantContext } from '../database/database.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // In a real app, this gymId is extracted from the JWT token validated by AuthGuard
    // e.g., const gymId = req.user?.gymId;
    // For this demonstration, we'll assume it's attached to req.user by a previous AuthGuard
    const user = (req as any).user;
    
    // If the user has a gymId (not a SUPER_ADMIN), enforce tenant isolation
    if (user && user.gymId) {
      tenantContext.run({ gymId: user.gymId }, () => {
        next();
      });
    } else {
      // SUPER_ADMIN or public unauthenticated route (no isolation applied)
      next();
    }
  }
}
