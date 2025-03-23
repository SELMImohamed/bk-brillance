const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
  const newData = req.body;
  const filePath = path.join(__dirname, "../assets/data/content.js");

  const content = "const data = " + JSON.stringify(newData, null, 2) + ";\n";

  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("❌ Erreur lors de l'écriture dans content.js :", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }

    console.log("✅ Fichier content.js mis à jour avec succès.");
    res.status(200).json({ message: "Contenu mis à jour." });
  });
});

module.exports = router;
