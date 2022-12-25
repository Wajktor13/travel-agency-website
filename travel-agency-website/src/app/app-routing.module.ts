import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component';
import { AddExcursionFormComponent } from './components/add-excursion-form/add-excursion-form.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationsHistoryComponent } from './components/reservations-history/reservations-history.component';
import { SingleExcursionViewComponent } from './components/single-excursion-view/single-excursion-view.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';



const routes: Routes = [
  { path: 'excursions', component: ExcursionCardsListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'add-excursion-form', component: AddExcursionFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reservations-history', component: ReservationsHistoryComponent },
  { path: 'excursion/:id', component: SingleExcursionViewComponent },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
