import { Component } from '@angular/core';
import { CartManagerService } from 'src/app/services/cart-manager/cart-manager.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  totalReservationsCounter: number = 0

  constructor(private cartManager: CartManagerService){
    this.cartManager.totalReservationsCounter.subscribe(
      {
        next: (data: number) => this.totalReservationsCounter = data,
        error: (err: any) => console.log(err) 
      }
    )
  }
}
