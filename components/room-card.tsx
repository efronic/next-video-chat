'use client';
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
import { TagsList } from '@/components/ui/tags-list';
import { splitTags } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RoomCard({
  room,
  children,
  deleteRoomAction,
}: {
  room: Room;
  children?: React.ReactNode;
  deleteRoomAction?: (roomId: string) => void;
}) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle>{room.name}</CardTitle>
        <div className='flex flex-row items-end gap-4'>
          {room.githubRepo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={room.githubRepo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10'
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
          {children}
        </div>
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
