import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : any[] = [];
  filteredProducts: any[] = [];
  keywords = ["jewelery", "women's clothing", "men's clothing", "electronics"];
  added: boolean = false;
  constructor(private _ApiService: ApiService, private _CartService: CartService) { }

  ngOnInit(): void {
    this._ApiService.getProducts().subscribe((response) => {
      this.products = response;
    })
  }

  filterProducts(keyword: string) {
    this._ApiService.getProducts().subscribe((response) => {
      this.products = response.filter((el:any) => el.category === keyword);
      this.filteredProducts =this.products;
    })
  }

  allProducts() {
    this._ApiService.getProducts().subscribe((response) => {
      this.products = response;
    })
  }

  addToCart(product:any){
    this._CartService.addToCart(product);
    // this.added = true;
  }

}
