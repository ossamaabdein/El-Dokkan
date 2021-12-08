import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList: any = [];
  productList = new BehaviorSubject<any>([]);

  constructor() {
    if(localStorage.getItem('cartData') != null) {
      this.productList.next(localStorage.getItem('cartData'));
    }
  }

  getProducts() {
    return this.productList.asObservable();
  }

  saveCartItems() {

  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    // localStorage.setItem('cartData', JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let total = 0;
    this.cartItemList.map((a:any) => {
      total += a.price;
      total.toPrecision(2);
    })
    return total;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a:any, index:any) => {
      if(product.id === a.id) {
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

}






// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cartItemList: any = [];
//   productList = new BehaviorSubject<any>([]);

//   getProducts() {
//     return this.productList.asObservable();
//   }

//   addToCart(product: any) {
//     this.cartItemList.push(product);
//     this.productList.next(this.cartItemList);
//     this.getTotalPrice();
//   }

//   getTotalPrice(): number {
//     let total = 0;
//     this.cartItemList.map((a:any) => {
//       total += a.price;
//       total.toPrecision(2);
//     })
//     return total;
//   }

//   removeCartItem(product: any) {
//     this.cartItemList.map((a:any, index:any) => {
//       if(product.id === a.id) {
//         this.cartItemList.splice(index,1);
//       }
//     })
//     this.productList.next(this.cartItemList);
//   }

//   removeAllCart() {
//     this.cartItemList = [];
//     this.productList.next(this.cartItemList);
//   }

//   constructor() {}

// }
