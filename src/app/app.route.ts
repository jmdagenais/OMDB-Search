import {Routes} from "@angular/router";
import {MovieDetailComponent} from "./movie-detail/movie-detail.component";
import {MovieSearchComponent} from "./movie-search/movie-search.component";
export const appRoutes: Routes = [
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  },
  {
    path: '',
    component: MovieSearchComponent
  }
];
