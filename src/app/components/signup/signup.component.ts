import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error: string = "";
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  signupForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[A-za-z0-9 ]{6,30}$')])
  })

  ngOnInit(): void {
  }

  submitSignupForm(signupForm: FormGroup) {
    if(signupForm.valid) {
      this._AuthService.signup(signupForm.value).subscribe((response) => {
        if(response.message == "success") {
          this._Router.navigate(['login'])
        } else {
          this.error = response.errors.email.message;
        }
      })
    }
  }
}
