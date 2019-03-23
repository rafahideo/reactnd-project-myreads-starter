import React, { Component} from 'react';
import PropTypes from 'prop-types';

class BookShelf extends Component {
  
    handleSelectChange = (book, e) => {
        const {changeShelf} = this.props;
        e.preventDefault();
        changeShelf(book, e.target.value)
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
                       <li key={book.id}>
                          <div className="book">
                          <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                          <div className="book-shelf-changer">
                          <select value={shelfType} onChange={(e) => this.handleSelectChange(book, e)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                          </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                        </div>
                       </li>
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