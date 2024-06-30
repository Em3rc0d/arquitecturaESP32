import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-gw3t1o22is7w2ptm.us.auth0.com',
      clientId: 'lhJ9IMUqf94d2rD6ReEtkev3Eezz4kwm',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]

};
