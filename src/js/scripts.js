const video = document.getElementById('intro-video');

const isMobile = window.matchMedia('(max-width: 780px)').matches;
const source = document.createElement('source');
source.src = isMobile ? 'src/assets/video/wrs-turkey-packshot-mobile.mp4' : 'src/assets/video/wrs-turkey-packshot.mp4';
source.type = 'video/mp4';

video.appendChild(source);
video.load();

const mql = window.matchMedia('(max-width: 780px)');
function updateVideoSrc(e) {
  const isMobile = e.matches;
  const source = document.createElement('source');
  source.src = isMobile ? 'src/assets/video/wrs-turkey-packshot-mobile.mp4' : 'src/assets/video/wrs-turkey-packshot.mp4';
  source.type = 'video/mp4';

  video.innerHTML = ''; // önceki source'u temizle
  video.appendChild(source);
  video.load();
}

mql.addEventListener('change', updateVideoSrc); // tarayıcı boyutu değişince
updateVideoSrc(mql); // ilk başta çağır


function checkForSuccessHash() {
  if (window.location.hash === "#form-success") {
    const skipButton = document.querySelector('#skip-intro')
    const managementButton = document.querySelector('#btn-management');
    if (skipButton && managementButton) {
      skipButton.click();
      managementButton.click();
    }

    setTimeout(() => {
      showPopup();

      history.replaceState(null, null, ' ');
    }, 50);
  }
}

window.addEventListener('load', checkForSuccessHash);
window.addEventListener('hashchange', checkForSuccessHash);







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
  fetch(`/src/lang/landing/${lang}.json`)
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

  updateLanguageSelector(currentLang);

  loadLanguage(currentLang);

  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('intro-video');
  const landing = document.getElementById('landing');

  function showPage() {
    videoContainer.classList.add('fade-out');
    setTimeout(() => {
      videoContainer.style.display = 'none';
      landing.style.display = 'block';
      document.body.style.overflow = 'auto';
    }, 1000);
  }

  video.addEventListener('ended', () => {
    showPage();
    enableNavbarShrink();
  });

  document.body.style.overflow = 'hidden';

  document.getElementById('skip-intro').addEventListener('click', () => {
    video.pause();
    showPage();
  });


  document.getElementById('btn-corp').addEventListener('click', () => {
    window.location.href = '/wrs-corp/';
  });

  document.getElementById('btn-management').addEventListener('click', () => {
    window.location.href = '/car-rental/';
  });

});