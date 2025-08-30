// Popup --------------------------------------------------------------------------

function showPopup() {
  const overlay = document.getElementById('popup-overlay');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function hidePopup() {
  const overlay = document.getElementById('popup-overlay');
  overlay.classList.remove('show');
  document.body.style.overflow = 'auto';
}

document.getElementById('popup-overlay').addEventListener('click', function (e) {
  if (e.target === this) {
    hidePopup();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    hidePopup();
  }
});

function openThankYouPopup() {
  const popup = document.querySelector('#thank-you-popup');
  if (popup) {
    popup.style.display = 'block';
  }
}

// Lang --------------------------------------------------------------------------

let currentLang = localStorage.getItem('selectedLanguage') || "tr";
loadLanguage(currentLang);
updateLanguageSelector(currentLang);

document.querySelectorAll('.language-selector').forEach(languageSelector => {
  const languageTrigger = languageSelector.querySelector('.language-trigger');
  const languageOptions = languageSelector.querySelectorAll('.language-option');
  const currentLangCode = languageSelector.querySelector('.currentLangCode');

  languageTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    languageSelector.classList.toggle('active');
  });

  languageOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedLang = option.getAttribute('data-lang');
      const selectedLangName = `(${option.getAttribute('data-lang').toLowerCase()})`;
      currentLangCode.textContent = selectedLangName;
      languageSelector.classList.remove('active');

      loadLanguage(selectedLang);
      currentLang = selectedLang;
      localStorage.setItem('selectedLanguage', selectedLang);

      const event = new CustomEvent('languageChanged', { detail: { language: selectedLang } });
      document.dispatchEvent(event);
    });
  });
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.language-selector').forEach(languageSelector => {
    if (!languageSelector.contains(event.target)) {
      languageSelector.classList.remove('active');
    }
  });
});

function updateLanguageSelector(lang) {
  document.querySelectorAll('.language-selector').forEach(languageSelector => {
    const currentLangCode = languageSelector.querySelector('.currentLangCode');
    if (currentLangCode) {
      currentLangCode.textContent = `(${lang.toLowerCase()})`;
    }
  });
}

function loadLanguage(lang) {
  fetch(`/src/lang/car-rental/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const elements = document.querySelectorAll(`#${key}, [data-i18n="${key}"]`);
          elements.forEach(element => {
            if (element.tagName === 'BUTTON') {
              element.innerText = data[key];
            } else {
              element.innerHTML = data[key];
            }
          });
        }
      }
      document.documentElement.lang = lang;
      window.i18nData = data;
    })
    .catch(err => {
      console.error(`Dil dosyası yüklenirken hata oluştu (${lang}):`, err);
    });
}

window.i18n = {
  changeLanguage: function (lang) {
    loadLanguage(lang);
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    updateLanguageSelector(lang);
  },
  getCurrentLanguage: function () {
    return currentLang;
  },
  translate: function (key) {
    return window.i18nData && window.i18nData[key] ? window.i18nData[key] : key;
  }
};








const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    setTimeout(function () {
      document.querySelector('.navbar-toggler').click();
    }, 50);
  });
});

document.addEventListener('click', function (event) {
  const navbarCollapse = document.getElementById('navbarResponsive');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (navbarCollapse.classList.contains('show') &&
    !navbarCollapse.contains(event.target) &&
    event.target !== navbarToggler &&
    !navbarToggler.contains(event.target)) {

    setTimeout(function () {
      navbarToggler.click();
    }, 10);
  }
});

document.addEventListener('DOMContentLoaded', () => {

  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');

  const popupOverlay = document.getElementById('form-popup-overlay');
  const closePopupBtn = document.getElementById('close-popup');
  const forms = document.querySelectorAll('.popup-form');

  dropdownToggle.addEventListener('click', function (e) {
    e.preventDefault();
    dropdown.classList.toggle('dropdown-open');
  });

  document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('dropdown-open');
    }
  });

  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      dropdown.classList.remove('dropdown-open');

      const formId = this.getAttribute('data-form');

      forms.forEach(form => {
        form.classList.add('d-none');
      });

      const selectedForm = document.getElementById(formId);
      if (selectedForm) {
        selectedForm.classList.remove('d-none');
        popupOverlay.classList.remove('d-none');
      }
    });
  });


  closePopupBtn.addEventListener('click', function () {
    popupOverlay.classList.add('d-none');

    forms.forEach(form => {
      form.classList.add('d-none');
    });
  });

  popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
      popupOverlay.classList.add('d-none');

      forms.forEach(form => {
        form.classList.add('d-none');
      });
    }
  });

  function navbarShrink() {
    const navbar = document.getElementById('mainNav');
    const pageTop = document.getElementById('page-top');

    if (!navbar || !pageTop) return;

    if (window.scrollY === 0) {
      navbar.classList.remove('navbar-shrink');
    } else {
      navbar.classList.add('navbar-shrink');
    }
  }

  const pageTop = document.getElementById('page-top');
  if (pageTop) {
    window.addEventListener('scroll', navbarShrink);
    navbarShrink();
  }

  const mainNav = document.querySelector('#mainNav');
  if (mainNav && typeof bootstrap !== 'undefined') {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 70
    });
  }

});