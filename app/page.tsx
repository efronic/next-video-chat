import { Button } from '@/components/ui/button';
import { db } from '@/db';
import Link from 'next/link';
export default async function Home() {
  const rooms = await db.query.room.findMany();
  return (
    <main className='min-h-screen p-16'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>Find rooms</h1>
        <Button asChild>
          <Link href='/create-room'>Create room</Link>
        </Button>
      </div>
      {rooms.map((item) => (
        <div key={item.id} className='flex flex-col items-center'>
          <h2 className='text-2xl font-bold'>{item.name}</h2>
        </div>
      ))}
    </main>
  );
}
