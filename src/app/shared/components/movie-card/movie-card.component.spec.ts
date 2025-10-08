import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MovieCardComponent } from './movie-card.component';
import { Movie } from '../../../models/movie.model';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let store: MockStore;

  const MOCK_MOVIE: Partial<Movie> = {
    id: 1,
    title: 'Inception',
    poster_path: '/poster.jpg',
    overview: 'Good movie',
    release_date: '2010-07-16',
    vote_count: 222,
    vote_average: 8.8,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      providers: [provideMockStore({ initialState: {} })],
      imports: [MatIconModule],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = MOCK_MOVIE as Movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render vote count', () => {
    const voteCountEl = fixture.debugElement.query(
      By.css('div[title="Vote Count"] span')
    );
    expect(voteCountEl.nativeElement.textContent.trim()).toBe('222');
  });

  it('should render vote average', () => {
    const voteCountEl = fixture.debugElement.query(
      By.css('div[title="Vote Average"] span')
    );
    expect(voteCountEl.nativeElement.textContent.trim()).toBe('8.8');
  });

  it('should emit event on card click', () => {
    spyOn(component.openMovieDetails, 'emit');
    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('click', null);
    expect(component.openMovieDetails.emit).toHaveBeenCalledWith(
      component.movie
    );
  });
});
