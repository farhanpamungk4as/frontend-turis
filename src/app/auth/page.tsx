"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState<number | "">(""); // Mulai dari string kosong, lalu jadi number
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  

    router.push("/dashboard");
  
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input value={nama} type="nama" className="w-full p-2 border rounded mb-3" placeholder="nama" onChange={(e) => setNama(e.target.value)} />
        <input
  type="number"
  className="w-full p-2 border rounded mb-3"
  placeholder="Pasword(umur)"
  value={umur}
  onChange={(e) => setUmur(e.target.value ? Number(e.target.value) : "")} // Konversi ke number
/>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        <p className="mt-3 text-center">
          Belum punya akun? <a href="/register" className="text-blue-500">Daftar</a>
        </p>
      </form>
    </div>
  );
}
