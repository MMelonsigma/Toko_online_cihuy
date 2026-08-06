const Database = require("better-sqlite3");

// Membuka atau membuat database
const db = new Database("tokokita.db");

// Membuat tabel jika belum ada
db.exec(`
  CREATE TABLE IF NOT EXISTS produk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    harga INTEGER NOT NULL CHECK (harga > 0)
  );
`);

// Mengecek apakah tabel masih kosong
const { total } = db
  .prepare("SELECT COUNT(*) AS total FROM produk")
  .get();

// Mengisi data awal jika tabel kosong
if (total === 0) {
  const insert = db.prepare(
    "INSERT INTO produk (nama, harga) VALUES (?, ?)"
  );

  const tambahSemua = db.transaction(() => {
    insert.run("Kaos Tayo Premium", 89000);
    insert.run("Kaos Xodiac ori", 145000);
    insert.run("Sepatu McDonald BTS Original", 800000);
    insert.run("Rambut Kuntilanak Asli", 1200000);
  });

  tambahSemua();

  console.log("Data awal berhasil dimasukkan.");
}

// Menampilkan isi database (opsional, hanya untuk pengecekan)
const semuaProduk = db.prepare("SELECT * FROM produk").all();
console.table(semuaProduk);

// Export database
module.exports = db;
