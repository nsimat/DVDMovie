import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
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
  ],
  imports: [BrowserModule],
  exports: [MovieSelectionComponent],
})
export class StoreModule {}
