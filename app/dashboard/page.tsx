import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">👑 Welcome, Empire Builder!</h1>
        <p className="text-lg text-gray-600 mt-2">
          Ready to dominate? Choose a tool below to start building.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          title="🚀 Launch Builder"
          description="Generate and customize stunning landing pages instantly."
          href="/dashboard/builder"
        />
        <ToolCard
          title="📊 Analytics"
          description="See what’s working. Track traffic, engagement and conversions."
          href="/dashboard/analytics"
        />
        <ToolCard
          title="💡 Marketing AI"
          description="Get powerful Sabri Suby-style copy & campaigns in 1 click."
          href="/dashboard/marketing-ai"
        />
      </section>
    </div>
  );
}

function ToolCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition block"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}
