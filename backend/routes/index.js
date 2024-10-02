const router = require("express").Router();
const routerProduits = require("./produits.routes");
const authRouter = require('./authRoutes.routes');

router.get("/", (req, res) => {
  res.end("Coucou !");
});

router.use("/auth", authRouter);
router.use("/produits", routerProduits);

module.exports = router;
