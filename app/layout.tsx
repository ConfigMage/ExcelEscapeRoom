import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GameStateProvider } from '@/lib/gameState'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spreadsheet Escape Room',
  description: 'A puzzle game for spreadsheet enthusiasts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameStateProvider>
          {children}
        </GameStateProvider>
      </body>
    </html>
  )
}
