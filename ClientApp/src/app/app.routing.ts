import { MovieSelectionComponent } from './store/movieSelection.component';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "store", component: MovieSelectionComponent},
  { path: "", component: MovieSelectionComponent }
];

export const RoutingConfig = RouterModule.forRoot(routes);
