import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BooksModel } from '../model/books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _httpClient: HttpClient) { }

  booksURL = 'https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep';
  books = {};

 
  getBooks(): Observable<BooksModel[]> {
    return this._httpClient.get<BooksModel[]>(this.booksURL)
  }
}
