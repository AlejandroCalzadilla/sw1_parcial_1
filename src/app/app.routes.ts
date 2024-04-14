import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SignupService } from './services/auth/signup.service';
import { SignupComponent } from './auth/signup/signup.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PizarraComponent } from './pizarra/pizarra.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
   // { path:'',redirectTo:'/home'},
    { path:'', component:HomeComponent},
    { path:'register', component:SignupComponent},
    {
         path:'proyectos', 
         component:ProyectsComponent,
         canActivate:[authGuard]
        },
    { path:'login', component:SigninComponent},
    { path:'pizarra', component:PizarraComponent,canActivate:[authGuard]},


];
