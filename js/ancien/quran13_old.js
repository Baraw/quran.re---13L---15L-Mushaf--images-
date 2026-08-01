
let 	 idQuart = '' ; 
let maxOnglet = 9;

// Affiche la page correspondant au lien de type "?page=XX" 
function recupURLversImage(moushafType,formatPage)
{
  
	const monLienParam = new URL(window.location.href).searchParams; // Recupere les paramètres de mon lien source
	const page = monLienParam.get('page');  //recherche la valeur de la page dans le lien (=XX)
       
       
	// SI UNE VALEUR EST DONNEE DANS L'URL, alors: 
	if ( page != null  )
     {
         var nouvPage = Number(page); //Converti en "nombre" pour pouvoir faire les opérations
		 
        // SELECTION DU TYPE DE MOUSHAF
        if (moushafType === '13lcolored' ||  (moushafType === '13lclassic') ||  (moushafType === '13lsabah') || (moushafType === '13ltrois') ) // 13L TADJWID
        {
				var pageMax = 851;
				var pageMin = 2;
				
        }
		
		if ( (moushafType === '13l') || (moushafType === '13lvert') || (moushafType === '13lQC') ) // 13L SIMPLE
		{
				var pageMax = 849;
				var pageMin = 1;
				
		}
		
		if ( (moushafType === '13lenglish')  ) // 13L SIMPLE
		{
				var pageMax = 853;
				var pageMin = 1;
				
		}
		// if (moushafType === '13lvert') 
			// nouvPage = nouvPage+2;
		
		if (  ( nouvPage < pageMax ) && (nouvPage > pageMin) )
			affichagePage('page',nouvPage,moushafType,formatPage);
	  
     }

}


