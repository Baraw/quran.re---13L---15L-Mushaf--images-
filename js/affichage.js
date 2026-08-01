/**
 * affichage.js (module ES)
 * - Génère le HTML des blocs (header/drawer/selectSDQ/selectLecture/parametres/footer/landscapeIcon/moushafdouble)
 * - Fusion "old" -> "new" : conserve les sorties historiques (sélecteurs, audio, paramètres, footer, etc.)
 *
 * IMPORTANT (timing) :
 * - Les <script> inline (non-module) s'exécutent avant les modules (defer par défaut).
 * - Donc, si tu appelles affichageHTML(...) dans des scripts inline, utilise un bootstrap <script type="module">.
 */

import { config, langChoisie } from './configLoader.js';

/* =========================
   Utils
========================= */

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(s) {
  // pour attributs HTML
  return escapeHtml(s).replaceAll('`', '&#96;');
}

function getTranslations() {
  return (config && config.languages && config.languages[langChoisie]) ? config.languages[langChoisie] : {};
}

function t(path, fallback = '') {
  const dict = getTranslations();
  const parts = String(path).split('.');
  let cur = dict;
  for (const p of parts) {
    cur = cur && typeof cur === 'object' ? cur[p] : undefined;
  }
  if (cur === undefined || cur === null) return fallback || parts[parts.length - 1] || '';
  if (typeof cur === 'string' || typeof cur === 'number') return String(cur);
  return cur; // peut être un objet (ex: quart)
}

function isDoublePage() {
  const u = new URL(window.location.href);
  const qs = u.searchParams.toString();
  // heuristique : tes pages double contiennent souvent "2p" dans le nom, ou un paramètre "type=2p"
  return (
    window.location.pathname.includes('2p') ||
    u.searchParams.get('type') === '2p' ||
    u.searchParams.get('format') === '2p' ||
    qs.includes('2p')
  );
}

function getTabs() {
  // Attendu : config.tabs = [{id: 'taj'}, ...]
  if (Array.isArray(config?.tabs) && config.tabs.length) return config.tabs;
  // fallback raisonnable
  return [{ id: 'taj' }, { id: 'cl' }, { id: 'simple' }];
}

function buildOptionsFromList(list, valueField = 'value', labelField = 'text') {
  if (!Array.isArray(list)) return '';
  return list.map(item => {
    const v = item?.[valueField] ?? item?.value ?? item?.id ?? '';
    const label = item?.[labelField] ?? item?.text ?? item?.name ?? item?.label ?? v;
    return `<option value="${escapeAttr(v)}">${escapeHtml(label)}</option>`;
  }).join('');
}

function getTabOrderFromArg(arg) {
  if (arg === undefined || arg === null) return undefined;
  const n = Number(String(arg).trim());
  return Number.isFinite(n) ? n : undefined;
}

/* =========================
   Public API
========================= */

/**
 * Signature tolérante (compat):
 * - id_div: string
 * - moushafOrType: string (ex: '13lcolored', ou label)
 * - ongletOrMode: string (ex: 'simple')
 * - aRemplacer: string (ex: '2ptadjwid' ou '0')
 * - tabOrder: number optionnel
 */
