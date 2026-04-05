(() => {
  'use strict';

  const STORAGE_KEY = 'gym-subscription-pwa-state-v3';
  const LEGACY_STORAGE_KEYS = ['gym-subscription-pwa-state-v1'];
  const URL_PARAM = 'state';
  const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
  const DEFAULT_SESSION_TIME = '19:30';
  const SESSION_DURATION_MINUTES = 120;

  const I18N = {
    ro: {
      title: 'Calculator abonament sală',
      configTitle: 'Configurare',
      startDate: 'Data de start',
      sessionTime: 'Ora ședinței',
      timezoneDetected: 'Fus orar detectat',
      monthlyPrice: 'Abonament lunar (lei)',
      weekdays: 'Zile eligibile pentru antrenament',
      excludedTitle: 'Intervale excluse',
      excludedHint: 'Sunt preîncărcate perioadele implicite pentru Paștele ortodox 2026, Crăciun 2026 și Anul Nou 2026-2027. Le poți edita direct aici.',
      addInterval: 'Adaugă interval',
      excludedRange: 'Interval exclus',
      from: 'De la',
      to: 'Până la',
      remove: 'Șterge',
      intervalIncomplete: 'Intervalul este ignorat până completezi ambele date.',
      intervalInvalid: 'Data de final trebuie să fie aceeași sau după data de start.',
      noExclusions: 'Nu există intervale excluse. Poți adăuga unul nou.',
      summaryTitle: 'Rezumat',
      annualTotal: 'Total perioadă',
      eligibleSessions: 'Ședințe eligibile',
      costPerSession: 'Cost / ședință',
      cycleRange: 'Perioada activă',
      remainingSessions: 'Ședințe rămase din perioadă',
      excludedPotentialSessions: 'Ședințe excluse din perioadă',
      plainLanguageTitle: 'Explicații',
      actionsTitle: 'Export și distribuire',
      copyShareLink: 'Copiază link-ul sesiunii',
      exportCsv: 'Export CSV',
      exportIcs: 'Export Calendar',
      shareHint: 'Link-ul copiat include data de start, ora ședinței, prețul, zilele și intervalele excluse. Limba rămâne locală pe fiecare dispozitiv.',
      icsHint: 'Exportul ICS include toate ședințele eligibile ca evenimente de 120 de minute la ora selectată, în fusul orar detectat, plus scadențele de plată cu prefix vizibil.',
      offlineHint: 'Instalează aplicația ca PWA pentru utilizare offline după prima încărcare.',
      paymentTitle: 'Program plăți',
      paymentNo: 'Plata',
      paymentDate: 'Data plății',
      paymentThreshold: 'Prag cumulat',
      monthSessionCount: 'Ședințe',
      coverageDate: 'Acoperă până la',
      refreshForUpdate: 'Reîncarcă pentru actualizare',
      offlineBanner: 'Ești offline. Interfața din cache și ultima stare locală rămân disponibile.',
      updateReady: 'Este disponibilă o versiune nouă a aplicației.',
      calendarHint: 'Tabelul include doar zilele dintre data de start și 31 decembrie din același an.',
      date: 'Data',
      weekday: 'Zi',
      weekdayEnabled: 'Zi selectată',
      excludedColumn: 'Interval exclus',
      eligible: 'Ședință eligibilă',
      sessionNumber: 'Nr. ședință',
      sessionValue: 'Valoare ședință',
      accumulated: 'Consum cumulat',
      yes: 'Da',
      no: 'Nu',
      none: '—',
      dueBadge: 'Scadență',
      linkCopied: 'Link-ul a fost copiat.',
      linkCopyFailed: 'Nu am putut copia automat link-ul. Copiază-l manual din bara de adrese.',
      loadedFromLink: 'Configurația din link a fost aplicată.',
      priceRequired: 'Introdu un preț lunar mai mare decât 0 pentru a genera programul de plăți.',
      noEligibleSessionsNote: 'Nu există ședințe eligibile cu selecția curentă de zile și intervale.',
      noCalendarEventsNote: 'Nu există evenimente eligibile pentru exportul ICS.',
      icsShared: 'Fișierul ICS a fost trimis către foaia de partajare nativă.',
      icsDownloadStarted: 'Fișierul ICS a fost generat.',
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
        2: 'Marți',
        3: 'Miercuri',
        4: 'Joi',
        5: 'Vineri',
        6: 'Sâmbătă',
        0: 'Duminică'
      },
      calendarSummary: ({ count }) => `Baza calendaristică: ${count} zile din perioada activă`,
      noteAnnual: ({ annual, monthly, months }) => `Totalul perioadei rămâne fix la ${annual} (${monthly} x ${months}).`,
      noteEligible: ({ count, removed }) => `În perioada curentă există ${count} ședințe eligibile, iar intervalele excluse elimină ${removed} zile care altfel ar fi fost eligibile.`,
      noteCost: ({ annual, count, cost }) => `Costul pe ședință devine ${cost} deoarece formula este ${annual} / ${count}.`,
      noteFinalCoverage: ({ date }) => `Ultimul prag al perioadei este consumat la data de ${date}.`,
      noteRemaining: ({ count }) => `De azi înainte mai rămân ${count} ședințe eligibile în această perioadă.`,
      noteInvalidIntervals: ({ count }) => `${count} interval(e) invalide sunt ignorate până le corectezi.`,
      noteNextPayment: ({ number, date, threshold }) => `Următoarea scadență este plata ${number} la data de ${date}, la pragul ${threshold}.`,
      nextDeadlineBadge: ({ number, date }) => `Următoarea scadență: plata ${number} - ${date}`,
      noUpcomingDeadline: 'Nu mai există scadențe viitoare în această perioadă.',
      icsCalendarName: 'Calendar abonament sală',
      icsPaymentSummary: ({ number }) => `[PLATĂ] Scadență abonament #${number}`,
      icsPaymentDescription: ({ threshold, coverage, month }) => `Prag cumulat: ${threshold}. Luna de referință: ${month}. Acoperă până la: ${coverage}.`,
      icsGymSummary: ({ number }) => `[SALĂ] Ședința #${number}`,
      icsGymDescription: ({ time, timeZone, sessionValue, accumulated }) => `Ora ședinței: ${time}. Fus orar: ${timeZone}. Valoare ședință: ${sessionValue}. Consum cumulat: ${accumulated}.`
    },
    en: {
      title: 'Gym subscription calculator',
      configTitle: 'Setup',
      startDate: 'Start date',
      sessionTime: 'Session hour',
      timezoneDetected: 'Detected time zone',
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
      annualTotal: 'Period total',
      eligibleSessions: 'Eligible sessions',
      costPerSession: 'Cost / session',
      cycleRange: 'Active period',
      remainingSessions: 'Sessions remaining from today',
      excludedPotentialSessions: 'Sessions removed by ranges',
      plainLanguageTitle: 'Explanations',
      actionsTitle: 'Export and sharing',
      copyShareLink: 'Copy share link',
      exportCsv: 'Export CSV',
      exportIcs: 'Export Calendar',
      shareHint: 'The copied link includes the start date, session hour, price, weekdays, and excluded ranges. Language stays local on each device.',
      icsHint: 'ICS export includes all eligible gym sessions as 120-minute events at the selected hour, in the detected time zone, plus payment deadlines with a clear prefix.',
      offlineHint: 'Install the app as a PWA to use it offline after the first load.',
      paymentTitle: 'Payment schedule',
      paymentNo: 'Payment',
      paymentDate: 'Payment date',
      paymentThreshold: 'Cumulative threshold',
      monthSessionCount: 'Sessions',
      coverageDate: 'Covers until',
      refreshForUpdate: 'Reload to update',
      offlineBanner: 'You are offline. The cached shell and your latest local state are still available.',
      updateReady: 'A newer version of the app is available.',
      calendarHint: 'The table includes only the days between the start date and December 31 of the same year.',
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
      none: '—',
      dueBadge: 'Due',
      linkCopied: 'The share link was copied.',
      linkCopyFailed: 'Automatic copy failed. Please copy the current address manually.',
      loadedFromLink: 'The shared configuration has been applied.',
      priceRequired: 'Enter a monthly price above 0 to generate the payment schedule.',
      noEligibleSessionsNote: 'There are no eligible sessions with the current weekday selection and excluded ranges.',
      noCalendarEventsNote: 'There are no eligible events to export to ICS.',
      icsShared: 'The ICS file was handed to the native share sheet.',
      icsDownloadStarted: 'The ICS file was generated.',
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
      calendarSummary: ({ count }) => `Calendar base: ${count} days inside the active period`,
      noteAnnual: ({ annual, monthly, months }) => `The period total stays fixed at ${annual} (${monthly} x ${months}).`,
      noteEligible: ({ count, removed }) => `This period contains ${count} eligible sessions, and your excluded ranges remove ${removed} days that would otherwise have counted.`,
      noteCost: ({ annual, count, cost }) => `The cost per session becomes ${cost} because the formula is ${annual} / ${count}.`,
      noteFinalCoverage: ({ date }) => `The final threshold for this period is consumed on ${date}.`,
      noteRemaining: ({ count }) => `From today onward, ${count} eligible sessions remain in this period.`,
      noteInvalidIntervals: ({ count }) => `${count} invalid range(s) are ignored until you fix them.`,
      noteNextPayment: ({ number, date, threshold }) => `The next due date is payment ${number} on ${date}, at the threshold ${threshold}.`,
      nextDeadlineBadge: ({ number, date }) => `Next due date: payment ${number} - ${date}`,
      noUpcomingDeadline: 'There are no future due dates left in this period.',
      icsCalendarName: 'Gym subscription calendar',
      icsPaymentSummary: ({ number }) => `[PAYMENT] Gym subscription due #${number}`,
      icsPaymentDescription: ({ threshold, coverage, month }) => `Cumulative threshold: ${threshold}. Reference month: ${month}. Covers until: ${coverage}.`,
      icsGymSummary: ({ number }) => `[GYM] Session #${number}`,
      icsGymDescription: ({ time, timeZone, sessionValue, accumulated }) => `Session time: ${time}. Time zone: ${timeZone}. Session value: ${sessionValue}. Accumulated value: ${accumulated}.`
    }
  };

  function makeId() {
    return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  const DEFAULT_STATE = {
    startDate: '2026-01-05',
    sessionTime: DEFAULT_SESSION_TIME,
    monthlyPrice: 150,
    weekdays: [1, 3, 5],
    exclusions: [
      { id: makeId(), start: '2026-04-10', end: '2026-04-13' },
      { id: makeId(), start: '2026-12-23', end: '2026-12-25' },
      { id: makeId(), start: '2026-12-28', end: '2026-12-31' }
    ],
    language: 'ro'
  };

  const refs = {
    startDateInput: document.getElementById('startDateInput'),
    sessionTimeInput: document.getElementById('sessionTimeInput'),
    monthlyPriceInput: document.getElementById('monthlyPriceInput'),
    timezoneDisplay: document.getElementById('timezoneDisplay'),
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
      state.startDate = isIsoDate(refs.startDateInput.value) ? refs.startDateInput.value : DEFAULT_STATE.startDate;
      commitState();
    });

    refs.sessionTimeInput.addEventListener('input', () => {
      state.sessionTime = normalizeTimeValue(refs.sessionTimeInput.value, state.sessionTime);
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
      const current = localStorage.getItem(STORAGE_KEY);
      if (current) {
        return JSON.parse(current);
      }
      for (const legacyKey of LEGACY_STORAGE_KEYS) {
        const legacy = localStorage.getItem(legacyKey);
        if (legacy) {
          return JSON.parse(legacy);
        }
      }
      return null;
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
    return {
      startDate: isIsoDate(patch && patch.startDate) ? patch.startDate : base.startDate,
      sessionTime: normalizeTimeValue(patch && patch.sessionTime, base.sessionTime),
      monthlyPrice: Number.isFinite(Number(patch && patch.monthlyPrice)) ? Number(patch.monthlyPrice) : base.monthlyPrice,
      weekdays: Array.isArray(patch && patch.weekdays) ? normalizeWeekdayList(patch.weekdays) : normalizeWeekdayList(base.weekdays),
      exclusions: Array.isArray(patch && patch.exclusions)
        ? patch.exclusions.map(normalizeExclusion)
        : base.exclusions.map(normalizeExclusion),
      language: patch && (patch.language === 'en' || patch.language === 'ro') ? patch.language : base.language
    };
  }

  function normalizeExclusion(item) {
    return {
      id: item && typeof item.id === 'string' ? item.id : makeId(),
      start: item && isIsoDate(item.start) ? item.start : '',
      end: item && isIsoDate(item.end) ? item.end : ''
    };
  }

  function normalizeWeekdayList(list) {
    const set = new Set((list || []).map((value) => Number(value)));
    return WEEKDAY_ORDER.filter((day) => set.has(day));
  }

  function normalizeTimeValue(value, fallback = DEFAULT_SESSION_TIME) {
    return isTimeValue(value) ? value : fallback;
  }

  function isTimeValue(value) {
    if (typeof value !== 'string' || !/^\d{2}:\d{2}$/.test(value)) {
      return false;
    }
    const [hour, minute] = value.split(':').map(Number);
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
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
    refs.sessionTimeInput.value = state.sessionTime;
    refs.monthlyPriceInput.value = String(state.monthlyPrice ?? 0);
    refs.timezoneDisplay.value = getDetectedTimeZone();
    renderWeekdaySelector();
    renderExclusions();
    currentData = calculateState(state);
    renderSummary(currentData);
    renderPlainLanguage(currentData);
    renderPaymentTable(currentData);
    renderCalendarTable(currentData);
    refs.exportCsvBtn.disabled = currentData.payments.length === 0;
    refs.exportIcsBtn.disabled = currentData.payments.length === 0 && currentData.rows.every((row) => !row.eligible);
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
          <span>${escapeHtml(strings.weekdayLong[day])}</span>
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
    const startYear = startDate.getUTCFullYear();
    const cycleEndExclusive = new Date(Date.UTC(startYear + 1, 0, 1));
    const cycleEndInclusive = addDays(cycleEndExclusive, -1);
    const billingMonths = 12 - startDate.getUTCMonth();
    const selectedWeekdays = new Set(normalizeWeekdayList(currentState.weekdays));
    const exclusions = currentState.exclusions.map((item) => ({
      id: item.id,
      start: item.start,
      end: item.end,
      valid: Boolean(item.start && item.end && item.start <= item.end)
    }));

    const monthlyPrice = Number(currentState.monthlyPrice) || 0;
    const monthlyPriceCents = Math.round(monthlyPrice * 100);
    const periodTotalCents = monthlyPriceCents * billingMonths;
    const hasPositivePrice = monthlyPriceCents > 0;

    let excludedPotentialSessions = 0;
    let sessionCounter = 0;
    const monthCounts = {};
    const rows = [];

    let cursor = new Date(startDate.getTime());
    while (cursor.getTime() < cycleEndExclusive.getTime()) {
      const iso = formatIsoDate(cursor);
      const weekdayIndex = cursor.getUTCDay();
      const isStartDate = iso === validStart;
      const weekdayEnabled = selectedWeekdays.has(weekdayIndex);
      const matchingExclusions = exclusions.filter((interval) => interval.valid && interval.start <= iso && iso <= interval.end);
      const excluded = matchingExclusions.length > 0;
      const wouldBeEligible = weekdayEnabled || isStartDate;
      if (wouldBeEligible && excluded) {
        excludedPotentialSessions += 1;
      }
      const eligible = wouldBeEligible && !excluded;
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
    const costPerSession = hasPositivePrice && eligibleCount > 0 ? periodTotalCents / eligibleCount / 100 : 0;
    const thresholds = hasPositivePrice
      ? Array.from({ length: billingMonths }, (_, index) => ({
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
        row.sessionValue = periodTotalCents / eligibleCount / 100;
        row.accumulated = periodTotalCents * row.sessionNumber / eligibleCount / 100;
        while (
          thresholdCursor < thresholds.length &&
          (periodTotalCents * row.sessionNumber / eligibleCount) + 0.0001 >= thresholds[thresholdCursor].thresholdCents
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
      annualTotal: periodTotalCents / 100,
      billingMonths,
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
      monthly: formatMoney(Number(state.monthlyPrice) || 0),
      months: formatCount(data.billingMonths)
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
          <td>${escapeHtml(monthCount)}</td>
          <td class="mono">${escapeHtml(formatMoney(payment.threshold))}</td>
        </tr>
      `;
    }).join('');
  }

  function renderCalendarTable(data) {
    refs.calendarSummaryLine.textContent = t('calendarSummary', { count: formatCount(data.rows.length) });
    refs.calendarTableBody.innerHTML = data.rows.map((row) => `
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
    `).join('');
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
      h: state.sessionTime,
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
        sessionTime: isTimeValue(parsed.h) ? parsed.h : DEFAULT_STATE.sessionTime,
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
    downloadBlob(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }), `gym-subscription-schedule-${currentData.validStart}.csv`);
  }

  async function exportIcs() {
    if (!currentData) {
      showToast(t('noCalendarEventsNote'));
      return;
    }

    const payments = currentData.payments.filter((payment) => payment.paymentDate);
    const sessions = currentData.rows.filter((row) => row.eligible);
    if (!payments.length && !sessions.length) {
      showToast(t('noCalendarEventsNote'));
      return;
    }

    const timeZone = getDetectedTimeZone();
    const dtStamp = formatUtcStamp(new Date());
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//OpenAI//Gym Subscription Calculator//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${escapeIcsText(t('icsCalendarName'))}`,
      `X-WR-TIMEZONE:${escapeIcsText(timeZone)}`
    ];

    payments.forEach((payment) => {
      const start = parseIsoDate(payment.paymentDate);
      const end = addDays(start, 1);
      const summary = t('icsPaymentSummary', { number: payment.number });
      const description = t('icsPaymentDescription', {
        threshold: formatMoney(payment.threshold),
        coverage: payment.coverageDate ? formatDateLabel(payment.coverageDate) : t('none')
      });

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:payment-${payment.number}-${payment.paymentDate}@gym-subscription-pwa`);
      lines.push(`DTSTAMP:${dtStamp}`);
      lines.push(`DTSTART;VALUE=DATE:${toIcsDate(payment.paymentDate)}`);
      lines.push(`DTEND;VALUE=DATE:${toIcsDate(formatIsoDate(end))}`);
      lines.push(`SUMMARY:${escapeIcsText(summary)}`);
      lines.push(`DESCRIPTION:${escapeIcsText(description)}`);
      lines.push('CATEGORIES:PAYMENT');
      lines.push('COLOR:tomato');
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:TRANSPARENT');
      lines.push('BEGIN:VALARM');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:${escapeIcsText(summary)}`);
      lines.push('TRIGGER:-P1D');
      lines.push('END:VALARM');
      lines.push('END:VEVENT');
    });

    sessions.forEach((row) => {
      const summary = t('icsGymSummary', { number: row.sessionNumber });
      const description = t('icsGymDescription', {
        time: formatTimeLabel(state.sessionTime),
        timeZone,
        sessionValue: row.sessionValue ? formatMoney(row.sessionValue) : t('none'),
        accumulated: row.accumulated ? formatMoney(row.accumulated) : t('none')
      });
      const range = buildFloatingEventRange(row.iso, state.sessionTime, SESSION_DURATION_MINUTES);

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:gym-${row.iso}-${state.sessionTime}-${row.sessionNumber}@gym-subscription-pwa`);
      lines.push(`DTSTAMP:${dtStamp}`);
      lines.push(`DTSTART:${range.start}`);
      lines.push(`DTEND:${range.end}`);
      lines.push(`SUMMARY:${escapeIcsText(summary)}`);
      lines.push(`DESCRIPTION:${escapeIcsText(description)}`);
      lines.push('CATEGORIES:GYM SESSION');
      lines.push('COLOR:steelblue');
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:OPAQUE');
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');

    const content = lines.map(foldIcsLine).join('\r\n') + '\r\n';
    const filename = `gym-subscription-calendar-${currentData.validStart}.ics`;
    await shareOrDownloadCalendarFile(content, filename);
  }

  function buildFloatingEventRange(isoDate, timeValue, durationMinutes) {
    const [year, month, day] = isoDate.split('-').map(Number);
    const [hour, minute] = timeValue.split(':').map(Number);
    const start = new Date(year, month - 1, day, hour, minute, 0, 0);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    return {
      start: formatLocalIcsDateTime(start),
      end: formatLocalIcsDateTime(end)
    };
  }

  async function shareOrDownloadCalendarFile(content, filename) {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && typeof File === 'function') {
      const shareCandidates = [
        new File([content], filename, { type: 'text/calendar' }),
        new File([content], filename, { type: 'text/plain' })
      ];
      for (const file of shareCandidates) {
        try {
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: filename
            });
            showToast(t('icsShared'));
            return;
          }
        } catch (error) {
          if (error && error.name === 'AbortError') {
            return;
          }
          console.warn('Native share failed', error);
        }
      }
    }

    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    downloadBlob(blob, filename);
    showToast(t('icsDownloadStarted'));
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
    const encoder = new TextEncoder();
    if (encoder.encode(line).length <= 75) {
      return line;
    }

    const chunks = [];
    let current = '';

    for (const char of line) {
      const candidate = current + char;
      if (encoder.encode(candidate).length > 75) {
        chunks.push(current);
        current = ` ${char}`;
      } else {
        current = candidate;
      }
    }

    if (current) {
      chunks.push(current);
    }

    return chunks.join('\r\n');
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const isAppleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isAppleMobile) {
      const popup = window.open(url, '_blank', 'noopener');
      if (!popup) {
        window.location.href = url;
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 30 * 1000);
      return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
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
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  }

  function formatTimeLabel(timeValue) {
    if (!isTimeValue(timeValue)) {
      return t('none');
    }
    const [hour, minute] = timeValue.split(':').map(Number);
    const sample = new Date(2000, 0, 1, hour, minute, 0, 0);
    return new Intl.DateTimeFormat(state.language === 'en' ? 'en-US' : 'ro-RO', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(sample);
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

  function formatLocalIcsDateTime(date) {
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  }

  function getDetectedTimeZone() {
    try {
      const resolved = new Intl.DateTimeFormat().resolvedOptions();
      return resolved && resolved.timeZone ? resolved.timeZone : 'UTC';
    } catch (error) {
      return 'UTC';
    }
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
