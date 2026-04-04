import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";

// CREATE FORM
export const createForm = async (req, res) => {
  const html = await render("mahasiswa/create", {
    title: "Tambah Mahasiswa",
  }, req);
  res.send(html);
};

// LIST
export const index = async (req, res) => {
  const data = await model.getAll();

  const html = await render("mahasiswa/index", {
    title: "Data Mahasiswa",
    mahasiswa: data,
  }, req);
  res.send(html);
};

// STORE
export const store = async (req, res) => {
  const body = req.body;

  if (!body.nama || !body.nim) {
    return res.redirect("/mahasiswa/create?error=Field wajib");
  }

  await model.create({
    nama: body.nama,
    nim: body.nim,
  });

  return res.redirect("/mahasiswa?success=Berhasil");
};

// EDIT
export const editForm = async (req, res) => {
  const id = req.params.id;
  const data = await model.getById(id);

  const html = await render("mahasiswa/edit", {
    title: "Edit Mahasiswa",
    mhs: data,
  }, req);
  res.send(html);
};

// UPDATE
export const updateData = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  await model.update(id, {
    nama: body.nama,
    nim: body.nim,
  });

  return res.redirect("/mahasiswa");
};

// DELETE
export const destroy = async (req, res) => {
  const id = req.params.id;

  await model.remove(id);

  return res.redirect("/mahasiswa");
};