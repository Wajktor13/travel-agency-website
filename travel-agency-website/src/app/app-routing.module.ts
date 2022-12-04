import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component';
import { AddExcursionFormComponent } from './components/add-excursion-form/add-excursion-form.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {path: 'excursions', component: ExcursionCardsListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'add-excursion-form', component: AddExcursionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
