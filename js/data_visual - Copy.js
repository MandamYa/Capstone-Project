// data_visual.js

// Import atau deklarasi variabel global
// ROWS_PER_PAGE, beneficiariesData, currentTableData, currentPage, totalPages, domElements
// diasumsikan tersedia di global scope.

// ====================================================================
// FUNGSI UTILITY
// ====================================================================
function isMobileView() {
    return window.matchMedia("(max-width: 600px)").matches;
}

function setFileStatus(text, status) {
    const fileStatusElement = document.getElementById('file-status');
    if (!fileStatusElement) return;
    
    fileStatusElement.classList.remove('status-idle', 'status-success', 'status-error');
    
    if (status === 'success') fileStatusElement.classList.add('status-success');
    else if (status === 'error') fileStatusElement.classList.add('status-error');
    else fileStatusElement.classList.add('status-idle');

    fileStatusElement.innerHTML = text; 
}

function setSearchFeedback(text, type) {
    const feedbackElement = domElements.searchFeedback;
    if (!feedbackElement) return;
    
    feedbackElement.classList.remove('search-feedback-error');
    feedbackElement.textContent = '';
    feedbackElement.style.display = 'none';
    feedbackElement.style.animation = 'none'; 
    void feedbackElement.offsetWidth; 

    if (text) {
        // Menggunakan innerHTML karena pesan pencarian (searchFeedback) bisa mengandung tag <strong>
        feedbackElement.innerHTML = text; 
        feedbackElement.style.display = 'block';
        if (type === 'error') {
            feedbackElement.classList.add('search-feedback-error');
            feedbackElement.style.animation = 'fadeInOut 5s';
        }
    }
}

// ====================================================================
// LOGIKA EXCEL & DATA LOAD
// ====================================================================
function loadExcel(fileList) {
    const file = fileList[0]; 
    if (!file) {
        setFileStatus(getTranslation('file_status_idle'), 'idle'); 
        return;
    }

    // --- BARU: Validasi Tipe File ---
    const fileName = file.name || '';
    if (!fileName.toLowerCase().endsWith('.xlsx')) {
        setFileStatus(getTranslation('file_error_wrong_type'), 'error');
        // Reset input file agar pengguna dapat memilih lagi
        if (document.getElementById('excel-file')) {
            document.getElementById('excel-file').value = '';
        }
        return;
    }
    // ---------------------------------
    
    setFileStatus(getTranslation('file_status_processing', file.name), 'idle');
    
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
                 setFileStatus(getTranslation('file_error_empty_sheet'), 'error');
                 domElements.dataList.innerHTML = `<div class="empty-table-message"><p>${getTranslation('table_error_empty_file_ui')}</p></div>`;
                 updatePaginationControls(0, 0, 0); 
                 return; 
            }
            
            // --- JALUR KEGAGALAN 2: Validasi Format Header ---
            const REQUIRED_HEADERS = ['NAMA', 'ALAMAT_LENGKAP', 'JENIS_BANTUAN', 'STATUS', 'WILAYAH', 'RT', 'RW'];
            const firstRowKeys = Object.keys(beneficiariesData[0] || {});
            
            const missingHeaders = REQUIRED_HEADERS.filter(header => !firstRowKeys.includes(header));
            
            if (missingHeaders.length > 0) {
                 setFileStatus(getTranslation('file_error_missing_headers', missingHeaders.join(', ')), 'error');
                 beneficiariesData = [];
                 currentTableData = [];
                 filteredData = [];
                 domElements.dataList.innerHTML = `<div class="empty-table-message"><p>${getTranslation('table_error_wrong_format_ui')}</p></div>`;
                 updatePaginationControls(0, 0, 0); 
                 return; 
            }
            // --- AKHIR VALIDASI ---


            // --- JALUR SUKSES ---
            setFileStatus(getTranslation('file_status_loaded', file.name, beneficiariesData.length), 'success');
            
            currentPage = 1;
            filteredData = beneficiariesData; 
            displayDataTable(filteredData); 
            
            // UI Updates (as before, assuming functions like populateFilters are in filter.js)
            const tableContent = document.getElementById('table-card-content');
            if (tableContent) {
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
            setFileStatus(getTranslation('file_error_parsing'), 'error');
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
        // [TERJEMAHAN: UI Error No Criteria]
        domElements.dataList.innerHTML = `
            <div class="empty-table-message"><i class="fas fa-info-circle large-info-icon"></i><p>${getTranslation('table_error_no_criteria_ui')}</p></div>
        `;
        updatePaginationControls(data.length, startIndex, endIndex);
        return;
    }

    domElements.dataList.classList.remove('empty-table-message');
    
    const isMobile = isMobileView();
    
    // Gunakan terjemahan untuk header
    const HEADER_KEYS = {
        'NO': getTranslation('table_header_no'), 
        'NAMA': getTranslation('table_header_name'), 
        'ALAMAT_LENGKAP': getTranslation('table_header_address'), 
        'JENIS_BANTUAN': getTranslation('table_header_assistance'),
        'STATUS': getTranslation('table_header_status'), 
        'WILAYAH': getTranslation('table_header_region'), 
        'RT': getTranslation('table_header_rt'), 
        'RW': getTranslation('table_header_rw')
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
                const statusValue = rawStatusValue.toUpperCase();
                
                let statusClass = '';
                
                if (statusValue.includes('AKTIF') && !statusValue.includes('TIDAK')) { 
                    statusClass = 'status-aktif'; 
                } else if (statusValue.includes('TIDAK AKTIF') || statusValue.includes('NONAKTIF')) { 
                    statusClass = 'status-tidak-aktif'; 
                } else if (statusValue.includes('DALAM PROSES')) {
                    statusClass = 'status-pending'; 
                }
                
                tableHTML += `<td class="${statusClass}">${rawStatusValue || 'N/A'}</td>`;

            } else {
                tableHTML += `<td>${item[key] !== undefined ? item[key] : 'N/A'}</td>`;
            }
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    domElements.dataList.innerHTML = tableHTML;
    updatePaginationControls(data.length, startIndex, endIndex);
}


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
    
    // 1. GENERATE DATA COUNT INFO
    let dataRangeText = '';
    if (totalData === 0) {
        dataRangeText = getTranslation('data_count_zero'); 
    } else {
        dataRangeText = getTranslation('data_count_range_text', startIndex + 1, endIndex, totalData);
    }

    let dataCountElement = document.getElementById('data-count-info');
    if (!dataCountElement) {
        dataCountElement = document.createElement('span');
        dataCountElement.id = 'data-count-info';
        domElements.paginationControls.insertBefore(dataCountElement, domElements.prevPageBtn);
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
        domElements.pageInfo.textContent = getTranslation('page_info_format_dynamic', displayCurrentPage, totalPages);
    } else if (isMobile && totalPages > 1) {
        // MODE MOBILE: Tampilkan urutan nomor halaman 
        domElements.pageInfo.classList.add('page-number-mobile-group');
        
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
        // MODE DESKTOP: Menampilkan teks info standar 
        domElements.pageInfo.classList.add('page-info-text');
        domElements.pageInfo.textContent = getTranslation('page_info_format_dynamic', displayCurrentPage, totalPages);
    }

    // Update tombol Prev/Next
    domElements.prevPageBtn.disabled = currentPage === 1 || totalData === 0;
    domElements.nextPageBtn.disabled = currentPage === totalPages || totalData === 0;
    
    const dataTableContainer = document.getElementById('data-table-container');
    if(dataTableContainer) dataTableContainer.scrollTop = 0;
}