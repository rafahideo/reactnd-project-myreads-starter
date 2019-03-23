import React, { Component} from 'react';
import BookShelf from './BookShelf.js';
import PropTypes from 'prop-types';

class ListBooks extends Component {
    render(){
        const shelveTypes = [
          {id: 'currentlyReading', title: 'Currently Reading'},
          {id: 'wantToRead', title: 'Want to Read'},
          {id: "read", title: "Read"}
        ];
        
        const { booksList, changeShelf } = this.props
        return(
          shelveTypes.map((shelf) => (
            <BookShelf key = {shelf.id}
              shelfTitle = {shelf.title}
              booksList = {booksList}
              shelfType = {shelf.id}
              changeShelf = {changeShelf}
            />
          ))
        )
    }
}

ListBooks.propTypes = {
  booksList: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};
export default ListBooks