import { Badge } from '@/components/ui/badge';

export function splitTags(tags: string) {
  return tags.split(/[ ,]+/).map((tag) => tag.trim());
}

export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className='flex space-x-2'>
      {tags.map((tag) => (
        <Badge
          key={tag}
          className='px-2 py-1 text-sm font-semibold bg-gray-200 rounded-full'
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
