const mongoose = require("mongoose");

const schema = mongoose.Schema;

const produitSchema = schema({
  nom: {
    type: String,
    required: [true, "Le nom est requis !"],
    minLength: [2, "Le nom est trop court ! "],
  },
  price: {
    type: Number,
    required: [true, "Le prix sont requises !"],
  },
  image: {
    type: String,
    required: [true, "L'url de l'image est requise !"],
  },
});

const Produits = mongoose.model("produitvente", produitSchema);

module.exports = Produits;
