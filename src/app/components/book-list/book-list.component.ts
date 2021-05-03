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

  constructor(private _booksService: BooksService) {
  }

  //formgroup to get form details
  newbooks = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    publisher: new FormControl(''),
    publishedOn: new FormControl(''),
  });


  onSubmit() {
    // method that runs on submission of form, pushes new book data to books array
    try {
      this.books.push({
        title: this.newbooks.value.title,
        authors: [this.newbooks.value.author],
        publisher: this.newbooks.value.publisher,
        publishedDate: this.newbooks.value.publishedOn,
      })
    } catch (error) {
      console.log(error)
    }

  }
  filterBooks(searchString: string) {
    this.filteredBooks = this.books;
    this.filteredBooks = this.filteredBooks.filter((book: any) => {
      if (book.title.toLowerCase().includes(searchString.toLowerCase())) {
        return book;
      }
      else if (book.authors['0'].toLowerCase().includes(searchString.toLowerCase())) {
        return book;
      }
      else if (book.publisher) {
        if (book.publisher.toLowerCase().includes(searchString.toLowerCase())) {
          return book;
        }
      }
      else{
        console.log(this.filteredBooks)

      }
    })
    console.log(this.filteredBooks)

  }

  ngOnInit(): void {
    try {
      // this method calls getBooks method on load of component, maps through the books and return an array of all volumeInfo objects. filteredBooks is the array which is binded on template for book list.
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
    // method to show/hide form for creating new book, showForm property controlls the same
    try {
      this.showForm = !this.showForm;
    } catch (error) {
      console.log(error)
    }
  }

}
