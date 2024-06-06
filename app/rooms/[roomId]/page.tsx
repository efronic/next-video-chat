import { getRoom } from '@/data-access/rooms';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { splitTags, TagsList } from '@/components/ui/tags-list';

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);
  if (!room) {
    return <div>Room not found</div>;
  }
  const tags = splitTags(room.tags);
  return (
    <div className='grid grid-cols-4 min-h-screen container pr-0 pl-0'>
      <div className='col-span-3 p-4 pl-0'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen'>
          video player
        </div>
      </div>
      <div className='col-span-1 p-4 pr-0 pl-4'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4'>
          <h1 className='text-base'> Info Panel: {room?.name}</h1>
          {room.githubRepo && (
            <Link
              href={room?.githubRepo}
              className='flex items-center gap-2 text-center text-sm'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
          <p className='text-base text-gray-600'>{room?.description}</p>
          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  );
}
