import { useState, useContext, useEffect } from "react";
import { CartContext } from './CartContext';

const Price = () => {
    const {cartState, cartSize, totalPrice} = useContext(CartContext);
    const [showPrice, setShowPrice] = useState(0);
    const [reductionPrice, setReductionPrice] = useState(0);

    const fullURL = "http://henri-potier.xebia.fr/books/" + createURL(cartState) + "/commercialOffers";
    
    function calculateOffer() {
        fetch(fullURL, {method: 'GET'})
        .then(response => response.json())
        .then(responseData => {
            let bestOffer = totalPrice;
            const offers = responseData['offers'];
            offers.forEach(offer => {
                switch (offer['type']) {
                    case "percentage":
                        if (percentage(totalPrice, offer['value']) < bestOffer) {
                            bestOffer = percentage(totalPrice, offer['value']);
                        }
                        break;
                    case "minus":
                        if (minus(totalPrice, offer['value']) < bestOffer) {
                            bestOffer = minus(totalPrice, offer['value']);
                        }
                        break;
                    case "slice":
                        if (slice(totalPrice, offer['sliceValue'], offer['value']) < bestOffer) {
                            bestOffer = slice(totalPrice, offer['sliceValue'], offer['value']);
                        }
                        break;
                    default:
                        bestOffer = totalPrice;
                        break;
                }
            });
            setShowPrice(bestOffer);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        calculateOffer();
    }, [cartSize])
    useEffect(() => {
        let r = totalPrice - showPrice;
        setReductionPrice(r);
    }, [showPrice])
    
    return ( 
        <div className="price">
            <h3 className="priceHeader">Total: <span className="priceSpan totalPrice">{(Math.round(totalPrice * 100) / 100).toFixed(2)}€</span></h3>
            <h3 className="priceHeader">Offert: <span className="priceSpan offeredPrice">{(Math.round(reductionPrice * 100) / 100).toFixed(2)}€</span></h3>
            <h3 className="priceHeader">Prix Réduit: <span className="priceSpan reducedPrice">{(Math.round(showPrice * 100) / 100).toFixed(2)}€</span></h3>
            <br />
            <button className='purchase' onClick={()=>{ alert("Merci pour l'achat !\nMais comme il s'agit d'une page web de test, c'est ici que l'aventure se termine."); }}>
                Acheter Maintenant</button>
        </div>
     );
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

function percentage(total, value) {
    return total*(1-(value/100));
}

function minus(total, value) {
    return total-value;
}

function slice(total, sliceValue, value) {
    return total-(value*(Math.floor(total/sliceValue)));
}

export default Price;