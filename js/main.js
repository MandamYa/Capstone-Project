// main.js

// ====================================================================
// Variabel Global
// ====================================================================
let beneficiariesData = [];       // Data mentah dari Excel
let filteredData = [];            // Data setelah filter wilayah (digunakan untuk search)
let currentTableData = [];        // Data yang sedang ditampilkan (hasil filter/search)
let lastClickedBeneficiary = null; // Data penerima terakhir yang diklik

// --- VARIABEL FILTER STATE UNTUK CANCEL (Digunakan di filter.js) ---
let filterStateBeforeOpen = null; 

// --- VARIABEL PAGINASI (Digunakan di data_visual.js) --
const ROWS_PER_PAGE = 25; 
let currentPage = 1;
let totalPages = 1;

// ====================================================================
// ELEMENT DOM (Digunakan di semua file)
// ====================================================================
const domElements = {
    // --- ELEMEN BARU UNTUK BAHASA ---
    languageModal: document.getElementById('language-modal'),
    languageOptionsContainer: document.querySelector('.language-options-container'),
    openLanguageModalBtn: document.getElementById('open-language-modal'),
    closeLanguageModalBtn: document.querySelector('.close-language-btn'),

    toggleSwitchLabel: document.querySelector('.toggle-switch'),
    menuToggleButton: document.getElementById('topnav-menu-toggle'),

    fileInput: document.getElementById('excel-file'),
    fileStatus: document.getElementById('file-status'),
    dataList: document.getElementById('data-list'),
    
    // --- ELEMEN FILTER POPUP ---
    toggleFilterBtn: document.getElementById('toggle-filter-btn'),
    filterModal: document.getElementById('filter-modal'),          
    closeFilterBtn: document.querySelector('.close-filter-btn'),   
    applyFilterBtn: document.getElementById('apply-filter-btn'),   
    
    // Input Filter 
    wilayahFilter: document.getElementById('wilayah-filter'),
    rwFilter: document.getElementById('rw-filter'),
    rtFilter: document.getElementById('rt-filter'),

    filterDot: document.getElementById('filter-notification-dot'), 
    
    searchInput: document.getElementById('search-input'),
    searchButton: document.getElementById('search-btn'),
    resetButton: document.getElementById('reset-filter-btn'), 
    
    searchFeedback: document.getElementById('search-feedback'), 
    filterSummary: document.getElementById('filter-summary'), 
    
    paginationControls: document.getElementById('pagination-controls'),
    prevPageBtn: document.getElementById('prev-page-btn'),
    nextPageBtn: document.getElementById('next-page-btn'),
    pageInfo: document.getElementById('page-info'),
    
    // --- ELEMEN DOWNLOAD MODAL ---
    downloadTemplateBtn: document.getElementById('download-template-btn'),
    downloadModal: document.getElementById('download-modal'),
    downloadModalConfirm: document.getElementById('download-modal-confirm'),
    downloadModalCancel: document.getElementById('download-modal-cancel'),
    downloadModalClose: document.querySelector('.download-modal-close'),

    // --- ELEMEN TOGGLE CARD (HANYA REFERENSI, LOGIKA TOGGLE DIHAPUS) ---
    uploadCardHeader: document.getElementById('upload-card-header'),
    tableCardHeader: document.getElementById('table-card-header'),
};

