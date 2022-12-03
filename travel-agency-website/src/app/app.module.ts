import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcursionCardComponent } from './components/excursion-card/excursion-card.component';
import { ExcursionDataFetcherService } from './shared/services/excursion-data-fetcher.service';
import {HttpClientModule} from '@angular/common/http';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component'


@NgModule({
  declarations: [
    AppComponent,
    ExcursionCardComponent,
    ExcursionCardsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ExcursionDataFetcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
