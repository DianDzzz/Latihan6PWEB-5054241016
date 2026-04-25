// ========================================
// Main JavaScript untuk Sistem Registrasi
// & Pencarian Kode Pos
// ========================================

// ========== DATA INTERNAL ==========
// Data nama mahasiswa untuk autocomplete
const namaMahasiswaList = [
	"Muhammad",
	"Muhammad Hadidan",
	"Muhammad Hadidan Nurhaunan",
	"Ahmad",
	"Ahmadoni",
	"Siti",
	"Siti Nur Azizah",
	"Budi",
	"Budiman",
	"Rina",
	"Rinaldo",
	"Dian",
	"Diana",
	"Evan",
	"Evandro",
	"Fahri",
	"Fahrian",
	"Gita",
	"Gitara",
	"Handi",
	"Handika"
];

// Data Provinsi, Kota, Kecamatan, dan Kode Pos
const dataWilayah = {
	"Jawa Timur": {
		"Surabaya": {
			"Gubeng": "60281",
			"Wonokromo": "60243",
			"Suko Manunggal": "60186",
			"Genteng": "60271",
			"Bubutan": "60178"
		},
		"Sidoarjo": {
			"Gedangan": "61254",
			"Waru": "61252",
			"Sedati": "61253",
			"Tanggulangin": "61272",
			"Krembilang": "61271"
		},
		"Gresik": {
			"Gresik": "61111",
			"Batu": "61141",
			"Suko": "61123",
			"Manyar": "61178",
			"Ujung": "61182"
		}
	},
	"Jawa Tengah": {
		"Semarang": {
			"Semarang Barat": "50141",
			"Semarang Timur": "50151",
			"Semarang Utara": "50171",
			"Gajahmungkur": "50131",
			"Candisari": "50191"
		},
		"Yogyakarta": {
			"Jetis": "55231",
			"Kraton": "55221",
			"Pakualaman": "55211",
			"Gondomanan": "55241",
			"Wirobrajan": "55251"
		},
		"Solo": {
			"Laweyan": "57141",
			"Serengan": "57131",
			"Pasar Kliwon": "57121",
			"Jebres": "57111",
			"Banjarsari": "57151"
		}
	},
	"Jawa Barat": {
		"Bandung": {
			"Bandung Wetan": "40135",
			"Bandung Kulon": "40112",
			"Bandung Kidul": "40171",
			"Rancasari": "40291",
			"Cicendo": "40231"
		},
		"Bogor": {
			"Bogor Selatan": "16810",
			"Bogor Utara": "16151",
			"Bogor Tengah": "16131",
			"Tanah Sareal": "16166",
			"Paledang": "16161"
		},
		"Bekasi": {
			"Bekasi Barat": "17121",
			"Bekasi Timur": "17111",
			"Bekasi Selatan": "17145",
			"Rawa Terate": "17114",
			"Rawalumbu": "17116"
		}
	}
};

// ========== ELEMEN DOM ==========
// Halaman
const registrationPage = document.getElementById("registrationPage");
const dashboardPage = document.getElementById("dashboardPage");

// Form Registrasi
const registrationForm = document.getElementById("registrationForm");
const namaMahasiswaInput = document.getElementById("namaMahasiswa");
const namaSuggestionsContainer = document.getElementById("namaSuggestions");
const nimInput = document.getElementById("nim");
const mataKuliahSelect = document.getElementById("mataKuliah");
const dosenSelect = document.getElementById("dosen");

// Form Pencarian Kode Pos
const provinsiSelect = document.getElementById("provinsi");
const kotaSelect = document.getElementById("kota");
const kecamatanSelect = document.getElementById("kecamatan");
const cariBtn = document.getElementById("cariBtn");
const resetSearchBtn = document.getElementById("resetSearchBtn");
const searchResultContainer = document.getElementById("searchResultContainer");
const searchResult = document.getElementById("searchResult");

// Info Pengguna
const userNameDisplay = document.getElementById("userNameDisplay");
const userNimDisplay = document.getElementById("userNimDisplay");
const userMataKuliahDisplay = document.getElementById("userMataKuliahDisplay");
const userDosenDisplay = document.getElementById("userDosenDisplay");