// --- ELEMEN MODAL NAVIGASI (Digunakan di modal.js) ---
const navigationModal = document.getElementById('navigation-modal'); 
const modalConfirmBtn = document.getElementById('modal-confirm-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const closeBtn = document.querySelector('#navigation-modal .close-btn'); 
const modalTextContent = document.querySelector('#navigation-modal .modal-content p'); 
let currentNavigationUrl = ''; 

// --- ELEMEN MODAL BIODATA (Digunakan di modal.js) ---
const biodataModal = document.getElementById('biodata-modal');
const closeBiodataBtn = biodataModal.querySelector('.close-biodata-btn');
const biodataNameHeader = document.getElementById('biodata-nama-header'); 
const biodataNIKHeader = document.getElementById('biodata-nik-header');   
const biodataDetailsContainer = biodataModal.querySelector('.biodata-details-container'); 
const biodataActionsFull = document.getElementById('biodata-actions-full'); 

// ELEMEN MODAL ABOUT (Digunakan di modal.js)
const aboutModal = document.getElementById('about-modal');
const aboutBtn = document.querySelector('.about-btn'); // Tombol di Dropdown Menu
const closeAboutBtn = document.querySelector('.close-about-btn');

// --- VARIABEL KHUSUS MODIFIKASI TOPNAV MENU ---
const topnavMenuToggle = document.getElementById('topnav-menu-toggle');
const menuDropdown = document.getElementById('floating-menu-dropdown');



// ====================================================================
// EVENT LISTENERS & INISIALISASI
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // ====================================
    // 1. EVENT LISTENERS UPLOAD EXCEL
    // ====================================
    domElements.fileInput.addEventListener('change', (e) => {
        loadExcel(e.target.files);
    });
    
    const uploadArea = document.getElementById('upload-area-drag');
    if (uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        });
        uploadArea.addEventListener('dragenter', () => uploadArea.classList.add('drag-over'), false);
        uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'), false);
        uploadArea.addEventListener('drop', (e) => {
            uploadArea.classList.remove('drag-over');
            const fileList = e.dataTransfer.files;
            
            if (fileList.length > 0) {
                const file = fileList[0];
                const acceptedTypes = [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel' 
                ];
                
                const isExcel = acceptedTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

                if (isExcel) {
                    loadExcel(fileList); 
                    domElements.fileInput.files = fileList; 
                } else {
                    // [TERJEMAHAN] Error saat drag/drop file non-Excel
                    setFileStatus('file_error_wrong_type', 'error');
                    setFileStatus('file_status_idle', 'idle');
                }
            }
        }, false);
    }

    // ====================================
    // 2. EVENT LISTENERS FILTER (dari filter.js)
    // ====================================
    domElements.wilayahFilter.addEventListener('change', () => { updateDependentFilters('WILAYAH'); }); 
    domElements.rwFilter.addEventListener('change', () => { updateDependentFilters('RW'); });
    domElements.rtFilter.addEventListener('change', () => { }); 

    // POPUP FILTER
    if (domElements.toggleFilterBtn) domElements.toggleFilterBtn.onclick = toggleFilterVisibility;
    if (domElements.closeFilterBtn) domElements.closeFilterBtn.onclick = () => closeFilterPopup(false); 
    if (domElements.applyFilterBtn) {
        domElements.applyFilterBtn.onclick = () => {
            filterData(); 
            closeFilterPopup(true); 
        };
    }
    
    // RESET & SEARCH
    if (domElements.resetButton) domElements.resetButton.addEventListener('click', resetFilters);
    domElements.searchButton.addEventListener('click', searchTable);
    domElements.searchInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') { searchTable(); e.preventDefault(); } });
    domElements.searchInput.addEventListener('input', () => { liveSearchNIK(); updateResetButtonVisibility(); });
    
    // ====================================
    // 3. EVENT LISTENERS CARD TOGGLE (DIHAPUS - KONTEN SELALU TERBUKA)
    // ====================================
    
    // ====================================
    // 4. EVENT LISTENERS MODAL (dari modal.js)
    // ====================================
    
    // DOWNLOAD TEMPLATE
    if (domElements.downloadTemplateBtn) {
        domElements.downloadTemplateBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            openDownloadModal();
        });
    }
    if (domElements.downloadModalConfirm) domElements.downloadModalConfirm.onclick = confirmDownloadTemplate;
    if (domElements.downloadModalCancel) domElements.downloadModalCancel.onclick = closeDownloadModal;
    if (domElements.downloadModalClose) domElements.downloadModalClose.onclick = closeDownloadModal;
    
    // MODAL NAVIGASI
    modalConfirmBtn.onclick = function() {
        if (currentNavigationUrl) window.open(currentNavigationUrl, '_blank'); 
        closeNavigationModal();
        closeBiodataModal(); 
    }
    modalCancelBtn.onclick = function() {
        closeNavigationModal();
        if (lastClickedBeneficiary) openBiodataModal(lastClickedBeneficiary);
    }
    closeBtn.onclick = function() {
        closeNavigationModal();
        if (lastClickedBeneficiary) openBiodataModal(lastClickedBeneficiary);
    }
    
    // MODAL BIODATA
    closeBiodataBtn.onclick = function() { closeBiodataModal(); }
    
    // MODAL TENTANG (ABOUT)
    aboutBtn.addEventListener('click', openAboutModal);
    closeAboutBtn.addEventListener('click', closeAboutModal);
    
    // MODAL PANDUAN (GUIDE)
    const helpBtn = document.querySelector('.help-btn');
    const closePanduanBtn = document.querySelector('.close-panduan-btn');
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    
    if (helpBtn) helpBtn.addEventListener('click', openPanduanModal);
    if (closePanduanBtn) closePanduanBtn.addEventListener('click', () => { document.getElementById('panduan-modal').style.display = 'none'; });
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateSlide(1));
    setupImageZoomListeners(); 

    // ====================================
    // 5. EVENT LISTENERS PAGINASI & RERENDER (dari data_visual.js)
    // ====================================
    domElements.prevPageBtn.addEventListener('click', () => goToPage('prev'));
    domElements.nextPageBtn.addEventListener('click', () => goToPage('next'));

    // Rerender Tabel Saat Orientasi Berubah (Mobile/Desktop)
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    function handleMediaQueryChange(e) {
        if (beneficiariesData.length > 0 && currentTableData.length > 0) {
            displayDataTable(currentTableData);
        } else {
            updatePaginationControls(0, 0, 0); 
        }
    }
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMediaQueryChange);
    } else if (mediaQuery.addListener) { 
        mediaQuery.addListener(handleMediaQueryChange);
    }
    
    // ====================================
    // 6. EVENT LISTENERS GLOBAL (KLIK DI LUAR MODAL)
    // ====================================
    window.onclick = function(event) {
        const zoomModal = document.getElementById("image-zoom-modal");
        
        if (event.target == navigationModal) {
            closeNavigationModal();
            if (lastClickedBeneficiary) openBiodataModal(lastClickedBeneficiary);
        }
        if (event.target == biodataModal) closeBiodataModal(); 
        if (event.target == domElements.filterModal) closeFilterPopup(false); 
        if (event.target == domElements.downloadModal) closeDownloadModal();
        if (event.target == aboutModal) closeAboutModal();
        if (event.target == document.getElementById('panduan-modal')) { 
            document.getElementById('panduan-modal').style.display = 'none'; 
        }
    }

    // ====================================
    // 7. EVENT LISTENERS TOPNAV MENU 
    // ====================================
    
    // Toggle Tampilan Dropdown ketika tombol di topnav diklik
    if (topnavMenuToggle && menuDropdown) {
        topnavMenuToggle.addEventListener('click', (e) => {
            e.preventDefault(); 
            menuDropdown.classList.toggle('hidden');
            
            // LOGIKA TOOLTIP: Tentukan status menu saat ini
            const menuIsOpen = !menuDropdown.classList.contains('hidden'); 
            updateMenuToggleTooltip(menuIsOpen);

            const icon = topnavMenuToggle.querySelector('i');
            icon.className = menuDropdown.classList.contains('hidden') ? 'fas fa-bars' : 'fas fa-times'; 
        });
    }

    // TUTUP OTOMATIS TOPNAV DROPDOWN
    document.addEventListener('click', (event) => {
        if (menuDropdown && topnavMenuToggle && !menuDropdown.classList.contains('hidden') 
            && !topnavMenuToggle.contains(event.target) 
            && !menuDropdown.contains(event.target)
        ) {
            menuDropdown.classList.add('hidden');
            topnavMenuToggle.querySelector('i').className = 'fas fa-bars'; 
            
            // LOGIKA TOOLTIP: Tutup menu
            updateMenuToggleTooltip(false); 
        }
    });

    // ====================================
    // 8. INISIALISASI AKHIR & TEMA
    // ====================================
    const tableContent = document.getElementById('table-card-content');
    const uploadContent = document.getElementById('upload-card-content');

    // Pastikan kedua konten card terlihat sejak awal
    if(tableContent) tableContent.classList.remove('hidden'); 
    if(uploadContent) uploadContent.classList.remove('hidden');
    
    // Sembunyikan tombol Filter dan Reset saat start
    domElements.toggleFilterBtn.style.display = 'none';
    domElements.resetButton.style.display = 'none';

    // [TERJEMAHAN] Status file awal
    setFileStatus(getTranslation('file_status_idle'), 'idle');
    updatePaginationControls(); 
    updateResetButtonVisibility();
    updateFilterSummaryVisibility(); 
    setSearchFeedback('', ''); 
    updateFilterDot(); 

    // --- INISIALISASI TEMA ---
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = 'light';
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (prefersDark) {
        initialTheme = 'dark';
    }

    // Terapkan tema awal dan update state
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateToggleState(initialTheme); 

    // Tambahkan event listener ke tombol toggle tema
    const toggleInput = document.getElementById('theme-toggle');
    if (toggleInput) {
        toggleInput.addEventListener('change', toggleTheme);
    }
    
    // --- INISIALISASI TOOLTIP MENU ---
    updateMenuToggleTooltip(false);
});


