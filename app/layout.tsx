// app/layout.tsx
import "../globals.css"; // ✅ This is correct path relative to layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InstaLanding AI Empire Builder",
  description: "Launch your business empire with 1 click.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-white">{children}</main>
      </body>
    </html>
  );
}
