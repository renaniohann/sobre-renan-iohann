// ===== DADOS DE CONTATO =====
const PHONE_CLEAN = '5542991123617';
const EMAIL = 'Iohannbarbozarenan@gmail.com';
const WA_MSG = 'Olá Renan! Vi seu currículo online e gostaria de conversar sobre uma oportunidade.';

const waUrl = (msg) =>
  `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(msg || WA_MSG)}`;

const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(
  'Oportunidade profissional - Contato via currículo online'
)}`;

document.getElementById('nav-whatsapp').href = waUrl();
document.getElementById('hero-whatsapp').href = waUrl();
document.getElementById('footer-whatsapp').href = waUrl();
document.getElementById('hero-email').href = mailtoUrl;
document.getElementById('contact-email-link').href = mailtoUrl;
document.getElementById('year').textContent = new Date().getFullYear();

// ===== TEMA CLARO / ESCURO =====
const html = document.documentElement;
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

function applyTheme(dark) {
  html.classList.toggle('dark', dark);
  iconSun.classList.toggle('hidden', !dark);
  iconMoon.classList.toggle('hidden', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

applyTheme(localStorage.getItem('theme') === 'dark');

document
  .getElementById('theme-toggle')
  .addEventListener('click', () => applyTheme(!html.classList.contains('dark')));

// ===== MENU MOBILE =====
const menu = document.getElementById('mobile-menu');

document
  .getElementById('menu-toggle')
  .addEventListener('click', () => menu.classList.toggle('hidden'));

menu
  .querySelectorAll('a')
  .forEach((a) => a.addEventListener('click', () => menu.classList.add('hidden')));

// ===== NOTIFICAÇÕES (TOAST) =====
let toastTimer;

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2500);
}

function copyText(text, label) {
  navigator.clipboard
    .writeText(text)
    .then(() => showToast(label + ' copiado!'))
    .catch(() => showToast('Não foi possível copiar.'));
}

// ===== FORMULÁRIO → ABRE O WHATSAPP COM A MENSAGEM =====
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const msg = document.getElementById('form-message').value;

  window.open(
    waUrl(`Olá Renan! Meu nome é ${name} (${email}). ${msg}`),
    '_blank',
    'noopener,noreferrer'
  );
  showToast('Abrindo o WhatsApp com sua mensagem!');
  e.target.reset();
});

// ===== ANIMAÇÃO AO ROLAR (fade + barras de progresso) =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.progress-bar').forEach((bar) => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// ===== CURRÍCULO EM PDF (janela de impressão) =====
function printCV() {
  const htmlCV = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Currículo - Renan Iohann Barboza</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.55}
    h1{font-size:26px;margin:0}
    h2{font-size:15px;text-transform:uppercase;letter-spacing:1.5px;color:#059669;border-bottom:2px solid #059669;padding-bottom:4px;margin:26px 0 10px}
    p,li{font-size:13.5px}
    .muted{color:#475569;font-size:13px}
    .head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}
    .head img{width:110px;height:135px;object-fit:cover;object-position:32% 22%;border-radius:10px;border:1px solid #e2e8f0}
    ul{padding-left:18px;margin:6px 0}
  </style></head><body>
  <div class="head"><div>
    <h1>Renan Iohann Barboza</h1>
    <p class="muted">Buscando a primeira oportunidade profissional | Desenvolvendo habilidades e novos desafios</p>
    <p class="muted">Laranjeiras do Sul - PR &bull; (042) 99112-3617 &bull; ${EMAIL}</p>
  </div><img src="${location.href.replace(/[^/]*$/, '')}profile.jpg" alt=""></div>
  <h2>Sobre Mim</h2>
  <p>Sou uma pessoa responsável, dedicada e comprometida, com facilidade para aprender e disposição para adquirir novos conhecimentos. Estou em busca da minha primeira oportunidade profissional para desenvolver minhas habilidades, adquirir experiência e contribuir de forma positiva com a equipe. Tenho vontade de crescer profissionalmente, aprender novas atividades e assumir novos desafios.</p>
  <h2>Formação Acadêmica</h2>
  <p><strong>Ensino Médio (Cursando o Terceiro Ano)</strong><br>Colégio Laranjeiras<br><span class="muted">Previsão de conclusão: Dezembro de 2026</span></p>
  <h2>Habilidades</h2>
  <ul><li>Organização</li><li>Trabalho em equipe</li><li>Boa Comunicação</li><li>Facilidade para aprender</li></ul>
  <h2>Idiomas</h2>
  <ul><li>Português: Nativo</li><li>Inglês: Básico</li></ul>
  </body></html>`;

  const win = window.open('', '_blank');
  win.document.write(htmlCV);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 400);
}
