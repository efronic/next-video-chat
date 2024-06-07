import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Room } from '@/db/schema';
import { GithubIcon } from 'lucide-react';
import { getRooms } from '@/data-access/rooms';
import { TagsList } from '@/components/ui/tags-list';
import { SearchBar } from './search-bar';
import { splitTags } from '@/lib/utils';

function RoomCard({ room }: { room: Room }) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle>{room.name}</CardTitle>
        {room.githubRepo && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={room.githubRepo}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GithubIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{room.githubRepo}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className='mb-4'>{room.description}</CardDescription>
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className='mt-auto'>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
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
