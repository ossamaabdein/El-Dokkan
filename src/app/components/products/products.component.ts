import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : any[] = [];
  keywords = ["jewelery", "women's clothing", "men's clothing", "electronics"];
  added: boolean = false;
  searchKey: string = "";

  constructor(private _ApiService: ApiService, private _CartService: CartService, private _NgxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this._NgxSpinnerService.show(); 
    this._ApiService.getProducts().subscribe((response) => {
      this._NgxSpinnerService.hide();
      this.products = response;
    })

    this._CartService.search.subscribe(val => {
      this.searchKey = val;
    })
  }

  // Better to use pipes, later.
  filterProducts(par1:any, par2?:any) {
    this._NgxSpinnerService.show();
    this._ApiService.getProducts().subscribe((response) => {
      this.products = response;
      this._NgxSpinnerService.hide();
      this.products = this.products.filter(el => (el.category == par1 || el.category == par2));
    })
  }

  allProducts() {
    this._NgxSpinnerService.show();
    this._ApiService.getProducts().subscribe((response) => {
      this._NgxSpinnerService.hide();
      this.products = response;
    })
  }

  addToCart(product:any){
    this._CartService.addToCart(product);
  }

}
