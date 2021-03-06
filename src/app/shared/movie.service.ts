import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MovieDetails, Movie} from './movie.interface';
import {Http, Response} from '@angular/http';

@Injectable()
export class MovieService {
  private apiKey: string = '';

  constructor(private http: Http) {
    this.getApiKey()
      .subscribe(key => {
        this.apiKey = key;
      })
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
    return this.initService()
    .switchMap((x) => {
      return this.http.get(`http://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`)
      .map((res: Response) => res.json());
    })
  }

  private getApiKey(): Observable<string> {
    return this.http.get('assets/config.json')
      .map((res: Response) => res.json())
      .map((value: any) => {
        return value.apikey;
      })
  }

  private initService(): Observable<string> {
    if (this.apiKey !== '') {
      return Observable.of(this.apiKey);
    } else {
      return this.getApiKey()
        .do((key) => {
          this.apiKey = key;
        });
    }
  }
}
