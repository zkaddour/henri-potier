import { useState, useContext, useEffect } from "react";
import { CartContext } from './CartContext';
import Price from './Price';

function Cart(props) {
  const {cartState, cartSize, totalPrice} = useContext(CartContext);
  const [showItemInfo, setShowItemInfo] = useState()
  
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  let displayData

  function updateListing(k, v, p) {
    props.onUpdate(k, v, p);
    pullBookData();
  }

  function pullBookData() {
    fetch(apiUrl, {method: 'GET'})
      .then(response => response.json())
      .then(responseData => {
        displayData = responseData.map(function(book) {
          if (Array.from(cartState.keys()).includes(book.isbn)) {
            return(
              <div  key={book.isbn} className="listingBook">
                <div className="listingCover">
                    <img src={book.cover} alt="Book Cover" />
                </div>
                <div className="listingInfo">
                  <h1 className="listingTitle">{book.title}</h1>
                  <h2 className="listingPrice">{(Math.round(book.price * 100) / 100).toFixed(2)}€</h2>
                  <h3 className="listingIsbn"><b>ISBN:</b> {book.isbn}</h3>
                  <br />
                  <div className="updateInfo">
                    <button className="updateCart" onClick={(e) => {
                      updateListing(book.isbn, -1, book.price*-1);
                    }}>-</button>
                    <span className='currentAmount'>{cartState.get(book.isbn)}</span>
                    <button className="updateCart" onClick={(e) => {
                      updateListing(book.isbn, 1, book.price);
                    }}>+</button>
                    <button className="updateCart" onClick={(e) => {
                      updateListing(book.isbn, -cartState.get(book.isbn), cartState.get(book.isbn)*book.price*-1);
                    }}>Delete</button>
                  </div>
                </div>
            </div>
            )
          } else return null
        })
        setShowItemInfo(displayData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    pullBookData()
  }, [])
  
  if (cartSize === 0) {
    return(
      <div className="content">
        <h2 key="">Cart is empty, no items to display.</h2>
      </div>
    )
  } else {
    return (
      <div>
        <div className="content cart">
          {showItemInfo}
        </div>
        <Price />
      </div>
    );
  }
}

export default Cart;
