import { NgModule } from '@angular/core';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { Repository } from './repository';

@NgModule({
  providers: [Repository, Cart, Order]
})
export class ModelModule {}
