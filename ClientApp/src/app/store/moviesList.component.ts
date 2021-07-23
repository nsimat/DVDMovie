import { Component } from '@angular/core';
import { Repository } from '../models/repository';
import { Movie } from '../models/movie.model';

@Component({
  selector: "store-movies-list",
  templateUrl: "moviesList.component.html"
})
export class MoviesListComponent{
  constructor(private repo: Repository){}

  get movies(): Movie[]{
    return this.repo.movies;
  }
}
