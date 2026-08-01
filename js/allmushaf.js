/*
	
	Fichier commun aux 13 et 15 lignes
	Propriété de barawGroup
	Mise à jour Avril 2024
	
	Changement de langues https://stackoverflow.com/questions/32008125/using-javascript-to-change-website-language
*/

// MODE NUIT
	// const modeNuitButton = document.getElementById('modeNuit');
    // const pageAffichee = document.getElementById('pageAffichee');

    // modeNuitButton.addEventListener('click', () => {
     /*   Toggle la classe 'modeNuit' sur l'élément #pageAffichee*/
        // pageAffichee.classList.toggle('modeNuitPageCouleur');

		// document.querySelector('footer').classList.toggle('blanc');
     /*  Toggle la classe 'modeNuit' sur le body*/
        // document.body.classList.toggle('modeNuitJour');
        // document.body.classList.toggle('black');
		
        // document.getElementById('selectAUDIO').classList.toggle('texteblanc');
        // document.getElementById('selectQari').classList.toggle('texteblanc');

    /*    Récupère tous les éléments <select>*/
        // const selects = document.querySelectorAll('select');

     /*  Ajoute ou supprime la classe 'modeNuit' à chaque select*/
			// selects.forEach(select => {
				// select.classList.toggle('modeNuitJour');
			// });
  
    // });

// Partage le numéro de page exact
function boutonPartager() {
	if (navigator.share) {
		navigator.share({ 
			title: window.title,  
			text: ' Moushaf 13 lignes: Page n° '+document.getElementById('pageAffichee').alt,  
			url: window.location.href  
		});
	}
}

function estPair(nombre) {
    return nombre % 2 === 0;
}

// PLEIN ECRAN 
  function toggleFullScreen()
  {
      if (!document.fullscreenElement) 
      {
          document.documentElement.requestFullscreen();
      } 
      else 
      {
          if (document.exitFullscreen) 
          {
              document.exitFullscreen();
          }
        }
  } 


// ZOOM en mode 2 pages
function changeZOOM(choixZoom)
{
		// var zoom = $("#moushafdouble").css("width");
		var zoom = getComputedStyle(document.querySelector('#moushafdouble')).getPropertyValue('width') ; // ou .width ;
		var valZoom = zoom.split('px');
		// var zoom = document.getElementById("moushafdouble").style.width;
		// alert(valZoom[0]);
		
		var zoom1 = getComputedStyle(document.querySelector('#moushafdouble')).getPropertyValue('width') ; // ou .width ;
		
		if (choixZoom == 'plus')
		{
			var nouvZoom = Number(valZoom[0])+50 ;
		}
		
		if (choixZoom == 'moins')
		{
			var nouvZoom = Number(valZoom[0])-50 ;
		}
			
		document.getElementById("moushafdouble").style.width = nouvZoom+'px';
		
}

// Active auto le select de quart
function autoSelectAudio(type)
{
	if (type === 'quart')
	{
		const selTypeAudio = document.getElementById('selectAUDIO') ;
		selTypeAudio.selectedIndex = 2 ;
		// Envoyer l'événement "change" à l'élément select
		selTypeAudio.dispatchEvent(new Event('change'));
	}
}

// ----------------- AUDIO -------------------------

    const nbVitesseLecture = document.getElementById('nbVitesseLecture');
    const audioQari = document.getElementById('audioQari');
	const selQari = document.getElementById('selectQari');
	const levelVitesse = document.getElementById('vitesseAudio');
	const paramAudio = document.getElementById('paramAudio');
	
if (document.getElementById('vitesseLecture')) {
	const vitesseInput = document.getElementById('vitesseLecture');
	
	vitesseInput.addEventListener('input', function() {
        const vitesse = parseFloat(this.value).toFixed(2); // Valeur de la vitesse de lecture
		/*  La méthode toFixed() est utilisée pour formater un nombre en une chaîne de caractères, en spécifiant le nombre de chiffres après la virgule décimale. Elle arrondit le nombre à un nombre spécifié de décimales et renvoie la représentation sous forme de chaîne de caractères de ce nombre. */
        nbVitesseLecture.textContent = vitesse; // Met à jour le texte de la vitesse affichée
        audioQari.playbackRate = vitesse; // Met à jour la vitesse de lecture de l'audio
    });
}

