import SignInComponent from '@/components/SignInComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const signInSkeleton = () => {
  return (
    <Card className='w-[350px] mt-40'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='w-20 h-6' />
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Skeleton className='w-80 h-10' />
          </div>
          <div className='flex flex-col space-y-1.5'></div>
        </div>
      </CardContent>
    </Card>
  );
};

function page() {
  return (
    <div className='flex items-center justify-center'>
      <Suspense fallback={signInSkeleton()}>
        <SignInComponent />
      </Suspense>
    </div>
  );
}

export default page;
