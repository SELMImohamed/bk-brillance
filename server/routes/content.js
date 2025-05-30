const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const contentPath = path.join(__dirname, "..", "assets", "data", "content.json");

// GET /api/content
router.get("/", (req, res) => {
    try {
        const content = fs.readFileSync(contentPath, "utf-8");
        res.json(JSON.parse(content));
    } catch (err) {
        res.status(500).json({ error: "Erreur lecture du fichier content.json" });
    }
});

// POST /api/content
router.post("/", (req, res) => {
    try {
        fs.writeFileSync(contentPath, JSON.stringify(req.body, null, 2), "utf-8");
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Erreur écriture du fichier content.json" });
    }
});

module.exports = router;
