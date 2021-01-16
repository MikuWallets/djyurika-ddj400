import { NgModule } from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [],
  exports: [
    DropdownModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    PaginatorModule,
  ]
})
export class PrimeModule { }
