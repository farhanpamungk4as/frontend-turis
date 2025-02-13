import { create } from "zustand";
import axios from "axios";

interface Perjalanan {
  id: number;
  email: string;
  provinsi: string;
  kota: string;
  tujuan_1: string;
  tujuan_2: string;
  tujuan_3: string;
  dari: string;
  sampai: string;
  status: string;
}

interface PerjalananState {
  perjalanan: Perjalanan[];
  fetchPerjalanan: () => Promise<void>;
  tambahPerjalanan: (newPerjalanan: Omit<Perjalanan, "id">, id?: number) => Promise<void>;
  hapusPerjalanan: (id: number) => Promise<void>;
  editPerjalanan: (id: number, updatedData: Partial<Perjalanan>) => Promise<void>;
}

export const usePerjalananStore = create<PerjalananState>((set) => ({
  perjalanan: [],

  fetchPerjalanan: async () => {
    try {
      const response = await axios.get("http://localhost:3000/perjalanan"); // Sesuaikan dengan endpoint backend
      set({ perjalanan: response.data });
    } catch (error) {
      console.error("Gagal mengambil data perjalanan:", error); // ✅ Gunakan error agar tidak unused
    }
  },

  tambahPerjalanan: async (newPerjalanan, id) => {
    try {
      if (id) {
        // Jika ID ada, lakukan update perjalanan
        await axios.put(`http://localhost:3000/perjalanan/${id}`, newPerjalanan);
      } else {
        // Jika ID tidak ada, tambahkan perjalanan baru
        const response = await axios.post("http://localhost:3000/perjalanan", newPerjalanan);
        newPerjalanan = response.data; // Ambil data yang dikembalikan oleh backend
      }

      set((state) => ({
        perjalanan: id
          ? state.perjalanan.map((p) => (p.id === id ? { id, ...newPerjalanan } : p)) // Update data perjalanan
          : [...state.perjalanan, { id: state.perjalanan.length + 1, ...newPerjalanan }], // Tambah perjalanan baru
      }));

      console.log("Perjalanan berhasil ditambahkan atau diperbarui:", newPerjalanan);
    } catch (error) {
      console.error("Gagal menambahkan atau memperbarui perjalanan:", error); // ✅ Gunakan error agar tidak unused
    }
  },

  hapusPerjalanan: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/perjalanan/${id}`);
      set((state) => ({ perjalanan: state.perjalanan.filter((p) => p.id !== id) }));
    } catch (error) {
      console.error("Gagal menghapus perjalanan:", error); // ✅ Gunakan error agar tidak unused
    }
  },

  editPerjalanan: async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/perjalanan/${id}`, updatedData);
      set((state) => ({
        perjalanan: state.perjalanan.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
      }));
    } catch (error) {
      console.error("Gagal mengupdate perjalanan:", error); // ✅ Gunakan error agar tidak unused
    }
  },
}));