// ===================================================================
// KODE UNTUK PRELOADER
// ===================================================================
window.onload = function() {
    const preloader = document.getElementById('preloader-overlay');
    
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
        }, 1000); 

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. Dapatkan semua tautan navigasi
    const navLinks = document.querySelectorAll('.topnav a');

    // 2. Dapatkan semua elemen konten yang ingin dikontrol
    const uploadCard = document.getElementById('upload_card');
    const tableCard = document.getElementById('table_card');

    // Fungsi untuk menyembunyikan semua konten
    function hideAllContent() {
        if (uploadCard) uploadCard.style.display = 'none';
        if (tableCard) tableCard.style.display = 'none';
    }

    // Fungsi untuk menampilkan konten berdasarkan ID
    function showContent(contentId) {
        const contentElement = document.getElementById(contentId);
        if (contentElement) {
            contentElement.style.display = 'block';
        }
    }

    // Inisialisasi: Sembunyikan semua konten terlebih dahulu
    hideAllContent();

    // Inisialisasi: Tampilkan konten yang sesuai dengan tautan yang memiliki kelas 'active' saat ini
    const activeLink = document.querySelector('.topnav a.active');
    if (activeLink) {
        // Ambil ID konten dari atribut href (misalnya: "#upload_card" -> "upload_card")
        const activeContentId = activeLink.getAttribute('href').substring(1);
        showContent(activeContentId);
    }

    // 3. Tambahkan event listener ke setiap tautan navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            
            // Hanya proses tautan navigasi biasa (bukan tautan "split" menu)
            if (!this.classList.contains('split')) {
                // Cegah perilaku default tautan (navigasi ke URL)
                event.preventDefault();

                // Hapus kelas 'active' dari tautan yang saat ini aktif
                navLinks.forEach(nav => nav.classList.remove('active'));

                // Tambahkan kelas 'active' ke tautan yang baru diklik
                this.classList.add('active');

                // Sembunyikan semua konten
                hideAllContent();

                // Dapatkan ID konten dari atribut href tautan yang diklik
                const targetContentId = this.getAttribute('href').substring(1);
                
                // Tampilkan konten yang terkait
                showContent(targetContentId);
            }
            // Catatan: Tautan '.split' (menu bar) diabaikan dan tidak mengubah konten di sini
        });
    });
});

