"use client";

import { useState, useEffect } from "react";
import { usePerjalananStore } from "@/stores/usePerjalananStore";

export default function Perjalanan() {
  const { perjalanan, fetchPerjalanan, tambahPerjalanan, hapusPerjalanan, editPerjalanan } =
    usePerjalananStore();

  useEffect(() => {
    fetchPerjalanan();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    provinsi: "",
    kota: "",
    tujuan_1: "",
    tujuan_2: "",
    tujuan_3: "",
    dari: "",
    sampai: "",
    status: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      name === "dari" || name === "sampai" ? new Date(value).toISOString() : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      await editPerjalanan(editId, formData);
      setEditId(null);
    } else {
      await tambahPerjalanan(formData);
    }
    setFormData({
      email: "",
      provinsi: "",
      kota: "",
      tujuan_1: "",
      tujuan_2: "",
      tujuan_3: "",
      dari: "",
      sampai: "",
      status: "",
    });
  };

  const handleEdit = (p: typeof formData & { id: number }) => {
    setEditId(p.id);
    setFormData({
      ...p,
      dari: p.dari ? new Date(p.dari).toISOString().split("T")[0] : "",
      sampai: p.sampai ? new Date(p.sampai).toISOString().split("T")[0] : "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Perjalanan</h1>

      {/* Form Tambah/Edit */}
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type={key === "dari" || key === "sampai" ? "date" : "text"}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              placeholder={key}
              className="p-2 border rounded-md"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editId !== null ? "Update Perjalanan" : "Tambah Perjalanan"}
        </button>
      </form>

      {/* Tabel Perjalanan */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Turis</th>
            <th className="border p-2">Provinsi</th>
            <th className="border p-2">Kota</th>
            <th className="border p-2">Tujuan 1</th>
            <th className="border p-2">Tujuan 2</th>
            <th className="border p-2">Tujuan 3</th>
            <th className="border p-2">Dari</th>
            <th className="border p-2">Sampai</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {perjalanan.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="border p-2">{p.email}</td>
              <td className="border p-2">{p.provinsi}</td>
              <td className="border p-2">{p.kota}</td>
              <td className="border p-2">{p.tujuan_1}</td>
              <td className="border p-2">{p.tujuan_2}</td>
              <td className="border p-2">{p.tujuan_3}</td>
              <td className="border p-2">{p.dari}</td>
              <td className="border p-2">{p.sampai}</td>
              <td className="border p-2">{p.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => hapusPerjalanan(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
