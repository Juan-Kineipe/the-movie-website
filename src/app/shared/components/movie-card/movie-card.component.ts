import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { Movie } from '../../../models/movie.model';
import * as FavoritesActions from '../../../state/favorites/favorites.actions';
import { Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isFavorite } from '../../../state/favorites/favorites.selectors';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  public environment = environment;
  @Input({ required: true }) movie!: Movie;
  @Output() openMovieDetails: EventEmitter<Movie> = new EventEmitter();

  isFavorite$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isFavorite$ = this.store.select(isFavorite(this.movie.id));
  }

  toggleFavorite() {
    this.isFavorite$.pipe(take(1)).subscribe((isFav) => {
      if (isFav) {
        this.store.dispatch(
          FavoritesActions.removeFavorite({ movieId: this.movie.id })
        );
      } else {
        this.store.dispatch(
          FavoritesActions.addFavorite({ movie: this.movie })
        );
      }
    });
  }

  onClick(movie: Movie) {
    this.openMovieDetails.emit(movie);
  }
}