function playPause (audio) 
{
	
if(document.getElementById('selectAUDIO').value !== '' )
{

	if (audio.paused) 
	{
	  if ( document.getElementById('audioQari').src == '' )
			choixQari(document.getElementById('selectQari').value,document.getElementById('selectAUDIO').value,'13lcolored');
		
		audio.play(); 
		document.querySelector('.mdl-js-snackbar').MaterialSnackbar.showSnackbar(
		{
			message: languesStock[langChoisie].toast['play'],
		});
		document.getElementsByClassName('mdl-chip__text')[0].innerHTML = ' Pause  &nbsp;	&nbsp;';
		document.getElementsByClassName('mdl-chip__contact')[0].innerHTML = 'pause';
	}
	else 
	{
	  audio.pause();
	 document.querySelector('.mdl-js-snackbar').MaterialSnackbar.showSnackbar(
		{
			message: languesStock[langChoisie].toast['pause'],
		}); 
		document.getElementsByClassName('mdl-chip__text')[0].innerHTML = ' Play &nbsp;	&nbsp;';
		document.getElementsByClassName('mdl-chip__contact')[0].innerHTML = 'play_arrow';
	}
}
else
	alert("Veuillez choisir le type d'audio (page/quart) et le récitateur.");
}


	//ECOUTER LE QUART (OU LA PAGE) selon le QARI
