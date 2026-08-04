// 1. Ambil elemen-elemen yang dibutuhkan
const tombolHamburger = document.querySelector("#tombol-hamburger");
const menuMobile = document.querySelector("#menu-mobile");
const formProduk = document.querySelector("#form-produk");
const gridKatalog = document.querySelector("#grid-katalog");
const pesanError = document.querySelector("#pesan-error");
const labelKeranjang = document.querySelector("#tombol-keranjang");

let totalKeranjang = 0;

// 2. Fungsi Tombol Hamburger (Menu Mobile)
if (tombolHamburger && menuMobile) {
    tombolHamburger.addEventListener("click", () => {
        menuMobile.classList.toggle("hidden");
    });
}

// 3. Event Listener untuk Form Tambah Produk Baru
formProduk.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah form me-reload halaman

    const nama = document.querySelector("#input-nama").value.trim();
    const harga = document.querySelector("#input-harga").value;

    // Validasi sederhana
    if (nama === "" || harga === "" || Number(harga) <= 0) {
        pesanError.textContent = "Nama produk dan harga (lebih dari 0) wajib diisi.";
        pesanError.classList.remove("hidden");
        return; // Hentikan proses jika tidak valid
    }

    pesanError.classList.add("hidden");

    // Membuat elemen kartu produk baru secara dinamis menggunakan createElement
    const kartuBaru = document.createElement("div");
    kartuBaru.className = "bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between";

    kartuBaru.innerHTML = `
        <div>
            <div class="w-full h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-sm">Belum ada gambar</div>
            <h4 class="font-semibold text-gray-800">${nama}</h4>
            <p class="text-blue-700 font-bold mt-1">Rp ${Number(harga).toLocaleString("id-ID")}</p>
        </div>
        <button class="w-full mt-3 bg-blue-700 text-white py-2 rounded-lg text-sm hover:bg-blue-800 transition btn-tambah-keranjang">Tambah ke Keranjang</button>
    `;

    // Masukkan kartu produk baru ke dalam grid katalog
    gridKatalog.appendChild(kartuBaru);

    // Mengosongkan form setelah berhasil
    formProduk.reset();
});

// 4. Event Delegation untuk Tombol "Tambah ke Keranjang"
// Dipasang pada elemen induk (gridKatalog) agar produk statis maupun dinamis (baru) bisa berfungsi
gridKatalog.addEventListener("click", (event) => {
    // Cek apakah yang diklik adalah elemen dengan class "btn-tambah-keranjang"
    if (event.target.classList.contains("btn-tambah-keranjang")) {
        totalKeranjang++;
        labelKeranjang.textContent = `Keranjang (${totalKeranjang})`;
    }
});

// 5. Informasi saat tombol keranjang di header diklik
if (labelKeranjang) {
    labelKeranjang.addEventListener("click", () => {
        alert(`Total item di keranjang: ${totalKeranjang}`);
    });
}