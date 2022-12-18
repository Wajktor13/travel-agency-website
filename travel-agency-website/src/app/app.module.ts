import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import { GoogleMapsModule } from '@angular/google-maps'
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

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
import { SingleExcursionViewComponent } from './components/single-excursion-view/single-excursion-view.component';
import { ReviewsService } from './services/reviews/reviews.service';
import { ReservationHistoryService } from './services/reservation-history/reservation-history.service';


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
    NotificationsComponent,
    SingleExcursionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    ExcursionDataManagerService,
    CartService,
    FilterExcursionsService,
    ReviewsService,
    ReservationHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
