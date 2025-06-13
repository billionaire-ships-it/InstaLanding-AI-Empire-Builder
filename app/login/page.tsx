// app/login/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid login.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
