import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Nav = () => {
    const {cartState, cartSize, totalPrice} = useContext(CartContext);
    return ( 
        <div className="navbar">
            <Link to="/" className='navitem'>Accueil</Link>
            <Link to="/about" className='navitem'>À Propos</Link>
            <Link to="/cart" className='navitem'>Panier <span className='cartsize'>{cartSize}</span></Link> 
        </div>
     );
}
 
export default Nav;