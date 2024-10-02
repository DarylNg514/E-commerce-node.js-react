import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import ProduitFavorisContext from "../../contexts/produitFavorisContext";
import HeaderMenu from "../HeaderMenu/HeaderMenu";

function Navbar() {
  const [showMenupanier, setShowMenupanier] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const produitsFavorisContext = useContext(ProduitFavorisContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('Email');
    const storedPassword = sessionStorage.getItem('Password');
    const storedAdmin = JSON.parse(sessionStorage.getItem('isVerified')); // Convertir en booléen
    setIsLoggedIn(!!(storedEmail && storedPassword));
    setIsAdmin(storedAdmin);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Email');
    sessionStorage.removeItem('Password');
    sessionStorage.removeItem('isVerified');
    navigate("/");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      <nav className={`Nav-bar ${showMenu ? "open" : ""}`}>
        <ul className={`Nav-menu ${showMenu ? "open" : ""}`}>
          {isLoggedIn ? (
            <>
              <li key="accueil"><Link className="link-Nav" to="/acceuil">Accueil</Link></li>
              <li key="delete"><Link className="link-Nav" to="/delete">Supprimer mon compte</Link></li>
              <li key="modifier"><Link className="link-Nav" to="/modifier">Modifer compte</Link></li>
              {isAdmin && (
                <li key="Gestionproduits"><Link className="link-Nav" to="/Gestionproduits">Gestion des produits</Link></li>
              )}
              <button onClick={handleLogout} key="deconnexion">Deconnexion</button>
              <li key="panier">
                <button
                  className="link-Nav2"
                  onClick={() => setShowMenupanier(!showMenupanier)}
                >
                  {produitsFavorisContext.data.length}
                  <i className="bi bi-cart"></i>
                </button>
              </li>
            </>
          ) : (
            <>
              <li key="inscription"><Link className="link-Nav" to="/register">Inscription</Link></li>
              <li key="connexion"><Link className="link-Nav" to="/acceuil">Connexion</Link></li>
            </>
          )}
        </ul>
      </nav>
      {showMenupanier && (
        <>
          <div onClick={() => setShowMenupanier(false)} className="d-grid gap-2 d-md-flex justify-content-md-end"></div>
          <HeaderMenu produitsFavoris={produitsFavorisContext.data} />
        </>
      )}
    </div>
  );
}

export default Navbar;
/*

<div className="header">
      
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        
          <div className="header__option">
            <span className="header__optionLineOne">Hello Guest</span>
            <span className="header__optionLineTwo">Sign In</span>
          </div>
        

        
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        
        

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              0
            </span>
          </div>
        
      </div>
    </div>

*/



/*

    <div>


      <div className="header">

        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />


        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">

          {isLoggedIn ? (

            <>





              <div class="menuBar">
                <ul>
                  <a href="" class="border">
                    <i class="fa-solid fa-bars"></i>
                    <span>All</span>
                  </a>
                  <a class="border">Amazon miniTV</a>
                  <a class="border">Sell</a>
                  <a class="border">Best Sellers</a>
                  <a class="border">Mobiles</a>
                  <a class="border">Today's Deals</a>
                  <a class="border">New Releases</a>
                  <a class="border">Customer Service</a>
                  <a class="border">

                    Prime
                    Free
                    Premium

                  </a>
                  <a class="border">Electronics</a>
                  <a class="border">Gift Ideas</a>
                  <a class="border">Fashion</a>
                </ul>

                <div class="location">
                  <i class="fa-solid fa-location-dot"></i>
                  <p>Select a location to see product availabilty</p>
                  <i class="fa-solid fa-angle-down"></i>
                </div>
              </div>

              <div class="quickLink">
                <h2>Amazon Fashion</h2>
                <ul>
                  <a>Women</a>
                  <a>Men</a>
                  <a>Kids</a>
                  <a>Bags &amp; Luggage</a>
                  <a>Sportswear</a>
                  <a>Sales &amp; Deals</a>
                </ul>
                <div>
                  <p>30 DAY RETURNS</p>
                  <p>Restrictions Apply</p>
                </div>
              </div>

            </>

          ) : (

            <>

              <div className="header__option">
                <span className="header__optionLineOne">Hello Guest</span>
                <span className="header__optionLineTwo">Sign In</span>
              </div>



              <div className="header__option">
                <span className="header__optionLineOne">Returns</span>
                <span className="header__optionLineTwo">& Orders</span>
              </div>



              <div className="header__option">
                <span className="header__optionLineOne">Your</span>
                <span className="header__optionLineTwo">Prime</span>
              </div>


              <div className="header__optionBasket">
                <ShoppingBasketIcon />
                <span className="header__optionLineTwo header__basketCount">
                  0
                </span>
              </div>

            </>

          )}

        </div>
      </div>


    </div>


*/