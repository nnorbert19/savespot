'use client';
import Link from 'next/link';
import { Button } from './button';
import { useRouter } from 'next/navigation';

function Tag({
  text,
  number,
  children,
}: {
  text: string;
  number?: number;
  children?: any;
}) {
  const router = useRouter();

  return (
    <Button
      variant={'ghost'}
      size={'tag'}
      onClick={() => router.push(`/?tag=${encodeURIComponent(text)}`)}
    >
      {text} {number && `(${number})`}
      {children && children}
    </Button>
  );
}

export default Tag;
