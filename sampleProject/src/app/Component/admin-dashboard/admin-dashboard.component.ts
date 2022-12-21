import { Component, OnInit } from '@angular/core';
import { book } from '../../book'
import { ValidateService } from '../../validate.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  addBook = false
  ShowBookList = false
  deleteBook = false
  SearchBook = false
  books: book[] = []
  constructor(private validserv: ValidateService, private location: Location,) { }

  ngOnInit(): void {
    this.dispBooks();
  }

  dispBooks(): void {
    this.validserv.getbooks().subscribe(booklist => this.books = booklist)
  }

  ShowBook() {
    this.showfil = false
    this.ShowBookList = !this.ShowBookList
  }
  addBooks() {
    this.addBook = !this.addBook
  }
  deleteBooks() {
    this.deleteBook = !this.deleteBook
  }

  home() {
    this.location.back()
  }

  search() {
    this.SearchBook = !this.SearchBook
  }

  //   regist(){
  // this.register.register()
  //   }

  add(name: book): void {
    // name = name.trim();
    if (name.name=="" || name.author=='' || name.count<=0 || name.price<=0) { return; }
    this.validserv.addbook(name)
      .subscribe(book => {
        this.books.push(book);
      });
    this.addBooks()
  }

  delete(book: book): void {
    this.books = this.books.filter(h => h !== book);
    this.validserv.deletebook(book.name).subscribe();
  }


  //filterssssssss
  filter = false
  price = false
  author = false
  showfil = false

  fil: any = []
  empty = ''



  pricee(val: any) {
    this.ShowBookList = false
    this.showfil = true
    this.fil = []
    for (let i of this.books) {
      if (val == i.price) {
        this.fil.push(i)
      }
    }
  }

  authorFil(val: any) {
    this.ShowBookList = false
    this.showfil = true
    this.fil = []
    for (let i of this.books) {
      if (val == i.author) {
        this.fil.push(i)
      }
    }
  }
  priceChange() {
    this.price = !this.price
    this.fil = []

  }

  authors() {
    this.author = !this.author
    this.fil = []
  }




}


