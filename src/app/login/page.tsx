import SignInComponent from '@/components/SignInComponent';
import { Suspense } from 'react';

function page() {
  return (
    <div className='flex min-w-[100vw] items-center justify-center'>
      <Suspense fallback={<div>Loading...</div>}>
        <SignInComponent />
      </Suspense>
    </div>
  );
}

export default page;
