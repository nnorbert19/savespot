import { getServerSession } from 'next-auth';
import UrlInput from '@/components/dashboard/UrlInput';
import { authOptions } from '@/server/auth';
import Bookmarks from '@/components/bookmarks/Bookmarks';
import { getData } from '@/db/actions/bookmarkActions';
import { Suspense } from 'react';
import BookmarkSkeleton from '@/components/bookmarks/BookmarkSkeleton';
import Tag from '@/components/ui/tag';
import { bookmarkType } from '@/types/bookmarkType';

async function page({ searchParams }: any) {
  const session = await getServerSession(authOptions);
  const bookmarksData = await getData(session?.user?.id || '');
  const filteredBookmarks = searchParams?.tag
    ? bookmarksData.filter(
        (bookmark) =>
          bookmark?.tags && bookmark.tags.includes(searchParams?.tag)
      )
    : bookmarksData;

  const tags = individualTags(bookmarksData as bookmarkType[]);

  function individualTags(bookmarks: bookmarkType[]) {
    const tagCountMap: Record<string, number> = {};

    bookmarks.forEach((bookmark) => {
      bookmark.tags.forEach((tag) => {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCountMap).map(([tag, count]) => ({
      tag,
      count,
    }));
  }

  return (
    <div>
      {session && (
        <div className='flex flex-col items-center'>
          <UrlInput
            session={session}
            urls={bookmarksData.map((bookmark) => bookmark.bookmarkUrl)}
          />
          <div className='flex justify-center flex-wrap container mb-8'>
            {tags &&
              tags.map((tag, index) => (
                <Tag text={tag.tag} number={tag.count} key={index} />
              ))}
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
