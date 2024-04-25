import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SigninService } from '../../services/auth/signin.service';
import { LoginRequest } from '../../services/auth/loginRequest';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  token=""
  logierror:string=""
  loginForm=this.formbuilder.group({
    email:['example@gmail.com',[Validators.required,Validators.email]],
    password:['',Validators.required],
  })
  constructor( private signinService:SigninService,private router: Router,private formbuilder:FormBuilder,private route:ActivatedRoute){ }

     get email(){
      return this.loginForm.controls.email
     }
     get password(){
      return this.loginForm.controls.password
     }




    login(){
     if(this.loginForm.valid){
      console.log("lamar al servicio de login"),
      this.signinService.Login(this.loginForm.value as LoginRequest).subscribe({
        next:(userdata)=>{
          console.log(userdata.id,'prueba alejandro')
        },
        error:(errordata)=>{
           this.logierror=errordata;
        },
        complete:()=>{
          console.info("login esta completo")
          
          //console.log('llega por el login para ver ',this.route.snapshot.queryParams['returnUrl'] || '/')
          //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           //let a=5
           //console.log(returnUrl,'dadsadssadsa')
           //if(returnUrl){
            //console.log('porque no entra che')
           // this.router.navigateByUrl(returnUrl);     
          // }
           //else{
            this.router.navigateByUrl('/proyectos')


           //}
             
           //let a ="/sala27e856bf-89a8-4681-b137-0a2ac1e44d1b"
           //this.router.navigateByUrl(a);  



          //ruta
          this.loginForm.reset()//limpia el form
        }
      })
      
     }
     else{
       this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos")
     }
     
     //this.router.navigateByUrl('/proyectos')

    }

   



//   getUserFormData(data:any){
   
//     console.warn(data)
//    this.signinService.Login(data).subscribe((result)=>{
//      console.warn(result)
//      this.router.navigate(['proyectos']);
//    })
// }


}
