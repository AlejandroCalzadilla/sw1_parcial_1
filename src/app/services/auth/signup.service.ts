import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
//import { environment } from '.../';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

   //create=new Environment;
  //create2=environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  // getodos():Observable<any[]>{
  //   return this.http.get<any[]>(environment.apiUrl); 
  //  } 
  
   
  postData(data: any): Observable<any> {
    //const api='http://192.168.1.3:3000/api/auth/register'
     const api=environment.domain+'/auth/register'
    console.log(data)
    return this.http.post<any>(api, data);
  }


  getodos():Observable<any[]>{
     //console.log(environment,'prueba')
     //const api='http://localhost:3001/api/proyecto'
     const api=environment.domain+'/auth/proyecto'
    return this.http.get<any[]>(api); 
   } 

   createUser(user: any) {
    //const api='http://192.168.1.3:3001/api/auth/register'
    const api=environment.domain+'/auth/register'
    return this.http.post(api,user) 
  }


}
