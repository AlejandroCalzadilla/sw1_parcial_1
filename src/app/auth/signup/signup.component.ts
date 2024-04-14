import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from '../../services/auth/signup.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  //usuario: User| undefined;
  usuario:any ;

  constructor( private signupService:SignupService,private router: Router,private fb: FormBuilder ){
  
   }
  ngOnInit() {

  }
   getUserFormData(data:any){
       console.warn(data)
      this.signupService.createUser(data).subscribe((result)=>{
        console.warn(result)
        this.router.navigate(['proyectos']);
      })
   }

  proyectos :any[]=[];
  obtenerTodos():void{
     
    this.signupService.getodos().subscribe(
     response=>{
       console.log('lista de productos de la bc',response)
       this.proyectos=response;
     }
     );
  }

}
