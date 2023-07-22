import Navigation from '@/client-components/navigation';
import './globals.css';
import { Readex_Pro } from 'next/font/google';
import Image from 'next/image';

const readexPro = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  style: ['normal'],
  display: 'swap',
})

export const metadata = {
  title: 'مقياس',
  description: 'تحليل مشاعر وتحيز المتفاعلين على وسائل التواصل الإجتماعي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="rtl" className="bg-gray-200">
      <body className={readexPro.className}>
        <div className="bg-white p-8 border-b border-gray-300">
          <div className="max-w-7xl mx-auto flex space-x-reverse space-x-6">
            <Image src="/logo.svg" alt="logo" width={146.627969} height={34} />
            <Navigation navLinks={[
              { name: 'الرئيسية', href: '/' },
              { name: 'عن البرنامج', href: '/about' },
            ]} />
          </div>
        </div>
          <div className="max-w-7xl mx-auto pt-6">{children}</div>
      </body>
    </html>
  )
}
