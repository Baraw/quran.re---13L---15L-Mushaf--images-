// loadElements.js

  import { QuranDisplay } from './loadQuran.js'; // Assurez-vous que le fichier quranDisplay est bien importé
  import { affichageHTML } from './type="module"  src="../js/affichage.js" '; // Importez affichageHTML si elle est définie dans type="module"  src="../js/affichage.js" 


export function renderStaticElements() {
  renderHeader(document.getElementById('header'));
  renderDrawer(document.getElementById('drawer'));
  renderSelectSDQ(document.getElementById('selectSDQ'));
  renderParameters(document.getElementById('parametres'));
}

function renderHeader(idElement) {
  if (idElement) {
    idElement.innerHTML = affichageHTML('header');
  }
}

function renderDrawer(idElement) {
  const drawerElement = document.getElementById('drawer');
  if (drawerElement) {
    drawerElement.innerHTML = affichageHTML('drawer');
  }
}

function renderSelectSDQ(idElement) {
  const selectSDQElement = document.getElementById('selectSDQ');
  if (selectSDQElement) {
  affichageHTML('selectSDQ');
  }
}

function renderParameters(idElement) {
  const parametersElement = document.getElementById('parametres');
  if (parametersElement) {
    parametersElement.innerHTML = affichageHTML('parametres');
  }
}