// Tombol Logout
const logoutBtn = document.getElementById("logoutBtn");

// ========== FUNGSI UTAMA ==========

// Inisialisasi aplikasi
function initApp() {
	populateProvinsiDropdown();
	attachEventListeners();
	checkIfUserLoggedIn();
}

// Periksa apakah user sudah login (ada data di localStorage)
function checkIfUserLoggedIn() {
	const userData = localStorage.getItem("userData");
	if (userData) {
		const data = JSON.parse(userData);
		showDashboard(data);
	}
}

// Attach event listeners
function attachEventListeners() {
	// Registrasi form
	registrationForm.addEventListener("submit", handleRegistrationSubmit);
	namaMahasiswaInput.addEventListener("input", handleNamaAutocomplete);
	namaMahasiswaInput.addEventListener("focus", () => {
		if (namaMahasiswaInput.value.length > 0) {
			namaSuggestionsContainer.classList.add("active");
		}
	});
	document.addEventListener("click", handleClickOutsideAutocomplete);

	// Dropdown pencarian
	provinsiSelect.addEventListener("change", handleProvinsiChange);
	kotaSelect.addEventListener("change", handleKotaChange);

	// Tombol pencarian
	cariBtn.addEventListener("click", handleSearchKodePos);
	resetSearchBtn.addEventListener("click", handleResetSearch);

	// Logout
	logoutBtn.addEventListener("click", handleLogout);
}

// ========== FUNGSI AUTOCOMPLETE ==========

// Handle input autocomplete nama
function handleNamaAutocomplete(event) {
	const inputValue = event.target.value.toLowerCase().trim();

	if (inputValue.length === 0) {
		namaSuggestionsContainer.classList.remove("active");
		return;
	}

	// Filter nama yang cocok
	const filteredNames = namaMahasiswaList.filter(nama =>
		nama.toLowerCase().includes(inputValue)
	);

	// Tampilkan saran
	if (filteredNames.length > 0) {
		displaySuggestions(filteredNames);
	} else {
		namaSuggestionsContainer.classList.remove("active");
	}
}

// Tampilkan saran nama
function displaySuggestions(suggestions) {
	namaSuggestionsContainer.innerHTML = "";

	suggestions.forEach(suggestion => {
		const suggestionItem = document.createElement("div");
		suggestionItem.className = "suggestion-item";
		suggestionItem.textContent = suggestion;

		suggestionItem.addEventListener("click", () => {
			namaMahasiswaInput.value = suggestion;
			namaSuggestionsContainer.classList.remove("active");
		});

		namaSuggestionsContainer.appendChild(suggestionItem);
	});

	namaSuggestionsContainer.classList.add("active");
}

// Tutup autocomplete saat klik di luar
function handleClickOutsideAutocomplete(event) {
	if (event.target !== namaMahasiswaInput && event.target !== namaSuggestionsContainer) {
		namaSuggestionsContainer.classList.remove("active");
	}
}

// ========== FUNGSI VALIDASI ==========

// Validasi form registrasi
function validateRegistrationForm() {
	const nama = namaMahasiswaInput.value.trim();
	const nim = nimInput.value.trim();
	const mataKuliah = mataKuliahSelect.value;
	const dosen = dosenSelect.value;

	let isValid = true;

	// Clear previous errors
	clearErrorMessages();

	// Validasi Nama
	if (nama.length === 0) {
		showErrorMessage("namaError", "Nama tidak boleh kosong");
		isValid = false;
	} else if (nama.length < 3) {
		showErrorMessage("namaError", "Nama minimal 3 karakter");
		isValid = false;
	}

	// Validasi NIM
	if (nim.length === 0) {
		showErrorMessage("nimError", "NIM tidak boleh kosong");
		isValid = false;
	} else if (!/^\d{10}$/.test(nim)) {
		showErrorMessage("nimError", "NIM harus 10 digit angka");
		isValid = false;
	}

	// Validasi Mata Kuliah
	if (mataKuliah.length === 0) {
		showErrorMessage("mataKuliahError", "Pilih mata kuliah terlebih dahulu");
		isValid = false;
	}

	// Validasi Dosen
	if (dosen.length === 0) {
		showErrorMessage("dosenError", "Pilih dosen terlebih dahulu");
		isValid = false;
	}

	return isValid;
}

