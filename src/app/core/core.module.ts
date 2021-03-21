import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebService } from './services';

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
  ],
  providers: [
    WebService,
  ]
})
export class CoreModule { }
