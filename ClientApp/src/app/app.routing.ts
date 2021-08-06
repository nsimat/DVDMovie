import { OrderConfirmationComponent } from './store/checkout/orderConfirmation.component';
import { CheckoutSummaryComponent } from './store/checkout/checkoutSummary.component';
import { CheckoutDetailsComponent } from './store/checkout/checkoutDetails.component';
import { MovieSelectionComponent } from "./store/movieSelection.component";
import { Routes, RouterModule } from "@angular/router";
import { CartDetailComponent } from "./store/cartDetail.component";
import { CheckoutPaymentComponent } from './store/checkout/checkoutPayment.component';

const routes: Routes = [
  {path: "checkout/step1", component: CheckoutDetailsComponent},
  {path: "checkout/step2", component: CheckoutPaymentComponent},
  {path: "checkout/step3", component: CheckoutSummaryComponent},
  {path: "checkout", component: OrderConfirmationComponent},
  { path: "cart", component: CartDetailComponent },
  { path: "store", component: MovieSelectionComponent },
  { path: "", component: MovieSelectionComponent }
];

export const RoutingConfig = RouterModule.forRoot(routes);