// FONCTION PRINCIPALE DE MODIFICATION DE L IMAGE, QUELQUE SOIT LA SOURCE DU CHANGEMENT (bouton, sourate, sipara, page)
function affichagePage(typeSelect,valeurPageReelle,moushafType,formatPage) 
{
	valeurPageReelle = Number(valeurPageReelle);
	   
	// INITIALISATION DES VARIABLES DE REPERTOIRE
	var repMoushaf = "images/quran"+ moushafType +"/quran"+ moushafType +" (";  // Nom du moushafType  équivaut au nom du dossier images et des noms des images avec l'ajout de quran avant 
		// var repertoireNouvPage2= nomMoushaf ;
		// var repImageCachee = nomMoushaf ;
		// var repImageCachee2 = nomMoushaf ;
		// var repertoireNouvPage = nomMoushaf ;

	// 13L TADJWID
	if (moushafType === '13lcolored')
	{
			if( typeSelect == "sourate") //SOURATE
				valeurPageReelle = (valeurPageReelle)+1;
			
			if( typeSelect == "siparah") //SIPARAH
				valeurPageReelle= (valeurPageReelle)+1;
				
			if( typeSelect == "page") // PAGE
				valeurPageReelle= (valeurPageReelle)-2;
				
			
			if( formatPage === '2pages' )
			{
				if (valeurPageReelle & 1) //bitwise and logic
				{	//impaire (page de gauche)
					  var valeurPageReelle2 = valeurPageReelle;
					  valeurPageReelle = (valeurPageReelle)-1 ;
				}
				else
				{	//paire (page de droite)
			
					  var valeurPageReelle2 = (valeurPageReelle)+1;
				}
				   var repertoireNouvPage2= repMoushaf+ valeurPageReelle2 +").png";
				   var repImageCachee = repMoushaf+ ((valeurPageReelle)+2) +").png"; // mise en cache 1
				   var repImageCachee2 = repMoushaf+ ((valeurPageReelle2)+2) +").png"; // mise en cache 2
				   	
					var repImageCachee3 = repMoushaf+ ((valeurPageReelle)+4) +").png"; // mise en cache 3
					var repImageCachee4 = repMoushaf+ ((valeurPageReelle2)+4) +").png"; // mise en cache  4
			}
			else
			{
				var repImageCachee = repMoushaf+ ((valeurPageReelle)+1) +").png";// mise en cache 1
				var repImageCachee2 = repMoushaf+ ((valeurPageReelle)+2) +").png";// mise en cache 2
			}
			
			var repertoireNouvPage = repMoushaf+ valeurPageReelle +").png";
			var valeurPageAffichee = (valeurPageReelle)+2;
	}
	
	
	
	//13L  SIMPLE
	else if (moushafType === '13l') 
	{
		
       if( typeSelect == "page") // PAGE
            valeurPageReelle = (valeurPageReelle)-1;
            
			if( formatPage === '2pages' )
			{
			
				if (valeurPageReelle & 1) //bitwise and logic
				{	//impaire (page de gauche)
					var valeurPageReelle2 = (valeurPageReelle)+1;
				}
				else
				{	//paire (page de droite)
					var valeurPageReelle2 = valeurPageReelle;
					valeurPageReelle = (valeurPageReelle)-1 ;
				}
				 var repertoireNouvPage2= repMoushaf+ valeurPageReelle2 +").jpg";
			    var repImageCachee = repMoushaf+ ((valeurPageReelle)+2) +").jpg"; // mise en cache 1
				var repImageCachee2 = repMoushaf+ ((valeurPageReelle2)+2) +").jpg"; // mise en cache 2
					
				var repImageCachee3 = repMoushaf+ ((valeurPageReelle)+4) +").jpg"; // mise en cache 3
				var repImageCachee4 = repMoushaf+ ((valeurPageReelle2)+4) +").jpg"; // mise en cache  4
			}
			else
			{
				var repImageCachee = repMoushaf+ ((valeurPageReelle)+1) +").jpg";// mise en cache 1
				var repImageCachee2 = repMoushaf+ ((valeurPageReelle)+2) +").jpg";// mise en cache 2
			}
			
			var repertoireNouvPage = repMoushaf+ valeurPageReelle +").jpg";
			var valeurPageAffichee = (valeurPageReelle)+2;
			
	   if( typeSelect == "swipe") //  TEST DU MODULE SWIPE
	   {
		   // const ajoutIMAGEswipe = document.getElementById("iDimageSlide");
		   // appendChild()
		   // var newImg = document.createElement('img');
		   
		   	valeurPageReelle = Number(document.getElementById("pageAffichee").alt)+2;
			 alert(valeurPageReelle);
			 
		if ( valeurPageReelle == 1 ) // page de DROITE (ici valeurPageReelle = index du swipe)
		{
				// valeurPageReelle = Number(document.getElementById("pageAffichee2"))+1;
				// newImg.src ='images/quran13l/quran13l ('+ ((leALT)+2) +').jpg';
			   // newImg.alt = leALT+2;
			   // newImg.className = 'imagePORTRAIT';
			   // ajoutIMAGEswipe.appendChild(newImg);
			  alert("1");
		}
	   
		if ( valeurPageReelle == 0 )  // page de gauche
		   // valeurPageReelle =  document.getElementById("pageAffichee2").alt;
			alert("2");
		   // alert("c est "+valeurPageReelle);
	   }
			
        var repertoireNouvPage= repMoushaf+ valeurPageReelle +").jpg";
        var valeurPageAffichee = (valeurPageReelle)+1;
	}
	
	//13L  VERT & ENGLISH
	else if (moushafType === '13lvert' || moushafType === '13lenglish') 
	{
		if( typeSelect == "sourate" || typeSelect == "siparah") //SOURATE //SIPARA
			valeurPageReelle = (valeurPageReelle)+1;
            
		if( formatPage === '2pages' )
		{
			if (valeurPageReelle & 1) //bitwise and logic
			{	//impaire (page de gauche)
				var valeurPageReelle2 = valeurPageReelle;
				valeurPageReelle = (valeurPageReelle)-1 ;
			}
			else	//paire (page de droite)
				var valeurPageReelle2 = (valeurPageReelle)+1;
		
			var repertoireNouvPage2= repMoushaf+ valeurPageReelle2 +").png";
			var repImageCachee = repMoushaf+ ((valeurPageReelle)+2) +").png"; // mise en cache 1
			var repImageCachee2 = repMoushaf+ ((valeurPageReelle2)+2) +").png"; // mise en cache 2
			
			var repImageCachee3 = repMoushaf+ ((valeurPageReelle)+4) +").png"; // mise en cache 3
			var repImageCachee4 = repMoushaf+ ((valeurPageReelle2)+4) +").png"; // mise en cache  4
		}
		else
		{
			var repImageCachee = repMoushaf+ ((valeurPageReelle)+1) +").png";// mise en cache 1
			var repImageCachee2 = repMoushaf+ ((valeurPageReelle)+2) +").png";// mise en cache 2
		}
			
			var repertoireNouvPage = repMoushaf+ valeurPageReelle +").png";
			var valeurPageAffichee = (valeurPageReelle);
	}
	
	//13L  CLASSIQUE && SABAH
	else if (moushafType === '13lclassic' || moushafType === '13lsabah' || (moushafType === '13ltrois') ) 
	{
		
			if( typeSelect == "sourate" || typeSelect == "siparah") //SOURATE //SIPARA
			valeurPageReelle = (valeurPageReelle)+1;
            
			if( formatPage === '2pages' )
			{
			
				if (valeurPageReelle & 1) //bitwise and logic
				{	//impaire (page de gauche)
					var valeurPageReelle2 = (valeurPageReelle);
						valeurPageReelle = (valeurPageReelle)-1 ;
				}
				else
				{	//paire (page de droite)
						var valeurPageReelle2 = (valeurPageReelle)+1;
				}
				 var repertoireNouvPage2= repMoushaf+ valeurPageReelle2 +").png";
				   var repImageCachee = repMoushaf+ ((valeurPageReelle)+2) +").png"; // mise en cache 1
				   var repImageCachee2 = repMoushaf+ ((valeurPageReelle2)+2) +").png"; // mise en cache 2
				   	
					var repImageCachee3 = repMoushaf+ ((valeurPageReelle)+4) +").png"; // mise en cache 3
					var repImageCachee4 = repMoushaf+ ((valeurPageReelle2)+4) +").png"; // mise en cache  4
			}
			else
			{
				var repImageCachee = repMoushaf+ ((valeurPageReelle)+1) +").png";// mise en cache 1
				var repImageCachee2 = repMoushaf+ ((valeurPageReelle)+2) +").png";// mise en cache 2
			}
			
			var repertoireNouvPage = repMoushaf+ valeurPageReelle +").png";
			var valeurPageAffichee = (valeurPageReelle);
	
	}		
	
		//13L  SABAH AIM.re jpg
	else if (moushafType === '13lsabah_aim' ) 
	{
		
			if( typeSelect == "sourate" || typeSelect == "siparah") //SOURATE //SIPARA
            
			if( formatPage === '2pages' )
			{
			
				if (valeurPageReelle & 1) //bitwise and logic
				{	//impaire (page de gauche)
					var valeurPageReelle2 = (valeurPageReelle);
						valeurPageReelle = (valeurPageReelle)-1 ;
				}
				else
				{	//paire (page de droite)
						var valeurPageReelle2 = (valeurPageReelle)+1;
				}
				 var repertoireNouvPage2= repMoushaf+ valeurPageReelle2 +").jpg";
				   var repImageCachee = repMoushaf+ ((valeurPageReelle)+2) +").jpg"; // mise en cache 1
				   var repImageCachee2 = repMoushaf+ ((valeurPageReelle2)+2) +").jpg"; // mise en cache 2
				   	
					var repImageCachee3 = repMoushaf+ ((valeurPageReelle)+4) +").jpg"; // mise en cache 3
					var repImageCachee4 = repMoushaf+ ((valeurPageReelle2)+4) +").jpg"; // mise en cache  4
			}
			else
			{
				var repImageCachee = repMoushaf+ ((valeurPageReelle)+1) +").jpg";// mise en cache 1
				var repImageCachee2 = repMoushaf+ ((valeurPageReelle)+2) +").jpg";// mise en cache 2
			}
			
			var repertoireNouvPage = repMoushaf+ valeurPageReelle +").jpg";
			var valeurPageAffichee = (valeurPageReelle);
	
	}	
	
	
	//13L  QOUDRATOULLAH COMPANY (QC)
	else if (moushafType === '13lQC') 
	{
			// Provisoirement car quran.re est full en stockage
			repMoushaf = 'https://mufradat.fr/quran/' + repMoushaf;
		
		if( typeSelect == "page") // PAGE
            valeurPageReelle = (valeurPageReelle)-1;
            
			if( formatPage === '2pages' )
			{
			
				if (valeurPageReelle & 1) //bitwise and logic
				{	//impaire (page de gauche)
					var valeurPageReelle2 = (valeurPageReelle)+1;
				}
				else
				{	//paire (page de droite)
					var valeurPageReelle2 = valeurPageReelle;
					valeurPageReelle = (valeurPageReelle)-1 ;
				}
				
				var repertoireNouvPage2= repMoushaf+ valeurPageReelle2 +").png";
				var repImageCachee = repMoushaf+ ((valeurPageReelle)+2) +").png"; // mise en cache 1
				var repImageCachee2 = repMoushaf+ ((valeurPageReelle2)+2) +").png"; // mise en cache 2
				
				var repImageCachee3 = repMoushaf+ ((valeurPageReelle)+4) +").png"; // mise en cache 3
				var repImageCachee4 = repMoushaf+ ((valeurPageReelle2)+4) +").png"; // mise en cache  4
			}
		else
		{
			var repImageCachee = repMoushaf+ ((valeurPageReelle)+1) +").png";// mise en cache 1
			var repImageCachee2 = repMoushaf+ ((valeurPageReelle)+2) +").png";// mise en cache 2
		}
			
			var repertoireNouvPage = repMoushaf+ valeurPageReelle +").png";
			var valeurPageAffichee = (valeurPageReelle)+1;
	
	}		
	
	
	// MISE A JOUR DES IMAGES (src, alt)	
		
	// <!-- alert(valeurPageReelle); -->
	document.getElementById("pageCachee").setAttribute("src",repImageCachee);  // image en cache
	document.getElementById("pageCachee2").setAttribute("src",repImageCachee2);  // image en cache page de gauche
	
	 document.getElementById("pageAffichee").setAttribute("src",repertoireNouvPage);
	 document.getElementById("pageAffichee").setAttribute("alt",valeurPageReelle);
		
	 document.getElementById("selectPAGE").setAttribute("value",valeurPageAffichee);
		
	 // ANIMATION
	 document.getElementById('pageAffichee').onload = function ()
	{
		document.getElementById("pageAffichee").classList.add('fondu');
		setTimeout(function() 
		{
			document.getElementById("pageAffichee").classList.remove('fondu');
		}, 1000);
		
		// Ajout des ombres
		if ( formatPage !== '2pages' )
		ajoutOmbre(valeurPageAffichee);
	
	}
		
		
		
	// Pages en caches	
	 if ( formatPage === '2pages' )
	 {
		 
		document.getElementById("pageCachee3").setAttribute("src",repImageCachee3);  // image en cache page de gauche
		document.getElementById("pageCachee4").setAttribute("src",repImageCachee4);  // image en cache page de gauche
		
		 document.getElementById("pageAffichee2").setAttribute("src",repertoireNouvPage2);
		 document.getElementById("pageAffichee2").setAttribute("alt",valeurPageReelle2); 
	
		// ANIMATION
		document.getElementById("pageAffichee2").classList.add('fondu');
		setTimeout(function() {
				document.getElementById("pageAffichee2").classList.remove('fondu');
		}, 301);
		
	 }
	  
	  // Changement du lien
	  const newLien = '?page='+(valeurPageAffichee);
	  window.history.replaceState(null, null, newLien);
	
		// if (typeSelect === 'siparah')
			// inutile car deja dans selectQuart
		
       //Création de URL de partage
	  // const monLien = new URL(window.location.href); //Recupere mon URL
	  // const monLienParam = new URL(window.location.href).searchParams;
	  // const page = monLienParam.set('page',valeurPage+1);
	  // const test = monLienParam.get('page');
}




