import React, { Component} from 'react';
import * as BooksAPI from '../BooksAPI'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class SearchBooks extends Component{
    state = {
        query: '',
        newBooksList: []
    }

    handleInputChange = (e) => {
      const value = e.target.value.trim();
      if (value !== "") {
        this.setState({ query: value });
        BooksAPI.search(this.state.query).then(newBooksList => {
          this.setState({ newBooksList: !newBooksList || newBooksList.error  ? [] : newBooksList });
        });
      } else {
        this.setState({ newBooksList: [] });
      }
    }

    handleSelectChange = (book, e) => {
      const {changeShelf} = this.props;
      changeShelf(book, e.target.value)
    }

    findShelf(book) {
      var shelf = 'none';
      if(book.shelf){
        shelf = book.shelf;
      }
      const foundBook =  this.props.booksList.filter(b => b.id === book.id);
      if(foundBook && foundBook.length > 0){
        shelf = foundBook[0].shelf;
      } 
      return shelf;
    }
    
    validateImage(book) {
      var thumb = 'none';
      if (book.imageLinks && book.imageLinks.thumbnail) {
        thumb = `url(${book.imageLinks.thumbnail})`;
      } 
      return thumb;
    }

    render(){
        return (
          <div className="search-books">
            <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
              <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {this.state.newBooksList.length > 0 && this.state.newBooksList.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.validateImage(book) }}></div>
                          <div className="book-shelf-changer">
                            <select value={this.findShelf(book)} onChange={(e) => this.handleSelectChange(book, e)}>
                              <option disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                          {book.authors !== undefined && book.authors && book.authors.map((author) => (
                              <div key={author} className = "book-authors">{ author }</div>
                          ))}
                      </div>
                    </li>
                ))
                }
              </ol>
            </div>
          </div>
        )
    }
}

SearchBooks.propTypes = {
  changeShelf: PropTypes.func.isRequired
};

export default SearchBooks