import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { book, admin,buy, play } from './book';
import { catchError, map, tap, } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from './message.service'

//jjjjjjjjjjj
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { InMemoryDataService } from './in-memory-data.service';


@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private router: Router, private http: HttpClient, private message: MessageService) { }


  email = ''
  //login method

  loginAdmin() {
    this.http.get<{ [key: string]: admin }>('https://sampleproject2-580be-default-rtdb.firebaseio.com/admin.json')
      .pipe(map((get) => {
        const product = []
        for (const key in get) {
          // if (get.hasOwnProperty(key)) {
            product.push({ ...get[key], id: key })
          // }
        }
        return product
      }))
      .subscribe((product) => {
        this.admindata = product
      }
      )
  }
  admindata: admin[] = []
  adminlogin(val: admin) {
    console.log(val);

    console.log(this.admindata);

    for (let a of this.admindata) {
      console.log(val.email, a);


      if (val.email == a.email && val.password == a.password) {
        alert(`logid in as ${val.email}`)
        this.router.navigate(['admin-dashboard'])
      }
      else {
        alert("Admin Data Not Found")
      }
    }
  }


  //userlogin

  loginuser() {
    this.http.get<{ [key: string]: admin }>('https://sampleproject2-580be-default-rtdb.firebaseio.com/user.json')
      .pipe(map((get) => {
        const product = []
        for (const key in get) {
          if (get.hasOwnProperty(key)) {
            product.push({ ...get[key], id: key })
          }
        }
        return product
      }))
      .subscribe((product) => {
        this.userdata = product
      }
      )
  }
  userdata: any = []
  userlogin(email: string, password: string) {
    let c=0
    let val = { email, password }
    for (let a of this.userdata) {
      if (val.email == a.email && val.password == a.password) {
        this.email=val.email
        c=1
        alert(`logid in as ${val.email}`)
        this.router.navigate(['user-dashboard'])
      }
     
    }
    if(c==0){
      alert("User Data NOt Found")
    }
  }

  //register method
  register(email: string, password: string) {
    let val = { email, password }
    this.http.post('https://sampleproject2-580be-default-rtdb.firebaseio.com/user.json', val).subscribe(a => { console.log(a) }
    )
    alert("registration Successfull")
  }

  registeradmin(email: string, password: string) {
    let val = { email, password }
    this.http.post('https://sampleproject2-580be-default-rtdb.firebaseio.com/admin.json', val).subscribe(a => { console.log(a) }
    )
    alert("Registration Successfull")
  }






  //signout method
  logout() {
    this.router.navigate(['login'])

  }


  //kkkkkkkkkkkkkkkkkkkkkkkkkkk
  private  booksUrl = 'https://sampleproject2-580be-default-rtdb.firebaseio.com/book.json';
  /** GET heroes from the server */
  books:book[]=[]
  getbooks() {
    this.http.get<{ [key: string]: book }>(this.booksUrl)
    .pipe(map((get) => {
      const product = []
      for (const key in get) {
        if (get.hasOwnProperty(key)) {
          product.push({ ...get[key], id: key })
        }
      }
      return product
    }))
    .subscribe((product) => {
      this.books = product
      // console.log(this.books);
      
    }
    )
    // console.log(this.books);
    
    // return this.http.get<book[]>(this.booksUrl)
    //   .pipe(
    //     catchError(this.handleError<book[]>('getbooks', []))
    //   );
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
    this.message.add(`${message}`);
  }

  addbook(name: book,): Observable<book> {
    return this.http.post<book>(this.booksUrl, name, this.httpOptions).pipe(
      tap((newBook: book) => this.log(`added book  name=${newBook.name}`)),
      catchError(this.handleError<book>('addHero'))
    );
  }
  deletebook(book:book){
    // const url = 'https://sampleproject2-580be-default-rtdb.firebaseio.com/book'+id+'.json'

    return this.http.delete<book>('https://sampleproject2-580be-default-rtdb.firebaseio.com/book/'+book.id+'.json', this.httpOptions).subscribe(a=>{alert(`deleted book name=${book.name}`),this.log(`daleted book name=${book.name}`)})
    // .pipe(
    //   tap(_ => this.log(`deleted book name=${id}`)),
    //   catchError(this.handleError<book>('deleteHero'))
    // );
  }
  searchBooks(term: string): Observable<book[]> {
   
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<book[]>('https://sampleproject2-580be-default-rtdb.firebaseio.com/book/name'+term+'.json').pipe(
      tap(a=>{console.log(a);
      })
      // tap(x => x.length ?
      //   this.log(`found Books matching "${term}"`) :
      //   this.log(`no Books matching "${term}"`)),
      // catchError(this.handleError<book[]>('searchBooks', []))
    );
  }


  returnBook(book: book): Observable<book> {
    return this.http.post<book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((newBook: book) => this.log(`Book returned name =${newBook.name}`)),
      catchError(this.handleError<book>('addBook'))
    );
  }

  // getBook(name: string): Observable<book> {
  //   const url = `${this.booksUrl}/${name}`;

  //   return this.http.delete<book>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`book Collected name=${name}`)),
  //     catchError(this.handleError<book>('deleteHero'))
  //   );
  // }


  // getBooks(): Observable<book[]> {
  //   return this.http.get<book[]>(this.booksUrl)
  //     .pipe(catchError(this.handleError<book[]>('get books', [])))
  // }


  // CART Component
  cartbook: any = []
