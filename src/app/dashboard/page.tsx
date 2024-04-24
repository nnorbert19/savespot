//@ts-ignore
import { getServerSession } from 'next-auth';
import UrlInput from '@/components/UrlInput';
import { authOptions } from '@/server/auth';

async function page() {
  const session = await getServerSession(authOptions);

  return (
    <div className='pt-24'>{session && <UrlInput session={session} />}</div>
  );
}

export default page;
