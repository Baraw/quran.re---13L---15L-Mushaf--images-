// Script d'initialisation pour le projet Quran
// Ceci est le fichier init.js 

// Charger la configuration JSON et initialiser l'application après le chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

  function renderSelectSDQ() {
      const selectSDQElement = document.getElementById('selectSDQ');
      const moushafType = getMetaContent('moushaf-type');
      const pageFormat = getMetaContent('page-format');
      selectSDQElement.innerHTML = affichageHTML('selectSDQ', moushafType, pageFormat, '');
  }



// Fonction pour charger la configuration et initialiser les composants
function initializeApp() {
  // Définir le chemin du fichier de configuration de manière dynamique
  const scriptElement = document.querySelector('script[src*="init.js"]');
  if (!scriptElement) {
    console.error('Impossible de localiser le script d'initialisation.');
    return;
  }
  const scriptPath = scriptElement.src;
  const scriptDirectory = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
  const configPath = `${scriptDirectory}/config.json`;

  // Charger la configuration
  fetch(configPath)
    .then(response => response.json())
    .then(config => {
      // Stocker la configuration dans un objet global
      window.quranConfig = config;

      // Stocker maxOnglet directement dans l'objet global
      window.maxOnglet = config.maxOnglet || 9;

      // Initialiser QuranDisplay avec la configuration globale
      if (typeof QuranDisplay !== 'undefined') {
        window.quranDisplay = new QuranDisplay(config);
        quranDisplay.addEventListeners();
        quranDisplay.loadPageFromURL();
      } else {
        console.error('QuranDisplay n\'est pas défini. Assurez-vous que quranDisplay.js est chargé avant init.js.');
        return;
      }


      // Initialiser d'autres fonctionnalités si nécessaire
      initializeAllMushaf();  // Utilise window.quranConfig
    })
    .catch(error => console.error('Erreur lors du chargement de la configuration:', error));
}

// Initialisation spécifique pour AllMushaf
function initializeAllMushaf() {
  const maxOnglet = window.quranConfig.maxOnglet || 9;

  // Récupérer l'ID du menu à partir de l'attribut data-menu de l'élément avec l'ID "navBar"
  const navBar = document.getElementById("navBar");
    if (!navBar) {
      console.error('Impossible de localiser l\'élément navBar.');
      return;
    }

  let idMenu = parseInt(navBar.getAttribute("data-menu"));

  // Récupérer tous les éléments avec la classe .mdl-navigation__link
  const navigationLinks = document.querySelectorAll('.mdl-navigation__link');

  // Ajouter la classe active uniquement à l'élément enfant spécifié
  if (idMenu !== null && idMenu < navigationLinks.length) {
    navigationLinks[idMenu].classList.add('active');
    navigationLinks[(idMenu + maxOnglet) % navigationLinks.length].classList.add('active');
    navigationLinks[idMenu].setAttribute('href', '#');
    navigationLinks[(idMenu + maxOnglet) % navigationLinks.length].setAttribute('href', '#');
  }
}