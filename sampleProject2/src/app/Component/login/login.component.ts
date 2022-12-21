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
    this.valid.loginAdmin()
    this.valid.loginuser()
  }

  adminsignIn(val:any) {
    if (val.email == '') {
      alert('plz enter valid email address');
      return;
    }
    if (val.password == '') {
      alert('plz enter valid password');
      return;
    }


    this.valid.adminlogin(val)
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
