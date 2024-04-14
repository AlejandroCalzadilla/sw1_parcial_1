import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {environment} from '../environments/environment.development'
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PizarraComponent } from './pizarra/pizarra.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,SignupComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcialsw1';
  
  ruta: string | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ruta = event.url.slice(1); // Elimina el primer caracter '/'
      }
    });
  }

}
