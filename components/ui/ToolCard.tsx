// components/ToolCard.tsx
import Link from "next/link";

export default function ToolCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </Link>
  );
}
 