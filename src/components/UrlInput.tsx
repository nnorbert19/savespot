/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { Session } from 'next-auth';
import { toast } from 'sonner';
import { addBookmark } from '@/db/actions/bookmarkActions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useRouter } from 'next/navigation';
import { LoaderCircle, Plus, X } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

function UrlInput({ session, urls }: { session: Session; urls: string[] }) {
  const schema = z.object({
    link: z
      .string()
      .startsWith('https://', {
        message: `Please include 'https://' in the URL!`,
      })
      .url({
        message: 'Must be a Link!',
      })
      .refine((url) => !urls.includes(url), {
        message: 'This URL is already Sa',
      }),
  });

  const { reference, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<null | {
    id: string;
    title: any;
    favicon: any;
    userId: string;
    bookmarkUrl: any;
    siteImageUrl: any;
    description: any;
    isPinned: boolean;
    tags: never[];
    created: Date;
  }>(null);

  const form = useForm<z.infer<typeof schema>>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      link: '',
    },
  });
  const url = form.watch('link');

  const debouncedFetchMetadata = useCallback(
    debounce(async (url: string) => {
      try {
        schema.parse({ link: url });
        fetchMetadata(url);
      } catch (error) {
        setLoading(false);
        setMetadata(null);
        return;
      }
    }, 600),
    []
  );

  useEffect(() => {
    if (url) {
      !loading && setLoading(true);
      debouncedFetchMetadata(url);
    } else {
      setMetadata(null);
    }
  }, [url, debouncedFetchMetadata]);

  function onSubmit() {
    setLoading(true);
    AddToDatabase();
  }

  function AddToDatabase() {
    if (metadata) {
      setLoading(true);
      addBookmark(metadata).then(() => {
        form.reset();
        setMetadata(null);
        toast('Bookmark added!');
        setLoading(false);
        router.refresh();
      });
    }
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
      const data = {
        id: v4(),
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
      setMetadata(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Error fetching metadata, please try again later!');
      return null;
    }
  }

  function FocusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  return (
    <>
      <div className={`${!!metadata ? 'blur-background' : ''}`}>
        <div ref={reference} className='w-96 flex flex-col items-center pb-4'>
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
                        ref={(e) => {
                          // @ts-ignore
                          inputRef.current = e; // you can still assign to ref
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='shadow-lg'
                disabled={loading || !metadata}
              >
                {loading ? (
                  <LoaderCircle
                    size={24}
                    strokeWidth={3}
                    className='animate-spin'
                  />
                ) : (
                  'Add'
                )}
              </Button>
            </form>
          </Form>
          {metadata && (
            <Popover open={!!metadata}>
              <PopoverTrigger />
              <PopoverContent className='w-100 bg-secondary p-2 shadow-2xl z-10'>
                <Card className='w-96  top-4'>
                  <CardHeader>
                    <div className='flex flex-row justify-between'>
                      <CardTitle>{metadata.title}</CardTitle>
                      <X
                        className='min-w-[20px] max-w-[20px] hover:cursor-pointer'
                        onClick={() => form.reset()}
                      />
                    </div>
                    <img src={metadata.siteImageUrl} alt='' />
                  </CardHeader>
                  <CardContent>
                    <p>{metadata.description}</p>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <Button
        onClick={FocusInput}
        size={'bigIcon'}
        className={`fixed bottom-4 right-10 xl:right-24 z-10 p-4 rounded-full transition-all duration-500 ease-in-out transform ${
          isIntersecting
            ? 'opacity-0 translate-y-32 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <Plus size={36} strokeWidth={3} />
      </Button>
    </>
  );
}

export default UrlInput;
