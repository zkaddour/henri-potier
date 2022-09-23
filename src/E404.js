import { Link } from "react-router-dom";

const E404 = () => {
    return ( 
        <div className="content">
            <h2>Page non trouvée, retour à <Link className="inlineLink" to="/">l'accueil</Link></h2>
        </div>
     );
}
 
export default E404;