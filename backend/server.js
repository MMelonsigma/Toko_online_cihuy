// Mengimpor library express yang sudah diinstal
const express = require("express");

// Membuat instance aplikasi Express
const app = express();
const PORT = 3000;

// Middleware bawaan agar Express bisa membaca JSON dari request
app.use(express.json());

// Data sementara di memori
let produk = [
  { id: 1, nama: "Kaos Tayo Premium", harga: 89000 },
  { id: 2, nama: "Kaos Xodiac ori", harga: 145000 },
  { id: 3, nama: "Sepatu mcdonald bts original", harga: 800000 },
  { id: 4, nama: "Rambut kuntilanak asli", harga: 1200000 },
];

// Variabel penghitung id agar produk baru selalu punya id unik
let idBerikutnya = 5;

// Route paling dasar, hanya untuk mengecek server hidup
app.get("/", (req, res) => {
  res.send("Selamat datang di API TokoKita!");
});

// Route untuk mengecek status ping server
app.get("/api/ping", (req, res) => {
  // res.json() otomatis mengubah objek JavaScript menjadi format JSON
  res.json({
    status: "success",
    message: "pong",
    waktuServer: new Date().toISOString(),
  });
});

// GET /api/products -> Mengambil semua produk
app.get("/api/products", (req, res) => {
  res.json({ status: "success", data: produk });
});

// GET /api/products/:id -> Mengambil satu produk berdasarkan id
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = produk.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }

  res.json({ status: "success", data: item });
});

// POST /api/products -> Menambah produk baru
app.post("/api/products", (req, res) => {
  const { nama, harga } = req.body;

  // Validasi sederhana di sisi backend
  if (!nama || !harga || harga <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Nama dan harga (lebih dari 0) wajib diisi",
    });
  }

  const produkBaru = { id: idBerikutnya++, nama, harga };
  produk.push(produkBaru);

  res.status(201).json({ status: "success", data: produkBaru });
});

// PUT /api/products/:id -> Memperbarui produk berdasarkan id
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nama, harga } = req.body;
  const item = produk.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }

  if (!nama || !harga || harga <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Nama dan harga (lebih dari 0) wajib diisi",
    });
  }

  item.nama = nama;
  item.harga = harga;

  res.json({ status: "success", data: item });
});

// DELETE /api/products/:id -> Menghapus produk berdasarkan id
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const adaProduk = produk.some((p) => p.id === id);

  if (!adaProduk) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }

  produk = produk.filter((p) => p.id !== id);

  res.json({ status: "success", message: `Produk id ${id} berhasil dihapus` });
});

// Menjalankan server dan mendengarkan di PORT yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});