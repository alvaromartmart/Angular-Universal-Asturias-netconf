import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {SeoService} from './services/seo/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularUniversalWorkshop';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public seoService: SeoService) {
    console.log('Estamos en:', this.platformId);
    if (isPlatformBrowser(this.platformId)) {
      console.log(window.location.href);
    } else {
      console.log('Estamos en el servidor y no tenemos disponible la propiedad del navegador window');
    }

    this.seoService.configSEO({
      title: 'Página de inicio',
      description: 'Esto es una descripción molona',
      keywords: 'Inicio, Heroes, ciencia, science',
    });
  }
}
