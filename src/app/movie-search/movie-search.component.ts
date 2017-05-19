import 'rxjs/Rx';
import {Component} from '@angular/core';
import {Movie} from '../shared/movie.interface';
import {MovieService} from '../shared/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  movies: Array<Movie>;

  constructor(private movieService: MovieService) { }

  searchMovie(ev) {
    let query: string = ev.target.value;
    if (query.length === 0) {
      this.movies = [];
      return;
    }
    this.movieService.searchMovies(query)
      .subscribe((movies: Array<Movie>) => {
        this.movies = movies;
      });
  }
}
