const PROJECT_DETAILS = {
  attracthor: {
    tag: 'Network Security & IoT',
    title: 'ATTRACTHOR Network Automation',
    problem:
      'Pengujian forensik terhadap serangan Wi-Fi Deauthentication dan Evil Twin sering kali memerlukan konfigurasi alat manual yang berulang dan pencatatan log yang terpisah-pisah.',
    solution:
      'Merancang prototipe perangkat keras portabel berbasis mikrokontroler ESP8266/ESP8285 dan Raspberry Pi yang dikendalikan melalui aplikasi desktop Python 3 & PyQt6 untuk menjalankan skenario eksperimen dan menangkap paket secara terstruktur.',
    impact:
      'Menyederhanakan alur eksperimen forensik jaringan nirkabel menjadi antarmuka terpadu dengan pencatatan bukti digital yang rapi dan siap dianalisis menggunakan Wireshark.',
    repo: 'https://github.com/Iqbalarbani'
  },
  disnaker:
    {
      tag: 'Web Dashboard & Automation',
      title: 'Dashboard Monitoring Kas Disnakertrans DIY',
      problem:
        'Rekapitulasi transaksi kas harian di Subbagian Umum membutuhkan pemantauan real-time yang mudah diakses staf tanpa harus membuka banyak file spreadsheet secara manual.',
      solution:
        'Membangun dashboard web ringan yang terhubung langsung ke Google Sheets melalui Google Apps Script dan Google Sheets API untuk sinkronisasi otomatis data pemasukan, pengeluaran, dan saldo berjalan.',
      impact:
        'Mempercepat proses pengecekan arus kas dan meningkatkan akurasi pelaporan administrasi internal dengan panduan penggunaan yang mudah dipahami staf.',
      repo: 'https://github.com/Iqbalarbani'
    },
  warehouse: {
    tag: 'Backend & Inventory',
    title: 'Sistem Manajemen Gudang Kolaboratif',
    problem:
      'Pengelolaan data gudang dan penghitungan stok produk membutuhkan kueri basis data yang efisien dan konsisten di dalam tim pengembang berskala besar.',
      solution:
        'Mengimplementasikan metode kueri Eloquent ORM (getWarehouseAll dan countProduct) berbasis Laravel serta mengikuti alur kerja kolaborasi GitHub secara disiplin.',
      impact:
        'Menghasilkan endpoint dan logika inventaris yang bersih, mudah dipelihara, dan terintegrasi mulus dengan modul tim lainnya.',
      repo: 'https://github.com/Iqbalarbani'
    }
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const yearSpan = document.getElementById('year');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (iconSun && iconMoon) {
      iconSun.classList.toggle('hidden', theme !== 'dark');
      iconMoon.classList.toggle('hidden', theme === 'dark');
    }
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Scroll Reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Project Modal
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCloseBg = document.getElementById('modal-close-bg');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalImpact = document.getElementById('modal-impact');
  const modalRepo = document.getElementById('modal-repo');

  document.querySelectorAll('[data-project]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = PROJECT_DETAILS[key];
      if (!data || !modal) return;

      modalTag.textContent = data.tag;
      modalTitle.textContent = data.title;
      modalProblem.textContent = data.problem;
      modalSolution.textContent = data.solution;
      modalImpact.textContent = data.impact;
      modalRepo.href = data.repo;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseBg) modalCloseBg.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
});
