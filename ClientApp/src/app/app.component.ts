import { Component } from '@angular/core';
import { Repository } from './models/repository';
import { Movie } from './models/movie.model';
import { Studio } from './models/studio.model';

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

  createMovie() {
    this.repo.createMovie(new Movie(0,'bit.ly/2D8C6ha',
                                      'X-Men Apocalypse',
                                      'Drama',
                                      'After the re-emergence of the world\'s first mutant, ' +
                                      'the world-destroyer Apocalypse, the X-Men must unite to defeat his ' +
                                      'extinction level plan.',
                                      49.99,
                                      this.repo.movies[0].studio
                                    )
                          )
  }

  createMovieAndStudio() {
    let stud = new Studio(0, 'SkyTaylor Films', 'Brooklyn', 'NY');
    let mov = new Movie(0, 'bit.ly/2D7Vtqo',
                           'Chef',
                           'Romance',
                           'A head chef quits his restaurant job and buys a food truck',
                           100,
                           stud
                       );
    this.repo.createMovieAndStudio(mov, stud);
  }
}
