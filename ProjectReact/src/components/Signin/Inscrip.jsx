import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Inscrip.css';

const Inscrip = () => {
    const url = 'http://localhost:5000';
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_Password] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passWordError, setPassWordError] = useState('');
    const [c_passWordError, setC_PassWordError] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [date_de_naissance, setDate_naissance] = useState('');
    const [addresse, setAddresse] = useState('');
    const [codepostal, setCodepostal] = useState('');
    const [nomError, setNomError] = useState('');
    const [prenomError, setPrenomError] = useState('');
    const [telephoneError, setTelephoneError] = useState('');
    const [date_naissanceError, setDate_naissanceError] = useState('');
    const [addresseError, setAddresseError] = useState('');
    const [codepostalError, setCodepostalError] = useState('');
    const [valide, setValide] = useState('');

    const validateEmail = () => {
        if (!email || email.trim() === '') {
            setEmailError('Veuillez renseigner votre email');
        } else if (!email.includes('@')) {
            setEmailError('Veuillez entrer une adresse email valide');
        } else {
            setEmailError('');
        }
    };

    const validateNom = () => {
        if (!nom || nom.trim() === '') {
            setNomError('Veuillez entrer votre nom.');
        } else if (!/^[A-Za-z]+$/.test(nom)) {
            setNomError('Le nom doit contenir uniquement des lettres.');
        } else {
            setNomError('');
        }
    };

    const validatePrenom = () => {
        if (!prenom || prenom.trim() === '') {
            setPrenomError('Veuillez entrer votre prénom.');
        } else if (!/^[A-Za-z]+$/.test(prenom)) {
            setPrenomError('Le prénom doit contenir uniquement des lettres.');
        } else {
            setPrenomError('');
        }
    };

    const validateTelephone = () => {
        if (!telephone || telephone.trim() === '') {
            setTelephoneError('Veuillez entrer votre numéro de téléphone.');
        } else if (!/^\+?1?\d{9,15}$/.test(telephone)) {
            setTelephoneError('Le numéro de téléphone doit être valide et peut contenir 9 à 15 chiffres.');
        } else {
            setTelephoneError('');
        }
    };

    const validateDate_naissance = () => {
        if (!date_de_naissance || date_de_naissance.trim() === '') {
            setDate_naissanceError('Veuillez entrer votre date de naissance.');
        } else {
            const age = (new Date() - new Date(date_de_naissance)) / (1000 * 60 * 60 * 24 * 365.25);
            if (age < 18) {
                setDate_naissanceError('Vous devez avoir au moins 18 ans.');
            } else {
                setDate_naissanceError('');
            }
        }
    };

    const validateAddresse = () => {
        if (!addresse || addresse.trim() === '') {
            setAddresseError('Veuillez entrer votre adresse.');
        } else if (!/^\d+ [a-zA-Z0-9 ]+$/.test(addresse)) {
            setAddresseError('Veuillez entrer une adresse valide.');
        } else {
            setAddresseError('');
        }
    };

    const validateCodepostal = () => {
        if (!codepostal || codepostal.trim() === '') {
            setCodepostalError('Veuillez entrer votre code postal.');
        } else if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(codepostal)) {
            setCodepostalError('Veuillez entrer un code postal valide au Canada (format: A1A 1A1).');
        } else {
            setCodepostalError('');
        }
    };

    const validatePassword = () => {
        if (!password || password.trim() === '') {
            setPassWordError('Veuillez entrer le mot de passe.');
        } else {
            setPassWordError('');
        }
    };

    const validateC_Password = () => {
        if (!c_password || c_password.trim() === '') {
            setC_PassWordError('Veuillez confirmer le mot de passe.');
        } else {
            setC_PassWordError('');
        }
    };

    const validatePasswordsMatch = () => {
        if (password !== c_password) {
            setValide('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
            return false;
        } else {
            setValide('');
            return true;
        }
    };

    const validateForm = () => {
        let isValid = true;

        validateNom();
        validatePrenom();
        validateTelephone();
        validateDate_naissance();
        validateAddresse();
        validateCodepostal();
        validateEmail();
        validatePassword();
        validateC_Password();

        if (nomError || prenomError || telephoneError || date_naissanceError || addresseError || codepostalError || emailError || passwordError || c_passwordError) {
            isValid = false;
        }

        if (!validatePasswordsMatch()) {
            isValid = false;
        }

        return isValid;
    };

    const handlOnSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const body = JSON.stringify({
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            date_de_naissance: date_de_naissance,
            addresse: addresse,
            codepostal: codepostal,
            email: email,
            password: password,
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        };

        try {
            const response = await fetch(`${url}/auth/signUp`, requestOptions);
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('token', data.token);
            alert(data.message);
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de la requête fetch :", error);
            alert("Erreur lors de l'inscription, veuillez vérifier si vous avez bien rempli les champs ou si cette email existe déjà.");
        }
    };

    const handlOnChangecpassword = (e) => {
        setC_Password(e.target.value);
    };

    const handlOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlOnChangeNom = (e) => {
        setNom(e.target.value);
    };

    const handlOnChangePrenom = (e) => {
        setPrenom(e.target.value);
    };

    const handlOnChangeTelephone = (e) => {
        setTelephone(e.target.value);
    };

    const handlOnChangeDate_naissance = (e) => {
        setDate_naissance(e.target.value);
    };

    const handlOnChangeAddresse = (e) => {
        setAddresse(e.target.value);
    };

    const handlOnChangeCodepostal = (e) => {
        setCodepostal(e.target.value);
    };

    return (
        <div>

            <div className='register'>
                <Link to='/'>
                    <img
                        className="login__logo"
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    />
                </Link>

                <div className='register__container'>
                    <h1>Sign-in</h1>

                    <form onSubmit={handlOnSubmit}>
                        <h5>Nom</h5>
                        <input type='text' value={nom} onChange={handlOnChangeNom} />
                        {nomError && <div className="input-error">{nomError}</div>}

                        <h5>prenom</h5>
                        <input type='text' value={prenom} onChange={handlOnChangePrenom} />
                        {prenomError && <div className="input-error">{prenomError}</div>}

                        <h5>Numero de telephone</h5>
                        <input type='text' value={telephone} onChange={handlOnChangeTelephone} />
                        {telephoneError && <div className="input-error">{telephoneError}</div>}

                        <h5>Date de naissance</h5>
                        <input type='Date' value={date_de_naissance} onChange={handlOnChangeDate_naissance} />
                        {date_naissanceError && <div className="input-error">{date_naissanceError}</div>}

                        <h5>Adresse</h5>
                        <input type='text' placeholder='Ex : 1305 Boul des laurentide' value={addresse} onChange={handlOnChangeAddresse} />
                        {addresseError && <div className="input-error">{addresseError}</div>}

                        <h5>Code postal</h5>
                        <input type='text' placeholder='Ex H5B 0S9' value={codepostal} onChange={handlOnChangeCodepostal} />
                        {codepostalError && <div className="input-error">{codepostalError}</div>}

                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={handlOnChangeEmail} />
                        {emailError && <div className="input-error">{emailError}</div>}

                        <h5>Password</h5>
                        <input type='password' value={password} onChange={handlOnChangePassword} />
                        {passWordError && <div className="input-error">{passWordError}</div>}

                        <h5>confirm Password</h5>
                        <input type='password' value={c_password} onChange={handlOnChangecpassword} />
                        {c_passWordError && <div className="input-error">{c_passWordError}</div>}

                        <button type='submit' className='register__signUpButton'>Sign Up</button>
                    </form>

                    <p>
                        By signing-up you agree to the DL-CIM Conditions of Use & Sale. Please
                        see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>

                    <Link to="/" >
                        Vous avez déjà un compte?<span><u><b>Se connecter</b></u></span></Link>
                </div>
            </div>

        </div>




    );
};

export default Inscrip;


/*

<div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <div className='container'>
                <h1>Bienvenue</h1>
                <h4>Créez-vous un compte, <br></br>
                    c'est gratuit !!</h4>
                <form onSubmit={handlOnSubmit}>
                    <input className="btn" type="email" class="form-control" placeholder="Email" value={email} onChange={handlOnChangeEmail} />
                    {emailError && <div className="input-error">{emailError}</div>}
                    <input className="btn" type="password" class="form-control" placeholder="password" value={password} onChange={handlOnChangePassword} />
                    {passWordError && <div className="input-error">{passWordError}</div>}
                    <input className="btn" type="text" class="form-control" placeholder="confirmer le mot de passe" value={c_password} onChange={handlOnChangecpassword} />
                    {c_passWordError && <div className="input-error">{c_passWordError}</div>}
                    <button type='submit' > S'inscrire</button>
                    <p>{valide && <div className="input-error">{valide}</div>}</p>
                </form>
                <Link to="/">Deja inscrit?</Link>
            </div>


*/