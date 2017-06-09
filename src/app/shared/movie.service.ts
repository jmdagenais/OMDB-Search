import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MovieDetails, Movie} from './movie.interface';
import {Http, Response} from '@angular/http';

@Injectable()
export class MovieService {
  apiKey: string;

  constructor(private http: Http) {
    this.getApiKey();
  }

  private getApiKey() {
    this.http.get('assets/config.json')
      .map((res: Response) => res.json())
      .subscribe((value: any) => {
        this.apiKey = value.apikey;
      });
  }

  searchMovies(query: string): Observable<Array<Movie>> {
    return this.http.get(`http://www.omdbapi.com/?s=${query}&apikey=${this.apiKey}`)
      .map((res: Response) => res.json())
      .map((value: any) => {
          if (value.Response === 'True') {
            return value.Search;
          } else {
           return [];
          }
      })
      .map((movies: Array<Movie>) => {
        return movies.map((movie) => {
          if (movie.Poster === 'N/A') {
            movie.Poster = '../assets/images/noPoster.png';
          }
          return movie;
        });
      });
  }

  getMovie(id: string): Observable<MovieDetails> {
    return this.http.get(`http://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`)
      .map((res: Response) => res.json());
  }
}
