import { ColumnDef } from '@tanstack/react-table';

export type Users = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
};

export const columnUsers: ColumnDef<Users>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ getValue }) => {
      const isActive = getValue<boolean>();
      return isActive ? 'Yes' : 'No';
    }
  }
];
