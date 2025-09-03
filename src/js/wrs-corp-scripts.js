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

// calculate expanded card height --------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const listItems = document.querySelectorAll('.hover-expand-list li:not(.no-expand)');

  listItems.forEach(li => {
    const textPreview = li.querySelector('.text-preview');
    const textFull = li.querySelector('.text-full');

    li.addEventListener('mouseenter', function () {
      // expanded class'ını ekle
      this.classList.add('expanded');

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

        // expanded class'ını çıkar
        this.classList.remove('expanded');
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

// Fancybox Lightbox - JS dosyanıza ekleyin (GLightbox kodunu silin)
document.addEventListener('DOMContentLoaded', function() {
  
  // Scroll pozisyonunu kaydet
  let savedScrollY = 0;
  
  // Fancybox başlatma
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox]', {
      // Temel ayarlar
      animated: true,
      showClass: 'f-fadeIn',
      hideClass: 'f-fadeOut',
      
      // UI ayarları
      closeButton: 'outside',
      dragToClose: false,
      
      // Toolbar ayarları
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ['close']
        }
      },
      
      // Scroll ayarları
      autoFocus: false,
      trapFocus: false,
      placeFocusBack: false,
      
      // Açılma callback'i
      on: {
        init: (fancybox) => {
          // Scroll pozisyonunu kaydet
          savedScrollY = window.scrollY;
          
          // Body'yi kilitle ama pozisyonu koru
          document.body.style.position = 'fixed';
          document.body.style.top = `-${savedScrollY}px`;
          document.body.style.width = '100%';
          document.body.style.overflow = 'hidden';
        },
        
        destroy: (fancybox) => {
          // Body'yi serbest bırak
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          
          // Orijinal scroll pozisyonuna dön (timeout ile çakışmayı engelle)
          setTimeout(() => {
            window.scrollTo(0, savedScrollY);
          }, 0);
        }
      }
    });
  }
  
  // Overlay icon click handler
  document.querySelectorAll('.overlay-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Parent project-image'yi bul
      const projectImage = icon.closest('.project-image');
      if (projectImage) {
        const img = projectImage.querySelector('img[data-fancybox]');
        if (img) {
          // Fancybox'ı manuel aç
          img.click();
        }
      }
    });
  });
  
  // Hover efektleri (değişmedi)
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) {
        this.style.transform = 'translateY(-10px)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Counter animasyon (değişmedi)
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    if (counters.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          const counter = entry.target;
          let current = 0;

          const increment = target / 60;
          const duration = 2000;
          const stepTime = duration / 60;

          counter.classList.add('animated');

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              counter.textContent = Math.floor(target);
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  // Counter'ı başlat
  initCounterAnimation();
});
