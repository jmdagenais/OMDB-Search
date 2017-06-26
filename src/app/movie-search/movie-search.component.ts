import 'rxjs/Rx';
import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Movie} from '../shared/movie.interface';
import {MovieService} from '../shared/movie.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  movies: Array<Movie>;
  @ViewChild('searchField') searchField: ElementRef;

  inputSubscription: Subscription;
  movieSubscrption: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.inputSubscription =  Observable.fromEvent(this.searchField.nativeElement, 'keyup')
      .map((ev: any) => ev.target.value)
      .debounceTime(500)
      .subscribe((value: string) => {
        this.searchMovie(value);
      });
  }

  searchMovie(query) {
    if (query.length === 0) {
      this.movies = [];
      return;
    }
    this.movieSubscrption = this.movieService.searchMovies(query)
      .subscribe((movies: Array<Movie>) => {
        this.movies = movies;
      });
  }

  ngOnDestroy() {
    this.inputSubscription.unsubscribe();
    this.movieSubscrption.unsubscribe();
  }
}
