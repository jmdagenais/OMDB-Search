import 'rxjs/Rx';
import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {MovieDetails} from '../shared/movie.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieDetails: any = {};
  constructor(
    private http: Http,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.map((p) => p.id)
    .subscribe((id) => {
      this.http.get(`http://www.omdbapi.com/?i=${id}`)
        .map((res: Response) => res.json())
        .subscribe((value) => {
          this.movieDetails = value;
        });
    });
  }
}
