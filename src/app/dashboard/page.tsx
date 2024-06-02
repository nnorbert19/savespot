import { getServerSession } from 'next-auth';
import UrlInput from '@/components/UrlInput';
import { authOptions } from '@/server/auth';
import Bookmarks from '@/components/bookmarks/Bookmarks';

async function page() {
  const session = await getServerSession(authOptions);

  return (
    <div className='pt-24'>
      {session && (
        <div className='flex flex-col items-center'>
          <UrlInput session={session} />
          <Bookmarks session={session} />
        </div>
      )}
    </div>
  );
}

export default page;
