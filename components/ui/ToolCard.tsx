import Link from "next/link";

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

 