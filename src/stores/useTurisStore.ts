import { create } from "zustand";
import axios from "axios";

interface Turis {
  id: number;
  nama: string;
  umur: number;
  tanggal_lahir: string;
  tempat_tinggal: string;
}

interface TurisState {
  turis: Turis[];
  fetchTuris: () => Promise<void>;
  addOrUpdateTuris: (turis: Omit<Turis, "id">, id?: number) => Promise<void>;
  deleteTuris: (id: number) => Promise<void>;
}

export const useTurisStore = create<TurisState>((set) => ({
  turis: [],
  
  fetchTuris: async () => {
    try {
      const response = await axios.get("http://localhost:3000/turis"); // Sesuaikan endpoint backend
      set({ turis: response.data });
    } catch (error) {
      console.error("Gagal mengambil data turis:", error);
    }
  },

  addOrUpdateTuris: async (newTuris, id) => {
    try {
      if (id) {
        await axios.put(`http://localhost:3000/turis/${id}`, newTuris);
      } else {
        await axios.post("http://localhost:3000/turis", newTuris);
      }
      set((state) => ({
        turis: id
          ? state.turis.map((t) => (t.id === id ? { id, ...newTuris } : t))
          : [...state.turis, { id: state.turis.length + 1, ...newTuris }],
      }));
    } catch (error) {
      console.error("Gagal menambahkan atau mengupdate turis:", error);
    }
  },

  deleteTuris: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/turis/${id}`);
      set((state) => ({
        turis: state.turis.filter((t) => t.id !== id),
      }));
    } catch (error) {
      console.error("Gagal menghapus turis:", error);
    }
  },
}));
