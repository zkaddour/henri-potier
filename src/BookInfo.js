import './styles/BookInfo.css';
import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

function BookInfo(props) {
  const { isbn } = useParams();
  
  const [showBookInfo, setShowBookInfo] = useState()
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  let displayData

  function pullBookData() {
    fetch(apiUrl, {method: 'GET'})
      .then(response => response.json())
      .then(responseData => {
        let book = responseData.find(b => b.isbn === isbn)
        
        displayData = () => {
          return(
            <div  key={book.isbn} className="bookInfo">
                <div className="bookCover">
                  <img src={book.cover} alt="Book Cover" />
                </div>
                <div className="bookInfo">
                  <h1 className="bookTitle">{book.title}</h1>
                  <span className="bookPrice">{(Math.round(book.price * 100) / 100).toFixed(2)}€</span>
                  <span className="bookIsbn">isbn: {book.isbn}</span>
                  <button className="bookAddToCart" onClick={() => {
                    props.onUpdate(book.isbn, 1);
                  }}>Add To Cart</button>
                </div>
                <div className="bookBio">
                  <p className="bookSynopsis">{book.synopsis}</p>
                </div>
            </div>
          )
        }
        setShowBookInfo(displayData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    pullBookData()
  })
  
  return (
    <div className="content">
      {showBookInfo}
    </div>
  );
}

export default BookInfo;
