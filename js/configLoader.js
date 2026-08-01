// configLoader.js

export let config = {}; // Stocker la configuration globalement
export let langChoisie = 'en'; // Stocker la langue choisie

// Charger la configuration JSON et initialiser l'application après le chargement du DOM
export function loadConfig() {
  return fetch('../js/config.json')
    .then(response => response.json())
    .then(data => {
      config = data;
      setLanguage();
      return data;
    })
    .catch(error => console.error('Erreur lors du chargement de la configuration:', error));
}

// Détecter la langue de l'utilisateur
function setLanguage() {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('lang')) {
    langChoisie = sanitizeLanguage(searchParams.get('lang'));
  } else {
    const lang = (navigator.userLanguage || navigator.language).slice(0, 2);
    langChoisie = sanitizeLanguage(lang);
  }
}

// Valider la langue
function sanitizeLanguage(lang) {
  return ['fr', 'ar', 'en', 'ur'].includes(lang) ? lang : 'en';
}
