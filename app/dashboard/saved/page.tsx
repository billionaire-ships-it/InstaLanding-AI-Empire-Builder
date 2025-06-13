// app/dashboard/saved/page.tsx
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import LandingPage from "@/models/LandingPage";

export default async function SavedPages() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <p className="p-4">Unauthorized. Please log in.</p>;
  }

  await dbConnect();
  const pages = await LandingPage.find({ userId: session.user.email }).sort({ createdAt: -1 });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Saved Landing Pages</h1>
      {pages.length === 0 ? (
        <p>No landing pages saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page: any) => (
            <div key={page._id} className="border rounded-xl p-4 bg-white shadow">
              <p className="text-sm text-gray-500">{new Date(page.createdAt).toLocaleString()}</p>
              <p className="font-medium mt-2">Prompt:</p>
              <p className="text-sm text-gray-700 truncate max-w-full">{page.prompt}</p>
              <a
                href={`data:text/html;charset=utf-8,${encodeURIComponent(page.html)}`}
                download={`Landing-${page._id}.html`}
                className="mt-2 inline-block text-blue-600 hover:underline text-sm"
              >
                Download Page
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
