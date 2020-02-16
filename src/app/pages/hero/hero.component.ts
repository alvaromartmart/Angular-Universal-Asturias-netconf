import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../../models/hero/hero';
import {ActivatedRoute, Router} from '@angular/router';
import {SeoService} from '../../services/seo/seo.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {

  hero: Hero;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, private seoService: SeoService) {
    this.hero = route.snapshot.data.hero;
    if (!this.hero) {
      this.router.navigate(['error', '404'], {skipLocationChange: true});
    }
    this.seoService.configSEO({
      title: this.hero.name,
      description: this.hero.description,
      keywords: 'Inicio, Heroes, ciencia, science',
      crawlerImage: this.hero.image,
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
