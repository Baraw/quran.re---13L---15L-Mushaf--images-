 window.addEventListener('DOMContentLoaded', function() {
    var imagePORTRAIT = document.querySelector('.imagePORTRAIT');
    var testBoutonPCgauche = document.getElementById('testBoutonPCgauche');
    var testBoutonPCdroit = document.getElementById('testBoutonPCdroit');
    // var ombreAll = document.querySelectorAll('ombresurImage');

    // Récupérer la hauteur de .imagePORTRAIT
    var imageHeight = imagePORTRAIT.clientHeight;

    // Appliquer la même hauteur à #testboutonPC
	if (testBoutonPCgauche)
	{
		testBoutonPCgauche.style.height = (imageHeight+20) + 'px';
		testBoutonPCdroit.style.height = (imageHeight+20) + 'px';
	}
	// ajoutOmbre(document.getElementById('selectPAGE').value);
	
  });
   
function ajoutOmbre(numeroPage) 
{
  
  if (window.innerWidth <= 600 ) // 	en attendant de trouver comment pour PC
  {
		if ( estPair(numeroPage) === true )
	{
		document.getElementById('testBoutonPCgauche').classList.add('ombrePageAGauche');
		document.getElementById('testBoutonPCdroit').classList.remove('ombrePageADroite');
		
		// pages en surplus (plis)
		document.getElementById('pageAffichee').classList.add('plisPagesDroite');
		document.getElementById('pageAffichee').classList.remove('plisPagesGauche');
	}
	else if (estPair(numeroPage) === false )
	{

		document.getElementById('testBoutonPCdroit').classList.add('ombrePageADroite');
		document.getElementById('testBoutonPCgauche').classList.remove('ombrePageAGauche');
		
		// pages en surplus (plis)
		document.getElementById('pageAffichee').classList.add('plisPagesGauche');
		document.getElementById('pageAffichee').classList.remove('plisPagesDroite');
	}
		// console.log(estPair(document.getElementById('selectPAGE').value));
		// console.log(document.getElementById('pageAffichee').alt);
  }
  
   if (window.innerWidth > 600 ) // 	en attendant de trouver comment pour PC
  {
		if ( estPair(numeroPage) === true )
	{
		// document.getElementById('testBoutonPCgauche').classList.add('ombrePageAGauche');
		// document.getElementById('testBoutonPCdroit').classList.remove('ombrePageADroite');
		
		// pages en surplus (plis)
		document.getElementById('pageAffichee').classList.add('plisPagesDroite');
		// document.getElementById('moushaf').classList.add('plisPagesGauche');
		
		document.getElementById('pageAffichee').classList.remove('plisPagesGauche');
		// document.getElementById('moushaf').classList.remove('plisPagesDroite');
	}
	else if (estPair(numeroPage) === false )
	{

		// document.getElementById('testBoutonPCdroit').classList.add('ombrePageADroite');
		// document.getElementById('testBoutonPCgauche').classList.remove('ombrePageAGauche');
		
		// pages en surplus (plis)
		document.getElementById('pageAffichee').classList.add('plisPagesGauche');
		// document.getElementById('moushaf').classList.add('plisPagesDroite');
		
		document.getElementById('pageAffichee').classList.remove('plisPagesDroite');
		// document.getElementById('moushaf').classList.remove('plisPagesGauche');
	}
		
  }
}

function zoomPlus() 
{
    // Créer un élément input de type range
    var rangeInput = document.createElement("input");
    rangeInput.type = "range";
    rangeInput.min = 1;
    rangeInput.max = 8;
    rangeInput.value = 1;
    
    // Ajouter un écouteur d'événements pour détecter les changements de valeur
    rangeInput.addEventListener("input", function() {
        // Calculer la largeur en fonction de la valeur du range
        var largeur = parseInt(rangeInput.value) * 50 + 400;
        // Appliquer la nouvelle largeur à l'élément avec l'ID "moushaf"
        document.getElementById("moushaf").style.maxWidth = largeur + "px";
    });
    
    // Ajouter l'élément range au conteneur
    document.getElementById("conteneur").innerHTML = "";
    document.getElementById("conteneur").appendChild(rangeInput);
}
