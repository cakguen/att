import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import firebase_app from './firebase/config'
import { AuthContextProvider } from '@/context/AuthContext'

let fire = firebase_app;

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <div className='container'>
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}