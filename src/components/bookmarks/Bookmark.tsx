/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import wave from '../../../public/wave.svg';
import Image from 'next/image';
import Options from './Options';
import { bookmarkType } from '@/types/bookmarkType';
import Pin from '../icons/Pin';
import Tags from './Tags';

function Bookmark(props: bookmarkType) {
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
        {props.isPinned && (
          <div className='absolute top-2 right-3 h-6 w-6 bg-secondary rounded-full flex justify-center items-center'>
            <Pin />
          </div>
        )}

        <CardTitle className='flex flex-row flex-shrink-0  justify-between items-center'>
          {props.title}
          <div>
            <Options {...props} />
          </div>
        </CardTitle>
        <a
          href={props.bookmarkUrl}
          target='_blank'
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
        </a>
        {props.tags && <Tags {...props} />}
      </CardHeader>
      <CardContent className='h-32'>
        <p className='line-clamp-5'>{props.description}</p>
      </CardContent>
    </Card>
  );
}

export default Bookmark;
