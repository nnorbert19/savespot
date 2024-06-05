import { getData } from '@/db/actions/bookmarkActions';
import { Session } from 'next-auth';
import { Suspense } from 'react';
import BookmarkSkeleton from './BookmarkSkeleton';
import Bookmark from './Bookmark';
import { bookmarkArrayType } from '@/types/bookmarkType';

export default async function Bookmarks({
  bookmarksData,
}: {
  bookmarksData: bookmarkArrayType;
}) {
  return (
    <div>
      <div className='flex justify-center flex-wrap container mb-8'>
        {bookmarksData.map((data) => (
          <>
            <Bookmark {...data} key={data.id} />
          </>
        ))}
      </div>
    </div>
  );
}
