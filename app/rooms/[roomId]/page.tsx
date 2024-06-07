import { getRoom } from '@/data-access/rooms';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { TagsList } from '@/components/ui/tags-list';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { MyVideoPlayer } from './video-player';
import { splitTags } from '@/lib/utils';

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
          <MyVideoPlayer room={room} />
        </div>
      </div>
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
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
