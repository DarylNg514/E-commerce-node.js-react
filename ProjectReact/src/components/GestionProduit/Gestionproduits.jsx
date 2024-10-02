import React, { useState, useContext } from "react";
import ProduitFavorisContext from "../../contexts/produitFavorisContext";
import { updateProduit, deleteProduit } from "../../apis/produits";
import ApiContext from "../../contexts/ApiContext";
import useFetchData from "../../hooks/useFetchData";
import { Link, useNavigate } from "react-router-dom";


export default function Gestionproduits() {
    const { BASE_URL } = useContext(ApiContext);
    const [produits, setProduits, isLoading] = useFetchData(
        `${BASE_URL}/produits`
    );
    const produitFavorisContext = useContext(ProduitFavorisContext);
    const navigate = useNavigate();

    const handleUpdateProduit = async (produit) => {
        try {
            // Nouvelles données pour le produit
            const newData = {
                ...produit
            };

            // Appel de la fonction modifierProduit avec l'identifiant du produit et les nouvelles données
            const updatedProduit = await updateProduit(newData, produit._id);
            console.log("Produit mis à jour :", updatedProduit);
            alert("Produit mis à jour");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du produit :", error);
            alert("Erreur lors de la mise à jour du produit ");
            // Gérer l'erreur
        }
    };

    const handleNomChange = (event, produit) => {
        const newNom = event.target.value;
        const updatedProduits = produits.map((prod) => {
            if (prod._id === produit._id) {
                return { ...prod, nom: newNom };
            } else {
                return prod;
            }
        });
        setProduits(updatedProduits);
    };

    const handleImageChange = (event, produit) => {
        const newImage = event.target.value;
        const updatedProduits = produits.map((prod) => {
            if (prod._id === produit._id) {
                return { ...prod, image: newImage };
            } else {
                return prod;
            }
        });
        setProduits(updatedProduits);
    };

    const handlePriceChange = (event, produit) => {
        const newPrice = event.target.value;
        const updatedProduits = produits.map((prod) => {
            if (prod._id === produit._id) {
                return { ...prod, price: newPrice };
            } else {
                return prod;
            }
        });
        setProduits(updatedProduits);
    };

    const handleDeleteProduit = async (produitId) => {
        try {
            // Appel de la fonction deleteProduit avec l'identifiant du produit à supprimer
            await deleteProduit(produitId);
            // Filtrer les produits pour les mettre à jour après la suppression
            const updatedProduits = produits.filter(prod => prod._id !== produitId);
            setProduits(updatedProduits);
            console.log(`Produit ${produitId} supprimé avec succès.`);
            alert(`Produit supprimé avec succès.`);
        } catch (error) {
            console.error("Erreur lors de la suppression du produit :", error);
            alert("Erreur lors de la suppression du produit");
            // Gérer l'erreur
        }
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <td colSpan="4">
                    <center>
                        <Link style={{ fontSize: "20px", color: "white", backgroundColor: "#089cc5", width: "30%", borderRadius: "20px", display: "inline-block" }} to="/ajout">Ajouter des Nouveaux Produits</Link>
                    </center>
                </td>

                <tbody>
                    {produits.map((produit, index) => (
                        <tr key={index}>
                            <td><img src={produit.image} alt={produit.nom} />
                                <input
                                    type="text"
                                    value={produit.image}
                                    onChange={(event) => handleImageChange(event, produit)}
                                    style={{ width: "60%" }} // Style pour définir la largeur à 100%
                                /></td>
                            <td><input
                                type="text"
                                value={produit.nom}
                                onChange={(event) => handleNomChange(event, produit)}
                                style={{ width: "80%" }} // Style pour définir la largeur à 100%
                            /></td>
                            <td><input
                                type="text"
                                value={produit.price}
                                onChange={(event) => handlePriceChange(event, produit)}
                                style={{ width: "20%" }} // Style pour définir la largeur à 100%
                            />$</td>
                            <td>
                                <button onClick={() => handleUpdateProduit(produit)}>Mettre à jour</button>
                                <button onClick={() => handleDeleteProduit(produit._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <td colSpan="4">
                    <center>
                        <Link style={{ fontSize: "20px", color: "white", backgroundColor: "#089cc5", width: "30%", borderRadius: "20px", display: "inline-block" }} to="/acceuil">Retour</Link>
                    </center>
                </td>
            </table>

        </>
    );
}
