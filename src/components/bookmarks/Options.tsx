import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function Options({ id, url }: { id: string; url: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent align='end' className='flex flex-col w-32 p-1'>
        <Button variant={'ghost'}>copy url</Button>
        <Button variant={'ghost'}>open in new tab</Button>
        <Button variant={'ghost'}>pin</Button>
        <Button variant={'ghost'}>delete</Button>
        <Button variant={'ghost'}>refresh</Button>
      </PopoverContent>
    </Popover>
  );
}

export default Options;
