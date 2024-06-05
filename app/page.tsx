import { db } from '@/db';
export default async function Home() {
  const rooms = await db.query.room.findMany();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {rooms.map((item) => (
        <div key={item.id} className='flex flex-col items-center'>
          <h2 className='text-2xl font-bold'>{item.name}</h2>
        </div>
      ))}
    </main>
  );
}
