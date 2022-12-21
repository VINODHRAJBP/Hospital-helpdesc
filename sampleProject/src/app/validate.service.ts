import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { book } from './book';
import { catchError, map, tap, } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from './message.service'

//jjjjjjjjjjj
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InMemoryDataService } from './in-memory-data.service';


@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private fireauth: AngularFireAuth,private inmem:InMemoryDataService, private router: Router, private http: HttpClient, private message: MessageService) { }


  email = ''
  //login method
  adminlogin(email: string, password: string) {
   
    let count=0
    for(let a of this.inmem.user){
      if(email==a.email){
        console.log(email,a.email);
        count=1
      }
    }
    if(count==1){
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/admin-dashboard'])
    },
      err => {
        alert(err.message);
        this.router.navigate(['/login'])
      })
    }
    else{
      alert("admin data not found")
    }
  }


  //userlogin
  userlogin(email: string, password: string) {
    
    this.email = email
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('usertoken', 'true');
      this.router.navigate(['/user-dashboard'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/login'])
    })
  
  }

  //register method
  register(email1: string, password1: string) {
    this.fireauth.createUserWithEmailAndPassword(email1, password1).then(() => {
      this.router.navigate(['/login'])
    },
      err => {
        alert(err.message);
        this.router.navigate(['/login'])
      })
  }


  // reg(val:{user:string,pass:string}){
  //   console.log(val);
    
  //   this.http.post('https://sampleproject-3a32e-default-rtdb.firebaseio.com/admin.json',val)
  //   .subscribe(a=>{console.log(a);
  //   })
  // }



  //signout method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('tocken');
      this.router.navigate(['/login']);
    },
      err => {
        alert(err.message);
        this.router.navigate(['/login'])
      })
  }


  //kkkkkkkkkkkkkkkkkkkkkkkkkkk
  private booksUrl = 'api/books';
  /** GET heroes from the server */
  getbooks(): Observable<book[]> {
    return this.http.get<book[]>(this.booksUrl)
      .pipe(
        catchError(this.handleError<book[]>('getbooks', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };

  private log(message: string) {
    this.message.add(`LibraryService: ${message}`);
  }

  addbook(name: book,): Observable<book> {
    return this.http.post<book>(this.booksUrl, name, this.httpOptions).pipe(
      tap((newBook: book) => this.log(`added book  name=${newBook.name}`)),
      catchError(this.handleError<book>('addHero'))
    );
  }
  deletebook(name: string): Observable<book> {
    const url = `${this.booksUrl}/${name}`;

    return this.http.delete<book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted book name=${name}`)),
      catchError(this.handleError<book>('deleteHero'))
    );
  }
  searchBooks(term: string): Observable<book[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<book[]>(`${this.booksUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found Books matching "${term}"`) :
        this.log(`no Books matching "${term}"`)),
      catchError(this.handleError<book[]>('searchBooks', []))
    );
  }


  returnBook(book: book): Observable<book> {
    return this.http.post<book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((newBook: book) => this.log(`Book returned name =${newBook.name}`)),
      catchError(this.handleError<book>('addBook'))
    );
  }

  getBook(name: string): Observable<book> {
    const url = `${this.booksUrl}/${name}`;

    return this.http.delete<book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`book Collected name=${name}`)),
      catchError(this.handleError<book>('deleteHero'))
    );
  }


  getBooks(): Observable<book[]> {
    return this.http.get<book[]>(this.booksUrl)
      .pipe(catchError(this.handleError<book[]>('get books', [])))
  }


  // CART Component
  cartbook: any = []
  g: any


  bookCount: number = 0
  addCart(book: book) {
    let count = 0
    this.bookCount = 0
    if (this.cartbook.length == 0) {
      this.bookCount = 1
      this.log(`${this.email} added a book to cart name=${book.name}`)
      this.cartbook.push(book)
      alert(`${book.name} Added to the cart`)
    }
    else {
      for (let a of this.cartbook) {
        if (book.id == a.id) {
          this.bookCount++
          a.count += this.bookCount
          count++
        }
      }
      if (count == 0) {
        alert(`${book.name} added to the cart`)
        this.cartbook.push(book)
        this.log(`book badded to cart name=${book.name}`)
      }
      else {
        alert(`${book.name} one more times added to cart`)
        // alert(`Book already added to cart`)
      }
    }
  }

  remove(book: book) {
    this.bookCount = 0
    this.bookCount--

    for (let a of this.cartbook) {
      if (a.count > 1) {
        book.count += this.bookCount
        this.bookCount = 0
        break
      }
      else {
        a.count = 0
      }
    }
  }


}





/** PUT: update the hero on the server */



