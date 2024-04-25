import { CommonModule } from '@angular/common';
import { Component , Injectable, ViewChild} from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from '../services/auth/signup.service';
import { SigninService } from '../services/auth/signin.service';
import { User } from '../Models/user';
import { ProyectService } from '../services/proyects.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Proyecto } from './proyecto';


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
  user!:User
  numeroAleatorio: number;
  crear:boolean=false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  nombre!:string
  constructor( private proyectservice: ProyectService,private router: Router, private formbuilder:FormBuilder,private signinService:SigninService){
    this.numeroAleatorio = Math.floor(Math.random() * 101);
  }

 ngOnInit():void{

  let sala: string = this.numeroAleatorio.toString();
  localStorage.setItem('sala',sala)
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
         
        //console.log('esta mandado el id del usuario',proyectuserid)
        localStorage.setItem('proyecto_id',proyectoid);
        

      }

      proyecto2(proyectuserid:string){
        localStorage.setItem('proyectouid',proyectuserid)


      }  




  obtenerTodos():void{
    
    
  }

   logout(){

    this.signinService.logout()
   }

   enviarDatos(): void {
     console.log(this.nombre,'es la url ')
     this.router.navigateByUrl(this.nombre)


  ///  console.log('Nombre:', this.nombre);
   // console.log('Apellido:', this.apellido);
    // Aquí puedes hacer lo que necesites con los datos, como enviarlos a través de un servicio, etc.
  }
 

  createp(data:Proyecto){
    let id=this.signinService.userid  
    data.userid=id! 
    this.signinService.create(data).subscribe(
      {
        next:(res)=>{
          this.proyectservice.getAllByUser(this.user.id).subscribe(
            response=>{
              console.log('lista de productos de la bc',response)
              console.log(this.proyectos,'longitud de todos ')
              this.proyectos=response;
            }
            );
           
        }
      }
    )

  }

   abrir(){

   }


}
