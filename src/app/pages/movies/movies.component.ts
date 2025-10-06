import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MovieService } from '../../services/movie.service';
import { environment } from '../../environments/environment';
import { CarouselResponsiveOptions } from 'primeng/carousel';
import {
  catchError,
  combineLatest,
  debounceTime,
  map,
  of,
  switchMap,
} from 'rxjs';
import { GetMoviesResponse } from '../../models/get-movies-response.model';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  public environment = environment;

  public searchControl = new FormControl('', { nonNullable: true });
  public searchResults$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((query) =>
      this.movieService
        .searchMovie(query)
        .pipe(map((res: GetMoviesResponse) => res.results))
    )
  );

  public movies$ = combineLatest({
    popular: this.movieService
      .getPopularMovies()
      .pipe(map((r: GetMoviesResponse) => r.results)),
    topRated: this.movieService
      .getTopRatedMovies()
      .pipe(map((r: GetMoviesResponse) => r.results)),
    upcoming: this.movieService
      .getUpcomingMovies()
      .pipe(map((r: GetMoviesResponse) => r.results)),
  }).pipe(
    catchError(() =>
      of({ popular: [], topRated: [], upcoming: [], error: true })
    )
  );

  public responsiveOptions: CarouselResponsiveOptions[] = [
    { breakpoint: '1024px', numVisible: 5, numScroll: 5 },
    { breakpoint: '768px', numVisible: 3, numScroll: 3 },
    { breakpoint: '480px', numVisible: 1, numScroll: 1 },
  ];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {}

  openMovieDetails(event: MatAutocompleteSelectedEvent) {
    const movie: Movie = event.option.value;
    if (movie?.id) {
      this.router.navigate(['/movie-details', movie.id]);
    }
  }

  displayMovieTitle(movie: Movie): string {
    return movie?.title ?? '';
  }
}