function choixQari(nomQari,typePortion,typeMoushaf,addInfo)
{
		if ( addInfo === 'reset')
		{
			document.querySelector('.mdl-js-snackbar').MaterialSnackbar.showSnackbar(
			{
			message: languesStock[langChoisie].toast['reset'],
			});
			
			document.getElementsByClassName('mdl-chip__text')[0].innerHTML = ' Play &nbsp; &nbsp; ';
			document.getElementsByClassName('mdl-chip__contact')[0].innerHTML = 'play_arrow';
			
		}
		// let sourceAudio;
		let sourceAudio_aw = 'https://aswaatulqurraa.com/files/'; // exemple global: https://aswaatulqurraa.com/files/Quarters/Abu%20Bakr%20al%20Shatri/01%202nd%20Quarter.mp3
	
		if (typePortion === 'Quart')
		{
			let numQuart = document.getElementById('selectQUART').value;
			let djouz = document.getElementById('selectSIPARAH').selectedIndex ;
			let finSourceAudioQuart_aw = '%20Quarter.mp3';
				
			if (numQuart == 1)
			numQuart += 'st';
			if (numQuart == 2)
				numQuart += 'nd';
			if (numQuart == 3)
				numQuart += 'rd';
			if (numQuart == 4)
				numQuart += 'th';
		
			if (djouz < 9)
				djouz = '0'+djouz;
			
			switch (nomQari) {
				case 'Chatri':
					sourceAudio_aw += 'Quarters/Abu%20Bakr%20al%20Shatri/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Essack':
					// numQuart = numQuart.slice(0, -2);
					// let indexDjouz = findIndexDjouzQuart(djouz,numQuart);
					sourceAudio_aw = `https://mufradat.fr/audios/quran/Ayoob_Essack/idQuart%20(${idQuart}).mp3`; 
					// sourceAudio_aw = `https://podcasts.qurancentral.com/ayoob-essack/ayoob-essack-00${indexDjouz}-j0${djouz}q${numQuart}-qurancentral.com.mp3`; 
					// https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/ayoob-essack/ayoob-essack-0084-j021q4-qurancentral.com.mp3
					break;
				case 'Balilah': 
					sourceAudio_aw += 'Quarters/Bandar%20Baleelah/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Hindawi': 
					sourceAudio_aw += 'Quarters/Hajjaj%20Ramadan%20al%20Hindawi/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;	
				case 'Houssary': 
					sourceAudio_aw += 'Quarters/Mahmoud%20Khalil%20al%20Hussary/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Mahir': 
					sourceAudio_aw += 'Quarters/Maher%20al%20Muaiqly/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Mouhaysni': 
					sourceAudio_aw += 'Quarters/Mohammed%20al%20Muhaisny/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Qatami': 
					sourceAudio_aw += 'Quarters/Nasser%20al%20Qatami/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Ghamdi': 
					sourceAudio_aw += 'Quarters/Saad%20al%20Ghamdi/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Chouraym': 
					sourceAudio_aw += 'Quarters/Saud%20al%20Shuraim/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
				case 'Dossari': 
					sourceAudio_aw += 'Quarters/Yasser%20al%20Dossary/' + djouz + '%20'+ numQuart + finSourceAudioQuart_aw;
					break;
					
			  default:
					// numQuart = numQuart.slice(0, -2);
					sourceAudio_aw = `https://mufradat.fr/audios/quran/Ayoob_Essack/idQuart%20(${idQuart}).mp3`; 
					break;
			}
		}
		
		
		if (typePortion === 'Page')
		{
			let numPage = Number(document.getElementById("pageAffichee").alt);
			numPage = numPage+recupNumPage(typeMoushaf) ; // si décalage de 1 selon moushaf
				// alert( numPage );
				
			if ( (numPage < 10) && (nomQari != 'Ghamdi') ) // Source Ghamdi n'a pas de 0 comparé aux autres
				numPage = '00'+numPage;
			else if ( (numPage > 10) && (numPage < 100) && (nomQari != 'Ghamdi'))
				numPage = '0'+numPage;
	
			let djouz = searchPageDjouz(  Number(numPage) ); // ici, moushafType = le numero de surate;
			// alert( djouz +' - '+numPage );
			
			// Mise à jour du Qari dans la source 
			sourceAudio_aw += 'Pages/'+nomQari+'(13%20Liner)/' + djouz + '/'+ numPage + '.mp3';
			
			// switch (nomQari) {
				// case 'Abu%20Bakr%20al%20Shatri%20': //CHATRI
					// sourceAudio_aw += 'Pages/'+nomQari+'(13%20Liner)/' + djouz + '/'+ numPage + '.mp3';
					// break;
				// case 'Mahmoud%20Khalil%20al%20Hussary%20': //Houssary
					// sourceAudio_aw += 'Pages/(13%20Liner)/' + djouz + '/'+ numPage + '.mp3';
					// break;
				// case 'Maher%20al%20Muaiqly%20' : //Mahir 
					// sourceAudio_aw += 'Pages/(13%20Liner)/' + djouz + '/'+ numPage + '.mp3' ;
					// break;
				// case 'Saad%20al%20Ghamdi%20': //Ghamdi
					// sourceAudio_aw += 'Pages/(13%20Liner)/' + djouz + '/'+ numPage + '.mp3'; 	/*  Ex: Saad%20al%20Ghamdi%20(13%20Liner)/7/171.mp3 */
					// break;

			  // default:
				// sourceAudio_aw += 'Pages/Abu%20Bakr%20al%20Shatri%20(13%20Liner)/' + djouz + '/'+ numPage + '.mp3'; // Chatri par defaut
				// break;
			// }
		}
		
		// Changement de la source audio
		document.getElementById('audioQari').src =  sourceAudio_aw; 
		
}

