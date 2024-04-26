'use client';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { uuid } from 'uuidv4';
import { Session } from 'next-auth';
// @ts-ignore
import { toast } from 'sonner';
import { addBookmark } from '@/db/actions/bookmarkActions';

const schema = z.object({
  link: z
    .string({ required_error: 'Please insert a URL!' })
    .startsWith('https://', {
      message: `Please include 'https://' in the URL!`,
    })
    .url({
      message: 'Must be a Link!',
    }),
});

function UrlInput({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      link: '',
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    fetchMetadata(values.link);
  }

  async function fetchMetadata(url: string) {
    try {
      const response = await axios(
        `https://jsonlink.io/api/extract?url=${url}&api_key=${process.env.NEXT_PUBLIC_JSONLINK}`
      );

      if (response.data.title == '404 - Not Found') {
        toast('Site not found!');
        setLoading(false);
        return;
      }
      console.log(response.data);
      const data = {
        id: uuid(),
        title: response.data.title,
        favicon: response.data.favicon,
        userId: session.user?.id ?? '',
        bookmarkUrl: response.data.url,
        siteImageUrl: response.data.images[0],
        description: response.data.description,
        isPinned: false,
        tags: [],
        created: new Date(),
      };
      addBookmark(data).then(() => {
        toast('Bookmark added!');
      });
      setLoading(false);
    } catch (error) {
      //error kezelése
      toast('Error fetching metadata:' /*, error*/);
      return null;
    }
  }

  return (
    <div className='w-96'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-x-4 flex flex-row items-start justify-center '
        >
          <FormField
            control={form.control}
            name='link'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='w-100 shadow-lg'
                    placeholder='https://'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='shadow-lg' disabled={loading}>
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UrlInput;
