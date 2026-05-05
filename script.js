
const LANG = {
  fr: {
    /* Home */
    subtitle:        'La Collection Cachée',
    btnStart:        '▶ COMMENCER',
    btnParams:       '⚙ PARAMÈTRES',
    footerLang:      'LANGUES',
    footerLegal:     'LÉGAL',
    footerCredits:   'CRÉDITS',

    /* Rules */
    rulesTitle:      '📋 Règlement du jeu',
    rulesSub:        'Pixar Quest — La Collection Cachée',
    rule1Title:      "Identifie l'objet",
    rule1Text:       "Un objet emblématique d'un film Pixar t'est présenté. Trouve à quel film il appartient !",
    rule2Title:      'Joue contre la montre',
    rule2Text:       "Tu as un temps limité par question selon la difficulté choisie. Plus tu réponds vite, plus tu marques de points bonus !",
    rule3Title:      'Tape le nom du film',
    rule3Text:       "Saisis le nom du film en français ou en anglais. Une correspondance approximative est acceptée.",
    rule4Title:      'Cumule un maximum de points',
    rule4Text:       "Chaque bonne réponse rapporte des points. Enchaîne les bonnes réponses pour un bonus combo !",
    ptsLabel:        'Points par difficulté',
    ptsPerAnswer:    'pts / réponse',
    btnBack:         '← Retour',
    btnChooseDiff:   'Choisir la difficulté →',

    /* Difficulty */
    selectChallenge: 'Select Your Challenge',
    chooseFacile:    'Choose Facile',
    chooseNormal:    'Choose Normal',
    chooseDifficile: 'Choose Difficile',

    /* Loading */
    loadingMsgs: [
      'Entrons dans la Toybox...',
      'Dépoussiérons les étagères...',
      'Réveillons les jouets...',
      'Préparons la collection...',
      'Presque prêt...'
    ],

    /* Game */
    ptsUnit:         'pts',
    question:        'À quel film appartient cet objet ?',
    placeholder:     '🎬 Nom du film...',
    validate:        'VALIDER ✔',
    bravo:           '✓ Bravo ! +',
    timeout:         '⏱ Temps écoulé ! C\'était : ',
    wrong:           '✗ Raté ! C\'était : ',

    /* Result */
    foundFilms:      (c, t) => `J'ai trouvé ${c}/${t} films !`,
    scoreTotal:      'Score Total',
    share:           '← Partager sur mes réseaux',
    replay:          '↺ Rejouer',
    shareText:       (c, t, s) => `🎬 Pixar Quest — La Collection Cachée\nJ'ai trouvé ${c}/${t} films avec ${s} pts !\n@PIXARTRIVIAAPP`,
    copiedMsg:       'Score copié dans le presse-papiers !',

    /* Lang modal */
    langTitle:       '🌐 Langue / Language',
    langHint:        'Choisissez votre langue / Choose your language',
    langSoon:        "⚠️ D'autres langues seront disponibles prochainement.",
    langConfirm:     'Confirmer / Confirm',

    /* Legal modal */
    legalTitle:      '© Mentions Légales',
    tabCgu:          'CGU',
    tabPrivacy:      'Confidentialité',
    tabCookies:      'Cookies',
    legalOk:         "J'ai compris",

    /* Credits modal */
    creditsTitle:    'ℹ Crédits',
    creditsVersion:  'Version 1.0.0 — La Collection Cachée',

    /* Params modal */
    paramsTitle:     '⚙ Paramètres',
    paramMusic:      'Musique',
    paramSfx:        'Effets sonores',
    paramVibration:  'Vibrations',
    paramDark:       'Mode sombre',
    paramClose:      'Fermer',
  },

  en: {
    /* Home */
    subtitle:        'The Hidden Collection',
    btnStart:        '▶ START',
    btnParams:       '⚙ SETTINGS',
    footerLang:      'LANGUAGE',
    footerLegal:     'LEGAL',
    footerCredits:   'CREDITS',

    /* Rules */
    rulesTitle:      '📋 Game Rules',
    rulesSub:        'Pixar Quest — The Hidden Collection',
    rule1Title:      'Identify the object',
    rule1Text:       'An iconic object from a Pixar film is shown to you. Find which film it belongs to!',
    rule2Title:      'Race against the clock',
    rule2Text:       'You have limited time per question depending on your chosen difficulty. The faster you answer, the more bonus points you earn!',
    rule3Title:      'Type the film name',
    rule3Text:       'Enter the film name in English or French. An approximate match is accepted.',
    rule4Title:      'Rack up the points',
    rule4Text:       'Each correct answer earns you points. Chain correct answers for a combo bonus!',
    ptsLabel:        'Points per difficulty',
    ptsPerAnswer:    'pts / answer',
    btnBack:         '← Back',
    btnChooseDiff:   'Choose difficulty →',

    /* Difficulty */
    selectChallenge: 'Select Your Challenge',
    chooseFacile:    'Choose Easy',
    chooseNormal:    'Choose Normal',
    chooseDifficile: 'Choose Hard',

    /* Loading */
    loadingMsgs: [
      'Entering the Toybox...',
      'Dusting off the shelves...',
      'Waking up the toys...',
      'Preparing the collection...',
      'Almost ready...'
    ],

    /* Game */
    ptsUnit:         'pts',
    question:        'Which film does this object belong to?',
    placeholder:     '🎬 Movie name...',
    validate:        'VALIDATE ✔',
    bravo:           '✓ Great! +',
    timeout:         '⏱ Time\'s up! It was: ',
    wrong:           '✗ Wrong! It was: ',

    /* Result */
    foundFilms:      (c, t) => `I found ${c}/${t} films!`,
    scoreTotal:      'Total Score',
    share:           '← Share on my networks',
    replay:          '↺ Play again',
    shareText:       (c, t, s) => `🎬 Pixar Quest — The Hidden Collection\nI found ${c}/${t} films with ${s} pts!\n@PIXARTRIVIAAPP`,
    copiedMsg:       'Score copied to clipboard!',

    /* Lang modal */
    langTitle:       '🌐 Language / Langue',
    langHint:        'Choose your language / Choisissez votre langue',
    langSoon:        '⚠️ More languages coming soon.',
    langConfirm:     'Confirm / Confirmer',

    /* Legal modal */
    legalTitle:      '© Legal Notice',
    tabCgu:          'T&C',
    tabPrivacy:      'Privacy',
    tabCookies:      'Cookies',
    legalOk:         'Got it',

    /* Credits modal */
    creditsTitle:    'ℹ Credits',
    creditsVersion:  'Version 1.0.0 — The Hidden Collection',

    /* Params modal */
    paramsTitle:     '⚙ Settings',
    paramMusic:      'Music',
    paramSfx:        'Sound effects',
    paramVibration:  'Vibration',
    paramDark:       'Dark mode',
    paramClose:      'Close',
  }
};

