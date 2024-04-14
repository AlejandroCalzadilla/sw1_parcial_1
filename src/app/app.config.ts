import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { SignupService } from './services/auth/signup.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withHashLocation()),
    provideHttpClient(),
    SignupService, provideAnimationsAsync()
  ]
};
