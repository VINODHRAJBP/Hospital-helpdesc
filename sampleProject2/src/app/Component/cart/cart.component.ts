import { Component, OnInit } from '@angular/core';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component'
import { ValidateService } from '../../validate.service';
import { book } from '../../book'
import { count } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public valid: ValidateService, private loc: Location) { }

  ngOnInit(): void {
    this.c=this.valid.c
    this.books()
    this.valid.buyersGet()
  }
  selbook: any = []
  val = 1;

  books() {
    this.selbook = this.valid.cartbook
    this.tot()
  }
c=0
  add(book: book) {
    this.valid.c++
    this.c=this.valid.c
    this.books()
    this.updPrice(book)
    this.valid.addCart(book)
  }
  remove(book: book) {
    this.valid.c--
    this.c=this.valid.c
     for(let a of this.selbook){
      if(book.count<=1 && book.name==a.name){
      this.selbook.splice(this.selbook.indexOf(a),1)
     }
    }
    this.tot1(book)
    this.valid.remove(book)

  }

  totalPrice = 0
  show = true
  num: number = 1
  tot() {
    this.totalPrice = 0
    for (let a of this.selbook) {
      console.log(this.num);

      this.totalPrice += (a.count * a.price)

      // console.log(this.totalPrice);

    }
  }
  updPrice(book: book) {
    if (book.count >= 0) {
      this.totalPrice += (book.price*1)
    }
  }

  tot1(book: book) {

    if (book.count != 0) {
      this.totalPrice -= book.price
    }
    else if(book.count==0){
      this.totalPrice-=(book.count*book.price)
      console.log(this.totalPrice);
      
    }
    // console.log(this.totalPrice)
  }


  goBack() {
    this.loc.back()
  }


  delete(book:book){
    for(let a of this.selbook){
      if(book==a){
        this.selbook.splice(this.selbook.indexOf(a),1)
        this.valid.remove(a)
      }
    }
  }

  

}





