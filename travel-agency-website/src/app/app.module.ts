import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import { GoogleMapsModule } from '@angular/google-maps'

import { ExcursionCardComponent } from './components/excursion-card/excursion-card.component';
import { ExcursionDataManagerService } from './services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component'
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { AddExcursionFormComponent } from './components/add-excursion-form/add-excursion-form.component';
import { CartService } from './services/cart/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { FilterExcursionsPipe } from './pipes/filter-excursions-pipe/filter-excursions.pipe';
import { FilterExcursionsComponent } from './components/filter-excursions/filter-excursions.component';
import { FilterExcursionsService } from './services/filter-excursions/filter-excursions.service';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReservationsHistoryComponent } from './components/reservations-history/reservations-history.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    ExcursionCardComponent,
    ExcursionCardsListComponent,
    CartPreviewComponent,
    AddExcursionFormComponent,
    CartComponent,
    FilterExcursionsPipe,
    FilterExcursionsComponent,
    PageNotFoundComponent,
    HomeComponent,
    ReservationsHistoryComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [
    ExcursionDataManagerService,
    CartService,
    FilterExcursionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
