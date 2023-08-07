import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { CartItem } from 'src/app/shared/models/cart-item';


@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})

export class CartPreviewComponent implements OnInit, OnDestroy {
  public totalReservationsCounter: number = 0
  public totalCartValue: number = 0
  private excursionsDataSub: Subscription | null = null
  private cartSub: Subscription | null = null

  constructor(
    private cartService: CartService,
    private dataManager: ExcursionsDataManagerService,
    private excursionDataManager: ExcursionsDataManagerService
    ) { }

  public ngOnInit(): void {
    this.excursionsDataSub = this.excursionDataManager.excursionsData$.subscribe(
      {
        next: (_) => {
          this.updatePreview()  
        },
        error: (err: any) => console.log(err)
      }
    )

    this.cartSub = this.cartService.cart$.subscribe(
      {
        next: (_: CartItem[]) => {
          this.updatePreview()  
        },
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnDestroy(): void {
    this.excursionsDataSub?.unsubscribe()
    this.cartSub?.unsubscribe()
  }

  private updatePreview(): void {
    let cartData = this.cartService.getCart()
    this.totalCartValue = 0
    this.totalReservationsCounter = 0
    for (let cartItem of cartData) {
      this.totalReservationsCounter += cartItem.amount
      this.totalCartValue += this.dataManager.getPriceByID(cartItem.excursionID) * cartItem.amount
    }
  }
}
