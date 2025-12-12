let conversationHistory = [];

// === CONFIG: set your backend URL here ===
const API_URL = "https://your-backend.com/api/analyze"; 
// Example expected payload:
// POST API_URL
// { code: "...", filename: "optional.py" }
// Response: { commentedCode: "..." }

function handleKeyPress(event) {
    // Allow Enter to submit, but ignore if IME is composing
    if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        analyzeCode();
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const code = e.target.result;
            document.getElementById("codeInput").value = `Uploaded: ${file.name}`;
            analyzeCodeContent(code, file.name);
        };
        reader.readAsText(file);
    }
}

function analyzeCode() {
    const input = document.getElementById("codeInput");
    const code = input.value.trim();

    if (!code) return;

    analyzeCodeContent(code);
    input.value = "";
}

async function analyzeCodeContent(code, filename = "") {
    const chatArea = document.getElementById("chatArea");
    chatArea.innerHTML = "";

    // User message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerHTML = `
        <div class="avatar" aria-hidden="true">U</div>
        <div class="message-content">
            ${filename ? `<strong>File: ${escapeHtml(filename)}</strong><br>` : ""}
            Analyze this code and add comments
            <div class="code-block"><pre>${escapeHtml(code)}</pre></div>
        </div>
    `;
    chatArea.appendChild(userMsg);

    // Loading / thinking message
    const assistantMsg = document.createElement("div");
    assistantMsg.className = "message assistant";
    assistantMsg.innerHTML = `
        <div class="avatar" aria-hidden="true">AI</div>
        <div class="message-content">
            <p>Analyzing your code and generating comments...</p>
        </div>
    `;
    chatArea.appendChild(assistantMsg);
    chatArea.scrollTop = chatArea.scrollHeight;

    let commented;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, filename })
        });

        if (!response.ok) {
            throw new Error("API error: " + response.status);
        }

        const data = await response.json();
        // Expecting: { commentedCode: "..." }
        commented = data.commentedCode || "";
        if (!commented.trim()) {
            // Fallback if backend returns empty
            commented = generateComments(code);
        }
    } catch (error) {
        console.error("Error calling backend:", error);
        commented = generateComments(code); // Local fallback
    }

    // Replace loading content with final result
    assistantMsg.innerHTML = `
        <div class="avatar" aria-hidden="true">AI</div>
        <div class="message-content">
            <p>Here's your code with added comments:</p>
            <div class="code-block"><pre>${escapeHtml(commented)}</pre></div>
            <p>The comments explain the purpose, logic, and key operations in your code.</p>
        </div>
    `;
    chatArea.scrollTop = chatArea.scrollHeight;
}

function generateComments(code) {
    // Simple comment generation (placeholder logic)
    const lines = code.split("\n");
    let commented = "";

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed && !trimmed.startsWith("//") && !trimmed.startsWith("#")) {
            if (trimmed.includes("function") || trimmed.startsWith("def ")) {
                commented += `// Function definition: Implements core logic\n`;
            } else if (trimmed.startsWith("class ")) {
                commented += `// Class declaration: Defines data structure and behavior\n`;
            } else if (trimmed.startsWith("for ") || trimmed.startsWith("while ")) {
                commented += `// Loop: Iterates over a sequence or condition\n`;
            } else if (trimmed.startsWith("if ") || trimmed.startsWith("if(")) {
                commented += `// Conditional: Branches logic based on this condition\n`;
            }
        }
        commented += line + "\n";
    }

    return commented;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function newAnalysis() {
    const chatArea = document.getElementById("chatArea");
    chatArea.innerHTML = `
        <div class="welcome-message">
            <h1>What code can I help analyze?</h1>
        </div>
    `;
    conversationHistory = [];
}
