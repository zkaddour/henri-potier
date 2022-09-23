import { useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';

function BookInfo(props) {
  const { isbn } = useParams();
  const navigate = useNavigate();
  
  const [showBookInfo, setShowBookInfo] = useState()
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  let displayData

  function pullBookData() {
    fetch(apiUrl, {method: 'GET'})
      .then(response => response.json())
      .then(responseData => {
        let book = responseData.find(b => b.isbn === isbn)
        if(typeof(book)=='undefined') {
          console.log("got an error here, should break" + isbn);
          navigate("/book-does-not-exist");
        } else {
          displayData = () => {
            return(
              <div  key={book.isbn} className="bookCard">
                  <div className="bookCover">
                    <img src={book.cover} alt="Book Cover" />
                  </div>
                  <div className="bookInfo">
                    <h1 className="bookTitle">{book.title}</h1>
                    <button className="bookAddToCart" onClick={() => {
                      props.onUpdate(book.isbn, 1, book.price);
                    }}>Ajouter au panier</button>
                    <span className="bookIsbn"><b>isbn:</b> {book.isbn}</span>
                    <span className="bookPrice">{(Math.round(book.price * 100) / 100).toFixed(2)}€</span>
                    <p className="bookSynopsis"><b>Synopsis:</b> {book.synopsis}</p>
                  </div>
              </div>
            )
          }
          setShowBookInfo(displayData)
        }
        
        
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    pullBookData()
  }, [])
  
  return (
    <div className="content">
      {showBookInfo}
    </div>
  );
}

export default BookInfo;
