import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { Movie } from '../../models/movie.model';

export interface FavoritesState {
  favorites: Movie[];
}

export const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addFavorite, (state, { movie }) => ({
    ...state,
    favorites: [...state.favorites, movie],
  })),
  on(FavoritesActions.removeFavorite, (state, { movieId }) => ({
    ...state,
    favorites: state.favorites.filter((m) => m.id !== movieId),
  })),
  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites,
  }))
);
