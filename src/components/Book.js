import React, { Component} from 'react';

class Book extends Component {
    handleSelectChange = (book, e) => {
        const {changeShelf} = this.props;
        changeShelf(book, e.target.value)
    }

    validateImage(book) {
        var thumb = 'none';
        if (book.imageLinks && book.imageLinks.thumbnail) {
          thumb = `url(${book.imageLinks.thumbnail})`;
        } 
        return thumb;
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

    render(){
        const book = this.props.book;
        return(
            <li key={this.key}>
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
        )
    }
}

export default Book