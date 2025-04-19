const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔓 Rendre le dossier public
app.use("/assets", express.static(path.join(__dirname, "assets")));


// Route d'update
const updateRoute = require("./routes/update");
app.use("/api/update", updateRoute);

app.listen(PORT, () => {
  console.log("✅ Serveur en ligne sur le port", PORT);
});
