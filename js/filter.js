// filter.js

// Import atau deklarasi variabel global (asumsi global scope diakses)
// beneficiariesData, filteredData, domElements, filterStateBeforeOpen, currentPage
// diasumsikan tersedia di global scope.

// Pastikan fungsi getTranslation tersedia secara global (dari translation.js)
// Asumsi juga fungsi displayDataTable, setSearchFeedback, dan currentPage
// tersedia dari data_visual.js/main.js

// --- KONSTAN TRANSLASI (Dihapus dari sini, dipindahkan ke dalam fungsi) ---
// Teks terjemahan akan diambil saat dibutuhkan di dalam fungsi untuk menghindari error.


// ====================================================================
// FUNGSI CAPTURE/RESTORE STATE FILTER
// ====================================================================
function captureCurrentFilterState() {
    const { wilayahFilter, rwFilter, rtFilter } = domElements;
    // Pastikan domElements sudah didefinisikan (di main.js)
    if (!domElements || !wilayahFilter) return; 

    filterStateBeforeOpen = {
        wilayah: wilayahFilter.value,
        rw: rwFilter.value,
        rt: rtFilter.value,
    };
}

function restoreFilterState() {
    const { wilayahFilter, rwFilter, rtFilter } = domElements;
    if (filterStateBeforeOpen) {
        wilayahFilter.value = filterStateBeforeOpen.wilayah;
        updateDependentFilters('WILAYAH', false); // false = jangan reset nilai bawah
        rwFilter.value = filterStateBeforeOpen.rw;
        updateDependentFilters('RW', false); // false = jangan reset nilai bawah
        rtFilter.value = filterStateBeforeOpen.rt;
        
        // Panggil update di akhir setelah semua nilai filter dikembalikan
        updateFilterDot();
        updateResetButtonVisibility();
    }
}

// ====================================================================
// FUNGSI DOT NOTIFIKASI FILTER
// ====================================================================
function updateFilterDot() {
    const { wilayahFilter, rwFilter, rtFilter, filterDot } = domElements;
    if (!filterDot) return;

    let activeFilterCount = 0;

    // Filter aktif jika VALUE-nya tidak kosong ("")
    if (wilayahFilter.value !== '' && wilayahFilter.value !== null) {
        activeFilterCount++;
    }
    if (rwFilter.value !== '' && rwFilter.value !== null && !rwFilter.disabled) {
        activeFilterCount++;
    }
    if (rtFilter.value !== '' && rtFilter.value !== null && !rtFilter.disabled) {
        activeFilterCount++;
    }

    if (activeFilterCount > 0) {
        filterDot.textContent = activeFilterCount;
        filterDot.style.display = 'block';
    } else {
        filterDot.textContent = '';
        filterDot.style.display = 'none';
    }
}


// ====================================================================
// FUNGSI FILTER POPUP
// ====================================================================
function toggleFilterVisibility() {
    if (domElements.filterModal) {
        captureCurrentFilterState(); 
        domElements.filterModal.style.display = 'block';
    }
}

function closeFilterPopup(applied = false) {
    if (domElements.filterModal) {
        domElements.filterModal.style.display = 'none';
        if (!applied) { 
            restoreFilterState();
        }
    }
    updateFilterSummaryVisibility();
}

function areFiltersSet() {
    const { wilayahFilter, rwFilter, rtFilter } = domElements;
    
    // Filter dianggap SET (aktif) jika value-nya tidak kosong ("").
    const isWilayahSet = wilayahFilter && wilayahFilter.value !== '';
    const isRWSet = rwFilter && rwFilter.value !== '';
    const isRTSet = rtFilter && rtFilter.value !== '';
    
    return isWilayahSet || isRWSet || isRTSet;
}

function updateResetButtonVisibility() {
    const { resetButton } = domElements;
    if (!resetButton) return;

    // Tombol reset hanya visible jika ada filter aktif DAN card Daftar Penerima terbuka.
    const tableContent = document.getElementById('table-card-content');
    const isTableContentVisible = tableContent && !tableContent.classList.contains('hidden');

    if (areFiltersSet() && isTableContentVisible) {
        resetButton.style.display = 'inline-flex'; 
    } else {
        resetButton.style.display = 'none';
    }
}

