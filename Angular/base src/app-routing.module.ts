import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminGuard } from './admin.guard';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

const routes: Routes = [
	path: '',
    component: BaseLayoutComponent,  // base con header y footer para todos los templates
    children: [
        {
          path: '',
          redirectTo: '/account/login',
          pathMatch: 'full',  // la url sin ningun path
        },
        {
          path: 'account',  // significa que no hubo match
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        {
          path: 'contact',  // significa que no hubo match
          component: ContactComponent
        }
      ]
  },
  {
    path: 'home',
    redirectTo: '/panel',
    pathMatch: 'full',
  },
  {
	path: 'admin',  // significa que no hubo match
	canActivate: [AdminGuard],
	loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {  // este se deja para el final
    path: '**',  // significa que no hubo match
    component: PageNotFoundComponent,  // se puede redirigir a 404 o al home!
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
