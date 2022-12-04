import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';



@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})

export class CartPreviewComponent {
  totalReservationsCounter: number = 0

  constructor(private cartService: CartService){
    cartService.cart.subscribe(
      {
        next: (cart: Map<number, number>) =>{
          this.totalReservationsCounter = 0
          for (let [id, reservationsCounter] of cart){
            this.totalReservationsCounter += reservationsCounter
          }
        }
      }
    )
  }
}
