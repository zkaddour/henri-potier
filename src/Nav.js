import './styles/Nav.css';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Nav = () => {
    const {cartState, setCartState, cartSize} = useContext(CartContext);
    return ( 
        <div className="navbar">
            <Link to="/" className='navitem'>Home</Link>
            <Link to="/about" className='navitem'>About</Link>
            <Link to="/cart" className='navitem'>Cart <span className='cartsize'>{cartSize}</span></Link> 
        </div>
     );
}
 
export default Nav;