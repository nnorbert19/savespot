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

function SignInComponent() {
  async function Login(event: FormEvent) {
    event.preventDefault();

    await signIn('google', { callbackUrl: '/' });
  }

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Button onClick={Login}>Google sign in</Button>
            </div>
            <div className='flex flex-col space-y-1.5'></div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignInComponent;
