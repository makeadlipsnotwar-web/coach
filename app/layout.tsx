import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Football Coach',
  description: 'Dein persönlicher Assistent für die Gridiron-Karriere',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen`}>
        <nav className="border-b border-slate-800 p-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-black tracking-tighter uppercase italic text-red-500">
              AI <span className="text-white">Coach</span>
            </h1>
            <div className="space-x-6 text-sm font-medium">
              <a href="/dashboard" className="hover:text-red-500 transition">Dashboard</a>
              <a href="/dashboard/profile" className="hover:text-red-500 transition">Profil</a>
              <a href="/dashboard/training" className="hover:text-red-500 transition">Training</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
