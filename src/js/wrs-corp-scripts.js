const el = document.querySelector('.hover-expand-list');
const height = getComputedStyle(el).height;
el.style.maxHeight = height;


// Popup --------------------------------------------------------------------------

function getCurrentLang() {
  return localStorage.getItem('selectedLanguage') || 'tr';
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    if (e.target.id === "openPopup") {
      e.preventDefault();
      const lang = getCurrentLang();
      const fileName = e.target.dataset.file;
      const popupContent = document.querySelector(".popup-content");

      fetch(`content/${fileName}-${lang}.html`)
        .then(res => res.text())
        .then(html => {
          if (popupContent) {
            popupContent.innerHTML = html;
            document.getElementById("popup").classList.remove("hidden");
            document.getElementById("popupOverlay").classList.remove("hidden");
          } else {
            console.error("popup-content class'ına sahip element bulunamadı.");
          }
        });
    }

    if (e.target.classList.contains("close-popup")) {
      document.getElementById("popup").classList.add("hidden");
      document.getElementById("popupOverlay").classList.add("hidden");
    }
  });
});



// Footer --------------------------------------------------------------------------

const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  const scrollBottom = scrollTop + clientHeight >= scrollHeight - 5;

  if (scrollBottom) {
    footer.style.display = 'block';
  } else {
    footer.style.display = 'none';
  }
});


// Carousel ------------------------------------------------------------------------
class ServiceCarousel {
  constructor() {
    this.carousel = document.getElementById('carousel');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');

    this.items = Array.from(this.carousel.children);
    this.totalItems = this.items.length;
    this.currentIndex = Math.floor(this.totalItems / 2); // Ortadakinden başla
    this.itemWidth = 220; // min-width (140px) + gap (80px)

    this.init();
  }

  init() {
    this.updateCarousel();
    this.bindEvents();
  }

  updateCarousel() {
    // Active class'ı temizle
    this.items.forEach(item => item.classList.remove('active'));

    // Ortadaki item'ı active yap
    this.items[this.currentIndex].classList.add('active');

    // Carousel'ı ortala - wrapper'ın tam ortasına getir
    const wrapperWidth = this.carousel.parentElement.offsetWidth;
    const translateX = -(this.currentIndex * this.itemWidth) + (wrapperWidth / 2) - (this.itemWidth / 2) + 40; // +40 gap düzeltmesi için
    this.carousel.style.transform = `translateX(${translateX}px)`;
  }

  next() {
    if (this.currentIndex < this.totalItems - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Sona gelince başa dön
    }
    this.updateCarousel();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalItems - 1; // Başa gelince sona git
    }
    this.updateCarousel();
  }

  bindEvents() {
    this.nextBtn?.addEventListener('click', () => this.next());
    this.prevBtn?.addEventListener('click', () => this.prev());

    // Klavye navigasyonu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }
}

// Carousel'ı başlat
document.addEventListener('DOMContentLoaded', () => {
  new ServiceCarousel();
});







document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById('logoTrack');

  const logoNames = [
    'agrotv.jpg',
    'alfa-tohum.jpg',
    'allied-minerals.png',
    'artmar.jpg',
    'donas.jpg',
    'ertanlar.jpg',
    'fantom.png',
    'hilleshog.png',
    'indigo.jpg',
    'kayseri-seker.jpg',
    'kilicoglu-kiremit.jpg',
    'kuzey-tohumculuk.jpg',
    'KWS.jpg',
    'lgtohum.jpg',
    'likrom.jpg',
    'limagrein.jpg',
    'maribo.jpg',
    'marka-tarim.png',
    'netafim.jpg',
    'safi-smart.jpg',
    'sevanderhave.jpg',
    'syngenta.jpg',
    'taegu-tec.jpg',
    'tessenderlo.jpg',
    'ziraat-bankasi.jpg'
  ];

  track.innerHTML = '';

  logoNames.forEach((logoName, index) => {
    const img = document.createElement('img');
    img.src = `../src/assets/img/references-logos/${logoName}`;
    img.alt = `Reference Logo ${index + 1}`;
    img.loading = 'lazy';

    img.onerror = function () {
      this.style.display = 'none';
      console.warn(`Logo yüklenemedi: ${logoName}`);
    };

    track.appendChild(img);
  });

  const originalContent = track.innerHTML;
  track.innerHTML = originalContent + originalContent;
});


// calculate expanded card height --------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const listItems = document.querySelectorAll('.hover-expand-list li:not(.no-expand)');

  listItems.forEach(li => {
    const textPreview = li.querySelector('.text-preview');
    const textFull = li.querySelector('.text-full');

    li.addEventListener('mouseenter', function () {
      textPreview.style.display = 'none';
      textFull.style.display = 'block';

      setTimeout(() => {
        const fullHeight = li.scrollHeight;
        this.style.height = fullHeight + 'px';
      }, 10);
    });

    li.addEventListener('mouseleave', function () {
      this.style.height = '80px';

      setTimeout(() => {
        textPreview.style.display = 'block';
        textFull.style.display = 'none';
      }, 300);
    });
  });
});



// card animations ----------------------------------------------------------------

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Tüm cardları observe et
document.querySelectorAll('.card').forEach(card => {
  observer.observe(card);
});



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
  fetch(`/src/lang/wrs-corp/${lang}.json`)
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







document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });
});








document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarResponsive');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      setTimeout(() => {
        navbarToggler?.click();
      }, 50);
    });
  });

  document.addEventListener('click', function (event) {
    if (navbarCollapse?.classList.contains('show') &&
      !navbarCollapse.contains(event.target) &&
      event.target !== navbarToggler &&
      !navbarToggler?.contains(event.target)) {

      setTimeout(() => {
        navbarToggler?.click();
      }, 10);
    }
  });

  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    document.addEventListener('click', function (event) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('dropdown-open');
      }
    });
  }

  const popupOverlay = document.getElementById('form-popup-overlay');
  const closePopupBtn = document.getElementById('close-popup');
  const forms = document.querySelectorAll('.popup-form');

  function closePopup() {
    popupOverlay?.classList.add('d-none');
    forms.forEach(form => {
      form.classList.add('d-none');
    });
  }

  closePopupBtn?.addEventListener('click', closePopup);

  popupOverlay?.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
      closePopup();
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