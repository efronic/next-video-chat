import { db } from '@/db';
import { room } from '@/db/schema';
import { getSession } from '@/lib/auth';
import { eq, like } from 'drizzle-orm';
import { unstable_noStore } from 'next/cache';
export async function getRooms(searchTerm: string | undefined) {
  unstable_noStore();
  const whereClause = searchTerm
    ? like(room.tags, `%${searchTerm}%`)
    : undefined;
  console.log('efron ahmadifar whereClause', searchTerm, whereClause);
  const rooms = await db.query.room.findMany({ where: whereClause });
  return rooms;
}
export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({ where: eq(room.id, roomId) });
}


export async function getUserRooms() {
  unstable_noStore();
  const session = await getSession();
  if (!session) {
    throw new Error('You must be logged in to view your rooms.');
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}


export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}