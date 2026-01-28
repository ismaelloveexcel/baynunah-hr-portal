import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Baynunah HR Portal',
  description: 'Mobile-first HR portal for Baynunah Group',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