// LORSQUE selectAUDIO est modifié/selectionné
function choixAUDIO(typeAudio)
{
	// Activation du select des récitateurs 
	selQari.removeAttribute('disabled'); // Supprimer l'attribut disabled
	// & Affichage de volume & play
	paramAudio.classList.remove('nonvisiblemaispresent'); 
	
	// alert(selQari.options.length);
	if ( (typeAudio === 'Page') && (selQari.options.length != 5) )
	{
			if ( selQari.options.length == 12 ) //cad le choix était sur "quart"
			{
					selQari.remove(10); // on sélectionne de manière décroissante car l'index se réduit à chaque suppression
					selQari.remove(9);
					selQari.remove(7);
					selQari.remove(6);
					selQari.remove(3);
					selQari.remove(2);
					selQari.remove(1);
			}
	}	
		
	else if (( typeAudio === 'Quart') && (selQari.options.length != 12) )
		{
			// if ( selQari.options.length == 5 )
			// {
				let nouvQariQuart1 = new Option('Ayoub Essack (Tarawîh)','Essack');
				let nouvQariQuart2 = new Option('Bandar Balîlah','Balilah');
				let nouvQariQuart3 = new Option('H. R. Al Hindawi','Hindawi');
				let nouvQariQuart4 = new Option('M. Al Mouhaysni (rapide)','Mouhaysni');
				let nouvQariQuart5 = new Option('Nassîr Al Qatami (lent)','Qatami');
				let nouvQariQuart6 = new Option('Saoud Al Chouraym (rapide)','Chouraym');
				let nouvQariQuart7 = new Option('Yassir Al Dossari (lent)','Dossari');
				
				selQari.add(nouvQariQuart1, selQari.options[1]);
				selQari.add(nouvQariQuart2, selQari.options[2]);
				selQari.add(nouvQariQuart3, selQari.options[3]);
				selQari.add(nouvQariQuart4, selQari.options[6]);
				selQari.add(nouvQariQuart5, selQari.options[7]);
				selQari.add(nouvQariQuart6, selQari.options[9]);
				selQari.add(nouvQariQuart7, selQari.options[10]);
			// }
		}
		
	else if (typeAudio === 'Sourah')
		{
			
		}
		
	else if (typeAudio === 'Sipara')
		{
			
		}
		
		document.getElementById('selectQari').options[1].setAttribute('selected', true);
}

const dataAyoubEssack = [
  { juz: 1, quart: 1 },
  { juz: 1, quart: 2 },
  { juz: 1, quart: 3 },
  { juz: 1, quart: 4 },
  { juz: 2, quart: 1 },
  { juz: 2, quart: 2 },
  { juz: 2, quart: 3 },
  { juz: 2, quart: 4 },
  { juz: 3, quart: 1 },
  { juz: 3, quart: 2 },
  { juz: 3, quart: 3 },
  { juz: 3, quart: 4 },
  { juz: 4, quart: 1 },
  { juz: 4, quart: 2 },
  { juz: 4, quart: 3 },
  { juz: 4, quart: 4 },
  { juz: 5, quart: 1 },
  { juz: 5, quart: 2 },
  { juz: 5, quart: 3 },
  { juz: 5, quart: 4 },
  { juz: 6, quart: 1 },
  { juz: 6, quart: 2 },
  { juz: 6, quart: 3 },
  { juz: 6, quart: 4 },
  { juz: 7, quart: 1 },
  { juz: 7, quart: 2 },
  { juz: 7, quart: 3 },
  { juz: 7, quart: 4 },
  { juz: 8, quart: 1 },
  { juz: 8, quart: 2 },
  { juz: 8, quart: 3 },
  { juz: 8, quart: 4 },
  { juz: 9, quart: 1 },
  { juz: 9, quart: 2 },
  { juz: 9, quart: 3 },
  { juz: 9, quart: 4 },
  { juz: 10, quart: 1 },
  { juz: 10, quart: 2 },
  { juz: 10, quart: 3 },
  { juz: 10, quart: 4 },
  { juz: 11, quart: 1 },
  { juz: 11, quart: 2 },
  { juz: 11, quart: 3 },
  { juz: 11, quart: 4 },
  { juz: 12, quart: 1 },
  { juz: 12, quart: 2 },
  { juz: 12, quart: 3 },
  { juz: 12, quart: 4 },
  { juz: 13, quart: 1 },
  { juz: 13, quart: 2 },
  { juz: 13, quart: 3 },
  { juz: 13, quart: 4 },
  { juz: 14, quart: 1 },
  { juz: 14, quart: 2 },
  { juz: 14, quart: 3 },
  { juz: 14, quart: 4 },
  { juz: 15, quart: 1 },
  { juz: 15, quart: 2 },
  { juz: 15, quart: 3 },
  { juz: 15, quart: 4 },
  { juz: 16, quart: 1 },
  { juz: 16, quart: 2 },
  { juz: 16, quart: 3 },
  { juz: 16, quart: 4 },
  { juz: 17, quart: 1 },
  { juz: 17, quart: 2 },
  { juz: 17, quart: 3 },
  { juz: 17, quart: 4 },
  { juz: 18, quart: 1 },
  { juz: 18, quart: 2 },
  { juz: 18, quart: 3 },
  { juz: 18, quart: 4 },
  { juz: 19, quart: 1 },
	{ juz: 19, quart: 2 },
	{ juz: 19, quart: 3 },
	{ juz: 19, quart: 4 },
	{ juz: 20, quart: 1 },
	{ juz: 20, quart: 2 },
	{ juz: 20, quart: 3 },
	{ juz: 20, quart: 4 },
	{ juz: 21, quart: 1 },
	{ juz: 21, quart: 2 },
	{ juz: 21, quart: 3 },
	{ juz: 21, quart: 4 },
	{ juz: 22, quart: 1 },
	{ juz: 22, quart: 2 },
	{ juz: 22, quart: 3 },
	{ juz: 22, quart: 4 },
	{ juz: 23, quart: 1 },
	{ juz: 23, quart: 2 },
	{ juz: 23, quart: 3 },
	{ juz: 23, quart: 4 },
	{ juz: 24, quart: 1 },
	{ juz: 24, quart: 2 },
	{ juz: 24, quart: 3 },
	{ juz: 24, quart: 4 },
	{ juz: 25, quart: 1 },
	{ juz: 25, quart: 2 },
	{ juz: 25, quart: 3 },
	{ juz: 25, quart: 4 },
	{ juz: 26, quart: 1 },
	{ juz: 26, quart: 2 },
	{ juz: 26, quart: 3 },
	{ juz: 26, quart: 4 },
	{ juz: 27, quart: 1 },
	{ juz: 27, quart: 2 },
	{ juz: 27, quart: 3 },
	{ juz: 27, quart: 4 },
	{ juz: 28, quart: 1 },
	{ juz: 28, quart: 2 },
	{ juz: 28, quart: 3 },
	{ juz: 28, quart: 4 },
	{ juz: 29, quart: 1 },
	{ juz: 29, quart: 2 },
	{ juz: 29, quart: 3 },
	{ juz: 29, quart: 4 },
	{ juz: 30, quart: 1 },
	{ juz: 30, quart: 2 },
	{ juz: 30, quart: 3 },
	{ juz: 30, quart: 4 }
];

