import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NoRoom() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <p className='text-2xl font-semibold'>No Rooms Available</p>
        <p className='text-gray-600 mt-4'>
          <Button variant='outline' asChild>
            <Link href='/create-room'>Create Room</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
