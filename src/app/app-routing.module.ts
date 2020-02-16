import {Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {ExtraOptions, ROUTER_CONFIGURATION, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {isPlatformServer} from '@angular/common';
import {HeroResolver} from './resolvers/hero.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'heroes', loadChildren: () => import('./pages/heroes/heroes.module').then(m => m.HeroesModule)},
  {path: 'heroes/:id', resolve: {hero: HeroResolver}, loadChildren: () => import('./pages/hero/hero.module').then(m => m.HeroModule)},
  {path: 'error/:id', loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)},
  {path: '**', redirectTo: '/error/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(@Inject(ROUTER_CONFIGURATION) config: ExtraOptions, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformServer(this.platformId)) {
      config.initialNavigation = 'enabled';
    }
  }
}
