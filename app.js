(() => {
  'use strict';

  const STORAGE_KEY = 'gym-subscription-pwa-state-v1';
  const URL_PARAM = 'state';
  const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

  const I18N = {
    ro: {
      title: 'Calculator abonament sal\u0103',
      subtitle: 'Totalul anual r\u0103m\u00E2ne fix, iar costul pe \u0219edin\u021B\u0103 se recalculeaz\u0103 automat din \u0219edin\u021Bele eligibile din ciclul de 12 luni.',
      configTitle: 'Configurare',
      startDate: 'Data de start',
      monthlyPrice: 'Abonament lunar (lei)',
      weekdays: 'Zile eligibile pentru antrenament',
      excludedTitle: 'Intervale excluse',
      excludedHint: 'Sunt pre\u00EEnc\u0103rcate perioadele implicite pentru Pa\u0219tele ortodox 2026, Cr\u0103ciun 2026 \u0219i Anul Nou 2026-2027. Le po\u021Bi edita direct aici.',
      addInterval: 'Adaug\u0103 interval',
      excludedRange: 'Interval exclus',
      from: 'De la',
      to: 'P\u00E2n\u0103 la',
      remove: '\u0218terge',
      intervalIncomplete: 'Intervalul este ignorat p\u00E2n\u0103 completezi ambele date.',
      intervalInvalid: 'Data de final trebuie s\u0103 fie aceea\u0219i sau dup\u0103 data de start.',
      noExclusions: 'Nu exist\u0103 intervale excluse. Po\u021Bi ad\u0103uga unul nou.',
      summaryTitle: 'Rezumat',
      annualTotal: 'Total anual',
      eligibleSessions: '\u0218edin\u021Be eligibile',
      costPerSession: 'Cost / \u0219edin\u021B\u0103',
      cycleRange: 'Ciclu activ',
      remainingSessions: '\u0218edin\u021Be r\u0103mase din azi',
      excludedPotentialSessions: '\u0218edin\u021Be eliminate de intervale',
      plainLanguageTitle: 'Explica\u021Bie pe \u00EEn\u021Beles',
      actionsTitle: 'Export \u0219i distribuire',
      copyShareLink: 'Copiaz\u0103 link-ul sesiunii',
      exportCsv: 'Export CSV',
      exportIcs: 'Export ICS',
      shareHint: 'Link-ul copiat include data de start, pre\u021Bul, zilele \u0219i intervalele excluse. Limba r\u0103m\u00E2ne local\u0103 pe fiecare dispozitiv.',
      offlineHint: 'Instaleaz\u0103 aplica\u021Bia ca PWA pentru utilizare offline dup\u0103 prima \u00EEnc\u0103rcare.',
      paymentTitle: 'Program pl\u0103\u021Bi',
      paymentHint: 'Plata 1 este avans la data de start. Pl\u0103\u021Bile urm\u0103toare cad pe prima \u0219edin\u021B\u0103 eligibil\u0103 care atinge pragul cumulat.',
      paymentNo: 'Plata',
      paymentDate: 'Data pl\u0103\u021Bii',
      paymentThreshold: 'Prag cumulat',
      monthSessionCount: '\u0218edin\u021Be eligibile \u00EEn lun\u0103',
      coverageDate: 'Acoper\u0103 p\u00E2n\u0103 la',
      refreshForUpdate: 'Re\u00EEnc\u0103rcare pentru actualizare',
      offlineBanner: 'E\u0219ti offline. Interfa\u021Ba din cache \u0219i ultima stare local\u0103 r\u0103m\u00E2n disponibile.',
      updateReady: 'Este disponibil\u0103 o versiune nou\u0103 a aplica\u021Biei.',
      calendarHint: 'Tabelul include doar zilele din ciclul activ de 12 luni.',
      date: 'Data',
      weekday: 'Zi',
      weekdayEnabled: 'Zi selectat\u0103',
      excludedColumn: 'Interval exclus',
      eligible: '\u0218edin\u021B\u0103 eligibil\u0103',
      sessionNumber: 'Nr. \u0219edin\u021B\u0103',
      sessionValue: 'Valoare \u0219edin\u021B\u0103',
      accumulated: 'Consum cumulat',
      yes: 'Da',
      no: 'Nu',
      none: '\u2014',
      dueBadge: 'Scaden\u021B\u0103',
      linkCopied: 'Link-ul a fost copiat.',
      linkCopyFailed: 'Nu am putut copia automat link-ul. Copiaz\u0103-l manual din bara de adrese.',
      loadedFromLink: 'Configura\u021Bia din link a fost aplicat\u0103.',
      priceRequired: 'Introdu un pre\u021B lunar mai mare dec\u00E2t 0 pentru a genera programul de pl\u0103\u021Bi.',
      noEligibleSessionsNote: 'Nu exist\u0103 \u0219edin\u021Be eligibile cu selec\u021Bia curent\u0103 de zile \u0219i intervale.',
      weekdayShort: {
        1: 'L',
        2: 'Ma',
        3: 'Mi',
        4: 'J',
        5: 'V',
        6: 'S',
        0: 'D'
      },
      weekdayLong: {
        1: 'Luni',
        2: 'Mar\u021Bi',
        3: 'Miercuri',
        4: 'Joi',
        5: 'Vineri',
        6: 'S\u00E2mb\u0103t\u0103',
        0: 'Duminic\u0103'
      },
      calendarSummary: ({ count }) => `Baza calendaristic\u0103: ${count} zile din ciclul de 12 luni`,
      noteAnnual: ({ annual, monthly }) => `Totalul anual r\u0103m\u00E2ne fix la ${annual} (${monthly} x 12).`,
      noteEligible: ({ count, removed }) => `\u00CEn ciclul curent exist\u0103 ${count} \u0219edin\u021Be eligibile, iar intervalele excluse elimin\u0103 ${removed} zile care altfel ar fi fost eligibile.`,
      noteCost: ({ annual, count, cost }) => `Costul pe \u0219edin\u021B\u0103 devine ${cost} pentru c\u0103 formula este ${annual} / ${count}.`,
      notePayments: 'Plata 1 r\u0103m\u00E2ne la data de start. Dup\u0103 aceea, fiecare scaden\u021B\u0103 cade pe prima \u0219edin\u021B\u0103 eligibil\u0103 care atinge pragul cumulat urm\u0103tor.',
      noteFinalCoverage: ({ date }) => `Ultimul prag anual este consumat la data de ${date}.`,
      noteRemaining: ({ count }) => `De azi \u00EEnainte mai r\u0103m\u00E2n ${count} \u0219edin\u021Be eligibile \u00EEn acest ciclu.`,
      noteInvalidIntervals: ({ count }) => `${count} interval(e) invalide sunt ignorate p\u00E2n\u0103 le corectezi.`,
      noteNextPayment: ({ number, date, threshold }) => `Urm\u0103toarea scaden\u021B\u0103 este plata ${number} la data de ${date}, la pragul ${threshold}.`,
      nextDeadlineBadge: ({ number, date }) => `Urm\u0103toarea scaden\u021B\u0103: plata ${number} - ${date}`,
      noUpcomingDeadline: 'Nu mai exist\u0103 scaden\u021Be viitoare \u00EEn acest ciclu.',
      icsSummary: ({ number }) => `Scaden\u021B\u0103 abonament sal\u0103 #${number}`,
      icsDescription: ({ threshold, coverage, month }) => `Prag cumulat: ${threshold}. Luna de referin\u021B\u0103: ${month}. Acoper\u0103 p\u00E2n\u0103 la: ${coverage}.`
    },
    en: {
      title: 'Gym subscription calculator',
      subtitle: 'The annual total stays fixed while the cost per session recalculates automatically from the eligible sessions in the 12-month cycle.',
      configTitle: 'Setup',
      startDate: 'Start date',
      monthlyPrice: 'Monthly subscription (lei)',
      weekdays: 'Eligible training weekdays',
      excludedTitle: 'Excluded ranges',
      excludedHint: 'Default periods for Orthodox Easter 2026, Christmas 2026, and New Year 2026-2027 are preloaded and remain editable here.',
      addInterval: 'Add range',
      excludedRange: 'Excluded range',
      from: 'From',
      to: 'To',
      remove: 'Remove',
      intervalIncomplete: 'This range is ignored until both dates are filled in.',
      intervalInvalid: 'The end date must be the same as or after the start date.',
      noExclusions: 'There are no excluded ranges. You can add one now.',
      summaryTitle: 'Summary',
      annualTotal: 'Annual total',
      eligibleSessions: 'Eligible sessions',
      costPerSession: 'Cost / session',
      cycleRange: 'Active cycle',
      remainingSessions: 'Sessions remaining from today',
      excludedPotentialSessions: 'Sessions removed by ranges',
      plainLanguageTitle: 'Plain-language explanation',
      actionsTitle: 'Export and sharing',
      copyShareLink: 'Copy share link',
      exportCsv: 'Export CSV',
      exportIcs: 'Export ICS',
      shareHint: 'The copied link includes the start date, price, weekdays, and excluded ranges. Language stays local on each device.',
      offlineHint: 'Install the app as a PWA to use it offline after the first load.',
      paymentTitle: 'Payment schedule',
      paymentHint: 'Payment 1 is the advance payment on the start date. Later payments land on the first eligible session that reaches the cumulative threshold.',
      paymentNo: 'Payment',
      paymentDate: 'Payment date',
      paymentThreshold: 'Cumulative threshold',
      monthSessionCount: 'Eligible sessions in month',
      coverageDate: 'Covers until',
      refreshForUpdate: 'Reload to update',
      offlineBanner: 'You are offline. The cached shell and your latest local state are still available.',
      updateReady: 'A newer version of the app is available.',
      calendarHint: 'The table includes only the days inside the active 12-month cycle.',
      date: 'Date',
      weekday: 'Weekday',
      weekdayEnabled: 'Weekday enabled',
      excludedColumn: 'Excluded range',
      eligible: 'Eligible session',
      sessionNumber: 'Session #',
      sessionValue: 'Session value',
      accumulated: 'Accumulated value',
      yes: 'Yes',
      no: 'No',
      none: '\u2014',
      dueBadge: 'Due',
      linkCopied: 'The share link was copied.',
      linkCopyFailed: 'Automatic copy failed. Please copy the current address manually.',
      loadedFromLink: 'The shared configuration has been applied.',
      priceRequired: 'Enter a monthly price above 0 to generate the payment schedule.',
      noEligibleSessionsNote: 'There are no eligible sessions with the current weekday selection and excluded ranges.',
      weekdayShort: {
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
        0: 'Sun'
      },
      weekdayLong: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        0: 'Sunday'
      },
      calendarSummary: ({ count }) => `Calendar base: ${count} days inside the 12-month cycle`,
      noteAnnual: ({ annual, monthly }) => `The annual total stays fixed at ${annual} (${monthly} x 12).`,
      noteEligible: ({ count, removed }) => `This cycle contains ${count} eligible sessions, and your excluded ranges remove ${removed} days that would otherwise have counted.`,
      noteCost: ({ annual, count, cost }) => `The cost per session becomes ${cost} because the formula is ${annual} / ${count}.`,
      notePayments: 'Payment 1 stays on the start date. After that, each deadline lands on the first eligible session that reaches the next cumulative threshold.',
      noteFinalCoverage: ({ date }) => `The final annual threshold is consumed on ${date}.`,
      noteRemaining: ({ count }) => `From today onward, ${count} eligible sessions remain in this cycle.`,
      noteInvalidIntervals: ({ count }) => `${count} invalid range(s) are ignored until you fix them.`,
      noteNextPayment: ({ number, date, threshold }) => `The next due date is payment ${number} on ${date}, at the threshold ${threshold}.`,
      nextDeadlineBadge: ({ number, date }) => `Next due date: payment ${number} - ${date}`,
      noUpcomingDeadline: 'There are no future due dates left in this cycle.',
      icsSummary: ({ number }) => `Gym subscription due date #${number}`,
      icsDescription: ({ threshold, coverage, month }) => `Cumulative threshold: ${threshold}. Reference month: ${month}. Covers until: ${coverage}.`
    }
  };

  function makeId() {
    return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  const DEFAULT_STATE = {
    startDate: '2026-01-05',
    monthlyPrice: 300,
    weekdays: [1, 3, 5],
    exclusions: [
      { id: makeId(), start: '2026-04-05', end: '2026-04-11' },
      { id: makeId(), start: '2026-12-18', end: '2026-12-24' },
      { id: makeId(), start: '2026-12-29', end: '2027-01-03' }
    ],
    language: 'ro'
  };

  const refs = {
    startDateInput: document.getElementById('startDateInput'),
    monthlyPriceInput: document.getElementById('monthlyPriceInput'),
    weekdaySelector: document.getElementById('weekdaySelector'),
    exclusionList: document.getElementById('exclusionList'),
    addExclusionBtn: document.getElementById('addExclusionBtn'),
    annualTotalValue: document.getElementById('annualTotalValue'),
    eligibleSessionsValue: document.getElementById('eligibleSessionsValue'),
    costPerSessionValue: document.getElementById('costPerSessionValue'),
    cycleRangeValue: document.getElementById('cycleRangeValue'),
    remainingSessionsValue: document.getElementById('remainingSessionsValue'),
    excludedPotentialSessionsValue: document.getElementById('excludedPotentialSessionsValue'),
    plainLanguageNotes: document.getElementById('plainLanguageNotes'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    exportCsvBtn: document.getElementById('exportCsvBtn'),
    exportIcsBtn: document.getElementById('exportIcsBtn'),
    paymentTableBody: document.getElementById('paymentTableBody'),
    nextDeadlineBadge: document.getElementById('nextDeadlineBadge'),
    calendarSummaryLine: document.getElementById('calendarSummaryLine'),
    calendarTableBody: document.getElementById('calendarTableBody'),
    offlineBanner: document.getElementById('offlineBanner'),
    updateBanner: document.getElementById('updateBanner'),
    updateBannerText: document.getElementById('updateBannerText'),
    updateButton: document.getElementById('updateButton'),
    toast: document.getElementById('toast'),
    langButtons: Array.from(document.querySelectorAll('.lang-btn'))
  };

  let updateWorker = null;
  let reloadOnControllerChange = false;
  let toastTimer = null;
  let currentData = null;

  const initialLoad = loadInitialState();
  let state = initialLoad.state;

  init();

  function init() {
    bindEvents();
    renderApp();
    persistState();
    syncUrlWithState();
    registerServiceWorker();
    window.addEventListener('online', renderStatus);
    window.addEventListener('offline', renderStatus);
    setupLaunchQueue();
    if (initialLoad.loadedFromLink) {
      showToast(t('loadedFromLink'));
    }
  }

  function bindEvents() {
    refs.startDateInput.addEventListener('input', () => {
      state.startDate = refs.startDateInput.value || DEFAULT_STATE.startDate;
      commitState();
    });

    refs.monthlyPriceInput.addEventListener('input', () => {
      const nextValue = refs.monthlyPriceInput.value === '' ? 0 : Number(refs.monthlyPriceInput.value);
      state.monthlyPrice = Number.isFinite(nextValue) ? nextValue : 0;
      commitState();
    });

    refs.weekdaySelector.addEventListener('change', () => {
      const selected = Array.from(refs.weekdaySelector.querySelectorAll('input[type="checkbox"]:checked')).map((input) => Number(input.value));
      state.weekdays = normalizeWeekdayList(selected);
      commitState();
    });

    refs.addExclusionBtn.addEventListener('click', () => {
      state.exclusions = [...state.exclusions, { id: makeId(), start: '', end: '' }];
      commitState();
    });

    refs.exclusionList.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }
      const id = target.dataset.id;
      const field = target.dataset.field;
      if (!id || !field) {
        return;
      }
      state.exclusions = state.exclusions.map((item) => (
        item.id === id ? { ...item, [field]: target.value || '' } : item
      ));
      commitState();
    });

    refs.exclusionList.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const button = target.closest('[data-action="remove-exclusion"]');
      if (!button) {
        return;
      }
      const id = button.getAttribute('data-id');
      if (!id) {
        return;
      }
      state.exclusions = state.exclusions.filter((item) => item.id !== id);
      commitState();
    });

    refs.copyLinkBtn.addEventListener('click', async () => {
      const shareUrl = buildShareUrl();
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(shareUrl);
        } else {
          fallbackCopyText(shareUrl);
        }
        showToast(t('linkCopied'));
      } catch (error) {
        console.warn('Copy failed', error);
        showToast(t('linkCopyFailed'));
      }
    });

    refs.exportCsvBtn.addEventListener('click', () => {
      exportCsv();
    });

    refs.exportIcsBtn.addEventListener('click', () => {
      exportIcs();
    });

    refs.updateButton.addEventListener('click', () => {
      if (updateWorker) {
        updateWorker.postMessage({ type: 'SKIP_WAITING' });
      }
    });

    refs.langButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const nextLanguage = button.dataset.lang === 'en' ? 'en' : 'ro';
        if (state.language === nextLanguage) {
          return;
        }
        state.language = nextLanguage;
        commitState();
      });
    });
  }

  function commitState() {
    persistState();
    syncUrlWithState();
    renderApp();
  }

  function loadInitialState() {
    const stored = readStoredState();
    const storedLanguage = stored && (stored.language === 'en' || stored.language === 'ro') ? stored.language : DEFAULT_STATE.language;
    let merged = mergeState(DEFAULT_STATE, stored || {});
    merged.language = storedLanguage;
    const fromUrl = readStateFromUrl(window.location.href);
    let loadedFromLink = false;
    if (fromUrl) {
      merged = mergeState(merged, fromUrl);
      merged.language = storedLanguage;
      loadedFromLink = true;
    }
    return { state: merged, loadedFromLink };
  }

  function readStoredState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn('Could not read local storage state', error);
      return null;
    }
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Could not persist local storage state', error);
    }
  }

  function mergeState(base, patch) {
    const result = {
      startDate: isIsoDate(patch.startDate) ? patch.startDate : base.startDate,
      monthlyPrice: Number.isFinite(Number(patch.monthlyPrice)) ? Number(patch.monthlyPrice) : base.monthlyPrice,
      weekdays: Array.isArray(patch.weekdays) ? normalizeWeekdayList(patch.weekdays) : normalizeWeekdayList(base.weekdays),
      exclusions: Array.isArray(patch.exclusions)
        ? patch.exclusions.map(normalizeExclusion)
        : base.exclusions.map(normalizeExclusion),
      language: patch.language === 'en' || patch.language === 'ro' ? patch.language : base.language
    };
    return result;
  }

  function normalizeExclusion(item) {
    const normalized = {
      id: item && typeof item.id === 'string' ? item.id : makeId(),
      start: item && isIsoDate(item.start) ? item.start : '',
      end: item && isIsoDate(item.end) ? item.end : ''
    };
    return normalized;
  }

  function normalizeWeekdayList(list) {
    const set = new Set((list || []).map((value) => Number(value)));
    return WEEKDAY_ORDER.filter((day) => set.has(day));
  }

  function locale() {
    return I18N[state.language] || I18N.ro;
  }

  function t(key, params) {
    return tWithLanguage(state.language, key, params);
  }

  function tWithLanguage(language, key, params) {
    const bundle = I18N[language] || I18N.ro;
    const value = bundle[key];
    if (typeof value === 'function') {
      return value(params || {});
    }
    return value;
  }

  function renderApp() {
    document.documentElement.lang = state.language;
    document.title = t('title');
    renderStaticTranslations();
    renderLanguageButtons();
    refs.startDateInput.value = state.startDate;
    refs.monthlyPriceInput.value = String(state.monthlyPrice ?? 0);
    renderWeekdaySelector();
    renderExclusions();
    currentData = calculateState(state);
    renderSummary(currentData);
    renderPlainLanguage(currentData);
    renderPaymentTable(currentData);
    renderCalendarTable(currentData);
    refs.exportCsvBtn.disabled = currentData.payments.length === 0;
    refs.exportIcsBtn.disabled = currentData.payments.length === 0;
    renderStatus();
  }

  function renderStaticTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const value = t(key);
      if (typeof value === 'string') {
        element.textContent = value;
      }
    });
    refs.offlineBanner.textContent = t('offlineBanner');
    refs.updateBannerText.textContent = t('updateReady');
  }

  function renderLanguageButtons() {
    refs.langButtons.forEach((button) => {
      const active = button.dataset.lang === state.language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function renderWeekdaySelector() {
    const strings = locale();
    refs.weekdaySelector.innerHTML = WEEKDAY_ORDER.map((day) => {
      const checked = state.weekdays.includes(day);
      return `
        <label class="weekday-pill ${checked ? 'selected' : ''}">
          <input type="checkbox" value="${day}" ${checked ? 'checked' : ''}>
          <span>${escapeHtml(strings.weekdayShort[day])} - ${escapeHtml(strings.weekdayLong[day])}</span>
        </label>
      `;
    }).join('');
  }

  function renderExclusions() {
    if (!state.exclusions.length) {
      refs.exclusionList.innerHTML = `<div class="empty-state">${escapeHtml(t('noExclusions'))}</div>`;
      return;
    }

    refs.exclusionList.innerHTML = state.exclusions.map((item, index) => {
      const invalid = Boolean(item.start && item.end && item.end < item.start);
      const incomplete = Boolean((item.start && !item.end) || (!item.start && item.end));
      const note = invalid ? t('intervalInvalid') : incomplete ? t('intervalIncomplete') : '';
      return `
        <div class="interval-card ${invalid ? 'invalid' : ''}" data-id="${item.id}">
          <div class="interval-header">
            <div class="interval-head">${escapeHtml(t('excludedRange'))} ${index + 1}</div>
            <button type="button" class="remove-btn" data-action="remove-exclusion" data-id="${item.id}">${escapeHtml(t('remove'))}</button>
          </div>
          <div class="interval-fields">
            <label>
              <span>${escapeHtml(t('from'))}</span>
              <input type="date" data-id="${item.id}" data-field="start" value="${item.start}">
            </label>
            <label>
              <span>${escapeHtml(t('to'))}</span>
              <input type="date" data-id="${item.id}" data-field="end" value="${item.end}">
            </label>
          </div>
          ${note ? `<p class="field-note">${escapeHtml(note)}</p>` : ''}
        </div>
      `;
    }).join('');
  }

  function calculateState(currentState) {
    const validStart = isIsoDate(currentState.startDate) ? currentState.startDate : DEFAULT_STATE.startDate;
    const startDate = parseIsoDate(validStart);
    const cycleEndExclusive = addMonthsClamped(startDate, 12);
    const cycleEndInclusive = addDays(cycleEndExclusive, -1);
    const selectedWeekdays = new Set(normalizeWeekdayList(currentState.weekdays));
    const exclusions = currentState.exclusions.map((item) => ({
      id: item.id,
      start: item.start,
      end: item.end,
      valid: Boolean(item.start && item.end && item.start <= item.end)
    }));

    const monthlyPrice = Number(currentState.monthlyPrice) || 0;
    const monthlyPriceCents = Math.round(monthlyPrice * 100);
    const annualTotalCents = monthlyPriceCents * 12;
    const hasPositivePrice = monthlyPriceCents > 0;

    let excludedPotentialSessions = 0;
    let sessionCounter = 0;
    const monthCounts = {};
    const rows = [];

    let cursor = new Date(startDate.getTime());
    while (cursor.getTime() < cycleEndExclusive.getTime()) {
      const iso = formatIsoDate(cursor);
      const weekdayIndex = cursor.getUTCDay();
      const weekdayEnabled = selectedWeekdays.has(weekdayIndex);
      const matchingExclusions = exclusions.filter((interval) => interval.valid && interval.start <= iso && iso <= interval.end);
      const excluded = matchingExclusions.length > 0;
      if (weekdayEnabled && excluded) {
        excludedPotentialSessions += 1;
      }
      const eligible = weekdayEnabled && !excluded;
      let sessionNumber = null;
      if (eligible) {
        sessionCounter += 1;
        sessionNumber = sessionCounter;
        const monthKey = iso.slice(0, 7);
        monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
      }
      rows.push({
        iso,
        weekdayIndex,
        weekdayEnabled,
        excluded,
        excludedReason: matchingExclusions.map((interval) => `${interval.start} to ${interval.end}`).join(', '),
        eligible,
        sessionNumber,
        sessionValue: null,
        accumulated: null
      });
      cursor = addDays(cursor, 1);
    }

    const eligibleCount = sessionCounter;
    const costPerSession = hasPositivePrice && eligibleCount > 0 ? annualTotalCents / eligibleCount / 100 : 0;
    const thresholds = hasPositivePrice
      ? Array.from({ length: 12 }, (_, index) => ({
          number: index + 1,
          thresholdCents: monthlyPriceCents * (index + 1),
          threshold: monthlyPriceCents * (index + 1) / 100,
          consumedOn: ''
        }))
      : [];

    if (hasPositivePrice && eligibleCount > 0) {
      let thresholdCursor = 0;
      rows.forEach((row) => {
        if (!row.eligible) {
          return;
        }
        row.sessionValue = annualTotalCents / eligibleCount / 100;
        row.accumulated = annualTotalCents * row.sessionNumber / eligibleCount / 100;
        while (
          thresholdCursor < thresholds.length &&
          (annualTotalCents * row.sessionNumber / eligibleCount) + 0.0001 >= thresholds[thresholdCursor].thresholdCents
        ) {
          thresholds[thresholdCursor].consumedOn = row.iso;
          thresholdCursor += 1;
        }
      });
    }

    const payments = thresholds.map((item, index) => {
      const paymentDate =
        index === 0
          ? validStart
          : thresholds[index - 1]?.consumedOn || '';

      const monthKey = paymentDate ? paymentDate.slice(0, 7) : '';

      return {
        number: item.number,
        paymentDate,
        threshold: item.threshold,
        monthSessionCount: monthKey ? (monthCounts[monthKey] || 0) : '',
        coverageDate: item.consumedOn
      };
    });

    const todayIso = todayIsoLocal();
    const nextPayment = payments.find((payment) => payment.paymentDate && payment.paymentDate >= todayIso) || null;
    const remainingSessions = rows.filter((row) => row.eligible && row.iso >= todayIso).length;
    const invalidIntervals = currentState.exclusions.filter((item) => (item.start || item.end) && (!item.start || !item.end || item.end < item.start)).length;

    return {
      validStart,
      cycleEndInclusive: formatIsoDate(cycleEndInclusive),
      annualTotal: annualTotalCents / 100,
      eligibleCount,
      costPerSession,
      excludedPotentialSessions,
      rows,
      payments,
      nextPayment,
      remainingSessions,
      invalidIntervals,
      hasPositivePrice
    };
  }

  function renderSummary(data) {
    refs.annualTotalValue.textContent = formatMoney(data.annualTotal);
    refs.eligibleSessionsValue.textContent = formatCount(data.eligibleCount);
    refs.costPerSessionValue.textContent = data.hasPositivePrice && data.eligibleCount > 0 ? formatMoney(data.costPerSession) : t('none');
    refs.cycleRangeValue.textContent = `${formatDateLabel(data.validStart)} - ${formatDateLabel(data.cycleEndInclusive)}`;
    refs.remainingSessionsValue.textContent = formatCount(data.remainingSessions);
    refs.excludedPotentialSessionsValue.textContent = formatCount(data.excludedPotentialSessions);
  }

  function renderPlainLanguage(data) {
    const notes = [];
    notes.push(t('noteAnnual', {
      annual: formatMoney(data.annualTotal),
      monthly: formatMoney(Number(state.monthlyPrice) || 0)
    }));

    if (!data.hasPositivePrice) {
      notes.push(t('priceRequired'));
    }

    notes.push(t('noteEligible', {
      count: formatCount(data.eligibleCount),
      removed: formatCount(data.excludedPotentialSessions)
    }));

    if (data.eligibleCount > 0) {
      if (data.hasPositivePrice) {
        notes.push(t('noteCost', {
          annual: formatMoney(data.annualTotal),
          count: formatCount(data.eligibleCount),
          cost: formatMoney(data.costPerSession)
        }));
        notes.push(t('notePayments'));
        if (data.payments.length && data.payments[data.payments.length - 1].coverageDate) {
          notes.push(t('noteFinalCoverage', { date: formatDateLabel(data.payments[data.payments.length - 1].coverageDate) }));
        }
      }
    } else {
      notes.push(t('noEligibleSessionsNote'));
    }

    notes.push(t('noteRemaining', { count: formatCount(data.remainingSessions) }));

    if (data.nextPayment) {
      notes.push(t('noteNextPayment', {
        number: data.nextPayment.number,
        date: formatDateLabel(data.nextPayment.paymentDate),
        threshold: formatMoney(data.nextPayment.threshold)
      }));
    } else {
      notes.push(t('noUpcomingDeadline'));
    }

    if (data.invalidIntervals > 0) {
      notes.push(t('noteInvalidIntervals', { count: formatCount(data.invalidIntervals) }));
    }

    refs.plainLanguageNotes.innerHTML = notes.map((note) => `<p>${escapeHtml(note)}</p>`).join('');
  }

  function renderPaymentTable(data) {
    if (!data.payments.length) {
      refs.paymentTableBody.innerHTML = `<tr><td colspan="6" class="empty-state">${escapeHtml(t('priceRequired'))}</td></tr>`;
      refs.nextDeadlineBadge.textContent = t('noUpcomingDeadline');
      return;
    }

    refs.nextDeadlineBadge.textContent = data.nextPayment
      ? t('nextDeadlineBadge', { number: data.nextPayment.number, date: formatDateLabel(data.nextPayment.paymentDate) })
      : t('noUpcomingDeadline');

    refs.paymentTableBody.innerHTML = data.payments.map((payment) => {
      const highlight = data.nextPayment && payment.number === data.nextPayment.number && payment.paymentDate === data.nextPayment.paymentDate;
      const monthCount = payment.monthSessionCount === '' ? t('none') : formatCount(payment.monthSessionCount);
      return `
        <tr class="${highlight ? 'highlight-row' : ''}">
          <td><span class="status-chip">${payment.number}</span>${highlight ? `<span class="row-badge">${escapeHtml(t('dueBadge'))}</span>` : ''}</td>
          <td class="mono">${payment.paymentDate ? escapeHtml(formatDateLabel(payment.paymentDate)) : escapeHtml(t('none'))}</td>
          <td class="mono">${payment.coverageDate ? escapeHtml(formatDateLabel(payment.coverageDate)) : escapeHtml(t('none'))}</td>
          <td class="mono">${escapeHtml(formatMoney(payment.threshold))}</td>
          <td>${escapeHtml(monthCount)}</td>
        </tr>
      `;
    }).join('');
  }

  function renderCalendarTable(data) {
    refs.calendarSummaryLine.textContent = t('calendarSummary', { count: formatCount(data.rows.length) });
    refs.calendarTableBody.innerHTML = data.rows.map((row) => {
      return `
        <tr>
          <td class="mono">${escapeHtml(formatDateLabel(row.iso))}</td>
          <td>${escapeHtml(locale().weekdayLong[row.weekdayIndex])}</td>
          <td>${statusChip(row.weekdayEnabled)}</td>
          <td>${escapeHtml(row.excludedReason || t('none'))}</td>
          <td>${statusChip(row.eligible)}</td>
          <td>${row.sessionNumber ? `<span class="mono">${escapeHtml(String(row.sessionNumber))}</span>` : escapeHtml(t('none'))}</td>
          <td>${row.sessionValue ? `<span class="mono">${escapeHtml(formatMoney(row.sessionValue))}</span>` : escapeHtml(t('none'))}</td>
          <td>${row.accumulated ? `<span class="mono">${escapeHtml(formatMoney(row.accumulated))}</span>` : escapeHtml(t('none'))}</td>
        </tr>
      `;
    }).join('');
  }

  function renderStatus() {
    refs.offlineBanner.classList.toggle('hidden', navigator.onLine);
    refs.updateBanner.classList.toggle('hidden', !updateWorker);
  }

  function statusChip(value) {
    return `<span class="status-chip ${value ? 'yes' : 'no'}">${escapeHtml(value ? t('yes') : t('no'))}</span>`;
  }

  function buildSharePayload() {
    return {
      s: state.startDate,
      p: Number(state.monthlyPrice) || 0,
      w: normalizeWeekdayList(state.weekdays),
      x: state.exclusions.filter((item) => item.start || item.end).map((item) => [item.start || '', item.end || ''])
    };
  }

  function encodeSharePayload() {
    const json = JSON.stringify(buildSharePayload());
    return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  function readStateFromUrl(input) {
    try {
      const url = new URL(input, window.location.href);
      const raw = url.searchParams.get(URL_PARAM);
      if (!raw) {
        return null;
      }
      const padded = raw.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((raw.length + 3) % 4);
      const decoded = atob(padded);
      const parsed = JSON.parse(decoded);
      return {
        startDate: isIsoDate(parsed.s) ? parsed.s : DEFAULT_STATE.startDate,
        monthlyPrice: Number.isFinite(Number(parsed.p)) ? Number(parsed.p) : DEFAULT_STATE.monthlyPrice,
        weekdays: Array.isArray(parsed.w) ? normalizeWeekdayList(parsed.w) : DEFAULT_STATE.weekdays,
        exclusions: Array.isArray(parsed.x)
          ? parsed.x.map((pair) => normalizeExclusion({
              id: makeId(),
              start: Array.isArray(pair) && isIsoDate(pair[0]) ? pair[0] : '',
              end: Array.isArray(pair) && isIsoDate(pair[1]) ? pair[1] : ''
            }))
          : DEFAULT_STATE.exclusions.map(normalizeExclusion)
      };
    } catch (error) {
      console.warn('Could not decode URL state', error);
      return null;
    }
  }

  function buildShareUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set(URL_PARAM, encodeSharePayload());
    return url.toString();
  }

  function syncUrlWithState() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set(URL_PARAM, encodeSharePayload());
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    } catch (error) {
      console.warn('Could not sync URL state', error);
    }
  }

  function fallbackCopyText(text) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', 'readonly');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
  }

  function exportCsv() {
    if (!currentData || !currentData.payments.length) {
      showToast(t('priceRequired'));
      return;
    }
    const rows = [
      [t('paymentNo'), t('paymentDate'), t('coverageDate'), t('paymentThreshold'), t('monthSessionCount')],
      ...currentData.payments.map((payment) => [
        payment.number,
        payment.paymentDate || '',
        payment.coverageDate || '',
        payment.threshold.toFixed(2),
        payment.monthSessionCount === '' ? '' : String(payment.monthSessionCount)
      ])
    ];
    const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\r\n');
    const csvWithBom = '\uFEFF' + csv;
    downloadFile(csvWithBom, `gym-subscription-schedule-${currentData.validStart}.csv`, 'text/csv;charset=utf-8');
  }

  function exportIcs() {
    if (!currentData || !currentData.payments.length) {
      showToast(t('priceRequired'));
      return;
    }

    const datedPayments = currentData.payments.filter((payment) => payment.paymentDate);
    const dtStamp = formatUtcStamp(new Date());
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//OpenAI//Gym Subscription Calculator//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    datedPayments.forEach((payment) => {
      const start = parseIsoDate(payment.paymentDate);
      const end = addDays(start, 1);
      const summary = t('icsSummary', { number: payment.number });
      const description = t('icsDescription', {
        threshold: formatMoney(payment.threshold),
        coverage: payment.coverageDate ? formatDateLabel(payment.coverageDate) : t('none'),
      });

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${payment.number}-${payment.paymentDate}@gym-subscription-pwa`);
      lines.push(`DTSTAMP:${dtStamp}`);
      lines.push(`DTSTART;VALUE=DATE:${toIcsDate(payment.paymentDate)}`);
      lines.push(`DTEND;VALUE=DATE:${toIcsDate(formatIsoDate(end))}`);
      lines.push(`SUMMARY:${escapeIcsText(summary)}`);
      lines.push(`DESCRIPTION:${escapeIcsText(description)}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:OPAQUE');
      lines.push('BEGIN:VALARM');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:${escapeIcsText(summary)}`);
      lines.push('TRIGGER:-P1D');
      lines.push('END:VALARM');
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');

    const content = lines.map(foldIcsLine).join('\r\n') + '\r\n';
    downloadFile(content, `gym-subscription-deadlines-${currentData.validStart}.ics`, 'text/calendar;charset=utf-8');
  }

  function csvEscape(value) {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function escapeIcsText(value) {
    return String(value ?? '')
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;');
  }

  function foldIcsLine(line) {
    const chunkSize = 73;
    if (line.length <= chunkSize) {
      return line;
    }
    const parts = [];
    let remaining = line;
    while (remaining.length > chunkSize) {
      parts.push(remaining.slice(0, chunkSize));
      remaining = ` ${remaining.slice(chunkSize)}`;
    }
    parts.push(remaining);
    return parts.join('\r\n');
  }

  function downloadFile(content, filename, mimeType) {
    const needsBom = mimeType.startsWith('text/csv');
    const blob = new Blob(
      needsBom ? ['\uFEFF', content] : [content],
      { type: mimeType }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('./service-worker.js');

      if (registration.waiting) {
        updateWorker = registration.waiting;
        renderStatus();
      }

      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) {
          return;
        }
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            updateWorker = registration.waiting || worker;
            renderStatus();
          }
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloadOnControllerChange) {
          return;
        }
        reloadOnControllerChange = true;
        window.location.reload();
      });

      window.addEventListener('online', () => {
        registration.update().catch(() => {});
      });

      window.setTimeout(() => {
        registration.update().catch(() => {});
      }, 1500);

      window.setInterval(() => {
        registration.update().catch(() => {});
      }, 60 * 60 * 1000);
    } catch (error) {
      console.warn('Service worker registration failed', error);
    }
  }

  function setupLaunchQueue() {
    if (!('launchQueue' in window) || typeof window.launchQueue.setConsumer !== 'function') {
      return;
    }

    window.launchQueue.setConsumer((launchParams) => {
      if (!launchParams || !launchParams.targetURL) {
        return;
      }
      const nextState = readStateFromUrl(launchParams.targetURL);
      if (!nextState) {
        return;
      }
      const currentLanguage = state.language;
      state = mergeState(state, nextState);
      state.language = currentLanguage;
      persistState();
      syncUrlWithState();
      renderApp();
      showToast(t('loadedFromLink'));
    });
  }

  function showToast(message) {
    refs.toast.textContent = message;
    refs.toast.classList.remove('hidden');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      refs.toast.classList.add('hidden');
    }, 2600);
  }

  function formatMoney(value) {
    if (!Number.isFinite(Number(value))) {
      return t('none');
    }
    const formatter = new Intl.NumberFormat(state.language === 'en' ? 'en-US' : 'ro-RO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${formatter.format(Number(value))} lei`;
  }

  function formatCount(value) {
    if (!Number.isFinite(Number(value))) {
      return t('none');
    }
    return new Intl.NumberFormat(state.language === 'en' ? 'en-US' : 'ro-RO', {
      maximumFractionDigits: 0
    }).format(Number(value));
  }

  function formatDateLabel(iso) {
    const date = parseIsoDate(iso);
    return new Intl.DateTimeFormat(state.language === 'en' ? 'en-US' : 'ro-RO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  }

  function formatMonthLabel(monthKey, language) {
    const [year, month] = monthKey.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, 1));
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ro-RO', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  }

  function toIcsDate(iso) {
    return iso.replace(/-/g, '');
  }

  function formatUtcStamp(date) {
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hour = pad(date.getUTCHours());
    const minute = pad(date.getUTCMinutes());
    const second = pad(date.getUTCSeconds());
    return `${year}${month}${day}T${hour}${minute}${second}Z`;
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function isIsoDate(value) {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  function parseIsoDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  function formatIsoDate(date) {
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  }

  function addDays(date, amount) {
    const next = new Date(date.getTime());
    next.setUTCDate(next.getUTCDate() + amount);
    return next;
  }

  function addMonthsClamped(date, amount) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const targetMonthIndex = month + amount;
    const targetYear = year + Math.floor(targetMonthIndex / 12);
    const targetMonth = ((targetMonthIndex % 12) + 12) % 12;
    const lastDay = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
    return new Date(Date.UTC(targetYear, targetMonth, Math.min(day, lastDay)));
  }

  function todayIsoLocal() {
    const now = new Date();
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
