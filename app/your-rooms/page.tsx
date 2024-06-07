import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { getUserRooms } from '@/data-access/rooms';
import { UserRoomCard } from './user-room-card';

export default async function YourRoomsPage() {
  const rooms = await getUserRooms();
  return (
    <main className='min-h-screen p-16'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold'>Your rooms</h1>
        <Button asChild>
          <Link href='/create-room'>Create room</Link>
        </Button>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {rooms.map((room) => (
          <UserRoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
