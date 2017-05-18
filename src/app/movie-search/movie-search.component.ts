import 'rxjs/Rx';
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Http, Response} from "@angular/http";
import {debounce} from "rxjs/operator/debounce";
import {Movie} from '../shared/movie.interface';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit, AfterViewInit {
  movies: Array<Movie>;
  // @ViewChild
  constructor(private http: Http) { }

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
    this.http.get(`http://www.omdbapi.com/?s=${query}`)
      .map((res: Response) => res.json())
      .subscribe((value: any) => {
        this.movies = value.Search;
      });
  }
}
