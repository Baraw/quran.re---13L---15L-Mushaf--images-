// Objet de données associées à chaque onglet
            const tabData = {
                'tabRecap': {
                    metaVariable: 'tabRecap',
                    imageSource: '../images/cours/recap/',
                    pageMax: '25',
                    uiId: '#tabRecap'
                },
                'tabIntegral': {
                    metaVariable: 'tabIntegral',
                    imageSource: '../images/cours/integral/',
                    pageMax: '50',
                    uiId: '#tabIntegral'
                }
            };
            

            const tabs = document.querySelectorAll('.tabs#choixCours a');
            const metaTab = document.querySelector('meta[name="tab-active"]');
			const btn_sommaire = document.getElementById('boutonSommaire');
            const lesNumeros2Page =  document.querySelectorAll('#numeroDePage button');
            const fullscreenBtn =  document.getElementById('fullscreenbtn');
            const lightDarkBtn =  document.getElementById('lightDarkBtn');
            const lightDarkInput =  document.getElementById('lightDarkInput');
            const lesSommaires =  document.querySelectorAll('ul.sommaire li');
            const partagerBtn =  document.getElementById('partagerBtn');
            
            
       //------------------------------------- URL   
        
        // Fonction pour récupérer les paramètres de l'URL
        function getUrlParameter(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // Fonction qui modifie l'URL sans recharger la page
        function updateUrl(page, tab) {
             tab = (getTabActuel() === 'tabRecap') ? 'r' : 'i'; 
             page = getPageActive();
            
            const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?p=${page}&t=${tab}`;
            history.pushState(null, '', newUrl); // Met à jour l'URL sans recharger la page
        }
        
        function updateNumeroPage(newPage)
        {
            lesNumeros2Page[0].textContent = newPage-1;
            lesNumeros2Page[1].textContent = newPage;
            lesNumeros2Page[2].textContent = newPage+1;
        }
        
        
        // Fonction principale qui vérifie l'URL et met à jour la page
        function initPage() {
            const urlPage = getUrlParameter('p');  // Récupère le numéro de page de l'URL
            const urlTab = getUrlParameter('t');    // Récupère le type de livre (tab)

            // Si les paramètres existent, on les utilise pour mettre à jour la page
            if (urlPage && urlTab) {
            
                // Met à jour les éléments dans la page
               // setPageActive(urlPage);
               setTabActive(urlTab === 'r' ? 'tabRecap' : 'tabIntegral');  // 'r' -> Récap, 'i' -> Intégral
               // console.log('{initPage} tabMaj = ',getTabActuel());
               
               // Sélectionne le bon Tab
               majTabActive(urlTab === 'r' ? 0 : 1);
               miseAJourTabs(urlTab === 'r' ? 'tabRecap' : 'tabIntegral');

                // Appeler la fonction de chargement d'image avec la page active
                changeImage(urlPage);
            }
        }
        
          
       //------------------------------------- URL    
            
            
function changeImage(newPage) {
  const extension = `.png`;
  const imageSource = tabData[getTabActuel()].imageSource ;
  const imageAct = document.querySelector(`#image_${getTabActuel()}`);
  
 // console.log('imgSrc ',imageSource)
  
  // S'assurer que la page reste dans les limites
  newPage = verifPageMax(newPage);
  
  imageAct.src = imageSource+newPage+extension;
  setPageActive(newPage); //Changement du numéro de page active selon son bon tab
  
  // mise a jour de l'affichage des numeros de Page
    updateNumeroPage(newPage);
    
  // Met à jour l'URL avec les nouveaux paramètres
    updateUrl();
    
    // console.log('L image a été changée >> ', imageAct.src);
}

function changePage(direction) {
  
    const currentAlt = getPageActive();
    //console.log('ALT= ',currentAlt);
  
    // Calculer la nouvelle page en fonction de la direction
    let newPage = direction === 'precedent' ? currentAlt - 1 : currentAlt + 1;

	//console.log('\n Page après direction:', newPage);
	changeImage(newPage);
  
}

// Donne la page choisie ou la derniere page 
function verifPageMax(pageActuelle)
{

  const pageMax = parseInt(tabData[getTabActuel()].pageMax, 10);
  const lePlusPetitDesDeux = Math.max(1, Math.min(pageActuelle,pageMax));
  
  //console.log('\n pageActuellee =', pageActuelle);
  //console.log('\n max page =', pageMax);
  //console.log('\n page retenue', lePlusPetitDesDeux);
	
  return lePlusPetitDesDeux;
}



// Lors d'un clic sur un tab
   function miseAJourTabs(tabId) {
   
		// mise a jour de tab active
	  setTabActive(tabId.replace(/^#/, ''));  // .slice(1): Retire le premier caractère = #);
	  
		//mise a jour de la page (changementde variable) du bon tab
      setPageActive(getPageActive());
	  
	  //maj de la pagination affichée
	  updateNumeroPage(getPageActive());
      
      // Mise a jour SOMMAIRE
	  btn_sommaire.setAttribute('data-ui', `#dialog-sommaire-${getTabActuel()}`); 
      

      
	//  console.log(`#dialog-sommaire-${getTabActuel()}`);
   }
   

// Change le côté actif d'une tab
 function majTabActive(index) {
  tabs.forEach(t => t.classList.remove('active'));
  const tab = tabs[index];
  if (tab) tab.classList.add('active');

// console.log(index);
  //on desaffiche lancien contenu
(document.getElementById(index===0 ? 'tabIntegral' : 'tabRecap')?.classList.remove('active'),
 document.getElementById(index===0 ? 'tabRecap' : 'tabIntegral')?.classList.add('active'));


}

   
   function getTabActuel()
   {
	  
	  //console.log('  -  Le tab choisi est: ',metaTab.getAttribute('content'))
	  return metaTab.getAttribute('content');
   }
   
   function getPageActive()
   {
      /* toujours préciser la base pour parseInt : parseInt(..., 10).
        Gérer la chaîne vide et les valeurs non numériques */
        
      return  parseInt( (document.querySelector(`meta[name="pageActive_${getTabActuel()}"]`)?.getAttribute('content') || '3').trim(), 10);

   } 
   function setPageActive(lapagenouvelle)
   {

        const meta = document.querySelector(`meta[name="pageActive_${getTabActuel()}"]`);
  if (!meta) return false; // ou throw new Error('meta introuvable')
  meta.setAttribute('content', String(lapagenouvelle).trim());
    // console.log('setPageActive -',meta.getAttribute('content'));
  return true;
   }
   
   function setTabActive(lenouveautab)
   {
		metaTab.setAttribute('content',lenouveautab);
		//console.log(' Tab mise a jour dans la variable = ',lenouveautab);
   }


      // Fonction de bascule du mode
  function toggleMode() 
  {
    let mode = ui("mode");  // Récupérer la valeur du mode actuel
    mode = (mode === "dark") ? "light" : "dark";  // Inverser le mode
    ui("mode", mode);  // Mettre à jour la valeur du mode
}

  /*<!-- ECOUTE POUR LES BOUTONS ET LES MISES A JOUR            --> */
  document.addEventListener('DOMContentLoaded', () => {            
            let theme =  ui("theme", "#695f00");
          initPage();  
            
          // Si ui("mode") est "dark", on coche la case, sinon on la décoche  
          if (ui("mode") === "dark") 
          {
          lightDarkInput.checked = true;  // Coche la case si le mode est "dark"
          }  
            
            
            //lors d'un clic sur une tab
             tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const tabId = tab.getAttribute('data-ui');
					// console.log('tabiD  = ', tabId);
					miseAJourTabs(tabId);
                      // --- fin --Mise a jour de l'URL
                      updateUrl();
                });
            });
            
         
    // Ajouter l'événement click à chaque élément de la liste
    lesSommaires.forEach(item => {
        item.addEventListener('click', function() {
            
            //fermer le dialogue
            ui(`#dialog-sommaire-${getTabActuel()}`); // close
        
            // Récupérer la valeur du <b> dans l'élément cliqué
            const valeurPage = item.querySelector('b').textContent;
            // console.log('\n',valeurPage);
            // Appeler la fonction changeImage avec la valeur récupérée
            changeImage(valeurPage);
        });
    });         
            
            
            // Toggle Fullscreen
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (isFullscreen) {
                document.exitFullscreen?.() || document.mozCancelFullScreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.();
            } else {
                document.documentElement.requestFullscreen?.() || document.documentElement.mozRequestFullScreen?.() || document.documentElement.webkitRequestFullscreen?.() || document.documentElement.msRequestFullscreen?.();
            }
        });
    }
    
    
    // Partager la Page
    if (partagerBtn) {
      partagerBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({ 
                title: window.title,  
                text: 'Consulte le cours de Sab\'ah à la page '+getPageActive(),  
                url: window.location.href  
            });
        }
      });
    }

    
       // Inverse l'état du toggle
      lightDarkBtn.addEventListener('click', () => {        lightDarkInput.checked = !lightDarkInput.checked; toggleMode();    });
      lightDarkInput.addEventListener('change', toggleMode);
      

        
});
    