const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const revealItems = document.querySelectorAll('.reveal');

const trackGaEvent = (eventName, params = {}) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
};

const CONTACT_TEXT = {
  eng: {
    phoneTitleTemplate: 'Use digits only, for example {example}',
    endpointMissing: 'Google Sheets endpoint is not configured yet.',
    submissionIgnored: 'Submission ignored.',
    submitting: 'Submitting application...',
    success: 'Your form has been sent. Our manager will contact you soon.',
    failed: 'Could not send the form. Please try again in a minute.',
    validation: {
      firstNameRequired: 'Please enter first name.',
      lastNameRequired: 'Please enter last name.',
      emailRequired: 'Please enter email.',
      emailInvalid: 'Please enter a valid email.',
      phoneRequired: 'Please enter phone number.',
      countryRequired: 'Please enter country.',
      programRequired: 'Please select a partnership program.',
      messageRequired: 'Please enter message.',
      consentRequired: 'Please accept Terms & Conditions.',
      firstNameInvalid: 'Please enter a valid first name.',
      lastNameInvalid: 'Please enter a valid last name.',
      countryInvalid: 'Please enter a valid country.',
      messageInvalid: 'Please enter a longer message.',
      phoneInvalid: 'Please enter a valid phone number, digits only (example: {example}).'
    }
  },
  arab: {
    phoneTitleTemplate: 'استخدم الأرقام فقط، مثال {example}',
    endpointMissing: 'رابط Google Sheets غير مضبوط بعد.',
    submissionIgnored: 'تم تجاهل الإرسال.',
    submitting: 'جار إرسال الطلب...',
    success: 'تم إرسال النموذج. سيتواصل معك مديرنا قريبا.',
    failed: 'تعذر إرسال النموذج. حاول مرة أخرى بعد قليل.',
    validation: {
      firstNameRequired: 'يرجى إدخال الاسم الأول.',
      lastNameRequired: 'يرجى إدخال اسم العائلة.',
      emailRequired: 'يرجى إدخال البريد الإلكتروني.',
      emailInvalid: 'يرجى إدخال بريد إلكتروني صالح.',
      phoneRequired: 'يرجى إدخال رقم الهاتف.',
      countryRequired: 'يرجى إدخال الدولة.',
      programRequired: 'يرجى اختيار برنامج الشراكة.',
      messageRequired: 'يرجى إدخال الرسالة.',
      consentRequired: 'يرجى الموافقة على الشروط والأحكام.',
      firstNameInvalid: 'يرجى إدخال اسم أول صحيح.',
      lastNameInvalid: 'يرجى إدخال اسم عائلة صحيح.',
      countryInvalid: 'يرجى إدخال دولة صحيحة.',
      messageInvalid: 'يرجى إدخال رسالة أطول.',
      phoneInvalid: 'يرجى إدخال رقم هاتف صحيح بالأرقام فقط (مثال: {example}).'
    }
  },
  franch: {
    phoneTitleTemplate: 'Utilisez uniquement des chiffres, par exemple {example}',
    endpointMissing: 'Le point de terminaison Google Sheets n est pas encore configure.',
    submissionIgnored: 'Envoi ignore.',
    submitting: 'Envoi de la demande...',
    success: 'Votre formulaire a ete envoye. Notre manager vous contactera bientot.',
    failed: 'Impossible d envoyer le formulaire. Veuillez reessayer dans une minute.',
    validation: {
      firstNameRequired: 'Veuillez saisir le prenom.',
      lastNameRequired: 'Veuillez saisir le nom.',
      emailRequired: 'Veuillez saisir l email.',
      emailInvalid: 'Veuillez saisir un email valide.',
      phoneRequired: 'Veuillez saisir le numero de telephone.',
      countryRequired: 'Veuillez saisir le pays.',
      programRequired: 'Veuillez selectionner un programme de partenariat.',
      messageRequired: 'Veuillez saisir le message.',
      consentRequired: 'Veuillez accepter les conditions.',
      firstNameInvalid: 'Veuillez saisir un prenom valide.',
      lastNameInvalid: 'Veuillez saisir un nom valide.',
      countryInvalid: 'Veuillez saisir un pays valide.',
      messageInvalid: 'Veuillez saisir un message plus long.',
      phoneInvalid: 'Veuillez saisir un numero valide, chiffres uniquement (exemple : {example}).'
    }
  },
  esp: {
    phoneTitleTemplate: 'Usa solo numeros, por ejemplo {example}',
    endpointMissing: 'El endpoint de Google Sheets aun no esta configurado.',
    submissionIgnored: 'Envio ignorado.',
    submitting: 'Enviando solicitud...',
    success: 'Tu formulario ha sido enviado. Nuestro gerente se pondra en contacto pronto.',
    failed: 'No se pudo enviar el formulario. Intentalo de nuevo en un minuto.',
    validation: {
      firstNameRequired: 'Introduce el nombre.',
      lastNameRequired: 'Introduce el apellido.',
      emailRequired: 'Introduce el correo electronico.',
      emailInvalid: 'Introduce un correo electronico valido.',
      phoneRequired: 'Introduce el numero de telefono.',
      countryRequired: 'Introduce el pais.',
      programRequired: 'Selecciona un programa de partnership.',
      messageRequired: 'Introduce el mensaje.',
      consentRequired: 'Acepta los terminos y condiciones.',
      firstNameInvalid: 'Introduce un nombre valido.',
      lastNameInvalid: 'Introduce un apellido valido.',
      countryInvalid: 'Introduce un pais valido.',
      messageInvalid: 'Introduce un mensaje mas largo.',
      phoneInvalid: 'Introduce un telefono valido, solo numeros (ejemplo: {example}).'
    }
  },
  farsi: {
    phoneTitleTemplate: 'فقط از اعداد استفاده کنید، مثلا {example}',
    endpointMissing: 'آدرس Google Sheets هنوز تنظیم نشده است.',
    submissionIgnored: 'ارسال نادیده گرفته شد.',
    submitting: 'در حال ارسال درخواست...',
    success: 'فرم شما ارسال شد. مدیر ما به زودی با شما تماس می گیرد.',
    failed: 'ارسال فرم ممکن نشد. یک دقیقه دیگر دوباره تلاش کنید.',
    validation: {
      firstNameRequired: 'لطفا نام را وارد کنید.',
      lastNameRequired: 'لطفا نام خانوادگی را وارد کنید.',
      emailRequired: 'لطفا ایمیل را وارد کنید.',
      emailInvalid: 'لطفا یک ایمیل معتبر وارد کنید.',
      phoneRequired: 'لطفا شماره تلفن را وارد کنید.',
      countryRequired: 'لطفا کشور را وارد کنید.',
      programRequired: 'لطفا برنامه همکاری را انتخاب کنید.',
      messageRequired: 'لطفا پیام را وارد کنید.',
      consentRequired: 'لطفا شرایط و قوانین را بپذیرید.',
      firstNameInvalid: 'لطفا یک نام معتبر وارد کنید.',
      lastNameInvalid: 'لطفا یک نام خانوادگی معتبر وارد کنید.',
      countryInvalid: 'لطفا یک کشور معتبر وارد کنید.',
      messageInvalid: 'لطفا پیام طولانی تری وارد کنید.',
      phoneInvalid: 'لطفا شماره معتبر فقط با ارقام وارد کنید (مثال: {example}).'
    }
  },
  mongol: {
    phoneTitleTemplate: 'Зөвхөн цифр ашиглана уу, жишээ нь {example}',
    endpointMissing: 'Google Sheets endpoint хараахан тохируулагдаагүй байна.',
    submissionIgnored: 'Илгээлтийг үл тоомсорлов.',
    submitting: 'Хүсэлт илгээж байна...',
    success: 'Таны маягт илгээгдлээ. Манай менежер удахгүй холбогдоно.',
    failed: 'Маягтыг илгээж чадсангүй. Түр хүлээгээд дахин оролдоно уу.',
    validation: {
      firstNameRequired: 'Нэрээ оруулна уу.',
      lastNameRequired: 'Овгоо оруулна уу.',
      emailRequired: 'Имэйлээ оруулна уу.',
      emailInvalid: 'Зөв имэйл оруулна уу.',
      phoneRequired: 'Утасны дугаараа оруулна уу.',
      countryRequired: 'Улсаа оруулна уу.',
      programRequired: 'Хамтын ажиллагааны хөтөлбөрөө сонгоно уу.',
      messageRequired: 'Мессежээ оруулна уу.',
      consentRequired: 'Нөхцөлийг зөвшөөрнө үү.',
      firstNameInvalid: 'Зөв нэр оруулна уу.',
      lastNameInvalid: 'Зөв овог оруулна уу.',
      countryInvalid: 'Зөв улс оруулна уу.',
      messageInvalid: 'Илүү урт мессеж оруулна уу.',
      phoneInvalid: 'Зөвхөн цифртэй зөв утасны дугаар оруулна уу (жишээ: {example}).'
    }
  },
  somali: {
    phoneTitleTemplate: 'Isticmaal tirooyin kaliya, tusaale ahaan {example}',
    endpointMissing: 'Google Sheets endpoint wali lama dejin.',
    submissionIgnored: 'Gudbinta waa la iska indhatiray.',
    submitting: 'Dalabka waa la dirayaa...',
    success: 'Foomkaaga waa la diray. Maamulaha ayaa kula soo xiriiri doona dhawaan.',
    failed: 'Foomka lama diri karin. Fadlan mar kale isku day daqiiqad kadib.',
    validation: {
      firstNameRequired: 'Fadlan geli magaca hore.',
      lastNameRequired: 'Fadlan geli magaca dambe.',
      emailRequired: 'Fadlan geli iimaylka.',
      emailInvalid: 'Fadlan geli iimayl sax ah.',
      phoneRequired: 'Fadlan geli lambarka taleefanka.',
      countryRequired: 'Fadlan geli dalka.',
      programRequired: 'Fadlan dooro barnaamijka partnership.',
      messageRequired: 'Fadlan geli fariinta.',
      consentRequired: 'Fadlan aqbal shuruudaha.',
      firstNameInvalid: 'Fadlan geli magac hore oo sax ah.',
      lastNameInvalid: 'Fadlan geli magac dambe oo sax ah.',
      countryInvalid: 'Fadlan geli dal sax ah.',
      messageInvalid: 'Fadlan geli fariin dheer.',
      phoneInvalid: 'Fadlan geli lambar sax ah, tirooyin keliya (tusaale: {example}).'
    }
  },
  portug: {
    phoneTitleTemplate: 'Use apenas numeros, por exemplo {example}',
    endpointMissing: 'O endpoint do Google Sheets ainda nao foi configurado.',
    submissionIgnored: 'Envio ignorado.',
    submitting: 'Enviando candidatura...',
    success: 'Seu formulario foi enviado. Nosso gerente entrara em contato em breve.',
    failed: 'Nao foi possivel enviar o formulario. Tente novamente em um minuto.',
    validation: {
      firstNameRequired: 'Informe o primeiro nome.',
      lastNameRequired: 'Informe o sobrenome.',
      emailRequired: 'Informe o email.',
      emailInvalid: 'Informe um email valido.',
      phoneRequired: 'Informe o telefone.',
      countryRequired: 'Informe o pais.',
      programRequired: 'Selecione um programa de parceria.',
      messageRequired: 'Informe a mensagem.',
      consentRequired: 'Aceite os termos e condicoes.',
      firstNameInvalid: 'Informe um primeiro nome valido.',
      lastNameInvalid: 'Informe um sobrenome valido.',
      countryInvalid: 'Informe um pais valido.',
      messageInvalid: 'Informe uma mensagem mais longa.',
      phoneInvalid: 'Informe um telefone valido, apenas numeros (exemplo: {example}).'
    }
  },
  amharic: {
    phoneTitleTemplate: 'ቁጥሮችን ብቻ ይጠቀሙ፣ ለምሳሌ {example}',
    endpointMissing: 'የGoogle Sheets endpoint ገና አልተዘጋጀም።',
    submissionIgnored: 'ማስገባቱ ተተውቷል።',
    submitting: 'ማመልከቻ በመላክ ላይ...',
    success: 'ቅጽዎ ተልኳል። ማኔጀራችን በቅርቡ ያነጋግርዎታል።',
    failed: 'ቅጹን መላክ አልተቻለም። እባክዎ ከአንድ ደቂቃ በኋላ ይሞክሩ።',
    validation: {
      firstNameRequired: 'እባክዎ የመጀመሪያ ስም ያስገቡ።',
      lastNameRequired: 'እባክዎ የአያት ስም ያስገቡ።',
      emailRequired: 'እባክዎ ኢሜይል ያስገቡ።',
      emailInvalid: 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ።',
      phoneRequired: 'እባክዎ ስልክ ቁጥር ያስገቡ።',
      countryRequired: 'እባክዎ አገር ያስገቡ።',
      programRequired: 'እባክዎ የአጋር ፕሮግራም ይምረጡ።',
      messageRequired: 'እባክዎ መልእክት ያስገቡ።',
      consentRequired: 'እባክዎ ውሎችን ይቀበሉ።',
      firstNameInvalid: 'እባክዎ ትክክለኛ የመጀመሪያ ስም ያስገቡ።',
      lastNameInvalid: 'እባክዎ ትክክለኛ የአያት ስም ያስገቡ።',
      countryInvalid: 'እባክዎ ትክክለኛ አገር ያስገቡ።',
      messageInvalid: 'እባክዎ ረዘም ያለ መልእክት ያስገቡ።',
      phoneInvalid: 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ፣ ቁጥሮች ብቻ (ምሳሌ: {example}).'
    }
  },
  turk: {
    phoneTitleTemplate: 'Yalnizca rakam kullanin, ornegin {example}',
    endpointMissing: 'Google Sheets endpoint henuz yapilandirilmadi.',
    submissionIgnored: 'Gonderim yok sayildi.',
    submitting: 'Basvuru gonderiliyor...',
    success: 'Formunuz gonderildi. Menajerimiz yakinda sizinle iletisime gececek.',
    failed: 'Form gonderilemedi. Lutfen bir dakika sonra tekrar deneyin.',
    validation: {
      firstNameRequired: 'Lutfen adinizi girin.',
      lastNameRequired: 'Lutfen soyadinizi girin.',
      emailRequired: 'Lutfen e-posta girin.',
      emailInvalid: 'Lutfen gecerli bir e-posta girin.',
      phoneRequired: 'Lutfen telefon numarasi girin.',
      countryRequired: 'Lutfen ulke girin.',
      programRequired: 'Lutfen ortaklik programi secin.',
      messageRequired: 'Lutfen mesaj girin.',
      consentRequired: 'Lutfen sartlari kabul edin.',
      firstNameInvalid: 'Lutfen gecerli bir ad girin.',
      lastNameInvalid: 'Lutfen gecerli bir soyad girin.',
      countryInvalid: 'Lutfen gecerli bir ulke girin.',
      messageInvalid: 'Lutfen daha uzun bir mesaj girin.',
      phoneInvalid: 'Lutfen yalnizca rakamlardan olusan gecerli bir telefon girin (ornek: {example}).'
    }
  },
  russian: {
    phoneTitleTemplate: 'Используйте только цифры, например {example}',
    endpointMissing: 'Endpoint Google Sheets еще не настроен.',
    submissionIgnored: 'Отправка проигнорирована.',
    submitting: 'Отправляем заявку...',
    success: 'Форма отправлена. Наш менеджер скоро свяжется с вами.',
    failed: 'Не удалось отправить форму. Попробуйте еще раз через минуту.',
    validation: {
      firstNameRequired: 'Введите имя.',
      lastNameRequired: 'Введите фамилию.',
      emailRequired: 'Введите email.',
      emailInvalid: 'Введите корректный email.',
      phoneRequired: 'Введите номер телефона.',
      countryRequired: 'Введите страну.',
      programRequired: 'Выберите партнерскую программу.',
      messageRequired: 'Введите сообщение.',
      consentRequired: 'Примите условия и положения.',
      firstNameInvalid: 'Введите корректное имя.',
      lastNameInvalid: 'Введите корректную фамилию.',
      countryInvalid: 'Введите корректную страну.',
      messageInvalid: 'Введите более длинное сообщение.',
      phoneInvalid: 'Введите корректный номер телефона, только цифры, например {example}.'
    }
  }
};

