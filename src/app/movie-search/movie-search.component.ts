import 'rxjs/Rx';
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {debounce} from "rxjs/operator/debounce";
import {Movie} from '../shared/movie.interface';
import {MovieService} from '../shared/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit, AfterViewInit {
  movies: Array<Movie>;
  // @ViewChild
  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

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
