const express = require("express");
const cors = require("cors");
const db = require("./db"); // Mengimpor koneksi database

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Mengizinkan request dari origin lain
app.use(express.json());

// Route paling dasar, hanya untuk mengecek server hidup
app.get("/", (req, res) => {
    res.send("Selamat datang di API TokoKita!");
});

// GET /api/products -> Mengambil semua produk dari database
app.get("/api/products", (req, res) => {
    const data = db.prepare("SELECT * FROM produk").all();
    res.json({ status: "success", data });
});

// GET /api/products/:id -> Mengambil satu produk berdasarkan id dari database
app.get("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = db.prepare("SELECT * FROM produk WHERE id = ?").get(id);

    if (!item) {
        return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
    }

    res.json({ status: "success", data: item });
});

// POST /api/products -> Menyimpan produk baru ke database
app.post("/api/products", (req, res) => {
    const { nama, harga } = req.body;

    if (!nama || !harga || harga <= 0) {
        return res.status(400).json({ status: "error", message: "Nama dan harga wajib diisi" });
    }

    const hasil = db.prepare("INSERT INTO produk (nama, harga) VALUES (?, ?)").run(nama, harga);
    const produkBaru = { id: hasil.lastInsertRowid, nama, harga };

    res.status(201).json({ status: "success", data: produkBaru });
});

// PUT /api/products/:id -> Memperbarui produk di database
app.put("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nama, harga } = req.body;

    if (!nama || !harga || harga <= 0) {
        return res.status(400).json({ status: "error", message: "Nama dan harga wajib diisi" });
    }

    const hasil = db.prepare("UPDATE produk SET nama = ?, harga = ? WHERE id = ?").run(nama, harga, id);

    if (hasil.changes === 0) {
        return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
    }

    res.json({ status: "success", data: { id, nama, harga } });
});

// DELETE /api/products/:id -> Menghapus produk dari database
app.delete("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const hasil = db.prepare("DELETE FROM produk WHERE id = ?").run(id);

    if (hasil.changes === 0) {
        return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
    }

    res.json({ status: "success", message: `Produk id ${id} berhasil dihapus` });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});