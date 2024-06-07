'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { useEffect } from 'react';
import { unstable_noStore } from 'next/cache';

const formSchema = z.object({
  search: z.string().min(0).max(50),
});

export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();
  const search = query.get('search') ?? '';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get('search') ?? '',
    },
  });

  useEffect(() => {
    form.setValue('search', search);
  }, [form, search]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    unstable_noStore();
    if (values.search) {
      router.push(`/browse/?search=${values.search}`);
    } else {
      router.push('/browse');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className='w-[440px]'
                  placeholder='Filter by keywords'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='gap-2'>
          <SearchIcon /> Search
        </Button>
        {query.get('search') && (
          <Button
            variant='link'
            onClick={() => {
              form.setValue('search', '');
              router.push('/browse/');
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