// CHOIX DU QUART (SIPARAH)
function selectQUART(siparah,quart,typeMoushaf,formatPage) 
{
		const selQuart = document.getElementById('selectQUART');
		const selTypeAudio = document.getElementById('selectAUDIO') ;
		
		 if (selQuart.disabled) 
		 {
				selQuart.disabled = false;
				selQuart.options[1].setAttribute('selected', true);
		 }
	
	/*	const quart13 = [
			[ ], //quart, page - 13 lignes, basé sur la version classique noir. Sur version tadjwid (par ex index.html actuel), rajouter +2
			
			[1,1],	[2,10],	[3,16],	[4,23], 
			[1,1],	[2,36],	[3,44],	[4,50],
			[1,1],	[2,63],	[3,71],	[4,78],
			[1,1],	[2,92],	[3,100],	[4,106],
			[1,113],	[2,121],	[3,127],	[4,134],
			
			[1,1],	[2,149],	[3,156],	[4,162],
			[1,1],	[2,176],	[3,184],	[4,191],
			[1,1],	[2,202],	[3,209],	[4,217],
			[1,1],	[2,232],	[3,240],	[4,246],
			[1,1],	[2,260],	[3,268],	[4,274],
			
			[1,1],	[2,288],	[3,295],	[4,301],
			[1,1],	[2,316],	[3,322],	[4,331],
			[1,1],	[2,345],	[3,351],	[4,358],
			[1,1],	[2,372],	[3,379],	[4,386],
			[1,1],	[2,400],	[3,407],	[4,414],
			
			[1,1],	[2,429],	[3,435],	[4,441],
			[1,1],	[2,455],	[3,462],	[4,469],
			[1,1],	[2,484],	[3,491],	[4,497],
			[1,1],	[2,511],	[3,518],	[4,526],
			[1,1],	[2,538],	[3,547],	[4,552],
			
			[1,1],	[2,566],	[3,575],	[4,581],
			[1,1],	[2,594],	[3,599],	[4,606],
			[1,1],	[2,622],	[3,628],	[4,634],
			[1,1],	[2,648],	[3,654],	[4,660],
			[1,1],	[2,674],	[3,680],	[4,688],
			
			[1,1],	[2,704],	[3,713],	[4,718],
			[1,1],	[2,735],	[3,741],	[4,748],
			[1,1],	[2,764],	[3,770],	[4,778],
			[1,1],	[2,794],	[3,803],	[4,811],
			[1,1],	[2,826],	[3,833],	[4,840],
			
			
			];
		*/
		
		const quart13 = [
			[ ], //quart - 13 lignes, basé sur la version classique noir. Sur version tadjwid (par ex index.html actuel), rajouter +2
			
			[2],	[10],	[16],	[23],  //premier djouz
			[29],	[35],	[44],	[50], //deuxieme
			[57],	[63],	[71],	[78],
			[85],	[91],	[100],	[106],
			[113],	[121],	[127],	[134],
			
			[141],	[149],	[156],	[162],  //6
			[169],	[176],	[184],	[191],
			[197],	[202],	[209],	[217],
			[225],	[232],	[240],	[246],
			[253],	[260],	[268],	[274],
			
			[281],	[288],	[295],	[301], //11
			[309],	[316],	[322],	[331],
			[337],	[345],	[351],	[358],
			[364],	[372],	[379],	[386],
			[393],	[400],	[407],	[414],
			
			[421],	[429],	[435],	[441], //16
			[449],	[455],	[462],	[469],
			[477],	[484],	[491],	[497],
			[505],	[511],	[518],	[526],
			[533],	[538],	[547],	[552],
			
			[559],	[566],	[575],	[581], //21
			[587],	[594],	[599],	[606],
			[613],	[622],	[628],	[634],
			[641],	[648],	[654],	[660],
			[667],	[674],	[680],	[688],
			
			[697],	[704],	[713],	[718], //26
			[727],	[735],	[741],	[748],
			[757],	[764],	[770],	[778],
			[787],	[794],	[803],	[811],
			[819],	[826],	[833],	[840],
			
			
			];
			
			
			indexQuart(siparah,quart); // pour audio qari ayoub
	
			var pageQuart = quart13[idQuart]; 
			
			if (typeMoushaf === '13l') // 1 page en moins pour 13L SIMPLE
			{
				pageQuart--;
			}
			
			 // RENVOI LA OU LES  PAGE A AFFICHE	
			affichagePage('',pageQuart,typeMoushaf,formatPage);
				
			// alert(pageQuart);
			// alert(idQuart);
		
			//affichage de l'AUDIO pour les pages doubles
			if (formatPage === '2pages')
				document.getElementById('blockAudio').style.display = 'block'; // display = pour ne pas prendre le l'espace en orientation paysage
			// else
				// document.getElementById('blockAudio').style.visibility = "visible"; //visibility = pour prévoir un espace en orientation portrait 
				
			// active le quart et les recitateurs de quarts
			if (selTypeAudio.value !== 'Quart')
				autoSelectAudio('quart');		
			
			// relance l'audio au bon QUART
			choixQari(document.getElementById('selectQari').value,selTypeAudio.value,moushaf);
}



