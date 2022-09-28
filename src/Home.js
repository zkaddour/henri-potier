import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';

function Home() {
  const [showBooks, setshowBooks] = useState()
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  
  useEffect(() => {
    let displayData

    fetch(apiUrl, {method: 'GET'})
      .then(response => response.json())
      .then(responseData => {
        displayData = responseData.map(function(book) {
          return(
            <div key={book.isbn} className='item'>
                <Link to={`/book/${book.isbn}`}>
                  <img src={book.cover} alt="Book Cover" className="itemCover" />
                  <div className="itemInfo">
                    <h4 className="itemTitle">{book.title}</h4>
                    <p className="itemPrice">{(Math.round(book.price * 100) / 100).toFixed(2)}€</p>
                  </div>
                </Link>
            </div>
          )
        })
        setshowBooks(displayData)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [showBooks])
  
  return (
    <div className="content">
      <input type="text" id="mySearch" onKeyUp={searchLibrary} placeholder="Recherche..." title="Type in a category" />
      <div className="library">
        {showBooks}
      </div>
    </div>
  );
}

function searchLibrary() {
  var input, filter, library, items, title, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  library = document.getElementsByClassName("library");
  items = library[0].getElementsByClassName("item");
  
  for (i = 0; i < items.length; i++) {
    title = items[i].getElementsByTagName("h4")[0];
    if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
}

export default Home;