function generateFilterSummary() {
    const selectedWilayah = domElements.wilayahFilter.value;
    const selectedRW = domElements.rwFilter.value;
    const selectedRT = domElements.rtFilter.value;
    
    const filters = [];
    
    // Filter aktif jika value-nya tidak kosong ("")
    if (selectedWilayah && selectedWilayah !== "") { 
        const label = getTranslation('filter_wilayah_label');
        filters.push(`${label}: <strong>${selectedWilayah}</strong>`);
    }
    if (selectedRW && selectedRW !== "") { 
        const label = getTranslation('filter_rw_label_short');
        filters.push(`${label}: <strong>${selectedRW}</strong>`);
    }
    if (selectedRT && selectedRT !== "") { 
        const label = getTranslation('filter_rt_label_short');
        filters.push(`${label}: <strong>${selectedRT}</strong>`);
    }
    
    if (filters.length > 0) { 
        // [TRANSLATE] Template untuk filter aktif
        return getTranslation('filter_summary_active', filters.join(' | '));
    } else {
        // [TRANSLATE] Template untuk tidak ada filter aktif
        return getTranslation('filter_summary_none');
    }
}

function updateFilterSummaryVisibility() {
    const { filterSummary } = domElements;
    if (!filterSummary) return;

    const filterIsSet = areFiltersSet(); 
    filterSummary.innerHTML = generateFilterSummary(); 

    if (filterIsSet) {
        filterSummary.classList.add('active');
    } else {
        filterSummary.classList.remove('active');
    }
}

// ====================================================================
// LOGIKA EXCEL & DATA FILTERING UTAMA
// ====================================================================

function fillSelect(selectElement, options, defaultText) {
    const currentValue = selectElement.value;
    
    // Value untuk opsi default adalah KOSONG ("")
    selectElement.innerHTML = `<option value="">-- ${defaultText} --</option>`;
    
    Array.from(options).sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return String(a).localeCompare(String(b)); 
    }).forEach(value => {
        // Value untuk opsi data adalah nilai data (misalnya '01', '02', 'Budi')
        selectElement.innerHTML += `<option value="${value}">${value}</option>`;
    });
    
    // Pertahankan nilai saat ini jika masih ada dalam opsi atau kosong
    if (options.has(currentValue) || currentValue === "") selectElement.value = currentValue;
    else selectElement.value = ""; // Reset jika nilai sebelumnya tidak valid
}

function populateFilters(data) {
    if (!data || data.length === 0) return;
    const wilayahs = new Set();
    data.forEach(item => { if (item.WILAYAH) wilayahs.add(String(item.WILAYAH)); });
    
    // --- PERBAIKAN: Panggil getTranslation langsung di sini ---
    const defaultAllWilayahText = getTranslation('filter_default_all_wilayah'); 
    fillSelect(domElements.wilayahFilter, wilayahs, defaultAllWilayahText);
    
    updateDependentFilters('WILAYAH');
    domElements.searchInput.value = '';
}

