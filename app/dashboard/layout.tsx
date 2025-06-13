import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">InstaLanding AI</h2>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="hover:underline">Dashboard Home</a>
          <a href="/dashboard/builder" className="hover:underline">Launch Builder</a>
          <a href="/dashboard/analytics" className="hover:underline">Analytics</a>
          <a href="/dashboard/marketing-ai" className="hover:underline">Marketing AI</a>
          <LogoutButton />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}

// Logout button component
function LogoutButton() {
  async function logout() {
    "use server";
    // next-auth signOut logic here
  }

  return (
    <form action={logout}>
      <button type="submit" className="mt-8 bg-red-600 px-4 py-2 rounded hover:bg-red-700">
        Logout
      </button>
    </form>
  );
}
