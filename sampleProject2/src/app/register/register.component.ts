import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/validate.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
// import { InMemoryDataService } from 'src/app/in-memory-data.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  role: string = ''


  constructor(private valid: ValidateService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  register(val: any) {

    // this.valid.reg(val)


    if (this.email == '') {
      alert('plz enter valid email address');
      return;
    }
    if (this.password == '') {
      alert('plz enter valid password');
      return;
    }

    this.valid.register(this.email, this.password)
    this.email = '';
    this.password = '';
    this.role = '';
  }


 

}
