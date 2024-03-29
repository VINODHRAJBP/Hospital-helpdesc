import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { book } from '../book';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private valid: ValidateService, private location: Location, private rou: Router) { }
  email: string = '';
  password: string = '';
  searched = false
  return = false
  detail = false

  showBook = false
  count = 10

  books: book[] = []

  ngOnInit(): void {
    this.dispBooks()
  }


  show() {
    this.showBook = !this.showBook
  }
  dispBooks(): void {
    this.valid.getbooks().subscribe(booklist => this.books = booklist)
  }

  returnBook() {
    this.return = !this.return
  }


  getBook(book: book): void {
    this.books = this.books.filter(h => h !== book);
    this.valid.getBook(book.name).subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.valid.addbook({ name } as book)
      .subscribe(book => {
        this.books.push(book);
      });
  }

  search() {
    this.searched = !this.searched
  }

  logout() {
    this.location.back()
  }

  details() {
    this.detail = !this.detail
  }
select=false
  selectedbook?: book;
  onSelect(book: book): void {
    this.selectedbook = book;
    this.select=true
  }


  //filterssssssss
  filter = false
  price = false
  author = false





  fil: any = []
  empty = ''
  showFil = false


  pricee(val: any) {
    
    this.showBook = false
    this.showFil = true
    this.fil = []
    for (let i of this.books) {
      if (val == i.price) {
        this.fil.push(i)
        
      }
      console.log(this.fil);
    }


  }

  authorFil(val: any) {
    this.showBook = false
    this.showFil = true

    this.fil = []
    for (let i of this.books) {
      if (val == i.author) {
        this.fil.push(i)
      }
    }

  }



  priceChange() {
    this.select=false
    this.price = !this.price
    this.fil = []

  }

  authors() {
    this.select=false
    this.author = !this.author
    this.fil = []
  }



  // CART DETAILS
  cart(book: book) {
    this.valid.addCart(book)
  }


  com() {
    this.rou.navigate(['/cart'])
  }

}






