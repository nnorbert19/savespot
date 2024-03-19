import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <>
      <div className='w-full h-20 bg-gray-300 sticky top-0'>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full'>
            <ul className='flex gap-x-6 '>
              <li>
                <Link href='/about'>SaveSpot</Link>
              </li>
            </ul>
            <Button>Sign in</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
