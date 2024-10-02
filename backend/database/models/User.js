const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true, unique: true },
    date_de_naissance: { type: Date, required: true },
    addresse: { type: String, required: true },
    codepostal: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('UserAmazone', userSchema);





