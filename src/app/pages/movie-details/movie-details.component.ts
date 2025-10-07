import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { filter, map, switchMap } from 'rxjs';
import { MovieDetails } from '../../models/movie-details.model';
import { Movie } from '../../models/movie.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  public environment = environment;
  public backdropImageLoaded = false;

  movieDetails$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => id !== null),
    switchMap((id) => this.movieService.getMovieDetails(id))
  );

  movie$ = this.movieDetails$.pipe(map((details) => this.mapToMovie(details)));

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {}

  private mapToMovie(details: MovieDetails): Movie {
    return {
      id: details.id,
      title: details.title,
      overview: details.overview,
      poster_path: details.poster_path,
      backdrop_path: details.backdrop_path,
      release_date: details.release_date,
      vote_average: details.vote_average,
      vote_count: details.vote_count,
      adult: details.adult,
      original_language: details.original_language,
      original_title: details.original_title,
      popularity: details.popularity,
      video: details.video,
      genre_ids: details.genres.map((g) => g.id),
    };
  }

  onBackdropImageLoaded() {
    this.backdropImageLoaded = true;
  }
}
