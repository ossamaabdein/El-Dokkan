import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  test() {
    let icon = document.getElementById('icon');
    let input = document.getElementById('mobileInput')
    icon!.classList.toggle("active");
    input!.classList.toggle("active");    
    };


  isLogin = false;
  itemsNo = 0;
  searchInput: any;
  constructor(private _CartService: CartService, private _AuthService: AuthService, private _ApiService: ApiService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
      this.isLogin = false;
    }
  })

    this._CartService.getProducts().subscribe(result => {
      this.itemsNo = result.length;
    })
  }

  logout() {
    this._AuthService.logout()
  }

  search(x:any) {
    this._CartService.search.next(x);
  }
}