import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { CartItem } from 'src/app/shared/models/cart-item';


@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})

export class CartPreviewComponent {
  public totalReservationsCounter: number = 0
  public totalCartValue: number = 0

  constructor(private cartService: CartService, private dataManager: ExcursionsDataManagerService, excursionDataManager: ExcursionsDataManagerService) {

    excursionDataManager.excursionsData$.subscribe(
      {
        next: (data) => {
          this.updatePreview()  
        },
        error: (err: any) => console.log(err)
      }
    )

    cartService.cart$.subscribe(
      {
        next: (cartData: CartItem[]) => {
          this.updatePreview()  
        },
        error: (err: any) => console.log(err)
      }
    )
  }

  public updatePreview(): void {
    let cartData = this.cartService.getCart()
    this.totalCartValue = 0
    this.totalReservationsCounter = 0
    for (let cartItem of cartData) {
      this.totalReservationsCounter += cartItem.amount
      this.totalCartValue += this.dataManager.getPriceByID(cartItem.excursionID) * cartItem.amount
    }
  }
}