// Tampilkan pesan error
function showErrorMessage(elementId, message) {
	const errorElement = document.getElementById(elementId);
	errorElement.textContent = message;
	errorElement.classList.add("show");
}

// Clear semua error message
function clearErrorMessages() {
	const errorElements = document.querySelectorAll(".error-message");
	errorElements.forEach(element => {
		element.textContent = "";
		element.classList.remove("show");
	});
}

// ========== FUNGSI REGISTRASI & LOGIN ==========

// Handle form registrasi submit
function handleRegistrationSubmit(event) {
	event.preventDefault();

	if (!validateRegistrationForm()) {
		return;
	}

	// Ambil data
	const userData = {
		nama: namaMahasiswaInput.value.trim(),
		nim: nimInput.value.trim(),
		mataKuliah: mataKuliahSelect.value,
		dosen: dosenSelect.value
	};

	// Simpan ke localStorage
	localStorage.setItem("userData", JSON.stringify(userData));

	// Tampilkan dashboard
	showDashboard(userData);
}

// Tampilkan dashboard
function showDashboard(userData) {
	registrationPage.classList.add("hidden");
	dashboardPage.classList.remove("hidden");

	// Isi info pengguna
	userNameDisplay.textContent = userData.nama;
	userNimDisplay.textContent = userData.nim;
	userMataKuliahDisplay.textContent = userData.mataKuliah;
	userDosenDisplay.textContent = userData.dosen;
}

// Handle logout
function handleLogout() {
	if (confirm("Apakah Anda yakin ingin logout?")) {
		localStorage.removeItem("userData");
		dashboardPage.classList.add("hidden");
		registrationPage.classList.remove("hidden");
		registrationForm.reset();
		clearErrorMessages();
		resetSearch();
	}
}

// ========== FUNGSI DROPDOWN DINAMIS ==========
// ===== KOMENTAR: BAGIAN LOGIKA DROPDOWN DINAMIS =====
// 
// Sistem dropdown dinamis bekerja dengan cara:
// 1. Provinsi adalah dropdown pertama yang diisi langsung dari data object
// 2. Ketika user memilih Provinsi, event listener memanggil handleProvinsiChange()
// 3. handleProvinsiChange() mengambil kota-kota dari data[provinsi] dan mengisi dropdown Kota
// 4. Dropdown Kota di-enable dan reset ke opsi pertama
// 5. Ketika user memilih Kota, handleKotaChange() mengambil kecamatan dari data[provinsi][kota]
// 6. Dropdown Kecamatan di-enable dan diisi dengan daftar kecamatan
// 7. Setelah semua dipilih, handleSearchKodePos() mencari kode pos dari data
//
// Keuntungan: Tidak perlu request ke server, data sudah lokal, dan dropdown selalu relevan

// Isi dropdown Provinsi
function populateProvinsiDropdown() {
	const provinces = Object.keys(dataWilayah);

	provinces.forEach(province => {
		const option = document.createElement("option");
		option.value = province;
		option.textContent = province;
		provinsiSelect.appendChild(option);
	});
}

// Handle perubahan Provinsi (mengisi dropdown Kota)
function handleProvinsiChange(event) {
	const selectedProvinsi = event.target.value;

	// Reset dropdown Kota dan Kecamatan
	kotaSelect.innerHTML = '<option value="">-- Pilih Kota/Kabupaten --</option>';
	kecamatanSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
	kotaSelect.disabled = true;
	kecamatanSelect.disabled = true;
	searchResultContainer.classList.add("hidden");

	if (selectedProvinsi.length === 0) {
		return;
	}

	// Ambil kota-kota dari provinsi yang dipilih
	const cities = Object.keys(dataWilayah[selectedProvinsi]);

	// Isi dropdown Kota dengan kota-kota dari provinsi
	cities.forEach(city => {
		const option = document.createElement("option");
		option.value = city;
		option.textContent = city;
		kotaSelect.appendChild(option);
	});

	// Enable dropdown Kota
	kotaSelect.disabled = false;
}

