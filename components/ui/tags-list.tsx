'use client';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className='flex space-x-2'>
      {tags.map((tag) => (
        <Badge
          onClick={() => router.push(`/?search=${tag}`)}
          key={tag}
          className='px-2 py-1 text-sm font-semibold bg-gray-200 rounded-full'
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
