import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';

export default async function AdminPage() {
  const session = await verifySession();

  if (session) {
    redirect('/admin/dashboard');
  } else {
    redirect('/admin/login');
  }
}
