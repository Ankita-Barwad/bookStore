import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books = [];
  constructor(private _booksService: BooksService) {
  }

  ngOnInit(): void {
    this._booksService.getBooks().subscribe(results => {
      this.books = results.items.map((item: any) => item.volumeInfo);
      console.log(this.books)
    });

  }

}
