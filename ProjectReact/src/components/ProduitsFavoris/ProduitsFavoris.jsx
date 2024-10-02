import React, { useState, useContext } from "react";
import styles from "./Produits.module.scss";
import ProduitFavorisContext from "../../contexts/produitFavorisContext";
import { Link } from "react-router-dom";


const ProduitsFavoris = ({ produit }) => {
  const { image, nom, price, qty } = produit;
  const produitFavorisContext = useContext(ProduitFavorisContext);

  const handleClickSaved = (item) => {
    produitFavorisContext.setData(item);
  };
  return (
    <div
      className={`${styles.produitsFavoris} d-flex flex-row justify-content-center align-items-center`}
    >
      <img className="mr-10" src={image} width="50px" alt={nom} />
      <div>
        <div><span className="flex-fill">Nom: {nom}</span></div>
        <div><span className="flex-fill">Price: {price}</span></div>
        <div><span className="flex-fill">Quantite: {qty}</span></div>
        <div>
          <center>
            <Link style={{ fontSize: "13px", color: "white", backgroundColor: "#089cc5", width: "65%", borderRadius: "10px", display: "inline-block" }} to="/Payment">Commander</Link>
          </center>        </div>
        <div> <i
          onClick={() => handleClickSaved(produit)}
          className={`${styles.fa_trash} fa-solid fa-trash`}
        ></i></div>
      </div>
      <br />

    </div>
  );

};

export default ProduitsFavoris;
