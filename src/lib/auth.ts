"use server";

import { cookies } from "next/headers";
import axios from "axios"; // Import axios untuk request ke backend

export const getAuthUser = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("user")?.value || null;
};

export const loginUser = async (nama: string, umur: any) => {
  try {
    console.log("Mengirim data login:", { nama, umur }); // Debugging

    const response = await axios.post("http://localhost:3000/turis", { nama, umur });

    console.log("Respon dari server:", response.data); // Debugging

    if (response.data.success) {
      const cookieStore = await cookies();
      await cookieStore.set("user", nama, { httpOnly: true }); // Simpan nama di cookie
      return true;
    }
  } catch (error) {
    console.error("Login gagal:", error);
  }
  return false;
};


export const logoutUser = async () => {
  const cookieStore = await cookies();
  await cookieStore.delete("user");
};

// ➜ Fungsi untuk registrasi pengguna baru
export const registerUser = async (userData: {
  nama: string;
  umur: number;
  tanggal_lahir: string;
  tempat_tinggal: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/turis", {
      ...userData,
      password: userData.umur.toString(), // Password = umur
    });

    return response.data;
  } catch (error) {
    console.error("Gagal mendaftar:");
    return null;
  }
};
