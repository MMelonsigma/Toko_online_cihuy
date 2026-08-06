let jumlahkeranjang = 0;
const namaToko = "tokokita";

console.log(`Selamat Datang di ${namaToko}!`);
console.log(`Jumlah item di keranjang: ${jumlahkeranjang}`);

const tombolkeranjang = document.querySelector("#tombol-keranjang");
const tombolHamburger = document.querySelector("#tombol-hamburger");
const menuMobile = document.querySelector("#menu-mobile");

const semuaTombolTambah = document.querySelectorAll(".btn-tambah-keranjang");

console.log(tombolkeranjang);

tombolkeranjang.addEventListener("click", function () {
    console.log("Tombol Keranjang diklik!");
});

tombolkeranjang.addEventListener("click", () => {
    console.log("Tombol keranjang diklik (arrow function)!")
});

tombolHamburger.addEventListener("click", () => {
    menuMobile.classList.toggle("hidden");
});

const formProduk = document.querySelector("#form-produk");
// beri id "grid-katalog" pada <div grid> di Catalog UI
const gridkatalog = document.querySelector("#grid-katalog");
const pesanError  = document.querySelector("#pesan-error");

formProduk.addEventListener("submit", (event) => {
    event.preventDefault(); // mencegah form me-reload halaman

    const nama = document.querySelector("#input-nama").value.trim();
    const harga = document.querySelector("#input-harga").value;

    // Validasi sederhana
    if (nama === "" || harga === "" || Number(harga) <= 0) {
        pesanError.textContent = "Nama produk dan harga (lebih dari 0) wajib diisi.";
        pesanError.classList.remove("hidden");
        return; // hentikan proses jika tidak valid
    }
    pesanError.classList.add("hidden");

    // Membuat elemen kartu produk baru secara dinamis
    const kartuBaru = document.createElement("div");
    kartuBaru.className = "bg-white rounded-lg shadow hover:shadow-lg transition p-4";
    kartuBaru.innerHTML = `
     <div class="w-full h-48 bg-gray-100 rounded-1g mb-3 flex items-center justify-center text-gray-400 text-sm"> Belum ada gambar </div>
     <h4 class="font-semibold text-gray-800">${nama}</h4>
     <p class="text-blue-700 font-bold mt-1">Rp ${Number(harga).toLocaleString("id-ID")}</p>
     <button class="w-full bg-blue-700 text-white py-2 rounded-lg text-sm btn-tambah-keranjang"> Tambah ke keranjang </button>
     `;

    gridkatalog.appendChild(kartuBaru);
    formProduk.reset() //mengosongkan form setelah berhasil
});

let totalKeranjang = 0;
const labelKeranjang = document.querySelector("#tombol-keranjang");

gridkatalog.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-tambah-keranjang")) {
        totalKeranjang++;
        labelKeranjang.textContent = `Keranjang (${totalKeranjang})`;
    }
});