// Handle perubahan Kota (mengisi dropdown Kecamatan)
function handleKotaChange(event) {
	const selectedProvinsi = provinsiSelect.value;
	const selectedKota = event.target.value;

	// Reset dropdown Kecamatan
	kecamatanSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
	kecamatanSelect.disabled = true;
	searchResultContainer.classList.add("hidden");

	if (selectedKota.length === 0) {
		return;
	}

	// Ambil kecamatan dari kota yang dipilih
	const subdistricts = Object.keys(dataWilayah[selectedProvinsi][selectedKota]);

	// Isi dropdown Kecamatan dengan kecamatan
	subdistricts.forEach(subdistrict => {
		const option = document.createElement("option");
		option.value = subdistrict;
		option.textContent = subdistrict;
		kecamatanSelect.appendChild(option);
	});

	// Enable dropdown Kecamatan
	kecamatanSelect.disabled = false;
}

// ========== FUNGSI PENCARIAN KODE POS ==========

// Validasi form pencarian
function validateSearchForm() {
	const provinsi = provinsiSelect.value;
	const kota = kotaSelect.value;
	const kecamatan = kecamatanSelect.value;

	let isValid = true;

	clearSearchErrorMessages();

	if (provinsi.length === 0) {
		showErrorMessage("provinsiError", "Pilih provinsi terlebih dahulu");
		isValid = false;
	}

	if (kota.length === 0) {
		showErrorMessage("kotaError", "Pilih kota/kabupaten terlebih dahulu");
		isValid = false;
	}

	if (kecamatan.length === 0) {
		showErrorMessage("kecamatanError", "Pilih kecamatan terlebih dahulu");
		isValid = false;
	}

	return isValid;
}

// Clear error messages di search form
function clearSearchErrorMessages() {
	const errorElements = document.querySelectorAll("#provinsiError, #kotaError, #kecamatanError");
	errorElements.forEach(element => {
		element.textContent = "";
		element.classList.remove("show");
	});
}

// Handle tombol Cari Kode Pos
function handleSearchKodePos() {
	if (!validateSearchForm()) {
		return;
	}

	const selectedProvinsi = provinsiSelect.value;
	const selectedKota = kotaSelect.value;
	const selectedKecamatan = kecamatanSelect.value;

	// Ambil kode pos dari data
	const kodePos = dataWilayah[selectedProvinsi][selectedKota][selectedKecamatan];

	// Tampilkan hasil
	displaySearchResult(selectedProvinsi, selectedKota, selectedKecamatan, kodePos);
}

// Tampilkan hasil pencarian
function displaySearchResult(provinsi, kota, kecamatan, kodePos) {
	searchResult.innerHTML = `
		<div class="result-title">✓ Hasil Pencarian Kode Pos</div>
		<div class="result-content">
			<div class="result-item">
				<div class="result-label">Provinsi</div>
				<div class="result-value">${provinsi}</div>
			</div>
			<div class="result-item">
				<div class="result-label">Kota/Kabupaten</div>
				<div class="result-value">${kota}</div>
			</div>
			<div class="result-item">
				<div class="result-label">Kecamatan</div>
				<div class="result-value">${kecamatan}</div>
			</div>
			<div class="result-large">
				<div class="result-label">Kode Pos</div>
				<div class="result-value">${kodePos}</div>
			</div>
		</div>
	`;

	searchResultContainer.classList.remove("hidden");

	// Scroll ke hasil
	searchResultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Handle tombol Reset
function handleResetSearch() {
	resetSearch();
}

// Reset form pencarian
function resetSearch() {
	provinsiSelect.value = "";
	kotaSelect.value = "";
	kecamatanSelect.value = "";
	kotaSelect.disabled = true;
	kecamatanSelect.disabled = true;
	searchResultContainer.classList.add("hidden");
	clearSearchErrorMessages();
}

// ========== JALANKAN INISIALISASI ==========
document.addEventListener("DOMContentLoaded", initApp);
