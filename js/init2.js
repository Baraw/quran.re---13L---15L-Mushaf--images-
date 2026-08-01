// Script d'initialisation pour le projet Quran
// Ceci est le fichier init.js 

// Charger la configuration JSON et initialiser l'application après le chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  // Définir le chemin du fichier de configuration de manière dynamique
  const scriptElement = document.querySelector('script[src*="js/init2.js"]');
  if (!scriptElement) {
    console.error('Impossible de localiser le script d\'initialisation.');
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

        // Injecter le contenu HTML
        renderHeader();
			const tabOrder = quranDisplay.tabOrder;  // Assurez-vous que tabOrder est défini
			renderDrawer(tabOrder);
        renderSelectSDQ();
        renderParameters();

        quranDisplay.addEventListeners();
        // Charger la page à partir de l'URL si elle est spécifiée
        quranDisplay.loadPageFromURL();
      } else {
        console.error('QuranDisplay n\'est pas défini. Assurez-vous que quranDisplay.js est chargé avant init.js.');
        return;
      }

      // Initialiser d'autres fonctionnalités si nécessaire
      // initializeAllMushaf();  // Peut ne plus être nécessaire
    })
    .catch(error => console.error('Erreur lors du chargement de la configuration:', error));
}

// Modifier renderDrawer pour accepter tabOrder
function renderDrawer(tabOrder) {
  const drawerElement = document.getElementById('drawer');
  if (drawerElement) {
    drawerElement.innerHTML = affichageHTML('drawer', '', '', tabOrder);
  }
}

function renderHeader(tabOrder) {
  const drawerElement = document.getElementById('header');
  if (drawerElement) {
    drawerElement.innerHTML = affichageHTML('header', '', '', tabOrder);
  }
}


function renderSelectSDQ() {
  const selectSDQElement = document.getElementById('selectSDQ');
  if (selectSDQElement) {
    selectSDQElement.innerHTML = affichageHTML('selectSDQ');
  }
}

function renderParameters() {
  const parametersElement = document.getElementById('parametres');
  if (parametersElement) {
    parametersElement.innerHTML = affichageHTML('parametres');
  }
}

