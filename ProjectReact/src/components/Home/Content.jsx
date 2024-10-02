import "../../assets/styles/index.scss";
import Produit from "./Produit";
import { Fragment, useState, useEffect, useContext } from "react";
import ProduitFavorisContext from "../../contexts/produitFavorisContext";
import ApiContext from "../../contexts/ApiContext";
import useFetchData from "../../hooks/useFetchData";
import SearchBar from "../SearchBar/SearchBar"

export default function Content() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { BASE_URL } = useContext(ApiContext);
  const [filterInput, setFilterInput] = useState("");
  const [filterBy, setFilterBy] = useState({ byName: true, byNote: false });
  const produitsFavorisContext = useContext(ProduitFavorisContext);
  const [produits, setProduits, isLoading] = useFetchData(
    `${BASE_URL}/produits`
  );

  function handleInput(e) {
    const filter = e.target.value;
    setFilterInput(filter.trim().toLowerCase());
  }

  const handleFilter = (e) => {
    const byFilter = e.target.value;
    if (byFilter === "byName")
      setFilterBy({ ...filterBy, byName: e.target.checked });
    if (byFilter === "byNote")
      setFilterBy({ ...filterBy, byNote: e.target.checked });
  };

  const getItemSavedState = (item) => {
    return produitsFavorisContext.data.some((p) => p._id === item._id);
  };

  return (
    <>
      <div className="small-container">
        <div className="row row-2">
          <h1>Bienvenue dans notre boutique de vêtements, de vente et d'accessoires</h1>
        </div>

        {error && <div className="error-message">{error}</div>}
        <div className="row">
          <SearchBar
            handleInput={handleInput}
            handleFilter={handleFilter}
            filterBy={filterBy}
          />
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            produits
              .filter((item) => {
                if (filterBy.byName === true && filterBy.byNote === false)
                  return item.nom.trim().toLowerCase().includes(filterInput);
                if (filterBy.byName === false && filterBy.byNote === true)
                  return item.price.trim().toLowerCase().includes(filterInput);
                return (
                  item.price.trim().toLowerCase().includes(filterInput) ||
                  item.nom.trim().toLowerCase().includes(filterInput)
                );
              })
              .map((item) => (
                <Fragment key={item._id}>
                  <Produit
                    data={item}
                    saved={getItemSavedState(item)}
                  />
                </Fragment>
              ))
          )}
        </div>
      </div>
    </>
  );
}
