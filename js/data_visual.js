// data_visual.js
// Escape ALL values originating from spreadsheets or user inputs before HTML interpolation.
function escapeHtml(value) {
  return String(value === undefined || value === null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ====================================================================
// FUNGSI UTILITY
// ====================================================================
function isMobileView() {
    return window.matchMedia("(max-width: 600px)").matches;
}

// [DIPERBARUI] Mendukung Translasi Dinamis (Menyimpan Key & Args)
function setFileStatus(key, status, ...args) {
    const fileStatusElement = document.getElementById('file-status');
    if (!fileStatusElement) return;
    
    // 1. Simpan metadata untuk translasi otomatis nanti
    fileStatusElement.setAttribute('data-key', key);
    if (args.length > 0) {
        // Simpan argumen dinamis (seperti nama file atau jumlah data)
        fileStatusElement.setAttribute('data-args', JSON.stringify(args));
    } else {
        fileStatusElement.removeAttribute('data-args');
    }
    
    // 2. Atur kelas CSS
    fileStatusElement.classList.remove('status-idle', 'status-success', 'status-error');
    if (status === 'success') fileStatusElement.classList.add('status-success');
    else if (status === 'error') fileStatusElement.classList.add('status-error');
    else fileStatusElement.classList.add('status-idle');

    // 3. Terjemahkan langsung saat ini menggunakan fungsi global getTranslation
    // Pastikan function getTranslation sudah tersedia (dari translation.js)
    if (typeof getTranslation === 'function') {
        fileStatusElement.textContent = getTranslation(key, ...args);
    } else {
        fileStatusElement.textContent = key; // Fallback jika belum load
    }
}

// [DIPERBARUI] Mendukung Translasi Dinamis
function setSearchFeedback(key, type, ...args) {
    const feedbackElement = domElements.searchFeedback;
    if (!feedbackElement) return;
    
    // Reset state
    feedbackElement.classList.remove('search-feedback-error');
    feedbackElement.textContent = '';
    feedbackElement.style.display = 'none';
    feedbackElement.style.animation = 'none'; 
    void feedbackElement.offsetWidth; // Trigger reflow

    if (key) {
        // Simpan metadata translasi
        feedbackElement.setAttribute('data-key', key);
        if (args.length > 0) {
            feedbackElement.setAttribute('data-args', JSON.stringify(args));
        } else {
            feedbackElement.removeAttribute('data-args');
        }

        // Tampilkan teks
        if (typeof getTranslation === 'function') {
            feedbackElement.textContent = getTranslation(key, ...args); 
        } else {
            feedbackElement.textContent = key;
        }

        feedbackElement.style.display = 'block';
        
        if (type === 'error') {
            feedbackElement.classList.add('search-feedback-error');
            feedbackElement.style.animation = 'fadeInOut 5s';
        }
    } else {
        // Jika key kosong, bersihkan atribut
        feedbackElement.removeAttribute('data-key');
        feedbackElement.removeAttribute('data-args');
    }
}

// Ringkasan sederhana untuk memperkuat fungsi visualisasi data.
function updateStatistics(data) {
    const panel = document.getElementById('statistics-overview');

    if (!panel) return;

    // Sembunyikan statistik jika belum ada data Excel.
    if (!beneficiariesData || beneficiariesData.length === 0) {
        panel.hidden = true;
        return;
    }

    // Gunakan data yang sedang ditampilkan oleh tabel,
    // termasuk hasil filter wilayah dan pencarian nama.
    const activeData = Array.isArray(data) ? data : [];

    panel.hidden = false;

    // 1. Total penerima sesuai data aktif.
    const totalElement = document.getElementById('stat-total');
    if (totalElement) {
        totalElement.textContent = String(activeData.length);
    }

    // 2. Jumlah wilayah unik pada data aktif.
    const regionElement = document.getElementById('stat-region');
    if (regionElement) {
        const uniqueRegions = new Set(
            activeData
                .map(item => String(item.WILAYAH || '').trim())
                .filter(Boolean)
        );

        regionElement.textContent = String(uniqueRegions.size);
    }

    // 3. Jumlah penerima dengan status aktif.
    // Kecualikan TIDAK AKTIF dan NONAKTIF.
    const activeElement = document.getElementById('stat-active');
    if (activeElement) {
        const activeCount = activeData.filter(item => {
            const status = String(item.STATUS || '')
                .trim()
                .toUpperCase();

            return (
                status.includes('AKTIF') &&
                !status.includes('TIDAK') &&
                !status.includes('NON')
            );
        }).length;

        activeElement.textContent = String(activeCount);
    }

    // 4. Jumlah seluruh hasil yang cocok,
    // bukan hanya baris pada halaman saat ini.
    const matchedElement = document.getElementById('stat-matched');
    if (matchedElement) {
        matchedElement.textContent = String(activeData.length);
    }
}

function clearExcelData() {
    beneficiariesData = [];
    filteredData = [];
    currentTableData = [];
    currentPage = 1;
    domElements.searchInput.value = '';
    domElements.toggleFilterBtn.style.display = 'none';
    domElements.wilayahFilter.value = '';
    domElements.rwFilter.value = '';
    domElements.rtFilter.value = '';
    updateStatistics([]);
    updatePaginationControls(0, 0, 0);
    updateResetButtonVisibility();
    updateFilterSummaryVisibility();
    updateFilterDot();
}

// ====================================================================
// LOGIKA EXCEL & DATA LOAD
// ====================================================================
function loadExcel(fileList) {
    const file = fileList && fileList[0]; 
    if (!file) {
        setFileStatus('file_status_idle', 'idle'); // [UBAH] Pakai Key
        return;
    }

    // Ganti data hanya setelah file baru benar-benar valid.
    // Data Excel tidak pernah dikirim ke server aplikasi.
    // Validasi Tipe File
    const fileName = file.name || '';
    if (file.size > 15 * 1024 * 1024) {
        setFileStatus('file_error_too_large', 'error');
        domElements.fileInput.value = '';
        return;
    }
    if (!fileName.toLowerCase().endsWith('.xlsx')) {
        setFileStatus('file_error_wrong_type', 'error'); // [UBAH] Pakai Key
        if (document.getElementById('excel-file')) {
            document.getElementById('excel-file').value = '';
        }
        return;
    }
    
    // [UBAH] Kirim argumen fileName ke fungsi
    setFileStatus('file_status_processing', 'idle', fileName);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedRows = XLSX.utils.sheet_to_json(worksheet, {defval:'', raw:false});
            
            // --- JALUR KEGAGALAN 1: Data Kosong ---
            if (parsedRows.length === 0) {
                 setFileStatus('file_error_empty_sheet', 'error'); // [UBAH] Pakai Key
                 clearExcelData();
                 // UI Error khusus tabel
                 const errorText = typeof getTranslation === 'function' ? getTranslation('table_error_empty_file_ui') : 'Error';
                 domElements.dataList.innerHTML = `<div class="empty-table-message"><p>${errorText}</p></div>`;
                 updatePaginationControls(0, 0, 0); 
                 return; 
            }
            
            // --- JALUR KEGAGALAN 2: Validasi Format Header ---
            const REQUIRED_HEADERS = ['NAMA', 'ALAMAT_LENGKAP', 'JENIS_BANTUAN', 'STATUS', 'WILAYAH', 'RT', 'RW'];
            const normalizedRows = parsedRows.map(row => Object.fromEntries(
                Object.entries(row).map(([key, value]) => [String(key).trim().toUpperCase(), value])
            ));
            const firstRowKeys = Object.keys(normalizedRows[0] || {});
            
            const missingHeaders = REQUIRED_HEADERS.filter(header => !firstRowKeys.includes(header));
            
            if (missingHeaders.length > 0) {
                 // [UBAH] Kirim argumen missingHeaders
                 setFileStatus('file_error_missing_headers', 'error', missingHeaders.join(', '));
                 clearExcelData();
                 
                 const errorText = typeof getTranslation === 'function' ? getTranslation('table_error_wrong_format_ui') : 'Format Error';
                 domElements.dataList.innerHTML = `<div class="empty-table-message"><p>${errorText}</p></div>`;
                 updatePaginationControls(0, 0, 0); 
                 return; 
            }

            // --- JALUR SUKSES ---
            beneficiariesData = normalizedRows;
            // A new file starts from unfiltered, unsearched data.
            domElements.wilayahFilter.value = '';
            domElements.rwFilter.value = '';
            domElements.rtFilter.value = '';
            domElements.searchInput.value = '';
            // [UBAH] Kirim argumen fileName dan jumlah data
            setFileStatus('file_status_loaded', 'success', fileName, beneficiariesData.length);
            
            currentPage = 1;
            filteredData = beneficiariesData; 
            displayDataTable(filteredData); 
            
            // UI Updates - MEMUNCULKAN TOMBOL FILTER
            const tableContent = document.getElementById('table-card-content');
            if (tableContent) {
                // INI BARIS PENTING YANG MEMBUAT TOMBOL MUNCUL
                domElements.toggleFilterBtn.style.display = 'inline-flex'; 
            }

            if (typeof populateFilters === 'function') {
                populateFilters(beneficiariesData);
                updateFilterSummaryVisibility(); 
                updateResetButtonVisibility();
                updateFilterDot(); 
            }
            setSearchFeedback('', ''); 
            
            if (typeof switchToTableView === 'function') {
                switchToTableView(); 
            }
            
        } catch (error) {
            console.error(error);
            // --- JALUR KEGAGALAN 3: Error Parsing Format Excel ---
            setFileStatus('file_error_parsing', 'error'); // [UBAH] Pakai Key
            // Old data may remain visible; don't silently replace it with malformed data.
        }
    };
    reader.onerror = () => setFileStatus('file_error_parsing', 'error');
    reader.readAsArrayBuffer(file);
}

