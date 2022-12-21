import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Data } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
em=''
pa=''
em1=''
pa1=''


login=new FormGroup({
  email:new FormControl('',[Validators.email,Validators.pattern('a-z')]),
  pass:new FormControl('',[Validators.required])
})



userData:any=[]
adminData:any=[]
  getUser(){
   this.http.get('https://sampleproject-3a32e-default-rtdb.firebaseio.com/user.json').
  pipe(map(a=>{
    for(let b in a){
      this.userData.push(a)
    }
  })).subscribe(a=>{
   })
   console.log(this.userData);
  }



  data:any
  getAdmin1(){
    this.http.get('https://sampleproject-3a32e-default-rtdb.firebaseio.com/admin.json').pipe(map(a=>{
    this.data=a
    })).subscribe(a=>{console.log(a);
    })
  }


  allproducts:Data[]=[]
  getAdmin() {
    this.http.get<{[key:string]:Data}>('https://sampleproject-3a32e-default-rtdb.firebaseio.com/admin.json')
    .pipe(map((get)=>{
      const product=[]
     for(const key in get){
      // if(get.hasOwnProperty(key)){
        product.push({...get[key],})
      // }
      }
      return product
    }))
    .subscribe((product) => { console.log(product)
      this.allproducts=product }
      )

    }
 }
