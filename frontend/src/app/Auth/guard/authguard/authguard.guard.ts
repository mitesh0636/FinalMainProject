import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = () => {
  const authservice = inject(AuthService);
  const router = inject(Router);

  if(authservice.isLoggedIn()){
    return true;
  }
  
  return router.createUrlTree(['/auth/login']);
};
