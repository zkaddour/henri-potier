import './Books.css';
import { useState, useEffect} from "react";

function Book() {
  const [showBooks, setshowBooks] = useState()
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  let displayData

  function pullData() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(responseData => {
        displayData = responseData.map(function(book) {
          return(
            <div  key={book.isbn} className="Book">
                <div className="cover">
                    <img src={book.cover} alt="Book Cover" />
                </div>
                <div className="info">
                    <div className="mainInfo">
                        <h1 className="title">{book.title}</h1>
                        <span className="price">{book.price}€</span>
                    </div>
                    <span className="synopsis">{book.synopsis}</span>
                    <span className="isbn">{book.isbn}</span>
                </div>
            </div>
          )
        })
        setshowBooks(displayData)
      })
  }

  useEffect(() => {
    pullData()
  }, [])
  
  return (
    <div className="Library">
      {showBooks}
    </div>
  );
}

export default Book;
