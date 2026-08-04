const translations = {
    'id': {
        
        // --- KUNCI STATIS (dari index.html) ---
        'preloader_text': 'Selamat Datang...',
        'header_subtitle': '<strong>Na</strong>vigasi & <strong>S</strong>istem <strong>I</strong>nformasi <strong>Ba</strong>ntuan <strong>Ra</strong>kyat Mi<strong>s</strong>kin',
        'nav_upload_file': 'Upload File',
        'nav_recipient_list': 'Daftar Penerima',
        'menu_guide_text': 'Panduan',
        'menu_about_text': 'Tentang',
        'upload_instruction': 'Drag & Drop file <strong>(.xlsx)</strong> di sini atau klik tombol di bawah.',
        'select_excel_file': 'Pilih File Excel',
        'no_format_q': 'Belum punya format data?',
        'download_template_text': 'Unduh Template (.xlsx)',
        'search_placeholder': 'Masukkan nama penerima untuk mencari...', 
        'filter_btn_text': 'Filter Wilayah',
        'filter_all_option': 'Semua Pilihan',
        'reset_btn_text': 'Reset',
        'empty_table_title': 'Mohon unggah file Excel terlebih dahulu untuk melihat data.',
        'page_prev_text': 'Sebelumnya',
        'page_next_text': 'Selanjutnya',
        'menu_lang_text': 'Bahasa',

        // --- TERJEMAHAN LIVE DATE & TIME BARU ---
        'datetime_separator': '|', // Pemisah antara tanggal dan waktu
        
        // Modal Download
        'modal_close_title': 'Tutup',
        'modal_cancel_btn': 'Batal',
        'modal_confirm_btn': 'Lanjutkan Unduh',
        'download_modal_text': 'Pastikan Anda menggunakan template ini dengan format data yang benar untuk menghindari error saat unggah.',
        
        // Modal Navigasi
        'navigation_cancel': 'Tidak',
        'navigation_confirm': 'Ya, Navigasi',
        
        // Tooltip
        'tooltip_expand_menu': 'luaskan menu',
        'tooltip_menu_collapse': 'kecilkan menu', 
        'tooltip_theme_dark': 'Ganti mode gelap', 
        'tooltip_theme_light': 'Ganti mode terang', 
        'tooltip_upload_file': 'upload file',
        'tooltip_download_template': 'download template',
        
        // Modal About, Filter, Panduan
        'about_modal_title': 'Tentang NASI-BARAS',
        'filter_modal_title_text': 'Filter Wilayah', 
        'filter_instruction': 'Silakan pilih wilayah:',
        'filter_region_label': 'Wilayah / Kelurahan',
        'filter_rw_label': 'Rukun Warga (RW)',
        'filter_rt_label': 'Rukun Tetangga (RT)',
        'filter_all_option': '-- SEMUA --',
        'filter_apply_btn': 'Tampilkan Data',
        'panduan_modal_title_text': 'Panduan Penggunaan NASI-BARAS', 
        'panduan_prev_text': 'Sebelumnya',
        'panduan_next_text': 'Selanjutnya',
        'biodata_name_header': 'Nama Penerima',
        'biodata_nik_header': 'NIK/No. ID',
        'footer_text': '&copy; 2025 NASI-BARAS dikelola oleh Ya!Pao.',
        
        // Konten Modal About
        'about_app_goal_title': 'Tujuan Aplikasi',
        'about_app_goal_text': 'NASI-BARAS (Navigasi & Sistem Informasi Bantuan Rakyat Miskin) adalah sistem manajemen data yang dirancang untuk mempermudah instansi atau lembaga dalam mengelola, memfilter, dan memvalidasi data penerima bantuan sosial. Sistem ini bertujuan meningkatkan efisiensi penyaluran dan akurasi target bantuan.',
        'about_features_title': 'Fitur Utama',
        'about_feature_1': 'Integrasi data cepat melalui *upload* file **Excel (.xlsx)**.',
        'about_feature_2': 'Pencarian dan pemfilteran data penerima berdasarkan wilayah (RT/RW/Kelurahan).',
        'about_feature_3': 'Fitur navigasi berbasis lokasi (asumsi data koordinat tersedia) untuk verifikasi lapangan.',
        'about_tech_title': 'Informasi Teknis',
        'about_tech_text': 'Aplikasi ini dikembangkan menggunakan teknologi *frontend* murni **HTML5, CSS3, dan JavaScript (Vanilla JS)** untuk memastikan kecepatan akses dan kemudahan implementasi tanpa ketergantungan *server* yang kompleks.',
        'about_version_label': 'Versi:',
        'about_developer_label': 'Pengembang:',
        'about_contact_label': 'Kontak:',
        'about_disclaimer_text': 'Data yang diolah dalam sistem ini sepenuhnya menjadi tanggung jawab pengguna.',
        
        // Konten Modal Panduan
        'panduan_step_1_text': 'Langkah 1.1 - Unggah Data: Gunakan tombol \'Pilih File Excel\' atau area Drag & Drop untuk mengunggah file data (.xlsx). Tombol \'Unduh Template\' tersedia jika Anda membutuhkan format data standar.',
        'panduan_step_2_text': 'Langkah 2.1 - Pencarian & Tabel: Masukkan nama penerima di kolom pencarian dan klik ikon kaca pembesar ( ) untuk mencari. Navigasi halaman menggunakan tombol panah di bawah tabel.',
        'panduan_step_3_text': 'Langkah 2.2 - Buka Filter: Klik tombol \'Filter Wilayah\'. Pilih kriteria (Wilayah/RW/RT) dari dropdown lalu klik \'Tampilkan Data\'.',
        'panduan_step_4_text': 'Langkah 2.3 - Status Filter: Ringkasan filter yang diterapkan akan muncul di atas kolom pencarian. Klik tombol \'Reset\' (merah) untuk menghapus semua filter.',
        'panduan_step_5_text': 'Langkah 3.1 - Buka Biodata: Klik nama penerima pada tabel untuk menampilkan Modal Biodata. Tinjau Jenis Bantuan dan Alamat Lengkap.',
        'panduan_step_6_text': 'Langkah 3.2 - Navigasi: Klik tombol \'Navigasi\' di Modal Biodata. Kemudian konfirmasi \'Ya, Navigasi\' untuk membuka aplikasi peta menuju lokasi.',

        // --- KUNCI DINAMIS DARI DATA VISUAL & UMUM ---
        // Status Unggah File (setFileStatus & loadExcel)
        'file_status_idle': 'Belum ada file dipilih.', 
        'file_status_processing': 'File: %s - Sedang diproses...', 
        'file_status_loaded': 'File: %s (%d data dimuat).', 
        'file_error_empty_sheet': 'File dimuat, namun tidak ada data ditemukan di sheet pertama.',
        'file_error_missing_headers': 'Gagal memproses, Pastikan File Sesuai Template (Unduh di bawah). Kolom yang hilang: %s.', 
        'file_error_parsing': 'Gagal memproses file Excel. Pastikan format file benar (xlsx/xls).',
        'file_error_wrong_type': 'Tipe file tidak didukung. Mohon unggah file Excel (.xlsx).', 
        
        // Pesan Tabel & UI
        'table_error_empty_file_ui': 'Tidak ada data ditemukan dalam file Excel.',
        'table_error_wrong_format_ui': 'Format template tidak sesuai. Pastikan Anda menggunakan file template yang benar.',
        'table_error_no_criteria_ui': 'Tidak ada data ditemukan untuk kriteria yang anda pilih.',
        
        // Pesan Validasi Operasi
        'operation_error_no_data': 'Mohon muat data penerima (Excel) terlebih dahulu untuk melanjutkan operasi ini.', 
        
        // Header Tabel
        'table_header_no': 'No.',
        'table_header_name': 'Nama',
        'table_header_address': 'Alamat',
        'table_header_assistance': 'Jenis Bantuan',
        'table_header_status': 'Status',
        'table_header_region': 'Wilayah',
        'table_header_rt': 'RT',
        'table_header_rw': 'RW',

        // Paginasi
        'data_count_zero': '0 Data', 
        'data_count_range_text': 'Menampilkan %d - %d dari %d data', 
        'page_info_format_dynamic': 'Halaman %d dari %d', 
        
        // Pencarian
        'search_validation_error': 'Pencarian harus menggunakan minimal 3 karakter.',
        'search_feedback_found': 'Ditemukan <strong>%d</strong> penerima yang cocok.',
        'search_feedback_not_found': 'Tidak ada penerima dengan nama <strong>%s</strong> ditemukan.',
        
        // Modal Navigasi Dinamis
        'navigation_modal_text_dynamic': 'Apakah Anda ingin melihat lokasi rumah <strong>%s</strong>?',
        'navigation_modal_default_text': 'Apakah Anda ingin melihat lokasi rumah penerima bantuan?',
        
        // Modal Panduan Dinamis
        'page_info_format_panduan': '%d / %d', 
        // panduan section title---
        'panduan_section_title_1': '1. Muat Data Excel <i class="fas fa-upload"></i>',
        'panduan_step_1_text': '<strong>Langkah 1.1 - Unggah Data:</strong> Gunakan tombol <strong>\'Pilih File Excel\'</strong> atau area Drag & Drop untuk mengunggah file data (.xlsx). Tombol <strong>\'Unduh Template\'</strong> tersedia jika Anda membutuhkan format data standar.',
        
        'panduan_section_title_2': '2. Mencari & Menampilkan Data <i class="fas fa-search"></i>',
        'panduan_step_2_text': '<strong>Langkah 2.1 - Pencarian & Tabel:</strong> Masukkan nama penerima di kolom pencarian dan klik ikon kaca pembesar (<i class="fas fa-search"></i>) untuk mencari. Navigasi halaman menggunakan tombol panah di bawah tabel.',
        
        'panduan_section_title_2_2': '2.2 Filter Wilayah',
        'panduan_step_3_text': '<strong>Langkah 2.2 - Buka Filter:</strong> Klik tombol <strong>\'Filter Wilayah\'</strong>. Pilih kriteria (Wilayah/RW/RT) dari <strong>dropdown</strong> lalu klik <strong>\'Tampilkan Data\'</strong>.',
        
        'panduan_section_title_2_3': '<i class="fas fa-tag"></i> 2.3 Hasil Filter Aktif',
        'panduan_step_4_text': '<strong>Langkah 2.3 - Status Filter:</strong> Ringkasan filter yang diterapkan akan muncul di atas kolom pencarian. Klik tombol <strong>\'Reset\'</strong> (merah) untuk menghapus semua filter.',
        
        'panduan_section_title_3': '3. Melihat Detail Biodata <i class="fas fa-user-circle"></i>',
        'panduan_step_5_text': '<strong>Langkah 3.1 - Buka Biodata:</strong> Klik nama penerima pada tabel untuk menampilkan Modal Biodata. Tinjau Jenis Bantuan dan Alamat Lengkap.',
        
        'panduan_section_title_3_1': '3.1 Navigasi ke Lokasi',
        'panduan_step_6_text': '<strong>Langkah 3.2 - Navigasi:</strong> Klik tombol <strong>\'Navigasi\'</strong> di Modal Biodata. Kemudian konfirmasi <strong>\'Ya, Navigasi\'</strong> untuk membuka aplikasi peta menuju lokasi.',

        // Label Modal Biodata
        'biodata_name_unavailable': 'Nama Tidak Tersedia',
        'biodata_id_unavailable': 'No. ID Tidak Tersedia',
        'biodata_nik_label': 'NIK',
        'biodata_no_urut_label': 'No. Urut',
        'biodata_address_unavailable': 'Alamat Tidak Tersedia',
        'biodata_label_assistance': 'Jenis Bantuan:',
        'biodata_label_address': 'Alamat Lengkap:',
        'biodata_label_rw': 'RW:',
        'biodata_label_rt': 'RT:',
        'biodata_label_area': 'Area Lokasi',
        'biodata_rt_label': 'RT',
        'biodata_rw_label': 'RW',
        'biodata_label_status': 'Status Data:',
        'biodata_label_region': 'Wilayah:',
        'biodata_label_notes': 'Keterangan:',
        'biodata_btn_navigate': 'Navigasi',
        'biodata_gps_warning': 'Data lokasi GPS belum tersedia.',
        'biodata_btn_navigate_tooltip_ready': 'Klik untuk navigasi ke alamat penerima',
        'biodata_btn_navigate_tooltip_missing': 'Koordinat (Latitude/Longitude) tidak tersedia',

        // --- KUNCI BARU DARI LOGIKA FILTER (digunakan oleh filter.js) ---
        'filter_wilayah_label': 'Wilayah',
        'filter_rw_label_short': 'RW',
        'filter_rt_label_short': 'RT',
        'filter_summary_active': '<i class="fas fa-sliders"></i> Filter Aktif: %s',
        'filter_summary_none': '<i class="fas fa-check-circle"></i> Tidak ada filter wilayah aktif.',
        // Nilai Konstanta Default Filter (Digunakan untuk cek nilai)
        'filter_default_all_wilayah': 'SEMUA WILAYAH',
        'filter_default_all_rw': 'SEMUA RW',
        'filter_default_all_rt': 'SEMUA RT',
        // Teks Opsi Dropdown Dinamis
        'filter_select_rw_first': 'Pilih RW dulu',
        'filter_select_wilayah_first': 'Pilih Wilayah dulu',
        'filter_dropdown_all_in_wilayah': 'SEMUA RW di %s',
        'filter_dropdown_all_in_rw': 'SEMUA RT di RW %s',
        // Pesan Pencarian dari filter.js
        'search_error_no_excel': 'Silakan muat data Excel terlebih dahulu.',
        'search_error_not_found': '⚠️ Nama "%s" tidak ditemukan di data saat ini.',
        'language_modal_title': 'Pilih Bahasa',

        'data_keywords': {
            'aktif': 'Aktif',
            'dalam proses': 'Dalam Proses',
            'pending': 'Dalam Proses', // Menangani data mentah 'pending'
            'tidak aktif': 'Tidak Aktif',
            'nonaktif': 'Tidak Aktif', // Menangani data mentah 'nonaktif'
            'laki-laki': 'Laki-laki',
            'perempuan': 'Perempuan',
            // Tambahkan keyword data lain di sini jika ada
        }
    },

    'en': {
        // --- KUNCI STATIS (dari index.html) ---
        'preloader_text': 'Welcome...',
        'header_subtitle': '<strong>Na</strong>vigation & <strong>I</strong>nformation <strong>S</strong>ystem for <strong>Ba</strong>sic <strong>R</strong>elief <strong>A</strong>ssistanc<strong>e</strong> (Poor People)',
        'nav_upload_file': 'Upload File',
        'nav_recipient_list': 'Recipient List',
        'menu_guide_text': 'Guide',
        'menu_about_text': 'About',
        'upload_instruction': 'Drag & Drop your <strong>(.xlsx)</strong> file here or click the button below.',
        'select_excel_file': 'Select Excel File',
        'no_format_q': 'Don\'t have the data format?',
        'download_template_text': 'Download Template (.xlsx)',
        'search_placeholder': 'Enter recipient name to search...', 
        'filter_btn_text': 'Area Filter',
        'filter_all_option': 'All Options',
        'reset_btn_text': 'Reset',
        'empty_table_title': 'Please upload an Excel file first to view data.',
        'page_prev_text': 'Previous',
        'page_next_text': 'Next',
        'menu_lang_text': 'Language',

        // --- TERJEMAHAN LIVE DATE & TIME BARU ---
        'datetime_separator': '|', // Separator between date and time
        
        // Modal Download
        'modal_close_title': 'Close',
        'modal_cancel_btn': 'Cancel',
        'modal_confirm_btn': 'Proceed to Download',
        'download_modal_text': 'Ensure you use this template with the correct data format to avoid errors during upload.',
        
        // Modal Navigasi
        'navigation_cancel': 'No',
        'navigation_confirm': 'Yes, Navigate',
        
        // Tooltip
        'tooltip_expand_menu': 'expand menu',
        'tooltip_menu_collapse': 'collapse menu', 
        'tooltip_theme_dark': 'Switch to dark mode', 
        'tooltip_theme_light': 'Switch to light mode', 
        'tooltip_upload_file': 'upload file',
        'tooltip_download_template': 'download template',
        
        // Modal About, Filter, Panduan
        'about_modal_title': 'About NASI-BARAS',
        'filter_modal_title_text': 'Area Filter',
        'filter_instruction': 'Please select the area:',
        'filter_region_label': 'Area / Sub-district',
        'filter_rw_label': 'Community Unit (RW)',
        'filter_rt_label': 'Neighborhood Unit (RT)',
        'filter_all_option': '-- ALL --',
        'filter_apply_btn': 'Show Data',
        'panduan_modal_title_text': 'NASI-BARAS Usage Guide',
        'panduan_prev_text': 'Previous',
        'panduan_next_text': 'Next',
        'biodata_name_header': 'Recipient Name',
        'biodata_nik_header': 'NIK/ID No.',
        'footer_text': '&copy; 2025 NASI-BARAS managed by Ya!Pao.',

        // Konten Modal About
        'about_app_goal_title': 'Application Goal',
        'about_app_goal_text': 'NASI-BARAS (Navigation & Information System for Basic Relief Assistance) is a data management system designed to simplify the process for institutions or agencies to manage, filter, and validate social assistance recipient data. The system aims to increase the efficiency of distribution and accuracy of assistance targeting.',
        'about_features_title': 'Key Features',
        'about_feature_1': 'Fast data integration via **Excel (.xlsx)** file upload.',
        'about_feature_2': 'Searching and filtering recipient data by area (RT/RW/Sub-district).',
        'about_feature_3': 'Location-based navigation feature (assuming coordinate data is available) for field verification.',
        'about_tech_title': 'Technical Information',
        'about_tech_text': 'This application is developed using pure *frontend* technology **HTML5, CSS3, and JavaScript (Vanilla JS)** to ensure fast access and easy implementation without complex server dependencies.',
        'about_version_label': 'Version:',
        'about_developer_label': 'Developer:',
        'about_contact_label': 'Contact:',
        'about_disclaimer_text': 'The data processed in this system is entirely the responsibility of the user.',
        
        // Konten Modal Panduan
        'panduan_step_1_text': 'Step 1.1 - Upload Data: Use the \'Select Excel File\' button or the Drag & Drop area to upload the data file (.xlsx). The \'Download Template\' button is available if you need the standard data format.',
        'panduan_step_2_text': 'Step 2.1 - Search & Table: Enter the recipient\'s name in the search column and click the magnifying glass icon ( ) to search. Navigate pages using the arrow buttons below the table.',
        'panduan_step_3_text': 'Step 2.2 - Open Filter: Click the \'Area Filter\' button. Select criteria (Area/RW/RT) from the dropdown then click \'Show Data\'.',
        'panduan_step_4_text': 'Step 2.3 - Filter Status: A summary of applied filters will appear above the search column. Click the \'Reset\' (red) button to clear all filters.',
        'panduan_step_5_text': 'Step 3.1 - Open Biodata: Click the recipient\'s name in the table to display the Biodata Modal. Review the Assistance Type and Complete Address.',
        'panduan_step_6_text': 'Step 3.2 - Navigation: Click the \'Navigate\' button in the Biodata Modal. Then confirm \'Yes, Navigate\' to open the map application to the location.',

        // --- KUNCI DINAMIS DARI DATA VISUAL & UMUM ---
        // Status Unggah File
        'file_status_idle': 'No file selected yet.',
        'file_status_processing': 'File: %s - Processing...',
        'file_status_loaded': 'File: %s (%d data loaded).',
        'file_error_empty_sheet': 'File loaded, but no data found in the first sheet.',
        'file_error_missing_headers': 'Failed to process, Ensure File Matches Template (Download below). Missing columns: %s.',
        'file_error_parsing': 'Failed to process Excel file. Ensure file format is correct (xlsx/xls).',
        'file_error_wrong_type': 'File type not supported. Please upload an Excel file (.xlsx).', 
        
        // Pesan Tabel & UI
        'table_error_empty_file_ui': 'No data found in the Excel file.',
        'table_error_wrong_format_ui': 'Template format is incorrect. Ensure you are using the correct template file.',
        'table_error_no_criteria_ui': 'No data found for the criteria you selected.',
        
        // Pesan Validasi Operasi
        'operation_error_no_data': 'Please load recipient data (Excel) first to proceed with this operation.', 
        
        // Header Tabel
        'table_header_no': 'No.',
        'table_header_name': 'Name',
        'table_header_address': 'Address',
        'table_header_assistance': 'Assistance Type',
        'table_header_status': 'Status',
        'table_header_region': 'Region',
        'table_header_rt': 'RT',
        'table_header_rw': 'RW',

        // Paginasi
        'data_count_zero': '0 Data',
        'data_count_range_text': 'Displaying %d - %d of %d data',
        'page_info_format_dynamic': 'Page %d of %d',

        // Pencarian
        'search_validation_error': 'Search must use a minimum of 3 characters.',
        'search_feedback_found': 'Found <strong>%d</strong> matching recipients.',
        'search_feedback_not_found': 'No recipients named <strong>%s</strong> found.',
        
        // Modal Navigasi Dinamis
        'navigation_modal_text_dynamic': 'Would you like to view the location of <strong>%s</strong>\'s house?',
        'navigation_modal_default_text': 'Would you like to view the location of the aid recipient\'s house?',
        
        // Modal Panduan Dinamis
        'page_info_format_panduan': '%d / %d', 
        'panduan_section_title_1': '1. Load Excel Data <i class="fas fa-upload"></i>',
        'panduan_step_1_text': '<strong>Step 1.1 - Upload Data:</strong> Use the <strong>\'Select Excel File\'</strong> button or the Drag & Drop area to upload the data file (.xlsx). The <strong>\'Download Template\'</strong> button is available if you need the standard data format.',
        
        'panduan_section_title_2': '2. Searching & Displaying Data <i class="fas fa-search"></i>',
        'panduan_step_2_text': '<strong>Step 2.1 - Search & Table:</strong> Enter the recipient\'s name in the search column and click the magnifying glass icon (<i class="fas fa-search"></i>) to search. Navigate pages using the arrow buttons below the table.',
        
        'panduan_section_title_2_2': '2.2 Region Filter',
        'panduan_step_3_text': '<strong>Step 2.2 - Open Filter:</strong> Click the <strong>\'Region Filter\'</strong> button. Select criteria (Region/RW/RT) from the <strong>dropdown</strong> then click <strong>\'Show Data\'</strong>.',
        
        'panduan_section_title_2_3': '<i class="fas fa-tag"></i> 2.3 Active Filter Result',
        'panduan_step_4_text': '<strong>Step 2.3 - Filter Status:</strong> A summary of the applied filters will appear above the search column. Click the <strong>\'Reset\'</strong> button (red) to clear all filters.',
        
        'panduan_section_title_3': '3. Viewing Biodata Details <i class="fas fa-user-circle"></i>',
        'panduan_step_5_text': '<strong>Step 3.1 - Open Biodata:</strong> Click the recipient\'s name in the table to display the Biodata Modal. Review the Type of Aid and Full Address.',
        
        'panduan_section_title_3_1': '3.1 Navigation to Location',
        'panduan_step_6_text': '<strong>Step 3.2 - Navigation:</strong> Click the <strong>\'Navigate\'</strong> button in the Biodata Modal. Then confirm <strong>\'Yes, Navigate\'</strong> to open the map application to the location.',

        // Label Modal Biodata
        'biodata_name_unavailable': 'Name Not Available',
        'biodata_id_unavailable': 'ID No. Not Available',
        'biodata_nik_label': 'NIK',
        'biodata_no_urut_label': 'Sequence No.',
        'biodata_address_unavailable': 'Address Not Available',
        'biodata_label_assistance': 'Assistance Type:',
        'biodata_label_address': 'Full Address:',
        'biodata_label_rw': 'RW:',
        'biodata_label_rt': 'RT:',
        'biodata_label_area': 'Area Location',
        'biodata_rt_label': 'RT',
        'biodata_rw_label': 'RW',
        'biodata_label_status': 'Data Status:',
        'biodata_label_region': 'Region:',
        'biodata_label_notes': 'Notes:',
        'biodata_btn_navigate': 'Navigate',
        'biodata_gps_warning': 'GPS location data is not yet available.',
        'biodata_btn_navigate_tooltip_ready': 'Click to navigate to the recipient\'s address',
        'biodata_btn_navigate_tooltip_missing': 'Coordinates (Latitude/Longitude) are missing',

        // --- KUNCI BARU DARI LOGIKA FILTER (digunakan oleh filter.js) ---
        'filter_wilayah_label': 'Region',
        'filter_rw_label_short': 'RW',
        'filter_rt_label_short': 'RT',
        'filter_summary_active': '<i class="fas fa-sliders"></i> Active Filters: %s',
        'filter_summary_none': '<i class="fas fa-check-circle"></i> No active area filters.',
        // Nilai Konstanta Default Filter (Digunakan untuk cek nilai)
        'filter_default_all_wilayah': 'ALL REGIONS',
        'filter_default_all_rw': 'ALL RW',
        'filter_default_all_rt': 'ALL RT',
        // Teks Opsi Dropdown Dinamis
        'filter_select_rw_first': 'Select RW first',
        'filter_select_wilayah_first': 'Select Region first',
        'filter_dropdown_all_in_wilayah': 'ALL RW in %s',
        'filter_dropdown_all_in_rw': 'ALL RT in RW %s',
        // Pesan Pencarian dari filter.js
        'search_error_no_excel': 'Please load Excel data first.',
        'search_error_not_found': '⚠️ Name "%s" not found in current data.',
        'language_modal_title': 'Select Language',

        'data_keywords': {
            'aktif': 'Active',
            'dalam proses': 'In Process',
            'pending': 'Pending',
            'tidak aktif': 'Inactive',
            'nonaktif': 'Inactive',
            'laki-laki': 'Male',
            'perempuan': 'Female',
            // Tambahkan keyword data lain di sini jika ada
        }
    },

    'fr': {
    // --- KUNCI STATIS (dari index.html) ---
    'preloader_text': 'Bienvenue...',
    'header_subtitle': '<strong>Na</strong>vigation et <strong>S</strong>ystème d\'<strong>I</strong>nformation pour l\'<strong>A</strong>ide <strong>S</strong>ociale de <strong>B</strong>ase',
    'nav_upload_file': 'Télécharger Fichier',
    'nav_recipient_list': 'Liste des Bénéficiaires',
    'menu_guide_text': 'Guide',
    'menu_about_text': 'À Propos',
    'upload_instruction': 'Glissez et déposez votre fichier <strong>(.xlsx)</strong> ici ou cliquez sur le bouton ci-dessous.',
    'select_excel_file': 'Sélectionner Fichier Excel',
    'no_format_q': 'Vous n\'avez pas le format de données ?',
    'download_template_text': 'Télécharger Modèle (.xlsx)',
    'search_placeholder': 'Entrez le nom du bénéficiaire pour rechercher...', 
    'filter_btn_text': 'Filtrer par Zone',
    'filter_all_option': 'Toutes les Options',
    'reset_btn_text': 'Réinitialiser',
    'empty_table_title': 'Veuillez d\'abord télécharger un fichier Excel pour afficher les données.',
    'page_prev_text': 'Précédent',
    'page_next_text': 'Suivant',
    'menu_lang_text': 'Langue',

    'datetime_separator': '|', // Séparateur
    
    // Modal Download
    'modal_close_title': 'Fermer',
    'modal_cancel_btn': 'Annuler',
    'modal_confirm_btn': 'Poursuivre le Téléchargement',
    'download_modal_text': 'Assurez-vous d\'utiliser ce modèle avec le format de données correct pour éviter les erreurs lors du téléchargement.',
    
    // Modal Navigasi
    'navigation_cancel': 'Non',
    'navigation_confirm': 'Oui, Naviguer',
    
    // Tooltip
    'tooltip_expand_menu': 'déployer le menu',
    'tooltip_menu_collapse': 'réduire le menu', 
    'tooltip_theme_dark': 'Passer en mode sombre', 
    'tooltip_theme_light': 'Passer en mode clair', 
    'tooltip_upload_file': 'télécharger fichier',
    'tooltip_download_template': 'télécharger modèle',
    
    // Modal About, Filter, Panduan
    'about_modal_title': 'À Propos de NASI-BARAS',
    'filter_modal_title_text': 'Filtre par Zone', 
    'filter_instruction': 'Veuillez sélectionner la zone :',
    'filter_region_label': 'Zone / Sous-district',
    'filter_rw_label': 'Unité Communautaire (RW)', // Rukun Warga
    'filter_rt_label': 'Unité de Voisinage (RT)', // Rukun Tetangga
    'filter_all_option': '-- TOUT --',
    'filter_apply_btn': 'Afficher les Données',
    'panduan_modal_title_text': 'Guide d\'Utilisation de NASI-BARAS', 
    'panduan_prev_text': 'Précédent',
    'panduan_next_text': 'Suivant',
    'biodata_name_header': 'Nom du Bénéficiaire',
    'biodata_nik_header': 'N° NIK/ID',
    'footer_text': '&copy; 2025 NASI-BARAS géré par Ya!Pao.',
    
    // Konten Modal About
    'about_app_goal_title': 'Objectif de l\'Application',
    'about_app_goal_text': 'NASI-BARAS (Système de Navigation et d\'Information pour l\'Aide Sociale de Base) est un système de gestion de données conçu pour simplifier le processus de gestion, de filtrage et de validation des données des bénéficiaires d\'aide sociale pour les institutions ou agences. Le système vise à augmenter l\'efficacité de la distribution et la précision du ciblage de l\'aide.',
    'about_features_title': 'Fonctionnalités Clés',
    'about_feature_1': 'Intégration rapide des données via le téléchargement de fichier **Excel (.xlsx)**.',
    'about_feature_2': 'Recherche et filtrage des données des bénéficiaires par zone (RT/RW/Sous-district).',
    'about_feature_3': 'Fonctionnalité de navigation basée sur la localisation (en supposant que les données de coordonnées soient disponibles) pour la vérification sur le terrain.',
    'about_tech_title': 'Informations Techniques',
    'about_tech_text': 'Cette application est développée en utilisant la technologie *frontend* pure **HTML5, CSS3 et JavaScript (Vanilla JS)** pour garantir un accès rapide et une mise en œuvre facile sans dépendance à un *serveur* complexe.',
    'about_version_label': 'Version :',
    'about_developer_label': 'Développeur :',
    'about_contact_label': 'Contact :',
    'about_disclaimer_text': 'Les données traitées dans ce système relèvent entièrement de la responsabilité de l\'utilisateur.',
    
    // Konten Modal Panduan
    'panduan_step_1_text': 'Étape 1.1 - Télécharger les Données : Utilisez le bouton \'Sélectionner Fichier Excel\' ou la zone Glisser-Déposer pour télécharger le fichier de données (.xlsx). Le bouton \'Télécharger Modèle\' est disponible si vous avez besoin du format de données standard.',
    'panduan_step_2_text': 'Étape 2.1 - Recherche & Tableau : Entrez le nom du bénéficiaire dans la colonne de recherche et cliquez sur l\'icône loupe ( ) pour rechercher. Naviguez entre les pages en utilisant les boutons fléchés sous le tableau.',
    'panduan_step_3_text': 'Étape 2.2 - Ouvrir le Filtre : Cliquez sur le bouton \'Filtrer par Zone\'. Sélectionnez les critères (Zone/RW/RT) dans la liste déroulante, puis cliquez sur \'Afficher les Données\'.',
    'panduan_step_4_text': 'Étape 2.3 - Statut du Filtre : Un résumé des filtres appliqués apparaîtra au-dessus de la colonne de recherche. Cliquez sur le bouton \'Réinitialiser\' (rouge) pour effacer tous les filtres.',
    'panduan_step_5_text': 'Étape 3.1 - Ouvrir la Biodata : Cliquez sur le nom du bénéficiaire dans le tableau pour afficher le Modal Biodata. Révisez le Type d\'Aide et l\'Adresse Complète.',
    'panduan_step_6_text': 'Étape 3.2 - Navigation : Cliquez sur le bouton \'Naviguer\' dans le Modal Biodata. Confirmez ensuite \'Oui, Naviguer\' pour ouvrir l\'application de carte vers l\'emplacement.',

    // --- KUNCI DINAMIS DARI DATA VISUAL & UMUM ---
    // Status Unggah File (setFileStatus & loadExcel)
    'file_status_idle': 'Aucun fichier sélectionné.', 
    'file_status_processing': 'Fichier : %s - Traitement en cours...', 
    'file_status_loaded': 'Fichier : %s (%d données chargées).', 
    'file_error_empty_sheet': 'Fichier chargé, mais aucune donnée trouvée dans la première feuille.',
    'file_error_missing_headers': 'Échec du traitement, assurez-vous que le fichier correspond au modèle (Télécharger ci-dessous). Colonnes manquantes : %s.', 
    'file_error_parsing': 'Échec du traitement du fichier Excel. Assurez-vous que le format de fichier est correct (xlsx/xls).',
    'file_error_wrong_type': 'Type de fichier non pris en charge. Veuillez télécharger un fichier Excel (.xlsx).', 
    
    // Pesan Tabel & UI
    'table_error_empty_file_ui': 'Aucune donnée trouvée dans le fichier Excel.',
    'table_error_wrong_format_ui': 'Le format du modèle est incorrect. Assurez-vous d\'utiliser le bon fichier modèle.',
    'table_error_no_criteria_ui': 'Aucune donnée trouvée pour les critères que vous avez sélectionnés.',
    
    // Pesan Validasi Operasi
    'operation_error_no_data': 'Veuillez d\'abord charger les données des bénéficiaires (Excel) pour procéder à cette opération.', 
    
    // Header Tabel
    'table_header_no': 'N°',
    'table_header_name': 'Nom',
    'table_header_address': 'Adresse',
    'table_header_assistance': 'Type d\'Aide',
    'table_header_status': 'Statut',
    'table_header_region': 'Zone',
    'table_header_rt': 'RT',
    'table_header_rw': 'RW',

    // Paginasi
    'data_count_zero': '0 Donnée', 
    'data_count_range_text': 'Affichage de %d - %d sur %d données', 
    'page_info_format_dynamic': 'Page %d sur %d', 
    
    // Pencarian
    'search_validation_error': 'La recherche doit utiliser un minimum de 3 caractères.',
    'search_feedback_found': 'Trouvé <strong>%d</strong> bénéficiaires correspondants.',
    'search_feedback_not_found': 'Aucun bénéficiaire nommé <strong>%s</strong> trouvé.',
    
    // Modal Navigasi Dinamis
    'navigation_modal_text_dynamic': 'Souhaitez-vous voir l\'emplacement de la maison de <strong>%s</strong> ?',
    'navigation_modal_default_text': 'Souhaitez-vous voir l\'emplacement de la maison du bénéficiaire de l\'aide ?',
    
    // Modal Panduan Dinamis
    'page_info_format_panduan': '%d / %d', 
    // panduan section title---
    'panduan_section_title_1': '1. Charger les Données Excel <i class="fas fa-upload"></i>',
    'panduan_step_1_text': '<strong>Étape 1.1 - Télécharger les Données :</strong> Utilisez le bouton <strong>\'Sélectionner Fichier Excel\'</strong> ou la zone Glisser-Déposer pour télécharger le fichier de données (.xlsx). Le bouton <strong>\'Télécharger Modèle\'</strong> est disponible si vous avez besoin du format de données standard.',
    
    'panduan_section_title_2': '2. Rechercher & Afficher les Données <i class="fas fa-search"></i>',
    'panduan_step_2_text': '<strong>Étape 2.1 - Recherche & Tableau :</strong> Entrez le nom du bénéficiaire dans la colonne de recherche et cliquez sur l\'icône loupe (<i class="fas fa-search"></i>) pour rechercher. Naviguez entre les pages en utilisant les boutons fléchés sous le tableau.',
    
    'panduan_section_title_2_2': '2.2 Filtre par Zone',
    'panduan_step_3_text': '<strong>Étape 2.2 - Ouvrir le Filtre :</strong> Cliquez sur le bouton <strong>\'Filtrer par Zone\'</strong>. Sélectionnez les critères (Zone/RW/RT) dans la <strong>liste déroulante</strong> puis cliquez sur <strong>\'Afficher les Données\'</strong>.',
    
    'panduan_section_title_2_3': '<i class="fas fa-tag"></i> 2.3 Résultat du Filtre Actif',
    'panduan_step_4_text': '<strong>Étape 2.3 - Statut du Filtre :</strong> Un résumé des filtres appliqués apparaîtra au-dessus de la colonne de recherche. Cliquez sur le bouton <strong>\'Réinitialiser\'</strong> (rouge) pour effacer tous les filtres.',
    
    'panduan_section_title_3': '3. Voir les Détails de la Biodata <i class="fas fa-user-circle"></i>',
    'panduan_step_5_text': '<strong>Étape 3.1 - Ouvrir la Biodata :</strong> Cliquez sur le nom du bénéficiaire dans le tableau pour afficher le Modal Biodata. Révisez le Type d\'Aide et l\'Adresse Complète.',
    
    'panduan_section_title_3_1': '3.1 Navigation vers l\'Emplacement',
    'panduan_step_6_text': '<strong>Étape 3.2 - Navigation :</strong> Cliquez sur le bouton <strong>\'Naviguer\'</strong> dans le Modal Biodata. Confirmez ensuite <strong>\'Oui, Naviguer\'</strong> pour ouvrir l\'application de carte vers l\'emplacement.',

    // Label Modal Biodata
    'biodata_name_unavailable': 'Nom Non Disponible',
    'biodata_id_unavailable': 'N° ID Non Disponible',
    'biodata_nik_label': 'NIK',
    'biodata_no_urut_label': 'N° Séquentiel',
    'biodata_address_unavailable': 'Adresse Non Disponible',
    'biodata_label_assistance': 'Type d\'Aide :',
    'biodata_label_address': 'Adresse Complète :',
    'biodata_label_rw': 'RW :',
    'biodata_label_rt': 'RT :',
    'biodata_label_area': 'Zone de Localisation',
    'biodata_rt_label': 'RT',
    'biodata_rw_label': 'RW',
    'biodata_label_status': 'Statut des Données :',
    'biodata_label_region': 'Zone :',
    'biodata_label_notes': 'Remarques :',
    'biodata_btn_navigate': 'Naviguer',
    'biodata_gps_warning': 'Les données de localisation GPS ne sont pas encore disponibles.',
    'biodata_btn_navigate_tooltip_ready': 'Cliquez pour naviguer vers l\'adresse du bénéficiaire',
    'biodata_btn_navigate_tooltip_missing': 'Coordonnées (Latitude/Longitude) manquantes',

    // --- KUNCI BARU DARI LOGIKA FILTER (digunakan oleh filter.js) ---
    'filter_wilayah_label': 'Zone',
    'filter_rw_label_short': 'RW',
    'filter_rt_label_short': 'RT',
    'filter_summary_active': '<i class="fas fa-sliders"></i> Filtres Actifs : %s',
    'filter_summary_none': '<i class="fas fa-check-circle"></i> Aucun filtre de zone actif.',
    // Nilai Konstanta Default Filter (Digunakan untuk cek nilai)
    'filter_default_all_wilayah': 'TOUTES LES ZONES',
    'filter_default_all_rw': 'TOUS LES RW',
    'filter_default_all_rt': 'TOUS LES RT',
    // Teks Opsi Dropdown Dinamis
    'filter_select_rw_first': 'Sélectionnez d\'abord RW',
    'filter_select_wilayah_first': 'Sélectionnez d\'abord la Zone',
    'filter_dropdown_all_in_wilayah': 'TOUS LES RW dans %s',
    'filter_dropdown_all_in_rw': 'TOUS LES RT dans RW %s',
    // Pesan Pencarian dari filter.js
    'search_error_no_excel': 'Veuillez charger les données Excel d\'abord.',
    'search_error_not_found': '⚠️ Nom "%s" non trouvé dans les données actuelles.',
    'language_modal_title': 'Sélectionner la Langue',

    'data_keywords': {
            'aktif': 'Actif',
            'dalam proses': 'En cours',
            'pending': 'En attente',
            'tidak aktif': 'Inactif',
            'nonaktif': 'Inactif',
            'laki-laki': 'Homme',
            'perempuan': 'Femme',
        }
},

'ar': {
    // --- KUNCI STATIS (dari index.html) ---
    'preloader_text': 'مرحباً...',
    'header_subtitle': 'نظام **نا**فجيتور و**م**علومات **د**عم **ا**لمواطنين **ا**لفقراء',
    'nav_upload_file': 'تحميل ملف',
    'nav_recipient_list': 'قائمة المستفيدين',
    'menu_guide_text': 'دليل الاستخدام',
    'menu_about_text': 'حول التطبيق',
    'upload_instruction': 'اسحب وأفلت ملف <strong>(.xlsx)</strong> هنا أو انقر على الزر أدناه.',
    'select_excel_file': 'اختيار ملف إكسل',
    'no_format_q': 'ليس لديك تنسيق البيانات؟',
    'download_template_text': 'تحميل النموذج (.xlsx)',
    'search_placeholder': 'أدخل اسم المستفيد للبحث...', 
    'filter_btn_text': 'تصفية المنطقة',
    'filter_all_option': 'كل الخيارات',
    'reset_btn_text': 'إعادة تعيين',
    'empty_table_title': 'الرجاء تحميل ملف إكسل أولاً لعرض البيانات.',
    'page_prev_text': 'السابق',
    'page_next_text': 'التالي',
    'menu_lang_text': 'اللغة',

    'datetime_separator': ' | ', // Menggunakan spasi agar lebih jelas
    
    // Modal Download
    'modal_close_title': 'إغلاق',
    'modal_cancel_btn': 'إلغاء',
    'modal_confirm_btn': 'متابعة التحميل',
    'download_modal_text': 'تأكد من استخدام هذا النموذج بتنسيق البيانات الصحيح لتجنب الأخطاء أثناء التحميل.',
    
    // Modal Navigasi
    'navigation_cancel': 'لا',
    'navigation_confirm': 'نعم، انتقل',
    
    // Tooltip
    'tooltip_expand_menu': 'توسيع القائمة',
    'tooltip_menu_collapse': 'تصغير القائمة', 
    'tooltip_theme_dark': 'التبديل للوضع الداكن', 
    'tooltip_theme_light': 'التبديل للوضع الفاتح', 
    'tooltip_upload_file': 'تحميل الملف',
    'tooltip_download_template': 'تحميل النموذج',
    
    // Modal About, Filter, Panduan
    'about_modal_title': 'حول نظام NASI-BARAS',
    'filter_modal_title_text': 'تصفية المنطقة', 
    'filter_instruction': 'الرجاء اختيار المنطقة:',
    'filter_region_label': 'المنطقة / الحي',
    'filter_rw_label': 'وحدة المجتمع (RW)',
    'filter_rt_label': 'وحدة الجوار (RT)',
    'filter_all_option': '-- الكل --',
    'filter_apply_btn': 'عرض البيانات',
    'panduan_modal_title_text': 'دليل استخدام NASI-BARAS', 
    'panduan_prev_text': 'السابق',
    'panduan_next_text': 'التالي',
    'biodata_name_header': 'اسم المستفيد',
    'biodata_nik_header': 'رقم الهوية/NIK',
    'footer_text': '&copy; 2025 نظام NASI-BARAS بإدارة Ya!Pao.',
    
    // Konten Modal About
    'about_app_goal_title': 'هدف التطبيق',
    'about_app_goal_text': 'نظام NASI-BARAS (نظام الملاحة والمعلومات للمساعدة الاجتماعية الأساسية) هو نظام لإدارة البيانات مصمم لتسهيل عمل المؤسسات أو الوكالات في إدارة وتصفية والتحقق من صحة بيانات مستحقي المساعدة الاجتماعية. يهدف النظام إلى زيادة كفاءة التوزيع ودقة استهداف المساعدة.',
    'about_features_title': 'الميزات الرئيسية',
    'about_feature_1': 'تكامل سريع للبيانات عبر تحميل ملف **إكسل (.xlsx)**.',
    'about_feature_2': 'البحث وتصفية بيانات المستفيدين حسب المنطقة (RT/RW/حي).',
    'about_feature_3': 'ميزة الملاحة المستندة إلى الموقع (بافتراض توفر بيانات الإحداثيات) للتحقق الميداني.',
    'about_tech_title': 'معلومات تقنية',
    'about_tech_text': 'تم تطوير هذا التطبيق باستخدام تقنية *الواجهة الأمامية* الخالصة **HTML5 و CSS3 و JavaScript (Vanilla JS)** لضمان سرعة الوصول وسهولة التنفيذ دون الاعتماد على *خوادم* معقدة.',
    'about_version_label': 'الإصدار:',
    'about_developer_label': 'المطور:',
    'about_contact_label': 'الاتصال:',
    'about_disclaimer_text': 'البيانات المعالجة في هذا النظام هي مسؤولية المستخدم بالكامل.',
    
    // Konten Modal Panduan (Detail Steps)
    'panduan_step_1_text': 'الخطوة 1.1 - تحميل البيانات: استخدم زر \'اختيار ملف إكسل\' أو منطقة السحب والإفلات لتحميل ملف البيانات (.xlsx). زر \'تحميل النموذج\' متاح إذا كنت بحاجة إلى تنسيق البيانات القياسي.',
    'panduan_step_2_text': 'الخطوة 2.1 - البحث والجدول: أدخل اسم المستفيد في عمود البحث وانقر على أيقونة العدسة المكبرة ( ) للبحث. انتقل بين الصفحات باستخدام أزرار الأسهم أسفل الجدول.',
    'panduan_step_3_text': 'الخطوة 2.2 - فتح التصفية: انقر على زر \'تصفية المنطقة\'. اختر المعايير (المنطقة/RW/RT) من القائمة المنسدلة ثم انقر على \'عرض البيانات\'.',
    'panduan_step_4_text': 'الخطوة 2.3 - حالة التصفية: سيظهر ملخص للتصفية المطبقة فوق عمود البحث. انقر على زر \'إعادة تعيين\' (الأحمر) لمسح جميع التصفية.',
    'panduan_step_5_text': 'الخطوة 3.1 - فتح البيانات الشخصية: انقر على اسم المستفيد في الجدول لعرض نافذة البيانات الشخصية. قم بمراجعة نوع المساعدة والعنوان الكامل.',
    'panduan_step_6_text': 'الخطوة 3.2 - الملاحة: انقر على زر \'الملاحة\' في نافذة البيانات الشخصية. ثم قم بتأكيد \'نعم، انتقل\' لفتح تطبيق الخريطة نحو الموقع.',

    // --- KUNCI DINAMIS DARI DATA VISUAL & UMUM ---
    // Status Unggah File (setFileStatus & loadExcel)
    'file_status_idle': 'لم يتم اختيار أي ملف بعد.', 
    'file_status_processing': 'الملف: %s - قيد المعالجة...', 
    'file_status_loaded': 'الملف: %s (تم تحميل %d من البيانات).', 
    'file_error_empty_sheet': 'تم تحميل الملف، ولكن لم يتم العثور على بيانات في الورقة الأولى.',
    'file_error_missing_headers': 'فشل المعالجة، تأكد من مطابقة الملف للنموذج (حمل أدناه). الأعمدة المفقودة: %s.', 
    'file_error_parsing': 'فشل معالجة ملف إكسل. تأكد من صحة تنسيق الملف (xlsx/xls).',
    'file_error_wrong_type': 'نوع الملف غير مدعوم. الرجاء تحميل ملف إكسل (.xlsx).', 
    
    // Pesan Tabel & UI
    'table_error_empty_file_ui': 'لم يتم العثور على بيانات في ملف إكسل.',
    'table_error_wrong_format_ui': 'تنسيق النموذج غير صحيح. تأكد من استخدام ملف النموذج الصحيح.',
    'table_error_no_criteria_ui': 'لم يتم العثور على بيانات للمعايير التي اخترتها.',
    
    // Pesan Validasi Operasi
    'operation_error_no_data': 'الرجاء تحميل بيانات المستفيد (إكسل) أولاً لمتابعة هذه العملية.', 
    
    // Header Tabel
    'table_header_no': 'الرّقم',
    'table_header_name': 'الاسم',
    'table_header_address': 'العنوان',
    'table_header_assistance': 'نوع المساعدة',
    'table_header_status': 'الحالة',
    'table_header_region': 'المنطقة',
    'table_header_rt': 'RT',
    'table_header_rw': 'RW',

    // Paginasi
    'data_count_zero': '0 بيانات', 
    'data_count_range_text': 'عرض %d - %d من %d بيانات', 
    'page_info_format_dynamic': 'الصفحة %d من %d', 
    
    // Pencarian
    'search_validation_error': 'يجب أن يتكون البحث من 3 أحرف على الأقل.',
    'search_feedback_found': 'تم العثور على <strong>%d</strong> مستفيدين مطابقين.',
    'search_feedback_not_found': 'لم يتم العثور على مستفيد بالاسم <strong>%s</strong>.',
    
    // Modal Navigasi Dinamis
    'navigation_modal_text_dynamic': 'هل ترغب في عرض موقع منزل <strong>%s</strong>؟',
    'navigation_modal_default_text': 'هل ترغب في عرض موقع منزل مستحق المساعدة؟',
    
    // Modal Panduan Dinamis
    'page_info_format_panduan': '%d / %d', 
    // panduan section title---
    'panduan_section_title_1': '1. تحميل بيانات إكسل <i class="fas fa-upload"></i>',
    'panduan_step_1_text': '<strong>الخطوة 1.1 - تحميل البيانات:</strong> استخدم زر <strong>\'اختيار ملف إكسل\'</strong> أو منطقة السحب والإفلات لتحميل ملف البيانات (.xlsx). زر <strong>\'تحميل النموذج\'</strong> متاح إذا كنت بحاجة إلى تنسيق البيانات القياسي.',
    
    'panduan_section_title_2': '2. البحث وعرض البيانات <i class="fas fa-search"></i>',
    'panduan_step_2_text': '<strong>الخطوة 2.1 - البحث والجدول:</strong> أدخل اسم المستفيد في عمود البحث وانقر على أيقونة العدسة المكبرة (<i class="fas fa-search"></i>) للبحث. انتقل بين الصفحات باستخدام أزرار الأسهم أسفل الجدول.',
    
    'panduan_section_title_2_2': '2.2 تصفية المنطقة',
    'panduan_step_3_text': '<strong>الخطوة 2.2 - فتح التصفية:</strong> انقر على زر <strong>\'تصفية المنطقة\'</strong>. اختر المعايير (المنطقة/RW/RT) من <strong>القائمة المنسدلة</strong> ثم انقر على <strong>\'عرض البيانات\'</strong>.',
    
    'panduan_section_title_2_3': '<i class="fas fa-tag"></i> 2.3 نتائج التصفية النشطة',
    'panduan_step_4_text': '<strong>الخطوة 2.3 - حالة التصفية:</strong> سيظهر ملخص للتصفية المطبقة فوق عمود البحث. انقر على زر <strong>\'إعادة تعيين\'</strong> (الأحمر) لمسح جميع التصفية.',
    
    'panduan_section_title_3': '3. عرض تفاصيل البيانات الشخصية <i class="fas fa-user-circle"></i>',
    'panduan_step_5_text': '<strong>الخطوة 3.1 - فتح البيانات الشخصية:</strong> انقر على اسم المستفيد في الجدول لعرض نافذة البيانات الشخصية. قم بمراجعة نوع المساعدة والعنوان الكامل.',
    
    'panduan_section_title_3_1': '3.1 الملاحة إلى الموقع',
    'panduan_step_6_text': '<strong>الخطوة 3.2 - الملاحة:</strong> انقر على زر <strong>\'الملاحة\'</strong> في نافذة البيانات الشخصية. ثم قم بتأكيد <strong>\'نعم، انتقل\'</strong> لفتح تطبيق الخريطة نحو الموقع.',

    // Label Modal Biodata
    'biodata_name_unavailable': 'الاسم غير متاح',
    'biodata_id_unavailable': 'رقم الهوية غير متاح',
    'biodata_nik_label': 'NIK',
    'biodata_no_urut_label': 'رقم تسلسلي',
    'biodata_address_unavailable': 'العنوان غير متاح',
    'biodata_label_assistance': 'نوع المساعدة:',
    'biodata_label_address': 'العنوان الكامل:',
    'biodata_label_rw': 'RW:',
    'biodata_label_rt': 'RT:',
    'biodata_label_area': 'منطقة الموقع',
    'biodata_rt_label': 'RT',
    'biodata_rw_label': 'RW',
    'biodata_label_status': 'حالة البيانات:',
    'biodata_label_region': 'المنطقة:',
    'biodata_label_notes': 'ملاحظات:',
    'biodata_btn_navigate': 'الملاحة',
    'biodata_gps_warning': 'بيانات موقع GPS غير متاحة بعد.',
    'biodata_btn_navigate_tooltip_ready': 'انقر للتنقل إلى عنوان المستفيد',
    'biodata_btn_navigate_tooltip_missing': 'الإحداثيات (خط العرض/خط الطول) غير متوفرة',

    // --- KUNCI BARU DARI LOGIKA FILTER (digunakan oleh filter.js) ---
    'filter_wilayah_label': 'المنطقة',
    'filter_rw_label_short': 'RW',
    'filter_rt_label_short': 'RT',
    'filter_summary_active': '<i class="fas fa-sliders"></i> التصفية النشطة: %s',
    'filter_summary_none': '<i class="fas fa-check-circle"></i> لا توجد تصفية منطقة نشطة.',
    // Nilai Konstanta Default Filter (Digunakan untuk cek nilai)
    'filter_default_all_wilayah': 'جميع المناطق',
    'filter_default_all_rw': 'جميع RW',
    'filter_default_all_rt': 'جميع RT',
    // Teks Opsi Dropdown Dinamis
    'filter_select_rw_first': 'اختر RW أولاً',
    'filter_select_wilayah_first': 'اختر المنطقة أولاً',
    'filter_dropdown_all_in_wilayah': 'جميع RW في %s',
    'filter_dropdown_all_in_rw': 'جميع RT في RW %s',
    // Pesan Pencarian dari filter.js
    'search_error_no_excel': 'الرجاء تحميل بيانات إكسل أولاً.',
    'search_error_not_found': '⚠️ لم يتم العثور على الاسم "%s" في البيانات الحالية.',
    'language_modal_title': 'اختيار اللغة',

    'data_keywords': {
            'aktif': 'نشط', // Nashṭ
            'dalam proses': 'قيد المعالجة', // Qayd al-muʿālaja
            'pending': 'معلّق', // Mu'allaq
            'tidak aktif': 'غير نشط', // Ghayr nashṭ
            'nonaktif': 'غير نشط',
            'laki-laki': 'ذكر', // Dhakar
            'perempuan': 'أنثى', // Unthā
        }
},

'ja': {
    // --- KUNCI STATIS (dari index.html) ---
    'preloader_text': 'ようこそ...',
    'header_subtitle': '貧困層向け基本支援情報・ナビゲーションシステム',
    'nav_upload_file': 'ファイルをアップロード',
    'nav_recipient_list': '受給者リスト',
    'menu_guide_text': '利用ガイド',
    'menu_about_text': 'アプリについて',
    'upload_instruction': '<strong>(.xlsx)</strong>ファイルをここにドラッグ＆ドロップするか、下のボタンをクリックしてください。',
    'select_excel_file': 'Excelファイルを選択',
    'no_format_q': 'データ形式をお持ちでないですか？',
    'download_template_text': 'テンプレート (.xlsx) をダウンロード',
    'search_placeholder': '検索する受給者名を入力...', 
    'filter_btn_text': 'エリアを絞り込み',
    'filter_all_option': 'すべての選択肢',
    'reset_btn_text': 'リセット',
    'empty_table_title': 'データを表示するには、まずExcelファイルをアップロードしてください。',
    'page_prev_text': '前へ',
    'page_next_text': '次へ',
    'menu_lang_text': '言語',

    'datetime_separator': '｜', // 区切り文字
    
    // Modal Download
    'modal_close_title': '閉じる',
    'modal_cancel_btn': 'キャンセル',
    'modal_confirm_btn': 'ダウンロードを続行',
    'download_modal_text': 'アップロード時のエラーを避けるため、正しいデータ形式でこのテンプレートを使用していることを確認してください。',
    
    // Modal Navigasi
    'navigation_cancel': 'いいえ',
    'navigation_confirm': 'はい、ナビゲート',
    
    // Tooltip
    'tooltip_expand_menu': 'メニューを展開',
    'tooltip_menu_collapse': 'メニューを折りたたむ', 
    'tooltip_theme_dark': 'ダークモードに切り替え', 
    'tooltip_theme_light': 'ライトモードに切り替え', 
    'tooltip_upload_file': 'ファイルをアップロード',
    'tooltip_download_template': 'テンプレートをダウンロード',
    
    // Modal About, Filter, Panduan
    'about_modal_title': 'NASI-BARASシステムについて',
    'filter_modal_title_text': 'エリア絞り込み', 
    'filter_instruction': 'エリアを選択してください:',
    'filter_region_label': '地域 / エリア',
    'filter_rw_label': 'コミュニティ単位 (RW)',
    'filter_rt_label': '近隣単位 (RT)',
    'filter_apply_btn': 'データを表示',
    'panduan_modal_title_text': 'NASI-BARAS利用ガイド', 
    'panduan_prev_text': '前へ',
    'panduan_next_text': '次へ',
    'biodata_name_header': '受給者名',
    'biodata_nik_header': 'NIK/ID番号',
    'footer_text': '&copy; 2025 NASI-BARAS 管理：Ya!Pao.',
    
    // Konten Modal About
    'about_app_goal_title': 'アプリケーションの目的',
    'about_app_goal_text': 'NASI-BARAS（基礎社会援助ナビゲーション＆情報システム）は、機関や団体が社会援助受給者データの管理、絞り込み、検証を容易にするために設計されたデータ管理システムです。このシステムは、援助の配布効率と目標の精度向上を目指しています。',
    'about_features_title': '主要機能',
    'about_feature_1': '<strong>Excel (.xlsx)</strong> ファイルのアップロードによる迅速なデータ統合。',
    'about_feature_2': 'エリア（RT/RW/地域）に基づく受給者データの検索と絞り込み。',
    'about_feature_3': '現地検証のための位置情報に基づくナビゲーション機能（座標データがある場合）。',
    'about_tech_title': '技術情報',
    'about_tech_text': 'このアプリケーションは、複雑な*サーバー*に依存せず、迅速なアクセスと簡単な実装を保証するために、純粋な*フロントエンド*技術である **HTML5、CSS3、およびJavaScript（Vanilla JS）**を使用して開発されました。',
    'about_version_label': 'バージョン:',
    'about_developer_label': '開発者:',
    'about_contact_label': '連絡先:',
    'about_disclaimer_text': 'このシステムで処理されるデータは、すべてユーザーの責任です。',
    
    // Konten Modal Panduan (Detail Steps)
    'panduan_section_title_1': '1. Excelデータのアップロード <i class="fas fa-upload"></i>',
    'panduan_step_1_text': '<strong>ステップ 1.1 - データアップロード:</strong> <strong>\'Excelファイルを選択\'</strong> ボタンまたはドラッグ＆ドロップエリアを使用してデータファイル (.xlsx) をアップロードします。標準のデータ形式が必要な場合は、<strong>\'テンプレートをダウンロード\'</strong> ボタンが利用できます。',
    'panduan_section_title_2': '2. データの検索と表示 <i class="fas fa-search"></i>',
    'panduan_step_2_text': '<strong>ステップ 2.1 - 検索とテーブル:</strong> 検索欄に受給者名を入力し、虫眼鏡アイコン (<i class="fas fa-search"></i>) をクリックして検索します。テーブル下の矢印ボタンを使用してページ間を移動します。',
    'panduan_section_title_2_2': '2.2 エリア絞り込み',
    'panduan_step_3_text': '<strong>ステップ 2.2 - フィルタを開く:</strong> <strong>\'エリア絞り込み\'</strong> ボタンをクリックします。<strong>ドロップダウン</strong>から基準（地域/RW/RT）を選択し、<strong>\'データを表示\'</strong> をクリックします。',
    'panduan_section_title_2_3': '<i class="fas fa-tag"></i> 2.3 アクティブなフィルターステータス',
    'panduan_step_4_text': '<strong>ステップ 2.3 - フィルターステータス:</strong> 適用されたフィルターの概要が検索欄の上に表示されます。<strong>\'リセット\'</strong> (赤) ボタンをクリックして、すべてのフィルターをクリアします。',
    'panduan_section_title_3': '3. 受給者詳細の表示 <i class="fas fa-user-circle"></i>',
    'panduan_step_5_text': '<strong>ステップ 3.1 - 詳細を開く:</strong> テーブル内の受給者名をクリックして詳細ウィンドウを表示します。援助の種類と完全な住所を確認します。',
    'panduan_section_title_3_1': '3.1 位置へのナビゲーション',
    'panduan_step_6_text': '<strong>ステップ 3.2 - ナビゲーション:</strong> 詳細ウィンドウで <strong>\'ナビゲーション\'</strong> ボタンをクリックします。その後、<strong>\'はい、ナビゲート\'</strong> を確認して、地図アプリで位置に移動します。',

    // --- KUNCI DINAMIS DARI DATA VISUAL & UMUM ---
    // Status Unggah File (setFileStatus & loadExcel)
    'file_status_idle': 'ファイルはまだ選択されていません。', 
    'file_status_processing': 'ファイル: %s - 処理中...', 
    'file_status_loaded': 'ファイル: %s (%d件のデータをロードしました)。', 
    'file_error_empty_sheet': 'ファイルはロードされましたが、最初のシートにデータが見つかりませんでした。',
    'file_error_missing_headers': '処理に失敗しました。ファイルがテンプレートに一致していることを確認してください（下でダウンロード）。不足している列: %s。', 
    'file_error_parsing': 'Excelファイルの処理に失敗しました。ファイル形式 (xlsx/xls) が正しいことを確認してください。',
    'file_error_wrong_type': 'サポートされていないファイルタイプです。Excelファイル (.xlsx) をアップロードしてください。', 
    
    // Pesan Tabel & UI
    'table_error_empty_file_ui': 'Excelファイルにデータが見つかりませんでした。',
    'table_error_wrong_format_ui': 'テンプレート形式が間違っています。正しいテンプレートファイルを使用していることを確認してください。',
    'table_error_no_criteria_ui': '選択した基準に一致するデータが見つかりませんでした。',
    
    // Pesan Validasi Operasi
    'operation_error_no_data': 'この操作を続行するには、まず受給者データ (Excel) をアップロードしてください。', 
    
    // Header Tabel
    'table_header_no': '番号',
    'table_header_name': '名前',
    'table_header_address': '住所',
    'table_header_assistance': '援助の種類',
    'table_header_status': 'ステータス',
    'table_header_region': '地域',
    'table_header_rt': 'RT',
    'table_header_rw': 'RW',

    // Paginasi
    'data_count_zero': '0件のデータ', 
    'data_count_range_text': '%d件中 %d - %d件のデータを表示', 
    'page_info_format_dynamic': '%dページ / 全%dページ', 
    
    // Pencarian
    'search_validation_error': '検索は最低3文字以上である必要があります。',
    'search_feedback_found': '<strong>%d</strong>件の一致する受給者が見つかりました。',
    'search_feedback_not_found': '名前 <strong>%s</strong> の受給者が見つかりませんでした。',
    
    // Modal Navigasi Dinamis
    'navigation_modal_text_dynamic': '<strong>%s</strong> の自宅の場所を表示しますか？',
    'navigation_modal_default_text': '援助受給者の自宅の場所を表示しますか？',
    
    // Modal Panduan Dinamis
    'page_info_format_panduan': '%d / %d', 
    
    // Label Modal Biodata
    'biodata_name_unavailable': '名前は利用できません',
    'biodata_id_unavailable': 'ID番号は利用できません',
    'biodata_nik_label': 'NIK',
    'biodata_no_urut_label': '連番',
    'biodata_address_unavailable': '住所は利用できません',
    'biodata_label_assistance': '援助の種類:',
    'biodata_label_address': '完全な住所:',
    'biodata_label_rw': 'RW:',
    'biodata_label_rt': 'RT:',
    'biodata_label_area': '位置エリア',
    'biodata_rt_label': 'RT',
    'biodata_rw_label': 'RW',
    'biodata_label_status': 'データステータス:',
    'biodata_label_region': '地域:',
    'biodata_label_notes': 'メモ:',
    'biodata_btn_navigate': 'ナビゲーション',
    'biodata_gps_warning': 'GPS位置データはまだ利用できません。',
    'biodata_btn_navigate_tooltip_ready': '受給者の住所にナビゲートするにはクリック',
    'biodata_btn_navigate_tooltip_missing': '座標（緯度/経度）は利用できません',

    // --- KUNCI BARU DARI LOGIKA FILTER (digunakan oleh filter.js) ---
    'filter_wilayah_label': '地域',
    'filter_rw_label_short': 'RW',
    'filter_rt_label_short': 'RT',
    'filter_summary_active': '<i class="fas fa-sliders"></i> アクティブなフィルター: %s',
    'filter_summary_none': '<i class="fas fa-check-circle"></i> アクティブな地域フィルターはありません。',
    // Nilai Konstanta Default Filter (Digunakan untuk cek nilai)
    'filter_default_all_wilayah': 'すべての地域',
    'filter_default_all_rw': 'すべてのRW',
    'filter_default_all_rt': 'すべてのRT',
    // Teks Opsi Dropdown Dinamis
    'filter_select_rw_first': 'まずRWを選択してください',
    'filter_select_wilayah_first': 'まず地域を選択してください',
    'filter_dropdown_all_in_wilayah': '%s 内のすべてのRW',
    'filter_dropdown_all_in_rw': 'RW %s 内のすべてのRT',
    // Pesan Pencarian dari filter.js
    'search_error_no_excel': 'まずExcelデータをアップロードしてください。',
    'search_error_not_found': '⚠️ 現在のデータには名前 "%s" が見つかりませんでした。',
    'language_modal_title': '言語を選択',

    'data_keywords': {
            'aktif': 'アクティブ', // Akutibu
            'dalam proses': '処理中', // Shori-chū
            'pending': '保留中', // Horyū-chū
            'tidak aktif': '非アクティブ', // Hi-akutibu
            'nonaktif': '非アクティブ',
            'laki-laki': '男性', // Dansei
            'perempuan': '女性', // Josei
        }
},
'zh': {
    // --- KUNCI STATIS (dari index.html) ---
    'preloader_text': '欢迎...',
    'header_subtitle': '基本社会援助接收者信息导航系统',
    'nav_upload_file': '上传文件',
    'nav_recipient_list': '受助者名单',
    'menu_guide_text': '使用指南',
    'menu_about_text': '关于应用',
    'upload_instruction': '将 <strong>(.xlsx)</strong> 文件拖放到此处或点击下方按钮。',
    'select_excel_file': '选择 Excel 文件',
    'no_format_q': '还没有数据格式吗？',
    'download_template_text': '下载模板 (.xlsx)',
    'search_placeholder': '输入受助者姓名进行搜索...', 
    'filter_btn_text': '区域筛选',
    'filter_all_option': '所有选项',
    'reset_btn_text': '重置',
    'empty_table_title': '请先上传 Excel 文件以查看数据。',
    'page_prev_text': '上一页',
    'page_next_text': '下一页',
    'menu_lang_text': '语言',

    'datetime_separator': '|', // Menggunakan spasi agar lebih jelas
    
    // Modal Download
    'modal_close_title': '关闭',
    'modal_cancel_btn': '取消',
    'modal_confirm_btn': '继续下载',
    'download_modal_text': '请确保您使用正确的资料格式来使用此模板，以避免上传时发生错误。',
    
    // Modal Navigasi
    'navigation_cancel': '否',
    'navigation_confirm': '是，导航',
    
    // Tooltip
    'tooltip_expand_menu': '展开菜单',
    'tooltip_menu_collapse': '折叠菜单', 
    'tooltip_theme_dark': '切换到黑暗模式', 
    'tooltip_theme_light': '切换到明亮模式', 
    'tooltip_upload_file': '上传文件',
    'tooltip_download_template': '下载模板',
    
    // Modal About, Filter, Panduan
    'about_modal_title': '关于 NASI-BARAS 系统',
    'filter_modal_title_text': '区域筛选', 
    'filter_instruction': '请选择区域:',
    'filter_region_label': '区域 / 社区',
    'filter_rw_label': '社区单元 (RW)',
    'filter_rt_label': '邻里单元 (RT)',
    'filter_apply_btn': '显示数据',
    'panduan_modal_title_text': 'NASI-BARAS 使用指南', 
    'panduan_prev_text': '上一步',
    'panduan_next_text': '下一步',
    'biodata_name_header': '受助者姓名',
    'biodata_nik_header': 'NIK/身份证号',
    'footer_text': '&copy; 2025 NASI-BARAS 由 Ya!Pao 管理。',
    
    // Konten Modal About
    'about_app_goal_title': '应用程序目标',
    'about_app_goal_text': 'NASI-BARAS（基本社会援助信息与导航系统）是一个数据管理系统，旨在方便机构或部门管理、筛选和验证社会援助接收者数据。该系统旨在提高援助分配的效率和准确性。',
    'about_features_title': '主要功能',
    'about_feature_1': '通过上传 <strong>Excel (.xlsx)</strong> 文件快速集成数据。',
    'about_feature_2': '根据区域（RT/RW/社区）搜索和筛选受助者数据。',
    'about_feature_3': '基于位置的导航功能（假设坐标数据可用）用于现场核实。',
    'about_tech_title': '技术信息',
    'about_tech_text': '本应用使用纯 <strong>HTML5、CSS3 和 JavaScript (Vanilla JS)</strong> *前端*技术开发，以确保快速访问和易于实施，无需依赖复杂的*服务器*。',
    'about_version_label': '版本:',
    'about_developer_label': '开发者:',
    'about_contact_label': '联系方式:',
    'about_disclaimer_text': '在此系统上处理的数据完全由用户负责。',
    
    // Konten Modal Panduan (Detail Steps)
    'panduan_section_title_1': '1. 上传 Excel 数据 <i class="fas fa-upload"></i>',
    'panduan_step_1_text': '<strong>步骤 1.1 - 上传数据:</strong> 使用 <strong>\'选择 Excel 文件\'</strong> 按钮或拖放区域上传数据文件 (.xlsx)。如果您需要标准数据格式，可以使用 <strong>\'下载模板\'</strong> 按钮。',
    'panduan_section_title_2': '2. 数据搜索与显示 <i class="fas fa-search"></i>',
    'panduan_step_2_text': '<strong>步骤 2.1 - 搜索与表格:</strong> 在搜索栏中输入受助者姓名并点击放大镜图标 (<i class="fas fa-search"></i>) 进行搜索。使用表格下方的箭头按钮在页面之间导航。',
    'panduan_section_title_2_2': '2.2 区域筛选',
    'panduan_step_3_text': '<strong>步骤 2.2 - 打开筛选:</strong> 点击 <strong>\'区域筛选\'</strong> 按钮。从<strong>下拉列表</strong>中选择标准（区域/RW/RT），然后点击 <strong>\'显示数据\'</strong>。',
    'panduan_section_title_2_3': '<i class="fas fa-tag"></i> 2.3 当前筛选状态',
    'panduan_step_4_text': '<strong>步骤 2.3 - 筛选状态:</strong> 正在应用的筛选摘要将出现在搜索栏上方。点击 <strong>\'重置\'</strong>（红色）按钮清除所有筛选。',
    'panduan_section_title_3': '3. 显示个人资料详情 <i class="fas fa-user-circle"></i>',
    'panduan_step_5_text': '<strong>步骤 3.1 - 打开个人资料:</strong> 点击表格中的受助者姓名以显示个人资料窗口。查看援助类型和完整地址。',
    'panduan_section_title_3_1': '3.1 导航到位置',
    'panduan_step_6_text': '<strong>步骤 3.2 - 导航:</strong> 在个人资料窗口中点击 <strong>\'导航\'</strong> 按钮。然后确认 <strong>\'是，导航\'</strong>，以在地图应用中打开该位置。',

    // --- KUNCI DINAMIS DARI DATA VISUAL & UMUM ---
    // Status Unggah File (setFileStatus & loadExcel)
    'file_status_idle': '尚未选择文件。', 
    'file_status_processing': '文件: %s - 正在处理中...', 
    'file_status_loaded': '文件: %s (已加载 %d 条数据)。', 
    'file_error_empty_sheet': '文件已加载，但在第一个工作表中未找到数据。',
    'file_error_missing_headers': '处理失败，请确保文件符合模板（在下方下载）。缺失列: %s。', 
    'file_error_parsing': '处理 Excel 文件失败。请确保文件格式 (xlsx/xls) 正确。',
    'file_error_wrong_type': '不支持的文件类型。请上传 Excel 文件 (.xlsx)。', 
    
    // Pesan Tabel & UI
    'table_error_empty_file_ui': '在 Excel 文件中未找到数据。',
    'table_error_wrong_format_ui': '模板格式错误。请确保使用正确的模板文件。',
    'table_error_no_criteria_ui': '未找到符合您所选标准的数据。',
    
    // Pesan Validasi Operasi
    'operation_error_no_data': '请先上传受助者数据 (Excel) 以继续此操作。', 
    
    // Header Tabel
    'table_header_no': '编号',
    'table_header_name': '姓名',
    'table_header_address': '地址',
    'table_header_assistance': '援助类型',
    'table_header_status': '状态',
    'table_header_region': '区域',
    'table_header_rt': 'RT',
    'table_header_rw': 'RW',

    // Paginasi
    'data_count_zero': '0 条数据', 
    'data_count_range_text': '显示 %d 条数据中的 %d - %d 条', 
    'page_info_format_dynamic': '第 %d 页 / 共 %d 页', 
    
    // Pencarian
    'search_validation_error': '搜索至少需要 3 个字符。',
    'search_feedback_found': '找到 <strong>%d</strong> 个匹配的受助者。',
    'search_feedback_not_found': '未找到姓名为 <strong>%s</strong> 的受助者。',
    
    // Modal Navigasi Dinamis
    'navigation_modal_text_dynamic': '您想查看 <strong>%s</strong> 的住家位置吗？',
    'navigation_modal_default_text': '您想查看受助者的住家位置吗？',
    
    // Modal Panduan Dinamis
    'page_info_format_panduan': '%d / %d', 
    
    // Label Modal Biodata
    'biodata_name_unavailable': '姓名不可用',
    'biodata_id_unavailable': '身份证号不可用',
    'biodata_nik_label': 'NIK',
    'biodata_no_urut_label': '序号',
    'biodata_address_unavailable': '地址不可用',
    'biodata_label_assistance': '援助类型:',
    'biodata_label_address': '完整地址:',
    'biodata_label_rw': 'RW:',
    'biodata_label_rt': 'RT:',
    'biodata_label_area': '位置区域',
    'biodata_rt_label': 'RT',
    'biodata_rw_label': 'RW',
    'biodata_label_status': '数据状态:',
    'biodata_label_region': '区域:',
    'biodata_label_notes': '备注:',
    'biodata_btn_navigate': '导航',
    'biodata_gps_warning': 'GPS 位置数据尚不可用。',
    'biodata_btn_navigate_tooltip_ready': '点击导航到受助者地址',
    'biodata_btn_navigate_tooltip_missing': '坐标 (纬度/经度) 不可用',

    // --- KUNCI BARU DARI LOGIKA FILTER (digunakan oleh filter.js) ---
    'filter_wilayah_label': '区域',
    'filter_rw_label_short': 'RW',
    'filter_rt_label_short': 'RT',
    'filter_summary_active': '<i class="fas fa-sliders"></i> 当前筛选: %s',
    'filter_summary_none': '<i class="fas fa-check-circle"></i> 没有活动的区域筛选。',
    // Nilai Konstanta Default Filter (Digunakan untuk cek nilai)
    'filter_default_all_wilayah': '所有区域',
    'filter_default_all_rw': '所有 RW',
    'filter_default_all_rt': '所有 RT',
    // Teks Opsi Dropdown Dinamis
    'filter_select_rw_first': '请先选择 RW',
    'filter_select_wilayah_first': '请先选择区域',
    'filter_dropdown_all_in_wilayah': '%s 中的所有 RW',
    'filter_dropdown_all_in_rw': 'RW %s 中的所有 RT',
    // Pesan Pencarian dari filter.js
    'search_error_no_excel': '请先上传 Excel 数据。',
    'search_error_not_found': '⚠️ 当前数据中未找到姓名 "%s"。',
    'language_modal_title': '选择语言',

    'data_keywords': {
            'aktif': '活跃', // Huóyuè
            'dalam proses': '处理中', // Chǔlǐ zhōng
            'pending': '待处理', // Dài chǔlǐ
            'tidak aktif': '不活跃', // Bù huóyuè
            'nonaktif': '不活跃',
            'laki-laki': '男性', // Nánxìng
            'perempuan': '女性', // Nǚxìng
        }
},

}