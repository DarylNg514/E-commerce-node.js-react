import React, { useState } from 'react';
import './gestion.css';
import { Link } from "react-router-dom";
import { postProduit } from "../../apis/produits";

const Ajoutproduit = () => {
    const [nom, setNom] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [errnom, setErrNom] = useState('');
    const [errprice, setErrPrice] = useState('');
    const [errimage, setErrImage] = useState('');
    const [submitError, setSubmitError] = useState('');

    const validateNom = () => {
        if (!nom || nom.trim() === '') {
            setErrNom('Veuillez renseigner ce champ.');
        } else {
            setErrNom('');
        }
    };

    const validatePrice = () => {
        if (!price || price.trim() === '') {
            setErrPrice('Veuillez renseigner ce champ.');
        } else {
            setErrPrice('');
        }
    };

    const validateImage = () => {
        if (!image || image.trim() === '') {
            setErrImage('Veuillez renseigner ce champ.');
        } else {
            setErrImage('');
        }
    };

    const handlOnSubmit = async (e) => {
        e.preventDefault();
        validateNom();
        validatePrice();
        validateImage();
        if (!errnom && !errprice && !errimage) {
            try {
                const response = await postProduit({ nom, price, image });
                if (response) {
                    alert('Produit ajouté avec succès');

                    setNom("");
                    setPrice("");
                    setImage("");
                }
            } catch (error) {
                setSubmitError("Une erreur est survenue lors de l'ajout du produit.");
                console.error("Erreur lors de l'ajout:", error);
            }
        }
    };

    return (
        <div>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <div className="container">
                <h1>Ajouter un produit</h1>
                {submitError && <div className="submit-error">{submitError}</div>}
                <form onSubmit={handlOnSubmit}>
                    <div>
                        <label>nom:</label>
                        <input type="text" value={nom} onChange={(e) => { setNom(e.target.value); validateNom(); }} />
                        {errnom && <div className="input-error">{errnom}</div>}
                    </div>
                    <div>
                        <label>price:</label>
                        <input type="text" value={price} onChange={(e) => { setPrice(e.target.value); validatePrice(); }} />
                        {errprice && <div className="input-error">{errprice}</div>}
                    </div>
                    <div>
                        <label>image:</label>
                        <input type="text" value={image} onChange={(e) => { setImage(e.target.value); validateImage(); }} />
                        {errimage && <div className="input-error">{errimage}</div>}
                    </div>
                    <div>
                        <button type='submit'>Ajouter</button>
                        <Link style={{ backgroundColor: "#089cc5" }} className='link-Nav3' to='/Gestionproduits'>Retour</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Ajoutproduit;
