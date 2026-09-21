// ====================================================================
// 1. VARIABEL GLOBAL TRANSLASI
// ====================================================================
let currentLanguage = 'id'; // Bahasa default

/**
 * Mengembalikan kode bahasa (e.g., 'id', 'en') yang sedang aktif.
 * Fungsi ini digunakan oleh main.js (untuk live clock) dan file lainnya.
 * @returns {string} Kode bahasa saat ini.
 */
function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * [FUNGSI GLOBAL] Mengambil terjemahan untuk kunci tertentu, 
 * mendukung substitusi string dan numerik (%s, %d).
 * @param {string} key - Kunci terjemahan.
 * @param {...string} args - Argumen dinamis untuk string format.
 * @param {string} rawValue - Nilai mentah dari sel Excel.
 * @returns {string} Teks terjemahan.
 */

function translateDataContent(rawValue) {
    if (!rawValue) return '';
    
    // 1. Normalisasi: Ubah ke lowercase dan hapus spasi berlebih (trim)
    const normalizedKey = String(rawValue).toLowerCase().trim();
    
    // 2. Ambil kamus kata kunci untuk bahasa yang aktif
    const langData = translations[currentLanguage] || translations['id'];
    const keywordMap = langData['data_keywords'] || {};

    // 3. Cek dan kembalikan terjemahan
    if (keywordMap[normalizedKey]) {
        return keywordMap[normalizedKey];
    }
    
    // 4. Jika tidak ada terjemahan, kembalikan nilai mentah
    return rawValue; 
}

function getTranslation(key, ...args) {
    // Pastikan translations dimuat
    if (typeof translations === 'undefined') {
        return `[${key}]`;
    }
    
    const langData = translations[currentLanguage];
    // Fallback ke 'id' jika kunci tidak ditemukan di currentLanguage, atau gunakan key jika tidak ada fallback
    let translation = langData[key] || translations['id'][key] || key; 

    if (args.length > 0) {
        let i = 0;
        translation = translation.replace(/%[sd]/g, (match) => {
            const arg = args[i++];
            return arg !== undefined ? arg : match;
        });
    }
    return translation;
}


// Data untuk membangun tombol bahasa dan menampilkan nama lengkap
const languageData = {
    'id': { name: 'Indonesia', flag: '🇮🇩' },
    'en': { name: 'English', flag: '🇺🇸' },
    'fr': { name: 'Français', flag: '🇫🇷' },
    'ar': { name: 'Arab', flag: '🇸🇦' }, 
    'ja': { name: '日本語', flag: '🇯🇵' }, 
    'zh': { name: '中文', flag: '🇨🇳' }, 
    // Tambahkan bahasa lain di sini
};

// ====================================================================
// FUNGSI UTILITY BAHASA (PERBAIKAN TAMPILAN TOMBOL MENU)
// ====================================================================

/**
 * [PERBAIKAN UTAMA] Memperbarui teks pada tombol menu bahasa di dropdown.
 * @param {string} langCode - Kode bahasa yang aktif ('id', 'en', dll.).
 */
function updateLanguageButtonText(langCode) {
    const langBtnDisplay = document.querySelector('#open-language-modal [data-key="menu_language_text"]');
    
    if (langBtnDisplay && languageData[langCode]) {
        // 1. Ganti teks dengan nama bahasa yang sedang aktif
        langBtnDisplay.textContent = languageData[langCode].name;
        
        // 2. PENTING: Hapus data-key. Ini mencegah translatePage() meresetnya 
        langBtnDisplay.removeAttribute('data-key');
        
        // Perbarui bendera
        const langFlagEl = document.querySelector('#open-language-modal .lang-flag-icon');
        if (langFlagEl) {
             langFlagEl.textContent = languageData[langCode].flag;
        }
    }
}


// ====================================================================
// LOGIKA MODAL BAHASA
// ====================================================================

function buildLanguageOptions() {
    if (!domElements.languageOptionsContainer || !languageData || typeof translations === 'undefined') return;
        
    domElements.languageOptionsContainer.innerHTML = ''; 
    
    Object.keys(translations).forEach(langCode => { 
        const data = languageData[langCode];
        
        if (!data) return;
        
        const button = document.createElement('button');
        button.classList.add('lang-option-btn');
        
        if (langCode === currentLanguage) {
            button.classList.add('active');
        }
        button.setAttribute('data-lang', langCode);
        
        button.innerHTML = `<span class="flag">${data.flag}</span> ${data.name}`; 
        
        domElements.languageOptionsContainer.appendChild(button);
    });
}

function openLanguageModal(e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    
    if (domElements.languageModal) {
        
        // Memastikan floating menu dropdown tertutup
        if (typeof closeMenuDropdown === 'function') {
            closeMenuDropdown(); 
        }

        buildLanguageOptions(); 
        domElements.languageModal.style.display = 'block'; 
        
        // Panggil translatePage untuk menerjemahkan modal header (dan elemen lain)
        translatePage(currentLanguage);
    }
}

function closeLanguageModal() {
    if (domElements.languageModal) {
        domElements.languageModal.style.display = 'none';
    }
}

/**
 * Fungsi utama untuk menerjemahkan teks di seluruh halaman (berdasarkan data-key).
 */
