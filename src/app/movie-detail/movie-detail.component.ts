import 'rxjs/Rx';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieDetails} from '../shared/movie.interface';
import {MovieService} from '../shared/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieDetails: any = {};
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.map((p) => p.id)
    .subscribe((id) => {
      this.movieService.getMovie(id)
        .subscribe((value: MovieDetails) => {
          this.movieDetails = value;
        });
    });
  }
}
