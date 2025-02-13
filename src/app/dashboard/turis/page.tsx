"use client";

import { useEffect, useState } from "react";
import { useTurisStore } from "@/stores/useTurisStore";

export default function TurisPage() {
  const { turis, fetchTuris, addOrUpdateTuris, deleteTuris } = useTurisStore();

  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [tempat_tinggal, setTempatTinggal] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchTuris();
  }, []);

  const tambahAtauEditTuris = async () => {
    if (!nama || !umur || !tanggal_lahir || !tempat_tinggal) {
      alert("Semua data harus diisi!");
      return;
    }

    await addOrUpdateTuris(
      { nama, umur: Number(umur), tanggal_lahir, tempat_tinggal },
      editId || undefined
    );

    setNama("");
    setUmur("");
    setTanggalLahir("");
    setTempatTinggal("");
    setEditId(null);
  };

  const editTuris = (id: number) => {
    const turisDiedit = turis.find((t) => t.id === id);
    if (turisDiedit) {
      setNama(turisDiedit.nama);
      setUmur(turisDiedit.umur.toString());
      setTanggalLahir(turisDiedit.tanggal_lahir);
      setTempatTinggal(turisDiedit.tempat_tinggal);
      setEditId(id);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Turis</h1>
      
      <div className="flex flex-col gap-2">
        <input type="text" className="border p-2" placeholder="Nama Turis" value={nama} onChange={(e) => setNama(e.target.value)} />
        <input type="number" className="border p-2" placeholder="Umur" value={umur} onChange={(e) => setUmur(e.target.value)} />
        <input type="date" className="border p-2" value={tanggal_lahir} onChange={(e) => setTanggalLahir(e.target.value)} />
        <input type="text" className="border p-2" placeholder="Tempat Tinggal" value={tempat_tinggal} onChange={(e) => setTempatTinggal(e.target.value)} />
        <button className="bg-blue-500 text-white p-2" onClick={tambahAtauEditTuris}>
          {editId !== null ? "Simpan Perubahan" : "Tambah Turis"}
        </button>
      </div>

      <ul className="mt-4">
        {turis.map((t) => (
          <li key={t.id} className="border-b p-2 flex justify-between items-center">
            <span>
              <strong>{t.nama}</strong> - {t.umur} tahun - Lahir: {t.tanggal_lahir} - Tinggal di {t.tempat_tinggal}
            </span>
            <div>
              <button className="bg-yellow-500 text-white p-1 mx-1" onClick={() => editTuris(t.id)}>
                Edit
              </button>
              <button className="bg-red-500 text-white p-1 mx-1" onClick={() => deleteTuris(t.id)}>
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
