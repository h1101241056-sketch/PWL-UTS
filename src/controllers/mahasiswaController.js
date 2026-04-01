import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";

// =======================
// LIST DATA
// =======================
export const index = async (c) => {
  try {
    const data = model.getAll();

    const success = c.req.query("success");
    const error = c.req.query("error");

    return c.html(
      await render(
        "mahasiswa/index",
        {
          title: "Data Mahasiswa",
          mahasiswa: data,
          success,
          error,
        },
        c
      )
    );
  } catch (error) {
    console.error("Index Error:", error);
    return c.text("Terjadi kesalahan saat mengambil data", 500);
  }
};

// =======================
// FORM CREATE
// =======================
export const createForm = async (c) => {
  try {
    return c.html(
      await render(
        "mahasiswa/create",
        {
          title: "Tambah",
        },
        c
      )
    );
  } catch (error) {
    console.error("Create Form Error:", error);
    return c.text("Terjadi kesalahan saat membuka form", 500);
  }
};

// =======================
// STORE DATA
// =======================
export const store = async (c) => {
  try {
    const body = await c.req.parseBody();

    // VALIDASI
    if (!body.nama || !body.nim) {
      return c.redirect("/mahasiswa/create?error=Semua field wajib diisi");
    }

    model.create({
      nama: body.nama,
      nim: body.nim,
    });

    return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
  } catch (error) {
    console.error("Store Error:", error);
    return c.redirect("/mahasiswa?error=Gagal menambahkan data");
  }
};

// =======================
// FORM EDIT
// =======================
export const editForm = async (c) => {
  try {
    const id = c.req.param("id");
    const data = model.getById(id);

    // cek jika data tidak ditemukan
    if (!data) {
      return c.redirect("/mahasiswa?error=Data tidak ditemukan");
    }

    return c.html(
      await render(
        "mahasiswa/edit",
        {
          title: "Edit Mahasiswa",
          mhs: data,
        },
        c
      )
    );
  } catch (error) {
    console.error("Edit Form Error:", error);
    return c.text("Terjadi kesalahan saat membuka form edit", 500);
  }
};

// =======================
// UPDATE DATA
// =======================
export const updateData = async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.parseBody();

    if (!body.nama || !body.nim) {
      return c.redirect(`/mahasiswa/edit/${id}?error=Field tidak boleh kosong`);
    }

    model.update(id, {
      nama: body.nama,
      nim: body.nim,
    });

    return c.redirect("/mahasiswa?success=Data berhasil diupdate");
  } catch (error) {
    console.error("Update Error:", error);
    return c.redirect("/mahasiswa?error=Gagal update data");
  }
};

// =======================
// DELETE DATA
// =======================
export const destroy = async (c) => {
  try {
    const id = c.req.param("id");

    model.remove(id);

    return c.redirect("/mahasiswa?success=Data berhasil dihapus");
  } catch (error) {
    console.error("Delete Error:", error);
    return c.redirect("/mahasiswa?error=Gagal menghapus data");
  }
};