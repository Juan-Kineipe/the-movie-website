import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ movie: Movie }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ movieId: number }>()
);

export const loadFavorites = createAction('[Favorites] Load Favorites');
export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: Movie[] }>()
);
