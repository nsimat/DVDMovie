import { Component } from '@angular/core';
import { Repository } from "./models/repository";
import { Movie } from "./models/movie.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Web Development with ASP.NET Core & Angular 12';

  constructor(private repo: Repository) { }
  get movie(): Movie {
    return this.repo.movie;
  }
  get movies(): Movie[] {
    return this.repo.movies;
  }
}
