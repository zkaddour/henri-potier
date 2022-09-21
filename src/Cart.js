import './styles/Cart.css';
import { useState, useContext, useEffect } from "react";
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function Cart(props) {
  const {cartState, setCartState, cartSize} = useContext(CartContext);
  const [showItemInfo, setShowItemInfo] = useState()
  
  const apiUrl = 'http://henri-potier.xebia.fr/books';
  let displayData

  function pullBookData() {
    fetch(apiUrl, {method: 'GET'})
      .then(response => response.json())
      .then(responseData => {
        displayData = responseData.map(function(book) {
          if (Array.from(cartState.keys()).includes(book.isbn)) {
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
                      props.onUpdate(book.isbn, -1);
                    }}>Remove from Cart</button>
                    <h3>{cartState.get(book.isbn)}</h3>
                </div>
            </div>
            )
          } else return
        })
        setShowItemInfo(displayData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    pullBookData()
  })
  
  if (cartSize === 0) {
    return(
      <div>
        <h2 key="">Cart is empty, no items to display.</h2>
      </div>
    )
  } else {
    return (
      <div className="Library">
        {showItemInfo}
      </div>
    );
  }
}

function createURL(map){
  var f = '';

  for (let [k,v] of map){
    let r = Array(v).fill(k).join(',');
    if (f === '') {
      f += r;
    } else {
      f += ',' + r;
    }
  }
  return f;
}

export default Cart;
//new Map(map.set(key, value));
