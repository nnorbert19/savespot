'use client';
import { bookmarkType } from '@/types/bookmarkType';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { toast } from 'sonner';
import Pin from '../icons/Pin';
import UnPin from '../icons/UnPin';
import NewTab from '../icons/NewTab';
import Copy from '../icons/Copy';
import Refresh from '../icons/Refresh';
import Trash from '../icons/Trash';
import { deleteBookmark, editBookmark } from '@/db/actions/bookmarkActions';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Options(props: bookmarkType) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function copyUrl() {
    navigator.clipboard.writeText(props.bookmarkUrl);
    toast.success('Copied to clipboard');
    setIsOpen(false);
  }

  function openInNewTab() {
    window.open(props.bookmarkUrl, '_blank');
    setIsOpen(false);
  }

  function pinBookmark() {
    const newBookmark = { ...props, isPinned: !props.isPinned };
    editBookmark(newBookmark)
      .then(() => {
        if (newBookmark.isPinned) {
          toast.success('Bookmark pinned');
        } else {
          toast.success('Bookmark unpinned');
        }
        router.refresh();
      })
      .catch(() => {
        if (newBookmark.isPinned) {
          toast.error('Failed to pin bookmark');
        } else {
          toast.error('Failed to unpin bookmark');
        }
      });
    setIsOpen(false);
  }

  function deleteBookmarkFn() {
    deleteBookmark(props.id)
      .then(() => {
        toast.success('Bookmark deleted');
        router.refresh();
      })
      .catch(() => {
        toast.error('Failed to delete bookmark');
      });
    setIsOpen(false);
  }

  async function refreshBookmark() {
    toast.promise(
      axios(
        `https://jsonlink.io/api/extract?url=${props.bookmarkUrl}&api_key=${process.env.NEXT_PUBLIC_JSONLINK}`
      ).then((response) => {
        const data = {
          id: props.id,
          title: response.data.title,
          favicon: response.data.favicon,
          userId: props.userId,
          bookmarkUrl: response.data.url,
          siteImageUrl: response.data.images[0],
          description: response.data.description,
          isPinned: props.isPinned,
          tags: props.tags,
          created: props.created,
        };
        editBookmark(data)
          .then(() => {
            return 'success';
          })
          .catch(() => {
            return 'error';
          });
      }),
      {
        loading: 'Fetching metadata...',
        success: 'Metadata refreshed successfully!',
        error: 'Failed to fetch metadata. Please try again.',
      }
    );
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-8'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent align='end' className='flex flex-col w-44 p-1'>
        <Button
          variant={'ghost'}
          className='flex flex-row justify-start px-1'
          onClick={() => copyUrl()}
        >
          <Copy />
          <p className='ml-2'>Copy url</p>
        </Button>
        <Button
          variant={'ghost'}
          className='flex flex-row justify-start px-1'
          onClick={() => openInNewTab()}
        >
          <NewTab />
          <p className='ml-2'>Open in new tab</p>
        </Button>
        <Button
          variant={'ghost'}
          className='flex flex-row justify-start px-1'
          onClick={() => pinBookmark()}
        >
          {props.isPinned ? (
            <>
              <UnPin />
              <p className='ml-2'>Unpin</p>
            </>
          ) : (
            <>
              <Pin />
              <p className='ml-2'>Pin</p>
            </>
          )}
        </Button>
        <Button
          variant={'ghost'}
          className='flex flex-row justify-start px-1'
          onClick={() => refreshBookmark()}
        >
          <Refresh />
          <p className='ml-2'>Refresh metadata</p>
        </Button>
        <Button
          variant={'ghost'}
          className='flex flex-row justify-start px-1 text-red-500 hover:text-red-500'
          onClick={() => deleteBookmarkFn()}
        >
          <Trash />
          <p className='ml-2'>Delete</p>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default Options;