// ===================================================================
// FUNGSI NAVIGASI
// ===================================================================

/**
 * Mengganti tampilan ke tab "Daftar Penerima" dan memperbarui status aktif navigasi.
 */
function switchToTableView() {
    const uploadCard = document.getElementById('upload_card');
    const tableCard = document.getElementById('table_card');

    // 1. Sembunyikan semua konten
    if (uploadCard) uploadCard.style.display = 'none';
    if (tableCard) tableCard.style.display = 'none';

    // 2. Tampilkan konten Daftar Penerima
    if (tableCard) tableCard.style.display = 'block';

    // 3. Perbarui kelas 'active' pada topnav
    const navLinks = document.querySelectorAll('.topnav a');
    navLinks.forEach(nav => nav.classList.remove('active'));
    
    // Cari dan aktifkan tautan Daftar Penerima
    const tableLink = document.querySelector('.topnav a[href="#table_card"]');
    if (tableLink) tableLink.classList.add('active');
}

// ====================================================================
// FUNGSI LIVE CLOCK & CALENDAR BARU
// ====================================================================
/**
 * Mengambil tanggal dan waktu saat ini, lalu memperbarui elemen live-datetime.
 */
function updateDateTime() {
    const dateTimeElement = document.getElementById('live-datetime');
    if (!dateTimeElement) return;

    const now = new Date();
    
    // Asumsi: Fungsi getCurrentLanguage() ada di translation.js
    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
    
    // Ambil Pemisah dari Terjemahan
    const separator = getTranslation('datetime_separator'); 
    
    // --- 1. FORMAT TANGGAL (Tetap Sama) ---
    const dateOptions = { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long',   
        year: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString(currentLang, dateOptions);

    // --- 2. FORMAT WAKTU (MENGGUNAKAN TITIK DUA SECARA MANUAL) ---
    
    // Mengambil jam, menit, dan detik dengan zero-padding
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // [KUNCI]: Merangkai waktu secara manual dengan TITIK DUA
    const timeOnly = `${hours}:${minutes}:${seconds}`;

    // Mengambil Nama Zona Waktu (WIB/WITA/WIT, dll.)
    // Kita menggunakan Intl.DateTimeFormat hanya untuk mengambil timeZoneName.
    const timezoneFormatter = new Intl.DateTimeFormat(currentLang, { timeZoneName: 'short' });
    const parts = timezoneFormatter.formatToParts(now);
    // Cari bagian yang memiliki tipe 'timeZoneName'
    const timeZonePart = parts.find(part => part.type === 'timeZoneName');
    const timeZone = timeZonePart ? timeZonePart.value : '';

    // Gabungkan waktu dan zona waktu
    const formattedTimeWithZone = `${timeOnly} ${timeZone}`.trim();

    // Tampilkan Tanggal dan Waktu
    dateTimeElement.innerHTML = `
        <span class="live-date">${formattedDate}</span>
        <span class="datetime-separator"> ${separator} </span>
        <span class="live-time">${formattedTimeWithZone}</span>
    `;
}

// ===================================================================
// FUNGSI MODE TERANG/GELAP (UPDATE TOOLTIP)
// ===================================================================

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateToggleState(newTheme); 
}

