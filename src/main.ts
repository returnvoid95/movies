import { AppComponent } from './app/app.component';
import { bootstrapApplication, } from '@angular/platform-browser';
import { API_AUTH_TOKEN, BASE_API_URL_TOKEN } from './app/models';
import { dataProviders } from './app/data';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

async function main() {
  await bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(HttpClientModule),
      provideAnimations(),
      { provide: BASE_API_URL_TOKEN, useValue: 'https://api.kinopoisk.dev/v1.4/movie' },
      { provide: API_AUTH_TOKEN, useValue: 'QRQ6VW4-9ENM173-KKMHWPF-B1SSW1J' },
      ...dataProviders
    ]
  });
}

main();
