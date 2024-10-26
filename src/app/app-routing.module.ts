import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*
  // 25/10/24 DH: TAKEN FROM: 'angular-photoviewer-app'
  //                          -------------------------
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  */

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    // 26/10/24 DH: Orig 'angular-photoviewer-app' path (which is illogical for [viewer/photoviewer] coupling)
    //path: 'photoviewer/:mode',

    path: 'viewer/:mode',
    loadChildren: () => import('./tab1/viewer/viewer.module').then( m => m.ViewerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