// UN CLIC SUR LE BOUTON <-- ou -->
function ChangementPage(valeurChangement,moushafType,formatPage) 
{
	var nouvPage = Number(document.getElementById("pageAffichee").alt); // Récupère le numéro de page actuel inclus dans le ALT de l'image et le transforme en numérique pour pouvoir incrémenter ou décrémenter

		if ( valeurChangement === 'suiv' ) // PAGE SUIVANTE clické
		{
			if ( ( ((moushafType === '13lcolored') || (moushafType === '13lQC')  || (moushafType === '13lenglish') ) && (nouvPage < 850)) || 
			( ((moushafType === '13lclassic') || (moushafType === '13l') || (moushafType === '13lsabah') || (moushafType === '13lsabah_aim') || (moushafType === '13ltrois') || (moushafType === '13lvert')) && (nouvPage != 847)) ) // si pas la derniere page
				{
					if (formatPage === '2pages')
							nouvPage = nouvPage+2;
					else
							nouvPage = nouvPage+1;
				}
		}
		
		if ( valeurChangement === 'prec' ) // PAGE PRECEDENTE clické
		{
			if (  ( ((moushafType === '13lcolored')   || (moushafType === '13lvert')  || (moushafType === '13lsabah_aim') || (moushafType === '13lenglish')  ) && (nouvPage != 2) ) || 
			( ((moushafType === '13lQC') || (moushafType === '13lclassic') || (moushafType === '13lsabah') || (moushafType === '13ltrois') || (moushafType === '13l')) && (nouvPage != 1)) ) // si pas la 1re page
			{
				if (formatPage === '2pages')
					nouvPage = nouvPage-2;
				else
					nouvPage = nouvPage-1;
			}
			
		}
		// alert(nouvPage);
		affichagePage('',nouvPage,moushafType,formatPage); // RENVOI LA OU LES  PAGE A AFFICHE
	
}


