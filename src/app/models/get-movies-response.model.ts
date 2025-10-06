import { Movie } from './movie.model';

export interface GetMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
