import { Component, OnInit } from '@angular/core';
import { book } from '../book';
import { ValidateService } from '../validate.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  books$!: Observable<book[]>;
  private searchTerms = new Subject<string>();

  constructor(private valid: ValidateService) { }
  search(term: string): void {
    
    
    this.searchTerms.next(term);
  }

  // Push a search term into the observable stream.


  ngOnInit(): void {
   
    this.books$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.valid.searchBooks(term)),
    );
  }

  selectedbook?: book;
  onSelect(book: book): void {
    this.selectedbook = book;
  }

  books:book[]=[]
  book:any=[]
  sea(term:string){
    this.book=[]
this.books=this.valid.books
this.sear(term)
  }


  sear(a:string){
    this.book=[]
for(let book of this.books){
  var b=book.name.toUpperCase()
 if(b.includes(a.toUpperCase())){
  this.book.push(book)
 }
}
console.log(this.book);

if(a==''){
  this.select=false 
 this.book=[]
}
 }


 select=true

}


