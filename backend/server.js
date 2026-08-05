// Mengimpor library express
const express = require("express");

// Membuat instance aplikasi Express
const app = express();
const PORT = 3000;

// Middleware untuk memparsing body bertipe JSON
app.use(express.json());

// Middleware penanganan error untuk format JSON yang tidak valid (misal salah ketik tanda kurung/kutip)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "Format JSON yang dikirimkan tidak valid!",
    });
  }
  next();
});

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
  res.json({
    status: "success",
    message: "pong",
    waktuServer: new Date().toISOString(),
  });
});

// GET /api/products -> Mengambil semua produk
app.get("/api/products", (req, res) => {
  res.json({
    status: "success",
    jumlahData: produk.length,
    data: produk,
  });
});

// GET /api/products/:id -> Mengambil satu produk berdasarkan id
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "ID produk harus berupa angka" });
  }

  const item = produk.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ status: "error", message: `Produk dengan ID ${id} tidak ditemukan` });
  }

  res.json({ status: "success", data: item });
});

// POST /api/products -> Menambah produk baru
app.post("/api/products", (req, res) => {
  const { nama, harga } = req.body;

  // Validasi input
  if (!nama || typeof nama !== "string" || nama.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "Nama produk wajib diisi dan harus berupa teks",
    });
  }

  if (harga === undefined || isNaN(Number(harga)) || Number(harga) <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Harga wajib diisi dan harus berupa angka lebih besar dari 0",
    });
  }

  const produkBaru = {
    id: idBerikutnya++,
    nama: nama.trim(),
    harga: Number(harga),
  };

  produk.push(produkBaru);

  res.status(201).json({
    status: "success",
    message: "Produk berhasil ditambahkan",
    data: produkBaru,
  });
});

// PUT /api/products/:id -> Memperbarui produk berdasarkan id
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "ID produk harus berupa angka" });
  }

  const { nama, harga } = req.body;
  const item = produk.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ status: "error", message: `Produk dengan ID ${id} tidak ditemukan` });
  }

  if (!nama || typeof nama !== "string" || nama.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "Nama produk wajib diisi dan harus berupa teks",
    });
  }

  if (harga === undefined || isNaN(Number(harga)) || Number(harga) <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Harga wajib diisi dan harus berupa angka lebih besar dari 0",
    });
  }

  item.nama = nama.trim();
  item.harga = Number(harga);

  res.json({
    status: "success",
    message: `Produk dengan ID ${id} berhasil diperbarui`,
    data: item,
  });
});

// DELETE /api/products/:id -> Menghapus produk berdasarkan id
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "ID produk harus berupa angka" });
  }

  const index = produk.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: `Produk dengan ID ${id} tidak ditemukan` });
  }

  // Menghapus data dari array menggunakan splice
  const produkDihapus = produk.splice(index, 1);

  res.json({
    status: "success",
    message: `Produk id ${id} berhasil dihapus`,
    data: produkDihapus[0],
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan mulus di http://localhost:${PORT}`);
});