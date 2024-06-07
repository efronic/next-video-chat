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
                    className='pb-1'
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