function updateDependentFilters(changedLevel, resetLowerValue = true) {
    const selectedWilayah = domElements.wilayahFilter.value;
    const selectedRW = domElements.rwFilter.value;
    
    let dataByWilayah = beneficiariesData.filter(item => {
        const itemWilayah = String(item.WILAYAH || '');
        // Filter hanya jika selectedWilayah terisi (value != "")
        return !selectedWilayah || itemWilayah === selectedWilayah;
    });

    // --- Ambil terjemahan saat fungsi ini dijalankan ---
    const selectRWFirst = getTranslation('filter_select_rw_first');
    const selectWilayahFirst = getTranslation('filter_select_wilayah_first');

    if (changedLevel === 'WILAYAH') {
        if (resetLowerValue) { 
            domElements.rwFilter.value = "";
            domElements.rtFilter.value = "";
        }
        
        // [TRANSLATE] Logika Wilayah/RW
        if (selectedWilayah) { // Jika selectedWilayah.value TIDAK kosong ("")
            domElements.rwFilter.disabled = false;
            const rws = new Set();
            dataByWilayah.forEach(item => { if (item.RW) rws.add(String(item.RW)); });
            
            // SEMUA RW di [Wilayah]
            const defaultText = getTranslation('filter_dropdown_all_in_wilayah', selectedWilayah); 
            fillSelect(domElements.rwFilter, rws, defaultText);
            
            domElements.rtFilter.disabled = true;
            fillSelect(domElements.rtFilter, new Set(), selectRWFirst); // Pilih RW dulu
        } else { // Jika selectedWilayah.value KOSONG ("")
            domElements.rwFilter.disabled = true;
            domElements.rtFilter.disabled = true;
            fillSelect(domElements.rwFilter, new Set(), selectWilayahFirst); // Pilih Wilayah dulu
            fillSelect(domElements.rtFilter, new Set(), selectRWFirst); // Pilih RW dulu
        }
    }
    
    // Logika RW ke RT
    if (changedLevel === 'RW' && selectedWilayah) { // Hanya proses jika Wilayah sudah terpilih (value != "")
        if (resetLowerValue) { 
            domElements.rtFilter.value = "";
        }
        
        // [TRANSLATE] Logika RW/RT
        if (selectedRW) { // Jika selectedRW.value TIDAK kosong ("")
            let dataByRW = dataByWilayah.filter(item => {
                const itemRW = String(item.RW || '');
                return itemRW === selectedRW;
            });
            domElements.rtFilter.disabled = false;
            const rts = new Set();
            dataByRW.forEach(item => { if (item.RT) rts.add(String(item.RT)); });
            
            // SEMUA RT di RW [RW]
            const defaultText = getTranslation('filter_dropdown_all_in_rw', selectedRW); 
            fillSelect(domElements.rtFilter, rts, defaultText);
        } else { // Jika selectedRW.value KOSONG ("")
            domElements.rtFilter.disabled = true;
            fillSelect(domElements.rtFilter, new Set(), selectRWFirst); // Pilih RW dulu
        }
    }
}

function filterData() {
    // setSearchFeedback (asumsi dari data_visual.js)
    if (typeof setSearchFeedback === 'function') {
        setSearchFeedback('', ''); 
    }
    
    const selectedWilayah = domElements.wilayahFilter.value;
    const selectedRT = domElements.rtFilter.value;
    const selectedRW = domElements.rwFilter.value;
    domElements.searchInput.value = ''; // Reset search input saat filter wilayah diterapkan

    filteredData = beneficiariesData.filter(item => {
        const itemWilayah = String(item.WILAYAH || '');
        const itemRT = String(item.RT || '');
        const itemRW = String(item.RW || '');
        
        // Cek Filter: Cocok jika selectedXXX kosong ("") (berarti "ALL") atau nilai item sama dengan filter
        const wilayahMatch = !selectedWilayah || itemWilayah === selectedWilayah;
        const rwMatch = !selectedRW || itemRW === selectedRW;
        const rtMatch = !selectedRT || itemRT === selectedRT;
        
        return wilayahMatch && rwMatch && rtMatch;
    });

    currentPage = 1; 
    // displayDataTable (asumsi dari data_visual.js)
    if (typeof displayDataTable === 'function') {
        displayDataTable(filteredData); 
    }
    
    updateFilterSummaryVisibility(); 
    updateResetButtonVisibility();
    updateFilterDot(); 
    // Tutup filter modal setelah data ditampilkan
    closeFilterPopup(true); 
}

