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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
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
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className='mr-2' /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn('google')}>
            <LogInIcon className='mr-2' /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const session = useSession();
  return (
    <header className='bg-gray-100 py-2 dark:bg-gray-900 container mx-auto'>
      <div className='flex justify-between items-center'>
        <Link
          className='flex items-center gap-2 text-xl hover:underline'
          href='/'
        >
          <Image
            src='/assets/Logo.png'
            width='60'
            height='60'
            alt='the application icon of a howling wolf'
          />
          Next Video Chat
        </Link>
        <div className='flex items-center gap-4'>
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
