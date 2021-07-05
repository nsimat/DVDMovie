import { Movie } from "./movie.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const moviesUrl = "/api/movies";
@Injectable()
export class Repository {

  constructor(private http: HttpClient) {
    this.getMovies(true);
  }

  getMovie(id: number) {
    this.http.get(moviesUrl + "/" + id)
             .subscribe(response => { this.movie = response });
  }

  getMovies(related = false){
    this.http.get<Movie[]>(moviesUrl + "?related=" + related)
             .subscribe(response => this.movies = response);
  }

  movie: Movie;
  movies: Movie[];
}
