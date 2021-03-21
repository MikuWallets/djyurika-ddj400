import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';
import { NavComponent } from 'app/nav/nav.component';
import { PrimeModule } from 'app/shared';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app.routing.module';
import { WebService } from 'app/core/services';



@NgModule({
  declarations: [
    NavComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    CoreModule,
  ],
  providers: [ ],
})
export class AdminModule { }
