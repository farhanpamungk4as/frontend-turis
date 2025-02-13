"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col justify-center items-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Selamat Datang di CMS!</h1>
      <button
        onClick={() => router.push("/auth")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </main>
  );
}
