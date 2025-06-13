"use client"; // needed for client-side hooks

import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import BillingControls from "@/components/BillingControls";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import React from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <DashboardContent userEmail={session.user?.email ?? ""} />;
}

function DashboardContent({ userEmail }: { userEmail: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <p className="mt-2 text-gray-600">Hello, {userEmail} 👋</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <ToolCard title="Launch Builder" description="Create and launch pages fast." link="/dashboard/builder" />
        <ToolCard title="Analytics" description="Track your performance." link="/dashboard/analytics" />
        <ToolCard title="Marketing AI" description="Generate powerful ad campaigns." link="/dashboard/marketing-ai" />
      </div>
    </div>
  );
}

function ToolCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <a href={link} className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </a>
  );
}

