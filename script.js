// ===== CF BANNER =====
(function () {
  const banner = document.getElementById('cfBanner');
  if (!sessionStorage.getItem('cfClosed')) {
    document.body.classList.add('cf-visible');
  } else {
    banner.style.display = 'none';
  }

  // 残り日数を計算（5/30まで）
  const end = new Date('2026-05-30T23:59:59');
  const now = new Date();
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('cfDays');
  if (el) el.textContent = diff > 0 ? diff : 0;
})();

function closeCfBanner() {
  document.getElementById('cfBanner').style.display = 'none';
  document.body.classList.remove('cf-visible');
  sessionStorage.setItem('cfClosed', '1');
}

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ===== FAQ ACCORDION =====
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ===== YOUTUBE LAZY LOAD =====
// VIDEO_ID_1 などを実際のYouTube動画IDに差し替えてください
function loadYT(placeholder, videoId) {
  if (!videoId || videoId.startsWith('VIDEO_ID')) {
    alert('YouTube動画IDを設定してください。\nscript.js または index.html の VIDEO_ID_X を実際のIDに差し替えてください。');
    return;
  }
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;';
  placeholder.replaceWith(iframe);
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.feature-card, .stat, .gallery-item, .faq-item, .specs-table-wrap, .award-card, .media-article, .yt-card, .media-logo'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger effect
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (i % 6) * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});

// ===== GALLERY SLIDER =====
let currentSlide = 0;
const slider = document.getElementById('gallerySlider');
const slides = slider ? slider.querySelectorAll('.slide') : [];
const dotsContainer = document.getElementById('sliderDots');

if (slides.length > 0) {
  // ドット生成
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `スライド${i + 1}`);
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function slideMove(dir) {
  goToSlide(currentSlide + dir);
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
