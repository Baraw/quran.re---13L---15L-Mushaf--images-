
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CLASS 
class QuranDisplay {
  constructor(config) {
    this.config = config;
    this.currentPage = Number(document.getElementById("pageAffichee").alt);
    this.lang = this.getLanguage();
    this.typeMoushaf = this.getMetaContent('moushaf-type');
         // if (!this.typeMoushaf || !this.config.mushafTypes[this.typeMoushaf]) {      console.error(`Type de mushaf "${this.typeMoushaf}" non supporté ou non trouvé. Veuillez vérifier config.json.`);    }
    this.pageFormat = this.getMetaContent('page-format');
         // if (!this.pageFormat) {      console.error('Format de page non trouvé. Veuillez vérifier la balise <meta name="page-format">.');    }
   
    this.tabOrder = this.getTabOrder() || 0;  // Assurez-vous que tabOrder est bien récupéré
    this.maxOnglet = config.maxOnglet || 9; // Définir maxOnglet à partir de la configuration
  }
  

  // Récupère la langue de l'utilisateur
  getLanguage() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('lang')) {
      return this.sanitizeLanguage(searchParams.get('lang'));
    } else {
      const lang = (navigator.userLanguage || navigator.language).slice(0, 2);
      return this.sanitizeLanguage(lang);
    }
  }
   // Vérifie si la langue est supportée
  sanitizeLanguage(lang) {
    return ['fr', 'ar', 'en', 'ur'].includes(lang) ? lang : 'en';
  }
  
  
 // Fonction générique pour récupérer le contenu des balises meta
getMetaContent(name) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) {
    debugLog(`Balise meta trouvée : ${name}, valeur : ${meta.content}`);
    return meta.content;
  } else {
    console.error(`Balise meta "${name}" non trouvée.`);
    return null;
  }
}
  
   // Obtenir l'ordre du tab pour le type de moushaf actuel
  getTabOrder() {
    const tab = this.config.tabs.find(tab => tab.id === this.typeMoushaf);
    return tab ? tab.order : null;
  }
  
  


  // Affiche la page en fonction du type de mushaf et du numéro de page
  displayPage(pageNum) {
    if (!this.typeMoushaf) {
      console.error('Type de mushaf non défini');
      return;
    }

    const mushafConfig = this.config.mushafTypes[this.typeMoushaf];
    if (!mushafConfig) {
      console.error('Type de mushaf non supporté');
      return;
    }

    const pageMax = mushafConfig.pageMax;
    const pageMin = mushafConfig.pageMin;
    const extension = mushafConfig.extension;

    if (pageNum >= pageMin && pageNum <= pageMax) {
      let pagePath = `images/quran${this.typeMoushaf}/quran${this.typeMoushaf} (${pageNum}).${extension}`;
      // Mettre à jour l'image affichée
      const pageAffichee = document.getElementById('pageAffichee');
      if (pageAffichee) {
        pageAffichee.src = pagePath;
        pageAffichee.alt = pageNum;
      } else {
        console.error("Impossible de trouver l'élément #pageAffichee pour l'affichage de la page.");
      }
      this.updatePageURL(pageNum);
    } else {
      console.error('Numéro de page invalide');
    }
  }


  // Change le mode d'affichage (ex: nuit/jour)
  toggleNightMode() {
    document.body.classList.toggle('modeNuitJour');
    document.querySelectorAll('select').forEach(select => select.classList.toggle('modeNuitJour'));
  }

  // Changer la page avec les boutons <-- et -->
  changePage(direction, formatPage) {
    let currentPage = Number(document.getElementById("pageAffichee").alt);
    let newPage = currentPage;
    
    debugLog(`La nouvelle page sélectionnée est : ${newPage}`);

    if (direction === 'next') {
      if (formatPage === '2pages') {
        newPage += 2;
      } else {
        newPage += 1;
      }
    } else if (direction === 'prev') {
      if (formatPage === '2pages') {
        newPage -= 2;
      } else {
        newPage -= 1;
      }
    }

    // Vérifier les limites de la page
    const mushafConfig = this.config.mushafTypes[this.typeMoushaf];
    if (newPage >= mushafConfig.pageMin && newPage <= mushafConfig.pageMax) {
      this.displayPage(newPage, formatPage);
    } else {
      console.error('Numéro de page invalide');
    }
  }

  // Charger la page depuis l'URL
  loadPageFromURL(formatPage) {
      
      const pageAffichee = document.getElementById('pageAffichee');
      if (pageAffichee) {
        pageAffichee.src = `images/quran${this.typeMoushaf}/quran${this.typeMoushaf} (${this.currentPage}).png`;
        console.log(`Image affichée : ${pageAffichee.src}`);
      } else {
        console.error("Impossible de trouver l'élément #pageAffichee pour l'affichage de la page.");
      }
      
    const searchParams = new URLSearchParams(window.location.search);
    const page = searchParams.get('page');
    if (page) {
      const pageNum = Number(page);
      this.displayPage(pageNum, formatPage);
    }
  }

  // Mettre à jour l'URL pour partager la page actuelle
  updatePageURL(pageNum) {
    const newURL = `?page=${pageNum}`;
    window.history.replaceState(null, null, newURL);
  }

    addEventListeners() {
          const modeNuitButton = document.getElementById('modeNuit');
          if (modeNuitButton) {
            modeNuitButton.addEventListener('click', () => this.toggleNightMode());
          }else {
            console.warn("Bouton 'mode nuit' non trouvé dans le DOM.");
          }

          const nextPageButton = document.getElementById('pagSuiv');
          if (nextPageButton) {
            nextPageButton.addEventListener('click', () => this.changePage('next', 'simple'));
          }else {
            console.warn("Bouton 'page suivante' non trouvé dans le DOM.");
          }

          const prevPageButton = document.getElementById('pagPrec');
          if (prevPageButton) {
            prevPageButton.addEventListener('click', () => this.changePage('prev', 'simple'));
          }else {
            console.warn("Bouton 'page précédente' non trouvé dans le DOM.");
          }

          // Ajouter d'autres écouteurs d'événements ici avec vérification
      
      
    }

}


// Récupérer le chemin du script en cours
// const scriptPath = document.currentScript.src;
// const scriptDirectory = scriptPath.substring(0, scriptPath.lastIndexOf('/'));

// Construire le chemin relatif pour le fichier config.json
// const configPath = `${scriptDirectory}/config.json`;

// Chargement de la configuration et initialisation
// fetch(configPath)
  // .then(response => response.json())
  // .then(config => {
    // const quranDisplay = new QuranDisplay(config);
    // quranDisplay.addEventListeners();
    // Charger la page à partir de l'URL si elle est spécifiée
    // quranDisplay.loadPageFromURL();
  // })
  // .catch(error => console.error('Erreur lors du chargement de la configuration:', error));