import './styles/Price.css';

const Price = () => {
    return ( 
        <div className="price">
            <h1>Price</h1>
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
  
export default Price;