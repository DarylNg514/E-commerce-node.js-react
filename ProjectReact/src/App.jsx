import React, { useContext, useEffect, useState } from "react";
import styles from "./assets/styles/App.module.scss";
import Content from "./components/Home/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ProduitFavorisContext from "./contexts/produitFavorisContext";

export default function App() {
  const [produitsFavoris, setProduitsFavoris] = useState([]);

  const handleAjusterProduitFavoris = (item) => {
    let result = produitsFavoris.filter((t) => t._id === item._id);
    if (result.length > 0)
      setProduitsFavoris(produitsFavoris.filter((t) => t._id !== item._id));
    else setProduitsFavoris([...produitsFavoris, item]);
  };

  return (
    <div className={`${styles.appContainer} d-flex flex-column`}>
      <ProduitFavorisContext.Provider
        value={{ data: produitsFavoris, setData: handleAjusterProduitFavoris }}
      >
        <Header />

        <Content />

      </ProduitFavorisContext.Provider>

      <Footer />
    </div>
  );
}
