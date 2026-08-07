(function () {
  const LANG_STORAGE_KEY = 'melbet_lang';
  const SUPPORTED_LANGS = new Set([
    'eng',
    'arab',
    'franch',
    'esp',
    'farsi',
    'mongol',
    'somali',
    'portug',
    'amharic',
    'turk',
    'russian'
  ]);
  const I18N_SRC = './js/i18n.js?v=16';
  let isLoaded = false;
  let isLoading = false;

  const safeGetStoredLang = () => {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY);
    } catch (_) {
      return null;
    }
  };

  const safeSetStoredLang = (value) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, value);
    } catch (_) {}
  };

  const shouldLoadForLang = (value) => SUPPORTED_LANGS.has(value) && value !== 'eng';

  const loadI18n = () => {
    if (isLoaded || isLoading) return;
    isLoading = true;

    const script = document.createElement('script');
    script.src = I18N_SRC;
    script.onload = () => {
      isLoaded = true;
      isLoading = false;
    };
    script.onerror = () => {
      isLoading = false;
    };
    document.body.appendChild(script);
  };

  const selector = document.getElementById('lang-select');
  const storedLang = safeGetStoredLang();

  if (shouldLoadForLang(storedLang)) {
    loadI18n();
    return;
  }

  if (!selector) return;

  selector.addEventListener('change', (event) => {
    const nextLang = event.target.value || 'eng';
    safeSetStoredLang(nextLang);
    if (shouldLoadForLang(nextLang)) {
      loadI18n();
    }
  });
})();
