import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any;
  showForm = false;
  filteredBooks: any;

  newbooks = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    publisher: new FormControl(''),
    publishedOn: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.books.push({
      title: this.newbooks.value.title,
      authors: [this.newbooks.value.author],
      publisher: this.newbooks.value.publisher,
      publishedDate: this.newbooks.value.publishedOn,
    })
  }
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

  showFormModal() {
    // method to show form for creating new book 

    try {
      this.showForm = !this.showForm;
    } catch (error) {
      console.log(error)
    }
  }



}
