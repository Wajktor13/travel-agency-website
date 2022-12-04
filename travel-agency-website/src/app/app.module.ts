import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'

import { ExcursionCardComponent } from './components/excursion-card/excursion-card.component';
import { ExcursionDataManagerService } from './services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component'
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
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ExcursionDataManagerService,
    ExcursionCardsStateHolderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