// QUESTIONS DATA
const QUESTIONS = [
  { obj: '🐟', answer: ['le monde de nemo', 'finding nemo', 'nemo'] },
  { obj: '🤠', answer: ['toy story'] },
  { obj: '🏎',  answer: ['cars', 'cars 1'] },
  { obj: '🐀', answer: ['ratatouille'] },
  { obj: '🤖', answer: ['wall-e', 'wall e', 'walle'] },
  { obj: '🐛', answer: ["1001 pattes", "a bug's life", "bug's life"] },
  { obj: '👾', answer: ['monstres et cie', 'monstres & cie', 'monsters inc', 'monsters, inc'] },
  { obj: '⬆',  answer: ['la haut', 'up'] },
  { obj: '🎸', answer: ['coco'] },
  { obj: '💡', answer: ['vice-versa', 'vice versa', 'inside out'] },
  { obj: '🐻', answer: ['rebrave', 'brave', 'rebelle'] },
  { obj: '🌊', answer: ['le monde de dory', 'finding dory', 'dory'] },
  { obj: '🦸', answer: ['les indestructibles', 'the incredibles', 'incredibles'] },
  { obj: '🧊', answer: ['soul'] },
  { obj: '🦎', answer: ['luca'] },
  { obj: '🐉', answer: ['turning red', 'alerte rouge'] },
  { obj: '🎪', answer: ['en avant', 'onward'] },
  { obj: '🌌', answer: ['lightyear'] },
  { obj: '🪄', answer: ['elemental'] },
  { obj: '🔴', answer: ['inside out 2', 'vice-versa 2', 'vice versa 2'] },
];

const DIFFICULTIES = {
  easy:   { time: 45, pts: 10, questions: 10 },
  normal: { time: 30, pts: 20, questions: 15 },
  hard:   { time: 15, pts: 30, questions: 20 },
};

// STATE
let currentLang = 'fr';

let state = {
  difficulty: 'normal',
  questions:  [],
  currentQ:   0,
  score:      0,
  correct:    0,
  timeLeft:   30,
  timerInterval: null,
};

const params = { music: true, sfx: true, vibration: false, dark: false };

// HELPERS
function t(key, ...args) {
  const val = LANG[currentLang][key];
  return typeof val === 'function' ? val(...args) : val;
}

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

// SCREEN NAVIGATION

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showRules() { showScreen('screen-rules'); }


// APPLY LANGUAGE — updates every text node in the UI

