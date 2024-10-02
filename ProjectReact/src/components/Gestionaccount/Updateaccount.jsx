import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Updateaccount = () => {
    const navigate = useNavigate();

    const currentemail = sessionStorage.getItem('Email');
    const currentPassword = sessionStorage.getItem('Password');

    const [nom, setNom] = useState(sessionStorage.getItem('nom') || '');
    const [prenom, setPrenom] = useState(sessionStorage.getItem('prenom') || '');
    const [telephone, setTelephone] = useState(sessionStorage.getItem('telephone') || '');
    const [date_de_naissance, setDateDeNaissance] = useState(sessionStorage.getItem('date_de_naissance') || '');
    const [addresse, setAddresse] = useState(sessionStorage.getItem('addresse') || '');
    const [codepostal, setCodePostal] = useState(sessionStorage.getItem('codepostal') || '');
    const [newpassword, setNewPassword] = useState('');

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!nom.trim()) errors.nom = 'Veuillez entrer votre nom.';
        if (!prenom.trim()) errors.prenom = 'Veuillez entrer votre prénom.';
        if (!telephone.trim()) errors.telephone = 'Veuillez entrer votre numéro de téléphone.';
        if (!date_de_naissance.trim()) errors.date_de_naissance = 'Veuillez entrer votre date de naissance.';
        if (!addresse.trim()) errors.addresse = 'Veuillez entrer votre adresse.';
        if (!codepostal.trim()) errors.codepostal = 'Veuillez entrer votre code postal.';
        if (!newpassword.trim()) errors.password = 'Veuillez entrer un nouveau mot de passe.';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleUpdateAccount = async () => {
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:5000/auth/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: currentemail,
                    currentPassword: currentPassword,
                    newPassword: newpassword,
                    nom: nom,
                    prenom: prenom,
                    telephone: telephone,
                    date_de_naissance: date_de_naissance,
                    addresse: addresse,
                    codepostal: codepostal
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                console.log('Réponse de la requête de modification de compte:', data);

                // Mise à jour des informations de session
                sessionStorage.setItem('nom', nom);
                sessionStorage.setItem('prenom', prenom);
                sessionStorage.setItem('telephone', telephone);
                sessionStorage.setItem('date_de_naissance', date_de_naissance);
                sessionStorage.setItem('addresse', addresse);
                sessionStorage.setItem('codepostal', codepostal);
                sessionStorage.setItem('Password', newpassword);

                navigate('/acceuil');
                window.location.reload();
            } else {
                throw new Error(data.message || 'Erreur lors de la modification du compte');
            }
        } catch (error) {
            console.error('Erreur lors de la modification du compte:', error.message);
            alert("Erreur lors de la modification du compte");
        }
    };

    return (
        <div>

            <div className="container">
                <h1>Modifier Mon Compte</h1>
                <div>
                    <label>Email:</label>
                    <input type="email" value={currentemail} readOnly />
                </div>
                <div>
                    <label>Nouveau Mot de passe:</label>
                    <input type="password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} />
                    {errors.password && <div className="input-error">{errors.password}</div>}
                </div>
                <div>
                    <label>Nom:</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                    {errors.nom && <div className="input-error">{errors.nom}</div>}
                </div>
                <div>
                    <label>Prénom:</label>
                    <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    {errors.prenom && <div className="input-error">{errors.prenom}</div>}
                </div>
                <div>
                    <label>Téléphone:</label>
                    <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                    {errors.telephone && <div className="input-error">{errors.telephone}</div>}
                </div>
                <div>
                    <label>Date de naissance:</label>
                    <input type="date" value={date_de_naissance} onChange={(e) => setDateDeNaissance(e.target.value)} />
                    {errors.date_de_naissance && <div className="input-error">{errors.date_de_naissance}</div>}
                </div>
                <div>
                    <label>Adresse:</label>
                    <input type="text" value={addresse} onChange={(e) => setAddresse(e.target.value)} />
                    {errors.addresse && <div className="input-error">{errors.addresse}</div>}
                </div>
                <div>
                    <label>Code postal:</label>
                    <input type="text" value={codepostal} onChange={(e) => setCodePostal(e.target.value)} />
                    {errors.codepostal && <div className="input-error">{errors.codepostal}</div>}
                </div>
                <p>Êtes-vous sûr de vouloir modifier votre compte ? Cette action est irréversible.</p>
                <button type="button" onClick={handleUpdateAccount}>Modifier le compte</button>
                <Link to='/acceuil'>Retour</Link>
            </div>
        </div>
    );
};

export default Updateaccount;
