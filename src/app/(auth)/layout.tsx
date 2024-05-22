import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

type PrivateLayoutProps = {
  children: React.ReactNode;
};
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect('/dashboard');
  }
  return <>{children}</>;
}