function searchTable() {
    // setSearchFeedback (asumsi dari data_visual.js)
    if (typeof setSearchFeedback === 'function') {
        setSearchFeedback('', ''); 
    }
    
    const searchTerm = domElements.searchInput.value.toLowerCase().trim();
    currentPage = 1; 

    if (beneficiariesData.length === 0) {
        // [TRANSLATE] Pesan error jika data kosong
        if (typeof setSearchFeedback === 'function') {
            setSearchFeedback('search_error_no_excel', 'error');
        }
        return;
    }

    if (searchTerm === '') {
        // Jika input search kosong, kembali menampilkan filteredData (data hasil filter wilayah)
        // displayDataTable (asumsi dari data_visual.js)
        if (typeof displayDataTable === 'function') {
            displayDataTable(filteredData);
        }
        return;
    }

    // Cari di dalam data yang SUDAH DIFILTER OLEH WILAYAH (filteredData)
    const searchResults = filteredData.filter(item => 
        (item.NAMA && String(item.NAMA).toLowerCase().includes(searchTerm)) 
    );
    
    if (searchResults.length === 0) {
        // [TRANSLATE] Pesan error jika nama tidak ditemukan
        if (typeof setSearchFeedback === 'function') {
            setSearchFeedback('search_error_not_found', 'error', searchTerm);
        }
        // displayDataTable (asumsi dari data_visual.js)
        if (typeof displayDataTable === 'function') {
            displayDataTable([]); 
        }
    } else {
        // displayDataTable (asumsi dari data_visual.js)
        if (typeof displayDataTable === 'function') {
            displayDataTable(searchResults);
        }
    }
    updateResetButtonVisibility(); 
}

function liveSearchNIK() {
    const value = domElements.searchInput.value.toLowerCase().trim();
    // setSearchFeedback (asumsi dari data_visual.js)
    if (typeof setSearchFeedback === 'function') {
        setSearchFeedback('', '');
    }
    
    const dataToSearch = filteredData; 
    
    if (value === "") {
        // Jika search kosong, tampilkan data hasil filter wilayah
        // displayDataTable (asumsi dari data_visual.js)
        if (typeof displayDataTable === 'function') {
            displayDataTable(filteredData);
        }
        updateResetButtonVisibility();
        updateFilterSummaryVisibility();
        return;
    }
    
    // Hasil pencarian berdasarkan nama di dalam data yang sudah difilter
    const results = dataToSearch.filter(item => 
        item.NAMA && String(item.NAMA).toLowerCase().includes(value)
    );
    
    currentPage = 1;
    // displayDataTable (asumsi dari data_visual.js)
    if (typeof displayDataTable === 'function') {
        displayDataTable(results);
    }
    updateResetButtonVisibility();
    updateFilterSummaryVisibility();
}

function resetFilters() {
    domElements.wilayahFilter.value = "";
    domElements.rwFilter.value = "";
    domElements.rtFilter.value = "";
    domElements.searchInput.value = "";
    
    updateDependentFilters('WILAYAH'); // Reset filter RW/RT ke kondisi awal
    filterData(); // Jalankan filter dengan kriteria kosong (menampilkan semua data asli)
    updateResetButtonVisibility(); 
    updateFilterDot(); 
}
// ====================================================================
// FUNGSI KHUSUS TERJEMAHAN (REBUILD DROPDOWN)
// ====================================================================
function rebuildFilterDropdowns() {
    if (!domElements || !domElements.wilayahFilter) return;

    // 1. Simpan nilai yang sedang dipilih
    const currentWilayah = domElements.wilayahFilter.value;
    const currentRW = domElements.rwFilter.value;
    const currentRT = domElements.rtFilter.value;

    // 2. Update Opsi Default Wilayah ("-- SEMUA WILAYAH --")
    if (domElements.wilayahFilter.options.length > 0) {
        const defaultText = getTranslation('filter_default_all_wilayah'); 
        domElements.wilayahFilter.options[0].text = `-- ${defaultText} --`;
    }

    // 3. Refresh Dropdown Dependen
    // Parameter 'false' memastikan kita TIDAK mereset value menjadi kosong
    updateDependentFilters('WILAYAH', false); 
    
    if (currentWilayah) {
        updateDependentFilters('RW', false);
    }

    // 4. Pastikan nilai kembali terpilih (jika masih valid)
    domElements.wilayahFilter.value = currentWilayah;
    
    // Cek apakah opsi masih ada sebelum set value
    if ([...domElements.rwFilter.options].some(o => o.value === currentRW)) {
        domElements.rwFilter.value = currentRW;
    }
    if ([...domElements.rtFilter.options].some(o => o.value === currentRT)) {
        domElements.rtFilter.value = currentRT;
    }

    // 5. Update teks ringkasan filter
    updateFilterSummaryVisibility();
}