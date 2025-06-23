import { AdminProductProvider } from '@/store/AdminProductContext';
import AdminDashboard from '@/components/AdminDashboard';
import PageTitle from '@/components/PageTitle';

export default function AdminPage() {
  return (
    <>
    <PageTitle title="admin-dashboard" />
    <AdminProductProvider>
      <AdminDashboard />
    </AdminProductProvider>
    </>
  );
}