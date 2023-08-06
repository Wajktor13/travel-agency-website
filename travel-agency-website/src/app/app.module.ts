import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { GoogleMapsModule } from '@angular/google-maps'
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { ExcursionCardComponent } from './components/excursion-card/excursion-card.component';
import { ExcursionsDataManagerService } from './services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component'
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { ManagerPanelComponent } from './components/manager-panel/manager-panel.component';
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
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthService } from './services/auth/auth.service';
import { UserDataManagerService } from './services/user-data-manager/user-data-manager.service';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UpdateExcursionFormComponent } from './components/update-excursion-form/update-excursion-form.component';
import { NotificationsService } from './services/notifications/notifications.service';
import { ContactUsFormComponent } from './components/contact-us-form/contact-us-form/contact-us-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ExcursionCardComponent,
    ExcursionCardsListComponent,
    CartPreviewComponent,
    ManagerPanelComponent,
    CartComponent,
    FilterExcursionsPipe,
    FilterExcursionsComponent,
    PageNotFoundComponent,
    HomeComponent,
    ReservationsHistoryComponent,
    NotificationsComponent,
    SingleExcursionViewComponent,
    LoginRegisterComponent,
    AdminPanelComponent,
    UpdateExcursionFormComponent,
    ContactUsFormComponent
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
    ExcursionsDataManagerService,
    CartService,
    FilterExcursionsService,
    ReviewsService,
    ReservationHistoryService,
    AuthService,
    UserDataManagerService,
    NotificationsService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
