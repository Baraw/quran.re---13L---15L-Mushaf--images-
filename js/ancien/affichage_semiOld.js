import { config, langChoisie } from './configLoader.js'; // Import configuration and chosen language
import { debugLog } from './debug.js'; // Import configuration and chosen language

// Function to get translations from config.json based on the chosen language
function getTranslation(key) {
  const translations = config.languages[langChoisie];
  return translations && translations[key] ? translations[key] : key;
}

// Function to generate dynamic HTML content based on the selected language and page type
export function affichageHTML(id_div, type, aRemplacer) {
  let htmlAff = '';
  
  const tabs = config.tabs;
  const translations = config.languages[langChoisie]; // Get the translations for the current language
  // alert(config.sourates[0]);


	if (id_div === 'header' || id_div === 'drawer')
	{
				
				  // BARRE EN HAUT >> PC
				  if (id_div === 'header') {
					htmlAff = `
					  <div class="mdl-layout-icon"></div>
					  <div class="mdl-layout__header-row">
						<span class="mdl-layout__title">${translations.moushaf} - ${getTranslation('titre')} 📄</span>
						<div class="mdl-layout-spacer"></div>
						<!-- On referme le div bien plus tard -->
					`;
					
					debugLog(` Le Header a été chargé ! Le moushaf est est "${tabs.id}" `);
					
				  } 
				  
				  // MENU DE GAUCHE >> MOBILE
				  else if (id_div === 'drawer') {
					  
					  htmlAff =` <span class="mdl-layout__title" id="navBar" data-menu="${tabs.order}">${translations.moushaf} 13L</span> 		<span style="text-align:center;">			www.quran.re 	</span>	`;
					  
					  debugLog(` Le Drawer a été chargé ! La langue est "${langChoisie}" `);
				  }
			
				  
				  // TRONC COMMUN DES ONGLETS MOBILE ET PC
					htmlAff += `
					  <nav class="mdl-navigation"> `;
					  		// Générer les onglets dynamiquement
				  tabs.forEach((tab, index) => {
					const isActive = (typeof tabOrder !== 'undefined' && index === tabOrder) ? 'active' : '';

					const tabLabel = translations.onglets[tab.id] || tab.id;
					htmlAff += `<a class="mdl-navigation__link ${isActive}" href="${tab.id}.html?&lang=${langChoisie}">${tabLabel}</a>`;
				  });	
				  
						// <span id="navBar">${translations.moushaf}</span>
						// <ul>
						  // ${generateTabsHTML(translations)}
						// </ul>
					  // </nav>
					
					
				if (id_div === 'header')
					htmlAff += '</div>';
					
					debugLog(` Les différents onglets ont été rajoutées `);
				  
				  
				  
				  
	}

  // Handle the Sourah, Siparah, and Quart selections (dropdowns)
  if (id_div === 'selectSDQ') {
   
   // Mettre à jour les options des selects de Sourates, Siparas et Quarts
    generateSelectOptions('sourates', 'selectSOURATE');
    generateSelectOptions('siparas', 'selectSIPARAH');
    generateSelectOptions('quarts', 'selectQUART');
  
  }

  // Handle the audio section
  if (id_div === 'selectLecture') {
    htmlAff = generateAudioSelects(translations);
  }

  // Handle parameter settings
  if (id_div === 'parametres') {
    htmlAff = `
      <button onclick="toggleFullScreen()">${getTranslation('parametres')['pleinecran']}</button>
      <button id="modeNuit">${getTranslation('parametres')['nuit']}</button>
    `;
  }

  return htmlAff;
}

// Function to generate tabs in the drawer
function generateTabsHTML(translations) {
  let htmlTabs = '';
  const tabs = config.tabs; // Get tabs from config
  tabs.forEach(tab => {
    const tabLabel = translations.onglets[tab.id] || tab.id;
    htmlTabs += `<li><a href="${tab.id}.html?lang=${langChoisie}">${tabLabel}</a></li>`;
  });
  return htmlTabs;
}


// Fonction pour générer les options des sélecteurs
function generateSelectOptions(type, selectId) {
  let html = '';

  // Afficher dans la console les select PASSEES
  debugLog(`Select pris en compte ${selectId}: ${type}`);

  switch (type) {
    case 'sourates':
      html = generateOptions(config.sourates, 'value', 'text');
      break;
    case 'siparas':
      html = generateOptions(config.siparahs, 'value', 'text');
      break;
    case 'quarts':
      html = generateOptions(config.quarts, 'value', 'text');
      break;
    default:
      console.error('Type non supporté:', type);
  }

  // Insérer les options dans le sélecteur correspondant
  document.getElementById(selectId).innerHTML = html;

  // Si c'est le sélecteur QUART, le désactiver par défaut
  if (selectId === 'selectQUART') {
    document.getElementById(selectId).disabled = true;
  }
}

// Fonction pour générer les options en HTML à partir d'une liste donnée
function generateOptions(list, valueField, nameField) {
	const options = list.map(item => `<option value="${item[valueField]}">${item[nameField]}</option>`).join('');
  
  // Log des options ajoutées
  // debugLog(`Options générées pour le sélecteur: ${options}`);
  
  return options;
}

// window.affichageHTML = affichageHTML;


// Function to generate Quart options
// function generateQuartOptions(quart) {
  // return `
    // <option value="1">${quart['1']}</option>
    // <option value="2">${quart['2']}</option>
    // <option value="3">${quart['3']}</option>
    // <option value="4">${quart['4']}</option>
  // `;
// }

// Function to generate audio select options
// function generateAudioSelects(translations) {
  // return `
    // <select id="selectAUDIO" onchange="choixAUDIO(this.value)">
      // <option disabled selected>🎧 ${translations.typeAudio['ecouter']}</option>
      // <option value="Page">${translations.typeAudio['page']}</option>
    // </select>
    
    // <select id="selectQari" disabled>
      // <option disabled selected>🗣 ${translations.recitateur}</option>
      // ${generateOptions(translations.recitateur, 'value', 'name')}
    // </select>
  // `;
// }
