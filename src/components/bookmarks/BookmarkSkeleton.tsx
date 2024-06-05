import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

function BookmarkSkeleton() {
  return (
    <Card className='w-96 relative mt-4 mx-2'>
      <CardHeader>
        <Skeleton className='h-[190px] w-[366px] rounded' />
        <CardTitle>
          <Skeleton className='mt-1 h-6 w-[300px]' />
        </CardTitle>
        <Skeleton className='mt-2 h-4 w-[350px]' />
      </CardHeader>
      <CardContent className='h-32 mt-2'>
        <Skeleton className='h-4 mb-2 w-100' />
        <Skeleton className='h-4 mb-2 w-100' />
        <Skeleton className='h-4 mb-2 w-100' />
        <Skeleton className='h-4 mb-2 w-100' />
        <Skeleton className='h-4 mb-2 w-100' />
      </CardContent>
    </Card>
  );
}

export default BookmarkSkeleton;
