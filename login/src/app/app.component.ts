import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { map} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login';
constructor(private http:HttpClient){}

login=new FormGroup({
  email:new FormControl('',[Validators.email,Validators.pattern('a-z')]),
  pass:new FormControl('',[Validators.required])
})

em=''
pa=''
em1=''
pa1=''

get(){
  console.log(this.login.value);
}
 
  userPost(){
   this.http.post('https://sampleproject-3a32e-default-rtdb.firebaseio.com/user.json',this.login.value)
.subscribe(a=>{console.log(a);
})
this.em=''
this.pa=''

  }


  adminPost(){
    
this.http.post('https://sampleproject-3a32e-default-rtdb.firebaseio.com/admin.json',this.login.value)
.subscribe(a=>{console.log(a);
})

this.em1=''
this.pa1=''
  }

}
