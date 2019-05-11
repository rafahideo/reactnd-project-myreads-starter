import React, { Component} from 'react';
import * as BooksAPI from '../BooksAPI'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Book from './Book.js'

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
      changeShelf(book, e.target.value);
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
                    <Book 
                    changeShelf = {this.props.changeShelf}
                    booksList = {this.state.newBooksList}
                    book = {book}/>
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