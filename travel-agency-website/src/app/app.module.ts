import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcursionCardComponent } from './components/excursion-card/excursion-card.component';
import { ExcursionDataManagerService } from './services/excursion-data-manager/excursion-data-manager.service';
import {HttpClientModule} from '@angular/common/http';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component'
import { MinMaxPriceService } from './services/min-max-price/min-max-price.service';
import { CartManagerService } from './services/cart-manager/cart-manager.service';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ExcursionCardComponent,
    ExcursionCardsListComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ExcursionDataManagerService,
    MinMaxPriceService,
    CartManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
