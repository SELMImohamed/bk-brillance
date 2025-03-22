// Importation d'Express
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000; // Tu peux le changer si tu veux

// Middlewares
app.use(cors()); // Autorise les requêtes du frontend
app.use(express.json()); // Permet de lire du JSON dans les requêtes

// Route principale (juste pour tester que le serveur tourne)
app.get("/", (req, res) => {
  res.send("Serveur backend admin opérationnel !");
});

// Route pour mettre à jour content.js
const updateRoute = require("./routes/update");
app.use("/api/update", updateRoute);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
