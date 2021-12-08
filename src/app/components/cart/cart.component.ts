import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  total: number = 0;
  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    this._CartService.getProducts().subscribe(res => {
      this.cartItems = res;
      this.total = this._CartService.getTotalPrice();
    })
    // this.cartItems = JSON.parse(localStorage.getItem('cartData')!);
    // console.log(this.cartItems)
  }

  removeItem(item:any) {
    this._CartService.removeCartItem(item);
  }

  emptyCart() {
    this._CartService.removeAllCart();
  }

}
