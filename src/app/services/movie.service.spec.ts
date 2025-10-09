import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { GetMoviesResponse } from '../models/get-movies-response.model';
import { environment } from '../environments/environment';
import { MovieDetails } from '../models/movie-details.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct URL for now playing movies', () => {
    const mockResponse: GetMoviesResponse = {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    } as any;

    service.getPopularMovies().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.tmdbBaseUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=en-US`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call correct URL for movie details', () => {
    const mockDetails: MovieDetails = { id: 1, title: 'Inception' } as any;

    service.getMovieDetails('1').subscribe((response) => {
      expect(response).toEqual(mockDetails);
    });

    const req = httpMock.expectOne(
      `${environment.tmdbBaseUrl}/movie/1?api_key=${environment.tmdbApiKey}&language=en-US`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });
});
