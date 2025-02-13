"use client";

import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/auth");
  };

  const handleTambahTuris = () => {
    router.push("/dashboard/turis");
  };

  const handleTambahTrip = () => {
    router.push("/dashboard/perjalanan");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Pegawai Biro</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          onClick={handleTambahTuris}
        >
          Tambah Turis
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          onClick={handleTambahTrip}
        >
          Tambah Trip
        </button>
      </div>

      <button
        className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
