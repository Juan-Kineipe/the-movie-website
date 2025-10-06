import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { environment } from '../../environments/environment';
import { CarouselResponsiveOptions } from 'primeng/carousel';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  public environment = environment;

  public popularMovies: Movie[] = [];
  public topRatedMovies: Movie[] = [];
  public upcomingMovies: Movie[] = [];

  public responsiveOptions: CarouselResponsiveOptions[] = [
    { breakpoint: '1024px', numVisible: 5, numScroll: 5 },
    { breakpoint: '768px', numVisible: 3, numScroll: 3 },
    { breakpoint: '480px', numVisible: 1, numScroll: 1 },
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService
      .getPopularMovies()
      .subscribe((res) => (this.popularMovies = res.results));
    this.movieService
      .getTopRatedMovies()
      .subscribe((res) => (this.topRatedMovies = res.results));
    this.movieService
      .getUpcomingMovies()
      .subscribe((res) => (this.upcomingMovies = res.results));
  }
}
