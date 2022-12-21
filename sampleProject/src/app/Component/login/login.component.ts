import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';


  constructor(private valid: ValidateService, private router: Router) { }

  ngOnInit(): void {
  }

  adminsignIn() {
    if (this.email == '') {
      alert('plz enter valid email address');
      return;
    }
    if (this.password == '') {
      alert('plz enter valid password');
      return;
    }

    this.valid.adminlogin(this.email, this.password)
    this.email = '';
    this.password = '';
  }



  //user details
  userEmail: string = '';
  userPassword: string = '';

  userLogin() {
    if (this.userEmail == '') {
      alert('plz enter valid email')
      return;
    }
    if (this.userPassword == '') {
      alert('plz enter valid password')
      return;
    }

    this.valid.userlogin(this.userEmail, this.userPassword);
    this.userEmail = '';
    this.userPassword = '';



  }




}
