const User = require('../database/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '52e4d52f23d204d418ad64c33c095051b2430322a2a47d8b378aede350661a21bf0c3c33991a998ff5314bc053d3ce66';

exports.signUp = async (req, res) => {
    try {
        const { nom, prenom, telephone, date_de_naissance, addresse, codepostal, email, password } = req.body;

        // Vérification des doublons d'email et de téléphone
        const existingUser = await User.findOne({ $or: [{ email }, { telephone }] });
        if (existingUser) {
            return res.status(400).send({ error: "L'email ou le numéro de téléphone est déjà utilisé" });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const user = new User({
            nom,
            prenom,
            telephone,
            date_de_naissance,
            addresse,
            codepostal,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).send({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Échec de la création de l'utilisateur en raison d'une erreur serveur"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ error: 'Utilisateur non trouvé' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30d' });
        res.send({
            token,
            isVerified: user.isVerified,
            nom: user.nom,
            prenom: user.prenom,
            telephone: user.telephone,
            date_de_naissance: user.date_de_naissance,
            addresse: user.addresse,
            codepostal: user.codepostal,
            email: user.email
        });
    } catch (err) {
        res.status(400).send({ error: 'Échec de la connexion' });
    }
};
/*exports.updatePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: "Mot de passe actuel incorrect." });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).send({ message: "Mot de passe mis à jour avec succès." });
    } catch (err) {
        res.status(500).send({ error: "Erreur interne du serveur." });
    }
};*/

exports.updateUser = async (req, res) => {
    const { email, currentPassword, newPassword, nom, prenom, telephone, date_de_naissance, addresse, codepostal } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: "Utilisateur non trouvé." });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).send({ error: "Mot de passe actuel incorrect." });
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
        }

        user.nom = nom || user.nom;
        user.prenom = prenom || user.prenom;
        user.telephone = telephone || user.telephone;
        user.date_de_naissance = date_de_naissance || user.date_de_naissance;
        user.addresse = addresse || user.addresse;
        user.codepostal = codepostal || user.codepostal;

        await user.save();

        res.status(200).send({ message: "Informations de l'utilisateur mises à jour avec succès." });
    } catch (err) {
        res.status(500).send({ error: "Erreur interne du serveur." });
    }
};


exports.deleteAccount = async (req, res) => {
    try {
        const authorizationHeader = req.header('Authorization');

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = authorizationHeader.replace('Bearer ', '');

        // Gestion d'erreurs JWT
        let decoded;
        try {
            decoded = await jwt.verify(token, SECRET_KEY);
        } catch (err) {
            console.log("Erreur lors de la vérification du token:", err);
            return res.status(401).json({ error: 'Token invalide' });
        }
        const userId = decoded.id;
        console.log("ID de l'utilisateur décodé:", userId);

        // Récupération et vérification de l'utilisateur
        const user = await User.findById(userId);
        console.log("Utilisateur trouvé:", user);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        console.log(user.password);
        console.log(req.body.password);
        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Mot de passe incorrect.' });
        }
        console.log(validPassword);
        // Suppression de l'utilisateur
        await User.findByIdAndDelete(userId);
        console.log("Utilisateur supprimé avec succès.");

        res.status(200).json({ message: 'Compte supprimé avec succès.' });
    } catch (error) {
        console.log("Erreur lors de la suppression du compte:", error);
        res.status(500).json({ error: 'Erreur lors de la suppression du compte.' });
    }

};

