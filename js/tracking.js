(function () {
  const LANG_STORAGE_KEY = 'melbet_lang';
  const ISO_LANGUAGE_MAP = {
    eng: 'en',
    arab: 'ar',
    franch: 'fr',
    esp: 'es',
    farsi: 'fa',
    mongol: 'mn',
    somali: 'so',
    portug: 'pt',
    amharic: 'am',
    turk: 'tr',
    russian: 'ru'
  };
  const PROGRAM_MAP = {
    'affiliate partner program': 'affiliate',
    'teamcash program': 'teamcash',
    'e-payment agent program': 'epayment'
  };
  const sectionEventsFired = new Set();
  const safeStorageGet = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  };

  const ensureDataLayer = () => {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  };

  const pushDataLayer = (payload) => {
    ensureDataLayer().push(payload);
  };

  const getRawLanguage = () => {
    const selectorValue = document.getElementById('lang-select')?.value;
    if (selectorValue && ISO_LANGUAGE_MAP[selectorValue]) return selectorValue;
    const storedValue = safeStorageGet(LANG_STORAGE_KEY);
    if (storedValue && ISO_LANGUAGE_MAP[storedValue]) return storedValue;
    return 'eng';
  };

  const getIsoLanguage = (rawLanguage = getRawLanguage()) => ISO_LANGUAGE_MAP[rawLanguage] || 'en';

  const getTargetCountry = (rawLanguage = getRawLanguage()) =>
    rawLanguage === 'mongol' ? 'mongolia' : 'unknow';

  const getAbsoluteUrl = (element) => {
    const href = element?.getAttribute('href') || '';
    try {
      return new URL(href, window.location.href).href;
    } catch (_) {
      return href;
    }
  };

  const normalizeProgram = (value) => {
    const normalized = String(value || '').trim().toLowerCase();
    return PROGRAM_MAP[normalized] || 'general';
  };

  const normalizeCountry = (value) =>
    String(value || '')
      .trim()
      .toLowerCase() || 'unknow';

  const updateTrackingContext = (rawLanguage) => {
    window.__melbetTrackingContext = {
      ...(window.__melbetTrackingContext || {}),
      rawLanguage,
      contentLanguage: getIsoLanguage(rawLanguage),
      targetCountry: getTargetCountry(rawLanguage)
    };
  };

  const bindCtaTracking = () => {
    document.querySelectorAll('[data-track-cta]').forEach((link) => {
      link.addEventListener('click', () => {
        pushDataLayer({
          event: 'cta_click',
          partner_program: link.dataset.partnerProgram || 'general',
          cta_location: link.dataset.ctaLocation || 'general',
          cta_text: link.textContent.trim(),
          destination_url: getAbsoluteUrl(link)
        });
      });
    });
  };

  const bindTelegramTracking = () => {
    document.querySelectorAll('[data-track-telegram]').forEach((link) => {
      link.addEventListener('click', () => {
        pushDataLayer({
          event: 'telegram_click',
          cta_location: link.dataset.ctaLocation || 'footer',
          destination_url: getAbsoluteUrl(link)
        });
      });
    });
  };

  const bindFaqTracking = () => {
    document.querySelectorAll('#faq .faq-list details').forEach((item) => {
      item.addEventListener('toggle', () => {
        const question = item.querySelector('summary')?.textContent.trim();
        if (!question) return;
        pushDataLayer({
          event: 'faq_interaction',
          faq_question: question,
          faq_action: item.open ? 'expand' : 'collapse'
        });
      });
    });
  };

  const bindLanguageTracking = () => {
    const selector = document.getElementById('lang-select');
    if (!selector) return;

    let previousLanguage = getIsoLanguage(selector.value || getRawLanguage());

    selector.addEventListener('change', (event) => {
      const nextRawLanguage = event.target.value || 'eng';
      const nextLanguage = getIsoLanguage(nextRawLanguage);
      updateTrackingContext(nextRawLanguage);

      pushDataLayer({
        event: 'language_change',
        previous_language: previousLanguage,
        new_language: nextLanguage,
        content_language: nextLanguage,
        target_country: getTargetCountry(nextRawLanguage)
      });

      previousLanguage = nextLanguage;
    });
  };

  const bindSectionViewTracking = () => {
    const sectionDefinitions = window.__melbetTrackingContext?.pageType === 'contact'
      ? [{ selector: '#partner-form', name: 'contact' }]
      : [
          { selector: '.hero', name: 'home' },
          { selector: '#programs', name: 'programs' },
          { selector: '#benefits', name: 'benefits' },
          { selector: '#faq', name: 'faq' },
          { selector: '#contact', name: 'contact' }
        ];

    const targets = sectionDefinitions
      .map((item) => ({ name: item.name, element: document.querySelector(item.selector) }))
      .filter((item) => item.element);

    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(({ name }) => {
        if (sectionEventsFired.has(name)) return;
        sectionEventsFired.add(name);
        pushDataLayer({ event: 'section_view', section_name: name });
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const name = entry.target.getAttribute('data-track-section-name');
          if (!name || sectionEventsFired.has(name)) {
            obs.unobserve(entry.target);
            return;
          }
          sectionEventsFired.add(name);
          pushDataLayer({
            event: 'section_view',
            section_name: name
          });
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    targets.forEach(({ element, name }) => {
      element.setAttribute('data-track-section-name', name);
      observer.observe(element);
    });
  };

  const bindOutboundBonusTracking = () => {
    const bonusLink = document.querySelector('[data-track-outbound-bonus]');
    if (!bonusLink) return;

    bonusLink.addEventListener('click', () => {
      pushDataLayer({
        event: 'outbound_click',
        destination_url: getAbsoluteUrl(bonusLink),
        link_text:
          bonusLink.querySelector('strong')?.textContent.trim() ||
          bonusLink.textContent.replace(/\s+/g, ' ').trim()
      });
    });
  };

  window.MelbetTracking = {
    pushFormSubmit(payload) {
      pushDataLayer({
        event: 'form_submit',
        form_name: 'partnership_application',
        partner_program: normalizeProgram(payload?.program),
        user_country: normalizeCountry(payload?.country)
      });
    }
  };

  updateTrackingContext(getRawLanguage());
  bindCtaTracking();
  bindTelegramTracking();
  bindFaqTracking();
  bindLanguageTracking();
  bindSectionViewTracking();
  bindOutboundBonusTracking();
})();
