'use server';

import { getSession } from '@/lib/auth';
import { StreamChat } from 'stream-chat';
export async function generateTokenAction() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error('User not authenticated');
  }
  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_SECRET_KEY!;
  const user_id = session?.user?.id;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  // Create User Token
  const token = serverClient.createToken(user_id);
  return token;
}
