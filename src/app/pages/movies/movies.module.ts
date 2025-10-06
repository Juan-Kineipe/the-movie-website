import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'primeng/carousel';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@NgModule({
  declarations: [MoviesComponent, MovieCardComponent],
  imports: [CommonModule, MoviesRoutingModule, MatIconModule, CarouselModule],
})
export class MoviesModule {}
