import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { CookieService } from 'ngx-cookie-service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    CookieService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
