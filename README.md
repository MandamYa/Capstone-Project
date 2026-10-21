# NASI-BARAS — Capstone Project Kelompok B (Versi 1.1.0)

**Judul proyek:** Visualisasi dan Navigasi Lokasi Data Penerima Bantuan Sosial Berbasis Web  
**Mata kuliah:** STSI4440 Capstone Project — Universitas Terbuka (2026)

Aplikasi ini merupakan penyempurnaan prototipe NASI-BARAS berbasis **HTML5, CSS3, dan Vanilla JavaScript**. Library **SheetJS** dipertahankan dari kode asli untuk membaca Excel (.xlsx). Tidak ditambahkan Python, PHP, Node.js, framework baru, database, atau backend ke sistem.

## 1. Menjalankan sistem

1. **Ekstrak ZIP** ke suatu folder. Jangan menjalankan berkas langsung dari dalam ZIP.
2. Buka `Capstone-Project-main/index.html` di **Google Chrome atau Microsoft Edge terbaru**.
3. Bila browser menolak fungsi Web Crypto saat akses lewat `file://`, jalankan folder ini melalui **localhost/HTTPS** dari web server statis yang Anda gunakan (tidak membutuhkan backend aplikasi). Pesan login akan memberi tahu jika Web Crypto tidak tersedia.
4. Masuk dengan akun demonstrasi berikut.

| Kolom | Nilai |
| --- | --- |
Login sebagai Administrator
| Nama pengguna | `admin` |
| Kata sandi | `NasiBaras@2026` |
| --- | --- |
|Login sebagai Pengguna|
| Nama pengguna | `user` |
| Kata sandi | `user1234` |

**Penting:** Akun tersebut hanya untuk presentasi dan pengujian. Kata sandi demo didistribusikan melalui berkas ini. Login tidak aman untuk sistem operasional sungguhan.

## 2. Alur pemakaian

1. **Login** dari halaman awal; kredensial salah akan menampilkan pesan kesalahan.
2. Pilih **Unduh Data Contoh (Dummy)** untuk memperoleh `contoh_data_dummy.xlsx`, atau gunakan template `data_template.xlsx` milik proyek.
3. Pada **Upload File**, pilih Excel `.xlsx` (maks. 15 MB). Sistem membaca **sheet pertama**.
4. Setelah berhasil, buka menu **Daftar Penerima** (berpindah otomatis setelah upload).
5. Lihat **ringkasan** total data, wilayah, status aktif, dan data yang ditampilkan. Cari nama; gunakan filter wilayah → RW → RT.
6. Klik **baris penerima** untuk melihat biodata. Apabila `LINK_GPS` valid, klik **Navigasi** lalu konfirmasi untuk membuka layanan peta pada tab baru.
7. Gunakan **Sebelumnya/Selanjutnya** untuk paginasi (25 data per halaman). Anda bisa mengganti bahasa dan mode tampilan yang sudah ada.
8. Klik **Keluar** untuk menghapus sesi demo dan data Excel yang tersimpan di memori halaman melalui reload.

## 3. Struktur data dan validasi

Kolom wajib (urutan boleh berubah): `NAMA`, `ALAMAT_LENGKAP`, `JENIS_BANTUAN`, `STATUS`, `WILAYAH`, `RT`, `RW`. Kolom `NIK`, `NO`, dan `LINK_GPS` digunakan bila tersedia. Nama header dinormalisasi menjadi huruf besar dan di-trim. RT/RW dibaca sebagai teks sesuai format Excel. Isi tabel dan biodata dari Excel di-*escape* sebelum dimasukkan ke HTML.

**NIK sebaiknya diatur sebagai teks di Excel** untuk menjaga 16 digit dan angka nol di depan; Excel yang sebelumnya menyimpan NIK sebagai angka mungkin telah kehilangan presisi dan tidak dapat dipulihkan otomatis oleh aplikasi.

Link GPS yang diterima berupa alamat HTTP/HTTPS untuk host layanan peta Google, Waze, Bing Maps, atau OpenStreetMap (termasuk layanan tautan pendek peta tertentu). Link yang kosong/tidak valid tidak bisa dibuka.

## 4. Fitur tambahan/perbaikan dibanding prototipe awal

