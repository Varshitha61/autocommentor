# AI Code Auto-Commenter 🚀

> A lightweight web app that analyzes uploaded or pasted source code and automatically generates line-level comments.  
> Responsive, accessible frontend (HTML/CSS/JS) + optional backend API for AI-powered annotation.

---

<!-- Animated header: simple spinning logo using inline SVG + CSS -->
<div align="center">
  <!-- If GitHub strips style tags, you can replace this with an animated GIF -->
  <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stop-color="#6b5ce7"/>
        <stop offset="1" stop-color="#5c4cdb"/>
      </linearGradient>
    </defs>
    <g transform="translate(50,50)">
      <circle r="28" fill="none" stroke="url(#g)" stroke-width="10" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <text x="0" y="6" font-size="18" text-anchor="middle" fill="#fff" font-family="Arial">AI</text>
    </g>
  </svg>
</div>

---

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE) 
[![Frontend](https://img.shields.io/badge/frontend-HTML%2FCSS%2FJS-blue)](#tech-stack) 
[![Backend](https://img.shields.io/badge/backend-Express-orange)](#backend-example)

---

## Live demo / Screenshots

> Replace these placeholder GIFs with actual recordings from your app (e.g. `./images/demo.gif`).

![Demo GIF placeholder](./images/demo.gif)
<!-- Optionally use an animated SVG or Lottie embed if you host it. -->

---

## Features

- Upload or paste source code (`.js`, `.py`, `.ts`, `.html`, `.css`, etc.)
- Generates line-level comments (server-side AI or local fallback)
- Responsive, accessible UI with keyboard support
- Fallback comment generator when the API is unavailable
- Modular code (separate `index.html`, `style.css`, `script.js`)
- Ready to deploy to GitHub Pages (frontend) with any cloud backend for the API

---

## Tech Stack

- Frontend: Plain **HTML**, **CSS**, **JavaScript**
- Backend (optional): **Node.js**, **Express**
- (Optional AI integration): OpenAI / Claude / other LLM via API

---

## Installation (Frontend only)

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-user>/<your-repo>.git
   cd <your-repo>
