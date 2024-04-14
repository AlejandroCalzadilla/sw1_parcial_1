import { CanActivateFn, Router } from '@angular/router';
import { SigninService } from '../services/auth/signin.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token =inject(SigninService)
  const router = inject(Router)
  if(token.tokeng){
    return true
  }
   router.navigateByUrl('login')
  //console.log(token.tokef(),'prueba')
  return false ;
};
