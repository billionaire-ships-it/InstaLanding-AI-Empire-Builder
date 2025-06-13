import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/">
        <a className="font-bold text-xl text-blue-600">InstaLanding AI</a>
      </Link>
      <div>
        <Link href="/dashboard">
          <a className="mr-6 hover:text-blue-600">Dashboard</a>
        </Link>
        <Link href="/pricing">
          <a className="mr-6 hover:text-blue-600">Pricing</a>
        </Link>
        <Link href="/community">
          <a className="mr-6 hover:text-blue-600">Community</a>
        </Link>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}
