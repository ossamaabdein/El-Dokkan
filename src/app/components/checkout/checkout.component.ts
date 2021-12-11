import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any = [];
  total: number = 0;

  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    this._CartService.getProducts().subscribe(res => {
      this.cartItems = res;
      console.log(this.cartItems)
      this.total = this._CartService.getTotalPrice();
    })
  }

  submitOrder() {
    this._CartService.removeAllCart();
  }
}
