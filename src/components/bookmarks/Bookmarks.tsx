import Bookmark from './Bookmark';
import { bookmarkArrayType } from '@/types/bookmarkType';

export default async function Bookmarks({
  bookmarksData,
}: {
  bookmarksData: bookmarkArrayType;
}) {
  const pinnedBookmarks = bookmarksData.filter((bookmark) => bookmark.isPinned);
  const unpinnedBookmarks = bookmarksData.filter(
    (bookmark) => !bookmark.isPinned
  );
  return (
    <div>
      <div className='flex justify-center flex-wrap container mb-8'>
        {pinnedBookmarks.map((data, index) => (
          <Bookmark {...data} key={index} />
        ))}
      </div>
      <div className='flex justify-center flex-wrap container mb-8'>
        {unpinnedBookmarks.map((data, index) => (
          <Bookmark {...data} key={index} />
        ))}
      </div>
    </div>
  );
}
