
/* NASI-BARAS: Demo local sign-in.
   Static front-end guard only; not server-verified authentication. */
(function () {
  'use strict';

  const SESSION_KEY = 'nasibaras_demo_session';
  const SESSION_MS = 30 * 60 * 1000;
  const SALT = 'NASI-BARAS-capstone-demo-v1';
  const ITERATIONS = 180000;
  const encoder = new TextEncoder();

 // Daftar akun NASI-BARAS
  const USERS = {
    // Akun Administrator
    admin: {
      role: 'Administrator',
      hash: 'd0abac446a3d4373b4004da99a565d80d12badd446eee37f795fd47345bee0f2'
    },

    // Akun Pengguna lama (tetap dipertahankan)
    user: {
      role: 'Pengguna',
      hash: 'e9191e30abfb48ac5c26e6c038e9027bb0ec5ed7b6bee26696621066d376921c'
    },

    // Akun pengguna baru
    nabila: {
      role: 'Pengguna',
      hash: '5fc40a018e01b859216890c27196509202e2ecfc49e14d9ef66df1a7cc808b47'
    },

    wawan: {
      role: 'Pengguna',
      hash: '5fc40a018e01b859216890c27196509202e2ecfc49e14d9ef66df1a7cc808b47'
    },

    fingki: {
      role: 'Pengguna',
      hash: '5fc40a018e01b859216890c27196509202e2ecfc49e14d9ef66df1a7cc808b47'
    },

    silvilia: {
      role: 'Pengguna',
      hash: '5fc40a018e01b859216890c27196509202e2ecfc49e14d9ef66df1a7cc808b47'
    },

    angga: {
      role: 'Pengguna',
      hash: '5fc40a018e01b859216890c27196509202e2ecfc49e14d9ef66df1a7cc808b47'
    }
  };

  let failed = 0;
  let pauseUntil = 0;

  function getSession() {
    try {
      return JSON.parse(
        sessionStorage.getItem(SESSION_KEY) || 'null'
      );
    } catch (_) {
      return null;
    }
  }

  function validSession() {
    const session = getSession();

    if (
      session &&
      USERS[session.user] &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now()
    ) {
      return true;
    }

    sessionStorage.removeItem(SESSION_KEY);
    return false;
  }

function showApp() {
  document.body.classList.remove('auth-locked');

  const passwordField = document.getElementById('login-password');
  const errorField = document.getElementById('login-error');
  const userLabel = document.getElementById('current-user-label');
  const session = getSession();

  if (passwordField) passwordField.value = '';
  if (errorField) errorField.textContent = '';

  if (userLabel && session && USERS[session.user]) {
    if (session.user === 'admin') {
      userLabel.textContent = 'Administrator';
    } else {
      userLabel.textContent = session.user;
    }
  }
}

  async function computeHash(password) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error(
        'Web Crypto tidak tersedia. Jalankan melalui localhost atau HTTPS.'
      );
    }

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const bits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: encoder.encode(SALT),
        iterations: ITERATIONS,
        hash: 'SHA-256'
      },
      key,
      256
    );

    return Array.from(
      new Uint8Array(bits),
      byte => byte.toString(16).padStart(2, '0')
    ).join('');
  }

  function message(text) {
    const errorField = document.getElementById('login-error');
    if (errorField) errorField.textContent = text;
  }

  function performLogout() {
    // Hapus sesi login
    sessionStorage.removeItem(SESSION_KEY);

    // Tutup modal konfirmasi
    const modal = document.getElementById('logout-confirm-modal');
    if (modal) modal.style.display = 'none';

    // Muat ulang halaman untuk kembali ke login
    window.location.reload();
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const nameField = document.getElementById('login-username');
    const passField = document.getElementById('login-password');
    const submit = document.getElementById('login-submit');
    const showPassword = document.getElementById('login-show-password');

    const logoutBtn = document.getElementById('logout-btn');
    const logoutModal = document.getElementById('logout-confirm-modal');
    const cancelBtn = document.getElementById('logout-cancel-btn');
    const confirmBtn = document.getElementById('logout-confirm-btn');

    if (validSession()) {
      showApp();
    } else if (nameField) {
      nameField.focus();
    }

    // Tampilkan atau sembunyikan password
    if (showPassword && passField) {
      showPassword.addEventListener('click', function () {
        const visible = passField.type === 'password';

        passField.type = visible ? 'text' : 'password';
        showPassword.setAttribute('aria-pressed', String(visible));
        showPassword.setAttribute(
          'aria-label',
          visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'
        );

        const icon = showPassword.querySelector('i');
        if (icon) {
          icon.className = visible
            ? 'fas fa-eye-slash'
            : 'fas fa-eye';
        }
      });
    }

    // Proses login
    if (form && nameField && passField && submit) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (Date.now() < pauseUntil) {
          message(
            'Terlalu banyak percobaan. Tunggu sebentar sebelum mencoba kembali.'
          );
          return;
        }

        submit.disabled = true;
        message('');

        try {
          const username = nameField.value.trim();
          const account = USERS[username];
          const result = await computeHash(passField.value);

          if (account && result === account.hash) {
            sessionStorage.setItem(
              SESSION_KEY,
              JSON.stringify({
                user: username,
                role: account.role,
                expiresAt: Date.now() + SESSION_MS
              })
            );

            failed = 0;
            showApp();
          } else {
            failed++;

            if (failed >= 5) {
              pauseUntil = Date.now() + 30000;
              failed = 0;
            }

            message('Nama pengguna atau kata sandi salah.');
            passField.value = '';
            passField.focus();
          }
        } catch (error) {
          message(
            error.message ||
            'Tidak bisa memverifikasi login pada browser ini.'
          );
        } finally {
          submit.disabled = false;
        }
      });
    }

    // Klik Keluar: tampilkan konfirmasi terlebih dahulu
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (logoutModal) {
          logoutModal.style.display = 'flex';
        } else if (window.confirm('Apakah Anda yakin ingin keluar?')) {
          performLogout();
        }
      });
    }

    // Klik Batal: tetap berada di aplikasi
    if (cancelBtn && logoutModal) {
      cancelBtn.addEventListener('click', function () {
        logoutModal.style.display = 'none';
      });
    }

    // Klik latar modal untuk menutup konfirmasi
    if (logoutModal) {
      logoutModal.addEventListener('click', function (event) {
        if (event.target === logoutModal) {
          logoutModal.style.display = 'none';
        }
      });
    }

    // Klik Ya, Keluar: hapus sesi dan kembali ke login
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        performLogout();
      });
    }

    // Tombol Escape menutup modal
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && logoutModal) {
        logoutModal.style.display = 'none';
      }
    });

    // Periksa kedaluwarsa sesi secara berkala
    window.setInterval(function () {
      if (
        !document.body.classList.contains('auth-locked') &&
        !validSession()
      ) {
        window.location.reload();
      }
    }, 15000);

    // Periksa sesi ketika tab dibuka kembali
    window.addEventListener('focus', function () {
      if (
        !document.body.classList.contains('auth-locked') &&
        !validSession()
      ) {
        window.location.reload();
      }
    });
  });
})();
