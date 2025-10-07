import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './state/favorites/favorites.reducer';
import {
  metaReducers,
  getInitialStateFromLocalStorage,
} from './state/meta-reducers/local-storage.metareducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      { favorites: favoritesReducer },
      {
        metaReducers,
        initialState: getInitialStateFromLocalStorage(),
      }
    ),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
