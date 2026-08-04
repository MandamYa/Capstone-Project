// modal.js

// ====================================================================
// FUNGSI UTILITY MENU FLOATING
// ====================================================================
/**
 * Menutup floating menu dropdown. Fungsi ini harus diakses secara global.
 */
function closeMenuDropdown() {
    const menuDropdown = document.getElementById('floating-menu-dropdown');
    const menuToggle = document.getElementById('floating-menu-toggle');
    if (menuDropdown && menuToggle) {
        menuDropdown.classList.add('hidden'); // Menyembunyikan daftar item
        
        // Mereset ikon dan tooltip
        menuToggle.querySelector('i').className = 'fas fa-bars'; 
        if (typeof updateMenuToggleTooltip === 'function') {
            updateMenuToggleTooltip(false); 
        }
    }
}


// ====================================================================
// FUNGSI DOWNLOAD MODAL
// ====================================================================

function openDownloadModal() {
    // Diasumsikan domElements sudah didefinisikan secara global
    if (domElements.downloadModal) domElements.downloadModal.style.display = 'block';
}

function closeDownloadModal() {
    if (domElements.downloadModal) domElements.downloadModal.style.display = 'none';
}

function confirmDownloadTemplate() {
    const fileUrl = 'files/data_template.xlsx';
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'data_template.xlsx'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    closeDownloadModal();
}


// ====================================================================
// FUNGSI UTILITY STATUS CHIP (Untuk penentuan warna/kelas CSS)
// Ditempatkan di sini agar bisa diakses oleh openBiodataModal
// ====================================================================

/**
 * Fungsi untuk menentukan kelas CSS (warna chip) berdasarkan status mentah.
 * Logika ini tetap menggunakan kata kunci bahasa Indonesia untuk klasifikasi warna.
 * @param {string} status - Nilai status mentah dari data Excel.
 * @returns {string} Nama kelas CSS.
 */
const getChipClass = (status) => {
    // Normalisasi untuk klasifikasi: lowercase dan trim
    const normalizedStatus = String(status).toLowerCase().trim(); 
    
    if (normalizedStatus.includes('aktif') && !normalizedStatus.includes('tidak')) { 
        return 'status-aktif';
    }
    // Tidak perlu cek 'pending' karena data Excel hanya berisi 'Dalam Proses' atau 'Pending'
    if (normalizedStatus.includes('dalam proses')) { 
        return 'status-pending';
    }
    if (normalizedStatus.includes('tidak aktif') || normalizedStatus.includes('nonaktif')) { 
        return 'status-tidak-aktif'; 
    }
    return 'status-tidak-aktif'; 
};


// ====================================================================
// LOGIKA MODAL NAVIGASI & BIODATA
// ====================================================================

function openNavigationModal(url, name) {
    // Diasumsikan currentNavigationUrl, modalTextContent, navigationModal, 
    // navigationCancelBtn, navigationConfirmBtn sudah didefinisikan secara global
    
    currentNavigationUrl = url; 
    // Menggunakan getTranslation (asumsi fungsi ini tersedia secara global)
    const newText = getTranslation('navigation_modal_text_dynamic', name); 
    if (modalTextContent) modalTextContent.innerHTML = newText;
    navigationModal.style.display = 'block'; 
    if (navigationCancelBtn) navigationCancelBtn.textContent = getTranslation('navigation_cancel');
    if (navigationConfirmBtn) navigationConfirmBtn.textContent = getTranslation('navigation_confirm');
}

function closeNavigationModal() {
    // Diasumsikan navigationModal, currentNavigationUrl, modalTextContent sudah didefinisikan secara global
    navigationModal.style.display = 'none'; 
    currentNavigationUrl = ''; 
    if (modalTextContent) {
        modalTextContent.innerHTML = getTranslation('navigation_modal_default_text');
    }
}

function handleTableRowClick(indexOnPage) {
    // Diasumsikan currentPage, ROWS_PER_PAGE, currentTableData sudah didefinisikan secara global
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const actualIndex = startIndex + indexOnPage;
    const item = currentTableData[actualIndex];
    if (item) openBiodataModal(item);
}

