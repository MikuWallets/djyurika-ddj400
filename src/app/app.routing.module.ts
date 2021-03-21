import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: async () => (await import('./admin/admin.module')).AdminModule,
  },
  {
    path: '',
    component: MainComponent,
  },
  { path: '**', redirectTo: '' }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [ RouterModule.forRoot(routes, routerOptions) ],
  // providers: [{provide: APP_BASE_HREF, useValue: '/djyurika/'}],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
