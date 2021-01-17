import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeModule } from './shared';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CoreModule } from './core/core.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimeModule,
    CoreModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/admin/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
