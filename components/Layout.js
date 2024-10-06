import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Job Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Job Portal
          </Link>
          <div className="space-x-4">
            <Link href="/jobs" className="hover:underline">
              Jobs
            </Link>
            {user ? (
              <>
                <Link href="/jobs/post" className="hover:underline">
                  Post Job
                </Link>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:underline">
                  Login
                </Link>
                <Link href="/auth/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-200">
        <div className="container mx-auto px-4 py-4 text-center">
          © 2024 Job Portal. All rights reserved.
        </div>
      </footer>
    </div>
  )
}