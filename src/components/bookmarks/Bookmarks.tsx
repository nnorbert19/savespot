import { getData } from '@/db/actions/bookmarkActions';
import { Session } from 'next-auth';
import { Suspense } from 'react';
import BookmarkSkeleton from './BookmarkSkeleton';
import Bookmark from './Bookmark';

export default async function Bookmarks({ session }: { session: Session }) {
  const Bookmarks = await getData(session.user?.id);
  return (
    <div>
      <Suspense fallback={<BookmarkSkeleton />}>
        <div className='flex justify-center flex-wrap'>
          {Bookmarks.map((data) => (
            <Bookmark {...data} key={data.id} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
