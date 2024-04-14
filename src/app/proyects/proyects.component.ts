import { CommonModule } from '@angular/common';
import { Component , Injectable, ViewChild} from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from '../services/auth/signup.service';
import { SigninService } from '../services/auth/signin.service';
import { User } from '../Models/user';
import { ProyectService } from '../services/proyects.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-proyects',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,  MatPaginatorModule],
  templateUrl: './proyects.component.html',
  styleUrl: './proyects.component.css'
})
export class ProyectsComponent {
  userLogin:boolean=false;
  proyectosFF :any[]=[];
  proyectos :any[]=[];
  pageSize = 5; 
  user?:User
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private proyectservice: ProyectService,private router: Router, private formbuilder:FormBuilder,private signinService:SigninService){
  
  }

 ngOnInit():void{
  
   this.signinService.currerUserData.subscribe({
    next:(user)=>{
      this.user=user
    }
   })


    if(this.user?.id !== undefined){
      console.log(this.user.id,'entra o no entra')
      this.proyectservice.fisrtFive(this.user.id).subscribe(
        response=>{
         // console.log('lista de productos de la bc',response)
          //console.log(this.proyectos,'longitud')
          this.proyectosFF=response;
        }
        );
  

        this.proyectservice.getAllByUser(this.user.id).subscribe(
          response=>{
            console.log('lista de productos de la bc',response)
            console.log(this.proyectos,'longitud de todos ')
            this.proyectos=response;
          }
          );
    }
   
 }

  

   iniciales(){
    const nombre =this.signinService.username![0]
     const apellido=this.signinService.userLastName![0]
    
     return nombre ? apellido ? nombre + apellido : '' : '';
    
   }


      proyecto(proyectoid:string){

        localStorage.setItem('proyecto_id',proyectoid)
      }




  obtenerTodos():void{
    
    
  }

   logout(){

    this.signinService.logout()
   }

  


}