export function affichageHTML(id_div, moushafOrType = '', ongletOrMode = '', aRemplacer = '', tabOrder = undefined) {
  const translations = getTranslations();
  const tabs = getTabs();
  const activeIndex = (tabOrder !== undefined) ? tabOrder : getTabOrderFromArg(aRemplacer);

  const pageIcon = isDoublePage() ? '📖' : '📄';
  const moushafLabel = moushafOrType ? String(moushafOrType) : '13L';

  /* =========================
     HEADER / DRAWER
  ========================= */
  if (id_div === 'header' || id_div === 'drawer') {
    let html = '';

    if (id_div === 'header') {
      // Header MDL (PC)
      html += `
        <div class="mdl-layout-icon"></div>
        <div class="mdl-layout__header-row">
          <span class="mdl-layout__title">${escapeHtml(t('moushaf', 'Masahif'))} - ${escapeHtml(moushafLabel)} ${pageIcon}</span>
          <div class="mdl-layout-spacer"></div>
      `;
    } else {
      // Drawer (Mobile)
      html += `
        <span class="mdl-layout__title" id="navBar" data-menu="${escapeAttr(aRemplacer)}">
          ${escapeHtml(t('moushaf', 'Masahif'))} ${escapeHtml(moushafLabel)}
        </span>
        <span style="text-align:center;">www.quran.re</span>
      `;
    }

    html += `<nav class="mdl-navigation">`;

    tabs.forEach((tab, index) => {
      const isActive = (activeIndex !== undefined && index === activeIndex) ? 'active' : '';
      const tabId = tab?.id ?? '';
      const tabLabel = (translations?.onglets && translations.onglets[tabId]) ? translations.onglets[tabId] : tabId;
      html += `<a class="mdl-navigation__link ${isActive}" href="${escapeAttr(tabId.replace(/^13l/, ""))}.html?lang=${escapeAttr(langChoisie)}">${escapeHtml(tabLabel)}</a>`;
    });

    html += `</nav>`;

    if (id_div === 'header') html += `</div>`;
    return html;
  }

  /* =========================
     SELECT SDQ (Sourate / Siparah / Quart)
  ========================= */
  if (id_div === 'selectSDQ') {
    const moushaf = moushafOrType || '';
    const typePage = isDoublePage() ? '2p' : '';

    // Si config.* existe, on génère dynamiquement ; sinon on retombe sur le HTML "old" complet.
    const hasDynamic =
      Array.isArray(config?.sourates) &&
      Array.isArray(config?.siparahs) &&
      (Array.isArray(config?.quarts) || (config?.quarts && typeof config.quarts === 'object'));

    if (hasDynamic) {
      const souratesOpt = buildOptionsFromList(config.sourates, 'value', 'text');
      const siparahOpt = buildOptionsFromList(config.siparahs, 'value', 'text');

      // quarts : soit array, soit objet {1:'..',2:'..'}
      let quartOpt = '';
      if (Array.isArray(config.quarts)) {
        quartOpt = buildOptionsFromList(config.quarts, 'value', 'text');
      } else {
        const qTitle = t('quart.titre', 'Quart');
        quartOpt = [1, 2, 3, 4].map(n => {
          const lbl = t(`quart.${n}`, String(n));
          return `<option value="${n}">${escapeHtml(lbl)} ⁄₄</option>`;
        }).join('');
        quartOpt = `<option value="" selected disabled>${escapeHtml(qTitle)} ⁄₄</option>` + quartOpt;
      }

      return `
        <select id="selectSOURATE" name="selectSOURATE"
          onchange="affichagePage('sourate',this.value,'${escapeAttr(moushaf)}','${escapeAttr(typePage)}');">
          <option value="" selected disabled>${escapeHtml(t('sourah', 'Sourah'))}</option>
          ${souratesOpt}
        </select>

        <select id="selectSIPARAH" name="selectSIPARAH"
          onchange="selectQUART(this.selectedIndex,1,'${escapeAttr(moushaf)}','${escapeAttr(typePage)}');">
          <option value="" selected disabled>${escapeHtml(t('siparah', 'Siparah'))} n°</option>
          ${siparahOpt}
        </select>

        <select id="selectQUART" name="selectQUART" disabled
          onchange="selectQUART(document.getElementById('selectSIPARAH').selectedIndex,this.value,'${escapeAttr(moushaf)}','${escapeAttr(typePage)}');">
          ${quartOpt}
        </select>
      `;
    }

    // ---- Fallback "old" (complet) : ne rien oublier ----
    // (injecte les traductions et paramètres)
    const tabloLang = {
      sourah: t('sourah', 'Sourah'),
      siparah: t('siparah', 'Siparah'),
      quartTitre: t('quart.titre', 'Quart'),
      quart1: t('quart.1', '1ᵉʳ'),
      quart2: t('quart.2', '2ᵈ'),
      quart3: t('quart.3', '3ᵉ'),
      quart4: t('quart.4', '4ᵉ'),
    };

    return `
      <!-- CHOIX DE LA SOURATE -->
      <select id="selectSOURATE" name="selectSOURATE" onchange="affichagePage('sourate',this.value,'${escapeAttr(moushafOrType)}','${escapeAttr(isDoublePage() ? '2p' : '')}');">
        <option value="" selected disabled>${escapeHtml(tabloLang.sourah)}</option>

        <optgroup label="${escapeHtml(tabloLang.siparah)}  01 ⮕ 04">
          <option value="1"> 1 - Al Fatihah الفاتحة - </option>
          <option value="2"> 2 - Al Baqarah البقرة</option>
          <option value="67"> 3 - Al Imran آل عمران</option>
          <option value="105"> 4 - An Nisaa النساء</option>
        </optgroup>

        <optgroup label="${escapeHtml(tabloLang.siparah)} 05 ⮕ 09">
          <option value="146"> 5 - Al Maaidah المائدة</option>
          <option value="176"> 6 - Al An'aam الأنعام</option>
          <option value="208"> 7 - Al A'raaf الأعراف</option>
          <option value="245"> 8 - Al Anfaal الأنفال</option>
        </optgroup>

        <optgroup label="${escapeHtml(tabloLang.siparah)} 10 ⮕ 14">
          <option value="259"> 9 - At Tawbah التوبة</option>
          <option value="287"> 10 - Yunus يونس</option>
          <option value="307"> 11 - Hud هود</option>
          <option value="327"> 12 - Yusuf يوسف</option>
          <option value="345"> 13 - Ar Ra'd الرعد</option>
          <option value="354"> 14 - Ibrahim ابراهيم</option>
          <option value="363"> 15 - Al Hijr الحجر</option>
        </optgroup>

        <optgroup label="${escapeHtml(tabloLang.siparah)} 15 ⮕ 19">
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

        <optgroup label="${escapeHtml(tabloLang.siparah)} 20 ⮕ 24">
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

        <optgroup label="${escapeHtml(tabloLang.siparah)} 25 ⮕ 29">
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

        <optgroup label="${escapeHtml(tabloLang.siparah)} 30">
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

      <!-- CHOIX DU SIPARAH -->
      <select id="selectSIPARAH" name="selectSIPARAH" onchange="selectQUART(this.selectedIndex,1,'${escapeAttr(moushafOrType)}','${escapeAttr(isDoublePage() ? '2p' : '')}');">
        <option value="" selected disabled>${escapeHtml(tabloLang.siparah)} n°</option>
        <optgroup label="${escapeHtml(tabloLang.siparah)} 01 ⮕ 09">
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
        <optgroup label="${escapeHtml(tabloLang.siparah)} 10 ⮕ 19">
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
        <optgroup label="${escapeHtml(tabloLang.siparah)} 20 ⮕ 30">
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
      <select id="selectQUART" name="selectQUART" onchange="selectQUART(document.getElementById('selectSIPARAH').selectedIndex,this.value,'${escapeAttr(moushafOrType)}','${escapeAttr(isDoublePage() ? '2p' : '')}');" disabled>
        <option value="" selected disabled>${escapeHtml(tabloLang.quartTitre)}  ⁄₄</option>
        <option value="1">${escapeHtml(tabloLang.quart1)} ⁄₄</option>
        <option value="2">${escapeHtml(tabloLang.quart2)} ⁄₄</option>
        <option value="3">${escapeHtml(tabloLang.quart3)} ⁄₄</option>
        <option value="4">${escapeHtml(tabloLang.quart4)} ⁄₄</option>
      </select>
    `;
  }

  /* =========================
     AUDIO (selectLecture)
  ========================= */
  if (id_div === 'selectLecture') {
    const moushaf = moushafOrType || '';
    return `
      <select id="selectAUDIO" name="selectAUDIO" onchange="choixAUDIO(this.value);">
        <option value="" disabled selected>🎧 ${escapeHtml(t('typeAudio.ecouter', 'Écouter'))}...</option>
        <option value="Page">${escapeHtml(t('typeAudio.page', 'Cette page'))}</option>
        <option value="Quart" disabled>${escapeHtml(t('typeAudio.quart', 'Ce quart'))}</option>
      </select>

      <select id="selectQari" name="selectQari"
        onchange="choixQari(this.value,document.getElementById('selectAUDIO').value,'${escapeAttr(moushaf)}');" disabled>
        <option value="" disabled selected>🗣 ${escapeHtml(t('recitateur', 'Récitateurs'))}</option>
        <option value="Abu%20Bakr%20al%20Shatri%20">A. Bakr Chatri</option>
        <option value="Mahmoud%20Khalil%20al%20Hussary%20">M. K. Al Houssary</option>
        <option value="Maher%20al%20Muaiqly%20">Mahir Al Mou'ayqli</option>
        <option value="Saad%20al%20Ghamdi%20">Saad Al Ghamdi</option>
      </select>

      <div id="paramAudio" class="nonvisiblemaispresent">
        <p id="vitesseAudio">
          ${escapeHtml(t('vitesse', 'Vitesse'))} x<span id="nbVitesseLecture">1</span>
          <input class="mdl-slider mdl-js-slider" type="range" id="vitesseLecture" min="0.75" max="2" value="1" step="0.25">
        </p>

        <span class="mdl-chip mdl-chip--contact mdl-chip--deletable">
          <a href="#" onclick="playPause(document.getElementById('audioQari'))" style="color:initial;">
            <span class="material-icons-round mdl-chip__contact mdl-color--teal">play_arrow</span>
            <span class="mdl-chip__text">Play&nbsp;&nbsp;</span>
          </a>
        </span>

        <span class="mdl-chip__action"
          onclick="choixQari(document.getElementById('selectQari').value,document.getElementById('selectAUDIO').value,'${escapeAttr(moushaf)}','reset');">
          <span class="material-icons-round">restart_alt</span>
        </span>
      </div>

      <audio id="audioQari" preload="auto"><source src="" type="audio/mp3"></audio>
    `;
  }

  /* =========================
     PARAMETRES
  ========================= */
  if (id_div === 'parametres') {
    const moushaf = moushafOrType || '';
    const doubleMode = isDoublePage();

    // aRemplacer : page cible (ex: 2ptadjwid) pour basculer 1p/2p
    const orientationTarget = aRemplacer ? String(aRemplacer) : '';

    let html = ``;

    if (doubleMode) {
      html += `
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="javascript:changeZOOM('moins');">
          <i class="material-icons zoomIcon">zoom_out</i>
        </button>
      `;
    }

    html += `
      <button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="javascript:toggleFullScreen();">
        <i class="icon material-icons" style="color:red;">fullscreen</i> ${escapeHtml(t('parametres.pleinecran', 'PLEIN ECRAN'))}
      </button>

      <button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="modeNuit">
        <span class="icon material-icons">settings_brightness</span>
        <span class="mdl-tooltip mdl-tooltip--large" data-mdl-for="modeNuit">${escapeHtml(t('parametres.nuit', 'Mode sombre/clair'))}</span>
      </button>
    `;

    if (orientationTarget) {
      html += `
        <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
          style="display:initial;vertical-align:text-bottom;margin-inline:1rem;"
          onclick="window.location.href='${escapeAttr(orientationTarget)}.html?&lang=${escapeAttr(langChoisie)}'"
          id="orientation">
          <input type="checkbox" class="mdl-switch__input" ${doubleMode ? 'checked' : ''}>
        </label>
        &nbsp;<span class="icon material-icons" style="color:darkblue;"
          onclick="window.location.href='${escapeAttr(orientationTarget)}.html?&lang=${escapeAttr(langChoisie)}'">screen_lock_rotation</span>
        <span class="mdl-tooltip mdl-tooltip--large" data-mdl-for="orientation">${escapeHtml(t('parametres.sd', 'Page simple/double'))}</span>
      `;
    }

    if (doubleMode) {
      html += `
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="javascript:changeZOOM('plus');">
          <i class="material-icons zoomIcon">zoom_in</i>
        </button>
      `;
    }

    html += `
      <button id="options" class="mdl-button mdl-js-button mdl-button--icon">
        <i class="material-icons">more_vert</i>
      </button>

      <div id="conteneur"></div>

      <ul class="mdl-menu ${doubleMode ? 'mdl-menu--top-right' : 'mdl-menu--bottom-right'} mdl-js-menu mdl-js-ripple-effect"
          data-mdl-for="options">
        <li class="mdl-menu__item" onclick="zoomPlus();">
          ${escapeHtml(t('parametres.zoom', 'Zoom'))}
          <span class="icon material-icons">zoom_in</span>
        </li>
        <li class="mdl-menu__item" onclick="boutonPartager();">
          ${escapeHtml(t('parametres.partager', 'Partager'))}
          <span class="icon material-icons" style="color:dimgrey;">share&nbsp;</span>
        </li>
        <li class="mdl-menu__item"
            onclick="window.location.href='https://wa.me/262692220786?text=Assalamou%27alaykoum,%0a%20A%20propos%20de%20quran.re:%0a'">
          ${escapeHtml(t('parametres.erreur', 'Remonter une erreur'))}
        </li>
      </ul>
    `;

    return html;
  }

  /* =========================
     MOUSHAF DOUBLE (2 pages)
  ========================= */
  if (id_div === 'moushafdouble') {
    const moushaf = moushafOrType || '';
    let numeroPremierePage = 2;
    let srcImages = 'images/';
    let extensionImage = ').png';

    // accélération si page= est déjà géré ailleurs
    if (window.location.href.includes('page=')) {
      numeroPremierePage = 0;
      srcImages = '';
      extensionImage = '';
    } else {
      switch (moushaf) {
        case '13lclassic':
          numeroPremierePage = 2; extensionImage = ').png'; srcImages += 'quran13lclassic/quran13lclassic ('; break;
        case '13lcolored':
          numeroPremierePage = 2; extensionImage = ').png'; srcImages += 'quran13lcolored/quran13lcolored ('; break;
        case '13lvert':
          numeroPremierePage = 2; extensionImage = ').png'; srcImages += 'quran13lvert/quran13lvert ('; break;
        case '13lqc':
          numeroPremierePage = 1; extensionImage = ').png'; srcImages = 'https://mufradat.fr/quran/images/quran13lQC/quran13lQC ('; break;
        case '13l':
          numeroPremierePage = 1; extensionImage = ').jpg'; srcImages += 'quran13l/quran13l ('; break;
        case '13lenglish':
          numeroPremierePage = 2; extensionImage = ').png'; srcImages += 'quran13lenglish/quran13lenglish ('; break;
        default:
          // fallback generic
          numeroPremierePage = 2; extensionImage = ').png'; srcImages += `${escapeAttr(moushaf)}/${escapeAttr(moushaf)} (`; break;
      }
    }

    return `
      <img id="pageAffichee2" oncontextmenu="return false;" class="imagePAYSAGE"
           src="${escapeAttr(srcImages)}${numeroPremierePage + 1}${escapeAttr(extensionImage)}" alt="${numeroPremierePage}" />
      <div class="shadow"></div>
      <img id="pageAffichee" oncontextmenu="return false;" class="imagePAYSAGE"
           src="${escapeAttr(srcImages)}${numeroPremierePage}${escapeAttr(extensionImage)}" alt="${numeroPremierePage}" />

      <!-- En CACHE -->
      <img id="pageCachee2" src="${escapeAttr(srcImages)}${numeroPremierePage + 3}${escapeAttr(extensionImage)}" alt="imagecache" hidden />
      <img id="pageCachee"  src="${escapeAttr(srcImages)}${numeroPremierePage + 2}${escapeAttr(extensionImage)}" alt="imagecache" hidden />
      <img id="pageCachee4" src="${escapeAttr(srcImages)}${numeroPremierePage + 5}${escapeAttr(extensionImage)}" alt="imagecache" hidden />
      <img id="pageCachee3" src="${escapeAttr(srcImages)}${numeroPremierePage + 4}${escapeAttr(extensionImage)}" alt="imagecache" hidden />
      <!-- \\ En CACHE //-->

      <button type="button" name="boutonSUIVANT" id="boutonSUIVANT"
              class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
              onclick="ChangementPage('suiv','${escapeAttr(moushaf)}','2p')">
        <i class="material-icons">west</i>
      </button>

      <button type="button" name="boutonPRECEDENT" id="boutonPRECEDENT"
              class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
              onclick="ChangementPage('prec','${escapeAttr(moushaf)}','2p')">
        <i class="material-icons">east</i>
      </button>
    `;
  }

  /* =========================
     FOOTER
  ========================= */
  if (id_div === 'footer') {
    return `
      <div class="mdl-mega-footer__middle-section">

        <div class="mdl-mega-footer__drop-down-section">
          <input class="mdl-mega-footer__heading-checkbox" type="checkbox" checked>
          <h1 class="mdl-mega-footer__heading"><i class="material-icons">widgets</i> ${escapeHtml(t('footer.outils', 'NOS OUTILS'))}</h1>
          <ul class="mdl-mega-footer__link-list">
            <li><a href="https://memoquran.fr">🧠 MemoQuran</a></li>
            <li><a href="https://roukou.memoquran.fr">🎧 Audio Roukou</a></li>
            <li><a href="https://quran.re/13l/lpl.html">🪜 ${escapeHtml(t('footer.lpl', 'Ligne par ligne'))}</a></li>
          </ul>
        </div>

        <div class="mdl-mega-footer__drop-down-section">
          <input class="mdl-mega-footer__heading-checkbox" type="checkbox" checked>
          <h1 class="mdl-mega-footer__heading"><i class="material-icons">g_translate</i> ${escapeHtml(t('footer.langues', 'LANGUES'))}</h1>
          <ul class="mdl-mega-footer__link-list">
            <li><a href="?lang=fr">Français</a></li>
            <li><a href="?lang=en">English</a></li>
            <li><a href="?lang=ar">عربي</a></li>
            <li><a href="?lang=ur">Urdu</a></li>
          </ul>
        </div>

      </div>

      <div class="mdl-mega-footer__bottom-section">
        <div class="mdl-logo"><i class="material-icons">contact_support</i> ${escapeHtml(t('footer.Apropos', 'À propos'))}</div>
        <ul class="mdl-mega-footer__link-list">
          <li><a href="https://bit.ly/m/baraw">Contact</a></li>
          <li><a href="#">${escapeHtml(t('footer.ml', 'Mentions légales'))}</a></li>
          <li><a href="https://bit.ly/barawpaypal">Paypal</a></li>
        </ul>
      </div>
    `;
  }

  /* =========================
     LANDSCAPE ICON / MESSAGE
  ========================= */
  if (id_div === 'landscapeIcon') {
    return `
      <span>↻</span>
      <br><br>
      ${escapeHtml(t('msgOrientation.1', 'Basculez votre appareil en'))}
      <b>${escapeHtml(t('msgOrientation.2', 'PAYSAGE'))} <i class="material-icons">stay_primary_landscape</i></b>
      ${escapeHtml(t('msgOrientation.3', "pour afficher correctement le mode 'page double'."))}
      <br>
      ${escapeHtml(t('msgOrientation.4', 'Sinon, repassez en mode'))}
      "<a href="${escapeAttr(aRemplacer)}.html?lang=${escapeAttr(langChoisie)}">${escapeHtml(t('msgOrientation.5', 'page simple'))}.</a>"
    `;
  }

  // Default: rien
  return '';
}

// Optionnel : expose pour debug (pas fiable pour les scripts inline avant exécution du module)
try {
  window.affichageHTML = affichageHTML;
} catch (_) {}
