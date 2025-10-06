import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GetMoviesResponse } from '../models/get-movies-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public environment = environment;

  constructor(private http: HttpClient) {}

  getNowPlayingMovies(): Observable<GetMoviesResponse> {
    return this.http.get<GetMoviesResponse>(
      `${environment.tmdbBaseUrl}/movie/now_playing?api_key=${environment.tmdbApiKey}&language=en-US`
    );
  }

  getPopularMovies(): Observable<GetMoviesResponse> {
    return this.http.get<GetMoviesResponse>(
      `${environment.tmdbBaseUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=en-US`
    );
  }

  getTopRatedMovies(): Observable<GetMoviesResponse> {
    return this.http.get<GetMoviesResponse>(
      `${environment.tmdbBaseUrl}/movie/top_rated?api_key=${environment.tmdbApiKey}&language=en-US`
    );
  }

  getUpcomingMovies(): Observable<GetMoviesResponse> {
    return this.http.get<GetMoviesResponse>(
      `${environment.tmdbBaseUrl}/movie/upcoming?api_key=${environment.tmdbApiKey}&language=en-US`
    );
  }

  searchMovie(query: string): Observable<GetMoviesResponse> {
    const options = query
      ? { params: new HttpParams().set('query', query) }
      : {};
    return this.http.get<GetMoviesResponse>(
      `${environment.tmdbBaseUrl}/search/movie?api_key=${environment.tmdbApiKey}&language=en-US`,
      options
    );
  }
}