function applyLanguage() {
  const L = LANG[currentLang];

  /* ---- Home ---- */
  document.querySelector('.home-title-card .subtitle').textContent      = L.subtitle;
  document.getElementById('btn-start').textContent                      = L.btnStart;
  document.getElementById('btn-params-home').textContent                = L.btnParams;
  document.getElementById('footer-lang-label').textContent              = L.footerLang;
  document.getElementById('footer-legal-label').textContent             = L.footerLegal;
  document.getElementById('footer-credits-label').textContent           = L.footerCredits;

  /* ---- Rules ---- */
  document.getElementById('rules-title').textContent                    = L.rulesTitle;
  document.getElementById('rules-sub').textContent                      = L.rulesSub;
  document.getElementById('rule1-title').textContent                    = L.rule1Title;
  document.getElementById('rule1-text').textContent                     = L.rule1Text;
  document.getElementById('rule2-title').textContent                    = L.rule2Title;
  document.getElementById('rule2-text').textContent                     = L.rule2Text;
  document.getElementById('rule3-title').textContent                    = L.rule3Title;
  document.getElementById('rule3-text').textContent                     = L.rule3Text;
  document.getElementById('rule4-title').textContent                    = L.rule4Title;
  document.getElementById('rule4-text').textContent                     = L.rule4Text;
  document.getElementById('pts-label').textContent                      = L.ptsLabel;
  document.querySelectorAll('.pts-per-answer').forEach(el => el.textContent = L.ptsPerAnswer);
  document.getElementById('btn-rules-back').textContent                 = L.btnBack;
  document.getElementById('btn-choose-diff').textContent                = L.btnChooseDiff;

  /* ---- Difficulty ---- */
  document.getElementById('select-challenge').textContent               = L.selectChallenge;
  document.getElementById('btn-choose-easy').textContent                = L.chooseFacile;
  document.getElementById('btn-choose-normal').textContent              = L.chooseNormal;
  document.getElementById('btn-choose-hard').textContent                = L.chooseDifficile;

  /* ---- Game ---- */
  document.getElementById('answer-input').placeholder                   = L.placeholder;
  document.querySelector('.question-text').textContent                  = L.question;
  document.querySelector('.validate-btn').textContent                   = L.validate;

  /* ---- Result ---- */
  document.getElementById('result-share-btn').textContent               = L.share;
  document.getElementById('result-replay-btn').textContent              = L.replay;
  document.getElementById('result-score-label').textContent             = L.scoreTotal;

  /* ---- Lang modal ---- */
  document.getElementById('modal-lang-title').textContent               = L.langTitle;
  document.getElementById('modal-lang-hint').textContent                = L.langHint;
  document.getElementById('modal-lang-soon').textContent                = L.langSoon;
  document.getElementById('modal-lang-confirm').textContent             = L.langConfirm;

  /* ---- Legal modal ---- */
  document.getElementById('modal-legal-title').textContent              = L.legalTitle;
  document.getElementById('tab-cgu').textContent                        = L.tabCgu;
  document.getElementById('tab-privacy').textContent                    = L.tabPrivacy;
  document.getElementById('tab-cookies').textContent                    = L.tabCookies;
  document.getElementById('legal-ok-btn').textContent                   = L.legalOk;

  /* ---- Credits modal ---- */
  document.getElementById('modal-credits-title').textContent            = L.creditsTitle;
  document.getElementById('credits-version').textContent                = L.creditsVersion;

  /* ---- Params modal ---- */
  document.getElementById('params-title').textContent                   = L.paramsTitle;
  document.getElementById('param-music-label').textContent              = L.paramMusic;
  document.getElementById('param-sfx-label').textContent                = L.paramSfx;
  document.getElementById('param-vibration-label').textContent          = L.paramVibration;
  document.getElementById('param-dark-label').textContent               = L.paramDark;
  document.getElementById('params-close-btn').textContent               = L.paramClose;
}


// LANG MODAL

function selectLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-option').forEach(el => el.classList.remove('selected'));
  document.getElementById('lang-' + lang).classList.add('selected');
}

function applyLang() {
  applyLanguage();
  closeModal('modal-lang');
}


// LEGAL TABS

function switchLegalTab(tab, btn) {
  document.querySelectorAll('.legal-tab').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.legal-content').forEach(el => el.classList.remove('active'));
  document.getElementById('legal-' + tab).classList.add('active');
  btn.classList.add('active');
}


// MODALS

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function openParams() { openModal('modal-params'); }
function closeParams() { closeModal('modal-params'); }

function toggleParam(key) {
  params[key] = !params[key];
  document.getElementById('toggle-' + key).className = 'toggle' + (params[key] ? ' on' : '');
}

// Close modals on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
  });

  // Build difficulty icons
  buildDiffIcons();

  // Apply default language
  applyLanguage();
});


// DIFFICULTY ICONS

