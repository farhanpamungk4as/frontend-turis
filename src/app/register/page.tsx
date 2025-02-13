"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    umur: "",
    tanggal_lahir: "",
    tempat_tinggal: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      umur: Number(formData.umur), // Konversi umur ke number
    };

    const result = await registerUser(newUser);
    if (result) {
      alert("Pendaftaran berhasil! Silakan login.");
      router.push("/auth"); // Arahkan ke halaman login setelah berhasil
    } else {
      alert("Pendaftaran gagal! Coba lagi.");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" name="nama" className="w-full p-2 border rounded mb-3" placeholder="Nama" onChange={handleChange} required />
        <input type="number" name="umur" className="w-full p-2 border rounded mb-3" placeholder="Umur" onChange={handleChange} required />
        <input type="date" name="tanggal_lahir" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
        <input type="text" name="tempat_tinggal" className="w-full p-2 border rounded mb-3" placeholder="Tempat Tinggal" onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Daftar</button>
      </form>
    </div>
  );
}
