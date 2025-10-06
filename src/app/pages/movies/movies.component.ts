import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { environment } from '../../environments/environment';
import { CarouselResponsiveOptions } from 'primeng/carousel';
import { catchError, combineLatest, map, of } from 'rxjs';
import { GetMoviesResponse } from '../../models/get-movies-response.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  public environment = environment;

  movies$ = combineLatest({
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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}
}