function updateToggleState(theme) {
    const toggleInput = document.getElementById('theme-toggle');
    const darkStyle = document.getElementById('dark-mode-style');

    if (toggleInput) {
        toggleInput.checked = theme === 'dark';
    }

    if (darkStyle) {
        darkStyle.disabled = theme !== 'dark';
    }
}


// ===================================================================
// FUNGSI TOOLTIP TOGGLE MENU
// ===================================================================

function updateMenuToggleTooltip(isOpen) {
    const button = domElements.menuToggleButton;

    if (button) {
        // [TERJEMAHAN] Tooltip menu (menggunakan kunci yang sudah ada di index.html & kunci baru untuk collapse)
        const newTooltipText = isOpen
            ? getTranslation('tooltip_menu_collapse') 
            : getTranslation('tooltip_expand_menu'); 
            
        button.setAttribute('data-tooltip', newTooltipText);
    }
}


// Inisialisasi tema saat aplikasi dimuat
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil preferensi dari Local Storage
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Ambil preferensi dari sistem operasi (hanya jika belum ada di Local Storage)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = 'light';
    if (savedTheme) {
        initialTheme = savedTheme; 
    } else if (prefersDark) {
        initialTheme = 'dark';
    }

    // 3. Terapkan tema awal
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateToggleState(initialTheme); 
    
    // 4. Tambahkan event listener ke tombol toggle
    const toggleInput = document.getElementById('theme-toggle');
    if (toggleInput) {
        toggleInput.addEventListener('change', toggleTheme);
    }
    
    // 5. INISIALISASI TOOLTIP MENU
    updateMenuToggleTooltip(false);
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Logika inisialisasi tema) ...

    // 4. Tambahkan event listener ke tombol toggle
    // ... (Logika event listener toggle tema) ...

    // 5. [PERUBAHAN] INISIALISASI DAN START LIVE DATE & TIME
    updateDateTime(); // Panggil sekali segera
    // Perbarui setiap 1 detik
    setInterval(updateDateTime, 1000); 
});