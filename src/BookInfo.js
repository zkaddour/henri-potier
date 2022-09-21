//import './styles/BookInfo.css';
import { useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';

function BookInfo(props) {
  const { isbn } = useParams();
  
  const [showBookInfo, setShowBookInfo] = useState()
  const navigate = useNavigate();
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  let displayData

  function pullBookData() {
    fetch(apiUrl, {method: 'GET'})
      .then(response => response.json())
      .then(responseData => {
        let book = responseData.find(b => b.isbn === isbn)
        
        displayData = () => {
          return(
            <div  key={book.isbn} className="book">
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
                    <button className="addToCart" onClick={() => {
                      props.onUpdate(book.isbn, 1);
                      navigate('/');
                    }}>Add To Cart</button>
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
    <div className="Library">
      {showBookInfo}
    </div>
  );
}

export default BookInfo;