const getContactLocaleCode = () => {
  const selectValue = document.getElementById('lang-select')?.value;
  if (selectValue && CONTACT_TEXT[selectValue]) return selectValue;
  const htmlLang = document.documentElement.lang;
  if (htmlLang === 'ar') return 'arab';
  if (htmlLang === 'ru') return 'russian';
  return 'eng';
};

const getContactText = () => CONTACT_TEXT[getContactLocaleCode()] || CONTACT_TEXT.eng;

const formatLocalizedText = (template, replacements = {}) =>
  Object.entries(replacements).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template
  );

const bindContactClicksTracking = () => {
  const links = document.querySelectorAll('a[href]');
  links.forEach((link) => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href.includes('wa.me/')) {
      link.addEventListener('click', () => {
        trackGaEvent('click_whatsapp', {
          link_url: link.href,
          page_location: window.location.href
        });
      });
    }
    if (href.includes('t.me/')) {
      link.addEventListener('click', () => {
        trackGaEvent('click_telegram', {
          link_url: link.href,
          page_location: window.location.href
        });
      });
    }
  });
};

bindContactClicksTracking();

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const partnerForm = document.querySelector('.partner-form');

if (partnerForm) {
  const submitButton = partnerForm.querySelector('button[type="submit"]');
  const statusNode = partnerForm.querySelector('.form-status');
  const countryInput = partnerForm.querySelector('input[name="country"]');
  const phoneInput = partnerForm.querySelector('input[name="phone"]');
  const countryDataList = partnerForm.querySelector('#country-options');
  const defaultSubmitText = submitButton ? submitButton.textContent : '';
  const dialCodeCache = new Map();
  const countryCodeCache = new Map();
  let currentPhoneExample = '+1 202 555 0147';
  const COUNTRY_CODES = [
    'AF', 'AL', 'DZ', 'AD', 'AO', 'AG', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB',
    'BY', 'BE', 'BZ', 'BJ', 'BT', 'BO', 'BA', 'BW', 'BR', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH',
    'CM', 'CA', 'CF', 'TD', 'CL', 'CN', 'CO', 'KM', 'CG', 'CD', 'CR', 'CI', 'HR', 'CU', 'CY',
    'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FJ', 'FI',
    'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GR', 'GD', 'GT', 'GN', 'GW', 'GY', 'HT', 'HN', 'HU',
    'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KI', 'KP',
    'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MG', 'MW', 'MY',
    'MV', 'ML', 'MT', 'MH', 'MR', 'MU', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MA', 'MZ', 'MM',
    'NA', 'NR', 'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'MK', 'NO', 'OM', 'PK', 'PW', 'PA', 'PG',
    'PY', 'PE', 'PH', 'PL', 'PT', 'QA', 'RO', 'RU', 'RW', 'KN', 'LC', 'VC', 'WS', 'SM', 'ST',
    'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'SS', 'ES', 'LK', 'SD',
    'SR', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TO', 'TT', 'TN', 'TR', 'TM',
    'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN', 'YE', 'ZM', 'ZW'
  ];

  const phoneExamples = {
    US: '+1 202 555 0147',
    GB: '+44 7700 900123',
    FR: '+33 6 12 34 56 78',
    DE: '+49 1512 3456789',
    ES: '+34 612 34 56 78',
    IT: '+39 312 345 6789',
    TR: '+90 532 123 45 67',
    AE: '+971 50 123 4567',
    EG: '+20 10 1234 5678',
    SA: '+966 55 123 4567',
    IN: '+91 98765 43210',
    BR: '+55 11 91234 5678',
    RU: '+7 912 345 67 89',
    AM: '+374 77 123456',
    CN: '+86 131 2345 6789',
    JP: '+81 90 1234 5678',
    MX: '+52 55 1234 5678',
    CA: '+1 416 555 0100',
    EG: '+20 10 1234 5678'
  };

  const countryAliases = {
    usa: 'US',
    us: 'US',
    america: 'US',
    'united states': 'US',
    uk: 'GB',
    britain: 'GB',
    england: 'GB',
    uae: 'AE',
    emirates: 'AE',
    turkeye: 'TR',
    египет: 'EG',
    россия: 'RU',
    армения: 'AM'
  };

  const normalizeText = (value) =>
    (value || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const displayNames = typeof Intl !== 'undefined' && Intl.DisplayNames
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null;

  const countryCatalog = COUNTRY_CODES.map((code) => {
    const name = (displayNames && displayNames.of(code)) || code;
    return { code, name, normalized: normalizeText(name) };
  }).sort((a, b) => a.name.localeCompare(b.name));

  if (countryDataList) {
    const fragment = document.createDocumentFragment();
    countryCatalog.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.name;
      fragment.appendChild(option);
    });
    countryDataList.replaceChildren(fragment);
  }

  const getRegionFromBrowser = () => {
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const lang of langs) {
      if (!lang) continue;
      const parts = lang.split('-');
      if (parts.length > 1 && /^[A-Za-z]{2}$/.test(parts[1])) {
        const region = parts[1].toUpperCase();
        if (COUNTRY_CODES.includes(region)) return region;
      }
    }
    return 'US';
  };

  const detectCountryCodeSync = (rawCountryValue) => {
    const countryValue = normalizeText(rawCountryValue);
    if (countryValue) {
      if (countryAliases[countryValue]) return countryAliases[countryValue];
      if (/^[a-z]{2}$/.test(countryValue)) return countryValue.toUpperCase();

      const exact = countryCatalog.find((country) => country.normalized === countryValue);
      if (exact) return exact.code;

      const startsWith = countryCatalog.find((country) => country.normalized.startsWith(countryValue));
      if (startsWith) return startsWith.code;
    }
    return '';
  };

  const detectCountryCode = () => {
    const rawValue = countryInput && countryInput.value ? countryInput.value : '';
    const syncCode = detectCountryCodeSync(rawValue);
    if (syncCode) return syncCode;
    return getRegionFromBrowser();
  };

  const resolveCountryCode = async (rawCountryValue) => {
    const syncCode = detectCountryCodeSync(rawCountryValue);
    if (syncCode) return syncCode;

    const normalized = normalizeText(rawCountryValue);
    if (!normalized) return getRegionFromBrowser();
    if (countryCodeCache.has(normalized)) return countryCodeCache.get(normalized);

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(rawCountryValue)}?fields=cca2`,
        { method: 'GET' }
      );
      if (!response.ok) return getRegionFromBrowser();
      const data = await response.json();
      const code = Array.isArray(data) && data[0] && data[0].cca2 ? String(data[0].cca2).toUpperCase() : getRegionFromBrowser();
      countryCodeCache.set(normalized, code);
      return code;
    } catch (_) {
      return getRegionFromBrowser();
    }
  };

  const getPhoneExample = () => {
    const code = detectCountryCode();
    if (phoneExamples[code]) return phoneExamples[code];
    if (dialCodeCache.has(code)) return `${dialCodeCache.get(code)} 123 456 789`;
    return '+1 202 555 0147';
  };

  const setStatus = (message, state) => {
    if (!statusNode) return;
    statusNode.textContent = message;
    statusNode.classList.remove('is-loading', 'is-success', 'is-error');
    if (state) statusNode.classList.add(state);
  };

  const setSubmitting = (isSubmitting) => {
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? 'Sending...' : defaultSubmitText;
  };

  const fetchDialCode = async (countryCode) => {
    if (!countryCode || dialCodeCache.has(countryCode)) return dialCodeCache.get(countryCode) || null;

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}?fields=idd`,
        { method: 'GET' }
      );
      if (!response.ok) return null;
      const data = await response.json();
      const item = Array.isArray(data) ? data[0] : data;
      const root = item && item.idd ? item.idd.root || '' : '';
      const suffixes = item && item.idd && Array.isArray(item.idd.suffixes) ? item.idd.suffixes : [];
      const suffix = suffixes.length ? suffixes[0] : '';
      if (!root) return null;
      const dial = `${root}${suffix}`;
      dialCodeCache.set(countryCode, dial);
      return dial;
    } catch (_) {
      return null;
    }
  };

  const updatePhoneHint = async () => {
    if (!phoneInput) return;
    const localeText = getContactText();
    const rawCountry = countryInput && countryInput.value ? countryInput.value : '';
    const countryCode = await resolveCountryCode(rawCountry);
    let example = phoneExamples[countryCode];
    if (!example) {
      const dial = await fetchDialCode(countryCode);
      if (dial) example = `${dial} 123 456 789`;
    }
    if (!example) example = '+1 202 555 0147';
    currentPhoneExample = example;
    phoneInput.placeholder = example;
    phoneInput.title = formatLocalizedText(localeText.phoneTitleTemplate, { example });
  };

  const validatePayload = (payload) => {
    const localeText = getContactText();
    if (!payload.first_name) return localeText.validation.firstNameRequired;
    if (!payload.last_name) return localeText.validation.lastNameRequired;
    if (!payload.email) return localeText.validation.emailRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return localeText.validation.emailInvalid;
    if (!payload.phone) return localeText.validation.phoneRequired;
    if (!payload.country) return localeText.validation.countryRequired;
    if (!payload.program) return localeText.validation.programRequired;
    if (!payload.message) return localeText.validation.messageRequired;
    if (!payload.consent) return localeText.validation.consentRequired;

    if (!/^[A-Za-z\u0400-\u04FF' -]{2,50}$/.test(payload.first_name)) {
      return localeText.validation.firstNameInvalid;
    }
    if (!/^[A-Za-z\u0400-\u04FF' -]{2,50}$/.test(payload.last_name)) {
      return localeText.validation.lastNameInvalid;
    }
    if (payload.country.length < 2) return localeText.validation.countryInvalid;
    if (payload.message.length < 5) return localeText.validation.messageInvalid;
    const normalizedPhone = payload.phone.replace(/[\s()-]/g, '');
    if (!/^\+?\d{8,15}$/.test(normalizedPhone)) {
      return formatLocalizedText(localeText.validation.phoneInvalid, {
        example: currentPhoneExample || getPhoneExample()
      });
    }
    return '';
  };

  updatePhoneHint();
  if (countryInput) {
    countryInput.addEventListener('input', updatePhoneHint);
    countryInput.addEventListener('blur', updatePhoneHint);
  }

  partnerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const endpoint = partnerForm.dataset.sheetEndpoint || '';
    const localeText = getContactText();
    if (!endpoint || endpoint.includes('PASTE_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE')) {
      setStatus(localeText.endpointMissing, 'is-error');
      return;
    }

    const formData = new FormData(partnerForm);
    if ((formData.get('website') || '').toString().trim() !== '') {
      setStatus(localeText.submissionIgnored, 'is-success');
      return;
    }

    const payload = {
      submitted_at: new Date().toISOString(),
      page: window.location.href,
      first_name: (formData.get('first_name') || '').toString().trim(),
      last_name: (formData.get('last_name') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim(),
      country: (formData.get('country') || '').toString().trim(),
      program: (formData.get('program') || '').toString().trim(),
      traffic_source: (formData.get('traffic_source') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim(),
      consent: Boolean(formData.get('consent')),
      updates_opt_in: Boolean(formData.get('updates_opt_in'))
    };

    const validationError = validatePayload(payload);
    if (validationError) {
      setStatus(validationError, 'is-error');
      if (phoneInput && validationError.toLowerCase().includes('phone')) {
        phoneInput.focus();
      }
      return;
    }

    setSubmitting(true);
    setStatus(localeText.submitting, 'is-loading');

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      let parsed = null;
      try {
        parsed = await response.json();
      } catch (_) {
        parsed = null;
      }

      if (parsed && parsed.ok === false) {
        throw new Error(parsed.error || 'Sheets endpoint returned an error');
      }

      trackGaEvent('form_sent', {
        form_name: 'partner_form',
        page_location: window.location.href,
        program: payload.program
      });
      if (window.MelbetTracking?.pushFormSubmit) {
        window.MelbetTracking.pushFormSubmit(payload);
      }
      setStatus(localeText.success, 'is-success');
      partnerForm.reset();
    } catch (error) {
      try {
        // Fallback for Apps Script CORS restrictions from localhost/dev origins.
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload)
        });
        trackGaEvent('form_sent', {
          form_name: 'partner_form',
          page_location: window.location.href,
          program: payload.program
        });
        if (window.MelbetTracking?.pushFormSubmit) {
          window.MelbetTracking.pushFormSubmit(payload);
        }
        setStatus(localeText.success, 'is-success');
        partnerForm.reset();
      } catch (fallbackError) {
        console.error('Form submit error:', error, fallbackError);
        setStatus(localeText.failed, 'is-error');
      }
    } finally {
      setSubmitting(false);
    }
  });
}
