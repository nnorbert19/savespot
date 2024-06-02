'use client';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Smile, LogOut } from 'lucide-react';

function UserInfoNav({ user }: any) {
  function openProfile() {
    console.log('open profile');
  }

  return (
    <div className='flex flex-row items-center'>
      {user.user?.name}
      <Avatar className=' mx-2 hover:cursor-pointer' onClick={openProfile}>
        <AvatarImage
          referrerPolicy='no-referrer'
          src={user.user.image}
          alt='avatar image'
        />

        {
          <AvatarFallback>
            <Smile />
          </AvatarFallback>
        }
      </Avatar>

      <div
        className='ml-6 hover:scale-125 hover:cursor-pointer transition-transform'
        onClick={signOut as any}
      >
        <LogOut />
      </div>
    </div>
  );
}

export default UserInfoNav;
