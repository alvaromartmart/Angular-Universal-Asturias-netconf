import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

export interface ConfigSeo {
  title;
  description;
  keywords;
  index?;
  follow?;
  crawlerTitle?;
  crawlerDescription?;
  crawlerImage?;
  twitterTitle?;
  twitterDescription?;
  canonical?;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {


  constructor(private title: Title,
              private meta: Meta,
              @Inject(DOCUMENT) private doc,
  ) {
  }

  configSEO(config: ConfigSeo) {
    this.title.setTitle(config.title);
    const pathname = new URL(this.doc.URL).pathname;
    this.meta.updateTag({name: 'description', content: config.description});
    this.meta.updateTag({name: 'robots', content: config.index && config.follow ? (config.index + ',' + config.follow) : 'index,follow'});
    this.meta.updateTag({name: 'keywords', content: config.keywords});
    this.meta.updateTag({name: 'og:type', content: 'website'});
    this.meta.updateTag({name: 'og:title', content: config.crawlerTitle || config.title});
    this.meta.updateTag({name: 'og:description', content: config.crawlerDescription || config.description});
    this.meta.updateTag({name: 'og:url', content: environment.baseUrl + pathname});
    this.meta.updateTag({name: 'og:site_name', content: 'Science Heroes'});
    this.meta.updateTag({
      name: 'og:image',
      content: `${environment.baseUrl}/${config.crawlerImage}` || `${environment.baseUrl}/assets/images/ada.jpg`
    });
    this.meta.updateTag({name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({name: 'twitter:url', content: environment.baseUrl + pathname});
    this.meta.updateTag({name: 'twitter:title', content: config.twitterTitle || config.title});
    this.meta.updateTag({name: 'twitter:description', content: config.twitterDescription || config.description});
    this.meta.updateTag({name: 'twitter:site', content: '@davidcmeier'});

    const linkElement = this.doc.head.querySelector(`link[rel='canonical']`)
      || this.doc.head.appendChild(this.doc.createElement('link'));
    if (linkElement) {
      linkElement.setAttribute('rel', 'canonical');
      linkElement.setAttribute('href', config.canonical || this.doc.URL.split('?')[0]);
    }

  }


}
