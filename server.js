import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/analyze", async (req, res) => {
    const { code, filename } = req.body || {};

    if (!code || typeof code !== "string") {
        return res.status(400).json({ error: "Missing code" });
    }

    // TODO: Replace this with a real AI call (OpenAI, etc.)
    const commentedCode = simpleCommenter(code);

    return res.json({ commentedCode });
});

function simpleCommenter(code) {
    const lines = code.split("\n");
    let commented = "";

    for (let line of lines) {
        const trimmed = line.trim();

        if (trimmed && !trimmed.startsWith("//") && !trimmed.startsWith("#")) {
            if (trimmed.includes("function") || trimmed.startsWith("def ")) {
                commented += `// Function definition (server-side auto-comment)\n`;
            } else if (trimmed.startsWith("class ")) {
                commented += `// Class declaration (server-side auto-comment)\n`;
            } else if (trimmed.startsWith("for ") || trimmed.startsWith("while ")) {
                commented += `// Loop (server-side auto-comment)\n`;
            } else if (trimmed.startsWith("if ") || trimmed.startsWith("if(")) {
                commented += `// Conditional (server-side auto-comment)\n`;
            }
        }
        commented += line + "\n";
    }

    return commented;
}

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
