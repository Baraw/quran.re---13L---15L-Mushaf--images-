/*
	Voici le fichier affichage.js
	Réccurence des différentes pages affichées ici

	Avril 2024
*/
	
	

import { QuranDisplay } from './loadQuran.js'; // Assurez-vous que le fichier quranDisplay est bien importé
import { langChoisie  } from './configLoader.js'; // Fonction de chargement de config

	/*
	let langChoisie = 'fr';

	// recherche param langue dans ?lang=
	let searchParams = new URLSearchParams(window.location.search);
	if( searchParams.has('lang') ) // true
	{
		langChoisie = EpurationLangue(searchParams.get('lang')) ;
		
	}	
	
	else	// sinon,  (pa de ?lang=??)
	{
		// Détéction de la langue depuis le navigateur 
		var lang = window.navigator.userLanguage || window.navigator.language ;
		lang = lang.slice(0,2); // on ne prend que les 2 premiers caractères
		langChoisie = EpurationLangue(lang) ;
	}
		
		// let changeURLParam = new URL(window.location.href);
		// changeURLParam.searchParams.set('lang',langchoisie);
		// history.pushState({},'',changeURLParam.href);



function EpurationLangue(langVal)
{
	if (langVal === 'fr' || langVal === 'ar' || langVal === 'ur')
			return langVal;
	else // par défaut, anglais
			return 'en';
}


const languesStock = 
{
			  'fr': {
				"titre":	"Le Noble Coran:",
				"index": "Choisir le type de moushaf",
				"typeMoushaf": {	'13': "13 LIGNES", '15': "15 LIGNES"},
				"moushaf": "Masahif",
				"typePage": {	"1": "Page unique", "2": "Page double"	},
				"parametres": {	"pleinecran": "PLEIN ECRAN",	"zoom": "Zoom", "nuit": "Mode sombre/clair", "sd": "Page simple/double", "partager":"Partager", "erreur":"Remonter une erreur" },
				"sourah": "Sourah", 
				"siparah": "Djouz", 
				"quart": {	"titre":	'Quart',	"1":	'1ᵉʳ', "2":	'2ᵈ', "3":	'3ᵉ', "4":	'4ᵉ' 	},
				"onglets": 	{	"taj": "Tadjwîd", "cl":"Classique", "simple": "Gras"	},
				"typeAudio":{	"ecouter": "Écouter", "page":"Cette page", "quart":"Ce quart", "sourate": "Cette Sourah", "sipara":"Ce Sipara"	},
				"recitateur":	 "Récitateurs",
				"vitesse": "Vitesse",
				"footer": {	"outils": "NOS OUTILS",	"lpl": "Ligne par ligne",	"langues": "LANGUES", "Apropos": "À propos", "ml": "Mentions légales"},
				"msgOrientation": {	"1": "Basculez votre appareil en", "2": "PAYSAGE", "3": "pour afficher correctement le mode 'page double'.", "4": "Sinon, repassez en mode" , "5": "page simple."},
				"orientation": "Veuillez retourner votre appareil en mode paysage",
				"toast": { "play": "Lecture de l\'audio...", "pause": "Audio en pause", "reset": "Mise à jour du récitateur et de la portion de lecture.."	},
				"quiraate_prevention":	{	'msg': 'Ces indications de différenciations de lecture sont succintes, non exhaustives et possiblement inexactes. Vérifiez toujours avec un Qâri ou un ouvrage de référence avant de réciter. ', 'lien1': 'Remonter une erreur', 'lien2': 'En savoir +', },
				
			  },
			  'en': {
				"titre":	"The Holy Quran:",
				"index": "Choose the type of moushaf",
				"typeMoushaf": {	'13': "13 LINES", '15': "15 LINES"},
				"moushaf": "Masahif",
				"typePage": {	"1": "Single page", "2": "Double page"	},
				"parametres": {	"pleinecran": "full screen","zoom": "Zoom", 	"nuit": "Dark/Light mode", "sd": "Single/Double page", "partager":"Share", "erreur":"Report an issue" },
				"sourah": "Surah", 
				"siparah": "Juz", 
				"quart":  {	"titre":	'Quarter',	"1":	'1ˢᵗ', "2":	'2ᶮᵈ', "3":	'3ʳᵈ', "4":	'4ᵗʰ' 	},
				"onglets": 	{	"taj": "Tadjweed", "cl":"Classic", "simple": "Bold"	},
				"typeAudio":{	"ecouter": "Listen", "page":"This  page", "quart":"This quarter", "sourate": "This Surah", "sipara":"This Siparah"		},
				"recitateur":	 "Reciters",
				"vitesse": "Speed",
				"footer": {"outils": "OUR APPS",	"lpl": "Line by line",	"langues": "LANGUAGES", "Apropos": "About Us","ml": "Legal terms"},
				"msgOrientation": {	"1": "Switch your device to ", "2": "LANDSCAPE ", "3": "to correctly display the “double page” mode.", "4": "Otherwise, switch back to" , "5": "single page mode"},
				"orientation": "Please flip your device to landscape mode",
				"toast": { "play": "Playing audio...", "pause": "Audio paused!", "reset": " Reciter and reading portion updated"	},
				"quiraate_prevention":	{	'msg': 'These indications of reading differentiations are succinct, not exhaustive and possibly inaccurate. Always check with an expert reciter or reference book before reciting. ', 'lien1': 'Report an error', 'lien2': 'Learn more', },
			  },
			  'ar': {
				"titre":	"القران الكريم:",
				"typeMoushaf": {	'13': "١٣ سطرًا", '15': "١٥ سطرًا"},
				"index": "اختر نوع المصحف",
				"moushaf": "مصاحف",
				"typePage": {	"1": "صفحة واحدة", "2": "صفحة مزدوجة"	},
				"parametres": {	"pleinecran": "تكبير الشاشة","zoom": "تكبير", 	"nuit": "وضع الظلام / الضوء", "sd": "صفحة/صفحتين", "partager":"يشارك", "erreur":"بلغ عن خطأ" },
				"sourah": "السورة", 
				"siparah": "الجزء", 
				"quart":  {	"titre":	'الربع',	"1":	'١', "2":	'٢', "3":	'٣', "4":	'٤' 	},
				"onglets": 	{	"taj": "التجويد", "cl":"أساسي", "simple": "عريض"	},
				"typeAudio":{	"ecouter": "استمع", "page":"هذه الصفحة", "quart":"هذا الربع", "sourate": "هذه السورة", "sipara":"هذا الجزء"		},
				"recitateur":	 "القراء",
				"vitesse": "سرعة",
				"footer": {"outils": "تطبيقاتنا",	"lpl": "سطراً سطراً",	"langues": "اللغات", "Apropos": "معلومات عنا","ml": "مصطلحات قانونية"},
				"msgOrientation": {	"1": "Switch your device to ", "2": "LANDSCAPE ", "3": "o correctly display “double page” mode.", "4": "Otherwise, switch back to" , "5": "single page mode"},
				"orientation": "يرجى قلب جهازك إلى الوضع الأفقي",
				"toast": { "play": "تشغيل التلاوة...", "pause": "توقفت التلاوة!", "reset": "تم تحديث جزء القارئ والقراءة"	},
				"quiraate_prevention":	{	'msg': 'هذه المؤشرات على تمايز القراءة موجزة وليست شاملة وربما غير دقيقة. تحقق دائمًا من قارئ خبير أو كتاب مرجعي قبل التلاوة', 'lien1': 'الإبلاغ عن خطأ', 'lien2': 'اقرأ المزيد', },
			  },
			  'ur': {
				"titre":	"قرآن پاک:",
				"index": "مصحف کی قسم کا انتخاب کریں",
				"typeMoushaf": {	'13': "١٣ لائنیں", '15': "١٥ لائنیں"},
				"moushaf": "مصاحف",
				"typePage": {	"1": "ایک صفحہ", "2": "ڈبل صفحہ"	},
				"parametres": {	"pleinecran": "بڑی اسکرین",	"zoom": "زوم", "nuit": "گہرا/لائٹ موڈ", "sd": "ایک/دو صفحہ", "partager":"شیئر کریں", "erreur":"مسئلہ کی اطلاع دیں" },
				"sourah": "سورت", 
				"siparah": "سپارہ", 
				"quart":  {	"titre":	'چوتهائی',	"1":	'١', "2":	'٢', "3":	'٣', "4":	'٤'  	},
				"onglets": 	{	"taj": "التجوي", "cl":"عام", "simple": "جلی"	},
				"typeAudio":{	"ecouter": "سننا", "page":"اس صفحہ", "quart":"اس چوتهائی", "sourate": "اس سورت", "sipara":"اس سورت"		},
				"recitateur":	 "القرا",
				"vitesse": "رفتار",
				"footer": {"outils": "ہماری ایپس",	"lpl": "لائن فی لائن",	"langues": "زبانیں", "Apropos": "ہمارے بارے میں","ml": "قانونی شرائط"},
				"msgOrientation": {	"1": "اپنے موبائل کو ", "2": "LANDSCAPE", "3": "'ڈبل پیج' موڈ کو صحیح طریقے سے دکھانے کے لیے۔", "4": "بصورت دیگر، واپس جائیں" , "5" : "سنگل پیج موڈ"},
				"orientation": "براہ کرم اپنے آلے کو لینڈ اسکیپ موڈ میں پلٹائیں۔",
				"toast": { "play": "تلاوت چل رہا ہے...", "pause": "تلاوت موقوف!", "reset": "تلاوت کرنے والے اور پڑھنے والے حصے کو اپ ڈیٹ کیا گیا۔"	},
				"quiraate_prevention":	{	'msg': 'پڑھنے کی تفریق کے یہ اشارے مختصر ہیں، مکمل نہیں اور ممکنہ طور پر غلط ہیں۔ تلاوت کرنے سے پہلے ہمیشہ ماہر قاری یا حوالہ کتاب سے رجوع کریں', 'lien1': 'غلطی کی اطلاع دیں', 'lien2': 'اورجانیے', },
			  },
}
*/


	// TITRE (a compléter)
	// document.querySelector('title').textContent = languesStock[langChoisie].titre ;

