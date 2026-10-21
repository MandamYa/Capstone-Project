# Catatan Pengujian Sistem NASI-BARAS v1.1.0

## Lingkup

Pengujian interaktif dilakukan terhadap kode HTML/CSS/JavaScript proyek dengan Chromium terotomasi dalam lingkungan sandbox (resource CSS/JavaScript diinjeksi langsung karena navigasi URL/file diblokir oleh lingkungan ini). **Web Crypto untuk login disimulasikan di pengujian browser**, sedangkan kecocokan hash PBKDF2 diverifikasi terpisah. Dengan demikian, hasil ini merupakan pengujian fungsional sebagian, **bukan audit keamanan atau UAT lapangan**. Uji manual terakhir di Chrome/Edge pada komputer mahasiswa tetap diperlukan.

| No. | Skenario | Hasil |
| --- | --- | --- |
| 1 | Halaman awal terkunci sebelum masuk | Sesuai |
| 2 | Nama pengguna benar, kata sandi salah | Pesan penolakan tampil |
| 3 | Akun demo benar | Halaman aplikasi muncul (Web Crypto disimulasikan pada sandbox) |
| 4 | Unggah `contoh_data_dummy.xlsx` | 60 baris dibaca; 2 wilayah |
| 5 | Unggah file dengan 60 baris data uji | Tampil 25 baris/halaman dan 3 halaman |
| 6 | Buka baris ke-3 pada halaman ke-2 | Biodata **Penerima 28**, sesuai |
| 7 | Cari nama unik | Menampilkan tepat satu baris |
| 8 | Filter Wilayah → RW | Menampilkan jumlah hasil sesuai kriteria |
| 9 | Reset filter | Menampilkan total 60 data lagi |
| 10 | Buka dan batalkan konfirmasi Navigasi | Dialog dan modal biodata berjalan |
| 11 | Ganti slide panduan | Maju satu slide (1/6 → 2/6) |
| 12 | Sel berisi teks HTML berbahaya | Ditampilkan sebagai teks biasa, bukan elemen HTML |
| 13 | JavaScript browser selama skenario di atas | Tidak ada error JavaScript |
| 14 | Tombol logout | Menjalankan penghapusan sesi dan reload; penguncian ulang pada reload perlu diperiksa di browser normal (sandbox kembali ke `about:blank`) |

## Daftar cek pengujian manual terakhir

- [ ] Buka `index.html` dengan Chrome/Edge; coba login salah dan benar (Web Crypto asli).
- [ ] Reload setelah login dan periksa sesi demo selama belum kedaluwarsa.
- [ ] Klik **Keluar**; pastikan kembali ke halaman login dan data yang diunggah hilang.
- [ ] Uji fitur upload, template, data dummy, pencarian, filter, biodata, dan navigasi Google Maps.
- [ ] Uji mode gelap/terang serta menu bahasa pada desktop dan ponsel.
- [ ] Uji Excel kosong, kolom wajib hilang, file non-XLSX, dan ukuran >15 MB.
- [ ] Ambil screenshot halaman login, impor, hasil pencarian/filter, modal biodata, dan navigasi untuk laporan akhir/poster.

## Catatan laporan akhir

Perbaikan ini menambah login demo dan ringkasan visualisasi tanpa mengganti stack teknologi. Jelaskan penambahan login sebagai perubahan dari batasan proposal awal, sekaligus sebutkan bahwa **login sisi klien tidak melindungi data pribadi untuk penggunaan produksi**.