function openBiodataModal(item) {
    // Diasumsikan lastClickedBeneficiary, biodataNameHeader, biodataNIKHeader, 
    // biodataDetailsContainer, biodataActionsFull, biodataModal sudah didefinisikan secara global
    
    lastClickedBeneficiary = item;     
    const name = item.NAMA || getTranslation('biodata_name_unavailable');
    const nik = item.NIK 
        ? `${getTranslation('biodata_nik_label')}: ${item.NIK}` 
        : (item.NO 
            ? `${getTranslation('biodata_no_urut_label')}: ${item.NO}` 
            : getTranslation('biodata_id_unavailable')); 

    biodataNameHeader.textContent = name;
    biodataNIKHeader.textContent = nik;

    biodataDetailsContainer.innerHTML = '';
    biodataActionsFull.innerHTML = '';

    const bantuan = item.JENIS_BANTUAN || 'N/A';
    const statusRaw = String(item.STATUS || 'N/A'); 
    
    // Memecah status mentah (misal: "Aktif/Jenis Bantuan A")
    const statusChips = statusRaw.split('/').map(b => b.trim()).filter(b => b);

    // Hapus definisi getChipClass lokal karena sudah didefinisikan di atas!
    
    const bantuanHTML = `
        <div class="detail-group">
            <div class="detail-icon-group">
                <i class="fas fa-handshake"></i> 
                <span class="detail-label">${getTranslation('biodata_label_assistance')}</span>
            </div>
            <div class="detail-value-group">
                <span class="data-chip chip-bantuan">${bantuan.toUpperCase()}</span> 
                
                ${statusChips.map(b => 
                    // Panggil translateDataContent() untuk teks yang akan ditampilkan
                    `<span class="data-chip ${getChipClass(b)}">${translateDataContent(b)}</span>` 
                ).join('')}
            </div>
        </div>
        <hr class="detail-separator">
    `;
    biodataDetailsContainer.innerHTML += bantuanHTML;
    
    const alamat = item.ALAMAT_LENGKAP || getTranslation('biodata_address_unavailable');
    const alamatHTML = `
        <div class="detail-group">
            <div class="detail-icon-group">
                <i class="fas fa-home"></i> 
                <span class="detail-label">${getTranslation('biodata_label_address')}</span>
            </div>
            <div class="detail-value-group">
                <p class="alamat-text">${alamat}</p>
            </div>
        </div>
        <hr class="detail-separator">
    `;
    biodataDetailsContainer.innerHTML += alamatHTML;
    
    const rt = item.RT || 'N/A';
    const rw = item.RW || 'N/A';
    // Asumsi: item.WILAYAH bisa berupa satu kolom atau gabungan dari provinsi/kota/kecamatan
    const wilayah = item.WILAYAH || 'N/A'; 
    const areaHTML = `
        <div class="detail-group">
            <div class="detail-icon-group">
                <i class="fas fa-map-marker-alt"></i> 
                <span class="detail-label">${getTranslation('biodata_label_area')}</span>
            </div>
            <div class="detail-value-group">
                <span class="data-chip chip-wilayah">${wilayah}</span>
                <span class="data-chip chip-rt">${getTranslation('biodata_rt_label')}: ${rt}</span>
                <span class="data-chip chip-rw">${getTranslation('biodata_rw_label')}: ${rw}</span>
            </div>
        </div>
    `;
    biodataDetailsContainer.innerHTML += areaHTML;
    
    const rawLink = item.LINK_GPS;
    let isLinkValid = rawLink && String(rawLink).length > 5 && (String(rawLink).startsWith('http') || String(rawLink).startsWith('https'));

    if (isLinkValid) {
        const nameEscaped = (item.NAMA || 'Penerima Bantuan').replace(/'/g, "\\'");
        const navButton = document.createElement('button');
        navButton.classList.add('btn-primary', 'btn-full-width'); 
        navButton.innerHTML = `<i class="fas fa-map-marked-alt"></i> ${getTranslation('biodata_btn_navigate')}`;
        
        navButton.onclick = () => { openNavigationModal(rawLink, nameEscaped); };
        biodataActionsFull.appendChild(navButton);
    } else {
        const warningDiv = document.createElement('div');
        warningDiv.classList.add('navigation-warning-full'); 
        
        warningDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${getTranslation('biodata_gps_warning')}`;
        
        biodataActionsFull.appendChild(warningDiv);
    }
    biodataModal.style.display = 'block';
}

function closeBiodataModal() {
    // Diasumsikan biodataModal dan lastClickedBeneficiary sudah didefinisikan secara global
    biodataModal.style.display = 'none';
    lastClickedBeneficiary = null; 
}

// ===================================
// LOGIKA MODAL PANDUAN (GUIDE)
// ===================================

// Elemen ini harus dideklarasikan sebelum DOMContentLoaded
// Diasumsikan slides, prevBtn, nextBtn, slideIndicator, currentSlide, totalSlides sudah didefinisikan secara global

function updateSlide(direction) {
    if (totalSlides === 0) return;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    slides.forEach(slide => {
        slide.classList.remove('active-slide');
    });

    slides[currentSlide].classList.add('active-slide');

    slideIndicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function openPanduanModal() {
    const panduanModal = document.getElementById('panduan-modal'); 
    if (panduanModal) panduanModal.style.display = 'block';
    
    currentSlide = -1;
    updateSlide(1); 
    
    closeMenuDropdown(); 
}

// ===================================
// LOGIKA MODAL TENTANG (ABOUT)
// ===================================

function openAboutModal() {
    const aboutModal = document.getElementById('about-modal');
    if (aboutModal) aboutModal.style.display = 'block';
    
    closeMenuDropdown(); 
}

function closeAboutModal() {
    const aboutModal = document.getElementById('about-modal');
    if (aboutModal) aboutModal.style.display = 'none';
}

// ===================================
// LOGIKA IMAGE ZOOM (LIGHTBOX)
// ===================================

function setupImageZoomListeners() {
    const zoomModal = document.getElementById("image-zoom-modal");
    const zoomImg = document.getElementById("img-to-zoom");
    const zoomCloseBtn = document.querySelector(".close-zoom-btn");

    document.querySelectorAll('.panduan-img').forEach(img => {
        img.addEventListener('click', function() {
            if (!zoomModal || !zoomImg) return;
            zoomModal.style.display = "block";
            zoomImg.src = this.src;
            zoomImg.style.cursor = 'pointer';
        });
    });

    if (zoomCloseBtn) {
        zoomCloseBtn.onclick = function() { 
            if (zoomModal) zoomModal.style.display = "none";
        }
    }
    if (zoomModal) {
        zoomModal.onclick = function(event) {
            if (event.target === zoomModal || event.target === zoomImg) {
                zoomModal.style.display = "none";
            }
        }
    }
}

// ===================================================================
// INISIALISASI LISTENER
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Listener Download Modal ---
    if (domElements && domElements.downloadModal) {
        domElements.downloadModal.addEventListener('click', (e) => {
            if (e.target === domElements.downloadModal) {
                closeDownloadModal();
            }
        });
    }

    // --- Listener About Modal ---
    const aboutModal = document.getElementById('about-modal');
    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                closeAboutModal();
            }
        });
    }
    
    // --- Listener Panduan Modal ---
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateSlide(1));

    const panduanModal = document.getElementById('panduan-modal');
    if (panduanModal) {
        panduanModal.addEventListener('click', (e) => {
            if (e.target === panduanModal) {
                const closeBtn = panduanModal.querySelector('.close-panduan-btn');
                if (closeBtn) closeBtn.click();
            }
        });
    }

    // --- LISTENER MODAL BIODATA ---
    const closeBiodataBtn = document.querySelector('.close-biodata-btn');
    if (closeBiodataBtn) {
        closeBiodataBtn.addEventListener('click', closeBiodataModal);
    }
    const biodataModal = document.getElementById('biodata-modal');
    if (biodataModal) {
        // Listener untuk menutup modal saat klik di luar area konten
        biodataModal.addEventListener('click', (e) => {
            if (e.target === biodataModal) {
                closeBiodataModal();
            }
        });
    }

    // Inisialisasi Image Zoom 
    setupImageZoomListeners();
});