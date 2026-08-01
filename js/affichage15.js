/*

	Réccurence des différentes pages affichées ici

	Avril 2024
*/

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
				"footer": {	"outils": "NOS OUTILS",	"tous":"🧠 Apps liés au Qourân ", "lpl": "Ligne par ligne",	"langues": "LANGUES", "Apropos": "À propos", "ml": "Mentions légales"},
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
				"footer": {"outils": "OUR APPS",	"tous":"🧠 Other quranic tools ","lpl": "Line by line",	"langues": "LANGUAGES", "Apropos": "About Us","ml": "Legal terms"},
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
				"footer": {"outils": "تطبيقاتنا",	"tous":"🧠 Other quranic tools ","lpl": "سطراً سطراً",	"langues": "اللغات", "Apropos": "معلومات عنا","ml": "مصطلحات قانونية"},
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
				"footer": {"outils": "ہماری ایپس",	"tous":"🧠 Other quranic tools ","lpl": "لائن فی لائن",	"langues": "زبانیں", "Apropos": "ہمارے بارے میں","ml": "قانونی شرائط"},
				"msgOrientation": {	"1": "اپنے موبائل کو ", "2": "LANDSCAPE", "3": "'ڈبل پیج' موڈ کو صحیح طریقے سے دکھانے کے لیے۔", "4": "بصورت دیگر، واپس جائیں" , "5" : "سنگل پیج موڈ"},
				"orientation": "براہ کرم اپنے آلے کو لینڈ اسکیپ موڈ میں پلٹائیں۔",
				"toast": { "play": "تلاوت چل رہا ہے...", "pause": "تلاوت موقوف!", "reset": "تلاوت کرنے والے اور پڑھنے والے حصے کو اپ ڈیٹ کیا گیا۔"	},
				"quiraate_prevention":	{	'msg': 'پڑھنے کی تفریق کے یہ اشارے مختصر ہیں، مکمل نہیں اور ممکنہ طور پر غلط ہیں۔ تلاوت کرنے سے پہلے ہمیشہ ماہر قاری یا حوالہ کتاب سے رجوع کریں', 'lien1': 'غلطی کی اطلاع دیں', 'lien2': 'اورجانیے', },
			  },
}

