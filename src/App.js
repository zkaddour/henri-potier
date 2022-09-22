import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import BookInfo from './BookInfo';
import Cart from './Cart';
import Home from './Home';
import Nav from './Nav';
import About from './About';
import { CartContext } from './CartContext';
import { useState, useMemo } from 'react';

function App() {
  const [cartState, setCartState] = useState(new Map());
  const [cartSize, setCartSize] = useState(0);

  const updateMap = (key, value) => {
    let exists = false;
    if(cartState.has(key)){
      value += cartState.get(key);
      exists = true;
    }
    if (exists) {
      if (value <= 0) {
        cartState.delete(key);
      } else {
        cartState.set(key, value);
      }
    } else {
      cartState.set(key, value)
    }
    setCartState(cartState);
    let l = Array.from(cartState.values()).reduce((a,b) => a+b, 0);
    setCartSize(l);
  }

  return (
    <div className="app">
      <CartContext.Provider value={{cartState, setCartState, cartSize}}>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/cart' element={<Cart onUpdate={updateMap} />} />
          <Route exact path='/book/:isbn' element={<BookInfo onUpdate={updateMap} />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
