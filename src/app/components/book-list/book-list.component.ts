import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any;
  showForm = false;
  filteredBooks: any;

 
  filterBooks(searchString: string) {
    this.filteredBooks = this.books;
    this.filteredBooks = this.filteredBooks.filter((book: any) =>
      book.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
    
  }

  constructor(private _booksService: BooksService) {
  }

  ngOnInit(): void {
    try {
      // get books on load of component
      this._booksService.getBooks().subscribe(results => {
        this.books = results.items.map((item: any) => item.volumeInfo);
        console.log(this.books);
        this.filteredBooks = this.books;
      });
    } catch (error) {
      console.log(error)
    }

  }

  createBook() {
    // method to show form for creating new book 

    try {
      this.showForm = true;
    } catch (error) {
      console.log(error)
    }
  }



}