function affichageHTML(id_div,moushaf,type,aRemplacer)
{
	let htmlAff;
	let tabloLang = languesStock[langChoisie];
	// console.log('mi lé la'+langChoisie);
	
	if (id_div === 'header' || id_div === 'drawer')
	{
		if (id_div === 'header')
		{
				htmlAff = `<div class="mdl-layout-icon" ></div>
				<div class="mdl-layout__header-row">
				`;
				
				if (type === '2p15l')
						htmlAff += `<span class="mdl-layout__title"> ${tabloLang.moushaf} 15L -  📖</span>`; // ${tabloLang.typePage["2"]}
				else
						htmlAff += `<span class="mdl-layout__title"> ${tabloLang.moushaf} 15L -  📄</span>`; //${tabloLang.typePage["1"]}
				
				htmlAff+=`
				<div class="mdl-layout-spacer"></div>
			  `;
			
		}
		
		else if (id_div === 'drawer')
			htmlAff =` 
		<span class="mdl-layout__title" id="navBar" data-menu="${aRemplacer}">${tabloLang.moushaf} 15L</span> 
		<span style="text-align:center;">			www.quran.re 	</span>	`;
		
		if (type === '2p15l')
		{
			htmlAff += `
				<nav class="mdl-navigation">
						<a class="mdl-navigation__link" href="index.html?&lang=${langChoisie}" style="background-color:#8080804f;"><i class="material-icons" style="color:black;">description</i> 15L </a>
						<a class="mdl-navigation__link" href="2p15ltadjwid.html?&lang=${langChoisie}" ><i class="material-icons" style="color:blue;">menu_book</i>  ${tabloLang.onglets['taj']} </a>
						<a class="mdl-navigation__link" href="2p15lvert.html?&lang=${langChoisie}" ><i class="material-icons" style="color:green;">menu_book</i>   Deeniyat</a>
						<a class="mdl-navigation__link" href="2p15lsimple.html?&lang=${langChoisie}"><i class="material-icons" style="color:black;">menu_book</i>  ${tabloLang.onglets['simple']}</a>
						<a class="mdl-navigation__link" href="2p15lqc.html?&lang=${langChoisie}"><i class="material-icons" style="color:white;">menu_book</i>   QC</a>
						<a class="mdl-navigation__link" href="2p15lenglish.html?&lang=${langChoisie}"><i class="material-icons" style="color:magenta;">description</i>   English</a>
						<a class="mdl-navigation__link" href="sabah.html?&lang=${langChoisie}"><span class="material-symbols-outlined" style="color:blue;">counter_7</span>  Q. Sab'ah</a>
						<a class="mdl-navigation__link" href="thalathah.html?&lang=${langChoisie}"><span class="material-symbols-outlined" style="color:orange;">counter_3</span>  Q. Thalatha</a>
						 <a class="mdl-navigation__link" href="../15L/2p15l15lmadinah_indopak.html?&lang=${langChoisie}"  ><i class="material-icons" style="color:red;">double_arrow</i>15L</a>
				</nav>
				`;
		}
		else
		{
				htmlAff += `
				<nav class="mdl-navigation" >
				<a class="mdl-navigation__link" href="index.html?&lang=${langChoisie}"><i class="material-icons" style="color:black;">description</i> 15L Indopak </a>
				<a class="mdl-navigation__link" href="15lmadinah.html?&lang=${langChoisie}" ><i class="material-icons" style="color:yellow;">description</i>  15L Madinah </a>
				<a class="mdl-navigation__link" href="15ltadjwid.html?&lang=${langChoisie}" ><i class="material-icons" style="color:blue;">description</i> 15L ${tabloLang.onglets['taj']} </a>
				<a class="mdl-navigation__link" href="15lvert.html?&lang=${langChoisie}" ><i class="material-icons" style="color:green;">description</i> 15L Deeniyat</a>
				<a class="mdl-navigation__link" href="15ldigital.html?&lang=${langChoisie}"><i class="material-icons" style="color:black;">description</i> 15L Digital</a>
				 <a class="mdl-navigation__link" href="../13L/index.html?&lang=${langChoisie}"  ><i class="material-icons" style="color:red;">double_arrow</i>13L</a>
				</nav>
				`;
		}
			
		if (id_div === 'header')
		{
			htmlAff += '</div>';
			// TITRE (a compléter)
			document.querySelector('title').textContent = languesStock[langChoisie].titre + ' ' +moushaf;
		}
		
		
	}

	// SOURATE DJOUZ QUART
	if ( id_div === 'selectSDQ' )
	{
		if (type !== '2p15l')
			type === '';
		
		
		htmlAff = `
			
		<!-- CHOIX DE LA SOURATE -->
		<select id="selectSOURATE" name="selectSOURATE" onchange="affichagePage('sourate',this.value,'${moushaf}','${type}',this.selectedIndex);" >
		<option value="" selected disabled > ${tabloLang.sourah} </option>
		<optgroup label="${tabloLang.siparah} 01 ⮕ 04">
			<option value="2"> 1 - Al Fatihah الفاتحة </option>
			<option value="3"> 2 - Al Baqarah البقرة</option>
			<option value="51"> 3 - Al Imran آل عمران</option>
			<option value="78"> 4 - An Nisaa النساء</option>
		</optgroup>
			<optgroup label="${tabloLang.siparah} 05 ⮕ 09">
				<option value="107"> 5 - Al Maaidah المائدة</option>
				<option value="129"> 6 - Al An'aam الأنعام</option>
				<option value="152"> 7 - Al A'raaf الأعراف</option>
				<option value="178"> 8 - Al Anfaal الأنفال</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 10 ⮕ 14">
				<option value="188"> 9 - At Tawbah التوبة</option>
				<option value="209"> 10 - Yunus يونس</option>
				<option value="222"> 11 - Hud هود</option>
				<option value="236"> 12 - Yusuf يوسف</option>
				<option value="250"> 13 - Ar Ra'd الرعد</option>
				<option value="256"> 14 - Ibrahim ابراهيم</option>
				<option value="262"> 15 - Al Hijr الحجر</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 15 ⮕ 19">	
				<option value="268"> 16 - An Nahl النحل</option>
				<option value="283"> 17 - Al Israa الإسراء - Banî Israîl</option>
				<option value="294"> 18 - Al Kahf الكهف</option>
				<option value="306"> 19 - Al Maryam مريم</option>
				<option value="313"> 20 - Taa-Haa طه</option>
				<option value="323"> 21 - Al Anbiyaa الأنبياء</option>
				<option value="332"> 22 - Al Hajj الحج</option>
				<option value="343"> 23 - Al Muminoon المؤمنون</option>
				<option value="351"> 24 - Al Noor النور</option>
				<option value="360"> 25 - Al Furqaan الفرقان</option>
				<option value="367"> 26 - Al Shu'araa الشعراء</option>
				<option value="377"> 27 - Al Naml النمل</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 20 ⮕ 24">
				<option value="382"> 28 - Al Qasas القصص</option>
				<option value="397"> 29 - Al 'Ankaboot العنكبوت</option>
				<option value="405"> 30 - Ar Room الروم</option>
				<option value="412"> 31 - Luqman لقمان</option>
				<option value="416"> 32 - As Sajdah السجدة</option>
				<option value="419"> 33 - Al Ahzaab الأحزاب</option>
				<option value="429"> 34 - Saba سبإ</option>
				<option value="435"> 35 - Faatir فاطر</option>
				<option value="441"> 36 - Yaseen يس</option>
				<option value="446"> 37 - As Saaffaat الصافات</option>
				<option value="453"> 38 - Saad ص</option>
				<option value="459"> 39 - Az Zumar الزمر</option>
				<option value="467"> 40 - Al Ghaafir غافر | Al Mumin</option>
				<option value="478"> 41 - Fussilat فصلت | Ha-mîm Sadjdah</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 25 ⮕ 28">
				<option value="484"> 42 - Ash Shura الشورى</option>
				<option value="490"> 43 - Az Zukhruf الزخرف</option>
				<option value="496"> 44 - Ad Dukhaan الدخان</option>
				<option value="499"> 45 - Al Jaathiyah الجاثية</option>
				<option value="503"> 46 - Al Ahqaf الأحقاف</option>
				<option value="508"> 47 - Muhammad محمد</option>
				<option value="512"> 48 - Al Fath الفتح</option>
				<option value="516"> 49 - Al Hujuraat الحجرات</option>
				<option value="519"> 50 - Qaaf ق</option>
				<option value="521"> 51 - Ad Dhaariyat الذاريات</option>
				<option value="524"> 52 - At Tur الطور</option>
				<option value="527"> 53 - An Najm النجم</option>
				<option value="529"> 54 - Al Qamar القمر</option>
				<option value="532"> 55 - Al Rahmaan الرحمن</option>
				<option value="535"> 56 - Al Waaqiah الواقعة</option>
				<option value="538"> 57 - Al Hadid الحديد</option>
				<option value="543"> 58 - Al Mujaadilah المجادلة</option>
				<option value="546"> 59 - Al Hashr الحشر</option>
				<option value="550"> 60 - Al Mumtahanah الممتحنة</option>
				<option value="552"> 61 - As Saff الصف</option>
				<option value="554"> 62 - Al Jumu'a الجمعة</option>
				<option value="555"> 63 - Al Munaafiqoon المنافقون</option>
				<option value="557"> 64 - At Taghaabun التغابن</option>
				<option value="559"> 65 - At Talaaq الطلاق</option>
				<option value="561"> 66 - At Tahrim التحريم</option>
				</optgroup>
			<optgroup label="${tabloLang.siparah} 29">
				<option value="563"> 67 - Al Mulk الملك</option>
				<option value="565"> 68 - Al Qalam القلم</option>
				<option value="568"> 69 - Al Haaqqah الحاقة</option>
				<option value="570"> 70 - Al Ma'aarij المعارج</option>
				<option value="572"> 71 - Nooh نوح</option>
				<option value="574"> 72 - Al Jinn الجن</option>
				<option value="577"> 73 - Al Muzzammil المزمل</option>
				<option value="579"> 74 - Al Muddaththir المدثر</option>
				<option value="581"> 75 - Al Qiyaamah القيامة</option>
				<option value="583"> 76 - Al Insaan الانسان</option>
				<option value="585"> 77 - Al Mursalaat المرسلات</option>
			</optgroup>
			<optgroup label="${tabloLang.siparah} 30">
				<option value="587"> 78 - An Naba النبإ</option>
				<option value="588"> 79 - Al Naazi'aat النازعات</option>
				<option value="590"> 80 - 'Abasa عبس</option>
				<option value="591"> 81 - At Takwir التكوير</option>
				<option value="592"> 82 - Al Infitaar الإنفطار</option>
				<option value="593"> 83 - Al Mutaffifin المطففين</option>
				<option value="595"> 84 - Al Inshiqaaq الإنشقاق</option>
				<option value="596"> 85 - Al Burooj البروج</option>
				<option value="597"> 86 - At Taariq الطارق</option>
				<option value="598"> 87 - Al A'laa الأعلى</option>
				<option value="598"> 88 - Al Ghaashiyah الغاشية</option>
				<option value="599"> 89 - Al Fajr الفجر</option>
				<option value="601"> 90 - Al Balad البلد</option>
				<option value="601"> 91 - Ash Shams الشمس</option>
				<option value="602"> 92 - Al Lail الليل</option>
				<option value="603"> 93 - Ad Dhuhaa الضحى</option>
				<option value="603"> 94 - Ash Sharh الشرح</option>
				<option value="604"> 95 - At Tin التين</option>
				<option value="604"> 96 - Al Alaq العلق</option>
				<option value="605"> 97 - Al Qadr القدر</option>
				<option value="605"> 98 - Al Bayyinah البينة</option>
				<option value="606"> 99 - Az Zalzalah الزلزلة</option>
				<option value="606"> 100 - Al 'Aadiyaat العاديات</option>
				<option value="607"> 101 - Al Qaari'ah القارعة</option>
				<option value="607"> 102 - At Takaathur التكاثر</option>
				<option value="608"> 103 - Al Asr العصر</option>
				<option value="608"> 104 - Al Humazah الهمزة</option>
				<option value="608"> 105 - Al Fil الفيل</option>
				<option value="609"> 106 - Quraish قريش</option>
				<option value="609"> 107 - Al Maa'un الماعون</option>
				<option value="609"> 108 - Al Kawthar الكوثر</option>
				<option value="609"> 109 - Al Kaafiroon الكافرون</option>
				<option value="610"> 110 - An Nasr النصر</option>
				<option value="610"> 111 - Al Masad المسد</option>
				<option value="610"> 112 - Al Ikhlaas الإخلاص</option>
				<option value="611"> 113 - Al Falaq الفلق</option>
				<option value="611"> 114 - An Naas الناس</option>
			</optgroup>
			</select>
		
		<!-- <br/> -->
		
		
		<!-- CHOIX DU VERSET -->
		<input type="number" id="numVERSET" name="numVERSET" min="1" max="286" value=""  placeholder="1 ⮕ 7" style="padding:1em;" onchange="affichagePage('verset',this.value,'${moushaf}',' ',(document.getElementById('selectSOURATE').selectedIndex)+1);" >
		<br/> 
		
		
		<!-- CHOIX DU SIPARAH -->
		<select id="selectSIPARAH" name="selectSIPARAH" onchange="affichagePage('siparah',this.value,'${moushaf}','');"> 
		<option value="" selected disabled >  ${tabloLang.siparah} n°</option>
			<optgroup label="Siparahs 01 ⮕ 09">
				<option value="2">   01. "Alif Lâm Mîm"</option>
				<option value="23">  02. "Sayaqoul" </option>
				<option value="43">  03. </option>
				<option value="63"> 04.</option>
				<option value="83">  05. </option>
				<option value="103">  06. </option>
				<option value="123">  07. </option>
				<option value="143">  08. </option>
				<option value="163">  09. </option>
			</optgroup>
			<optgroup label="Siparahs 10 ⮕ 19">
				<option value="183">  10. </option> 
				<option value="203">  11. </option> 
				<option value="223">  12. </option> 
				<option value="243">  13. </option> 
				<option value="263">  14. </option> 
				<option value="283">  15. </option> 
				<option value="303">  16. </option> 
				<option value="323">  17. </option> 
				<option value="343">  18. </option> 
				<option value="363">  19. </option> 
			</optgroup>
			<optgroup label="Siparahs 20 ⮕ 30">
				<option value="383">  20. </option> 
				<option value="403">  21. </option> 
				<option value="423">  22. </option> 
				<option value="443">  23. </option> 
				<option value="463">  24. </option> 
				<option value="483">  25. </option> 
				<option value="503">  26. </option> 
				<option value="523">  27. </option> 
				<option value="543">  28. </option> 
				<option value="563">  29. </option> 
				<option value="587">  30. </option> 
			</optgroup>
		</select>
		
		<!-- CHOIX DU QUART -->
		<select id="selectQUART" name="selectQUART" onchange="selectQUART(document.getElementById('selectSIPARAH').selectedIndex,this.value,'${moushaf}','');" disabled style="width:100px;"> 
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
		
		if (type ==='double')
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
		if ( moushaf !== '13lsabah' && moushaf !== '13ltrois' )
		{
			// alert("ok");
			htmlAff +=`
			<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" style="display:initial;vertical-align: text-bottom;margin-inline: 1rem;" onclick="window.location.href='${aRemplacer}.html?&lang=${langChoisie}' " id="orientation">
				<input type="checkbox" class="mdl-switch__input" `;
			
			if (type ==='double')
				htmlAff += `checked`;
			
			htmlAff +=`
			> 
			</label>
			&nbsp;<span class="icon material-icons"      style="color: darkblue;" onclick="window.location.href='${aRemplacer}.html' ">screen_lock_rotation</span>
					<span class="mdl-tooltip mdl-tooltip--large" data-mdl-for="orientation" >${tabloLang.parametres['sd']}</span>
			`;
			
		}
		
		if (type ==='double')
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
		if (type === 'double')
				htmlAff+= `<ul class="mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect"	data-mdl-for="options">` ;
		else if (type === 'simple')
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
	
	if (id_div === 'boutonsPC')
	{
		htmlAff = `
			<a href="#" onclick="ChangementPage('suiv','${moushaf}')" >
				<button  id="bSuivant" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect " >
					<i class="material-icons" style="color:blue">west</i>
				</button>	
				</a>
				
				<a href="#" onclick="ChangementPage('prec','${moushaf}')" >
				<button  id="bPrecedent" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect " >
				<i class="material-icons" style="color:red">east</i>
				</button>	
				</a>
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
			<button type="button" name="boutonSUIVANT" id="boutonSUIVANT" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  onclick="ChangementPage('suiv','${moushaf}','2p15lages')" >
			  <i class="material-icons">west</i></button>
			<button type="button" name="boutonPRECEDENT"  id="boutonPRECEDENT"  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " onclick="ChangementPage('prec','${moushaf}','2p15lages')">
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
						<li><a href="https://quran.re/app.html?&lang=${langChoisie}">${tabloLang.footer['tous']} </a></li>
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
	
	 <div class="mdl-mega-footer__drop-down-section">
      <input class="mdl-mega-footer__heading-checkbox" type="checkbox" checked>
      <h1 class="mdl-mega-footer__heading"><i class="material-icons">book</i> MOUSHAF </h1>
      <ul class="mdl-mega-footer__link-list">
	  <li><select name="choixMOUSHAF" onchange="location = this.value;"> 
			<option selected disabled> All Masâhif </option>
				<optgroup label=" 13L → INDOPAK ">
					<option value="13l/simple.html"> 13L | Simple</option>
					<option value="13l/index.html"> 13L | Tadjwîd (coloré)</option>
					<option value="13l/vert.html"> 13L | Deeniyat (vert)</option>
					<option value="13l/qc.html"> 13L | Qoudratoullah Co</option>
					<option value="13l/qc.html"> 13L | Qiraat Sab'ah (7)</option>
					<option value="13l/qc.html"> 13L | Qiraat Thalathah (3)</option>
				</optgroup>
				
				<optgroup label=" 15L → INDOPAK">
					<option value="15l/15lvert.html"> 15L | Deeniyat (vert)</option>
					<option value="15l/index.html"> 15L | Madinah (bleu/vert)</option>
					<option value="15l/15lmadinah_indopak"> 15L | Tadjwid </option>
				</optgroup>
				
				<optgroup label=" 15L → MADINAH ">
					<option value="15l/15lmadinahHD.html"> 15L | Madinah HD </option>
					<option value="15l/15lmadinah.html"> 15L | Madinah (bleu)</option>
					<option value="15l/"> 15L | Tadjwid - Daroul Ma'rifah</option>
					<option value="15l/"> 15L | Hafs + Abou Dja'far annoté</option>
					<option value="15l/digital.html"> 15L | Digital Quran</option>
				</optgroup>	
			</select></li>
      </ul>
    </div>

  </div>

  <div class="mdl-mega-footer__bottom-section">
    <div class="mdl-logo"><i class="material-icons"> contact_support </i> ${tabloLang.footer['Apropos']} </div>
    <ul class="mdl-mega-footer__link-list">
      <li><a href="https://bit.ly/m/baraw">Contact</a></li>
      <li><a href="#"> ${tabloLang.footer['ml']}</a></li>
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
