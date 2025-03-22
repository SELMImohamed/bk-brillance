const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Route POST : reçoit les données du formulaire admin
router.post("/", (req, res) => {
  const data = req.body;

  // Chemin vers content.js (à adapter si ton chemin est différent)
  const contentPath = path.join(__dirname, "../../assets/data/content.js");

  // Format JS valide (on exporte une variable const data = { ... })
  const contentString = `const data = ${JSON.stringify(data, null, 2)};`;

  // Écriture du fichier
  fs.writeFile(contentPath, contentString, (err) => {
    if (err) {
      console.error("❌ Erreur lors de l’écriture dans content.js :", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }

    console.log("✅ content.js mis à jour !");
    res.status(200).json({ message: "Mise à jour réussie !" });
  });
});

module.exports = router;
