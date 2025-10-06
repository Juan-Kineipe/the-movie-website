import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CarouselModule } from 'primeng/carousel';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@NgModule({
  declarations: [MoviesComponent, MovieCardComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    CarouselModule,
  ],
})
export class MoviesModule {}