- Layar **login demo** + validasi kredensial di browser, pemberitahuan kesalahan, tombol tampil/sembunyikan kata sandi, sesi per tab 30 menit, batas percobaan singkat, dan **logout**.
- Menyembunyikan tampilan aplikasi sampai sesi login demo berhasil; data yang diunggah dibuang dengan reload setelah logout.
- **Ringkasan angka** total data, jumlah wilayah, status aktif, dan total hasil filter/pencarian.
- Memperbaiki indeks baris **halaman kedua dan seterusnya**, agar biodata yang dibuka sesuai penerima yang dipilih.
- Memperbaiki **slider Panduan** dan menghapus penggandaan handler halaman panduan.
- Memperbaiki elemen yang sebelumnya merujuk variabel tombol konfirmasi navigasi yang belum terdefinisi.
- Memperbaiki penyusunan opsi filter agar teks dari Excel tidak diperlakukan sebagai HTML.
- Memperbaiki pembersihan data lama pada berkas kosong/header tidak cocok, normalisasi nama kolom, dan penanganan kesalahan baca file.
- Memperbaiki pemrosesan file `.xlsx` dan menghapus pemanggilan fungsi input yang tidak terdefinisi.
- Meng-escape isi Excel di tabel, biodata, dan ringkasan filter, termasuk saat bahasa antarmuka diubah.
- Validasi tautan eksternal + pembukaan tab baru dengan `noopener,noreferrer`.
- Menyediakan contoh Excel berisi **60 baris data fiktif** yang dapat digunakan untuk menguji pagination, pencarian, filter, dan navigasi.

## 5. Batasan keamanan — wajib disampaikan dalam laporan

Proyek mengikuti arsitektur yang dinyatakan dalam proposal: **frontend-only, tanpa server dan database permanen**. Login dibuat **sebatas demonstrasi antarmuka/alur akses**. Pemeriksaan kata sandi (PBKDF2 menggunakan Web Crypto bawaan browser), data sesi di `sessionStorage`, dan batas percobaan **seluruhnya berlangsung di sisi klien**. Seseorang yang dapat membuka Developer Tools atau mengubah JavaScript dapat melewati kontrol tersebut. Penggunaan PBKDF2 di sini tidak mengubah fakta tersebut. Jadi:

- **Jangan unggah NIK, alamat, atau data pribadi penerima bantuan sungguhan** ke prototipe untuk demo publik.
- Tidak ada perlindungan autentikasi tingkat server, manajemen akun yang aman, otorisasi peran, audit trail, atau penyimpanan terenkripsi.
- Tidak ada sinkronisasi ke DTSEN/API pemerintah maupun database.
- Sesi tidak aman dari manipulasi browser dan tidak dapat dianggap sebagai kontrol akses produksi.
- Untuk produksi diperlukan server autentikasi dan otorisasi, pengamanan data dan kepatuhan UU Pelindungan Data Pribadi; **hal itu sengaja tidak ditambahkan** sesuai instruksi mempertahankan teknologi proyek.

**Rekomendasi akademik:** Karena proposal awal secara eksplisit menyebut belum ada login, dokumentasikan login demo sebagai *penyempurnaan ruang lingkup implementasi*, dengan penjelasan jujur tentang keterbatasan keamanan.

## 6. Berkas utama

- `index.html` — tampilan aplikasi dan formulir login.
- `css/style.css`, `css/dark-mode.css`, `css/auth.css` — tampilan asli + tambahan login/ringkasan.
- `js/main.js`, `js/data_visual.js`, `js/filter.js`, `js/modal.js`, `js/translation.js`, `js/dictionary.js` — logika aplikasi yang dipertahankan dan diperbaiki.
- `js/auth.js` — logika login demonstrasi berbasis JavaScript bawaan browser.
- `js/lib/xlsx.min.js` — SheetJS asli dari paket awal.
- `files/data_template.xlsx` — template awal.
- `files/contoh_data_dummy.xlsx` — data contoh fiktif untuk pengujian.
- `CATATAN_PENGUJIAN.md` — skenario pengujian dan cakupannya.

**Catatan:** Berkas duplikat `- Copy` dari paket awal tidak disertakan karena tidak dipakai. Tampilan tanggal tetap berfungsi memakai font cadangan standar browser.
