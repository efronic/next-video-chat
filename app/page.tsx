import { Button } from '@/components/ui/button';
import { db } from '@/db';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Room } from '@/db/schema';
import { GithubIcon } from 'lucide-react';
import { getRooms } from '@/data-access/rooms';

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            className='flex items-center gap-2'
            href={room.githubRepo}
            target='_blank'
            rel='noopener noreferrer'
          >
            <GithubIcon /> Github Repo
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/room/${room.id}`}>Join room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  const rooms = await getRooms();
  return (
    <main className='min-h-screen p-16'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold'>Find rooms</h1>
        <Button asChild>
          <Link href='/create-room'>Create room</Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