// ====================================================================
// FUNGSI MENAMPILKAN DATA (TABLE)
// ====================================================================
function displayDataTable(data) {
    currentTableData = data;
    updateStatistics(data);
    totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
    else if (totalPages === 0) currentPage = 0;
    
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = Math.min(startIndex + ROWS_PER_PAGE, data.length);
    const dataOnPage = data.slice(startIndex, endIndex);

    if (data.length === 0) {
        // Gunakan terjemahan untuk pesan error UI
        const msg = typeof getTranslation === 'function' ? getTranslation('table_error_no_criteria_ui') : 'No Data';
        domElements.dataList.innerHTML = `
            <div class="empty-table-message"><i class="fas fa-info-circle large-info-icon"></i><p>${msg}</p></div>
        `;
        updatePaginationControls(data.length, startIndex, endIndex);
        return;
    }

    domElements.dataList.classList.remove('empty-table-message');
    
    const isMobile = isMobileView();
    
    // Gunakan terjemahan untuk header
    // Pastikan getTranslation tersedia, jika tidak fallback ke teks default
    const tr = typeof getTranslation === 'function' ? getTranslation : (k) => k;

    const HEADER_KEYS = {
        'NO': tr('table_header_no'), 
        'NAMA': tr('table_header_name'), 
        'ALAMAT_LENGKAP': tr('table_header_address'), 
        'JENIS_BANTUAN': tr('table_header_assistance'),
        'STATUS': tr('table_header_status'), 
        'WILAYAH': tr('table_header_region'), 
        'RT': tr('table_header_rt'), 
        'RW': tr('table_header_rw')
    };

    let VISIBLE_KEYS = ['NO', 'NAMA', 'ALAMAT_LENGKAP', 'JENIS_BANTUAN','STATUS', 'WILAYAH', 'RT', 'RW'];
    
    if (isMobile) {
        VISIBLE_KEYS = ['NO', 'NAMA', 'STATUS']; 
    }

    let tableHTML = '<table><thead><tr>';
    VISIBLE_KEYS.forEach(key => { 
        tableHTML += `<th>${HEADER_KEYS[key] || key}</th>`; 
    });
    tableHTML += '</tr></thead><tbody>';

dataOnPage.forEach((item, index) => { 
    tableHTML += `<tr onclick="handleTableRowClick(${index})" style="cursor: pointer;">`; 
    VISIBLE_KEYS.forEach(key => {
        if (key === 'NO') {
            tableHTML += `<td class="col-no">${startIndex + index + 1}</td>`;
        } else if (key === 'STATUS') { 
            const rawStatusValue = item[key] ? String(item[key]) : '';
            
            // [BARIS BARU KRITIS]: Panggil fungsi terjemahan konten data
            const translatedStatus = typeof translateDataContent === 'function' 
                ? translateDataContent(rawStatusValue) 
                : rawStatusValue; // Fallback jika fungsi belum dimuat
                
            // Logika untuk statusClass tetap menggunakan versi uppercase (untuk klasifikasi)
            const statusValueForClass = rawStatusValue.toUpperCase(); 
            
            let statusClass = '';
            
            if (statusValueForClass.includes('AKTIF') && !statusValueForClass.includes('TIDAK')) { 
                statusClass = 'status-aktif'; 
            } else if (statusValueForClass.includes('TIDAK AKTIF') || statusValueForClass.includes('NONAKTIF')) { 
                statusClass = 'status-tidak-aktif'; 
            } else if (statusValueForClass.includes('DALAM PROSES')) {
                statusClass = 'status-pending'; 
            }
            
            // [PERBAIKAN]: Gunakan translatedStatus untuk ditampilkan
            tableHTML += `<td class="${statusClass}">${escapeHtml(translatedStatus || 'N/A')}</td>`;

        } else {
            tableHTML += `<td>${escapeHtml(item[key] !== undefined && item[key] !== '' ? item[key] : 'N/A')}</td>`;
        }
    });
    tableHTML += '</tr>';
});
tableHTML += '</tbody></table>';
domElements.dataList.innerHTML = tableHTML;
updatePaginationControls(data.length, startIndex, endIndex);}

