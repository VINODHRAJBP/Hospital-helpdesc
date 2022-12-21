import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { book } from './book';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      { id: 1, name: 'Do it Today', author: 'Darius Foroux', price: 100, count: 1, image: 'assets/images/do-it-today.jpg' },
      { id: 2, name: 'Everyday Ayurveda', author: 'Bhaswathi Battacharya', price: 200, count: 1, image: 'assets/images/Everyday Ayurveda.jpg' },
      { id: 3, name: 'Harry Potter Box Set', author: 'Rowling J. K', price: 100, count: 1, image: 'assets/images/homepage.webp' },
      { id: 4, name: 'Life amazing secrets', author: 'Gaur Gopal Das', price: 200, count: 1, image: 'assets/images/life amazing secrets.jpg' },
      { id: 5, name: 'Shakespers great story', author: 'william Shakespeare', price: 100, count: 1, image: 'assets/images/shakespears great story.jpg' },
      { id: 6, name: 'That Night', author: 'Richard Madeley ', price: 765, count: 1, image: 'assets/images/that night.jpg' },
      { id: 7, name: 'The English baby name', author: 'Hawramani', price: 200, count: 1, image: 'assets/images/the english baby name.jpg' },
      { id: 8, name: 'The freedom Manifesto', author: 'Karan Bajaj', price: 200, count: 1, image: 'assets/images/the Freedom manifesto.jpg' },
      { id: 9, name: 'The power of your Subconcious Mind', author: 'Joseph Murphy', price: 100, count: 1, image: 'assets/images/the power of your subconcious mind.jpg' }
    ];

   

       return { books };
  }

  /////logs
  user:any=[{email:"vinodhbp1999@gmail.com"}]
  

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(books: book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }



}