export function affichageHTML(id_div,type,aRemplacer) /* revoir les arguments */
{
	  let htmlAff;
	  // const langChoisie = quranDisplay.lang;
	 if (typeof quranDisplay === 'undefined') {
		console.error("quranDisplay n'est pas défini.");
		return;
	  }
  else
	  {
		const tabloLang = quranDisplay.config.languages[langChoisie];
		const tabs = quranDisplay.config.tabs;
		const prefixeTypePage = quranDisplay.pageFormat;
		 type = quranDisplay.pageFormat;
		const moushaf = quranDisplay.typeMoushaf ;
		  
	  }
	  

	
	// Différences entre mode 2 pages et une page
	if (quranDisplay.pageFormat === '2p')
	{
		let iconePageQouran = '📖';		
		
	}
	else /*  if (type === '1p') */
	{
		let iconePageQouran = '📄';	
	}
  
  
	// console.log('mi lé la'+langChoisie);
	
	if (id_div === 'header' || id_div === 'drawer')
	{
		if (id_div === 'header')
		{
				htmlAff = `<div class="mdl-layout-icon" ></div>
				<div class="mdl-layout__header-row">
				<span class="mdl-layout__title"> ${tabloLang.moushaf} 13L - ${iconePageQouran}</span>
				<div class="mdl-layout-spacer"></div>
			  `;
			
		}
		
		else if (id_div === 'drawer')
		{
			htmlAff =` <span class="mdl-layout__title" id="navBar" data-menu="${aRemplacer}">${tabloLang.moushaf} 13L</span> 		<span style="text-align:center;">			www.quran.re 	</span>	`;
		}
		
		htmlAff += `<nav class="mdl-navigation" > `;
		
		// Générer les onglets dynamiquement
				  tabs.forEach((tab, index) => {
					const isActive = (typeof tabOrder !== 'undefined' && index === tabOrder) ? 'active' : '';

					const tabLabel = tabloLang.onglets[tab.id] || tab.id;
					htmlAff += `<a class="mdl-navigation__link ${isActive}" href="${prefixeTypePage}${tab.id}.html?&lang=${langChoisie}">${tabLabel}</a>`;
				  });		
			
		if (id_div === 'header')
			htmlAff += '</div>';
		
	}

	// SOURATE DJOUZ QUART
	if ( id_div === 'selectSDQ' )
	{
		if (type !== '2p')
			type === '';
		
		htmlAff = `
			
		<!-- CHOIX DE LA SOURATE -->
		<select id="selectSOURATE" name="selectSOURATE" onchange="affichagePage('sourate',this.value,'${moushaf}','${type}');"> 
		<option value="" selected disabled > ${tabloLang.sourah} </option>
		<optgroup label="${tabloLang.siparah}  01 ⮕ 04">
			<option value="1"> 1 - Al Fatihah الفاتحة - </option>
			<option value="2"> 2 - Al Baqarah البقرة</option>
			<option value="67"> 3 - Al Imran آل عمران</option>
			<option value="105"> 4 - An Nisaa النساء</option>
		</optgroup>
			<optgroup label="${tabloLang.siparah} 05 ⮕ 09">
				<option value="146"> 5 - Al Maaidah المائدة</option>
				<option value="176"> 6 - Al An'aam الأنعام</option>
				<option value="208"> 7 - Al A'raaf الأعراف</option>
				<option value="245"> 8 - Al Anfaal الأنفال</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 10 ⮕ 14">
				<option value="259"> 9 - At Tawbah التوبة</option>
				<option value="287"> 10 - Yunus يونس</option>
				<option value="307"> 11 - Hud هود</option>
				<option value="327"> 12 - Yusuf يوسف</option>
				<option value="345"> 13 - Ar Ra'd الرعد</option>
				<option value="354"> 14 - Ibrahim ابراهيم</option>
				<option value="363"> 15 - Al Hijr الحجر</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 15 ⮕ 19">	
				<option value="371"> 16 - An Nahl النحل</option>
				<option value="392"> 17 - Al Israa الإسراء</option>
				<option value="407"> 18 - Al Kahf الكهف</option>
				<option value="424"> 19 - Al Maryam مريم</option>
				<option value="434"> 20 - Taa-Haa طه</option>
				<option value="448"> 21 - Al Anbiyaa الأنبياء</option>
				<option value="461"> 22 - Al Hajj الحج</option>
				<option value="476"> 23 - Al Muminoon المؤمنون</option>
				<option value="486"> 24 - Al Noor النور</option>
				<option value="500"> 25 - Al Furqaan الفرقان</option>
				<option value="510"> 26 - Al Shu'araa الشعراء</option>
				<option value="524"> 27 - Al Naml النمل</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 20 ⮕ 24">
				<option value="536"> 28 - Al Qasas القصص</option>
				<option value="551"> 29 - Al 'Ankaboot العنكبوت</option>
				<option value="561"> 30 - Ar Room الروم</option>
				<option value="570"> 31 - Luqman لقمان</option>
				<option value="576"> 32 - As Sajdah السجدة</option>
				<option value="580"> 33 - Al Ahzaab الأحزاب</option>
				<option value="594"> 34 - Saba سبإ</option>
				<option value="602"> 35 - Faatir فاطر</option>
				<option value="610"> 36 - Yaseen يس</option>
				<option value="617"> 37 - As Saaffaat الصافات</option>
				<option value="627"> 38 - Saad ص</option>
				<option value="634"> 39 - Az Zumar الزمر</option>
				<option value="646"> 40 - Al Ghaafir غافر | Al Mumin</option>
				<option value="658"> 41 - Fussilat فصلت | Ha-mîm Sadjdah</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 25 ⮕ 29">
				<option value="667"> 42 - Ash Shura الشورى</option>
				<option value="676"> 43 - Az Zukhruf الزخرف</option>
				<option value="685"> 44 - Ad Dukhaan الدخان</option>
				<option value="690"> 45 - Al Jaathiyah الجاثية</option>
				<option value="696"> 46 - Al Ahqaf الأحقاف</option>
				<option value="704"> 47 - Muhammad محمد</option>
				<option value="709"> 48 - Al Fath الفتح</option>
				<option value="715"> 49 - Al Hujuraat الحجرات</option>
				<option value="720"> 50 - Qaaf ق</option>
				<option value="724"> 51 - Ad Dhaariyat الذاريات</option>
				<option value="728"> 52 - At Tur الطور</option>
				<option value="731"> 53 - An Najm النجم</option>
				<option value="735"> 54 - Al Qamar القمر</option>
				<option value="739"> 55 - Al Rahmaan الرحمن</option>
				<option value="744"> 56 - Al Waaqiah الواقعة</option>
				<option value="749"> 57 - Al Hadid الحديد</option>
				<option value="756"> 58 - Al Mujaadilah المجادلة</option>
				<option value="760"> 59 - Al Hashr الحشر</option>
				<option value="765"> 60 - Al Mumtahanah الممتحنة</option>
				<option value="769"> 61 - As Saff الصف</option>
				<option value="772"> 62 - Al Jumu'a الجمعة</option>
				<option value="774"> 63 - Al Munaafiqoon المنافقون</option>
				<option value="776"> 64 - At Taghaabun التغابن</option>
				<option value="779"> 65 - At Talaaq الطلاق</option>
				<option value="782"> 66 - At Tahrim التحريم</option>
				<option value="786"> 67 - Al Mulk الملك</option>
				<option value="789"> 68 - Al Qalam القلم</option>
				<option value="793"> 69 - Al Haaqqah الحاقة</option>
				<option value="796"> 70 - Al Ma'aarij المعارج</option>
				<option value="799"> 71 - Nooh نوح</option>
				<option value="802"> 72 - Al Jinn الجن</option>
				<option value="805"> 73 - Al Muzzammil المزمل</option>
				<option value="807"> 74 - Al Muddaththir المدثر</option>
				<option value="810"> 75 - Al Qiyaamah القيامة</option>
				<option value="812"> 76 - Al Insaan الانسان</option>
				<option value="815"> 77 - Al Mursalaat المرسلات</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 30">
				<option value="818"> 78 - An Naba النبإ</option>
				<option value="819"> 79 - Al Naazi'aat النازعات</option>
				<option value="821"> 80 - 'Abasa عبس</option>
				<option value="823"> 81 - At Takwir التكوير</option>
				<option value="824"> 82 - Al Infitaar الإنفطار</option>
				<option value="825"> 83 - Al Mutaffifin المطففين</option>
				<option value="827"> 84 - Al Inshiqaaq الإنشقاق</option>
				<option value="828"> 85 - Al Burooj البروج</option>
				<option value="829"> 86 - At Taariq الطارق</option>
				<option value="830"> 87 - Al A'laa الأعلى</option>
				<option value="831"> 88 - Al Ghaashiyah الغاشية</option>
				<option value="832"> 89 - Al Fajr الفجر</option>
				<option value="833"> 90 - Al Balad البلد</option>
				<option value="835"> 91 - Ash Shams الشمس</option>
				<option value="836"> 92 - Al Lail الليل</option>
				<option value="837"> 93 - Ad Dhuhaa الضحى</option>
				<option value="837"> 94 - Ash Sharh الشرح</option>
				<option value="838"> 95 - At Tin التين</option>
				<option value="838"> 96 - Al Alaq العلق</option>
				<option value="839"> 97 - Al Qadr القدر</option>
				<option value="839"> 98 - Al Bayyinah البينة</option>
				<option value="840"> 99 - Az Zalzalah الزلزلة</option>
				<option value="841"> 100 - Al 'Aadiyaat العاديات</option>
				<option value="842"> 101 - Al Qaari'ah القارعة</option>
				<option value="842"> 102 - At Takaathur التكاثر</option>
				<option value="843"> 103 - Al Asr العصر</option>
				<option value="843"> 104 - Al Humazah الهمزة</option>
				<option value="843"> 105 - Al Fil الفيل</option>
				<option value="844"> 106 - Quraish قريش</option>
				<option value="844"> 107 - Al Maa'un الماعون</option>
				<option value="845"> 108 - Al Kawthar الكوثر</option>
				<option value="845"> 109 - Al Kaafiroon الكافرون</option>
				<option value="845"> 110 - An Nasr النصر</option>
				<option value="846"> 111 - Al Masad المسد</option>
				<option value="846"> 112 - Al Ikhlaas الإخلاص</option>
				<option value="846"> 113 - Al Falaq الفلق</option>
				<option value="847"> 114 - An Naas الناس</option>
			</optgroup>
		</select>
		
		<!-- <br/> -->
		
		<!-- CHOIX DU SIPARAH -->
		<select id="selectSIPARAH" name="selectSIPARAH" onchange="selectQUART(this.selectedIndex,1,'${moushaf}','${type}');"> 
		<option value="" selected disabled >  ${tabloLang.siparah} n°</option>
			<optgroup label="${tabloLang.siparah} 01 ⮕ 09">
				<option value="1">  1 ・ الٓمٓ   </option>
				<option value="28">  2 ・  سَيَقُولُ  </option>
				<option value="56">  3 ・ تِلْكَ ٱلرُّسُلُ  </option>
				<option value="84">  4 ・ لَن تَنَالُوا۟  </option>
				<option value="112">  5 ・  وَٱلْمُحْصَنَـٰتُ  </option>
				<option value="140">  6 ・  لَّا يُحِبُّ  </option>
				<option value="168">  7 ・ وَإِذَا سَمِعُوا۟ </option>
				<option value="196">  8 ・  وَلَوْ أَنَّنَا  </option>
				<option value="224">  9 ・  قَالَ ٱلْمَلَأُ </option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 10 ⮕ 19">
				<option value="252">  10 ・  وَٱعْلَمُوٓا۟ </option>
				<option value="280">  11 ・ يَعْتَذِرُونَ </option>
				<option value="308">  12 ・  وَمَا مِن دَآبَّةٍۢ </option>
				<option value="336">  13 ・  وَمَآ أُبَرِّئُ </option>
				<option value="365">  14 ・  رُّبَمَا يَوَدُّ </option>
				<option value="392">  15 ・ سُبْحَـٰنَ ٱلَّذِىٓ </option>
				<option value="420">  16 ・  قَالَ أَلَمْ </option>
				<option value="448">  17 ・ ٱقْتَرَبَ لِلنَّاسِ </option>
				<option value="476">  18 ・ قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ </option>
				<option value="504">  19 ・  وَقَالَ ٱلَّذِينَ </option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 20 ⮕ 30">
				<option value="532">  20 ・ أَمَّنْ خَلَقَ </option>
				<option value="558">  21 ・  ٱتْلُ مَآ </option>
				<option value="586">  22 ・ وَمَن يَقْنُتْ </option>
				<option value="612">  23 ・  وَمَا لِىَ لَآ </option>
				<option value="640">  24 ・  فَمَنْ أَظْلَمُ </option>
				<option value="666">  25 ・  إِلَيْهِ يُرَدُّ </option>
				<option value="696">  26 ・ حمٓ </option>
				<option value="726">  27 ・  قَالَ فَمَا </option>
				<option value="756">  28 ・ قَدْ سَمِعَ ٱللَّهُ </option>
				<option value="786">  29 ・ تَبَـٰرَكَ ٱلَّذِى </option>
				<option value="818">  30 ・ عَمَّ يَتَسَآءَلُونَ </option>
			</optgroup>
		</select>
		
		<!-- CHOIX DU QUART -->
		<select id="selectQUART" name="selectQUART" onchange="selectQUART(document.getElementById('selectSIPARAH').selectedIndex,this.value,'${moushaf}','${type}');" disabled> 
		<option value="" selected disabled>${tabloLang.quart['titre']}  ⁄₄</option>
			<option value="1" > ${tabloLang.quart['1']}  ⁄₄</option>
			<option value="2"> ${tabloLang.quart['2']}  ⁄₄</option>
			<option value="3"> ${tabloLang.quart['3']}  ⁄₄</option>
			<option value="4"> ${tabloLang.quart['4']}  ⁄₄</option>
		</select>
		`;
		
		
	}
	
	if (id_div === 'selectLecture')
	{
		htmlAff = `<select id="selectAUDIO" name="selectAUDIO" onchange="choixAUDIO(this.value);" > 
		<option value=""  disabled selected>🎧  ${tabloLang.typeAudio['ecouter']}... </option>
			<option value="Page" > ${tabloLang.typeAudio['page']} </option>
			<option value="Quart" disabled > ${tabloLang.typeAudio['quart']}  </option>
			<!-- <option value="Sourah" disabled> ${tabloLang.typeAudio['sourate']}  ⏱</option> -->
			<!-- <option value="Sipara" disabled> ${tabloLang.typeAudio['sipara']}  ⏱</option> -->
		</select>
		
		<!-- <div id="blockAudio" style="visibility:hidden"> -->
		<!-- Écouter le quart par  -->
		<select id="selectQari" name="selectQari" onchange="choixQari(this.value,document.getElementById('selectAUDIO').value,'${moushaf}');" disabled>
		<option value=""  disabled selected>🗣 ${tabloLang.recitateur} </option>
			<option value="Abu%20Bakr%20al%20Shatri%20" >A. Bakr Chatri</option>
			<!-- <option value="Essack"> Ayoub Essack (Tarawîh)</option> -->
			<!-- <option value="Balilah"> Bandar Balîlah </option> -->
			<!-- <option value="Hindawi"> H. R. Al Hindawi </option> -->
			<option value="Mahmoud%20Khalil%20al%20Hussary%20"> M. K. Al Houssary</option>
			<option value="Maher%20al%20Muaiqly%20"> Mahir Al Mou'ayqli </option>
			<!-- <option value="Mouhaysni"> M. Al Mouhaysni (rapide)</option> -->
			<!-- <option value="Qatami"> Nassîr Al Qatami (lent)</option> -->
			<option value="Saad%20al%20Ghamdi%20"> Saad Al Ghamdi </option>
			<!-- <option value="Chouraym"> Sa'oud Al Chouraym (rapide)</option> -->
			<!-- <option value="Dossari"> Yassir Al Dossari (lent)</option> -->
		</select>	
		
		<div id="paramAudio" class="nonvisiblemaispresent">
			<p id="vitesseAudio" >
			<!--	<span class="material-icons">speed</span> -->
			${tabloLang.vitesse} x<span id="nbVitesseLecture">1</span>
				<input class="mdl-slider mdl-js-slider" type="range" id="vitesseLecture" min="0.75" max="2" value="1" step="0.25">
			</p>
		
					<!-- BOUTON play/pause AUDIO -->
			<span class="mdl-chip mdl-chip--contact mdl-chip--deletable">
				<!-- <img class="mdl-chip__contact" src="../images/favicon.png"></img> -->
				<a href="#" onclick="playPause(document.getElementById('audioQari'))" style="color:initial;">
					<span class="material-icons-round mdl-chip__contact mdl-color--teal">play_arrow</span>
					<span class="mdl-chip__text">Play &nbsp;	&nbsp;</span>
					</a>
			</span>
			<span class="mdl-chip__action " onclick="choixQari(document.getElementById('selectQari').value,document.getElementById('selectAUDIO').value,'${moushaf}','reset');">
					<span class="material-icons-round">restart_alt</span>
			</span>
		</div>	
		
			<audio  id="audioQari" preload="auto"> <!-- preload="none" -->	<source src="" type="audio/mp3" >		</audio>

	`;
	
	}
	
	
	if (id_div === 'parametres')
	{

		htmlAff = ` <!-- PARAMETRES -->
		`;
		
		if (type ==='2p')
		{
			htmlAff += `<button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="javascript:changeZOOM('moins');" >
					<i class="material-icons zoomIcon"> zoom_out </i>
				</button> 
				`;
		}
		
		htmlAff +=`
			<button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="javascript:toggleFullScreen();">
				<i class="icon material-icons" style="color:red;">fullscreen</i> ${tabloLang.parametres['pleinecran']}
			</button> 
			
			<button class="mdl-button mdl-js-button mdl-js-ripple-effect"  id="modeNuit" >
				<span class="icon material-icons" >settings_brightness</span>
				<span class="mdl-tooltip mdl-tooltip--large" data-mdl-for="modeNuit" >${tabloLang.parametres['nuit']}</span>
			</button> 
		`;
		
		// bouton d'orientation
		if ( moushaf !== '13lsabah' || moushaf !== '13lsabah_aim' || moushaf !== '13ltrois' )
		{
			// alert("ok");
			htmlAff +=`
			<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" style="display:initial;vertical-align: text-bottom;margin-inline: 1rem;" onclick="window.location.href='${aRemplacer}.html?&lang=${langChoisie}' " id="orientation">
				<input type="checkbox" class="mdl-switch__input" `;
			
			if (type ==='2p')
				htmlAff += `checked`;
			
			htmlAff +=`
			> 
			</label>
			&nbsp;<span class="icon material-icons"      style="color: darkblue;" onclick="window.location.href='${aRemplacer}.html' ">screen_lock_rotation</span>
					<span class="mdl-tooltip mdl-tooltip--large" data-mdl-for="orientation" >${tabloLang.parametres['sd']}</span>
			`;
			
		}
		
		if (type ==='2p')
		{
			htmlAff += `<button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="javascript:changeZOOM('plus');" >
					<i class="material-icons zoomIcon"> zoom_in </i>
				</button> 
				`;
		}	
		
		htmlAff += `
					<!-- Right aligned menu below button -->
			<button id="options"		class="mdl-button mdl-js-button mdl-button--icon">
			  <i class="material-icons">more_vert</i>
			</button>
		`;
		if (type === '2p')
				htmlAff+= `<ul class="mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect"	data-mdl-for="options">` ;
		else if (type === '1p')
				htmlAff+=`<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"	data-mdl-for="options">`;
			
		htmlAff += `
		<div id="conteneur"></div>
			<li  class="mdl-menu__item" onclick="zoomPlus();" > ${tabloLang.parametres['zoom']}
			  	<span class="icon material-icons">zoom_in</span>
			</li>
			  <li  class="mdl-menu__item" onclick="boutonPartager();" > ${tabloLang.parametres['partager']}
			  	<span  class="icon material-icons" style="color:dimgrey;">share&nbsp;</span>
				</li>
			  <li  class="mdl-menu__item" onclick="window.location.href='https://wa.me/262692220786?text=Assalamou%27alaykoum,%0a%20A%20propos%20de%20quran.re:%0a' ">${tabloLang.parametres['erreur']}</li>
			  <!-- <li disabled class="mdl-menu__item">Partager l'image</li> -->
			  <!-- <li class				="mdl-menu__item">Écouter plus de lecteurs</li> -->
			</ul>
		</div>
		`;
		
	}
	
	
	if (id_div === 'moushafdouble')
	{
		let numeroPremierePage ;
		let srcImages = 'images/';
		let extensionImage ;
		
		// Pour accélerer le chargement de la page et éviter de charger tout le temps les pages 2 à 6
		if (window.location.href.includes("page=") === true)
		{
			numeroPremierePage = '';
			srcImages = '';
			extensionImage = '';
		}
		else
		{
		
			switch(moushaf)
			{
				case '13lclassic':
											numeroPremierePage=2;
											extensionImage= ').png';
											srcImages += 'quran13lclassic/quran13lclassic (';
											break;
				case '13lcolored':
											numeroPremierePage=2;
											extensionImage= ').png';
											srcImages += 'quran13lcolored/quran13lcolored (';
											break;
				case '13lvert':
											numeroPremierePage=2;
											extensionImage= ').png';
											srcImages += 'quran13lvert/quran13lvert (';
											break;
				case '13lqc':
											numeroPremierePage=1;
											extensionImage= ').png';
											//srcImages += 'quran13lQC/quran13lQC (';
											srcImages = 'https://mufradat.fr/quran/images/quran13lQC/quran13lQC (';
											break;
				case '13l':
											numeroPremierePage=1;
											extensionImage= ').jpg';
											srcImages += 'quran13l/quran13l (';
											break;
				case '13lenglish':
											numeroPremierePage=2;
											extensionImage= ').png';
											srcImages += 'quran13lenglish/quran13lenglish (';
											break;
				
			}
		}
		
		htmlAff = `
			<img id="pageAffichee2" oncontextmenu="return false;" class="imagePAYSAGE" src="${srcImages}${numeroPremierePage+1}${extensionImage}" alt="${numeroPremierePage}" />	
			<div class="shadow"></div>
			<img id="pageAffichee" oncontextmenu="return false;" class="imagePAYSAGE" src="${srcImages}${numeroPremierePage}${extensionImage}" alt="${numeroPremierePage}" />	
			
			<!-- En CACHE -->
			<img id="pageCachee2" src="${srcImages}${numeroPremierePage+3}${extensionImage}" alt="imagecache" hidden />
			<img id="pageCachee" src="${srcImages}${numeroPremierePage+2}${extensionImage}" alt="imagecache" hidden />
			<img id="pageCachee4" src="${srcImages}${numeroPremierePage+5}${extensionImage}" alt="imagecache" hidden />
			<img id="pageCachee3" src="${srcImages}${numeroPremierePage+4}${extensionImage}" alt="imagecache" hidden />
			<!-- \\ En CACHE //-->
				
			 <!-- LES BOUTONS DE NAVIGATION ENTRE LES PAGES -->
			<button type="button" name="boutonSUIVANT" id="boutonSUIVANT" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  onclick="ChangementPage('suiv','${moushaf}','2p')" >
			  <i class="material-icons">west</i></button>
			<button type="button" name="boutonPRECEDENT"  id="boutonPRECEDENT"  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " onclick="ChangementPage('prec','${moushaf}','2p')">
			  <i class="material-icons">east</i></button>
			 <!-- \\ LES BOUTONS DE NAVIGATION ENTRE LES PAGES //-->
		`;
	}
	
	if (id_div === 'footer')
	{
			
			htmlAff = `
		   <div class="mdl-mega-footer__middle-section">

    <div class="mdl-mega-footer__drop-down-section">
      <input class="mdl-mega-footer__heading-checkbox" type="checkbox" checked>
      <h1 class="mdl-mega-footer__heading">	<i class="material-icons">widgets</i> ${tabloLang.footer['outils']} </h1>
      <ul class="mdl-mega-footer__link-list">
						<li><a href="https://memoquran.fr">🧠 MemoQuran </a></li>
					  <li><a href="https://roukou.memoquran.fr">🎧 Audio Roukou </a></li>
					  <li><a href="https://quran.re/13l/lpl.html">🪜 ${tabloLang.footer['lpl']} </a></li>
      </ul>
    </div>


    <div class="mdl-mega-footer__drop-down-section">
      <input class="mdl-mega-footer__heading-checkbox" type="checkbox" checked>
      <h1 class="mdl-mega-footer__heading"><i class="material-icons">g_translate</i> ${tabloLang.footer['langues']} </h1>
      <ul class="mdl-mega-footer__link-list">
        <li><a href="?lang=fr">Français</a></li>
        <li><a href="?lang=en">English</a></li>
        <li><a href="?lang=ar">عربي</a></li>
        <li><a href="?lang=ur">Urdu</a></li>
      </ul>
    </div>

  </div>

  <div class="mdl-mega-footer__bottom-section">
    <div class="mdl-logo"><i class="material-icons"> contact_support </i> ${tabloLang.footer['Apropos']} </div>
    <ul class="mdl-mega-footer__link-list">
      <li><a href="https://bit.ly/m/baraw">Contact</a></li>
      <li><a href="#">${tabloLang.footer['ml']}</a></li>
      <li><a href="https://bit.ly/barawpaypal">Paypal</a></li>
    </ul>
  </div>
		  `;
	}
	
	
	if (id_div === 'landscapeIcon')
	{
		
		htmlAff = `<span> ↻ </span>
	<br><br> ${tabloLang.msgOrientation['1']} <b>${tabloLang.msgOrientation['2']} 	<i class="material-icons"> stay_primary_landscape </i></b> ${tabloLang.msgOrientation['3']} 
	<br>${tabloLang.msgOrientation['4']} "<a href="${aRemplacer}.html">${tabloLang.msgOrientation['5']}.</a>"
	`;
		
	}
	
	
	return htmlAff;
}