// ====================================================================
// FUNGSI PAGINASI (UPDATE LOGIC)
// ====================================================================

function goToPage(directionOrNumber) {
    let newPage = currentPage;
    
    if (directionOrNumber === 'prev') {
        newPage = Math.max(1, currentPage - 1);
    } else if (directionOrNumber === 'next') {
        newPage = Math.min(totalPages, currentPage + 1);
    } else if (typeof directionOrNumber === 'number') {
        newPage = Math.min(totalPages, Math.max(1, directionOrNumber));
    }

    if (newPage !== currentPage) {
        currentPage = newPage;
        displayDataTable(currentTableData); 
    }
}

function updatePaginationControls(totalData = 0, startIndex = 0, endIndex = 0) {
    totalPages = Math.ceil(totalData / ROWS_PER_PAGE);
    const displayCurrentPage = totalPages === 0 ? 0 : currentPage;
    
    domElements.pageInfo.innerHTML = '';
    domElements.pageInfo.classList.remove('page-info-text', 'page-number-mobile-group');

    const isMobile = isMobileView(); 
    const tr = typeof getTranslation === 'function' ? getTranslation : (k, ...args) => k + args.join(' ');
    
    // 1. GENERATE DATA COUNT INFO
    let dataRangeText = '';
    if (totalData === 0) {
        dataRangeText = tr('data_count_zero'); 
    } else {
        dataRangeText = tr('data_count_range_text', startIndex + 1, endIndex, totalData);
    }

    let dataCountElement = document.getElementById('data-count-info');
    if (!dataCountElement) {
        dataCountElement = document.createElement('span');
        dataCountElement.id = 'data-count-info';
        domElements.paginationControls.insertBefore(dataCountElement, domElements.prevPageBtn);
    }
    
    // Gunakan data-key juga di sini agar paginasi dinamis ikut berubah bahasa
    if (totalData === 0) {
        dataCountElement.setAttribute('data-key', 'data_count_zero');
        dataCountElement.removeAttribute('data-args');
    } else {
        dataCountElement.setAttribute('data-key', 'data_count_range_text');
        dataCountElement.setAttribute('data-args', JSON.stringify([startIndex + 1, endIndex, totalData]));
    }
    dataCountElement.textContent = dataRangeText;
    
    dataCountElement.style.display = 'block'; 

    if (isMobile) {
        dataCountElement.classList.add('data-count-mobile');
        dataCountElement.style.marginRight = '0'; 
    } else {
        dataCountElement.classList.remove('data-count-mobile');
        dataCountElement.style.marginRight = '20px'; 
    }
    
    // 2. GENERATE PAGE INFO

    if (totalData === 0) {
        domElements.pageInfo.classList.add('page-info-text');
        const pageText = tr('page_info_format_dynamic', displayCurrentPage, totalPages);
        
        domElements.pageInfo.setAttribute('data-key', 'page_info_format_dynamic');
        domElements.pageInfo.setAttribute('data-args', JSON.stringify([displayCurrentPage, totalPages]));
        domElements.pageInfo.textContent = pageText;

    } else if (isMobile && totalPages > 1) {
        // MODE MOBILE: Tampilkan urutan nomor halaman 
        // (Tidak perlu translasi kompleks di sini, hanya angka)
        domElements.pageInfo.classList.add('page-number-mobile-group');
        domElements.pageInfo.removeAttribute('data-key'); // Hapus atribut translasi
        
        let startPage, endPage;
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= 3) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.classList.add('page-number-link');
            
            if (i === currentPage) {
                pageLink.classList.add('active-page');
            }

            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                goToPage(i); 
            });
            
            domElements.pageInfo.appendChild(pageLink);
        }

    } else {
        // MODE DESKTOP
        domElements.pageInfo.classList.add('page-info-text');
        const pageText = tr('page_info_format_dynamic', displayCurrentPage, totalPages);

        domElements.pageInfo.setAttribute('data-key', 'page_info_format_dynamic');
        domElements.pageInfo.setAttribute('data-args', JSON.stringify([displayCurrentPage, totalPages]));
        domElements.pageInfo.textContent = pageText;
    }

    // Update tombol Prev/Next
    domElements.prevPageBtn.disabled = currentPage === 1 || totalData === 0;
    domElements.nextPageBtn.disabled = currentPage === totalPages || totalData === 0;
    
    const dataTableContainer = document.getElementById('data-table-container');
    if(dataTableContainer) dataTableContainer.scrollTop = 0;
}


function buildTableRow(dataItem, index) {
    const row = document.createElement('tr');
    
    // ... Kolom Nomor Urut
    // ... Kolom Nama
    
    // --- KOLOM STATUS (Di sini fungsi harus dipanggil!) ---
    // Asumsi: 'status' adalah kunci untuk kolom Status di data Excel Anda
    let statusValue = dataItem.status; 
    
    // Panggil translateDataContent() untuk menerjemahkan isinya
    const translatedStatus = translateDataContent(statusValue); 

    // Masukkan nilai yang sudah diterjemahkan ke dalam sel tabel
    const statusCell = document.createElement('td');
    statusCell.textContent = translatedStatus;
    row.appendChild(statusCell);
    
    // --- KOLOM LAIN YANG MEMBUTUHKAN TERJEMAHAN ---
    // Contoh: Jenis Bantuan
    // const assistanceValue = translateDataContent(dataItem.jenis_bantuan);
    // ...
    
    return row;
}