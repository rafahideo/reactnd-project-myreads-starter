import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks.js'
import SearchBooks from './components/SearchBooks.js'
import { Link, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    booksList: []
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((booksList) => {
        this.setState(() => ({
          booksList
        }))
      })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(
      this.setState(previousValue => {
        const nextValue = previousValue.booksList.filter(b => b.id !== book.id).concat( [{...book, shelf}] );
        return { booksList: nextValue };
      })
    )
  }

  render() {  
    return (
      <div className="app">
        <Route path="/search"
            render = {
              () => <SearchBooks 
              booksList = {this.state.booksList}
              changeShelf = {this.changeShelf}
            />}
        />
        <Route
            exact
            path="/"
            render = {() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <ListBooks 
                    booksList = {this.state.booksList}
                    changeShelf = {this.changeShelf}
                  />
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
        />
      </div>
    );
  }
}

export default BooksApp
