import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
//import { User } from '../../Models/User.model';
import {User} from '../../Models/user'
@Injectable({
  providedIn: 'root'
})
export class SigninService {
   token='';
   tokenkey='token_key';
    
   currentUserLogionOn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false); 
  
  
   currerUserData:BehaviorSubject<User>=new BehaviorSubject<User>({id:'',email:'',lastName:'',userName:'',token:'',name:''})





  constructor(private http: HttpClient) {
    const token=localStorage.getItem(this.tokenkey)
    if(token){
      this.token=token
    }

   }



   get tokeng(): string | null {
    return localStorage.getItem(this.tokenkey);
   }

  
   get userid():string|null{
      return localStorage.getItem('userid')  
   }
   get username():string|null{
    return localStorage.getItem('username')  
   }
   
   get userLastName():string|null{
    return localStorage.getItem('lastname')  
   }



  set tokens(value: string | null) {
    if (value) {
      localStorage.setItem(this.tokenkey, value);
    } else {
      localStorage.removeItem(this.tokenkey);
    }
  }

   Login(credentials:LoginRequest):Observable<User>{
    const api = 'http://localhost:3001/api/auth/login';
    return this.http.post<User>(api, credentials).pipe(
      tap((userData: User) => {
        //this.currerUserData.next(userData);
        //this.currentUserLogionOn.next(true);
        localStorage.setItem('token_key',userData.token)
        localStorage.setItem('userid',userData.id)
        localStorage.setItem('username',userData.name)
        localStorage.setItem('lastname',userData.lastName)
       // this.token = userData.token;
        console.log(userData.name, 'prueba de token');
      }),
      catchError(this.handledError)
    )
   }

   logout() {
    // Limpiar el token y los datos del usuario al cerrar sesión
    
      this.token ='';
      localStorage.removeItem(this.tokenkey);
    }



 

 

  private handledError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
      return throwError(() => new Error('Se ha producido un error. Por favor, inténtelo nuevamente'));
    } else {
      // let errorMessage = error.error.message ? error.error.message[0] : 'Error desconocido';
      let errorMessage = error.error.message ? error.error: 'Error desconocido';
       if(errorMessage.message[0]==="The password must have a Uppercase, lowercase letter and a number"){
        errorMessage="la contraseña debe tener letras mayusculas, minusculas y numeros"
       }
       if(errorMessage.message=="Credentials are not valid(password)"){
        errorMessage="ta mal tu contraseña choco xd"
       } 
      
      return throwError(() => new Error(errorMessage ));
    }
  }





  
  get userData():Observable<User>{
    return this.currerUserData.asObservable()
  }
  get userLoginOn():Observable<boolean>{
    return this.currentUserLogionOn.asObservable()
  }
 

 
}
