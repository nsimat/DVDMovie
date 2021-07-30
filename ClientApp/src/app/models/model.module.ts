import { NgModule } from '@angular/core';
import { Cart } from './cart.model';
import { Repository } from './repository';

@NgModule({
  providers: [Repository, Cart]
})
export class ModelModule {}
