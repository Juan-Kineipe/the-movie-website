import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { SharedModule } from '../../shared/components/movie-card/shared.module';

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MovieDetailsRoutingModule,
    SharedModule,
  ],
})
export class MovieDetailsModule {}
