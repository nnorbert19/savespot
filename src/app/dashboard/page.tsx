import { getServerSession } from 'next-auth';
import UrlInput from '@/components/UrlInput';
import { authOptions } from '@/server/auth';
import Bookmarks from '@/components/bookmarks/Bookmarks';
import { getData } from '@/db/actions/bookmarkActions';
import { Suspense } from 'react';
import BookmarkSkeleton from '@/components/bookmarks/BookmarkSkeleton';
import Tag from '@/components/ui/tag';

async function page({ searchParams, ...props }: any) {
  console.log(searchParams?.tag);
  const session = await getServerSession(authOptions);
  const bookmarksData = await getData(session?.user?.id || '');
  const filteredBookmarks = searchParams?.tag
    ? bookmarksData.filter(
        (bookmark) =>
          bookmark?.tags && bookmark.tags.includes(searchParams?.tag)
      )
    : bookmarksData;

  return (
    <div className='pt-24'>
      {session && (
        <div className='flex flex-col items-center'>
          <UrlInput
            session={session}
            urls={bookmarksData.map((bookmark) => bookmark.bookmarkUrl)}
          />
          <div className='flex justify-center flex-wrap container mb-8'>
            <Tag text='valami' index={1} number={21} />
            <Tag text='valam' index={2} />
          </div>

          <Suspense
            fallback={Array.from({ length: 5 }).map((_, index) => (
              <BookmarkSkeleton key={index} />
            ))}
          >
            {bookmarksData && (
              <Bookmarks
                // @ts-ignore
                bookmarksData={filteredBookmarks}
              />
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default page;
