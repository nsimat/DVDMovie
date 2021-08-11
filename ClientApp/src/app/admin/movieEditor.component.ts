import { Component } from "@angular/core";
import { Repository } from "../models/repository";
import { Movie } from "../models/movie.model";
import { Studio } from "../models/studio.model";

@Component({
  selector: "admin-movie-editor",
  templateUrl: "movieEditor.component.html",
})
export class MovieEditorComponent {
  constructor(private repo: Repository) {}

  get movie(): Movie {
    return this.repo.movie;
  }

  get studios(): Studio[] {
    return this.repo.studios;
  }

  compareStudios(std1: Studio, std2: Studio) {
    return std1 && std2 && std1.name == std2.name;
  }
}
