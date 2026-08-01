// domLoader.js
import { loadConfig } from './configLoader.js'; // Fonction de chargement de config
import { renderStaticElements } from './loadElements.js'; // Fonction pour charger les éléments statiques
import { QuranDisplay } from './loadQuran.js'; // Assurez-vous que le fichier quranDisplay est bien importé



// Gérer le chargement DOM
document.addEventListener('DOMContentLoaded', () => {
	
	// Initialiser l'application (configuration globale: menu, onglets, etc)
	loadConfig().then((config) => {
	
	console.log('Configuration chargée, plage au Moushaf');
		// Charger les éléments statiques (onglets, menu, etc.)
	renderStaticElements();
	
    // Initialiser QuranDisplay et charger la première page selon le moushaf et le format prédéfinis
		window.quranDisplay = new QuranDisplay(config);
			// Charger la première page (soit à partir de l'URL, soit à partir de pageMin)
				quranDisplay.loadPageFromURL();
	});
	
	
});
