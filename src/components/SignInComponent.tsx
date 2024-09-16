'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormEvent } from 'react';
import GoogleIcon from '@/components/icons/GoogleIcon';

function SignInComponent() {
  async function LoginGoogle(event: FormEvent) {
    event.preventDefault();

    await signIn('google', { callbackUrl: '/' });
  }

  return (
    <Card className='w-[350px] mt-40'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent className='pt-4'>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Button
                onClick={LoginGoogle}
                className='flex justify-center bg-slate-100 text-black'
              >
                <GoogleIcon />
                <p className='px-6'>Google sign in</p>
              </Button>
            </div>
            <div className='flex flex-col space-y-1.5'></div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignInComponent;
