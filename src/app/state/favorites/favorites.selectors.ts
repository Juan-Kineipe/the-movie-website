import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectFavorites = createSelector(
  selectFavoritesState,
  (state) => state.favorites
);

export const isFavorite = (movieId: number) =>
  createSelector(selectFavorites, (favorites) =>
    favorites.some((m) => m.id === movieId)
  );
