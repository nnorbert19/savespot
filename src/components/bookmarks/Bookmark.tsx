/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import wave from '../../../public/wave.svg';
import Image from 'next/image';

function Bookmark(props: any) {
  return (
    <Card className='w-96 relative mt-4 mx-2 z-0'>
      <CardHeader>
        {props?.siteImageUrl ? (
          <img
            className='h-[190px] rounded object-cover'
            src={props.siteImageUrl}
            alt={`Image of ${props.title}`}
          />
        ) : (
          <Image
            height={190}
            width={366}
            className='invert dark:invert-0 min-h-[190px] w-[366px] rounded object-cover'
            src={wave}
            alt={''}
          />
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
          <p className='hover:underline'>{props.bookmarkUrl}</p>
        </Link>
      </CardHeader>
      <CardContent className='h-32'>
        <p className='line-clamp-5'>{props.description}</p>
      </CardContent>
    </Card>
  );
}

export default Bookmark;
