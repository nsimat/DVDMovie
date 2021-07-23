import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../models/movie.model";
import { Repository } from "../models/repository";

@Component({
  selector: "movie-detail",
  templateUrl: "movieDetail.component.html",
})
export class MovieDetailComponent {
  constructor(private repo: Repository,
                      router: Router,
                      activeRoute: ActivatedRoute) {
                        let id =Number.parseInt(activeRoute.snapshot.params['id']);
                        if(id){
                          this.repo.getMovie(id);
                        }else{
                          router.navigateByUrl("/")
                        }
                      }

  get movie(): Movie {
    return this.repo.movie;
  }
}
