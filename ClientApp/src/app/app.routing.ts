import { MovieSelectionComponent } from "./store/movieSelection.component";
import { Routes, RouterModule } from "@angular/router";
import { CartDetailComponent } from "./store/cartDetail.component";

const routes: Routes = [
  { path: "cart", component: CartDetailComponent },
  { path: "store", component: MovieSelectionComponent },
  { path: "", component: MovieSelectionComponent },
];

export const RoutingConfig = RouterModule.forRoot(routes);
