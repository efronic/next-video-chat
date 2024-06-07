import { db } from '@/db';
import { Room, room } from '@/db/schema';
import { getSession } from '@/lib/auth';
import { eq, like } from 'drizzle-orm';
export async function getRooms(searchTerm: string | undefined) {
  const whereClause = searchTerm
    ? like(room.tags, `%${searchTerm}%`)
    : undefined;
  console.log('efron ahmadifar whereClause', searchTerm, whereClause);
  const rooms = await db.query.room.findMany({ where: whereClause });
  return rooms;
}
export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({ where: eq(room.id, roomId) });
}

export async function getUserRooms() {
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

export async function createRoom(
  roomData: Omit<Room, 'id' | 'userId'>,
  userId: string
) {
  const session = await getSession();
  if (!session) {
    throw new Error('You must be logged in to create a room.');
  }
  await db.insert(room).values({ ...roomData, userId });
}
export async function editRoom(
  roomData: Room,
) {
  const session = await getSession();
  if (!session) {
    throw new Error('You must be logged in to create a room.');
  }
  await db.update(room).set(roomData).where(eq(room.id, roomData.id));
}
