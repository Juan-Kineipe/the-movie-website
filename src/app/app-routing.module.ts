import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
  {
    path: 'movie-details/:id',
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
