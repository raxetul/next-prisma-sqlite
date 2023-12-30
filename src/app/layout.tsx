import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SideNav from "@/components/navbar/sidenav";

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Next App Template',
  description: 'Next app template using sqlite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="w-full flex-none md:w-64">
      <SideNav />
    </div>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  </div>
  )
}
