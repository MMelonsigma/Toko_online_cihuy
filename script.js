
// let digunakan untuk nilai yang bisa berubah
let jumlahKeranjang = 0;

// const digunakan untuk nilai yang tetap (tidak berubah)
const namaToko = "TokoKita";
const tombolKeranjang = document.querySelector("#tombol-keranjang");
const jumlahKeranjangElement = document.querySelector("#jumlah-keranjang");
const tombolHamburger = document.querySelector("#tombol-hamburger");
const menuMobile = document.querySelector("#menu-mobile");

const semuaTombolTambah = document.querySelectorAll(".btn-tambah-keranjang");

// Template literal: cara modern menggabungkan teks dan variabel
console.log(`Selamat datang di ${namaToko}!`);
console.log(`Jumlah item di keranjang: ${jumlahKeranjang}`);
console.log(`Tombol keranjang:`, tombolKeranjang);

tombolKeranjang.addEventListener("click", function () {
    console.log("Tombol keranjang diklik!");
});

// Bentuk modern menggunakan Arrow Function
tombolKeranjang.addEventListener("click", () => {
    console.log("Tombol keranjang diklik (arrow function)!");
});

tombolHamburger.addEventListener("click", () => {
    // toggle akan menambah class jika belum ada,
    // dan menghapusnya jika sudah ada
    menuMobile.classList.toggle("hidden");
});

const formProduk = document.querySelector("#form-produk");

// beri id "grid-katalog" pada <div grid> di Catalog UI
const gridKatalog = document.querySelector("#grid-katalog");
const pesanError = document.querySelector("#pesan-error");


let totalKeranjang = 0;
const labelKeranjang = document.querySelector("#tombol-keranjang");
 
gridKatalog.addEventListener("click", (event) => {
  // Cek apakah yang diklik adalah tombol tambah ke keranjang
  if (event.target.classList.contains("btn-tambah-keranjang")) {
    totalKeranjang++;
    labelKeranjang.textContent = `Keranjang (${totalKeranjang})`;
  }
}); 

const API_URL = "https://fluffy-fortnight-5v4r6xx977wgf4w47-3000.app.github.dev/api/products";
 
// Fungsi untuk menampilkan satu produk sebagai kartu HTML
function buatKartuProduk(item) {
  const kartu = document.createElement("div");
  kartu.className = "bg-white rounded-xl shadow hover:shadow-lg transition p-4";
  kartu.innerHTML = `
    <div class="w-full h-40 bg-gray-100 rounded-lg mb-3 flex items-center
                justify-center text-gray-400 text-sm">Belum ada gambar</div>
    <h4 class="font-semibold text-gray-800">${item.nama}</h4>
    <p class="text-blue-700 font-bold mt-1">Rp ${item.harga.toLocaleString("id-ID")}</p>
    <button class="w-full mt-3 bg-blue-700 text-white py-2 rounded-lg text-sm
                   btn-tambah-keranjang">Tambah ke Keranjang</button>
  `;
  return kartu;
}

// Fungsi untuk mengambil & menampilkan seluruh produk dari API
async function muatProduk() {
  gridKatalog.innerHTML = `<p class="text-gray-400 col-span-full">Memuat produk...</p>`;
 
  try {
    const response = await fetch(API_URL);
    const hasil = await response.json();
 
    gridKatalog.innerHTML = ""; // kosongkan pesan "Memuat produk..."
    hasil.data.forEach((item) => {
      gridKatalog.appendChild(buatKartuProduk(item));
    });
  } catch (error) {
    gridKatalog.innerHTML = `<p class="text-red-500 col-span-full">
      Gagal memuat produk. Pastikan server backend sedang berjalan.</p>`;
  }
}
 
// Panggil fungsi ini begitu halaman selesai dimuat
muatProduk();

formProduk.addEventListener("submit", async (event) => {
  event.preventDefault();
 
  const nama = document.querySelector("#input-nama").value.trim();
  const harga = Number(document.querySelector("#input-harga").value);
 
  if (nama === "" || harga <= 0) {
    pesanError.textContent = "Nama produk dan harga (lebih dari 0) wajib diisi.";
    pesanError.classList.remove("hidden");
    return;
  }
  pesanError.classList.add("hidden");
 
  // Mengirim data produk baru ke backend
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, harga }),
  });
 
  formProduk.reset();
  muatProduk(); // memuat ulang data terbaru dari database
});