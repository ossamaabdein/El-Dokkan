import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  productDetails: any;
  added: boolean = false;

  constructor(private _ApiService: ApiService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService) { }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this._ApiService.getProductDetails(this.id).subscribe((response) => {
    this.productDetails = response;
    })
  }

  addToCart(product:any){
    this._CartService.addToCart(product);
    this.added = true;
  }

}