function findIndexDjouzQuart(juz, quart) {
  const juzStr = juz.toString().padStart(2, 0);
  const searchStr = `Juz ${juzStr} - Q${quart}`;

  for (let i = 0; i < dataAyoubEssack.length; i++) {
    const item = dataAyoubEssack[i];
    const itemStr = `Juz ${item.juz.toString().padStart(2, 0)} - Q${item.quart}`;
    if (itemStr === searchStr) {
      return i+1;
    }
  }

  return -1; // Retourne -1 si la case correspondante n'est pas trouvée
}

// Exemple d'utilisation :
// const index = findIndexDjouzQuart(30, 3);
// console.log(index); // Output: 118

	
// AFFICHAGE DES MENUS ET DE 'ACTIVE' DYNAMIQUE
// document.addEventListener("DOMContentLoaded", function() {
    // Récupérer l'ID du menu à partir de l'attribut data-menu de l'élément avec l'ID "navBar"
    // let idMenu = parseInt(document.getElementById("navBar").getAttribute("data-menu"));

    // Récupérer tous les éléments avec la classe .mdl-navigation__link
    // const navigationLinks = document.querySelectorAll('.mdl-navigation__link');

    // Ajouter la classe active uniquement à l'élément enfant spécifié
    // if (idMenu !== null && idMenu < navigationLinks.length) {
        // navigationLinks[idMenu].classList.add('active');
        // navigationLinks[idMenu+window.maxOnglet].classList.add('active'); //+ pour recommencer à 0 et ajouter aussi sur le menu déroulant mobile
        // navigationLinks[idMenu].setAttribute('href', '#');
        // navigationLinks[idMenu+window.maxOnglet].setAttribute('href', '#'); //+ pour recommencer à 0 et ajouter aussi sur le menu déroulant mobile
    // }
// });