function translatePage(lang) {
    if (lang) {
         currentLanguage = lang; 
    }
    const langData = translations[currentLanguage];
    if (!langData) return;

    // 1. Terjemahkan semua elemen dengan atribut data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        
        if (!key) return; 

        const argsStr = el.getAttribute('data-args');
        let args = [];
        
        if (argsStr) {
            try { 
                args = JSON.parse(argsStr); 
            } catch(e) { 
                console.error('Error parsing data-args for key:', key, 'String:', argsStr, e);
            }
        }

        if (langData[key] !== undefined) {
            const translatedText = getTranslation(key, ...args);

            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = translatedText;
            } 
            else if (el.hasAttribute('title') && key === 'modal_close_title') {
                el.title = translatedText;
            }
            else if (el.hasAttribute('data-type') && el.getAttribute('data-type') === 'tooltip') {
                el.setAttribute('data-tooltip', translatedText);
            }
            else if (el.classList.contains('toggle-switch')) {
                // Lewati label toggle switch
            }
            else {
                el.innerHTML = translatedText;
            }
        }
    });

    // 2. [PERBAIKAN KRITIS] Panggil fungsi untuk memperbarui teks tombol menu
    if (typeof updateLanguageButtonText === 'function') {
        updateLanguageButtonText(currentLanguage); 
    }

    // 3. Refresh Komponen Lain (asumsi fungsi-fungsi ini ada di file lain)
    if (typeof beneficiariesData !== 'undefined' && typeof displayDataTable === 'function') {
        const dataToShow = (typeof currentTableData !== 'undefined' && currentTableData.length > 0) 
            ? currentTableData 
            : beneficiariesData;
            
        if (dataToShow.length > 0) {
            displayDataTable(dataToShow);
        } else {
            const dataList = document.getElementById('data-list');
            const emptyDiv = dataList ? dataList.querySelector('.empty-table-message p') : null;
            if (emptyDiv) emptyDiv.innerHTML = getTranslation('empty_table_title');
        }
    }


    if (typeof rebuildFilterDropdowns === 'function') {
        rebuildFilterDropdowns();
    }

    if (typeof updatePaginationControls === 'function') {
        updatePaginationControls(typeof currentTableData !== 'undefined' ? currentTableData.length : 0);
    }

    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (typeof updateThemeToggleTooltip === 'function') {
        updateThemeToggleTooltip(currentTheme); 
    }
    
    if (typeof updateMenuToggleTooltip === 'function') {
        const menuDropdown = document.getElementById('floating-menu-dropdown');
        const menuIsOpen = menuDropdown && !menuDropdown.classList.contains('hidden');
        updateMenuToggleTooltip(menuIsOpen);
    }
    
    const fileStatusElement = document.getElementById('file-status');
    if (fileStatusElement && typeof setFileStatus === 'function' && fileStatusElement.classList.contains('status-idle')) {
        setFileStatus(getTranslation('file_status_idle'), 'idle');
    }
    
    // Asumsi: updateDateTime() didefinisikan di main.js untuk update jam/tanggal
    if (typeof updateDateTime === 'function') {
        updateDateTime(); 
    }
}

// ====================================================================
// 3. INISIALISASI
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. MEMUAT BAHASA TERAKHIR DIPILIH DARI LOCAL STORAGE
    const savedLang = localStorage.getItem('nasi_baras_lang');
    if (savedLang && translations[savedLang]) currentLanguage = savedLang;
    
    // 2. DAFTARKAN EVENT LISTENER UNTUK MEMBUKA MODAL
    if (domElements.openLanguageModalBtn) {
        domElements.openLanguageModalBtn.addEventListener('click', openLanguageModal);
    }

    // 3. DAFTARKAN EVENT LISTENER UNTUK MENUTUP MODAL
    if (domElements.closeLanguageModalBtn) {
        domElements.closeLanguageModalBtn.addEventListener('click', closeLanguageModal);
    }
    
    // [MODIFIKASI KRITIS]: AKTIFKAN KEMBALI listener penutupan saat klik di luar modal (overlay)
    if (domElements.languageModal) {
        domElements.languageModal.addEventListener('click', (e) => {
            // Menutup modal jika klik target adalah modal itu sendiri (bukan konten modal)
            if (e.target === domElements.languageModal) {
                closeLanguageModal(); 
            }
        });
    }

    // 4. DAFTARKAN EVENT LISTENER UNTUK MEMILIH BAHASA DARI MODAL (Delegasi)
    if (domElements.languageOptionsContainer) {
        domElements.languageOptionsContainer.addEventListener('click', (e) => {
            const selectedLangEl = e.target.closest('[data-lang]');
            
            if (selectedLangEl) {
                const newLang = selectedLangEl.getAttribute('data-lang');
                
                // Pastikan bahasa baru valid sebelum memproses
                if (newLang && translations[newLang]) {
                    localStorage.setItem('nasi_baras_lang', newLang);
                    
                    // Terapkan terjemahan
                    translatePage(newLang); 
                    
                    // Update kelas aktif di modal
                    document.querySelectorAll('.lang-option-btn').forEach(b => b.classList.remove('active'));
                    selectedLangEl.classList.add('active');
                    
                    // PENTING: closeLanguageModal() TIDAK dipanggil di sini.
                }
            }
        });
    }
    
    // 5. TERJEMAHKAN HALAMAN DENGAN BAHASA AWAL
    translatePage(currentLanguage);

    // 6. LOGIKA TOGGLE BAHASA LAMA/SEKUNDER (jika ada langToggle di HTML)
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.checked = currentLanguage === 'en'; 

        langToggle.addEventListener('change', function() {
            const newLang = this.checked ? 'en' : 'id';
            localStorage.setItem('nasi_baras_lang', newLang);
            translatePage(newLang);
            
            if (typeof rebuildFilterDropdowns === 'function') {
                rebuildFilterDropdowns();
            }
        });
    }

    // 7. Pastikan status file terinisialisasi dengan terjemahan
    const fileStatusElement = document.getElementById('file-status');
    if (fileStatusElement) {
        if (typeof setFileStatus === 'function') {
            setFileStatus(getTranslation('file_status_idle'), 'idle');
        } else {
            fileStatusElement.textContent = getTranslation('file_status_idle');
        }
    }
});
