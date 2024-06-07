'use client';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogInIcon, LogOutIcon, UserX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { deleteAccountAction } from './actions';

function AccountDropdown() {
  const session = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: '/' });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'link'}>
            <Avatar className='mr-2'>
              <AvatarImage src={session.data?.user?.image ?? ''} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {session.data?.user ? session.data?.user?.name : 'Log in'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {pathName !== '/your-rooms' ? (
            <DropdownMenuItem
              onClick={() => {
                router.push('/your-rooms');
              }}
            >
              My Rooms
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                router.push('/');
              }}
            >
              Home
            </DropdownMenuItem>
          )}
          {pathName !== '/create-rrom' && (
            <DropdownMenuItem
              onClick={() => {
                router.push('/create-room');
              }}
            >
              Create a Room
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <UserX className='mr-2' /> Delete Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          >
            <LogOutIcon className='mr-2' /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className='bg-gray-100 py-2 dark:bg-gray-900 z-10 relative'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link
          className='flex items-center gap-2 text-xl hover:underline'
          href='/'
        >
          <Image
            src='/assets/logo.png'
            width='60'
            height='60'
            alt='the application icon of a howling wolf'
          />
          Next Video Chat
        </Link>
        <div className='flex items-center gap-4'>
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant='link'>
              <LogInIcon className='mr-2' />
              Log in
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
