// quranDisplay.js
export class QuranDisplay {
  constructor(config) {
    this.config = config;
    this.currentPage = this.getPageFromURL() || this.config.mushafTypes[this.getMetaContent('moushaf-type')].pageMin;
    this.typeMoushaf = this.getMetaContent('moushaf-type');
    this.pageFormat = this.getMetaContent('page-format');
  }

  // Fonction pour charger la page à partir de l'URL
  getPageFromURL() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.has('page') ? Number(searchParams.get('page')) : null;
  }

  // Afficher la page actuelle
  loadPageFromURL() {
    this.displayPage(this.currentPage);
  }

  // Charger et afficher une nouvelle page
  displayPage(pageNum) {
    const mushafConfig = this.config.mushafTypes[this.typeMoushaf];
    if (pageNum >= mushafConfig.pageMin && pageNum <= mushafConfig.pageMax) {
      const pagePath = `images/quran${this.typeMoushaf}/quran${this.typeMoushaf} (${pageNum}).${mushafConfig.extension}`;
      const pageAffichee = document.getElementById('pageAffichee');
      if (pageAffichee) {
        pageAffichee.src = pagePath;
        pageAffichee.alt = pageNum;
      }
      this.updatePageURL(pageNum);
    }
  }

  // Mettre à jour l'URL avec le numéro de page actuel
  updatePageURL(pageNum) {
    const newURL = `?page=${pageNum}`;
    window.history.replaceState(null, null, newURL);
  }

  // Changer de page (suivante ou précédente)
  changePage(direction) {
    const mushafConfig = this.config.mushafTypes[this.typeMoushaf];
    let newPage = direction === 'next' ? this.currentPage + 1 : this.currentPage - 1;

    if (newPage >= mushafConfig.pageMin && newPage <= mushafConfig.pageMax) {
      this.displayPage(newPage);
      this.currentPage = newPage; // Mettre à jour la page actuelle sans recharger
    } else {
      console.warn('Page en dehors des limites.');
    }
  }

  // Récupérer les méta-données
  getMetaContent(name) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    return meta ? meta.content : null;
  }
}
