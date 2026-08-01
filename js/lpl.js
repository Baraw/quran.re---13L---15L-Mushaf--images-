
  var dossierSrc = "images/quran13lcolored/quran13lcolored ";
  // var langueUtilisee;
  let correctionP = -2;
  

/*
	function devoilerPage()
	{
		document.getElementById('pageAffichee').style = 'clip-path: none;transition:1s;';
		document.getElementById ('selectPAGE').value = document.getElementById ('selectPAGE').alt;
	}
	*/
	function PageSuiv_tipas(pageActuelle)
	{
		reinitialPage();
		
		<!-- var dossierSrc = "images/quran13lcolored/quran13lcolored "; -->
		pageActuelle = +pageActuelle+(correctionP)+1; //le + pour forcer a faire des maths et non du texte
		 document.getElementById ('pageAffichee').src = dossierSrc+'('+pageActuelle+').png'; 
		  document.getElementById ('selectPAGE').value = +pageActuelle+2;
		  
		  console.log('page '+pageActuelle);
	}

var currentHeight = 78.2;
var tipas_counter = 1;
var newClip ;

function reinitialPage()
{
	tipas_counter = 1;
	currentHeight = 78.2; 
	document.getElementById('pageAffichee').style = 'clip-path: `8.5% 10px 85.5% 10px`;  -webkit-clip-path:`8.5% 10px 85.5% 10px`;';
	
}

function tipas_tipas(newtipas_counter)
{
	/*var ligne = 1;
	let clipCSSOriginal = 'inset(8.5% 10px 85.5% 10px)' ;*/
		
	if(newtipas_counter !== undefined)
	{
		if(newtipas_counter === 'debut')
		{
			tipas_counter = 2;
			// currentHeight = 71.8;
		}
		else if ( newtipas_counter === 'petit_format' )
		{
		
				tipas_counter = 7;
				currentHeight = 53;
		}
		else
		{
			tipas_counter = newtipas_counter;
			currentHeight = 85.5-(newtipas_counter*6.35);
		}
		
	}
		// console.log(currentHeight);
	// alert(tipas_counter);	
		
	if (tipas_counter !== 13)
	{
		if (tipas_counter === 1)
				 newClip = `inset(0 10px  ${currentHeight}% 10px)`;
		else
		{
			if (tipas_counter < 12)
			{
				currentHeight -= 6.35;
			}
			else if ( tipas_counter === 12)
			{
				currentHeight = 0;
			}
			
				 newClip = `inset(0 10px  ${currentHeight}% 10px)`;
		}
		document.getElementById('pageAffichee').style = 'clip-path: '+newClip+';  -webkit-clip-path: '+newClip+';';
		tipas_counter++;
	}
	else if (tipas_counter === 13)
	{
		// PageSuiv_tipas(document.getElementById('selectPAGE').value); 
		ChangementPage('suiv','13lcolored');
		reinitialPage();
	}
	
	
	// console.log(tipas_counter+'  -  '+currentHeight);
	return true;
	// Initialisation du pourcentage de départ


}

function pageLoaded(numeroPageLoaded)
{
		numeroPageLoaded = Number(numeroPageLoaded)+2 ; // pour moushaf coloré tadjwid
		document.getElementById('selectPAGE').value = numeroPageLoaded ;
		
		if (  (numeroPageLoaded === 4) ||  (numeroPageLoaded === 5 ) )
		{
			tipas_tipas('petit_format');
			// alert("numero"+numeroPageLoaded+" counter ="+tipas_counter);
		}
		
		else if (numeroPageLoaded === 821)
			tipas_tipas('debut');
		
		else
			reinitialPage();
		
		// alert("numero "+numeroPageLoaded);
}

/*
		// Fonction pour mettre à jour le clip-path avec la nouvelle valeur
	function updateClipPath() 
	{
		clipElement.style.clipPath = `inset(8.5% 10px  ${currentHeight}% 10px)`; 85% 
	}

	// Écoute du clic sur le bouton
	incrementButton.addEventListener('click', () => {
		// Incrémentation de la hauteur
		currentHeight -= 7;
		// Mise à jour du clip-path
		updateClipPath();
	});

// Appliquer le clip-path initial
updateClipPath();
*/