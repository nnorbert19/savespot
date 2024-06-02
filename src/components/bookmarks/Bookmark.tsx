/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function Bookmark(props: any) {
  return (
    <Card className='w-96 relative m-4'>
      <CardHeader>
        {props?.siteImageUrl && (
          <img className='max-h-[190px]' src={props.siteImageUrl} alt='' />
        )}
        <CardTitle>{props.title}</CardTitle>
        <Link
          href={props.bookmarkUrl}
          className='italic text-xs flex flex-row items-center'
        >
          {props.favicon && (
            <img
              src={props.favicon}
              className='w-4 h-4 mx-1'
              alt={props.title + ' favicon.'}
            />
          )}
          {props.bookmarkUrl}
        </Link>
      </CardHeader>
      <CardContent className='h-32'>
        <p className='line-clamp-5'>{props.description}</p>
      </CardContent>
    </Card>
  );
}

export default Bookmark;
