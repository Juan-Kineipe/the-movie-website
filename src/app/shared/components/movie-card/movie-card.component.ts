import { Component, Input } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  public environment = environment;
  @Input({ required: true }) movie!: Movie;
}
