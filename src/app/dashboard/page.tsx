import { getServerSession } from 'next-auth';
import UrlInput from '@/components/UrlInput';
import { authOptions } from '@/server/auth';
import Bookmarks from '@/components/bookmarks/Bookmarks';
import { getData } from '@/db/actions/bookmarkActions';
import { Suspense } from 'react';
import BookmarkSkeleton from '@/components/bookmarks/BookmarkSkeleton';

async function page() {
  const session = await getServerSession(authOptions);
  const bookmarksData = await getData(session?.user?.id || '');

  return (
    <div className='pt-24'>
      {session && (
        <div className='flex flex-col items-center'>
          <UrlInput session={session} />
          <Suspense
            fallback={Array.from({ length: 5 }).map((_, index) => (
              <BookmarkSkeleton key={index} />
            ))}
          >
            {bookmarksData && (
              <Bookmarks
                // @ts-ignore
                bookmarksData={bookmarksData}
              />
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default page;
