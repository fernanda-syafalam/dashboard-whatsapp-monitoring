import DashboardLayout from '../layouts';
import TableUsers from '@/modules/dashboard/users/components/tableUsers';

export default function Page() {
  return (
    <DashboardLayout>
      <TableUsers />
    </DashboardLayout>
  );
}