// PARTIE DE CODE DE ABOU : Affiche la page selon le ayah
	  const searchPage = (searchSura, searchAya) => {
			const pages = [
			// [sura, aya,] 13 lignes
			[],	
			[1, 1], 	[2, 1], 	[2, 6], 	[2, 17], 	[2, 25],
			[2, 30], 	[2, 38], 	[2, 49], 	[2, 58], 	[2, 62],
			[2, 70], 	[2, 77], 	[2, 84], 	[2, 89], 	[2, 94],
			[2, 102], 	[2, 106], 	[2, 113], 	[2, 120], 	[2, 127],
			[2, 135], 	[2, 142], 	[2, 146], 	[2, 154], 	[2, 164],
			[2, 170], 	[2, 177], 	[2, 182], 	[2, 187], 	[2, 191],
			[2, 197], 	[2, 203], 	[2, 211], 	[2, 216], 	[2, 220],
			[2, 225], 	[2, 231], 	[2, 234], 	[2, 238], 	[2, 246],
			[2, 249], 	[2, 253], 	[2, 257], 	[2, 260], 	[2, 265],
			[2, 270], 	[2, 275], 	[2, 282], 	[2, 283], 	[3, 1],
			[3, 10], 	[3, 16], 	[3, 23], 	[3, 30], 	[3, 38],
			[3, 46], 	[3, 53], 	[3, 62], 	[3, 71], 	[3, 78],
			[3, 84], 	[3, 92], 	[3, 101], 	[3, 109], 	[3, 116],
			[3, 122], 	[3, 133], 	[3, 141], 	[3, 149], 	[3, 154],
			[3, 158], 	[3, 166], 	[3, 174], 	[3, 181], 	[3, 187],
			[3, 195], 	[4, 1], 	[4, 7], 	[4, 12], 	[4, 15],
			[4, 20], 	[4, 24], 	[4, 27], 	[4, 34], 	[4, 38],
			[4, 45], 	[4, 52], 	[4, 60], 	[4, 66], 	[4, 75],
			[4, 80], 	[4, 87], 	[4, 92], 	[4, 95], 	[4, 102],
			[4, 106], 	[4, 114], 	[4, 122], 	[4, 128], 	[4, 135],
			[4, 141], 	[4, 148], 	[4, 155], 	[4, 163], 	[4, 171],
			[4, 176], 	[5, 3], 	[5, 6], 	[5, 10], 	[5, 14],
			[5, 18], 	[5, 24], 	[5, 32], 	[5, 37], 	[5, 42],
			[5, 46], 	[5, 51], 	[5, 58], 	[5, 65], 	[5, 71],
			[5, 77], 	[5, 83], 	[5, 90], 	[5, 96], 	[5, 104],
			[5, 109], 	[5, 114], 	[6, 1], 	[6, 9], 	[6, 19],
			[6, 28], 	[6, 36], 	[6, 45], 	[6, 53], 	[6, 60],
			[6, 69], 	[6, 74], 	[6, 82], 	[6, 91], 	[6, 95],
			[6, 102], 	[6, 111], 	[6, 119], 	[6, 125], 	[6, 132],
			[6, 138], 	[6, 143], 	[6, 147], 	[6, 152], 	[6, 158],
			[7, 1], 	[7, 12], 	[7, 23], 	[7, 31], 	[7, 38],
			[7, 44], 	[7, 52], 	[7, 58], 	[7, 68], 	[7, 74],
			[7, 82], 	[7, 88], 	[7, 96], 	[7, 105], 	[7, 121],
			[7, 131], 	[7, 138], 	[7, 144], 	[7, 150], 	[7, 156],
			[7, 160], 	[7, 164], 	[7, 171], 	[7, 179], 	[7, 188],
			[7, 196], 	[8, 1], 	[8, 9], 	[8, 17], 	[8, 26],
			[8, 34], 	[8, 41], 	[8, 46], 	[8, 53], 	[8, 62],
			[8, 70], 	[9, 1], 	[9, 7], 	[9, 14], 	[9, 21],
			[9, 27], 	[9, 32], 	[9, 37], 	[9, 41], 	[9, 48],
			[9, 55], 	[9, 62], 	[9, 69], 	[9, 73], 	[9, 80],
			[9, 87], 	[9, 94], 	[9, 100], 	[9, 107], 	[9, 112],
			[9, 118], 	[9, 123], 	[10, 1], 	[10, 7], 	[10, 15],
			[10, 21], 	[10, 26], 	[10, 34], 	[10, 43], 	[10, 54],
			[10, 62], 	[10, 71], 	[10, 79], 	[10, 89], 	[10, 98],
			[10, 107], 	[11, 6], 	[11, 13], 	[11, 20], 	[11, 29],
			[11, 38], 	[11, 46], 	[11, 54], 	[11, 63], 	[11, 72],
			[11, 82], 	[11, 89], 	[11, 98], 	[11, 109], 	[11, 118],
			[12, 5], 	[12, 15], 	[12, 23], 	[12, 31], 	[12, 38],
			[12, 44], 	[12, 53], 	[12, 64], 	[12, 70], 	[12, 79],
			[12, 87], 	[12, 96], 	[12, 104], 	[13, 1], 	[13, 6],
			[13, 14], 	[13, 19], 	[13, 29], 	[13, 35], 	[13, 43],
			[14, 6], 	[14, 11], 	[14, 19], 	[14, 25], 	[14, 34],
			[14, 43], 	[15, 1], 	[15, 16], 	[15, 32], 	[15, 52],
			[15, 71], 	[15, 91], 	[16, 7], 	[16, 15], 	[16, 27],
			[16, 35], 	[16, 43], 	[16, 55], 	[16, 65], 	[16, 73],
			[16, 80], 	[16, 88], 	[16, 94], 	[16, 103], 	[16, 111],
			[16, 119], 	[17, 1], 	[17, 8], 	[17, 18], 	[17, 28],
			[17, 39], 	[17, 50], 	[17, 59], 	[17, 67], 	[17, 76],
			[17, 87], 	[17, 97], 	[17, 105], 	[18, 5], 	[18, 16],
			[18, 21], 	[18, 28], 	[18, 35], 	[18, 46], 	[18, 54],
			[18, 62], 	[18, 75], 	[18, 84], 	[18, 98], 	[19, 1],
			[19, 12], 	[19, 26], 	[19, 39], 	[19, 52], 	[19, 65],
			[19, 77], 	[19, 96], 	[20, 13], 	[20, 38], 	[20, 52],
			[20, 65], 	[20, 77], 	[20, 88], 	[20, 99], 	[20, 114],
			[20, 126], 	[21, 1], 	[21, 11], 	[21, 25], 	[21, 36],
			[21, 45], 	[21, 58], 	[21, 73], 	[21, 82], 	[21, 91],
			[21, 102], 	[22, 1], 	[22, 6], 	[22, 16], 	[22, 24],
			[22, 31], 	[22, 39], 	[22, 47], 	[22, 56], 	[22, 65],
			[22, 73], 	[23, 1], 	[23, 18], 	[23, 28], 	[23, 43],
			[23, 60], 	[23, 75], 	[23, 90], 	[23, 105], 	[24, 1],
			[24, 11], 	[24, 21], 	[24, 28], 	[24, 32], 	[24, 37],
			[24, 44], 	[24, 54], 	[24, 59], 	[24, 62], 	[25, 3],
			[25, 12], 	[25, 21], 	[25, 33], 	[25, 44], 	[25, 56],
			[25, 68], 	[26, 1], 	[26, 20], 	[26, 40], 	[26, 61],
			[26, 84], 	[26, 112], 	[26, 137], 	[26, 160], 	[26, 184],
			[26, 207], 	[27, 1], 	[27, 14], 	[27, 23], 	[27, 36],
			[27, 45], 	[27, 56], 	[27, 64], 	[27, 77], 	[27, 89],
			[28, 6], 	[28, 14], 	[28, 22], 	[28, 29], 	[28, 36],
			[28, 44], 	[28, 51], 	[28, 60], 	[28, 71], 	[28, 78],
			[28, 85], 	[29, 7], 	[29, 15], 	[29, 24], 	[29, 31],
			[29, 39], 	[29, 46], 	[29, 53], 	[29, 64], 	[30, 6],
			[30, 16], 	[30, 25], 	[30, 33], 	[30, 42], 	[30, 51],
			[31, 1], 	[31, 12], 	[31, 20], 	[31, 29], 	[32, 1],
			[32, 12], 	[32, 21], 	[33, 1], 	[33, 7], 	[33, 16],
			[33, 23], 	[33, 31], 	[33, 36], 	[33, 44], 	[33, 51],
			[33, 55], 	[33, 63], 	[34, 1], 	[34, 8], 	[34, 15],
			[34, 23], 	[34, 32], 	[34, 40], 	[34, 49], 	[35, 4],
			[35, 12], 	[35, 19], 	[35, 31], 	[35, 39], 	[35, 45],
			[36, 13], 	[36, 28], 	[36, 41], 	[36, 55], 	[36, 71],
			[37, 1], 	[37, 25], 	[37, 52], 	[37, 77], 	[37, 103],
			[37, 127], 	[37, 154], 	[38, 1], 	[38, 17], 	[38, 27],
			[38, 43], 	[38, 62], 	[38, 84], 	[39, 6], 	[39, 11],
			[39, 22], 	[39, 32], 	[39, 41], 	[39, 48], 	[39, 57],
			[39, 68], 	[39, 75], 	[40, 8], 	[40, 17], 	[40, 26],
			[40, 34], 	[40, 41], 	[40, 50], 	[40, 59], 	[40, 67],
			[40, 78], 	[41, 1], 	[41, 12], 	[41, 21], 	[41, 30],
			[41, 39], 	[41, 47], 	[42, 1], 	[42, 11], 	[42, 16],
			[42, 23], 	[42, 32], 	[42, 45], 	[42, 52], 	[43, 11],
			[43, 23], 	[43, 34], 	[43, 48], 	[43, 61], 	[43, 74],
			[44, 1], 	[44, 19], 	[44, 40], 	[45, 1], 	[45, 14],
			[45, 23], 	[45, 33], 	[46, 6], 	[46, 15], 	[46, 21],
			[46, 29], 	[47, 1], 	[47, 12], 	[47, 20], 	[47, 30],
			[48, 1], 	[48, 10], 	[48, 16], 	[48, 24], 	[48, 29],
			[49, 5], 	[49, 12], 	[50, 1], 	[50, 16], 	[50, 36],
			[51, 7], 	[51, 31], 	[51, 52], 	[52, 15], 	[52, 32],
			[53, 1], 	[53, 27], 	[53, 45], 	[54, 7], 	[54, 28],
			[54, 50], 	[55, 17], 	[55, 41], 	[55, 68], 	[56, 17],
			[56, 51], 	[56, 77], 	[57, 4], 	[57, 12], 	[57, 19],
			[57, 25], 	[58, 1], 	[58, 7], 	[58, 12], 	[58, 22],
			[59, 4], 	[59, 10], 	[59, 17], 	[60, 1], 	[60, 6],
			[60, 12], 	[61, 6], 	[62, 1], 	[62, 9], 	[63, 5],
			[64, 1], 	[64, 10], 	[65, 1], 	[65, 6], 	[66, 1],
			[66, 8], 	[67, 1], 	
	
			];
			
			
			// On mesure le poids d'une surah par 1000 car aucune surah ne comporte 1000 versets
			const suraWeight = 1000;
			
			// Je connais les pages déjà triés
				const nextPage = pages.findIndex( (page) => { //https://www.w3schools.com/js/js_es6.asp#mark_arrow
				const [sura,aya] = page;
				const pageIndex = sura * suraWeight + aya;
				const searchIndex = searchSura * suraWeight + searchAya;
				
				// On parcourt le tableau jusqu'à la page qui suit ma recherche
				// Dans le cas contraire, c'est que c'est la derniere page
				return pageIndex > searchIndex;
			});
			const lastPageIndex = pages.length - 1;
			return nextPage > 0 ? nextPage - 1 : lastPageIndex;
	  }
	  // FIN
	  
 // DONNE LE DJOUZ SELON LA PAGE DONNEE EN PARAM
		const searchPageDjouz = (searchDjouz) => {
		
			const pageDjouz = [
				[  ],
				[ 	2	 	],	
				[ 	29	], 
				[ 	57	], 
				[	85	],
				[	113	], 
				[	141	],
				[	169	],
				[	197	], 
				[	225	],
				[	253	],
				[	281	], 
				[	309	],
				[	337	],
				[	365	], 
				[	393	],
				[	421	], 
				[	449	],
				[	477	],
				[	505	], 
				[	533	],
				[	559	],
				[	587	], 
				[	613	],
				[	641	],
				[	667	], 
				[	697	],
				[	727	],
				[	757	], 
				[	787	],
				[	819	],
				];
	
				const nextPage = pageDjouz.findIndex( (page) => { //https://www.w3schools.com/js/js_es6.asp#mark_arrow
				const [djouz] = page;
				const pageIndex = djouz ;
				const searchIndex = searchDjouz;
				
				// On parcourt le tableau jusqu'à la page qui suit ma recherche
				// Dans le cas contraire, c'est que c'est la derniere page
				return pageIndex > searchIndex;
			});
			const lastPageIndex = pageDjouz.length - 1;
			return nextPage > 0 ? nextPage - 1 : lastPageIndex;
		  }	
	  
// Donne la valeur de la page du moushaf à partir de l'image son "alt" selon le standard: Fatiha = page2	  
function recupNumPage(typeMoushaf)
{
	if( (typeMoushaf == '13lcolored') || (typeMoushaf == '13lvert') || (typeMoushaf == '13lclassic') || (typeMoushaf == '13lenglish') || (moushafType === '13lsabah') || (moushafType === '13ltrois'))
		return 0;
	else if( (typeMoushaf == '13lsimple') || (typeMoushaf == '13lQC')  )
		return 1;
}

function indexQuart(siparah,quart)
{
	if (siparah < 4) // c a d moins que sipara 4
			{
				// var idQuart = siparah*quart;
				if( siparah == 1)
					idQuart = quart;
				
				if (siparah == 2)
					idQuart = Number(quart)+4;
				
				if (siparah == 3)
					idQuart = Number(quart)+8;
			}
			
			else // c a d sipara >= 3
			{
				
				idQuart = Number((siparah-1))*4;
				// idQuart = Number(idQuart);
				idQuart = idQuart + (Number(quart));
			
			}
	
}