function buildDiffIcons() {
  const counts = { easy: 10, normal: 15, hard: 20 };
  ['easy', 'normal', 'hard'].forEach(d => {
    const el = document.getElementById('icons-' + d);
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < counts[d]; i++) {
      const div = document.createElement('div');
      div.className = 'film-icon';
      div.textContent = '🎬';
      el.appendChild(div);
    }
  });
}


// LOADING

function startLoading(diff) {
  state.difficulty = diff;
  showScreen('screen-loading');

  const bar = document.getElementById('loading-bar');
  const txt = document.getElementById('loading-text');
  const msgs = LANG[currentLang].loadingMsgs;

  let pct = 0, msgIdx = 0;
  bar.style.width = '0%';
  txt.textContent = msgs[0];

  const interval = setInterval(() => {
    pct += Math.random() * 3 + 1;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      setTimeout(startGame, 400);
    }
    bar.style.width = pct + '%';
    const newIdx = Math.min(Math.floor((pct / 100) * msgs.length), msgs.length - 1);
    if (newIdx !== msgIdx) {
      msgIdx = newIdx;
      txt.textContent = msgs[msgIdx];
    }
  }, 60);
}


// GAME

function startGame() {
  const cfg = DIFFICULTIES[state.difficulty];
  state.questions = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, cfg.questions);
  state.currentQ  = 0;
  state.score     = 0;
  state.correct   = 0;

  // Build progress dots
  const prog = document.getElementById('game-progress');
  prog.innerHTML = '';
  for (let i = 0; i < cfg.questions; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' + (i === 0 ? ' current' : '');
    dot.id = 'dot-' + i;
    prog.appendChild(dot);
  }

  document.getElementById('pts-per-q').textContent = cfg.pts;
  showScreen('screen-game');
  loadQuestion();
}

function loadQuestion() {
  const cfg = DIFFICULTIES[state.difficulty];
  const q   = state.questions[state.currentQ];

  document.getElementById('object-display').textContent = q.obj;
  document.getElementById('score-display').textContent  = state.score;

  const input = document.getElementById('answer-input');
  input.value     = '';
  input.className = 'answer-input';
  input.placeholder = t('placeholder');

  const fb = document.getElementById('feedback-msg');
  fb.textContent = '';
  fb.className   = 'feedback-msg';

  // Update progress dots
  for (let i = 0; i < state.questions.length; i++) {
    const dot = document.getElementById('dot-' + i);
    dot.className = i < state.currentQ ? 'progress-dot done'
                  : i === state.currentQ ? 'progress-dot current'
                  : 'progress-dot';
  }

  // Timer
  clearInterval(state.timerInterval);
  state.timeLeft = cfg.time;
  updateTimer();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimer();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      onWrongAnswer(true);
    }
  }, 1000);

  input.focus();
}

function updateTimer() {
  document.getElementById('timer-display').textContent = state.timeLeft;
  document.getElementById('game-timer').className =
    'game-timer' + (state.timeLeft <= 5 ? ' urgent' : '');
}

function validateAnswer() {
  const input   = document.getElementById('answer-input');
  const userAns = normalize(input.value);
  if (!userAns) return;

  const q       = state.questions[state.currentQ];
  const correct = q.answer.some(a =>
    normalize(a) === userAns ||
    normalize(a).includes(userAns) ||
    userAns.includes(normalize(a))
  );

  clearInterval(state.timerInterval);

  if (correct) {
    const cfg   = DIFFICULTIES[state.difficulty];
    const bonus = Math.floor(state.timeLeft / cfg.time * cfg.pts * 0.5);
    state.score   += cfg.pts + bonus;
    state.correct += 1;
    input.className = 'answer-input correct';
    const fb = document.getElementById('feedback-msg');
    fb.textContent = t('bravo') + (cfg.pts + bonus) + ' ' + t('ptsUnit');
    fb.className   = 'feedback-msg correct';
    setTimeout(nextQuestion, 1000);
  } else {
    onWrongAnswer(false);
  }
}

function onWrongAnswer(timeout) {
  const input = document.getElementById('answer-input');
  const q     = state.questions[state.currentQ];
  input.className = 'answer-input wrong';
  const fb = document.getElementById('feedback-msg');
  fb.textContent = (timeout ? t('timeout') : t('wrong')) + q.answer[0];
  fb.className   = 'feedback-msg wrong';
  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  state.currentQ++;
  if (state.currentQ >= state.questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}


// RESULT

function showResult() {
  document.getElementById('result-found').textContent = t('foundFilms', state.correct, state.questions.length);
  document.getElementById('result-score').textContent = state.score + ' PTS';
  showScreen('screen-result');
}

function shareResult() {
  const text = t('shareText', state.correct, state.questions.length, state.score);
  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert(t('copiedMsg')));
  }
}

function replay() {
  showScreen('screen-home');
}