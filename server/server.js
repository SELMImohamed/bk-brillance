const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const updateRoute = require("./routes/update");
app.use("/api/update", updateRoute);

// Démarrage
app.listen(PORT, () => {
  console.log("✅ Serveur Express démarré sur le port " + PORT);
});