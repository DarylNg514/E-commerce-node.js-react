import React, { useState } from 'react';
import './Connexion.css';
import { Link, useNavigate } from 'react-router-dom';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVerified, setisVerified] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = () => {
        if (!email || email.trim() === '') {
            setEmailError('Veuillez renseigner ce champ.');
            return false;
        }
        return true;
    };

    const validatePassword = () => {
        if (!password || password.trim() === '') {
            setPasswordError('Veuillez renseigner ce champ.');
            return false;
        }
        return true;
    };

    const handlOnSubmit = async (e) => {
        e.preventDefault();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            try {
                const response = await fetch('http://localhost:5000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    // Stockage des informations utilisateur dans la session
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('Email', data.email);
                    sessionStorage.setItem('Password', password);
                    sessionStorage.setItem('isVerified', data.isVerified);
                    sessionStorage.setItem('nom', data.nom);
                    sessionStorage.setItem('prenom', data.prenom);
                    sessionStorage.setItem('telephone', data.telephone);
                    sessionStorage.setItem('date_de_naissance', data.date_de_naissance);
                    sessionStorage.setItem('addresse', data.addresse);
                    sessionStorage.setItem('codepostal', data.codepostal);
                    alert('Connexion réussie');
                    navigate('/acceuil');
                    window.location.reload();
                } else {
                    alert('Utilisateur non trouvé');
                    console.error('Erreur lors de la connexion:', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
            }
        }
    };

    return (
        <>

            <div className='login'>
                <Link to='/'>
                    <img
                        className="login__logo"
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    />
                </Link>

                <div className='login__container'>
                    <h1>Sign-in</h1>

                    <form onSubmit={handlOnSubmit}>
                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        {emailError && <div className="input-error">{emailError}</div>}

                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        {passwordError && <div className="input-error">{passwordError}</div>}

                        <button type='submit' className='login__signInButton'>Sign In</button>
                    </form>

                    <p>
                        By signing-in you agree to the DL-CIM Conditions of Use & Sale. Please
                        see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>

                    <hr></hr>
                    <h6>Nouveau chez Amazon?</h6>

                    <Link to="/register"><button className='login__registerButton'>Create your Amazon Account</button></Link>
                </div>
            </div>


        </>
    );
};

export default Connexion;

/*  <div className="ocean">
<div className="wave"></div>
<div className="wave"></div>
</div>
<div>
<div className="container">
    <h1>Authentication</h1>
    <form onSubmit={handlOnSubmit}>
        <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <div className="input-error">{emailError}</div>}
        </div>
        <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <div className="input-error">{passwordError}</div>}
        </div>
        <div>
            <button type="submit">Login</button>
            <Link to="/register">S'Inscrire Ici</Link>
        </div>
    </form>
</div>
</div>
*/