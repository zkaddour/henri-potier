import './styles/Home.css';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';

function Home() {
  const [showBooks, setshowBooks] = useState()
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  let displayData

  function pullBookData() {
    fetch(apiUrl, {method: 'GET'})
      .then(response => response.json())
      .then(responseData => {
        displayData = responseData.map(function(book) {
          return(
            <div key={book.isbn}>
                <Link to={`/book/${book.isbn}`}>
                    <h2>{book.title}</h2>
                </Link>
            </div>
          )
        })
        setshowBooks(displayData)
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
      {showBooks}
    </div>
  );
}

export default Home;
