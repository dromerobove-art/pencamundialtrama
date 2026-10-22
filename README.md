# Erne's English Quest ⭐

App para practicar inglés Pre-A1 Starters (Brighter Ideas 1). 100% en el navegador: React + Vite + Tailwind, progreso en `localStorage`.

    npm install
    npm run dev       # desarrollo
    npm run build     # genera dist/ (estático, listo para Vercel/Netlify/GitHub Pages)

- Preguntas: `src/data/questions.js` (64 preguntas, 9 temas). Para agregar una, sumá una línea con `mc`, `fill`, `tf` o `listen`.
- Medallas y racha diaria: `src/lib/storage.js`.
- Audio: `speechSynthesis` del navegador (en-GB) + Web Audio para efectos. Funciona mejor en Chrome/Edge/Safari.
