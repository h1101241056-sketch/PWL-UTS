// =======================
// DATA (sementara in-memory)
// =======================
let mahasiswa = [
  { id: 1, nama: "Budi", nim: "12345" },
];

// =======================
// GET ALL
// =======================
export const getAll = () => {
  return mahasiswa;
};

// =======================
// GET BY ID
// =======================
export const getById = (id) => {
  return mahasiswa.find((m) => m.id == id);
};

// =======================
// CREATE
// =======================
export const create = (data) => {
  const newData = {
    id: Date.now(), // unik sederhana
    nama: data.nama,
    nim: data.nim,
  };

  mahasiswa.push(newData);
  return newData;
};

// =======================
// UPDATE
// =======================
export const update = (id, data) => {
  let updated = false;

  mahasiswa = mahasiswa.map((m) => {
    if (m.id == id) {
      updated = true;
      return {
        ...m,
        nama: data.nama,
        nim: data.nim,
      };
    }
    return m;
  });

  return updated; // untuk validasi
};

// =======================
// DELETE
// =======================
export const remove = (id) => {
  const before = mahasiswa.length;

  mahasiswa = mahasiswa.filter((m) => m.id != id);

  return mahasiswa.length < before; // true kalau berhasil hapus
};