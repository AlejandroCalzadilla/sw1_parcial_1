import { CanActivateFn, Router } from '@angular/router';
import { SigninService } from '../services/auth/signin.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token =inject(SigninService)
  const router = inject(Router)
  console.log('entro al authguard')
  if(token.tokeng){
    return true
  }
  const protocol = window.location.protocol;
    const host = window.location.host;
   // const route = this.ruta.url;
   console.log(`${protocol}//`,'el protocol')
   console.log(`${host}`,'el host')
   console.log(`${protocol}//${host}/#/${route.url}`,'esta es la ruta o nel ')
   const sala=`${protocol}//${host}/#/${route.url}`
  // console.log('esta es la url del giard',state.url)
  // router.navigateByUrl('login')
  router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  //console.log(token.tokef(),'prueba')
  return false ;
};
