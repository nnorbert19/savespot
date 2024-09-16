import { Button } from '@/components/ui/button';
import { Check, Link as LucideLink, Tag } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  function signIn() {
    redirect('/login');
  }

  return (
    <div>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                Save Links, Add Tags, Stay Organized
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                SaveSpot helps you organize your web discoveries. Save links,
                add custom tags, and access your collection from anywhere.
              </p>
            </div>
            <div>
              <Link href={'/login'}>
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id='features'
        className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'
      >
        <div className='container px-4 md:px-6'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8'>
            Key Features
          </h2>
          <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col items-center text-center'>
              <LucideLink className='h-12 w-12 mb-4 text-primary' />
              <h3 className='text-lg font-bold mb-2'>Save Links</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                Quickly save any URL with a single click
              </p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <Tag className='h-12 w-12 mb-4 text-primary' />
              <h3 className='text-lg font-bold mb-2'>Custom Tags</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                Organize your links with personalized tags
              </p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <Check className='h-12 w-12 mb-4 text-primary' />
              <h3 className='text-lg font-bold mb-2'>Easy Access</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                Access your links from any device, anytime
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id='how-it-works' className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8'>
            How It Works
          </h2>
          <div className='grid gap-6 lg:grid-cols-3'>
            <div className='flex flex-col items-center text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4'>
                1
              </div>
              <h3 className='text-lg font-bold mb-2'>Save a Link</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                Enter a URL or use our browser extension to save a link
              </p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4'>
                2
              </div>
              <h3 className='text-lg font-bold mb-2'>Add Tags</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                Assign custom tags to categorize your links
              </p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4'>
                3
              </div>
              <h3 className='text-lg font-bold mb-2'>Browse and Search</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                Easily find your saved links using tags or search
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Start Saving Your Links Today
              </h2>
              <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
                Join thousands of users who are already organizing their online
                world with SaveSpot.
              </p>
            </div>
            <div className='w-full max-w-sm space-y-2'>
              <Link href={'/login'}>
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
