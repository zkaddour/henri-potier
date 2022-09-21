import './styles/Nav.css';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Nav = () => {
    const {cartState, setCartState, cartSize} = useContext(CartContext);
    return ( 
        <div className="navbar">
            <ul className="navbar">
                <li className="navitem">
                    <Link to="/">Home</Link> 
                </li>
                <li className="navitem">
                    <Link to="/about">About</Link> 
                </li>
                <li className="navitem">
                    <Link to="/cart">Cart {cartSize}</Link> 
                </li>
            </ul>
        </div>
     );
}
 
export default Nav;