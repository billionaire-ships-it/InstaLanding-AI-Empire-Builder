import "@/globals.css"; // ✅ Cleanest, safest import

import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-empire text-white p-6 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-white">InstaLanding AI</h2>
        <nav className="flex flex-col space-y-2">
          <SidebarLink href="/dashboard" text="Dashboard Home" />
          <SidebarLink href="/dashboard/builder" text="Launch Builder" />
          <SidebarLink href="/dashboard/analytics" text="Analytics" />
          <SidebarLink href="/dashboard/marketing-ai" text="Marketing AI" />
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}

function SidebarLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium hover:bg-white hover:text-empire px-3 py-2 rounded transition"
    >
      {text}
    </a>
  );
}

