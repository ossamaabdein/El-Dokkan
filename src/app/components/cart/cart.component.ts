import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  total: number = 0;
  isLogin: boolean = false;
  constructor(private _CartService: CartService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if(this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })

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
