import Bookmark from './Bookmark';
import { bookmarkArrayType } from '@/types/bookmarkType';

export default async function Bookmarks({
  bookmarksData,
}: {
  bookmarksData: bookmarkArrayType;
}) {
  return (
    <div>
      <div className='flex justify-center flex-wrap container mb-8'>tagek</div>
      <div className='flex justify-center flex-wrap container mb-8'>
        {bookmarksData.map((data, index) => (
          <Bookmark {...data} key={index} />
        ))}
      </div>
    </div>
  );
}
