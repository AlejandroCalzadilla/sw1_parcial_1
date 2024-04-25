import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { SigninService } from './auth/signin.service';
import { Proyecto } from "../proyects/proyecto";

@Injectable({
    providedIn: 'root'
  })
export class ProyectService{

     private enpoint='/proyecto';
    constructor(private http: HttpClient,private signinservice:SigninService) { }

    fisrtFive(param:string):Observable<any[]>{
         const enpoint2='/firstFive'
         const api=environment.domain;
       
          return this.http.get<any[]>(`${api}${this.enpoint}${enpoint2}?userid=${this.signinservice.userid}`);

     
       // return this.http.get<any[]>(`${api}${this.enpoint}${enpoint2}?userid=${param}`); 
      } 


      getAllByUser(param:string):Observable<any[]>{
        const api=environment.domain;
        const enpoint2='/user' 

        //if(!param){ 
        return this.http.get<any[]>(`${api}${this.enpoint}${enpoint2}?id=${this.signinservice.userid}`); 
        //}
       // return this.http.get<any[]>(`${api}${this.enpoint}${enpoint2}?id=${param}`);
      
      }

      get userid():string|null{
        return localStorage.getItem('userid')  
     }

      logout(){
        this.signinservice.logout()
      }



      findById(id:string):Observable<Proyecto>{
        const enpoint2='/ids'
        const api=environment.domain;
         //console.log(this.http.get<any[]>(`${api}${this.enpoint}${enpoint2}?id=${id}`))
         return this.http.get<Proyecto>(`${api}${this.enpoint}${enpoint2}?id=${id}`);
      // return this.http.get<any[]>(`${api}${this.enpoint}${enpoint2}?userid=${param}`); 
     } 


      save(data:any,id:string):Observable<any>{

        const api='/proyecto/nodes'
        return this.http.patch<any>(`${environment.domain}${api}?id=${id}`,data) 
      }

    
}