import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import UserInfoNav from './UserInfoNav';

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className='w-full h-20 bg-secondary fixed z-[60] top-0 py-2'>
        <div className='max-w-7xl mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full px-2'>
            <ul>
              <li>
                <Link href={session ? '/dashboard' : '/'}>SaveSpot</Link>
              </li>
            </ul>

            {session ? (
              <UserInfoNav user={session} />
            ) : (
              <Button>
                <Link href='/login'>Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
