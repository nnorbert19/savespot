import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navigation/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/lib/ThemeProvider';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='min-h-screen flex flex-col items-center justify-between'>
            <Navbar />
            <main className='flex flex-col items-center max-w-7xl'>
              {children}
            </main>
            <Toaster richColors />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
