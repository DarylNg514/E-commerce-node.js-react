import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Deleteacount = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Email = sessionStorage.getItem('Email');
    const Password = sessionStorage.getItem('Password');

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/deleteAccount', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: Email,
                    password: Password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                console.log('Réponse de la requête de suppression de compte:', data);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('Email');
                sessionStorage.removeItem('Password');
                navigate("/");
                window.location.reload();
            } else {
                throw new Error(data.message || 'Erreur lors de la suppression du compte');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error.message);
            alert("Erreur lors de la suppression du compte");
        }
    };

    return (
        <div>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <div className="container">
                <h1>Supprimer Mon Compte</h1>
                <div>
                    <label>Email:</label>
                    <input type="email" value={Email} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={Password} />
                </div>
                <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                <button type="button" onClick={handleDeleteAccount}>Confirmer la Suppression</button>
                <Link to='/acceuil'>Retour</Link>
            </div>
        </div>
    );
};

export default Deleteacount;
