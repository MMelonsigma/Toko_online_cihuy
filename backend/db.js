const Database = require("better-sqlite3");

// Membuat atau membuka file database bernama tokokita.db
const db = new Database("tokokita.db");

// Membuat tabel 'produk' jika belum ada
db.exec(`
  CREATE TABLE IF NOT EXISTS produk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    harga INTEGER NOT NULL
  )
`);

// Mengecek apakah tabel produk masih kosong
const jumlahProduk = db.prepare("SELECT COUNT(*) AS total FROM produk").get();

if (jumlahProduk.total === 0) {
  const tambahProduk = db.prepare(
    "INSERT INTO produk (nama, harga) VALUES (?, ?)"
  );

  // Memasukkan data awal produk
  tambahProduk.run("Kaos Tayo Premium", 89000);
  tambahProduk.run("Kaos Xodiac ori", 145000);
  tambahProduk.run("Sepatu mcdonald bts original", 800000);
  tambahProduk.run("Rambut kuntilanak asli", 1200000);

  console.log("Data awal produk berhasil dimasukkan ke database.");
}

// Uji coba sementara: menampilkan semua data produk di console
const semuaProduk = db.prepare("SELECT * FROM produk").all();
console.log("Daftar Produk:", semuaProduk);

// Export koneksi database agar dapat digunakan di file lain
module.exports = db;