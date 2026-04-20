import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth.service';

export const adminguardGuard: CanActivateFn = () => {
  const adminservice = inject(AuthService);

  if(adminservice.isAdmin()){
    return true;
  }
  return false;
};