c=0

date=new Date()
year=this.date.getFullYear()
month=this.date.getMonth()
day=this.date.getDate()
  bookCount: number = 0
  addCart(book: book) {
    
    let count = 0
    this.bookCount = 0
    if (this.cartbook.length == 0) {
      this.bookCount = 1
      // this.message.add(`${this.email} bought ${book.name} on ${this.day}-${this.month}-${this.year}`)
      this.recentBuyer(`${this.email} bought ${book.name} on ${this.day}-${this.month}-${this.year}`)
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
        this.recentBuyer(`${this.email} bought ${book.name} on ${this.day}-${this.month}-${this.year}`)
        // this.log(`${this.email} bought ${book.name}`)
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

    // for (let a of this.cartbook) {
      if (book.count >= 1) {
        book.count += this.bookCount
        this.bookCount = 0
        // break
      }
      else {
        book.count = 0
      }
    // }
  }


  //SearchBooks
  book:book[]=[]
 

  ////recent book buy
  recentBuyer(val:any){
    let a={data:val}
    this.http.post('https://sampleproject2-580be-default-rtdb.firebaseio.com/buyers.json',a).subscribe(a=>{console.log(a);
    })
  }
buyersUrl='https://sampleproject2-580be-default-rtdb.firebaseio.com/buyers.json'
buyers:buy[]=[]
  buyersGet(){
    this.http.get<{ [key: string]: buy }>(this.buyersUrl)
    .pipe(map((get) => {
      const product = []
      for (const key in get) {
        if (get.hasOwnProperty(key)) {
          product.push({ ...get[key], id: key })
        }
      }
      return product
    }))
    .subscribe((product) => {
      this.buyers = product
      // console.log(this.buyers);
      
    }
    )
    // console.log(this.buyers);
    

  }
  msg: string[] = []

  Showlog() {
    // this.messages=[]
    // console.log(this.buyers);
    
    for (let index = (this.buyers.length-1); index >=(this.buyers.length-5); index--) {
      this.msg[index] = this.buyers[index].data;

    }
    // console.log(this.msg);
    
  }

  clearLog() {
    this.msg = []
  }



// play and win
  qns:any=[]
  getqns(){
    this.http.get<{ [key: string]:play}>('https://login-9a0c9-default-rtdb.firebaseio.com/play.json')
    .pipe(map(a=>{
      const data=[]
      for(const key in a){
        data.push({...a[key],id:key})
      }
      return data
    })).subscribe(a=>{this.qns=a,
      console.log(this.qns);
      
    })
  }
}









