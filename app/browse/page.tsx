import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { getRooms } from '@/data-access/rooms';
import { SearchBar } from './search-bar';
import { RoomCard } from '@/components/room-card';
import { unstable_noStore } from 'next/cache';

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search || undefined);
  return (
    <main className='min-h-screen p-16'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold'>Find rooms</h1>
        <Button asChild>
          <Link href='/create-room'>Create room</Link>
        </Button>
      </div>
      <div className='mb-8'>
        <SearchBar />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
