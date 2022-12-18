import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';


@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})

export class CartPreviewComponent {
  public totalReservationsCounter: number = 0
  public totalCartValue: number = 0

  constructor(private cartService: CartService, private dataManager: ExcursionDataManagerService) {

    cartService.cart.subscribe(
      {
        next: (cartData: Map<number, number>) => {
          this.totalCartValue = 0
          this.totalReservationsCounter = 0

          for (let [id, reservations] of cartData) {
            this.totalReservationsCounter += reservations
            this.totalCartValue += this.dataManager.getPriceByID(id) * reservations
          }
          
        },
        error: (err: any) => console.log(err)
      }
    )
  }
}
