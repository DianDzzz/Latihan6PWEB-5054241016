# Sistem Registrasi Mahasiswa & Pencarian Kode Pos
## Latihan6PWEB-5054241016

Aplikasi web untuk registrasi mahasiswa dengan fitur pencarian kode pos dinamis menggunakan Vanilla JavaScript, HTML5, dan CSS3.

## Fitur Utama

### 1. Halaman Registrasi (Landing Page)
- Form input: Nama Mahasiswa, NIM, Mata Kuliah, dan Dosen
- **Fitur Autocomplete**: Saran nama otomatis saat user mengetik
- **LocalStorage**: Data registrasi disimpan untuk simulasi login
- Validasi input dengan pesan error yang informatif

### 2. Dashboard Pencarian Kode Pos
- Tampilkan informasi pengguna yang telah login
- **Dropdown Dinamis 3 Tingkat**:
  - Provinsi (dropdown pertama)
  - Kota/Kabupaten (bergantung pada provinsi yang dipilih)
  - Kecamatan (bergantung pada kota yang dipilih)
- Logika otomatis: ketika provinsi dipilih, dropdown kota hanya menampilkan daerah di provinsi tersebut
- Output detail dengan Kode Pos yang ditampilkan secara menonjol
- Tombol Logout untuk keluar dari aplikasi

## Struktur File

```
Latihan6PWEB-5054241016/
├── index.html       # Struktur HTML (halaman registrasi & dashboard)
├── style.css        # Styling responsif
├── main.js          # Logika JavaScript (autocomplete, dropdown, validasi, localStorage)
├── README.md        # Dokumentasi ini
└── .git/            # Git repository
```

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Desain responsif dan styling modern
- **Vanilla JavaScript**: Logika tanpa framework eksternal
- **LocalStorage API**: Penyimpanan data lokal
- **JSON**: Data internal untuk simulasi

## Cara Penggunaan

1. Buka file `index.html` di browser
2. **Halaman Registrasi**:
   - Isi Nama (dengan autocomplete yang membantu)
   - Isi NIM (10 digit)
   - Pilih Mata Kuliah
   - Pilih Dosen
   - Klik tombol "Daftar & Masuk"
3. **Dashboard Pencarian**:
   - Pilih Provinsi dari dropdown
   - Dropdown Kota akan terisi otomatis dengan daerah di provinsi tersebut
   - Pilih Kota/Kabupaten
   - Dropdown Kecamatan akan terisi otomatis
   - Pilih Kecamatan
   - Klik "Cari Kode Pos" untuk melihat hasilnya
   - Data akan disimpan di localStorage dan bisa diakses lagi saat refresh page

## Fitur Validasi

- **Nama**: Tidak boleh kosong, minimal 3 karakter
- **NIM**: Tidak boleh kosong, harus 10 digit angka
- **Mata Kuliah**: Harus dipilih
- **Dosen**: Harus dipilih
- **Form Pencarian**: Semua dropdown harus diisi sebelum mencari

## Data Sampel

### Provinsi & Kota yang Tersedia:
- **Jawa Timur**: Surabaya, Sidoarjo, Gresik
- **Jawa Tengah**: Semarang, Yogyakarta, Solo
- **Jawa Barat**: Bandung, Bogor, Bekasi

Setiap kota memiliki beberapa kecamatan dengan kode pos yang berbeda.

## Konvensi Kode

- **Penamaan Variabel**: camelCase (e.g., `namaMahasiswa`, `kotaSelect`)
- **Penamaan Fungsi**: camelCase dengan prefix handle untuk event handler (e.g., `handleProvinsiChange`)
- **Indentasi**: 4 spasi/tab untuk konsistensi
- **Komentar**: Bahasa Indonesia untuk penjelasan logika
- **Struktur**: Modular dengan pemisahan concern yang jelas

## Penjelasan Logika Dropdown Dinamis

Sistem dropdown dinamis diimplementasikan dengan:

1. Data tersimpan dalam struktur object: `dataWilayah[provinsi][kota][kecamatan]`
2. Ketika Provinsi berubah → hapus opsi Kota yang lama, isi dengan kota baru
3. Ketika Kota berubah → hapus opsi Kecamatan yang lama, isi dengan kecamatan baru
4. Dropdown di-disable sampai provinsi/kota dipilih untuk mencegah error
5. Validasi memastikan semua dropdown terisi sebelum pencarian

**Keuntungan**: Tidak membutuhkan backend, semua data lokal, dan responsif.

## Browser Kompatibilitas

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Fitur Responsif

- Mobile-first design
- Breakpoint untuk tablet (768px) dan mobile (480px)
- Dropdown dan form menyesuaikan dengan ukuran layar

## Author

Muhammad Hadidan Nurhaunan (5054241016)
Mata Kuliah: Pemrograman Web
Dosen: Dr. Ir. Supratman Andi Agtianto

## Lisensi

© 2026 - Tugas Pemrograman Web Semester 4
