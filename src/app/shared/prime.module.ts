import { NgModule } from '@angular/core';

import { DropdownModule } from "primeng/dropdown";
import { PasswordModule } from "primeng/password";
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  exports: [
    DropdownModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
  ]
})
export class PrimeModule { }
