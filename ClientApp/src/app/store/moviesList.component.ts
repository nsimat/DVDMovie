import { Component } from "@angular/core";
import { Repository } from "../models/repository";
import { Movie } from "../models/movie.model";
import { Cart } from "../models/cart.model";

@Component({
  selector: "store-movies-list",
  templateUrl: "moviesList.component.html",
})
export class MoviesListComponent {
  constructor(private repo: Repository, private cart: Cart) {}

  get movies(): Movie[] {
    if (this.repo.movies != null && this.repo.movies.length > 0) {
      let pageIndex =
        (this.repo.pagination.currentPage - 1) * this.repo.pagination.moviesPerPage;
      return this.repo.movies.slice(
                    pageIndex,
                    pageIndex + this.repo.pagination.moviesPerPage
      );
    }
  }

  addCart(movie: Movie){
    this.cart.addMovie(movie);
  }
}
