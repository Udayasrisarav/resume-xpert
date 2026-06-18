import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const upload = multer();
const app = express();

app.post("/api/analyze", upload.single("file"), async (req, res) => {
    try {
        const formData = new FormData();
        formData.append("file", req.file.buffer, req.file.originalname);

        const response = await fetch("https://api.puter.com/ai/feedback", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.PUTER_API_KEY}`,
            },
            body: formData,
        });

        const text = await response.text();

        const cleaned = text.replace(/```json|```/g, "").trim();

        let data;
        try {
            data = JSON.parse(cleaned);
        } catch (err) {
            console.error("Failed to parse upstream response:", cleaned);
            return res.status(500).json({ error: "Invalid JSON from upstream" });
        }

        res.json(data);
    } catch (err) {
        console.error("Backend error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(5000, () =>
    console.log("Backend running on http://localhost:5000")
);