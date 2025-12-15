// 간단한 상호작용: 메뉴 토글, 다크모드, 푸터 연도, Formspree 친화적 UX
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const yearSpan = document.getElementById('year');

  // 모바일 내비
  menuToggle && menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // 테마 (라이트/다크)
  const userPref = localStorage.getItem('theme');
  if (userPref === 'light') document.documentElement.setAttribute('data-theme', 'light');

  themeToggle && themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      themeToggle.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌞';
    }
  });

  // 푸터 연도
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 연락 폼: Formspree 용 간단한 UX
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = '메시지 보내기';
        }, 4000);
      }
    });
  }
});
