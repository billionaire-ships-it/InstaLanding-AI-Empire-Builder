import React from 'react';
import Navbar from './components/Navbar';  // Fixed import path (removed extra dot)

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="text-center py-4 text-sm text-gray-400">
        © 2025 InstaLanding AI. All rights reserved.
      </footer>
    </div>
  );
}