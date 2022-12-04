import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcursionCardComponent } from './components/excursion-card/excursion-card.component';
import { ExcursionDataManagerService } from './services/excursion-data-manager/excursion-data-manager.service';
import {HttpClientModule} from '@angular/common/http';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component'
import { MinMaxPriceService } from './services/min-max-price/min-max-price.service';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { AddExcursionFormComponent } from './components/add-excursion-form/add-excursion-form.component';
import { ExcursionCardsStateHolderService } from './services/excursion-cards-state-holder/excursion-cards-state-holder.service';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ExcursionCardComponent,
    ExcursionCardsListComponent,
    CartPreviewComponent,
    AddExcursionFormComponent,
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
    ExcursionCardsStateHolderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
