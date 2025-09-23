const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env['PORT'] || 4200;

// Servir archivos estáticos para cada idioma
app.use('/es', express.static(path.join(__dirname, 'dist/angular-sofkau/es')));
app.use('/en', express.static(path.join(__dirname, 'dist/angular-sofkau/en')));

// Middleware para detectar idioma del navegador
app.get('/', (req, res) => {
  // Obtener idioma preferido del navegador
  const acceptLanguage = req.headers['accept-language'] || 'en';
  const browserLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  
  // Idiomas soportados
  const supportedLanguages = ['es', 'en'];
  const selectedLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';
  
  // Redirigir al idioma detectado
  res.redirect(`/${selectedLang}/`);
});

// Manejar rutas para idioma español
app.get('/es/*', (req, res) => {
  const filePath = path.join(__dirname, 'dist/angular-sofkau/es/index.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Page not found');
  }
});

// Manejar rutas para idioma inglés
app.get('/en/*', (req, res) => {
  const filePath = path.join(__dirname, 'dist/angular-sofkau/en/index.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Page not found');
  }
});

// Catch-all handler: redirigir rutas no encontradas a detección de idioma
app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 Available languages:`);
  console.log(`   - English: http://localhost:${PORT}/en/`);
  console.log(`   - Español: http://localhost:${PORT}/es/`);
});