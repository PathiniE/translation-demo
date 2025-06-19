import './globals.css'
import Header from '@/app/components/Header'

export const metadata = {
  title: 'Translation Demo',
  description: 'Interactive dictionary with hover tooltips',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
       
      </body>
    </html>
  )
}