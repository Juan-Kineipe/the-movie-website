import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';
import { initialState } from '../favorites/favorites.reducer';

export function localStorageMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);
    localStorage.setItem('appState', JSON.stringify(nextState));
    return nextState;
  };
}

export function getInitialStateFromLocalStorage(): AppState | undefined {
  const storedState = localStorage.getItem('appState');
  if (storedState) {
    return JSON.parse(storedState);
  }
  return {
    favorites: initialState,
  };
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageMetaReducer];
