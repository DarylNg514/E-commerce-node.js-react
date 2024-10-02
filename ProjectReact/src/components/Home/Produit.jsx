import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProduitFavorisContext from "../../contexts/produitFavorisContext";

export default function Produit({ data, saved }) {
  const { image, nom, price } = data;
  const produitFavorisContext = useContext(ProduitFavorisContext);
  const navigate = useNavigate();

  const [qty, setQty] = useState(1); // Initialiser la quantité à 1

  const handleQtyChange = (event) => {
    // Mettre à jour la quantité lorsque l'utilisateur change la valeur
    const newQty = parseInt(event.target.value);
    setQty(newQty);
  };

  const ajouterPanier = () => {
    // Ajouter le produit au panier avec sa quantité
    const produitAuPanier = {
      ...data,
      qty: qty
    };

    // Ajouter le produit au panier dans le contexte ou l'état global
    produitFavorisContext.setData(produitAuPanier);


  };
  const handleClickSaved = (item) => {
    produitFavorisContext.setData(item);
  };

  return (
    <>
      <div className="col-4">
        <img src={image} alt={nom} />
        <h4>{nom}</h4>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <p>Prix: {price}$</p>
        <label htmlFor="qty">Quantité:</label>
        <input
          type="number"
          id="qty"
          name="qty"
          min="1"
          value={qty}
          onChange={handleQtyChange}
        />
        <button onClick={() => ajouterPanier()}>Ajouter au panier</button>
      </div>
    </>
  );
}
