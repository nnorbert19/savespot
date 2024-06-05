'use client';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Smile, LogOut } from 'lucide-react';
import { ModeToggle } from '../ui/lightModeButton';

function UserInfoNav({ user }: any) {
  function openProfile() {
    console.log(user.user.image);
  }

  return (
    <div className='flex flex-row items-center'>
      <div className='mx-2'>
        <ModeToggle />
      </div>
      {user.user?.name}
      <Avatar className='mx-2 hover:cursor-pointer' onClick={openProfile}>
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
