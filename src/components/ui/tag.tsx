import Link from 'next/link';
import { Button } from './button';

function Tag({
  text,
  index,
  number,
}: {
  text: string;
  index: number;
  number?: number;
}) {
  return (
    <Link key={index} href={`/?tag=${encodeURIComponent(text)}`} passHref>
      <Button variant={'ghost'} size={'tag'}>
        {text} {number && `(${number})`}
      </Button>
    </Link>
  );
}

export default Tag;
