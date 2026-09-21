// data_visual.js
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
        fileStatusElement.innerHTML = getTranslation(key, ...args);
    } else {
        fileStatusElement.innerHTML = key; // Fallback jika belum load
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
            feedbackElement.innerHTML = getTranslation(key, ...args); 
        } else {
            feedbackElement.innerHTML = key;
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

// ====================================================================
// LOGIKA EXCEL & DATA LOAD
// ====================================================================
function loadExcel(fileList) {
    const file = fileList[0]; 
    if (!file) {
        setFileStatus('file_status_idle', 'idle'); // [UBAH] Pakai Key
        return;
    }

    // Validasi Tipe File
    const fileName = file.name || '';
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
            beneficiariesData = XLSX.utils.sheet_to_json(worksheet);
            
            // --- JALUR KEGAGALAN 1: Data Kosong ---
            if (beneficiariesData.length === 0) {
                 setFileStatus('file_error_empty_sheet', 'error'); // [UBAH] Pakai Key
                 // UI Error khusus tabel
                 const errorText = typeof getTranslation === 'function' ? getTranslation('table_error_empty_file_ui') : 'Error';
                 domElements.dataList.innerHTML = `<div class="empty-table-message"><p>${errorText}</p></div>`;
                 updatePaginationControls(0, 0, 0); 
                 return; 
            }
            
            // --- JALUR KEGAGALAN 2: Validasi Format Header ---
            const REQUIRED_HEADERS = ['NAMA', 'ALAMAT_LENGKAP', 'JENIS_BANTUAN', 'STATUS', 'WILAYAH', 'RT', 'RW'];
            const firstRowKeys = Object.keys(beneficiariesData[0] || {});
            
            const missingHeaders = REQUIRED_HEADERS.filter(header => !firstRowKeys.includes(header));
            
            if (missingHeaders.length > 0) {
                 // [UBAH] Kirim argumen missingHeaders
                 setFileStatus('file_error_missing_headers', 'error', missingHeaders.join(', '));
                 beneficiariesData = [];
                 currentTableData = [];
                 filteredData = [];
                 
                 const errorText = typeof getTranslation === 'function' ? getTranslation('table_error_wrong_format_ui') : 'Format Error';
                 domElements.dataList.innerHTML = `<div class="empty-table-message"><p>${errorText}</p></div>`;
                 updatePaginationControls(0, 0, 0); 
                 return; 
            }

            // --- JALUR SUKSES ---
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
        }
    };
    reader.readAsArrayBuffer(file);
}

// ====================================================================
// FUNGSI MENAMPILKAN DATA (TABLE)
// ====================================================================
function displayDataTable(data) {
    currentTableData = data; 
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
    tableHTML += `<tr onclick="handleTableRowClick(${startIndex + index})" style="cursor: pointer;">`; 
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
            tableHTML += `<td class="${statusClass}">${translatedStatus || 'N/A'}</td>`;

        } else {
            tableHTML += `<td>${item[key] !== undefined ? item[key] : 'N/A'}</td>`;
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