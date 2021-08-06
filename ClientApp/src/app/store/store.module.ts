import { OrderConfirmationComponent } from './checkout/orderConfirmation.component';
import { CheckoutSummaryComponent } from './checkout/checkoutSummary.component';
import { CheckoutPaymentComponent } from './checkout/checkoutPayment.component';
import { CheckoutDetailsComponent } from './checkout/checkoutDetails.component';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CartDetailComponent } from "./cartDetail.component";
import { CartSummaryComponent } from "./cartSummary.component";
import { CategoryFilterComponent } from "./categoryFilter.component";
import { MovieSelectionComponent } from "./movieSelection.component";
import { MoviesListComponent } from "./moviesList.component";
import { PaginationComponent } from "./pagination.component";
import { RatingsComponent } from "./ratings.component";

@NgModule({
  declarations: [
    CartSummaryComponent,
    CategoryFilterComponent,
    MoviesListComponent,
    MovieSelectionComponent,
    PaginationComponent,
    RatingsComponent,
    CartDetailComponent,
    CheckoutDetailsComponent,
    CheckoutPaymentComponent,
    CheckoutSummaryComponent,
    OrderConfirmationComponent
  ],
  imports: [BrowserModule, FormsModule, RouterModule],
  exports: [MovieSelectionComponent],
})
export class StoreModule {}
