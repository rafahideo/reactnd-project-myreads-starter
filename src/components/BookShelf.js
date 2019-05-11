import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book.js'

class BookShelf extends Component {
  
    handleSelectChange = (book, e) => {
        const {changeShelf} = this.props;
        changeShelf(book, e.target.value);
    }

    render(){
        const { booksList, shelfType, shelfTitle } = this.props
        return(
          <div> 
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfTitle}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksList.filter(s => s.shelf === shelfType).map((book) => (
                      <Book 
                      changeShelf = {this.props.changeShelf}
                      booksList = {booksList}
                      book = {book}/>
                    ))
                    }
                </ol>
              </div>
            </div>
          </div> 
        )
    }
}

BookShelf.propTypes = {
  booksList: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  shelfType: PropTypes.string.isRequired,
  shelfTitle: PropTypes.string.isRequired
};
export default BookShelf