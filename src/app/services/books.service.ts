import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _httpClient: HttpClient) { }

  booksURL = 'https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep';

  getBooks() {
    // this method returns the response of the api call
    return this._httpClient.get<any>(this.booksURL)
  }
}
