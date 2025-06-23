'use client';

import { ThemeProvider } from 'next-themes';
import './globals.css';
import { CartProvider } from '@/store/CartContext';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayoutPaths = ['/login', '/admin-login', '/admin'];

  const shouldHideLayout = hideLayoutPaths.includes(pathname);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='overflow-x-hidden'>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <CartProvider>
            {!shouldHideLayout && <Navbar />}
          {children}
          {!shouldHideLayout && <Footer />}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}